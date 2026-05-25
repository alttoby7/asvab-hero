import { AUTHOR_DISPLAY } from "@/lib/author";

/**
 * Visible authorship credit. Attributed to the ASVAB Hero Editorial Team (the
 * organization), matching the Article `author` schema. No individual byline.
 * Pair with an optional "last verified" date to signal freshness to readers and
 * AI/search engines.
 */
export default function ArticleByline({
  lastVerified,
}: {
  /** e.g. "May 2026" */
  lastVerified?: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-tertiary">
      <span>By the {AUTHOR_DISPLAY}</span>
      {lastVerified && (
        <>
          <span aria-hidden>·</span>
          <span>Last verified: {lastVerified}</span>
        </>
      )}
    </div>
  );
}
