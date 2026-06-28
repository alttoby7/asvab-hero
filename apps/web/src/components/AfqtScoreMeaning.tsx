"use client";

/**
 * Interactive "what does my AFQT score mean" module.
 *
 * Single canonical home: /asvab-score-ranges. This is the penalty-safe way to
 * serve the long tail of "[N] asvab score" queries (e.g. "57 asvab score") —
 * ONE interactive URL instead of 100 thin per-integer pages. Shareable via
 * ?afqt=57 (URL is updated in place, no navigation, no index bloat).
 *
 * All scoring logic is reused from lib so it can never drift from the
 * calculator: getAFQTCategory + getAFQTCategoryDescription + BRANCH_MINIMUMS.
 */

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  getAFQTCategory,
  getAFQTCategoryDescription,
} from "@/lib/score-calculator";
import { BRANCH_MINIMUMS } from "@/lib/branch-minimums";

type Band = {
  /** Lower bound (inclusive) of this AFQT band. */
  floor: number;
  label: string;
  meaning: string;
  /** Next threshold to aim for + what it unlocks. null = already at the top. */
  next: { at: number; unlocks: string } | null;
};

// Job-access bands, worded to match the static copy already on the page.
const BANDS: Band[] = [
  {
    floor: 93,
    label: "93–99 · Category I — first pick on everything",
    meaning:
      "You are in the top 7% of test-takers. Every job, bonus, and elite pipeline (cyber, intel, nuclear, special operations) is on the table — subject to the right composite line scores.",
    next: null,
  },
  {
    floor: 65,
    label: "65–92 · Category II — nearly everything",
    meaning:
      "Nearly every MOS, rating, and AFSC is within reach, and you have real leverage with your recruiter on jobs and bonuses. The remaining gatekeepers are specific composite (line) scores, not your AFQT.",
    next: { at: 93, unlocks: "Category I — first pick on the most selective roles" },
  },
  {
    floor: 50,
    label: "50–64 · Category IIIA — jobs and bonuses open up",
    meaning:
      "50 is the real dividing line. You qualify for most jobs across every branch and become eligible for enlistment bonuses. This is the practical target for most enlistees.",
    next: { at: 65, unlocks: "Category II — nearly every job + stronger recruiter leverage" },
  },
  {
    floor: 31,
    label: "31–49 · Category IIIB — the floor",
    meaning:
      "You can enlist in the Army, Navy, Marines, or Coast Guard as a diploma holder, but with limited leverage: fewer jobs, smaller (or no) bonuses, and no Air Force or Space Force eligibility yet.",
    next: { at: 50, unlocks: "Category IIIA — bonuses and most jobs across all branches" },
  },
  {
    floor: 10,
    label: "10–30 · Category IV — rarely eligible",
    meaning:
      "Category IV enlistments are legally capped at 4% of each branch's annual accessions (10 USC 520), so acceptance is rare and usually needs a waiver. Retesting to clear 31 is the practical path.",
    next: { at: 31, unlocks: "Category IIIB — meets the enlistment floor for most branches" },
  },
  {
    floor: 1,
    label: "1–9 · Category V — not eligible",
    meaning:
      "Category V is a permanent disqualifier for enlistment in every branch. A focused retake is the only path forward.",
    next: { at: 31, unlocks: "Category IIIB — the minimum to enlist in most branches" },
  },
];

function bandFor(afqt: number): Band {
  return BANDS.find((b) => afqt >= b.floor) ?? BANDS[BANDS.length - 1];
}

function clampScore(n: number): number {
  if (Number.isNaN(n)) return 50;
  return Math.max(1, Math.min(99, Math.round(n)));
}

function ScoreMeaningInner() {
  const params = useSearchParams();
  const initial = clampScore(Number(params.get("afqt") ?? 50));
  const [afqt, setAfqt] = useState<number>(initial);

  // Keep the URL shareable (?afqt=57) without triggering navigation or a new
  // indexable URL — replaceState only, on the client.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("afqt", String(afqt));
    window.history.replaceState(null, "", url.toString());
  }, [afqt]);

  const category = useMemo(() => getAFQTCategory(afqt), [afqt]);
  const categoryDesc = useMemo(
    () => getAFQTCategoryDescription(category),
    [category],
  );
  const band = useMemo(() => bandFor(afqt), [afqt]);

  const eligibility = useMemo(
    () =>
      BRANCH_MINIMUMS.map((b) => ({
        branch: b.branch,
        eligible: afqt >= b.min,
        min: b.min,
        practicalMin: b.practicalMin,
      })),
    [afqt],
  );
  const eligibleCount = eligibility.filter((e) => e.eligible).length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <label
        htmlFor="afqt-score-input"
        className="block font-display text-lg font-bold text-text-primary"
      >
        What does your AFQT score mean?
      </label>
      <p className="mt-1 text-sm text-text-secondary">
        Enter any AFQT score (1–99) to see your category, which branches you
        qualify for, and what to aim for next.
      </p>

      <div className="mt-4 flex items-center gap-4">
        <input
          id="afqt-score-input"
          type="range"
          min={1}
          max={99}
          value={afqt}
          onChange={(e) => setAfqt(clampScore(Number(e.target.value)))}
          className="h-2 flex-1 cursor-pointer accent-accent"
          aria-label="AFQT score"
        />
        <input
          type="number"
          min={1}
          max={99}
          value={afqt}
          onChange={(e) => setAfqt(clampScore(Number(e.target.value)))}
          className="w-20 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-center font-mono text-lg font-bold text-text-primary"
          aria-label="AFQT score (number)"
        />
      </div>

      {/* Result */}
      <div className="mt-5 space-y-4">
        <div>
          <p className="font-mono text-sm font-bold text-accent">
            AFQT {afqt} = Category {category}
          </p>
          <p className="mt-1 text-text-primary">{categoryDesc}.</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <p className="font-mono text-sm font-bold text-text-primary">
            {band.label}
          </p>
          <p className="mt-1 text-sm text-text-secondary">{band.meaning}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-text-primary">
            Branch eligibility (diploma track):{" "}
            <span className="text-accent">
              {eligibleCount} of {eligibility.length}
            </span>
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {eligibility.map((e) => (
              <li
                key={e.branch}
                className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs ${
                  e.eligible
                    ? "border-emerald-500/30 text-emerald-300"
                    : "border-red-500/30 text-red-300/80"
                }`}
              >
                <span aria-hidden>{e.eligible ? "✓" : "✕"}</span>
                <span className="text-text-secondary">{e.branch}</span>
                <span className="ml-auto font-mono">{e.min}</span>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-xs text-text-secondary">
            Numbers are the official diploma-track AFQT floor. GED holders face a
            50+ floor (65+ for Air Force / Space Force). These are minimums, not
            targets — the average enlistee scores 55–65.
          </p>
        </div>

        {band.next ? (
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
            <p className="text-sm font-semibold text-text-primary">
              Aim for {band.next.at}+ next
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Reaching {band.next.at} moves you into {band.next.unlocks}. Because
              Verbal (VE) is doubled in the AFQT formula, Word Knowledge and
              Paragraph Comprehension gains count twice — the fastest way up a
              tier.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link href="/practice-test" className="font-semibold text-accent hover:underline">
                Take a practice test →
              </Link>
              <Link href="/asvab-study-guide" className="font-semibold text-accent hover:underline">
                See the study plan →
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
            <p className="text-sm font-semibold text-text-primary">
              You&apos;re at the top tier.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              99 is the AFQT ceiling (it&apos;s a percentile, not a raw score).
              From here, your specific composite (line) scores decide which elite
              jobs you qualify for.{" "}
              <Link href="/calculator" className="font-semibold text-accent hover:underline">
                Check your line scores →
              </Link>
            </p>
          </div>
        )}

        <p className="text-xs text-text-secondary">
          Want the full picture? Plug all 9 subtest scores into the{" "}
          <Link href="/calculator" className="text-accent hover:underline">
            free ASVAB calculator
          </Link>{" "}
          to see every job you qualify for across all 6 branches.
        </p>
      </div>
    </div>
  );
}

export default function AfqtScoreMeaning() {
  // useSearchParams requires a Suspense boundary in the App Router.
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-text-secondary">
          Loading the score-meaning tool…
        </div>
      }
    >
      <ScoreMeaningInner />
    </Suspense>
  );
}
