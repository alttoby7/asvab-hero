-- =============================================================
-- ASVAB Hero — Welcome email idempotency tracking
-- Migration: 0003_email_tracking.sql
-- =============================================================

alter table profiles
  add column welcome_email_sent_at timestamptz,
  add column welcome_email_resend_id text,
  add column welcome_email_status text;

create index profiles_welcome_email_sent_at_idx
  on profiles(welcome_email_sent_at)
  where welcome_email_sent_at is null;
