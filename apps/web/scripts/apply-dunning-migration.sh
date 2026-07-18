#!/usr/bin/env bash
# Apply migration 0053_dunning_sequence.sql to the ASVAB Hero prod DB via the
# Supabase Management API, then record versions 0052 + 0053 in the migration
# ledger. Idempotent: skips the DDL if dunning_sends already exists.
#
# WHY a bespoke script (not `supabase db push`): prod's schema_migrations ledger
# is version-collision-mismatched (mix of 0051 numeric + 20260708043545 timestamp
# rows), and 0052 was applied out-of-band but never recorded. `db push` would
# misbehave. This applies 0053 directly and back-records 0052/0053.
#
# Required env (sourced from central .env if unset):
#   ASVABHERO_SUPABASE_ACCESS_TOKEN — Supabase Management API PAT
#
# Usage:  bash scripts/apply-dunning-migration.sh
#
# After this succeeds, deploy the handler:
#   bash scripts/deploy-stripe-webhook.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_REF="abypyprvgvofzrtifgzi"
MIG_FILE="$REPO_ROOT/supabase/migrations/0053_dunning_sequence.sql"
CENTRAL_ENV="/home/trisha/google-drive/0-AI/.env"

if [ -z "${ASVABHERO_SUPABASE_ACCESS_TOKEN:-}" ] && [ -f "$CENTRAL_ENV" ]; then
  ASVABHERO_SUPABASE_ACCESS_TOKEN="$(grep '^ASVABHERO_SUPABASE_ACCESS_TOKEN=' "$CENTRAL_ENV" | cut -d= -f2- | tr -d '\r')"
fi
if [ -z "${ASVABHERO_SUPABASE_ACCESS_TOKEN:-}" ]; then
  echo "error: ASVABHERO_SUPABASE_ACCESS_TOKEN not set and not found in central .env" >&2
  exit 1
fi
[ -f "$MIG_FILE" ] || { echo "error: $MIG_FILE not found" >&2; exit 1; }

API="https://api.supabase.com/v1/projects/$PROJECT_REF/database/query"
runsql() { # $1 = raw SQL
  local payload
  payload="$(python3 -c 'import json,sys; print(json.dumps({"query": sys.stdin.read()}))' <<<"$1")"
  curl -s -X POST "$API" \
    -H "Authorization: Bearer $ASVABHERO_SUPABASE_ACCESS_TOKEN" \
    -H "Content-Type: application/json" -d "$payload"
}

echo "==> Checking whether 0053 (dunning_sends) is already applied on $PROJECT_REF"
EXISTS="$(runsql "select to_regclass('public.dunning_sends') is not null as e" | python3 -c 'import json,sys;print(json.load(sys.stdin)[0]["e"])')"

if [ "$EXISTS" = "True" ]; then
  echo "    dunning_sends already exists — skipping DDL (idempotent)."
else
  echo "==> Applying $MIG_FILE"
  RESP="$(runsql "$(cat "$MIG_FILE")")"
  echo "$RESP" | python3 -c 'import json,sys; d=json.load(sys.stdin); sys.exit(1) if isinstance(d,dict) and d.get("message") else print("    migration applied.")' \
    || { echo "    ERROR applying migration:"; echo "$RESP"; exit 1; }
fi

echo "==> Recording versions 0052 + 0053 in schema_migrations"
runsql "insert into supabase_migrations.schema_migrations (version, name) values ('0052','self_reported_attribution'),('0053','dunning_sequence') on conflict (version) do nothing" >/dev/null
echo "    done."

echo "==> Verifying"
runsql "select to_regclass('public.dunning_sends') is not null as dunning_sends, exists(select 1 from information_schema.columns where table_name='profiles' and column_name='winback_email_sent_at') as winback_cols, (select array_agg(version order by version) from supabase_migrations.schema_migrations where version in ('0052','0053')) as recorded"

echo ""
echo "Migration step complete. Next: bash scripts/deploy-stripe-webhook.sh"
