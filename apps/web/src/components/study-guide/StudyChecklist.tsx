"use client";

import { useState, useMemo } from "react";
import type { AsvabSubtest } from "@/types";
import { ALL_SUBTESTS, SUBTEST_NAMES } from "@/types";
import { STUDY_TOPICS, getTopicsForSubtest } from "@/data/study-topics";
import { SUBTEST_METADATA } from "@/data/subtest-metadata";
import { useStudyGuide } from "./StudyGuideProvider";
import { calculateSubtestPriorities } from "./study-plan-algorithm";

export default function StudyChecklist() {
  const [expanded, setExpanded] = useState<AsvabSubtest | null>(null);
  const { state, dispatch } = useStudyGuide();

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

  const totalTopics = STUDY_TOPICS.length;
  const completedCount = Object.values(state.completedTopics).filter(Boolean).length;
  const overallPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const getSubtestCompletion = (st: AsvabSubtest) => {
    const topics = getTopicsForSubtest(st);
    const done = topics.filter((t) => state.completedTopics[t.id]).length;
    return { done, total: topics.length, pct: topics.length > 0 ? Math.round((done / topics.length) * 100) : 0 };
  };

  const getPriority = (st: AsvabSubtest): number => {
    const found = priorities.find((p) => p.subtest === st);
    return found ? found.total : 0;
  };

  // Only top 4 subtests get the "Priority" badge
  const topPrioritySubtests = useMemo(() => {
    if (!state.selectedBranch || state.selectedJobs.length === 0) return new Set<AsvabSubtest>();
    return new Set(priorities.slice(0, 4).map((p) => p.subtest));
  }, [priorities, state.selectedBranch, state.selectedJobs]);

  // Sort subtests by priority (highest first) if goals are set
  const sortedSubtests = useMemo(() => {
    if (!state.selectedBranch || state.selectedJobs.length === 0) {
      return ALL_SUBTESTS;
    }
    return [...ALL_SUBTESTS].sort(
      (a, b) => getPriority(b) - getPriority(a)
    );
  }, [priorities, state.selectedBranch, state.selectedJobs]);

  // SVG completion ring
  const ringSize = 72;
  const strokeWidth = 5;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - overallPct / 100);

  return (
    <div className="space-y-4">
      {/* Overall progress */}
      <div className="flex items-center gap-4 rounded-xl border border-navy-border bg-navy-light px-4 py-3">
        <div className="relative shrink-0" style={{ width: ringSize, height: ringSize }}>
          <svg width={ringSize} height={ringSize} className="-rotate-90">
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke="#243350"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke={overallPct >= 80 ? "#22c55e" : overallPct >= 40 ? "#f97316" : "#64748b"}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-lg font-bold text-text-primary">
              {overallPct}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Study Progress
          </p>
          <p className="text-xs text-text-tertiary">
            {completedCount} of {totalTopics} topics completed
          </p>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-1.5">
        {sortedSubtests.map((st) => {
          const isOpen = expanded === st;
          const topics = getTopicsForSubtest(st);
          const { done, total, pct } = getSubtestCompletion(st);
          const meta = SUBTEST_METADATA.find((m) => m.subtest === st);
          const priority = getPriority(st);
          const isHighPriority = topPrioritySubtests.has(st);

          return (
            <div
              key={st}
              className={`rounded-xl border overflow-hidden transition-colors ${
                isOpen
                  ? "border-accent/30 bg-navy-light"
                  : "border-navy-border bg-navy-light"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setExpanded(isOpen ? null : st)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-navy-lighter"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                    isHighPriority
                      ? "bg-accent text-white"
                      : meta?.isAFQT
                        ? "bg-accent-dim text-accent"
                        : "bg-navy-lighter text-text-secondary"
                  }`}
                >
                  {st}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text-primary">
                      {SUBTEST_NAMES[st]}
                    </span>
                    {isHighPriority && (
                      <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                        Priority
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-navy overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${pct}%`,
                          backgroundColor:
                            pct >= 80
                              ? "#22c55e"
                              : pct >= 40
                                ? "#f97316"
                                : "#64748b",
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-text-tertiary w-10 text-right">
                      {done}/{total}
                    </span>
                  </div>
                </div>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className={`shrink-0 text-text-tertiary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
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

              {/* Topics */}
              {isOpen && (
                <div
                  className="border-t border-navy-border px-4 pb-3 pt-2"
                  style={{ animation: "fadeIn 0.2s ease-out" }}
                >
                  <div className="space-y-1">
                    {topics.map((topic) => {
                      const checked = !!state.completedTopics[topic.id];
                      return (
                        <label
                          key={topic.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-navy-lighter ${
                            checked ? "opacity-60" : ""
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-all ${
                              checked
                                ? "border-success bg-success"
                                : "border-navy-border hover:border-accent"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({
                                type: "TOGGLE_TOPIC",
                                topicId: topic.id,
                              });
                            }}
                          >
                            {checked && (
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
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium transition-all ${
                                checked
                                  ? "line-through text-text-tertiary"
                                  : "text-text-primary"
                              }`}
                            >
                              {topic.title}
                            </p>
                            <p className="text-xs text-text-tertiary">
                              {topic.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
