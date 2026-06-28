"use client";

/**
 * Testimonial-collection machine (client side). Shown ONCE after a genuine win
 * (a streak, a 2nd-diagnostic improvement, a target-job qualify). Captures a
 * real quote WITH explicit publish consent → testimonials table (status
 * pending; migration 0031). We curate approved+consented quotes by hand into
 * src/data/testimonials.ts. Never auto-publishes, never fabricates.
 */

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";

const DONE_KEY = "asvabhero.testimonial_done";

interface TestimonialPromptProps {
  userId: string;
  /** Why it fired, stored for context, e.g. "streak_7" or "afqt_improved". */
  context: string;
  /** Headline tailored to the win. */
  headline: string;
}

export default function TestimonialPrompt({
  userId,
  context,
  headline,
}: TestimonialPromptProps) {
  const [show, setShow] = useState(false);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [allowPublish, setAllowPublish] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DONE_KEY)) return;
    } catch {
      /* ignore */
    }
    setShow(true);
    trackEvent("testimonial_prompt_shown", { context });
  }, [context]);

  function finish() {
    try {
      localStorage.setItem(DONE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function dismiss() {
    finish();
    setShow(false);
    trackEvent("testimonial_prompt_dismissed", { context });
  }

  async function submit() {
    if (!quote.trim() || submitting) return;
    setSubmitting(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      await sb.from("testimonials").insert({
        user_id: userId,
        quote: quote.trim().slice(0, 600),
        display_name: name.trim().slice(0, 60) || null,
        allow_publish: allowPublish,
        context,
        status: "pending",
      });
      trackEvent("testimonial_submitted", { context, allow_publish: allowPublish });
    } catch {
      /* non-blocking, never trap the user over feedback */
    }
    finish();
    setDone(true);
    setSubmitting(false);
  }

  if (!show) return null;

  return (
    <section className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-5 sm:p-6">
      {done ? (
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <p className="text-sm text-text-secondary">
            Thank you, that genuinely helps other recruits decide to start.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                ● Quick favor
              </p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-text-primary">
                {headline}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                What&apos;s working for you? A sentence helps other recruits decide
                to start. (Optional, and only shared if you say it&apos;s OK.)
              </p>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="shrink-0 text-text-tertiary transition-colors hover:text-text-primary"
            >
              ✕
            </button>
          </div>

          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={3}
            maxLength={600}
            placeholder="e.g. The daily adaptive block actually moved my AR score in two weeks."
            className="mt-4 w-full rounded-lg border border-navy-border bg-navy px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="First name + last initial (optional)"
              className="w-full max-w-xs rounded-lg border border-navy-border bg-navy px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            />
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <input
                type="checkbox"
                checked={allowPublish}
                onChange={(e) => setAllowPublish(e.target.checked)}
                className="h-4 w-4 accent-[#f97316]"
              />
              OK to share this on the site
            </label>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={submit}
              disabled={!quote.trim() || submitting}
              className={
                "rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors " +
                (quote.trim() && !submitting
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "cursor-not-allowed bg-navy-border text-text-tertiary")
              }
            >
              {submitting ? "Sending…" : "Send"}
            </button>
            <button
              onClick={dismiss}
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Not now
            </button>
          </div>
        </>
      )}
    </section>
  );
}
