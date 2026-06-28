-- =============================================================
-- 0020_item_calibration.sql
-- Item-calibration substrate (WS1) — per-item difficulty data for WS2/WS6.
--
-- Calibration must be honest, so it is built on a FIRST-SEEN fact table, not
-- raw attempts: repeated exposures and Mistake-Bank reviews never contaminate
-- difficulty. Calibration is scoped to (question_id = external_key,
-- content_version), ability-adjusted (compared to the respondent's topic
-- ability proxy at exposure time), and shrunk toward the authorial difficulty
-- prior so cold-start items return the author's number rather than noise.
--
-- This migration REPLACES ingest_attempt_mistakes() (defined in 0017): it
-- re-creates every existing behavior faithfully (bank misses / advance banked
-- correct via apply_question_grade; recompute_topic_stats over the touched
-- topics) and ADDS a first-seen exposure insert per item. It must be applied
-- AFTER 0017/0018/0019.
--
-- WS1 is the sole owner of attempts ingest. The trigger object itself
-- (trg_attempts_ingest) is unchanged — only the function body is re-created.
-- =============================================================

begin;

-- -------------------------------------------------------------
-- item_exposures — FIRST-SEEN fact table.
--
-- PK (user_id, question_id, content_version) means a user's first encounter of
-- an item version is recorded exactly once; every later re-exposure (repeated
-- practice, Mistake-Bank review) hits `on conflict do nothing` and is dropped.
-- This is what keeps difficulty from being polluted by review correctness.
--
-- ability_proxy is the user's topic_stats.posterior for that item's topic,
-- captured BEFORE the attempt's recompute runs (pre-attempt ability). Nullable
-- because a brand-new user may have no topic_stats row yet.
-- -------------------------------------------------------------
create table if not exists item_exposures (
  user_id         uuid not null references profiles(user_id) on delete cascade,
  question_id     text not null,             -- external_key, stable across re-seed
  content_version int  not null default 1,
  subtest         text,
  topic_id        text,
  is_correct      boolean not null,
  ability_proxy   numeric,                   -- topic posterior at exposure time (nullable)
  exposed_at      timestamptz not null default now(),
  primary key (user_id, question_id, content_version)
);

create index if not exists item_exposures_question_idx
  on item_exposures(question_id, content_version);

alter table item_exposures enable row level security;

-- User-gated select + insert, mirroring question_reviews (0017). No update/
-- delete policies: a first-seen fact is immutable and the trigger writes via
-- SECURITY DEFINER, so user-facing mutation is intentionally absent.
drop policy if exists "item_exposures_select" on item_exposures;
create policy "item_exposures_select" on item_exposures
  for select using (auth.uid() = user_id);

drop policy if exists "item_exposures_insert" on item_exposures;
create policy "item_exposures_insert" on item_exposures
  for insert with check (auth.uid() = user_id);

-- -------------------------------------------------------------
-- question_calibrations — per-(question_id, content_version) difficulty.
-- Written only by recompute_item_calibrations(). Read by WS2/WS6.
--
--   author_difficulty     = practice_questions.difficulty (1-5 author prior)
--   raw_correct_rate      = n_correct / n_firstseen (first-seen only)
--   ability_adj_difficulty= raw rate adjusted for respondent ability (a hard
--                           item missed by strong users scores harder)
--   shrunk_difficulty     = ability-adjusted estimate shrunk toward the author
--                           prior with weight n/(n+25); cold-start ~= prior
-- All difficulties are expressed on the author's 1-5 scale (higher = harder).
-- -------------------------------------------------------------
create table if not exists question_calibrations (
  question_id            text not null,
  content_version        int  not null default 1,
  subtest                text,
  topic_id               text,
  n_firstseen            int,
  n_correct              int,
  raw_correct_rate       numeric,
  author_difficulty      smallint,
  ability_adj_difficulty numeric,
  shrunk_difficulty      numeric,
  last_calibrated_at     timestamptz,
  primary key (question_id, content_version)
);

create index if not exists question_calibrations_topic_idx
  on question_calibrations(topic_id, content_version);

-- question_calibrations is derived, non-user data. RLS on, no public policies:
-- only the SECURITY DEFINER recompute fn and service-role reads touch it.
alter table question_calibrations enable row level security;

-- -------------------------------------------------------------
-- ingest_attempt_mistakes() — REPLACES the 0017 definition.
-- Faithfully preserves: per-item apply_question_grade (bank misses / advance
-- banked-correct) + recompute_topic_stats over touched topics. ADDS: a
-- first-seen item_exposures insert for EVERY graded item (correct AND
-- incorrect — calibration needs both), stamped with the user's pre-attempt
-- topic posterior so ability is measured before this attempt shifts it.
-- -------------------------------------------------------------
create or replace function public.ingest_attempt_mistakes()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  v_elem       jsonb;
  v_qid        text;
  v_topic      text;
  v_subtest    text;
  v_selected   int;
  v_correct    int;
  v_is_correct boolean;
  v_topics     text[] := '{}';
  v_version    int;
  v_ability    numeric;
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

    -- (0017 behavior, unchanged) bank misses / advance banked-correct items.
    perform public.apply_question_grade(
      NEW.user_id, v_qid, v_subtest, v_topic, v_is_correct, now()
    );

    -- (WS1 addition) first-seen exposure for calibration.
    -- content_version comes from the current bank row (default 1 if absent).
    select coalesce(content_version, 1)
      into v_version
      from practice_questions
     where external_key = v_qid
     limit 1;
    v_version := coalesce(v_version, 1);

    -- Ability proxy = user's topic posterior captured BEFORE the recompute
    -- below runs, so it reflects pre-attempt ability, not post-attempt.
    v_ability := null;
    if v_topic is not null then
      select posterior into v_ability
        from topic_stats
       where user_id = NEW.user_id and topic_id = v_topic;
    end if;

    insert into item_exposures (
      user_id, question_id, content_version, subtest, topic_id,
      is_correct, ability_proxy, exposed_at
    ) values (
      NEW.user_id, v_qid, v_version, v_subtest, v_topic,
      v_is_correct, v_ability, now()
    )
    on conflict (user_id, question_id, content_version) do nothing;

    if v_topic is not null then
      v_topics := array_append(v_topics, v_topic);
    end if;
  end loop;

  -- (0017 behavior, unchanged) fold topic-stats recompute into the same pipeline.
  -- Runs AFTER the exposure capture above so ability_proxy stays pre-attempt.
  if array_length(v_topics, 1) is not null then
    perform public.recompute_topic_stats(
      NEW.user_id,
      (select array_agg(distinct t) from unnest(v_topics) t)
    );
  end if;

  return NEW;
end;
$$;

-- -------------------------------------------------------------
-- recompute_item_calibrations() — nightly per-item difficulty recompute.
--
-- Aggregates item_exposures per (question_id, content_version) and upserts
-- question_calibrations. Cold-start safe by construction:
--
--   shrink weight  w = n / (n + 25)
--   shrunk = w * ability_adjusted + (1 - w) * author_prior
--
-- so below ~25 first-seen exposures the result is dominated by the author
-- prior. A small extra confidence gate keeps the item-level signal off until
-- n >= 60 (or a narrow CI), holding shrunk_difficulty at the author prior
-- until there is enough data to trust it. At today's prod volume (~25 total
-- attempts) almost every row therefore returns the author number — correct.
-- -------------------------------------------------------------
create or replace function public.recompute_item_calibrations()
returns int
language plpgsql security definer set search_path = public
as $$
declare
  r            record;
  v_count      int := 0;
  v_author     smallint;
  v_prior      numeric;       -- author difficulty as a [0,1] hardness
  v_raw_rate   numeric;
  v_adj_rate   numeric;       -- ability-adjusted correctness
  v_adj_diff   numeric;       -- ability-adjusted difficulty on the 1-5 scale
  v_w          numeric;       -- shrink weight
  v_shrunk     numeric;       -- final difficulty on the 1-5 scale
  v_n          int;
  v_nc         int;
  v_full_gate  constant int := 60;  -- full item-level effect at/above this n
  v_min_gate   constant int := 25;  -- shrink anchor; below ~this ~= author prior
begin
  for r in
    select
      e.question_id,
      e.content_version,
      max(e.subtest)                                     as subtest,
      max(e.topic_id)                                    as topic_id,
      count(*)                                           as n_firstseen,
      count(*) filter (where e.is_correct)               as n_correct,
      -- mean ability proxy among respondents who SAW this item.
      avg(e.ability_proxy)                               as mean_ability,
      -- ability of respondents who got it RIGHT vs WRONG (for adjustment).
      avg(e.ability_proxy) filter (where e.is_correct)       as mean_ability_correct,
      avg(e.ability_proxy) filter (where not e.is_correct)   as mean_ability_wrong
    from item_exposures e
    group by e.question_id, e.content_version
  loop
    v_n  := r.n_firstseen;
    v_nc := r.n_correct;

    -- Author prior (1-5). Default to 3 (medium) if the bank row is gone.
    select difficulty into v_author
      from practice_questions
     where external_key = r.question_id
     limit 1;
    v_author := coalesce(v_author, 3);
    -- Author hardness on [0,1]: difficulty 1 -> easy(0.0), 5 -> hard(1.0).
    v_prior := (v_author - 1)::numeric / 4.0;

    v_raw_rate := case when v_n > 0 then v_nc::numeric / v_n else null end;

    -- Ability adjustment: an item is HARDER than its raw rate implies when the
    -- people who still missed it were strong (high ability_proxy). We nudge the
    -- effective correctness down when wrong-answerers were unexpectedly able.
    -- mean_ability ~ expected correctness of this audience; the gap between
    -- expected and observed correctness is the difficulty surprise.
    if r.mean_ability is not null and v_raw_rate is not null then
      -- expected correct rate for this audience = their mean posterior.
      -- adjusted rate shifts observed toward (observed - (expected - 0.5)),
      -- i.e. credit easy audiences less and hard audiences more. Clamp [0,1].
      v_adj_rate := least(1.0, greatest(0.0,
        v_raw_rate - (r.mean_ability - 0.5)
      ));
    else
      v_adj_rate := v_raw_rate;
    end if;

    -- Ability-adjusted difficulty on the 1-5 scale (1 - rate = hardness).
    if v_adj_rate is not null then
      v_adj_diff := 1.0 + (1.0 - v_adj_rate) * 4.0;
    else
      v_adj_diff := v_author;  -- no data -> author prior
    end if;

    -- Shrink toward the author prior. Weight n/(n+25): heavy shrink at low n.
    v_w := v_n::numeric / (v_n + v_min_gate);

    if v_n < v_full_gate then
      -- Below the full-effect gate: damp the data weight hard so cold-start
      -- items sit at (or very near) the author prior. The data only earns a
      -- fraction (n/full_gate) of its already-shrunk pull until the gate.
      v_w := v_w * (v_n::numeric / v_full_gate);
    end if;

    v_shrunk := v_w * v_adj_diff + (1.0 - v_w) * v_author;

    insert into question_calibrations as qc (
      question_id, content_version, subtest, topic_id,
      n_firstseen, n_correct, raw_correct_rate, author_difficulty,
      ability_adj_difficulty, shrunk_difficulty, last_calibrated_at
    ) values (
      r.question_id, r.content_version, r.subtest, r.topic_id,
      v_n, v_nc, v_raw_rate, v_author,
      v_adj_diff, round(v_shrunk, 4), now()
    )
    on conflict (question_id, content_version) do update set
      subtest                = excluded.subtest,
      topic_id               = excluded.topic_id,
      n_firstseen            = excluded.n_firstseen,
      n_correct              = excluded.n_correct,
      raw_correct_rate       = excluded.raw_correct_rate,
      author_difficulty      = excluded.author_difficulty,
      ability_adj_difficulty = excluded.ability_adj_difficulty,
      shrunk_difficulty      = excluded.shrunk_difficulty,
      last_calibrated_at     = excluded.last_calibrated_at;

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$$;

commit;
