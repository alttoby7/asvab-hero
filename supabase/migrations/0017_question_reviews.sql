-- =============================================================
-- 0017_question_reviews.sql
-- Spaced Mistake Bank (Closed-Loop v0)
--
-- Every wrong answer becomes an SM-2-scheduled retrieval item, resurfaced
-- until mastered. Ingestion is DB-authoritative: a single AFTER INSERT
-- trigger on `attempts` covers BOTH client write paths (saveAttempt() and
-- DailyChallengeEngine's direct insert), eliminating client drift.
--
-- SM-2 math lives in exactly one home: sm2_next() (faithful port of
-- src/lib/flashcards/scheduler.ts). All question grading flows through the
-- shared apply_question_grade() helper, used by both the ingest trigger and
-- the grade_question_review() RPC (the /app/mistakes review surface).
-- =============================================================

begin;

-- -------------------------------------------------------------
-- Content version stamp on questions
-- Bump when an item's stem/choices/answer is materially rewritten so stale
-- review history is invalidated (see apply_question_grade reset logic).
-- -------------------------------------------------------------
alter table practice_questions
  add column if not exists content_version int not null default 1;

-- -------------------------------------------------------------
-- question_reviews — mirrors flashcard_reviews, keyed on the STABLE
-- external_key (practice_questions.id is a UUID regenerated on re-seed).
-- -------------------------------------------------------------
create table if not exists question_reviews (
  user_id          uuid not null references profiles(user_id) on delete cascade,
  question_id      text not null,             -- external_key, stable across re-seed
  subtest          text not null,
  topic_id         text references topics(id),
  content_version  int  not null default 1,
  ease_factor      numeric(4,2) not null default 2.50,
  interval_days    int  not null default 0,
  repetitions      int  not null default 0,
  due_at           timestamptz not null default now(),
  last_reviewed_at timestamptz,
  last_quality     smallint check (last_quality between 0 and 5),
  lapses           int  not null default 0,   -- times missed after first add
  resolved         boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  primary key (user_id, question_id)
);

create index if not exists question_reviews_due_idx
  on question_reviews(user_id, resolved, due_at);

alter table question_reviews enable row level security;

-- 4 user_id-gated policies, identical to flashcard_reviews.
drop policy if exists "question_reviews_select" on question_reviews;
create policy "question_reviews_select" on question_reviews
  for select using (auth.uid() = user_id);

drop policy if exists "question_reviews_insert" on question_reviews;
create policy "question_reviews_insert" on question_reviews
  for insert with check (auth.uid() = user_id);

drop policy if exists "question_reviews_update" on question_reviews;
create policy "question_reviews_update" on question_reviews
  for update using (auth.uid() = user_id);

drop policy if exists "question_reviews_delete" on question_reviews;
create policy "question_reviews_delete" on question_reviews
  for delete using (auth.uid() = user_id);

-- -------------------------------------------------------------
-- sm2_next() — single source of truth for SM-2 scheduling.
-- Faithful port of src/lib/flashcards/scheduler.ts. Pure/deterministic
-- given inputs => IMMUTABLE. Quality is 0|3|4|5 (again/hard/good/easy);
-- quality < 3 is the lapse path. Accepts smallint 0-5 for forward-compat.
-- -------------------------------------------------------------
create or replace function public.sm2_next(
  p_ease     numeric,
  p_interval int,
  p_reps     int,
  p_quality  smallint,
  p_now      timestamptz,
  out ease_factor   numeric,
  out interval_days int,
  out repetitions   int,
  out due_at        timestamptz
)
language plpgsql immutable
as $$
declare
  min_ease constant numeric := 1.30;
  max_ease constant numeric := 2.70;
  v_factor numeric;
  v_base   numeric;
  v_delta  numeric;
begin
  if p_quality < 3 then
    -- lapse: ease - 0.2 (NOT the success ease formula), reset, due in 10 min
    ease_factor   := least(max_ease, greatest(min_ease, round(p_ease - 0.2, 2)));
    interval_days := 0;
    repetitions   := 0;
    due_at        := p_now + interval '10 minutes';
    return;
  end if;

  if p_reps = 0 then
    interval_days := case when p_quality = 5 then 3 when p_quality = 4 then 1 else 0 end;
    repetitions   := 1;
  elsif p_reps = 1 then
    interval_days := case when p_quality = 5 then 6 when p_quality = 4 then 3 else 1 end;
    repetitions   := 2;
  else
    v_factor := case when p_quality = 5 then p_ease * 1.3
                     when p_quality = 4 then p_ease
                     else p_ease * 0.8 end;
    v_base   := greatest(p_interval, 1);
    interval_days := round(v_base * v_factor)::int;
    repetitions   := p_reps + 1;
  end if;

  -- nextEase: prev + (0.1 - (5-q)*(0.08 + (5-q)*0.02)), clamped
  v_delta     := 0.1 - (5 - p_quality) * (0.08 + (5 - p_quality) * 0.02);
  ease_factor := least(max_ease, greatest(min_ease, round(p_ease + v_delta, 2)));

  if interval_days = 0 then
    due_at := p_now + interval '10 minutes';
  else
    due_at := p_now + make_interval(days => interval_days);
  end if;
end;
$$;

-- -------------------------------------------------------------
-- apply_question_grade() — shared grading core for question_reviews.
-- Used by the ingest trigger AND the review-surface RPC so the bank logic
-- (0->3->4 ladder, lapses, multi-day graduation, content-version reset)
-- lives in one place. SECURITY DEFINER: writes regardless of RLS.
--
-- p_subtest/p_topic may be null (review path) -> derived from the question.
-- p_correct=false  -> miss (quality 0). Only banks a miss; never banks a
--                      first-time-correct (returns early if no row exists).
-- p_correct=true   -> advances an already-banked, unresolved row.
-- -------------------------------------------------------------
create or replace function public.apply_question_grade(
  p_user_id     uuid,
  p_question_id text,
  p_subtest     text,
  p_topic_id    text,
  p_correct     boolean,
  p_now         timestamptz default now()
)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_row        question_reviews%rowtype;
  v_exists     boolean;
  v_version    int;
  v_q_subtest  text;
  v_q_topic    text;
  v_subtest    text;
  v_topic      text;
  -- input state fed to sm2_next
  v_in_ease    numeric;
  v_in_int     int;
  v_in_reps    int;
  v_quality    smallint;
  v_lapses     int;
  -- output
  v_ease       numeric;
  v_int        int;
  v_reps       int;
  v_due        timestamptz;
  v_resolved   boolean;
begin
  -- Current question metadata (may be absent if external_key not in bank).
  select content_version, subtest, topic_id
    into v_version, v_q_subtest, v_q_topic
    from practice_questions
   where external_key = p_question_id
   limit 1;
  v_version := coalesce(v_version, 1);
  v_subtest := coalesce(p_subtest, v_q_subtest, 'NA');
  v_topic   := coalesce(p_topic_id, v_q_topic);

  select * into v_row
    from question_reviews
   where user_id = p_user_id and question_id = p_question_id;
  v_exists := found;

  -- Decide the starting state + quality.
  if not v_exists then
    if p_correct then
      return;  -- only bank misses; nothing to advance
    end if;
    v_in_ease := 2.50; v_in_int := 0; v_in_reps := 0;  -- defaultReviewState
    v_quality := 0;
    v_lapses  := 0;
  else
    -- Content materially changed -> reset history, treat as fresh.
    if v_row.content_version <> v_version then
      v_in_ease := 2.50; v_in_int := 0; v_in_reps := 0;
      v_lapses  := 0;
      if p_correct then
        -- a correct answer on a reset item: re-enter the ladder at hard
        v_quality := 3;
      else
        v_quality := 0;
      end if;
    elsif v_row.resolved and p_correct then
      return;  -- already graduated and answered correctly: no-op
    else
      v_in_ease := v_row.ease_factor;
      v_in_int  := v_row.interval_days;
      v_in_reps := v_row.repetitions;
      if p_correct then
        -- 0->3->4 ladder: first corrected retrieval = hard(3), later = good(4)
        v_quality := case when v_row.repetitions = 0 then 3 else 4 end;
        v_lapses  := v_row.lapses;
      else
        v_quality := 0;
        v_lapses  := v_row.lapses + 1;  -- missed again (or re-opening a graduated item)
      end if;
    end if;
  end if;

  select s.ease_factor, s.interval_days, s.repetitions, s.due_at
    into v_ease, v_int, v_reps, v_due
    from public.sm2_next(v_in_ease, v_in_int, v_in_reps, v_quality, p_now) s;

  -- Graduate only after surviving multi-day spacing.
  v_resolved := (p_correct and v_int >= 8 and v_reps >= 3);

  insert into question_reviews as qr (
    user_id, question_id, subtest, topic_id, content_version,
    ease_factor, interval_days, repetitions, due_at,
    last_reviewed_at, last_quality, lapses, resolved, updated_at
  ) values (
    p_user_id, p_question_id, v_subtest, v_topic, v_version,
    v_ease, v_int, v_reps, v_due,
    p_now, v_quality, v_lapses, v_resolved, p_now
  )
  on conflict (user_id, question_id) do update set
    subtest          = excluded.subtest,
    topic_id         = excluded.topic_id,
    content_version  = excluded.content_version,
    ease_factor      = excluded.ease_factor,
    interval_days    = excluded.interval_days,
    repetitions      = excluded.repetitions,
    due_at           = excluded.due_at,
    last_reviewed_at = excluded.last_reviewed_at,
    last_quality     = excluded.last_quality,
    lapses           = excluded.lapses,
    resolved         = excluded.resolved,
    updated_at       = excluded.updated_at;
end;
$$;

-- -------------------------------------------------------------
-- ingest_attempt_mistakes() — AFTER INSERT trigger on attempts.
-- Single authoritative post-attempt pipeline: banks every miss, advances
-- banked items answered correctly, AND recomputes topic_stats. Covers both
-- write paths because both insert into `attempts`.
-- -------------------------------------------------------------
create or replace function public.ingest_attempt_mistakes()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  v_elem      jsonb;
  v_qid       text;
  v_topic     text;
  v_subtest   text;
  v_selected  int;
  v_correct   int;
  v_is_correct boolean;
  v_topics    text[] := '{}';
begin
  for v_elem in select * from jsonb_array_elements(coalesce(NEW.question_results, '[]'::jsonb)) loop
    v_qid := v_elem->>'question_id';
    continue when v_qid is null;
    v_topic    := v_elem->>'topic_id';
    v_subtest  := upper(split_part(coalesce(v_topic, ''), '.', 1));
    if v_subtest = '' then v_subtest := coalesce(NEW.subtest, 'NA'); end if;
    v_selected := nullif(v_elem->>'selected', '')::int;
    v_correct  := nullif(v_elem->>'correct', '')::int;
    v_is_correct := v_selected is not null and v_selected = v_correct;

    perform public.apply_question_grade(
      NEW.user_id, v_qid, v_subtest, v_topic, v_is_correct, now()
    );

    if v_topic is not null then
      v_topics := array_append(v_topics, v_topic);
    end if;
  end loop;

  -- Fold topic-stats recompute into the same authoritative pipeline.
  if array_length(v_topics, 1) is not null then
    perform public.recompute_topic_stats(
      NEW.user_id,
      (select array_agg(distinct t) from unnest(v_topics) t)
    );
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_attempts_ingest on attempts;
create trigger trg_attempts_ingest
  after insert on attempts
  for each row execute function public.ingest_attempt_mistakes();

-- -------------------------------------------------------------
-- grade_question_review() — RPC for the /app/mistakes review surface.
-- Scoped to the authenticated user; delegates to the shared grading core.
-- -------------------------------------------------------------
create or replace function public.grade_question_review(
  p_question_id text,
  p_correct     boolean
)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;
  perform public.apply_question_grade(v_uid, p_question_id, null, null, p_correct, now());
end;
$$;

grant execute on function public.grade_question_review(text, boolean) to authenticated;

commit;
