# Meta Pixel + Conversions API installed (2026-07-01)

Goal: instrument conversions so paid-ad tests are measurable (and build a
retargeting audience from organic traffic now). Pixel + server CAPI, deduped.

## IDs / secrets
- **Pixel (dataset) ID:** `2513826189132647` (hardcoded in `SiteScripts.tsx`).
- **CAPI token:** Supabase secret `ASVABHERO_META_CAPI_TOKEN`; pixel id also in
  secret `ASVABHERO_META_PIXEL_ID`. Both mirrored to central `.env`. Token is a
  system-user token (long-lived); if CAPI 190/OAuth errors appear, regenerate in
  Events Manager > dataset > Settings > Conversions API and re-set the secret.

## Events (browser Pixel + server CAPI, deduped by event_id)
| Event | Browser (Pixel) | Server (CAPI, stripe-webhook) | Dedup key |
|---|---|---|---|
| PageView | on load + SPA route change | — | — |
| ViewContent | `paywall_viewed` auto-mirror | — | — |
| Purchase (pass90/retaker/annual) | explicit on `/onboarding` success | `checkout.session.completed` | Stripe session id |
| StartTrial (monthly, 7-day trial) | explicit on `/onboarding` success | `checkout.session.completed` (status=trialing) | Stripe session id |
| Subscribe (trial -> paid) | — (fires off-site ~day 7) | `invoice.paid` (subscription_cycle + had trial) | invoice id |

**Dedup mechanism:** checkout `success_url` carries `&sid={CHECKOUT_SESSION_ID}`.
The browser uses that `sid` as the Pixel `eventID`; the webhook uses the same
session id as CAPI `event_id`. Meta collapses the pair into one conversion.
Purchase value = `amount_total/100`; email SHA-256 hashed for match quality.

## Files
- `src/components/SiteScripts.tsx` — base pixel + noscript + SPA PageView.
- `src/lib/analytics.ts` — `trackMeta()` (explicit) + `paywall_viewed`->ViewContent
  auto-mirror inside `trackEvent()`. Purchase/StartTrial are routed by plan, NOT
  auto-mirrored (so monthly = StartTrial, not Purchase).
- `src/app/onboarding/page.tsx` — fires Purchase (pass/annual) or StartTrial
  (monthly) with `event_id = sid ?? transactionId`.
- `supabase/functions/stripe-checkout/index.ts` — appended `&sid={CHECKOUT_SESSION_ID}`.
- `supabase/functions/stripe-webhook/index.ts` — `sendMetaCapi()` helper +
  Purchase/StartTrial/Subscribe fires. Swallows all errors; never fails webhook.

## Verified
- CAPI token valid; test ViewContent returned `events_received:1`.
- Build green; both edge functions redeployed; frontend pushed to main.

## TODO / watch
- Confirm in Events Manager > Test Events (or the dataset overview) that a real
  checkout shows a deduped Purchase (browser + server, dedup rate > 0).
- Match quality is currently email-only server-side. To raise it later, pass the
  browser `client_user_agent` + `fbp`/`fbc` cookies + client IP into checkout
  metadata and forward them in `sendMetaCapi` user_data.
- No `test_event_code` wired; all events go to production.
