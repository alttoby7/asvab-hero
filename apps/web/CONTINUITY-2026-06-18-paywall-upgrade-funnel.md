# Paywall → Upgrade → Checkout Funnel CRO — CONTINUITY (2026-06-18)

## What shipped

Full CRO audit + fix of the paywall-to-purchase funnel. Commit `0ca29e1` merged to main, pushed, CF Pages auto-deploying.

### Problem (GA4 data, 28d window ending 2026-06-18)
- 94 users see a paywall → 63% rage-quit
- Of the 37% who click through to /upgrade, only 15% click checkout
- Checkout completion itself is 92% (Stripe works)
- **End-to-end: paywall → purchase ≈ 5%**

### Root causes found (CRO audit, LIFT model)
1. **TestBlockedScreen (paywall):** No pricing visible, lock-icon punishment framing, no urgency, generic copy, sends to /upgrade as intermediary step → 13/30 LIFT
2. **/upgrade page:** Checkout CTA buried 1.6 scrollfolds down, "Not ready for Pro?" escape hatch ABOVE pricing, Free plan card competing side-by-side, 1.9MB hero image (4.5s FCP), 28 escape route links, generic page title → 12/30 LIFT

### 6 fixes shipped

**TestBlockedScreen.tsx:**
1. **Direct-to-Stripe checkout** for logged-in high-intent users (4 reasons: `free_diagnostic_used`, `anon_diagnostic_used`, `pro_only_variant`, `free_adaptive_daily_limit`). Bypasses /upgrade entirely. Uses new `useStripeCheckout` hook.
2. **Price anchoring:** "$59 one-time · 90 days · Money-back guarantee" visible on the paywall (high-intent only)
3. **Progress framing:** Rocket icon replaces lock for high-intent. Headlines reframed ("Great first step — ready for the full program?" etc.)
4. **Test-date urgency:** "Your test is in X days — every practice day counts" pulled from `profiles.target_test_date`
5. **Personalized subtext:** Uses `variant` + `subtest` props (e.g., "Unlock AR subtest drills")
6. Pre-purchase variants (`adaptive_needs_account`, `free_user_no_diagnostic`) LEFT UNCHANGED — they need signup, not checkout

**/upgrade/page.tsx:**
1. **Above-fold checkout CTA** with price, guarantee, and buy button visible without scrolling
2. **Escape hatch removed** — "Not ready for Pro?" card deleted
3. **Free plan hidden for paywall traffic** — `PricingPlans` accepts `hideFreePlan` prop; Pro card centered in `max-w-md`
4. **Hero image deferred** — `priority` removed, now lazy/async (was 1.9MB eager load)
5. **`from` param mapping fixed** — all 6 TestBlockedScreen reasons now recognized in HEADLINES
6. **Page title + meta description added** via `layout.tsx`

**Shared:**
- `useStripeCheckout.ts` hook extracted from PricingPlans for reuse
- `placement` param added to checkout analytics (hero vs pricing_grid vs paywall)

### Files changed
- `apps/web/src/hooks/useStripeCheckout.ts` — NEW (shared Stripe checkout hook)
- `apps/web/src/app/upgrade/layout.tsx` — NEW (title + meta description)
- `apps/web/src/app/upgrade/page.tsx` — above-fold CTA, escape hatch removed, hero deferred, from-mapping fixed
- `apps/web/src/components/PricingPlans.tsx` — `hideFreePlan` + `placement` props
- `apps/web/src/components/practice-test/TestBlockedScreen.tsx` — direct checkout, pricing, urgency, reframing

### Codex review corrections applied
1. #5 (inline Stripe) → extracted `handleUpgradeClick` via hook, not embedded Stripe UI
2. Free card still leaks → suppressed via `hideFreePlan` for paywall entrants
3. Pricing not uniform → only high-intent variants show $59 (not `needs_account`/`no_diagnostic`)
4. Hero image → deferred + lazy (not just compressed)
5. `from` continuity → mapping expanded to cover all 6 TestBlockedScreen reasons + banner
6. Missing measurement → `placement` param added to checkout events

### Expected impact
If fixes move paywall click-through to 60% (from 37%) and /upgrade checkout click to 40% (from 15%), end-to-end becomes ~22% — a **4.4x improvement** on the same traffic.

### Next steps
- [ ] Verify deploy on asvabhero.com (CF Pages auto-deploys from main)
- [ ] Check GA4 ~2026-07-05 for:
  - `checkout_click` events with `placement=paywall` (direct-to-Stripe working)
  - `checkout_click` events with `placement=hero` (above-fold CTA working)
  - paywall rage-quit rate change (should drop from 63%)
  - /upgrade checkout click-through (should rise from 15%)
  - purchase count lift
- [ ] Still unused: hero image compression/replacement (lazy helps but 1.9MB is still large)
- [ ] Consider removing hero image entirely for paywall traffic
- [ ] A/B test: paywall direct checkout vs /upgrade redirect

### CRO audit reports
Full LIFT-model reports were delivered in the conversation for both pages. Key scores:
- /upgrade page: 12/30 (pre-fix)
- TestBlockedScreen: 13/30 (pre-fix)
