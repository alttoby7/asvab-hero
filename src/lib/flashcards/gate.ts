import { FREE_DECK_SLUG } from "./types";

export type DeckGateDecision =
  | { allowed: true }
  | { allowed: false; reason: "pro_only_deck" | "auth_required" };

export function canReviewDeck(opts: {
  deckSlug: string;
  isAuthed: boolean;
  isPro: boolean;
}): DeckGateDecision {
  const { deckSlug, isAuthed, isPro } = opts;

  if (!isAuthed) return { allowed: false, reason: "auth_required" };
  if (isPro) return { allowed: true };
  if (deckSlug === FREE_DECK_SLUG) return { allowed: true };
  return { allowed: false, reason: "pro_only_deck" };
}
