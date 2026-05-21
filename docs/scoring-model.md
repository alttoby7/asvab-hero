# ASVAB Hero — Scoring Model Reference

Implementation: `src/lib/score-calculator.ts` (`PAY97_RANGES`, `afqtPercentileFromRaw`, `calculateAFQT`).

## AFQT Scoring Model

### Source
The official AFQT percentile table is the **PAY97 norming table** from:
> DMDC, "Development and Evaluation of the 1997 ASVAB Score Scale" (July 2004), Table 2.5

### Formula
```
VE = WK + PC          (Verbal Expression composite)
raw = 2 × VE + AR + MK
percentile = PAY97_RANGES lookup(raw)
```

### Subtest Score Scale
The 4 AFQT subtests (AR, WK, PC, MK) use **standard scores on a 20–62 scale** for the AFQT formula. The app UI accepts 20–145 (needed for composite/line score calculations), so values above 62 are **clamped to 62** before the AFQT raw score is computed.

### Implementation notes
- Default scores for AR/WK/PC/MK: **35** (maps to ~59th percentile — realistic below-average recruit starting state)
- Default scores for GS/EI/AS/MC/AO: **50** (used for composites only, not AFQT)

### Why clamping, not rescaling
Linearly rescaling 20–145 → 20–62 is not official AFQT methodology. The PAY97 table is calibrated for real ASVAB standard scores. Users entering their actual score report values (which are on the 20–62 scale) get accurate results. Users entering values > 62 (not real subtest standard scores) are silently clamped.

## Composite / Line Scores
Composite scores sum multiple subtest standard scores, so their range naturally exceeds 62. The 20–145 input range accommodates this. Composite scoring formulas are in `src/lib/score-calculator.ts`.

## Calculator Audit Fixes (2026-04-27)
- `score-calculator.ts`: AF M = `MC + 2×AS + GS` (was missing 2×)
- `job-matcher.ts` + `types/index.ts`: `anyOf?` OR-logic on `MilitaryJob`; Navy SEAL uses it (`GS+MC+EI≥165` OR `VE+AR+MK+MC≥220`)
- `asvab-line-score-calculator/page.tsx`: AF A formula was `NO+CS+VE` (discontinued 2002) → corrected to `WK+PC+MK`
- Deleted dead `src/data/army-mos-asvab-requirements.json`

### Open: MAGE normalization bug — INVESTIGATED, left as beta (no authoritative norms)
AF/SF job thresholds are 1–99 percentile but `calculateAirForceComposites()` returns raw sums → AF/SF job matching is unreliable. AF/SF jobs are stamped `support_status='beta'` in the catalog (`scripts/build-job-catalog.mjs`) and rendered as "not yet reliable."

**Conclusion (2026-05-21 research pass): left as beta. No defensible normalization implemented.** A correct fix requires the official AF MAGE raw-composite → percentile norming table (the MAGE analog of PAY97), and that table is **not publicly available**. Fabricating one would be worse than the honest beta label.

#### What was confirmed
- AF/SF MAGE qualification minimums (e.g. G=55, E=70, M=60, A=28) are **percentiles on a 1–99 scale**, not raw composite sums. So comparing them against the raw sums returned by `calculateAirForceComposites()` is an apples-to-oranges comparison — the bug is real.
- The four MAGE composites are derived from these subtests (Air Force official + secondary sources):
  - **M** (Mechanical): GS, MC, AS
  - **A** (Administrative): VE (= WK + PC); some sources add MK
  - **G** (General): AR + VE
  - **E** (Electronics): GS, AR, MK, EI
  - Note: the public sources disagree on the exact subtest weighting (e.g. whether A includes MK, and how M weights AS), which is itself evidence that the precise combining formula is not public.

#### Why no fix was implemented (why this differs from AFQT/PAY97)
- The AFQT has a **published** DMDC norming table (PAY97, Table 2.5 in DMDC's 2004 report) → we can do an exact raw→percentile lookup. **MAGE has no public equivalent.** The AF combines subtests into a scaled score using formulas it "periodically adjusts" and then converts to a percentile against an internal reference population; multiple sources state you must contact DMDC / MEPS to obtain the actual conversion. It is not published.
- A naive "sum the subtests, then z-score against mean=50, SD=10" approximation is **not** defensible: ASVAB subtests are highly inter-correlated, so the variance of a composite is **not** the sum of subtest variances. Computing a z-score from a naive sum (which implicitly assumes independence) would systematically misplace percentiles and produce a table that *looks* authoritative but is statistically wrong — i.e. a fabrication.

#### What data would unblock a real fix
1. The official AF MAGE composite-formula weights (exact subtest coefficients per composite), AND
2. The official raw-composite → percentile norming table (or the composite's true mean and SD in the AF reference population, which would let a z-score conversion be valid).
Both come from DMDC / official AF accession documentation. Until one of those is sourced, AF/SF stay beta.
