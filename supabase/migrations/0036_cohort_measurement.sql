-- 0036_cohort_measurement.sql
-- S6: per-cohort efficacy + conversion measurement (analysis-only).
--
-- A "cohort" = (test_type, primary_metric_code). Because the engine writes the
-- Navy/CG rating's composite FORMULA as primary_metric_code (e.g. "VE+AR+MK+MC"),
-- grouping by primary_metric_code automatically yields a per-rating panel and
-- NEVER pools ratings together. Initial ASVAB -> 'AFQT'; Army/Marines AFCT ->
-- 'GT'; AF/SF AFCT -> 'G'; Navy/CG AFCT -> the rating formula.
--
-- The metric is attempts.primary_metric_estimate — the cohort's PRIMARY metric
-- (equated-scale proxy for GT/G/rating; AFQT for initial). Pairing is within
-- (user_id, test_type, primary_metric_code) so the metric scale is always
-- self-consistent. test_type IS NULL attempts (pre-0032 / un-onboarded) are
-- excluded so the measurement stays honest.
--
-- Three RPCs, all aggregates-only with n<5 cohort suppression (privacy +
-- defensibility), mirroring get_dose_windowed_afqt_delta() (0029):
--   (1) get_cohort_dose_response()  — proxy delta bucketed by study-day dose
--   (2) get_cohort_efficacy_kpi()   — headline %≥+5 within 30 days
--   (3) get_cohort_conversion()     — free→Pro conversion by cohort

-- Speeds up the repeated cohort scans; partial so it stays small.
create index if not exists attempts_cohort_idx
  on attempts (user_id, test_type, primary_metric_code, completed_at)
  where test_type is not null and primary_metric_estimate is not null;

-- ───────────────────────────────────────────────────────────────────────────
-- (1) Dose-response: paired primary-metric delta (latest − earliest within a
--     cohort) bucketed by study_days logged between the two points. Generalizes
--     get_dose_windowed_afqt_delta() across every (test_type, metric) cohort.
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.get_cohort_dose_response()
returns table (
  test_type           text,
  primary_metric_code text,
  dose_bucket         text,    -- '0' | '1-3' | '4-7' | '8+'
  n_users             bigint,
  mean_delta          numeric,
  stddev_delta        numeric,
  mean_study_days     numeric
)
language sql
security definer
set search_path = public
stable
as $$
  with pts as (
    select user_id, test_type, primary_metric_code,
           primary_metric_estimate as est, completed_at,
           row_number() over (partition by user_id, test_type, primary_metric_code
                              order by completed_at asc)  as rn_first,
           row_number() over (partition by user_id, test_type, primary_metric_code
                              order by completed_at desc) as rn_last
    from attempts
    where test_type is not null
      and primary_metric_code is not null
      and primary_metric_estimate is not null
      and completed_at is not null
  ),
  paired as (
    select f.user_id, f.test_type, f.primary_metric_code,
           f.completed_at as first_at,
           l.completed_at as last_at,
           (l.est - f.est) as delta
    from pts f
    join pts l
      on  l.user_id = f.user_id
      and l.test_type = f.test_type
      and l.primary_metric_code = f.primary_metric_code
      and l.rn_last = 1
    where f.rn_first = 1
      and l.completed_at > f.completed_at
  ),
  dosed as (
    select p.test_type, p.primary_metric_code, p.delta,
           (select count(*) from study_days sd
             where sd.user_id = p.user_id
               and sd.study_date >= p.first_at::date
               and sd.study_date <= p.last_at::date) as study_days
    from paired p
  ),
  bucketed as (
    select test_type, primary_metric_code,
           case
             when study_days = 0 then '0'
             when study_days between 1 and 3 then '1-3'
             when study_days between 4 and 7 then '4-7'
             else '8+'
           end as dose_bucket,
           delta, study_days
    from dosed
  )
  select test_type, primary_metric_code, dose_bucket,
         count(*)::bigint as n_users,
         round(avg(delta)::numeric, 2) as mean_delta,
         round(coalesce(stddev_samp(delta), 0)::numeric, 2) as stddev_delta,
         round(avg(study_days)::numeric, 1) as mean_study_days
  from bucketed
  group by test_type, primary_metric_code, dose_bucket
  having count(*) >= 5
  order by test_type, primary_metric_code, dose_bucket;
$$;

comment on function public.get_cohort_dose_response() is
  'S6 dose-response: paired primary-metric delta bucketed by study_days dose, '
  'segmented by (test_type, primary_metric_code). Aggregates only; n<5 suppressed.';

-- ───────────────────────────────────────────────────────────────────────────
-- (2) Efficacy KPI: per cohort, the % of users who gained ≥5 on their primary
--     metric within 30 days of their first measured attempt. The headline
--     efficacy number (Initial ASVAB %≥+5 AFQT/30d; AFCT %≥+5 GT/G proxy/30d;
--     Navy/CG per-rating proxy, one row per rating formula).
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.get_cohort_efficacy_kpi()
returns table (
  test_type           text,
  primary_metric_code text,
  n_users             bigint,
  n_improved_5plus    bigint,
  pct_improved_5plus  numeric,
  mean_delta          numeric,
  mean_window_days    numeric
)
language sql
security definer
set search_path = public
stable
as $$
  with pts as (
    select user_id, test_type, primary_metric_code,
           primary_metric_estimate as est, completed_at
    from attempts
    where test_type is not null
      and primary_metric_code is not null
      and primary_metric_estimate is not null
      and completed_at is not null
  ),
  firsts as (
    select distinct on (user_id, test_type, primary_metric_code)
           user_id, test_type, primary_metric_code,
           est as first_est, completed_at as first_at
    from pts
    order by user_id, test_type, primary_metric_code, completed_at asc
  ),
  -- latest attempt strictly after the first AND within the 30-day window
  windowed as (
    select f.user_id, f.test_type, f.primary_metric_code,
           f.first_est, f.first_at,
           l.est as last_est, l.completed_at as last_at,
           row_number() over (partition by f.user_id, f.test_type, f.primary_metric_code
                              order by l.completed_at desc) as rn
    from firsts f
    join pts l
      on  l.user_id = f.user_id
      and l.test_type = f.test_type
      and l.primary_metric_code = f.primary_metric_code
      and l.completed_at > f.first_at
      and l.completed_at <= f.first_at + interval '30 days'
  ),
  paired as (
    select test_type, primary_metric_code,
           (last_est - first_est) as delta,
           extract(epoch from (last_at - first_at)) / 86400.0 as window_days
    from windowed
    where rn = 1
  )
  select test_type, primary_metric_code,
         count(*)::bigint as n_users,
         count(*) filter (where delta >= 5)::bigint as n_improved_5plus,
         round(100.0 * count(*) filter (where delta >= 5) / count(*), 1) as pct_improved_5plus,
         round(avg(delta)::numeric, 2) as mean_delta,
         round(avg(window_days)::numeric, 1) as mean_window_days
  from paired
  group by test_type, primary_metric_code
  having count(*) >= 5
  order by test_type, primary_metric_code;
$$;

comment on function public.get_cohort_efficacy_kpi() is
  'S6 efficacy KPI: per (test_type, primary_metric_code) cohort, % of users who '
  'gained ≥5 on their primary metric within 30 days of their first attempt. '
  'Aggregates only; n<5 suppressed. Navy/CG rating formulas stay un-pooled.';

-- ───────────────────────────────────────────────────────────────────────────
-- (3) Conversion: free→Pro rate per cohort. Each user is assigned to the cohort
--     of their MOST RECENT cohort-tagged attempt, then checked against the
--     canonical Pro predicate (matches has_active_pro / 0002_billing).
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.get_cohort_conversion()
returns table (
  test_type           text,
  primary_metric_code text,
  n_users             bigint,
  n_pro               bigint,
  pct_pro             numeric
)
language sql
security definer
set search_path = public
stable
as $$
  with latest_cohort as (
    select distinct on (user_id)
           user_id, test_type, primary_metric_code
    from attempts
    where test_type is not null
      and primary_metric_code is not null
      and completed_at is not null
    order by user_id, completed_at desc
  ),
  joined as (
    select lc.test_type, lc.primary_metric_code, lc.user_id,
           case
             when p.billing_status = 'lifetime'
               or (p.billing_status = 'active'
                   and (p.pro_until is null or p.pro_until > now()))
             then 1 else 0
           end as is_pro
    from latest_cohort lc
    join profiles p on p.user_id = lc.user_id
  )
  select test_type, primary_metric_code,
         count(*)::bigint as n_users,
         sum(is_pro)::bigint as n_pro,
         round(100.0 * sum(is_pro) / count(*), 1) as pct_pro
  from joined
  group by test_type, primary_metric_code
  having count(*) >= 5
  order by test_type, primary_metric_code;
$$;

comment on function public.get_cohort_conversion() is
  'S6 conversion: free→Pro rate per (test_type, primary_metric_code) cohort '
  '(user bucketed by most-recent cohort-tagged attempt). n<5 suppressed.';

-- Grants: service_role + dashboard_export only (no anon/authenticated — these
-- are operator analytics, not user-facing).
do $$
declare fn text;
begin
  foreach fn in array array[
    'get_cohort_dose_response()',
    'get_cohort_efficacy_kpi()',
    'get_cohort_conversion()'
  ]
  loop
    execute format('revoke all on function public.%s from public', fn);
    execute format('grant execute on function public.%s to service_role', fn);
    if exists (select 1 from pg_roles where rolname = 'dashboard_export') then
      execute format('grant execute on function public.%s to dashboard_export', fn);
    end if;
  end loop;
end$$;
