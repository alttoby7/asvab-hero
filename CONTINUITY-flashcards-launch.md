# Flashcards Launch — SHIPPED (2026-05-12)

Commit `e9a5dbc` on `main`, deployed via CF Pages, production-verified.

## What landed
- 6 decks / 123 cards: `wk.synonyms` (free, 25), `wk.root-words` (20), `wk.prefixes-suffixes` (20), `ei.ohms-law-power` (15), `as.hand-tools` (20), `mk.geometry` (23)
- SM-2 client-side scheduler, `/flashcards` picker, `/flashcards/[deckSlug]` review route, dashboard widget on `/account`
- Migration `0010_flashcards_rls_pro_gating.sql` — RLS now enforces Pro entitlement on `flashcard_cards` SELECT (was previously readable to anon)
- `ReviewEngine.tsx` race lock switched to `useRef` (prevents rapid-keydown double-grade)

## Pre-merge fixes from Codex review (session `019e1f85-...`)
Three blockers fixed in commit `e9a5dbc`: RLS hardening, race lock, client-gate doc note.

## Owed
Signed-in smoke pass on Pro + free review loops + `/account` widget hydration on CF Pages. Build / anon picker / blocked-route screen / RLS / Tailwind tokens all verified.

## Optional next
Streak tracking (needs `flashcard_streaks` table), Listmonk lapsed-review drip, GA4 `flashcard_review_submitted`, image cards for `as.hand-tools`, reduced-motion media query on `FlipCard`.

## Reference
- CLAUDE.md "Flashcards (LIVE 2026-05-12...)" section
- Memory: `~/.claude/projects/-home-trisha-google-drive-0-AI/memory/asvab-flashcards-launch.md`
