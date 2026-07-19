-- =============================================================
-- ASVAB Hero — Multi-touch dunning sequence + cancellation win-back
-- Migration: 0053_dunning_sequence.sql
--
-- WHY: The original dunning path (0011_payment_failed_emails) keyed send
-- idempotency on invoice_id (PK). Stripe Smart Retries fires 3-4
-- invoice.payment_failed events per failed renewal — distinct event IDs, SAME
-- invoice.id but DIFFERENT attempt_count — so ON CONFLICT (invoice_id) DO
-- NOTHING collapsed the whole retry cycle into a single email. That is only ~1
-- recovery per ~20 monthly failures.
--
-- This migration changes the dunning SEND grain from invoice_id to
-- (invoice_id, attempt_count) via a dedicated `dunning_sends` table, so each
-- retry attempt can send its own escalating email exactly once. `dunning_sends`
-- is inserted with ON CONFLICT (invoice_id, attempt_count) DO NOTHING as the
-- atomic per-attempt claim.
--
-- `payment_failed_emails` is intentionally LEFT AS-IS as the per-INVOICE
-- recovery ledger: invoice.paid still stamps recovered_at keyed on invoice_id,
-- and its unrecovered partial index still works (the webhook stamps that row's
-- sent_at on the first successful dunning send). No changes to existing queries.
--
-- Also adds one-shot win-back email tracking columns to profiles (same shape as
-- the welcome / trial-converted trackers) for the cancellation win-back email
-- sent from customer.subscription.deleted.
-- =============================================================

-- Per-(invoice, attempt) dunning send ledger. Idempotency grain = PK.
create table dunning_sends (
  invoice_id text not null,
  attempt_count int not null,
  user_id uuid not null references profiles(user_id) on delete cascade,
  subscription_id text,
  kind text not null default 'dunning',
  status text,            -- 'sending' | 'sent' | 'error_<code>' | 'error_throw' | 'error_no_recipient'
  resend_id text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (invoice_id, attempt_count)
);

create index dunning_sends_user_idx
  on dunning_sends(user_id, sent_at desc);

-- RLS on, no policies — only the service-role webhook + admin tooling touch it.
alter table dunning_sends enable row level security;

-- One-shot cancellation win-back email tracking on profiles.
-- Mirrors welcome_email_* / trial_converted_email_* (0003, 0008). Idempotency:
-- the send helper atomically claims via winback_email_sent_at / _status.
-- (No partial "pending" index here on purpose: cancellation is rare and there is
-- no backfill retry job, so an index over "sent_at is null" would cover almost
-- every profile row for no benefit.)
alter table profiles
  add column winback_email_sent_at timestamptz,
  add column winback_email_status text,
  add column winback_email_resend_id text;
