# CONTINUITY — Restore Annual-led pricing (2026-06-28)

## What changed & why

On **2026-06-17** the paywall pivoted to "pass-led": the **Annual $49.99/yr** plan was pulled from
default visibility and the **$59 one-time 90-Day Pass** became the default/recommended tier with the
primary CTA. Owner reported "not getting new purchases."

This change **reverts to annual-led packaging** (frontend-only; backend already supported `tier=annual`):
- **Annual $49.99/yr** is the default + "Best value" recommendation everywhere.
- **$59 90-Day Pass** demoted to a secondary "short-term option" (badge changed from "Best for test
  day" → "Short-term option").
- **Monthly $24.99/mo** (7-day trial) kept as the low-friction start option.
- **Retaker $119** unchanged; still served to the explicit retaker segment.
- Primary upgrade CTA goes **straight to Stripe checkout** for the recommended (annual) tier.

## Evidence (decision-risk grounds, not statistical significance)

First-party `analytics_events` funnel pulled 2026-06-27:

| Window | upgrade views | paywall views | checkout_click | tier mix | redirected |
|---|---|---|---|---|---|
| 5/27–6/17 (21d, annual-led) | 135 | 160 | 11 | annual 8, monthly 3 | 11/11 |
| 6/17–6/27 (10d, pass-led)   | 96  | 167 | 8  | pass90 5, monthly 3, annual 0 | 7/8 |

Annual was the most-chosen tier (8/11 clicks) before removal; clicks went to 0 only because it was
removed. New default is worse on its face ($59 upfront for shorter access vs $49.99/yr). Codex
(gpt-5.4) concurred: low-cost reversible rollback; do NOT A/B split — ship, instrument, compare clean
pre/post windows.

## Files touched (all `apps/web/`)

- `src/hooks/useStripeCheckout.ts` — `CheckoutTier` includes `"annual"`; default `"annual"`.
- `src/components/PricingPlans.tsx` — annual `TierConfig` ("Best value"); `defaultTier="annual"`;
  `tierOrder=["annual","monthly","pass90","retaker"]`; pass90 badge → "Short-term option";
  recommended-annual ★ note block.
- `src/app/upgrade/page.tsx` — tier resolution defaults to annual; `heroTier` covers
  annual/pass90/retaker; `HERO` has annual entry + per-tier `sub`; hero sub-note uses
  `{HERO[heroTier].sub}`; `recommendedTier={isRetaker ? "retaker" : "annual"}`.
- `src/app/pricing/page.tsx` — `defaultTier="annual"`; added **Pro Annual $49.99** Offer to
  SoftwareApplication JSON-LD (was missing entirely); intro copy + meta description lead with annual.

**No edge-function change** — `supabase/functions/stripe-checkout/index.ts` already maps
`tier=annual` → `ASVABHERO_STRIPE_PRICE_ANNUAL` in subscription mode. Stripe annual price active
(`price_1TRQ38DjRScowBLl4mhAazTf`); env present in central `.env` + deployed Supabase secrets.

## Build

`cd apps/web && npm run build` — green; `/pricing` and `/upgrade` prerender clean (useSearchParams
already Suspense-wrapped).

## Measurement gap (follow-on, not blocking)

`checkout_click → purchase` is NOT authoritatively observable first-party today:
- Deepest reliable first-party step = `checkout_redirected`.
- Client-side `checkout_returned_completed` exists (~19/60d) but only fires on success-page return
  (under-counts tab-closers).
- `supabase/functions/stripe-webhook/index.ts` grants Pro + writes billing ledger/profiles but does
  **not** insert into `analytics_events`.

**Recommended follow-on:** have `stripe-webhook` emit a server-side `purchase_completed` analytics
event (`tier`, `mode`, `amount`, `checkout_session_id`, `source`) so future packaging calls use
revenue, not clicks. Optionally tag this rollout `annual_default_2026_06_28`.

## Verify after deploy (CF Pages auto-build on push to `main`)

1. `/upgrade` + `/pricing` show Annual $49.99/yr as default + "Best value"; $59 pass demoted.
2. Annual hero CTA → Stripe checkout in **subscription** mode (logged-in) / signup `?tier=annual`
   (logged-out). Confirm `checkout_redirected` ~100%.
3. **7 days:** annual click-share reappears; view→click vs 6/17–6/27.
4. **14 days:** purchases/revenue (Stripe), not just clicks.

## Status

- [x] Code changes applied + build green
- [ ] Committed
- [ ] Pushed to `main` (= prod deploy) — **awaiting owner go-ahead**
- [ ] Follow-on: `purchase_completed` server-side event in stripe-webhook
