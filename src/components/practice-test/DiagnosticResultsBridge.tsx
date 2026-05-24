"use client";

/**
 * Soft-gate for the diagnostic results artifact (anonymous users only).
 *
 * The top-line score (overall % + Est. AFQT/category) stays visible above this
 * component — that's the immediate answer and the AI/search landing payoff. The
 * *personalized takeaway you keep* — your weakest topics, every answer explained,
 * and your first plan — is gated behind a free account. The anon diagnostic the
 * visitor just finished is held in localStorage and migrated into their account
 * on first authed app load (see AppLayout → syncLocalHistoryToRemote), so the
 * "Save my score + build my free plan" promise is real, not a retake.
 *
 * No card, no Pro ask here — the $9.99 ask lives downstream (daily-limit / sims),
 * mirroring CalculatorResultBridge.
 */

import { useRef } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { RECRUITS_PER_MONTH } from "@/data/social-proof";

interface DiagnosticResultsBridgeProps {
  /** AFQT estimate (or primary-metric estimate for AFCT modes) — context only. */
  afqt: number;
  questionCount: number;
  /** AFCT users have no AFQT; tweak the framing to a neutral "score". */
  isAfqtMode: boolean;
}

function LockedRow({ title, sub }: { title: string; sub: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-accent-dim">
        <svg
          className="h-3.5 w-3.5 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
          />
        </svg>
      </span>
      <span>
        <span className="block text-sm font-semibold text-text-primary">
          {title}
        </span>
        <span className="block text-xs text-text-tertiary">{sub}</span>
      </span>
    </li>
  );
}

export default function DiagnosticResultsBridge({
  afqt,
  questionCount,
  isAfqtMode,
}: DiagnosticResultsBridgeProps) {
  const firedRef = useRef(false);
  const planHref = `/signup?next=${encodeURIComponent("/app/plan")}`;

  function onPrimary() {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent("diagnostic_bridge_cta_click", {
      afqt,
      question_count: questionCount,
      mode: isAfqtMode ? "afqt" : "afct",
    });
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        <span className="text-accent">●</span> Your full breakdown is ready
      </p>

      <h3 className="mt-4 font-display text-xl font-bold text-text-primary sm:text-2xl">
        Save your score &amp; unlock your personalized plan
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        You just answered {questionCount} questions. Create a free account to keep
        this result and turn it into a plan — built on the methods cognitive
        science shows actually raise scores. No card.
      </p>

      <ul className="mt-6 space-y-3">
        <LockedRow
          title="Your weakest topics, ranked"
          sub="See exactly where to spend your study time first"
        />
        <LockedRow
          title={`All ${questionCount} questions, fully explained`}
          sub="Review every answer with step-by-step explanations"
        />
        <LockedRow
          title="Your first adaptive plan"
          sub="One daily block on the subtests that move your score, plus Mistake-Bank review"
        />
        <LockedRow
          title="Saved score history + cross-device resume"
          sub="Track your climb and pick up where you left off, anywhere"
        />
      </ul>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={planHref}
          onClick={onPrimary}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white no-underline shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)]"
        >
          Save my score &amp; build my free plan
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
        <Link
          href="/how-it-works"
          className="inline-flex items-center justify-center rounded-xl border border-navy-border px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:border-accent/40 hover:text-text-primary"
        >
          See how it works
        </Link>
      </div>
      <p className="mt-3 text-xs text-text-tertiary">
        Free account, no card — join {RECRUITS_PER_MONTH.toLocaleString()}+ recruits
        prepping here this month.
      </p>
    </section>
  );
}
