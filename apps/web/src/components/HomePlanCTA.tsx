"use client";

import Link from "next/link";
import { useRef } from "react";
import { useSession } from "@/hooks/useSession";
import { trackEvent } from "@/lib/analytics";

interface HomePlanCTAProps {
  variant: "hero" | "sticky";
}

export default function HomePlanCTA({ variant }: HomePlanCTAProps) {
  const { session } = useSession();
  const firedRef = useRef(false);

  const planHref = session
    ? "/app/plan"
    : "/signup?next=%2Fapp%2Fplan";

  function onClick() {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent(
      variant === "hero"
        ? "homepage_hero_signup_click"
        : "homepage_sticky_cta_click",
      { authed: !!session },
    );
  }

  if (variant === "hero") {
    return (
      <Link
        href={planHref}
        onClick={onClick}
        className="text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
      >
        or Start my free plan &rarr;
      </Link>
    );
  }

  return (
    <Link
      href={planHref}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline"
    >
      Start my free plan — no card
      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}
