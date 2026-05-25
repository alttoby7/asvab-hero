import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB GT Score Explained + GT Score Calculator (2026)",
  description:
    "Your GT score decides which military jobs you can hold. Learn the VE + AR formula, how to calculate it, Army GT cutoffs, the 110 threshold, the highest possible GT (144), and how to raise it.",
  alternates: {
    canonical: "https://asvabhero.com/gt-score",
  },
};

export default function GTScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "GT Score: What It Is and Why It Decides Your Military Career",
          description:
            "Your GT score decides which military jobs you can hold. Learn the VE + AR formula, how to calculate it, Army GT cutoffs, the 110 threshold, the highest possible GT, and how to raise it.",
          url: "https://asvabhero.com/gt-score",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-05-20",
          dateModified: "2026-05-20",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is the GT score the same as the AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The AFQT is a percentile from 1 to 99 that decides whether you can enlist. The GT score is a composite standard score that decides which jobs and programs you can hold once you are in. They share some subtests but use different formulas and different scales.",
              },
            },
            {
              "@type": "Question",
              name: "What is a good GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A GT of 100 is roughly average. A 110 is the threshold that opens officer, warrant, special operations, and most technical roles, so it is the number most people aim for. Anything above 110 is strong. What counts as good depends on the specific job you want.",
              },
            },
            {
              "@type": "Question",
              name: "How is the GT score calculated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT = VE + AR. VE (Verbal Expression) is a combined score from your Word Knowledge and Paragraph Comprehension results, and AR is Arithmetic Reasoning. So three subtests feed it: WK, PC, and AR.",
              },
            },
            {
              "@type": "Question",
              name: "Is GT just WK + PC + AR added together?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. GT = VE + AR. VE (Verbal Expression) is a converted standard score the ASVAB derives from your Word Knowledge and Paragraph Comprehension performance, not a raw sum of the two subtests. Adding WK, PC, and AR directly gives you the wrong number, which is why some online calculators spit out impossible GT scores in the 300s.",
              },
            },
            {
              "@type": "Question",
              name: "Why does Word Knowledge matter so much for GT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The verbal half of your GT is VE, which comes from Word Knowledge and Paragraph Comprehension. Together those two subtests are half your GT score, so vocabulary and reading carry as much weight as all your math reasoning. Drilling vocabulary is one of the most efficient ways to move your GT.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need to be an officer or warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A GT of 110 is the qualifying minimum for Army officer-producing programs under AR 135-100, and warrant officer requires 110 with no waiver. Below 110 you cannot submit the packet.",
              },
            },
            {
              "@type": "Question",
              name: "What is the highest possible GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The best-sourced ceiling is 144 for the Army's AFCT, confirmed by Army Personnel Testing officials. The first known perfect 144 was earned in 2023. Figures of 145 to 147 for the Army and 151 for the Marine Corps circulate online but lack an authoritative source. Because GT is a standard score and not a percentile, it can exceed 100 and is not capped at 99 like the AFQT.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force have a GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The Air Force and Space Force do not use a GT line score. They use four MAGE composites: Mechanical, Administrative, General, and Electronic. If you are headed for the Air Force, focus on those, not a GT.",
              },
            },
            {
              "@type": "Question",
              name: "Can I get a waiver for a GT below 110?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For Army warrant officer, no. The 110 minimum is nonwaivable. Other programs vary, but the reliable move is to raise the score rather than chase an exception. Active-duty soldiers do this through the AFCT and Army BSEP.",
              },
            },
            {
              "@type": "Question",
              name: "How fast can I raise my GT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Active-duty soldiers who complete the Army's roughly two-week BSEP course gain about 19 points on average, with some classes averaging 23. The Army's Operation Connect the Dots got 82% of soldiers to GT 110 in just two weeks. Future recruits can move their GT in a few weeks of focused prep on Word Knowledge, Paragraph Comprehension, and Arithmetic Reasoning.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          GT Score: What It Is and Why It Decides Your Military Career
        </h1>

        <p className="mt-4 text-text-secondary">
          You passed the ASVAB and you&apos;re cleared to enlist. One number you
          barely noticed will quietly control which jobs and programs you can
          ever reach: your <strong>GT score</strong>.
        </p>

        <p className="text-text-secondary">
          GT stands for General Technical. It is not the same thing as your
          AFQT, and it is not your overall ASVAB result. It is a separate
          composite that the services use to match you to careers.
        </p>

        <p className="text-text-secondary">
          Here is what we cover below: what a GT score actually is, the VE + AR
          formula behind it, how to calculate it step by step, how GT differs
          from the AFQT, what your specific number means, why 110 matters so
          much, the Army GT cutoffs by job, how high a GT can actually go, how
          each branch handles it, and how to raise it. If you already have your
          subtest scores, run them through our{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>{" "}
          to see your number now.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What a GT Score Actually Is
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score report is full of two-letter codes. GT is one of the most
          important, and most people have no idea what it is.
        </p>

        <p className="text-text-secondary">
          GT, or General Technical, is a composite score. The services build it
          by combining specific subtest results, then use it to decide which
          jobs you can hold. It sits alongside other composites like Clerical,
          Electronics, and Mechanical Maintenance, each built from a different
          mix of subtests.
        </p>

        <p className="text-text-secondary">
          A GT score measures two things: how well you read and use language,
          and how well you reason through math word problems. That makes it the
          broadest, most widely-used composite, which is why so many jobs and
          programs gate on it.
        </p>

        <p className="text-text-secondary">
          Two things it is not. It is not a subtest you sit down and take. And
          it is not your overall ASVAB score. It is calculated from subtests you
          already completed.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT decides whether you can enlist. Your GT score decides
            which jobs and programs you can hold once you are in. They are two
            different numbers doing two different jobs.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the full map of how every line score works, see our{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements guide
          </Link>
          .
        </p>

        <section className="my-8 not-prose">
          <EmailCapture
            headline="Trying to clear GT 110 for OCS, SF, or Cyber?"
            subhead="Free 30-day plan focused on WK, PC, and AR, the only 3 subtests that move your GT. PDF plus a 5-email crash course."
            cta="Email me the GT plan"
            tag="gt-score"
          />
        </section>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT Score Formula: VE + AR
        </h2>

        <p className="mt-4 text-text-secondary">
          Here is the part that confuses almost everyone. The formula on your
          score report is:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE stands for Verbal Expression. AR stands for Arithmetic Reasoning.
          The catch is that VE is not a test you take. It is a combined verbal
          score built from two subtests you did take: Word Knowledge (WK) and
          Paragraph Comprehension (PC). The scoring system adds those raw scores
          and converts the total through a standard table into your VE score.
        </p>

        <p className="text-text-secondary">
          So the three subtests that actually feed your GT are Word Knowledge,
          Paragraph Comprehension, and Arithmetic Reasoning. That is why a lot
          of websites write the GT score as WK + PC + AR. Same inputs, they just
          skip the VE step.
        </p>

        <p className="text-text-secondary">
          This matters because Word Knowledge and Paragraph Comprehension
          together make up half of your GT. Vocabulary and reading are not side
          subjects here. They are 50 percent of the score.
        </p>

        {/* TABLE: The 3 GT Subtests (folded from asvab-gt-score) */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What It Tests
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Questions (CAT)
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Time
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Role in GT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  WK (Word Knowledge)
                </td>
                <td className="py-2 pr-4">Vocabulary and word definitions</td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 pr-4 font-mono">8 min</td>
                <td className="py-2">Feeds into VE</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PC (Paragraph Comprehension)
                </td>
                <td className="py-2 pr-4">Reading comprehension</td>
                <td className="py-2 pr-4 font-mono">10</td>
                <td className="py-2 pr-4 font-mono">22 min</td>
                <td className="py-2">Feeds into VE</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AR (Arithmetic Reasoning)
                </td>
                <td className="py-2 pr-4">Math word problems</td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 pr-4 font-mono">55 min</td>
                <td className="py-2">Adds directly to GT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do not confuse the GT formula with the AFQT formula. The AFQT
            doubles the verbal half and adds Math Knowledge: AFQT = 2VE + AR +
            MK. The GT score counts verbal once and ignores MK entirely. Same
            family of subtests, different math.
          </p>
        </aside>

        <p className="text-text-secondary">
          To sharpen the inputs, see our{" "}
          <Link
            href="/asvab-word-knowledge-tips"
            className="text-accent hover:text-accent-hover"
          >
            Word Knowledge tips
          </Link>{" "}
          and{" "}
          <Link
            href="/asvab-arithmetic-reasoning-tips"
            className="text-accent hover:text-accent-hover"
          >
            Arithmetic Reasoning tips
          </Link>
          .
        </p>

        {/* How to Calculate Your GT Score (folded from calculate-gt-score) */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Calculate Your GT Score, Step by Step
        </h2>

        <p className="mt-4 text-text-secondary">
          The formula is simple to state, GT = VE + AR, but it hides a step that
          most online guides get wrong. There are two ways to get your number.
          The fast way is to drop your scores into the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
, which applies the official conversion and returns your GT plus the
          jobs it unlocks in seconds. The manual way is below, and it gives you
          an estimate, not the exact figure, because one step relies on a
          conversion table the services apply automatically and do not hand out.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Step 1: Find Your WK, PC, and AR Standard Scores
        </h3>

        <p className="mt-4 text-text-secondary">
          Pull three numbers off your results sheet: your{" "}
          <strong>Word Knowledge (WK)</strong>,{" "}
          <strong>Paragraph Comprehension (PC)</strong>, and{" "}
          <strong>Arithmetic Reasoning (AR)</strong> standard scores. Use the
          standard scores, the values centered on a mean of 50 with a standard
          deviation of 10. Do not use the AFQT percentile, and do not use the
          number of questions you got right. Those are different numbers on the
          same page, and grabbing the wrong one is the first place people go off
          the rails.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A standard score is not a percentile. A WK of 50 is average, not
            &ldquo;50th percentile of this test.&rdquo; Mixing the two breaks the
            rest of the math.
          </p>
        </aside>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Step 2: Convert WK and PC Into Your VE Score
        </h3>

        <p className="mt-4 text-text-secondary">
          The most-shared GT instructions online tell you to add your raw Word
          Knowledge and Paragraph Comprehension numbers and multiply by two. That
          is wrong, and it is why people end up with impossible GT scores in the
          300s. VE (Verbal Expression) is its own standard score. The ASVAB
          combines your WK and PC performance and runs the result through an
          official conversion table to produce a single scaled VE value, which
          lands in roughly the 20 to 62 range.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          VE = official conversion of (WK + PC)
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            You cannot perfectly reproduce VE by hand because you do not have the
            conversion table. The services apply it automatically. This is the
            single step that makes the{" "}
            <Link
              href="/gt-score-calculator"
              className="text-accent hover:text-accent-hover"
            >
              GT score calculator
            </Link>{" "}
            more accurate than any pencil-and-paper method.
          </p>
        </aside>

        <p className="text-text-secondary">
          Verbal carries extra weight too. VE feeds your GT once, but it also
          gets doubled inside the AFQT formula, so raising Word Knowledge and
          Paragraph Comprehension lifts two scores at once.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Step 3: Add VE + AR to Get Your GT
        </h3>

        <p className="mt-4 text-text-secondary">
          Once you have your VE standard score, the final move is one line of
          addition. Walk through a real example with standard scores, not raw
          numbers. Say your VE comes out to 52 and your AR is 55:
        </p>

        <div className="my-3 rounded-lg bg-navy p-3 font-mono text-sm text-text-primary">
          <p>
            GT = 52 + 55 = <strong>107</strong>
          </p>
        </div>

        <p className="text-text-secondary">
          That is a usable GT, but it sits just under the 110 line. Now suppose
          you tighten up your vocabulary and reading so your VE rises to 58, and
          you drill word problems until your AR reaches 60:
        </p>

        <div className="my-3 rounded-lg bg-navy p-3 font-mono text-sm text-text-primary">
          <p>
            GT = 58 + 60 = <strong>118</strong>
          </p>
        </div>

        <p className="text-text-secondary">
          That six-point gain on each component cleared the most important
          threshold in the military and opened officer and Special Forces tracks.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Instead of estimating your VE and risking a wrong number, plug your
            WK, PC, and AR scores into the{" "}
            <Link
              href="/gt-score-calculator"
              className="text-accent hover:text-accent-hover"
            >
              GT score calculator
            </Link>
            . It runs the conversion, gives you your GT instantly, and shows which
            jobs and programs that score unlocks.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score vs AFQT Score: The Difference That Trips Everyone Up
        </h2>

        <p className="mt-4 text-text-secondary">
          Mixing up GT and AFQT is the single most common ASVAB scoring
          mistake. They are not the same number, not the same scale, and they do
          not do the same job.
        </p>

        <p className="text-text-secondary">
          Your AFQT is a percentile from 1 to 99. It is the first gate, and
          every branch uses it the same way: meet the minimum or you do not
          enlist. Your GT is a composite standard score, built differently, used
          to assign jobs and programs after you are in.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary"></th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFQT Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GT Score
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it is
                </td>
                <td className="py-2 pr-4">Enlistment percentile</td>
                <td className="py-2">Job-matching composite</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Scale
                </td>
                <td className="py-2 pr-4">1 to 99 percentile</td>
                <td className="py-2">Standard score, around 100 average</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Formula
                </td>
                <td className="py-2 pr-4 font-mono">2VE + AR + MK</td>
                <td className="py-2 font-mono">VE + AR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it gates
                </td>
                <td className="py-2 pr-4">Whether you can enlist at all</td>
                <td className="py-2">Which jobs and programs you qualify for</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Used by
                </td>
                <td className="py-2 pr-4">Every branch, first gate</td>
                <td className="py-2">
                  Army, Marines, Coast Guard, Navy job matching
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The minimums work differently too. AFQT minimums are branch percentile
          floors. The Coast Guard requires a minimum AFQT of 32 with a high
          school diploma, and the Air Force requires a minimum AFQT of 65 with a
          GED. None of those numbers are GT scores.
        </p>

        <p className="text-text-secondary">
          A high AFQT does not guarantee a high GT, and the reverse is also
          true. They share the WK, PC, and AR inputs, but the AFQT also leans on
          Math Knowledge while GT does not. For the AFQT side of the house, see
          our{" "}
          <Link
            href="/afqt-score"
            className="text-accent hover:text-accent-hover"
          >
            AFQT score guide
          </Link>
          . For branch-by-branch minimums, see our{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your GT Number Means: Ranges and How to Read It
        </h2>

        <p className="mt-4 text-text-secondary">
          You have a GT score. Is it good? That depends on what you want, but
          the scale gives you a rough read.
        </p>

        <p className="text-text-secondary">
          Every ASVAB subtest is reported as a standard score with a mean of 50
          and a standard deviation of 10, measured against a national sample of
          test-takers. Composite scores like GT are built from those, and they
          cluster around an average near 100. So a GT of 100 is roughly average,
          and a GT of 110 sits well above the middle of the pack.
        </p>

        {/* TABLE: GT Score Ranges with percentiles + what it unlocks (folded from asvab-gt-score) */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Score Range
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Approximate Percentile
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Category
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Unlocks
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Below 80
                </td>
                <td className="py-2 pr-4">Bottom 16%</td>
                <td className="py-2 pr-4">Limited</td>
                <td className="py-2">Few MOS options in any branch</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  80-89
                </td>
                <td className="py-2 pr-4">16th-30th</td>
                <td className="py-2 pr-4">Below average</td>
                <td className="py-2">
                  Basic infantry, food service, vehicle maintenance
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  90-99
                </td>
                <td className="py-2 pr-4">30th-50th</td>
                <td className="py-2 pr-4">Average</td>
                <td className="py-2">
                  Standard MOS, motor transport, air defense
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  100-106
                </td>
                <td className="py-2 pr-4">50th-60th</td>
                <td className="py-2 pr-4">Above average</td>
                <td className="py-2">
                  Intel-adjacent, HR, geospatial, Scout Sniper (USMC)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  107-109
                </td>
                <td className="py-2 pr-4">60th-65th</td>
                <td className="py-2 pr-4">Competitive</td>
                <td className="py-2">
                  Combat Medic, PSYOP, Civil Affairs, journalism
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  110-119
                </td>
                <td className="py-2 pr-4">65th-84th</td>
                <td className="py-2 pr-4">High</td>
                <td className="py-2">
                  Officer programs, SF, cyber, CID, warrant officer
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  120-129
                </td>
                <td className="py-2 pr-4">84th-93rd</td>
                <td className="py-2 pr-4">Outstanding</td>
                <td className="py-2">Virtually all enlisted MOS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  130+
                </td>
                <td className="py-2 pr-4">93rd+</td>
                <td className="py-2 pr-4">Elite</td>
                <td className="py-2">Maximum competitive edge</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Treat the precise statistics loosely. The exact composite standard
            deviation (often quoted as roughly 20) and the percentile
            conversions you see online (such as 110 equals about the 84th
            percentile) are derived estimates, not figures published by an
            official source. Use these as a rough guide, not gospel. The
            documented ceiling, however, is firm: Army Personnel Testing states
            144 is the highest possible GT score, and a soldier earned the first
            known perfect 144 on the AFCT in 2023.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the exact GT cutoffs tied to specific jobs, do not guess from the
          ranges above. Our{" "}
          <Link
            href="/gt-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            GT score requirements page
          </Link>{" "}
          lists the thresholds by program and MOS, and the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          shows which jobs your full score set qualifies you for across all six
          branches.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why 110 Is the GT Number Everyone Chases
        </h2>

        <p className="mt-4 text-text-secondary">
          If you spend any time around the Army, you will hear 110 over and
          over. There is a reason that number carries so much weight.
        </p>

        <p className="text-text-secondary">
          Army Regulation 135-100, which governs the appointment of commissioned
          and warrant officers, sets 110 as the qualifying minimum GT score for
          officer-producing programs. The U.S. Army Recruiting Command states
          plainly that a minimum GT score of 110 is required for warrant officer
          appointment, and that it is nonwaivable.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            A GT of 110 is the floor to even submit, or &ldquo;drop,&rdquo;
            packets for officer programs. Below 110, the application is not
            eligible in the first place.
          </p>
        </aside>

        <p className="text-text-secondary">
          What a GT of 110 commonly opens:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>Officer Candidate School and Green to Gold packets</li>
          <li>Warrant officer appointment (110 nonwaivable)</li>
          <li>
            Eligibility for nearly all of the Army&apos;s MOS, useful if you
            want to reclassify
          </li>
          <li>Consideration for special operations pipelines</li>
        </ul>

        <p className="text-text-secondary">
          On the special operations side, Army Special Forces (18X) generally
          requires a GT of 110 or higher, and Marine MARSOC has been cited at a
          GT of 105. UNVERIFIED: program-specific cutoffs other than the 110
          officer floor change with policy, so confirm current numbers before
          you bank on them.
        </p>

        <p className="text-text-secondary">
          For warrant officer specifically, there is no waiver below 110. The
          only path up is to raise the score. The full breakdown of GT
          thresholds by job lives on our{" "}
          <Link
            href="/gt-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            GT score requirements page
          </Link>
, and the officer track is covered in our{" "}
          <Link
            href="/warrant-officer-requirements"
            className="text-accent hover:text-accent-hover"
          >
            Army warrant officer requirements
          </Link>{" "}
          guide.
        </p>

        {/* Jobs That Require a High GT Score (folded from asvab-gt-score) */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army and Marine Jobs by GT Cutoff
        </h2>
        <p className="mt-4 text-text-secondary">
          Your GT score is a key that opens specific doors. These are the
          common cutoffs by tier. Treat individual MOS numbers as approximate,
          since they shift year to year with recruiting needs.
        </p>

        {/* GT 110+ */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          GT 110+ (Officer and Elite Tier)
        </h3>
        <p className="mt-4 text-text-secondary">
          Every officer-producing program and special forces contract requires GT
          110 minimum.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS/Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Additional Requirements
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">09S</td>
                <td className="py-2 pr-4">Officer Candidate</td>
                <td className="py-2">Bachelor&apos;s degree</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">09W</td>
                <td className="py-2 pr-4">Warrant Officer Candidate</td>
                <td className="py-2">Branch-specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">17C</td>
                <td className="py-2 pr-4">Cyber Operations Specialist</td>
                <td className="py-2 font-mono">ST:112</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">18X</td>
                <td className="py-2 pr-4">Special Forces Recruit</td>
                <td className="py-2 font-mono">CO:100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">31D</td>
                <td className="py-2 pr-4">CID Special Agent</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">12P</td>
                <td className="py-2 pr-4">Prime Power Production</td>
                <td className="py-2 font-mono">EL:107, ST:107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0211</td>
                <td className="py-2 pr-4">CI/HUMINT Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0651</td>
                <td className="py-2 pr-4">Cyber Network Operator</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">7257</td>
                <td className="py-2 pr-4">Air Traffic Controller</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* GT 107+ */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          GT 107+ (Medical and Professional Tier)
        </h3>
        <p className="mt-4 text-text-secondary">
          The gateway for medical, PSYOP, and communications careers.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS/Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Additional Requirements
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">68W</td>
                <td className="py-2 pr-4">Combat Medic</td>
                <td className="py-2 font-mono">ST:101</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">37F</td>
                <td className="py-2 pr-4">PSYOP Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">38B</td>
                <td className="py-2 pr-4">Civil Affairs Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">46Q</td>
                <td className="py-2 pr-4">Public Affairs Specialist</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* GT 100+ */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          GT 100+ (Technical Tier)
        </h3>
        <p className="mt-4 text-text-secondary">
          Intelligence-adjacent roles, law enforcement, and specialized
          logistics.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS/Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Additional Requirements
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">42A</td>
                <td className="py-2 pr-4">Human Resource Specialist</td>
                <td className="py-2 font-mono">CL:90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">12Y</td>
                <td className="py-2 pr-4">Geospatial Engineer</td>
                <td className="py-2 font-mono">ST:100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0231</td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">5811</td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 110 is the dividing line. It is required for every
            officer-producing program, all special forces contracts, and the
            highest-demand technical MOS. If you are within 10 points of 110,
            targeted study on WK, PC, and AR can close that gap in 4-6 weeks.{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              Check which jobs you qualify for now
            </Link>
            .
          </p>
        </aside>

        <p className="text-text-secondary">
          For complete job lists with all line score requirements, see the{" "}
          <Link
            href="/army-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            Army MOS list
          </Link>{" "}
          and{" "}
          <Link
            href="/usmc-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            USMC MOS list
          </Link>
          .
        </p>

        {/* GT Requirements for Special Programs (folded from asvab-gt-score) */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Requirements for Special Programs
        </h2>
        <p className="mt-4 text-text-secondary">
          A GT of 110 is not just a job requirement. It is the regulatory
          minimum for every path from enlisted to officer. AR 135-100
          establishes GT 110 as the floor for all officer-producing programs,
          and Green to Gold is specifically non-waiverable.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Program
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Minimum
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Additional Requirements
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Waiverable?
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  OCS (Officer Candidate School)
                </td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2 pr-4">Bachelor&apos;s degree</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Green to Gold
                </td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2 pr-4">College enrollment</td>
                <td className="py-2">No (per AR 135-100)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  WOCS (Warrant Officer)
                </td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2 pr-4">Branch-specific experience</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  18X (SF civilian contract)
                </td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2 pr-4 font-mono">CO:100</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SFAS (active duty SF pathway)
                </td>
                <td className="py-2 pr-4 font-mono">100</td>
                <td className="py-2 pr-4">E-4+, meet physical standards</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Ranger Regiment (Option 40)
                </td>
                <td className="py-2 pr-4 font-mono">110 (competitive)</td>
                <td className="py-2 pr-4">GT 105 floor</td>
                <td className="py-2">Rare</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Drill Sergeant
                </td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2 pr-4">E-5+</td>
                <td className="py-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Notice the active duty SF exception. A soldier already serving who
          pursues Special Forces through the SFAS pipeline only needs GT 100, not
          110. The civilian 18X contract demands the higher threshold. A soldier
          with GT 101 is locked out of OCS, Green to Gold, WOCS, 18X, and Drill
          Sergeant duty simultaneously. That 9-point gap closes every advanced
          career door at once, but 9 points is closable with focused
          preparation.
        </p>

        {/* How High Can a GT Go (folded from gt-score-max) */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Highest Possible GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          Almost every page that talks about the GT score max hands you a
          confident number, and most of those numbers have nothing behind them.
          You will see 145, 147, even 151 stated like settled fact. The only
          ceiling backed by an authoritative source is 144, the number Army
          Personnel Testing officials gave for the Army&apos;s version of the
          test.
        </p>

        <p className="text-text-secondary">
          On March 22, 2023, Sergeant 1st Class Ashley Hackley scored a perfect
          GT on the Armed Forces Classification Test (AFCT), the active-duty
          version of the ASVAB. When Fort Knox Education Center trainers asked
          Army Personnel Testing whether anyone could beat a 144, the answer was
          direct: &ldquo;Nothing. 144 is the highest possible score.&rdquo; Army
          University officials added that Hackley was the first soldier they knew
          of to earn a perfect score on the test.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            Unverified figures
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            You will see the Army GT max listed as 145 to 147 and the Marine
            Corps max as 151. We could not trace either number to a Department of
            Defense or MEPCOM source. We are not presenting them as fact. The
            Marine Corps composite is sometimes described with an extra math
            subtest, which would let a Marine GT read higher than an Army GT, but
            the exact ceiling is not authoritatively documented.
          </p>
        </aside>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Why Your GT Can Be Over 100 When the Highest ASVAB Score Is 99
        </h3>

        <p className="mt-4 text-text-secondary">
          If 99 is the highest ASVAB score, how does anyone post a GT of 130?
          The number capped at 99 is the AFQT, a percentile ranked from 1 to 99
          against a national sample. A percentile cannot go above 99 by
          definition. The GT is not a percentile. It is a standard score, built
          by adding two subtest-scale standard scores (VE and AR) that each
          center near 50, so the GT composite centers near 100 with a standard
          deviation of roughly 20. That is why 100 is an average GT, not a
          maximum, and how a 130 or a 144 is possible. If a guide told you your
          GT is 303 or 362, throw out the result. GT does not reach the 300s.
          Those numbers come from treating raw subtest scores as if they were
          standard scores, then adding or multiplying them.
        </p>

        {/* GT distribution table (folded from gt-score-max) */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Band
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Approx. Percentile
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Signals
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  110 to 119
                </td>
                <td className="py-2 pr-4 font-mono">65th to 84th</td>
                <td className="py-2">Officer and special-program eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  120 to 129
                </td>
                <td className="py-2 pr-4 font-mono">84th to 93rd</td>
                <td className="py-2">Outstanding</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  130 to 139
                </td>
                <td className="py-2 pr-4 font-mono">93rd to 98th</td>
                <td className="py-2">Elite, roughly top 7%</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  140 to 144
                </td>
                <td className="py-2 pr-4 font-mono">98th and up</td>
                <td className="py-2">Near the ceiling, almost no one</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The real-world data backs up how thin the air gets near the top.
          Soldiers in the Army&apos;s Basic Skills Education Program improve
          about 23 points on average, moving from an entry average of 98 to
          roughly 123. Even inside a dedicated improvement program, the highest
          score one Fort Knox instructor had personally witnessed was 137, until
          Hackley posted a perfect 144.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Most jobs cap their GT requirement around 110. Chasing the absolute
            GT score max past your target has diminishing returns. The number
            above your goal is a curiosity, not a requirement. Aim for the
            threshold your job actually needs, then stop.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How the GT Score Differs by Branch
        </h2>

        <p className="mt-4 text-text-secondary">
          People assume every branch builds and uses the GT score the same way.
          They do not, and acting on the wrong branch&apos;s rules will cost
          you.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Uses a GT score?
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  How it works
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">
                  GT = VE + AR. Its single most important line score.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">
                  GT = VE + AR, identical to Army. MC is not part of standard GT.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">A GT-style composite, VE + AR.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">Yes (listed)</td>
                <td className="py-2">
                  A GT (AR + VE) appears on the Navy line-score list, but
                  ratings are matched by rating-specific composites.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force / Space Force
                </td>
                <td className="py-2 pr-4">No GT</td>
                <td className="py-2">
                  No GT line score. Uses four MAGE composites: Mechanical,
                  Administrative, General, Electronic. The General (G) composite
                  uses the same VE + AR inputs but is expressed as a percentile.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>
              Air Force G scores and Army GT scores are NOT comparable.
            </strong>{" "}
            An Air Force G of 72 means 72nd percentile, roughly equivalent to an
            Army GT of 115-120. An Army GT of 72 is well below average. If
            someone from a different branch quotes their &ldquo;GT,&rdquo;
            always ask which branch and which scale.
          </p>
        </aside>

        <p className="text-text-secondary">
          The big correction here is the Air Force: it does not have a GT score.
          If you want the Air Force or Space Force, the numbers that matter are
          the MAGE composites, not a GT. The other common error is the Marines.
          Some sources claim Marine GT includes Mechanical Comprehension (MC).
          That is incorrect. Marine GT = VE + AR, identical to Army. MC feeds the
          Marine MM (Mechanical Maintenance) composite, not GT. The Army leans on
          GT harder than anyone, which is why nearly all the 110 talk is Army
          talk. For the full set of branch minimums and how each service maps
          scores to jobs, see our{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Raise Your GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          A low GT is not permanent. There are two real paths up, and which one
          applies depends on whether you have enlisted yet. The Army&apos;s
          Operation Connect the Dots program proved how fast it can move: 82% of
          soldiers (37 out of 45) reached GT 110 in just two weeks of intensive
          preparation, and 7 of them changed MOS as a result. Your GT only
          depends on 3 subtests, so you can ignore the other 7 entirely.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Because Word Knowledge and Paragraph Comprehension make up the
            entire verbal half of your GT, vocabulary and reading are your
            highest-leverage study targets. Arithmetic Reasoning is the other
            half. Skip everything that does not feed those three.
          </p>
        </aside>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Before You Enlist (or Civilian Retake)
        </h3>
        <p className="mt-4 text-text-secondary">
          Focus only on Word Knowledge, Paragraph Comprehension, and Arithmetic
          Reasoning. Learn 10-15 new words per day, focusing on roots, prefixes,
          and suffixes. Read short passages daily and identify the main idea in
          one sentence. For AR, where most people leave the most GT points on the
          table, master percentages, ratios, fractions, distance/rate/time
          problems, and basic algebra, and always read the problem twice before
          calculating. Study at least 30 minutes daily for 4-6 weeks, take a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice test
          </Link>{" "}
          weekly to track progress, and check your projected number with the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
          . A realistic gain is 10-20 GT points in that window.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Already Serving (AFCT Pathway)
        </h3>
        <p className="mt-4 text-text-secondary">
          Active-duty soldiers do not retake the civilian ASVAB. You take the
          AFCT (Armed Forces Classification Test) instead. The Army runs a course
          called BSEP (Basic Skills Education Program) that preps the math and
          English portions that build your GT. The process:
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Request GT improvement counseling through your chain of command.
          </li>
          <li>
            Enroll in BSEP at your installation&apos;s education center.
          </li>
          <li>
            Take the TABE assessment to gauge current math and English skills.
          </li>
          <li>
            Complete BSEP classes (typically 4-6 weeks, 1 hour of authorized
            daily study time).
          </li>
          <li>
            Take the GT predictor test. Score above 100 before scheduling the
            AFCT.
          </li>
          <li>Take the AFCT.</li>
        </ol>

        <p className="text-text-secondary">
          The Army reports an average GT gain of about 19 points from BSEP, with
          some classes averaging around 23 and individual reports of 30-point
          jumps. Soldiers effectively have 3 AFCT attempts in their career
          (excluding the initial enlistment test), with documented prep required
          for each.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent score replaces your previous one. It is not the
            highest score that counts. A poorly prepared retake can lower your
            GT, so do not test until your practice scores are consistently where
            you need them.
          </p>
        </aside>

        <p className="text-text-secondary">
          A higher GT is how active-duty soldiers reclassify into better jobs.
          See our{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP guide
          </Link>{" "}
          for the program in depth, our{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB retake guide
          </Link>{" "}
          for wait periods and the C-Test formula, and our{" "}
          <Link
            href="/mos-reclassification"
            className="text-accent hover:text-accent-hover"
          >
            MOS reclassification guide
          </Link>{" "}
          for using the score once you have it.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the GT score the same as the AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The AFQT is a percentile from 1 to 99 that decides whether you
              can enlist. The GT score is a composite standard score that
              decides which jobs and programs you can hold once you are in. They
              share some subtests but use different formulas and different
              scales. See our{" "}
              <Link
                href="/afqt-score"
                className="text-accent hover:text-accent-hover"
              >
                AFQT score guide
              </Link>{" "}
              for the enlistment side.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A GT of 100 is roughly average. A 110 is the threshold that opens
              officer, warrant, special operations, and most technical roles, so
              it is the number most people aim for. Anything above 110 is
              strong. What counts as &ldquo;good&rdquo; depends on the specific
              job you want.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is the GT score calculated?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT = VE + AR. VE (Verbal Expression) is a combined score from your
              Word Knowledge and Paragraph Comprehension results, and AR is
              Arithmetic Reasoning. So three subtests feed it: WK, PC, and AR.
              Run your numbers through our{" "}
              <Link
                href="/gt-score-calculator"
                className="text-accent hover:text-accent-hover"
              >
                GT score calculator
              </Link>{" "}
              to see your result.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is GT just WK + PC + AR added together?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. GT = VE + AR. VE (Verbal Expression) is a converted standard
              score the ASVAB derives from your Word Knowledge and Paragraph
              Comprehension performance, not a raw sum of the two subtests.
              Adding WK, PC, and AR directly gives you the wrong number, which is
              why some online calculators spit out impossible GT scores in the
              300s.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why does Word Knowledge matter so much for GT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The verbal half of your GT is VE, which comes from Word Knowledge
              and Paragraph Comprehension. Together those two subtests are half
              your GT score, so vocabulary and reading carry as much weight as
              all your math reasoning. Drilling vocabulary is one of the most
              efficient ways to move your GT.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need to be an officer or warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A GT of 110 is the qualifying minimum for Army officer-producing
              programs under AR 135-100, and warrant officer requires 110 with
              no waiver. Below 110 you cannot submit the packet. See our{" "}
              <Link
                href="/warrant-officer-requirements"
                className="text-accent hover:text-accent-hover"
              >
                Army warrant officer requirements
              </Link>{" "}
              for the full track.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the highest possible GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The best-sourced ceiling is 144 for the Army&apos;s AFCT, confirmed
              by Army Personnel Testing officials, with the first known perfect
              144 earned in 2023. Figures of 145 to 147 for the Army and 151 for
              the Marine Corps circulate online but lack an authoritative source.
              Because GT is a standard score and not a percentile, it can exceed
              100 and is not capped at 99 like the AFQT.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Air Force have a GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The Air Force and Space Force do not use a GT line score. They
              use four MAGE composites: Mechanical, Administrative, General, and
              Electronic. If you are headed for the Air Force, focus on those,
              not a GT. Check the{" "}
              <Link
                href="/asvab-score-requirements"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB score requirements
              </Link>{" "}
              for the right numbers.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I get a waiver for a GT below 110?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              For Army warrant officer, no. The 110 minimum is nonwaivable.
              Other programs vary, but the reliable move is to raise the score
              rather than chase an exception. Active-duty soldiers do this
              through the AFCT and Army BSEP. See our{" "}
              <Link href="/bsep" className="text-accent hover:text-accent-hover">
                BSEP guide
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How fast can I raise my GT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Active-duty soldiers who complete the Army&apos;s roughly two-week
              BSEP course gain about 19 points on average, with some classes
              averaging 23. The Army&apos;s Operation Connect the Dots got 82% of
              soldiers to GT 110 in just two weeks. Future recruits can move
              their GT in a few weeks of focused prep on Word Knowledge,
              Paragraph Comprehension, and Arithmetic Reasoning. Start with a{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                free practice test
              </Link>
              .
            </p>
          </div>
        </div>

        <section className="mt-8 not-prose">
          <EmailCapture
            headline="Close the GT gap in 4-6 weeks"
            subhead="Most people leave GT points on the table in AR. Our free plan walks you through the highest-leverage drills, 30 minutes a day."
            cta="Email me the plan"
            tag="gt-score-end"
            variant="inline"
          />
        </section>

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite
            scores, and every job you qualify for.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Free Calculator
          </Link>
        </div>

        {/* Related links */}
        <section className="my-8 not-prose rounded-xl border border-accent/30 bg-navy-light p-6">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Related GT and Career Guides
          </h2>
          <ul className="mt-4 space-y-3 text-text-secondary">
            <li>
              <Link
                href="/gt-score-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                GT score calculator
              </Link>{" "}, enter your WK, PC, and AR scores and get your exact GT plus
              the jobs it unlocks.
            </li>
            <li>
              <Link
                href="/gt-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                GT score requirements
              </Link>{" "}, every GT threshold by job, program, and branch in one
              reference.
            </li>
            <li>
              <Link
                href="/warrant-officer-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                Army warrant officer requirements
              </Link>{" "}, the GT 110 gate plus the full eligibility checklist for the
              warrant officer path.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
