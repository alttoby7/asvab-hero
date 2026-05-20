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

function AfctPracticeInner() {
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
    return <AfctBlockedWithEvent reason={decision.reason} />;
  }

  return <AfctEngineWithEvent />;
}

function AfctBlockedWithEvent({ reason }: { reason: string }) {
  const { session } = useSession();
  const { entitlement } = useEntitlement();
  useEffect(() => {
    // Existing GA4 event — unchanged.
    trackEvent(FunnelEvents.PaywallShown, {
      reason,
      from: "afct-practice-test",
      variant: "diagnostic",
    });
    // Additive first-party rich event.
    try {
      const pcid = ensurePaywallContextId();
      const ctx = buildPaywallContext({
        entrySurface: "afct",
        authState: deriveAuthState({
          isAuthed: !!session,
          isPro: entitlement.isPro,
          isTrial: entitlement.isTrial,
        }),
        variant: "diagnostic",
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
  }, [reason]);
  return (
    <TestBlockedScreen
      reason={reason}
      variant="diagnostic"
    />
  );
}

function AfctEngineWithEvent() {
  useEffect(() => {
    trackEvent(FunnelEvents.DiagnosticStart, {
      variant: "diagnostic",
      from: "afct-practice-test",
    });
  }, []);
  return (
    <PracticeTestEngine
      variant="diagnostic"
      testName="AFCT Practice Diagnostic"
      testDescription="30 timed questions across all 9 subtests — the same content you'll see on the AFCT. Get your estimated AFQT and GT-driving subtest scores before you risk replacing your official record."
    />
  );
}

export default function AfctPracticeClient() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      }
    >
      <AfctPracticeInner />
    </Suspense>
  );
}
