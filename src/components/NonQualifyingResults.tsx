"use client";

import type { Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";
import { useState, useMemo } from "react";
import type { JobEligibilityResult } from "@/lib/job-matcher";
import ScoreBadge, { checkToBadge, getBadgeStatus } from "./ScoreBadge";
import type { ScoreBadgeData } from "./ScoreBadge";

interface NonQualifyingResultsProps {
  jobsByBranch: Record<Branch, JobEligibilityResult[]>;
  totalJobs: number;
  afqt: number;
}

const BRANCH_ORDER: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

const CLOSE_MISS_THRESHOLD = 10;
const INITIAL_SHOW_COUNT = 50;
const SHOW_MORE_INCREMENT = 50;

function getBadges(result: JobEligibilityResult): ScoreBadgeData[] {
  if (result.checks.length === 0 && result.afqtCheck) {
    const delta = result.afqtCheck.actual - result.afqtCheck.required;
    return [
      {
        label: "AFQT",
        actual: result.afqtCheck.actual,
        required: result.afqtCheck.required,
        status: getBadgeStatus(delta),
      },
    ];
  }

  const badges = result.checks.map(checkToBadge);

  // Also add AFQT badge if it failed
  if (result.afqtCheck && !result.afqtCheck.passed) {
    const delta = result.afqtCheck.actual - result.afqtCheck.required;
    badges.unshift({
      label: "AFQT",
      actual: result.afqtCheck.actual,
      required: result.afqtCheck.required,
      status: getBadgeStatus(delta),
    });
  }

  return badges;
}

function getMaxDeficit(result: JobEligibilityResult): number {
  let max = 0;
  for (const c of result.failedChecks) {
    max = Math.max(max, -c.delta);
  }
  if (result.afqtCheck && !result.afqtCheck.passed) {
    max = Math.max(max, result.afqtCheck.required - result.afqtCheck.actual);
  }
  return max;
}

function JobRow({ result }: { result: JobEligibilityResult }) {
  const badges = getBadges(result);
  return (
    <tr className="border-b border-navy-border last:border-0 hover:bg-navy-light/50 transition-colors">
      <td className="px-4 py-3 font-mono font-semibold text-text-tertiary">
        {result.job.code}
      </td>
      <td className="px-4 py-3">
        <div className="text-text-primary/80">{result.job.title}</div>
        {badges.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {badges.map((b) => (
              <ScoreBadge key={b.label} badge={b} />
            ))}
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-text-secondary">{BRANCH_NAMES[result.job.branch]}</td>
      <td className="px-4 py-3 text-text-tertiary">{result.job.category}</td>
    </tr>
  );
}

function JobCard({ result }: { result: JobEligibilityResult }) {
  const badges = getBadges(result);
  return (
    <div className="rounded-lg border border-navy-border/60 bg-navy-light p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono text-sm font-semibold text-text-tertiary">
            {result.job.code}
          </span>
          <span className="ml-2 text-sm text-text-primary/80">{result.job.title}</span>
        </div>
      </div>
      <div className="mt-1.5 flex gap-3 text-xs text-text-tertiary">
        <span>{BRANCH_NAMES[result.job.branch]}</span>
        <span>&middot;</span>
        <span>{result.job.category}</span>
      </div>
      {badges.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {badges.map((b) => (
            <ScoreBadge key={b.label} badge={b} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NonQualifyingResults({
  jobsByBranch,
  totalJobs,
  afqt,
}: NonQualifyingResultsProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeBranch, setActiveBranch] = useState<Branch | "all">("all");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(INITIAL_SHOW_COUNT);

  // Split into close misses and the rest
  const { closeMisses, remaining } = useMemo(() => {
    const allResults =
      activeBranch === "all"
        ? BRANCH_ORDER.flatMap((b) => jobsByBranch[b])
        : jobsByBranch[activeBranch] || [];

    const filtered = search
      ? allResults.filter(
          (r) =>
            r.job.title.toLowerCase().includes(search.toLowerCase()) ||
            r.job.code.toLowerCase().includes(search.toLowerCase()) ||
            r.job.category.toLowerCase().includes(search.toLowerCase())
        )
      : allResults;

    const close: JobEligibilityResult[] = [];
    const rest: JobEligibilityResult[] = [];
    for (const r of filtered) {
      if (getMaxDeficit(r) <= CLOSE_MISS_THRESHOLD) {
        close.push(r);
      } else {
        rest.push(r);
      }
    }
    return { closeMisses: close, remaining: rest };
  }, [jobsByBranch, activeBranch, search]);

  if (totalJobs === 0) return null;

  const remainingVisible = remaining.slice(0, showCount);
  const hasMore = remaining.length > showCount;

  return (
    <div className="space-y-4">
      {/* Close Misses — always visible */}
      {closeMisses.length > 0 && (
        <div className="border-l-2 border-almost pl-4">
          <div className="mb-3">
            <h3 className="font-display text-base font-bold text-almost">
              Almost There — {closeMisses.length} {closeMisses.length === 1 ? "job" : "jobs"} within reach
            </h3>
            <p className="text-sm text-text-tertiary">
              You&apos;re within {CLOSE_MISS_THRESHOLD} points of qualifying for these jobs
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-navy-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-border bg-navy-light">
                  <th className="px-4 py-3 font-semibold text-text-secondary">Code</th>
                  <th className="px-4 py-3 font-semibold text-text-secondary">Title</th>
                  <th className="px-4 py-3 font-semibold text-text-secondary">Branch</th>
                  <th className="px-4 py-3 font-semibold text-text-secondary">Category</th>
                </tr>
              </thead>
              <tbody>
                {closeMisses.map((r) => (
                  <JobRow key={r.job.id} result={r} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {closeMisses.map((r) => (
              <JobCard key={r.job.id} result={r} />
            ))}
          </div>
        </div>
      )}

      {/* Remaining non-qualifying — collapsed by default */}
      {remaining.length > 0 && (
        <div>
          <button
            onClick={() => {
              setExpanded(!expanded);
              if (!expanded) setShowCount(INITIAL_SHOW_COUNT);
            }}
            className="w-full rounded-lg border border-navy-border bg-navy-light px-4 py-3 text-left text-sm transition-colors hover:bg-navy-lighter"
          >
            <span className="text-text-tertiary">
              <span
                className="inline-block transition-transform duration-200 mr-2"
                style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                &#9656;
              </span>
              Show{" "}
              <span className="font-semibold text-text-secondary">
                {remaining.length}
              </span>{" "}
              more {remaining.length === 1 ? "job" : "jobs"} you don&apos;t yet qualify for
            </span>
          </button>

          {expanded && (
            <div className="mt-4 space-y-4">
              {/* Branch filter tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveBranch("all")}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeBranch === "all"
                      ? "bg-accent text-white"
                      : "bg-navy-light text-text-secondary hover:text-text-primary"
                  }`}
                >
                  All ({totalJobs})
                </button>
                {BRANCH_ORDER.map((branch) => {
                  const count = jobsByBranch[branch]?.length || 0;
                  return (
                    <button
                      key={branch}
                      onClick={() => setActiveBranch(branch)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        activeBranch === branch
                          ? "bg-accent text-white"
                          : "bg-navy-light text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {BRANCH_NAMES[branch]} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search non-qualifying jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-navy-border bg-navy-light px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
              />

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto rounded-lg border border-navy-border">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy-border bg-navy-light">
                      <th className="px-4 py-3 font-semibold text-text-secondary">Code</th>
                      <th className="px-4 py-3 font-semibold text-text-secondary">Title</th>
                      <th className="px-4 py-3 font-semibold text-text-secondary">Branch</th>
                      <th className="px-4 py-3 font-semibold text-text-secondary">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remainingVisible.map((r) => (
                      <JobRow key={r.job.id} result={r} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="flex flex-col gap-2 md:hidden">
                {remainingVisible.map((r) => (
                  <JobCard key={r.job.id} result={r} />
                ))}
              </div>

              {/* Show more */}
              {hasMore && (
                <button
                  onClick={() => setShowCount((c) => c + SHOW_MORE_INCREMENT)}
                  className="w-full rounded-lg border border-navy-border bg-navy-light px-4 py-2.5 text-sm text-text-tertiary transition-colors hover:bg-navy-lighter hover:text-text-secondary"
                >
                  Show {Math.min(SHOW_MORE_INCREMENT, remaining.length - showCount)} more...
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
