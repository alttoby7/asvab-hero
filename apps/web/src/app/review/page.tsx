import type { Metadata } from "next";
import ReviewRedirect from "@/components/ReviewRedirect";

// QR-helper for the printed "ASVAB Math, Explained" workbook. noindex, pure utility.
// The book is live on Amazon (ASIN B0H8NCSHYT), so this now redirects buyers straight
// to Amazon's "write a review" page. NEXT_PUBLIC_REVIEW_BOOK_ASIN can override the
// default without a code change if the ASIN ever changes.
export const metadata: Metadata = {
  title: "Leave a Review",
  description: "Leave an honest review for the ASVAB Math, Explained workbook.",
  robots: { index: false, follow: false },
};

// Kept in sync with the ASIN in BuyBookBlock.tsx.
const asin = process.env.NEXT_PUBLIC_REVIEW_BOOK_ASIN?.trim() || "B0H8NCSHYT";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-navy">
      <ReviewRedirect asin={asin} />
    </main>
  );
}
