# Pricing reconciliation — monthly $14.99, 90-day $39, Retaker retired (2026-06-30)

## New lineup (live)
| Tier | Price | Mode | Stripe price id | Supabase secret |
|---|---|---|---|---|
| Annual | $49.99/yr | subscription | `price_1TRQ38DjRScowBLl4mhAazTf` | `ASVABHERO_STRIPE_PRICE_ANNUAL` |
| Monthly | **$14.99/mo** (7-day trial) | subscription | `price_1TioxoDjRScowBLl3T8WSV0y` | `ASVABHERO_STRIPE_PRICE_MONTHLY` |
| 90-Day Pass | **$39** one-time | payment | `price_1ToFrWDjRScowBLljZvpaN52` (NEW) | `ASVABHERO_STRIPE_PRICE_PASS90` |
| ~~Retaker~~ | retired | — | product archived | — |

## Why
Owner cut monthly $24.99 → $14.99. To keep the ladder coherent (avoid the
inversion the 6/23 change fixed), the 90-Day Pass dropped $59 → $39 so it stays
below the $49.99 annual. Retaker $119 never sold → removed. Annual unchanged.

## What changed
- **Stripe:** created $39 pass price (`price_1ToFrW…`), set it as the 90-day
  product's default. Repointed MONTHLY secret to the existing $14.99 price
  (`price_1Tioxo…`, no new price needed). Archived: old $59 (`price_1Tioxu…`),
  legacy $9.99 (`price_1TRQ38…OSFQWlIN`), and the whole **Retaker product**
  (`prod_UiFS8e2IpYvlH3` — its $119 price was the product default so the price
  couldn't be archived alone). Old $24.99 (`price_1TlcAm…`) left ACTIVE so the
  one in-flight trial converts on it; nothing routes new buyers there.
- **Secrets + edge functions:** `supabase secrets set` MONTHLY→$14.99,
  PASS90→$39; redeployed `stripe-checkout` (WITHOUT `--no-verify-jwt`) and
  `stripe-webhook`. stripe-checkout `TIER_VALUE` synced (analytics only; the
  charge amount comes from the Stripe price). stripe-webhook day-8 email
  $24.99→$14.99.
- **Frontend (commits `5f70cb4`, `f13cd95` on main):** PricingPlans + upgrade +
  pricing + JSON-LD Offer prices + onboarding values + ~12 SEO pages swept
  $24.99→$14.99 / $59→$39. Retaker tier removed from sell surfaces
  (`Tier`/`CheckoutTier` types, tierOrder, upgrade steering, pricing JSON-LD).
  `RetakerOfferCallout` now routes retaker landing pages to `?tier=pass90`.
  Entitlement-side retaker handling kept for backward-compat. `public/llms.txt`
  updated. Central `.env` price ids synced.
- **Live Listmonk templates** (`list.asvabhero.com`, browser UA required):
  #5 Welcome, #15 tx-trial-ending ($24.99→$14.99), #17 Drip Day 7
  ($24.99→$14.99, $59→$39). Verified.

## Conversions snapshot at time of change (Stripe, ~120d)
5 annual active · 2 on grandfathered $14.99 · 2 on legacy $9.99 · 1 $24.99
trial · 2× $59 pass sold (6/21–6/22) · **0 Retaker ever**. Annual is the
workhorse. June ASVAB gross ≈ $368.

## Watch
- New monthly signups now bill $14.99; pass buyers $39. Confirm via a live test
  checkout or first real charges.
- Ladder now: $14.99/mo · $39/90-day · $49.99/yr. Revisit conversion mix in
  ~2–3 weeks.
