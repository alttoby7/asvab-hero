"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { SubtestScores } from "@/types";
import {
  calculateAFQT,
  getAFQTCategory,
  getAFQTCategoryDescription,
} from "@/lib/score-calculator";
import { trackEvent } from "@/lib/analytics";

/**
 * ASVAB Score Converter, converts standard subtest scores into the three
 * derived numbers people actually care about: AFQT percentile, VE (verbal
 * expression), and GT line score (Army formula). Other branches use the same
 * raw inputs but bundle them differently into composites, those live on
 * dedicated branch pages.
 */

const DEFAULT_SCORES: SubtestScores = {
  GS: 50,
  AR: 50,
  WK: 50,
  PC: 50,
  MK: 50,
  EI: 50,
  AS: 50,
  MC: 50,
  AO: 50,
};

const BRANCH_FLOORS = [
  { branch: "Army", afqt: 31 },
  { branch: "Marine Corps", afqt: 32 },
  { branch: "Navy", afqt: 35 },
  { branch: "Air Force", afqt: 36 },
  { branch: "Space Force", afqt: 36 },
  { branch: "Coast Guard", afqt: 32 },
] as const;

type FieldKey = "AR" | "WK" | "PC" | "MK";

const FIELDS: Array<{ key: FieldKey; label: string; help: string }> = [
  {
    key: "AR",
    label: "Arithmetic Reasoning (AR)",
    help: "Math word problems",
  },
  {
    key: "WK",
    label: "Word Knowledge (WK)",
    help: "Vocabulary, doubles into VE",
  },
  {
    key: "PC",
    label: "Paragraph Comprehension (PC)",
    help: "Short reading passages, doubles into VE",
  },
  {
    key: "MK",
    label: "Mathematics Knowledge (MK)",
    help: "Algebra, geometry, number theory",
  },
];

export default function AsvabScoreConverter() {
  const [scores, setScores] = useState<SubtestScores>(DEFAULT_SCORES);

  const handleChange = (key: FieldKey, raw: string) => {
    const num = parseInt(raw, 10);
    if (raw === "") {
      setScores((prev) => ({ ...prev, [key]: 0 }));
      return;
    }
    if (isNaN(num)) return;
    const clamped = Math.min(99, Math.max(0, num));
    setScores((prev) => ({ ...prev, [key]: clamped }));
    trackEvent("score_converter_input", { subtest: key, value: clamped });
  };

  const ve = useMemo(() => scores.WK + scores.PC, [scores.WK, scores.PC]);
  const gtArmy = useMemo(() => scores.AR + ve, [scores.AR, ve]);
  const rawAfqt = useMemo(
    () => 2 * ve + scores.AR + scores.MK,
    [ve, scores.AR, scores.MK],
  );
  const afqt = useMemo(() => calculateAFQT(scores), [scores]);
  const category = useMemo(() => getAFQTCategory(afqt), [afqt]);
  const categoryDesc = useMemo(
    () => getAFQTCategoryDescription(category),
    [category],
  );

  const qualifies = BRANCH_FLOORS.filter((b) => afqt >= b.afqt);

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light p-6">
      <h2 className="font-display text-xl font-bold text-text-primary">
        Convert your ASVAB scores
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        Enter your four AFQT subtest standard scores (20 to 99). The converter
        computes VE, raw AFQT, AFQT percentile, DoD category, Army GT, and
        which branches you clear.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="font-mono text-sm font-bold text-accent">
              {f.label}
            </span>
            <input
              type="number"
              min={0}
              max={99}
              value={scores[f.key] || ""}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="mt-1 w-full rounded-md border border-navy-border bg-navy px-3 py-2 font-mono text-base text-text-primary focus:border-accent focus:outline-none"
            />
            <span className="mt-1 block text-xs text-text-tertiary">
              {f.help}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="VE (WK + PC)" value={String(ve)} />
        <Stat label="Raw AFQT" value={String(rawAfqt)} subhead="2VE + AR + MK" />
        <Stat
          label="AFQT Percentile"
          value={String(afqt)}
          subhead={`Category ${category}`}
          highlight
        />
        <Stat label="Army GT" value={String(gtArmy)} subhead="AR + VE" />
      </div>

      <p className="mt-4 text-sm text-text-secondary">{categoryDesc}.</p>

      <div className="mt-6 rounded-lg border border-accent/30 bg-navy p-4">
        <h3 className="font-display text-base font-bold text-text-primary">
          Branches you qualify for (diploma track, AFQT only)
        </h3>
        {qualifies.length === 0 ? (
          <p className="mt-2 text-sm text-text-secondary">
            Your AFQT is below every branch floor. Lowest cut is Army at 31.
          </p>
        ) : (
          <ul className="mt-2 grid gap-1 text-sm text-text-primary sm:grid-cols-2">
            {qualifies.map((b) => (
              <li key={b.branch} className="font-mono">
                {b.branch} <span className="text-text-tertiary">(min {b.afqt})</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-text-tertiary">
          Specific MOS, AFSC, and rate cuts use composite line scores, not
          AFQT. Use the{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            full ASVAB calculator
          </Link>{" "}
          to map your scores to specific jobs.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  subhead,
  highlight,
}: {
  label: string;
  value: string;
  subhead?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-accent/50 bg-navy"
          : "border-navy-border bg-navy"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-wide text-text-tertiary">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-2xl font-bold ${
          highlight ? "text-accent" : "text-text-primary"
        }`}
      >
        {value}
      </p>
      {subhead && (
        <p className="mt-1 text-xs text-text-secondary">{subhead}</p>
      )}
    </div>
  );
}
