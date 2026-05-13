#!/usr/bin/env bash
# Enforce the canonical Stripe webhook event subscription against the live
# endpoint. Reads the list from supabase/functions/stripe-webhook/enabled-events.json
# and applies it to the endpoint via the Stripe API. Idempotent — re-running
# with no drift is a no-op.
#
# Required env:
#   ASVABHERO_STRIPE_SECRET_KEY — read from central .env or pass via env
#
# Usage:
#   bash scripts/enforce-webhook-events.sh
#   bash scripts/enforce-webhook-events.sh --dry-run   # diff only, no API write

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG_FILE="$REPO_ROOT/supabase/functions/stripe-webhook/enabled-events.json"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "error: $CONFIG_FILE not found" >&2
  exit 1
fi

# Source the secret key from the central .env if not already set.
if [ -z "${ASVABHERO_STRIPE_SECRET_KEY:-}" ]; then
  CENTRAL_ENV="/home/trisha/google-drive/0-AI/.env"
  if [ -f "$CENTRAL_ENV" ]; then
    ASVABHERO_STRIPE_SECRET_KEY="$(grep '^ASVABHERO_STRIPE_SECRET_KEY=' "$CENTRAL_ENV" | cut -d= -f2)"
  fi
fi
if [ -z "${ASVABHERO_STRIPE_SECRET_KEY:-}" ]; then
  echo "error: ASVABHERO_STRIPE_SECRET_KEY not set and not found in central .env" >&2
  exit 1
fi

ENDPOINT_ID="$(jq -r '.webhook_endpoint_id' "$CONFIG_FILE")"
mapfile -t WANT < <(jq -r '.enabled_events[]' "$CONFIG_FILE" | sort)

# Fetch current state from Stripe.
HAVE_JSON="$(curl -s "https://api.stripe.com/v1/webhook_endpoints/$ENDPOINT_ID" \
  -u "$ASVABHERO_STRIPE_SECRET_KEY:")"
if echo "$HAVE_JSON" | jq -e '.error' >/dev/null; then
  echo "error: Stripe API returned error fetching endpoint:" >&2
  echo "$HAVE_JSON" | jq '.error' >&2
  exit 1
fi
mapfile -t HAVE < <(echo "$HAVE_JSON" | jq -r '.enabled_events[]' | sort)

# Diff
ADDED=()
REMOVED=()
for e in "${WANT[@]}"; do
  if ! printf '%s\n' "${HAVE[@]}" | grep -qx "$e"; then
    ADDED+=("$e")
  fi
done
for e in "${HAVE[@]}"; do
  if ! printf '%s\n' "${WANT[@]}" | grep -qx "$e"; then
    REMOVED+=("$e")
  fi
done

if [ ${#ADDED[@]} -eq 0 ] && [ ${#REMOVED[@]} -eq 0 ]; then
  echo "stripe-webhook events: in sync (${#WANT[@]} events)"
  exit 0
fi

echo "stripe-webhook events: drift detected on $ENDPOINT_ID"
[ ${#ADDED[@]} -gt 0 ]   && printf '  + would add:    %s\n' "${ADDED[@]}"
[ ${#REMOVED[@]} -gt 0 ] && printf '  - would remove: %s\n' "${REMOVED[@]}"

if [ "${1:-}" = "--dry-run" ]; then
  echo "(dry-run — no changes applied)"
  exit 2
fi

# Apply. Stripe wants enabled_events as repeated form params.
FORM_ARGS=()
for e in "${WANT[@]}"; do
  FORM_ARGS+=(-d "enabled_events[]=$e")
done
RESP="$(curl -s -X POST "https://api.stripe.com/v1/webhook_endpoints/$ENDPOINT_ID" \
  -u "$ASVABHERO_STRIPE_SECRET_KEY:" \
  "${FORM_ARGS[@]}")"
if echo "$RESP" | jq -e '.error' >/dev/null; then
  echo "error: Stripe API returned error updating endpoint:" >&2
  echo "$RESP" | jq '.error' >&2
  exit 1
fi

echo "stripe-webhook events: applied ${#WANT[@]} events to $ENDPOINT_ID"
