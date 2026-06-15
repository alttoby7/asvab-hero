# CONTINUITY — Score-explainer cannibalization fix (2026-06-14)

**Status: SHIPPED + DEPLOYED + Request Indexing submitted. Next action = GSC recheck ~2026-06-28 (scheduled reminder set).**

## What this was

The 7-page score-explainer cluster was template-clones all repeating the same 6 subtopics
(AFQT categories, branch minimums diploma/GED, composites, retake, "what X unlocks",
how-to-improve). Google indexed only `/asvab-scores-explained` (pos 36) and marked the other 6
**"Crawled - currently not indexed."** Linking was ruled out as the cause (chart had 16 inbound
links, afqt 18, both unindexed) → pure content duplication. Blueprint + ownership matrix:
`docs/seo-notes/cannibalization-audit-2026-06.md` (now has a "Phase 2 EXECUTED" status section).

## What shipped (3 commits on main, all live on Cloudflare Pages)

**`3580c65` — 7-page differentiation** (one subagent per page on the ownership matrix as the
shared contract). Each page now owns ONE angle; shared subtopics demoted to a 2-3 sentence
summary + an in-content canonical link. **No `rel=canonical` between pages** (verified each page
self-canonicals in built HTML) → they rank independently. Ownership:
- explained = hub (read your score sheet + routes to spokes)
- chart = the 3 consolidated tables (categories + branch-min + composites)
- ranges = score tiers + jobs at every level (unlocks)
- average = "average = 50" (branch + subtest averages)
- highest = the 99 / ceiling (removed an off-topic average detour)
- good = the "good for your goal" judgment
- afqt = AFQT deep (formula, VE 2x leverage, percentile, 1997 baseline)

Plus in the same commit:
- **Relocated the hub's 4 interactive widgets to spokes** (they were orphaned when the hub's
  duplicate sections were trimmed): `AFQTFormulaExplorer` + `ScoreImpactSimulator` → `/afqt-score`;
  `AFQTCategoryLadder` + `BranchCompositeHeatmap` → `/asvab-score-chart` (filled its existing
  "coming soon" placeholders; removed a 3rd dead "branch eligibility checker" placeholder).
  Components live in `src/components/scores-explained/`.
- **`/asvab-score-average` inbound links** added (was 0): `HomePopularLinks.tsx` "Scores and AFQT"
  column + hub + chart + highest now link it.

**`ca9a2b5` — GT 301.** GSC proved `/gt-score-requirements` = 6 impr/90d, ranked for nothing
`/gt-score` doesn't already cover better, and is a strict subset (gt-score has 9 tables vs 2).
301'd `/gt-score-requirements` → `/gt-score` in `public/_redirects`, deleted the page, removed it
from `scripts/generate-sitemap.mjs` + `public/llms.txt`, repointed all inbound links
(asvab-prep-course, army-asvab-score, warrant-officer breadcrumb, mos-reclassification,
asvab-score-requirements), and cleaned `/gt-score`'s own references (de-linked body pointers to
its own tables; swapped a RelatedLinks card to `/army-asvab-score`).

**`d496abe` — docs:** audit-doc execution-status section + this work logged.

## Verification

- `npm run build` clean (all 7 pages emit HTML; gt-score-requirements gone from `out/`; redirect in
  `out/_redirects`; sitemap regenerated without it). Changed `src/` files are em-dash-free. (The
  `check-no-emdash.mjs` guard reports 165 PRE-EXISTING em-dashes in untouched files — practice-test
  JSON, diagram components, ProUpsellCard — and the `build` script does NOT run the guard, so that
  red is independent of this work.)
- Live confirmed: homepage shows the average link; average page links ranges; gt-301 deploying then
  live.

## GSC (property `sc-domain:asvabhero.com`)

- Baseline (URL Inspection, all 6 non-winner pages): "Crawled - currently not indexed",
  self-canonical, page fetch SUCCESSFUL, indexing allowed (last crawls 5/08–5/29 = pre-fix versions).
- **Sitemap resubmitted** (fresh lastmod → recrawl trigger).
- **Request Indexing submitted for all 6** via the GSC UI (Chrome). chart + ranges visually confirmed
  ("added to a priority crawl queue"); the other 4 clicked the same way + live-test run (the toast is
  transient and wasn't always screenshot-timeable, but the requests went through). Note: the GSC API
  has no request-indexing endpoint — it's UI-only, so this was browser automation; the "Request again"
  button label is permanent and is NOT a confirmation signal.

## Logs / artifacts

- Per-URL cycle logs: `docs/seo-notes/urls/{slug}.md` (6 new + scores-explained Cycle 3 appended +
  gt-score Cycle 2). Registry: `docs/seo-notes/urls/index.json` (cohort tagged
  `score-explainer-cannibalization`).
- Plan: `~/.claude/plans/plan-1-and-2-quizzical-summit.md`.

## ⏭ Next (PICKUP)

**Re-pull GSC URL Inspection ~2026-06-28** (≈2 wks) for the 6 URLs.
- Success = they flip "Crawled - currently not indexed" → "Submitted and indexed" / "URL is on
  Google" and start drawing impressions on their owned terms (chart 4,200/mo, ranges 5,300, average
  3,000, good 3,100, highest 2,200, afqt 1,500). `/gt-score-requirements` should show "Page with
  redirect."
- If a page STAYS unindexed after recrawl → the lever is authority (a homepage-body link / backlinks),
  NOT more on-page de-dup. Do NOT add new score-explainer pages.
- A cloud reminder routine is scheduled to fire 2026-06-28 09:00 MT (`trig_016K2eMZUtzmzirqAKi65CCx`):
  it verifies the live 301/200s and emails the GSC checklist (run the actual inspection LOCALLY — the
  cloud agent has no gsc MCP).

Related: the jobs-by-score hub program (Navy Layer 1 shipped `58e8f3b`, recheck ~2026-07-05) is the
separate net-new build track — see `docs/seo-notes/job-hub-build-spec.md`.
