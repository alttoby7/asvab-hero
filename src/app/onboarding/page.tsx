"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { trackEvent, PaywallEvents } from "@/lib/analytics";

function OnboardingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading: sessionLoading } = useSession();
  const isWelcome = searchParams?.get("welcome") === "1";

  useEffect(() => {
    if (!sessionLoading && !session) router.replace("/login?next=/onboarding");
  }, [session, sessionLoading, router]);

  // Close the funnel: Stripe success_url is /onboarding?welcome=1.
  useEffect(() => {
    if (!isWelcome) return;
    try {
      trackEvent(PaywallEvents.CheckoutReturnedCompleted, {});
    } catch {
      /* swallow */
    }
  }, [isWelcome]);

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
