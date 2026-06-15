"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent, FunnelEvents } from "@/lib/analytics";

interface EmailCaptureProps {
  headline?: string;
  subhead?: string;
  cta?: string;
  tag?: string;
  variant?: "inline" | "card";
  /** When true, also fires email_capture_visible_with_score on first viewport entry. */
  withScoreSignal?: boolean;
  /**
   * Analytics/placement label, distinct from `tag`. `tag` keeps routing the
   * Listmonk list/template; `source` is what we send to GA4 so two mounts of
   * the same magnet (e.g. mid-article vs end) are distinguishable. Defaults to `tag`.
   */
  source?: string;
  /**
   * When set, the success state renders an instant Download button pointing
   * here (the lead magnet is public anyway, so deliver it immediately instead
   * of relying on email, which is broken for already-subscribed users).
   */
  successDownloadHref?: string;
  /** Optional override for the success-state heading. */
  successTitle?: string;
  /** Optional override for the success-state body copy. */
  successBody?: string;
}

const ENDPOINT =
  process.env.NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT || "/api/signup";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture({
  headline = "Email me my personalized ASVAB study plan",
  subhead = "Get the four subtests that move your AFQT fastest, a week-by-week plan, and short lessons by email. Free.",
  cta = "Send my plan",
  tag = "asvab-study-plan",
  variant = "card",
  withScoreSignal = false,
  source,
  successDownloadHref,
  successTitle,
  successBody,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const firedShownRef = useRef(false);
  // Honeypot: bots fill every field; humans never see this one. Filled = drop silently.
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  // Analytics label, separate from the routing tag (see prop docs).
  const analyticsSource = source ?? tag;

  // Fire `email_capture_shown` only when the form actually enters the viewport
  // (50% threshold, once per mount). Avoids ghost impressions from off-screen
  // mounts, see /calculator's 115 mount-fires with 0 conversions.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for ancient browsers / SSR-only render: fire on mount.
      if (!firedShownRef.current) {
        firedShownRef.current = true;
        trackEvent(FunnelEvents.EmailCaptureShown, { source: analyticsSource });
        if (withScoreSignal) {
          trackEvent(FunnelEvents.EmailCaptureVisibleWithScore, {
            source: analyticsSource,
          });
        }
      }
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedShownRef.current) {
            firedShownRef.current = true;
            trackEvent(FunnelEvents.EmailCaptureShown, {
              source: analyticsSource,
            });
            if (withScoreSignal) {
              trackEvent(FunnelEvents.EmailCaptureVisibleWithScore, {
                source: analyticsSource,
              });
            }
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [analyticsSource, withScoreSignal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot tripped: pretend success, send nothing. Don't tip off the bot.
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError(null);
    trackEvent(FunnelEvents.EmailCaptureSubmit, { source: analyticsSource });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag, source: analyticsSource }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
      trackEvent("signup_submit", { source: analyticsSource, success: true });
      // Only count net-new subscribers as leads. The endpoint returns
      // already_subscribed:true on a 409 (no email sent), which is not a fresh
      // lead and would otherwise inflate the conversion metric.
      let alreadySubscribed = false;
      try {
        const data = (await res.clone().json()) as { already_subscribed?: boolean };
        alreadySubscribed = data?.already_subscribed === true;
      } catch {
        /* non-JSON body: treat as net-new */
      }
      if (!alreadySubscribed) {
        // Conversion event (GA4 Key Event). The lead is the money step for the
        // calculator/article funnel, fire a clean, dedicated event for it.
        trackEvent("generate_lead", {
          source: analyticsSource,
          method: "email_capture",
        });
      }
      // Persist capture source so a later /signup signup_complete event can
      // attribute back to the originating mount (e.g. `calculator-result`).
      // 14-day TTL; cleared on signup_complete read. Cross-tab leak is
      // intentional, capture in tab 1 → signup in tab 2 should attribute.
      try {
        localStorage.setItem(
          "asvabhero.last_capture_source",
          JSON.stringify({ source: analyticsSource, capturedAt: Date.now() })
        );
      } catch {
        /* ignore quota / private mode */
      }
      await replayPendingSignups();
    } catch {
      try {
        const stash = JSON.parse(
          localStorage.getItem("asvabhero.pending_signups") || "[]"
        );
        stash.push({ email, tag, at: new Date().toISOString() });
        localStorage.setItem(
          "asvabhero.pending_signups",
          JSON.stringify(stash)
        );
      } catch {
        /* ignore */
      }
      setStatus("error");
      trackEvent("signup_submit", { source: analyticsSource, success: false });
      setError("Couldn't reach the server. We saved your email and will try again.");
    }
  };

  async function replayPendingSignups() {
    let stash: { email: string; tag?: string; at: string }[] = [];
    try {
      stash = JSON.parse(
        localStorage.getItem("asvabhero.pending_signups") || "[]"
      );
    } catch {
      return;
    }
    if (!stash.length) return;
    const remaining: typeof stash = [];
    for (const entry of stash) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: entry.email,
            tag: entry.tag,
            source: entry.tag,
          }),
        });
        if (!res.ok) remaining.push(entry);
      } catch {
        remaining.push(entry);
      }
    }
    localStorage.setItem(
      "asvabhero.pending_signups",
      JSON.stringify(remaining)
    );
  }

  if (status === "success") {
    if (successDownloadHref) {
      return (
        <div className="rounded-lg border border-success/40 bg-success-dim p-4 text-success">
          <p className="text-sm font-semibold">
            {successTitle ?? "You're in. Your download is ready."}
          </p>
          <p className="mt-1 text-sm">
            {successBody ??
              "Tap below to grab your PDF. We also sent a copy to your inbox."}
          </p>
          <a
            href={successDownloadHref}
            download
            className="mt-3 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Download the PDF
          </a>
        </div>
      );
    }
    return (
      <div className="rounded-lg border border-success/40 bg-success-dim p-4 text-sm text-success">
        ✓ You&apos;re in. Check {email} for your study plan in the next few
        minutes.
      </div>
    );
  }

  const container =
    variant === "card"
      ? "rounded-xl border border-accent/40 bg-navy-light p-6"
      : "rounded-lg border border-navy-border bg-navy-light p-4";

  return (
    <section ref={containerRef} className={container}>
      {headline && (
        <h3 className="font-display text-lg font-bold text-text-primary">
          {headline}
        </h3>
      )}
      {subhead && <p className="mt-1 text-sm text-text-secondary">{subhead}</p>}
      <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap gap-2">
        {/* Honeypot: hidden from humans (and screen readers), catnip for bots. */}
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-md border border-navy-border bg-navy px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : cta}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      <p className="mt-2 text-xs text-text-tertiary">
        No spam. Unsubscribe any time.
      </p>
    </section>
  );
}
