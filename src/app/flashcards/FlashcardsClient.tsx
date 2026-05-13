"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { loadDeckSummaries } from "@/lib/flashcards/queries";
import {
  FREE_DECK_SLUG,
  SUBTEST_LABELS,
  subtestForTopic,
  type DeckSummary,
} from "@/lib/flashcards/types";
import DeckCard from "@/components/flashcards/DeckCard";

export default function FlashcardsClient() {
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();
  const [summaries, setSummaries] = useState<DeckSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionLoading) return;
    let cancelled = false;
    loadDeckSummaries(session?.user.id ?? null)
      .then((data) => {
        if (!cancelled) setSummaries(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load decks");
      });
    return () => {
      cancelled = true;
    };
  }, [session, sessionLoading]);

  const isAuthed = !!session;
  const isPro = entitlement.isPro;
  const loading = sessionLoading || entLoading || summaries === null;

  if (error) {
    return (
      <div className="rounded-2xl border border-danger-dim bg-navy-light p-6 text-center">
        <p className="text-text-secondary">Couldn&apos;t load decks: {error}</p>
      </div>
    );
  }

  if (loading) {
    return <SkeletonGrid />;
  }

  const totalDue = summaries!.reduce((sum, s) => sum + s.due, 0);
  const totalCards = summaries!.reduce((sum, s) => sum + s.total, 0);

  const grouped = new Map<string, DeckSummary[]>();
  for (const s of summaries!) {
    const subtest = subtestForTopic(s.deck.topic_id);
    const arr = grouped.get(subtest) ?? [];
    arr.push(s);
    grouped.set(subtest, arr);
  }
  const subtests = Array.from(grouped.keys()).sort();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Flashcards
        </h1>
        <p className="text-text-secondary">
          Spaced-repetition decks for the highest-yield ASVAB topics. Cards you miss come back
          sooner; cards you nail get pushed out.
        </p>
        {isAuthed ? (
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-navy-border bg-navy-light px-3 py-1 text-text-secondary">
              <strong className="text-text-primary">{totalDue}</strong> due
            </span>
            <span className="rounded-full border border-navy-border bg-navy-light px-3 py-1 text-text-secondary">
              <strong className="text-text-primary">{totalCards}</strong> total cards
            </span>
            {!isPro && (
              <span className="rounded-full border border-accent-dim bg-accent-dim px-3 py-1 text-accent">
                Free plan — 1 of 6 decks unlocked
              </span>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-navy-border bg-navy-light p-4 text-sm text-text-secondary">
            <Link href="/signup" className="text-accent underline">
              Create a free account
            </Link>{" "}
            to start tracking your reviews. Your progress syncs across devices.
          </div>
        )}
      </header>

      {subtests.map((subtest) => {
        const list = grouped.get(subtest)!;
        return (
          <section key={subtest} className="space-y-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-text-tertiary">
              {SUBTEST_LABELS[subtest] ?? subtest}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((summary) => {
                const isLocked =
                  isAuthed && !isPro && summary.deck.slug !== FREE_DECK_SLUG;
                const isFreeDeck = summary.deck.slug === FREE_DECK_SLUG;
                return (
                  <DeckCard
                    key={summary.deck.id}
                    summary={summary}
                    locked={isLocked}
                    isFreeDeck={isFreeDeck}
                    requiresAuth={!isAuthed}
                  />
                );
              })}
            </div>
          </section>
        );
      })}

      {!isPro && isAuthed && (
        <div className="rounded-2xl border border-accent-dim bg-navy-light p-6 text-center">
          <p className="font-display text-lg font-semibold text-text-primary">
            Unlock all 6 decks with Pro
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            $9.99/month or $49.99/year. Cancel anytime.
          </p>
          <Link
            href="/upgrade?from=flashcards"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-navy-light" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-navy-border bg-navy-light"
          />
        ))}
      </div>
    </div>
  );
}
