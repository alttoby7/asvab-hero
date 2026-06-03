#!/usr/bin/env python3
"""ASVAB Hero signup → Listmonk reconcile.

Closes the fire-and-forget gap: the /signup page subscribes new accounts to
Listmonk list 3 client-side, with no retry. If that call fails (network, tab
closed, worker hiccup) the account exists in Supabase but never enters the
marketing drip. This job finds Supabase profiles whose email is NOT on list 3
and subscribes them, so every signup is reachable.

Source is set from the profile's CURRENT billing state so the drip's existing
exclusions (EXCLUDED_SOURCES = {trial-start, paid}) stay correct — we never
pitch the free Pro-trial sequence to someone who already pays:
  - paying  (lifetime, or active off-trial)        -> source='paid'        (drip-excluded)
  - trialing(active + trial_ends_at in the future) -> source='trial-start' (drip-excluded)
  - free                                           -> signup_source or 'supabase-signup'

New subscribers are created with Listmonk's default created_at (now), so the
nightly drip sequences them forward from today (Day 2, 5, 7, 10, 14) instead of
blasting an old signup with all five emails at once.

Idempotent: only emails missing from the list are added. Safe to run repeatedly.

Env (shares asvab_drip.env on the droplet):
  LISTMONK_URL, LISTMONK_API_USER, LISTMONK_API_TOKEN, LISTMONK_LIST_ID
  ASVABHERO_SUPABASE_URL, ASVABHERO_SUPABASE_SECRET_KEY

CLI:
  --dry-run   Print who WOULD be added (and their resolved source), no writes.
  --limit N   Cap the number added in one run (default: no cap).
"""
import base64
import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from sentry_helper import (
        init_sentry,
        run_with_checkin,
        sentry_capture_message,
        MONITOR_CONFIG_DAILY_2AM_UTC,
    )
except ImportError:
    def init_sentry(env, surface): return False  # type: ignore
    def run_with_checkin(slug, monitor_config, fn): return fn()  # type: ignore
    def sentry_capture_message(msg, **kw): pass  # type: ignore
    MONITOR_CONFIG_DAILY_2AM_UTC = {}  # type: ignore

URL = os.environ["LISTMONK_URL"].rstrip("/")
USER = os.environ["LISTMONK_API_USER"]
TOKEN = os.environ["LISTMONK_API_TOKEN"]
LIST_ID = int(os.environ["LISTMONK_LIST_ID"])
SUPABASE_URL = (os.environ.get("ASVABHERO_SUPABASE_URL") or "").rstrip("/")
SUPABASE_KEY = os.environ.get("ASVABHERO_SUPABASE_SECRET_KEY") or ""

if not SUPABASE_URL or not SUPABASE_KEY:
    print("FATAL: ASVABHERO_SUPABASE_URL / ASVABHERO_SUPABASE_SECRET_KEY not set", file=sys.stderr)
    sys.exit(1)

init_sentry(os.environ, surface="reconcile-listmonk")

AUTH = "Basic " + base64.b64encode(f"{USER}:{TOKEN}".encode()).decode()
LM_HEADERS = {"Content-Type": "application/json", "Authorization": AUTH, "User-Agent": "curl/8.0"}

DRY_RUN = "--dry-run" in sys.argv
LIMIT = None
if "--limit" in sys.argv:
    try:
        LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])
    except (ValueError, IndexError):
        print("FATAL: --limit needs an integer", file=sys.stderr)
        sys.exit(1)


def lm_api(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(URL + path, data=data, method=method, headers=LM_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode(), "status": e.code}


def fetch_listmonk_emails():
    """Lowercased set of every email already on the configured list."""
    emails = set()
    page = 1
    while True:
        r = lm_api("GET", f"/api/subscribers?list_id={LIST_ID}&per_page=200&page={page}")
        results = (r.get("data") or {}).get("results", [])
        if not results:
            break
        for s in results:
            if s.get("email"):
                emails.add(s["email"].strip().lower())
        if len(results) < 200:
            break
        page += 1
    return emails


def fetch_profiles():
    """All Supabase profiles with the fields needed to resolve drip source."""
    out = []
    offset = 0
    page_size = 1000
    select = "email,signup_source,billing_status,trial_ends_at"
    while True:
        url = (f"{SUPABASE_URL}/rest/v1/profiles?select={select}"
               f"&email=not.is.null&order=created_at.asc&limit={page_size}&offset={offset}")
        req = urllib.request.Request(url, method="GET", headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Accept": "application/json",
        })
        with urllib.request.urlopen(req, timeout=30) as r:
            rows = json.loads(r.read())
        out.extend(rows)
        if len(rows) < page_size:
            break
        offset += page_size
    return out


def resolve_source(p):
    """Pick the Listmonk source attrib so the drip's exclusions stay correct."""
    status = p.get("billing_status")
    trial_ends = p.get("trial_ends_at")
    now = dt.datetime.now(dt.timezone.utc)
    trialing = False
    if status == "active" and trial_ends:
        try:
            te = dt.datetime.fromisoformat(trial_ends.replace("Z", "+00:00"))
            trialing = te > now
        except ValueError:
            trialing = False
    if status == "lifetime" or (status == "active" and not trialing):
        return "paid"          # drip-excluded — never pitch Pro to a payer
    if trialing:
        return "trial-start"   # drip-excluded — they get the trial track
    return (p.get("signup_source") or "supabase-signup")


def subscribe(email, source):
    body = {
        "email": email,
        "name": email.split("@")[0],
        "status": "enabled",
        "lists": [LIST_ID],
        "preconfirm_subscriptions": True,
        "attribs": {"source": source, "reconciled": True},
    }
    r = lm_api("POST", "/api/subscribers", body)
    if r.get("status") == 409:
        return "exists"        # raced with another path — fine
    if "error" in r:
        print(f"  FAIL subscribe {email}: {r}", file=sys.stderr)
        sentry_capture_message(
            "listmonk reconcile subscribe non-2xx",
            level="warning",
            fingerprint=["vendor-non-2xx", "listmonk", "reconcile"],
            provider="listmonk", job="reconcile", email=email,
            listmonk_status=r.get("status"),
        )
        return "fail"
    return "added"


def main():
    if DRY_RUN:
        print("=== DRY RUN — no subscribers will be created ===")
    lm_emails = fetch_listmonk_emails()
    profiles = fetch_profiles()
    print(f"Listmonk list {LIST_ID}: {len(lm_emails)} subscribers · Supabase profiles: {len(profiles)}")

    missing = [p for p in profiles if (p.get("email") or "").strip().lower() not in lm_emails]
    print(f"Profiles missing from list: {len(missing)}")

    added = exists = fail = 0
    by_source = {}
    for p in missing:
        if LIMIT is not None and added >= LIMIT:
            print(f"  (limit {LIMIT} reached — stopping)")
            break
        email = p["email"].strip().lower()
        source = resolve_source(p)
        by_source[source] = by_source.get(source, 0) + 1
        if DRY_RUN:
            print(f"  [DRY] would add {email}  source={source}")
            added += 1
            continue
        result = subscribe(email, source)
        if result == "added":
            print(f"  added {email}  source={source}")
            added += 1
        elif result == "exists":
            exists += 1
        else:
            fail += 1

    label = "[DRY] " if DRY_RUN else ""
    print(f"{label}Reconcile complete. Added: {added}, already-existed: {exists}, "
          f"failed: {fail}, by-source: {by_source}")


if __name__ == "__main__":
    run_with_checkin(
        slug="asvab-reconcile-listmonk",
        monitor_config=MONITOR_CONFIG_DAILY_2AM_UTC,
        fn=main,
    )
