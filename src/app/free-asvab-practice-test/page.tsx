import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FreeDiagnosticClient from "@/components/practice-test/FreeDiagnosticClient";
import EmailCapture from "@/components/EmailCapture";
import VerifiedBlock from "@/components/VerifiedBlock";
import { subtestPracticeIndex } from "@/lib/free-practice";

export const metadata: Metadata = {
  title: "Free ASVAB Practice Test (2026), 30 Questions, Instant AFQT Score",
  description:
    "Take a free ASVAB practice test with 30 timed questions across all 9 subtests. Get your estimated AFQT score instantly. No signup required to start.",
  alternates: {
    canonical: "https://asvabhero.com/free-asvab-practice-test",
  },
};

const faqItems = [
  {
    q: "Is this ASVAB practice test really free?",
    a: "Yes. The 30-question diagnostic is completely free, no account required, no credit card, no trial. You can take it right now and see your results immediately.",
  },
  {
    q: "How many questions are on this practice test?",
    a: "30 questions, balanced across all 9 ASVAB subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, Mathematics Knowledge, General Science, Electronics Information, Auto & Shop Information, Mechanical Comprehension, and Assembling Objects.",
  },
  {
    q: "How long does the practice test take?",
    a: "The timed limit is 36 minutes, but most users finish in 20–25 minutes. You can pause mid-test and your progress is saved locally in your browser.",
  },
  {
    q: "Will I get an AFQT score?",
    a: "Yes. After completing the test you'll see an estimated AFQT percentile based on your performance on the four AFQT subtests (AR, WK, PC, MK). It's an estimate, real ASVAB scores account for item-level difficulty, but it's close enough to gauge your readiness.",
  },
  {
    q: "How accurate is this practice test compared to the real ASVAB?",
    a: "Questions follow the same multiple-choice format and topic coverage as the CAT-ASVAB. Treat the AFQT result as a practice estimate, not an official score, because only a test-center sitting produces an official AFQT. The closer you are to your goal score, the more useful it is to supplement with repeated subtest drills.",
  },
  {
    q: "Can I take the diagnostic more than once?",
    a: "Anonymous users get one free diagnostic. Creating a free account lets you retake it and track progress over time. Pro users get unlimited diagnostic runs plus unlimited subtest drills.",
  },
];

export default function FreeAsvabPracticeTestPage() {
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
          url: "https://asvabhero.com/free-asvab-practice-test",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />

      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Free ASVAB Practice Test
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          30 questions across all 9 subtests. Instant AFQT estimate. No signup
          required.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-tertiary">
          <span>30 questions</span>
          <span>·</span>
          <span>All 9 subtests</span>
          <span>·</span>
          <span>~36 min</span>
          <span>·</span>
          <span>No account needed</span>
        </div>
        <a
          href="#test"
          className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Start Free Diagnostic
        </a>
        <p className="mt-3 text-xs text-text-tertiary">
          Active duty?{" "}
          <Link
            href="/afct-practice-test"
            className="underline hover:text-text-secondary"
          >
            Use the AFCT practice page
          </Link>{" "}
          for retesting-specific framing.
        </p>
      </div>

      <VerifiedBlock
        title="How this diagnostic works"
        verifiedDate="May 2026"
        sources={[
          { label: "Official ASVAB sample questions", url: "https://www.officialasvab.com/applicants/sample-questions/" },
          { label: "Official ASVAB prep disclaimer", url: "https://www.officialasvab.com/applicants/asvab-test-preparation-disclaimer/" },
          { label: "Official CAT-ASVAB", url: "https://www.officialasvab.com/applicants/cat-asvab/" },
        ]}
      >
        <p>
          30 original practice questions across all 9 subtests, in the same
          multiple-choice format as the CAT-ASVAB. Your AFQT result is a
          practice estimate, not an official score. Only a test-center sitting
          produces an official AFQT.
        </p>
      </VerifiedBlock>

      {/* Embedded test */}
      <div id="test">
        <FreeDiagnosticClient />
      </div>

      {/* Practice one subtest at a time (links to crawlable per-subtest pages) */}
      <section className="mt-10 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Or practice one subtest at a time
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Practice questions for each ASVAB subtest, each with a worked
          explanation of the right answer.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {subtestPracticeIndex().map((s) => (
            <li key={s.slug}>
              <Link
                href={`/free-asvab-practice-test/${s.slug}`}
                className="text-sm text-accent underline hover:text-accent-hover"
              >
                {s.meta.fullName} practice test ({s.questions.length} Q)
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Post-test email capture */}
      <section className="mt-10">
        <EmailCapture
          headline="Want a study plan based on your results?"
          subhead="Free 30-day plan targeting your weakest subtests, plus a 5-email crash course on AFQT, line scores, and what to drill next."
          cta="Email me the plan"
          tag="free-practice-test"
        />
      </section>

      {/* SEO content */}
      <section className="mt-16 space-y-10 border-t border-navy-border pt-12">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            What this free ASVAB practice test includes
          </h2>
          <p className="mt-4 text-text-secondary">
            The diagnostic covers all nine ASVAB subtests in a single 30-question
            run: Arithmetic Reasoning (AR), Word Knowledge (WK), Paragraph
            Comprehension (PC), Mathematics Knowledge (MK), General Science (GS),
            Electronics Information (EI), Auto &amp; Shop Information (AS),
            Mechanical Comprehension (MC), and Assembling Objects (AO).
          </p>
          <p className="mt-3 text-text-secondary">
            After you finish, you get an estimated AFQT percentile, a per-subtest
            breakdown showing where you lost points, and a recommended next step
            based on your weakest areas. No signup needed to see your results.
          </p>
          <p className="mt-3 text-text-secondary">
            If you already know which subtest is holding you back, you can skip
            the full diagnostic and go straight to a{" "}
            <Link
              href="/practice-test"
              className="text-accent underline hover:text-accent-hover"
            >
              subtest drill
            </Link>{" "}
            targeting that one area.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            How long does the practice test take?
          </h2>
          <p className="mt-4 text-text-secondary">
            The timed limit is 36 minutes, roughly 72 seconds per question. Most
            users finish in 20–25 minutes. The timer reflects real CAT-ASVAB
            pacing so your score estimate accounts for time pressure, not just
            accuracy.
          </p>
          <p className="mt-3 text-text-secondary">
            Your progress is saved in your browser, so if you close the tab
            mid-test you can pick up where you left off. Results are shown
            immediately after your last answer.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            How your score is calculated
          </h2>
          <p className="mt-4 text-text-secondary">
            The AFQT (Armed Forces Qualification Test) score is drawn from four
            subtests: Arithmetic Reasoning, Word Knowledge, Paragraph
            Comprehension, and Mathematics Knowledge. Your performance on those
            four drives the AFQT percentile.
          </p>
          <p className="mt-3 text-text-secondary">
            The remaining five subtests (GS, EI, AS, MC, AO) don&apos;t affect
            your AFQT but do determine your line scores, which control military
            job eligibility. The diagnostic shows your per-subtest results so you
            can see which line scores are at risk, not just your overall AFQT.
          </p>
          <p className="mt-3 text-text-secondary">
            Need to understand what your score means for a specific branch?{" "}
            <Link
              href="/asvab-score-requirements"
              className="text-accent underline hover:text-accent-hover"
            >
              See ASVAB score requirements by branch
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            How close is this to the real ASVAB?
          </h2>
          <p className="mt-4 text-text-secondary">
            Questions follow the same multiple-choice format and topic coverage
            as the CAT-ASVAB. Treat the AFQT result as a practice estimate. Only
            a test-center sitting produces an official AFQT. The closer you are
            to a qualifying cutoff, the more you should supplement with repeated
            drills rather than relying on a single practice run.
          </p>
          <p className="mt-3 text-text-secondary">
            One thing to keep in mind: the real CAT-ASVAB adapts question
            difficulty based on your answers. This diagnostic uses a fixed
            question draw, so high scorers may find it slightly easier than the
            real test and lower scorers slightly harder. Treat the result as a
            directional estimate, not a guarantee.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            What to do after your first score
          </h2>
          <p className="mt-4 text-text-secondary">
            Your results page shows exactly which subtests pulled your score down.
            That&apos;s your study list. A high AFQT with a weak MC score won&apos;t
            block enlistment, but it will close off mechanical and technical jobs.
            A low AR or MK score affects both your AFQT and most line scores, 
            prioritize those first.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
            <li>
              <strong className="text-text-primary">Drill weak subtests</strong>, 
              use the{" "}
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                subtest drill mode
              </Link>{" "}
              to focus on one area at a time
            </li>
            <li>
              <strong className="text-text-primary">Review study guides</strong>, 
              topic-level guides for every subtest are available under each
              subtest&apos;s study section
            </li>
            <li>
              <strong className="text-text-primary">Check your target score</strong>{" "}
, {" "}
              <Link
                href="/asvab-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                branch score requirements
              </Link>{" "}
              tell you exactly what you need to qualify
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            FAQ
          </h2>
          <dl className="mt-6 space-y-6">
            {faqItems.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-text-primary">{item.q}</dt>
                <dd className="mt-2 text-text-secondary">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer links */}
        <div className="rounded-xl border border-navy-border bg-navy-light p-6">
          <p className="text-sm font-semibold text-text-primary">
            Keep going after your diagnostic
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                Subtest drills
              </Link>{" "}
, drill one subtest at a time
            </li>
            <li>
              <Link
                href="/asvab-score-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                ASVAB score calculator
              </Link>{" "}
, convert raw scores to AFQT and line scores
            </li>
            <li>
              <Link
                href="/asvab-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                Score requirements by branch
              </Link>{" "}
, army, navy, air force, marines, coast guard
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
