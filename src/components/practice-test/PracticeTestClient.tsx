"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PracticeTestEngine from "./PracticeTestEngine";
import VariantPicker from "./VariantPicker";
import TestBlockedScreen from "./TestBlockedScreen";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useSession } from "@/hooks/useSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  canStartVariant,
  checkAnonDiagnosticUsed,
  isAdaptiveVariant,
  ADAPTIVE_VARIANTS,
} from "@/lib/practice/gate";
import {
  trackEvent,
  FunnelEvents,
  PaywallEvents,
  ensurePaywallContextId,
  classifyProbableReason,
  paywallContextToProps,
} from "@/lib/analytics";
import { buildPaywallContext, deriveAuthState } from "@/lib/paywall-context";
import { isAdaptiveEnabled, ADAPTIVE_VARIANT_CODES } from "@/lib/practice/sampler";
import type { AsvabSubtest } from "@/types";
import { ALL_SUBTESTS } from "@/types";

// `afqt_adaptive` is only a valid entry-point URL when the build-time flag is on
// (it is additionally Pro-gated by canStartVariant + inactive in the DB until the
// content-depth gate is met). When the flag is off it falls through to the picker.
const ALLOWED_VARIANTS = new Set([
  "diagnostic",
  "subtest_drill",
  "full_sim",
  ...(isAdaptiveEnabled() ? [...ADAPTIVE_VARIANT_CODES] : []),
]);

function PracticeTestInner() {
  const searchParams = useSearchParams();
  const rawVariant = searchParams.get("variant") ?? undefined;
  const rawSubtest = searchParams.get("subtest") ?? undefined;
  const variant =
    rawVariant && ALLOWED_VARIANTS.has(rawVariant) ? rawVariant : undefined;
  const subtest =
    rawSubtest && ALL_SUBTESTS.includes(rawSubtest as AsvabSubtest)
      ? (rawSubtest as AsvabSubtest)
      : undefined;

  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  // For the free adaptive core we cap signed-in free users at one block/day.
  // Fetch today's completed adaptive count to enforce it (Pro is uncapped).
  const needsAdaptiveCount =
    !!variant && isAdaptiveVariant(variant) && !!session && !entitlement.isPro;
  const [adaptiveUsedToday, setAdaptiveUsedToday] = useState<number | null>(null);
  useEffect(() => {
    if (!needsAdaptiveCount || !session) {
      setAdaptiveUsedToday(0);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = getSupabaseBrowserClient() as any;
        const now = new Date();
        const startOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ).toISOString();
        const { count } = await sb
          .from("attempts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", session.user.id)
          .in("variant_code", [...ADAPTIVE_VARIANTS])
          .gte("completed_at", startOfDay);
        if (!cancelled) setAdaptiveUsedToday(count ?? 0);
      } catch {
        if (!cancelled) setAdaptiveUsedToday(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [needsAdaptiveCount, session]);

  if (sessionLoading || entitlementLoading) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
        Loading…
      </div>
    );
  }

  if (!variant) {
    return <VariantPicker />;
  }

  // Wait for the adaptive day-count before deciding (avoids a flash of the cap).
  if (needsAdaptiveCount && adaptiveUsedToday === null) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
        Loading…
      </div>
    );
  }

  const decision = canStartVariant({
    variantCode: variant,
    isAuthed: !!session,
    isPro: entitlement.isPro,
    freeDiagnosticUsedAt: entitlement.freeDiagnosticUsedAt,
    anonDiagnosticUsedLocally: checkAnonDiagnosticUsed(),
    adaptiveUsedToday: adaptiveUsedToday ?? 0,
  });

  if (!decision.allowed) {
    return (
      <TestBlockedScreenWithEvent
        reason={decision.reason}
        variant={variant}
        subtest={subtest}
      />
    );
  }

  return <PracticeTestEngineWithEvent variant={variant} subtest={subtest} />;
}

function TestBlockedScreenWithEvent({
  reason,
  variant,
  subtest,
}: {
  reason: string;
  variant: string;
  subtest?: AsvabSubtest;
}) {
  const { session } = useSession();
  const { entitlement } = useEntitlement();
  useEffect(() => {
    // Existing GA4 event — unchanged.
    trackEvent(FunnelEvents.PaywallShown, {
      reason,
      from: "practice_test",
      variant,
      ...(subtest ? { subtest } : {}),
    });
    // Additive first-party rich event — mints/carries paywall_context_id.
    try {
      const pcid = ensurePaywallContextId();
      const ctx = buildPaywallContext({
        entrySurface: "practice_test",
        authState: deriveAuthState({
          isAuthed: !!session,
          isPro: entitlement.isPro,
          isTrial: entitlement.isTrial,
        }),
        variant,
        subtest: subtest ?? null,
        reason,
        freeDiagnosticUsedAt: entitlement.freeDiagnosticUsedAt,
      });
      trackEvent(PaywallEvents.PaywallViewed, {
        ...paywallContextToProps(ctx),
        probable_reason_category: classifyProbableReason(ctx),
        paywall_context_id: pcid,
      });
    } catch {
      /* swallow — never affect paywall render */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason, variant, subtest]);
  return (
    <TestBlockedScreen reason={reason} variant={variant} subtest={subtest} />
  );
}

function PracticeTestEngineWithEvent({
  variant,
  subtest,
}: {
  variant: string;
  subtest?: AsvabSubtest;
}) {
  useEffect(() => {
    const eventName =
      variant === "diagnostic"
        ? FunnelEvents.DiagnosticStart
        : FunnelEvents.TopicDrillStart;
    trackEvent(eventName, {
      variant,
      ...(subtest ? { subtest } : {}),
    });
    // GT Target Mode: additive GT-specific start event (keeps the funnel event).
    if (variant === "gt_adaptive") {
      trackEvent("gt_block_start", { variant, prep_test_type: "afct" });
    }
  }, [variant, subtest]);
  return <PracticeTestEngine variant={variant} subtest={subtest} />;
}

export default function PracticeTestClient() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      }
    >
      <PracticeTestInner />
    </Suspense>
  );
}
