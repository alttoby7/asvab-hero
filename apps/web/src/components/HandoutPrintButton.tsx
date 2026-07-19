"use client";

import { useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Print / save-as-PDF trigger for the educator handout at /for-educators/handout.
 * The handout itself is a static server-rendered page; this is the only
 * interactive bit, so it lives in its own tiny client component to keep the
 * route a server component (metadata export stays valid).
 *
 * The @media print rules in globals.css (scoped via body:has(.handout-print))
 * hide the site nav, banner, footer, and every screen-only element so the
 * browser print dialog renders just the one-page handout. No em-dash in copy.
 */
export default function HandoutPrintButton() {
  const handlePrint = useCallback(() => {
    trackEvent("handout_print", {});
    window.print();
  }, []);

  return (
    <button
      onClick={handlePrint}
      className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
    >
      Print or save as PDF
    </button>
  );
}
