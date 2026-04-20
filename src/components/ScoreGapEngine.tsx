"use client";

import { useMemo } from "react";
import type { Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";
import type { JobEligibilityResult, JobMatchSnapshot } from "@/lib/job-matcher";
import { buildScoreGapReport } from "@/lib/score-gap";
import type { SubtestSuggestion } from "@/lib/score-gap";

interface ScoreGapEngineProps {
  snapshot: JobMatchSnapshot;
}

const BRANCH_ORDER: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

interface GapCandidate {
  result: JobEligibilityResult;
  branch: Branch;
}

function pickTopCloseMisses(
  snapshot: JobMatchSnapshot,
  limit: number
): GapCandidate[] {
  const all: GapCandidate[] = [];
  for (const branch of BRANCH_ORDER) {
    for (const result of snapshot.nonQualifyingByBranch[branch] ?? []) {
      all.push({ result, branch });
    }
  }
  all.sort((a, b) => a.result.proximity - b.result.proximity);
  return all.slice(0, limit);
}

function SubtestChip({ suggestion }: { suggestion: SubtestSuggestion }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-accent-dim px-2 py-1 font-mono text-xs font-semibold text-accent">
      {suggestion.subtest}
      <span className="text-accent/70">+{suggestion.pointsNeeded}</span>
    </span>
  );
}

function GapCard({ candidate }: { candidate: GapCandidate }) {
  const report = useMemo(
    () => buildScoreGapReport(candidate.result, candidate.branch),
    [candidate]
  );
  if (!report) return null;

  const { result } = candidate;
  const afqtShort =
    result.afqtCheck && !result.afqtCheck.passed
      ? result.afqtCheck.required - result.afqtCheck.actual
      : 0;

  const top = report.suggestions.slice(0, 3);

  return (
    <div className="rounded-lg border border-almost/40 bg-navy p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-text-tertiary">
              {result.job.code}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {result.job.title}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-text-tertiary">
            {BRANCH_NAMES[candidate.branch]} &middot; {result.job.category}
          </div>
        </div>
        <div className="text-xs text-almost">
          {report.failedComposites.length}{" "}
          {report.failedComposites.length === 1 ? "composite" : "composites"}{" "}
          short
          {afqtShort > 0 && <> &middot; AFQT +{afqtShort}</>}
        </div>
      </div>

      <p className="mt-3 text-sm text-text-secondary">{report.summary}</p>

      {top.length > 0 && (
        <div className="mt-3">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
            Fastest subtests to raise
          </div>
          <div className="flex flex-wrap gap-2">
            {top.map((s) => (
              <div
                key={s.subtest}
                className="rounded-md border border-navy-border bg-navy-light px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <SubtestChip suggestion={s} />
                  {s.clearsGap && (
                    <span className="rounded bg-success-dim px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                      Clears gap
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[11px] text-text-tertiary">
                  Feeds {s.affectedComposites.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScoreGapEngine({ snapshot }: ScoreGapEngineProps) {
  const candidates = useMemo(() => {
    const top = pickTopCloseMisses(snapshot, 6);
    return top
      .map((c) => ({
        candidate: c,
        report: buildScoreGapReport(c.result, c.branch),
      }))
      .filter((x) => x.report !== null)
      .slice(0, 3);
  }, [snapshot]);
  if (candidates.length === 0) return null;

  return (
    <section className="rounded-xl border border-almost/40 bg-navy-light p-6">
      <div className="mb-4">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Score Gap Engine
        </h2>
        <p className="text-sm text-text-tertiary">
          The cheapest path to qualify for the jobs closest to your current
          scores.
        </p>
      </div>
      <div className="space-y-3">
        {candidates.map(({ candidate }) => (
          <GapCard
            key={`${candidate.branch}-${candidate.result.job.id}`}
            candidate={candidate}
          />
        ))}
      </div>
    </section>
  );
}
