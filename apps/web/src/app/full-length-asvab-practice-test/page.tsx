import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import EmailCapture from "@/components/EmailCapture";
import VerifiedBlock from "@/components/VerifiedBlock";
import { ORG_AUTHOR } from "@/lib/author";
import { SUBTEST_METADATA } from "@/data/subtest-metadata";
import { subtestPracticeIndex } from "@/lib/free-practice";

const BASE = "https://asvabhero.com";
const URL = `${BASE}/full-length-asvab-practice-test`;

export const metadata: Metadata = {
  title: "Full-Length ASVAB Practice Test: Format, Timing, and How to Prepare",
  description:
    "What a full-length ASVAB looks like: all 9 subtests, 135 scored questions on the CAT version (225 on paper), and per-section time limits. Start free with a 30-question diagnostic; full timed simulation is part of ASVAB Hero Pro.",
  alternates: { canonical: URL },
};

const faqItems = [
  {
    q: "How many questions are on the full ASVAB?",
    a: "The computer-adaptive CAT-ASVAB has about 135 scored questions across 9 subtests. The paper version (P&P-ASVAB) has 225 questions. A true full-length practice test should mirror that scope, not a 10 or 20 question quiz.",
  },
  {
    q: "How long does a full-length ASVAB practice test take?",
    a: "Plan for roughly 2.5 to 3 hours to match real testing conditions. The ASVAB Hero full simulation runs 134 questions on a 150-minute timer so you practice pacing and stamina, not just the content.",
  },
  {
    q: "Is the full-length practice test free?",
    a: "The 30-question diagnostic and per-subtest practice questions are free with no account. The full-length, timed simulation across all 9 subtests is part of ASVAB Hero Pro, because it draws on the full calibrated question bank and full scoring.",
  },
  {
    q: "Why take a full-length test instead of short quizzes?",
    a: "Short quizzes show you content gaps. A full-length test shows you what happens to your accuracy in hour two, how you pace 134 questions, and whether your AFQT and line scores hold up under real time pressure. Both matter, but only one rehearses test day.",
  },
  {
    q: "Does a full-length simulation predict my real ASVAB score?",
    a: "It is an estimate. The questions are calibrated to the CAT-ASVAB difficulty distribution, so a full run gives a realistic AFQT and line-score picture, but the official score comes only from a test center.",
  },
];

export default function FullLengthAsvabPracticeTestPage() {
  const subtests = subtestPracticeIndex();
  const slugFor = (code: string) =>
    subtests.find((s) => s.code === code)?.slug;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Full-Length ASVAB Practice Test",
          description:
            "What a full-length ASVAB practice test involves: all 9 subtests, about 135 scored questions on the CAT version, and real timing.",
          url: URL,
          author: ORG_AUTHOR,
          publisher: {
            "@type": "Organization",
            "@id": `${BASE}/#organization`,
            name: "ASVAB Hero",
          },
          isAccessibleForFree: false,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ASVAB Practice Test", item: `${BASE}/practice-test` },
            { "@type": "ListItem", position: 2, name: "Full-Length ASVAB Practice Test", item: URL },
          ],
        }}
      />

      <nav className="mb-4 text-sm text-text-tertiary" aria-label="Breadcrumb">
        <Link href="/practice-test" className="hover:text-text-secondary">
          Practice Test
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text-secondary">Full-Length</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        Full-Length ASVAB Practice Test: Format and How to Prepare
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        What the real ASVAB looks like end-to-end: all 9 subtests, 135 scored
        questions on the CAT, and per-section time limits. Free 30-question
        diagnostic on this site; the full timed simulation is part of ASVAB
        Hero Pro.
      </p>
      <p className="mt-2 text-sm text-text-tertiary">Last updated May 2026</p>

      {/* Answer-first + sources */}
      <VerifiedBlock
        title="The short answer"
        verifiedDate="May 2026"
        sources={[
          { label: "Official CAT-ASVAB administration", url: "https://www.officialasvab.com/applicants/cat-asvab/" },
          { label: "Official ASVAB fact sheet", url: "https://www.officialasvab.com/applicants/fact-sheet/" },
        ]}
      >
        <p>
          The full ASVAB has 9 subtests and 135 scored questions on the
          computer-adaptive CAT-ASVAB (about 145 with tryout items, 225 on the
          paper version), and the maximum scored time is roughly 3 hours. A real
          full-length practice test should match that scope. Start free with the
          30-question diagnostic below, then run a full timed simulation closer
          to test day.
        </p>
      </VerifiedBlock>

      {/* Structure table */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          What a full-length ASVAB covers
        </h2>
        <p className="mt-4 text-text-secondary">
          Every full ASVAB runs all 9 subtests. Four of them (AR, WK, PC, MK)
          make up your AFQT, the score that decides whether you can enlist. The
          other five feed the line scores that decide which jobs you qualify for.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy-border text-text-tertiary">
                <th className="py-2 pr-4 font-semibold">Subtest</th>
                <th className="py-2 pr-4 font-semibold">Questions (CAT)</th>
                <th className="py-2 font-semibold">Counts toward</th>
              </tr>
            </thead>
            <tbody>
              {SUBTEST_METADATA.map((m) => (
                <tr key={m.subtest} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 text-text-secondary">
                    {m.fullName} ({m.subtest})
                  </td>
                  <td className="py-2 pr-4 text-text-secondary">{m.questionCount}</td>
                  <td className="py-2 text-text-secondary">
                    {m.isAFQT ? "AFQT + line scores" : "Line scores"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-text-tertiary">
          Counts reflect the CAT-ASVAB scored questions and vary slightly by
          version. The paper ASVAB has more questions per subtest.
        </p>
      </section>

      {/* Why full-length */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Why a full-length run matters
        </h2>
        <p className="mt-4 text-text-secondary">
          Short drills fix content gaps. A full-length test does three things a
          quiz cannot:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
          <li>
            <strong className="text-text-primary">Pacing.</strong> You learn
            whether you can clear 134 questions inside the clock instead of
            running out of time on the sections that matter.
          </li>
          <li>
            <strong className="text-text-primary">Stamina.</strong> Accuracy in
            hour two is a different skill than accuracy on question five. The only
            way to train it is to sit the whole thing.
          </li>
          <li>
            <strong className="text-text-primary">A real readout.</strong> A full
            run produces an AFQT estimate and line scores together, so you see
            exactly which jobs are in reach and which subtest is holding you back.
          </li>
        </ul>
      </section>

      {/* Funnel */}
      <section className="mt-12 rounded-xl border border-accent/40 bg-accent/5 p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Start free, then go full-length
        </h2>
        <p className="mt-2 text-text-secondary">
          The fastest way to start is the free 30-question diagnostic across all 9
          subtests. It gives you an instant AFQT estimate and shows your weakest
          areas, with no account required.
        </p>
        <Link
          href="/free-asvab-practice-test"
          className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Take the free diagnostic
        </Link>
        <p className="mt-4 text-sm text-text-secondary">
          When you are close to test day, the{" "}
          <strong className="text-text-primary">full-length simulation</strong> (134
          questions, all 9 subtests, 150-minute timer) is part of{" "}
          <Link href="/upgrade" className="text-accent underline hover:text-accent-hover">
            ASVAB Hero Pro
          </Link>
          . It draws on the full calibrated question bank and scores your AFQT and
          line scores the way a real sitting would.
        </p>
      </section>

      {/* Free per-subtest practice */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Free practice by subtest
        </h2>
        <p className="mt-4 text-text-secondary">
          Want to build up one subtest at a time first? Each of these has free
          practice questions with a worked explanation for every answer:
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SUBTEST_METADATA.map((m) => {
            const slug = slugFor(m.subtest);
            if (!slug) return null;
            return (
              <Link
                key={m.subtest}
                href={`/free-asvab-practice-test/${slug}`}
                className="group flex flex-col items-center rounded-xl border border-navy-border bg-navy-light p-4 text-center transition hover:border-accent/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/generated/asvab-subtest-${m.subtest.toLowerCase()}-t.png`}
                  alt={`${m.fullName} (${m.subtest}) ASVAB practice`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-20 w-20 sm:h-24 sm:w-24"
                />
                <span className="mt-2 text-sm font-medium text-text-primary group-hover:text-accent">
                  {m.fullName}
                </span>
                <span className="text-xs text-text-tertiary">{m.subtest}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Email capture */}
      <section className="mt-12">
        <EmailCapture
          headline="Get a full-length study plan"
          subhead="A week-by-week plan that builds toward a full timed run, plus a 5-email crash course on AFQT, line scores, and pacing."
          cta="Email me the plan"
          tag="full-length-practice-test"
        />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary">FAQ</h2>
        <dl className="mt-6 space-y-6">
          {faqItems.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-text-primary">{item.q}</dt>
              <dd className="mt-2 text-text-secondary">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6 text-sm">
        <p className="font-semibold text-text-primary">Keep going</p>
        <ul className="mt-3 space-y-2">
          <li>
            <Link href="/free-asvab-practice-test" className="text-accent underline hover:text-accent-hover">
              Free ASVAB practice test
            </Link>{" "}
            (30-question diagnostic)
          </li>
          <li>
            <Link href="/calculator" className="text-accent underline hover:text-accent-hover">
              ASVAB score calculator
            </Link>{" "}
            for converting raw scores to AFQT and line scores
          </li>
          <li>
            <Link href="/asvab-score-requirements" className="text-accent underline hover:text-accent-hover">
              Score requirements by branch
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
