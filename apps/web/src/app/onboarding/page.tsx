"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { trackEvent, PaywallEvents } from "@/lib/analytics";

// One-time "pass" tiers are not subscriptions; default value per plan when the
// success_url omits it (stripe-checkout normally passes the real value).
const PLAN_DEFAULT_VALUE: Record<string, number> = {
  pass90: 59,
  retaker: 119,
  monthly: 24.99,
  annual: 49.99,
};

function OnboardingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading: sessionLoading } = useSession();
  const isWelcome = searchParams?.get("welcome") === "1";
  const plan = searchParams?.get("plan") ?? "monthly";
  const isPassPlan = plan === "pass90" || plan === "retaker";
  const value = Number.parseFloat(
    searchParams?.get("value") ?? String(PLAN_DEFAULT_VALUE[plan] ?? 24.99)
  );

  useEffect(() => {
    if (!sessionLoading && !session) router.replace("/login?next=/onboarding");
  }, [session, sessionLoading, router]);

  // Close the funnel: Stripe success_url is /onboarding?welcome=1.
  // Fire GA4 purchase + subscription_started here (the only client-visible point
  // in the checkout round-trip). Guarded so a refresh / re-render can't double-count.
  useEffect(() => {
    if (!isWelcome) return;
    try {
      trackEvent(PaywallEvents.CheckoutReturnedCompleted, {});

      const FIRED_KEY = "asvabhero.purchase_tracked.v1";
      let already = false;
      try {
        already = sessionStorage.getItem(FIRED_KEY) === "1";
      } catch {
        /* ignore */
      }
      if (!already) {
        const safeValue = Number.isFinite(value)
          ? value
          : PLAN_DEFAULT_VALUE[plan] ?? 24.99;
        // One-time passes get a non-"sub_" transaction id and no
        // subscription_started event (keeps GA4 / the revenue dashboard's
        // pass-vs-subscription split honest).
        trackEvent("purchase", {
          transaction_id: `${isPassPlan ? "pass" : "sub"}_${Date.now()}`,
          value: safeValue,
          currency: "USD",
          plan,
        });
        if (!isPassPlan) {
          trackEvent("subscription_started", {
            plan,
            value: safeValue,
            currency: "USD",
          });
        }
        try {
          sessionStorage.setItem(FIRED_KEY, "1");
        } catch {
          /* ignore */
        }
      }
    } catch {
      /* swallow */
    }
  }, [isWelcome, plan, value]);

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary text-sm">Loading…</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {isWelcome && (
        <div className="mb-6 rounded-2xl border-l-4 border-accent bg-accent-dim px-5 py-4">
          <p className="font-semibold text-text-primary">Welcome to ASVAB Hero Pro.</p>
        </div>
      )}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Personalize your study plan
        </h1>
        <p className="mt-3 text-text-secondary">
          A few quick questions, about 2 minutes. We use this to build your study plan,
          set your GT target, and time everything to your test date.
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary text-sm">Loading…</div>
        </div>
      }
    >
      <OnboardingPageInner />
    </Suspense>
  );
}
