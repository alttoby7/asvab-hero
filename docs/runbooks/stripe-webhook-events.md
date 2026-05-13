# Stripe webhook events — canonical subscription list

Live endpoint: `we_1TRQ39DjRScowBLlbLoSKKXX` → `https://abypyprvgvofzrtifgzi.supabase.co/functions/v1/stripe-webhook`

The endpoint config lives in Stripe Dashboard, not in code. This file is the source of truth for which events SHOULD be subscribed. Compare against the Dashboard whenever the handler changes.

## Subscribed events

| Event | Handler | Purpose |
|---|---|---|
| `checkout.session.completed` | `case` in `stripe-webhook/index.ts` | Hydrates profile billing fields + sends welcome email + adds trial user to Listmonk segment |
| `customer.subscription.created` | `case` | Profile sync via `updateProfileFromSubscription` |
| `customer.subscription.updated` | `case` | Profile sync on status changes (e.g. `trialing → active`, `active → past_due`) |
| `customer.subscription.deleted` | `case` | Flips `billing_status='canceled'` — guarded against stale events |
| `customer.subscription.trial_will_end` | `case` | Sends T-3 trial-ending email via Listmonk template `tx-trial-ending` |
| `invoice.paid` | `case` | Profile sync + sends T+1 trial-converted email on `billing_reason=subscription_cycle` + marks any prior `payment_failed_emails` row as recovered |
| `invoice.payment_failed` | `case` | Sends dunning email on `billing_reason=subscription_cycle` + `collection_method=charge_automatically`. Per-invoice idempotency via `payment_failed_emails` table |

Any other event delivered to this endpoint hits the `default:` branch and returns 200 silently.

## How to update the subscribed list

1. Open https://dashboard.stripe.com/webhooks/we_1TRQ39DjRScowBLlbLoSKKXX
2. **Listen to events** → check/uncheck the desired event types
3. Save

Subscribing on Stripe BEFORE deploying handler code is safe — unknown events are silently ignored. Unsubscribing without deploying matching handler removal is also safe.

## Drift check

To audit Dashboard config against this file:

```bash
STRIPE_API_KEY=$(grep ^ASVABHERO_STRIPE_SECRET_KEY ../../.env | cut -d= -f2) \
  ~/.local/bin/stripe webhook_endpoints retrieve we_1TRQ39DjRScowBLlbLoSKKXX \
  --api-key "$STRIPE_API_KEY" | jq '.enabled_events'
```

The returned array should match the table above. If it doesn't, either the table is stale or the Dashboard drifted — pick one to be canonical and reconcile.

## Why this isn't automated

We could pipe this list into `stripe webhook_endpoints update --enabled-events …` from CI, but Stripe's API counts that as a privileged action requiring a secret key in CI. Manual is fine while we have one endpoint and rare changes. Automate when the list churns.

## Recent regressions worth remembering

- **2026-05-09 → 2026-05-12: `verify_jwt=true` regression on v10.** Caused every Stripe delivery to 401 for 3 days. Fixed by pinning `[functions.stripe-webhook] verify_jwt = false` in `supabase/config.toml` so future `supabase functions deploy` redeploys don't re-regress. Full audit at `Personal/asvab-hero/CONTINUITY-trial-verification-2026-05-12.md` in the parent Google Drive.
- **2026-05-13: `current_period_end` API version drift.** Stripe API `2025-03-31.basil` moved the field onto subscription items. Every `customer.subscription.{created,updated}` was throwing. Fix in commit `07d04f5`.
- **2026-05-13: stale subscription event clobbering.** Replayed events for cancelled subs were overwriting profile state with the cancelled sub_id. Fix in commit `554312b` adds `subscriptionEventIsStale` guard.
