"use client";

import { useCallback, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * "Link or cite this resource" box for resource-hub pages (counselor center,
 * reference pages). Hands a counselor/librarian a copy-paste do-follow anchor
 * and a plain citation line so adding a link to their LibGuide or resource page
 * is one click. Lowering friction is a direct lever on how many links the page
 * earns. Branded anchor only (no keyword stuffing). Mirrors EmbedSnippet's
 * clipboard handling. No em-dash characters in copy (build guard).
 */

type CiteThisResourceProps = {
  /** Canonical absolute URL of the page, e.g. https://asvabhero.com/counselor-resources */
  url: string;
  /** Anchor text for the link snippet (branded/descriptive, not keyword-stuffed). */
  anchor: string;
  /** Human title used in the suggested citation line. */
  citationTitle: string;
};

export default function CiteThisResource({
  url,
  anchor,
  citationTitle,
}: CiteThisResourceProps) {
  const [copied, setCopied] = useState<"link" | "cite" | null>(null);

  const linkSnippet = useMemo(
    () => `<a href="${url}">${anchor}</a>`,
    [url, anchor]
  );

  const citation = useMemo(
    () => `ASVAB Hero. "${citationTitle}." ${url}`,
    [citationTitle, url]
  );

  const copy = useCallback(
    async (text: string, which: "link" | "cite") => {
      trackEvent("cite_resource_copy", { which, url });
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const input = document.createElement("textarea");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(which);
      setTimeout(() => setCopied(null), 1800);
    },
    [url]
  );

  return (
    <section className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-text-primary">
        Link or cite this resource
      </h2>
      <p className="mt-2 text-text-secondary leading-relaxed">
        This page is free, has no signup, and is kept source-cited, so you are
        welcome to link it from your counseling page, LibGuide, or resource
        list. Copy a ready-made link or citation below.
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="font-display text-sm font-bold text-text-primary">
              Link (HTML)
            </h3>
            <button
              onClick={() => copy(linkSnippet, "link")}
              className="rounded-md border border-navy-border bg-navy px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
            >
              {copied === "link" ? "Copied ✓" : "Copy link"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-md border border-navy-border bg-navy px-3 py-2 text-xs font-mono text-text-tertiary whitespace-pre-wrap break-all">
            {linkSnippet}
          </pre>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="font-display text-sm font-bold text-text-primary">
              Citation
            </h3>
            <button
              onClick={() => copy(citation, "cite")}
              className="rounded-md border border-navy-border bg-navy px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
            >
              {copied === "cite" ? "Copied ✓" : "Copy citation"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-md border border-navy-border bg-navy px-3 py-2 text-xs font-mono text-text-tertiary whitespace-pre-wrap break-words">
            {citation}
          </pre>
        </div>
      </div>
    </section>
  );
}
