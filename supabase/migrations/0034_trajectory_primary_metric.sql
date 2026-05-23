-- =============================================================
-- 0034_trajectory_primary_metric.sql
-- AFCT prep differentiation (S5): emit a `primary_metric` object from
-- rpc_get_home_trajectory so the home/plan TrajectoryCard can show the metric
-- the user is actually prepping for.
--
--   • Initial ASVAB (or AFCT on an unsupported branch) → AFQT, banded (today's
--     contract — band_key/label only, no raw point).
--   • AFCT on a VE+AR branch → the GT (Army/Marines) or General/G (AF/SF)
--     PROXY pulled from the already-stored branch_composite_estimates (equated
--     20-62 scale). is_proxy=true; NO qualification tier is implied — the card
--     must label it a practice proxy ("targets vary by role/program").
--
-- Mirrors src/lib/prep-mode.ts: VE_AR branches = army, marines, air_force,
-- space_force; navy + coast_guard fall back to AFQT (rating-specific, S7).
-- Idempotent CREATE OR REPLACE; no schema change.
-- =============================================================

create or replace function public.rpc_get_home_trajectory()
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_cur trajectory_score_snapshots;
  v_proj trajectory_score_snapshots;
  v_latest timestamptz;
  v_targets jsonb := '[]'::jsonb;
  v_tj record;
  v_eval jsonb;
  -- prep-mode (S5)
  v_test_type text;
  v_branch text;
  v_metric_code text := 'AFQT';
  v_metric_label text := 'AFQT';
  v_is_proxy boolean := false;
  v_cur_value numeric := null;
  v_proj_value numeric := null;
  v_primary jsonb;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  select * into v_cur from trajectory_score_snapshots
   where user_id = v_uid and snapshot_kind = 'current_standing';

  select max(completed_at) into v_latest from attempts where user_id = v_uid;

  -- Refresh if missing or if a newer attempt exists than the snapshot reflects.
  if v_cur.user_id is null
     or v_cur.latest_attempt_at is distinct from v_latest then
    v_cur := public.rpc_refresh_trajectory_snapshot('current_standing');
  end if;

  select * into v_proj from trajectory_score_snapshots
   where user_id = v_uid and snapshot_kind = 'projected_test_day';

  -- Ordered target jobs with evaluated gaps.
  for v_tj in
    select t.id as target_job_id, t.job_id, t.display_order, t.is_primary
    from user_target_jobs t
    where t.user_id = v_uid
    order by t.is_primary desc, t.display_order asc
  loop
    v_eval := public.traj_eval_job_gap(v_tj.job_id, v_cur);
    v_targets := v_targets || (v_eval || jsonb_build_object(
      'target_job_id', v_tj.target_job_id,
      'display_order', v_tj.display_order,
      'is_primary', v_tj.is_primary
    ));
  end loop;

  -- ── Primary metric (S5) ──────────────────────────────────────────────────
  -- Resolve prep mode from the profile. AFCT on a VE+AR branch tracks GT/G as a
  -- proxy; everyone else tracks AFQT (banded).
  select p.test_type, p.branch into v_test_type, v_branch
    from profiles p where p.user_id = v_uid;

  if v_test_type = 'afct' then
    if v_branch in ('army', 'marines') then
      v_metric_code := 'GT'; v_metric_label := 'GT'; v_is_proxy := true;
    elsif v_branch in ('air_force', 'space_force') then
      v_metric_code := 'G'; v_metric_label := 'General (G)'; v_is_proxy := true;
    end if;
    -- navy / coast_guard / null branch → AFQT fallback (rating-specific = S7)
  end if;

  if v_is_proxy then
    v_cur_value := nullif(
      v_cur.branch_composite_estimates -> v_branch ->> v_metric_code, ''
    )::numeric;
    if v_proj.user_id is not null then
      v_proj_value := nullif(
        v_proj.branch_composite_estimates -> v_branch ->> v_metric_code, ''
      )::numeric;
    end if;
    v_primary := jsonb_build_object(
      'code', v_metric_code,
      'label', v_metric_label,
      'is_proxy', true,
      'current_value', v_cur_value,
      'projected_value', v_proj_value
    );
  else
    v_primary := jsonb_build_object(
      'code', 'AFQT',
      'label', 'AFQT',
      'is_proxy', false,
      'current_band_key', v_cur.afqt_band_key,
      'current_band_label', v_cur.afqt_band_label,
      'projected_band_key',
        case when v_proj.user_id is null then null else v_proj.afqt_band_key end,
      'projected_band_label',
        case when v_proj.user_id is null then null else v_proj.afqt_band_label end
    );
  end if;

  return jsonb_build_object(
    'algorithm_version', v_cur.algorithm_version,
    'primary_metric', v_primary,
    'current_standing', jsonb_build_object(
      'generated_at', v_cur.generated_at,
      'attempt_count', v_cur.attempt_count,
      'overall_confidence', v_cur.overall_confidence,
      'afqt_band_key', v_cur.afqt_band_key,
      'afqt_band_label', v_cur.afqt_band_label,
      'subtest_estimates', v_cur.subtest_estimates
      -- NOTE: raw afqt point/low/high intentionally omitted from the contract;
      -- WS4 renders bands + confidence only. (Stored for debugging.)
    ),
    'projected_test_day', case when v_proj.user_id is null then null else
      jsonb_build_object(
        'generated_at', v_proj.generated_at,
        'overall_confidence', v_proj.overall_confidence,
        'afqt_band_key', v_proj.afqt_band_key,
        'afqt_band_label', v_proj.afqt_band_label
      ) end,
    'target_jobs', v_targets
  );
end;
$$;

grant execute on function public.rpc_get_home_trajectory() to authenticated;
