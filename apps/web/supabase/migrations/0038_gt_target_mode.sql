-- 0038_gt_target_mode.sql
-- GT Target Mode: store a user-selected GT target, and expose required_score
-- on each job-gap requirement check so the app can derive a numeric GT target
-- from a primary goal job without an extra query.
--
-- traj_eval_job_gap() below is the EXACT body from 0022 with a single additive
-- field ('required_score') added to each composite check. No other behavior changes.

-- 1) profiles.target_gt_score -------------------------------------------------
alter table public.profiles
  add column if not exists target_gt_score smallint;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_target_gt_score_chk'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_target_gt_score_chk
      check (
        target_gt_score is null
        or target_gt_score between 60 and 186
      );
  end if;
end
$$;

comment on column public.profiles.target_gt_score is
  'User-selected GT target on the app proxy scale (AR+WK+PC equated sum). Null until set.';

-- 2) traj_eval_job_gap() — add required_score to each check -------------------
create or replace function public.traj_eval_job_gap(
  p_job_id text,
  p_snapshot trajectory_score_snapshots
)
returns jsonb
language plpgsql stable
as $$
declare
  v_job job_catalog%rowtype;
  v_branch_comp jsonb;
  v_checks jsonb := '[]'::jsonb;
  v_rule record;
  v_actual numeric;
  v_req int;
  v_status text;
  v_gap_label text;
  v_band_actual int;
  v_band_req int;
  -- composite uncertainty window in band units, by confidence
  v_band_slack int;
  -- afqt
  v_afqt_status text := null;
  v_afqt_gap text := null;
  -- aggregation
  v_any_needs_work boolean := false;
  v_any_borderline boolean := false;
  -- OR-path tracking: group_id -> worst status within group
  v_groups jsonb := '{}'::jsonb;
  v_grp text;
  v_grp_state text;
  v_or_qualifies boolean := false;
  v_or_borderline boolean := false;
  v_has_or boolean := false;
  v_mandatory_qualifies boolean := true;
  v_overall text;
begin
  select * into v_job from job_catalog where id = p_job_id;
  if not found then
    return jsonb_build_object('error', 'job_not_found', 'job_id', p_job_id);
  end if;

  v_branch_comp := coalesce(p_snapshot.branch_composite_estimates -> v_job.branch, '{}'::jsonb);

  -- composite slack (in 10-pt bands): wider when confidence is low.
  v_band_slack := case p_snapshot.overall_confidence
    when 'high' then 0 when 'medium' then 1 else 2 end;

  -- AFQT requirement (banded).
  if v_job.min_afqt is not null then
    if p_snapshot.afqt_low >= v_job.min_afqt then
      v_afqt_status := 'qualifies';
    elsif p_snapshot.afqt_high >= v_job.min_afqt then
      v_afqt_status := 'borderline';
    else
      v_afqt_status := 'needs_work';
    end if;
    -- banded gap label (AFQT bands), by band-index distance.
    v_band_actual := traj_afqt_band_index(p_snapshot.afqt_point);
    v_band_req    := traj_afqt_band_index(v_job.min_afqt);
    if v_band_actual >= v_band_req then
      v_gap_label := 'at_or_above_band';
    elsif v_band_req - v_band_actual = 1 then
      v_gap_label := 'within_one_band';
    else
      v_gap_label := 'more_than_one_band_below';
    end if;
    v_afqt_gap := v_gap_label;
    if v_afqt_status = 'needs_work' then v_any_needs_work := true; v_mandatory_qualifies := false;
    elsif v_afqt_status = 'borderline' then v_any_borderline := true; v_mandatory_qualifies := false;
    end if;
  end if;

  -- Composite requirement rules.
  for v_rule in
    select requirement_group, composite_code, min_score
    from job_requirement_rules
    where job_id = p_job_id
    order by requirement_group, composite_code
  loop
    v_actual := coalesce((v_branch_comp->>v_rule.composite_code)::numeric, 0);
    v_req := v_rule.min_score;
    v_band_actual := traj_composite_band(round(v_actual)::int);
    v_band_req := traj_composite_band(v_req);

    -- status with confidence-driven slack on the point estimate.
    if v_band_actual - v_band_slack >= v_band_req and v_actual >= v_req then
      v_status := 'qualifies';
    elsif v_band_actual + v_band_slack >= v_band_req then
      v_status := 'borderline';
    else
      v_status := 'needs_work';
    end if;

    -- banded gap label (composite bands)
    if v_band_actual >= v_band_req then
      v_gap_label := 'at_or_above_band';
    elsif v_band_req - v_band_actual = 1 then
      v_gap_label := 'within_one_band';
    else
      v_gap_label := 'more_than_one_band_below';
    end if;

    v_checks := v_checks || jsonb_build_object(
      'composite_code', v_rule.composite_code,
      'requirement_group', v_rule.requirement_group,
      'required_score', v_req,
      'status', v_status,
      'gap_band', v_gap_label,
      'actual_band', v_band_actual,
      'required_band', v_band_req
    );

    if v_rule.requirement_group = 0 then
      if v_status = 'needs_work' then v_any_needs_work := true; v_mandatory_qualifies := false;
      elsif v_status = 'borderline' then v_any_borderline := true; v_mandatory_qualifies := false;
      end if;
    else
      v_has_or := true;
      v_grp := v_rule.requirement_group::text;
      v_grp_state := coalesce(v_groups->>v_grp, 'qualifies');
      -- worst-of within an OR group (all rules in the group must pass)
      if v_status = 'needs_work' then v_grp_state := 'needs_work';
      elsif v_status = 'borderline' and v_grp_state <> 'needs_work' then v_grp_state := 'borderline';
      end if;
      v_groups := v_groups || jsonb_build_object(v_grp, v_grp_state);
    end if;
  end loop;

  -- Evaluate OR groups: best-of across groups.
  if v_has_or then
    for v_grp in select jsonb_object_keys(v_groups) loop
      if (v_groups->>v_grp) = 'qualifies' then v_or_qualifies := true; end if;
      if (v_groups->>v_grp) in ('qualifies','borderline') then v_or_borderline := true; end if;
    end loop;
  end if;

  -- Overall job status.
  --   qualifies  = every mandatory qualifies AND (no OR groups OR >=1 fully qualifies)
  --   borderline = no mandatory needs_work but >=1 borderline (or OR reaches borderline+)
  --   needs_work = any mandatory needs_work and no alternate path reaches borderline+
  if v_mandatory_qualifies and (not v_has_or or v_or_qualifies) then
    v_overall := 'qualifies';
  elsif v_any_needs_work and not (v_has_or and v_or_borderline) then
    v_overall := 'needs_work';
  else
    v_overall := 'borderline';
  end if;

  -- Beta/unsupported jobs: never project false confidence.
  if v_job.support_status <> 'supported' then
    v_overall := 'unsupported';
  end if;

  return jsonb_build_object(
    'job_id', v_job.id,
    'branch', v_job.branch,
    'code', v_job.code,
    'title', v_job.title,
    'category', v_job.category,
    'support_status', v_job.support_status,
    'unsupported_reason', v_job.unsupported_reason,
    'overall_status', v_overall,
    'afqt', case when v_job.min_afqt is null then null else
      jsonb_build_object('status', v_afqt_status, 'gap_band', v_afqt_gap) end,
    'checks', v_checks
  );
end;
$$;
