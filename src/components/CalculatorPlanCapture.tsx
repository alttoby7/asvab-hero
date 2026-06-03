"use client";

/**
 * Calculator-result conversion (two-step), the peak-intent moment.
 *
 * Replaces the old CalculatorResultBridge, whose "create an account to see your
 * jobs" gate was fake (JobResults already lists every job free below it) and so
 * converted ~0.7%. The new gate is the personalized IMPROVEMENT PLAN, which the
 * page never gave away: the AFQT subtests holding the score back plus a path to
 * the next tier.
 *
 * Step 1: one-field email capture, result-aware copy. The reward is on-screen
 *   (the top AFQT levers, revealed on submit) plus a saved plan to track the
 *   climb, not a deferred inbox delivery. POST to /api/signup with the score
 *   payload so the saved plan can personalize.
 * Step 2: success state shows the top AFQT levers instantly (felt reward), then
 *   nudges to a free account that carries the score context.
 *
 * The jobs list stays free. Honest framing: AFQT tiers, never "guaranteed."
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { trackEvent } from "@/lib/analytics";
import { SUBTEST_METADATA } from "@/data/subtest-metadata";
import { RECRUITS_PER_MONTH } from "@/data/social-proof";
import type { AsvabSubtest, Branch, SubtestScores } from "@/types";

interface CalculatorPlanCaptureProps {
  afqt: number;
  branch?: Branch;
  scores: SubtestScores;
  isPro: boolean;
}

const ENDPOINT =
  process.env.NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT || "/api/signup";

/** The four subtests that determine AFQT. WK and PC count double (via VE). */
const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC", "MK"];

type Status = "idle" | "submitting" | "success" | "error";

interface Lever {
  subtest: AsvabSubtest;
  fullName: string;
  score: number;
  weight: number;
}

/**
 * Rank the AFQT subtests by how much raising them moves the AFQT: weight (2 for
 * the doubled WK/PC, else 1) times remaining headroom. A low Word Knowledge
 * outranks a slightly-lower Arithmetic Reasoning because it counts twice.
 */
function topAfqtLevers(scores: SubtestScores, k: number): Lever[] {
  return AFQT_SUBTESTS.map((st) => {
    const meta = SUBTEST_METADATA.find((m) => m.subtest === st);
    const weight = meta?.veDoubled ? 2 : 1;
    const score = scores[st] ?? 0;
    return {
      subtest: st,
      fullName: meta?.fullName ?? st,
      score,
      weight,
      impact: weight * Math.max(0, 99 - score),
    };
  })
    .sort((a, b) => b.impact - a.impact)
    .slice(0, k)
    .map(({ subtest, fullName, score, weight }) => ({
      subtest,
      fullName,
      score,
      weight,
    }));
}

/** Honest tier framing keyed off the real AFQT category lines (50, 65, 93). */
function tierFraming(afqt: number): { target: number; eyebrow: string } {
  if (afqt < 50) return { target: 50, eyebrow: "More options ahead" };
  if (afqt < 65) return { target: 65, eyebrow: "Good, aim higher" };
  return { target: 93, eyebrow: "Strong, now protect it" };
}

function joinNames(levers: Lever[]): string {
  const names = levers.map((l) => l.fullName);
  if (names.length <= 1) return names[0] ?? "your weakest subtests";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

async function replayPendingSignups(): Promise<void> {
  let stash: { email: string; tag?: string; at: string }[] = [];
  try {
    stash = JSON.parse(
      localStorage.getItem("asvabhero.pending_signups") || "[]",
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
  localStorage.setItem("asvabhero.pending_signups", JSON.stringify(remaining));
}

export default function CalculatorPlanCapture({
  afqt,
  branch,
  scores,
  isPro,
}: CalculatorPlanCaptureProps) {
  const { session } = useSession();
  const { target, eyebrow } = tierFraming(afqt);
  const gap = Math.max(0, target - afqt);
  const levers = topAfqtLevers(scores, 2);
  const leverNames = joinNames(levers);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement | null>(null);
  const firedShownRef = useRef(false);

  const TAG = "calculator-plan";

  // Fire `plan_capture_shown` only when the capture actually enters the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      if (!firedShownRef.current) {
        firedShownRef.current = true;
        trackEvent("plan_capture_shown", {
          source: TAG,
          afqt,
          gap,
          branch: branch ?? "all",
        });
      }
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedShownRef.current) {
            firedShownRef.current = true;
            trackEvent("plan_capture_shown", {
              source: TAG,
              afqt,
              gap,
              branch: branch ?? "all",
            });
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [afqt, gap, branch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError(null);
    trackEvent("plan_capture_submit", { source: TAG, afqt, gap });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tag: TAG,
          source: "calculator-result",
          scores,
        }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
      trackEvent("signup_submit", { source: TAG, success: true });
      // GA4 Key Event: the lead is the money step for the calculator funnel.
      trackEvent("generate_lead", { source: TAG, method: "calculator_plan" });
      try {
        localStorage.setItem(
          "asvabhero.last_capture_source",
          JSON.stringify({ source: "calculator-result", capturedAt: Date.now() }),
        );
      } catch {
        /* ignore quota / private mode */
      }
      await replayPendingSignups();
    } catch {
      try {
        const stash = JSON.parse(
          localStorage.getItem("asvabhero.pending_signups") || "[]",
        );
        stash.push({ email, tag: TAG, at: new Date().toISOString() });
        localStorage.setItem(
          "asvabhero.pending_signups",
          JSON.stringify(stash),
        );
      } catch {
        /* ignore */
      }
      setStatus("error");
      trackEvent("signup_submit", { source: TAG, success: false });
      setError(
        "Couldn't reach the server. We saved your email and will try again.",
      );
    }
  }

  // Step 2 destination: authed users go straight to their plan; anon users get a
  // signup that returns to the plan, carrying the score context (path-integrity).
  const ctx = `afqt=${afqt}${branch ? `&branch=${branch}` : ""}`;
  const accountHref = session
    ? `/app/plan?${ctx}`
    : `/signup?next=${encodeURIComponent(`/app/plan?${ctx}`)}&${ctx}`;

  function onAccountNudge() {
    trackEvent("plan_account_nudge_click", {
      source: TAG,
      afqt,
      authed: !!session,
    });
  }

  const headline =
    gap > 0
      ? `Your +${gap}-point plan to reach ${target}: focus on ${leverNames}.`
      : `Lock in your ${afqt}: a plan to keep ${leverNames} sharp through test day.`;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        <span className="text-accent">●</span> {eyebrow}
      </p>

      {status === "success" ? (
        <>
          <h3 className="mt-4 font-display text-xl font-bold text-text-primary sm:text-2xl">
            Your plan is saved. Here are your biggest levers.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Start with the subtests that move your AFQT the most. Create a free
            account to drill them and track your climb:
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {levers.map((l) => (
              <div
                key={l.subtest}
                className="rounded-md border border-navy-border bg-navy-light px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent-dim px-2 py-1 font-mono text-xs font-semibold text-accent">
                    {l.subtest}
                    <span className="text-accent/70">{l.score}</span>
                  </span>
                  {l.weight === 2 && (
                    <span className="rounded bg-success-dim px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                      Counts 2x
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[11px] text-text-tertiary">
                  {l.fullName}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={accountHref}
              onClick={onAccountNudge}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white no-underline shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)]"
            >
              {session
                ? "Practice these in my plan"
                : "Create a free account to practice these"}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <span className="text-xs text-text-tertiary">
              No card. Picks up right where your scores left off.
            </span>
          </div>
        </>
      ) : (
        <>
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
            {gap > 0 && (
              <div className="text-right">
                <div className="font-mono text-3xl font-bold leading-none text-accent sm:text-4xl">
                  +{gap}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-text-tertiary">
                  to reach {target}
                </div>
              </div>
            )}
          </div>

          <h3 className="mt-6 font-display text-xl font-bold text-text-primary sm:text-2xl">
            {headline}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            See your{" "}
            <span className="text-text-primary">two biggest AFQT levers</span> on
            screen now, then save your plan to track your climb and drill those
            exact subtests. Free, no card.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-wrap gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-md border border-navy-border bg-navy px-3 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {status === "submitting" ? "Saving…" : "Save my plan"}
            </button>
          </form>
          {error && <p className="mt-2 text-xs text-danger">{error}</p>}

          <p className="mt-3 text-xs text-text-tertiary">
            No spam, unsubscribe any time. Join{" "}
            {RECRUITS_PER_MONTH.toLocaleString()}+ recruits prepping here this
            month.{" "}
            {!isPro && (
              <Link
                href="/pricing"
                className="text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
              >
                Compare plans
              </Link>
            )}
          </p>
        </>
      )}
    </section>
  );
}
