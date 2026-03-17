"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { SubtestScores, AsvabSubtest, MilitaryJob, Branch } from "@/types";
import { ALL_SUBTESTS, BRANCH_NAMES } from "@/types";
import {
  calculateAFQT,
  getAFQTCategory,
  getAFQTCategoryDescription,
  calculateAllComposites,
} from "@/lib/score-calculator";
import { getQualifyingJobsByBranch } from "@/lib/job-matcher";
import ScoreInput from "./ScoreInput";
import JobResults from "./JobResults";

interface CalculatorProps {
  allJobs: MilitaryJob[];
}

const DEFAULT_SCORES: SubtestScores = {
  GS: 50,
  AR: 50,
  WK: 50,
  PC: 50,
  MK: 50,
  EI: 50,
  AS: 50,
  MC: 50,
  AO: 50,
};

const BRANCH_TAB_ORDER: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

export default function Calculator({ allJobs }: CalculatorProps) {
  const [scores, setScores] = useState<SubtestScores>(DEFAULT_SCORES);
  const [compositeTab, setCompositeTab] = useState<Branch>("army");
  const searchParams = useSearchParams();

  // Load scores from URL params (e.g. from practice test results)
  useEffect(() => {
    const hasScoreParams = ALL_SUBTESTS.some((st) => searchParams.get(st));
    if (!hasScoreParams) return;

    const fromParams: Partial<SubtestScores> = {};
    for (const st of ALL_SUBTESTS) {
      const val = searchParams.get(st);
      if (val) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 20 && num <= 145) {
          fromParams[st] = num;
        }
      }
    }
    if (Object.keys(fromParams).length > 0) {
      setScores((prev) => ({ ...prev, ...fromParams }));
    }
  }, [searchParams]);

  const handleScoreChange = (subtest: AsvabSubtest, value: number) => {
    setScores((prev) => ({ ...prev, [subtest]: value }));
  };

  const afqt = useMemo(() => calculateAFQT(scores), [scores]);
  const afqtCategory = useMemo(() => getAFQTCategory(afqt), [afqt]);
  const afqtDesc = useMemo(
    () => getAFQTCategoryDescription(afqtCategory),
    [afqtCategory]
  );

  const allComposites = useMemo(() => calculateAllComposites(scores), [scores]);

  const jobsByBranch = useMemo(
    () => getQualifyingJobsByBranch(scores, allJobs),
    [scores, allJobs]
  );

  const totalQualifying = useMemo(
    () =>
      Object.values(jobsByBranch).reduce((sum, jobs) => sum + jobs.length, 0),
    [jobsByBranch]
  );

  const activeComposites = useMemo(
    () => allComposites.find((c) => c.branch === compositeTab),
    [allComposites, compositeTab]
  );

  const handleReset = () => setScores(DEFAULT_SCORES);

  return (
    <div className="space-y-8">
      {/* Score Inputs */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Enter Your Scores
          </h2>
          <button
            onClick={handleReset}
            className="text-xs font-medium text-text-tertiary hover:text-text-primary transition-colors"
          >
            Reset All
          </button>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          Enter your 9 ASVAB subtest standard scores (20–145). Results update
          instantly.{" "}
          <span className="text-accent">Highlighted</span> subtests contribute
          to your AFQT score.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_SUBTESTS.map((subtest) => (
            <ScoreInput
              key={subtest}
              subtest={subtest}
              value={scores[subtest]}
              onChange={handleScoreChange}
              highlight={["AR", "WK", "PC", "MK"].includes(subtest)}
            />
          ))}
        </div>
      </section>

      {/* AFQT Score */}
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
          Your AFQT Score
        </h2>
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border-4 border-accent bg-accent-dim">
            <span className="font-mono text-3xl font-bold text-accent">
              {afqt}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-secondary">
                Category
              </span>
              <span className="rounded bg-accent-dim px-2 py-0.5 font-mono text-sm font-bold text-accent">
                {afqtCategory}
              </span>
            </div>
            <p className="mt-1 text-sm text-text-tertiary">{afqtDesc}</p>
            <p className="mt-2 text-xs text-text-tertiary">
              AFQT = 2 &times; (WK + PC) + AR + MK, converted to percentile
            </p>
          </div>
        </div>
      </section>

      {/* Composite Scores */}
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
          Composite / Line Scores
        </h2>

        {/* Branch tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {BRANCH_TAB_ORDER.map((branch) => (
            <button
              key={branch}
              onClick={() => setCompositeTab(branch)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                compositeTab === branch
                  ? "bg-accent text-white"
                  : "bg-navy text-text-secondary hover:text-text-primary"
              }`}
            >
              {BRANCH_NAMES[branch]}
            </button>
          ))}
        </div>

        {/* Composite grid */}
        {activeComposites && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(activeComposites.composites).map(
              ([name, score]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg bg-navy px-4 py-3"
                >
                  <span className="text-sm font-medium text-text-secondary">
                    {name}
                  </span>
                  <span className="font-mono text-lg font-bold text-text-primary">
                    {score}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* Qualifying Jobs */}
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <JobResults jobsByBranch={jobsByBranch} totalJobs={totalQualifying} />
      </section>
    </div>
  );
}
