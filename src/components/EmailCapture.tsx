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
}

const ENDPOINT =
  process.env.NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT || "/api/signup";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture({
  headline = "Email me my 30-day ASVAB study plan",
  subhead = "Get a personalized 6-page PDF plus a 5-email crash course on AFQT & line scores.",
  cta = "Send it to me",
  tag = "asvab-study-plan",
  variant = "card",
  withScoreSignal = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const firedShownRef = useRef(false);

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
        trackEvent(FunnelEvents.EmailCaptureShown, { source: tag });
        if (withScoreSignal) {
          trackEvent(FunnelEvents.EmailCaptureVisibleWithScore, { source: tag });
        }
      }
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedShownRef.current) {
            firedShownRef.current = true;
            trackEvent(FunnelEvents.EmailCaptureShown, { source: tag });
            if (withScoreSignal) {
              trackEvent(FunnelEvents.EmailCaptureVisibleWithScore, {
                source: tag,
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
  }, [tag, withScoreSignal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag, source: tag }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
      trackEvent("signup_submit", { source: tag, success: true });
      // Persist capture source so a later /signup signup_complete event can
      // attribute back to the originating mount (e.g. `calculator-result`).
      // 14-day TTL; cleared on signup_complete read. Cross-tab leak is
      // intentional, capture in tab 1 → signup in tab 2 should attribute.
      try {
        localStorage.setItem(
          "asvabhero.last_capture_source",
          JSON.stringify({ source: tag, capturedAt: Date.now() })
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
      trackEvent("signup_submit", { source: tag, success: false });
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
      <h3 className="font-display text-lg font-bold text-text-primary">
        {headline}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">{subhead}</p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap gap-2">
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
