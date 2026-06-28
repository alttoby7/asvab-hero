---
url: /calculator
target_keyword: all-branch asvab calculator
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-16
cycles: 1
last_verdict: applied-intent-differentiation
---

# /calculator — Optimization Log

Target: the **all-branch / every-job comprehensive** angle (`all-branch asvab calculator`, `asvab calculator all branches`, `asvab job calculator`) + its role as the cluster **directory hub**. Deliberately moved OFF the bare head term `asvab score calculator`, which the root homepage (`/`) owns.

---

## Cycle 1 — 2026-06-16 (calculator-cluster cannibalization, step 1)

**Status:** applied

### Why

GSC (28d, ending 2026-06-16) showed `/calculator` effectively **dead**: 14 impressions, **0 clicks**, ranking only for junk `NN asvab score` queries at pos 25–89. It does NOT rank for `asvab calculator` at all. Meanwhile the **root `/`** owns the calculator cluster — 504 clicks / 6,739 impr, ranking `asvab calculator` pos 4.8 (516 impr) and `asvab score calculator` pos 5.5 (447 impr).

Root cause: `/calculator`'s title, H1, JSON-LD `name`, and breadcrumb all read **"ASVAB Score Calculator"** — the exact head term `/` already owns. Two duplicate-intent pages → Google keeps the stronger root and `/calculator` ranks for nothing. (`/calculator` is NOT thin: it has the interactive all-9-subtest calculator, the server-rendered JobCatalog, and the full 17-calculator directory — it just had no distinct search identity.)

Owner decision (2026-06-16): smallest safe step first — **differentiate `/calculator`'s intent only**, leave the cluster's lateral-authority architecture (`calculator-links.ts`) untouched, re-measure in ~2 weeks before any bigger consolidation. No 301/redirect (the page is a useful functional tool + the only page linking every spoke).

### Baseline metrics (GSC, 28 days, ending 2026-06-16)

| Page | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| `/` (root, the cluster winner) | 504 | 6,739 | 7.5% | 11.9 |
| `/calculator` (this page) | 0 | 14 | 0% | 25–89 (junk only) |

Cluster head terms (resolve to root `/`): `asvab calculator` pos 4.8 / 516 impr · `asvab score calculator` pos 5.5 / 447 impr.

### Changes applied (intent differentiation — `src/app/calculator/page.tsx`)

- **Title:** "Free ASVAB Score Calculator, See Every Job You Qualify For" → **"All-Branch ASVAB Calculator: Every Score & Qualifying Job (2026)"**
- **H1:** "ASVAB Score Calculator" → **"All-Branch ASVAB Calculator"**
- **JSON-LD `name`:** "ASVAB Score Calculator" → **"All-Branch ASVAB Calculator"**
- **Breadcrumb:** "ASVAB Score Calculator" → **"All-Branch Calculator"**
- **Meta description + intro:** reframed around the all-in-one / all-6-branches / every-job value + the directory, instead of the generic "enter your scores" head-term framing.

Result: zero residual bare "ASVAB Score Calculator" head-term on the page (only "All-Branch ASVAB Calculator" + the plural directory "All ASVAB calculators"). The label now matches `CALCULATOR_HUB.label` ("All-Branch ASVAB Calculator") already declared in `src/lib/calculator-links.ts`.

### Expected effect

- Removes the duplicate-intent signal so Google stops splitting `asvab score calculator` between `/` and `/calculator` → helps the **root** consolidate toward top-3 on the 516-impr money term.
- Gives `/calculator` a distinct, winnable identity (all-branch / directory) rather than competing with the homepage and losing.

### Recheck (~2026-06-30)

- Did the root `/` improve on `asvab calculator` / `asvab score calculator` (pos ~5 → top 3)?
- Did `/calculator` start earning impressions for all-branch / directory intent instead of junk `NN asvab score` queries?
- If yes → proceed to the broader cluster consolidation (kill lateral links into the now-distinct hub; spokes drop bare head term). If flat → re-evaluate the lateral-authority architecture.

> Full cluster diagnosis (homepage cannibalizes spokes; ~9 calc pages contribute ~0 clicks; `/calculator` hub dead) captured here as the entry point for the deferred cluster-wide consolidation.
