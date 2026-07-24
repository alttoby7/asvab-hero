"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import {
  trackEvent,
  FunnelEvents,
  PaywallEvents,
  getPaywallContextId,
  flush,
} from "@/lib/analytics";
import Link from "next/link";
import { GUARANTEE_TAG } from "@/lib/guarantee";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Pricing model (2026-07-24): two visible Pro offers, no toggle.
//   - 90-Day Pass ($59, one-time) is the HERO/default — the loud, elevated card
//     and the only primary CTA on the page.
//   - Monthly ($24.99/mo, 7-day trial) is the low-friction start option, shown
//     as a standard, secondary-styled card beside it.
// The old Annual ($79/yr) tier was removed from the UI menu on 2026-07-24. The
// Stripe $79 price stays live off-menu (still a valid `pro_tier` for existing
// subscribers and a valid checkout string), but the UI never sends "annual".
// `tier` is the value posted to the stripe-checkout edge function, which maps
// it to a Stripe price id + mode (subscription vs payment). Real prices live in
// Stripe; the strings below are display copy only.
export type Tier = "monthly" | "pass90";

const FREE_FEATURES = [
  "Full diagnostic + your saved score report",
  "Your weakest topics ranked, every answer explained",
  "Daily adaptive practice, the part that moves your score",
  "Saved score history + resume on any device",
  "ASVAB calculators + 500+ job matching",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited adaptive practice + targeted subtest drills",
  "Full-length, timed sims, test under real conditions",
  "Deeper analytics + score-trajectory tracking",
  "Spaced-repetition flashcards (all decks)",
];

interface PricingPlansProps {
  /** Retained for API compatibility with callers; the layout no longer varies
   *  by tier (the 90-Day Pass is always the hero). */
  defaultTier?: Tier;
  /** Retained for API compatibility; no longer changes the layout. */
  recommendedTier?: Tier;
  source?: string;
  hideFreePlan?: boolean;
  placement?: string;
}

export default function PricingPlans({
  source,
  hideFreePlan,
  placement,
}: PricingPlansProps) {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  // Which tier's checkout is currently in flight (null = none). Drives the
  // per-button spinner so only the clicked card shows "Loading checkout…".
  const [pendingTier, setPendingTier] = useState<Tier | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const isLoading = sessionLoading || entitlementLoading;

  async function handleUpgradeClick(selectedTier: Tier) {
    if (isLoading) return;

    // Not logged in, send to signup and come back to the chosen tier.
    if (!session) {
      trackEvent(PaywallEvents.CheckoutSignupRequired, {
        tier: selectedTier,
        from: source ?? "unknown",
        placement: placement ?? "pricing_grid",
      });
      const returnPath = source
        ? `/upgrade?tier=${selectedTier}&from=${source}`
        : `/upgrade?tier=${selectedTier}`;
      router.push(`/signup?return=${encodeURIComponent(returnPath)}`);
      return;
    }

    // Already Pro, no-op (buttons are disabled).
    if (entitlement.isPro) return;

    setPendingTier(selectedTier);
    setCheckoutError(null);

    trackEvent(FunnelEvents.CheckoutStart, {
      tier: selectedTier,
      from: source ?? "unknown",
      placement: placement ?? "pricing_grid",
    });
    trackEvent(PaywallEvents.CheckoutClick, {
      tier: selectedTier,
      from: source ?? "unknown",
      placement: placement ?? "pricing_grid",
    });

    try {
      const returnPath = "/account/billing";
      const paywallContextId = getPaywallContextId();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: selectedTier,
          returnPath,
          ...(paywallContextId ? { paywall_context_id: paywallContextId } : {}),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Checkout request failed");
      }

      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      trackEvent(PaywallEvents.CheckoutSessionCreated, { tier: selectedTier });
      trackEvent(PaywallEvents.CheckoutRedirected, { tier: selectedTier });
      flush(true);
      window.location.href = url;
    } catch (err: unknown) {
      trackEvent(PaywallEvents.CheckoutReturnedError, { tier: selectedTier });
      setCheckoutError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setPendingTier(null);
    }
  }

  function CheckIcon() {
    return (
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  function Spinner() {
    return (
      <span className="flex items-center justify-center gap-2">
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Loading checkout...
      </span>
    );
  }

  const isPro = entitlement.isPro;

  return (
    <div className="w-full">
      {/* Two Pro offers. DOM order = Pass first (mobile shows Pass → Monthly),
          desktop re-orders to Monthly (left) · Pass (right, elevated). The Pass
          column is given a touch more width so it reads as the hero. */}
      <div className="grid gap-8 sm:grid-cols-[1fr_1.12fr] sm:items-start">
        {/* ── 90-Day Pass (HERO) ───────────────────────────────────────── */}
        <div className="relative order-1 rounded-2xl border-2 border-accent bg-navy-light p-8 shadow-xl shadow-black/30 sm:order-2">
          <div className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
            PRO
          </div>
          <div className="absolute -top-3 right-6 rounded-full bg-navy-lighter px-3 py-0.5 text-xs font-bold text-accent">
            Best Value
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Pro · 90-Day Pass
          </h2>
          <div className="mt-2">
            <span className="font-mono text-4xl font-bold text-accent">$59</span>
            <span className="text-text-tertiary"> one-time</span>
          </div>
          <p className="mt-1 text-sm text-text-tertiary">about $0.66/day</p>
          <p className="mt-3 text-sm font-medium text-text-secondary">
            3 months of Monthly costs $74.97. The Pass saves you $15.97.
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            Everything unlocked for the 90 days before your test. One payment,
            nothing to cancel.
          </p>
          <ul className="mt-6 space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckIcon />
                <span className="text-text-secondary">{f}</span>
              </li>
            ))}
          </ul>

          {isPro ? (
            <button
              disabled
              className="mt-8 block w-full cursor-not-allowed rounded-xl bg-accent/20 py-3 text-center text-sm font-semibold text-accent/60"
            >
              You&apos;re already Pro
            </button>
          ) : (
            <>
              <button
                onClick={() => handleUpgradeClick("pass90")}
                disabled={pendingTier !== null || isLoading}
                className="mt-8 block w-full rounded-xl bg-accent py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pendingTier === "pass90" ? (
                  <Spinner />
                ) : (
                  "Get the 90-Day Pass for $59"
                )}
              </button>
              <p className="mt-2 text-center text-xs text-text-tertiary">
                Pay with card or Cash App.
              </p>
              <button
                onClick={() => handleUpgradeClick("monthly")}
                disabled={pendingTier !== null || isLoading}
                className="mt-2 block w-full text-center text-sm font-medium text-accent underline transition-colors hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                Not sure yet? Start with the 7-day free trial →
              </button>
            </>
          )}

          {checkoutError && (
            <p className="mt-2 text-xs text-red-400">{checkoutError}</p>
          )}
        </div>

        {/* ── Monthly (standard) ────────────────────────────────────────── */}
        <div className="relative order-2 rounded-2xl border border-navy-border bg-navy-light p-8 sm:order-1">
          <div className="absolute -top-3 left-6 rounded-full bg-navy-lighter px-3 py-0.5 text-xs font-bold text-accent">
            7-Day Free Trial
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Pro · Monthly
          </h2>
          <div className="mt-2">
            <span className="font-mono text-4xl font-bold text-text-primary">
              $24.99
            </span>
            <span className="text-text-tertiary"> / month</span>
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Try everything free for a week, then $24.99/mo. Cancel anytime.
          </p>
          <ul className="mt-6 space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckIcon />
                <span className="text-text-secondary">{f}</span>
              </li>
            ))}
          </ul>

          {isPro ? (
            <button
              disabled
              className="mt-8 block w-full cursor-not-allowed rounded-xl bg-accent/10 py-3 text-center text-sm font-semibold text-accent/60"
            >
              You&apos;re already Pro
            </button>
          ) : (
            <>
              <button
                onClick={() => handleUpgradeClick("monthly")}
                disabled={pendingTier !== null || isLoading}
                className="mt-8 block w-full rounded-xl border border-accent py-3 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pendingTier === "monthly" ? <Spinner /> : "Start 7-Day Free Trial"}
              </button>
              <p className="mt-2 text-xs text-text-tertiary">
                Card required. You won&apos;t be charged until day 8.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Free (slim full-width row) — omitted for paywall traffic ─────── */}
      {!hideFreePlan && (
        <div className="mt-8 rounded-2xl border border-navy-border bg-navy-light p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="sm:flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-lg font-bold text-text-primary">
                Free
              </h2>
              <span className="rounded-full bg-navy-lighter px-3 py-0.5 text-xs font-bold text-accent">
                No Card Required
              </span>
              <span className="font-mono text-sm font-bold text-text-primary">
                $0
              </span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Score calculators, daily adaptive practice, and your saved
              diagnostic. Free forever.
            </p>
          </div>
          <Link
            href="/practice-test"
            className="mt-4 block rounded-xl border border-navy-border px-6 py-3 text-center text-sm font-semibold text-text-primary no-underline transition-colors hover:border-accent sm:mt-0 sm:w-auto sm:flex-shrink-0"
          >
            Create Free Account
          </Link>
        </div>
      )}

      {/* Guarantee footnote */}
      <p className="mt-6 text-center text-xs text-text-tertiary">
        Every plan is backed by a {GUARANTEE_TAG}, no questions asked. The
        calculators and your daily adaptive block stay free, forever.
      </p>
    </div>
  );
}
