"""Sentry init + cron check-in helpers for ASVAB Hero droplet crons.

Adds sentry-sdk dependency to scripts that were previously stdlib-only.
Acceptable break of that constraint per the observability plan
(/home/trisha/.claude/plans/do-this-now-curried-waffle.md): the value of
exception capture, breadcrumbs, and cron monitor check-ins outweighs the
20KB and one pip install.

Install on droplet:
    pip3 install --user sentry-sdk

Usage:
    from sentry_helper import init_sentry, run_with_checkin, sentry_capture_exception, MONITOR_CONFIG_HOURLY

    init_sentry(env, surface="drip-trial")
    rc = run_with_checkin(
        slug="asvab-drip-trial",
        monitor_config=MONITOR_CONFIG_HOURLY,
        fn=lambda: real_main(...),
    )

If ASVABHERO_SENTRY_DSN_CRON is unset, init is a no-op and the cron runs
exactly as before with no Sentry interaction.
"""
from __future__ import annotations

import os
import time
from typing import Any, Callable

try:
    import sentry_sdk
    from sentry_sdk.crons import capture_checkin, MonitorStatus
    SENTRY_AVAILABLE = True
except ImportError:
    SENTRY_AVAILABLE = False
    sentry_sdk = None  # type: ignore
    capture_checkin = None  # type: ignore
    MonitorStatus = None  # type: ignore


# Schedule configs for auto-creating monitors on first check-in.
MONITOR_CONFIG_DAILY_2AM_UTC: dict = {
    "schedule": {"type": "crontab", "value": "0 2 * * *"},
    "timezone": "UTC",
    "checkin_margin": 5,       # minutes — alert if no in_progress within 5 min of expected
    "max_runtime": 30,         # minutes — alert if check-in not closed within 30 min
    "failure_issue_threshold": 1,
    "recovery_threshold": 1,
}

MONITOR_CONFIG_HOURLY: dict = {
    "schedule": {"type": "interval", "value": 1, "unit": "hour"},
    "timezone": "UTC",
    "checkin_margin": 5,
    "max_runtime": 30,
    "failure_issue_threshold": 1,
    "recovery_threshold": 1,
}


def init_sentry(env: dict, surface: str) -> bool:
    """Init the Sentry SDK from env. Returns True if active, False if no-op.

    Reads ASVABHERO_SENTRY_DSN_CRON from the passed-in env dict (loaded
    from .env) with fallback to os.environ. If unset or sentry-sdk is not
    installed, returns False and all subsequent capture calls are no-ops.
    """
    if not SENTRY_AVAILABLE:
        return False
    dsn = env.get("ASVABHERO_SENTRY_DSN_CRON") or os.environ.get("ASVABHERO_SENTRY_DSN_CRON", "")
    if not dsn:
        return False
    sentry_sdk.init(
        dsn=dsn,
        environment=env.get("ASVABHERO_ENV") or os.environ.get("ASVABHERO_ENV", "production"),
        release=env.get("ASVABHERO_RELEASE") or os.environ.get("ASVABHERO_RELEASE"),
        traces_sample_rate=0.0,
        send_default_pii=False,
    )
    sentry_sdk.set_tag("surface", surface)
    sentry_sdk.set_tag("runtime", "python-cron")
    return True


def run_with_checkin(
    slug: str,
    monitor_config: dict,
    fn: Callable[[], Any],
) -> Any:
    """Wrap a job body with a Sentry cron monitor check-in.

    Sends IN_PROGRESS at start, OK on clean exit, ERROR on raised exception.
    Re-raises any exception so the script's exit code reflects failure.
    If Sentry is not initialized (DSN unset), this is a transparent passthrough.
    """
    if not SENTRY_AVAILABLE or sentry_sdk is None or capture_checkin is None:
        return fn()
    start = time.monotonic()
    check_in_id = capture_checkin(
        monitor_slug=slug,
        status=MonitorStatus.IN_PROGRESS,
        monitor_config=monitor_config,
    )
    try:
        result = fn()
    except Exception:
        capture_checkin(
            monitor_slug=slug,
            check_in_id=check_in_id,
            status=MonitorStatus.ERROR,
            duration=time.monotonic() - start,
        )
        raise
    capture_checkin(
        monitor_slug=slug,
        check_in_id=check_in_id,
        status=MonitorStatus.OK,
        duration=time.monotonic() - start,
    )
    return result


def sentry_capture_exception(err: BaseException, **tags: Any) -> None:
    """Capture an exception with optional tags. No-op if Sentry not initialized."""
    if not SENTRY_AVAILABLE or sentry_sdk is None:
        return
    with sentry_sdk.isolation_scope() as scope:
        for k, v in tags.items():
            if v is not None:
                scope.set_tag(k, str(v))
        sentry_sdk.capture_exception(err)


def sentry_capture_message(
    message: str,
    *,
    level: str = "warning",
    fingerprint: list[str] | None = None,
    **tags: Any,
) -> None:
    """Capture a message (typically vendor non-2xx). No-op if Sentry not initialized."""
    if not SENTRY_AVAILABLE or sentry_sdk is None:
        return
    with sentry_sdk.isolation_scope() as scope:
        for k, v in tags.items():
            if v is not None:
                scope.set_tag(k, str(v))
        if fingerprint:
            scope.fingerprint = fingerprint
        sentry_sdk.capture_message(message, level=level)
