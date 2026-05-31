import Link from "next/link";

/**
 * Compact Amazon-affiliate book block. Monetizes high-intent calculator + article
 * traffic that currently leaves without converting to a signup. Books only (house
 * rule, no links to competing online subscriptions). Clicks auto-track as
 * `affiliate_click` via the global OutboundTracker, which reads the
 * `data-affiliate` / `data-asin` / `data-source` attributes below, no client JS
 * needed here, so this stays a static server component.
 */

const TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "asvabhero-20";

interface Book {
  /** Stable id matching /best-asvab-study-book so per-book analytics aggregate across placements. */
  id: string;
  asin: string;
  title: string;
  label: string;
  blurb: string;
}

/** Curated top-3 from /best-asvab-study-book (kept in sync with that page's ASINs + ids). */
const DEFAULT_BOOKS: Book[] = [
  {
    id: "total-prep",
    asin: "150629720X",
    title: "ASVAB Total Prep 2025-2026 (Kaplan)",
    label: "Best overall",
    blurb: "7 full-length practice tests, all 9 subtests in depth.",
  },
  {
    id: "for-dummies",
    asin: "1394323468",
    title: "ASVAB For Dummies 2025/2026",
    label: "Best for beginners",
    blurb: "Plain-language explanations and 6 full practice tests.",
  },
  {
    id: "test-prep-books",
    asin: "1637750358",
    title: "ASVAB Study Guide 2025-2026 (Test Prep Books)",
    label: "Best budget",
    blurb: "Concise, affordable, 3 full-length tests for fast review.",
  },
];

interface AffiliateBookBlockProps {
  /** Coarse label recorded with each affiliate_click (e.g. "calculator-result"). */
  source?: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

export default function AffiliateBookBlock({
  source = "affiliate-book-block",
  heading = "Want a book to study from?",
  subheading = "These are the ASVAB prep books we recommend most for raising your AFQT.",
  className = "",
}: AffiliateBookBlockProps) {
  return (
    <section
      data-track-location={source}
      className={`not-prose rounded-xl border border-navy-border bg-navy-light p-6 ${className}`}
    >
      <h3 className="font-display text-lg font-bold text-text-primary">{heading}</h3>
      <p className="mt-1 text-sm text-text-secondary">{subheading}</p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {DEFAULT_BOOKS.map((book) => (
          <li
            key={book.asin}
            className="flex flex-col rounded-lg border border-navy-border bg-navy p-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              {book.label}
            </span>
            <span className="mt-1.5 text-sm font-semibold leading-snug text-text-primary">
              {book.title}
            </span>
            <span className="mt-1 flex-1 text-xs leading-relaxed text-text-tertiary">
              {book.blurb}
            </span>
            <a
              href={`https://www.amazon.com/dp/${book.asin}?tag=${TAG}`}
              target="_blank"
              rel="sponsored nofollow noopener"
              data-affiliate="amazon"
              data-asin={book.asin}
              data-book-id={book.id}
              data-source={source}
              className="mt-3 inline-flex items-center justify-center rounded-md bg-accent px-3 py-2 text-xs font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
            >
              Check price on Amazon
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-text-tertiary">
        As an Amazon Associate, ASVAB Hero earns from qualifying purchases. See our{" "}
        <Link href="/best-asvab-study-book" className="underline-offset-2 hover:text-text-secondary hover:underline">
          full book comparison
        </Link>
        .
      </p>
    </section>
  );
}
