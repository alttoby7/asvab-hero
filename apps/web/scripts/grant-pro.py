#!/usr/bin/env python3
"""ASVAB Hero support tool: manually grant Pro to an account.

Use this to comp/restore Pro when a billing event failed to entitle a paying
user (e.g. a checkout whose metadata.user_id and stripe_customer_id both missed,
stranding the profile as `free`). Sets the same fields the Stripe webhook would:
  billing_status='active', pro_tier, pro_until, pro_updated_at.

This does NOT touch Stripe — it only fixes the entitlement in Supabase. Cancel
or refund a subscription in the Stripe dashboard separately if needed.

Resolution: pass EITHER --user-id <uuid> OR --email <addr> (matched
case-insensitively against profiles.email). Idempotent: re-running with the same
args converges to the same state. Always prints the before/after row.

Env (central .env at /home/trisha/google-drive/0-AI/.env):
  ASVABHERO_SUPABASE_URL, ASVABHERO_SUPABASE_SECRET_KEY

Examples:
  python3 grant-pro.py --email paul.cyberc2@gmail.com --tier annual --days 365
  python3 grant-pro.py --user-id 123e... --tier lifetime
  python3 grant-pro.py --email a@b.com --tier pass90 --days 90 --dry-run
"""
import argparse
import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

SUPABASE_URL = (os.environ.get("ASVABHERO_SUPABASE_URL") or "").rstrip("/")
SUPABASE_KEY = os.environ.get("ASVABHERO_SUPABASE_SECRET_KEY") or ""

VALID_TIERS = {"monthly", "annual", "lifetime", "pass90", "retaker"}

if not SUPABASE_URL or not SUPABASE_KEY:
    print(
        "FATAL: ASVABHERO_SUPABASE_URL / ASVABHERO_SUPABASE_SECRET_KEY not set.\n"
        "  source the central .env first, e.g.:\n"
        "    set -a; . /home/trisha/google-drive/0-AI/.env; set +a",
        file=sys.stderr,
    )
    sys.exit(1)

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}


def rest(method, path, body=None, prefer=None):
    headers = dict(HEADERS)
    if prefer:
        headers["Prefer"] = prefer
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        SUPABASE_URL + "/rest/v1" + path, data=data, method=method, headers=headers
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            return json.loads(raw) if raw else []
    except urllib.error.HTTPError as e:
        print(f"FATAL: {method} {path} -> {e.code}\n{e.read().decode()}", file=sys.stderr)
        sys.exit(1)


def find_profile(user_id, email):
    if user_id:
        q = f"/profiles?user_id=eq.{urllib.parse.quote(user_id)}&select=*"
    else:
        q = f"/profiles?email=ilike.{urllib.parse.quote(email)}&select=*"
    rows = rest("GET", q)
    return rows


def main():
    ap = argparse.ArgumentParser(description="Grant Pro to an ASVAB Hero account.")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--user-id", help="profiles.user_id (uuid)")
    g.add_argument("--email", help="profiles.email (case-insensitive)")
    ap.add_argument(
        "--tier",
        required=True,
        choices=sorted(VALID_TIERS),
        help="pro_tier to set",
    )
    ap.add_argument(
        "--days",
        type=int,
        default=None,
        help="days of access from now (sets pro_until). Omit for lifetime / "
        "no expiry. Required for non-lifetime time-boxed grants.",
    )
    ap.add_argument("--dry-run", action="store_true", help="print the change, write nothing")
    args = ap.parse_args()

    rows = find_profile(args.user_id, args.email)
    if not rows:
        print("No profile found for that user-id/email.", file=sys.stderr)
        sys.exit(2)
    if len(rows) > 1:
        print(
            f"FATAL: {len(rows)} profiles matched — refine to a single user-id.\n"
            + "\n".join(f"  {r.get('user_id')}  {r.get('email')}" for r in rows),
            file=sys.stderr,
        )
        sys.exit(2)

    prof = rows[0]
    user_id = prof["user_id"]

    billing_status = "lifetime" if args.tier == "lifetime" else "active"
    pro_until = None
    if args.tier != "lifetime":
        if args.days is None:
            print(
                "FATAL: --days is required for non-lifetime tiers (sets pro_until).",
                file=sys.stderr,
            )
            sys.exit(2)
        pro_until = (
            dt.datetime.now(dt.timezone.utc) + dt.timedelta(days=args.days)
        ).isoformat()

    update = {
        "billing_status": billing_status,
        "pro_tier": args.tier,
        "pro_until": pro_until,
        "pro_updated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
    }

    print("BEFORE:")
    for k in ("user_id", "email", "billing_status", "pro_tier", "pro_until"):
        print(f"  {k}: {prof.get(k)}")
    print("CHANGE:")
    for k, v in update.items():
        print(f"  {k} -> {v}")

    if args.dry_run:
        print("\n[dry-run] no write performed.")
        return

    rest(
        "PATCH",
        f"/profiles?user_id=eq.{urllib.parse.quote(user_id)}",
        body=update,
        prefer="return=minimal",
    )
    after = find_profile(user_id, None)[0]
    print("\nAFTER:")
    for k in ("user_id", "email", "billing_status", "pro_tier", "pro_until"):
        print(f"  {k}: {after.get(k)}")
    print("\nDone. (Stripe was NOT modified — handle refunds/cancellations there.)")


if __name__ == "__main__":
    main()
