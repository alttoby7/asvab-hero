"use client";

import { useState, useMemo } from "react";
import type { Branch, MilitaryJob, AsvabSubtest, SubtestScores } from "@/types";
import { ALL_SUBTESTS, SUBTEST_NAMES, BRANCH_NAMES } from "@/types";
import { calculateAFQT, getAFQTCategory } from "@/lib/score-calculator";
import { useStudyGuide } from "./StudyGuideProvider";
import {
  calculateSubtestPriorities,
  getEffectiveScores,
} from "./study-plan-algorithm";

import armyJobs from "@/data/army-jobs.json";
import airForceJobs from "@/data/air-force-jobs.json";
import marinesJobs from "@/data/marines-jobs.json";
import navyJobs from "@/data/navy-jobs.json";
import coastGuardJobs from "@/data/coast-guard-jobs.json";
import spaceForceJobs from "@/data/space-force-jobs.json";

function addBranch(
  jobs: Record<string, unknown>[],
  branch: Branch
): MilitaryJob[] {
  return jobs.map((j) => ({ ...j, branch }) as MilitaryJob);
}

const ALL_JOBS: Record<Branch, MilitaryJob[]> = {
  army: addBranch(armyJobs, "army"),
  air_force: addBranch(airForceJobs, "air_force"),
  marines: addBranch(marinesJobs, "marines"),
  navy: addBranch(navyJobs, "navy"),
  coast_guard: addBranch(coastGuardJobs, "coast_guard"),
  space_force: addBranch(spaceForceJobs, "space_force"),
};

const BRANCH_ICONS: Record<Branch, string> = {
  army: "USA",
  air_force: "USAF",
  marines: "USMC",
  navy: "USN",
  coast_guard: "USCG",
  space_force: "USSF",
};

const BRANCH_AFQT_MIN: Record<Branch, number> = {
  army: 31,
  navy: 35,
  air_force: 36,
  marines: 32,
  coast_guard: 40,
  space_force: 36,
};

const RATING_LABELS = ["Weak", "Below Avg", "Average", "Above Avg", "Strong"];

export default function CareerGoalSetter() {
  const { state, dispatch } = useStudyGuide();
  const [search, setSearch] = useState("");
  const [showScoreInput, setShowScoreInput] = useState(false);

  const branchJobs = state.selectedBranch
    ? ALL_JOBS[state.selectedBranch]
    : [];

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return branchJobs;
    const q = search.toLowerCase();
    return branchJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.code.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    );
  }, [branchJobs, search]);

  const effectiveScores = useMemo(() => {
    return getEffectiveScores({
      testDate: state.testDate || "",
      hoursPerWeek: state.hoursPerWeek,
      selfRatings: state.selfRatings,
      scores: state.scores,
      scoreInputMode: state.scoreInputMode,
      selectedBranch: state.selectedBranch,
      selectedJobs: state.selectedJobs,
    });
  }, [state]);

  const afqt = useMemo(() => calculateAFQT(effectiveScores), [effectiveScores]);
  const afqtCat = useMemo(() => getAFQTCategory(afqt), [afqt]);

  const priorities = useMemo(() => {
    return calculateSubtestPriorities({
      testDate: state.testDate || "",
      hoursPerWeek: state.hoursPerWeek,
      selfRatings: state.selfRatings,
      scores: state.scores,
      scoreInputMode: state.scoreInputMode,
      selectedBranch: state.selectedBranch,
      selectedJobs: state.selectedJobs,
    });
  }, [state]);

  const handleImportPractice = () => {
    try {
      const raw = localStorage.getItem("practiceTestResults");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.scores) {
          dispatch({ type: "SET_SCORES", scores: data.scores });
          dispatch({ type: "SET_SCORE_MODE", mode: "practice-import" });
        }
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Branch Selection */}
      <div>
        <h3 className="mb-3 font-display text-lg font-bold text-text-primary">
          Pick Your Branch
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {(Object.keys(BRANCH_NAMES) as Branch[]).map((branch) => {
            const selected = state.selectedBranch === branch;
            return (
              <button
                key={branch}
                onClick={() => dispatch({ type: "SET_BRANCH", branch })}
                className={`group relative flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-4 transition-all duration-200 ${
                  selected
                    ? "border-accent bg-accent-dim shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                    : "border-navy-border bg-navy-light hover:border-navy-lighter hover:bg-navy-lighter"
                }`}
              >
                <span
                  className={`font-mono text-xs font-bold tracking-wider ${
                    selected ? "text-accent" : "text-text-tertiary"
                  }`}
                >
                  {BRANCH_ICONS[branch]}
                </span>
                <span
                  className={`text-center text-sm font-semibold ${
                    selected ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {BRANCH_NAMES[branch]}
                </span>
                <span className="text-xs text-text-tertiary">
                  {ALL_JOBS[branch].length} jobs
                </span>
                {selected && (
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Job Selection */}
      {state.selectedBranch && (
        <div
          className="space-y-3"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-text-primary">
              Choose Your Dream Jobs
              <span className="ml-2 text-sm font-normal text-text-tertiary">
                (up to 3)
              </span>
            </h3>
            {state.selectedJobs.length > 0 && (
              <span className="rounded-full bg-accent-dim px-3 py-1 text-xs font-semibold text-accent">
                {state.selectedJobs.length}/3 selected
              </span>
            )}
          </div>

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${BRANCH_NAMES[state.selectedBranch]} jobs...`}
              className="w-full rounded-lg border border-navy-border bg-navy-light py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
            />
          </div>

          {/* Selected jobs chips */}
          {state.selectedJobs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {state.selectedJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() =>
                    dispatch({ type: "REMOVE_JOB", jobId: job.id })
                  }
                  className="group flex items-center gap-1.5 rounded-full border border-accent bg-accent-dim px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  <span>{job.code}</span>
                  <span className="text-text-secondary group-hover:text-white/70">
                    {job.title}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className="ml-0.5 opacity-60"
                  >
                    <path
                      d="M3 3l6 6M9 3l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Job list */}
          <div className="max-h-64 space-y-1 overflow-y-auto rounded-xl border border-navy-border bg-navy p-2">
            {filteredJobs.map((job) => {
              const isSelected = state.selectedJobs.some(
                (j) => j.id === job.id
              );
              const atLimit =
                state.selectedJobs.length >= 3 && !isSelected;
              return (
                <button
                  key={job.id}
                  disabled={atLimit}
                  onClick={() =>
                    isSelected
                      ? dispatch({ type: "REMOVE_JOB", jobId: job.id })
                      : dispatch({ type: "ADD_JOB", job })
                  }
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    isSelected
                      ? "bg-accent-dim"
                      : atLimit
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-navy-light"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected
                        ? "border-accent bg-accent"
                        : "border-navy-border"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-accent">
                        {job.code}
                      </span>
                      <span className="truncate text-sm text-text-primary">
                        {job.title}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-navy-lighter px-2 py-0.5 text-[10px] text-text-tertiary">
                    {job.category}
                  </span>
                  {job.minAFQT && (
                    <span className="shrink-0 font-mono text-xs text-text-tertiary">
                      AFQT {job.minAFQT}+
                    </span>
                  )}
                </button>
              );
            })}
            {filteredJobs.length === 0 && (
              <p className="py-4 text-center text-sm text-text-tertiary">
                No jobs match your search
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Score Input + Gap Analysis */}
      {state.selectedJobs.length > 0 && (
        <div
          className="space-y-4"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-text-primary">
              Rate Your Skills
            </h3>
            <button
              onClick={() => setShowScoreInput(!showScoreInput)}
              className="text-xs text-accent hover:text-accent-hover transition-colors"
            >
              {showScoreInput ? "Hide" : "Show"} score input options
            </button>
          </div>

          {/* Score input mode tabs */}
          {showScoreInput && (
            <div className="rounded-xl border border-navy-border bg-navy-light p-4">
              <div className="mb-4 flex rounded-lg border border-navy-border bg-navy p-1">
                {(
                  [
                    { mode: "self-rate" as const, label: "Rate Yourself" },
                    { mode: "practice-import" as const, label: "Import Test" },
                    { mode: "actual-scores" as const, label: "Enter Scores" },
                  ] as const
                ).map(({ mode, label }) => (
                  <button
                    key={mode}
                    onClick={() =>
                      dispatch({ type: "SET_SCORE_MODE", mode })
                    }
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                      state.scoreInputMode === mode
                        ? "bg-accent text-white"
                        : "text-text-tertiary hover:text-text-secondary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {state.scoreInputMode === "practice-import" && (
                <div className="text-center">
                  <button
                    onClick={handleImportPractice}
                    className="rounded-lg bg-accent-dim px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    Import from Practice Test
                  </button>
                  <p className="mt-2 text-xs text-text-tertiary">
                    Loads your most recent practice test results
                  </p>
                </div>
              )}

              {state.scoreInputMode === "actual-scores" && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
                  {ALL_SUBTESTS.map((st) => (
                    <div key={st} className="text-center">
                      <label className="mb-1 block text-[10px] font-bold text-text-tertiary">
                        {st}
                      </label>
                      <input
                        type="number"
                        min={20}
                        max={145}
                        value={state.scores[st] ?? 40}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SCORE",
                            subtest: st,
                            value: Math.max(
                              20,
                              Math.min(145, Number(e.target.value) || 20)
                            ),
                          })
                        }
                        className="w-full rounded border border-navy-border bg-navy px-2 py-1.5 text-center font-mono text-sm text-text-primary outline-none focus:border-accent"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Self-rating grid (always visible) */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_SUBTESTS.map((st) => {
              const isAFQT = ["AR", "WK", "PC", "MK"].includes(st);
              const isVE = ["WK", "PC"].includes(st);
              return (
                <div
                  key={st}
                  className={`rounded-lg border px-3 py-2.5 transition-colors ${
                    isAFQT
                      ? "border-accent/30 bg-accent-dim/50"
                      : "border-navy-border bg-navy-light"
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent">
                      {st}
                    </span>
                    <span className="flex-1 text-[11px] leading-tight text-text-secondary">
                      {SUBTEST_NAMES[st]}
                    </span>
                    {isAFQT && (
                      <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                        AFQT
                      </span>
                    )}
                    {isVE && (
                      <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                        2x
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() =>
                          dispatch({
                            type: "SET_RATING",
                            subtest: st,
                            value: v,
                          })
                        }
                        className={`flex-1 rounded py-1 text-[10px] font-semibold transition-all ${
                          state.selfRatings[st] === v
                            ? "bg-accent text-white shadow-sm"
                            : state.selfRatings[st] > v
                              ? "bg-accent/20 text-accent"
                              : "bg-navy text-text-tertiary hover:bg-navy-lighter"
                        }`}
                        title={RATING_LABELS[v - 1]}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AFQT Estimate */}
          <div className="flex items-center gap-4 rounded-xl border border-navy-border bg-navy-light px-4 py-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent-dim">
              <span className="font-display text-xl font-bold text-accent">
                {afqt}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Estimated AFQT: Category {afqtCat}
              </p>
              <p className="text-xs text-text-tertiary">
                {state.selectedBranch &&
                  (afqt >= BRANCH_AFQT_MIN[state.selectedBranch]
                    ? `Meets ${BRANCH_NAMES[state.selectedBranch]} minimum (${BRANCH_AFQT_MIN[state.selectedBranch]})`
                    : `Below ${BRANCH_NAMES[state.selectedBranch]} minimum (need ${BRANCH_AFQT_MIN[state.selectedBranch]})`)}
              </p>
            </div>
          </div>

          {/* Study Priority Ranking */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Your Study Priorities
            </h4>
            <div className="space-y-1.5">
              {priorities.map((p, i) => {
                const isAFQT = ["AR", "WK", "PC", "MK"].includes(p.subtest);
                const isVE = ["WK", "PC"].includes(p.subtest);
                return (
                  <div key={p.subtest} className="flex items-center gap-3">
                    <span className="w-5 text-right font-mono text-xs text-text-tertiary">
                      {i + 1}
                    </span>
                    <span className="w-8 font-mono text-xs font-bold text-accent">
                      {p.subtest}
                    </span>
                    <div className="relative flex-1 h-6 rounded-md bg-navy overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-md transition-all duration-500"
                        style={{
                          width: `${Math.max(p.total * 100, 4)}%`,
                          background:
                            p.total > 0.7
                              ? "linear-gradient(90deg, #f97316, #fb923c)"
                              : p.total > 0.4
                                ? "linear-gradient(90deg, #f97316aa, #fb923caa)"
                                : "linear-gradient(90deg, #243350, #1a2942)",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-[10px] font-semibold text-text-primary drop-shadow-sm">
                          {SUBTEST_NAMES[p.subtest]}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {isAFQT && (
                        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                          AFQT
                        </span>
                      )}
                      {isVE && (
                        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                          2x
                        </span>
                      )}
                    </div>
                    <span className="w-10 text-right font-mono text-xs text-text-tertiary">
                      {Math.round(p.total * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
