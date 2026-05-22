import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How ASVAB Hero Works: The 5-Step Method to Raise Your Score",
  description:
    "The exact way to use ASVAB Hero to raise your AFQT: take a free diagnostic, clear your Mistake Bank daily, do one adaptive AFQT block per study day, retake diagnostics on schedule, and rehearse under time before test day.",
  alternates: {
    canonical: "https://asvabhero.com/how-it-works",
  },
};

interface Step {
  number: number;
  name: string;
  what: string;
  action: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    name: "Take your free diagnostic",
    what: "Before you study anything, find out exactly where you stand. No guessing, no signup needed to start.",
    action:
      "Open the diagnostic and answer through it once. You get an AFQT estimate and a clear picture of which subtests are pulling you down.",
  },
  {
    number: 2,
    name: "Clear your Mistake Bank daily",
    what: "Every question you miss is saved automatically and brought back on a spaced schedule until you own it. This is the highest-leverage few minutes you have.",
    action:
      "Each study day, open the Mistake Bank first and clear what's due. A missed question keeps coming back — with the explanation — until you can answer it cold.",
  },
  {
    number: 3,
    name: "Do one adaptive AFQT block on each study day",
    what: "The app picks the right question at the right difficulty, mixing subtests and targeting your weak spots — so your time goes where it actually moves your score.",
    action:
      "Run one adaptive block per study day. It focuses on the four subtests that make up your AFQT: Arithmetic Reasoning, Math Knowledge, Word Knowledge, and Paragraph Comprehension.",
  },
  {
    number: 4,
    name: "Retake a diagnostic on schedule",
    what: "Practice without checkpoints is guesswork. A repeat diagnostic every couple of weeks shows you real movement and tells you where to re-aim.",
    action:
      "Every two weeks or so, take a fresh diagnostic. Compare it to your last one, then let the adaptive engine re-target whatever still needs work.",
  },
  {
    number: 5,
    name: "Rehearse under time near test day",
    what: "Test day adds a clock and stamina that untimed practice never trains. Building that in ahead of time means nothing about the real test surprises you.",
    action:
      "In the final stretch, switch to timed sections, then run a full-length simulation so the pacing and length of test day already feel familiar.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How ASVAB Hero Works: The 5-Step Method to Raise Your Score",
          description:
            "The exact way to use ASVAB Hero to raise your AFQT: take a free diagnostic, clear your Mistake Bank daily, do one adaptive AFQT block per study day, retake diagnostics on schedule, and rehearse under time before test day.",
          url: "https://asvabhero.com/how-it-works",
          author: { "@type": "Organization", name: "ASVAB Hero", url: "https://asvabhero.com" },
          publisher: { "@type": "Organization", name: "ASVAB Hero" },
          datePublished: "2026-05-22",
          dateModified: "2026-05-22",
        }}
      />

      {/* Hero */}
      <header className="space-y-4">
        <span className="inline-block rounded-md bg-accent-dim px-2.5 py-1 text-xs font-semibold tracking-wide text-accent">
          How it works
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
          How to use ASVAB Hero to raise your score
        </h1>
        <p className="text-lg leading-relaxed text-text-secondary">
          Five steps, done on repeat. This is the exact way to use the product — what
          to do, in what order, every study day. Follow it and your practice goes
          where it actually moves your AFQT.
        </p>
      </header>

      {/* Steps */}
      <section className="mt-12 space-y-8">
        {STEPS.map((s) => (
          <div
            key={s.number}
            className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Step {s.number}
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-text-primary">
              {s.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{s.what}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              <span className="font-semibold">In ASVAB Hero:</span> {s.action}
            </p>
          </div>
        ))}
      </section>

      {/* Weekly rhythm */}
      <section className="mt-12 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-7">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Your weekly rhythm
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
          <li>Pick your study days and stick to them.</li>
          <li>Clear your due mistakes first — that&apos;s your warm-up and your weakest spots in one.</li>
          <li>Do one adaptive AFQT block.</li>
          <li>Let the spacing do the work — material comes back exactly when you need it.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-text-primary">
          <span className="font-semibold">Consistency beats cramming.</span> Simply
          showing up on your study days is the single biggest predictor of real score
          gains — bigger than any one session.
        </p>
      </section>

      {/* Link to the science */}
      <section className="mt-12 text-center">
        <p className="text-sm leading-relaxed text-text-secondary">
          Want the research behind each step?{" "}
          <Link href="/the-science" className="text-accent no-underline hover:underline">
            See the science.
          </Link>
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <Link
          href="/practice-test?variant=diagnostic"
          className="inline-flex rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Start your free diagnostic
        </Link>
        <p className="mt-3 text-xs text-text-tertiary">
          See where you stand, then start the rhythm above.
        </p>
      </section>
    </div>
  );
}
