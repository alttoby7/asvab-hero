"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { MilitaryJob, Branch, SubtestScores } from "@/types";
import { BRANCH_NAMES, SUBTEST_NAMES, type AsvabSubtest } from "@/types";
import { evaluateJobEligibility } from "@/lib/job-matcher";
import { buildScoreGapReport } from "@/lib/score-gap";
import {
  calculateAFQT,
  calculateArmyLineScores,
  calculateAirForceComposites,
  calculateMarineComposites,
  calculateNavyScores,
  calculateCoastGuardScores,
  calculateSpaceForceComposites,
} from "@/lib/score-calculator";

const STORAGE_KEY = "asvabhero.goal_job";

function getCompositesForBranch(
  branch: Branch,
  scores: SubtestScores
) {
  switch (branch) {
    case "army": return calculateArmyLineScores(scores);
    case "air_force": return calculateAirForceComposites(scores);
    case "marines": return calculateMarineComposites(scores);
    case "navy": return calculateNavyScores(scores);
    case "coast_guard": return calculateCoastGuardScores(scores);
    case "space_force": return calculateSpaceForceComposites(scores);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JOB_LOADERS: Record<Branch, () => Promise<any>> = {
  army: () => import("@/data/army-jobs.json"),
  air_force: () => import("@/data/air-force-jobs.json"),
  marines: () => import("@/data/marines-jobs.json"),
  navy: () => import("@/data/navy-jobs.json"),
  coast_guard: () => import("@/data/coast-guard-jobs.json"),
  space_force: () => import("@/data/space-force-jobs.json"),
};

async function loadJobsForBranch(branch: Branch): Promise<MilitaryJob[]> {
  const mod = await JOB_LOADERS[branch]();
  return mod.default as MilitaryJob[];
}

interface SavedGoal {
  branch: Branch;
  jobId: string;
}

interface JobGoalCardProps {
  profileBranch: string | null;
  estimatedScores: SubtestScores | null;
  isPro: boolean;
}

export default function JobGoalCard({
  profileBranch,
  estimatedScores,
  isPro,
}: JobGoalCardProps) {
  const [savedGoal, setSavedGoal] = useState<SavedGoal | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [branch, setBranch] = useState<Branch | null>(null);
  const [jobs, setJobs] = useState<MilitaryJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [picking, setPicking] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedGoal;
        setSavedGoal(parsed);
        setBranch(parsed.branch);
        setSelectedJobId(parsed.jobId);
      } else if (profileBranch && profileBranch !== "undecided") {
        setBranch(profileBranch as Branch);
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, [profileBranch]);

  useEffect(() => {
    if (!branch) return;
    setJobsLoading(true);
    loadJobsForBranch(branch)
      .then((data) => {
        setJobs(data);
        setJobsLoading(false);
      })
      .catch(() => setJobsLoading(false));
  }, [branch]);

  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedJobId) ?? null,
    [jobs, selectedJobId]
  );

  const evaluation = useMemo(() => {
    if (!selectedJob || !estimatedScores || !branch) return null;
    const composites = getCompositesForBranch(branch, estimatedScores);
    const afqt = calculateAFQT(estimatedScores);
    return evaluateJobEligibility(selectedJob, composites, afqt);
  }, [selectedJob, estimatedScores, branch]);

  const gapReport = useMemo(() => {
    if (!evaluation || !branch) return null;
    return buildScoreGapReport(evaluation, branch);
  }, [evaluation, branch]);

  function saveGoal(b: Branch, jobId: string) {
    const goal: SavedGoal = { branch: b, jobId };
    setSavedGoal(goal);
    setBranch(b);
    setSelectedJobId(jobId);
    setPicking(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
    } catch { /* ignore */ }
  }

  function clearGoal() {
    setSavedGoal(null);
    setSelectedJobId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    setPicking(true);
  }

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs.slice(0, 20);
    const q = search.toLowerCase();
    return jobs
      .filter(
        (j) =>
          j.code.toLowerCase().includes(q) ||
          j.title.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [jobs, search]);

  if (!loaded) return null;

  // No goal set — show picker
  if (!savedGoal || picking) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          What job are you working toward?
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Pick a target MOS/AFSC/rating and we&apos;ll show you exactly what
          scores you need and which subtests to drill.
        </p>

        {/* Branch selector */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.entries(BRANCH_NAMES) as [Branch, string][]).map(
            ([b, name]) => (
              <button
                key={b}
                onClick={() => {
                  setBranch(b);
                  setSelectedJobId(null);
                  setSearch("");
                }}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  branch === b
                    ? "border-accent bg-accent-dim text-accent"
                    : "border-navy-border text-text-secondary hover:text-text-primary hover:border-accent/40"
                }`}
              >
                {name}
              </button>
            )
          )}
        </div>

        {/* Job search */}
        {branch && (
          <div className="mt-4">
            <input
              type="text"
              placeholder={`Search ${BRANCH_NAMES[branch]} jobs…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent focus:outline-none"
            />

            {jobsLoading ? (
              <div className="mt-3 text-sm text-text-tertiary">Loading…</div>
            ) : (
              <div className="mt-2 max-h-52 space-y-1 overflow-y-auto">
                {filteredJobs.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => saveGoal(branch, j.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/5"
                  >
                    <span>
                      <span className="font-medium text-text-primary">
                        {j.code}
                      </span>
                      <span className="ml-2 text-text-secondary">
                        {j.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-text-tertiary">
                      {j.category}
                    </span>
                  </button>
                ))}
                {filteredJobs.length === 0 && (
                  <div className="px-3 py-2 text-sm text-text-tertiary">
                    No jobs match &ldquo;{search}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {savedGoal && (
          <button
            onClick={() => setPicking(false)}
            className="mt-3 text-sm text-text-tertiary hover:text-text-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    );
  }

  // Goal set — show status
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Goal Job
          </div>
          <h2 className="mt-1 font-display text-lg font-bold text-text-primary">
            {selectedJob ? (
              <>
                {selectedJob.code}{" "}
                <span className="font-normal text-text-secondary">
                  {selectedJob.title}
                </span>
              </>
            ) : (
              "Loading…"
            )}
          </h2>
        </div>
        <button
          onClick={clearGoal}
          className="shrink-0 text-xs text-text-tertiary hover:text-text-secondary"
        >
          Change
        </button>
      </div>

      {selectedJob && !estimatedScores && (
        <div className="mt-4 rounded-lg border border-navy-border bg-navy px-4 py-3 text-sm text-text-secondary">
          Take a diagnostic to see how close you are to qualifying for{" "}
          {selectedJob.code}.
        </div>
      )}

      {evaluation && estimatedScores && (
        <div className="mt-4 space-y-3">
          {/* Qualification status */}
          {evaluation.qualifies ? (
            <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
              Based on your practice scores, you&apos;re estimated to qualify
              for {selectedJob!.code}. Keep practicing to lock it in.
            </div>
          ) : (
            <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              You&apos;re not quite there yet.{" "}
              {evaluation.failedChecks.length === 1
                ? "1 requirement to close."
                : `${evaluation.failedChecks.length} requirements to close.`}
            </div>
          )}

          {/* Requirements breakdown */}
          <div className="space-y-1.5">
            {evaluation.checks.map((c) => (
              <div
                key={c.composite}
                className="flex items-center justify-between rounded-lg border border-navy-border bg-navy px-3 py-2"
              >
                <span className="text-sm text-text-secondary">
                  {c.composite} ≥ {c.required}
                </span>
                <span
                  className={`text-sm font-semibold ${c.passed ? "text-success" : "text-danger"}`}
                >
                  {c.actual}
                  {c.passed ? (
                    <span className="ml-1 text-xs">✓</span>
                  ) : (
                    <span className="ml-1 text-xs">
                      ({c.delta > 0 ? "+" : ""}
                      {c.delta})
                    </span>
                  )}
                </span>
              </div>
            ))}
            {evaluation.afqtCheck && (
              <div className="flex items-center justify-between rounded-lg border border-navy-border bg-navy px-3 py-2">
                <span className="text-sm text-text-secondary">
                  AFQT ≥ {evaluation.afqtCheck.required}
                </span>
                <span
                  className={`text-sm font-semibold ${evaluation.afqtCheck.passed ? "text-success" : "text-danger"}`}
                >
                  {evaluation.afqtCheck.actual}
                  {evaluation.afqtCheck.passed ? (
                    <span className="ml-1 text-xs">✓</span>
                  ) : (
                    <span className="ml-1 text-xs">
                      ({evaluation.afqtCheck.actual - evaluation.afqtCheck.required})
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Drill recommendation */}
          {gapReport && gapReport.suggestions.length > 0 && (
            <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
              <div className="text-sm font-medium text-text-primary">
                {gapReport.summary}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {gapReport.suggestions.slice(0, 3).map((s) => (
                  <Link
                    key={s.subtest}
                    href={
                      isPro
                        ? `/practice-test?variant=subtest_drill&subtest=${s.subtest}`
                        : "/upgrade?from=job-goal"
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 px-3 py-1.5 text-xs font-medium text-accent no-underline transition-colors hover:bg-accent-dim"
                  >
                    Drill {SUBTEST_NAMES[s.subtest as AsvabSubtest] ?? s.subtest}
                    <span className="text-text-tertiary">
                      (+{s.pointsNeeded} pts)
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="text-[10px] text-text-tertiary">
            Estimates based on practice test performance. Actual ASVAB scores
            may differ.
          </div>
        </div>
      )}
    </div>
  );
}
