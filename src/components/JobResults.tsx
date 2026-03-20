"use client";

import type { Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";
import { useState } from "react";
import type { JobEligibilityResult } from "@/lib/job-matcher";
import ScoreBadge, { checkToBadge, getBadgeStatus } from "./ScoreBadge";
import type { ScoreBadgeData } from "./ScoreBadge";

interface JobResultsProps {
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
  return result.checks.map(checkToBadge);
}

export default function JobResults({
  jobsByBranch,
  totalJobs,
  afqt,
}: JobResultsProps) {
  const [activeBranch, setActiveBranch] = useState<Branch | "all">("all");
  const [search, setSearch] = useState("");

  const filteredJobs =
    activeBranch === "all"
      ? BRANCH_ORDER.flatMap((b) => jobsByBranch[b])
      : jobsByBranch[activeBranch] || [];

  const searchFiltered = search
    ? filteredJobs.filter(
        (r) =>
          r.job.title.toLowerCase().includes(search.toLowerCase()) ||
          r.job.code.toLowerCase().includes(search.toLowerCase()) ||
          r.job.category.toLowerCase().includes(search.toLowerCase())
      )
    : filteredJobs;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-text-primary">
          Qualifying Jobs
        </h3>
        <span className="rounded-full bg-accent-dim px-3 py-1 text-sm font-semibold text-accent">
          {totalJobs} jobs
        </span>
      </div>

      {/* AFQT summary */}
      <p className="mb-4 text-sm text-text-tertiary">
        Your AFQT:{" "}
        <span className="font-mono font-semibold text-text-secondary">
          {afqt}
        </span>{" "}
        — meets requirements for all jobs shown
      </p>

      {/* Branch filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
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
        placeholder="Search jobs by title, code, or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-navy-border bg-navy-light px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
      />

      {/* Results */}
      {searchFiltered.length === 0 ? (
        <div className="rounded-lg border border-navy-border bg-navy-light p-8 text-center">
          <p className="text-text-tertiary">
            {totalJobs === 0
              ? "Adjust your scores to see qualifying jobs."
              : "No jobs match your search."}
          </p>
        </div>
      ) : (
        <>
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
                {searchFiltered.map((result) => {
                  const badges = getBadges(result);
                  return (
                    <tr
                      key={result.job.id}
                      className="border-b border-navy-border last:border-0 hover:bg-navy-light/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-semibold text-accent">
                        {result.job.code}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-text-primary">{result.job.title}</div>
                        {badges.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {badges.map((b) => (
                              <ScoreBadge key={b.label} badge={b} />
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {BRANCH_NAMES[result.job.branch]}
                      </td>
                      <td className="px-4 py-3 text-text-tertiary">
                        {result.job.category}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {searchFiltered.map((result) => {
              const badges = getBadges(result);
              return (
                <div
                  key={result.job.id}
                  className="rounded-lg border border-navy-border bg-navy-light p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-sm font-semibold text-accent">
                        {result.job.code}
                      </span>
                      <span className="ml-2 text-sm text-text-primary">
                        {result.job.title}
                      </span>
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
            })}
          </div>
        </>
      )}
    </div>
  );
}
