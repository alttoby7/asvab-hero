# ASVAB Hero — Project Notes for Claude

## Stack
- Next.js 15 static export (`output: "export"`)
- Tailwind v4 with custom CSS variables in `src/app/globals.css`
- TypeScript, no test suite
- Deploy: `git push origin main && npx vercel --prod`

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

### Implementation
- Table + function: `src/lib/score-calculator.ts` — `PAY97_RANGES`, `afqtPercentileFromRaw`, `calculateAFQT`
- Default scores for AR/WK/PC/MK: **35** (maps to ~59th percentile — realistic below-average recruit starting state)
- Default scores for GS/EI/AS/MC/AO: **50** (used for composites only, not AFQT)

### Why clamping, not rescaling
Linearly rescaling 20–145 → 20–62 is not official AFQT methodology. The PAY97 table is calibrated for real ASVAB standard scores. Users entering their actual score report values (which are on the 20–62 scale) get accurate results. Users entering values > 62 (not real subtest standard scores) are silently clamped.

## Composite / Line Scores
Composite scores sum multiple subtest standard scores, so their range naturally exceeds 62. The 20–145 input range accommodates this. Composite scoring formulas are in `src/lib/score-calculator.ts`.

## Design System
Dark navy `#0a1628`, orange accent `#f97316`. All custom tokens in `@theme` block in `globals.css`. See `src/app/globals.css` and `.claude/skills/asvab-post-writer/references/design-system.md` for full JSX patterns.

## Article Pages
Content articles use `prose-asvab` CSS class. DVIDS hero images use `DvidsHeroImage` component with DoD endorsement disclaimer. See `scripts/dvids-image.py` to download images with attribution.
