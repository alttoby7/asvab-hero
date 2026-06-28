-- =============================================================
-- ASVAB Hero — Initial Schema + RLS + Triggers + Functions
-- Migration: 0001_init.sql
-- =============================================================

create extension if not exists pgcrypto;

-- =============================================================
-- CONTENT TABLES
-- =============================================================

create table topics (
  id text primary key,                     -- e.g. ar.ratio-proportion
  subtest text not null,                   -- AR/WK/PC/MK/GS/EI/AS/MC/AO
  slug text not null,
  title text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  unique (subtest, slug)
);

create table practice_questions (
  id uuid primary key default gen_random_uuid(),
  external_key text not null unique,       -- legacy seed key, e.g. ar-3
  subtest text not null,
  topic_id text not null references topics(id),
  difficulty smallint not null check (difficulty between 1 and 5),
  stem text not null,
  choices jsonb not null,                  -- 4 strings
  correct_index smallint not null check (correct_index between 0 and 3),
  explanation text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index practice_questions_topic_idx on practice_questions(topic_id, active, difficulty);

create table test_variants (
  code text primary key,                   -- diagnostic, subtest_drill, afqt_sprint, ...
  name text not null,
  rules jsonb not null,                    -- length/mix/time
  active boolean not null default true
);

create table flashcard_decks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  topic_id text not null references topics(id),
  title text not null,
  description text,
  active boolean not null default true
);

create table flashcard_cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references flashcard_decks(id) on delete cascade,
  topic_id text not null references topics(id),
  difficulty smallint not null check (difficulty between 1 and 5),
  front text not null,
  back text not null,
  explanation text,
  sort_order int not null default 0,
  active boolean not null default true
);
create index flashcard_cards_deck_idx on flashcard_cards(deck_id, active, sort_order);

-- =============================================================
-- STATE TABLES
-- =============================================================

create table profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  timezone text not null default 'UTC',
  marketing_opt_in boolean not null default false,
  daily_email_opt_in boolean not null default true,
  streak_count int not null default 0,
  last_challenge_completed_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(user_id) on delete cascade,
  client_attempt_id uuid,                  -- offline dedupe
  variant_code text not null references test_variants(code),
  source text not null,                    -- practice | daily_challenge | mini_drill
  subtest text,
  topic_id text references topics(id),
  started_at timestamptz not null,
  completed_at timestamptz not null,
  duration_seconds int not null,
  question_count int not null,
  correct_count int not null,
  afqt_estimate int,
  results_by_subtest jsonb not null,
  results_by_topic jsonb not null,
  question_results jsonb not null,         -- [{question_id, selected, correct, topic_id}]
  synced_from_local boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, client_attempt_id)
);
create index attempts_user_completed_idx on attempts(user_id, completed_at desc);

create table topic_stats (
  user_id uuid not null references profiles(user_id) on delete cascade,
  topic_id text not null references topics(id),
  seen int not null default 0,
  correct int not null default 0,
  posterior numeric(6,4) not null default 0.5000,
  confidence numeric(6,4) not null default 0.0000,
  priority numeric(6,4) not null default 0.0000,
  status text not null default 'unmeasured',  -- unmeasured | weak | developing | strong
  last_seen_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);
create index topic_stats_priority_idx on topic_stats(user_id, priority desc, updated_at desc);

create table flashcard_reviews (
  user_id uuid not null references profiles(user_id) on delete cascade,
  card_id uuid not null references flashcard_cards(id) on delete cascade,
  ease_factor numeric(4,2) not null default 2.50,
  interval_days int not null default 0,
  repetitions int not null default 0,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  last_quality smallint check (last_quality between 0 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);
create index flashcard_reviews_due_idx on flashcard_reviews(user_id, due_at);

create table daily_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(user_id) on delete cascade,
  challenge_date date not null,            -- UTC date
  status text not null default 'ready',    -- ready | completed
  source text not null,                    -- personalized | fallback
  question_ids jsonb not null,
  topic_mix jsonb not null,
  correct_count int,
  question_results jsonb,
  completed_at timestamptz,
  streak_after_completion int,
  created_at timestamptz not null default now(),
  unique (user_id, challenge_date)
);

create table study_guide_progress (
  user_id uuid not null references profiles(user_id) on delete cascade,
  topic_id text not null references topics(id),
  first_viewed_at timestamptz,
  last_viewed_at timestamptz,
  mini_drill_attempts int not null default 0,
  best_mini_drill_pct int,
  last_mini_drill_pct int,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

-- =============================================================
-- ROW LEVEL SECURITY — ENABLE
-- =============================================================

-- State tables
alter table profiles enable row level security;
alter table attempts enable row level security;
alter table topic_stats enable row level security;
alter table flashcard_reviews enable row level security;
alter table daily_challenges enable row level security;
alter table study_guide_progress enable row level security;

-- Content tables
alter table topics enable row level security;
alter table practice_questions enable row level security;
alter table test_variants enable row level security;
alter table flashcard_decks enable row level security;
alter table flashcard_cards enable row level security;

-- =============================================================
-- RLS POLICIES — STATE TABLES (user_id gated)
-- =============================================================

-- profiles
create policy "profiles_select" on profiles
  for select using (auth.uid() = user_id);

create policy "profiles_insert" on profiles
  for insert with check (auth.uid() = user_id);

create policy "profiles_update" on profiles
  for update using (auth.uid() = user_id);

create policy "profiles_delete" on profiles
  for delete using (auth.uid() = user_id);

-- attempts
create policy "attempts_select" on attempts
  for select using (auth.uid() = user_id);

create policy "attempts_insert" on attempts
  for insert with check (auth.uid() = user_id);

create policy "attempts_update" on attempts
  for update using (auth.uid() = user_id);

create policy "attempts_delete" on attempts
  for delete using (auth.uid() = user_id);

-- topic_stats
create policy "topic_stats_select" on topic_stats
  for select using (auth.uid() = user_id);

create policy "topic_stats_insert" on topic_stats
  for insert with check (auth.uid() = user_id);

create policy "topic_stats_update" on topic_stats
  for update using (auth.uid() = user_id);

create policy "topic_stats_delete" on topic_stats
  for delete using (auth.uid() = user_id);

-- flashcard_reviews
create policy "flashcard_reviews_select" on flashcard_reviews
  for select using (auth.uid() = user_id);

create policy "flashcard_reviews_insert" on flashcard_reviews
  for insert with check (auth.uid() = user_id);

create policy "flashcard_reviews_update" on flashcard_reviews
  for update using (auth.uid() = user_id);

create policy "flashcard_reviews_delete" on flashcard_reviews
  for delete using (auth.uid() = user_id);

-- daily_challenges
create policy "daily_challenges_select" on daily_challenges
  for select using (auth.uid() = user_id);

create policy "daily_challenges_insert" on daily_challenges
  for insert with check (auth.uid() = user_id);

create policy "daily_challenges_update" on daily_challenges
  for update using (auth.uid() = user_id);

create policy "daily_challenges_delete" on daily_challenges
  for delete using (auth.uid() = user_id);

-- study_guide_progress
create policy "study_guide_progress_select" on study_guide_progress
  for select using (auth.uid() = user_id);

create policy "study_guide_progress_insert" on study_guide_progress
  for insert with check (auth.uid() = user_id);

create policy "study_guide_progress_update" on study_guide_progress
  for update using (auth.uid() = user_id);

create policy "study_guide_progress_delete" on study_guide_progress
  for delete using (auth.uid() = user_id);

-- =============================================================
-- RLS POLICIES — CONTENT TABLES (public read, active rows only)
-- =============================================================

create policy "topics_select" on topics
  for select to anon, authenticated using (active = true);

create policy "practice_questions_select" on practice_questions
  for select to anon, authenticated using (active = true);

create policy "test_variants_select" on test_variants
  for select to anon, authenticated using (active = true);

create policy "flashcard_decks_select" on flashcard_decks
  for select to anon, authenticated using (active = true);

create policy "flashcard_cards_select" on flashcard_cards
  for select to anon, authenticated using (active = true);

-- =============================================================
-- TRIGGER — AUTO-CREATE PROFILE ON SIGNUP
-- =============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================
-- FUNCTION — recompute_topic_stats
-- Canonical writer for topic_stats; clients never write it directly.
-- Re-derives all fields from attempts.results_by_topic for the
-- given user and topic_ids.
-- =============================================================

create or replace function public.recompute_topic_stats(
  p_user_id uuid,
  p_topic_ids text[]
)
returns void language plpgsql security definer set search_path = public
as $$
declare
  v_topic_id text;
  v_seen     int;
  v_correct  int;
  v_posterior  numeric(6,4);
  v_confidence numeric(6,4);
  v_priority   numeric(6,4);
  v_status     text;
  v_last_seen  timestamptz;
begin
  foreach v_topic_id in array p_topic_ids loop

    -- Aggregate seen + correct across all attempts for this user + topic.
    -- results_by_topic is a JSONB object keyed by topic_id with shape:
    --   { "seen": N, "correct": N }
    -- We also pull the most recent completed_at as last_seen_at.
    select
      coalesce(sum((rbt.value->>'seen')::int),    0),
      coalesce(sum((rbt.value->>'correct')::int), 0),
      max(a.completed_at)
    into
      v_seen,
      v_correct,
      v_last_seen
    from attempts a,
         jsonb_each(a.results_by_topic) as rbt(key, value)
    where a.user_id = p_user_id
      and rbt.key = v_topic_id;

    -- Laplace-smoothed posterior probability of answering correctly.
    v_posterior  := (v_correct + 1.0) / (v_seen + 2.0);

    -- Confidence saturates at seen = 8 questions.
    v_confidence := least(v_seen::numeric / 8.0, 1.0);

    -- Priority: high when posterior is low but confidence is high
    -- (i.e. we're sure it's weak). Approaches 0 for strong/unmeasured.
    v_priority   := (1.0 - v_posterior) * v_confidence;

    -- Status classification.
    v_status :=
      case
        when v_seen < 3                              then 'unmeasured'
        when v_posterior > 0.75 and v_seen >= 5     then 'strong'
        when v_posterior >= 0.55 and v_seen >= 4    then 'developing'
        else                                              'weak'
      end;

    -- Upsert the row.
    insert into topic_stats (
      user_id, topic_id,
      seen, correct,
      posterior, confidence, priority, status,
      last_seen_at, updated_at
    )
    values (
      p_user_id, v_topic_id,
      v_seen, v_correct,
      v_posterior, v_confidence, v_priority, v_status,
      v_last_seen, now()
    )
    on conflict (user_id, topic_id) do update set
      seen         = excluded.seen,
      correct      = excluded.correct,
      posterior    = excluded.posterior,
      confidence   = excluded.confidence,
      priority     = excluded.priority,
      status       = excluded.status,
      last_seen_at = excluded.last_seen_at,
      updated_at   = now();

  end loop;
end;
$$;
