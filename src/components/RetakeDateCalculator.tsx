"use client";

import { useMemo, useState } from "react";
import type { Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";
import {
  checkEligibility,
  formatRetakeDate,
  type RetakeNumber,
} from "@/lib/retake-eligibility";

const BRANCH_OPTIONS: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

function todayIsoDate(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export default function RetakeDateCalculator() {
  const [lastTestDate, setLastTestDate] = useState<string>(todayIsoDate());
  const [retakeNumber, setRetakeNumber] = useState<RetakeNumber>(1);
  const [branch, setBranch] = useState<Branch | "">("");
  const [inDep, setInDep] = useState(false);
  const [previousAfqt, setPreviousAfqt] = useState<string>("");
  const [targetAfqt, setTargetAfqt] = useState<string>("");

  const result = useMemo(() => {
    if (!lastTestDate) return null;
    const parsed = new Date(lastTestDate + "T00:00:00");
    if (isNaN(parsed.getTime())) return null;
    const prev = previousAfqt ? parseInt(previousAfqt, 10) : undefined;
    const target = targetAfqt ? parseInt(targetAfqt, 10) : undefined;
    return checkEligibility({
      lastTestDate: parsed,
      retakeNumber,
      previousAfqt: prev && !isNaN(prev) ? prev : undefined,
      targetAfqt: target && !isNaN(target) ? target : undefined,
      branch: branch || undefined,
      inDep,
    });
  }, [lastTestDate, retakeNumber, previousAfqt, targetAfqt, branch, inDep]);

  const isEligibleNow = result && result.daysFromToday <= 0;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
          Your Retest Info
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-text-secondary">
              Last test date
            </span>
            <input
              type="date"
              value={lastTestDate}
              max={todayIsoDate()}
              onChange={(e) => setLastTestDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-navy-border bg-navy px-3 py-2 text-text-primary outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-text-secondary">
              Which retest is this?
            </span>
            <select
              value={retakeNumber}
              onChange={(e) =>
                setRetakeNumber(Number(e.target.value) as RetakeNumber)
              }
              className="mt-1 block w-full rounded-md border border-navy-border bg-navy px-3 py-2 text-text-primary outline-none focus:border-accent"
            >
              <option value={1}>1st retest (after initial ASVAB)</option>
              <option value={2}>2nd retest</option>
              <option value={3}>3rd retest or later</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-text-secondary">
              Branch (optional)
            </span>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as Branch | "")}
              className="mt-1 block w-full rounded-md border border-navy-border bg-navy px-3 py-2 text-text-primary outline-none focus:border-accent"
            >
              <option value="">Not sure / multiple</option>
              {BRANCH_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {BRANCH_NAMES[b]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              checked={inDep}
              onChange={(e) => setInDep(e.target.checked)}
              className="h-4 w-4 rounded border-navy-border bg-navy text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-secondary">
              I&apos;m already in DEP (Delayed Entry Program)
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-text-secondary">
              Previous AFQT (optional)
            </span>
            <input
              type="number"
              min={1}
              max={99}
              placeholder="e.g. 45"
              value={previousAfqt}
              onChange={(e) => setPreviousAfqt(e.target.value)}
              className="mt-1 block w-full rounded-md border border-navy-border bg-navy px-3 py-2 text-text-primary outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-text-secondary">
              Target AFQT (optional)
            </span>
            <input
              type="number"
              min={1}
              max={99}
              placeholder="e.g. 70"
              value={targetAfqt}
              onChange={(e) => setTargetAfqt(e.target.value)}
              className="mt-1 block w-full rounded-md border border-navy-border bg-navy px-3 py-2 text-text-primary outline-none focus:border-accent"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-text-tertiary">
          Enter previous + target AFQT to check if your retest would trigger
          the Confirmation Test.
        </p>
      </section>

      {result && (
        <section className="rounded-xl border border-accent/40 bg-navy-light p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
            Your Earliest Retest Date
          </h2>

          <div className="flex flex-wrap items-baseline gap-4">
            <div>
              <div className="font-mono text-2xl font-bold text-accent">
                {formatRetakeDate(result.earliestRetakeDate)}
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                {isEligibleNow
                  ? "You're eligible to retest now."
                  : `${result.daysFromToday} ${result.daysFromToday === 1 ? "day" : "days"} from today`}
              </div>
            </div>
            <div className="rounded-md bg-accent-dim px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Wait: {result.waitLabel}
            </div>
          </div>

          <p className="mt-4 text-sm text-text-secondary">
            {result.ruleExplanation}
          </p>

          {result.cTestWarning && (
            <div className="mt-4 rounded-lg border border-almost/40 bg-almost-dim p-4">
              <div className="text-sm font-semibold text-almost">
                Confirmation Test alert
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                {result.cTestWarning}
              </p>
            </div>
          )}

          {result.depWarning && (
            <div className="mt-4 rounded-lg border border-navy-border bg-navy p-4">
              <div className="text-sm font-semibold text-text-primary">
                DEP retest note
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                {result.depWarning}
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-text-tertiary">
            Based on the official 1/1/6 ASVAB retest policy. Your recruiter
            schedules the actual retest through MEPS — bring this date to your
            next meeting.
          </p>
        </section>
      )}
    </div>
  );
}
