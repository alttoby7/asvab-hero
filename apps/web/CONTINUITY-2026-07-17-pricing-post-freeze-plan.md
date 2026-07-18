# Pricing — POST-FREEZE PLAN (2026-07-17)

**STATUS: PLAN ONLY. No prices, Stripe IDs, secrets, or config changed.** Pricing
is frozen until **2026-07-29** (see `CONTINUITY-2026-07-01-pricing-pass-59-committed.md`,
owner: "changed prices a lot... $59 is right, stop fiddling"). This doc is the
data-grounded plan to execute on/after that date. Grounded in a deep-research pass
(competitors + Play economics) and two live data pulls (2026-07-17).

## Current live lineup (unchanged)
| Tier | Price | Mode | Stripe price id | Supabase secret |
|---|---|---|---|---|
| Annual | $49.99/yr | subscription | `price_1TRQ38DjRScowBLl4mhAazTf` | `ASVABHERO_STRIPE_PRICE_ANNUAL` |
| Monthly | $14.99/mo (7-day card trial) | subscription | `price_1TioxoDjRScowBLl3T8WSV0y` | `ASVABHERO_STRIPE_PRICE_MONTHLY` |
| 90-Day Pass | $59 one-time | payment | `price_1TioxuDjRScowBLlrpLZuA76` | `ASVABHERO_STRIPE_PRICE_PASS90` |

**Two ladder inversions today:** (a) 3×monthly = $44.97 < $59 Pass, so a price-sensitive
buyer with a 1–3 month window sees the churny monthly as *cheaper* than the Pass we want to
lead with; (b) Pass $59 > Annual $49.99 (visible only on the full pricing page; ads route to
the Pass alone, so ad funnel unaffected — owner already accepted this 7/01).

## What the data says (2026-07-17, ~2-month-old dataset — directional, small n)
- **Prep window is short.** Of users who set a test date (bucket data n=131): ~50% test within
  30 days, ~80% within 90 days. The **90-day term already covers ~85%+** of buyers — keep the
  term; fix the framing/price, not the length. (Exact-date subset n=25: median 8 days.)
- **Monthly barely renews.** Monthly base: 12 active / 12 canceled / 2 past-due. Of the 12
  canceled, **8 canceled within ~1 day of first charge** (zero paid tenure) and only ~2 ever
  reached a 2nd charge. → The recurring LTV "lost" by de-emphasizing monthly is **small**;
  most monthly subs never become durable revenue. Annual (6 active) has **0 renewal events yet**
  (product too young) — no annual-vs-monthly retention comparison exists.
- **Play/Android is minor.** Desktop 63% / mobile 37% of sessions; Android is only **~16% of
  mobile ≈ ~6% of total** traffic; mobile converts on par with desktop. A Play app reaches a
  thin slice — **web pricing is the priority; Play is a low-stakes secondary channel.**
- **Trial mechanic is elite.** Card-required 7-day trial → ~58% trial→paid (above SaaS "great"
  tier of 50–60%). **Keep the card requirement; do not weaken the trial.**
- **Competitive band (room to raise):** Peterson's $58.99/1mo · $134.99/3mo · $234.99/6mo;
  Mometrix $39.99/mo; Kaplan ~$99 one-time. Current lineup sits at/below the floor.

## The core move: lead with the Pass, fix the ladder
The Pass is the right hero (short prep windows, no involuntary churn, matches buyer intent),
and the data says leading with it costs almost no recurring LTV. The blocker is the inverted
ladder. Fix it primarily by **raising monthly** (which the data shows is low-value volume),
not by cutting the Pass.

### Phase 1 — highest confidence, do first (post-freeze)
**Monthly $14.99 → $24.99.** This restores the coherent 6/23 ladder (3×$24.99 = $74.97 > $59
Pass, so the Pass is the obvious deal). NOTE: this was shipped 6/23 then reverted to $14.99 on
6/30 — but the revert happened *before* the 6/23 doc's own planned 7/14 conversion review, so
$24.99 was **never actually evaluated on data**. The LTV data above now justifies re-approaching
it and *holding* it this time. Leave Pass $59 and Annual $49.99 as-is. Grandfather existing subs.
- Resulting ladder: **$24.99/mo · $59/90-day · $49.99/yr** (Pass>Annual inversion persists,
  pricing-page-only — same as owner already accepted 7/01).
- Watch: monthly trial-start→day-8 paid conversion and pass-vs-monthly mix for ~2–3 weeks
  before any Phase 2 move.

### Phase 2 — owner decisions (optional, after Phase 1 data)
Two ways to also clear the Pass>Annual inversion and capture more headroom:
- **Raise Annual $49.99 → $79** (removes the inversion; annual is highest-LTV; $79/yr still far
  under competitors). RISK: annual is the current workhorse (6 active) — consider A/B or
  grandfather. Target ladder becomes **$24.99/mo · $59–69/90-day · $79/yr** (fully coherent:
  Pass is the value hero, Annual the committed-tier premium).
- **Raise Pass $59 → $69** for more paid-ad break-even headroom (break-even CPS rises ~$57→~$66;
  serves the owner's ad-economics rationale). ⚠️ This revises the explicit "stop fiddling at $59"
  commitment — do NOT do without owner sign-off; it's an *increase for headroom*, not a thrash.

### Play (separate, low-priority track)
When the Android app ships: Google requires **no price parity**, so price the Play tier ~20–30%
higher to absorb the ~15% cut, keep Annual web-only, and (legal post-Epic in the US, but the
relief sunsets ~Nov 2027) surface a "subscribe on the web for less" link steering new signups to
web checkout. Given Android ≈6% of traffic, don't over-invest yet.

## Open decisions for owner (before executing Phase 2)
1. Phase 1 monthly $24.99 — OK to re-apply and hold? (recommended: yes)
2. Annual $49.99 → $79? (removes inversion, but touches the workhorse tier)
3. Pass $59 → $69? (more ad headroom, but revises the committed $59)
4. Confirm 90-day term stays (data says yes; ~85% coverage).

## Execution recipe (when approved — mirrors 6/23 & 7/01 docs)
Stripe prices are immutable — for each changed price:
1. **Stripe:** create a NEW price on the existing product; do NOT edit old prices (grandfathered
   subs bill on them). Archive dangling unused prices only.
2. **Secret:** `supabase secrets set ASVABHERO_STRIPE_PRICE_{MONTHLY|ANNUAL|PASS90}=<new id>`
   (project `abypyprvgvofzrtifgzi`).
3. **Edge fns:** redeploy `stripe-checkout` (**WITHOUT** `--no-verify-jwt` — it must keep
   default verify_jwt=true; only `stripe-webhook` is verify_jwt=false) and `stripe-webhook`.
   Update `TIER_VALUE.*` (analytics only; charge amount comes from the Stripe price).
4. **Central `.env`:** sync the `ASVABHERO_STRIPE_PRICE_*` id(s).
5. **Frontend sweep** (both display + schema): `PricingPlans.tsx` `TIERS`, `upgrade/page.tsx`
   `HERO`, JSON-LD `Offer.price` on `/` and `/pricing`, `onboarding` value, `upgrade` meta,
   `public/llms.txt`, and the SEO pages that quote the price. Keep competitor/market-range/study-
   guide-count numbers untouched. Build must stay green.
6. **Listmonk templates** (`list.asvabhero.com`, **browser User-Agent required** — CF 403s
   `Python-urllib`): #5 Welcome, #15 tx-trial-ending, #17 Drip Day 7. Sync repo copies in
   `docs/`.
7. **Verify:** live test checkout shows the new price on each changed tier.

## Watch / success metrics
- Monthly trial→paid conversion and **pass-vs-monthly mix** (goal: mix shifts toward the Pass).
- ARPU / blended revenue per paying customer (should rise even if monthly volume dips).
- Pass unit sales at $59 vs $69 if Phase 2 runs.
- Re-pull churn/LTV once annual subs start hitting renewals (currently 0 observable).

## Sources
Deep-research report (competitors, Play economics, trial benchmarks) + Supabase/GA4 pulls
2026-07-17. Prior: `CONTINUITY-2026-06-23-monthly-price-24-99.md`,
`CONTINUITY-2026-06-30-pricing-14-99-pass-39.md`, `CONTINUITY-2026-07-01-pricing-pass-59-committed.md`.
