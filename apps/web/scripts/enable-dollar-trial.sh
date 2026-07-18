#!/usr/bin/env bash
# Enable / adjust / disable the "$1 for 7 days" trial experiment in LIVE mode.
# Idempotently creates a live one-time $1 Price (via lookup_key), sets the
# experiment secrets, and deploys stripe-checkout.
#
# RUN AFTER merging PR #41 (or from the feature branch) so the $1 code is in the
# function being deployed. Behavior was verified in Stripe test mode 2026-07-18
# (see docs/runbooks/trial-experiments-2026-07.md).
#
# Usage:
#   bash scripts/enable-dollar-trial.sh smoke   # paid_only: ALL new monthly trials = $1
#                                               #   → use to do ONE live smoke checkout, then switch to a %
#   bash scripts/enable-dollar-trial.sh 50      # hash_rollout at 50% (the real A/B: half $1, half free)
#   bash scripts/enable-dollar-trial.sh off     # revert to the free 7-day trial
#
# NOTE: the recurring price is whatever ASVABHERO_STRIPE_PRICE_MONTHLY points to
# right now ($14.99 until the post-freeze $24.99 change on/after 2026-07-29). So
# enabling today = "$1 now, then $14.99/mo"; it becomes "$1 then $24.99" only
# after the separate pricing change lands.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_REF="abypyprvgvofzrtifgzi"
CENTRAL_ENV="/home/trisha/google-drive/0-AI/.env"
CHECKOUT_FN="$REPO_ROOT/supabase/functions/stripe-checkout/index.ts"
LOOKUP_KEY="asvab_trial_dollar"

MODE_ARG="${1:-}"
[ -n "$MODE_ARG" ] || { echo "usage: $0 <smoke|0-100|off>" >&2; exit 1; }

case "$MODE_ARG" in
  off)            EXP="off";          PCT="0"   ;;
  smoke)          EXP="paid_only";    PCT="100" ;;
  ''|*[!0-9]*)    echo "error: mode must be 'smoke', an integer 0-100, or 'off'" >&2; exit 1 ;;
  *)              EXP="hash_rollout"; PCT="$MODE_ARG"
                  [ "$PCT" -le 100 ] || { echo "error: percent must be 0-100" >&2; exit 1; } ;;
esac

# Guard: never deploy a function that doesn't actually contain the $1 logic.
grep -q "assignTrialVariant" "$CHECKOUT_FN" \
  || { echo "error: \$1 trial code not found in $CHECKOUT_FN — merge PR #41 or checkout the feature branch first." >&2; exit 1; }

# Secrets from central .env.
get() { grep "^$1=" "$CENTRAL_ENV" | cut -d= -f2- | tr -d '\r'; }
SK="$(get ASVABHERO_STRIPE_SECRET_KEY)"
PROD="$(get ASVABHERO_STRIPE_PRODUCT_ID)"
export SUPABASE_ACCESS_TOKEN="$(get ASVABHERO_SUPABASE_ACCESS_TOKEN)"
[ -n "$SK" ] && [ -n "$SUPABASE_ACCESS_TOKEN" ] || { echo "error: missing ASVABHERO_STRIPE_SECRET_KEY / ASVABHERO_SUPABASE_ACCESS_TOKEN in central .env" >&2; exit 1; }

if [ "$EXP" != "off" ]; then
  [ -n "$PROD" ] || { echo "error: ASVABHERO_STRIPE_PRODUCT_ID not in central .env" >&2; exit 1; }
  echo "==> Ensuring a live one-time \$1 Price (lookup_key=$LOOKUP_KEY)"
  PRICE_ID="$(curl -s -G "https://api.stripe.com/v1/prices" -u "$SK:" \
    --data-urlencode "lookup_keys[]=$LOOKUP_KEY" -d "limit=1" -d "active=true" \
    | python3 -c 'import json,sys; d=json.load(sys.stdin).get("data",[]); print(d[0]["id"] if d else "")')"
  if [ -z "$PRICE_ID" ]; then
    PRICE_ID="$(curl -s "https://api.stripe.com/v1/prices" -u "$SK:" \
      -d "product=$PROD" -d "unit_amount=100" -d "currency=usd" \
      -d "lookup_key=$LOOKUP_KEY" -d "nickname=ASVAB Hero \$1 trial fee" \
      | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("id") or ("ERR:"+str(d.get("error",{}).get("message"))))')"
    case "$PRICE_ID" in ERR:*) echo "error creating price: ${PRICE_ID#ERR:}" >&2; exit 1;; esac
    echo "    created $PRICE_ID"
  else
    echo "    reusing $PRICE_ID"
  fi
  echo "==> Setting ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR secret"
  supabase secrets set "ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR=$PRICE_ID" --project-ref "$PROJECT_REF" >/dev/null
  grep -q "^ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR=" "$CENTRAL_ENV" \
    || echo "    NOTE: add ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR=$PRICE_ID to central .env for documentation."
fi

echo "==> Setting experiment secrets: STRIPE_MONTHLY_TRIAL_EXPERIMENT=$EXP STRIPE_MONTHLY_TRIAL_PAID_PCT=$PCT"
supabase secrets set "STRIPE_MONTHLY_TRIAL_EXPERIMENT=$EXP" "STRIPE_MONTHLY_TRIAL_PAID_PCT=$PCT" --project-ref "$PROJECT_REF" >/dev/null

echo "==> Deploying stripe-checkout"
supabase functions deploy stripe-checkout --project-ref "$PROJECT_REF"

echo ""
echo "Done. experiment=$EXP percent=$PCT"
if [ "$EXP" = "paid_only" ]; then
  echo "SMOKE MODE: every new first-time monthly trial is now \$1. Do ONE real checkout,"
  echo "confirm a \$1 invoice + trialing sub in Stripe, refund your \$1, then run:"
  echo "    bash scripts/enable-dollar-trial.sh 50    # switch to the 50/50 A/B"
fi
