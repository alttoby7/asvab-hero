"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useEntitlement } from "@/hooks/useEntitlement";
import { trackEvent } from "@/lib/analytics";
import HomePlanCTA from "./HomePlanCTA";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const { entitlement } = useEntitlement();
  const [visible, setVisible] = useState(false);
  const shownFiredRef = useRef(false);

  const hidden =
    pathname?.startsWith("/app") ||
    pathname?.startsWith("/account") ||
    pathname?.startsWith("/embed/") ||
    entitlement.isPro;

  useEffect(() => {
    if (hidden) return;

    const sentinel = document.getElementById("hero-cta-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        setVisible(show);
        if (show && !shownFiredRef.current) {
          shownFiredRef.current = true;
          trackEvent("homepage_sticky_cta_shown");
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hidden]);

  if (hidden || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-90 border-t border-navy-border bg-navy/95 px-4 py-3 text-center backdrop-blur-lg"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <HomePlanCTA variant="sticky" />
    </div>
  );
}
