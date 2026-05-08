"use client";

import Link from "next/link";
import { getNextAction } from "@/lib/account/next-action";

type Props = {
  daysRemaining: number;
  hasInProgress: boolean;
  hasAttempts: boolean;
  weakestTopicTitle: string | null;
  weakestSubtest: string | null;
};

export function TrialBanner({ daysRemaining, hasInProgress, hasAttempts, weakestTopicTitle, weakestSubtest }: Props) {
  const action = getNextAction({ hasInProgress, hasAttempts, weakestTopicTitle, weakestSubtest });
  const dayLabel = daysRemaining === 1 ? "1 day" : `${daysRemaining} days`;

  return (
    <div className="rounded-2xl border border-accent/40 bg-accent-dim/40 p-5 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
              <circle cx="8" cy="8" r="6.5" />
              <path strokeLinecap="round" d="M8 4.5v3.5l2.5 1.5" />
            </svg>
            Trial
          </span>
          <p className="font-semibold text-text-primary">
            {dayLabel} left in your trial
          </p>
        </div>
        <p className="mt-1.5 text-sm text-text-secondary">
          {action.sublabel ?? "Make Pro work for you while it's free."}
        </p>
      </div>
      <Link
        href={action.href}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline whitespace-nowrap"
      >
        {action.label}
      </Link>
    </div>
  );
}
