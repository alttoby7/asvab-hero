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
import { BRANCH_MINIMUMS } from "@/lib/branch-minimums";
import ScoreInput from "./ScoreInput";

/**
 * Focused AFQT calculator, only the 4 subtests that determine enlistment
 * eligibility (AR, WK, PC, MK). Uses the same PAY97 lookup as the full
 * Calculator so results are consistent across the site.
 *
 * The other 5 subtests (GS, EI, AS, MC, AO) are passed as filler defaults
 * because calculateAFQT ignores them; only AR, WK, PC, MK are read.
 */

const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC", "MK"];

/** Draft scores: null = not entered yet. Only AR/WK/PC/MK are read by AFQT. */
type DraftScores = Record<AsvabSubtest, number | null>;

const EMPTY_SCORES: DraftScores = {
  GS: null,
  AR: null,
  WK: null,
  PC: null,
  MK: null,
  EI: null,
  AS: null,
  MC: null,
  AO: null,
};

export default function AfqtCalculator({ embedded = false }: { embedded?: boolean } = {}) {
  const [scores, setScores] = useState<DraftScores>(EMPTY_SCORES);
  const searchParams = useSearchParams();

  // Load the 4 AFQT subtests from URL params if present (e.g. from shared links)
  useEffect(() => {
    const hasParams = AFQT_SUBTESTS.some((st) => searchParams.get(st));
    if (!hasParams) return;

    const fromParams: Partial<DraftScores> = {};
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

  const handleScoreChange = (subtest: AsvabSubtest, value: number | null) => {
    setScores((prev) => ({ ...prev, [subtest]: value }));
  };

  // Only compute/show once all four AFQT subtests are entered.
  const afqtReady = useMemo(
    () => AFQT_SUBTESTS.every((st) => scores[st] != null),
    [scores]
  );
  const filledScores = useMemo<SubtestScores>(() => {
    const out = {} as SubtestScores;
    for (const st of Object.keys(scores) as AsvabSubtest[]) out[st] = scores[st] ?? 0;
    return out;
  }, [scores]);

  const afqt = useMemo(
    () => (afqtReady ? calculateAFQT(filledScores) : 0),
    [afqtReady, filledScores]
  );
  const category = useMemo(() => getAFQTCategory(afqt), [afqt]);
  const categoryDesc = useMemo(
    () => getAFQTCategoryDescription(category),
    [category]
  );

  const handleReset = () => setScores(EMPTY_SCORES);

  // Fire calculator_view_result once per mount, only on a real result.
  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    if (!afqtReady) return;
    viewedRef.current = true;
    trackEvent("calculator_view_result", {
      afqt,
      branch: "afqt_only",
      qualifying_jobs_count: 0,
    });
  }, [afqtReady, afqt]);

  // Debounced submit telemetry (~800ms after last change), only when ready.
  useEffect(() => {
    if (!afqtReady) return;
    const handle = window.setTimeout(() => {
      trackEvent("calculator_submit", {
        afqt,
        branch: "afqt_only",
        qualifying_jobs_count: 0,
      });
    }, 800);
    return () => window.clearTimeout(handle);
  }, [afqtReady, afqt]);

  // VE and raw for transparency in the UI (post-remap)
  const { veDisplay, rawDisplay } = useMemo(() => {
    // Mirror the remap in score-calculator.ts so users see the exact math
    const toEquated = (v: number) => {
      const s = Math.min(99, Math.max(20, v));
      return Math.round(20 + (s - 20) * 42 / 79);
    };
    const ve = toEquated(filledScores.WK) + toEquated(filledScores.PC);
    const raw = 2 * ve + toEquated(filledScores.AR) + toEquated(filledScores.MK);
    return { veDisplay: ve, rawDisplay: raw };
  }, [filledScores]);

  return (
    <div className="space-y-8">
      {/* Score inputs, 4 AFQT subtests only */}
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

      {!afqtReady && (
        <section className="rounded-xl border border-dashed border-navy-border bg-navy-light/50 p-8 text-center">
          <p className="text-sm text-text-secondary">
            Enter all four subtest scores above to see your AFQT percentile and
            branch eligibility.
          </p>
        </section>
      )}

      {/* AFQT percentile + category */}
      {afqtReady && (
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

      )}

      {/* Branch eligibility matrix */}
      {afqtReady && (
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
      )}

      {/* Next steps CTA */}
      <section className="rounded-xl border border-accent/30 bg-navy-light p-6">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Want to see which military jobs you qualify for?
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          The AFQT is only the enlistment gate. Each branch uses composite line
          scores to assign jobs. Run all 9 subtests through the{" "}
          {embedded ? (
            // Inside an iframe a relative <Link> would navigate the frame to a
            // chrome-bearing page. Break out to the full site in a new tab.
            <a
              href="https://asvabhero.com/calculator"
              target="_blank"
              rel="noopener"
              className="text-accent underline hover:text-accent-hover"
            >
              full ASVAB calculator
            </a>
          ) : (
            <Link
              href="/calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              full ASVAB calculator
            </Link>
          )}{" "}
          to see every MOS, rate, and AFSC you qualify for.
        </p>
      </section>
    </div>
  );
}
