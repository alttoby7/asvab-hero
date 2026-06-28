-- 0047_daily_sessions.sql
-- The Daily Study Session ("Mission Loop"), the prescribed one-path-per-day
-- centerpiece. For a cram-window student, opening the app should present ONE
-- ordered path (warm-up -> micro-lesson -> drill -> timed block -> debrief),
-- not a menu. This migration adds the durable spine for that loop.
--
-- Design notes:
--  * study_sessions is UI/session STATE, not learning state. The authoritative
--    learning pipeline is untouched: drill/timed stations still write through
--    the existing `attempts` insert (-> trg_attempts_ingest banks mistakes +
--    recomputes topic_stats) and grading flows through grade_question_review.
--    So this needs no server-side algorithm and no SECURITY DEFINER RPC, the
--    client owns its own rows directly under RLS (same shape as study_days,
--    topic_stats, question_reviews row ownership).
--  * One session per user per local calendar day (unique user_id, session_date).
--  * session_error_tags is the genuinely new SIGNAL the debrief captures:
--    per-missed-item error taxonomy + confidence. Phase 2 (Lever D) extends the
--    same taxonomy into question_reviews prioritization; this table is the
--    session-scoped capture surface that feeds it.

begin;

-- ── The session spine ───────────────────────────────────────────────────────
create table if not exists study_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references profiles(user_id) on delete cascade,
  session_date     date not null,                 -- user-local calendar day
  plan             jsonb not null,                -- frozen ordered stations (SessionStation[])
  current_station  int not null default 0,        -- index into plan.stations
  state            jsonb not null default '{}'::jsonb, -- per-station progress (attempt ids, completion)
  status           text not null default 'in_progress'
                     check (status in ('in_progress','completed','abandoned')),
  tier_at_start    text check (tier_at_start in ('free','pro')),
  metric           text,                          -- 'AFQT' | 'GT' | 'General (G)'
  scheduled_next_for date,                         -- the next study day this loop scheduled
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (user_id, session_date)
);

create index if not exists study_sessions_user_idx
  on study_sessions(user_id, session_date desc);

alter table study_sessions enable row level security;

-- Per-user owned rows: the client manages its own session state under RLS.
drop policy if exists "study_sessions_select_own" on study_sessions;
create policy "study_sessions_select_own" on study_sessions
  for select using (auth.uid() = user_id);

drop policy if exists "study_sessions_insert_own" on study_sessions;
create policy "study_sessions_insert_own" on study_sessions
  for insert with check (auth.uid() = user_id);

drop policy if exists "study_sessions_update_own" on study_sessions;
create policy "study_sessions_update_own" on study_sessions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "study_sessions_delete_own" on study_sessions;
create policy "study_sessions_delete_own" on study_sessions
  for delete using (auth.uid() = user_id);

-- Keep updated_at honest without requiring the client to set it.
create or replace function public.touch_study_sessions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_study_sessions_touch on study_sessions;
create trigger trg_study_sessions_touch
  before update on study_sessions
  for each row execute function public.touch_study_sessions_updated_at();

-- ── Debrief signal: error taxonomy + confidence per missed item ──────────────
create table if not exists session_error_tags (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(user_id) on delete cascade,
  session_id   uuid references study_sessions(id) on delete cascade,
  question_id  text not null,                     -- external_key
  subtest      text,
  topic_id     text,
  error_tag    text check (error_tag in ('concept','setup','careless','time')),
  confidence   text check (confidence in ('sure','unsure')),
  created_at   timestamptz not null default now()
);

create index if not exists session_error_tags_user_idx
  on session_error_tags(user_id, created_at desc);
create index if not exists session_error_tags_session_idx
  on session_error_tags(session_id);

alter table session_error_tags enable row level security;

drop policy if exists "session_error_tags_select_own" on session_error_tags;
create policy "session_error_tags_select_own" on session_error_tags
  for select using (auth.uid() = user_id);

drop policy if exists "session_error_tags_insert_own" on session_error_tags;
create policy "session_error_tags_insert_own" on session_error_tags
  for insert with check (auth.uid() = user_id);

commit;
