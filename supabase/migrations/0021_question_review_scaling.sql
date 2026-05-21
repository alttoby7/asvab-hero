-- =============================================================
-- 0021_question_review_scaling.sql
-- Difficulty-aware interval scaling for the Spaced Mistake Bank — SHADOW MODE.
--
-- The proven SM-2 core (sm2_next, defined in 0017) stays UNCHANGED. This
-- migration layers a bounded difficulty-aware multiplier ON TOP of the value
-- sm2_next produces, but writes the scaled schedule to SHADOW COLUMNS ONLY.
-- The live interval_days / due_at / resolved columns continue to carry the
-- exact, unmodified sm2_next output. Nothing about the live due-queue changes.
--
-- WHY shadow first: scaling is an experiment riding on top of a load-bearing
-- scheduler. We record what the difficulty-aware schedule WOULD have been so we
-- can validate (no due-queue pathology, sane interval distribution) on real
-- data before any flag flips live scheduling onto the shadow values.
--
-- STABILITY BOUNDARY (non-negotiable): scaling is applied ONLY on a successful
-- (p_correct) multi-day interval (interval_days >= 2). The lapse path
-- (quality 0) and the early 0->3->4 ladder (interval_days 0/1) are NEVER
-- touched — they keep the shadow columns null, exactly mirroring the live path.
--
-- Depends on 0020_item_calibration.sql (question_calibrations.shrunk_difficulty,
-- n_firstseen). Apply AFTER 0017/0018/0019/0020.
-- =============================================================

begin;

-- -------------------------------------------------------------
-- (1) Shadow columns on question_reviews.
-- These record the difficulty-scaled schedule WITHOUT affecting the live
-- interval_days/due_at. Null whenever scaling does not apply (lapses,
-- non-multi-day successes, cold-start items).
-- -------------------------------------------------------------
alter table question_reviews
  add column if not exists shadow_interval_days  int;
alter table question_reviews
  add column if not exists shadow_due_at         timestamptz;
alter table question_reviews
  add column if not exists shadow_scaling_version text;

-- -------------------------------------------------------------
-- (2) calc_difficulty_scale() — bounded difficulty -> interval multiplier.
--
-- Reads question_calibrations.shrunk_difficulty (author's 1-5 hardness scale,
-- higher = harder) and n_firstseen for the item version. Returns a multiplier
-- in [0.85, 1.15] applied to a successful multi-day SM-2 interval.
--
-- COLD-START GATE: if there is no calibration row, or n_firstseen < 60 (the
-- same full-effect gate WS1 uses in recompute_item_calibrations), we return
-- exactly 1.0 (no scaling). Below the gate shrunk_difficulty is dominated by
-- the author prior and is not yet trustworthy as a per-item signal, so we
-- decline to move the schedule at all.
--
-- MAPPING (documented):
--   Anchor difficulty 3.0 (medium) -> multiplier 1.0 (no change).
--   HARDER than typical (difficulty > 3) -> multiplier < 1.0 -> item returns
--     SOONER (a hard item the learner just got right is still fragile; pull it
--     back into view earlier so the success is consolidated before it decays).
--   EASIER than typical (difficulty < 3) -> multiplier > 1.0 -> item returns
--     LATER (an easy item answered correctly is well-retained; let it ride
--     longer to spend review budget on harder material).
--
--   Linear in difficulty around the 3.0 anchor:
--     scale = 1.0 - (shrunk_difficulty - 3.0) * SLOPE
--   with SLOPE = 0.075 per difficulty point. At the extremes of the 1-5 scale:
--     difficulty 5 (hardest): 1.0 - (2.0 * 0.075) = 0.85  (15% sooner)
--     difficulty 1 (easiest): 1.0 - (-2.0 * 0.075) = 1.15 (15% later)
--   The result is hard-clamped to [0.85, 1.15] for defense in depth even though
--   the 1-5 input domain already lands inside the band.
-- -------------------------------------------------------------
create or replace function public.calc_difficulty_scale(
  p_question_id    text,
  p_content_version int
)
returns numeric
language plpgsql stable security definer set search_path = public
as $$
declare
  v_diff      numeric;
  v_n         int;
  v_full_gate constant int     := 60;     -- mirrors WS1 recompute full-effect gate
  v_anchor    constant numeric := 3.0;    -- medium difficulty = no scaling
  v_slope     constant numeric := 0.075;  -- multiplier change per difficulty point
  v_scale     numeric;
begin
  select shrunk_difficulty, n_firstseen
    into v_diff, v_n
    from question_calibrations
   where question_id = p_question_id
     and content_version = p_content_version
   limit 1;

  -- No calibration row, or below the full-effect confidence gate: no scaling.
  if v_diff is null or v_n is null or v_n < v_full_gate then
    return 1.0;
  end if;

  -- Harder -> sooner (scale < 1), easier -> later (scale > 1).
  v_scale := 1.0 - (v_diff - v_anchor) * v_slope;

  -- Hard clamp to the agreed band.
  v_scale := least(1.15, greatest(0.85, v_scale));
  return round(v_scale, 4);
end;
$$;

-- -------------------------------------------------------------
-- (3) apply_question_grade() — RE-CREATED from the 0017 definition, byte-for-
-- byte in every live path, with ONE addition: after sm2_next returns, if this
-- was a successful (p_correct) multi-day interval (interval_days >= 2), compute
-- the difficulty scale and write the scaled schedule to the SHADOW columns.
--
-- The live ease_factor / interval_days / repetitions / due_at / resolved are
-- whatever sm2_next produced — identical to 0017. The lapse path and the
-- non-multi-day success path leave the shadow columns null.
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
  -- shadow (difficulty-aware) schedule — null unless multi-day success
  v_scale         numeric;
  v_shadow_int    int;
  v_shadow_due    timestamptz;
  v_shadow_ver    text;
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

  -- -----------------------------------------------------------
  -- SHADOW SCALING (0021 addition). Only on a successful multi-day interval.
  -- Never on lapses (p_correct false) and never on the 0->3->4 ladder's
  -- sub-2-day intervals. The live schedule above is untouched.
  -- -----------------------------------------------------------
  v_shadow_int := null;
  v_shadow_due := null;
  v_shadow_ver := null;
  if p_correct and v_int >= 2 then
    v_scale := public.calc_difficulty_scale(p_question_id, v_version);
    -- round() so the shadow interval stays a whole number of days; at least 1.
    v_shadow_int := greatest(1, round(v_int * v_scale)::int);
    v_shadow_due := p_now + make_interval(days => v_shadow_int);
    v_shadow_ver := 'v1';
  end if;

  insert into question_reviews as qr (
    user_id, question_id, subtest, topic_id, content_version,
    ease_factor, interval_days, repetitions, due_at,
    last_reviewed_at, last_quality, lapses, resolved, updated_at,
    shadow_interval_days, shadow_due_at, shadow_scaling_version
  ) values (
    p_user_id, p_question_id, v_subtest, v_topic, v_version,
    v_ease, v_int, v_reps, v_due,
    p_now, v_quality, v_lapses, v_resolved, p_now,
    v_shadow_int, v_shadow_due, v_shadow_ver
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
    updated_at       = excluded.updated_at,
    -- Shadow columns track the latest grade: set on multi-day success, and
    -- explicitly cleared (null) on lapses / non-multi-day successes so they
    -- never carry a stale scaled schedule into a live state that has none.
    shadow_interval_days   = excluded.shadow_interval_days,
    shadow_due_at          = excluded.shadow_due_at,
    shadow_scaling_version = excluded.shadow_scaling_version;
end;
$$;

-- -------------------------------------------------------------
-- (4) ACTIVATION PLAN (future, not in this migration).
--
-- Today the live scheduler reads interval_days/due_at (pure sm2_next). The
-- shadow_* columns are write-only telemetry. To activate difficulty-aware
-- scheduling later, once shadow data shows no due-queue pathology
-- (no due-date pile-ups, sane interval distribution, no regression in
-- corrected-mistake retention):
--
--   1. Add a server-side flag (e.g. an app_config row or env-driven setting)
--      gating which schedule the due-queue reads.
--   2. Flip apply_question_grade to set the LIVE interval_days/due_at from the
--      scaled values on the multi-day success path (the math already lives in
--      this function), keeping the lapse path and 0->3->4 ladder unscaled.
--   3. Update getDueMistakes() ordering only if the read source changes; the
--      client already reads interval_days/due_at, so a DB-side cutover is
--      transparent to the client.
--
-- Until then the live schedule is byte-identical to the proven SM-2 core.
-- -------------------------------------------------------------

commit;
