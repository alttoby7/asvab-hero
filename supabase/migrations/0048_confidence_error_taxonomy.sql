-- 0048_confidence_error_taxonomy.sql
-- Lever D: confidence calibration + error taxonomy + "confidently wrong"
-- resurfacing.
--
-- The single most dangerous error is a CONFIDENT wrong answer, the one the
-- student never thinks to review. We now capture a pre-reveal confidence read
-- per question (sure/unsure, carried in attempts.question_results) and surface
-- confidently-wrong misses FIRST in the Mistake Bank. The error taxonomy
-- (concept/setup/careless/time) captured in the session debrief is also folded
-- onto the review row so it can inform what comes back.
--
-- SAFETY: the SM-2 core (sm2_next, apply_question_grade) is intentionally
-- UNTOUCHED. We only (1) add two columns and (2) extend the ingest trigger to
-- stamp confidently_wrong via a follow-up UPDATE after the normal grade. The
-- review-queue reprioritization is presentation-only (in getDueMistakes), the
-- scheduler is not changed.

begin;

alter table question_reviews
  add column if not exists confidently_wrong boolean not null default false,
  add column if not exists last_error_tag text
    check (last_error_tag is null or last_error_tag in ('concept','setup','careless','time'));

-- Re-create the ingest trigger to read the per-item confidence (added to
-- question_results) and flag confidently-wrong misses. Everything else is
-- byte-for-byte the prior behavior; apply_question_grade still owns SM-2.
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
  v_confidence text;
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
    v_confidence := nullif(v_elem->>'confidence', '');

    perform public.apply_question_grade(
      NEW.user_id, v_qid, v_subtest, v_topic, v_is_correct, now()
    );

    -- Confidently-wrong stamp: a miss the user was SURE about. Sticky while the
    -- item is unresolved (it earns priority until graduated). Never auto-cleared
    -- here, the scheduler graduates it out of the due queue normally.
    if (not v_is_correct) and v_confidence = 'sure' then
      update question_reviews
         set confidently_wrong = true
       where user_id = NEW.user_id and question_id = v_qid;
    end if;

    if v_topic is not null then
      v_topics := array_append(v_topics, v_topic);
    end if;
  end loop;

  if array_length(v_topics, 1) is not null then
    perform public.recompute_topic_stats(
      NEW.user_id,
      (select array_agg(distinct t) from unnest(v_topics) t)
    );
  end if;

  return NEW;
end;
$$;

commit;
