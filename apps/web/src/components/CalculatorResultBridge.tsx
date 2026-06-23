"use client";

/**
 * Conversion #1, the calculator-result FREE-PLAN bridge (the peak-intent moment).
 *
 * Replaces the old "30-day PDF" email capture + straight-to-$24.99 Pro upsell.
 * The score the visitor just computed becomes the hook to create a FREE account:
 * save the score, track the climb, and start the free daily plan (adaptive AFQT
 * block + Mistake Bank). The $9.99 ask is intentionally NOT here, it moves
 * downstream (daily-limit hit / sims). Honest framing: AFQT tiers vs the real
 * enlistment/quality cutoffs; "evidence-based," never "proven."
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { trackEvent } from "@/lib/analytics";
import { RECRUITS_PER_MONTH } from "@/data/social-proof";
import type { Branch } from "@/types";

interface CalculatorResultBridgeProps {
  afqt: number;
  branch?: Branch;
  qualifyingCount: number;
  isPro: boolean;
}

/** Honest tier framing keyed off the real AFQT category lines (50 = IIIA, 65 = II, 93 = I). */
function tierFraming(afqt: number): { target: number; eyebrow: string; headline: string } {
  if (afqt < 50) {
    return {
      target: 50,
      eyebrow: "More options ahead",
      headline: "Reaching 50 opens far more jobs and enlistment incentives.",
    };
  }
  if (afqt < 65) {
    return {
      target: 65,
      eyebrow: "Good, aim higher",
      headline: "Solid score. Reaching 65 opens the most competitive jobs.",
    };
  }
  return {
    target: 93,
    eyebrow: "Strong, now protect it",
    headline: "Strong score. Push toward 93 (Category I) and lock it in.",
  };
}

export default function CalculatorResultBridge({
  afqt,
  branch,
  qualifyingCount,
  isPro,
}: CalculatorResultBridgeProps) {
  const { session } = useSession();
  const { target, eyebrow, headline } = tierFraming(afqt);

  // Animate the gap bar fill on mount (reduced-motion safe).
  const [filled, setFilled] = useState(false);
  const firedRef = useRef(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFilled(true);
      return;
    }
    const t = window.setTimeout(() => setFilled(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Where "Start my free plan" goes: authed → straight to their plan; anon →
  // signup that returns to the plan, carrying the score context (path-integrity).
  const ctx = `afqt=${afqt}${branch ? `&branch=${branch}` : ""}`;
  const planHref = session
    ? `/app/plan?${ctx}`
    : `/signup?next=${encodeURIComponent(`/app/plan?${ctx}`)}&${ctx}`;

  function onPrimary() {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent("bridge_cta_click", {
      afqt,
      target,
      gap: Math.max(0, target - afqt),
      branch: branch ?? "all",
      authed: !!session,
    });
  }

  const pct = Math.min(100, Math.round((afqt / 99) * 100));
  const targetPct = Math.min(100, Math.round((target / 99) * 100));
  const gap = Math.max(0, target - afqt);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        <span className="text-accent">●</span> {eyebrow}
      </p>

      {/* Score-gap reveal, the focal moment. */}
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-5xl font-extrabold leading-none text-text-primary sm:text-6xl">
            {afqt}
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-text-tertiary">
            Your AFQT
          </div>
        </div>
        {gap > 0 ? (
          <div className="text-right">
            <div className="font-mono text-3xl font-bold leading-none text-accent sm:text-4xl">
              +{gap}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-text-tertiary">
              to reach {target}
            </div>
          </div>
        ) : (
          <div className="text-right">
            <div className="font-mono text-2xl font-bold leading-none text-success">
              On target
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-text-tertiary">
              {qualifyingCount} jobs unlocked
            </div>
          </div>
        )}
      </div>

      {/* Gap bar: current fill + target marker. */}
      <div className="relative mt-4 h-2.5 w-full overflow-hidden rounded-full bg-navy-lighter">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-out"
          style={{ width: filled ? `${pct}%` : "0%" }}
        />
        <div
          className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-text-secondary"
          style={{ left: `${targetPct}%` }}
          aria-hidden
        />
      </div>

      <h3 className="mt-6 font-display text-xl font-bold text-text-primary sm:text-2xl">
        {headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        Create a free account to{" "}
        <span className="text-text-primary">
          see the full list of {qualifyingCount.toLocaleString()} jobs you qualify
          for
        </span>
        , save this score, and track your climb, plus one adaptive AFQT block a
        day, unlimited Mistake-Bank review, and a weekly plan focused on the four
        subtests that actually move your AFQT. Built on the methods cognitive
        science shows raise scores. No card.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={planHref}
          onClick={onPrimary}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white no-underline shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)]"
        >
          {session ? "Go to my plan" : "Start my free plan"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex items-center justify-center rounded-xl border border-navy-border px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:border-accent/40 hover:text-text-primary"
        >
          See how it works
        </Link>
      </div>
      <p className="mt-3 text-xs text-text-tertiary">
        Free account, no card, join {RECRUITS_PER_MONTH.toLocaleString()}+ recruits
        prepping here this month.{" "}
        {!isPro && (
          <>
            Want unlimited practice + full-length sims later?{" "}
            <Link
              href="/pricing"
              className="text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
            >
              Compare plans
            </Link>
            .
          </>
        )}
      </p>
    </section>
  );
}
