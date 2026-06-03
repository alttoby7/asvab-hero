import Link from "next/link";

/**
 * Server-rendered "Explore" block for /calculator.
 *
 * The calculator's job links and study-guide surfacing live inside client
 * components that only render after the user enters all 9 scores, so crawlers
 * never see them. This block ships those internal links in the static HTML:
 * real branch jobs/ranks pages, the 9 subtest study-guide indexes, and a
 * low-key, honest Pro nudge. Self-contained, no external link data.
 */

const JOB_RANK_LINKS: { label: string; href: string }[] = [
  { label: "Air Force jobs (AFSC list)", href: "/air-force-jobs" },
  { label: "Air Force AFSC list", href: "/air-force-afsc-list" },
  { label: "Navy jobs (ratings list)", href: "/navy-ratings-list" },
  { label: "Army jobs (MOS list)", href: "/army-mos-list" },
  { label: "Marine Corps jobs (MOS list)", href: "/usmc-mos-list" },
  { label: "Army ranks", href: "/army-ranks" },
  { label: "Navy ranks", href: "/navy-ranks" },
  { label: "Air Force ranks", href: "/air-force-ranks" },
  { label: "Marine Corps ranks", href: "/marine-corps-ranks" },
];

const STUDY_GUIDE_LINKS: { label: string; href: string }[] = [
  { label: "Arithmetic Reasoning", href: "/study/ar" },
  { label: "Mathematics Knowledge", href: "/study/mk" },
  { label: "Word Knowledge", href: "/study/wk" },
  { label: "Paragraph Comprehension", href: "/study/pc" },
  { label: "General Science", href: "/study/gs" },
  { label: "Electronics Information", href: "/study/ei" },
  { label: "Auto and Shop Information", href: "/study/as" },
  { label: "Mechanical Comprehension", href: "/study/mc" },
  { label: "Assembling Objects", href: "/study/ao" },
];

export default function CalculatorExplore() {
  return (
    <section className="mt-14 border-t border-navy-border pt-10">
      <h2 className="font-display text-2xl font-bold text-text-primary">
        Explore jobs, ranks, and study guides
      </h2>
      <p className="mt-2 text-text-secondary">
        The calculator above shows your qualifying jobs once you enter all 9
        scores. You can also browse everything directly below.
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Military jobs and ranks by branch
          </h3>
          <ul className="mt-3 space-y-2 list-none p-0">
            {JOB_RANK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  {link.label} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            ASVAB study guides by subtest
          </h3>
          <ul className="mt-3 space-y-2 list-none p-0">
            {STUDY_GUIDE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  {link.label} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-sm text-text-secondary">
        The calculator and every study guide are free to read. Practice drills
        and the full question bank are part of{" "}
        <Link
          href="/pricing"
          className="text-accent underline hover:text-accent-hover"
        >
          Pro
        </Link>{" "}
        when you want to test yourself.
      </p>
    </section>
  );
}
