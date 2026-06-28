---
url: /army-mos-list
target_keyword: "army mos list"
secondary_keywords: ["army asvab score chart", "asvab line scores for army jobs", "minimum asvab score for army", "us army mos list"]
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-16
last_reviewed: 2026-06-16
cycles: 1
last_verdict: applied
recheck_date: 2026-06-28
---

# /army-mos-list — Optimization Log

## Cycle 1 — 2026-06-16 (Jobs-by-score hub: Army Layer 1 + data integrity remediation)

Layer 1 of the jobs-by-score hub program (`docs/seo-notes/job-hub-build-spec.md`),
replicating the shipped Navy pattern (`navy-ratings-list.md`) to the Army. Plan:
`~/.claude/plans/effervescent-chasing-cocoa.md` (Codex-reviewed: ship Army only,
data-first guardrails, Air Force last).

### Target keywords
- `army mos list` 4,600 (KD 24), `us army mos list` 600 (KD 19), `list of army mos` 450 (KD 20)
- `minimum asvab score for army` 600 (KD 2, CPC $1.50) / `lowest asvab score for army` 450 (KD 2)
  → primarily folded into `/army-asvab-score` (P1), with the job angle answered here.
- GSC already shows long-tail "[MOS] asvab score" impressions (e.g. "35f" pos 3).

### What shipped
1. **`armyHub` config** added to `src/lib/job-hubs.ts` (`army-line` scoreSystem,
   army calculator hrefs, related links). The shared `JobScoreTable.tsx` +
   `hubScoreStats()` are branch-agnostic and reused unchanged.
2. **`/army-mos-list` rebuilt** from a 1,788-line hand-maintained page into the
   data-driven Navy pattern (~430 lines): one sortable `JobScoreTable` rendered
   from `src/data/army-jobs.json` as the indexable unique-data asset, an
   answer-first AEO block (AFQT 31/50, lowest/highest, GT importance), the 10
   line-score formulas, field clusters, FAQ + FAQPage schema, and a
   methodology/last-updated note. Every figure derives from the dataset (no
   hand-maintained numbers → no drift).

### ⚠️ Data integrity remediation (the gating finding)
The old hand-built page **and the live `/army-asvab-calculator`** shipped on a
`army-jobs.json` riddled with errors. Audited all 156 MOS against the
operationmilitarykids / military.com consensus tables + a verified research pass
(DA PAM 611-21 aptitude areas); reconciled via `scripts/reconcile-army-jobs.py`
(reference: `scripts/army-audit-reference.json`). **64 MOS corrected, 1 removed:**
- Combat MOS were ~10 pts low: `11B/11C/12B/12C/19C/19D/19K` `CO 77/82` → **`CO 87`**.
- Entire Field Artillery series had the wrong composite: `13B` GT 87 → **FA 93**,
  `13F` → **FA 96**, `13M` → **OF 95**, `13R` → **SC 98**.
- `14E` MM 92 → **100**; `14P/14T` OF 87 → **95**; SF `18B/C/D` GT 107 → **110**,
  CO 98 → **100**; `25S` EL 117 → **107**; many maintainer rows collapsed from a
  wrong AND-pair to the single correct composite.
- `14X` removed (not a real enlistment MOS).
- 24 niche reclass/senior-NCO MOS (08H, 17E, 38R/T/W, 79-series, bands, …) kept
  at existing plausible values — not on recruit-facing tables, low traffic. Bands
  (42R/42S) + 46Y honestly render "see recruiter."

This fix also corrects the live calculator (same dataset).

### Verification
- `npx tsc --noEmit` clean; `npm run build` green.
- Static HTML: 155 MOS rows prerendered; corrected values present (CO 87, FA 93,
  ST 112 top, 3 "See recruiter"); old wrong values (CO 77 / GT 87 / EL 117) and
  14X absent.

### Recheck 2026-06-28
Read GSC for `/army-mos-list` + `/navy-ratings-list`: indexed? impressions on
"army mos list" / "army asvab score chart" climbing? If both hubs show clean
movement → replicate to **Marines next** (Air Force last, MAGE cutoffs non-public).
