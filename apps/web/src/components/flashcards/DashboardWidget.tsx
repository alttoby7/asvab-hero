"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { loadDeckSummaries } from "@/lib/flashcards/queries";
import { FREE_DECK_SLUG, type DeckSummary } from "@/lib/flashcards/types";
import { flashcardsHref } from "@/lib/routes";

export default function FlashcardsDashboardWidget() {
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();
  const [summaries, setSummaries] = useState<DeckSummary[] | null>(null);

  useEffect(() => {
    if (sessionLoading) return;
    let cancelled = false;
    loadDeckSummaries(session?.user.id ?? null)
      .then((data) => {
        if (!cancelled) setSummaries(data);
      })
      .catch(() => {
        if (!cancelled) setSummaries([]);
      });
    return () => {
      cancelled = true;
    };
  }, [session, sessionLoading]);

  const loading = sessionLoading || entLoading || summaries === null;

  if (loading) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <div className="h-5 w-32 animate-pulse rounded bg-navy" />
        <div className="mt-3 h-4 w-48 animate-pulse rounded bg-navy" />
      </div>
    );
  }

  const isPro = entitlement.isPro;
  const accessibleDecks = isPro
    ? summaries!
    : summaries!.filter((s) => s.deck.slug === FREE_DECK_SLUG);

  const totalDue = accessibleDecks.reduce((sum, s) => sum + s.due, 0);
  const totalCards = accessibleDecks.reduce((sum, s) => sum + s.total, 0);
  const queueColor =
    totalDue === 0
      ? "bg-success"
      : totalDue <= 20
        ? "bg-success"
        : totalDue <= 50
          ? "bg-almost"
          : "bg-danger";
  const fillPct = totalCards === 0 ? 0 : Math.min(100, (totalDue / totalCards) * 100);

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-semibold text-text-primary">Flashcards</h2>
            {!isPro && (
              <span className="rounded-full border border-success-dim bg-success-dim px-2 py-0.5 text-[10px] font-semibold text-success">
                FREE DECK
              </span>
            )}
          </div>
          {totalDue > 0 ? (
            <p className="mt-1 text-sm text-text-secondary">
              <strong className="text-text-primary">{totalDue}</strong> card
              {totalDue === 1 ? "" : "s"} due
              {isPro
                ? ` across ${accessibleDecks.filter((s) => s.due > 0).length} deck${accessibleDecks.filter((s) => s.due > 0).length === 1 ? "" : "s"}`
                : ""}
            </p>
          ) : (
            <p className="mt-1 text-sm text-text-secondary">
              {totalCards === 0
                ? "Get started with your first deck."
                : "All caught up. New cards waiting when you're ready."}
            </p>
          )}
        </div>
        <Link
          href={flashcardsHref(!!session)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          {totalDue > 0 ? "Review now" : "Browse decks"}
        </Link>
      </div>

      {totalCards > 0 && (
        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy">
            <div
              className={`h-full ${queueColor} transition-all`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-text-tertiary">
            <span>{totalDue} due</span>
            <span>{totalCards} total</span>
          </div>
        </div>
      )}

      {!isPro && (
        <div className="mt-4 border-t border-navy-border pt-4">
          <p className="text-xs text-text-tertiary">
            Free plan: 1 of 6 decks.{" "}
            <Link
              href="/upgrade?from=flashcards-widget"
              className="text-accent underline hover:text-accent-hover"
            >
              Unlock all decks with Pro →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
