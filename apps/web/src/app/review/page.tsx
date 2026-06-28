import type { Metadata } from "next";
import ReviewRedirect from "@/components/ReviewRedirect";

// QR-helper for the printed "ASVAB Math, Explained" workbook. noindex, pure utility.
// Pre-ASIN: show "search Amazon" fallback. Post-ASIN: set NEXT_PUBLIC_REVIEW_BOOK_ASIN
// in Cloudflare Pages env + redeploy → page flips to the Amazon review redirect.
export const metadata: Metadata = {
  title: "Leave a Review",
  description: "Leave an honest review for the ASVAB Math, Explained workbook.",
  robots: { index: false, follow: false },
};

const asin = process.env.NEXT_PUBLIC_REVIEW_BOOK_ASIN?.trim();
const searchUrl =
  "https://www.amazon.com/s?k=" +
  encodeURIComponent("ASVAB Math Explained Trisha Penrod");

export default function ReviewPage() {
  if (asin) {
    return (
      <main className="min-h-screen bg-navy">
        <ReviewRedirect asin={asin} />
      </main>
    );
  }

  // Fallback (no ASIN yet): the book is not on sale / not yet indexed on Amazon.
  return (
    <main className="min-h-screen bg-navy">
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Leave an honest review
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
          Thanks for using the workbook. If the Amazon page is not live yet,
          search Amazon for{" "}
          <span className="font-semibold text-text-primary">
            “ASVAB Math, Explained”
          </span>{" "}
          by Trisha Penrod and leave your honest review there.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Search Amazon for the book
        </a>
      </div>
    </main>
  );
}
