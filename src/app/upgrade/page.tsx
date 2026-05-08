"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";
import BrandHero from "@/components/BrandHero";
import EmailCapture from "@/components/EmailCapture";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { trackEvent, FunnelEvents } from "@/lib/analytics";

type FromParam =
  | "variant_picker"
  | "diagnostic_used"
  | "mini_drill"
  | "results"
  | undefined;

const HEADLINES: Record<NonNullable<FromParam>, string> = {
  variant_picker: "Unlock unlimited practice",
  diagnostic_used: "You've used your free diagnostic — keep going with Pro",
  mini_drill: "Drills are part of Pro",
  results: "Ready for serious prep?",
};

function UpgradeContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") as FromParam;
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  useEffect(() => {
    trackEvent(FunnelEvents.UpgradePageView, { from: from ?? "direct" });
  }, [from]);

  const isLoading = sessionLoading || entitlementLoading;
  const headline = (from && HEADLINES[from]) || "Upgrade to Pro";

  // Stats section — only show for logged-in users
  const showStats = !isLoading && !!session;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          {headline}
        </h1>
        {showStats && (
          <p className="mt-3 text-text-secondary">
            You&apos;re spending real time prepping — Pro removes the cap so nothing slows
            you down.
          </p>
        )}
        {!showStats && !isLoading && (
          <p className="mt-3 text-text-secondary">
            Start with one free diagnostic. Upgrade for unlimited practice.
          </p>
        )}
      </div>

      {/* Hero image — the satisfaction moment after the practice grind pays off */}
      <div className="mb-12 mx-auto max-w-3xl">
        <BrandHero
          src="/images/generated/asvab-upgrade-hero.png"
          alt="A focused candidate breaking through ASVAB practice — calculator in hand, notebook of worked-out problems, mid-morning daylight."
          width={1536}
          height={1024}
          priority
          className="overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
        />
      </div>

      {/* Already Pro — manage link */}
      {!isLoading && entitlement.isPro && (
        <div className="mb-8 rounded-2xl border border-accent bg-accent/10 p-6 text-center">
          <p className="font-semibold text-text-primary mb-2">
            You&apos;re already a Pro member.
          </p>
          <Link
            href="/account/billing"
            className="text-sm text-accent hover:underline no-underline"
          >
            Manage your subscription
          </Link>
        </div>
      )}

      <div className="mb-10">
        <EmailCapture
          variant="inline"
          headline="Not ready to upgrade? Get the free 30-day plan first"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="upgrade-exit"
        />
      </div>

      {/* Plan grid */}
      <PricingPlans defaultBilling="annual" source={from ?? "upgrade_page"} />

      {/* Tight 2-question FAQ */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-bold text-text-primary text-center mb-6">
          Quick answers
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-border bg-navy-light p-6">
            <h3 className="font-semibold text-text-primary mb-2">
              Why upgrade now?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Most recruits prep for 4–8 weeks. Practice volume is the single
              biggest predictor of score improvement — Pro removes every limit so
              you can drill as much as you need.
            </p>
          </div>
          <div className="rounded-2xl border border-navy-border bg-navy-light p-6">
            <h3 className="font-semibold text-text-primary mb-2">
              What if it&apos;s not for me?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              7-day money-back guarantee, no questions asked. Cancel anytime
              after that and your access continues until the billing period ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 text-center text-text-secondary">
          Loading...
        </div>
      }
    >
      <UpgradeContent />
    </Suspense>
  );
}
