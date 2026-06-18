"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import {
  trackEvent,
  FunnelEvents,
  PaywallEvents,
  getPaywallContextId,
  flush,
} from "@/lib/analytics";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export type CheckoutTier = "pass90" | "monthly" | "retaker";

interface UseStripeCheckoutOpts {
  source?: string;
  placement?: string;
}

export function useStripeCheckout(opts: UseStripeCheckoutOpts = {}) {
  const router = useRouter();
  const { session } = useSession();
  const { entitlement } = useEntitlement();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = useCallback(
    async (tier: CheckoutTier = "pass90") => {
      if (loading) return;

      if (!session) {
        const returnPath = opts.source
          ? `/upgrade?tier=${tier}&from=${opts.source}`
          : `/upgrade?tier=${tier}`;
        router.push(`/signup?return=${encodeURIComponent(returnPath)}`);
        return;
      }

      if (entitlement.isPro) return;

      setLoading(true);
      setError(null);

      trackEvent(FunnelEvents.CheckoutStart, {
        tier,
        from: opts.source ?? "unknown",
        ...(opts.placement ? { placement: opts.placement } : {}),
      });
      trackEvent(PaywallEvents.CheckoutClick, {
        tier,
        from: opts.source ?? "unknown",
        ...(opts.placement ? { placement: opts.placement } : {}),
      });

      try {
        const returnPath = "/account/billing";
        const paywallContextId = getPaywallContextId();
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/stripe-checkout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tier,
              returnPath,
              ...(paywallContextId
                ? { paywall_context_id: paywallContextId }
                : {}),
            }),
          },
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Checkout request failed");
        }

        const { url } = await res.json();
        if (!url) throw new Error("No checkout URL returned");
        trackEvent(PaywallEvents.CheckoutSessionCreated, { tier });
        trackEvent(PaywallEvents.CheckoutRedirected, { tier });
        flush(true);
        window.location.href = url;
      } catch (err: unknown) {
        trackEvent(PaywallEvents.CheckoutReturnedError, { tier });
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
        setLoading(false);
      }
    },
    [session, entitlement.isPro, loading, opts.source, opts.placement, router],
  );

  return { startCheckout, loading, error };
}
