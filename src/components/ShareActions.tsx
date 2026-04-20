"use client";

import { useCallback, useEffect, useState } from "react";
import type { SubtestScores } from "@/types";
import { ALL_SUBTESTS } from "@/types";
import { trackEvent } from "@/lib/analytics";

interface ShareActionsProps {
  scores: SubtestScores;
  afqt: number;
  qualifyingCount: number;
}

function buildShareUrl(scores: SubtestScores): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams();
  for (const st of ALL_SUBTESTS) {
    params.set(st, String(scores[st]));
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

function buildShareText(
  scores: SubtestScores,
  afqt: number,
  qualifyingCount: number,
  url: string
): string {
  const line =
    `My ASVAB results: AFQT ${afqt}, qualifying for ${qualifyingCount} jobs. ` +
    `Full breakdown: ${url}`;
  // scores intentionally not itemized in message body — URL has them
  void scores;
  return line;
}

export default function ShareActions({
  scores,
  afqt,
  qualifyingCount,
}: ShareActionsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(buildShareUrl(scores));
    setCopied(false);
  }, [scores]);

  const handleCopy = useCallback(async () => {
    if (!url) return;
    trackEvent("share_result", { method: "copy_link" });
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard denied — fall back to selection
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [url]);

  const handlePrint = useCallback(() => {
    trackEvent("share_result", { method: "print" });
    window.print();
  }, []);

  const handleSmsClick = useCallback(() => {
    trackEvent("share_result", { method: "text" });
  }, []);

  const handleEmailClick = useCallback(() => {
    trackEvent("share_result", { method: "email" });
  }, []);

  const smsHref = url
    ? `sms:?&body=${encodeURIComponent(buildShareText(scores, afqt, qualifyingCount, url))}`
    : "";
  const emailHref = url
    ? `mailto:?subject=${encodeURIComponent("My ASVAB results")}&body=${encodeURIComponent(buildShareText(scores, afqt, qualifyingCount, url))}`
    : "";

  return (
    <section className="rounded-xl border border-navy-border bg-navy-light p-6 print:hidden">
      <h2 className="mb-3 font-display text-lg font-bold text-text-primary">
        Share Your Results
      </h2>
      <p className="mb-4 text-sm text-text-tertiary">
        Send these scores to a recruiter, parent, or keep them for yourself.
        The link restores your exact scores.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopy}
          className="rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
        <button
          onClick={handlePrint}
          className="rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          Print / Save as PDF
        </button>
        <a
          href={smsHref}
          onClick={handleSmsClick}
          className="rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          Text to recruiter
        </a>
        <a
          href={emailHref}
          onClick={handleEmailClick}
          className="rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          Email
        </a>
      </div>
      {url && (
        <div className="mt-3 overflow-x-auto rounded-md border border-navy-border bg-navy px-3 py-2 text-xs font-mono text-text-tertiary">
          {url}
        </div>
      )}
    </section>
  );
}
