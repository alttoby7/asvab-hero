import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PracticeTestClient from "@/components/practice-test/PracticeTestClient";
import BrandHero from "@/components/BrandHero";
import { subtestPracticeIndex } from "@/lib/free-practice";

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

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How many questions are on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CAT-ASVAB (computerized version taken at MEPS) has 145 questions across 9 subtests with a total time of 154 minutes. The P&P-ASVAB (paper version at MET sites) has 225 questions in 149 minutes. This diagnostic covers 30 questions sampling all 9 subtests to estimate your AFQT.",
              },
            },
            {
              "@type": "Question",
              name: "Is the ASVAB practice test the same as the real test?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No practice test perfectly replicates the real ASVAB. The CAT-ASVAB is adaptive, meaning question difficulty changes based on your answers. Practice tests use fixed difficulty. However, the content areas, question styles, and time pressure are the same. Consistent practice test scores within 5-10 points of your target give you a reliable baseline.",
              },
            },
            {
              "@type": "Question",
              name: "What math formulas do I need for the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No formula sheet is provided. For Arithmetic Reasoning, memorize: Distance = Rate × Time, Percent = (Part / Whole) × 100, cross-multiplication for proportions, area formulas (rectangles/triangles/circles), and Average = Sum / Count. These five cover roughly 80% of AR questions. For Mathematics Knowledge, add the Pythagorean theorem, slope formula, quadratic formula, and exponent rules. Use the 3-Step Method (WANT / HAVE / CONNECT) on every word problem.",
              },
            },
            {
              "@type": "Question",
              name: "Can you use a calculator on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Calculators are not allowed on any section of the ASVAB, including the math subtests (AR and MK). You must do all arithmetic by hand. Practice mental math and estimation techniques before test day.",
              },
            },
          ],
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

      {/* AEO: What to know before you test */}
      <section className="mt-12 border-t border-navy-border pt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          What to know before you take the ASVAB
        </h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-navy-border bg-navy-light p-5">
            <h3 className="mb-2 text-sm font-bold text-text-primary">
              How many questions are on the ASVAB?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              The CAT-ASVAB (computerized, taken at MEPS) has 145 questions
              across 9 subtests with a total time of 154 minutes. The P&amp;P-ASVAB
              (paper version at MET sites) has 225 questions in 149 minutes.
              This diagnostic samples 30 questions across all 9 subtests to
              estimate your AFQT.
            </p>
          </div>

          <div className="rounded-xl border border-navy-border bg-navy-light p-5">
            <h3 className="mb-2 text-sm font-bold text-text-primary">
              Can you use a calculator on the ASVAB?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              No. Calculators are not allowed on any section of the ASVAB,
              including Arithmetic Reasoning and Mathematics Knowledge. You
              must do all arithmetic by hand. Practice mental math and
              estimation before test day.
            </p>
          </div>

          <div className="rounded-xl border border-navy-border bg-navy-light p-5">
            <h3 className="mb-2 text-sm font-bold text-text-primary">
              What math formulas should I memorize?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              No formula sheet is provided. Five formulas cover ~80% of
              Arithmetic Reasoning questions: Distance = Rate &times; Time,
              Percent = (Part / Whole) &times; 100, cross-multiplication for
              proportions, area formulas for rectangles/triangles/circles, and
              Average = Sum / Count. Use the{" "}
              <strong className="text-text-primary">3-Step Method</strong>{" "}
              (WANT / HAVE / CONNECT) on every word problem. See our{" "}
              <Link
                href="/asvab-arithmetic-reasoning-tips"
                className="text-accent underline hover:text-accent-hover"
              >
                AR tips guide
              </Link>{" "}
              for worked examples, and{" "}
              <Link
                href="/asvab-math-tips"
                className="text-accent underline hover:text-accent-hover"
              >
                ASVAB math tips
              </Link>{" "}
              for the full formula list including MK.
            </p>
          </div>

          <div className="rounded-xl border border-navy-border bg-navy-light p-5">
            <h3 className="mb-2 text-sm font-bold text-text-primary">
              How is the AFQT score calculated?
            </h3>
            <div className="my-2 rounded-lg border border-accent/30 bg-accent-dim px-4 py-2 text-center">
              <span className="font-mono text-sm font-bold text-accent">
                AFQT = 2VE + AR + MK
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              VE (Verbal Expression) combines Word Knowledge and Paragraph
              Comprehension and is <strong>doubled</strong> in the formula.
              That means improving vocabulary has twice the AFQT impact of
              improving math by the same amount. The Army&apos;s ASDP data shows
              an average 17-point AFQT improvement in just 3 weeks of
              structured prep. Build a plan with our{" "}
              <Link
                href="/asvab-study-guide"
                className="text-accent underline hover:text-accent-hover"
              >
                study guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Crawlable free practice by subtest */}
      <section className="mt-12 border-t border-navy-border pt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Free practice questions by subtest
        </h2>
        <p className="mt-3 text-text-secondary">
          Want to study without signing in? Each subtest has free practice
          questions with the correct answer and a full explanation for every one:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {subtestPracticeIndex().map((s) => (
            <li key={s.slug}>
              <Link
                href={`/free-asvab-practice-test/${s.slug}`}
                className="text-sm text-accent underline hover:text-accent-hover"
              >
                ASVAB {s.meta.fullName} practice test ({s.questions.length} questions)
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-text-secondary">
          Ready for the real thing? See what a{" "}
          <Link
            href="/full-length-asvab-practice-test"
            className="text-accent underline hover:text-accent-hover"
          >
            full-length ASVAB practice test
          </Link>{" "}
          involves: all 9 subtests, timed.
        </p>
      </section>
    </div>
  );
}
