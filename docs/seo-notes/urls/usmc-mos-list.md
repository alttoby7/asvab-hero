---
url: /usmc-mos-list
target_keyword: "marine mos list"
secondary_keywords: ["marine corps asvab score chart", "asvab line scores for marine jobs", "minimum asvab score for marines", "usmc mos list"]
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-16
last_reviewed: 2026-06-16
cycles: 1
last_verdict: data-audit-only (hub build gated to 2026-06-28 GSC recheck)
recheck_date: 2026-06-28
---

# /usmc-mos-list — Optimization Log

## Cycle 1 — 2026-06-16 (Jobs-by-score hub program: Marines DATA AUDIT — hub build gated)

Marines is next in the jobs-by-score hub program (`docs/seo-notes/job-hub-build-spec.md`)
after Navy (`navy-ratings-list.md`, shipped) and Army (`army-mos-list.md`, PR #18).
Per the program gate, **the hub build itself does NOT ship until the 2026-06-28 GSC
recheck confirms the Army + Navy hubs are indexing/gaining** (routine
`trig_0155yNviiAtkgDhA3rauWeoC`). But the data audit was done now — a featured
score chart amplifies bad data on an HCU-sensitive site, so each branch dataset
must be clean BEFORE its hub ships, and **the fix also corrects the live
`/marines-asvab-calculator`, which imports the same `marines-jobs.json`.**

### ⚠️ Data integrity audit (the gating finding)
Audited all **129 USMC MOS** in `src/data/marines-jobs.json` against the
operationmilitarykids.org + military.com (Rod Powers) recruiter-facing consensus
(the same canonical standard used for Army), cross-checked vs the Military
Yearbook Project (MCO 1200.17 verbatim) and Marine Corps COOL. Done with 5
parallel research agents (one per occupational-field slice). Reconciled via
`scripts/reconcile-marines-jobs.py` (reference: `scripts/marines-audit-reference.json`).

**The structural smoking gun:** the dataset used only **GT / MM / EL** and *never*
**CL (Clerical)** or **ST (Skilled Technical)** — two of the five USMC composites.
Classic clerical/admin roles were miscoded GT/EL. **8 MOS corrected, 0 removed**
(no phantom codes — every code is a real USMC MOS, unlike Army's fake 14X):

- **Composite miscodings → CL introduced (3):** `3043` Supply Admin `GT 100` →
  **`CL 105`**; `6046` Aircraft Maintenance Admin `EL 100` → **`CL 100`**; `7041`
  Aviation Operations Specialist `GT 100` → **`CL 100`**.
- **Wrong minimums (5):** entry infantry `0311`/`0331`/`0341` `GT 80` → **`GT 90`**;
  `2621` Signals Collection `GT 110` → **`GT 100`**; `7314` UAV Operator `GT 110` →
  **`GT 105`**.
- **ST absence is a VERIFIED finding, not an omission:** every ST-suspect (`5711`
  CBRN, `6842` METOC, `3451` Finance, `1361` Engineer Assistant, `3381` Food
  Service) was confirmed gated on GT/CL, not ST. The USMC gates no MOS in this
  dataset on ST.
- **All 6 AND-pairs confirmed genuine** (left unchanged): `0481` GT95+MM100,
  `1142` MM105+EL100, `2171` MM105+EL115, `2651` GT110+EL110, `6276` MM105+GT110,
  `6694` GT110+EL115. (MCO 1200.17 verbatim corroborated 1142 + 2171.)
- **minAFQT = 32 for all is CORRECT** (unlike Army's per-MOS variance): USMC AFQT
  floor is uniform 32 (diploma) / 50 (GED); the per-MOS gate is the line score.

### Source conflicts adjudicated to the recruiter-facing consensus (documented, not changed)
Where OMK/military.com disagree with MCO-verbatim Military Yearbook Project, the
chart matches the recruiter-facing consensus (Army-audit precedent), all kept:
- 59xx EL **115** (OMK) vs EL 105–110 (MYP/MCO) — `5939`/`5948`/`5974`/`5979`.
- `6276` MM105 **AND** GT110 (OMK + military.com) vs MM105-only (MYP/MCO).
- `0844` GT 105 (OMK fire-control band) vs GT 100 (asvabhero outlier).
- `7257` GT 110 (effective gate via required 7251 trainee) vs GT 105 (its own line).

### Lifecycle flags (real codes in transition — kept, scores verified; revisit at hub build)
`1812` Tank Crewman (USMC divested tanks ~2020-21), `1833` AAV (sunsetting → 1834
ACV), `0317` Scout Sniper (0322 restructure), `6112`/`6152`/`6172` legacy CH-46
titling, `6122` possible T/O removal. All still appear on authoritative tables;
scores correct. Decide presentation before the hub ships.

### Verification
- `scripts/reconcile-marines-jobs.py` → 8 corrections, 0 removed, 129 MOS.
- New composite distribution: GT 60 / MM 42 / EL 30 / **CL 3** (was GT 62 / MM 42
  / EL 31, no CL). Diff surgical: 10 insertions / 10 deletions, shape unchanged.
- JSON valid; `npm run build` green (`/usmc-mos-list` + `/marines-asvab-calculator`
  prerender clean).

### Next (gated)
On/after **2026-06-28**, if the Army + Navy hubs show clean GSC movement, build the
Marines hub: add `marinesHub` to `src/lib/job-hubs.ts` (`marine-line` scoreSystem),
rebuild `/usmc-mos-list` IN PLACE on the data-driven `JobScoreTable` pattern (answer-
first AEO block, line-score composite definitions, methodology/last-updated note,
FAQ + FAQPage schema). Then audit Coast Guard → Space Force → **Air Force last**
(MAGE cutoffs largely non-public). The `JobScoreTable.tsx` + `hubScoreStats()` +
the Navy/Army `armyHub`/`navyHub` configs in `job-hubs.ts` arrive when PR #18 (Army)
merges — rebase this branch on it before building the page.
