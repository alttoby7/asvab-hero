"use client";

import Link from "next/link";
import { useSession } from "@/hooks/useSession";

interface TestBlockedScreenProps {
  reason: string;
  variant: string;
  subtest?: string;
  /** Last attempt ID for the "view your results" link on the free_diagnostic_used reason. */
  lastAttemptId?: string;
}

const HEADLINES: Record<string, string> = {
  free_diagnostic_used: "You've used your free diagnostic",
  anon_diagnostic_used: "You've already taken your free diagnostic",
  pro_only_variant: "This is a Pro feature",
  free_user_no_diagnostic: "Take your free diagnostic first",
};

const SUBTEXTS: Record<string, string> = {
  free_diagnostic_used:
    "Your free account includes one full diagnostic. Upgrade to Pro for unlimited tests, subtest drills, AFQT sprints, and more.",
  anon_diagnostic_used:
    "You already ran your free diagnostic in this browser. Sign up and upgrade to Pro for unlimited tests and progress tracking.",
  pro_only_variant:
    "Subtest drills, AFQT sprints, weakness loops, and full sims are included with Pro. Upgrade to unlock unlimited targeted practice.",
  free_user_no_diagnostic:
    "Start with the free diagnostic to get your baseline score, then upgrade to Pro to drill your weak areas.",
};

export default function TestBlockedScreen({
  reason,
  variant,
  subtest,
  lastAttemptId,
}: TestBlockedScreenProps) {
  const { session } = useSession();
  const isAuthed = !!session;

  const headline = HEADLINES[reason] ?? "This feature requires Pro";
  const subtext = SUBTEXTS[reason] ?? "Upgrade to Pro to unlock this feature.";
  const upgradeHref = `/upgrade?from=${reason}&variant=${variant}${subtest ? `&subtest=${subtest}` : ""}`;
  const backHref = isAuthed ? "/account" : "/";
  const backLabel = isAuthed ? "Back to dashboard" : "Back home";

  return (
    <div
      className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center"
      style={{ animation: "fadeIn 0.35s ease-out" }}
    >
      <div className="mx-auto max-w-sm">
        {/* Lock icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dim">
          <svg
            className="h-8 w-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
            />
          </svg>
        </div>

        <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">
          {headline}
        </h2>
        <p className="mb-8 text-sm text-text-secondary">{subtext}</p>

        <div className="space-y-3">
          <Link
            href={upgradeHref}
            className="block w-full rounded-xl bg-accent px-6 py-3.5 font-display text-base font-bold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
          >
            Upgrade to Pro
          </Link>

          {reason === "free_diagnostic_used" && lastAttemptId && (
            <Link
              href={`/account`}
              className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              View my last results
            </Link>
          )}

          {reason === "free_user_no_diagnostic" && (
            <Link
              href="/practice-test?variant=diagnostic"
              className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              Take my free diagnostic
            </Link>
          )}

          <Link
            href={backHref}
            className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
