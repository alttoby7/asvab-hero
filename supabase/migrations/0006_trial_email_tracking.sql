-- =============================================================
-- ASVAB Hero — Trial drip email tracking
-- Migration: 0006_trial_email_tracking.sql
--
-- Adds 2 timestamp columns to profiles for the lean trial drip
-- (Phase 3 of trial-experience plan). Cron-driven script
-- /root/scripts/asvab_drip_trial.py uses these as idempotency
-- guards so each user receives each email at most once.
--
--   trial_day2_email_sent_at    — set when day-2 activation
--                                  nudge is delivered to Resend
--   milestone_50q_email_sent_at — set when 50-question milestone
--                                  email is delivered to Resend
--
-- Both nullable, no default. No index needed; the day-2 query
-- already filters on profiles_trial_ends_at_idx (0004).
-- =============================================================

alter table profiles
  add column trial_day2_email_sent_at timestamptz,
  add column milestone_50q_email_sent_at timestamptz;
