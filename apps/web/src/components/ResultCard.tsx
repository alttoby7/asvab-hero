"use client";

import { useEffect, useState } from "react";
import type { SubtestScores } from "@/types";
import { ALL_SUBTESTS } from "@/types";

interface ResultCardProps {
  scores: SubtestScores;
  afqt: number;
  afqtCategory: string;
  qualifyingCount: number;
}

/**
 * Print-only summary rendered at the top of printouts / PDFs so the recruiter
 * or parent gets a clean one-page cover sheet with the key numbers.
 */
export default function ResultCard({
  scores,
  afqt,
  afqtCategory,
  qualifyingCount,
}: ResultCardProps) {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="hidden print:block mb-6 border-b border-slate-400 pb-4 text-slate-900">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            ASVAB Hero
          </div>
          <div className="text-2xl font-bold">ASVAB Score Summary</div>
        </div>
        <div className="text-right text-xs text-slate-500">{today}</div>
      </div>

      <div className="mt-4 flex items-baseline gap-6">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            AFQT
          </div>
          <div className="text-3xl font-bold">{afqt}</div>
          <div className="text-xs text-slate-600">Category {afqtCategory}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Qualifying Jobs
          </div>
          <div className="text-3xl font-bold">{qualifyingCount}</div>
          <div className="text-xs text-slate-600">across all branches</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          Subtest Scores
        </div>
        <div className="mt-1 grid grid-cols-3 gap-x-6 gap-y-1 text-sm">
          {ALL_SUBTESTS.map((st) => (
            <div key={st} className="flex justify-between border-b border-slate-200 py-0.5">
              <span className="font-medium">{st}</span>
              <span className="font-mono">{scores[st]}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Generated at asvabhero.com/calculator
      </p>
    </div>
  );
}
