"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { GUARANTEE_TAG } from "@/lib/guarantee";
import {
  trackEvent,
  PaywallEvents,
  getPaywallContextId,
} from "@/lib/analytics";
import { practiceHref } from "@/lib/routes";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface TestBlockedScreenProps {
  reason: string;
  variant: string;
  subtest?: string;
  lastAttemptId?: string;
}

const HIGH_INTENT_REASONS = new Set([
  "free_diagnostic_used",
  "anon_diagnostic_used",
  "pro_only_variant",
  "free_adaptive_daily_limit",
]);

const HEADLINES: Record<string, string> = {
  free_diagnostic_used: "Great first step — ready for the full program?",
  anon_diagnostic_used: "Great first step — ready for the full program?",
  pro_only_variant: "This is where your score jumps",
  free_user_no_diagnostic: "Take your free diagnostic first",
  free_adaptive_daily_limit: "Nice work today — ready for more?",
  adaptive_needs_account: "Create a free account to start",
};

const SUBTEXTS: Record<string, string> = {
  free_diagnostic_used:
    "Pro removes every limit — unlimited adaptive practice, full-length sims, and deeper analytics so nothing slows you down.",
  anon_diagnostic_used:
    "Sign up and go Pro for unlimited tests, progress tracking, and full-length sims.",
  pro_only_variant:
    "Subtest drills, AFQT sprints, weakness loops, and full sims are included with Pro.",
  free_user_no_diagnostic:
    "Start with the free diagnostic to get your baseline score, then upgrade to Pro to drill your weak areas.",
  free_adaptive_daily_limit:
    "Go Pro for unlimited adaptive practice, full-length sims, and deeper analytics.",
  adaptive_needs_account:
    "Adaptive practice builds on your personal mastery model, so it needs an account. Sign up free — one adaptive AFQT block a day, no card required.",
};

const VARIANT_LABELS: Record<string, string> = {
  subtest_drill: "subtest drills",
  full_sim: "full-length sims",
  afqt_sprint: "AFQT sprints",
  weakness_loop: "weakness loops",
  retake_readiness: "retake readiness tests",
};

function daysUntil(dateStr: string): number | null {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 && diff <= 365 ? diff : null;
}

export default function TestBlockedScreen({
  reason,
  variant,
  subtest,
  lastAttemptId,
}: TestBlockedScreenProps) {
  const { session } = useSession();
  const { entitlement } = useEntitlement();
  const isAuthed = !!session;
  const isHighIntent = HIGH_INTENT_REASONS.has(reason);

  const { startCheckout, loading: checkoutLoading, error: checkoutError } =
    useStripeCheckout({
      source: reason,
      placement: "paywall",
    });

  const [daysToTest, setDaysToTest] = useState<number | null>(null);
  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = getSupabaseBrowserClient() as any;
        const { data } = await sb
          .from("profiles")
          .select("target_test_date")
          .eq("user_id", session.user.id)
          .single();
        if (!cancelled && data?.target_test_date) {
          setDaysToTest(daysUntil(data.target_test_date));
        }
      } catch {
        /* fail silently */
      }
    })();
    return () => { cancelled = true; };
  }, [session]);

  const isGtAdaptive = variant === "gt_adaptive";
  const GT_SUBTEXTS: Record<string, string> = {
    free_adaptive_daily_limit:
      "Go Pro for unlimited adaptive GT practice and deeper analytics.",
    adaptive_needs_account:
      "Adaptive GT practice builds on your personal mastery model. Sign up free — one adaptive GT block a day, no card required.",
  };

  const headline = HEADLINES[reason] ?? "Unlock this with Pro";
  const baseSubtext =
    (isGtAdaptive && GT_SUBTEXTS[reason]) ||
    SUBTEXTS[reason] ||
    "Upgrade to Pro to unlock this feature.";

  const variantLabel = VARIANT_LABELS[variant];
  const personalizedSubtext =
    reason === "pro_only_variant" && variantLabel
      ? `Unlock ${subtest ? `${subtest} ` : ""}${variantLabel} and more with Pro.`
      : baseSubtext;

  const baseUpgradeHref = `/upgrade?from=${reason}&variant=${variant}${subtest ? `&subtest=${subtest}` : ""}`;
  const pcid = getPaywallContextId();
  const upgradeHref = pcid ? `${baseUpgradeHref}&pcid=${pcid}` : baseUpgradeHref;
  const backHref = isAuthed ? "/account" : "/";
  const backLabel = isAuthed ? "Back to dashboard" : "Back home";

  return (
    <div
      className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center"
      style={{ animation: "fadeIn 0.35s ease-out" }}
    >
      <div className="mx-auto max-w-sm">
        {/* Progress icon instead of lock for high-intent */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dim">
          {isHighIntent ? (
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
              />
            </svg>
          )}
        </div>

        <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">
          {headline}
        </h2>
        <p className="mb-4 text-sm text-text-secondary">{personalizedSubtext}</p>

        {/* Test-date urgency */}
        {daysToTest !== null && isHighIntent && (
          <p className="mb-4 text-sm font-semibold text-accent">
            Your test is in {daysToTest} day{daysToTest !== 1 ? "s" : ""} — every practice day counts.
          </p>
        )}

        {/* Pricing anchor — only for high-intent paywall reasons */}
        {isHighIntent && (
          <p className="mb-6 text-xs text-text-tertiary">
            <span className="font-mono text-sm font-bold text-text-primary">$59</span>{" "}
            one-time · 90 days · {GUARANTEE_TAG}
          </p>
        )}

        <div className="space-y-3">
          {reason === "adaptive_needs_account" ? (
            <Link
              href="/signup"
              onClick={() =>
                trackEvent(PaywallEvents.PaywallCtaSecondaryClick, {
                  which: "signup",
                  reason,
                })
              }
              className="block w-full rounded-xl bg-accent px-6 py-3.5 font-display text-base font-bold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
            >
              Create a free account
            </Link>
          ) : isHighIntent && isAuthed ? (
            /* Direct-to-Stripe for logged-in high-intent users */
            <button
              onClick={() => startCheckout("pass90")}
              disabled={checkoutLoading}
              className="block w-full rounded-xl bg-accent px-6 py-3.5 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? "Loading checkout…" : "Get my 90-Day Pass · $59"}
            </button>
          ) : (
            <Link
              href={upgradeHref}
              onClick={() =>
                trackEvent(PaywallEvents.PaywallCtaUpgradeClick, {
                  reason,
                  variant,
                })
              }
              className="block w-full rounded-xl bg-accent px-6 py-3.5 font-display text-base font-bold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
            >
              {reason === "free_adaptive_daily_limit"
                ? "Go Pro for unlimited"
                : "Upgrade to Pro"}
            </Link>
          )}

          {/* Secondary: link to /upgrade for plan comparison (high-intent authed only) */}
          {isHighIntent && isAuthed && (
            <Link
              href={upgradeHref}
              onClick={() =>
                trackEvent(PaywallEvents.PaywallCtaSecondaryClick, {
                  which: "compare_plans",
                  reason,
                })
              }
              className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              Compare plans
            </Link>
          )}

          {checkoutError && (
            <p className="text-xs text-red-400">{checkoutError}</p>
          )}

          {reason === "free_adaptive_daily_limit" && (
            <Link
              href="/app/mistakes"
              onClick={() =>
                trackEvent(PaywallEvents.PaywallCtaSecondaryClick, {
                  which: "review_mistakes",
                })
              }
              className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              Review your due mistakes
            </Link>
          )}

          {reason === "free_diagnostic_used" && lastAttemptId && (
            <Link
              href="/account"
              onClick={() =>
                trackEvent(PaywallEvents.PaywallCtaSecondaryClick, {
                  which: "results",
                })
              }
              className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              View my last results
            </Link>
          )}

          {reason === "free_user_no_diagnostic" && (
            <Link
              href={practiceHref("diagnostic", { authed: isAuthed })}
              onClick={() =>
                trackEvent(PaywallEvents.PaywallCtaSecondaryClick, {
                  which: "diagnostic",
                })
              }
              className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              Take my free diagnostic
            </Link>
          )}

          <Link
            href={backHref}
            onClick={() => trackEvent(PaywallEvents.PaywallBackClick, { reason })}
            className="block w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
