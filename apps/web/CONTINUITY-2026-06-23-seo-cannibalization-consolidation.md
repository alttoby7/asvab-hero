# CONTINUITY — Calculator + score-explainer cannibalization consolidation (2026-06-23)

**Status: Batch 1 SHIPPED + LIVE (Cloudflare Pages auto-deploy from `main`). Batch 2 STAGED, NOT shipped — awaiting owner sign-off on the irreversible 301s.**

> Separate same-day continuity on a different topic: `CONTINUITY-2026-06-23-monthly-price-24-99.md` (Pro monthly $14.99 → $24.99). Don't conflate the two.

## Context

Penalty-safe de-cannibalization of asvabhero.com's **calculator** + **score-explainer** clusters, driven by GSC 28d data (pulled 2026-06-23): site at **635 clicks / 26k impressions / avg pos 23.2**, trending up. The calculators rank top-10 and earn ~all the clicks; the score-explainer + `[N] asvab score` + AFQT/GT queries split across many URLs (classic cannibalization) and none reach page 1.

**Full per-URL decision table lives in** `apps/web/docs/seo-notes/cannibalization-consolidation-plan-2026-06-23.md` — read it for the authoritative KEEP / DIFFERENTIATE / 301 calls. This doc is the execution log, not a restatement.

## ⚠️ Key decision — the "BLENDED" strategy (read before re-litigating)

Mid-execution we found that `apps/web/src/lib/calculator-links.ts` is a **deliberate 17-calculator-spoke internal-link architecture** built by a prior session (see its header comment) to fix *this same cannibalization* — it pushes internal authority DOWN to the spokes so they out-rank the homepage on branch/AFQT terms.

Codex's original plan (redirect *all* the spokes away into hubs) **directly conflicted** with that architecture — it would have torn down the link graph that was intentionally erected to solve the problem.

**Resolution — BLENDED approach:** merge only the ~4 thin **tool-duplicate** spokes, but **KEEP and honor the branch-full and branch-AFQT calculator spokes (do NOT redirect them).** This cut the redirect list from **12 → 6**. Future sessions: don't "finish the job" by redirecting the branch spokes — that's a regression, not a cleanup.

## Batch 1 — SHIPPED, LIVE, build-validated (pushed to `main`)

| Commit | What |
|---|---|
| `77eb7d5` | Interactive AFQT score-meaning module on `/asvab-score-ranges` |
| `b245af0` | Survivor title/H1 differentiation |
| `a4a1864` | Merge GT + AFQT calculators into `/gt-score` / `/afqt-score` (tool + explainer) |
| `06e4235` | Internal-link sweep (blended) — repoint prose links to final targets |

(Plan itself committed at `fc08571`.)

**1. Interactive score-meaning module** — new `apps/web/src/components/AfqtScoreMeaning.tsx`, embedded on `/asvab-score-ranges`. Enter any AFQT 1–99 → category / branch eligibility / job-access band / next threshold / study CTA. Shareable `?afqt=N` via `history.replaceState` (ONE canonical URL — the penalty-safe way to capture the `[N] asvab score` long tail instead of 100 doorway pages). Reuses `getAFQTCategory` + `getAFQTCategoryDescription` (`lib/score-calculator.ts`) and `BRANCH_MINIMUMS` (`lib/branch-minimums.ts`) so it can't drift. New title/H1 + an AEO direct-answer lead.

**2. Survivor title/H1 differentiation** — `/calculator` → "All-Branch ASVAB Job Calculator" (title + H1) so it stops competing with the homepage for the head term; sharper distinct titles on `/asvab-score-average`, `/highest-asvab-score`, `/asvab-score-chart`. Branch score pages left as-is (already well-differentiated).

**3. GT + AFQT tool-merges** — embedded the live `GTScoreCalculator` into `/gt-score` and `AfqtCalculator` into `/afqt-score`, **each wrapped in `<Suspense>`**.
> 🪲 **GOTCHA:** both calculators use `useSearchParams` → a bare embed caused an "Error occurred prerendering" build failure. `<Suspense>` wrapping fixed it. Any client component using `useSearchParams` MUST be Suspense-wrapped or the build breaks.

Also added an `id="gt-calculator"` anchor on the gt-score calc.

**4. Internal-link sweep (blended)** — repointed all literal prose `href="/x"` links from the 6 merge sources to their final targets so the staged 301s ship chain-free:
- `afqt-calculator` → `afqt-score`
- `gt-score-calculator` → `gt-score`
- `asvab-line-score-calculator` → `/calculator`
- `asvab-composite-score-calculator` → `/calculator`
- `what-is-a-good-asvab-score` → `asvab-score-ranges`
- `what-jobs-qualify-asvab-score` → `/calculator`

`gt-score` CTA self-links now jump to `#gt-calculator`; `afqt-score` reworded. The `calculator-links.ts` REGISTRY still references the merged calcs (29 refs) **on purpose** — it ships WITH the Batch-2 redirects, not before.

## Batch 2 — STAGED, NOT SHIPPED (the irreversible 301s)

Redirect mechanism = `apps/web/public/_redirects` (Cloudflare Pages format). Append a dated block like the existing `2026-05-20` / `2026-06-14` ones. The **6** redirects:

```
/afqt-calculator                   /afqt-score          301
/gt-score-calculator               /gt-score            301
/asvab-line-score-calculator       /calculator          301
/asvab-composite-score-calculator  /calculator          301
/what-is-a-good-asvab-score        /asvab-score-ranges  301
/what-jobs-qualify-asvab-score     /calculator          301
```

Ships as ONE coordinated change together with:
- **(a)** delete the 6 source page dirs under `apps/web/src/app/`
- **(b)** remove those 6 routes from `apps/web/scripts/generate-sitemap.mjs`
- **(c)** clean `calculator-links.ts` — drop the 4 merged calc spokes (`afqt-calculator`, `gt-score-calculator`, `asvab-line-score-calculator`, `asvab-composite-score-calculator`), fix their `related: [...]` arrays + `HOMEPAGE_FEATURED` (backfill with kept branch spokes so the featured count holds)
- **(d)** GSC-inspect the targets + monitor at 14 / 28 days

**KEPT (NOT redirected):** the 6 branch-full calcs + 4 branch-AFQT calcs + retake / converter utilities. (This is the blended decision — see above.)

## Build / deploy notes

- **Build:** `cd apps/web && npm run build` (runs `generate-sitemap.mjs` then `next build`). Watch for "Error occurred prerendering" — client components using `useSearchParams` MUST be Suspense-wrapped.
- **Deploy:** push to `main` → Cloudflare Pages auto-build.

## Pickup (next action)

1. Owner sign-off on **Batch 2**, then ship it as one coordinated, build-validated change (redirects + page deletes + sitemap + `calculator-links.ts` cleanup, all together).
2. After ~14–28 days, recheck GSC for the survivors — especially `/asvab-score-ranges` (for `[N] asvab score` queries), `/gt-score`, `/afqt-score`, and `/calculator`.
