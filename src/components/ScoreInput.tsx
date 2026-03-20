"use client";

import { useState, useEffect, useRef } from "react";
import type { AsvabSubtest } from "@/types";
import { SUBTEST_NAMES } from "@/types";

const MIN = 20;
const MAX = 145;

interface ScoreInputProps {
  subtest: AsvabSubtest;
  value: number;
  onChange: (subtest: AsvabSubtest, value: number) => void;
  highlight?: boolean;
}

export default function ScoreInput({
  subtest,
  value,
  onChange,
  highlight,
}: ScoreInputProps) {
  const [inputValue, setInputValue] = useState(String(value));
  const isFocused = useRef(false);

  // Sync prop → local string when parent changes it (Reset All, URL params)
  // but only when the user isn't actively typing
  useEffect(() => {
    if (!isFocused.current) {
      setInputValue(String(value));
    }
  }, [value]);

  const handleTextChange = (raw: string) => {
    setInputValue(raw);
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n >= MIN && n <= MAX) {
      onChange(subtest, n);
    }
  };

  const handleBlur = () => {
    isFocused.current = false;
    const n = parseInt(inputValue, 10);
    if (isNaN(n) || n < MIN || n > MAX) {
      // Revert to last confirmed valid value
      setInputValue(String(value));
    } else {
      const clamped = Math.max(MIN, Math.min(MAX, n));
      onChange(subtest, clamped);
      setInputValue(String(clamped));
    }
  };

  const handleSlider = (raw: string) => {
    const n = parseInt(raw, 10);
    setInputValue(String(n));
    onChange(subtest, n);
  };

  const sliderPct = `${(((value - MIN) / (MAX - MIN)) * 100).toFixed(1)}%`;

  return (
    <div
      className={`rounded-lg p-3 ${
        highlight
          ? "border border-accent/30 bg-accent-dim"
          : "bg-navy-light"
      }`}
    >
      {/* Header: code + full name + AFQT badge */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <label
            htmlFor={`score-${subtest}`}
            className="block text-xs font-semibold uppercase tracking-wider text-accent"
          >
            {subtest}
          </label>
          <span className="block truncate text-xs leading-snug text-text-tertiary">
            {SUBTEST_NAMES[subtest]}
          </span>
        </div>
        {highlight && (
          <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
            AFQT
          </span>
        )}
      </div>

      {/* Score number — large, directly editable */}
      <div className="mb-2 flex justify-center">
        <input
          id={`score-${subtest}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onFocus={(e) => {
            isFocused.current = true;
            e.target.select();
          }}
          onBlur={handleBlur}
          onChange={(e) => handleTextChange(e.target.value)}
          aria-label={`${SUBTEST_NAMES[subtest]} score`}
          aria-describedby={`score-range-${subtest}`}
          className="w-20 rounded-md border border-navy-border bg-navy px-3 py-2 text-center font-mono text-2xl font-bold text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Slider */}
      <input
        type="range"
        min={MIN}
        max={MAX}
        value={value}
        onChange={(e) => handleSlider(e.target.value)}
        aria-label={`${SUBTEST_NAMES[subtest]} score slider`}
        tabIndex={-1}
        className="score-slider"
        style={{ "--slider-pct": sliderPct } as React.CSSProperties}
      />

      {/* Range hint */}
      <div
        id={`score-range-${subtest}`}
        className="mt-1 flex justify-between text-[10px] text-text-tertiary"
      >
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
    </div>
  );
}
