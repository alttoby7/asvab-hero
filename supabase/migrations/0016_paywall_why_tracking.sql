-- =============================================================
-- ASVAB Hero — Paywall "why-tracking": events + feedback
-- Migration: 0016_paywall_why_tracking.sql
--
-- NOTE ON NUMBERING: spec called this 0015, but a 0015
-- (dashboard_export_webhook_events) was already applied to the live DB
-- in a separate session and never committed to the repo. To avoid a
-- migration-version collision this ships as 0016.
--
-- analytics_events  — append-only behavioural event stream, written
--                     ONLY by functions/api/events.ts (service role).
-- feedback_responses — one-tap survey answers, written ONLY by
--                     functions/api/feedback.ts (service role).
--
-- Both tables: RLS enabled, NO anon/authenticated policies. Service role
-- bypasses RLS (same model as stripe_webhook_events, 0009_observability.sql).
-- No emails, no free-text PII by default (see CHECK + app-layer stripping).
-- Read-only SELECT granted to dashboard_export so the §9 analysis queries
-- can run without service-role credentials.
-- =============================================================

-- ---------- analytics_events ----------
create table public.analytics_events (
  id              uuid primary key default gen_random_uuid(),
  event_name      text not null,                 -- enum-validated in app layer (§3.2)
  session_id      uuid not null,                 -- client-minted, see §4.1
  paywall_context_id uuid,                       -- the linchpin; null for non-paywall events
  user_id         uuid references auth.users(id) on delete cascade, -- null when anon
  auth_state      text not null check (auth_state in ('anon','free','trial','pro')),
  -- denormalised context, only meaningful on paywall_viewed but cheap to carry:
  entry_surface   text,                          -- 'practice_test' | 'free_practice_test' | 'afct' | ...
  variant         text,                          -- diagnostic | subtest_drill | afqt_sprint | ...
  subtest         text,                          -- AR/WK/... or null
  attempt_id      uuid references public.attempts(id) on delete set null, -- ties to scored attempt (§3.3)
  probable_reason_category text,                 -- classifier output (§3.4), set on paywall_viewed
  props           jsonb not null default '{}'::jsonb, -- bounded, PII-stripped extra fields
  client_ts       timestamptz,                   -- event time per client clock
  received_at     timestamptz not null default now(),
  -- defence-in-depth: forbid an emailish value sneaking into props as a top-level key
  constraint analytics_events_no_email_prop check (not (props ? 'email'))
);

create index analytics_events_pcid_idx
  on public.analytics_events (paywall_context_id, client_ts)
  where paywall_context_id is not null;
create index analytics_events_session_idx
  on public.analytics_events (session_id, received_at);
create index analytics_events_name_received_idx
  on public.analytics_events (event_name, received_at);
create index analytics_events_reason_surface_idx
  on public.analytics_events (probable_reason_category, entry_surface)
  where event_name = 'paywall_viewed';

alter table public.analytics_events enable row level security;
-- no policies → only service role (functions) can read/write.

-- ---------- feedback_responses ----------
create table public.feedback_responses (
  id              uuid primary key default gen_random_uuid(),
  paywall_context_id uuid,                       -- joins back to the journey; null for churn-email w/o pcid
  session_id      uuid,                          -- present for in-app surveys
  user_id         uuid references auth.users(id) on delete cascade, -- null when anon
  trigger         text not null check (trigger in ('paywall_exit','checkout_cancelled','churn_email')),
  question_key    text not null,                 -- 'primary_reason' | 'price_sentiment' | ...
  answer_key      text not null,                 -- enumerated one-tap option key (§7.3)
  -- optional free text is OFF by default; if ever enabled it is opt-in + length-capped + scrubbed:
  free_text       text check (free_text is null or char_length(free_text) <= 280),
  auth_state      text check (auth_state in ('anon','free','trial','pro')),
  client_ts       timestamptz,
  received_at     timestamptz not null default now(),
  -- one survey answer per (context, question) — enforces "once per paywall_context_id"
  unique (paywall_context_id, question_key)
);

create index feedback_responses_trigger_idx
  on public.feedback_responses (trigger, received_at);
create index feedback_responses_answer_idx
  on public.feedback_responses (question_key, answer_key);
create index feedback_responses_pcid_idx
  on public.feedback_responses (paywall_context_id)
  where paywall_context_id is not null;

alter table public.feedback_responses enable row level security;
-- no policies → service role only.

-- ---------- read-only analytics access for the dashboard role ----------
-- dashboard_export already exists (0015 dashboard_export_webhook_events). Grant
-- it SELECT so the §9 read-it-after-a-week queries run without service-role.
grant select on public.analytics_events to dashboard_export;
grant select on public.feedback_responses to dashboard_export;
