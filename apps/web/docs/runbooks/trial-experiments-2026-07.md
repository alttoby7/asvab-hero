# Trial experiments — activation runbook (2026-07-18)

Two flag-gated, reversible experiments shipped as CODE (default OFF). Nothing is
live until the owner sets the secrets + deploys the two edge functions below.
Design pressure-tested cross-vendor (codex/gpt-5.4, high) 2026-07-18.

Both default to the current behavior with no env set, so merging this is inert.

---

## A. "$1 for 7 days" trial variant (anti-abuse / card-quality A/B)

**What it does.** For a first-time *monthly* subscriber, adds a one-time **$1**
Price as a second line item on the same Stripe-hosted Checkout Session. Stripe
charges the $1 immediately at trial start and still begins the recurring charge
at day 7 — one card entry, no double-charge. Assignment is a deterministic hash
of `user_id` (stable cohort), stamped into session + subscription metadata
(`trial_variant = free_7d | paid_1_7d`).

**Honest expectation (codex + our data):** the $1 is a *small* quality filter
(blocks throwaway/dead cards, not new-card/virtual-card abusers) and does **not**
fix the day-7 `insufficient_funds` churn — a card that clears $1 today can still
decline $24.99 in 7 days. Deploy multi-touch dunning for that (separate). Treat
this as an experiment to measure, not a guaranteed win; it adds checkout friction
and traffic is our bottleneck.

### Activate
1. **Stripe → create a one-time $1 Price** on the existing ASVAB Hero Pro product
   (NOT recurring). Copy the `price_…` id.
2. **Secrets** (`supabase secrets set … --project-ref abypyprvgvofzrtifgzi`):
   - `ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR=price_…`
   - `STRIPE_MONTHLY_TRIAL_EXPERIMENT=hash_rollout`  (or `paid_only` / `free_only` / `off`)
   - `STRIPE_MONTHLY_TRIAL_PAID_PCT=50`  (only used by `hash_rollout`)
   - Mirror `ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR` into the central `.env`.
3. **Deploy:** `supabase functions deploy stripe-checkout --project-ref abypyprvgvofzrtifgzi`
4. **⚠️ VERIFY IN STRIPE TEST MODE FIRST (do not skip — this is the crux codex flagged):**
   In test mode, create a test $1 price, set `STRIPE_MONTHLY_TRIAL_EXPERIMENT=paid_only`,
   run a real test checkout with a test card, and confirm on the resulting
   subscription/invoices: **(a)** a $1 invoice is charged *immediately* at trial
   start, **(b)** the subscription is `trialing`, **(c)** the first `$X` recurring
   invoice fires at day 7 (`billing_reason=subscription_cycle`), **(d)** no double
   charge. Only after this holds do you enable in live mode.

### Rollback
`STRIPE_MONTHLY_TRIAL_EXPERIMENT=off` (or `free_only`) + redeploy. Instantly
reverts to the free 7-day trial. Existing subs are unaffected.

### Measurement (from webhooks, NOT the redirect)
The success_url still carries `value=` for the free arm; for the paid arm the
checkout completion is a **$1** purchase, not the full conversion. Do NOT read
conversion from the redirect. Segment by `trial_variant` metadata and track
`trial_started` → `trial_converted` (day-7 `subscription_cycle` paid) →
`canceled_before_conversion` per arm.

---

## B. Pre-charge trial-ending reminder (reverses 76ff847, flag-gated A/B)

**What it does.** Re-enables the `customer.subscription.trial_will_end` handler
(Stripe fires it 3 days before the day-7 charge) to send the Listmonk
`tx-trial-ending` reminder. Rationale: it trades a small dip in *voluntary*
conversion for fewer `insufficient_funds` declines (low-balance users can top up
before the charge). The handler was always intact; `76ff847` only removed the
event subscription + it's now also flag-gated so it can't fire by accident.

### Activate
1. Confirm the Listmonk template exists and `LISTMONK_TEMPLATE_TRIAL_ENDING` secret
   points to it (was template #15 `tx-trial-ending`).
2. **Secret:** `TRIAL_ENDING_REMINDER_ENABLED=ab`  (`ab` = 50/50 by stable
   user_id hash, control stamped `ab_control`; or `true` = everyone; unset/`false` = off)
3. **Deploy + re-subscribe the event:**
   `bash scripts/deploy-stripe-webhook.sh`  (deploys stripe-webhook AND runs
   `enforce-webhook-events.sh`, which adds `customer.subscription.trial_will_end`
   from the canonical `enabled-events.json`).

### Rollback
`TRIAL_ENDING_REMINDER_ENABLED=false` + redeploy (or leave the event subscribed;
the flag alone stops all sends).

### Measure
Compare day-7 conversion + `insufficient_funds` decline rate between the reminder
arm and `ab_control` (both queryable via `profiles.trial_ending_email_status`).

---

## Priority order (do not conflate)
1. **Multi-touch dunning** (`apply-dunning-migration.sh` + `deploy-stripe-webhook.sh`)
   — the actual fix for the day-7 money leak. Highest ROI.
2. **Trial-ending reminder** (B) — cheap, reduces some declines.
3. **$1 trial** (A) — measure first; it's a quality filter, not a leak fix.

## Known follow-ups (out of scope here)
- Client GA4 `purchase` on the onboarding return fires at *trial start*. FIXED for
  the paid arm: it now reports the real $1 immediate charge (not list price) and
  tags `trial_variant`. STILL pre-existing for the free arm: a $0 trial start fires
  a GA4 `purchase` at list value. The authoritative conversion is the webhook's
  day-7 `subscription_cycle` (Meta Subscribe fires there); consider moving GA4
  purchase attribution to the webhook too.
- codex noted `payment_method_types=card` is now discouraged in favor of
  `excluded_payment_method_types` / Dashboard config; left as-is intentionally to
  not regress the Cash App fix. Revisit separately.
