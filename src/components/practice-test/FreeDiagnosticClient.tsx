"use client";

import { Suspense, useEffect } from "react";
import PracticeTestEngine from "./PracticeTestEngine";
import TestBlockedScreen from "./TestBlockedScreen";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useSession } from "@/hooks/useSession";
import { canStartVariant, checkAnonDiagnosticUsed } from "@/lib/practice/gate";
import { trackEvent, FunnelEvents } from "@/lib/analytics";

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
  useEffect(() => {
    trackEvent(FunnelEvents.PaywallShown, {
      reason,
      from: "free_practice_test",
      variant,
    });
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
