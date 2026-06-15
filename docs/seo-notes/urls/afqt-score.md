---
url: /afqt-score
target_keyword: "afqt score"
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-14
last_reviewed: 2026-06-14
cycles: 1
last_verdict: applied
---

# /afqt-score — Optimization Log

## Cycle 1 — 2026-06-14 (Cannibalization de-dup)

### Diagnosis
Per `docs/seo-notes/cannibalization-audit-2026-06.md`, the 7-page score-explainer
cluster is a set of near-duplicate template clones. Google indexes only
`/asvab-scores-explained` and rejects the other 6 (including this page) as
duplicates ("Crawled - currently not indexed"). With 18 in-content inbound links
already pointing here and still no indexation, the cause is pure content
duplication, not link/crawl starvation. The audit also flags this page may be
pulling AFQT-term impressions the hub also pulls, so the fix is mutual: the hub
demotes AFQT depth to this page, and this page becomes the definitive AFQT
authority.

### Owned angle (kept deep and unique)
This page is the canonical home for the AFQT itself:
- The AFQT formula `2(VE) + AR + MK` and `VE = WK + PC`, with the VE 2x-leverage
  insight (verbal counts twice, so verbal gains are worth more per study hour).
- AFQT categories I–V and what the percentile actually MEANS (rank vs raw, the
  IIIA threshold at 50, Category IV 4% cap).
- The AFQT-vs-composite "two-gate" framing (kept, it is core AFQT context).
- How to RAISE your AFQT specifically (50/25/25 WK/PC/AR+MK allocation, hour
  benchmarks, diagnostic-first targeting).
- AFQT score logistics (CAT vs paper vs PiCAT delivery, 2-year validity).
- The 1997 Profile of American Youth percentile baseline and why percentiles
  feel outdated (canonical baseline explanation).

### Sections demoted + canonical links
- **"Minimum AFQT Scores by Branch in 2026"** — removed the full diploma/GED
  branch table, the two H3 subsections (Practical Impact, Exceptions and Special
  Programs incl. Navy DEP / Space Force detail), and the peacetime-minimums
  aside. Replaced with a 2-sentence summary (range 31 to 36) + one contextual
  link to `/asvab-score-requirements` (canonical home for branch minimums).
- **"AFQT vs Composite Scores"** — KEPT the two-gate AFQT framing (owned
  context) but cut the composite DETAIL paragraph (Army 10 line scores / AF MAGE
  / Navy-Marine formulas). Now points to `/asvab-score-chart` for the
  composite/line-score tables, with a one-line restatement of the AFQT-relevant
  takeaway.
- **Categories close** — reframed the existing link so `/asvab-score-chart` is
  described as the full visual category chart (the visual TABLE lives there;
  this page keeps the "what the percentile means" angle), and `/asvab-score-ranges`
  is described as the jobs-by-tier unlocks angle.

### Links added / changed
- Added `/asvab-score-requirements` contextual link (branch-minimum canonical).
- Re-pointed composite detail to `/asvab-score-chart` (composite tables canonical).
- Reworded categories-close links to `/asvab-score-chart` (visual chart) and
  `/asvab-score-ranges` (unlocks).
- Removed two now-redundant outbound links from the deleted branch-minimums
  body (`/what-is-a-good-asvab-score` and `/asvab-scoring-and-results` survive
  elsewhere on the page, so no orphaning).

### Components / imports
No component imports removed — `EmailCapture`, `JsonLd`, `Breadcrumb`,
`RelatedLinks`, and `Link` are all still used. Only inline table/aside JSX was
removed, no imported components.

### Title / FAQ
- Title unchanged.
- FAQ unchanged (visible + JSON-LD still in sync). The "good AFQT score"
  judgment stays brief in the FAQ and already links to
  `/what-is-a-good-asvab-score`.
- Article JSON-LD `dateModified` set to 2026-06-14.

### Em-dash check
`grep -n "—"` returns no matches (exit 1). Numeric ranges use en-dash `–` only.

### Expectations
After deploy + Request Indexing in Search Console, expect this page to flip from
"Crawled - currently not indexed" to "Submitted and indexed" within ~1–2 weeks
and begin taking impressions for "afqt score" and AFQT formula/percentile/1997
queries (no longer competing head-to-head with the hub). Re-pull GSC URL
Inspection in 1–2 weeks to confirm.
