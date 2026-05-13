#!/usr/bin/env bash
# Deploy the stripe-webhook edge function AND enforce the canonical Stripe
# event subscription. Use this instead of bare `supabase functions deploy
# stripe-webhook` so the Dashboard config stays in sync with the handler.
#
# Usage:
#   bash scripts/deploy-stripe-webhook.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_REF="abypyprvgvofzrtifgzi"

# Source the access token from central .env if not set.
if [ -z "${SUPABASE_ACCESS_TOKEN:-}" ]; then
  CENTRAL_ENV="/home/trisha/google-drive/0-AI/.env"
  if [ -f "$CENTRAL_ENV" ]; then
    export SUPABASE_ACCESS_TOKEN="$(grep '^ASVABHERO_SUPABASE_ACCESS_TOKEN=' "$CENTRAL_ENV" | cut -d= -f2)"
  fi
fi
if [ -z "${SUPABASE_ACCESS_TOKEN:-}" ]; then
  echo "error: SUPABASE_ACCESS_TOKEN not set and not found in central .env" >&2
  exit 1
fi

echo "==> Deploying stripe-webhook to project $PROJECT_REF"
cd "$REPO_ROOT"
supabase functions deploy stripe-webhook --project-ref "$PROJECT_REF"

echo ""
echo "==> Enforcing canonical Stripe webhook events"
bash "$REPO_ROOT/scripts/enforce-webhook-events.sh"

echo ""
echo "Done."
