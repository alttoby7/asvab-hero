"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PracticeTestEngine from "./PracticeTestEngine";
import VariantPicker from "./VariantPicker";
import TestBlockedScreen from "./TestBlockedScreen";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useSession } from "@/hooks/useSession";
import { canStartVariant, checkAnonDiagnosticUsed } from "@/lib/practice/gate";
import {
  trackEvent,
  FunnelEvents,
  PaywallEvents,
  ensurePaywallContextId,
  classifyProbableReason,
  paywallContextToProps,
} from "@/lib/analytics";
import { buildPaywallContext, deriveAuthState } from "@/lib/paywall-context";
import type { AsvabSubtest } from "@/types";
import { ALL_SUBTESTS } from "@/types";

const ALLOWED_VARIANTS = new Set(["diagnostic", "subtest_drill"]);

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

  const decision = canStartVariant({
    variantCode: variant,
    isAuthed: !!session,
    isPro: entitlement.isPro,
    freeDiagnosticUsedAt: entitlement.freeDiagnosticUsedAt,
    anonDiagnosticUsedLocally: checkAnonDiagnosticUsed(),
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
