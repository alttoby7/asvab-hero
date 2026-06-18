-- 0029_full_sim_and_dose_proof.sql
-- Phase 3: timed readiness + proof instrumentation.
--
-- (1) Activate the full-length simulation. It was seeded inactive ("v3 only —
--     requires ~250-350 question bank"); the bank is now 1,577 active, so the
--     gate is met. Give it an explicit 9-subtest mix (the object-mix branch in
--     sampler.ts handles it with no code change) approximating the CAT-ASVAB
--     scored-question distribution (144 Q). Paid-gated (paid gates sims); the
--     plan paces it to a weekly final-stretch rehearsal.
-- (2) get_dose_windowed_afqt_delta(): the proof metric — correlates actual dose
--     (study_days between a user's first and latest diagnostic) with paired-
--     diagnostic AFQT delta, so we can show a dose-response when the sample is
--     real. Aggregates only; n<5 buckets suppressed.

update test_variants
set active = true,
    rules = '{
      "length": 144,
      "time_seconds": 9000,
      "mix": {"GS":16,"AR":16,"WK":16,"PC":11,"MK":16,"EI":16,"AS":11,"MC":16,"AO":16},
      "afqt_eligible": true,
      "subtest_locked": null,
      "note": "Full-length ASVAB simulation — final-stretch weekly rehearsal."
    }'::jsonb
where code = 'full_sim';

-- Aggregates only (no PII). Per-user AFQT delta (latest - earliest diagnostic
-- afqt_estimate) for users with >=2 diagnostics, bucketed by how many study_days
-- they logged between those two diagnostics. n<5 buckets are suppressed.
create or replace function public.get_dose_windowed_afqt_delta()
returns table (
  dose_bucket     text,    -- '0' | '1-3' | '4-7' | '8+'
  n_users         bigint,
  mean_delta      numeric,
  stddev_delta    numeric,
  mean_study_days numeric
)
language sql
security definer
set search_path = public
stable
as $$
  with diags as (
    select user_id, afqt_estimate, completed_at,
           row_number() over (partition by user_id order by completed_at asc)  as rn_first,
           row_number() over (partition by user_id order by completed_at desc) as rn_last
    from attempts
    where variant_code = 'diagnostic' and afqt_estimate is not null
  ),
  paired as (
    select f.user_id,
           f.completed_at as first_at,
           l.completed_at as last_at,
           (l.afqt_estimate - f.afqt_estimate) as delta
    from diags f
    join diags l on l.user_id = f.user_id and l.rn_last = 1
    where f.rn_first = 1 and l.completed_at > f.completed_at
  ),
  dosed as (
    select p.user_id, p.delta,
           (select count(*) from study_days sd
             where sd.user_id = p.user_id
               and sd.study_date >= p.first_at::date
               and sd.study_date <= p.last_at::date) as study_days
    from paired p
  ),
  bucketed as (
    select case
             when study_days = 0 then '0'
             when study_days between 1 and 3 then '1-3'
             when study_days between 4 and 7 then '4-7'
             else '8+'
           end as dose_bucket,
           delta, study_days
    from dosed
  )
  select dose_bucket,
         count(*)::bigint as n_users,
         round(avg(delta)::numeric, 2) as mean_delta,
         round(coalesce(stddev_samp(delta), 0)::numeric, 2) as stddev_delta,
         round(avg(study_days)::numeric, 1) as mean_study_days
  from bucketed
  group by dose_bucket
  having count(*) >= 5
  order by dose_bucket;
$$;

comment on function public.get_dose_windowed_afqt_delta() is
  'Proof metric: paired-diagnostic AFQT delta bucketed by study_days dose between '
  'the two diagnostics. Aggregates only; n<5 buckets suppressed. Powers a dose-'
  'response view once the sample is defensible.';

revoke all on function public.get_dose_windowed_afqt_delta() from public;
grant execute on function public.get_dose_windowed_afqt_delta() to service_role;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'dashboard_export') then
    grant execute on function public.get_dose_windowed_afqt_delta() to dashboard_export;
  end if;
end$$;
