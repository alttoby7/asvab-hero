#!/usr/bin/env python3
"""
ASVAB Hero — Trial drip cron (Phase 3 of trial-experience plan).

Sends two transactional Resend emails to active-trial users:

  Job 1 — trial-day2-activation
    Fires ~24-48h after trial start, only if the user has zero
    `attempts` rows. One-shot per user; gated by
    profiles.trial_day2_email_sent_at.

  Job 2 — trial-milestone-50q
    Fires once when user crosses 50 total questions answered across
    attempts, while their trial is still active. Gated by
    profiles.milestone_50q_email_sent_at.

Stdlib only (urllib + json). Designed to drop on the droplet at
/root/scripts/asvab_drip_trial.py alongside asvab_drip.py.

Suggested cron line (hourly):
  0 * * * * /usr/bin/python3 /root/scripts/asvab_drip_trial.py >> /var/log/asvab_drip_trial.log 2>&1

Required .env keys:
  ASVABHERO_SUPABASE_URL
  ASVABHERO_SUPABASE_SECRET_KEY   (service role; bypasses RLS)
  ASVAB_RESEND_API_KEY

Flags:
  --dry-run       Print intended sends, no POSTs, no PATCHes
  --env PATH      Override .env path (default /root/.env)
  --limit N       Max sends per job per run (default 100)
"""

from __future__ import annotations

import argparse
import json
import math
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

# Sentry helper lives next to this script on the droplet (/root/scripts/).
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from sentry_helper import (
        init_sentry,
        run_with_checkin,
        sentry_capture_exception,
        sentry_capture_message,
        MONITOR_CONFIG_HOURLY,
    )
except ImportError:
    def init_sentry(env, surface): return False  # type: ignore
    def run_with_checkin(slug, monitor_config, fn): return fn()  # type: ignore
    def sentry_capture_exception(err, **tags): pass  # type: ignore
    def sentry_capture_message(msg, **kw): pass  # type: ignore
    MONITOR_CONFIG_HOURLY = {}  # type: ignore

DEFAULT_ENV_PATH = "/root/.env"
RESEND_URL = "https://api.resend.com/emails"
FROM_ADDR = "Trish at ASVAB Hero <info@asvabhero.com>"
REPLY_TO = "trish@dach.family"
USER_AGENT = "asvab-drip-trial/1.0"
HTTP_TIMEOUT = 20  # seconds

# Subtest code -> human label (for milestone email).
SUBTEST_LABELS = {
    "GS": "General Science",
    "AR": "Arithmetic Reasoning",
    "WK": "Word Knowledge",
    "PC": "Paragraph Comprehension",
    "MK": "Math Knowledge",
    "EI": "Electronics Information",
    "AS": "Auto and Shop Information",
    "MC": "Mechanical Comprehension",
    "AO": "Assembling Objects",
}


# ----------------------------------------------------------------------
# Logging
# ----------------------------------------------------------------------

def log(line: str) -> None:
    """One-line structured log to stdout."""
    sys.stdout.write(line + "\n")
    sys.stdout.flush()


def err(line: str) -> None:
    sys.stderr.write(line + "\n")
    sys.stderr.flush()


# ----------------------------------------------------------------------
# Env loading
# ----------------------------------------------------------------------

def load_env(path: str) -> dict:
    """Parse a simple KEY=VALUE .env file. Tolerant of quotes, comments, blanks."""
    if not os.path.isfile(path):
        return {}
    out: dict = {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            for raw in f:
                line = raw.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip()
                if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                    v = v[1:-1]
                out[k] = v
    except OSError as e:
        err(f"[trial_drip] env_load_error path={path} error={e}")
        return {}
    return out


def require_env(env: dict, key: str) -> str | None:
    val = env.get(key) or os.environ.get(key)
    if not val:
        return None
    return val


# ----------------------------------------------------------------------
# HTTP helpers (urllib only)
# ----------------------------------------------------------------------

def http_request(
    method: str,
    url: str,
    headers: dict,
    body: bytes | None = None,
) -> tuple[int, bytes, dict]:
    req = urllib.request.Request(url=url, data=body, method=method)
    for k, v in headers.items():
        req.add_header(k, v)
    req.add_header("User-Agent", USER_AGENT)
    try:
        with urllib.request.urlopen(req, timeout=HTTP_TIMEOUT) as resp:
            return resp.status, resp.read(), dict(resp.headers)
    except urllib.error.HTTPError as e:
        try:
            payload = e.read()
        except Exception:
            payload = b""
        return e.code, payload, dict(e.headers or {})


def supabase_get(base_url: str, service_key: str, path: str, params: dict) -> list:
    """GET against Supabase REST. Returns list of rows or [] on error (logged)."""
    qs = urllib.parse.urlencode(params, doseq=True, safe=".:")
    url = f"{base_url.rstrip('/')}/rest/v1/{path}?{qs}"
    headers = {
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Accept": "application/json",
    }
    status, body, _ = http_request("GET", url, headers)
    if status >= 300:
        err(f"[trial_drip] supabase_get status={status} path={path} body={body[:300]!r}")
        return []
    try:
        data = json.loads(body.decode("utf-8") or "[]")
    except json.JSONDecodeError:
        err(f"[trial_drip] supabase_get json_decode_error path={path}")
        return []
    if not isinstance(data, list):
        return []
    return data


def supabase_patch(base_url: str, service_key: str, path: str, params: dict, payload: dict) -> bool:
    qs = urllib.parse.urlencode(params, doseq=True, safe=".:")
    url = f"{base_url.rstrip('/')}/rest/v1/{path}?{qs}"
    headers = {
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }
    body = json.dumps(payload).encode("utf-8")
    status, resp_body, _ = http_request("PATCH", url, headers, body)
    if status >= 300:
        err(f"[trial_drip] supabase_patch status={status} path={path} body={resp_body[:300]!r}")
        return False
    return True


def resend_send(api_key: str, to_email: str, subject: str, html: str) -> tuple[bool, str | None, int]:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "from": FROM_ADDR,
        "to": [to_email],
        "reply_to": REPLY_TO,
        "subject": subject,
        "html": html,
    }
    body = json.dumps(payload).encode("utf-8")
    status, resp_body, _ = http_request("POST", RESEND_URL, headers, body)
    if 200 <= status < 300:
        try:
            obj = json.loads(resp_body.decode("utf-8") or "{}")
            return True, obj.get("id"), status
        except json.JSONDecodeError:
            return True, None, status
    err(f"[trial_drip] resend_error status={status} body={resp_body[:300]!r}")
    sentry_capture_message(
        f"resend trial-drip non-2xx ({status})",
        level="warning",
        fingerprint=["vendor-non-2xx", "resend", "drip-trial"],
        provider="resend",
        job="drip-trial",
        resend_status=status,
        to_email=to_email,
        subject=subject,
    )
    return False, None, status


# ----------------------------------------------------------------------
# Email body templates (mirror docs/email-templates-drafts.md)
# ----------------------------------------------------------------------

DAY2_SUBJECT = "One thing to do today"
DAY2_HTML = """\
<p>Hi {firstName},</p>

<p>Yesterday you started your 7-day ASVAB Hero Pro trial. The single highest-leverage thing for Pro to actually work for you is to take a diagnostic. 30 questions, about 18 minutes, and the platform builds your weak-topic drill list from your results.</p>

<p><a href="https://asvabhero.com/practice-test?variant=diagnostic" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Take your diagnostic</a></p>

<p>Once you have a diagnostic in, the rest of the platform shapes itself around your weakest subtests automatically.</p>

<p>Trish<br>ASVAB Hero</p>
"""

MILESTONE_SUBJECT = "You answered 50 questions on ASVAB Hero"
MILESTONE_HTML = """\
<p>Hi {firstName},</p>

<p>You've answered {totalQuestions} questions and your overall accuracy is {accuracy}%. Your strongest subtest so far is {topSubtest}.</p>

<p>{daysLeft} days left on your trial. Two things that move the needle next:</p>
<ul>
  <li>Run a 25-question drill on your weakest subtest</li>
  <li>Re-take a full diagnostic on day 6 to see your AFQT move</li>
</ul>

<p><a href="https://asvabhero.com/practice-test" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Continue practicing</a></p>

<p>Trish<br>ASVAB Hero</p>
"""


# ----------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------

def first_name(display_name: str | None) -> str:
    if not display_name:
        return "there"
    candidate = display_name.strip().split()
    if not candidate:
        return "there"
    name = candidate[0]
    if len(name) < 2:
        return "there"
    return name


def iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def aggregate_attempts(attempts: list) -> tuple[int, int, int, str]:
    """Returns (total_questions, total_correct, accuracy_pct, top_subtest_label).

    top_subtest_label is the highest-accuracy subtest with >=10 questions
    answered. Falls back to "your best subtest" if none qualify.
    """
    total_q = 0
    total_c = 0
    by_subtest_q: dict = {}
    by_subtest_c: dict = {}

    for row in attempts:
        qc = int(row.get("question_count") or 0)
        cc = int(row.get("correct_count") or 0)
        total_q += qc
        total_c += cc
        rbs = row.get("results_by_subtest")
        if isinstance(rbs, dict):
            for code, val in rbs.items():
                if not isinstance(val, dict):
                    continue
                # Tolerate either {seen, correct} or {q, c} shape.
                seen = val.get("seen")
                if seen is None:
                    seen = val.get("question_count")
                if seen is None:
                    seen = val.get("q")
                correct = val.get("correct")
                if correct is None:
                    correct = val.get("correct_count")
                if correct is None:
                    correct = val.get("c")
                try:
                    seen_i = int(seen or 0)
                    correct_i = int(correct or 0)
                except (TypeError, ValueError):
                    continue
                by_subtest_q[code] = by_subtest_q.get(code, 0) + seen_i
                by_subtest_c[code] = by_subtest_c.get(code, 0) + correct_i

    accuracy_pct = round((total_c / total_q) * 100) if total_q > 0 else 0

    best_code = None
    best_acc = -1.0
    for code, q_count in by_subtest_q.items():
        if q_count < 10:
            continue
        c_count = by_subtest_c.get(code, 0)
        acc = c_count / q_count if q_count else 0
        if acc > best_acc:
            best_acc = acc
            best_code = code

    top_label = SUBTEST_LABELS.get(best_code, "your best subtest") if best_code else "your best subtest"
    return total_q, total_c, accuracy_pct, top_label


def days_left(trial_ends_at_iso: str, now: datetime) -> int:
    try:
        end = datetime.fromisoformat(trial_ends_at_iso.replace("Z", "+00:00"))
    except ValueError:
        return 0
    if end.tzinfo is None:
        end = end.replace(tzinfo=timezone.utc)
    delta = end - now
    return max(0, math.ceil(delta.total_seconds() / 86400))


# ----------------------------------------------------------------------
# Job 1: day-2 activation nudge
# ----------------------------------------------------------------------

def job_day2(
    base_url: str,
    service_key: str,
    resend_key: str,
    dry_run: bool,
    limit: int,
) -> None:
    now = datetime.now(timezone.utc)
    # Trial started 24-48h ago means trial_ends_at is 4-5 days in the future
    # (trials are 7d). Bias slightly wide for cron-runtime drift.
    window_start = (now + timedelta(days=4)).isoformat()
    window_end = (now + timedelta(days=5)).isoformat()

    params = {
        "select": "user_id,email,display_name,trial_ends_at",
        "trial_ends_at": [f"gte.{window_start}", f"lt.{window_end}"],
        "trial_day2_email_sent_at": "is.null",
        "limit": str(limit),
    }
    rows = supabase_get(base_url, service_key, "profiles", params)

    sent = 0
    for row in rows:
        if sent >= limit:
            break
        user_id = row.get("user_id")
        email = row.get("email")
        if not user_id or not email:
            continue

        # Cross-check: skip if any attempts rows.
        attempts = supabase_get(
            base_url,
            service_key,
            "attempts",
            {"user_id": f"eq.{user_id}", "select": "id", "limit": "1"},
        )
        if attempts:
            log(f"[trial_drip] job=day2 user={user_id} email={email} status=skipped reason=has_attempts")
            continue

        fname = first_name(row.get("display_name"))
        html = DAY2_HTML.format(firstName=fname)

        if dry_run:
            log(f"[trial_drip] job=day2 user={user_id} email={email} status=dry_run subject={DAY2_SUBJECT!r}")
            sent += 1
            continue

        ok, resend_id, http_status = resend_send(resend_key, email, DAY2_SUBJECT, html)
        if not ok:
            log(f"[trial_drip] job=day2 user={user_id} email={email} status=error_{http_status}")
            continue

        ts = iso_now()
        patched = supabase_patch(
            base_url,
            service_key,
            "profiles",
            {"user_id": f"eq.{user_id}"},
            {"trial_day2_email_sent_at": ts},
        )
        if not patched:
            err(f"[trial_drip] job=day2 user={user_id} timestamp_update_failed (email already sent, may resend next tick)")
        log(f"[trial_drip] job=day2 user={user_id} email={email} status=sent resend_id={resend_id}")
        sent += 1


# ----------------------------------------------------------------------
# Job 2: 50-question milestone
# ----------------------------------------------------------------------

def job_milestone(
    base_url: str,
    service_key: str,
    resend_key: str,
    dry_run: bool,
    limit: int,
) -> None:
    now = datetime.now(timezone.utc)
    now_iso = now.isoformat()

    params = {
        "select": "user_id,email,display_name,trial_ends_at",
        "trial_ends_at": f"gt.{now_iso}",
        "milestone_50q_email_sent_at": "is.null",
        "limit": str(limit * 4),  # widen pool; many won't have hit 50q yet
    }
    rows = supabase_get(base_url, service_key, "profiles", params)

    sent = 0
    for row in rows:
        if sent >= limit:
            break
        user_id = row.get("user_id")
        email = row.get("email")
        trial_ends_at = row.get("trial_ends_at")
        if not user_id or not email or not trial_ends_at:
            continue

        attempts = supabase_get(
            base_url,
            service_key,
            "attempts",
            {
                "user_id": f"eq.{user_id}",
                "select": "question_count,correct_count,results_by_subtest",
            },
        )
        total_q, total_c, accuracy, top_label = aggregate_attempts(attempts)
        if total_q < 50:
            continue

        d_left = days_left(trial_ends_at, now)
        fname = first_name(row.get("display_name"))
        html = MILESTONE_HTML.format(
            firstName=fname,
            totalQuestions=total_q,
            accuracy=accuracy,
            topSubtest=top_label,
            daysLeft=d_left,
        )

        if dry_run:
            log(
                f"[trial_drip] job=milestone user={user_id} email={email} status=dry_run "
                f"total_q={total_q} accuracy={accuracy} top={top_label!r} days_left={d_left}"
            )
            sent += 1
            continue

        ok, resend_id, http_status = resend_send(resend_key, email, MILESTONE_SUBJECT, html)
        if not ok:
            log(f"[trial_drip] job=milestone user={user_id} email={email} status=error_{http_status}")
            continue

        ts = iso_now()
        patched = supabase_patch(
            base_url,
            service_key,
            "profiles",
            {"user_id": f"eq.{user_id}"},
            {"milestone_50q_email_sent_at": ts},
        )
        if not patched:
            err(f"[trial_drip] job=milestone user={user_id} timestamp_update_failed (email already sent, may resend next tick)")
        log(
            f"[trial_drip] job=milestone user={user_id} email={email} status=sent "
            f"resend_id={resend_id} total_q={total_q} accuracy={accuracy}"
        )
        sent += 1


# ----------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="ASVAB Hero trial drip cron")
    parser.add_argument("--env", default=DEFAULT_ENV_PATH, help="Path to .env file")
    parser.add_argument("--dry-run", action="store_true", help="Print intended sends, no POST/PATCH")
    parser.add_argument("--limit", type=int, default=100, help="Max sends per job per run")
    parser.add_argument(
        "--job",
        choices=["all", "day2", "milestone"],
        default="all",
        help="Run a single job or both",
    )
    args = parser.parse_args()

    env = load_env(args.env)
    init_sentry(env, surface="drip-trial")
    base_url = require_env(env, "ASVABHERO_SUPABASE_URL")
    service_key = require_env(env, "ASVABHERO_SUPABASE_SECRET_KEY")
    resend_key = require_env(env, "ASVAB_RESEND_API_KEY")

    missing = [
        name
        for name, val in (
            ("ASVABHERO_SUPABASE_URL", base_url),
            ("ASVABHERO_SUPABASE_SECRET_KEY", service_key),
            ("ASVAB_RESEND_API_KEY", resend_key),
        )
        if not val
    ]
    if missing:
        err(f"[trial_drip] missing_env keys={','.join(missing)} env_path={args.env}")
        if args.dry_run:
            log("[trial_drip] dry_run=true with missing env, exiting cleanly")
            return 0
        return 2

    log(f"[trial_drip] start dry_run={args.dry_run} job={args.job} limit={args.limit}")

    if args.job in ("all", "day2"):
        try:
            job_day2(base_url, service_key, resend_key, args.dry_run, args.limit)
        except Exception as e:
            err(f"[trial_drip] job=day2 fatal_error error={e!r}")
            sentry_capture_exception(e, job="day2")

    if args.job in ("all", "milestone"):
        try:
            job_milestone(base_url, service_key, resend_key, args.dry_run, args.limit)
        except Exception as e:
            err(f"[trial_drip] job=milestone fatal_error error={e!r}")
            sentry_capture_exception(e, job="milestone")

    log("[trial_drip] done")
    return 0


if __name__ == "__main__":
    rc = run_with_checkin(
        slug="asvab-drip-trial",
        monitor_config=MONITOR_CONFIG_HOURLY,
        fn=main,
    )
    sys.exit(rc if isinstance(rc, int) else 0)
