# Continuity — Calculator Conversion Sprint (pickup 2026-05-31)

Plan: `~/.claude/plans/how-cna-we-fix-woolly-cake.md`
Goal of this sprint: lift signups from the calculator, the highest-intent surface
(~4,010 `calculator_submit`/28d, ~93% of all search clicks). Email list was 30.

## Diagnosis (from GA4 prop 404444165 + GSC sc-domain:asvabhero.com, 28d)

Calculator funnel was effectively dead:
- `calculator_submit` 4,010 -> `calculator_view_result` 605 -> `bridge_cta_click` **4** -> `generate_lead` **1**.
- Root cause: the only CTA (`CalculatorResultBridge`) begged users to "create an
  account to see the full list of jobs you qualify for" while `JobResults` already
  listed every job free right below it. Fake gate -> 0.66% CTR.
- `generate_lead`=1 was a RED HERRING: that event's firing code only deployed ~May 28
  and was registered as a GA4 Key Event 2026-05-29, so ~2 days of history, not a
  failure rate. The `/api/signup` endpoint is healthy (tested live, 200, lands in
  Listmonk list 3). The real problem was just no working capture on the calc result.

Owner decisions (locked): (a) two-step = email first, then nudge to free account;
(b) gate a personalized improvement plan, KEEP the jobs list free (protects ranking).

## SHIPPED (commit `ea8081f` on `main` -> Cloudflare auto-deploy; new deploy verified live)

- **`src/components/CalculatorPlanCapture.tsx`** (new): result-aware two-step capture.
  - Step 1: one-field email form, copy keyed off `tierFraming(afqt)` (target 50/65/93)
    + the two biggest AFQT levers (weight x headroom; WK/PC count double via VE).
    POST `/api/signup` with `tag:"calculator-plan"`, `source:"calculator-result"`, full
    `scores` payload. Reuses EmailCapture's POST/replay/`asvabhero.last_capture_source`.
  - Step 2 (success): shows top 2 levers instantly (chips, "Counts 2x" badge), then a
    free-account nudge to `/signup?next=/app/plan?afqt&branch` (path-integrity).
  - Events: `plan_capture_shown` (IntersectionObserver), `plan_capture_submit`,
    `plan_account_nudge_click`, `generate_lead` (on success).
- **`src/components/Calculator.tsx`**: removed `CalculatorResultBridge` from above the
  inputs; mounted `CalculatorPlanCapture` right under the "Your AFQT Score" section,
  gated on `afqtReady` (appears the instant the AFQT is known). Jobs list untouched/free.
- **`functions/api/signup.ts`**: added `calculator-plan` -> `LISTMONK_TEMPLATE_CALC_PLAN`
  in `TAG_TEMPLATE_ENV_MAP` + the Env field. Falls back to welcome template if unset.
- `CalculatorResultBridge.tsx` left in tree (no longer imported; `tierFraming` was
  re-implemented locally in the new component). Safe to delete later.
- Stripped a stray em-dash from `AffiliateBookBlock.tsx` comment so the guard passes.
- Verified: `tsc --noEmit` clean, `npm run build` exit 0, `check-no-emdash.mjs` OK.

## SHIPPED — Listmonk plan email (this is the WS4 piece)

- **Template id 22** "ASVAB Hero — Calculator Improvement Plan" (type `tx`).
  Subject: "The 4 subtests that move your AFQT (your plan inside)". Source HTML at
  `/tmp/calc-plan-email.html` (regenerate from there if editing).
  - Score-aware: `{{ if .Subscriber.Attribs.scores }}` block renders AR/WK/PC/MK via
    `{{ index .Subscriber.Attribs.scores "AR" | default "-" }}` (WK/PC tagged x2).
  - 4-week plan linking only to existing pages (`/asvab-word-knowledge-tips`,
    `/asvab-paragraph-comprehension-tips`, `/asvab-arithmetic-reasoning-tips`,
    `/asvab-math-tips`, `/free-asvab-practice-tests`, `/calculator`), free-account CTA,
    drip preview, "this is an estimate" footer. Unsubscribe uses list-3 UUID
    `6cfd6a05-8ac2-498b-86ca-9bb381e1d006`. No em dashes.
  - Render-tested via `/api/tx` against a subscriber with scores -> `{"data":true}`.
- **Cloudflare Pages env**: `LISTMONK_TEMPLATE_CALC_PLAN=22` added to project `asvab-hero`
  production (PATCH key-level merge; 25->26 vars, 3 secret_text vars intact). Triggered a
  fresh prod deployment (id a6a0c50a) so the Function picks it up. Deploy = success.
- **E2E verified on prod**: POST `/api/signup` {tag:calculator-plan, scores:{AR45,WK50,
  PC48,MK42}} -> 200; subscriber landed in list 3 with `attribs.scores` preserved +
  `source=calculator-result`; test sub deleted. Full chain works.

## Open follow-ups (none blocking)

1. **Drip not confirmed.** Email 22 promises "Day 2/5/10/14" emails. Drip templates
   exist (ids 7/8/9/10) but I did NOT confirm an automation enrolls list-3 signups and
   fires them. Welcome email (id 5) makes the same promise, so pre-existing — but verify
   the list-3 drip automation actually runs before trusting the promise.
2. **First name blank.** Capture collects email only -> greeting falls back to "there".
3. **Measure.** Baseline to beat: 605 results -> 1 lead (0.16%). Watch
   `plan_capture_shown` -> `generate_lead` in ~1 week (GA4 prop 404444165).
4. **`CalculatorResultBridge.tsx`** can be deleted once confirmed dead.

## NEXT sprint (recommended, not started): calculator-page de-cannibalization

Highest-leverage traffic move. ~12 per-branch calc pages exist but are thin
(`army-asvab-calculator` 234 lines) and the homepage cannibalizes them -> they rank
pos 30-52 instead of top-5 for their branch term (GSC: "army asvab calculator" pos 52,
"air force asvab calculator" pos 30). Also stranded high-impression pages: `/army-ranks`
(2,348 impr, pos 49.6, 0 clicks), `/air-force-ranks` (885, pos 65.7), `/asvab-scores-
explained` (1,367, pos 43). Deepen + de-dupe + internal-link; every page fixed now also
runs the new capture. Start with a GSC striking-distance audit (pos 8-20) for the full list.
