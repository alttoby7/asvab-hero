"use client";

/**
 * Gate point A — the calculator qualifying-jobs list.
 *
 * Free for everyone: the headline score (rendered above this by Calculator) plus
 * a TEASER of the jobs the visitor qualifies for (the count and the top 3). The
 * SEO promise (the score number) is never gated.
 *
 * Behind a free account: the full qualifying-jobs list, saving the result, and
 * the personalized study plan. The CTA frames the carrot ("See all N jobs you
 * qualify for — free account, no card") and carries the afqt + branch context in
 * the `next` param so signup routes straight to the saved plan (pattern already
 * live: /signup?next=…&afqt=66&branch=navy).
 *
 * Only anonymous visitors hit the gate; a signed-in free account is enough to see
 * the full list. When the flag is off the full JobResults renders unchanged, so
 * the default behaviour is exactly today's.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";
import type { JobMatchSnapshot, JobEligibilityResult } from "@/lib/job-matcher";
import {
  trackEvent,
  SaveGateEvents,
  ensurePaywallContextId,
} from "@/lib/analytics";
import { isSaveGateCalculatorEnabled } from "@/lib/save-gate";
import { useSession } from "@/hooks/useSession";
import JobResults from "./JobResults";

interface CalculatorJobsGateProps {
  snapshot: JobMatchSnapshot;
  afqt: number;
  /** Locked when the calculator page targets a single branch. */
  branch?: Branch;
}

const BRANCH_ORDER: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

/** Flatten the qualifying-by-branch map into one ranked list (branch order). */
function flattenQualifying(
  snapshot: JobMatchSnapshot,
): JobEligibilityResult[] {
  return BRANCH_ORDER.flatMap((b) => snapshot.qualifyingByBranch[b] ?? []);
}

export default function CalculatorJobsGate({
  snapshot,
  afqt,
  branch,
}: CalculatorJobsGateProps) {
  const { session, loading } = useSession();
  const gateEnabled = isSaveGateCalculatorEnabled();

  // Anonymous visitor + flag on = gated. A signed-in free account sees the full
  // list. While the session is loading we render nothing gate-specific to avoid
  // a flash of the full list, then the teaser, for an anon user.
  const isAnon = !session;
  const gated = gateEnabled && !loading && isAnon;

  const total = snapshot.totalQualifying;
  const top3 = flattenQualifying(snapshot).slice(0, 3);

  // Carry the calculator context so signup routes to the saved plan and the
  // account_created_from_gate event can attribute the surface.
  const ctx = `afqt=${afqt}${branch ? `&branch=${branch}` : ""}`;
  const signupHref = `/signup?next=${encodeURIComponent(
    `/app/plan?${ctx}`,
  )}&${ctx}&gate=calculator`;

  // Fire result_revealed once when a real result exists, and save_gate_viewed
  // once when the gate teaser is actually shown. Mint/reuse the shared
  // paywall_context_id so the funnel joins the dashboard FunnelCard.
  const revealedRef = useRef(false);
  const viewedRef = useRef(false);
  useEffect(() => {
    if (loading) return;
    if (!revealedRef.current) {
      revealedRef.current = true;
      const pcid = ensurePaywallContextId();
      trackEvent(SaveGateEvents.ResultRevealed, {
        entry_surface: "calculator",
        branch: branch ?? "all",
        qualifying_jobs_count: total,
        gated,
        paywall_context_id: pcid,
      });
    }
    if (gated && !viewedRef.current) {
      viewedRef.current = true;
      const pcid = ensurePaywallContextId();
      trackEvent(SaveGateEvents.SaveGateViewed, {
        entry_surface: "calculator",
        branch: branch ?? "all",
        qualifying_jobs_count: total,
        paywall_context_id: pcid,
      });
    }
  }, [loading, gated, total, branch]);

  function onSignupClick() {
    trackEvent(SaveGateEvents.SaveGateSignupClick, {
      entry_surface: "calculator",
      branch: branch ?? "all",
      qualifying_jobs_count: total,
      paywall_context_id: ensurePaywallContextId(),
    });
  }

  // Flag on but session still resolving: hold the full list back so an anon
  // visitor never sees a flash of every job before the teaser replaces it. Show
  // a lightweight placeholder instead. (With the flag off we skip this and
  // render the full list immediately, exactly as today.)
  if (gateEnabled && loading) {
    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-text-primary">
            Qualifying Jobs
          </h3>
          <span className="rounded-full bg-accent-dim px-3 py-1 text-sm font-semibold text-accent">
            {total} jobs
          </span>
        </div>
        <p className="text-sm text-text-tertiary">Loading your matches…</p>
      </div>
    );
  }

  // Not gated → the full interactive list, unchanged.
  if (!gated) {
    return (
      <JobResults
        jobsByBranch={snapshot.qualifyingByBranch}
        totalJobs={total}
        afqt={afqt}
      />
    );
  }

  // Gated → teaser (count + top 3) plus the free-account carrot.
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-text-primary">
          Qualifying Jobs
        </h3>
        <span className="rounded-full bg-accent-dim px-3 py-1 text-sm font-semibold text-accent">
          {total} jobs
        </span>
      </div>
      <p className="mb-4 text-sm text-text-tertiary">
        Your AFQT:{" "}
        <span className="font-mono font-semibold text-text-secondary">
          {afqt}
        </span>
        . You qualify for{" "}
        <span className="font-semibold text-text-secondary">{total}</span>{" "}
        {total === 1 ? "job" : "jobs"}
        {branch ? ` in the ${BRANCH_NAMES[branch]}` : " across all six branches"}.
        Here are three to start:
      </p>

      {top3.length > 0 && (
        <ul className="mb-5 space-y-2 list-none p-0">
          {top3.map((r) => (
            <li
              key={r.job.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-navy-border bg-navy-light p-3"
            >
              <span>
                <span className="font-mono text-sm font-semibold text-accent">
                  {r.job.code}
                </span>
                <span className="ml-2 text-sm text-text-primary">
                  {r.job.title}
                </span>
              </span>
              <span className="text-xs text-text-tertiary">
                {BRANCH_NAMES[r.job.branch]}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          <span className="text-accent">●</span> Save your result
        </p>
        <h4 className="mt-3 font-display text-lg font-bold text-text-primary sm:text-xl">
          {total > 3
            ? `See all ${total} jobs you qualify for`
            : "See your full match report"}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Create a free account to unlock the full searchable list, save this
          result to your profile, and get a study plan for the jobs just out of
          reach. Free account, no card.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={signupHref}
            onClick={onSignupClick}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white no-underline shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)]"
          >
            {total > 3
              ? `See all ${total} jobs — free account`
              : "Unlock my full report — free account"}
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
      </div>
    </div>
  );
}
