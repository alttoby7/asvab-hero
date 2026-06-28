"use client";

import { useCallback, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Read-only "copy this iframe" box for the /embed widgets directory. Schools,
 * libraries, and JROTC pages paste the snippet to embed a free ASVAB Hero tool
 * on their own site. Each embed carries a do-follow backlink to the canonical
 * tool page, which is the entire point of the widget program.
 *
 * Clipboard handling mirrors ShareActions.tsx (Clipboard API + execCommand
 * fallback + "Copied" state). No em-dash characters in copy (build guard).
 */

type EmbedSnippetProps = {
  /** Absolute embed route, e.g. https://asvabhero.com/embed/afqt-calculator */
  src: string;
  /** iframe title attribute (accessibility) */
  title: string;
  /** Pixel height sized to the tool's tallest state. Defaults to 820. */
  height?: number;
  /**
   * Canonical tool page the attribution link points at, e.g.
   * https://asvabhero.com/afqt-calculator. An iframe by itself passes NO link
   * equity (Google and Ahrefs ignore iframe src for backlinks), so the snippet
   * embeds a real, do-follow <a> attribution link. THIS anchor is what earns DR
   * from the widget program. Branded anchor only (no keyword-stuffed text).
   */
  creditHref: string;
  /** Short tool descriptor used in the attribution line, e.g. "AFQT calculator". */
  creditLabel: string;
};

export default function EmbedSnippet({
  src,
  title,
  height = 820,
  creditHref,
  creditLabel,
}: EmbedSnippetProps) {
  const [copied, setCopied] = useState(false);

  // NOTE: props are interpolated into raw HTML without escaping, so every
  // caller MUST pass literal-safe values (no unescaped `"`, `<`, or `>`). These
  // are hardcoded brand/route strings today; if that ever changes, escape here.
  const snippet = useMemo(
    () =>
      `<iframe src="${src}" width="100%" height="${height}" ` +
      `style="border:1px solid #e5e7eb;border-radius:12px;background:#0a1628" ` +
      `title="${title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>\n` +
      `<p style="font-size:13px;font-family:sans-serif;margin:8px 0 0">` +
      `Free ${creditLabel} powered by ` +
      `<a href="${creditHref}">ASVAB Hero</a></p>`,
    [src, title, height, creditHref, creditLabel]
  );

  const handleCopy = useCallback(async () => {
    trackEvent("embed_copy", { src });
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const input = document.createElement("textarea");
      input.value = snippet;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [snippet, src]);

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-bold text-text-primary">
          Embed code
        </h3>
        <button
          onClick={handleCopy}
          className="rounded-md border border-navy-border bg-navy px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          {copied ? "Copied ✓" : "Copy embed code"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-md border border-navy-border bg-navy px-3 py-2 text-xs font-mono text-text-tertiary whitespace-pre-wrap break-all">
        {snippet}
      </pre>
      <p className="mt-2 text-xs text-text-tertiary">
        Paste this into your page&apos;s HTML. The tool is free, needs no
        account, and resizes to fit your layout. Please keep the one-line credit
        link below the tool. Adjust the height if your page needs it.
      </p>
    </div>
  );
}
