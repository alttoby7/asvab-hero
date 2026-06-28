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
  // scores intentionally not itemized in message body, URL has them
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
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setUrl(buildShareUrl(scores));
    setCopied(false);
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, [scores]);

  const shareText = url
    ? buildShareText(scores, afqt, qualifyingCount, url)
    : "";

  const handleCopy = useCallback(async () => {
    if (!url) return;
    trackEvent("share_result", { method: "copy_link" });
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
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

  const handleNativeShare = useCallback(async () => {
    if (!url) return;
    trackEvent("share_result", { method: "native_share" });
    try {
      await navigator.share({
        title: `My ASVAB Results — AFQT ${afqt}`,
        text: `AFQT ${afqt}, qualifying for ${qualifyingCount} jobs.`,
        url,
      });
    } catch {
      // user cancelled
    }
  }, [url, afqt, qualifyingCount]);

  const handlePrint = useCallback(() => {
    trackEvent("share_result", { method: "print" });
    window.print();
  }, []);

  const trackClick = useCallback(
    (method: string) => () => trackEvent("share_result", { method }),
    []
  );

  const smsHref = url
    ? `sms:?&body=${encodeURIComponent(shareText)}`
    : "";
  const emailHref = url
    ? `mailto:?subject=${encodeURIComponent("My ASVAB results")}&body=${encodeURIComponent(shareText)}`
    : "";
  const whatsappHref = url
    ? `https://wa.me/?text=${encodeURIComponent(shareText)}`
    : "";
  const xHref = url
    ? `https://x.com/intent/tweet?text=${encodeURIComponent(`AFQT ${afqt}, qualifying for ${qualifyingCount} jobs`)}&url=${encodeURIComponent(url)}`
    : "";

  const btnClass =
    "rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter";

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
        {canNativeShare && (
          <button onClick={handleNativeShare} className={btnClass}>
            Share
          </button>
        )}
        <button onClick={handleCopy} className={btnClass}>
          {copied ? "Copied ✓" : "Copy link"}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick("whatsapp")}
          className={btnClass}
        >
          WhatsApp
        </a>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick("x")}
          className={btnClass}
        >
          X / Twitter
        </a>
        <a
          href={smsHref}
          onClick={trackClick("text")}
          className={btnClass}
        >
          Text
        </a>
        <a
          href={emailHref}
          onClick={trackClick("email")}
          className={btnClass}
        >
          Email
        </a>
        <button onClick={handlePrint} className={btnClass}>
          Print / PDF
        </button>
      </div>
      {url && (
        <div className="mt-3 overflow-x-auto rounded-md border border-navy-border bg-navy px-3 py-2 text-xs font-mono text-text-tertiary">
          {url}
        </div>
      )}
    </section>
  );
}
