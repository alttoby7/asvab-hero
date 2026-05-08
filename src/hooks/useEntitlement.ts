"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type Entitlement = {
  isPro: boolean;
  billingStatus: "free" | "active" | "past_due" | "canceled" | "lifetime";
  proTier: "monthly" | "annual" | "lifetime" | null;
  proUntil: string | null;
  freeDiagnosticUsedAt: string | null;
  stripeCustomerId: string | null;
  trialEndsAt: string | null;
  isTrial: boolean;
  trialDaysRemaining: number | null;
};

const FREE: Entitlement = {
  isPro: false,
  billingStatus: "free",
  proTier: null,
  proUntil: null,
  freeDiagnosticUsedAt: null,
  stripeCustomerId: null,
  trialEndsAt: null,
  isTrial: false,
  trialDaysRemaining: null,
};

export function useEntitlement(): { entitlement: Entitlement; loading: boolean; refresh: () => void } {
  const { session, loading: sessionLoading } = useSession();
  const [entitlement, setEntitlement] = useState<Entitlement>(FREE);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session) {
      setEntitlement(FREE);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const supabase = getSupabaseBrowserClient();
    supabase
      .from("profiles")
      .select(
        "billing_status,pro_tier,pro_until,free_diagnostic_used_at,stripe_customer_id,trial_ends_at"
      )
      .eq("user_id", session.user.id)
      .single()
      .then(({ data }: { data: Record<string, unknown> | null }) => {
        if (cancelled) return;
        if (!data) {
          setEntitlement(FREE);
        } else {
          const billingStatus = (data.billing_status as Entitlement["billingStatus"]) ?? "free";
          const proUntil = (data.pro_until as string | null) ?? null;
          const isPro =
            billingStatus === "lifetime" ||
            (billingStatus === "active" && (!proUntil || new Date(proUntil) > new Date()));
          const trialEndsAt = (data.trial_ends_at as string | null) ?? null;
          const trialEndsAtDate = trialEndsAt ? new Date(trialEndsAt) : null;
          const now = new Date();
          const isTrial = !!(trialEndsAtDate && trialEndsAtDate > now);
          const trialDaysRemaining = isTrial && trialEndsAtDate
            ? Math.max(0, Math.ceil((trialEndsAtDate.getTime() - now.getTime()) / 86400000))
            : null;
          setEntitlement({
            isPro,
            billingStatus,
            proTier: (data.pro_tier as Entitlement["proTier"]) ?? null,
            proUntil,
            freeDiagnosticUsedAt: (data.free_diagnostic_used_at as string | null) ?? null,
            stripeCustomerId: (data.stripe_customer_id as string | null) ?? null,
            trialEndsAt,
            isTrial,
            trialDaysRemaining,
          });
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session, sessionLoading, tick]);

  return { entitlement, loading, refresh: () => setTick((t) => t + 1) };
}
