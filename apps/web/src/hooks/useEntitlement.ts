"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type ProTier =
  | "monthly"
  | "annual"
  | "lifetime"
  | "pass90"
  | "retaker";

export type Entitlement = {
  isPro: boolean;
  billingStatus: "free" | "active" | "past_due" | "canceled" | "lifetime";
  proTier: ProTier | null;
  proUntil: string | null;
  freeDiagnosticUsedAt: string | null;
  stripeCustomerId: string | null;
  trialEndsAt: string | null;
  isTrial: boolean;
  trialDaysRemaining: number | null;
  /** Retaker signal: 'taken_logged' = logged a prior official ASVAB score. */
  officialTestStatus:
    | "not_taken"
    | "taken_not_logged"
    | "taken_logged"
    | null;
};

// One-time "pass" tiers grant time-boxed Pro and have NO Stripe subscription:
// pro_until is an expiry, not a renewal date, and there is nothing to manage in
// the Stripe billing portal. The UI must treat these differently from monthly.
export const PASS_TIERS: ReadonlySet<string> = new Set(["pass90", "retaker"]);

export function isPassTier(tier: string | null): boolean {
  return tier != null && PASS_TIERS.has(tier);
}

export function proTierLabel(tier: string | null): string {
  switch (tier) {
    case "pass90":
      return "90-Day Pass";
    case "retaker":
      return "Retaker Pass";
    case "monthly":
      return "Monthly";
    case "annual":
      return "Annual";
    case "lifetime":
      return "Lifetime";
    default:
      return "";
  }
}

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
  officialTestStatus: null,
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
    // official_test_status isn't in the committed generated types yet; read it
    // through a loosely-typed surface (same approach as lib/trajectory/queries.ts)
    // so we don't couple this hook to a schema regen.
    (
      supabase.from("profiles") as unknown as {
        select: (s: string) => {
          eq: (c: string, v: string) => {
            single: () => Promise<{ data: Record<string, unknown> | null }>;
          };
        };
      }
    )
      .select(
        "billing_status,pro_tier,pro_until,free_diagnostic_used_at,stripe_customer_id,trial_ends_at,official_test_status"
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
            officialTestStatus:
              (data.official_test_status as Entitlement["officialTestStatus"]) ??
              null,
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
