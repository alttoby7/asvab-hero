"use client";

import { useState } from "react";

interface Category {
  label: string;
  range: [number, number];
  color: string;
  bg: string;
  description: string;
}

const CATEGORIES: Category[] = [
  { label: "I", range: [93, 99], color: "text-emerald-400", bg: "bg-emerald-400/20", description: "Top tier. First pick of jobs and bonuses." },
  { label: "II", range: [65, 92], color: "text-emerald-300", bg: "bg-emerald-300/15", description: "Highly qualified. Full access to most roles." },
  { label: "IIIA", range: [50, 64], color: "text-sky-400", bg: "bg-sky-400/15", description: "Above average. Strong position for most jobs." },
  { label: "IIIB", range: [31, 49], color: "text-amber-400", bg: "bg-amber-400/15", description: "Meets minimum for most branches. Limited bonuses." },
  { label: "IV", range: [10, 30], color: "text-orange-400", bg: "bg-orange-400/15", description: "Restricted. Congress caps at 4% of enlistments." },
  { label: "V", range: [1, 9], color: "text-red-400", bg: "bg-red-400/15", description: "Permanent disqualifier. No branch can accept." },
];

export default function AFQTCategoryLadder() {
  const [score, setScore] = useState(50);

  const activeCategory = CATEGORIES.find(
    (c) => score >= c.range[0] && score <= c.range[1]
  );

  return (
    <div className="my-8 rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <h3 className="mb-1 font-display text-lg font-bold text-text-primary">
        AFQT Category Ladder
      </h3>
      <p className="mb-4 text-sm text-text-tertiary">
        Drag to see which category your AFQT score falls into and what it means.
      </p>

      {/* Score slider */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-text-tertiary">1</span>
          <span className="font-mono text-2xl font-bold text-accent">{score}</span>
          <span className="text-xs font-medium text-text-tertiary">99</span>
        </div>
        <input
          type="range"
          min={1}
          max={99}
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value, 10))}
          className="w-full accent-accent"
          aria-label="AFQT score"
        />
      </div>

      {/* Category bars */}
      <div className="space-y-2">
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          const width = ((cat.range[1] - cat.range[0] + 1) / 99) * 100;

          return (
            <div
              key={cat.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                isActive
                  ? `${cat.bg} ring-1 ring-current ${cat.color}`
                  : "bg-navy"
              }`}
            >
              <span
                className={`w-10 font-mono text-sm font-bold ${
                  isActive ? cat.color : "text-text-tertiary"
                }`}
              >
                {cat.label}
              </span>
              <div className="flex-1">
                <div className="mb-1 h-2 overflow-hidden rounded-full bg-navy-lighter">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-30"
                    }`}
                    style={{
                      width: `${width}%`,
                      backgroundColor: isActive ? "currentColor" : "var(--color-text-tertiary)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      isActive ? "text-text-secondary" : "text-text-tertiary"
                    }`}
                  >
                    {cat.range[0]}-{cat.range[1]}
                  </span>
                  {isActive && (
                    <span className="text-xs text-text-secondary">
                      {cat.description}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
