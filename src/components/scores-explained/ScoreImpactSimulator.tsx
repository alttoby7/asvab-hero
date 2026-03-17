"use client";

import { useState, useMemo } from "react";
import type { SubtestScores, AsvabSubtest } from "@/types";
import { ALL_SUBTESTS, SUBTEST_NAMES } from "@/types";
import { calculateAFQT, getAFQTCategory } from "@/lib/score-calculator";

const DEFAULT_SCORES: SubtestScores = {
  GS: 50, AR: 50, WK: 50, PC: 50, MK: 50, EI: 50, AS: 50, MC: 50, AO: 50,
};

const AFQT_SUBTESTS: AsvabSubtest[] = ["WK", "PC", "AR", "MK"];

interface BoostResult {
  subtest: AsvabSubtest;
  newAFQT: number;
  delta: number;
}

export default function ScoreImpactSimulator() {
  const [scores, setScores] = useState<SubtestScores>(DEFAULT_SCORES);
  const [boostAmount, setBoostAmount] = useState(5);

  const currentAFQT = useMemo(() => calculateAFQT(scores), [scores]);
  const currentCategory = useMemo(() => getAFQTCategory(currentAFQT), [currentAFQT]);

  // Calculate what happens if you boost each AFQT subtest
  const boosts: BoostResult[] = useMemo(() => {
    return AFQT_SUBTESTS.map((st) => {
      const boosted = { ...scores, [st]: Math.min(62, scores[st] + boostAmount) };
      const newAFQT = calculateAFQT(boosted);
      return { subtest: st, newAFQT, delta: newAFQT - currentAFQT };
    }).sort((a, b) => b.delta - a.delta);
  }, [scores, boostAmount, currentAFQT]);

  const handleScoreChange = (st: AsvabSubtest, val: number) => {
    setScores((prev) => ({ ...prev, [st]: Math.max(20, Math.min(62, val)) }));
  };

  return (
    <div className="my-8 rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <h3 className="mb-1 font-display text-lg font-bold text-text-primary">
        Score Impact Simulator
      </h3>
      <p className="mb-5 text-sm text-text-tertiary">
        Enter your current scores, pick a study boost amount, and see which subtest gives the biggest AFQT payoff.
      </p>

      {/* Current scores input */}
      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {ALL_SUBTESTS.map((st) => (
          <div key={st}>
            <label
              htmlFor={`sim-${st}`}
              className={`block text-[10px] font-semibold uppercase tracking-wider ${
                AFQT_SUBTESTS.includes(st) ? "text-accent" : "text-text-tertiary"
              }`}
            >
              {st}
            </label>
            <input
              id={`sim-${st}`}
              type="number"
              min={20}
              max={62}
              value={scores[st]}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v)) handleScoreChange(st, v);
              }}
              className="w-full rounded border border-navy-border bg-navy px-2 py-1.5 text-center font-mono text-xs font-semibold text-text-primary outline-none focus:border-accent"
            />
          </div>
        ))}
      </div>

      {/* Current AFQT */}
      <div className="mb-4 flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-accent-dim">
          <span className="font-mono text-base font-bold text-accent">{currentAFQT}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Current Estimated AFQT</p>
          <p className="text-xs text-text-tertiary">Category {currentCategory}</p>
        </div>
      </div>

      {/* Boost selector */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-medium text-text-secondary">If you improve a subtest by:</span>
        <div className="flex gap-1.5">
          {[3, 5, 10].map((n) => (
            <button
              key={n}
              onClick={() => setBoostAmount(n)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                boostAmount === n
                  ? "bg-accent text-white"
                  : "bg-navy text-text-secondary hover:text-text-primary"
              }`}
            >
              +{n}
            </button>
          ))}
        </div>
      </div>

      {/* Impact results */}
      <div className="space-y-2">
        {boosts.map((b, i) => {
          const newCategory = getAFQTCategory(b.newAFQT);
          const categoryChanged = newCategory !== currentCategory;
          const isVerbal = b.subtest === "WK" || b.subtest === "PC";

          return (
            <div
              key={b.subtest}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                i === 0 ? "bg-accent/10 ring-1 ring-accent/30" : "bg-navy"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-text-primary">
                  {b.subtest}
                </span>
                <span className="text-xs text-text-tertiary">
                  {SUBTEST_NAMES[b.subtest]}
                </span>
                {isVerbal && (
                  <span className="rounded bg-accent-dim px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                    2x VE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-sm font-bold ${
                  b.delta > 0 ? "text-emerald-400" : "text-text-tertiary"
                }`}>
                  {b.delta > 0 ? `+${b.delta}` : "0"}
                </span>
                <span className="font-mono text-sm text-text-secondary">
                  &rarr; {b.newAFQT}
                </span>
                {categoryChanged && (
                  <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                    Cat. {newCategory}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {boosts[0]?.delta > 0 && (
        <p className="mt-3 text-xs text-text-tertiary">
          Best study ROI: focus on <span className="font-semibold text-accent">{boosts[0].subtest}</span> ({SUBTEST_NAMES[boosts[0].subtest]}) for the biggest AFQT gain.
        </p>
      )}
    </div>
  );
}
