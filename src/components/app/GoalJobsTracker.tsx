"use client";

/**
 * WS4 — Multi-goal-job tracker (replaces JobGoalCard).
 *
 * Renders up to 3 evaluated target jobs from rpc_get_home_trajectory()'s
 * `target_jobs`. BAND + STATUS ONLY — never a raw point gap. AF/Space Force
 * jobs (support_status beta/unsupported) render "Not yet reliable for this
 * branch" instead of a status, because their MAGE composites are raw sums while
 * thresholds are percentiles (see catalog.ts MAGE_BETA_REASON).
 *
 * Empty state -> CTA to add goal jobs (inline JobPicker), which persists via
 * rpc_add_target_job and asks the parent to refetch the trajectory.
 */

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { addTargetJob } from "@/lib/trajectory/queries";
import type {
  GapBand,
  JobOverallStatus,
  RequirementStatus,
  TargetJobGap,
} from "@/lib/trajectory/types";
import { BRANCH_NAMES } from "@/types";
import JobPicker from "./JobPicker";

// ── Display copy (band-only; no point deltas anywhere) ────────────────

const GAP_BAND_PHRASE: Record<GapBand, string> = {
  at_or_above_band: "at/above",
  within_one_band: "within one band",
  more_than_one_band_below: "more than a band below",
};

const STATUS_PHRASE: Record<RequirementStatus, string> = {
  qualifies: "qualifies",
  borderline: "borderline",
  needs_work: "needs work",
};

const OVERALL_CHIP: Record<
  JobOverallStatus,
  { label: string; cls: string }
> = {
  qualifies: {
    label: "On track",
    cls: "border-success/40 bg-success-dim text-success",
  },
  borderline: {
    label: "Borderline",
    cls: "border-almost/40 bg-almost-dim text-almost",
  },
  needs_work: {
    label: "Needs work",
    cls: "border-danger/40 bg-danger-dim text-danger",
  },
  unsupported: {
    label: "Not yet reliable",
    cls: "border-navy-border bg-navy text-text-tertiary",
  },
};

const CHECK_DOT: Record<RequirementStatus, string> = {
  qualifies: "bg-success",
  borderline: "bg-almost",
  needs_work: "bg-danger",
};

interface GoalJobsTrackerProps {
  /** Evaluated target jobs from rpc_get_home_trajectory(). */
  targetJobs: TargetJobGap[];
  /** Profile branch to preselect in the picker empty/add state. */
  profileBranch: string | null;
  /** Refetch the home trajectory after a mutation. */
  onChanged: () => void;
}

function CheckRow({
  label,
  status,
  gapBand,
}: {
  label: string;
  status: RequirementStatus;
  gapBand: GapBand;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-navy-border bg-navy px-3 py-2">
      <span className="flex items-center gap-2 text-sm text-text-secondary">
        <span
          className={`inline-block h-2 w-2 shrink-0 rounded-full ${CHECK_DOT[status]}`}
          aria-hidden
        />
        {label}
      </span>
      <span className="shrink-0 text-xs text-text-tertiary">
        <span className="font-medium text-text-secondary">
          {STATUS_PHRASE[status]}
        </span>{" "}
        · {GAP_BAND_PHRASE[gapBand]}
      </span>
    </div>
  );
}

function JobCard({ job }: { job: TargetJobGap }) {
  const isBeta = job.support_status !== "supported";
  const chip = OVERALL_CHIP[job.overall_status];

  return (
    <div
      className={`rounded-xl border p-4 ${
        job.is_primary
          ? "border-accent/40 bg-accent/5"
          : "border-navy-border bg-navy"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-bold text-text-primary">
              {job.code}
            </span>
            {job.is_primary && (
              <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                Primary
              </span>
            )}
          </div>
          <div className="mt-0.5 text-sm text-text-secondary">{job.title}</div>
          <div className="mt-0.5 text-xs text-text-tertiary">
            {BRANCH_NAMES[job.branch]}
            {job.category ? ` · ${job.category}` : ""}
          </div>
        </div>
        {!isBeta && (
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${chip.cls}`}
          >
            {chip.label}
          </span>
        )}
      </div>

      {isBeta ? (
        <div className="mt-3 rounded-lg border border-navy-border bg-navy-light px-3 py-2.5 text-xs text-text-secondary">
          Not yet reliable for this branch. Air Force and Space Force scores use
          MAGE percentiles, which we can&apos;t estimate accurately yet — so we
          won&apos;t guess your standing for {job.code}.
        </div>
      ) : (
        <div className="mt-3 space-y-1.5">
          {job.afqt && (
            <CheckRow
              label="AFQT minimum"
              status={job.afqt.status}
              gapBand={job.afqt.gap_band}
            />
          )}
          {job.checks.map((c, i) => (
            <CheckRow
              key={`${c.composite_code}-${c.requirement_group}-${i}`}
              label={
                c.requirement_group === 0
                  ? c.composite_code
                  : `${c.composite_code} (alt path)`
              }
              status={c.status}
              gapBand={c.gap_band}
            />
          ))}
          {!job.afqt && job.checks.length === 0 && (
            <div className="rounded-lg border border-navy-border bg-navy px-3 py-2 text-xs text-text-tertiary">
              No score minimums on file for this job.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GoalJobsTracker({
  targetJobs,
  profileBranch,
  onChanged,
}: GoalJobsTrackerProps) {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const atLimit = targetJobs.length >= 3;
  const existingIds = targetJobs.map((j) => j.job_id);

  async function handlePick(jobId: string) {
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      await addTargetJob(sb, jobId, targetJobs.length === 0);
      setAdding(false);
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add that job.");
    }
  }

  // Empty state
  if (targetJobs.length === 0 && !adding) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          What jobs are you working toward?
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Track up to 3 target MOS/AFSC/ratings. We&apos;ll show how close you
          are to each — as a confidence band, not a single number.
        </p>
        <button
          onClick={() => setAdding(true)}
          className="mt-4 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Add a goal job
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Your goal jobs
        </h2>
        <Link
          href="/account/settings"
          className="text-xs text-text-tertiary transition-colors hover:text-text-secondary"
        >
          Manage
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {targetJobs.map((job) => (
          <JobCard key={job.target_job_id} job={job} />
        ))}
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-danger/40 bg-danger-dim px-3 py-2 text-xs text-danger">
          {error}
        </div>
      )}

      {adding ? (
        <div className="mt-4 rounded-xl border border-navy-border bg-navy p-4">
          <JobPicker
            defaultBranch={profileBranch as never}
            onPick={(entry) => handlePick(entry.id)}
            disabledJobIds={existingIds}
            notice={atLimit ? "You're tracking the max of 3 goal jobs." : null}
          />
          <button
            onClick={() => {
              setAdding(false);
              setError(null);
            }}
            className="mt-3 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          >
            Cancel
          </button>
        </div>
      ) : (
        !atLimit && (
          <button
            onClick={() => setAdding(true)}
            className="mt-4 inline-flex rounded-lg border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-dim"
          >
            Add another goal job
          </button>
        )
      )}

      <div className="mt-4 text-[10px] text-text-tertiary">
        Standing is estimated from your practice performance and shown as a band,
        not an exact score. Actual ASVAB results may differ.
      </div>
    </div>
  );
}
