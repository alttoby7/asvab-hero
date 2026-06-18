-- =============================================================
-- ASVAB Hero — Trial-converted welcome email tracking
-- Migration: 0008_trial_converted_email.sql
--
-- Adds columns + index to profiles for the T+1 trial-converted
-- welcome email. Fires from stripe-webhook on invoice.paid where
-- billing_reason = subscription_cycle AND trial_ends_at was set.
--
-- Idempotency: the email helper looks up trial_converted_email_sent_at
-- and skips if non-null. The partial index makes the "find unsent
-- conversions" retry query cheap even at scale.
--
--   trial_converted_email_sent_at    — set when Resend accepts the email
--   trial_converted_email_status     — 'sent' or 'error_<code>'
--   trial_converted_email_resend_id  — Resend message id for audit
--   trial_converted_email_invoice_id — Stripe invoice id that triggered
-- =============================================================

alter table profiles
  add column trial_converted_email_sent_at timestamptz,
  add column trial_converted_email_status text,
  add column trial_converted_email_resend_id text,
  add column trial_converted_email_invoice_id text;

create index profiles_trial_converted_email_pending_idx
  on profiles(user_id)
  where trial_converted_email_sent_at is null;
