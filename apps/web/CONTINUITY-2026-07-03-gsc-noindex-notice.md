# GSC "Excluded by noindex" notice — safe to ignore

**Date:** 2026-07-03
**Trigger:** Google Search Console email to trish@gainserviceacademyadmission.com — "New reasons prevent pages from being indexed on site asvabhero.com" — new reason = **Excluded by 'noindex' tag**. Gmail msg id `19f28d8fa0c239ab`.

## Verdict

Safe to ignore. Every noindexed route is intentional. No fix needed.

## Why "new"

The three KDP book landings shipped in commits `186f765` and `4fb3f42` for the *ASVAB Math, Explained* workbook launch. Google just crawled them for the first time, which triggered the "new reason" flag. The `/app/*` member-shell duplicates existed before but presumably weren't discovered until recently either.

## All noindex routes in the repo (verified 2026-07-03)

`robots: { index: false, follow: false }` in metadata:

| Route | Why noindexed |
|---|---|
| `/book` | QR landing for printed workbook — thin opt-in, not for search |
| `/review` | QR review-redirect helper for the workbook |
| `/advance-copy` | ARC (advance-reader-copy) opt-in landing |
| `/app/study` | Member-shell duplicate of canonical `/asvab-study-guide` |
| `/app/study/[subtest]/[topicSlug]` | Member-shell dup of `/study/…` — ~47 URLs (one per topic) |
| `/app/flashcards` | Member-shell dup of `/flashcards` |
| `/app/flashcards/[deckSlug]` | Member-shell dup of `/flashcards/[deckSlug]` |
| `/app/practice` | Member-shell dup of canonical `/practice-test` |

Every one carries a code comment saying why. Blocking these concentrates ranking on the public canonicals and keeps duplicate-content risk down.

## If we get another notice like this

1. Grep repo: `grep -rn "robots.*index.*false\|noindex" --include="*.tsx" --include="*.ts" apps/web/src/app/`
2. Diff against this file's table. Any new entry? Confirm it's intentional (usually a member-shell of a public canonical, or a thin opt-in landing).
3. If intentional → ignore the notice.
4. If accidental → remove the `robots` metadata and redeploy.

## No action items

Do not silence GSC notifications — we want to catch a real regression if one ever ships.
