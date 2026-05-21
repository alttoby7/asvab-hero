"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { canReviewDeck } from "@/lib/flashcards/gate";
import { loadDeckBySlug, loadDueCards } from "@/lib/flashcards/queries";
import type { CardWithReview, Deck } from "@/lib/flashcards/types";
import ReviewEngine from "@/components/flashcards/ReviewEngine";

interface Props {
  deckSlug: string;
}

export default function ReviewEngineClient({ deckSlug }: Props) {
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();
  const [deck, setDeck] = useState<Deck | null | undefined>(undefined);
  const [cards, setCards] = useState<CardWithReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionLoading || entLoading) return;
    let cancelled = false;
    (async () => {
      try {
        const d = await loadDeckBySlug(deckSlug);
        if (cancelled) return;
        setDeck(d);
        if (!d) return;
        const isAuthed = !!session;
        const isPro = entitlement.isPro;
        const decision = canReviewDeck({ deckSlug, isAuthed, isPro });
        if (!decision.allowed) return;
        const due = await loadDueCards({
          userId: session?.user.id ?? null,
          deckId: d.id,
          limit: 20,
        });
        if (!cancelled) setCards(due);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load deck");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [deckSlug, session, entitlement.isPro, sessionLoading, entLoading]);

  if (sessionLoading || entLoading || deck === undefined) {
    return <SkeletonCard />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-danger-dim bg-navy-light p-6 text-center">
        <p className="text-text-secondary">Couldn&apos;t load deck: {error}</p>
        <Link href="/flashcards" className="mt-4 inline-block text-accent underline">
          Back to flashcards
        </Link>
      </div>
    );
  }

  if (deck === null) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-text-primary">Deck not found</h1>
        <p className="mt-2 text-text-secondary">
          The deck &ldquo;{deckSlug}&rdquo; doesn&apos;t exist or has been deactivated.
        </p>
        <Link
          href="/flashcards"
          className="mt-6 inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
        >
          Browse decks
        </Link>
      </div>
    );
  }

  const isAuthed = !!session;
  const decision = canReviewDeck({ deckSlug, isAuthed, isPro: entitlement.isPro });

  if (!decision.allowed) {
    return <BlockedScreen reason={decision.reason} deckSlug={deckSlug} />;
  }

  if (cards === null) {
    return <SkeletonCard />;
  }

  if (cards.length === 0) {
    return <CaughtUpScreen deck={deck} />;
  }

  return <ReviewEngine deck={deck} initialCards={cards} />;
}

function SkeletonCard() {
  return (
    <div className="space-y-4">
      <div className="h-4 w-32 animate-pulse rounded bg-navy-light" />
      <div className="h-72 animate-pulse rounded-3xl border border-navy-border bg-navy-light" />
    </div>
  );
}

function CaughtUpScreen({ deck }: { deck: Deck }) {
  return (
    <div className="rounded-3xl border border-navy-border bg-navy-light p-8 text-center">
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
      <h1 className="font-display text-2xl font-bold text-text-primary">All caught up</h1>
      <p className="mt-2 text-sm text-text-secondary">
        No cards due in <span className="font-semibold">{deck.title}</span> right now. Your next
        review will surface automatically when cards become due.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/flashcards"
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
        >
          Browse other decks
        </Link>
        <Link
          href="/account"
          className="rounded-xl border border-navy-border bg-navy px-5 py-2.5 text-sm font-semibold text-text-secondary no-underline hover:text-text-primary"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

function BlockedScreen({
  reason,
  deckSlug,
}: {
  reason: "pro_only_deck" | "auth_required";
  deckSlug: string;
}) {
  const isAuth = reason === "auth_required";
  const headline = isAuth ? "Sign in to start reviewing" : "This deck is part of Pro";
  const subtext = isAuth
    ? "Create a free account to track your flashcard progress. The Word Knowledge synonyms deck is free for all signed-in users."
    : "Pro unlocks all six flashcard decks plus unlimited subtest drills and AFQT sprints. $9.99/mo or $49.99/yr.";
  const primaryHref = isAuth ? `/signup?next=/flashcards/${deckSlug}` : `/upgrade?from=flashcards-${deckSlug}`;
  const primaryLabel = isAuth ? "Create free account" : "Upgrade to Pro";

  return (
    <div className="rounded-3xl border border-navy-border bg-navy-light p-8 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-dim">
        <svg
          className="h-7 w-7 text-accent"
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
      <h1 className="font-display text-2xl font-bold text-text-primary">{headline}</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">{subtext}</p>
      <div className="mt-6 space-y-2">
        <Link
          href={primaryHref}
          className="block w-full rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline hover:bg-accent-hover"
        >
          {primaryLabel}
        </Link>
        {!isAuth && (
          <Link
            href="/flashcards/wk.synonyms"
            className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline hover:text-text-primary"
          >
            Try the free deck instead
          </Link>
        )}
        <Link
          href="/flashcards"
          className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline hover:text-text-primary"
        >
          Back to flashcards
        </Link>
      </div>
    </div>
  );
}
