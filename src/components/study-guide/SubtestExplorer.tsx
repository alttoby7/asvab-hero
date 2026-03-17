"use client";

import { useState, useMemo } from "react";
import type { AsvabSubtest } from "@/types";
import { ALL_SUBTESTS, SUBTEST_NAMES } from "@/types";
import { SUBTEST_METADATA, COMPOSITE_FORMULAS } from "@/data/subtest-metadata";
import { useStudyGuide } from "./StudyGuideProvider";
import { calculateSubtestPriorities } from "./study-plan-algorithm";

export default function SubtestExplorer() {
  const [expanded, setExpanded] = useState<AsvabSubtest | null>(null);
  const { state } = useStudyGuide();

  const priorities = useMemo(() => {
    if (!state.selectedBranch || state.selectedJobs.length === 0) return null;
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

  // Only top 4 subtests get the "Priority" badge
  const topPrioritySubtests = useMemo(() => {
    if (!priorities) return new Set<AsvabSubtest>();
    return new Set(priorities.slice(0, 4).map((p) => p.subtest));
  }, [priorities]);

  const getPriority = (st: AsvabSubtest): number | null => {
    if (!priorities) return null;
    const found = priorities.find((p) => p.subtest === st);
    return found ? found.total : null;
  };

  const getCompositeCount = (st: AsvabSubtest): number => {
    return Object.values(COMPOSITE_FORMULAS).filter((subs) =>
      subs.includes(st)
    ).length;
  };

  const getCompositesUsing = (st: AsvabSubtest): string[] => {
    return Object.entries(COMPOSITE_FORMULAS)
      .filter(([, subs]) => subs.includes(st))
      .map(([name]) => name.replace(/_army|_marines/, ""));
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SUBTEST_METADATA.map((meta) => {
        const isOpen = expanded === meta.subtest;
        const priority = getPriority(meta.subtest);
        const isCritical = topPrioritySubtests.has(meta.subtest);
        const compositeCount = getCompositeCount(meta.subtest);

        return (
          <button
            key={meta.subtest}
            onClick={() =>
              setExpanded(isOpen ? null : meta.subtest)
            }
            className={`group relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
              isOpen
                ? "col-span-1 sm:col-span-2 lg:col-span-3 border-accent/40 bg-navy-light"
                : isCritical
                  ? "border-accent/30 bg-navy-light hover:border-accent/50"
                  : "border-navy-border bg-navy-light hover:border-navy-lighter hover:bg-navy-lighter"
            }`}
          >
            {/* Collapsed view */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-lg font-bold transition-colors ${
                    isCritical
                      ? "bg-accent text-white"
                      : meta.isAFQT
                        ? "bg-accent-dim text-accent"
                        : "bg-navy-lighter text-text-secondary"
                  }`}
                >
                  {meta.subtest}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {meta.fullName}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {meta.questionCount} questions &middot; {meta.timeMinutes}{" "}
                    min
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                {meta.isAFQT && (
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
                    AFQT
                  </span>
                )}
                {meta.veDoubled && (
                  <span className="rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-bold text-accent">
                    2x VE
                  </span>
                )}
                {isCritical && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                    Priority
                  </span>
                )}
              </div>
            </div>

            {/* Priority bar */}
            {priority !== null && (
              <div className="mt-2 h-1 rounded-full bg-navy overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${priority * 100}%` }}
                />
              </div>
            )}

            {/* Expanded view */}
            {isOpen && (
              <div
                className="mt-4 space-y-4 border-t border-navy-border pt-4"
                style={{ animation: "fadeIn 0.2s ease-out" }}
              >
                <p className="text-sm leading-relaxed text-text-secondary">
                  {meta.description}
                </p>

                {/* What to Study */}
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">
                    What to Study
                  </h4>
                  <div className="grid gap-1 sm:grid-cols-2">
                    {meta.sampleTopics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-md bg-navy px-2.5 py-1.5"
                      >
                        <span className="mt-0.5 text-accent text-xs">
                          &#9679;
                        </span>
                        <span className="text-xs text-text-secondary">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composites */}
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">
                    Feeds {compositeCount} Composites
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {getCompositesUsing(meta.subtest).map((name) => (
                      <span
                        key={name}
                        className="rounded-md border border-navy-border bg-navy px-2 py-1 font-mono text-[10px] text-text-tertiary"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Topic summary */}
                <p className="text-xs text-text-tertiary italic">
                  {meta.topicSummary}
                </p>
              </div>
            )}

            {/* Expand indicator */}
            <div className="mt-2 flex justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={`text-text-tertiary transition-transform duration-200 ${
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
            </div>
          </button>
        );
      })}
    </div>
  );
}
