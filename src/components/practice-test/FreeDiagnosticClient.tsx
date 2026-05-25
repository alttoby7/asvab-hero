"use client";

import { Suspense, useEffect } from "react";
import PracticeTestEngine from "./PracticeTestEngine";
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

function FreeDiagnosticInner() {
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  if (sessionLoading || entitlementLoading) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
        Loading…
      </div>
    );
  }

  const decision = canStartVariant({
    variantCode: "diagnostic",
    isAuthed: !!session,
    isPro: entitlement.isPro,
    freeDiagnosticUsedAt: entitlement.freeDiagnosticUsedAt,
    anonDiagnosticUsedLocally: checkAnonDiagnosticUsed(),
  });

  if (!decision.allowed) {
    return (
      <TestBlockedScreenWithEvent reason={decision.reason} variant="diagnostic" />
    );
  }

  return <DiagnosticEngineWithEvent />;
}

function TestBlockedScreenWithEvent({
  reason,
  variant,
}: {
  reason: string;
  variant: string;
}) {
  const { session } = useSession();
  const { entitlement } = useEntitlement();
  useEffect(() => {
    // Existing GA4 event, unchanged.
    trackEvent(FunnelEvents.PaywallShown, {
      reason,
      from: "free_practice_test",
      variant,
    });
    // Additive first-party rich event.
    try {
      const pcid = ensurePaywallContextId();
      const ctx = buildPaywallContext({
        entrySurface: "free_practice_test",
        authState: deriveAuthState({
          isAuthed: !!session,
          isPro: entitlement.isPro,
          isTrial: entitlement.isTrial,
        }),
        variant,
        reason,
        freeDiagnosticUsedAt: entitlement.freeDiagnosticUsedAt,
      });
      trackEvent(PaywallEvents.PaywallViewed, {
        ...paywallContextToProps(ctx),
        probable_reason_category: classifyProbableReason(ctx),
        paywall_context_id: pcid,
      });
    } catch {
      /* swallow */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason, variant]);
  return <TestBlockedScreen reason={reason} variant={variant} />;
}

function DiagnosticEngineWithEvent() {
  useEffect(() => {
    trackEvent(FunnelEvents.DiagnosticStart, {
      variant: "diagnostic",
      from: "free_practice_test",
    });
  }, []);
  return <PracticeTestEngine variant="diagnostic" />;
}

export default function FreeDiagnosticClient() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      }
    >
      <FreeDiagnosticInner />
    </Suspense>
  );
}
