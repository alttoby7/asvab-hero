# PICKUP 2026-07-01 → resume tomorrow (ads / pricing / tracking)

Session goal: figure out how to run ads to drive ASVAB Hero signups, and whether
to lead with a free trial or a paid offer. Ended up also reverting the pass price
and installing full conversion tracking. **Start with "NEXT" below.**

## Context that drives everything
Stripe shows only **~13 lifetime consumer sales** (June was the first real
cluster; 0 sales yet at the newest pricing). **The funnel is not yet proven to
convert traffic.** So the plan is prove-it-first, near-zero budget — NOT a
$500–2k ad spend. Owner is not comfortable spending until it's proven.

## Research verdict (already delivered, for reference)
- **Ads worth it now?** Not with real money yet. Prove demand on FREE channels
  first, then a $50–100 smoke test.
- **Trial vs paid?** Lead ad traffic with the **$59 pass + money-back/pass
  guarantee** (direct-to-paid). Keep the free trial for FREE/organic traffic
  only (no-card trials on paid traffic just buy tire-kickers).
- **Cheapest channel:** Reddit (r/Militaryfaq 71k, r/newtothenavy, r/army,
  r/ASVAB) organic first, then a tiny Reddit/Google-Search smoke test.
- Break-even: $59 pass profits up to ~$57 cost-per-sale; healthy target ≤ ~$20.

## SHIPPED today (all live + verified)
1. **Pass price reverted $39 → $59, COMMITTED** (stop changing it). Stripe price,
   PASS90 secret, both edge functions, all site copy + JSON-LD, onboarding,
   llms.txt, and Listmonk drip #17 all say $59. Verified live on
   /pricing, /upgrade, /. See `CONTINUITY-2026-07-01-pricing-pass-59-committed.md`.
2. **Meta Pixel + Conversions API** installed, deduped, live. Pixel
   `2513826189132647`; CAPI from stripe-webhook (Purchase/StartTrial/Subscribe).
   Token validated (events_received:1). See `CONTINUITY-2026-07-01-meta-pixel-capi.md`.

## NEXT (do these tomorrow, in order)
1. **Verify dedup:** do one real (or test-mode) checkout → Events Manager →
   dataset → Test Events / Overview → confirm a Purchase with **dedup rate > 0**
   (browser + server pairing). This is the only unconfirmed piece.
2. **Decide the annual inversion** ($59 pass now sits ABOVE the $49.99 annual).
   Options: raise annual to ~$79, OR reframe annual as "cheapest per-day
   subscription" vs pass "one-time, nothing to cancel." Only matters on the full
   /pricing page; ad funnel drives to the pass alone. Currently left as-is.
3. **Organic validation plan (the real next move):** post genuinely helpful
   answers in r/Militaryfaq + 2 subreddits with a UTM link
   (`asvabhero.com/?ref=reddit`), publish 3–5 Shorts ("Jordan Avery" persona).
   Proof gate in ~2–3 weeks: ≥ 20–30 signups + ≥ 2–3 sales traceable to posts.
   Only THEN run a $50–100 smoke test (Reddit or exact-match Google Search:
   "asvab practice test", "how to pass the asvab"). Kill/scale gate:
   cost-per-$59-sale ≤ $40 = scale; > $57 = stop, stay organic.
   (Ask Claude to turn this into a tracked checklist.)

## Optional later
- Raise CAPI match quality: pass browser client_user_agent + fbp/fbc + client IP
  into checkout metadata, forward in `sendMetaCapi` user_data (currently email-only server-side).
- Archive the now-unused $39 pass price in Stripe (`price_1ToFrW…`; nothing routes to it).
