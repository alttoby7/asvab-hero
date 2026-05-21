import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Science: How ASVAB Hero Raises Your Score | ASVAB Hero",
  description:
    "ASVAB Hero is built on the study methods cognitive science proves actually raise test scores — retrieval practice, spaced repetition, interleaving, and immediate feedback — not the rereading most apps rely on.",
  alternates: {
    canonical: "https://asvabhero.com/the-science",
  },
};

interface Technique {
  name: string;
  evidence: string;
  what: string;
  how: string;
}

// Tier B — measured, first-party results.
// Populated by hand from get_cohort_afqt_delta() (migration 0026) ONLY once we
// have a defensible sample. This is a STATIC export, so there is no live data at
// build time — the values are pasted in from the SQL function's "overall" row.
// The section below renders only when this is non-null AND n >= 30 paired
// diagnostics, so we never publish a thin or made-up number. No "proven" claims:
// we report n, baseline, mean delta, and a 95% CI, and nothing more.
interface MeasuredResults {
  n: number; // paired diagnostics (users with >= 2 diagnostics)
  baselineMeanAfqt: number; // mean first-diagnostic AFQT estimate
  meanDelta: number; // mean (latest - earliest) AFQT estimate
  ci95: [number, number]; // 95% confidence interval on the mean delta
  asOf: string; // ISO date the sample was pulled
}

// Stays null until the cohort has a defensible sample — keeps the section hidden.
const MEASURED_RESULTS: MeasuredResults | null = null;

const TECHNIQUES: Technique[] = [
  {
    name: "Retrieval practice (the testing effect)",
    evidence: "g ≈ 0.50 across 200+ experiments (Rowland, 2014)",
    what: "Pulling an answer out of memory strengthens it far more than reading it again. In one classic study, students who tested themselves once outperformed students who reread the material four times.",
    how: "Every practice question, every flashcard, and every Mistake Bank review is active recall — you retrieve the answer, you don't just review it.",
  },
  {
    name: "Spaced repetition",
    evidence: "Robust across 300+ experiments (Cepeda et al., 2006)",
    what: "The same amount of study spread over time beats cramming. Each review is scheduled for the moment you're about to forget — the point where retrieving it does the most good.",
    how: "Flashcards and missed questions are scheduled with an SM-2 spacing algorithm, so material comes back on the exact cadence that locks it into long-term memory.",
  },
  {
    name: "The Mistake Bank",
    evidence: "Stacks retrieval + spacing + feedback — the three highest-utility techniques",
    what: "The single strongest signal about what you need to study is the question you just got wrong. Most apps throw that away.",
    how: "Every question you miss is automatically saved and brought back on a spaced schedule — with the explanation — until you can answer it cold. Free for every user.",
  },
  {
    name: "Immediate, corrective feedback",
    evidence: "d ≈ 0.48 meta-analytic; higher when timely (Wisniewski, Zierer & Hattie, 2019)",
    what: "Knowing why an answer was right or wrong — right after you commit to it — is one of the most reliable ways to improve performance.",
    how: "Every answer reveals the correct choice and a plain-English explanation immediately, while the question is still fresh in your mind.",
  },
  {
    name: "Interleaving",
    evidence: "d ≈ 1.21; nearly doubled retention in math (Rohrer, Dedrick & Stershic, 2015)",
    what: "Mixing problem types forces your brain to choose the right approach each time — which is exactly what test day demands. Practicing one type in a block feels easier but sticks worse.",
    how: "The Daily Challenge interleaves subtests instead of drilling one in isolation, training you to switch the way the real ASVAB makes you switch.",
  },
  {
    name: "Adaptive mastery sequencing",
    evidence: "d ≈ 0.76 for intelligent tutoring — near one-on-one tutoring (Kulik & Fletcher, 2016)",
    what: "Choosing the next question based on what you've actually mastered — at the right difficulty — approaches the effectiveness of a personal tutor.",
    how: "A per-topic mastery model already targets your weak spots in the Daily Challenge, and a full adaptive engine for the AFQT subtests (Arithmetic Reasoning, Math Knowledge, Word Knowledge, Paragraph Comprehension) is on the way.",
  },
];

export default function TheSciencePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Science: How ASVAB Hero Raises Your Score",
          description:
            "ASVAB Hero is built on the study methods cognitive science proves actually raise test scores: retrieval practice, spaced repetition, interleaving, and immediate feedback.",
          url: "https://asvabhero.com/the-science",
          author: { "@type": "Organization", name: "ASVAB Hero", url: "https://asvabhero.com" },
          publisher: { "@type": "Organization", name: "ASVAB Hero" },
          datePublished: "2026-05-21",
          dateModified: "2026-05-21",
        }}
      />

      {/* Hero */}
      <header className="space-y-4">
        <span className="inline-block rounded-md bg-accent-dim px-2.5 py-1 text-xs font-semibold tracking-wide text-accent">
          Built on the evidence
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
          The science of raising your ASVAB score
        </h1>
        <p className="text-lg leading-relaxed text-text-secondary">
          Cognitive science is unusually clear about which study methods actually move
          test scores — and which ones just feel productive. ASVAB Hero is built end to
          end on the methods that work. Here&apos;s exactly what they are, the research
          behind them, and how the product uses each one.
        </p>
      </header>

      {/* Techniques */}
      <section className="mt-12 space-y-8">
        {TECHNIQUES.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-7"
          >
            <h2 className="font-display text-xl font-bold text-text-primary">{t.name}</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
              {t.evidence}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t.what}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              <span className="font-semibold">In ASVAB Hero:</span> {t.how}
            </p>
          </div>
        ))}
      </section>

      {/* What we avoid */}
      <section className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-7">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What we deliberately don&apos;t lean on
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          The largest review of study techniques (Dunlosky et al., 2013) rated highlighting,
          rereading, and summarizing as <span className="font-semibold text-text-primary">low utility</span> —
          they feel like studying but barely move scores. A prep app that is mostly &ldquo;read this
          guide&rdquo; is using the weakest tools in the box. We use guides for reference, but the
          core of the product is active recall, spacing, and feedback.
        </p>
      </section>

      {/* Honesty / measurement */}
      <section className="mt-12 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-7">
        <h2 className="font-display text-xl font-bold text-text-primary">
          We measure whether it&apos;s working
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Lab effects are large, but real-world prep gains are often small — because most
          people don&apos;t do enough spaced, active practice to get the benefit. Our entire
          design is built to close that gap: make every interaction a high-evidence technique,
          and make it easy to come back and put in the reps.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          We track score change across repeat diagnostics so we can see real improvement, not
          just engagement. As that data matures we&apos;ll publish what ASVAB Hero users actually
          gain — with the methodology in plain sight. We won&apos;t make a number up.
        </p>
      </section>

      {/* Measured results (Tier B) — gated: renders only with a defensible
          first-party sample (n >= 30 paired diagnostics). Hidden until then. */}
      {MEASURED_RESULTS && MEASURED_RESULTS.n >= 30 && (
        <section className="mt-12 rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-7">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Measured results
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            This is our own first-party data, not a lab study. Across{" "}
            <span className="font-semibold text-text-primary">
              {MEASURED_RESULTS.n.toLocaleString()}
            </span>{" "}
            ASVAB Hero users who took at least two diagnostics, the average AFQT
            estimate rose by{" "}
            <span className="font-semibold text-text-primary">
              {MEASURED_RESULTS.meanDelta > 0 ? "+" : ""}
              {MEASURED_RESULTS.meanDelta}
            </span>{" "}
            points (95% CI {MEASURED_RESULTS.ci95[0]} to{" "}
            {MEASURED_RESULTS.ci95[1]}) from a baseline mean of{" "}
            {MEASURED_RESULTS.baselineMeanAfqt}.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-text-tertiary">
            Method: per-user change between first and most-recent diagnostic
            AFQT estimate. Observational — users self-select into more practice —
            so this is an upper bound, not a controlled effect. As of{" "}
            {MEASURED_RESULTS.asOf}.
          </p>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 text-center">
        <Link
          href="/practice-test?variant=diagnostic"
          className="inline-flex rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Start your free diagnostic
        </Link>
        <p className="mt-3 text-xs text-text-tertiary">
          See where you stand, then let the methods above go to work.
        </p>
      </section>

      {/* Sources */}
      <section className="mt-12 border-t border-navy-border pt-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-text-tertiary">
          Sources
        </h2>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-tertiary">
          <li>
            Dunlosky, Rawson, Marsh, Nathan &amp; Willingham (2013). Improving Students&apos;
            Learning With Effective Learning Techniques.{" "}
            <a
              href="https://www.aft.org/ae/fall2013/dunlosky"
              className="text-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              AFT summary
            </a>
          </li>
          <li>
            Rowland (2014), retrieval-practice meta-analysis; Roediger &amp; Karpicke (2006),
            the testing effect.{" "}
            <a
              href="https://files.eric.ed.gov/fulltext/ED599273.pdf"
              className="text-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ERIC (PDF)
            </a>
          </li>
          <li>
            Cepeda, Pashler, Vul, Wixted &amp; Rohrer (2006). Distributed Practice in Verbal
            Recall Tasks.{" "}
            <a
              href="https://augmentingcognition.com/assets/Cepeda2006.pdf"
              className="text-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF
            </a>
          </li>
          <li>
            Rohrer, Dedrick &amp; Stershic (2015). Interleaved practice in mathematics.{" "}
            <a
              href="http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer_et_al_2015JEdPsych.pdf"
              className="text-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF
            </a>
          </li>
          <li>
            Wisniewski, Zierer &amp; Hattie (2019). The Power of Feedback Revisited.{" "}
            <a
              href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.03087/full"
              className="text-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontiers in Psychology
            </a>
          </li>
          <li>
            Kulik &amp; Fletcher (2016). Effectiveness of Intelligent Tutoring Systems: A
            Meta-Analytic Review.{" "}
            <a
              href="https://journals.sagepub.com/doi/abs/10.3102/0034654315581420"
              className="text-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Review of Educational Research
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
