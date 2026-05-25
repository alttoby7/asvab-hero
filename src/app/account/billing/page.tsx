"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { trackEvent, FunnelEvents } from "@/lib/analytics";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return ", ";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ── Inner component (uses useSearchParams, must be wrapped in Suspense) ───────

function BillingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  const statusParam = searchParams.get("status");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace("/login");
    }
  }, [session, sessionLoading, router]);

  // checkout_success, fire once when redirected back with status=success.
  useEffect(() => {
    if (statusParam !== "success") return;
    const dedupeKey = `asvabhero.checkout_success_fired.${sessionId ?? "unknown"}`;
    try {
      if (localStorage.getItem(dedupeKey)) return;
      localStorage.setItem(dedupeKey, "1");
    } catch {
      // localStorage unavailable, fire anyway, GA4 will dedupe by event_id if set.
    }
    trackEvent(FunnelEvents.CheckoutSuccess, {
      tier: entitlement.proTier ?? "unknown",
      ...(sessionId ? { session_id: sessionId } : {}),
    });
  }, [statusParam, sessionId, entitlement.proTier]);

  async function handleManageSubscription() {
    setPortalLoading(true);
    setPortalError(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-portal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentSession?.access_token}`,
          },
          body: JSON.stringify({ returnPath: "/account/billing" }),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Request failed" }));
        setPortalError(body.error ?? "Could not open billing portal. Please try again.");
        setPortalLoading(false);
        return;
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setPortalError("Something went wrong. Please try again.");
      setPortalLoading(false);
    }
  }

  if (sessionLoading || entitlementLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary text-sm">Loading…</div>
      </div>
    );
  }

  if (!session) return null;

  const { isPro, billingStatus, proTier, proUntil } = entitlement;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/account" className="hover:text-text-secondary no-underline transition-colors">
          Account
        </Link>
        <span>/</span>
        <span className="text-text-secondary">Billing</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-text-primary mb-8">Billing</h1>

      {/* Success banner */}
      {statusParam === "success" && (
        <div className="mb-6 rounded-xl border border-success bg-success-dim px-5 py-4 text-sm text-success font-medium">
          Payment successful. Welcome to Pro.
        </div>
      )}

      {/* Current plan card */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 mb-6">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-5">Current Plan</h2>

        {isPro ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-success-dim px-3 py-0.5 text-sm font-semibold text-success uppercase tracking-wide">
                Pro {proTier ?? ""}
              </span>
              {billingStatus === "past_due" && (
                <span className="rounded-full bg-danger-dim px-3 py-0.5 text-xs font-semibold text-danger">
                  Past due
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wide mb-0.5">Tier</p>
                <p className="text-sm text-text-primary font-medium capitalize">
                  {proTier ?? ", "}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wide mb-0.5">Renews</p>
                <p className="text-sm text-text-primary font-medium">
                  {proTier === "lifetime" ? "Never (lifetime)" : formatDate(proUntil)}
                </p>
              </div>
            </div>

            {portalError && (
              <div className="rounded-lg border border-danger bg-danger-dim px-4 py-3 text-sm text-danger">
                {portalError}
              </div>
            )}

            {proTier !== "lifetime" && (
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="rounded-lg border border-navy-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary disabled:opacity-60"
              >
                {portalLoading ? "Opening portal…" : "Manage in Stripe"}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-navy-border px-3 py-0.5 text-sm font-medium text-text-tertiary uppercase tracking-wide">
                Free plan
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              Upgrade to Pro for unlimited practice tests, score history, and weak-topic drills.
            </p>
            <Link
              href="/upgrade"
              className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
            >
              Choose a plan
            </Link>
          </div>
        )}
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-4 text-sm text-text-tertiary">
        <Link href="/account" className="hover:text-text-secondary no-underline transition-colors">
          Back to dashboard
        </Link>
        <span>·</span>
        <Link href="/account/settings" className="hover:text-text-secondary no-underline transition-colors">
          Account Settings
        </Link>
      </div>
    </div>
  );
}

// ── Page export (Suspense wrapper required for useSearchParams) ───────────────

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary text-sm">Loading…</div>
        </div>
      }
    >
      <BillingInner />
    </Suspense>
  );
}
