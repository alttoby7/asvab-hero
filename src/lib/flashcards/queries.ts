import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Card, CardWithReview, Deck, DeckSummary, ReviewState } from "./types";

export async function loadActiveDecks(): Promise<Deck[]> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("flashcard_decks")
    .select("*")
    .eq("active", true)
    .order("topic_id", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function loadDeckBySlug(slug: string): Promise<Deck | null> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("flashcard_decks")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function loadDeckSummaries(
  userId: string | null,
): Promise<DeckSummary[]> {
  const supabase = getSupabaseBrowserClient();
  const decks = await loadActiveDecks();
  if (decks.length === 0) return [];

  const deckIds = decks.map((d) => d.id);

  const { data: cards, error: cardErr } = await supabase
    .from("flashcard_cards")
    .select("id, deck_id")
    .in("deck_id", deckIds)
    .eq("active", true);
  if (cardErr) throw cardErr;

  const cardsByDeck = new Map<string, string[]>();
  for (const c of cards ?? []) {
    const arr = cardsByDeck.get(c.deck_id) ?? [];
    arr.push(c.id);
    cardsByDeck.set(c.deck_id, arr);
  }

  let reviewsByCard = new Map<string, { due_at: string }>();
  if (userId) {
    const { data: reviews, error: revErr } = await supabase
      .from("flashcard_reviews")
      .select("card_id, due_at")
      .eq("user_id", userId);
    if (revErr) throw revErr;
    for (const r of reviews ?? []) {
      reviewsByCard.set(r.card_id, { due_at: r.due_at });
    }
  }

  const nowMs = Date.now();
  return decks.map((deck) => {
    const ids = cardsByDeck.get(deck.id) ?? [];
    let due = 0;
    let newCount = 0;
    let learned = 0;
    for (const id of ids) {
      const review = reviewsByCard.get(id);
      if (!review) {
        newCount += 1;
      } else {
        learned += 1;
        if (Date.parse(review.due_at) <= nowMs) due += 1;
      }
    }
    return {
      deck,
      total: ids.length,
      due: due + newCount,
      newCount,
      learned,
    };
  });
}

export async function loadDueCards(opts: {
  userId: string | null;
  deckId: string;
  limit?: number;
}): Promise<CardWithReview[]> {
  const { userId, deckId, limit = 20 } = opts;
  const supabase = getSupabaseBrowserClient();

  const { data: cards, error: cardErr } = await supabase
    .from("flashcard_cards")
    .select("*")
    .eq("deck_id", deckId)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (cardErr) throw cardErr;
  if (!cards || cards.length === 0) return [];

  let reviewsByCard = new Map<string, ReviewState>();
  if (userId) {
    const { data: reviews, error: revErr } = await supabase
      .from("flashcard_reviews")
      .select("card_id, ease_factor, interval_days, repetitions, due_at, last_reviewed_at, last_quality")
      .eq("user_id", userId)
      .in(
        "card_id",
        cards.map((c) => c.id),
      );
    if (revErr) throw revErr;
    for (const r of reviews ?? []) {
      reviewsByCard.set(r.card_id, {
        ease_factor: Number(r.ease_factor),
        interval_days: r.interval_days,
        repetitions: r.repetitions,
        due_at: r.due_at,
        last_reviewed_at: r.last_reviewed_at,
        last_quality: r.last_quality,
      });
    }
  }

  const nowMs = Date.now();
  const due: CardWithReview[] = [];
  const newCards: CardWithReview[] = [];

  for (const card of cards as Card[]) {
    const review = reviewsByCard.get(card.id) ?? null;
    if (!review) {
      newCards.push({ ...card, review: null });
    } else if (Date.parse(review.due_at) <= nowMs) {
      due.push({ ...card, review });
    }
  }

  due.sort((a, b) => {
    const aDue = a.review ? Date.parse(a.review.due_at) : 0;
    const bDue = b.review ? Date.parse(b.review.due_at) : 0;
    if (aDue !== bDue) return aDue - bDue;
    return a.sort_order - b.sort_order;
  });

  const ordered = [...due, ...newCards];
  return ordered.slice(0, limit);
}

export async function submitReview(opts: {
  userId: string;
  cardId: string;
  next: ReviewState;
}): Promise<void> {
  const { userId, cardId, next } = opts;
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase.from("flashcard_reviews").upsert(
    {
      user_id: userId,
      card_id: cardId,
      ease_factor: next.ease_factor,
      interval_days: next.interval_days,
      repetitions: next.repetitions,
      due_at: next.due_at,
      last_reviewed_at: next.last_reviewed_at,
      last_quality: next.last_quality,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,card_id" },
  );
  if (error) throw error;
}
