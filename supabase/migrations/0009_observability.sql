-- =============================================================
-- ASVAB Hero — Observability + Stripe webhook deadletter
-- Migration: 0009_observability.sql
--
-- Two pieces:
--
-- 1) stripe_webhook_events — durable receipt of every verified Stripe
--    event. Lets us detect replays (status='processed' → 200), retry
--    failed events on Stripe's next redelivery, and reclaim stale
--    'processing' rows after a 5-minute timeout.
--
--    Flow at top of stripe-webhook handler:
--      - SELECT by stripe_event_id
--      - no row → INSERT status='processing', proceed
--      - status='processed' → return 200 immediately
--      - status='failed' → re-enter (incr attempt_count), proceed
--      - status='processing' AND updated_at < now()-5min → reclaim
--      - status='processing' AND fresh → return 200 (concurrent run)
--      - on success → status='processed', set processed_at
--      - on catch → status='failed', set last_error, re-throw 500
--
-- 2) profiles.trial_ending_email_* — idempotency for the
--    customer.subscription.trial_will_end Listmonk reminder. Today this
--    has zero idempotency and could double-send on a Stripe replay.
-- =============================================================

create table public.stripe_webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  livemode boolean not null,
  api_version text,
  stripe_created timestamptz not null,
  payload jsonb not null,
  status text not null check (status in ('processing','processed','failed')),
  attempt_count int not null default 1,
  last_error text,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index stripe_webhook_events_failed_idx
  on public.stripe_webhook_events (event_type, updated_at)
  where status = 'failed';

create index stripe_webhook_events_stale_processing_idx
  on public.stripe_webhook_events (updated_at)
  where status = 'processing';

alter table public.stripe_webhook_events enable row level security;
-- service role bypasses RLS; no policies = denies all anon/authenticated access.

alter table public.profiles
  add column trial_ending_email_sent_at timestamptz,
  add column trial_ending_email_status text,
  add column trial_ending_email_stripe_event_id text;

create index profiles_trial_ending_email_pending_idx
  on public.profiles (user_id)
  where trial_ending_email_sent_at is null;
