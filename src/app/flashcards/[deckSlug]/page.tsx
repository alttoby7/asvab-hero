import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import ReviewEngineClient from "./ReviewEngineClient";

interface Props {
  params: Promise<{ deckSlug: string }>;
}

export function generateStaticParams() {
  const batchDir = path.join(process.cwd(), "supabase/seed/flashcard-batches");
  if (!fs.existsSync(batchDir)) return [];
  const files = fs.readdirSync(batchDir).filter((f) => f.endsWith(".json"));
  const slugs = files.map((f) => {
    const data = JSON.parse(fs.readFileSync(path.join(batchDir, f), "utf8"));
    return data.deck.slug as string;
  });
  return slugs.map((deckSlug) => ({ deckSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { deckSlug } = await params;
  return {
    title: `Flashcards — ${deckSlug.replace(/\./g, " ").toUpperCase()}`,
    robots: { index: false, follow: false },
  };
}

export default async function DeckReviewPage({ params }: Props) {
  const { deckSlug } = await params;
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <ReviewEngineClient deckSlug={deckSlug} />
    </div>
  );
}
