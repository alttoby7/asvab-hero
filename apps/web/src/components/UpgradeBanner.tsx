"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";

const DISMISSED_KEY = "asvabhero.upgradeBannerDismissed";

export default function UpgradeBanner() {
  const pathname = usePathname();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

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

  if (
    pathname?.startsWith("/app") ||
    pathname?.startsWith("/account") ||
    pathname?.startsWith("/embed/") ||
    pathname === "/book" ||
    pathname === "/review"
  )
    return null;
  if (sessionLoading || entitlementLoading) return null;
  if (!session) return null;
  if (entitlement.isPro) return null;
  if (dismissed) return null;

  return (
    <div className="relative z-40 border-b border-accent/30 bg-gradient-to-r from-accent/15 via-accent/10 to-accent/5">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <span
          aria-hidden="true"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent"
        >
          {/* lock icon */}
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
            />
          </svg>
        </span>
        <p className="min-w-0 flex-1 truncate text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">You&apos;re on Free.</span>{" "}
          <span className="hidden sm:inline">Unlock unlimited drills + score tracking, </span>
          <span className="font-mono text-xs text-text-primary">90-Day Pass $39</span>
        </p>
        <Link
          href="/upgrade?from=banner"
          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Upgrade
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={handleDismiss}
          className="shrink-0 rounded p-1 text-text-tertiary transition-colors hover:bg-navy-lighter hover:text-text-primary"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
