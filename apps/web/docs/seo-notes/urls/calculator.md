---
url: /calculator
target_keyword: all-branch asvab calculator
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-16
cycles: 2
last_verdict: working-intent-differentiation-confirmed
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

---

## Cycle 2 — 2026-06-30 (recheck, 14 days post-merge of #17 `ceccf1f`)

**Status:** measured — verdict **WORKING**. Intent differentiation confirmed; root consolidated toward top 3.

### Decision rule outcome

Both WORKING conditions met:
1. **Root `/` climbed toward top 3 on the head terms** (was the primary bet). ✅
2. **`/calculator` is now earning impressions for all-branch / branch / directory / job intent** instead of only junk `NN asvab score` queries. ✅

### Root `/` head terms — page-level GSC

> Window caveat: baseline was 28d (ending 2026-06-16); recheck is 14d (ending 2026-06-30). Impressions are reported raw, but per-day they **hold** — the mover is **position**.

| Query | Baseline (28d) | Now (14d) | Δ Position |
|---|---|---|---|
| `asvab score calculator` | pos **5.5** / 447 impr / ~48 clk | pos **2.2** / 215 impr / **71 clk / 33.0% CTR** | **5.5 → 2.2** ⬆ |
| `asvab calculator` | pos **4.8** / 516 impr / ~62 clk | pos **2.9** / 230 impr / 34 clk / 14.8% CTR | **4.8 → 2.9** ⬆ |

Per-day clicks: `asvab score calculator` ~1.7/day → **~5.1/day** (position-driven CTR jump 5.5→2.2); `asvab calculator` ~2.2/day → ~2.4/day. Root now also owns the adjacent cluster terms at pos ~2–3 (`gt score calculator` 3.0, `asvab line score calculator` 2.2, `asvab job calculator` 2.3, `asvab score converter` 2.4, `army/navy/air-force ... calculator` mostly 2–4).

> Note: site-wide `compare_search_periods` shows `asvab calculator` blended pos 4.7→6.5 (looks worse) — that is an **artifact of `/calculator` now also surfacing for the term at pos ~62**, which drags the blended average down. At the **page** level the root is at 2.9. The split is exactly what differentiation was meant to produce.

### `/calculator` — page-level GSC (14d)

- **51 impressions / 1 click** (baseline: 14 impr / 0 clicks, junk only).
- Now appears for the **intended** intent — `army asvab score calculator` (56), `asvab air force score calculator` (42.5), `air force asvab job calculator` (89), `navy asvab score calculator` (66), `marine corps asvab score calculator` (75), `asvab composite score calculator` (69), `asvab line score calculator` (74.5), `asvab score job calculator` (59.5), `calculator on asvab` (48.3), `asvab score converter` (60).
- Positions are deep (**~40–90**), ~0 clicks — expected for a DR≈0 page that's only just earned a distinct identity. The page is now *eligible* for the right queries; authority/time is the remaining gap, not intent collision.
- Old junk `NN asvab score` queries have largely migrated off `/calculator` (only `15t/32/74 asvab score` remain) — most now surface on root `/` at pos 22–57 (zero-click informational junk either way).

### Verdict & next action

The smallest-safe-step bet paid off: removing the duplicate head-term signal let the **root consolidate from ~pos 5 to ~pos 2–3** on the two money terms (516+447 impr combined) while giving `/calculator` a winnable all-branch/directory identity it now ranks (deeply) for. **No regression** to the root — it improved.

**Proceed to broader consolidation (per WORKING path), but scoped & low-risk** — and explicitly **do NOT 301-redirect the spoke pages** (they're functional tools and the root is now winning; nuking them risks the thing that's working):

1. **Spokes drop the bare `asvab calculator` / `asvab score calculator` head term** from title/H1/JSON-LD so each spoke owns only its modifier (e.g. `/army-asvab-calculator` → "Army ASVAB Calculator", never the bare head term). Stops the ~9 spokes from re-splitting the term the root now owns at pos 2.
2. **Concentrate the lateral link graph** in `src/lib/calculator-links.ts` so equity flows up to `/calculator` (the now-distinct hub) and laterally between same-branch spokes, rather than scattering across all 17.
3. Re-measure in ~2–3 weeks; watch that the root **holds** pos 2–3 (the must-not-break metric) and that `/calculator` climbs off the 40–90 band on branch/directory intent.

Deferred to owner review before executing (live-site copy change across ~10 pages, and the root is currently performing — not a blind apply).

### Consolidation applied — 2026-06-30 (same day, owner approved "build it")

Scope: **anchor-text consolidation only** — no 301s, no title/H1/JSON-LD changes (spokes already own their modifier). The actual leak was **bare-head-term internal anchor text pointing into `/calculator`**, which was actively telling Google `/calculator = "asvab calculator"` and re-creating the very collision #17 killed.

- **Spoke breadcrumbs (8 pages):** `{ name: "ASVAB Calculator", href: "/calculator" }` → `{ name: "All-Branch Calculator", href: "/calculator" }`. Aligns with the hub's Cycle-1 breadcrumb + kills the bare-head-term anchor on every branch spoke.
- **Body anchors (~17 pages, 33 links):** every head-term-bearing `/calculator` anchor — `ASVAB Score Calculator`, `ASVAB score calculator`, `ASVAB calculator`, `free ASVAB [score] calculator` — rewritten to the hub's canonical label **`All-Branch ASVAB Calculator`** (= `CALCULATOR_HUB.label`). Generic anchors (`Use our calculator`, `Check your scores now`, `calculator`) and modifier anchors (`line score calculator`, `AFQT calculator`, `Navy ASVAB calculator`) left untouched.
- **`calculator-links.ts`:** left unchanged — `CALCULATOR_HUB.label` is already differentiated and the related-link graph is hub-connected; churning `related[]` arrays is judgment-heavy with unclear upside, so deferred.

26 files changed, `pnpm build` green (✓ compiled, sitemap regenerated). Shipped as a PR (not direct-to-main) for owner review.

**Re-measure ~2026-07-21:** root must **hold** pos 2–3 on `asvab score calculator` / `asvab calculator` (the must-not-break metric — it's the win); `/calculator` should climb off the 40–90 band on branch/directory intent as the consolidated anchor text concentrates.
