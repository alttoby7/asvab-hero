-- 0046_official_score_efficacy.sql
-- Operator efficacy on OFFICIAL ASVAB outcomes (ground truth), NOT practice.
--
-- 0036_cohort_measurement.sql measures practice `attempts` deltas (proxy/estimate).
-- This file answers the different, blunter question the operator actually asks:
-- "how much are we moving people's REAL scores?" The endpoint here is always a
-- logged official AFQT (real_asvab_tests), never a practice estimate.
--
-- Two service_role-only functions (also granted to dashboard_export so the
-- personal analytics dashboard can read them over its read-only pool):
--
--   (1) get_official_score_efficacy(p_paying_only) — per-(segment, exam_kind)
--       gain stats. Two SEPARATE segments, never blended into one headline:
--         official_to_official  — earliest official AFQT -> latest official AFQT.
--                                 The real, ground-truth-on-both-ends headline.
--         diagnostic_to_official— earliest practice diagnostic afqt_estimate
--                                 (strictly BEFORE the latest official date)
--                                 -> latest official AFQT. Supporting evidence,
--                                 estimated baseline. Only used when the user has
--                                 no prior official (official is prioritized).
--
--   (2) get_official_score_coverage(p_paying_only) — denominators to read the
--       headline honestly (how many users have any official score, and how the
--       paired segments + unpaired break down).
--
-- p_paying_only (default false): when true, restrict to PAYING customers only
--   (converted/off-trial or lifetime; excludes current trialers), reusing the
--   dashboard's canonical "paid" predicate. Lets the operator see lift among the
--   people actually paying us.
--
-- No n<5 suppression: both functions are granted ONLY to service_role +
-- dashboard_export (anon/authenticated revoked), so there is no privacy concern.
-- Every cohort returns its n_users; small-sample honesty is the consumer's job
-- (the script + the dashboard widget always show n and flag n<5 as directional).
--
-- Pairing rules (per user, scoped to users WITH a latest official AFQT):
--   latest   = most recent real_asvab_tests row with afqt not null (ground truth)
--   baseline = earliest PRIOR official AFQT (test_date < latest date)  -> o2o
--              else earliest diagnostic afqt_estimate (completed strictly before
--              the latest official date)                               -> d2o
--              else unpaired (coverage only; excluded from gain stats)

begin;

-- Signature changed (added p_paying_only) vs the prior 0-arg version → drop first.
drop function if exists public.get_official_score_efficacy();
drop function if exists public.get_official_score_coverage();

-- ───────────────────────────────────────────────────────────────────────────
-- (1) get_official_score_efficacy
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.get_official_score_efficacy(
  p_paying_only boolean default false
)
returns table (
  segment             text,    -- 'official_to_official' | 'diagnostic_to_official'
  exam_kind           text,    -- latest official exam_kind, or 'ALL' (per-segment pool)
  n_users             bigint,
  mean_gain           numeric,
  median_gain         numeric,
  pct_improved_5plus  numeric,
  pct_improved_10plus numeric
)
language sql
security definer
set search_path = public
stable
as $$
  with latest_official as (
    select distinct on (r.user_id)
           r.user_id,
           r.afqt      as latest_afqt,
           r.test_date as latest_date,
           r.exam_kind
    from real_asvab_tests r
    join profiles p on p.user_id = r.user_id
    where r.afqt is not null
      and (
        not p_paying_only
        or p.billing_status = 'lifetime'
        or (p.billing_status = 'active'
            and (p.trial_ends_at is null or p.trial_ends_at <= now()))
      )
    order by r.user_id, r.test_date desc, r.created_at desc
  ),
  -- earliest official strictly before the user's latest official date
  prior_official as (
    select distinct on (r.user_id)
           r.user_id,
           r.afqt as base_afqt
    from real_asvab_tests r
    join latest_official lo on lo.user_id = r.user_id
    where r.afqt is not null
      and r.test_date < lo.latest_date
    order by r.user_id, r.test_date asc, r.created_at asc
  ),
  -- earliest practice diagnostic strictly before the latest official date
  diag_baseline as (
    select distinct on (a.user_id)
           a.user_id,
           a.afqt_estimate as base_est
    from attempts a
    join latest_official lo on lo.user_id = a.user_id
    where a.variant_code = 'diagnostic'
      and a.afqt_estimate is not null
      and a.completed_at::date < lo.latest_date
    order by a.user_id, a.completed_at asc
  ),
  paired as (
    select lo.exam_kind,
           case
             when po.user_id is not null then 'official_to_official'
             else 'diagnostic_to_official'
           end as segment,
           case
             when po.user_id is not null then lo.latest_afqt - po.base_afqt
             else lo.latest_afqt - db.base_est
           end as gain
    from latest_official lo
    left join prior_official po on po.user_id = lo.user_id
    left join diag_baseline  db on db.user_id = lo.user_id
    -- official is prioritized; diagnostic baseline only when no prior official
    where po.user_id is not null or db.user_id is not null
  )
  select
    segment,
    coalesce(exam_kind, 'ALL') as exam_kind,
    count(*)::bigint           as n_users,
    round(avg(gain)::numeric, 2) as mean_gain,
    round((percentile_cont(0.5) within group (order by gain))::numeric, 1) as median_gain,
    round(100.0 * count(*) filter (where gain >= 5)  / count(*), 1) as pct_improved_5plus,
    round(100.0 * count(*) filter (where gain >= 10) / count(*), 1) as pct_improved_10plus
  from paired
  -- pool across exam_kind WITHIN a segment only; never across segments (no
  -- estimate/ground-truth blending into a single headline). No n floor: operator
  -- only, consumers label small samples.
  group by grouping sets ((segment, exam_kind), (segment))
  order by segment, coalesce(exam_kind, 'ALL');
$$;

comment on function public.get_official_score_efficacy(boolean) is
  'Operator efficacy on OFFICIAL ASVAB AFQT gains. Two separate segments '
  '(official_to_official headline; diagnostic_to_official estimated-baseline '
  'support), per exam_kind + per-segment pool. p_paying_only restricts to paying '
  'customers (lifetime / active off-trial). No n suppression; consumers label '
  'small samples. Latest endpoint is always a logged official AFQT.';

-- ───────────────────────────────────────────────────────────────────────────
-- (2) get_official_score_coverage — denominators to read the headline honestly.
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.get_official_score_coverage(
  p_paying_only boolean default false
)
returns table (
  n_users_with_official bigint,
  n_official_pairs      bigint,
  n_diag_baseline_pairs bigint,
  n_unpaired            bigint
)
language sql
security definer
set search_path = public
stable
as $$
  with latest_official as (
    select distinct on (r.user_id)
           r.user_id, r.test_date as latest_date
    from real_asvab_tests r
    join profiles p on p.user_id = r.user_id
    where r.afqt is not null
      and (
        not p_paying_only
        or p.billing_status = 'lifetime'
        or (p.billing_status = 'active'
            and (p.trial_ends_at is null or p.trial_ends_at <= now()))
      )
    order by r.user_id, r.test_date desc, r.created_at desc
  ),
  flags as (
    select lo.user_id,
      exists (
        select 1 from real_asvab_tests r
        where r.user_id = lo.user_id and r.afqt is not null
          and r.test_date < lo.latest_date
      ) as has_prior_official,
      exists (
        select 1 from attempts a
        where a.user_id = lo.user_id and a.variant_code = 'diagnostic'
          and a.afqt_estimate is not null
          and a.completed_at::date < lo.latest_date
      ) as has_diag_baseline
    from latest_official lo
  )
  select
    count(*)::bigint,
    count(*) filter (where has_prior_official)::bigint,
    count(*) filter (where not has_prior_official and has_diag_baseline)::bigint,
    count(*) filter (where not has_prior_official and not has_diag_baseline)::bigint
  from flags;
$$;

comment on function public.get_official_score_coverage(boolean) is
  'Denominators for get_official_score_efficacy(): users with any official AFQT, '
  'split into official-paired / diagnostic-baseline-paired / unpaired. '
  'p_paying_only restricts to paying customers.';

-- Grants: service_role + dashboard_export only (operator analytics, never
-- anon/authenticated). Note vs 0036_cohort_measurement.sql: a bare
-- `revoke ... from public` does NOT strip anon/authenticated here, because
-- Supabase grants EXECUTE to those roles explicitly (default privileges) — so
-- 0036's functions remain anon/authenticated-callable at runtime. We revoke
-- from anon + authenticated explicitly so these are genuinely operator-only.
do $$
declare fn text;
begin
  foreach fn in array array[
    'get_official_score_efficacy(boolean)',
    'get_official_score_coverage(boolean)'
  ]
  loop
    execute format('revoke all on function public.%s from public', fn);
    execute format('revoke all on function public.%s from anon', fn);
    execute format('revoke all on function public.%s from authenticated', fn);
    execute format('grant execute on function public.%s to service_role', fn);
    if exists (select 1 from pg_roles where rolname = 'dashboard_export') then
      execute format('grant execute on function public.%s to dashboard_export', fn);
    end if;
  end loop;
end$$;

commit;
