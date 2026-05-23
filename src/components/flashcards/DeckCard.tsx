"use client";

import Link from "next/link";
import type { DeckSummary } from "@/lib/flashcards/types";
import { flashcardDeckHref } from "@/lib/routes";

interface DeckCardProps {
  summary: DeckSummary;
  locked: boolean;
  isFreeDeck: boolean;
  requiresAuth: boolean;
}

export default function DeckCard({ summary, locked, isFreeDeck, requiresAuth }: DeckCardProps) {
  const { deck, total, due, newCount, learned } = summary;
  const progress = total === 0 ? 0 : Math.min(100, (learned / total) * 100);
  const dueLabel = due === 0 ? "All caught up" : `${due} due`;

  if (locked) {
    return (
      <div className="relative rounded-2xl border border-navy-border bg-navy-light p-5 opacity-75">
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full border border-accent-dim bg-accent-dim px-2.5 py-0.5 text-xs font-medium text-accent">
            <LockIcon /> Pro
          </span>
        </div>
        <h3 className="pr-16 font-display text-base font-semibold text-text-primary">
          {deck.title.replace(/^.+? — /, "")}
        </h3>
        <p className="mt-1 text-xs text-text-tertiary">{total} cards</p>
        {deck.description && (
          <p className="mt-3 text-sm text-text-secondary line-clamp-2">{deck.description}</p>
        )}
        <Link
          href={`/upgrade?from=flashcards-${deck.slug}`}
          className="mt-4 inline-block rounded-lg border border-navy-border bg-navy px-4 py-2 text-sm font-semibold text-text-secondary no-underline transition-colors hover:border-accent hover:text-accent"
        >
          Unlock with Pro
        </Link>
      </div>
    );
  }

  // Members always review inside the app shell; anon users sign up first (and
  // land back in the app shell afterwards).
  const target = flashcardDeckHref(deck.slug, true);
  const href = requiresAuth ? `/signup?next=${encodeURIComponent(target)}` : target;

  return (
    <Link
      href={href}
      className="group relative block rounded-2xl border border-navy-border bg-navy-light p-5 no-underline transition-colors hover:border-accent"
    >
      {isFreeDeck && (
        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-success-dim bg-success-dim px-2.5 py-0.5 text-xs font-medium text-success">
            Free
          </span>
        </div>
      )}
      <h3 className="pr-16 font-display text-base font-semibold text-text-primary">
        {deck.title.replace(/^.+? — /, "")}
      </h3>
      <div className="mt-2 flex items-center gap-3 text-xs text-text-tertiary">
        <span className={due > 0 ? "font-semibold text-accent" : ""}>{dueLabel}</span>
        <span>·</span>
        <span>{newCount} new</span>
        <span>·</span>
        <span>
          {learned}/{total} learned
        </span>
      </div>
      {deck.description && (
        <p className="mt-3 text-sm text-text-secondary line-clamp-2">{deck.description}</p>
      )}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-navy">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-text-tertiary">{Math.round(progress)}% learned</span>
        <span className="font-semibold text-accent transition-transform group-hover:translate-x-0.5">
          {due > 0 || learned === 0 ? "Start →" : "Review →"}
        </span>
      </div>
    </Link>
  );
}

function LockIcon() {
  return (
    <svg
      className="h-3 w-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
      />
    </svg>
  );
}
