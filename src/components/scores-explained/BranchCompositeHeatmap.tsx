"use client";

import { useState } from "react";
import type { AsvabSubtest } from "@/types";
import { ALL_SUBTESTS, SUBTEST_NAMES } from "@/types";

type BranchKey = "army" | "marines" | "air_force" | "navy";

interface CompositeInfo {
  name: string;
  subtests: AsvabSubtest[];
  note?: string;
}

const BRANCH_COMPOSITES: Record<BranchKey, CompositeInfo[]> = {
  army: [
    { name: "GT", subtests: ["AR", "WK", "PC"], note: "General Technical" },
    { name: "CL", subtests: ["WK", "PC", "AR", "MK"], note: "Clerical" },
    { name: "CO", subtests: ["AR", "AS", "MC"], note: "Combat" },
    { name: "EL", subtests: ["GS", "AR", "MK", "EI"], note: "Electronics" },
    { name: "FA", subtests: ["AR", "MK", "MC"], note: "Field Artillery" },
    { name: "GM", subtests: ["GS", "AS", "MC"], note: "Gen. Maintenance" },
    { name: "MM", subtests: ["AS", "MC", "EI"], note: "Mech. Maintenance" },
    { name: "OF", subtests: ["WK", "PC", "AR", "MC"], note: "Operators & Food" },
    { name: "SC", subtests: ["WK", "PC", "AR", "MK", "EI"], note: "Surveillance & Comms" },
    { name: "ST", subtests: ["GS", "WK", "PC", "AR", "MK"], note: "Skilled Technical" },
  ],
  marines: [
    { name: "GT", subtests: ["AR", "WK", "PC"], note: "General Technical" },
    { name: "MM", subtests: ["AR", "MC", "AS", "EI"], note: "Mech. Maintenance" },
    { name: "EL", subtests: ["GS", "AR", "MK", "EI"], note: "Electronics" },
    { name: "CL", subtests: ["WK", "PC", "MK"], note: "Clerical" },
  ],
  air_force: [
    { name: "M", subtests: ["MC", "AS", "GS"], note: "Mechanical" },
    { name: "A", subtests: ["WK", "PC", "MK"], note: "Administrative" },
    { name: "G", subtests: ["AR", "WK", "PC"], note: "General" },
    { name: "E", subtests: ["GS", "AR", "MK", "EI"], note: "Electronics" },
  ],
  navy: [
    { name: "BEE", subtests: ["AR", "MK", "EI", "GS"], note: "Electronics/Tech" },
    { name: "ENG", subtests: ["WK", "PC", "AR", "MK", "MC"], note: "Engineering" },
    { name: "MED", subtests: ["WK", "PC", "AR", "MK", "GS"], note: "Medical (HM)" },
    { name: "OPS", subtests: ["WK", "PC", "AR"], note: "Operations" },
    { name: "ADM", subtests: ["WK", "PC", "MK"], note: "Administrative" },
  ],
};

const BRANCH_LABELS: Record<BranchKey, string> = {
  army: "Army",
  marines: "Marines",
  air_force: "Air Force / Space Force",
  navy: "Navy / Coast Guard",
};

const BRANCH_ORDER: BranchKey[] = ["army", "marines", "air_force", "navy"];

export default function BranchCompositeHeatmap() {
  const [activeBranch, setActiveBranch] = useState<BranchKey>("army");
  const [hoveredComposite, setHoveredComposite] = useState<string | null>(null);
  const [hoveredSubtest, setHoveredSubtest] = useState<AsvabSubtest | null>(null);

  const composites = BRANCH_COMPOSITES[activeBranch];

  // Which subtests are highlighted?
  const highlightedSubtests = new Set<AsvabSubtest>();
  if (hoveredComposite) {
    const comp = composites.find((c) => c.name === hoveredComposite);
    comp?.subtests.forEach((s) => highlightedSubtests.add(s));
  }

  // Which composites are highlighted from hovering a subtest?
  const highlightedComposites = new Set<string>();
  if (hoveredSubtest) {
    composites.forEach((c) => {
      if (c.subtests.includes(hoveredSubtest)) {
        highlightedComposites.add(c.name);
      }
    });
  }

  const isSubtestActive = (st: AsvabSubtest) =>
    hoveredComposite ? highlightedSubtests.has(st) : hoveredSubtest === st;

  const isCompositeActive = (name: string) =>
    hoveredComposite === name || highlightedComposites.has(name);

  return (
    <div className="my-8 rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <h3 className="mb-1 font-display text-lg font-bold text-text-primary">
        Branch Composite Heatmap
      </h3>
      <p className="mb-4 text-sm text-text-tertiary">
        Hover over a composite to see which subtests feed it, or hover a subtest to see every composite it affects.
      </p>

      {/* Branch tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {BRANCH_ORDER.map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveBranch(key);
              setHoveredComposite(null);
              setHoveredSubtest(null);
            }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeBranch === key
                ? "bg-accent text-white"
                : "bg-navy text-text-secondary hover:text-text-primary"
            }`}
          >
            {BRANCH_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="pb-2 pr-2 text-left font-medium text-text-tertiary">Composite</th>
              {ALL_SUBTESTS.map((st) => (
                <th
                  key={st}
                  className={`cursor-pointer pb-2 text-center font-semibold transition-colors ${
                    isSubtestActive(st) ? "text-accent" : "text-text-secondary"
                  }`}
                  onMouseEnter={() => setHoveredSubtest(st)}
                  onMouseLeave={() => setHoveredSubtest(null)}
                >
                  {st}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {composites.map((comp) => (
              <tr
                key={comp.name}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredComposite(comp.name)}
                onMouseLeave={() => setHoveredComposite(null)}
              >
                <td
                  className={`whitespace-nowrap py-1.5 pr-2 font-mono font-bold transition-colors ${
                    isCompositeActive(comp.name) ? "text-accent" : "text-text-secondary"
                  }`}
                  title={comp.note}
                >
                  {comp.name}
                  <span className="ml-1.5 font-sans text-[10px] font-normal text-text-tertiary">
                    {comp.note}
                  </span>
                </td>
                {ALL_SUBTESTS.map((st) => {
                  const included = comp.subtests.includes(st);
                  const active = isCompositeActive(comp.name) || isSubtestActive(st);
                  return (
                    <td key={st} className="py-1.5 text-center">
                      <div
                        className={`mx-auto h-6 w-6 rounded transition-all duration-150 ${
                          included
                            ? active
                              ? "bg-accent shadow-[0_0_8px_var(--color-accent-glow)]"
                              : "bg-accent/40"
                            : "bg-navy"
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hover info */}
      {hoveredComposite && (
        <div className="mt-3 rounded-lg bg-navy px-3 py-2 text-xs text-text-secondary">
          <span className="font-mono font-bold text-accent">{hoveredComposite}</span>
          {" = "}
          {composites
            .find((c) => c.name === hoveredComposite)
            ?.subtests.map((s, i) => (
              <span key={s}>
                {i > 0 && " + "}
                <span className="font-semibold text-text-primary">{s}</span>
              </span>
            ))}
        </div>
      )}
      {hoveredSubtest && !hoveredComposite && (
        <div className="mt-3 rounded-lg bg-navy px-3 py-2 text-xs text-text-secondary">
          <span className="font-semibold text-text-primary">{hoveredSubtest}</span>
          {" "}({SUBTEST_NAMES[hoveredSubtest]}) feeds:{" "}
          {composites
            .filter((c) => c.subtests.includes(hoveredSubtest))
            .map((c, i) => (
              <span key={c.name}>
                {i > 0 && ", "}
                <span className="font-mono font-bold text-accent">{c.name}</span>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
