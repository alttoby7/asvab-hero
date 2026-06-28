-- 0028_study_cadence_and_study_days.sql
-- Pillar 2 (clarity/adherence) + measurement foundation.
--
-- (1) study_anchor: the implementation-intention anchor captured at onboarding
--     ("after breakfast"). study_days_per_week + preferred_study_time already
--     exist (0022). Implementation intentions improve adherence (the lab-to-field
--     gap the strategy doc identifies).
-- (2) study_days: a DURABLE "study day completed" event — the proof-metric
--     substrate. One row per user per local study date, tagged with the plan
--     version + the loop that triggered it. Lets us later correlate paired-
--     diagnostic AFQT delta against actual dose (study days), not clicks/minutes.

alter table profiles add column if not exists study_anchor text;

create table if not exists study_days (
  user_id      uuid not null references profiles(user_id) on delete cascade,
  study_date   date not null,                 -- user-local calendar day
  plan_version text not null default 'v1',
  trigger      text,                           -- what counted it (e.g. attempt variant/source)
  completed_at timestamptz not null default now(),
  primary key (user_id, study_date)
);

create index if not exists study_days_user_idx on study_days(user_id, study_date desc);

alter table study_days enable row level security;

-- Same 2 user-gated policies pattern as the rest of the per-user tables.
drop policy if exists "study_days_select_own" on study_days;
create policy "study_days_select_own" on study_days
  for select using (auth.uid() = user_id);

drop policy if exists "study_days_insert_own" on study_days;
create policy "study_days_insert_own" on study_days
  for insert with check (auth.uid() = user_id);
