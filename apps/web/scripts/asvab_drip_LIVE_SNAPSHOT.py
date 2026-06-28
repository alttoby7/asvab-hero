#!/usr/bin/env python3
"""ASVAB Hero drip sequence sender.

Runs nightly via cron. For each subscriber on list 3, computes days since
signup. If today matches a drip day (2, 5, 10, 14) AND the day has not yet
been sent (tracked via attribs.drip_sent list), sends the corresponding tx
template and updates attribs to mark the day complete.

Idempotent: re-running on the same day will not re-send. Late starts (cron
missed): subscribers past day 14 still get every email they qualify for, in
order, on the next run — no email is skipped.

Env vars (set in cron or systemd unit):
  LISTMONK_URL         e.g. https://list.asvabhero.com
  LISTMONK_API_USER    Listmonk API user
  LISTMONK_API_TOKEN   Listmonk API token
  LISTMONK_LIST_ID     numeric, e.g. 3

CLI:
  --dry-run    Print what would be sent + which subscribers are filtered, no API writes.
"""
import json
import os
import sys
import base64
import urllib.request
import urllib.error
import urllib.parse
import datetime as dt

# Sentry helper lives next to this script on the droplet (/root/scripts/).
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from sentry_helper import (
        init_sentry,
        run_with_checkin,
        sentry_capture_exception,
        sentry_capture_message,
        MONITOR_CONFIG_DAILY_2AM_UTC,
    )
except ImportError:
    # Helper missing — soft-fail to keep the cron running even if deploy lagged.
    def init_sentry(env, surface): return False  # type: ignore
    def run_with_checkin(slug, monitor_config, fn): return fn()  # type: ignore
    def sentry_capture_exception(err, **tags): pass  # type: ignore
    def sentry_capture_message(msg, **kw): pass  # type: ignore
    MONITOR_CONFIG_DAILY_2AM_UTC = {}  # type: ignore

URL = os.environ["LISTMONK_URL"].rstrip("/")
USER = os.environ["LISTMONK_API_USER"]
TOKEN = os.environ["LISTMONK_API_TOKEN"]
LIST_ID = int(os.environ["LISTMONK_LIST_ID"])

# Cross-sender frequency cap (shared with the Supabase edge functions): after a
# drip send, stamp profiles.last_engagement_email_on so a same-day mistake-
# reminder yields. Creds already live in asvab_drip.env (added for the trial
# drip). Best-effort — a stamp failure never blocks the drip.
SUPABASE_URL = (os.environ.get("ASVABHERO_SUPABASE_URL") or "").rstrip("/")
SUPABASE_KEY = os.environ.get("ASVABHERO_SUPABASE_SECRET_KEY") or ""

init_sentry(os.environ, surface="drip-listmonk")

DRIP_SCHEDULE = {
    2: 7,    # Day 2: WK mistakes
    5: 8,    # Day 5: GT math
    7: 17,   # Day 7: Pro upgrade
    10: 9,   # Day 10: hidden jobs
    14: 10,  # Day 14: retake
}

# Hotfix 2026-05-08: exclude subscribers who are not free-tier free-drip
# eligible. trial-start is set by stripe-webhook on trial start; "paid"
# reserved for future post-conversion tagging. NULL/legacy source values
# (e.g. "scores-explained", "homepage-hero", "asvab-study-plan") remain
# eligible — they are pre-paywall free signups.
EXCLUDED_SOURCES = {"trial-start", "paid"}

AUTH = "Basic " + base64.b64encode(f"{USER}:{TOKEN}".encode()).decode()
HEADERS = {"Content-Type": "application/json", "Authorization": AUTH, "User-Agent": "curl/8.0"}

DRY_RUN = "--dry-run" in sys.argv


def api(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(URL + path, data=data, method=method, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode(), "status": e.code}


def stamp_engagement(email):
    """Mark profiles.last_engagement_email_on=today (matched by email) so lower-
    priority nudges (mistake-reminders) yield the same day. Best-effort."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        return
    today = dt.datetime.now(dt.timezone.utc).date().isoformat()
    url = f"{SUPABASE_URL}/rest/v1/profiles?email=eq.{urllib.parse.quote(email)}"
    data = json.dumps({"last_engagement_email_on": today}).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method="PATCH",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15):
            pass
    except Exception as e:  # noqa: BLE001 — never let a stamp failure block the drip
        print(f"  WARN engagement stamp failed for {email}: {e}", file=sys.stderr)


def fetch_subscribers():
    """Yield every active subscriber on the configured list."""
    page = 1
    while True:
        r = api("GET", f"/api/subscribers?list_id={LIST_ID}&per_page=200&page={page}&query=subscribers.status='enabled'")
        results = (r.get("data") or {}).get("results", [])
        if not results:
            return
        for sub in results:
            yield sub
        if len(results) < 200:
            return
        page += 1


def days_since(iso_ts):
    """Days between a Listmonk created_at and today (UTC)."""
    ts = iso_ts.split(".")[0].rstrip("Z")
    created = dt.datetime.fromisoformat(ts).replace(tzinfo=dt.timezone.utc)
    return (dt.datetime.now(dt.timezone.utc) - created).days


def send_drip(sub, day, template_id, sent_so_far):
    """Send one drip email and append day to attribs.drip_sent.

    sent_so_far is the authoritative list of days already sent in THIS run
    plus days from the original fetch — passed in so multiple sends in one
    run don't overwrite each other's attrib updates.
    """
    email = sub["email"]
    if DRY_RUN:
        print(f"  [DRY] would send day {day} (tmpl {template_id}) -> {email}")
        return True
    payload = {
        "subscriber_email": email,
        "template_id": template_id,
        "data": {},
        "content_type": "html",
    }
    r = api("POST", "/api/tx", payload)
    if "error" in r:
        print(f"  FAIL day {day} -> {email}: {r}", file=sys.stderr)
        sentry_capture_message(
            f"listmonk drip non-2xx (day {day})",
            level="warning",
            fingerprint=["vendor-non-2xx", "listmonk", "drip-listmonk", f"day-{day}"],
            provider="listmonk",
            job="drip-listmonk",
            day=day,
            template_id=template_id,
            email=email,
            listmonk_status=r.get("status"),
        )
        return False

    new_sent = sorted(set(sent_so_far) | {day})
    new_attribs = dict(sub.get("attribs") or {})
    new_attribs["drip_sent"] = new_sent
    update = {
        "email": sub["email"],
        "name": sub.get("name") or "",
        "status": sub.get("status") or "enabled",
        "lists": [LIST_ID],
        "attribs": new_attribs,
    }
    r2 = api("PUT", f"/api/subscribers/{sub['id']}", update)
    if "error" in r2:
        print(f"  WARN attrib update failed for {email}: {r2}", file=sys.stderr)
    stamp_engagement(email)
    print(f"  sent day {day} -> {email}")
    return True


def main():
    if DRY_RUN:
        print("=== DRY RUN — no emails will be sent, no attribs updated ===")
    sent_count = 0
    skipped_count = 0
    excluded_count = 0
    excluded_by_source = {}
    for sub in fetch_subscribers():
        source = (sub.get("attribs") or {}).get("source")
        if source in EXCLUDED_SOURCES:
            excluded_count += 1
            excluded_by_source[source] = excluded_by_source.get(source, 0) + 1
            if DRY_RUN:
                print(f"  [DRY] EXCLUDED ({source}) -> {sub['email']}")
            continue
        age = days_since(sub["created_at"])
        already = set((sub.get("attribs") or {}).get("drip_sent") or [])
        for day, tmpl_id in sorted(DRIP_SCHEDULE.items()):
            if age >= day and day not in already:
                if send_drip(sub, day, tmpl_id, already):
                    sent_count += 1
                    already.add(day)
                else:
                    break
            else:
                skipped_count += 1
    label = "[DRY] " if DRY_RUN else ""
    print(f"{label}Drip run complete. Sent: {sent_count}, eligible-but-skipped: {skipped_count}, excluded-by-source: {excluded_count} {excluded_by_source}")


if __name__ == "__main__":
    run_with_checkin(
        slug="asvab-drip-listmonk",
        monitor_config=MONITOR_CONFIG_DAILY_2AM_UTC,
        fn=main,
    )
