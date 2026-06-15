---
url: /asvab-score-ranges
target_keyword: "asvab score range"
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-14
last_reviewed: 2026-06-14
cycles: 1
last_verdict: applied
---

# /asvab-score-ranges — Optimization Log

## Cycle 1 — 2026-06-14 (Cannibalization de-dup)

### Diagnosis
Part of the 7-page "score-explainer" cluster (see `docs/seo-notes/cannibalization-audit-2026-06.md`). All six non-winner pages, including this one, are "Crawled - currently not indexed" in GSC. The cluster pages are near-duplicate template clones that repeat the same subtopics (AFQT categories table, branch minimums, composites, jobs-by-level, how-to-improve). Google indexes only `/asvab-scores-explained` and rejects the rest as duplicates. Inbound links are NOT the cause (16-18 link pages still not indexed), so the fix is content differentiation, not link building.

### Owned angle (kept deep + unique)
This page now owns score **TIERS** plus "real jobs at every score level" (the unlocks angle). It is the canonical home for "what each score level unlocks." The "Real Jobs at Every Score Level" H2 was strengthened into the strongest section:
- Added a tier-organized intro (four AFQT bands: 31-49 IIIB floor, 50-64 IIIA, 65-92 II, 93-99 I), each with concrete realistic jobs and what the tier unlocks (bonuses, leverage, job count).
- Kept the per-branch real-job tables (Army MOS, Navy ratings, Marine/Air Force highlights).
- Moved the GT-range unlock table into this section (it is an unlocks-by-level concept, removed from the demoted composites section).
- Kept "Score Ranges and Career Impact After Enlistment" H2 as a second unique unlocks/career angle.

### Sections demoted (kept H2 heading, trimmed body to 2-3 sentences + canonical link)
- **AFQT Categories: The Six Tiers...** — kept the tier framing as the page angle, but replaced the full six-row category percentile/share/unlocks TABLE (plus the duplicate stacked category cards, the AFQT formula box, and the DODIG paragraph) with a short tier overview. Link → `/asvab-score-chart` for the full AFQT category chart.
- **Branch Minimum Scores: Diploma vs GED...** — replaced the branch-minimums table and surrounding detail with a 2-3 sentence summary. Link → `/asvab-score-requirements`.
- **Composite and Line Score Ranges by Branch** — replaced the four-branch composite breakdown and table with a 2-3 sentence two-gate summary. Link → `/asvab-score-chart`.
- **How to Move Up a Score Range** — replaced the range-jump cards, 6-week study table, C-test warning, and retake-rule paragraphs with a 2-3 sentence summary (VE-doubling leverage + baseline). Link → `/asvab-study-guide` (and `/practice-test`).

### Links added (canonical de-dup links)
- `/asvab-score-chart` (AFQT category chart + composite formulas)
- `/asvab-score-requirements` (branch minimums diploma vs GED)
- `/asvab-study-guide` (how to improve / retake plan)

Existing in-content links retained: `/asvab-scores-explained`, `/asvab-scoring-and-results`, `/calculator`, `/army-mos-list`, `/usmc-mos-list`, `/practice-test`.

### Other changes
- Article JSON-LD `dateModified` set to 2026-06-14 (`datePublished` unchanged 2026-03-22).
- FAQ block (visible + JSON-LD) left untouched and in sync.
- No component imports removed (page only uses `Link` and `JsonLd`, both still used).
- Title/metadata unchanged.

### Em-dash check
`grep '—'` over the file returns no matches. Numeric en-dashes (`&ndash;`) retained only in remaining range tables.

### Expectations
The page now goes deep and unique on tiers + jobs-by-level while pointing the shared subtopics to their canonical homes. Success = page flips from "Crawled - currently not indexed" to "Submitted and indexed" and starts earning impressions for "asvab score range" (5,300/mo) after deploy + Request Indexing. Re-pull GSC URL Inspection in ~1-2 weeks.
