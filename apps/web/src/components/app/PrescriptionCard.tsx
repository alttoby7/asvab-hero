"use client";

/**
 * WS4, "Today's prescription" card.
 *
 * Renders the output of getTrajectoryPrescription() (src/lib/account/next-action.ts):
 * the single highest-leverage action for today, clear due mistakes, take a
 * diagnostic to establish standing, or drill the weakest AFQT subtest. Works
 * with sparse data and never emits a point delta or a fabricated score.
 */

import Link from "next/link";
import type { Prescription } from "@/lib/account/next-action";

const KIND_EYEBROW: Record<Prescription["kind"], string> = {
  review_mistakes: "Closed the loop",
  take_diagnostic: "First, get your baseline",
  drill_subtest: "Highest-leverage drill",
  adaptive_block: "Score-moving core",
};

interface PrescriptionCardProps {
  prescription: Prescription;
}

export default function PrescriptionCard({
  prescription,
}: PrescriptionCardProps) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Today&apos;s prescription
        </span>
        {prescription.urgent && (
          <span className="rounded-full border border-danger/40 bg-danger-dim px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger">
            Test soon
          </span>
        )}
      </div>

      <div className="mt-1 text-[11px] uppercase tracking-wide text-text-tertiary">
        {KIND_EYEBROW[prescription.kind]}
      </div>

      <h2 className="mt-1 font-display text-xl font-bold text-text-primary">
        {prescription.headline}
      </h2>
      <p className="mt-2 text-sm text-text-secondary">{prescription.body}</p>

      <Link
        href={prescription.ctaHref}
        className="mt-4 inline-flex rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
      >
        {prescription.ctaLabel}
      </Link>
    </div>
  );
}
