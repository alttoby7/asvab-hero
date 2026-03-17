"use client";

import type { AsvabSubtest } from "@/types";
import { SUBTEST_NAMES } from "@/types";

interface ScoreInputProps {
  subtest: AsvabSubtest;
  value: number;
  onChange: (subtest: AsvabSubtest, value: number) => void;
}

export default function ScoreInput({
  subtest,
  value,
  onChange,
}: ScoreInputProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-navy-light p-3">
      <div className="min-w-0 flex-1">
        <label
          htmlFor={`score-${subtest}`}
          className="block text-xs font-semibold uppercase tracking-wider text-accent"
        >
          {subtest}
        </label>
        <span className="block truncate text-xs text-text-tertiary">
          {SUBTEST_NAMES[subtest]}
        </span>
      </div>
      <input
        id={`score-${subtest}`}
        type="number"
        min={20}
        max={145}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v)) onChange(subtest, Math.max(20, Math.min(145, v)));
        }}
        className="w-20 rounded-md border border-navy-border bg-navy px-3 py-2 text-center font-mono text-sm font-semibold text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
