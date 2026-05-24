import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Air Force Pararescue ASVAB Score: You Need 49 General (G)",
  description:
    "Air Force Pararescue (PJ) lists a General (G) requirement of 49 on the official career page. But the ASVAB is necessary, not sufficient: PJ selection is gated by physical screening and the training pipeline.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-pararescue-asvab-score",
  },
};

const SOURCE_URL =
  "https://www.airforce.com/careers/special-warfare-and-combat-support/special-warfare/pararescue";

export default function AirForcePararescueAsvabScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Air Force Pararescue ASVAB Score",
          description:
            "Air Force Pararescue lists a General (G) requirement of 49 on the official career page, but selection is also gated by physical screening and the training pipeline.",
          url: "https://asvabhero.com/air-force-pararescue-asvab-score",
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
              name: "What ASVAB score do I need for Air Force Pararescue?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The official Air Force Pararescue page lists a General (G) requirement of 49. That is the line score you have to clear, but it is necessary, not sufficient. PJ selection is also gated by a demanding physical screening and the full training pipeline.",
              },
            },
            {
              "@type": "Question",
              name: "Is a 49 General score enough to become a PJ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. A General (G) of 49 makes you eligible on the ASVAB, but it does not make you a Pararescueman. Selection is gated by physical fitness screening and one of the longest, most demanding training pipelines in the military. The score is a gate, not a guarantee.",
              },
            },
            {
              "@type": "Question",
              name: "Which aptitude area does Pararescue use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pararescue lists a General (G) requirement of 49 on the official Air Force career page. General is one of the four Air Force composite areas, so raising your General line score to clear 49 is the ASVAB side of qualifying.",
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
              name: "Air Force Pararescue ASVAB Score",
              item: "https://asvabhero.com/air-force-pararescue-asvab-score",
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force Pararescue ASVAB Score
        </h1>

        <VerifiedBlock
          verifiedDate="May 24, 2026"
          sources={[{ label: "airforce.com", url: SOURCE_URL }]}
        >
          <p>
            The official Air Force <strong>Pararescue (PJ)</strong> page lists a{" "}
            <strong>General (G) requirement of 49</strong>. That is the line
            score you clear, but it is necessary, not sufficient. PJ selection
            is also gated by a demanding physical screening and the training
            pipeline. The ASVAB gets you in the door; it does not make you a
            Pararescueman.
          </p>
        </VerifiedBlock>

        <h2>The exact ASVAB requirement</h2>
        <p>
          Per the{" "}
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
            official Pararescue career page
          </a>
          , the requirement is a <strong>General (G) score of 49</strong>.
          General is one of the four Air Force composite areas, so the ASVAB
          side of qualifying is straightforward: raise your General line score
          to clear 49. Your AFQT also has to meet the Air Force enlistment
          baseline before any special warfare role opens.
        </p>

        <h2>Why the score is only the beginning</h2>
        <p>
          Pararescue is one of the most selective career fields in the U.S.
          military. The 49 General requirement is a gate, not the finish line.
          Beyond the ASVAB, candidates face a demanding physical fitness
          screening and one of the longest training pipelines in the force,
          covering combat dive, airborne, survival, and advanced medical
          training. Many qualified scorers never make it through. Treat the
          ASVAB as the easy part you should not lose, and the physical and
          pipeline standards as the real test.
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
                <td className="font-semibold">Aptitude requirement</td>
                <td className="font-mono font-bold text-accent">
                  General (G) 49
                </td>
              </tr>
              <tr>
                <td className="font-semibold">AFQT baseline</td>
                <td>Air Force enlistment minimum applies first</td>
              </tr>
              <tr>
                <td className="font-semibold">Physical screening</td>
                <td>Required; gates selection beyond the ASVAB</td>
              </tr>
              <tr>
                <td className="font-semibold">Training pipeline</td>
                <td>Long, demanding; ASVAB is necessary, not sufficient</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-text-tertiary">
          Source:{" "}
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
            airforce.com/.../special-warfare/pararescue
          </a>{" "}
          · Last verified: May 24, 2026
        </p>

        <h2>Frequently asked questions</h2>
        <h3>What ASVAB score do I need for Air Force Pararescue?</h3>
        <p>
          The official page lists a General (G) requirement of 49. Clear that
          line score and the AFQT enlistment baseline, then prepare for the
          physical screening and pipeline.
        </p>
        <h3>Is a 49 General score enough to become a PJ?</h3>
        <p>
          No. A 49 General makes you eligible on the ASVAB, but selection is
          gated by physical fitness screening and a long training pipeline. The
          score is a gate, not a guarantee.
        </p>
        <h3>Which aptitude area does Pararescue use?</h3>
        <p>
          General (G), with a listed requirement of 49. Raising your General
          line score is the ASVAB side of qualifying.
        </p>

        <h2>Next steps</h2>
        <ul>
          <li>
            See how the General area and the other composites are built on the{" "}
            <Link href="/air-force-mage-score">Air Force MAGE score</Link> page.
          </li>
          <li>
            Confirm you clear the enlistment floor with the{" "}
            <Link href="/air-force-afqt-calculator">
              Air Force AFQT calculator
            </Link>
            .
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
