"use client";

import Link from "next/link";

interface QuickActionsProps {
  flashcardDueCount: number;
  /** Lifetime miss count — fallback label when the closed loop is disabled. */
  mistakeCount: number;
  /** Reviews due now in the Spaced Mistake Bank (closed loop). */
  dueMistakeCount: number;
  /** Build-time flag: when on, Mistakes routes to the free review surface. */
  closedLoopEnabled: boolean;
  isPro: boolean;
}

export default function QuickActions({
  flashcardDueCount,
  mistakeCount,
  dueMistakeCount,
  closedLoopEnabled,
  isPro,
}: QuickActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Link
        href="/app/flashcards"
        className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center no-underline transition-colors hover:bg-white/5"
      >
        <div className="text-lg font-bold text-accent">
          {flashcardDueCount > 0 ? flashcardDueCount : "✓"}
        </div>
        <div className="mt-1 text-xs text-text-tertiary">
          {flashcardDueCount > 0 ? "Cards due" : "Cards clear"}
        </div>
      </Link>

      {closedLoopEnabled ? (
        // Free for everyone — reviewing your own mistakes is the core loop.
        <Link
          href="/app/mistakes"
          className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center no-underline transition-colors hover:bg-white/5"
        >
          <div className="text-lg font-bold text-accent">
            {dueMistakeCount > 0 ? dueMistakeCount : "✓"}
          </div>
          <div className="mt-1 text-xs text-text-tertiary">
            {dueMistakeCount > 0 ? "Mistakes due" : "Mistakes clear"}
          </div>
        </Link>
      ) : (
        <Link
          href={isPro ? "/account/history" : "/upgrade?from=mistakes"}
          className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center no-underline transition-colors hover:bg-white/5"
        >
          <div className="text-lg font-bold text-accent">
            {mistakeCount > 0 ? mistakeCount : "—"}
          </div>
          <div className="mt-1 text-xs text-text-tertiary">
            Mistakes
            {!isPro && (
              <span className="ml-1 text-[9px] text-text-tertiary">Pro</span>
            )}
          </div>
        </Link>
      )}

      <Link
        href={isPro ? "/account/history" : "/upgrade?from=history"}
        className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center no-underline transition-colors hover:bg-white/5"
      >
        <div className="text-lg font-bold text-text-secondary">↗</div>
        <div className="mt-1 text-xs text-text-tertiary">
          History
          {!isPro && (
            <span className="ml-1 text-[9px] text-text-tertiary">Pro</span>
          )}
        </div>
      </Link>
    </div>
  );
}
