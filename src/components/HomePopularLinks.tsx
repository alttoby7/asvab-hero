import Link from "next/link";

/**
 * Homepage "popular guides and references" link hub. The homepage carries nearly
 * all of the site's authority, so this footer-adjacent section pushes internal
 * link equity to the high-demand, lower-ranked reference pages (ranks, scores,
 * retake) plus the core tools. Server-rendered, descriptive keyword anchors, no
 * em-dash characters (build guard). Curated inline; not auto-generated.
 */

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Scores and AFQT",
    links: [
      { href: "/asvab-scores-explained", label: "ASVAB scores explained" },
      { href: "/asvab-score-requirements", label: "Score requirements by branch" },
      { href: "/what-is-a-good-asvab-score", label: "What is a good ASVAB score" },
      { href: "/asvab-score-average", label: "Average ASVAB score" },
      { href: "/afqt-score", label: "AFQT score, explained" },
      { href: "/gt-score", label: "GT score, explained" },
    ],
  },
  {
    title: "Ranks and careers",
    links: [
      { href: "/army-ranks", label: "Army ranks and pay" },
      { href: "/navy-ranks", label: "Navy ranks and pay" },
      { href: "/air-force-ranks", label: "Air Force ranks and pay" },
      { href: "/marine-corps-ranks", label: "Marine Corps ranks and pay" },
      { href: "/navy-ratings-list", label: "Navy ASVAB score chart" },
    ],
  },
  {
    title: "Retake and improve",
    links: [
      { href: "/how-to-retake-the-asvab", label: "How to retake the ASVAB" },
      { href: "/asvab-retake-policy", label: "ASVAB retake policy" },
      { href: "/mos-reclassification", label: "MOS reclassification" },
      { href: "/asvab-study-guide", label: "Free ASVAB study guide" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/calculator", label: "ASVAB score calculator" },
      { href: "/practice-test", label: "Free practice test" },
      { href: "/asvab-line-score-calculator", label: "Line score calculator" },
      { href: "/asvab-score-converter", label: "ASVAB score converter" },
    ],
  },
];

export default function HomePopularLinks() {
  return (
    <section className="border-t border-navy-border bg-navy-light/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          <span className="text-accent">&#9679;</span> Popular guides and references
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          Everything you need for the ASVAB
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
          Free guides to scores, military careers, and the test itself, plus the
          tools to plan your prep.
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold text-text-primary">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-secondary no-underline transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
