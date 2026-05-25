/**
 * In-app flashcards deck list, the member-shell home for Cards. Server wrapper
 * (noindex) around the shared client; the public, canonical SEO version lives at
 * /flashcards. Keeping signed-in users here means the bottom-tab "Cards" no
 * longer drops them into the marketing chrome.
 */

import type { Metadata } from "next";
import FlashcardsClient from "@/app/flashcards/FlashcardsClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppFlashcardsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <FlashcardsClient />
    </div>
  );
}
