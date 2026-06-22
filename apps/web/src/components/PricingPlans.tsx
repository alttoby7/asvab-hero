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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Pricing model (2026-06): pass-led, not subscription-led.
//   - 90-Day Test Pass ($59, one-time) is the loud default — matches the
//     2-4 week study window and removes the churn/cancel event.
//   - Monthly ($14.99) stays as the flexibility option.
//   - Retaker Pass ($119, one-time, 120 days) carries a pass guarantee for the
//     failed-AFQT / 30-day-clock segment; premium WTP is captured HERE, not on
//     the volume pass.
// `tier` is the value posted to the stripe-checkout edge function, which maps
// it to a Stripe price id + mode (subscription vs payment). Real prices live in
// Stripe; the strings below are display copy only.
export type Tier = "pass90" | "monthly" | "retaker";

type TierConfig = {
  key: Tier;
  label: string;
  price: string;
  unit: string;
  tagline: string;
  badge?: string;
  cta: string;
  note: string | null;
};

const TIERS: Record<Tier, TierConfig> = {
  pass90: {
    key: "pass90",
    label: "90-Day Pass",
    price: "$59",
    unit: "one-time",
    tagline:
      "Full Pro access for 90 days — enough to study and take the test, with nothing to cancel.",
    badge: "Best for test day",
    cta: "Get my 90-Day Pass",
    note: "One-time payment. No subscription, no auto-renew.",
  },
  monthly: {
    key: "monthly",
    label: "Monthly",
    price: "$14.99",
    unit: "/ month",
    tagline:
      "Month-to-month flexibility if you're not sure of your test date yet.",
    cta: "Start 7-day free trial",
    note: "Card required. $14.99/mo after the 7-day trial unless cancelled. Cancel anytime in Account Settings.",
  },
  retaker: {
    key: "retaker",
    label: "Retaker Pass",
    price: "$119",
    unit: "one-time",
    tagline:
      "Failed the AFQT or on a retest clock? 120 days of full Pro, backed by a money-back pass guarantee.",
    badge: "Pass guarantee",
    cta: "Get the Retaker Pass",
    note: "One-time payment, 120 days of access. Money-back guarantee if you don't improve — see guarantee terms.",
  },
};

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
  defaultTier?: Tier;
  /** When set, that tier is visibly flagged "Recommended" (e.g. retaker for
   *  retaker-intent traffic). Visible by design — never a silent steer. */
  recommendedTier?: Tier;
  source?: string;
  hideFreePlan?: boolean;
  placement?: string;
}

export default function PricingPlans({
  defaultTier = "pass90",
  recommendedTier,
  source,
  hideFreePlan,
  placement,
}: PricingPlansProps) {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [tier, setTier] = useState<Tier>(defaultTier);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const isLoading = sessionLoading || entitlementLoading;
  const active = TIERS[tier];

  function selectTier(to: Tier) {
    setTier(to);
    trackEvent(PaywallEvents.PlanToggled, { to });
  }

  async function handleUpgradeClick() {
    if (isLoading) return;

    // Not logged in, send to signup and come back to the chosen tier.
    if (!session) {
      const returnPath = source
        ? `/upgrade?tier=${tier}&from=${source}`
        : `/upgrade?tier=${tier}`;
      router.push(`/signup?return=${encodeURIComponent(returnPath)}`);
      return;
    }

    // Already Pro, no-op (button is disabled).
    if (entitlement.isPro) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    trackEvent(FunnelEvents.CheckoutStart, {
      tier,
      from: source ?? "unknown",
      placement: placement ?? "pricing_grid",
    });
    trackEvent(PaywallEvents.CheckoutClick, {
      tier,
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
          tier,
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
      trackEvent(PaywallEvents.CheckoutSessionCreated, { tier });
      trackEvent(PaywallEvents.CheckoutRedirected, { tier });
      flush(true);
      window.location.href = url;
    } catch (err: unknown) {
      trackEvent(PaywallEvents.CheckoutReturnedError, { tier });
      setCheckoutError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setCheckoutLoading(false);
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

  const tierOrder: Tier[] = ["pass90", "monthly", "retaker"];

  return (
    <div className="w-full">
      {/* Tier selector */}
      <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-2 rounded-xl border border-navy-border bg-navy-light p-1">
        {tierOrder.map((t) => (
          <button
            key={t}
            onClick={() => selectTier(t)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              tier === t
                ? "bg-accent text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {TIERS[t].label}
            {t === recommendedTier && (
              <span className="ml-1" aria-hidden="true">
                ★
              </span>
            )}
          </button>
        ))}
      </div>

      {recommendedTier === "retaker" && (
        <p className="-mt-4 mb-6 text-center text-xs font-semibold text-accent">
          ★ Recommended for retakers — 120 days of full Pro + money-back pass
          guarantee
        </p>
      )}

      {/* Plan grid */}
      <div className={`grid gap-8 ${hideFreePlan ? "mx-auto max-w-md" : "sm:grid-cols-2"}`}>
        {/* Free plan — hidden when the visitor is already past free (paywall traffic) */}
        {!hideFreePlan && (
          <div className="rounded-2xl border border-navy-border bg-navy-light p-8">
            <h2 className="font-display text-xl font-bold text-text-primary">Free</h2>
            <div className="mt-2">
              <span className="font-mono text-4xl font-bold text-text-primary">$0</span>
              <span className="text-text-tertiary"> / forever</span>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              A free account that saves your diagnostic and turns it into a daily,
              score-moving plan.
            </p>
            <ul className="mt-6 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckIcon />
                  <span className="text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/practice-test"
              className="mt-8 block rounded-xl border border-navy-border py-3 text-center text-sm font-semibold text-text-primary transition-colors hover:border-accent no-underline"
            >
              Start free diagnostic
            </Link>
          </div>
        )}

        {/* Pro plan (selected tier) */}
        <div className="relative rounded-2xl border-2 border-accent bg-navy-light p-8">
          <div className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
            PRO
          </div>
          {active.badge && (
            <div className="absolute -top-3 right-6 rounded-full bg-navy-lighter px-3 py-0.5 text-xs font-bold text-accent">
              {active.badge}
            </div>
          )}
          <h2 className="font-display text-xl font-bold text-text-primary">
            Pro · {active.label}
          </h2>
          <div className="mt-2">
            <span className="font-mono text-4xl font-bold text-accent">
              {active.price}
            </span>
            <span className="text-text-tertiary"> {active.unit}</span>
          </div>
          <p className="mt-4 text-sm text-text-secondary">{active.tagline}</p>
          <ul className="mt-6 space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckIcon />
                <span className="text-text-secondary">{f}</span>
              </li>
            ))}
          </ul>

          {entitlement.isPro ? (
            <button
              disabled
              className="mt-8 block w-full rounded-xl bg-accent/20 py-3 text-center text-sm font-semibold text-accent/60 cursor-not-allowed"
            >
              You&apos;re already Pro
            </button>
          ) : (
            <button
              onClick={handleUpgradeClick}
              disabled={checkoutLoading || isLoading}
              className="mt-8 block w-full rounded-xl bg-accent py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
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
              ) : (
                active.cta
              )}
            </button>
          )}

          {!entitlement.isPro && active.note && (
            <p className="mt-2 text-xs text-text-tertiary">{active.note}</p>
          )}

          {checkoutError && (
            <p className="mt-2 text-xs text-red-400">{checkoutError}</p>
          )}
        </div>
      </div>

      {/* Guarantee footnote */}
      <p className="mt-6 text-center text-xs text-text-tertiary">
        Every plan is backed by a money-back guarantee. The calculators and your
        daily adaptive block stay free, forever.
      </p>
    </div>
  );
}
