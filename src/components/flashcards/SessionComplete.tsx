"use client";

import Link from "next/link";
import type { Deck, GradeButton } from "@/lib/flashcards/types";

interface Props {
  deck: Deck;
  stats: Record<GradeButton, number>;
  total: number;
}

export default function SessionComplete({ deck, stats, total }: Props) {
  const correct = stats.good + stats.easy;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div
      className="rounded-3xl border border-navy-border bg-navy-light p-8 text-center"
      style={{ animation: "fadeIn 0.35s ease-out" }}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-dim">
        <svg
          className="h-7 w-7 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-display text-2xl font-bold text-text-primary">Session complete</h1>
      <p className="mt-2 text-sm text-text-secondary">
        {deck.title.replace(/^.+? — /, "")}
      </p>

      <dl className="mt-6 grid grid-cols-3 gap-3 text-left">
        <div className="rounded-xl border border-navy-border bg-navy p-4">
          <dt className="text-xs uppercase tracking-wide text-text-tertiary">Reviewed</dt>
          <dd className="mt-1 font-display text-2xl font-bold text-text-primary">{total}</dd>
        </div>
        <div className="rounded-xl border border-navy-border bg-navy p-4">
          <dt className="text-xs uppercase tracking-wide text-text-tertiary">Accuracy</dt>
          <dd className="mt-1 font-display text-2xl font-bold text-text-primary">{accuracy}%</dd>
        </div>
        <div className="rounded-xl border border-navy-border bg-navy p-4">
          <dt className="text-xs uppercase tracking-wide text-text-tertiary">Lapses</dt>
          <dd className="mt-1 font-display text-2xl font-bold text-text-primary">{stats.again}</dd>
        </div>
      </dl>

      <div className="mt-4 grid grid-cols-4 gap-1 text-xs text-text-tertiary">
        <span>Again {stats.again}</span>
        <span>Hard {stats.hard}</span>
        <span>Good {stats.good}</span>
        <span>Easy {stats.easy}</span>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/flashcards"
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
        >
          Back to flashcards
        </Link>
        <Link
          href="/account"
          className="rounded-xl border border-navy-border bg-navy px-5 py-2.5 text-sm font-semibold text-text-secondary no-underline hover:text-text-primary"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
