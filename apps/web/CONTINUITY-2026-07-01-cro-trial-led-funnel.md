# CRO: Trial-led funnel + social proof + persistent banner (2026-07-01)

## Pricing freeze — DO NOT CHANGE PRICES UNTIL 2026-07-29

Four price changes in two weeks (6/17 → 6/23 → 6/28 → 6/30) made it impossible
to learn what works. The current lineup must hold for a full 4-week measurement
window before any further pricing decisions.

**Current lineup (frozen until 2026-07-29 minimum):**
| Tier | Price | Stripe price id |
|---|---|---|
| Annual | $49.99/yr | `price_1TRQ38DjRScowBLl4mhAazTf` |
| Monthly | $14.99/mo + 7-day trial | `price_1TioxoDjRScowBLl3T8WSV0y` |
| 90-Day Pass | $39 one-time | `price_1ToFrWDjRScowBLljZvpaN52` |

**Do NOT:**
- Change any Stripe prices or secrets
- Swap default tiers on sell surfaces
- Reorder the pricing ladder
- Archive or create new price objects

**When the freeze lifts (after 2026-07-29):** compare conversion rates by tier,
checkout completion rates, and trial-to-paid conversion. Only change one variable
at a time.

## What shipped (commit `b078768`)

### 1. Paywall leads with free trial instead of pass90
- **TestBlockedScreen.tsx:** Primary CTA changed from "Get my 90-Day Pass · $39"
  (`startCheckout("pass90")`) to "Start your 7-day free trial"
  (`startCheckout("monthly")`).
- Pricing anchor: "Free for 7 days · then $14.99/mo · cancel anytime"
- Returning subscribers (`billingStatus === "canceled" || "past_due"`) see
  "Go Pro — $14.99/mo" instead — stripe-checkout only grants trial to
  first-time subscribers (`!profile.stripe_subscription_id`).
- Subtexts updated throughout to mention trial.

### 2. Diagnostic results gate — already implemented
- `DiagnosticResultsBridge` already shows AFQT score to anon users but gates
  full breakdown (weakest topics, per-question review, study plan) behind free
  signup. No changes needed.

### 3. Social proof added to paywall + upgrade page
- "1,500+ practice questions · 39 study guides · used by recruits across all
  6 branches" added to both TestBlockedScreen (high-intent only) and
  /upgrade page (with icons).

### 4. Prices shown in tier toggle
- PricingPlans.tsx toggle buttons now show prices inline:
  "Annual $49.99/yr | Monthly $14.99/mo | 90-Day Pass $39"

### 5. Upgrade banner: persistent + in-app + trial CTA
- Dismiss behavior changed from permanent (`localStorage = "1"`) to 24-hour
  cooldown (stores timestamp, re-shows after 24h). **localStorage key changed**
  from `asvabhero.upgradeBannerDismissed` to `asvabhero.upgradeBannerDismissedAt`
  — existing dismissals are effectively reset (intentional: one-time re-exposure
  after this deploy).
- Banner now visible on `/app/*` paths (was previously hidden there).
- Copy: "try Pro free for 7 days" instead of "90-Day Pass $39".
- CTA: "Start free trial" linking to `/upgrade?from=banner&tier=monthly`.

### 6. Upgrade page defaults to trial for paywall traffic
- When `?from=` matches a paywall source, defaultTier is `monthly` (trial hero)
  instead of `annual`. Direct `/upgrade` visits still default to annual.
- Monthly hero added: "Free for 7 days · then $14.99/mo · cancel anytime".

## Why these changes (diagnosis summary)

- **68% of paywall views were anonymous users** who couldn't buy — the
  diagnostic results gate (already in place) is the fix.
- **pass90 had ~70% Stripe abandonment** — upfront $39 is high friction.
  Monthly trial is zero-perceived-risk entry.
- **Zero social proof** existed anywhere in the purchase funnel.
- **Annual (the historical converter) got 0 recent clicks** despite being the
  grid default — the paywall bypassed it entirely with a direct pass90 checkout.
- **Upgrade banner was permanently dismissable** — one click and it's gone
  forever. Now returns after 24h.

## Files changed
```
apps/web/src/components/practice-test/TestBlockedScreen.tsx
apps/web/src/components/PricingPlans.tsx
apps/web/src/components/UpgradeBanner.tsx
apps/web/src/app/upgrade/page.tsx
```

## Watch (next 4 weeks)
- Trial starts per week (monthly checkout completions)
- Trial-to-paid conversion at day 7 (stripe webhook `invoice.paid` after trial)
- Paywall → checkout click rate (was 3.9%, target >8%)
- Banner click-through rate on `/app/*` paths
- Annual vs monthly vs pass90 checkout distribution shift
- Any `checkout_returned_error` events (should remain 0)
