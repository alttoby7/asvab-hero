import Link from "next/link";
import { AUTHOR_NAME, AUTHOR_URL } from "@/lib/author";

/**
 * Visible authorship credit that matches the Article `author` schema (the
 * Jordan Avery editorial persona). Pair with an optional "last verified" date
 * to signal freshness to readers and AI/search engines.
 */
export default function ArticleByline({
  lastVerified,
}: {
  /** e.g. "May 2026" */
  lastVerified?: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-tertiary">
      <span>
        By{" "}
        <Link
          href={AUTHOR_URL}
          className="font-medium text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
        >
          {AUTHOR_NAME}
        </Link>
        , Editor
      </span>
      {lastVerified && (
        <>
          <span aria-hidden>·</span>
          <span>Last verified: {lastVerified}</span>
        </>
      )}
    </div>
  );
}
