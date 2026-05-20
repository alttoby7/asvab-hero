"use client";

// ASVAB Hero — paywall "why-tracking" one-tap survey.
//
// v1 SCOPE: cancel-return survey only (trigger="checkout_cancelled"), shown on
// /upgrade?status=cancelled. Free-text OFF. Once-per-paywall_context_id +
// 14-day global suppression. Non-modal, never blocks navigation, optimistic.
//
// FAST-FOLLOW (not built in v1): paywall-exit trigger (dwell/scroll/faq gate),
// churn-email trigger (/feedback/churn route). The component is written to
// accept those triggers so wiring them later is additive.
//
// SAFETY: every network/storage call is swallowed. A failed POST still shows
// "Thanks". Nothing here can block nav or affect the upgrade flow.

import { useEffect, useRef, useState } from "react";
import {
  trackEvent,
  PaywallEvents,
  getSessionId,
  getPaywallContextId,
} from "@/lib/analytics";

type SurveyTrigger = "paywall_exit" | "checkout_cancelled" | "churn_email";

interface WhySurveyProps {
  trigger: SurveyTrigger;
  /** Optional access token so the function can stamp user_id/auth_state. */
  accessToken?: string | null;
}

const SHOWN_KEY = "asvabhero.survey.shown.v1"; // set of pcids already surveyed
const SUPPRESS_KEY = "asvabhero.survey.suppressUntil.v1";
const SUPPRESS_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

const PROMPTS: Record<SurveyTrigger, string> = {
  paywall_exit: "Quick one — what's holding you back?",
  checkout_cancelled: "Quick one — what's holding you back?",
  churn_email: "What made you cancel?",
};

const PRIMARY_OPTIONS: Array<{ key: string; label: string }> = [
  { key: "too_expensive", label: "Costs too much right now" },
  { key: "subscription_distrust", label: "Don't want a recurring subscription" },
  { key: "short_term_need", label: "I only need it until my test" },
  { key: "not_sure_worth_it", label: "Not sure it's worth it yet" },
  { key: "need_more_free", label: "Want to try more before paying" },
  { key: "tech_or_confusion", label: "Confusing / something didn't work" },
  { key: "just_browsing", label: "Just looking around" },
  { key: "other", label: "Something else" },
];

// Follow-up shown only when the primary answer is one of these (the flat-fee test).
const PRICE_FOLLOWUP_TRIGGERS = new Set([
  "too_expensive",
  "subscription_distrust",
  "short_term_need",
]);

const PRICE_OPTIONS: Array<{ key: string; label: string }> = [
  { key: "would_pay_flat_once", label: "I'd pay once for access until my test date" },
  { key: "would_pay_if_cheaper", label: "I'd subscribe if it were cheaper" },
  { key: "wont_pay_anything", label: "I wouldn't pay either way" },
  { key: "unsure", label: "Not sure" },
];

function readShownSet(): Set<string> {
  try {
    const raw = localStorage.getItem(SHOWN_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function isSuppressed(): boolean {
  try {
    const until = parseInt(localStorage.getItem(SUPPRESS_KEY) || "0", 10);
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
}

function markShownAndSuppress(pcid: string | null): void {
  try {
    if (pcid) {
      const set = readShownSet();
      set.add(pcid);
      localStorage.setItem(SHOWN_KEY, JSON.stringify([...set]));
    }
    localStorage.setItem(SUPPRESS_KEY, String(Date.now() + SUPPRESS_MS));
  } catch {
    // swallow
  }
}

export default function WhySurvey({ trigger, accessToken }: WhySurveyProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"primary" | "price" | "done">("primary");
  const pcidRef = useRef<string | null>(null);
  const shownFiredRef = useRef(false);

  // Decide whether to show, once, on mount.
  useEffect(() => {
    try {
      const pcid = getPaywallContextId();
      pcidRef.current = pcid;
      if (isSuppressed()) return;
      if (pcid && readShownSet().has(pcid)) return;
      setOpen(true);
    } catch {
      // swallow — never block render
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fire survey_shown + write suppression markers once when it actually opens.
  useEffect(() => {
    if (!open || shownFiredRef.current) return;
    shownFiredRef.current = true;
    try {
      trackEvent(PaywallEvents.SurveyShown, { trigger });
    } catch {
      /* swallow */
    }
    markShownAndSuppress(pcidRef.current);
  }, [open, trigger]);

  function postAnswer(questionKey: string, answerKey: string): void {
    // Fire-and-forget; UI is optimistic regardless of network outcome.
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
      fetch("/api/feedback", {
        method: "POST",
        headers,
        keepalive: true,
        body: JSON.stringify({
          paywall_context_id: getPaywallContextId(),
          session_id: getSessionId(),
          trigger,
          question_key: questionKey,
          answer_key: answerKey,
          client_ts: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {
      /* swallow */
    }
    try {
      trackEvent(PaywallEvents.SurveyAnswered, {
        trigger,
        question_key: questionKey,
        answer_key: answerKey,
      });
    } catch {
      /* swallow */
    }
  }

  function handlePrimary(answerKey: string): void {
    postAnswer("primary_reason", answerKey);
    if (PRICE_FOLLOWUP_TRIGGERS.has(answerKey)) {
      setStep("price");
    } else {
      setStep("done");
    }
  }

  function handlePrice(answerKey: string): void {
    postAnswer("price_sentiment", answerKey);
    setStep("done");
  }

  function handleDismiss(): void {
    try {
      trackEvent(PaywallEvents.SurveyDismissed, { trigger });
    } catch {
      /* swallow */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Quick feedback"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-4 sm:bottom-4 sm:right-4 sm:left-auto sm:mx-0 sm:px-0"
    >
      <div className="rounded-2xl border border-navy-border bg-navy-light p-5 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-sm font-bold text-text-primary">
            {step === "done"
              ? "Thanks — that helps."
              : step === "price"
                ? "One more — would any of these work?"
                : PROMPTS[trigger]}
          </p>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="-mr-1 -mt-1 rounded-md p-1 text-text-tertiary transition-colors hover:text-text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === "primary" && (
          <div className="mt-3 grid gap-2">
            {PRIMARY_OPTIONS.map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => handlePrimary(o.key)}
                className="rounded-lg border border-navy-border bg-navy px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {step === "price" && (
          <div className="mt-3 grid gap-2">
            {PRICE_OPTIONS.map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => handlePrice(o.key)}
                className="rounded-lg border border-navy-border bg-navy px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {step === "done" && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
