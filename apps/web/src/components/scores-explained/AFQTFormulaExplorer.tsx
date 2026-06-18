"use client";

import { useState, useMemo } from "react";
import { calculateAFQT, getAFQTCategory } from "@/lib/score-calculator";
import type { SubtestScores } from "@/types";

const AFQT_SUBTESTS = ["WK", "PC", "AR", "MK"] as const;

const LABELS: Record<string, string> = {
  WK: "Word Knowledge",
  PC: "Paragraph Comprehension",
  AR: "Arithmetic Reasoning",
  MK: "Mathematics Knowledge",
};

const DEFAULT: Record<string, number> = { WK: 50, PC: 50, AR: 50, MK: 50 };

export default function AFQTFormulaExplorer() {
  const [scores, setScores] = useState(DEFAULT);

  const ve = scores.WK + scores.PC;
  const raw = 2 * ve + scores.AR + scores.MK;

  const fullScores: SubtestScores = {
    GS: 50, AR: scores.AR, WK: scores.WK, PC: scores.PC,
    MK: scores.MK, EI: 50, AS: 50, MC: 50, AO: 50,
  };
  const afqt = useMemo(() => calculateAFQT(fullScores), [scores.AR, scores.WK, scores.PC, scores.MK]);
  const category = useMemo(() => getAFQTCategory(afqt), [afqt]);

  const handleChange = (key: string, val: number) => {
    setScores((prev) => ({ ...prev, [key]: Math.max(20, Math.min(62, val)) }));
  };

  return (
    <div className="my-8 rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <h3 className="mb-1 font-display text-lg font-bold text-text-primary">
        AFQT Formula Explorer
      </h3>
      <p className="mb-5 text-sm text-text-tertiary">
        Drag the sliders to see how each subtest affects your AFQT. Notice how WK and PC have double the impact.
      </p>

      {/* Sliders */}
      <div className="grid gap-4 sm:grid-cols-2">
        {AFQT_SUBTESTS.map((st) => (
          <div key={st}>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor={`afqt-${st}`} className="text-xs font-semibold uppercase tracking-wider text-accent">
                {st}
                <span className="ml-1.5 font-normal normal-case tracking-normal text-text-tertiary">
                  {LABELS[st]}
                </span>
              </label>
              <span className="font-mono text-sm font-bold text-text-primary">{scores[st]}</span>
            </div>
            <input
              id={`afqt-${st}`}
              type="range"
              min={20}
              max={62}
              value={scores[st]}
              onChange={(e) => handleChange(st, parseInt(e.target.value, 10))}
              className="w-full accent-accent"
            />
          </div>
        ))}
      </div>

      {/* Formula breakdown */}
      <div className="mt-6 rounded-xl bg-navy p-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-center font-mono text-sm">
          <span className="text-text-tertiary">2 &times;</span>
          <span className="rounded bg-accent-dim px-2 py-1 font-bold text-accent">
            VE {ve}
          </span>
          <span className="text-text-tertiary">+</span>
          <span className="rounded bg-navy-lighter px-2 py-1 font-bold text-text-primary">
            AR {scores.AR}
          </span>
          <span className="text-text-tertiary">+</span>
          <span className="rounded bg-navy-lighter px-2 py-1 font-bold text-text-primary">
            MK {scores.MK}
          </span>
          <span className="text-text-tertiary">=</span>
          <span className="rounded bg-navy-lighter px-2 py-1 font-bold text-text-primary">
            {raw}
          </span>
        </div>

        <div className="mt-3 text-center text-xs text-text-tertiary">
          VE = WK ({scores.WK}) + PC ({scores.PC}) = {ve}
          <span className="ml-2 text-accent">&times; 2 = {ve * 2}</span>
        </div>
      </div>

      {/* Result */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent-dim">
          <span className="font-mono text-2xl font-bold text-accent">{afqt}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Estimated AFQT Percentile
          </p>
          <p className="text-xs text-text-tertiary">
            Category {category}
          </p>
        </div>
      </div>
    </div>
  );
}
