-- =============================================================
-- 0023_daily_prescriptions.sql
-- WS4 — Persist "today's prescription" for stability + analytics.
--
-- The prescription (which AFQT subtest/topic to drill + due mistakes) is
-- computed live by getTrajectoryPrescription() in
-- src/lib/account/next-action.ts. This table caches the first prescription a
-- user is shown on a given day so the "today's plan" is stable across reloads
-- (it shouldn't change mid-day just because the underlying snapshot recomputed)
-- and so we can analyze which prescriptions users actually act on.
--
-- The home surface still computes the prescription live; this table is an
-- optional stabilizer/log. It is user-owned (RLS) and additive — nothing in WS4
-- hard-depends on it (writes are best-effort upserts).
-- =============================================================

begin;

create table if not exists daily_prescriptions (
  user_id           uuid not null references auth.users(id) on delete cascade,
  prescription_date date not null default (now() at time zone 'utc')::date,
  payload           jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  primary key (user_id, prescription_date)
);

create index if not exists daily_prescriptions_user_idx
  on daily_prescriptions(user_id, prescription_date desc);

alter table daily_prescriptions enable row level security;

drop policy if exists "daily_prescriptions_select" on daily_prescriptions;
create policy "daily_prescriptions_select" on daily_prescriptions
  for select using (auth.uid() = user_id);

drop policy if exists "daily_prescriptions_insert" on daily_prescriptions;
create policy "daily_prescriptions_insert" on daily_prescriptions
  for insert with check (auth.uid() = user_id);

-- Update allowed so the same-day row can be refreshed if the user is shown a
-- materially newer prescription (e.g. after completing a diagnostic). The
-- client decides whether to overwrite; RLS just scopes it to the owner.
drop policy if exists "daily_prescriptions_update" on daily_prescriptions;
create policy "daily_prescriptions_update" on daily_prescriptions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "daily_prescriptions_delete" on daily_prescriptions;
create policy "daily_prescriptions_delete" on daily_prescriptions
  for delete using (auth.uid() = user_id);

commit;
