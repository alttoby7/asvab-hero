import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import RetakeDateCalculator from "@/components/RetakeDateCalculator";

export const metadata: Metadata = {
  title: "ASVAB Retake Calculator: When Can You Retest? (2026)",
  description:
    "Enter your last test date. Instantly see the earliest date you can retake the ASVAB per the official 1/1/6 rule, plus Confirmation Test alerts and branch DEP rules.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-retake-calculator",
  },
};

export default function AsvabRetakeCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ASVAB Retake Calculator",
          url: "https://asvabhero.com/asvab-retake-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate the earliest date you can retake the ASVAB based on the official 1/1/6 retest policy.",
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Retake Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Enter your last test date. We&apos;ll tell you the exact day you can
          retest — and flag anything that could blow it up.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="April 2026"
        sources={[
          {
            label: "officialasvab.com",
            url: "https://www.officialasvab.com/applicants/retesting/",
          },
        ]}
      >
        <p>
          The military uses the <strong>1/1/6 rule</strong>: wait 1 calendar
          month after your initial ASVAB, 1 more after your first retest, then
          6 calendar months between every retest after that. A{" "}
          <strong>20+ point AFQT jump within 6 months</strong> triggers a{" "}
          mandatory <strong>Confirmation Test (C-Test)</strong>. Fail the
          C-Test and your AFQT reverts to the original score.
        </p>
      </VerifiedBlock>

      <section className="mt-8">
        <RetakeDateCalculator />
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-text-primary">
          How the 1/1/6 rule works
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 font-semibold text-text-secondary">
                  Retest number
                </th>
                <th className="py-2 pr-4 font-semibold text-text-secondary">
                  Wait period
                </th>
                <th className="py-2 font-semibold text-text-secondary">
                  Measured from
                </th>
              </tr>
            </thead>
            <tbody className="text-text-primary/80">
              <tr className="border-b border-navy-border">
                <td className="py-2 pr-4">1st retest</td>
                <td className="py-2 pr-4">1 calendar month</td>
                <td className="py-2">Initial test date</td>
              </tr>
              <tr className="border-b border-navy-border">
                <td className="py-2 pr-4">2nd retest</td>
                <td className="py-2 pr-4">1 calendar month</td>
                <td className="py-2">1st retest date</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">3rd retest and beyond</td>
                <td className="py-2 pr-4">6 calendar months</td>
                <td className="py-2">Previous retest date</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-text-tertiary">
          &ldquo;Calendar month&rdquo; means same date next month — January 15
          → February 15, not 30 days later.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-text-primary">
          What triggers the Confirmation Test
        </h2>
        <p className="text-text-secondary">
          If your AFQT jumps <strong>20 or more points</strong> on a retest
          taken within <strong>6 months</strong> of a previous score, MEPS
          requires you to take a <strong>Confirmation Test (C-Test)</strong>.
          The C-Test is a full ASVAB administered only at MEPS (not MET sites).
        </p>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          <li>
            <strong>If you pass:</strong> your retest score becomes official.
          </li>
          <li>
            <strong>If you fail:</strong> your AFQT reverts to the{" "}
            <em>original</em> score, not your retest score. A large jump that
            can&apos;t be reproduced is considered an indicator of testing
            irregularity.
          </li>
        </ul>
        <p className="mt-3 text-sm text-text-tertiary">
          The calculator above flags this automatically if you fill in
          previous and target AFQT.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-text-primary">
          Next steps
        </h2>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>
            &bull;{" "}
            <Link href="/calculator" className="text-accent hover:underline">
              Run your scores through the calculator
            </Link>{" "}
            to see which jobs a higher AFQT would unlock.
          </li>
          <li>
            &bull;{" "}
            <Link
              href="/how-to-retake-the-asvab"
              className="text-accent hover:underline"
            >
              Read the full retest policy guide
            </Link>{" "}
            — DEP rules, branch differences, C-Test scenarios.
          </li>
          <li>
            &bull;{" "}
            <Link
              href="/asvab-study-guide"
              className="text-accent hover:underline"
            >
              Build a study plan
            </Link>{" "}
            for the subtests that need the biggest jump.
          </li>
        </ul>
      </section>
    </div>
  );
}
