"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

function OnboardingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading: sessionLoading } = useSession();
  const isWelcome = searchParams?.get("welcome") === "1";

  useEffect(() => {
    if (!sessionLoading && !session) router.replace("/login?next=/onboarding");
  }, [session, sessionLoading, router]);

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
          3 quick questions, 90 seconds. We use this to build your weak-topic drill list and
          time your study plan to your test date.
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
