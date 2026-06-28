import Link from "next/link";
import { relatedLinksFor } from "@/lib/calculator-links";

/**
 * Bottom-of-page "Related calculators" block for calculator spoke pages.
 * Cluster-driven (reads the taxonomy in src/lib/calculator-links.ts) and capped
 * at the 4 siblings the taxonomy declares, so internal authority flows laterally
 * across the calculator cluster instead of pooling on the homepage/hub.
 *
 * Pass the current page's route as `currentHref` (must match a CALCULATORS
 * entry). Renders nothing if the route has no related entries.
 */
export default function RelatedCalculators({
  currentHref,
}: {
  currentHref: string;
}) {
  const links = relatedLinksFor(currentHref);
  if (links.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
      <h2 className="font-display text-base font-bold text-text-primary">
        Related calculators
      </h2>
      <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block no-underline"
          >
            <span className="text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
              {link.label} &rarr;
            </span>
            <span className="mt-0.5 block text-sm leading-relaxed text-text-secondary">
              {link.blurb}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
