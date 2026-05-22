import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PracticeTestClient from "@/components/practice-test/PracticeTestClient";
import BrandHero from "@/components/BrandHero";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "ASVAB Practice Test: Diagnostic + Subtest Drills",
  description:
    "Free ASVAB diagnostic plus unlimited subtest drills. 30 timed questions across all 9 subtests, estimated AFQT score, per-topic breakdown, and targeted drill mode for every subtest.",
  alternates: {
    canonical: "https://asvabhero.com/practice-test",
  },
};

export default function PracticeTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: "Free ASVAB Practice Test",
          about: {
            "@type": "Thing",
            name: "Armed Services Vocational Aptitude Battery (ASVAB)",
          },
          educationalLevel: "High School",
          numberOfQuestions: 30,
          timeRequired: "PT36M",
          isAccessibleForFree: true,
          url: "https://asvabhero.com/practice-test",
        }}
      />

      {/* SEO Content */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Practice Test &amp; Subtest Drills
        </h1>
        <p className="mt-2 text-sm text-text-tertiary">
          Active duty?{" "}
          <Link
            href="/afct-practice-test"
            className="text-accent underline hover:text-accent-hover"
          >
            Use the AFCT practice page
          </Link>{" "}
          for retesting-specific framing.
        </p>
        <p className="mt-3 text-text-secondary">
          Test your readiness with timed questions covering all 9 ASVAB
          subtests. Get an estimated AFQT score, a per-topic breakdown, and a
          recommended next step. Pick a Diagnostic for a balanced 30-question
          run, or drill a single subtest where you need the most work.
        </p>
        <p className="mt-3 text-sm text-text-tertiary">
          The diagnostic also helps you{" "}
          <Link
            href="/gt-score"
            className="text-accent underline hover:text-accent-hover"
          >
            estimate your GT score
          </Link>{" "}
          from your verbal and arithmetic results. Already tested? Review the{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent underline hover:text-accent-hover"
          >
            ASVAB retake rules
          </Link>{" "}
          before you book again.
        </p>
        <BrandHero
          src="/images/generated/asvab-practice-test-hero.png"
          alt="Close-up of a hand filling in a Scantron-style ASVAB answer sheet with a #2 pencil, timer ticking beside it."
          width={1536}
          height={1024}
          priority
          className="mt-8 overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
        />
      </div>

      <PracticeTestClient />

      <section className="mt-10">
        <EmailCapture
          headline="Want a study plan that targets your weakest subtests?"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="practice-test"
        />
      </section>
    </div>
  );
}
