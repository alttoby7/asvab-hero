---
url: /navy-ratings-list
target_keyword: "navy asvab score chart"
secondary_keywords: ["asvab scores for navy jobs", "navy ratings list", "navy asvab scores"]
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-14
last_reviewed: 2026-06-14
cycles: 1
last_verdict: applied
recheck_date: 2026-07-05
---

# /navy-ratings-list — Optimization Log

## Cycle 1 — 2026-06-14 (Jobs-by-score hub: in-place upgrade to a data-driven chart)

Implements `docs/seo-notes/navy-hub-build-plan.md` (Layer 1 of the jobs-by-score
hub program in `docs/seo-notes/job-hub-build-spec.md`).

### Baseline (GSC, last 28 days, captured 2026-06-14)
The page barely registers: 2 total impressions, 0 clicks. Only two long-tail
queries surface it ("list of navy jobs and asvab scores", "navy ratings asvab
scores"), both at position ~16. **Zero impressions for the target head term
"navy asvab score chart"** (700/mo, KD 1) — no existing page owns it, so a clean
win is available.

### Diagnosis
The page was 1,668 lines of hand-coded community-by-community HTML tables. Strong
prose and schema, but the numbers were hand-maintained and had drifted from
`src/data/navy-jobs.json` (the dataset the Navy calculator actually scores
against). The page also targeted only "navy ratings list" in its title/H1 and
claimed "89 ratings" while the canonical dataset has 79.

### Decision (resolves the 7 open questions in the build plan)
1. **79 vs 89.** `navy-jobs.json` (79) is the live source of truth — the Navy
   calculator imports it in production. The hand-written "89" inflated the count
   by splitting rolled-up ratings (ABE/ABF/ABH, the AW family) and listing
   program tiers, and some numbers had drifted (e.g. AC: prose 222 vs data 220;
   CWT: prose FAQ "239" vs data 255). **Resolution: render the chart from the
   JSON so it matches the calculator; drive every count/min/max from
   `navyHub.jobs` (never hardcode).** The JSON already includes the submarine
   variants (CSS, LSS, STS, ITS, MMA, FT, MT, ETV, SECF) and CWT, so little real
   coverage is lost.
2. **Bonuses / NAPT / PACT** live only in prose, not the dataset → kept as
   curated asides (penalty-positive E-E-A-T), not forced into the data.
3. **Sort interactivity:** shipped a sortable client `JobScoreTable` that is
   prerendered in the static export, so all 79 rows are in the static HTML
   (crawlable); default sort = line score ascending. Click-to-sort is pure
   progressive enhancement.
4. **Composite ordering** (`AR+MK+MC+VE` vs `VE+AR+MK+MC`): rendered as-is from
   data. Flagged for a future data-normalization pass.
5. **MAGE branches (AF/Space Force):** out of scope here; `scoreSystem: "mage"`
   reserved in `job-hubs.ts` with a note to use the honest "no public cutoff →
   verify with recruiter" treatment when those hubs are built.
6. **CG + Space Force list routes** don't exist yet → new routes + sitemap when
   reached.
7. **Layer-2 money page** `/what-jobs-qualify-asvab-score` confirmed as the
   cross-link target (now in RelatedLinks); out of scope to rebuild.

### Changes applied
- **New `src/components/JobScoreTable.tsx`** — branch-agnostic, sortable,
  server-rendered (static-prerendered) table. Columns: rating code, title,
  community, required line score, min AFQT. Lifts JobCatalog's AND/OR `reqLabel`
  logic (requirements joined " · " = ALL; anyOf joined " or " = ANY). Handles the
  minScore-0 audition case (Navy Musician) as "(audition)" not "0".
- **New `src/lib/job-hubs.ts`** — per-branch config SoT (`navyHub`) +
  `hubScoreStats()`, so Army/Marines/AF/CG/Space Force hubs reuse one shape.
- **Rewrote `src/app/navy-ratings-list/page.tsx`** — replaced the 9 hand-coded
  community tables with `<JobScoreTable jobs={navyHub.jobs} />`; folded the chart
  keywords into title/H1/meta; kept the curated prose (how-scoring-works,
  standard-scores, nuclear/NAPT, PACT, FY2026 bonus table) and distilled the
  per-community detail into a "communities at a glance" list; reconciled the FAQ
  to the dataset (fixed CWT 239→255 tie, CS-surface 88→76, removed the
  NFa "third hardest" claim) and added the 2 head-term Q&As; updated JSON-LD
  (`dateModified: 2026-06-14`, headline count from data).
- **Internal links** relabeled to the head term: `HomePopularLinks` ("Navy ASVAB
  score chart"), navy calculator RelatedLinks, and the inline link + stale "89"
  count on `/navy-asvab-score`.
- **Sitemap** priority 0.8 → 0.85.

### Lanes (no cannibalization)
- `/navy-asvab-score` = enlistment AFQT floor.
- `/navy-asvab-score-calculator` = the interactive tool / funnel target.
- `/navy-ratings-list` (this) = the per-rating score **chart/table**.

### Verification (against `out/navy-ratings-list.html`)
- Exactly 1 `<h1>` ✓
- All 79 rating codes present in static HTML (0 missing) ✓
- Article + FAQPage + BreadcrumbList JSON-LD present, all parse ✓
- SO (SEAL) shows OR label ("...165+ or ...220+"); ND shows AND label ("· ") ✓
- Canonical = `https://asvabhero.com/navy-ratings-list`; title + meta contain
  "Navy ASVAB Score Chart" ✓
- `npm run build` clean; em-dash guard adds zero new offenders.

### Next review — 2026-07-05 (~3 weeks)
Recheck GSC for "navy asvab score chart" + "asvab scores for navy jobs" position
and impressions on this URL. **If it moves**, replicate the template (JobScoreTable
+ job-hubs config + curated prose) to Army (`/army-mos-list`) next, then drip
Marines → AF → CG → Space Force one at a time (anti-flood). If flat, audit
whether the homepage is cannibalizing the head term before adding more pages.

### Data flags for owner (future enrichment, not blocking)
- Add `bonus` / `notes` fields to `navy-jobs.json` to fold the FY2026 bonus table
  into the chart (more unique data) instead of a separate hand-maintained table.
- Normalize `AR+MK+MC+VE` → `VE+AR+MK+MC` in the dataset.
- Decide whether the ~10 rolled-up program tiers the old prose listed should be
  added to the dataset or stay as curated asides.
