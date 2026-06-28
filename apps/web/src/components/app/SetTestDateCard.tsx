"use client";

/**
 * Dashboard card prompting the user to set a SPECIFIC test date.
 * Shows when the profile has no target_test_date (a vague bucket or nothing).
 * A real date unlocks the countdown plan, the test-day projection, and the
 * T-30/-14/-7/-1 and post-test email sequence — which never fires off buckets.
 * Quietly dismissible per device (localStorage) so it never nags.
 */

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";

const DISMISS_KEY = "asvabhero.setTestDateCardDismissed";

export default function SetTestDateCard({
  userId,
  targetTestDate,
  hasBucket,
  onSaved,
}: {
  userId: string;
  targetTestDate: string | null;
  hasBucket: boolean;
  onSaved?: () => void;
}) {
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });

  // Already has a real date → nothing to capture.
  if (targetTestDate || dismissed) return null;

  const todayIso = new Date().toISOString().slice(0, 10);

  async function save() {
    if (!date || saving) return;
    setSaving(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const { error: err } = await sb
        .from("profiles")
        .update({ target_test_date: date })
        .eq("user_id", userId);
      if (err) throw err;
      trackEvent("test_date_set", { source: "dashboard_card", had_bucket: hasBucket });
      onSaved?.();
    } catch {
      setError("Couldn't save your date. Please try again.");
      setSaving(false);
    }
  }

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    trackEvent("test_date_card_dismissed", { had_bucket: hasBucket });
  }

  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-dim/40 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">
            {hasBucket ? "Know your exact test date yet?" : "When is your ASVAB?"}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Set the day and we&apos;ll pace your plan to it: a countdown, a
            projected test-day score, and the right reminders in the final
            stretch — including one the night before.
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:text-text-secondary"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="date"
          min={todayIso}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
        />
        <button
          onClick={save}
          disabled={!date || saving}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving…" : "Lock it in"}
        </button>
        <span className="text-xs text-text-tertiary">
          Not booked yet? You can set or change this anytime in settings.
        </span>
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
