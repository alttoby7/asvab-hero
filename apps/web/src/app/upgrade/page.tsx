"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PricingPlans, { type Tier } from "@/components/PricingPlans";
import BrandHero from "@/components/BrandHero";
import ProUpsellCard from "@/components/ProUpsellCard";
import WhySurvey from "@/components/feedback/WhySurvey";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import {
  trackEvent,
  FunnelEvents,
  PaywallEvents,
  adoptPaywallContextId,
} from "@/lib/analytics";
import { GUARANTEE_LINE, GUARANTEE_TAG } from "@/lib/guarantee";

type FromParam = string | undefined;

const HEADLINES: Record<string, string> = {
  variant_picker: "Unlock unlimited practice",
  diagnostic_used: "You've used your free diagnostic — keep going with Pro",
  mini_drill: "Drills are part of Pro",
  results: "Ready for serious prep?",
  free_diagnostic_used: "You've used your free diagnostic — keep going with Pro",
  anon_diagnostic_used: "Ready for unlimited practice?",
  pro_only_variant: "Unlock this feature with Pro",
  free_adaptive_daily_limit: "Nice work today — go Pro for unlimited",
  adaptive_needs_account: "Create a free account to get started",
  free_user_no_diagnostic: "Take your free diagnostic first",
  banner: "Unlock unlimited practice",
};

const PAYWALL_SOURCES = new Set([
  "free_diagnostic_used",
  "anon_diagnostic_used",
  "pro_only_variant",
  "free_adaptive_daily_limit",
  "diagnostic_used",
  "variant_picker",
  "mini_drill",
]);

function UpgradeContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") as FromParam;
  const status = searchParams.get("status");
  const isCancelled = status === "cancelled";
  const tierParam = searchParams.get("tier");
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  // Honor any explicit ?tier= (so direct pass/monthly links still work), else
  // annual (the default recommendation). Retaker tier retired 2026-06-30; the
  // retaker landing pages now route to the 90-Day Pass.
  const explicitTier = (["annual", "monthly", "pass90"] as const).find(
    (t) => t === tierParam,
  );
  const defaultTier: Tier = explicitTier ?? "annual";
  // Drive the above-fold hero off the resolved tier. Annual + monthly both lead
  // with the annual hero (the recommended best-value plan, direct to checkout);
  // an explicit pass link keeps its own hero.
  const heroTier: "annual" | "pass90" =
    defaultTier === "pass90" ? "pass90" : "annual";
  const HERO = {
    annual: {
      price: "$49.99",
      line: `per year · best value · ${GUARANTEE_TAG}`,
      cta: "Get Pro — $49.99/year",
      sub: "Billed yearly. Cancel anytime — no auto-renew surprises.",
    },
    pass90: {
      price: "$39",
      line: `one-time · 90 days · ${GUARANTEE_TAG}`,
      cta: "Get my 90-Day Pass",
      sub: "One-time payment. No subscription, no auto-renew.",
    },
  };
  const { startCheckout, loading: checkoutLoading } = useStripeCheckout({
    source: from ?? "upgrade_page",
    placement: "hero",
  });

  const isFromPaywall = !!from && PAYWALL_SOURCES.has(from);

  const pricingRef = useRef<HTMLDivElement | null>(null);
  const scroll50Ref = useRef(false);
  const scroll90Ref = useRef(false);
  const faqFiredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Existing GA4 event, unchanged.
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

  // Stats section, only show for logged-in users
  const showStats = !isLoading && !!session;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Hero — with above-fold CTA for paywall traffic */}
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

        {/* Above-fold CTA — price, guarantee, and buy button visible without scrolling */}
        {!isLoading && !entitlement.isPro && (
          <div className="mt-8">
            <p className="text-sm text-text-tertiary mb-4">
              <span className="font-mono text-lg font-bold text-accent">
                {HERO[heroTier].price}
              </span>{" "}
              {HERO[heroTier].line}
            </p>
            <button
              onClick={() => startCheckout(heroTier)}
              disabled={checkoutLoading}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? "Loading checkout…" : HERO[heroTier].cta}
            </button>
            <p className="mt-3 text-xs text-text-tertiary">
              {HERO[heroTier].sub}{" "}
              {!isFromPaywall && (
                <Link
                  href="/app/plan"
                  onClick={() =>
                    trackEvent(PaywallEvents.PaywallCtaSecondaryClick, {
                      which: "free_plan",
                      from: "upgrade_hero",
                    })
                  }
                  className="text-text-secondary hover:text-text-primary no-underline"
                >
                  Or continue with the free plan →
                </Link>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Already Pro, manage link */}
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

      {/* Personalized target-job context strip */}
      {!isLoading && !entitlement.isPro && session?.user?.id && (
        <ProUpsellCard userId={session.user.id} from="upgrade" />
      )}

      {/* Hero image — deferred, lazy-loaded, below CTA */}
      <div className="mb-12 mx-auto max-w-3xl">
        <BrandHero
          src="/images/generated/asvab-upgrade-hero.webp"
          alt="A focused candidate breaking through ASVAB practice, calculator in hand, notebook of worked-out problems, mid-morning daylight."
          width={1536}
          height={1024}
          className="overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
        />
      </div>

      {/* Plan grid — Free plan hidden for paywall traffic */}
      <div ref={pricingRef}>
        <PricingPlans
          key={defaultTier}
          defaultTier={defaultTier}
          recommendedTier="annual"
          source={from ?? "upgrade_page"}
          hideFreePlan={isFromPaywall}
          placement="pricing_grid"
        />
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
              biggest predictor of score improvement, Pro removes every limit so
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
              {GUARANTEE_LINE} Cancel anytime; your access continues until the
              billing period ends.
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
