import type { Database } from "@/lib/supabase/types";

export type Deck = Database["public"]["Tables"]["flashcard_decks"]["Row"];
export type Card = Database["public"]["Tables"]["flashcard_cards"]["Row"];
export type Review = Database["public"]["Tables"]["flashcard_reviews"]["Row"];
export type ReviewInsert = Database["public"]["Tables"]["flashcard_reviews"]["Insert"];

export type ReviewState = {
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  due_at: string;
  last_reviewed_at: string | null;
  last_quality: number | null;
};

export type Quality = 0 | 3 | 4 | 5;
export type GradeButton = "again" | "hard" | "good" | "easy";

export type DeckSummary = {
  deck: Deck;
  total: number;
  due: number;
  newCount: number;
  learned: number;
};

export type CardWithReview = Card & {
  review: ReviewState | null;
};

export const FREE_DECK_SLUG = "wk.synonyms";

export function gradeToQuality(grade: GradeButton): Quality {
  switch (grade) {
    case "again":
      return 0;
    case "hard":
      return 3;
    case "good":
      return 4;
    case "easy":
      return 5;
  }
}

export function subtestForTopic(topicId: string): string {
  const prefix = topicId.split(".")[0];
  return prefix.toUpperCase();
}

export const SUBTEST_LABELS: Record<string, string> = {
  WK: "Word Knowledge",
  MK: "Math Knowledge",
  AR: "Arithmetic Reasoning",
  PC: "Paragraph Comprehension",
  GS: "General Science",
  EI: "Electronics Information",
  AS: "Auto & Shop",
  MC: "Mechanical Comprehension",
  AO: "Assembling Objects",
};
