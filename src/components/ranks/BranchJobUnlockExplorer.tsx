"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import armyJobs from "@/data/army-jobs.json";
import navyJobs from "@/data/navy-jobs.json";
import airForceJobs from "@/data/air-force-jobs.json";
import marineJobs from "@/data/marines-jobs.json";
import coastGuardJobs from "@/data/coast-guard-jobs.json";
import spaceForceJobs from "@/data/space-force-jobs.json";

type Branch = "army" | "navy" | "air_force" | "marines" | "coast_guard" | "space_force";

interface Job {
  id: string;
  code: string;
  title: string;
  category: string;
  minAFQT: number;
  requirements: { composite: string; minScore: number }[];
}

const BRANCH_LABELS: Record<Branch, string> = {
  army: "Army", navy: "Navy", air_force: "Air Force",
  marines: "Marines", coast_guard: "Coast Guard", space_force: "Space Force",
};

const BRANCH_MIN_AFQT: Record<Branch, number> = {
  army: 31, navy: 35, air_force: 36, marines: 32, coast_guard: 40, space_force: 36,
};

const BRANCH_JOBS: Record<Branch, Job[]> = {
  army: armyJobs as Job[],
  navy: navyJobs as Job[],
  air_force: airForceJobs as Job[],
  marines: marineJobs as Job[],
  coast_guard: coastGuardJobs as Job[],
  space_force: spaceForceJobs as Job[],
};

const AFQT_CATEGORIES = [
  { min: 93, max: 99, label: "Category I", color: "text-success" },
  { min: 65, max: 92, label: "Category II", color: "text-success" },
  { min: 50, max: 64, label: "Category IIIa", color: "text-accent" },
  { min: 31, max: 49, label: "Category IIIb", color: "text-accent" },
  { min: 21, max: 30, label: "Category IVa", color: "text-amber-400" },
  { min: 16, max: 20, label: "Category IVb", color: "text-amber-400" },
  { min: 10, max: 15, label: "Category IVc", color: "text-red-400" },
  { min: 1, max: 9, label: "Category V", color: "text-red-500" },
];

function getAfqtCategory(score: number) {
  return AFQT_CATEGORIES.find((c) => score >= c.min && score <= c.max) ?? AFQT_CATEGORIES[AFQT_CATEGORIES.length - 1];
}

const BRANCHES: Branch[] = ["army", "navy", "air_force", "marines", "coast_guard", "space_force"];

export default function BranchJobUnlockExplorer() {
  const [branch, setBranch] = useState<Branch>("army");
  const [afqt, setAfqt] = useState(50);

  const jobs = BRANCH_JOBS[branch];
  const minAfqt = BRANCH_MIN_AFQT[branch];
  const category = getAfqtCategory(afqt);
  const qualified = useMemo(() => jobs.filter((j) => j.minAFQT <= afqt), [jobs, afqt]);
  const total = jobs.length;
  const pct = total > 0 ? Math.round((qualified.length / total) * 100) : 0;
  const aboveMin = afqt >= minAfqt;

  // Category breakdown
  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    qualified.forEach((j) => {
      map[j.category] = (map[j.category] ?? 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [qualified]);

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light overflow-hidden">
      <div className="border-b border-navy-border px-5 py-4">
        <h3 className="font-display text-base font-bold text-text-primary">Job Unlock Explorer</h3>
        <p className="mt-0.5 text-xs text-text-tertiary">
          Rank determines your pay. ASVAB determines your options. See how many jobs open at any score.
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Branch selector */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">Branch</p>
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((b) => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  branch === b
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-navy-border bg-navy text-text-secondary hover:border-navy-lighter hover:text-text-primary"
                }`}
              >
                {BRANCH_LABELS[b]}
              </button>
            ))}
          </div>
        </div>

        {/* AFQT slider */}
        <div className="rounded-lg border border-navy-border bg-navy px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">AFQT Score</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${category.color}`}>{category.label}</span>
              <span className="font-mono text-2xl font-bold text-accent">{afqt}</span>
            </div>
          </div>
          <input
            type="range" min={1} max={99} step={1}
            value={afqt}
            onChange={(e) => setAfqt(Number(e.target.value))}
            className="w-full cursor-pointer accent-orange-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-text-tertiary">
            <span>1</span><span>50</span><span>99</span>
          </div>
        </div>

        {/* Result */}
        {!aboveMin ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="font-semibold text-red-400">Below {BRANCH_LABELS[branch]} minimum (AFQT {minAfqt})</p>
            <p className="mt-1 text-xs text-text-secondary">
              A score of {afqt} doesn&apos;t meet the {BRANCH_LABELS[branch]}&apos;s minimum requirement. You&apos;d need to score at least {minAfqt} to enlist.
            </p>
            <Link href="/asvab-study-guide" className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20 no-underline">
              Build a study plan to hit {minAfqt}+ →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Big number */}
            <div className="flex items-end gap-4">
              <div>
                <p className="text-xs text-text-tertiary">Jobs unlocked</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-bold text-success">{qualified.length}</span>
                  <span className="text-sm text-text-tertiary">of {total}</span>
                </div>
              </div>
              <div className="flex-1 pb-2">
                <div className="h-3 rounded-full bg-navy overflow-hidden">
                  <div
                    className="h-full rounded-full bg-success transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-text-tertiary">{pct}% of {BRANCH_LABELS[branch]} jobs</p>
              </div>
            </div>

            {/* Category breakdown */}
            {byCategory.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">By Category</p>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                  {byCategory.map(([cat, count]) => (
                    <div key={cat} className="rounded-lg bg-navy border border-navy-border px-3 py-2">
                      <p className="font-mono text-lg font-bold text-text-primary">{count}</p>
                      <p className="text-[10px] text-text-tertiary leading-tight">{cat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/calculator"
              className="flex items-center justify-between rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
            >
              <span>See all {qualified.length} qualifying {BRANCH_LABELS[branch]} jobs</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
