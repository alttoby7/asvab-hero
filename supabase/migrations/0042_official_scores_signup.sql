-- 0042_official_scores_signup.sql
-- Collect official ASVAB scores after signup + unify into a score timeline.
--
-- What this adds:
--   (1) real_asvab_tests.exam_kind        — what KIND of official exam it was
--       (distinct from test_format = delivery method), + is_incomplete flag.
--   (2) profiles.official_test_status      — lets the dashboard tell "never
--       tested" from "tested but didn't log scores".
--       profiles.education_status          — GED/diploma/college, materially
--       changes branch-qualification advice (the one extra signup field).
--   (3) rpc_log_official_test()            — single, validated server-side write
--       path used by onboarding + dashboard + the retake page. Rejects bad data
--       (no silent clamping — official scores are ground truth), sets the
--       profile status, and writes a calibration row.
--   (4) prediction_log                     — append-only history of trajectory
--       predictions (snapshots overwrite, so the live snapshot is not a reliable
--       historical predictor). Populated by a trigger on
--       trajectory_score_snapshots.
--   (5) official_score_calibration         — captured at official-score log time
--       against the most recent PRE-test prediction. Internal accuracy metric.
--
-- AFQT is stored as the user enters it from their score sheet (ground truth);
-- derived composites (VE/GT/line scores) are computed in the app layer
-- (src/lib/score-calculator.ts) for display, not duplicated in SQL.

begin;

-- =============================================================
-- (1) real_asvab_tests: exam_kind + completeness
-- =============================================================
alter table real_asvab_tests
  add column if not exists exam_kind text not null default 'initial_asvab'
    check (exam_kind in ('initial_asvab','afct','confirmation_test','student_asvab')),
  add column if not exists is_incomplete boolean not null default false;

-- =============================================================
-- (2) profiles: official_test_status + education_status
-- =============================================================
alter table profiles
  add column if not exists official_test_status text not null default 'not_taken'
    check (official_test_status in ('not_taken','taken_logged','taken_not_logged')),
  add column if not exists education_status text
    check (education_status is null or education_status in
      ('high_school_student','hs_diploma','ged','college_15plus','not_sure'));

-- Backfill: anyone who already logged a real test is 'taken_logged'.
update profiles p
  set official_test_status = 'taken_logged'
  where official_test_status = 'not_taken'
    and exists (select 1 from real_asvab_tests r where r.user_id = p.user_id);

-- =============================================================
-- (4) prediction_log — append-only prediction history
-- =============================================================
create table if not exists prediction_log (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references profiles(user_id) on delete cascade,
  snapshot_kind      text not null,            -- current_standing | projected_test_day
  afqt_point         smallint,
  afqt_low           smallint,
  afqt_high          smallint,
  overall_confidence text,
  attempt_count      int not null default 0,
  generated_at       timestamptz not null default now()
);
create index if not exists prediction_log_user_idx
  on prediction_log (user_id, generated_at desc);

alter table prediction_log enable row level security;
drop policy if exists "prediction_log_select_own" on prediction_log;
create policy "prediction_log_select_own" on prediction_log
  for select using (auth.uid() = user_id);
-- writes happen via the trigger (security definer context), not from clients.

-- Append a prediction-history row whenever a snapshot is written/refreshed.
create or replace function public.log_prediction_snapshot()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into prediction_log (
    user_id, snapshot_kind, afqt_point, afqt_low, afqt_high,
    overall_confidence, attempt_count, generated_at
  ) values (
    new.user_id, new.snapshot_kind, new.afqt_point, new.afqt_low, new.afqt_high,
    new.overall_confidence, new.attempt_count, coalesce(new.generated_at, now())
  );
  return new;
end;
$$;

drop trigger if exists trg_log_prediction_snapshot on trajectory_score_snapshots;
create trigger trg_log_prediction_snapshot
  after insert or update on trajectory_score_snapshots
  for each row execute function public.log_prediction_snapshot();

-- =============================================================
-- (5) official_score_calibration — internal prediction-accuracy log
-- =============================================================
create table if not exists official_score_calibration (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references profiles(user_id) on delete cascade,
  real_test_id          uuid not null references real_asvab_tests(id) on delete cascade,
  test_date             date not null,
  exam_kind             text,
  predicted_point       smallint,
  predicted_low         smallint,
  predicted_high        smallint,
  predicted_confidence  text,
  prediction_generated_at timestamptz,
  actual_afqt           smallint,
  actual_in_band        boolean,
  residual              smallint,             -- actual - predicted_point
  days_since_prediction int,
  attempts_at_prediction int,
  created_at            timestamptz not null default now()
);
create index if not exists official_score_calibration_user_idx
  on official_score_calibration (user_id, test_date desc);

alter table official_score_calibration enable row level security;
drop policy if exists "official_score_calibration_select_own" on official_score_calibration;
create policy "official_score_calibration_select_own" on official_score_calibration
  for select using (auth.uid() = user_id);
-- writes happen inside rpc_log_official_test (security definer).

-- =============================================================
-- (3) rpc_log_official_test — single validated write path
-- =============================================================
create or replace function public.rpc_log_official_test(
  p_test_date       date,
  p_exam_kind       text,
  p_test_format     text default 'unknown',
  p_afqt            int default null,
  p_standard_scores jsonb default null,
  p_note            text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid          uuid := auth.uid();
  v_allowed      text[] := array['GS','AR','WK','PC','MK','EI','AS','MC','AO'];
  v_quartet      text[] := array['AR','WK','PC','MK'];
  v_key          text;
  v_val          numeric;
  v_clean        jsonb := '{}'::jsonb;
  v_incomplete   boolean;
  v_test_id      uuid;
  v_pred         record;
  v_in_band      boolean;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- Required + ground-truth validation (reject, never clamp).
  if p_test_date is null then
    raise exception 'test_date is required';
  end if;
  if p_test_date > current_date then
    raise exception 'test_date cannot be in the future';
  end if;
  if p_exam_kind is null or p_exam_kind not in
       ('initial_asvab','afct','confirmation_test','student_asvab') then
    raise exception 'invalid exam_kind';
  end if;
  if p_test_format is not null and p_test_format not in
       ('cat','papt','picat','unknown') then
    raise exception 'invalid test_format';
  end if;
  if p_afqt is not null and (p_afqt < 1 or p_afqt > 99) then
    raise exception 'afqt must be between 1 and 99';
  end if;

  -- Validate + normalize subtest standard scores: allowed keys only, 1..99.
  if p_standard_scores is not null then
    for v_key in select jsonb_object_keys(p_standard_scores) loop
      if not (v_key = any(v_allowed)) then
        raise exception 'unknown subtest key: %', v_key;
      end if;
      v_val := (p_standard_scores ->> v_key)::numeric;
      if v_val is null or v_val < 1 or v_val > 99 then
        raise exception 'subtest % score out of range (1-99)', v_key;
      end if;
      v_clean := v_clean || jsonb_build_object(v_key, v_val::int);
    end loop;
  end if;

  -- Incomplete = missing AFQT or missing any of the AFQT quartet (AR/WK/PC/MK).
  v_incomplete := (p_afqt is null)
    or not (v_clean ? 'AR' and v_clean ? 'WK' and v_clean ? 'PC' and v_clean ? 'MK');

  insert into real_asvab_tests (
    user_id, test_date, test_format, exam_kind, afqt, standard_scores, note, is_incomplete
  ) values (
    v_uid, p_test_date, coalesce(p_test_format,'unknown'), p_exam_kind, p_afqt,
    case when v_clean = '{}'::jsonb then null else v_clean end,
    nullif(btrim(coalesce(p_note,'')), ''),
    v_incomplete
  )
  returning id into v_test_id;

  -- Mark the profile as having logged an official test.
  update profiles
    set official_test_status = 'taken_logged', updated_at = now()
    where user_id = v_uid;

  -- Calibration: compare against the most recent PRE-test prediction (if any).
  if p_afqt is not null then
    select * into v_pred
      from prediction_log
      where user_id = v_uid
        and snapshot_kind = 'current_standing'
        and generated_at < (p_test_date + 1)   -- generated on/before test day
      order by generated_at desc
      limit 1;

    if found then
      v_in_band := (v_pred.afqt_low is not null and v_pred.afqt_high is not null
        and p_afqt between v_pred.afqt_low and v_pred.afqt_high);
      insert into official_score_calibration (
        user_id, real_test_id, test_date, exam_kind,
        predicted_point, predicted_low, predicted_high, predicted_confidence,
        prediction_generated_at, actual_afqt, actual_in_band, residual,
        days_since_prediction, attempts_at_prediction
      ) values (
        v_uid, v_test_id, p_test_date, p_exam_kind,
        v_pred.afqt_point, v_pred.afqt_low, v_pred.afqt_high, v_pred.overall_confidence,
        v_pred.generated_at, p_afqt, v_in_band,
        case when v_pred.afqt_point is not null then p_afqt - v_pred.afqt_point else null end,
        greatest(0, (p_test_date - v_pred.generated_at::date)),
        v_pred.attempt_count
      );
    end if;
  end if;

  return v_test_id;
end;
$$;

grant execute on function public.rpc_log_official_test(date, text, text, int, jsonb, text)
  to authenticated;

commit;
