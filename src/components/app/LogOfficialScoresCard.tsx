"use client";

/**
 * Dashboard card prompting the user to log their OFFICIAL ASVAB scores.
 * Shows whenever no real official AFQT is on record (gated on actual presence,
 * not the profile status string — an incomplete test row must NOT suppress it),
 * and turns into a stronger "did you take your test?" prompt once the user's
 * target test date has passed. Uses the shared OfficialScoreForm.
 */

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import OfficialScoreForm, { type ExamKind } from "@/components/score/OfficialScoreForm";

export default function LogOfficialScoresCard({
  hasOfficialAfqt,
  targetTestDate,
  testType,
  onLogged,
}: {
  hasOfficialAfqt: boolean;
  targetTestDate: string | null;
  testType: string | null;
  onLogged?: () => void;
}) {
  const [open, setOpen] = useState(false);

  // A real official AFQT is on record → nothing to prompt.
  if (hasOfficialAfqt) return null;

  const testDatePassed =
    !!targetTestDate && new Date(targetTestDate) < new Date();

  const heading = testDatePassed
    ? "Did you take your test? Log your official scores"
    : "Already have official ASVAB scores?";
  const blurb = testDatePassed
    ? "Add your real results so we can track your progress and time your retake correctly."
    : "Log your real scores to set your starting point — we'll chart your progress against them and handle retake timing.";

  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-dim/40 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">
            {heading}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{blurb}</p>
        </div>
        {!open && (
          <button
            onClick={() => {
              setOpen(true);
              trackEvent("official_score_card_open", {
                test_date_passed: testDatePassed,
              });
            }}
            className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Log scores
          </button>
        )}
      </div>

      {open && (
        <div className="mt-4">
          <OfficialScoreForm
            context="dashboard"
            defaultExamKind={
              (testType === "afct" ? "afct" : "initial_asvab") as ExamKind
            }
            submitLabel="Save my scores"
            onSaved={() => {
              setOpen(false);
              trackEvent("official_test_logged", { source: "dashboard_card" });
              onLogged?.();
            }}
            onCancel={() => setOpen(false)}
          />
        </div>
      )}

      {!open && (
        <Link
          href="/app/retake"
          className="mt-3 inline-block text-sm text-accent no-underline transition-colors hover:text-accent-hover"
        >
          Add previous tests / see retake timing →
        </Link>
      )}
    </div>
  );
}
