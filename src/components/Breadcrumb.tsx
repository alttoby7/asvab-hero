import Link from "next/link";
import JsonLd from "@/components/JsonLd";

/**
 * Server-rendered breadcrumb trail plus matching BreadcrumbList JSON-LD.
 *
 * Gives deep pages (study guides, articles, calculators) a crawlable path back
 * up their hierarchy and earns breadcrumb display in the SERP. Pass the full
 * trail including the current page as the last item; the last item renders as
 * plain text (not a link) since it is the page you are on.
 *
 * `href` values are site-absolute paths (e.g. "/study/ar/percent"); the JSON-LD
 * upgrades them to full URLs on https://asvabhero.com.
 */

const ORIGIN = "https://asvabhero.com";

export type Crumb = { name: string; href: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  const last = items.length - 1;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${ORIGIN}${item.href}`,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-x-2">
              {i === last ? (
                <span className="font-medium text-text-secondary" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="no-underline transition-colors hover:text-text-secondary"
                  >
                    {item.name}
                  </Link>
                  <span className="text-text-tertiary/60" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
