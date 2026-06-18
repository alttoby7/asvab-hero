import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Air Force Security Forces ASVAB Requirements (2026)",
  description:
    "Air Force Security Forces uses the General (G) aptitude area, but the official career page lists no numeric cutoff. Here is what the public source actually says and how to confirm your number.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-security-forces-asvab-score",
  },
};

const SOURCE_URL =
  "https://www.airforce.com/careers/law-and-order/security-forces";

export default function AirForceSecurityForcesAsvabScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Air Force Security Forces ASVAB Requirements",
          description:
            "Air Force Security Forces uses the General (G) aptitude area, but the official career page lists no numeric cutoff. What the public source says and how to confirm your number.",
          url: "https://asvabhero.com/air-force-security-forces-asvab-score",
          publisher: { "@type": "Organization", name: "ASVAB Hero" },
          datePublished: "2026-05-24",
          dateModified: "2026-05-24",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What ASVAB score do I need for Air Force Security Forces?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Air Force Security Forces falls under the General (G) aptitude area, but the official Air Force career page does not publish a numeric G cutoff on the page. Because the public source is non-numeric, the exact minimum must be verified with a recruiter. The standard AFQT enlistment baseline still applies before any job-specific score is considered.",
              },
            },
            {
              "@type": "Question",
              name: "Which aptitude area does Security Forces use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Security Forces is scored against the General (G) aptitude area, one of the four Air Force composite areas (Mechanical, Administrative, General, Electronics). The official career page identifies the G area but does not list the qualifying number alongside it.",
              },
            },
            {
              "@type": "Question",
              name: "Why is there no published Security Forces ASVAB cutoff?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Air Force lists the aptitude area on the public career page but keeps specific minimum line scores in recruiter-facing classification data, which it adjusts based on staffing needs. The honest answer is that the public source is non-numeric, so you confirm the current G minimum with a recruiter rather than trusting a fixed number online.",
              },
            },
          ],
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
              item: "https://asvabhero.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Air Force Security Forces ASVAB Requirements",
              item: "https://asvabhero.com/air-force-security-forces-asvab-score",
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force Security Forces ASVAB Requirements
        </h1>

        <VerifiedBlock
          verifiedDate="May 24, 2026"
          sources={[{ label: "airforce.com", url: SOURCE_URL }]}
        >
          <p>
            Air Force <strong>Security Forces</strong> is scored against the{" "}
            <strong>General (G) aptitude area</strong>, but the official Air
            Force career page lists that area without a published numeric
            cutoff. Because the public source is non-numeric, the exact G
            minimum must be confirmed with a recruiter. The standard AFQT
            enlistment baseline still applies first, before any job-specific
            line score.
          </p>
        </VerifiedBlock>

        <h2>What Security Forces actually is</h2>
        <p>
          Security Forces is the Air Force&apos;s base-defense and law
          enforcement career field. Airmen in this role secure installations
          and assets, run gate and entry control, conduct patrols, and provide
          force protection at home and on deployment. It is one of the largest
          enlisted fields in the Air Force, which is why the &quot;Security
          Forces ASVAB score&quot; question comes up so often.
        </p>

        <h2>The score requirement, stated honestly</h2>
        <p>
          The{" "}
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
            official Air Force Security Forces career page
          </a>{" "}
          identifies the <strong>General (G)</strong> aptitude area for this
          job. What it does <em>not</em> do is print a qualifying number on the
          page. We will not invent one. The accurate answer is: the public
          source is non-numeric, so the specific G minimum is something you
          verify with a recruiter, who works from current classification data
          that the Air Force adjusts based on staffing needs.
        </p>
        <p>
          What you <em>can</em> count on is the enlistment baseline. Before any
          Air Force job opens up, your AFQT has to clear the enlistment floor.
          Use the{" "}
          <Link href="/air-force-afqt-calculator">
            Air Force AFQT calculator
          </Link>{" "}
          to confirm you meet that baseline first.
        </p>

        <h2>Requirement snapshot</h2>
        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Item</th>
                <th>What the official source says</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">Aptitude area</td>
                <td>General (G)</td>
              </tr>
              <tr>
                <td className="font-semibold">Published numeric cutoff</td>
                <td>None listed on the public career page</td>
              </tr>
              <tr>
                <td className="font-semibold">Exact G minimum</td>
                <td>Verify with a recruiter (non-numeric public source)</td>
              </tr>
              <tr>
                <td className="font-semibold">AFQT baseline</td>
                <td>Standard Air Force enlistment minimum applies first</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-text-tertiary">
          Source:{" "}
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
            airforce.com/careers/law-and-order/security-forces
          </a>{" "}
          · Last verified: May 24, 2026
        </p>

        <h2>Frequently asked questions</h2>
        <h3>What ASVAB score do I need for Air Force Security Forces?</h3>
        <p>
          The job uses the General (G) aptitude area, but the official page does
          not publish a number, so the exact cutoff has to be verified with a
          recruiter. Meet the AFQT enlistment baseline first, then confirm the
          current G minimum.
        </p>
        <h3>Which aptitude area does Security Forces use?</h3>
        <p>
          General (G), one of the four Air Force composite areas. The career
          page names the area but not the qualifying score.
        </p>
        <h3>Why is there no published Security Forces ASVAB cutoff?</h3>
        <p>
          Specific minimum line scores live in recruiter-facing classification
          data that shifts with staffing needs. The public source is
          non-numeric, so confirm the current number with a recruiter rather
          than trusting a fixed figure online.
        </p>

        <h2>Next steps</h2>
        <ul>
          <li>
            Confirm you clear the enlistment floor with the{" "}
            <Link href="/air-force-afqt-calculator">
              Air Force AFQT calculator
            </Link>
            .
          </li>
          <li>
            Learn how the four composite areas work on the{" "}
            <Link href="/air-force-mage-score">Air Force MAGE score</Link> page.
          </li>
          <li>
            Browse the full field list on{" "}
            <Link href="/air-force-jobs">Air Force jobs</Link>.
          </li>
        </ul>
      </article>
    </div>
  );
}
