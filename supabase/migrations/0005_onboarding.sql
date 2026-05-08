-- =============================================================
-- ASVAB Hero — Onboarding profile fields
-- Migration: 0005_onboarding.sql
--
-- Adds 5 columns to profiles capturing post-checkout onboarding
-- answers (branch, target test date or bucket, weakest subtest)
-- and a completion timestamp used by the /account guard to route
-- new Pro users into the onboarding flow.
-- =============================================================

alter table profiles
  add column branch text
    check (branch in ('army','navy','marines','air_force','space_force','coast_guard','undecided')),
  add column target_test_date date,
  add column target_test_date_bucket text
    check (target_test_date_bucket in ('lt_30','30_90','90_180','gt_180','not_sure')),
  add column self_reported_weakest_subtest text
    check (self_reported_weakest_subtest in ('GS','AR','WK','PC','MK','EI','AS','MC','AO','not_sure')),
  add column onboarding_completed_at timestamptz;

create index profiles_onboarding_pending_idx
  on profiles(user_id)
  where onboarding_completed_at is null;
