"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";
import BrandHero from "@/components/BrandHero";
import WhySurvey from "@/components/feedback/WhySurvey";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import {
  trackEvent,
  FunnelEvents,
  PaywallEvents,
  adoptPaywallContextId,
} from "@/lib/analytics";

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
  const status = searchParams.get("status");
  const isCancelled = status === "cancelled";
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  const pricingRef = useRef<HTMLDivElement | null>(null);
  const scroll50Ref = useRef(false);
  const scroll90Ref = useRef(false);
  const faqFiredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Existing GA4 event — unchanged.
    trackEvent(FunnelEvents.UpgradePageView, { from: from ?? "direct" });
    // First-party: adopt an inbound pcid (URL) or ensure one, then fire the
    // additive event + detect the Stripe cancel return.
    try {
      adoptPaywallContextId(searchParams.get("pcid"));
      trackEvent(PaywallEvents.UpgradePageViewed, { from: from ?? "direct" });
      if (isCancelled) {
        trackEvent(PaywallEvents.CheckoutReturnedCancelled, {});
      }
    } catch {
      /* swallow */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  // Pricing scroll-depth (IntersectionObserver, once each).
  useEffect(() => {
    const node = pricingRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio;
          if (ratio >= 0.5 && !scroll50Ref.current) {
            scroll50Ref.current = true;
            trackEvent(PaywallEvents.PricingScrolled50, {});
          }
          if (ratio >= 0.9 && !scroll90Ref.current) {
            scroll90Ref.current = true;
            trackEvent(PaywallEvents.PricingScrolled90, {});
          }
        }
      },
      { threshold: [0.5, 0.9] },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  function handleFaqOpen(q: string) {
    if (faqFiredRef.current.has(q)) return;
    faqFiredRef.current.add(q);
    trackEvent(PaywallEvents.FaqOpened, { q });
  }

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
            Your daily adaptive block and Mistake Bank are already free. Pro removes
            every limit — unlimited adaptive practice, full-length sims, and deeper
            analytics — so nothing slows you down.
          </p>
        )}
        {!showStats && !isLoading && (
          <p className="mt-3 text-text-secondary">
            The score-moving core is free: a daily adaptive AFQT block, unlimited
            Mistake-Bank review, and your diagnostic. Pro unlocks unlimited practice,
            full-length sims, and deeper analytics.
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

      {/* Not ready for Pro? The free plan already raises scores — route there,
         not to a PDF dead end. */}
      {!isLoading && !entitlement.isPro && (
        <div className="mb-10 rounded-2xl border border-navy-border bg-navy-light p-6 text-center sm:p-7">
          <p className="font-display text-lg font-bold text-text-primary">
            Not ready for Pro? Start the free plan first.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            One adaptive AFQT block a day, unlimited Mistake-Bank review, and a
            weekly plan — all free, no card. Come back for Pro when you want
            unlimited practice and full-length sims.
          </p>
          <Link
            href="/app/plan"
            onClick={() =>
              trackEvent(PaywallEvents.PaywallCtaSecondaryClick, { which: "free_plan", from: "upgrade" })
            }
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Start my free plan
          </Link>
        </div>
      )}

      {/* Plan grid */}
      <div ref={pricingRef}>
        <PricingPlans defaultBilling="annual" source={from ?? "upgrade_page"} />
      </div>

      {/* Tight 2-question FAQ */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-bold text-text-primary text-center mb-6">
          Quick answers
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <details
            className="rounded-2xl border border-navy-border bg-navy-light p-6"
            onToggle={(e) => {
              if ((e.currentTarget as HTMLDetailsElement).open)
                handleFaqOpen("why_now");
            }}
          >
            <summary className="cursor-pointer font-semibold text-text-primary marker:text-accent">
              Why upgrade now?
            </summary>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Most recruits prep for 4–8 weeks. Practice volume is the single
              biggest predictor of score improvement — Pro removes every limit so
              you can drill as much as you need.
            </p>
          </details>
          <details
            className="rounded-2xl border border-navy-border bg-navy-light p-6"
            onToggle={(e) => {
              if ((e.currentTarget as HTMLDetailsElement).open)
                handleFaqOpen("not_for_me");
            }}
          >
            <summary className="cursor-pointer font-semibold text-text-primary marker:text-accent">
              What if it&apos;s not for me?
            </summary>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              7-day money-back guarantee, no questions asked. Cancel anytime
              after that and your access continues until the billing period ends.
            </p>
          </details>
        </div>
      </div>

      {/* Cancel-return survey (v1: checkout_cancelled trigger only). Non-modal,
          never blocks navigation, self-suppresses. */}
      {isCancelled && (
        <WhySurvey
          trigger="checkout_cancelled"
          accessToken={session?.access_token ?? null}
        />
      )}
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
