"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Delegates a single document-level click listener to capture outbound
 * navigations (external http/https links). We record the target URL plus
 * a coarse "location" derived from a nearby data-track-location attribute
 * or the closest <section> / <header> / <footer> element, so we can see
 * which area of the page drives the click.
 */
export default function OutboundTracker() {
  useEffect(() => {
    const host =
      typeof window !== "undefined" ? window.location.hostname : "";

    function findLocation(el: HTMLElement): string {
      const marked = el.closest<HTMLElement>("[data-track-location]");
      if (marked?.dataset.trackLocation) return marked.dataset.trackLocation;
      const section = el.closest("section, header, footer, nav");
      if (section instanceof HTMLElement) {
        if (section.id) return section.id;
        const heading = section.querySelector("h1, h2, h3");
        if (heading?.textContent) {
          return heading.textContent.trim().slice(0, 60);
        }
        return section.tagName.toLowerCase();
      }
      return "unknown";
    }

    function handler(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!/^https?:\/\//i.test(href)) return;
      try {
        const url = new URL(href);
        if (host && url.hostname === host) return; // internal absolute link
        trackEvent("outbound_click", {
          url: href,
          location: findLocation(anchor as HTMLElement),
        });
      } catch {
        // malformed URL — skip
      }
    }

    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
