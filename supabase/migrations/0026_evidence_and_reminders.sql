-- =============================================================
-- 0026_evidence_and_reminders.sql
--
-- North-star efficacy metric: cohort repeat-diagnostic AFQT delta.
--
-- get_cohort_afqt_delta() returns AGGREGATES ONLY (no PII, no user_ids). For
-- every user with >= 2 completed diagnostic attempts that carry an
-- afqt_estimate, we compute a per-user delta = (latest afqt_estimate -
-- earliest afqt_estimate). We then aggregate n_users / mean_delta /
-- stddev_delta overall, and grouped by signup_source and by branch.
--
-- Privacy guard: any group with fewer than MIN_COHORT (5) qualifying users is
-- suppressed entirely (not emitted), so no small-cell group can be re-identified.
--
-- This powers the (currently hidden) "Measured results" Tier B section on
-- /the-science once the sample is defensible (n >= 30 paired diagnostics).
--
-- Also: a COMMENTED pg_cron activation block for the mistake-reminders
-- function, mirroring 0019. It is NOT enabled here — the integrator runs it at
-- launch, after the function is deployed and the closed-loop UI flag is live.
-- =============================================================

-- Minimum qualifying users per emitted group (k-anonymity style suppression).
-- Inlined as a literal (5) below; documented here for the reader.

create or replace function public.get_cohort_afqt_delta()
returns table (
  group_kind   text,   -- 'overall' | 'signup_source' | 'branch'
  group_value  text,   -- null for overall; the dimension value otherwise
  n_users      bigint,
  mean_delta   numeric,
  stddev_delta numeric
)
language sql
security definer
set search_path = public
stable
as $$
  -- Per-user AFQT delta across their first and most-recent diagnostic.
  with diag as (
    select
      a.user_id,
      a.afqt_estimate,
      a.completed_at,
      a.id
    from attempts a
    where a.variant_code = 'diagnostic'
      and a.afqt_estimate is not null
  ),
  ranked as (
    -- id is a stable tiebreaker so first/last stay deterministic on ties.
    select
      user_id,
      afqt_estimate,
      row_number() over (partition by user_id order by completed_at asc,  id asc) as rn_first,
      row_number() over (partition by user_id order by completed_at desc, id desc) as rn_last,
      count(*)    over (partition by user_id) as diag_count
    from diag
  ),
  per_user as (
    select
      f.user_id,
      l.afqt_estimate - f.afqt_estimate as delta
    from (select user_id, afqt_estimate from ranked where rn_first = 1 and diag_count >= 2) f
    join (select user_id, afqt_estimate from ranked where rn_last  = 1) l
      using (user_id)
  ),
  enriched as (
    select
      pu.user_id,
      pu.delta,
      p.signup_source,
      p.branch
    from per_user pu
    join profiles p using (user_id)
  )
  -- Overall
  select
    'overall'::text  as group_kind,
    null::text       as group_value,
    count(*)::bigint as n_users,
    round(avg(delta)::numeric, 2)             as mean_delta,
    round(coalesce(stddev_samp(delta), 0)::numeric, 2) as stddev_delta
  from enriched
  having count(*) >= 5

  union all

  -- By signup_source (suppress small cells)
  select
    'signup_source'::text,
    coalesce(signup_source, '(unknown)'),
    count(*)::bigint,
    round(avg(delta)::numeric, 2),
    round(coalesce(stddev_samp(delta), 0)::numeric, 2)
  from enriched
  group by signup_source
  having count(*) >= 5

  union all

  -- By branch (suppress small cells)
  select
    'branch'::text,
    coalesce(branch, '(unknown)'),
    count(*)::bigint,
    round(avg(delta)::numeric, 2),
    round(coalesce(stddev_samp(delta), 0)::numeric, 2)
  from enriched
  group by branch
  having count(*) >= 5;
$$;

comment on function public.get_cohort_afqt_delta() is
  'North-star efficacy metric. Aggregates only (no PII). Per-user AFQT delta '
  '(latest - earliest diagnostic afqt_estimate) for users with >=2 diagnostics, '
  'rolled up overall and by signup_source/branch. Groups with n<5 are suppressed.';

-- Service role + dashboard export read it; no anon/authenticated grant (PII-adjacent source).
revoke all on function public.get_cohort_afqt_delta() from public;
grant execute on function public.get_cohort_afqt_delta() to service_role;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'dashboard_export') then
    grant execute on function public.get_cohort_afqt_delta() to dashboard_export;
  end if;
end$$;


-- -------------------------------------------------------------
-- ACTIVATION (mistake-reminders cron) — DO NOT UNCOMMENT HERE.
-- Run manually at launch, after the function is deployed and the closed-loop
-- flag (NEXT_PUBLIC_CLOSED_LOOP_ENABLED) is on. Mirrors 0019.
--
--   create extension if not exists pg_cron;
--   create extension if not exists pg_net;
--
--   select cron.schedule(
--     'mistake-reminders-daily',
--     '0 14 * * *',                       -- 14:00 UTC daily (align w/ existing drip)
--     $$
--       select net.http_post(
--         url     := 'https://abypyprvgvofzrtifgzi.supabase.co/functions/v1/mistake-reminders',
--         headers := jsonb_build_object(
--                      'Content-Type', 'application/json',
--                      'x-cron-secret', current_setting('app.mistake_reminders_secret', true)
--                    ),
--         body    := '{}'::jsonb
--       );
--     $$
--   );
--
-- Deploy the function + set secrets first:
--   supabase functions deploy mistake-reminders --no-verify-jwt
--   supabase secrets set ASVAB_RESEND_API_KEY=... MISTAKE_REMINDERS_SECRET=...
-- -------------------------------------------------------------
