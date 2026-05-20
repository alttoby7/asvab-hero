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

### Open: MAGE normalization bug
AF job thresholds are 1–99 percentile but `calculateAirForceComposites()` returns raw sums → AF job matching is unreliable. Needs normalization table (like PAY97). Deferred.
