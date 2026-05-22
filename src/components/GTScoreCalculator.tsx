"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { AsvabSubtest } from "@/types";
import { trackEvent } from "@/lib/analytics";
import ScoreInput from "./ScoreInput";

const GT_SUBTESTS: AsvabSubtest[] = ["WK", "PC", "AR"];

/** null = not entered yet. Only WK/PC/AR feed the GT composite. */
type GtDraft = Partial<Record<AsvabSubtest, number | null>>;

const EMPTY_SCORES: GtDraft = { WK: null, PC: null, AR: null };

const GT_TIERS = [
  {
    threshold: 110,
    label: "Elite",
    color: "emerald" as const,
    programs:
      "OCS, Warrant Officer, Green to Gold, 18X Special Forces, CID Agent (31D), Cyber Operations (17C), Prime Power (12P)",
  },
  {
    threshold: 107,
    label: "Advanced",
    color: "sky" as const,
    programs:
      "PsyOps (37F), Civil Affairs (38B), Combat Medic (68W), Public Affairs (46S), most 68-series medical MOS",
  },
  {
    threshold: 105,
    label: "Technical",
    color: "sky" as const,
    programs: "Cyber Network Defender (25D)",
  },
  {
    threshold: 100,
    label: "Professional",
    color: "amber" as const,
    programs: "Human Resources Specialist (42A)",
  },
  {
    threshold: 95,
    label: "Skilled",
    color: "amber" as const,
    programs: "Allied Trade Specialist (91E)",
  },
] as const;

const TIER_COLORS = {
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-400",
    threshold: "text-emerald-400",
  },
  sky: {
    badge: "bg-sky-500/15 text-sky-400",
    threshold: "text-sky-400",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-400",
    threshold: "text-amber-400",
  },
} as const;

export default function GTScoreCalculator() {
  const [scores, setScores] = useState<GtDraft>(EMPTY_SCORES);
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasParams = GT_SUBTESTS.some((st) => searchParams.get(st));
    if (!hasParams) return;

    const fromParams: GtDraft = {};
    for (const st of GT_SUBTESTS) {
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

  const handleReset = () => setScores(EMPTY_SCORES);

  // Only compute/show once all three GT subtests are entered.
  const gtReady = useMemo(
    () => GT_SUBTESTS.every((st) => scores[st] != null),
    [scores]
  );
  const wk = scores.WK ?? 0;
  const pc = scores.PC ?? 0;
  const ar = scores.AR ?? 0;

  const ve = useMemo(() => wk + pc, [wk, pc]);
  const gt = useMemo(() => ve + ar, [ve, ar]);

  const nextTier = useMemo(
    () => GT_TIERS.slice().reverse().find((t) => gt < t.threshold),
    [gt],
  );

  const lowestSubtest = useMemo(() => {
    const vals: { key: AsvabSubtest; value: number }[] = [
      { key: "WK", value: wk },
      { key: "PC", value: pc },
      { key: "AR", value: ar },
    ];
    return vals.reduce((a, b) => (a.value <= b.value ? a : b));
  }, [wk, pc, ar]);

  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    if (!gtReady) return;
    viewedRef.current = true;
    trackEvent("gt_calculator_view_result", { gt, ve });
  }, [gtReady, gt, ve]);

  useEffect(() => {
    if (!gtReady) return;
    const handle = window.setTimeout(() => {
      trackEvent("gt_calculator_submit", { gt, ve });
    }, 800);
    return () => window.clearTimeout(handle);
  }, [gtReady, gt, ve]);

  return (
    <div className="space-y-8 p-6">
      {/* Inputs */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Calculate Your GT Score
          </h2>
          <button
            onClick={handleReset}
            className="text-xs font-medium text-text-tertiary transition-colors hover:text-text-primary"
          >
            Reset
          </button>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          Enter your WK, PC, and AR standard scores (20 to 99). Results update
          instantly.
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {GT_SUBTESTS.map((subtest) => (
            <ScoreInput
              key={subtest}
              subtest={subtest}
              value={scores[subtest] ?? null}
              onChange={handleScoreChange}
              highlight={true}
            />
          ))}
        </div>
      </section>

      {!gtReady && (
        <section className="rounded-xl border border-dashed border-navy-border bg-navy-light/50 p-8 text-center">
          <p className="text-sm text-text-secondary">
            Enter your WK, PC, and AR scores above to see your GT score and the
            programs it unlocks.
          </p>
        </section>
      )}

      {/* GT result */}
      {gtReady && (
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
          Your GT Score
        </h2>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border-4 border-accent bg-accent-dim">
            <span className="font-mono text-4xl font-bold text-accent">
              {gt}
            </span>
          </div>
          <div className="flex-1">
            <div className="rounded-lg bg-navy px-3 py-2 font-mono text-xs text-text-tertiary">
              <div>VE = WK + PC = {scores.WK} + {scores.PC} = {ve}</div>
              <div>GT = VE + AR = {ve} + {scores.AR} = {gt}</div>
            </div>
            <p className="mt-2 text-xs text-text-tertiary">
              GT uses standard scores as reported on your ASVAB score sheet.
              Army, Air Force (G score), Marines, and Coast Guard all use the
              same VE&nbsp;+&nbsp;AR formula.
            </p>
          </div>
        </div>
      </section>

      )}

      {/* Qualification tiers */}
      {gtReady && (
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-3 font-display text-lg font-bold text-text-primary">
          GT {gt} — What It Unlocks
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          Army MOS and program thresholds. Higher GT opens more career paths.
        </p>
        <div className="divide-y divide-navy-border">
          {GT_TIERS.map(({ threshold, label, color, programs }) => {
            const qualifies = gt >= threshold;
            const gap = threshold - gt;
            const colors = TIER_COLORS[color];
            return (
              <div key={threshold} className="py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-lg font-bold ${colors.threshold}`}
                    >
                      {threshold}+
                    </span>
                    <span className="text-xs font-medium text-text-tertiary">
                      {label}
                    </span>
                  </div>
                  {qualifies ? (
                    <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                      Qualifies
                    </span>
                  ) : (
                    <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
                      {gap} point{gap === 1 ? "" : "s"} short
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-text-secondary">{programs}</p>
              </div>
            );
          })}
        </div>
      </section>

      )}

      {/* Gap analysis */}
      {gtReady && nextTier && (
        <section className="rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">
            How to Close the Gap
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            You need {nextTier.threshold - gt} more point
            {nextTier.threshold - gt === 1 ? "" : "s"} to reach GT{" "}
            {nextTier.threshold} ({nextTier.label}). Your lowest subtest is{" "}
            <span className="font-mono font-semibold text-accent">
              {lowestSubtest.key}
            </span>{" "}
            at {lowestSubtest.value} — raising it offers the most room for
            improvement. See the{" "}
            <Link
              href="/asvab-study-guide"
              className="text-accent underline hover:text-accent-hover"
            >
              study guide
            </Link>{" "}
            for a subtest-by-subtest plan.
          </p>
        </section>
      )}

      {/* Branch note */}
      <p className="text-xs text-text-tertiary">
        The Navy does not use a GT composite — each rating has unique subtest
        requirements. See{" "}
        <Link
          href="/navy-asvab-score"
          className="text-accent underline hover:text-accent-hover"
        >
          Navy ASVAB Score
        </Link>{" "}
        for details.
      </p>
    </div>
  );
}
