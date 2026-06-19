"use client";

import { useEffect } from "react";

/**
 * Client redirector for /review once the book has an ASIN. Sends a legitimate
 * buyer to Amazon's "write a review" deep link; shows a visible fallback button
 * to the product page in case Amazon bounces the deep link. ToS-safe: no gating,
 * no incentive, no "positive only".
 */
export default function ReviewRedirect({ asin }: { asin: string }) {
  const createReviewUrl = `https://www.amazon.com/review/create-review?asin=${asin}`;
  const productUrl = `https://www.amazon.com/dp/${asin}`;

  useEffect(() => {
    // replace() so the helper page doesn't sit in history (back button skips it).
    window.location.replace(createReviewUrl);
  }, [createReviewUrl]);

  return (
    <div className="mx-auto max-w-md px-5 py-16 text-center">
      <h1 className="font-display text-2xl font-bold text-text-primary">
        Taking you to Amazon&apos;s review page…
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        If it does not open automatically, use the button below.
      </p>
      <a
        href={createReviewUrl}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline transition-colors hover:bg-accent-hover"
      >
        Write your review on Amazon
      </a>
      <a
        href={productUrl}
        className="mt-3 inline-block text-sm text-text-tertiary underline"
      >
        Or open the book&apos;s Amazon page
      </a>
    </div>
  );
}
