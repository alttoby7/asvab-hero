-- 0032_test_type.sql
-- Test-type-aware prep (Initial ASVAB vs AFCT) + cohort measurement.
--
-- profiles.test_type: which test the user is prepping for. NULL for existing
--   users on purpose — we never silently backfill (keeps cohort measurement
--   honest); they pick it in onboarding/settings.
-- attempts.test_type / primary_metric_code / primary_metric_estimate: snapshot
--   the user's declared mode + their cohort's PRIMARY metric (AFQT for initial;
--   GT for Army/Marines AFCT; G for AF/SF AFCT; AFQT proxy for Navy/CG) at
--   write time, so per-cohort improvement is measurable without overloading
--   afqt_estimate. Generic (code + estimate) so non-GT metrics need no new column.

alter table profiles add column if not exists test_type text
  check (test_type in ('initial_asvab', 'afct'));

alter table attempts add column if not exists test_type text;
alter table attempts add column if not exists primary_metric_code text;   -- AFQT | GT | G
alter table attempts add column if not exists primary_metric_estimate int;
