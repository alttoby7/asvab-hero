import Link from "next/link";

/**
 * Generic bottom-of-page "related pages" block for contextual internal linking
 * between SEO article pages (ranks, score, branch clusters, etc.).
 *
 * Unlike RelatedCalculators (which is bound to the calculator taxonomy), this
 * takes its links inline so any page can declare its topical cluster siblings.
 * Renders nothing when given no links. Keep anchors descriptive and keyword-led
 * for internal-link relevance. No em-dash characters in copy (build guard).
 */

export type RelatedLink = { href: string; label: string; blurb?: string };

export default function RelatedLinks({
  title = "Related guides",
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  if (!links || links.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
      <h2 className="font-display text-base font-bold text-text-primary">
        {title}
      </h2>
      <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group block no-underline">
            <span className="text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
              {link.label} &rarr;
            </span>
            {link.blurb && (
              <span className="mt-0.5 block text-sm leading-relaxed text-text-secondary">
                {link.blurb}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
