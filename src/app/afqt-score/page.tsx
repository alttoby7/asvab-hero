import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AFQT Score: What It Is and How to Improve It | ASVAB Hero",
  description:
    "Learn what your AFQT score means, how it&apos;s calculated from 4 ASVAB subtests, branch minimums for 2026, and the fastest ways to raise it.",
  alternates: {
    canonical: "https://asvabhero.com/afqt-score",
  },
};

export default function AFQTScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "AFQT Score: What It Is and Why It Controls Your Military Future",
          description:
            "Learn what your AFQT score means, how it's calculated from 4 ASVAB subtests, branch minimums for 2026, and the fastest ways to raise it.",
          url: "https://asvabhero.com/afqt-score",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-23",
          dateModified: "2026-03-23",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a good AFQT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "An AFQT of 50 or above puts you in Category IIIA, which means you're eligible for all branches and most enlistment bonuses. Scoring 60 or higher gives you maximum flexibility for job selection and incentive programs.",
              },
            },
            {
              "@type": "Question",
              name: "Is the AFQT the same as your ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The ASVAB is a battery of 9 subtests. The AFQT uses only 4 of those subtests to produce a single enlistment eligibility percentile. The other subtests feed into composite scores used for job qualification.",
              },
            },
            {
              "@type": "Question",
              name: "Can you retake the ASVAB to improve your AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. You can retest after 1 month, retest again after another 1 month, then every 6 months after that. Your newest score replaces all previous scores. If you score lower on the retake, the lower score stands.",
              },
            },
            {
              "@type": "Question",
              name: "What happens if your AFQT is below 31?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You're ineligible for standard enlistment in any branch. Category IVA (21-30) technically allows enlistment with a waiver, but Category IV accessions are capped at 4% by law. Category V (below 10) is completely barred from service by federal statute.",
              },
            },
            {
              "@type": "Question",
              name: "Does the AFQT affect your military job?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not directly. The AFQT is the enlistment gate. Composite scores, calculated from all 9 subtests, are the job gate. However, a higher AFQT can unlock enlistment bonuses and gives you priority in job selection during classification.",
              },
            },
            {
              "@type": "Question",
              name: "How long is an AFQT score valid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your ASVAB scores, including your AFQT, are valid for 2 years from the test date. After 2 years, you must retest if you haven't shipped to basic training.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          AFQT Score: What It Is and Why It Controls Your Military Future
        </h1>

        <p className="mt-4 text-text-secondary">
          Most people think the ASVAB gives you one score. It doesn&apos;t. The
          ASVAB produces multiple scores, but only one decides whether you can
          enlist: your <strong>AFQT</strong>.
        </p>
        <p className="text-text-secondary">
          AFQT stands for Armed Forces Qualification Test. It uses just 4 of the
          9 ASVAB subtests, and the result is a percentile scored against a
          national sample from 1997. That percentile is the single number every
          branch checks before anything else. Below the cutoff, nothing else on
          your score sheet matters.
        </p>
        <p className="text-text-secondary">
          This guide breaks down the AFQT formula, branch minimums for 2026,
          categories, how composites differ, and how to raise your score fast.
          If you want to see where you stand right now, run your numbers through
          our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>
          .
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT percentile is not the percentage of questions you answered
            correctly. It&apos;s how you rank against a reference population. An
            AFQT of 60 means you outperformed 60% of that group, not that you
            got 60% right.
          </p>
        </aside>

        {/* Section: How AFQT Is Calculated */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Your AFQT Score Is Calculated
        </h2>
        <p className="mt-4 text-text-secondary">
          Only 4 of the 9 ASVAB subtests feed into the AFQT, and one area
          counts twice.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>

        <p className="text-text-secondary">
          VE is the Verbal Expression composite. It&apos;s not a standalone
          subtest. It comes from combining two subtests:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          VE = WK + PC
        </div>

        <p className="text-text-secondary">The four inputs:</p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Word Knowledge (WK):</strong> Vocabulary. You match words to
            definitions. 35 questions on the CAT-ASVAB, 16 minutes.
          </li>
          <li>
            <strong>Paragraph Comprehension (PC):</strong> Reading
            comprehension. Short passages, then questions about them. 15
            questions, 22 minutes.
          </li>
          <li>
            <strong>Arithmetic Reasoning (AR):</strong> Math word problems. You
            translate real-world scenarios into equations and solve them. 15
            questions, 55 minutes (CAT-ASVAB timing varies).
          </li>
          <li>
            <strong>Mathematics Knowledge (MK):</strong> Pure math. Algebra,
            geometry, basic number theory. No word problems. 15 questions, 23
            minutes.
          </li>
        </ul>

        <p className="text-text-secondary">
          VE is doubled. That means verbal performance drives roughly half your
          AFQT. A strong vocabulary and solid reading skills have more impact
          than math does.
        </p>
        <p className="text-text-secondary">
          In concrete terms: if you improve your WK raw score by 5 points, that
          feeds into VE, which gets doubled. The same 5-point improvement in MK
          only counts once. Time spent on verbal skills gives you more AFQT
          points per hour than time spent on math.
        </p>
        <p className="text-text-secondary">
          The five remaining ASVAB subtests (General Science, Electronics
          Information, Auto &amp; Shop Information, Mechanical Comprehension,
          Assembling Objects) have zero effect on your AFQT. They only feed into
          composite line scores used for job qualification.
        </p>
        <p className="text-text-secondary">
          The formula produces a raw score, which gets converted to a percentile
          using norms from the 1997 Profile of American Youth study (roughly
          14,000 people aged 18&ndash;23). The DoD has never updated these
          norms.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Raw AFQT results are converted to percentiles using 1997 norms from
            approximately 14,000 test-takers. These norms have never been
            updated.
          </p>
        </aside>

        <p className="text-text-secondary">
          For a deeper breakdown of how raw scores become percentiles and what
          each subtest measures, see our{" "}
          <Link
            href="/asvab-scores-explained"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB scores explained
          </Link>{" "}
          guide. You can also plug in your subtest scores on our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            calculator
          </Link>{" "}
          to estimate where you land.
        </p>

        {/* Section: AFQT Categories */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories: What Your Percentile Actually Means
        </h2>
        <p className="mt-4 text-text-secondary">
          A 49 and a 50 are one point apart but live in completely different
          worlds for enlistment. The DoD groups AFQT percentiles into
          categories, and the line between Category IIIB and IIIA is the most
          consequential threshold in military recruiting.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Category
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Percentile Range
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Means
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-400">
                  I
                </td>
                <td className="py-2 pr-4 font-mono">93&ndash;99</td>
                <td className="py-2">
                  Top tier. First pick of jobs, maximum bonuses, recruiters love
                  you.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">
                  II
                </td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">
                  Highly qualified. Full access to nearly every MOS/rate/AFSC.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  IIIA
                </td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">
                  Above average. Eligible for all branches and most enlistment
                  incentives.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  IIIB
                </td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">
                  Qualified for most branches (with diploma). Limited bonus
                  eligibility.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IVA
                </td>
                <td className="py-2 pr-4 font-mono">21&ndash;30</td>
                <td className="py-2">
                  Below most branch minimums. Waiver territory.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IVB
                </td>
                <td className="py-2 pr-4 font-mono">16&ndash;20</td>
                <td className="py-2">
                  Extremely limited. Very few branches will consider you.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  IVC
                </td>
                <td className="py-2 pr-4 font-mono">10&ndash;15</td>
                <td className="py-2">
                  Essentially ineligible. No branch accepts this range in
                  practice.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  V
                </td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">
                  Barred from enlistment by federal law.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The IIIA threshold at 50 is where things shift. Score a 50 or above
          and you&apos;re eligible for enlistment bonuses across most branches.
          The Navy&apos;s FY2026 bonus structure makes this concrete: AFQT
          50&ndash;99 qualifies for up to $5,000 in quick-ship bonuses, while
          AFQT 31&ndash;49 caps at $3,000 for the same programs. The Army offers
          similar tiered incentive structures where Category IIIA and above
          unlock significantly larger signing bonuses.
        </p>
        <p className="text-text-secondary">
          Category II (65&ndash;92) is where most successful recruits land. Full
          access to nearly every job in every branch. If you&apos;re aiming for
          competitive programs like nuclear, cyber, or special operations, this
          is the range you need.
        </p>
        <p className="text-text-secondary">
          Category I (93&ndash;99) is rare. Only about 7% of the 1997 reference
          population scored here. At this level, you&apos;re choosing your
          career rather than hoping for availability.
        </p>
        <p className="text-text-secondary">
          Category IIIB (31&ndash;49) still gets you in the door at most
          branches with a diploma. But you&apos;ll see fewer bonus offers, fewer
          job slots, and less flexibility in your ship date.
        </p>
        <p className="text-text-secondary">
          Below 31, options collapse fast. Category IVA (21&ndash;30) puts you
          in waiver territory, and waivers are not guaranteed. The DoD caps
          Category IV accessions at 4% of annual recruits across all
          subcategories combined.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Category IV is capped at 4% of annual accessions by federal law (32
            CFR 66.6). Category V is completely barred from military service.
            These are not branch policies; they are legal limits.
          </p>
        </aside>

        <p className="text-text-secondary">
          For a visual breakdown of how these ranges map across branches, check
          our{" "}
          <Link
            href="/asvab-score-ranges"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score ranges
          </Link>{" "}
          page and our{" "}
          <Link
            href="/asvab-score-chart"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score chart
          </Link>
          .
        </p>

        {/* Section: Branch Minimums */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum AFQT Scores by Branch in 2026
        </h2>
        <p className="mt-4 text-text-secondary">
          Every branch sets its own floor, and GED holders face a steeper bar
          than diploma holders across the board.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Diploma Minimum
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GED Minimum
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2">50 + 15 college credits</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marine Corps
                </td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2">50 + 15 college credits</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          A GED doesn&apos;t just raise your required AFQT. It also puts you in
          a smaller acceptance pool. Each branch limits how many GED holders it
          takes per year.
        </p>
        <p className="text-text-secondary">
          The Marine Corps caps GED accessions at roughly 5% of annual recruits.
          The Air Force historically accepts around 0.5% GED holders in a given
          year. That means even if you score a 65 with a GED, the Air Force may
          not have a slot for you.
        </p>
        <p className="text-text-secondary">
          The Navy and Coast Guard add another requirement for GED holders: 15
          semester hours of college credit on top of the higher AFQT minimum.
          Without those credits, a GED holder with a 50 still can&apos;t enlist
          in either branch.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            These are peacetime minimums. Branches can raise them based on
            recruiting needs. Your recruiter&apos;s actual threshold may be
            higher than what&apos;s listed here.
          </p>
        </aside>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The Practical Impact of These Minimums
        </h3>
        <p className="mt-4 text-text-secondary">
          The spread between branches creates real strategic decisions. A diploma
          holder scoring 33 qualifies for the Army and Marines but gets rejected
          by the Navy (35), Air Force (36), Space Force (36), and Coast Guard
          (40). Two more points on the AFQT opens two more branches.
        </p>
        <p className="text-text-secondary">
          The Army&apos;s floor of 31 is the lowest across all branches, making
          it the most accessible path for recruits near the bottom of the
          qualifying range. The Coast Guard&apos;s 40 is the highest diploma
          minimum, reflecting its smaller force size and higher selectivity per
          slot.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Exceptions and Special Programs
        </h3>
        <p className="mt-4 text-text-secondary">
          The Navy&apos;s DEP Enrichment Program allows provisional enlistment
          for diploma holders who score between AFQT 28 and 30. These recruits
          enter the Delayed Entry Program and receive study resources to prepare
          for a retest. They must reach a 35 before shipping to boot camp. This
          is a limited program that depends on Navy recruiting goals and
          available slots.
        </p>
        <p className="text-text-secondary">
          The Space Force requires AFQT 36 for diploma holders and 65 for GED
          holders, has no waiver program for Category IV scores, and has the
          smallest annual accession numbers of any branch. Competition for Space
          Force slots is steep even with qualifying scores.
        </p>
        <p className="text-text-secondary">
          For branch-specific breakdowns, see{" "}
          <Link
            href="/what-is-a-good-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            what is a good ASVAB score
          </Link>{" "}
          and our full guide to{" "}
          <Link
            href="/asvab-scoring-and-results"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB scoring and results
          </Link>
          .
        </p>

        {/* Section: Two-Gate System */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT vs Composite Scores: The Two-Gate System
        </h2>
        <p className="mt-4 text-text-secondary">
          Your AFQT and your composite scores do completely different jobs.
          Confusing them is the most common mistake recruits make.
        </p>
        <p className="text-text-secondary">
          Military qualification works like two gates you clear in sequence.
        </p>
        <p className="text-text-secondary">
          <strong>Gate 1: AFQT (Enlistment).</strong> Your AFQT percentile
          determines whether you can enlist at all. It uses 4 subtests.
          It&apos;s pass/fail against your branch&apos;s minimum. If you
          don&apos;t clear this gate, nothing else matters.
        </p>
        <p className="text-text-secondary">
          <strong>Gate 2: Composites (Jobs).</strong> Composite scores, also
          called line scores, determine which jobs you qualify for. They use all
          9 ASVAB subtests combined in branch-specific formulas. Each MOS, rate,
          or AFSC has its own composite requirements.
        </p>
        <p className="text-text-secondary">
          A concrete example: You score an AFQT of 55. Gate 1 cleared,
          you&apos;re eligible for every branch. But your GT (General Technical)
          composite comes in at 98. The Army&apos;s Cyber Operations Specialist
          (17C) requires a GT of 110. Gate 2 blocked. You qualify to enlist but
          not for that specific job.
        </p>
        <p className="text-text-secondary">
          The reverse also applies. You could have a GT of 130, but if your AFQT
          is 25, no branch will let you through the door. Both gates must be
          cleared.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            A high AFQT doesn&apos;t guarantee the job you want. A low AFQT
            locks you out entirely, no matter how high your line scores are. You
            need to clear both gates.
          </p>
        </aside>

        <p className="text-text-secondary">
          This distinction shapes how you study. If your only goal is raising
          your AFQT, focus on the 4 AFQT subtests: WK, PC, AR, and MK. If you
          need a specific composite for a target job, you may need to study
          subtests like General Science, Electronics Information, or Mechanical
          Comprehension that don&apos;t affect your AFQT at all.
        </p>
        <p className="text-text-secondary">
          Each branch calculates composites differently. The Army uses 10 line
          scores (GT, CL, CO, EL, FA, GM, MM, OF, SC, ST). The Air Force uses 4
          MAGE composites (Mechanical, Administrative, General, Electronics).
          The Navy and Marines have their own formulas. All of them pull from
          the full 9-subtest battery.
        </p>
        <p className="text-text-secondary">
          See how your subtests map to composites on our{" "}
          <Link
            href="/asvab-scores-explained"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB scores explained
          </Link>{" "}
          page, or enter your scores on the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            calculator
          </Link>{" "}
          to check both AFQT and composite results.
        </p>

        {/* Section: How to Improve AFQT */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Improve Your AFQT Score
        </h2>
        <p className="mt-4 text-text-secondary">
          Because verbal counts double in the AFQT formula, the fastest path to
          a higher score is counterintuitive: study words, not just math.
        </p>
        <p className="text-text-secondary">
          Allocate your study time for maximum impact:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>50% on Word Knowledge.</strong> WK feeds VE, and VE is
            doubled. Every point you gain here has twice the impact on your
            AFQT. Focus on vocabulary building, Greek and Latin roots, and
            context clues. See our{" "}
            <Link
              href="/asvab-word-knowledge-tips"
              className="text-accent hover:text-accent-hover"
            >
              Word Knowledge tips
            </Link>
            .
          </li>
          <li>
            <strong>25% on Paragraph Comprehension.</strong> PC also feeds VE,
            so gains here are also doubled. Practice identifying main ideas,
            drawing conclusions, and determining word meaning from context. See
            our{" "}
            <Link
              href="/asvab-paragraph-comprehension-tips"
              className="text-accent hover:text-accent-hover"
            >
              Paragraph Comprehension tips
            </Link>
            .
          </li>
          <li>
            <strong>25% split between AR and MK.</strong> Arithmetic Reasoning
            responds well to learning how to translate word problems into
            equations. Mathematics Knowledge requires drilling algebra and
            geometry fundamentals. See our{" "}
            <Link
              href="/asvab-arithmetic-reasoning-tips"
              className="text-accent hover:text-accent-hover"
            >
              Arithmetic Reasoning tips
            </Link>{" "}
            and{" "}
            <Link
              href="/asvab-math-tips"
              className="text-accent hover:text-accent-hover"
            >
              math tips
            </Link>
            .
          </li>
        </ul>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              30&ndash;50 hours of study
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Expect a 10&ndash;20 point AFQT gain
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              100+ hours of study
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Expect a 20&ndash;40+ point AFQT gain
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          These are rough benchmarks. Your actual improvement depends on your
          starting level and the quality of your study materials. Someone
          starting at AFQT 25 has more room to grow than someone at 70. The
          biggest gains come in the first 30&ndash;50 hours because that&apos;s
          when you&apos;re plugging the largest knowledge gaps.
        </p>
        <p className="text-text-secondary">
          Consistency matters more than marathon sessions. Studying 1&ndash;2
          hours daily for 6 weeks beats cramming 12 hours the weekend before
          your test. Your brain needs time to consolidate vocabulary and math
          patterns between sessions.
        </p>
        <p className="text-text-secondary">
          One high-leverage tactic: take a diagnostic practice test first, then
          compare your four AFQT subtest scores. If WK is your lowest,
          prioritize vocabulary flashcards and root-word drills. If AR drags you
          down, drill word-problem translation daily. Target your weakest subtest
          first, because bringing a 30 to a 50 is easier than pushing a 70 to a
          90.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Retest Rules
        </h3>
        <p className="mt-4 text-text-secondary">
          After your first ASVAB, you can retest after 1 month. After the second
          attempt, wait another 1 month. Every retest after that requires a
          6-month wait. Plan your study timeline around these intervals.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent ASVAB score replaces all previous scores. If you
            retake and score lower, the lower score is what counts. Only retake
            when you&apos;re confident you will improve.
          </p>
        </aside>

        <p className="text-text-secondary">
          Start with a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            practice test
          </Link>{" "}
          to identify your weakest AFQT subtests. Then build a study plan
          targeting those areas. Our{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB study guide
          </Link>{" "}
          and{" "}
          <Link
            href="/how-to-study-for-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            how to study for the ASVAB
          </Link>{" "}
          guide lay out a week-by-week approach. If you&apos;ve already taken
          the ASVAB and need a do-over, read our{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            how to retake the ASVAB
          </Link>{" "}
          guide for the full process.
        </p>

        {/* Section: When You Get Your AFQT Score */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          When You Get Your AFQT Score
        </h2>
        <p className="mt-4 text-text-secondary">
          Score delivery depends entirely on which version of the ASVAB you
          took.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              CAT-ASVAB (computer at MEPS)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Scores available immediately after testing
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Paper ASVAB (school or MET site)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Several business days for processing
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              PiCAT (remote, at home)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Provisional score until verified at MEPS
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          If you take the CAT-ASVAB at a Military Entrance Processing Station,
          your scores are calculated as soon as you finish. Your recruiter can
          pull your AFQT and composite scores the same day.
        </p>
        <p className="text-text-secondary">
          The paper-and-pencil ASVAB, typically administered at high schools or
          Mobile Examination Test sites, takes longer. Scores are sent to your
          recruiter within a few business days. You won&apos;t get a printout
          on-site.
        </p>
        <p className="text-text-secondary">
          The PiCAT is a remote, unproctored version you take at home. It gives
          you a provisional score, but that score is not final.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            PiCAT scores are not final. You must complete a verification test at
            MEPS. If your verification score differs significantly from your
            PiCAT result, you retake the full ASVAB.
          </p>
        </aside>

        <p className="text-text-secondary">
          In all cases, your recruiter receives the full breakdown: AFQT
          percentile, individual subtest standard scores, and composite line
          scores. You&apos;ll see your results through your recruiter or on your
          enlistment paperwork. There&apos;s no public portal to look up ASVAB
          scores yourself.
        </p>
        <p className="text-text-secondary">
          ASVAB scores are valid for 2 years from the test date. If you
          haven&apos;t shipped to basic training within that window, you must
          retest.
        </p>
        <p className="text-text-secondary">
          For a full walkthrough of what your score report looks like, see our{" "}
          <Link
            href="/asvab-scoring-and-results"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB scoring and results
          </Link>{" "}
          guide.
        </p>

        {/* Section: 1997 Baseline */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The 1997 Baseline: Why AFQT Percentiles Feel Outdated
        </h2>
        <p className="mt-4 text-text-secondary">
          Your AFQT percentile ranks you against people tested nearly 30 years
          ago.
        </p>
        <p className="text-text-secondary">
          In 1997, the Department of Defense conducted the Profile of American
          Youth study. Roughly 14,000 participants aged 18&ndash;23, selected to
          be nationally representative, took the ASVAB. Their scores became the
          baseline for all AFQT percentile calculations.
        </p>
        <p className="text-text-secondary">
          When you take the ASVAB today, your raw score is compared to that 1997
          sample. An AFQT of 60 means you outperformed 60% of those 1997
          test-takers. It says nothing about how you compare to people taking
          the test this year.
        </p>
        <p className="text-text-secondary">
          Why hasn&apos;t the DoD updated the norms? Renorming would require
          another large-scale, nationally representative study. It would also
          shift every branch&apos;s effective standards, since the same raw
          score might produce a different percentile under new norms. Congress
          would likely need to weigh in on adjusted cutoffs. The DoD has shown
          no plans to renorm.
        </p>
        <p className="text-text-secondary">
          Some researchers have argued that today&apos;s test-takers may perform
          differently than the 1997 cohort due to changes in education,
          technology exposure, and demographics. Whether current percentiles are
          inflated or deflated compared to a modern baseline remains an open
          question.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            An AFQT of 50 does not mean you answered half the questions
            correctly. It means you outperformed 50% of the 1997 reference
            group. These are fundamentally different things.
          </p>
        </aside>

        <p className="text-text-secondary">
          For practical purposes, this doesn&apos;t change how you prepare. The
          formula, the subtests, and the branch minimums all work the same
          regardless of when the norms were set.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good AFQT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              An AFQT of 50 or above puts you in Category IIIA, which means
              you&apos;re eligible for all branches and most enlistment bonuses.
              Scoring 60 or higher gives you maximum flexibility for job
              selection and incentive programs. The higher you go, the more
              doors open. See our full breakdown at{" "}
              <Link
                href="/what-is-a-good-asvab-score"
                className="text-accent hover:text-accent-hover"
              >
                what is a good ASVAB score
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the AFQT the same as your ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The ASVAB is a battery of 9 subtests. The AFQT uses only 4 of
              those subtests (Word Knowledge, Paragraph Comprehension, Arithmetic
              Reasoning, Mathematics Knowledge) to produce a single enlistment
              eligibility percentile. The other subtests feed into composite
              scores used for job qualification. Learn more at{" "}
              <Link
                href="/asvab-scores-explained"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB scores explained
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you retake the ASVAB to improve your AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. You can retest after 1 month, retest again after another 1
              month, then every 6 months after that. Your newest score replaces
              all previous scores. If you score lower on the retake, the lower
              score stands. Only retake when you&apos;re confident you&apos;ll
              improve. Full details at{" "}
              <Link
                href="/how-to-retake-the-asvab"
                className="text-accent hover:text-accent-hover"
              >
                how to retake the ASVAB
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if your AFQT is below 31?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You&apos;re ineligible for standard enlistment in any branch.
              Category IVA (21&ndash;30) technically allows enlistment with a
              waiver, but Category IV accessions are capped at 4% by law.
              Category IVB and IVC (10&ndash;20) are nearly impossible. Category
              V (below 10) is completely barred from service by federal statute.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the AFQT affect your military job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Not directly. The AFQT is the enlistment gate. Composite scores,
              calculated from all 9 subtests, are the job gate. However, a
              higher AFQT can unlock enlistment bonuses and gives you priority
              in job selection during classification. Check your composites on
              our{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                calculator
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long is an AFQT score valid?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Your ASVAB scores, including your AFQT, are valid for 2 years from
              the test date. After 2 years, you must retest if you
              haven&apos;t shipped to basic training. Scores used for enlistment
              are locked in once you sign your contract, even if they expire
              before your ship date.
            </p>
          </div>
        </div>

        {/* CTA Box */}
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
      </article>
    </div>
  );
}
