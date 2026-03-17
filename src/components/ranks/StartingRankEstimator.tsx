"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Branch = "army" | "navy" | "air_force" | "marines" | "coast_guard" | "space_force";
type EducationLevel = "hs_diploma" | "some_college" | "associates" | "bachelors_plus";

const BRANCH_LABELS: Record<Branch, string> = {
  army: "Army", navy: "Navy", air_force: "Air Force",
  marines: "Marines", coast_guard: "Coast Guard", space_force: "Space Force",
};

// Monthly base pay 2025 (approximate, <2 years TIS)
const BASE_PAY: Record<string, { monthly: string; annual: string }> = {
  "E-1": { monthly: "$1,833", annual: "$22,000" },
  "E-2": { monthly: "$2,055", annual: "$24,660" },
  "E-3": { monthly: "$2,161", annual: "$25,932" },
  "E-4": { monthly: "$2,393", annual: "$28,716" },
};

// Rank names per branch per grade
const RANK_NAMES: Record<string, Record<Branch, string>> = {
  "E-1": { army: "Private", navy: "Seaman Recruit", air_force: "Airman Basic", marines: "Private", coast_guard: "Seaman Recruit", space_force: "Specialist 1" },
  "E-2": { army: "Private Second Class", navy: "Seaman Apprentice", air_force: "Airman", marines: "Private First Class", coast_guard: "Seaman Apprentice", space_force: "Specialist 2" },
  "E-3": { army: "Private First Class", navy: "Seaman", air_force: "Airman First Class", marines: "Lance Corporal", coast_guard: "Seaman", space_force: "Specialist 3" },
  "E-4": { army: "Specialist", navy: "Petty Officer 3rd Class", air_force: "Senior Airman", marines: "Corporal", coast_guard: "Petty Officer 3rd Class", space_force: "Specialist 4" },
};

interface EstimateResult {
  grade: string;
  reasons: string[];
}

function estimateStartingRank(
  branch: Branch,
  education: EducationLevel,
  credits: number,
  jrotc: boolean,
  eagleScout: boolean,
  cap: boolean,
  priorService: boolean,
): EstimateResult {
  let grade = 1; // E-1 baseline
  const reasons: string[] = [];

  // Prior service overrides most things
  if (priorService) {
    reasons.push("Prior military service — entry grade depends on previous rank and branch negotiation.");
    return { grade: "E-3", reasons };
  }

  // Education
  if (education === "bachelors_plus") {
    grade = Math.max(grade, 3);
    reasons.push("Bachelor's degree qualifies for E-3 entry in most branches.");
  } else if (education === "associates") {
    grade = Math.max(grade, 2);
    reasons.push("Associate's degree typically qualifies for E-2 entry.");
  } else if (education === "some_college") {
    if (credits >= 60) {
      grade = Math.max(grade, 3);
      reasons.push(`${credits} college credits (60+) qualifies for E-3 entry.`);
    } else if (credits >= 20) {
      grade = Math.max(grade, 2);
      reasons.push(`${credits} college credits (20–59) qualifies for E-2 entry in most branches.`);
    }
  }

  // JROTC bonus
  if (jrotc) {
    if (branch === "army" || branch === "air_force" || branch === "space_force") {
      grade = Math.max(grade, 2);
      reasons.push("JROTC (2+ years) qualifies for E-2 entry.");
    } else {
      grade = Math.max(grade, 2);
      reasons.push("JROTC credit may qualify for E-2 — confirm with recruiter.");
    }
  }

  // Eagle Scout / Gold Award
  if (eagleScout) {
    if (branch === "army") {
      grade = Math.max(grade, 3);
      reasons.push("Eagle Scout / Gold Award qualifies for E-3 in the Army.");
    } else {
      grade = Math.max(grade, 2);
      reasons.push("Eagle Scout / Gold Award qualifies for E-2 in most branches.");
    }
  }

  // CAP
  if (cap) {
    if (branch === "air_force" || branch === "space_force") {
      grade = Math.max(grade, 2);
      reasons.push("Civil Air Patrol cadet officer qualifies for E-2 entry in Air Force / Space Force.");
    }
  }

  // Marines rarely give advanced entry for education alone
  if (branch === "marines" && grade > 3) grade = 3;
  if (branch === "marines" && grade === 3 && education !== "bachelors_plus" && !eagleScout) {
    grade = 2;
  }

  if (reasons.length === 0) {
    reasons.push("No advanced entry credits — you'd start at E-1 like most recruits.");
  }

  const gradeStr = `E-${grade}`;
  return { grade: gradeStr, reasons };
}

export default function StartingRankEstimator() {
  const [branch, setBranch] = useState<Branch>("army");
  const [education, setEducation] = useState<EducationLevel>("hs_diploma");
  const [credits, setCredits] = useState(0);
  const [jrotc, setJrotc] = useState(false);
  const [eagleScout, setEagleScout] = useState(false);
  const [cap, setCap] = useState(false);
  const [priorService, setPriorService] = useState(false);

  const result = useMemo(
    () => estimateStartingRank(branch, education, credits, jrotc, eagleScout, cap, priorService),
    [branch, education, credits, jrotc, eagleScout, cap, priorService],
  );

  const rankName = RANK_NAMES[result.grade]?.[branch] ?? "Unknown";
  const pay = BASE_PAY[result.grade];

  const BRANCHES: Branch[] = ["army", "navy", "air_force", "marines", "coast_guard", "space_force"];

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light overflow-hidden">
      <div className="border-b border-navy-border px-5 py-4">
        <h3 className="font-display text-base font-bold text-text-primary">Starting Rank Estimator</h3>
        <p className="mt-0.5 text-xs text-text-tertiary">Tell us about your background — we'll show what pay grade you'd likely enter at.</p>
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

        {/* Education */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">Education</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {(["hs_diploma", "some_college", "associates", "bachelors_plus"] as EducationLevel[]).map((level) => {
              const labels: Record<EducationLevel, string> = {
                hs_diploma: "High school diploma / GED",
                some_college: "Some college (no degree)",
                associates: "Associate's degree",
                bachelors_plus: "Bachelor's or higher",
              };
              return (
                <label key={level} className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors ${education === level ? "border-accent/40 bg-accent/10" : "border-navy-border bg-navy hover:border-navy-lighter"}`}>
                  <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${education === level ? "border-accent bg-accent" : "border-navy-lighter"}`}>
                    {education === level && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" className="sr-only" checked={education === level} onChange={() => setEducation(level)} />
                  <span className="text-xs text-text-secondary">{labels[level]}</span>
                </label>
              );
            })}
          </div>

          {/* Credits slider — only for some_college */}
          {education === "some_college" && (
            <div className="mt-3 rounded-lg border border-navy-border bg-navy px-4 py-3">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs text-text-secondary">College credits completed</p>
                <span className="font-mono text-sm font-bold text-accent">{credits}</span>
              </div>
              <input
                type="range" min={0} max={120} step={1}
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] text-text-tertiary">
                <span>0</span><span>20 = E-2</span><span>60 = E-3</span><span>120</span>
              </div>
            </div>
          )}
        </div>

        {/* Background bonuses */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">Background Bonuses</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {[
              { key: "jrotc", label: "JROTC (2+ years)", setter: setJrotc, value: jrotc },
              { key: "eagle", label: "Eagle Scout / Gold Award", setter: setEagleScout, value: eagleScout },
              { key: "cap", label: "Civil Air Patrol (cadet officer)", setter: setCap, value: cap },
              { key: "prior", label: "Prior military service", setter: setPriorService, value: priorService },
            ].map(({ key, label, setter, value }) => (
              <label key={key} className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors ${value ? "border-accent/40 bg-accent/10" : "border-navy-border bg-navy hover:border-navy-lighter"}`}>
                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${value ? "border-accent bg-accent" : "border-navy-lighter"}`}>
                  {value && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 5l2.5 2.5 4.5-4.5" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" className="sr-only" checked={value} onChange={(e) => setter(e.target.checked)} />
                <span className="text-xs text-text-secondary">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-text-tertiary mb-1">You&apos;d likely enter as</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-accent">{result.grade}</span>
                <span className="font-display text-lg font-semibold text-text-primary">{rankName}</span>
              </div>
              {pay && (
                <p className="mt-1 font-mono text-sm text-text-secondary">
                  {pay.monthly}/mo · {pay.annual}/yr base pay
                </p>
              )}
            </div>
            <Link
              href="/calculator"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
            >
              See qualifying {BRANCH_LABELS[branch]} jobs →
            </Link>
          </div>
          <ul className="mt-3 space-y-1">
            {result.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="mt-0.5 text-accent text-[10px]">▸</span>
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-text-tertiary italic">Always confirm with a recruiter — exact entry grade depends on current policy and availability.</p>
        </div>
      </div>
    </div>
  );
}
