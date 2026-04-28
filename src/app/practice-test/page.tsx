import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PracticeTestClient from "@/components/practice-test/PracticeTestClient";

export const metadata: Metadata = {
  title: "Free ASVAB Practice Test — 30 Questions, All 9 Subtests",
  description:
    "Take our free ASVAB practice test with 30 timed questions across all 9 subtests. Get your estimated AFQT score, identify strengths and weaknesses, and see which military jobs you qualify for.",
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
          Free ASVAB Practice Test
        </h1>
        <p className="mt-3 text-text-secondary">
          Test your readiness with timed questions covering all 9 ASVAB
          subtests. Get an estimated AFQT score, a per-topic breakdown, and a
          recommended next step. Pick a Diagnostic for a balanced 30-question
          run, or drill a single subtest where you need the most work.
        </p>
      </div>

      <PracticeTestClient />
    </div>
  );
}
