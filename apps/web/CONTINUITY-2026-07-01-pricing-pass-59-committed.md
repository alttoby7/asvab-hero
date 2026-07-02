# Pricing — 90-Day Pass reverted $39 → $59 (COMMITTED, 2026-07-01)

## Decision
Owner: "I've changed prices a lot but I think $59 is the right way to go and
stick with." This is the committed price — **stop fiddling with the pass price.**
Rationale: reverting to $59 restores paid-ad headroom (break-even cost-per-sale
~$57 vs ~$37 at $39; the whole point is to make paid acquisition viable) and
$59 is well within test-prep norms (Kaplan $99, Mometrix $39.99/mo). See the
ads research thread from this session.

## Live lineup now
| Tier | Price | Mode | Stripe price id | Supabase secret |
|---|---|---|---|---|
| Annual | $49.99/yr | subscription | `price_1TRQ38DjRScowBLl4mhAazTf` | `ASVABHERO_STRIPE_PRICE_ANNUAL` |
| Monthly | $14.99/mo (7-day trial) | subscription | `price_1TioxoDjRScowBLl3T8WSV0y` | `ASVABHERO_STRIPE_PRICE_MONTHLY` |
| 90-Day Pass | **$59** one-time | payment | `price_1TioxuDjRScowBLlrpLZuA76` (reactivated) | `ASVABHERO_STRIPE_PRICE_PASS90` |

## What changed
- **Stripe:** reactivated old $59 price `price_1Tioxu…` (active=true). Archived
  the dangling $24.99 monthly `price_1TlcAm…` (active=false; the earlier in-flight
  trial has since resolved). The $39 price `price_1ToFrW…` left active but nothing
  routes to it (safe to archive later).
- **Secret:** `supabase secrets set ASVABHERO_STRIPE_PRICE_PASS90=price_1Tioxu…`.
- **Edge functions redeployed:** `stripe-checkout` (WITHOUT `--no-verify-jwt` —
  keep default verify_jwt=true) and `stripe-webhook`. `TIER_VALUE.pass90`
  "39.00"→"59.00" (analytics only; charge amount comes from the Stripe price).
- **Frontend:** swept every ASVAB Hero pass "$39"→"$59" across UI + SEO pages +
  JSON-LD Offer (`/` and `/pricing`) + `onboarding` pass90 value + `upgrade`
  meta + `public/llms.txt`. Competitor prices ($39.99 Mometrix, Peterson's
  $39–49/mo), market ranges ($39–200), and the "39 study guides"/"39 topic study
  pages" counts + AFQT score "39"s were deliberately LEFT. Build green.
- **Central `.env`:** `ASVABHERO_STRIPE_PRICE_PASS90` synced to $59 id.

## STILL TODO (not done this session)
- **Listmonk templates** (`list.asvabhero.com`, browser UA required): #17 Drip
  Day 7 (and any others) still say "$39" for the pass — revert to "$59". Same
  templates the 6/30 doc changed $59→$39.
- **Live checkout smoke test:** confirm a real pass checkout shows $59.

## OPEN DECISION (flagged for owner — NOT acted on)
At $59 the pass sits ABOVE the $49.99 annual (price inversion). Only visible on
the full pricing page; the ad funnel drives to the pass alone so ads are
unaffected, and an annual sale is higher-LTV anyway so it's not lost revenue.
Options when ready: raise annual to ~$79, or reframe annual as "cheapest per-day
subscription" vs pass "one-time, nothing to cancel." Left as-is for now.
