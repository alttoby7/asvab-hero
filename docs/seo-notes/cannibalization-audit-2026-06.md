# Score-Explainer Cluster Cannibalization Audit — 2026-06-14

**Verdict: the cluster is 7 near-duplicate template-clones. Google indexes ONE
(`/asvab-scores-explained`) and rejects the other 6 as duplicates.** Fix = differentiate
each page to own ONE angle; demote shared subtopics to a 2–3 sentence summary + a link to
that subtopic's canonical page. Penalty-positive (de-duplication). Owner HCU-sensitive →
no deletion, no thin content; 301 only the genuinely redundant.

## Hard evidence

**Indexation (GSC URL Inspection, 2026-06-14):** all 6 non-winner pages =
**"Crawled - currently not indexed"** (last crawl 5/08–5/29). Google saw them and declined.

**Linking is NOT the cause** (so adding links won't fix it):
| Page | In-content inbound links | Indexed? | Owns term | Vol/mo |
|---|---|---|---|---|
| /asvab-scores-explained | many | ✅ INDEXED (pos 36, 2,217 impr) | asvab scores explained | 100 |
| /asvab-score-chart | **16** | ❌ not indexed | asvab score chart | 4,200 |
| /afqt-score | **18** | ❌ not indexed | afqt score | 1,500 |
| /what-is-a-good-asvab-score | **15** | ❌ not indexed | (what is a) good asvab score | 3,100 |
| /asvab-score-ranges | 6 | ❌ not indexed | asvab score range | 5,300 |
| /highest-asvab-score | 1 | ❌ not indexed | highest asvab score | 2,200 |
| /asvab-score-average | **0** | ❌ not indexed | average asvab score | 3,000 |

16–18-link pages still not indexed ⇒ pure **content duplication**, not crawl/link starvation.

**The duplication (each page repeats the same subtopics):**
| Subtopic | explained | chart | ranges | average | highest | good | afqt-score |
|---|---|---|---|---|---|---|---|
| AFQT categories I–V | ✅ | ✅ | ✅ | – | – | ✅ | ✅ |
| Branch minimums diploma/GED | ✅ | ✅ | ✅ | ✅ | – | ✅ | – |
| Composite/line scores | ✅ | ✅ | ✅ | – | ✅ | – | – |
| Retake rules | ✅ | ✅ | – | – | – | – | – |
| "What X unlocks" by level | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | – |
| Average score | ✅ | – | – | ✅ | ✅ | ✅ | – |
| How to improve | ✅ | ✅ | ✅ | ✅ | ✅ | – | ✅ |
| 1997 percentile baseline | ✅ | ✅ | – | – | – | – | ✅ |

## The fix — ownership matrix (each page owns ONE thing, summarizes + links the rest)

| Page | OWNS (go deep, unique) | DEMOTE to summary + link → |
|---|---|---|
| **/asvab-scores-explained** | Hub: how to READ your score sheet (the 3 number types) + overview; "asvab scores"/"understanding" | categories→chart, minimums→requirements, afqt→afqt-score, average→average, good→good, retake→retake-policy |
| **/asvab-score-chart** | The definitive visual CHART (categories table + branch-minimum table + composite table in one place) | jobs/unlocks→ranges, average→average, retake→retake-policy, improve→(short) |
| **/asvab-score-ranges** | Score TIERS + "real jobs at every level" (the unlocks angle) | categories table→chart, minimums→requirements, improve→(short) |
| **/asvab-score-average** | "average = 50": what average means, averages by branch/subtest, is-average-enough | categories→chart, unlocks→ranges, improve→(short) |
| **/highest-asvab-score** | The 99/ceiling: what a 99 is/unlocks, 95-vs-99, can-you-max-it | REMOVE "what is the average" (→average), composites→chart |
| **/what-is-a-good-asvab-score** | The "good" JUDGMENT call (good-for-your-goal, by branch/job) | categories→chart, minimums→requirements, average→average |
| **/afqt-score** | AFQT deep: formula, VE 2× leverage, categories, percentile, how to raise AFQT | branch minimums→requirements, "good"→good |

Move the interactive widgets to their topical home where natural (AFQTFormulaExplorer →
/afqt-score; AFQTCategoryLadder → /asvab-score-chart; keep BranchCompositeHeatmap on the
hub or chart). Optional; lower priority than the text de-dup.

## Execution approach (recommended)

Per-page differentiation is ~7 careful edits → best run **one subagent per page** with this
matrix as the shared contract (each: keep your OWNED angle deep + unique, replace the
DEMOTE subtopics with a 2–3 sentence summary + canonical link). Then:
1. `/asvab-score-average` also needs inbound links (it has 0) — add to HomePopularLinks +
   the hub RelatedLinks.
2. After edits: build + em-dash guard, deploy, **Request Indexing** in Search Console for
   the 6 pages, re-pull GSC URL Inspection in ~1–2 weeks (success = pages flip to
   "Submitted and indexed" + start getting impressions).
3. GT cluster (`/gt-score-requirements` → `/gt-score`) 301 is a separate small task.

## Status

Audit (this doc) = Phase 1. **Phase 2 EXECUTED + DEPLOYED 2026-06-14.**

### What shipped (2026-06-14)

- **7-page differentiation** (commit `3580c65`): each page given its owned angle; shared
  subtopics demoted to a 2-3 sentence summary + in-content canonical link (no rel=canonical
  between pages; each ranks independently). Per-page logs in `docs/seo-notes/urls/`.
- **Interactive widgets relocated** off the hub to their topical homes (the hub was the
  winner; keeping its 4 widgets orphaned would have stripped its interactivity): AFQTFormula
  Explorer + ScoreImpactSimulator to `/afqt-score`; AFQTCategoryLadder + BranchComposite
  Heatmap to `/asvab-score-chart` (filled the chart's old "coming soon" placeholders).
- **/asvab-score-average inbound links** added (was 0): HomePopularLinks + hub + chart +
  highest now link it.
- **GT cluster 301** (commit `ca9a2b5`): `/gt-score-requirements` (6 impr/90d, no unique
  rankings, strict subset of `/gt-score`) 301'd into `/gt-score`; page removed, inbound links
  repointed, sitemap + llms.txt updated.
- Build clean; changed `src/` files em-dash-free; both commits live on Cloudflare Pages
  (verified: homepage shows the average link, average page links ranges).

### GSC actions (2026-06-15 UTC)

- Baseline (URL inspection, all 6 non-winner pages): **"Crawled - currently not indexed",
  self-canonical, page fetch SUCCESSFUL, indexing allowed** — exactly the duplicate-content
  diagnosis. Last crawls 5/08-5/29 (the pre-fix duplicate versions).
- **Sitemap resubmitted** (fresh lastmod on all entries → recrawl trigger).
- **Request Indexing submitted for all 6** (chart, average, ranges, highest, good, afqt) via
  the GSC UI. chart + ranges visually confirmed ("added to a priority crawl queue"); the rest
  clicked + live-test run (the confirmation toast is transient and was not always captured).

### Next review

Re-pull URL inspection ~2026-06-28 (≈2 weeks). **Success = the 6 flip to "Submitted and
indexed" / "URL is on Google" and begin drawing impressions on their owned terms** (chart
4,200/mo, ranges 5,300/mo, average 3,000/mo, good 3,100/mo, highest 2,200/mo, afqt 1,500/mo).
`/gt-score-requirements` should show "Page with redirect". If a page stays unindexed after
the recrawl, the remaining lever is authority (a homepage-body link / backlinks), not more
on-page de-dup.
