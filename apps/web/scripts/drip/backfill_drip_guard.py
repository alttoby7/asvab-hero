#!/usr/bin/env python3
"""One-time backfill guard for the ASVAB Hero drip.

When new drip days (21/30/45/60/90) are added to DRIP_SCHEDULE, the sender's
loop `if age >= day and day not in already: send` would blast EVERY already-
past day to long-tenured subscribers in a single run. This backfill closes
that: for each enabled list-3 subscriber, mark as already-sent every NEW day
the subscriber is ALREADY PAST (age >= day). Result: no retroactive blast;
subscribers only receive a new day if they age into it going forward.

Idempotent. Run with --dry-run first.
Env (same as asvab_drip.env): LISTMONK_URL, LISTMONK_API_USER,
LISTMONK_API_TOKEN, LISTMONK_LIST_ID.
"""
import os, sys, json, base64, urllib.request, urllib.error, datetime as dt

URL = os.environ["LISTMONK_URL"].rstrip("/")
USER = os.environ["LISTMONK_API_USER"]
TOKEN = os.environ["LISTMONK_API_TOKEN"]
LIST_ID = int(os.environ["LISTMONK_LIST_ID"])
NEW_DAYS = [21, 30, 45, 60, 90]
DRY = "--dry-run" in sys.argv

AUTH = "Basic " + base64.b64encode(f"{USER}:{TOKEN}".encode()).decode()
H = {"Content-Type": "application/json", "Authorization": AUTH, "User-Agent": "Mozilla/5.0"}


def api(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(URL + path, data=data, method=method, headers=H)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode(), "status": e.code}


def days_since(iso_ts):
    ts = iso_ts.split(".")[0].rstrip("Z")
    created = dt.datetime.fromisoformat(ts).replace(tzinfo=dt.timezone.utc)
    return (dt.datetime.now(dt.timezone.utc) - created).days


def subs():
    page = 1
    while True:
        r = api("GET", f"/api/subscribers?list_id={LIST_ID}&per_page=200&page={page}&query=subscribers.status='enabled'")
        results = (r.get("data") or {}).get("results", [])
        if not results:
            return
        for s in results:
            yield s
        if len(results) < 200:
            return
        page += 1


def main():
    guarded = touched = 0
    for s in subs():
        age = days_since(s["created_at"])
        already = set((s.get("attribs") or {}).get("drip_sent") or [])
        add = {d for d in NEW_DAYS if age >= d and d not in already}
        if not add:
            continue
        touched += 1
        guarded += len(add)
        new_sent = sorted(already | add)
        if DRY:
            print(f"  [DRY] {s['email']} age={age} +mark {sorted(add)} -> {new_sent}")
            continue
        attribs = dict(s.get("attribs") or {})
        attribs["drip_sent"] = new_sent
        upd = {
            "email": s["email"],
            "name": s.get("name") or "",
            "status": s.get("status") or "enabled",
            "lists": [LIST_ID],
            "attribs": attribs,
        }
        r = api("PUT", f"/api/subscribers/{s['id']}", upd)
        if "error" in r:
            print(f"  FAIL {s['email']}: {r}", file=sys.stderr)
        else:
            print(f"  guarded {s['email']} age={age} marked {sorted(add)}")
    print(f"{'[DRY] ' if DRY else ''}done. subscribers touched: {touched}, day-marks added: {guarded}")


if __name__ == "__main__":
    main()
