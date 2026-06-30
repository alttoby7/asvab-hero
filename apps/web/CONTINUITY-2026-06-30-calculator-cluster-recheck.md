# CONTINUITY — Calculator-cluster recheck + anchor consolidation (2026-06-30)

**Status: Cycle-2 recheck DONE (verdict WORKING). Anchor consolidation SHIPPED + LIVE on `main` (PR #27, merged + verified on asvabhero.com). Cycle-3 recheck SCHEDULED for 2026-07-21.**

> This is the PR #17 calculator.md optimization thread (root `/` vs `/calculator` head-term cannibalization). **Distinct from but adjacent to** `CONTINUITY-2026-06-23-seo-cannibalization-consolidation.md` (the broader calculator + score-explainer de-cannibalization with the staged Batch-2 301s). Read the reconciliation note below before touching either.

## What this thread is

Authoritative metrics + per-cycle log: **`apps/web/docs/seo-notes/urls/calculator.md`** (this doc is the execution narrative, not a restatement).

- **Cycle 1 (2026-06-16, PR #17 `ceccf1f`):** differentiated `/calculator`'s intent OFF the bare head term `asvab score calculator` (which the root `/` owns) onto an "All-Branch" identity — title/H1/JSON-LD/breadcrumb only. No 301s, no spoke-architecture change. Smallest-safe-step; re-measure in 2 weeks.
- **Cycle 2 (2026-06-30, this session):** the recheck. **Verdict WORKING.**

## Cycle-2 recheck result (GSC, 14d → 2026-06-30)

| Metric | Baseline (28d → 6/16) | Now (14d → 6/30) |
|---|---|---|
| root `/` · `asvab score calculator` | pos **5.5** / ~48 clk | pos **2.2** / 215 impr / **71 clk / 33% CTR** |
| root `/` · `asvab calculator` | pos **4.8** / ~62 clk | pos **2.9** / 230 impr / 34 clk |
| `/calculator` | 14 impr / 0 clk (junk only) | 51 impr / 1 clk (branch/directory/job intent) |

Both WORKING conditions met: root consolidated toward top 3, AND `/calculator` now earns the intended all-branch/branch/directory queries (deep positions ~40–90, expected at DR≈0). The intent split is real — site-wide `compare_search_periods` *looks* like `asvab calculator` regressed (4.7→6.5) but that's only because `/calculator` now also surfaces at pos ~62 dragging the blended average; at the **page** level root is 2.9.

## Consolidation shipped (PR #27 `4e0deca`, squash-merged to `main`, LIVE)

Per the WORKING decision rule, concentrate authority into the now-distinct hub. The remaining leak was **bare-head-term internal anchor text** pointing at `/calculator` — still telling Google `/calculator = "asvab calculator"` (the term root owns). **Anchor-text-only fix, no 301s, no title/H1/JSON-LD changes** (spokes already own their modifier):

- **8 spoke breadcrumbs:** `{ name: "ASVAB Calculator", href: "/calculator" }` → `{ name: "All-Branch Calculator", … }`.
- **33 body anchors across ~17 pages:** every head-term-bearing `/calculator` anchor (`ASVAB Score Calculator`, `ASVAB calculator`, `free ASVAB [score] calculator`) → **`All-Branch ASVAB Calculator`** (= `CALCULATOR_HUB.label`). Done via a guarded `perl` swap that only rewrites the inner text of `/calculator` links matching `[free ]ASVAB [score ]calculator`.
- **Left untouched:** generic anchors (`Use our calculator`, `calculator`), modifier anchors (`line score calculator`, `AFQT calculator`, `Navy ASVAB calculator`), all titles/H1/JSON-LD, and `calculator-links.ts`.

`cd apps/web && pnpm build` green (✓ compiled, sitemap regenerated). Live-verified on asvabhero.com: breadcrumb item now `"All-Branch Calculator"→/calculator`, 0 bare-head-term `/calculator` anchors on sampled pages, `/calculator` still 200.

## ⚠️ Reconciliation with the 2026-06-23 cannibalization thread (READ before next move)

The 06-23 BLENDED plan has a **STAGED, unshipped Batch 2** (6 irreversible 301s) that would **delete** some pages I just edited anchors in — `gt-score-calculator`, `what-is-a-good-asvab-score`, `asvab-line-score-calculator`, `asvab-composite-score-calculator` (→ `/gt-score` / `/asvab-score-ranges` / `/calculator`). My anchor edits in those files are **harmless if those 301s ship** (the files get deleted) and correct if they don't. No conflict, but be aware both threads touch `calculator-links.ts` and the same cluster.

**Two overlapping "next levers" exist — pick deliberately, don't double-apply:**
- 06-23 Batch 2: prune the 4 thin tool-duplicate calc spokes (afqt/gt/line/composite) via 301 + `calculator-links.ts` cleanup. Awaiting owner sign-off on the 301s.
- This thread's deferred lever: tighten the `calculator-links.ts` related-graph toward the hub (NOT yet done — judged low-value vs. churn for now).

If Batch 2 ships, it largely subsumes this thread's link-graph lever (it rewrites `calculator-links.ts` anyway). Sequence Batch 2 FIRST if both are on the table.

## Cycle-3 recheck — SCHEDULED (2026-07-21)

Cloud routines can't run this (GSC MCP is **local-only**, not a claude.ai connector), so it's a **self-cleaning local cron one-shot**:
- Cron line (user crontab, `CRON_TZ=America/Denver`): `0 11 21 7 * … run-calculator-cycle3.sh` → 11:00 MDT Tue 2026-07-21.
- Files: `~/.claude/scheduled-recheck/run-calculator-cycle3.sh` + `calculator-cycle3-prompt.txt`; logs to `cycle3-run.*.log` there. Runs `claude -p … --dangerously-skip-permissions` headless from `~/dev/asvab-hero`, removes its own cron line on fire (one-shot).
- **Must-not-break metric:** root `/` HOLDS pos 2–3 on the two head terms. `/calculator` should climb off the 40–90 band on branch/directory intent.
- ⚠️ Caveat: unattended headless depends on MCP auth staying valid ~3 wks — if it silently fails, the saved prompt file lets you re-run the recheck manually.

## Pickup (next action)

1. ~2026-07-21: Cycle-3 fires automatically → review `cycle3-run.*.log` (or the PR it opens). Confirm root held pos 2–3.
2. Decide the next lever **once** (see reconciliation): owner sign-off on 06-23 Batch-2 301s vs. this thread's link-graph tightening — sequence Batch 2 first if both.
