"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { SubtestScores, AsvabSubtest } from "@/types";
import {
  calculateAFQT,
  getAFQTCategory,
  getAFQTCategoryDescription,
} from "@/lib/score-calculator";
import { trackEvent } from "@/lib/analytics";
import ScoreInput from "./ScoreInput";

/**
 * Focused AFQT calculator — only the 4 subtests that determine enlistment
 * eligibility (AR, WK, PC, MK). Uses the same PAY97 lookup as the full
 * Calculator so results are consistent across the site.
 *
 * The other 5 subtests (GS, EI, AS, MC, AO) are passed as filler defaults
 * because calculateAFQT ignores them; only AR, WK, PC, MK are read.
 */

const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC", "MK"];

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

// Diploma minimum AFQT per branch, 2026. GED minimums are higher and noted inline.
const BRANCH_MINIMUMS = [
  { branch: "Army", min: 31, gedNote: "50 with GED" },
  { branch: "Marine Corps", min: 32, gedNote: "50 with GED" },
  { branch: "Navy", min: 35, gedNote: "50 + 15 college credits with GED" },
  { branch: "Air Force", min: 36, gedNote: "65 with GED" },
  { branch: "Space Force", min: 36, gedNote: "65 with GED" },
  { branch: "Coast Guard", min: 40, gedNote: "50 + 15 college credits with GED" },
] as const;

export default function AfqtCalculator() {
  const [scores, setScores] = useState<SubtestScores>(DEFAULT_SCORES);
  const searchParams = useSearchParams();

  // Load the 4 AFQT subtests from URL params if present (e.g. from shared links)
  useEffect(() => {
    const hasParams = AFQT_SUBTESTS.some((st) => searchParams.get(st));
    if (!hasParams) return;

    const fromParams: Partial<SubtestScores> = {};
    for (const st of AFQT_SUBTESTS) {
      const val = searchParams.get(st);
      if (val) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 20 && num <= 99) {
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
  const category = useMemo(() => getAFQTCategory(afqt), [afqt]);
  const categoryDesc = useMemo(
    () => getAFQTCategoryDescription(category),
    [category]
  );

  const handleReset = () =>
    setScores({ ...DEFAULT_SCORES, AR: 50, WK: 50, PC: 50, MK: 50 });

  // Fire afqt_calculator_view_result once per mount when percentile settles
  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    if (afqt === 0) return;
    viewedRef.current = true;
    trackEvent("calculator_view_result", {
      afqt,
      branch: "afqt_only",
      qualifying_jobs_count: 0,
    });
  }, [afqt]);

  // Debounced submit telemetry (~800ms after last change)
  useEffect(() => {
    const handle = window.setTimeout(() => {
      trackEvent("calculator_submit", {
        afqt,
        branch: "afqt_only",
        qualifying_jobs_count: 0,
      });
    }, 800);
    return () => window.clearTimeout(handle);
  }, [afqt]);

  // VE and raw for transparency in the UI (post-remap)
  const { veDisplay, rawDisplay } = useMemo(() => {
    // Mirror the remap in score-calculator.ts so users see the exact math
    const toEquated = (v: number) => {
      const s = Math.min(99, Math.max(20, v));
      return Math.round(20 + (s - 20) * 42 / 79);
    };
    const ve = toEquated(scores.WK) + toEquated(scores.PC);
    const raw = 2 * ve + toEquated(scores.AR) + toEquated(scores.MK);
    return { veDisplay: ve, rawDisplay: raw };
  }, [scores]);

  return (
    <div className="space-y-8">
      {/* Score inputs — 4 AFQT subtests only */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Enter Your 4 AFQT Subtest Scores
          </h2>
          <button
            onClick={handleReset}
            className="text-xs font-medium text-text-tertiary transition-colors hover:text-text-primary"
          >
            Reset
          </button>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          Only 4 of the 9 ASVAB subtests feed the AFQT. Enter standard scores
          (20 to 99). Results update instantly.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {AFQT_SUBTESTS.map((subtest) => (
            <ScoreInput
              key={subtest}
              subtest={subtest}
              value={scores[subtest]}
              onChange={handleScoreChange}
              highlight={true}
            />
          ))}
        </div>
      </section>

      {/* AFQT percentile + category */}
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
          Your AFQT Percentile
        </h2>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border-4 border-accent bg-accent-dim">
            <span className="font-mono text-4xl font-bold text-accent">
              {afqt}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-secondary">
                Category
              </span>
              <span className="rounded bg-accent-dim px-2 py-0.5 font-mono text-sm font-bold text-accent">
                {category}
              </span>
            </div>
            <p className="mt-1 text-sm text-text-primary">{categoryDesc}</p>
            <div className="mt-3 rounded-lg bg-navy px-3 py-2 font-mono text-xs text-text-tertiary">
              <div>VE = WK + PC = {veDisplay}</div>
              <div>Raw = 2 &times; VE + AR + MK = {rawDisplay}</div>
              <div>Percentile = PAY97 lookup({rawDisplay}) = {afqt}</div>
            </div>
            <p className="mt-2 text-xs text-text-tertiary">
              An AFQT of {afqt} means you outperformed {afqt}% of the 1997
              reference population. Standard scores (20 to 99) are remapped to
              the PAY97 equated scale before lookup.
            </p>
          </div>
        </div>
      </section>

      {/* Branch eligibility matrix */}
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-3 font-display text-lg font-bold text-text-primary">
          Branch Eligibility at AFQT {afqt}
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          Diploma minimums for 2026. Each branch sets its own floor. GED
          holders face higher bars.
        </p>
        <div className="divide-y divide-navy-border">
          {BRANCH_MINIMUMS.map(({ branch, min, gedNote }) => {
            const eligible = afqt >= min;
            const gap = min - afqt;
            return (
              <div
                key={branch}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">
                      {branch}
                    </span>
                    <span className="font-mono text-xs text-text-tertiary">
                      min {min}
                    </span>
                  </div>
                  <div className="text-xs text-text-tertiary">{gedNote}</div>
                </div>
                <div className="flex items-center gap-2">
                  {eligible ? (
                    <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                      Qualifies
                    </span>
                  ) : (
                    <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
                      {gap} point{gap === 1 ? "" : "s"} short
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Peacetime minimums. Branches can raise thresholds based on recruiting
          needs. Category IV (AFQT 21 to 30) accessions are capped at 4% of
          annual recruits across DoD.
        </p>
      </section>

      {/* Next steps CTA */}
      <section className="rounded-xl border border-accent/30 bg-navy-light p-6">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Want to see which military jobs you qualify for?
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          The AFQT is only the enlistment gate. Each branch uses composite line
          scores to assign jobs. Run all 9 subtests through the{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            full ASVAB calculator
          </Link>{" "}
          to see every MOS, rate, and AFSC you qualify for.
        </p>
      </section>
    </div>
  );
}
