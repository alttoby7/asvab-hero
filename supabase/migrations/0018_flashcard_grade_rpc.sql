-- =============================================================
-- 0018_flashcard_grade_rpc.sql
-- Single-source SM-2: route flashcard grading through the same PL/pgSQL
-- sm2_next() function used by the Spaced Mistake Bank (migration 0017).
--
-- Previously flashcards computed SM-2 client-side (src/lib/flashcards/
-- scheduler.ts) and upserted the result. This RPC moves that math server-side
-- so there is exactly ONE SM-2 implementation in the whole app. The ported
-- math is identical, so scheduling behavior is unchanged.
-- =============================================================

begin;

create or replace function public.grade_flashcard_review(
  p_card_id uuid,
  p_quality smallint
)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_uid     uuid := auth.uid();
  v_row     flashcard_reviews%rowtype;
  v_in_ease numeric;
  v_in_int  int;
  v_in_reps int;
  v_ease    numeric;
  v_int     int;
  v_reps    int;
  v_due     timestamptz;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  select * into v_row
    from flashcard_reviews
   where user_id = v_uid and card_id = p_card_id;

  if found then
    v_in_ease := v_row.ease_factor;
    v_in_int  := v_row.interval_days;
    v_in_reps := v_row.repetitions;
  else
    v_in_ease := 2.50;  -- defaultReviewState
    v_in_int  := 0;
    v_in_reps := 0;
  end if;

  select s.ease_factor, s.interval_days, s.repetitions, s.due_at
    into v_ease, v_int, v_reps, v_due
    from public.sm2_next(v_in_ease, v_in_int, v_in_reps, p_quality, now()) s;

  insert into flashcard_reviews as fr (
    user_id, card_id, ease_factor, interval_days, repetitions,
    due_at, last_reviewed_at, last_quality, updated_at
  ) values (
    v_uid, p_card_id, v_ease, v_int, v_reps,
    v_due, now(), p_quality, now()
  )
  on conflict (user_id, card_id) do update set
    ease_factor      = excluded.ease_factor,
    interval_days    = excluded.interval_days,
    repetitions      = excluded.repetitions,
    due_at           = excluded.due_at,
    last_reviewed_at = excluded.last_reviewed_at,
    last_quality     = excluded.last_quality,
    updated_at       = excluded.updated_at;
end;
$$;

grant execute on function public.grade_flashcard_review(uuid, smallint) to authenticated;

commit;
