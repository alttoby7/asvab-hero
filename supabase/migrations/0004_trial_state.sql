-- =============================================================
-- ASVAB Hero — Trial state tracking (powers TrialBanner countdown)
-- Migration: 0004_trial_state.sql
-- =============================================================

alter table profiles
  add column trial_ends_at timestamptz;

create index profiles_trial_ends_at_idx
  on profiles(trial_ends_at)
  where trial_ends_at is not null;
