"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { SubtestScores, AsvabSubtest, MilitaryJob, Branch, CompositeScores } from "@/types";
import { ALL_SUBTESTS, BRANCH_NAMES } from "@/types";
import { useEntitlement } from "@/hooks/useEntitlement";
import {
  calculateAFQT,
  getAFQTCategory,
  getAFQTCategoryDescription,
  calculateAllComposites,
} from "@/lib/score-calculator";
import { buildJobMatchSnapshot } from "@/lib/job-matcher";
import type { JobMatchSnapshot } from "@/lib/job-matcher";
import { trackEvent } from "@/lib/analytics";
import ScoreInput from "./ScoreInput";
import JobResults from "./JobResults";
import NonQualifyingResults from "./NonQualifyingResults";
import ScoreGapEngine from "./ScoreGapEngine";
import ShareActions from "./ShareActions";
import ResultCard from "./ResultCard";
import CalculatorResultBridge from "./CalculatorResultBridge";

interface CalculatorProps {
  allJobs: MilitaryJob[];
  branchFilter?: Branch;
}

/** Draft scores: null = the user hasn't entered that subtest yet. */
type DraftScores = Record<AsvabSubtest, number | null>;

const EMPTY_SCORES: DraftScores = ALL_SUBTESTS.reduce((acc, st) => {
  acc[st] = null;
  return acc;
}, {} as DraftScores);

/** The four subtests that determine AFQT (AR, WK, PC, MK). */
const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC", "MK"];

const BRANCH_TAB_ORDER: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

export default function Calculator({ allJobs, branchFilter }: CalculatorProps) {
  const [scores, setScores] = useState<DraftScores>(EMPTY_SCORES);
  const [compositeTab, setCompositeTab] = useState<Branch>(branchFilter ?? "army");
  const searchParams = useSearchParams();
  const { entitlement } = useEntitlement();

  const filteredJobs = useMemo(
    () => (branchFilter ? allJobs.filter((j) => j.branch === branchFilter) : allJobs),
    [allJobs, branchFilter]
  );

  // Load scores from URL params (e.g. from practice test results)
  useEffect(() => {
    const hasScoreParams = ALL_SUBTESTS.some((st) => searchParams.get(st));
    if (!hasScoreParams) return;

    const fromParams: Partial<DraftScores> = {};
    for (const st of ALL_SUBTESTS) {
      const val = searchParams.get(st);
      if (val) {
        const num = parseInt(val, 10);
        // Clamp to the calculator's real input range (matches the UI/slider).
        if (!isNaN(num) && num >= 20 && num <= 99) {
          fromParams[st] = num;
        }
      }
    }
    if (Object.keys(fromParams).length > 0) {
      setScores((prev) => ({ ...prev, ...fromParams }));
    }
  }, [searchParams]);

  const handleScoreChange = (subtest: AsvabSubtest, value: number | null) => {
    setScores((prev) => ({ ...prev, [subtest]: value }));
  };

  // Readiness gates, nothing is computed or shown off seeded defaults.
  const afqtReady = useMemo(
    () => AFQT_SUBTESTS.every((st) => scores[st] != null),
    [scores]
  );
  const compositesReady = useMemo(
    () => ALL_SUBTESTS.every((st) => scores[st] != null),
    [scores]
  );

  // Typed view of the draft. The fallback is only ever read for a subtest the
  // relevant gate already proved is non-null, so it never affects a shown number.
  const filledScores = useMemo<SubtestScores>(() => {
    const out = {} as SubtestScores;
    for (const st of ALL_SUBTESTS) out[st] = scores[st] ?? 0;
    return out;
  }, [scores]);

  const afqt = useMemo(
    () => (afqtReady ? calculateAFQT(filledScores) : 0),
    [afqtReady, filledScores]
  );
  const afqtCategory = useMemo(() => getAFQTCategory(afqt), [afqt]);
  const afqtDesc = useMemo(
    () => getAFQTCategoryDescription(afqtCategory),
    [afqtCategory]
  );

  const allComposites = useMemo(
    () => (compositesReady ? calculateAllComposites(filledScores) : []),
    [compositesReady, filledScores]
  );

  const compositesByBranch = useMemo(() => {
    const map: Record<Branch, CompositeScores> = {} as Record<Branch, CompositeScores>;
    for (const bc of allComposites) {
      map[bc.branch] = bc.composites;
    }
    return map;
  }, [allComposites]);

  const snapshot = useMemo<JobMatchSnapshot | null>(
    () =>
      compositesReady
        ? buildJobMatchSnapshot(filteredJobs, compositesByBranch, afqt)
        : null,
    [compositesReady, filteredJobs, compositesByBranch, afqt]
  );

  const activeComposites = useMemo(
    () => allComposites.find((c) => c.branch === compositeTab),
    [allComposites, compositeTab]
  );

  const handleReset = () => setScores(EMPTY_SCORES);

  // Fire `calculator_view_result` once per mount, only when a real, full result exists.
  const viewedResultRef = useRef(false);
  useEffect(() => {
    if (viewedResultRef.current) return;
    if (!compositesReady || !snapshot) return;
    viewedResultRef.current = true;
    trackEvent("calculator_view_result", {
      afqt,
      branch: branchFilter ?? "all",
      qualifying_jobs_count: snapshot.totalQualifying,
    });
  }, [compositesReady, snapshot, afqt, branchFilter]);

  // Debounced `calculator_submit`, fire ~800ms after the user stops adjusting scores.
  // Avoids one event per keystroke, and never fires off the blank/partial state.
  useEffect(() => {
    if (!compositesReady || !snapshot) return;
    const handle = window.setTimeout(() => {
      trackEvent("calculator_submit", {
        afqt,
        branch: branchFilter ?? "all",
        qualifying_jobs_count: snapshot.totalQualifying,
      });
    }, 800);
    return () => window.clearTimeout(handle);
  }, [compositesReady, snapshot, afqt, branchFilter]);

  return (
    <div className="space-y-8">
      {compositesReady && snapshot && (
        <ResultCard
          scores={filledScores}
          afqt={afqt}
          afqtCategory={afqtCategory}
          qualifyingCount={snapshot.totalQualifying}
        />
      )}

      {/* Conversion #1, the free-plan bridge at the peak-intent result moment.
         Replaces the old PDF email capture + straight-to-$9.99 upsell with a
         save-your-score → free-plan signup (the score-moving core is free).
         Waits for all 9 subtests: its success state cites the job count, which
         isn't real until composites/jobs are computed. */}
      {compositesReady && snapshot && (
        <CalculatorResultBridge
          afqt={afqt}
          branch={branchFilter}
          qualifyingCount={snapshot.totalQualifying}
          isPro={entitlement.isPro}
        />
      )}

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
          Enter your 9 ASVAB subtest standard scores (20–99). Results update
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

      {/* AFQT Score, appears once the four AFQT subtests are entered. */}
      {afqtReady ? (
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
      ) : (
        <section className="rounded-xl border border-dashed border-navy-border bg-navy-light/50 p-8 text-center">
          <p className="text-sm text-text-secondary">
            Enter your scores above to see your AFQT percentile, line scores, and
            the military jobs you qualify for.
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            Your AFQT needs the four highlighted subtests: AR, WK, PC, and MK.
          </p>
        </section>
      )}

      {/* Composite Scores, full 9-subtest results only. */}
      {compositesReady && (
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
          Composite / Line Scores
        </h2>

        {/* Branch tabs, hidden when branch is locked */}
        {!branchFilter && (
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
        )}

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
      )}

      {compositesReady && snapshot && (
        <>
          {/* Qualifying Jobs */}
          <section className="rounded-xl border border-navy-border bg-navy-light p-6">
            <JobResults
              jobsByBranch={snapshot.qualifyingByBranch}
              totalJobs={snapshot.totalQualifying}
              afqt={afqt}
            />
          </section>

          {/* Score Gap Engine, minimum-effort path to closest jobs */}
          <ScoreGapEngine snapshot={snapshot} afqt={afqt} />

          {/* Share actions */}
          <ShareActions
            scores={filledScores}
            afqt={afqt}
            qualifyingCount={snapshot.totalQualifying}
          />

          {/* Non-Qualifying Jobs */}
          <section className="rounded-xl border border-navy-border bg-navy-light p-6">
            <NonQualifyingResults
              jobsByBranch={snapshot.nonQualifyingByBranch}
              totalJobs={snapshot.totalNonQualifying}
              afqt={afqt}
            />
          </section>
        </>
      )}
    </div>
  );
}
