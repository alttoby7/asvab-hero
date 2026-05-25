import type { Metadata } from "next";
import FlashcardsClient from "./FlashcardsClient";

export const metadata: Metadata = {
  title: "ASVAB Flashcards, Spaced-Repetition Vocab, Formulas, Tools",
  description:
    "Drill ASVAB Word Knowledge synonyms, math geometry formulas, electronics laws, and shop tools with spaced-repetition flashcards. One free deck. Pro unlocks all six.",
  alternates: { canonical: "https://asvabhero.com/flashcards" },
};

export default function FlashcardsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <FlashcardsClient />
    </div>
  );
}
