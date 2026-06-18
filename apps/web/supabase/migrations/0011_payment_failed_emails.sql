-- =============================================================
-- ASVAB Hero — Payment-failed email ledger
-- Migration: 0011_payment_failed_emails.sql
--
-- Records every invoice.payment_failed event we receive, with
-- per-invoice idempotency via PK on invoice_id. Stripe Smart Retries
-- fires 3-4 payment_failed events per failed renewal (distinct event
-- IDs, same invoice.id) — this ledger ensures we send exactly one
-- dunning email per invoice no matter how many retries arrive.
--
-- Recovery: when invoice.paid arrives for an invoice we previously
-- emailed about, `recovered_at` is stamped so support tooling can
-- distinguish "still dunning" from "card updated, paid."
-- =============================================================

create table payment_failed_emails (
  invoice_id text primary key,
  user_id uuid not null references profiles(user_id) on delete cascade,
  subscription_id text,
  attempt_count int,
  next_payment_attempt_at timestamptz,
  collection_method text,
  billing_reason text,
  sent_at timestamptz,
  status text,            -- 'sending' | 'sent' | 'error_<code>' | 'error_throw' | 'suppressed_collection_method' | 'suppressed_billing_reason'
  resend_id text,
  recovered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payment_failed_emails_user_idx
  on payment_failed_emails(user_id, sent_at desc);

create index payment_failed_emails_unrecovered_idx
  on payment_failed_emails(user_id)
  where recovered_at is null and sent_at is not null;

-- RLS on, no policies — only service-role webhook + admin tooling read/write.
alter table payment_failed_emails enable row level security;
