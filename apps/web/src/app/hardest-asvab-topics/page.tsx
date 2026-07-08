import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

/**
 * Original data study: ASVAB practice-question difficulty by subtest and topic,
 * computed from real ASVAB Hero practice answers. This is a citable, uniquely
 * ours asset (nobody else has this attempt data), built answer-first for AI
 * engines and search. Refresh the numbers as the sample grows.
 *
 * Source: 12,368 practice answers from 145 users, Apr 28 to Jul 8 2026
 * (public.attempts.question_results). No em-dash characters (repo build guard).
 */

const PUBLISHED = "July 7, 2026";
const SAMPLE_ANSWERS = "12,368";
const SAMPLE_USERS = 145;
const OVERALL_PCT = 59.1;

// Percent correct by subtest, hardest first. n = answers in the sample.
const SUBTESTS: { code: string; name: string; pct: number; n: number }[] = [
  { code: "AO", name: "Assembling Objects", pct: 43.8, n: 794 },
  { code: "MC", name: "Mechanical Comprehension", pct: 45.6, n: 814 },
  { code: "EI", name: "Electronics Information", pct: 47.4, n: 887 },
  { code: "MK", name: "Mathematics Knowledge", pct: 55.0, n: 2022 },
  { code: "GS", name: "General Science", pct: 57.6, n: 1423 },
  { code: "AR", name: "Arithmetic Reasoning", pct: 58.2, n: 2253 },
  { code: "AS", name: "Auto & Shop Information", pct: 63.9, n: 742 },
  { code: "WK", name: "Word Knowledge", pct: 70.1, n: 2077 },
  { code: "PC", name: "Paragraph Comprehension", pct: 73.5, n: 1356 },
];

// Hardest topics with at least 60 answers, hardest first.
const HARD_TOPICS: {
  title: string;
  sub: string;
  pct: number;
  n: number;
  href: string;
}[] = [
  { title: "3-D Object Visualization", sub: "AO", pct: 35.4, n: 263, href: "/study/ao/3d-visualization" },
  { title: "Gears, Wheels & Axles", sub: "MC", pct: 41.5, n: 142, href: "/study/mc/gears-wheels" },
  { title: "Forces, Friction & Pressure", sub: "MC", pct: 42.0, n: 150, href: "/study/mc/forces-friction" },
  { title: "Geometry: Area, Perimeter & Volume", sub: "MK", pct: 45.4, n: 425, href: "/study/mk/geometry" },
  { title: "Ohm's Law & Power", sub: "EI", pct: 45.7, n: 267, href: "/study/ei/ohms-law-power" },
  { title: "Series & Parallel Circuits", sub: "EI", pct: 46.9, n: 177, href: "/study/ei/circuit-types" },
  { title: "Levers & Pulleys", sub: "MC", pct: 47.0, n: 132, href: "/study/mc/levers-pulleys" },
  { title: "Electrical Components & Devices", sub: "EI", pct: 47.5, n: 217, href: "/study/ei/components-devices" },
  { title: "Inclined Planes & Hydraulics", sub: "MC", pct: 47.5, n: 183, href: "/study/mc/inclined-plane-hydraulics" },
  { title: "Motion & Projectile Physics", sub: "MC", pct: 48.3, n: 207, href: "/study/mc/motion-projectile" },
  { title: "Spatial Counting & Orientation", sub: "AO", pct: 48.5, n: 295, href: "/study/ao/spatial-counting" },
  { title: "Conductors, Insulators & Materials", sub: "EI", pct: 49.6, n: 226, href: "/study/ei/conductors-insulators" },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is the ASVAB hard?",
    a: "It depends on the section. Across 12,368 practice answers, test-takers averaged 59 percent correct. Reading and vocabulary are the easiest (70 to 74 percent correct), while the spatial and technical sections (Assembling Objects, Mechanical Comprehension, and Electronics Information) are the hardest at 44 to 47 percent. The four AFQT sections that decide enlistment eligibility sit in the easier half, so the parts that matter most for joining are not the hardest ones.",
  },
  {
    q: "What is the hardest section of the ASVAB?",
    a: "Assembling Objects, at 43.8 percent correct in our data, is the hardest section, followed by Mechanical Comprehension (45.6 percent) and Electronics Information (47.4 percent). If you mean the single hardest topic, it is 3-D object visualization at 35.4 percent correct.",
  },
  {
    q: "What is the hardest ASVAB subtest?",
    a: "In our data, Assembling Objects is the hardest, with test-takers answering only 43.8 percent of practice questions correctly, followed by Mechanical Comprehension (45.6 percent) and Electronics Information (47.4 percent). The technical and spatial subtests are consistently harder than the reading and vocabulary ones.",
  },
  {
    q: "What is the single hardest ASVAB topic?",
    a: "3-D object visualization, in the Assembling Objects subtest, is the hardest topic in our data at 35.4 percent correct. Test-takers do well below their overall average on questions that ask them to picture how a folded or rotated shape looks in three dimensions.",
  },
  {
    q: "What is the hardest math topic on the ASVAB?",
    a: "Geometry (area, perimeter, and volume) is the hardest math topic in our data at 45.4 percent correct, harder than word problems, ratios, or percentages. Formula recall and unit handling are where most points are lost.",
  },
  {
    q: "Which ASVAB sections are easiest?",
    a: "Paragraph Comprehension (73.5 percent correct) and Word Knowledge (70.1 percent) are the easiest subtests in our data. Because Word Knowledge and Paragraph Comprehension both feed the AFQT, that is good news for enlistment eligibility even for people who struggle with the technical sections.",
  },
];

function Bar({ pct }: { pct: number }) {
  return (
    <div className="relative h-6 flex-1 overflow-hidden rounded bg-navy">
      <div
        className="h-6 rounded bg-accent"
        style={{ width: `${pct}%` }}
      />
      {/* 25% guessing baseline on a 4-choice question */}
      <div
        className="absolute inset-y-0 border-l border-dashed border-text-tertiary/60"
        style={{ left: "25%" }}
        aria-hidden
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "The Hardest ASVAB Topics, Ranked: 12,000+ Practice Answers (2026 Data)",
  description:
    "We analyzed 12,368 ASVAB practice answers from 145 users. The hardest subtests are Assembling Objects, Mechanical Comprehension, and Electronics Information; the single hardest topic is 3-D object visualization at 35 percent correct. Full rankings inside.",
  alternates: { canonical: "https://asvabhero.com/hardest-asvab-topics" },
};

export default function HardestAsvabTopicsPage() {
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "ASVAB practice-question difficulty by subtest and topic",
    description:
      "Percent-correct rates across 12,368 ASVAB practice answers from 145 users on ASVAB Hero, April to July 2026.",
    creator: { "@type": "Organization", name: "ASVAB Hero", url: "https://asvabhero.com" },
    temporalCoverage: "2026-04-28/2026-07-08",
    variableMeasured: ["percent correct by subtest", "percent correct by topic"],
    url: "https://asvabhero.com/hardest-asvab-topics",
    isAccessibleForFree: true,
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: "https://asvabhero.com/data/hardest-asvab-topics.csv",
      },
    ],
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Hardest ASVAB Topics, Ranked (2026 Data)",
    datePublished: "2026-07-07",
    author: { "@type": "Organization", name: "ASVAB Hero" },
    publisher: {
      "@type": "Organization",
      name: "ASVAB Hero",
      url: "https://asvabhero.com",
    },
    mainEntityOfPage: "https://asvabhero.com/hardest-asvab-topics",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={datasetLd} />
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        ASVAB Hero data study
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        The hardest ASVAB topics, ranked
      </h1>
      <p className="mt-3 text-sm text-text-tertiary">
        By the ASVAB Hero team. Published {PUBLISHED}. Updated as more practice
        data comes in.
      </p>

      {/* Answer-first summary for search and AI engines */}
      <div className="mt-8 rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
        <p className="text-text-secondary leading-relaxed">
          We looked at <strong className="text-text-primary">{SAMPLE_ANSWERS}</strong>{" "}
          ASVAB practice answers from{" "}
          <strong className="text-text-primary">{SAMPLE_USERS}</strong> people using
          ASVAB Hero. Across every question, test-takers answered{" "}
          <strong className="text-text-primary">{OVERALL_PCT}%</strong> correctly.
          The clear pattern: the{" "}
          <strong className="text-text-primary">
            technical and spatial subtests are the hardest
          </strong>
          , and reading and vocabulary are the easiest.
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-text-secondary">
          <li>
            Hardest subtest: <strong className="text-text-primary">Assembling Objects</strong> (43.8% correct).
          </li>
          <li>
            Hardest single topic:{" "}
            <strong className="text-text-primary">3-D object visualization</strong> (35.4% correct).
          </li>
          <li>
            Hardest math topic:{" "}
            <strong className="text-text-primary">geometry</strong> (45.4% correct).
          </li>
          <li>
            Easiest subtests: <strong className="text-text-primary">Paragraph Comprehension</strong> (73.5%) and Word Knowledge (70.1%).
          </li>
        </ul>
      </div>

      {/* Screenshot-friendly key numbers */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["12,368", "practice answers analyzed"],
          ["59%", "answered correctly overall"],
          ["43.8%", "correct on the hardest subtest (AO)"],
          ["73.5%", "correct on the easiest (PC)"],
        ].map(([big, small]) => (
          <div
            key={small}
            className="rounded-xl border border-navy-border bg-navy-light/40 p-4 text-center"
          >
            <div className="font-display text-2xl font-bold text-accent">
              {big}
            </div>
            <div className="mt-1 text-xs leading-tight text-text-tertiary">
              {small}
            </div>
          </div>
        ))}
      </section>

      {/* Subtest difficulty chart */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          ASVAB subtest difficulty, hardest to easiest
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          Percent of practice questions answered correctly in each of the nine
          subtests. Questions are four-choice, so 25% is what pure guessing would
          score (the dashed line).
        </p>
        <div className="mt-6 space-y-2.5">
          {SUBTESTS.map((s) => (
            <div key={s.code} className="flex items-center gap-3">
              <div className="w-28 shrink-0 text-xs leading-tight text-text-secondary sm:w-44 sm:text-sm">
                <span className="font-mono font-semibold text-text-primary">
                  {s.code}
                </span>{" "}
                <span className="hidden sm:inline">{s.name}</span>
              </div>
              <Bar pct={s.pct} />
              <div className="w-11 shrink-0 text-right text-sm font-semibold text-text-primary">
                {s.pct}%
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-tertiary">
          Dashed line = 25%, the score from pure guessing on a four-choice
          question. Sample sizes per subtest range from 742 to 2,253 answers.
        </p>
      </section>

      {/* Hardest topics table */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The 12 hardest ASVAB topics
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          Zooming in below the subtest level, these are the specific topics with
          the lowest correct rates (topics with at least 60 answers). Each links
          to a study guide. Mechanical, electronics, and spatial topics
          dominate the list.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Topic</th>
                <th className="py-2 pr-4 text-left">Subtest</th>
                <th className="py-2 pr-4 text-right">% correct</th>
                <th className="py-2 text-right">Answers</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {HARD_TOPICS.map((t) => (
                <tr key={t.href} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4">
                    <Link
                      href={t.href}
                      className="font-semibold text-accent underline hover:text-accent-hover"
                    >
                      {t.title}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 font-mono text-text-secondary">
                    {t.sub}
                  </td>
                  <td className="py-2 pr-4 text-right font-mono">{t.pct}%</td>
                  <td className="py-2 text-right font-mono text-text-tertiary">
                    {t.n}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What it means */}
      <section className="mt-12 space-y-4 text-text-secondary leading-relaxed">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What this means for your study time
        </h2>
        <p>
          The takeaway is not that these topics are impossible. It is that they
          reward practice more than the rest of the test, because most people
          walk in weakest here. Three patterns stand out.
        </p>
        <p>
          <strong className="text-text-primary">Spatial reasoning is the great equalizer.</strong>{" "}
          The single hardest topic,{" "}
          <Link
            href="/study/ao/3d-visualization"
            className="text-accent underline hover:text-accent-hover"
          >
            3-D object visualization
          </Link>
          , sits at 35% correct. People are not used to mentally folding and
          rotating shapes, and it is a skill that improves quickly with reps.
          Assembling Objects only matters for certain jobs, but where it counts,
          a few hours of practice moves the needle more than almost anywhere else
          on the test.
        </p>
        <p>
          <strong className="text-text-primary">Electronics and mechanical are memorable, not hard.</strong>{" "}
          Topics like{" "}
          <Link
            href="/study/ei/ohms-law-power"
            className="text-accent underline hover:text-accent-hover"
          >
            Ohm&apos;s Law
          </Link>{" "}
          and{" "}
          <Link
            href="/study/mc/gears-wheels"
            className="text-accent underline hover:text-accent-hover"
          >
            gears and pulleys
          </Link>{" "}
          score low mostly because test-takers never learned the handful of
          formulas and rules behind them. Once you know V = IR and how a lever
          trades force for distance, the questions become fast points. See the
          full{" "}
          <Link
            href="/asvab-electronics-information-tips"
            className="text-accent underline hover:text-accent-hover"
          >
            electronics tips
          </Link>{" "}
          and{" "}
          <Link
            href="/asvab-mechanical-comprehension-tips"
            className="text-accent underline hover:text-accent-hover"
          >
            mechanical comprehension tips
          </Link>
          .
        </p>
        <p>
          <strong className="text-text-primary">The AFQT sections are the easiest ones.</strong>{" "}
          The four subtests that decide whether you can enlist at all (Arithmetic
          Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics
          Knowledge) sit in the easier half of this list, with reading and
          vocabulary at the very top. The hardest math topic is{" "}
          <Link
            href="/study/mk/geometry"
            className="text-accent underline hover:text-accent-hover"
          >
            geometry
          </Link>{" "}
          at 45%, so if you are short on time, drilling area, perimeter, and
          volume formulas is the highest-value math move.
        </p>
      </section>

      {/* Trap answers at the question level */}
      <section className="mt-12 space-y-4 text-text-secondary leading-relaxed">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The traps: where wrong answers cluster
        </h2>
        <p>
          Averages hide the most interesting part. On the hardest questions,
          people do not miss at random. They get pulled toward one specific wrong
          answer, which is the signature of a well-built trap and exactly what
          practice trains you to spot.
        </p>
        <p>
          On the single most-trapped 3-D object visualization question we track,
          26 people attempted it: only 10 got it right, and 10 others all chose
          the same wrong option. A test-taker was as likely to fall for one
          specific trap as to answer correctly. On a projectile-motion question,
          20 people scored just 25 percent correct, no better than guessing on a
          four-choice question, with the plurality landing on the same wrong
          answer.
        </p>
        <p className="text-sm text-text-tertiary">
          Per-question samples are still small (roughly 20 to 30 answers each),
          so treat these as illustrative rather than precise. As the question
          bank accumulates more answers, we will publish the full list of the
          most-missed individual questions and the traps behind them.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Find your own weak topics
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          Averages are a starting point, but your weak topics are your own. Take
          an{" "}
          <Link
            href="/practice-test"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            ASVAB practice test
          </Link>{" "}
          to see exactly where you stand by topic, then use the{" "}
          <Link
            href="/calculator"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            score calculator
          </Link>{" "}
          to turn your scores into the jobs you qualify for. No account required.
        </p>
      </section>

      {/* Methodology */}
      <section className="mt-12 border-t border-navy-border pt-8">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Methodology
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text-secondary leading-relaxed">
          <li>
            <strong className="text-text-primary">Sample:</strong> {SAMPLE_ANSWERS}{" "}
            practice-question answers from {SAMPLE_USERS} people using ASVAB Hero
            between April 28 and July 8, 2026. Percent correct is answers correct
            divided by answers attempted.
          </li>
          <li>
            <strong className="text-text-primary">Scope:</strong> topic-level
            figures include only topics with at least 60 answers, so a single
            person cannot swing a number. Every question is four-choice, so 25% is
            the pure-guessing baseline.
          </li>
          <li>
            <strong className="text-text-primary">What this is not:</strong> these
            are ASVAB Hero practice questions, not the official ASVAB, and the
            people here chose to study with a prep tool, so they are not a random
            sample of all test-takers. Read the rankings as a strong signal of
            relative difficulty, not an official statistic.
          </li>
          <li>
            <strong className="text-text-primary">Coming next:</strong> as
            individual questions accumulate more answers, we will publish the
            hardest specific questions, not just topics. This page updates as the
            sample grows.
          </li>
          <li>
            <strong className="text-text-primary">Download:</strong> the
            aggregated subtest and topic data is available as a{" "}
            <a
              href="/data/hardest-asvab-topics.csv"
              className="text-accent underline hover:text-accent-hover"
            >
              CSV file
            </a>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
