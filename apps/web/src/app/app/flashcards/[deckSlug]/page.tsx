/**
 * In-app deck review, member-shell version of /flashcards/[deckSlug]. Server
 * wrapper (noindex) around the shared ReviewEngineClient. `generateStaticParams`
 * mirrors the public deck page so every deck is statically exported under /app.
 */

import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import ReviewEngineClient from "@/app/flashcards/[deckSlug]/ReviewEngineClient";

interface Props {
  params: Promise<{ deckSlug: string }>;
}

export function generateStaticParams() {
  const batchDir = path.join(process.cwd(), "supabase/seed/flashcard-batches");
  if (!fs.existsSync(batchDir)) return [];
  const files = fs.readdirSync(batchDir).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const data = JSON.parse(fs.readFileSync(path.join(batchDir, f), "utf8"));
    return { deckSlug: data.deck.slug as string };
  });
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AppDeckReviewPage({ params }: Props) {
  const { deckSlug } = await params;
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <ReviewEngineClient deckSlug={deckSlug} />
    </div>
  );
}
