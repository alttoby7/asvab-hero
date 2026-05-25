import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import EmailCapture from "@/components/EmailCapture";
import FreePracticeQuestions from "@/components/practice-test/FreePracticeQuestions";
import {
  allSubtestSlugs,
  getSubtestPractice,
  subtestPracticeIndex,
  type SubtestPractice,
} from "@/lib/free-practice";

const BASE = "https://asvabhero.com";

export function generateStaticParams() {
  return allSubtestSlugs().map((subtest) => ({ subtest }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subtest: string }>;
}): Promise<Metadata> {
  const { subtest } = await params;
  const data = getSubtestPractice(subtest);
  if (!data) return {};
  const { meta, questions } = data;
  const url = `${BASE}/free-asvab-practice-test/${subtest}`;
  return {
    title: `Free ASVAB ${meta.fullName} Practice Test (2026): ${questions.length} Questions + Answers`,
    description: `${questions.length} free ASVAB ${meta.fullName} (${meta.subtest}) practice questions, each with a worked answer explanation. ${meta.description}`,
    alternates: { canonical: url },
  };
}

function buildFaq(data: SubtestPractice) {
  const { meta, questions } = data;
  const afqt = meta.isAFQT
    ? `Yes. ${meta.fullName} is one of the four AFQT subtests (AR, WK, PC, MK), so it directly affects your enlistment eligibility.${
        meta.veDoubled
          ? " As part of Verbal Expression, it is doubled in the AFQT formula, which makes it especially high-impact."
          : ""
      }`
    : `No. ${meta.fullName} is not one of the four AFQT subtests, so it does not affect your AFQT/enlistment score. It does feed line scores that determine which military jobs you qualify for.`;
  return [
    {
      q: `How many free ${meta.fullName} practice questions are here?`,
      a: `This page has ${questions.length} free ASVAB ${meta.fullName} questions, each with the correct answer and a full worked explanation. They're free to use with no account required.`,
    },
    {
      q: `Does ${meta.fullName} count toward my AFQT score?`,
      a: afqt,
    },
    {
      q: `What does the ${meta.fullName} subtest cover?`,
      a: `${meta.description} On the CAT-ASVAB it has ${meta.questionCount} questions with about ${meta.timeMinutes} minutes to answer them. Topics include: ${meta.topicSummary}.`,
    },
    {
      q: `Are these the same as the real ASVAB questions?`,
      a: `No. These are original practice questions calibrated to match the style and difficulty of the real ASVAB. The actual test is a secure exam, so no one publishes its live items. Practicing this format is the closest legitimate prep.`,
    },
  ];
}

export default async function SubtestPracticePage({
  params,
}: {
  params: Promise<{ subtest: string }>;
}) {
  const { subtest } = await params;
  const data = getSubtestPractice(subtest);
  if (!data) notFound();
  const { meta, questions, tipsHref } = data;
  const url = `${BASE}/free-asvab-practice-test/${subtest}`;
  const faqItems = buildFaq(data);
  const others = subtestPracticeIndex().filter((s) => s.slug !== subtest);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Quiz + per-question Q&A schema (GEO: lets AI engines extract answers) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: `Free ASVAB ${meta.fullName} Practice Test`,
          about: {
            "@type": "Thing",
            name: `ASVAB ${meta.fullName} (${meta.subtest})`,
          },
          educationalLevel: "High School",
          numberOfQuestions: questions.length,
          isAccessibleForFree: true,
          url,
          hasPart: questions.map((q) => ({
            "@type": "Question",
            eduQuestionType: "Multiple choice",
            text: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Correct answer: ${q.options[q.correctIndex]}. ${q.explanation}`,
            },
            suggestedAnswer: q.options
              .map((opt, idx) =>
                idx === q.correctIndex
                  ? null
                  : { "@type": "Answer", text: opt },
              )
              .filter(Boolean),
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Free ASVAB ${meta.fullName} Practice Test`,
          author: {
            "@type": "Organization",
            "@id": `${BASE}/#organization`,
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            "@id": `${BASE}/#organization`,
            name: "ASVAB Hero",
          },
          mainEntityOfPage: url,
          isAccessibleForFree: true,
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
            { "@type": "ListItem", position: 1, name: "Free ASVAB Practice Tests", item: `${BASE}/free-asvab-practice-tests` },
            { "@type": "ListItem", position: 2, name: `${meta.fullName} Practice Test`, item: url },
          ],
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-text-tertiary" aria-label="Breadcrumb">
        <Link href="/free-asvab-practice-tests" className="hover:text-text-secondary">
          Free Practice Tests
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text-secondary">{meta.fullName}</span>
      </nav>

      {/* Hero */}
      <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        Free ASVAB {meta.fullName} Practice Test
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        {questions.length} {meta.fullName} ({meta.subtest}) practice questions,
        each with a worked explanation of the right answer.
      </p>
      <p className="mt-2 text-sm text-text-tertiary">Last updated May 2026</p>

      {/* Answer-first intro (GEO-extractable) */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-5 sm:p-6">
        <p className="text-text-secondary">
          <strong className="text-text-primary">
            The ASVAB {meta.fullName} ({meta.subtest}) subtest
          </strong>{" "}
          covers{" "}
          {meta.topicSummary.charAt(0).toLowerCase() + meta.topicSummary.slice(1)}.
          On the computer-adaptive CAT-ASVAB it has {meta.questionCount} questions
          with about {meta.timeMinutes} minutes to answer.{" "}
          {meta.isAFQT
            ? "It is one of the four AFQT subtests, so it directly affects your enlistment eligibility."
            : "It is not an AFQT subtest, but it feeds the line scores that decide which jobs you qualify for."}{" "}
          Work the {questions.length} questions below, then read each explanation.
          Understanding <em>why</em> the answer is right is what raises your score.
        </p>
      </section>

      {/* The crawlable questions */}
      <FreePracticeQuestions questions={questions} subtestName={meta.fullName} />

      {/* CTA into the product */}
      <section className="mt-10 rounded-xl border border-accent/40 bg-accent/5 p-6 text-center">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Want a scored practice test across all 9 subtests?
        </h2>
        <p className="mt-2 text-text-secondary">
          Take the free 30-question diagnostic for an instant AFQT estimate and a
          breakdown of your weakest areas. The real ASVAB is longer (about 135
          questions on the computer version), so use this as a fast readiness
          check, not a full-length simulation.
        </p>
        <Link
          href="/free-asvab-practice-test"
          className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Start the free diagnostic
        </Link>
        <p className="mt-3 text-xs text-text-tertiary">
          Create a free account to save your score and unlock unlimited{" "}
          {meta.fullName} drills.
        </p>
      </section>

      {/* What's on this subtest */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          What&apos;s on the ASVAB {meta.fullName} subtest
        </h2>
        <p className="mt-4 text-text-secondary">{meta.description}</p>
        <p className="mt-3 text-text-secondary">
          Common topics you&apos;ll see:
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {meta.sampleTopics.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2 text-text-secondary"
            >
              <span aria-hidden className="mt-1 text-accent">
                •
              </span>
              {t}
            </li>
          ))}
        </ul>
        {tipsHref && (
          <p className="mt-4 text-text-secondary">
            Want strategy, not just questions? Read our{" "}
            <Link href={tipsHref} className="text-accent underline hover:text-accent-hover">
              ASVAB {meta.fullName} tips guide
            </Link>
            .
          </p>
        )}
      </section>

      {/* Email capture */}
      <section className="mt-12">
        <EmailCapture
          headline={`Get a study plan that targets ${meta.fullName}`}
          subhead="Free 30-day plan built around your weakest subtests, plus a 5-email crash course on AFQT, line scores, and what to drill next."
          cta="Email me the plan"
          tag={`free-practice-${data.code.toLowerCase()}`}
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

      {/* Other subtests */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <p className="text-sm font-semibold text-text-primary">
          Free practice tests for the other subtests
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/free-asvab-practice-test/${s.slug}`}
                className="text-sm text-accent underline hover:text-accent-hover"
              >
                {s.meta.fullName} ({s.questions.length} Q)
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-4 space-y-2 border-t border-navy-border pt-4 text-sm">
          <li>
            <Link href="/calculator" className="text-accent underline hover:text-accent-hover">
              ASVAB score calculator
            </Link>{" "}
            for converting raw scores to AFQT and line scores
          </li>
          <li>
            <Link href="/asvab-score-requirements" className="text-accent underline hover:text-accent-hover">
              Score requirements by branch
            </Link>{" "}
            for army, navy, air force, marines, and coast guard
          </li>
        </ul>
      </section>
    </div>
  );
}
