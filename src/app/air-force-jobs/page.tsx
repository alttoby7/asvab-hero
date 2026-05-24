import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Air Force Jobs and ASVAB Scores 2026: Popular Careers by Aptitude",
  description:
    "Browse popular Air Force jobs by ASVAB and aptitude area. See current public score signals for Security Forces, Pararescue, Mobility Force Aviator, and pilot, plus the full AFSC code directory.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-jobs",
  },
};

const popularCareers = [
  {
    name: "Security Forces",
    href: "/air-force-security-forces-asvab-score",
    blurb:
      "Air Force military police. The most-searched entry-level career, sorted by the General (G) aptitude area.",
    signal: "General (G) area",
  },
  {
    name: "Loadmaster (Mobility Force Aviator)",
    href: "/air-force-loadmaster-asvab-score",
    blurb:
      "The career people still search as \"loadmaster\" is now part of the Mobility Force Aviator track. Aircrew, mechanical aptitude.",
    signal: "M 60",
  },
  {
    name: "Pararescue (PJ)",
    href: "/air-force-pararescue-asvab-score",
    blurb:
      "Air Force special warfare combat rescue. The ASVAB gate is modest; the physical pipeline is the real filter.",
    signal: "G 49",
  },
  {
    name: "Pilot",
    href: "/air-force-pilot-asvab-requirements",
    blurb:
      "An officer career. Selection runs on the AFOQT and a commissioning source, not an enlisted ASVAB line score.",
    signal: "AFOQT / officer path",
  },
];

export default function AirForceJobsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Air Force Jobs and ASVAB Scores: Popular Careers by Aptitude Area",
          url: "https://asvabhero.com/air-force-jobs",
          description:
            "A human-readable hub of popular Air Force careers grouped by ASVAB aptitude area, with current public score signals and links to the full AFSC code directory.",
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Popular Air Force Careers People Search",
          itemListElement: popularCareers.map((career, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: career.name,
            url: `https://asvabhero.com${career.href}`,
          })),
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://asvabhero.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Air Force Jobs",
              item: "https://asvabhero.com/air-force-jobs",
            },
          ],
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do ASVAB scores decide Air Force jobs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Two layers. Your AFQT score (a percentile from four subtests) gates whether you can enlist at all. Then the Air Force sorts you into specific jobs using MAGE aptitude composites: Mechanical, Administrative, General, and Electronic. Each Air Force Specialty Code lists a minimum in one of those four areas.",
              },
            },
            {
              "@type": "Question",
              name: "What is the most popular entry-level Air Force job?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Security Forces (Air Force military police) is among the most-searched and most-available entry-level careers. It is sorted under the General (G) aptitude area. The Air Force does not publish a single fixed numeric cutoff for it, so confirm the current minimum with a recruiter.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need the ASVAB to become an Air Force pilot?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Pilot is a commissioned officer career. Selection runs on the Air Force Officer Qualifying Test (AFOQT) and a commissioning source such as the Air Force Academy, ROTC, or Officer Training School, not an enlisted ASVAB line score.",
              },
            },
            {
              "@type": "Question",
              name: "Where is the full list of Air Force job codes?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "This page covers the careers people actually search. For every enlisted Air Force Specialty Code (AFSC) with its MAGE composite and minimum score, see the full AFSC directory at /air-force-afsc-list.",
              },
            },
          ],
        }}
      />

      {/* ── Header + answer unit ── */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force Jobs and ASVAB Scores: Popular Careers by Aptitude Area
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          Your AFQT score gates whether you can enlist; the MAGE aptitude areas
          (Mechanical, Administrative, General, Electronic) sort you into a job.
          This hub groups the Air Force careers people actually search, with the
          current public score signals for each. For every enlisted code with
          its composite and minimum, see the full directory at{" "}
          <Link
            href="/air-force-afsc-list"
            className="text-accent underline hover:text-accent-hover"
          >
            /air-force-afsc-list
          </Link>
          .
        </p>
      </div>

      {/* ── Popular searched careers grid ── */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Popular Searched Air Force Careers
        </h2>
        <p className="mt-3 text-text-secondary">
          These are the named jobs people look up most, with a quick read on the
          aptitude area each one falls under. Tap through for the full
          requirements on each career.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {popularCareers.map((career) => (
            <Link
              key={career.href}
              href={career.href}
              className="group rounded-xl border border-navy-border bg-navy-light p-5 no-underline transition-colors hover:border-accent/50"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-accent">
                  {career.name}
                </h3>
                <span className="shrink-0 rounded-md bg-navy px-2 py-1 font-mono text-xs font-bold text-accent">
                  {career.signal}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{career.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Current public score signals table ── */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Current Public Score Signals
        </h2>
        <p className="mt-3 text-text-secondary">
          Aptitude requirements shift and the Air Force does not publish a fixed
          numeric cutoff for every career. These are the public signals as of the
          verified date below. Treat each as a starting point and confirm the
          current standard with a recruiter.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Career</th>
                <th className="py-2 pr-4 text-left">Aptitude / Path</th>
                <th className="py-2 pr-4 text-left">Public Signal</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Pararescue</td>
                <td className="py-2 pr-4 text-text-secondary">
                  General (G)
                </td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">
                  G 49
                </td>
                <td className="py-2 text-text-secondary">
                  Verify with recruiter
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">
                  Mobility Force Aviator
                  <span className="block text-xs font-normal text-text-tertiary">
                    current name for legacy &ldquo;loadmaster&rdquo;
                  </span>
                </td>
                <td className="py-2 pr-4 text-text-secondary">
                  Mechanical (M)
                </td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">
                  M 60
                </td>
                <td className="py-2 text-text-secondary">
                  Verify with recruiter
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Security Forces</td>
                <td className="py-2 pr-4 text-text-secondary">
                  General (G)
                </td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">
                  No numeric cutoff published
                </td>
                <td className="py-2 text-text-secondary">
                  Verify with recruiter
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Pilot</td>
                <td className="py-2 pr-4 text-text-secondary">
                  Officer / AFOQT path
                </td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">
                  Not an ASVAB job
                </td>
                <td className="py-2 text-text-secondary">
                  Verify with recruiter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Pilot is a commissioned officer career selected on the Air Force
          Officer Qualifying Test (AFOQT) and a commissioning source, not an
          enlisted ASVAB line score.
        </p>
      </section>

      {/* ── How aptitude areas work ── */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          How the Aptitude Areas Sort Air Force Jobs
        </h2>
        <p className="mt-3 text-text-secondary">
          The AFQT is a percentile that decides whether you can enlist. After
          that, the Air Force builds four MAGE aptitude composites from your
          ASVAB subtests and matches them to job requirements:
        </p>
        <ul className="mt-4 space-y-2 text-text-secondary">
          <li>
            <span className="font-mono font-bold text-accent">M</span>{" "}
            Mechanical &mdash; aircraft and vehicle maintenance, aircrew, munitions.
          </li>
          <li>
            <span className="font-mono font-bold text-accent">A</span>{" "}
            Administrative &mdash; personnel, finance, contracting.
          </li>
          <li>
            <span className="font-mono font-bold text-accent">G</span>{" "}
            General &mdash; security forces, intelligence, medical, aircrew.
          </li>
          <li>
            <span className="font-mono font-bold text-accent">E</span>{" "}
            Electronic &mdash; avionics, cyber transport, missile systems.
          </li>
        </ul>
        <p className="mt-4 text-text-secondary">
          For the full breakdown of how the four composites are calculated, see{" "}
          <Link
            href="/air-force-mage-score"
            className="text-accent underline hover:text-accent-hover"
          >
            the MAGE score guide
          </Link>
          .
        </p>
      </section>

      {/* ── Jobs hub vs full AFSC list ── */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Jobs Hub vs. the Full AFSC List
        </h2>
        <p className="mt-3 text-text-secondary">
          This page is the human-readable hub: it covers the careers people
          search by name and the aptitude area each falls under. It is not the
          exhaustive code directory.
        </p>
        <p className="mt-3 text-text-secondary">
          If you want every enlisted Air Force Specialty Code with its MAGE
          composite and exact minimum score &mdash; across Operations,
          Maintenance, Support, Medical, and more &mdash; that lives on the full{" "}
          <Link
            href="/air-force-afsc-list"
            className="text-accent underline hover:text-accent-hover"
          >
            Air Force AFSC list
          </Link>
          . Use this hub to find a career, then jump to the AFSC list for the
          precise code and number.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Air Force Jobs FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "How do ASVAB scores decide Air Force jobs?",
              a: "Two layers. Your AFQT score (a percentile from four subtests) gates whether you can enlist at all. Then the Air Force sorts you into specific jobs using MAGE aptitude composites: Mechanical, Administrative, General, and Electronic. Each Air Force Specialty Code lists a minimum in one of those four areas.",
            },
            {
              q: "What is the most popular entry-level Air Force job?",
              a: "Security Forces (Air Force military police) is among the most-searched and most-available entry-level careers. It is sorted under the General (G) aptitude area. The Air Force does not publish a single fixed numeric cutoff for it, so confirm the current minimum with a recruiter.",
            },
            {
              q: "Do I need the ASVAB to become an Air Force pilot?",
              a: "No. Pilot is a commissioned officer career. Selection runs on the Air Force Officer Qualifying Test (AFOQT) and a commissioning source such as the Air Force Academy, ROTC, or Officer Training School, not an enlisted ASVAB line score.",
            },
            {
              q: "Where is the full list of Air Force job codes?",
              a: "This page covers the careers people actually search. For every enlisted Air Force Specialty Code (AFSC) with its MAGE composite and minimum score, see the full AFSC directory at /air-force-afsc-list.",
            },
          ].map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-display text-base font-bold text-text-primary">
                {item.q}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Next steps / internal links ── */}
      <section className="mt-12 rounded-xl border border-accent/30 bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Next Steps
        </h2>
        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            Browse the popular careers in detail:{" "}
            <Link
              href="/air-force-security-forces-asvab-score"
              className="text-accent underline hover:text-accent-hover"
            >
              Security Forces
            </Link>
            ,{" "}
            <Link
              href="/air-force-loadmaster-asvab-score"
              className="text-accent underline hover:text-accent-hover"
            >
              Loadmaster
            </Link>
            ,{" "}
            <Link
              href="/air-force-pararescue-asvab-score"
              className="text-accent underline hover:text-accent-hover"
            >
              Pararescue
            </Link>
            , and{" "}
            <Link
              href="/air-force-pilot-asvab-requirements"
              className="text-accent underline hover:text-accent-hover"
            >
              Pilot
            </Link>
            .
          </li>
          <li>
            See every code in the full{" "}
            <Link
              href="/air-force-afsc-list"
              className="text-accent underline hover:text-accent-hover"
            >
              Air Force AFSC list
            </Link>
            .
          </li>
          <li>
            Understand the aptitude areas with the{" "}
            <Link
              href="/air-force-mage-score"
              className="text-accent underline hover:text-accent-hover"
            >
              MAGE score guide
            </Link>
            .
          </li>
          <li>
            Check the enlistment gate with the{" "}
            <Link
              href="/air-force-afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Air Force AFQT calculator
            </Link>
            , then see every job you qualify for with the{" "}
            <Link
              href="/air-force-asvab-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Air Force ASVAB calculator
            </Link>
            .
          </li>
        </ul>
      </section>

      {/* ── Sources + last verified ── */}
      <section className="mt-12 border-t border-navy-border pt-6">
        <h2 className="font-display text-sm font-bold text-text-secondary">
          Sources
        </h2>
        <ul className="mt-3 space-y-1 text-xs text-text-tertiary">
          <li>
            <a
              href="https://www.officialasvab.com/applicants/military-jobs/"
              className="text-accent underline hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              officialasvab.com &mdash; Military Jobs
            </a>
          </li>
          <li>
            <a
              href="https://www.airforce.com/careers/law-and-order/security-forces"
              className="text-accent underline hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              airforce.com &mdash; Security Forces
            </a>
          </li>
          <li>
            <a
              href="https://www.airforce.com/careers/special-warfare-and-combat-support/special-warfare/pararescue"
              className="text-accent underline hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              airforce.com &mdash; Pararescue
            </a>
          </li>
          <li>
            <a
              href="https://www.airforce.com/careers/aviation-and-flight/mobility-force-aviator"
              className="text-accent underline hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              airforce.com &mdash; Mobility Force Aviator
            </a>
          </li>
          <li>
            <a
              href="https://www.airforce.com/careers/aviation-and-flight/pilot/pilot"
              className="text-accent underline hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              airforce.com &mdash; Pilot
            </a>
          </li>
        </ul>
        <p className="mt-4 text-xs text-text-tertiary">
          Last verified: May 24, 2026
        </p>
      </section>
    </div>
  );
}
