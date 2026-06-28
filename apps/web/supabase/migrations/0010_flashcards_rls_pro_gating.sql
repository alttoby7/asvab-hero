-- Tighten flashcard_cards SELECT so Pro deck content is not readable by anon
-- or free users. Deck metadata (flashcard_decks) stays public so the picker
-- can render titles, counts, and locked-state cards.

drop policy if exists "flashcard_cards_select" on flashcard_cards;

create policy "flashcard_cards_select" on flashcard_cards
  for select to anon, authenticated using (
    active = true
    and (
      deck_id in (select id from flashcard_decks where slug = 'wk.synonyms')
      or has_active_pro(auth.uid())
    )
  );
