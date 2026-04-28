"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import Link from "next/link";

const MONTHLY_PRICE_ID = "price_1TRIUPDjRScowBLlHUFX2nzc";
const ANNUAL_PRICE_ID = "price_1TRIUPDjRScowBLlwZK8YuyC";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const FREE_FEATURES = [
  "1 full diagnostic test (30 questions)",
  "Full results + per-question explanations",
  "ASVAB calculators + 500+ job matching",
  "Study guides for every topic",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited diagnostics + subtest drills",
  "Score tracking + history",
  "Weak-topic recommendations engine",
  "Flashcards (included when released)",
];

interface PricingPlansProps {
  defaultBilling?: "monthly" | "annual";
  source?: string;
}

export default function PricingPlans({
  defaultBilling = "annual",
  source,
}: PricingPlansProps) {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [billing, setBilling] = useState<"monthly" | "annual">(defaultBilling);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const isLoading = sessionLoading || entitlementLoading;

  async function handleUpgradeClick() {
    if (isLoading) return;

    // Not logged in — send to signup
    if (!session) {
      const tier = billing;
      const returnPath = source
        ? `/upgrade?tier=${tier}&from=${source}`
        : `/upgrade?tier=${tier}`;
      router.push(`/signup?return=${encodeURIComponent(returnPath)}`);
      return;
    }

    // Already Pro — no-op (button is disabled)
    if (entitlement.isPro) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const returnPath = "/account/billing";
      const tier = billing;
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tier, returnPath }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Checkout request failed");
      }

      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (err: unknown) {
      setCheckoutError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
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

  return (
    <div className="w-full">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setBilling("monthly")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            billing === "monthly"
              ? "bg-navy-lighter text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            billing === "annual"
              ? "bg-navy-lighter text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Yearly
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
            Most popular
          </span>
        </button>
      </div>

      {/* Plan grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Free plan */}
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8">
          <h2 className="font-display text-xl font-bold text-text-primary">Free</h2>
          <div className="mt-2">
            <span className="font-mono text-4xl font-bold text-text-primary">$0</span>
            <span className="text-text-tertiary"> / forever</span>
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Everything you need to understand your ASVAB scores and find qualifying jobs.
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

        {/* Pro plan */}
        <div className="relative rounded-2xl border-2 border-accent bg-navy-light p-8">
          <div className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
            PRO
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary">Pro</h2>
          <div className="mt-2">
            {billing === "monthly" ? (
              <>
                <span className="font-mono text-4xl font-bold text-accent">$9.99</span>
                <span className="text-text-tertiary"> / month</span>
              </>
            ) : (
              <>
                <span className="font-mono text-4xl font-bold text-accent">$49.99</span>
                <span className="text-text-tertiary"> / year</span>
              </>
            )}
          </div>
          {billing === "annual" && (
            <p className="mt-1 text-xs font-medium text-accent">Save 58% vs monthly</p>
          )}
          {billing === "monthly" && (
            <p className="mt-1 text-xs text-text-tertiary">
              or{" "}
              <button
                onClick={() => setBilling("annual")}
                className="underline text-accent hover:no-underline"
              >
                $49.99/year — save 58%
              </button>
            </p>
          )}
          <p className="mt-4 text-sm text-text-secondary">
            Serious prep tools to maximize your score and unlock your dream job.
          </p>
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
                "Upgrade to Pro"
              )}
            </button>
          )}

          {checkoutError && (
            <p className="mt-2 text-xs text-red-400">{checkoutError}</p>
          )}
        </div>
      </div>

      {/* Refund footnote */}
      <p className="mt-6 text-center text-xs text-text-tertiary">
        7-day money-back guarantee — no questions asked.
      </p>
    </div>
  );
}
