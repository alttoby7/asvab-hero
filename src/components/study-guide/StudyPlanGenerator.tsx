"use client";

import { useState, useMemo } from "react";
import type { AsvabSubtest } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import { useStudyGuide } from "./StudyGuideProvider";
import EmailCapture from "../EmailCapture";
import { trackEvent } from "@/lib/analytics";
import {
  generateStudyPlan,
  planToText,
  type WeekPlan,
  type StudyPlanInput,
} from "./study-plan-algorithm";

const SUBTEST_COLORS: Record<AsvabSubtest, string> = {
  GS: "#6366f1",
  AR: "#f97316",
  WK: "#22c55e",
  PC: "#06b6d4",
  MK: "#eab308",
  EI: "#8b5cf6",
  AS: "#ec4899",
  MC: "#14b8a6",
  AO: "#f43f5e",
};

const PHASE_STYLES: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  Learning: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    label: "Learning Phase",
  },
  Practice: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    label: "Practice Phase",
  },
  Review: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    label: "Review Phase",
  },
};

export default function StudyPlanGenerator() {
  const { state, dispatch } = useStudyGuide();
  const [plan, setPlan] = useState<WeekPlan[] | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const planInput: StudyPlanInput = useMemo(
    () => ({
      testDate: state.testDate || "",
      hoursPerWeek: state.hoursPerWeek,
      selfRatings: state.selfRatings,
      scores: state.scores,
      scoreInputMode: state.scoreInputMode,
      selectedBranch: state.selectedBranch,
      selectedJobs: state.selectedJobs,
    }),
    [state]
  );

  const weeksUntilTest = useMemo(() => {
    if (!state.testDate) return null;
    const now = new Date();
    const test = new Date(state.testDate);
    return Math.max(
      1,
      Math.ceil((test.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000))
    );
  }, [state.testDate]);

  const handleGenerate = () => {
    const result = generateStudyPlan(planInput);
    setPlan(result);
    setExpandedWeek(0);
    trackEvent("study_plan_generated", {
      weeks: result.length,
      hours_per_week: state.hoursPerWeek,
      branch: state.selectedBranch || "unspecified",
    });
    try {
      localStorage.setItem("asvab-study-plan", JSON.stringify(result));
    } catch {}
  };

  const handleDownload = () => {
    if (!plan) return;
    const text = planToText(plan, planInput);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "asvab-study-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (iso: string): string => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 12);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Test Date */}
        <div className="rounded-xl border border-navy-border bg-navy-light p-4">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-text-secondary">
            Test Date
          </label>
          <input
            type="date"
            min={getTodayStr()}
            max={getMaxDate()}
            value={state.testDate || ""}
            onChange={(e) =>
              dispatch({ type: "SET_TEST_DATE", date: e.target.value || null })
            }
            className="w-full rounded-lg border border-navy-border bg-navy px-3 py-2.5 font-mono text-sm text-text-primary outline-none transition-colors focus:border-accent [color-scheme:dark]"
          />
          {weeksUntilTest && (
            <p className="mt-2 text-xs text-text-tertiary">
              {weeksUntilTest} week{weeksUntilTest !== 1 ? "s" : ""} away
            </p>
          )}
        </div>

        {/* Hours per week */}
        <div className="rounded-xl border border-navy-border bg-navy-light p-4">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-text-secondary">
            Hours per Week
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={3}
              max={15}
              step={0.5}
              value={state.hoursPerWeek}
              onChange={(e) =>
                dispatch({ type: "SET_HOURS", hours: Number(e.target.value) })
              }
              className="flex-1 accent-accent"
            />
            <span className="w-12 rounded-lg border border-navy-border bg-navy px-2 py-1.5 text-center font-mono text-sm font-bold text-accent">
              {state.hoursPerWeek}h
            </span>
          </div>
          <p className="mt-2 text-xs text-text-tertiary">
            {state.hoursPerWeek <= 5
              ? "Light schedule — we'll focus on highest-impact areas"
              : state.hoursPerWeek <= 10
                ? "Solid commitment — good coverage across all subtests"
                : "Intensive prep — full coverage with plenty of practice"}
          </p>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!state.testDate}
        className={`w-full rounded-xl py-3.5 font-display text-base font-bold transition-all ${
          state.testDate
            ? "bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-hover hover:shadow-accent/30 active:scale-[0.99]"
            : "cursor-not-allowed bg-navy-lighter text-text-tertiary"
        }`}
      >
        {state.testDate ? "Generate My Study Plan" : "Select a test date to continue"}
      </button>

      {/* Plan Output */}
      {plan && plan.length > 0 && (
        <div className="space-y-4" style={{ animation: "fadeIn 0.3s ease-out" }}>
          <EmailCapture
            headline="Email me this study plan"
            subhead="Get this plan plus a 5-email crash course covering AFQT strategy, line scores, and retest tactics."
            cta="Email my plan"
            tag="asvab-study-plan"
          />
          {/* Summary Bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-navy-border bg-navy-light px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-semibold text-text-primary">
                {plan.length} weeks
              </span>
            </div>
            <span className="text-text-tertiary">|</span>
            <span className="text-sm text-text-secondary">
              {state.hoursPerWeek}h/week
            </span>
            <span className="text-text-tertiary">|</span>
            <span className="text-sm text-text-secondary">
              {Math.round(plan.length * state.hoursPerWeek)} total hours
            </span>
            <div className="ml-auto flex gap-2">
              <button
                onClick={handleDownload}
                className="rounded-lg border border-navy-border bg-navy px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                Download Plan
              </button>
            </div>
          </div>

          {/* Phase Overview */}
          <div className="flex gap-1 rounded-lg overflow-hidden">
            {plan.map((week) => {
              const style = PHASE_STYLES[week.phase];
              return (
                <div
                  key={week.weekNumber}
                  className={`flex-1 h-2 ${
                    week.phase === "Learning"
                      ? "bg-blue-500"
                      : week.phase === "Practice"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  title={`Week ${week.weekNumber}: ${week.phase}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-text-tertiary">
            <span>Week 1</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Learning
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Practice
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Review
              </span>
            </div>
            <span>Week {plan.length}</span>
          </div>

          {/* Week Cards */}
          <div className="space-y-2">
            {plan.map((week, i) => {
              const isExpanded = expandedWeek === i;
              const style = PHASE_STYLES[week.phase];
              const totalAllocHours = week.allocations.reduce(
                (s, a) => s + a.hours,
                0
              );

              return (
                <div
                  key={week.weekNumber}
                  className={`rounded-xl border transition-all duration-200 ${
                    isExpanded
                      ? `${style.border} bg-navy-light`
                      : "border-navy-border bg-navy-light hover:bg-navy-lighter"
                  }`}
                >
                  <button
                    onClick={() => setExpandedWeek(isExpanded ? null : i)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy font-mono text-xs font-bold text-text-secondary">
                      {week.weekNumber}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text-primary">
                          Week {week.weekNumber}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${style.bg} ${style.text}`}
                        >
                          {week.phase}
                        </span>
                      </div>
                      <span className="text-xs text-text-tertiary">
                        {formatDate(week.startDate)}
                      </span>
                    </div>

                    {/* Mini stacked bar */}
                    <div className="hidden sm:flex h-4 w-32 shrink-0 overflow-hidden rounded-full bg-navy">
                      {week.allocations.map((alloc, j) => (
                        <div
                          key={`${alloc.subtest}-${j}`}
                          style={{
                            width: `${(alloc.hours / (totalAllocHours || 1)) * 100}%`,
                            backgroundColor:
                              SUBTEST_COLORS[alloc.subtest],
                          }}
                          title={`${alloc.subtest}: ${alloc.hours}h`}
                        />
                      ))}
                    </div>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className={`shrink-0 text-text-tertiary transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div
                      className="space-y-3 border-t border-navy-border px-4 pb-4 pt-3"
                      style={{ animation: "fadeIn 0.2s ease-out" }}
                    >
                      {/* Full stacked bar */}
                      <div className="h-6 flex overflow-hidden rounded-lg bg-navy">
                        {week.allocations.map((alloc, j) => (
                          <div
                            key={`${alloc.subtest}-${j}`}
                            className="flex items-center justify-center overflow-hidden"
                            style={{
                              width: `${(alloc.hours / (totalAllocHours || 1)) * 100}%`,
                              backgroundColor:
                                SUBTEST_COLORS[alloc.subtest],
                              minWidth: alloc.hours > 0 ? "24px" : 0,
                            }}
                          >
                            <span className="text-[9px] font-bold text-white drop-shadow-sm">
                              {alloc.subtest}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Allocation list */}
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {week.allocations.map((alloc) => (
                          <div
                            key={alloc.subtest}
                            className="flex items-center gap-2 rounded-lg bg-navy px-3 py-2"
                          >
                            <span
                              className="h-3 w-3 shrink-0 rounded"
                              style={{
                                backgroundColor:
                                  SUBTEST_COLORS[alloc.subtest],
                              }}
                            />
                            <span className="flex-1 text-xs text-text-secondary">
                              {SUBTEST_NAMES[alloc.subtest]}
                            </span>
                            <span className="font-mono text-xs font-bold text-text-primary">
                              {alloc.hours}h
                            </span>
                            <span className="text-[10px] text-text-tertiary">
                              ({alloc.blocks}&times;30m)
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Explanation */}
                      <p className="text-xs leading-relaxed text-text-secondary">
                        {week.explanation}
                      </p>

                      {/* Milestone */}
                      <div className="flex items-start gap-2 rounded-lg border border-navy-border bg-navy px-3 py-2">
                        <span className="mt-0.5 text-accent">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                          </svg>
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                            Milestone
                          </span>
                          <p className="text-xs text-text-secondary">
                            {week.milestone}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
