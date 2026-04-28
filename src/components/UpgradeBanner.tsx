"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";

const DISMISSED_KEY = "asvabhero.upgradeBannerDismissed";

export default function UpgradeBanner() {
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  // Read localStorage after mount (client-only)
  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISSED_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  function handleDismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
    setDismissed(true);
  }

  // Don't render: no session, loading, isPro, or dismissed
  if (sessionLoading || entitlementLoading) return null;
  if (!session) return null;
  if (entitlement.isPro) return null;
  if (dismissed) return null;

  return (
    <div className="relative z-40 flex items-center justify-between gap-3 bg-navy-light px-4 py-2.5 text-sm sm:px-6">
      <p className="min-w-0 flex-1 text-text-secondary">
        <span className="font-semibold text-text-primary">Free plan:</span>{" "}
        1 diagnostic / unlimited learning. Upgrade to Pro for unlimited practice
        &mdash; $9.99/mo or $49.99/yr
      </p>
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/upgrade?from=banner"
          className="whitespace-nowrap font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
        >
          Upgrade &rarr;
        </Link>
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={handleDismiss}
          className="text-text-tertiary transition-colors hover:text-text-secondary"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
