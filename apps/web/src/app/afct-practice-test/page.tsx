import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import BrandHero from "@/components/BrandHero";
import EmailCapture from "@/components/EmailCapture";
import AfctPracticeClient from "@/components/practice-test/AfctPracticeClient";
import { QUESTIONS_PLUS } from "@/lib/bank-stats";

export const metadata: Metadata = {
  title:
    "Free AFCT Practice Test, 30 Questions, All 9 Subtests",
  description:
    "Take a free AFCT practice test with 30 timed questions across all 9 subtests. Estimate your GT score before risking your official record. Built for active-duty retesting.",
  alternates: {
    canonical: "https://asvabhero.com/afct-practice-test",
  },
};

const faqEntries = [
  {
    q: "Is the AFCT practice test different from the ASVAB practice test?",
    a: `No. The AFCT and the ASVAB cover the same 9 subtests with the same question types. The difference is regulatory: AFCT scores replace your previous scores on file, even if lower. This practice test uses the same ${QUESTIONS_PLUS} question bank to give you an accurate baseline before you retest.`,
  },
  {
    q: "Can I use this to estimate my GT score?",
    a: "Yes. After you finish the 30-question diagnostic, you get a per-subtest breakdown including Word Knowledge, Paragraph Comprehension, and Arithmetic Reasoning, the three subtests that determine your GT composite. Plug those numbers into the GT Score Calculator for a projection.",
  },
  {
    q: "How many times can I take the AFCT?",
    a: "Branch policies vary. Army and Marines require a 6-month wait between attempts (waived for BSEP graduates). Air Force and Navy follow similar intervals. There is no lifetime cap, but each attempt replaces your score, study until you are confident before retesting.",
  },
  {
    q: "What is the AFCT score replacement rule?",
    a: "Your new AFCT scores replace your previous scores across all subtests. There is no best-of rule. If you score lower on any subtest, that lower score becomes your official record. This is why baseline practice matters.",
  },
  {
    q: "Do I need to study differently for the AFCT vs the ASVAB?",
    a: "The content is identical. What changes is your strategy: focus on the specific subtests that feed the composite score you need (usually GT for reclass). Use this diagnostic to find your weak subtests, then drill those with targeted practice.",
  },
];

export default function AfctPracticeTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* ───────── Schema ───────── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: "Free AFCT Practice Test",
          about: {
            "@type": "Thing",
            name: "Armed Forces Classification Test (AFCT)",
          },
          educationalLevel: "Post-Secondary",
          numberOfQuestions: 30,
          timeRequired: "PT36M",
          isAccessibleForFree: true,
          url: "https://asvabhero.com/afct-practice-test",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* ───────── Hero ───────── */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Free AFCT Practice Test
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Same content as the AFCT. Timed diagnostic before you risk replacing
          your official score.
        </p>

        {/* Risk callout */}
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <strong>Score replacement rule:</strong> AFCT scores replace your
          previous scores across all subtests, even if lower. Practice first.
        </div>

        {/* Proof strip */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-wider text-text-tertiary">
          <span>{QUESTIONS_PLUS} questions</span>
          <span className="text-navy-border">·</span>
          <span>9 subtests</span>
          <span className="text-navy-border">·</span>
          <span>timed diagnostic</span>
          <span className="text-navy-border">·</span>
          <span>GT-focused prep</span>
        </div>

        <BrandHero
          src="/images/generated/afct-practice-test-hero.png?v=2"
          alt="Active-duty service member studying for the AFCT at a military Education Center desk."
          width={1536}
          height={1024}
          priority
          className="mt-8 overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
        />
      </div>

      {/* ───────── Practice Engine ───────── */}
      <AfctPracticeClient />

      {/* ───────── SEO Content ───────── */}
      <section className="mt-12 space-y-8 text-text-secondary">
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            What Is the AFCT?
          </h2>
          <p className="mt-2">
            The Armed Forces Classification Test is how active-duty service
            members retake the ASVAB without returning to MEPS. It covers the
            same 9 subtests, uses the same scoring, and determines the same
            composite scores, GT, CL, ST, and every other line score on your
            record.
          </p>
          <p className="mt-2">
            The critical difference: your new scores replace your old ones. No
            best-of rule. Read the{" "}
            <Link
              href="/afct"
              className="text-accent underline hover:text-accent-hover"
            >
              full AFCT guide
            </Link>{" "}
            for branch-specific retake policies, the score replacement rule, and
            how to request the test through your chain of command.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            AFCT vs ASVAB: Same Questions, Different Stakes
          </h2>
          <p className="mt-2">
            The question bank is identical. What changes is the risk profile:
            recruits take the ASVAB to qualify; active-duty members take the
            AFCT to improve scores they already have on file. An unprepared
            attempt can lower your GT and close doors that were previously open.
            This practice test lets you identify weak subtests before that
            happens.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Best For
          </h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">&#x2713;</span>
              <span>
                <strong className="text-text-primary">
                  GT 110 for OCS or Warrant Officer
                </strong>{" "}
, see exactly which subtests are holding your GT down
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">&#x2713;</span>
              <span>
                <strong className="text-text-primary">
                  MOS reclass or lateral move
                </strong>{" "}
, confirm you meet the line score threshold before you submit
                your packet
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">&#x2713;</span>
              <span>
                <strong className="text-text-primary">
                  BSEP or FAST prep
                </strong>{" "}
, baseline your weak areas before starting a formal program
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">&#x2713;</span>
              <span>
                <strong className="text-text-primary">
                  Pre-packet score refresh
                </strong>{" "}
, verify readiness before burning a 6-month retest window
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            How to Use This Before Your AFCT
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-navy-border bg-navy-light p-4">
              <div className="font-display text-2xl font-bold text-accent">
                1
              </div>
              <h3 className="mt-1 font-display text-sm font-bold text-text-primary">
                Baseline
              </h3>
              <p className="mt-1 text-sm">
                Take the 30-question diagnostic above. Get your estimated AFQT
                and per-subtest scores.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-4">
              <div className="font-display text-2xl font-bold text-accent">
                2
              </div>
              <h3 className="mt-1 font-display text-sm font-bold text-text-primary">
                Identify Gaps
              </h3>
              <p className="mt-1 text-sm">
                Your results show your 3 weakest subtests. Those are the ones
                dragging your GT or target composite down.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-4">
              <div className="font-display text-2xl font-bold text-accent">
                3
              </div>
              <h3 className="mt-1 font-display text-sm font-bold text-text-primary">
                Drill Until Stable
              </h3>
              <p className="mt-1 text-sm">
                Use targeted subtest drills to bring weak areas up. Retest only
                when you are consistently scoring above your target.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            GT Score Thresholds
          </h2>
          <p className="mt-2">
            GT is calculated from Word Knowledge + Paragraph Comprehension +
            Arithmetic Reasoning. These are the thresholds that matter for most
            active-duty career moves:
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <strong className="text-text-primary">GT 100</strong>, minimum
              for most reclassification MOSs
            </li>
            <li>
              <strong className="text-text-primary">GT 107</strong>, unlocks
              intelligence, cyber, and technical MOSs
            </li>
            <li>
              <strong className="text-text-primary">GT 110+</strong>, required
              for OCS, Warrant Officer, and senior technical billets
            </li>
          </ul>
          <p className="mt-3 text-sm">
            Use the{" "}
            <Link
              href="/gt-score"
              className="text-accent underline hover:text-accent-hover"
            >
              GT Score Calculator
            </Link>{" "}
            to project your composite from subtest scores, or the{" "}
            <Link
              href="/calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Line Score Calculator
            </Link>{" "}
            to see all composites at once.
          </p>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          AFCT Practice Test FAQ
        </h2>
        <div className="mt-4 space-y-4">
          {faqEntries.map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-base font-bold text-text-primary">
                {f.q}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Email Capture ───────── */}
      <section className="mt-10">
        <EmailCapture
          headline="Get the GT 110 study plan"
          subhead="Free 30-day plan targeting the subtests that drive your GT score. Plus a 5-email crash course on AFCT scoring, retake strategy, and BSEP prep."
          cta="Email me the plan"
          tag="afct-practice-test"
        />
      </section>

      {/* ───────── Cross-links ───────── */}
      <nav className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link
          href="/afct"
          className="rounded-lg border border-navy-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
        >
          Full AFCT Guide
        </Link>
        <Link
          href="/bsep"
          className="rounded-lg border border-navy-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
        >
          BSEP GT Improvement
        </Link>
        <Link
          href="/gt-score"
          className="rounded-lg border border-navy-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
        >
          GT Score Calculator
        </Link>
        <Link
          href="/calculator"
          className="rounded-lg border border-navy-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
        >
          Line Score Calculator
        </Link>
        <Link
          href="/calculator"
          className="rounded-lg border border-navy-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
        >
          Job Calculator
        </Link>
        <Link
          href="/practice-test"
          className="rounded-lg border border-navy-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
        >
          ASVAB Practice Test
        </Link>
      </nav>
    </div>
  );
}
