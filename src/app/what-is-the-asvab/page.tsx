import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import DvidsHeroImage from "@/components/DvidsHeroImage";

export const metadata: Metadata = {
  title: "What Is the ASVAB Test? The Complete Guide | ASVAB Hero",
  description:
    "Learn what the ASVAB test is, how the 10 subtests work, how your AFQT score is calculated, and what every branch requires. Includes all 6 branch minimums.",
  alternates: {
    canonical: "https://asvabhero.com/what-is-the-asvab",
  },
};

export default function WhatIsTheASVABPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Is the ASVAB Test?",
          description:
            "Learn what the ASVAB test is, how the 10 subtests work, how your AFQT score is calculated, and what every branch requires. Includes all 6 branch minimums.",
          url: "https://asvabhero.com/what-is-the-asvab",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-19",
          dateModified: "2026-03-19",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How long does the ASVAB take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CAT-ASVAB takes about 2 hours. The paper version takes 3 to 4 hours (225 questions vs ~145). The PiCAT is untimed but requires a 30-minute proctored Vtest at MEPS within 45 days.",
              },
            },
            {
              "@type": "Question",
              name: "Can you fail the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "There is no pass or fail. You receive a score, and that score either meets a branch minimum or it does not. If you score below 31, you cannot enlist in any branch. You can retake after one calendar month.",
              },
            },
            {
              "@type": "Question",
              name: "Can you use a calculator on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. No calculators, phones, smartwatches, or reference materials. Scratch paper and pencils are provided. AR and MK are designed to be solved without a calculator.",
              },
            },
            {
              "@type": "Question",
              name: "How many times can you take the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No lifetime limit. Waiting periods: 1 month after your first test, 1 month after your second, then 6 months between each attempt after that. Your most recent score always replaces the previous one.",
              },
            },
            {
              "@type": "Question",
              name: "Do ASVAB scores expire?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Scores are valid for 2 years from the test date. If you have not enlisted within 2 years, you need to retest.",
              },
            },
            {
              "@type": "Question",
              name: "Is the ASVAB hard?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The content covers material through early high school level. AR and MK are the hardest subtests for most people. Four to six weeks of focused study makes a significant difference.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between AFQT and the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The ASVAB is the full 10-subtest battery. The AFQT is a single percentile score from 4 of those subtests (WK, PC, AR, MK). AFQT determines enlistment eligibility. The remaining subtests feed composite scores for job eligibility.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          What Is the ASVAB Test?
        </h1>

        <DvidsHeroImage
          src="/images/what-is-the-asvab/hero.jpg"
          alt="Military recruits meet with an ITA counselor to review ASVAB scores and career options"
          credit="U.S. Military Entrance Processing Command"
          branch="Joint"
          dvidsUrl="https://www.dvidshub.net/image/8989921/meet-ita-winning-balance-part-time-career"
          width={1200}
          height={800}
        />

        <p className="mt-4 text-text-secondary">
          Your recruiter said &ldquo;you need to take the ASVAB&rdquo; and you
          nodded like you knew what that meant. You didn&apos;t. No judgment.
          Most people don&apos;t.
        </p>

        <p className="text-text-secondary">
          ASVAB stands for Armed Services Vocational Aptitude Battery. It&apos;s
          a multi-part test that every person entering the U.S. military must
          take. All six branches. No exceptions. The ASVAB test has been around
          since 1968, and every branch adopted it by 1976. About one million
          people take it every year.
        </p>

        <p className="text-text-secondary">
          The ASVAB does two things. First, it determines whether you qualify to
          enlist. That&apos;s your AFQT score, a single number derived from four
          of the ten subtests. Second, it determines which jobs you qualify for.
          That&apos;s where composite scores come in, combining different
          subtests depending on the branch and the job.
        </p>

        <p className="text-text-secondary">
          One score gets you through the door. The other scores decide what
          you&apos;ll actually do once you&apos;re inside.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Already have your scores? Plug them into our{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Score Calculator
            </Link>{" "}
            to see which jobs you qualify for across all six branches. Want to
            find your baseline first? Start with a free{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Practice Test
            </Link>
            .
          </p>
        </aside>

        <p className="mt-4 text-text-secondary">
          This guide covers all 10 subtests, the AFQT formula most sites
          won&apos;t show you, every branch&apos;s minimum scores, the three
          test formats, retake rules, and what happens after you get your
          results.
        </p>

        {/* ── The 10 Subtests ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The 10 Subtests: What the ASVAB Actually Covers
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB isn&apos;t one test. It&apos;s ten.
        </p>

        <p className="text-text-secondary">
          Each subtest measures a different skill area. Four of them feed your
          AFQT (the enlistment score). The other six feed job-qualifying
          composite scores.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Abbreviation
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Full Name
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What It Tests
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Feeds Into
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GS</td>
                <td className="py-2 pr-4">General Science</td>
                <td className="py-2 pr-4">Life, earth, and physical sciences</td>
                <td className="py-2">Job composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AR</td>
                <td className="py-2 pr-4">Arithmetic Reasoning</td>
                <td className="py-2 pr-4">Word problems with math</td>
                <td className="py-2">AFQT + composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">WK</td>
                <td className="py-2 pr-4">Word Knowledge</td>
                <td className="py-2 pr-4">Vocabulary and word meaning</td>
                <td className="py-2">AFQT + composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">PC</td>
                <td className="py-2 pr-4">Paragraph Comprehension</td>
                <td className="py-2 pr-4">
                  Reading passages and drawing conclusions
                </td>
                <td className="py-2">AFQT + composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MK</td>
                <td className="py-2 pr-4">Mathematics Knowledge</td>
                <td className="py-2 pr-4">Algebra, geometry, math concepts</td>
                <td className="py-2">AFQT + composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EI</td>
                <td className="py-2 pr-4">Electronics Information</td>
                <td className="py-2 pr-4">
                  Electrical circuits, systems, devices
                </td>
                <td className="py-2">Job composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AI</td>
                <td className="py-2 pr-4">Auto Information</td>
                <td className="py-2 pr-4">Automobile technology and repair</td>
                <td className="py-2">Job composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SI</td>
                <td className="py-2 pr-4">Shop Information</td>
                <td className="py-2 pr-4">
                  Wood and metal shop practices, tools
                </td>
                <td className="py-2">Job composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MC</td>
                <td className="py-2 pr-4">Mechanical Comprehension</td>
                <td className="py-2 pr-4">Mechanical and physical principles</td>
                <td className="py-2">Job composites</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">AO</td>
                <td className="py-2 pr-4">Assembling Objects</td>
                <td className="py-2 pr-4">
                  Spatial relationships, connecting points
                </td>
                <td className="py-2">Job composites</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          A note on Auto and Shop: the paper version combines AI and SI into a
          single &ldquo;Auto &amp; Shop Information&rdquo; (AS) subtest. The
          computer-adaptive version (CAT-ASVAB) splits them into two separate
          tests. Either way, the content is the same.
        </p>

        <p className="text-text-secondary">
          On the CAT-ASVAB, the ASVAB test has roughly 145 questions total.
          Question counts per subtest range from 11 (PC) to 16 (AR, WK, MK).
          Time limits are tight: PC gives you 22 minutes for 11 questions, while
          AR gives you 55 minutes for 16. The math-heavy subtests get the most
          time per question.
        </p>

        <p className="text-text-secondary">
          The four AFQT subtests are AR, WK, PC, and MK. These are the ones
          that decide whether you can enlist. Everything else determines your
          job options.
        </p>

        <p className="text-text-secondary">
          No calculators are allowed on any version of the test. No phones, no
          reference materials. Scratch paper is provided at MEPS. The AO subtest
          is not used for scoring by every branch; the Marines, for example, do
          not factor it into any composite.
        </p>

        <p className="text-text-secondary">
          If you want to know what to study and in what order, check out our{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Study Guide
          </Link>
          .
        </p>

        {/* ── The AFQT Formula ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The AFQT Formula: How Your Enlistment Score Is Calculated
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT score decides if you&apos;re in or out. Here&apos;s the
          actual formula.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>

        <p className="mt-4 text-text-secondary">
          VE is your Verbal Expression score, which is simply WK + PC combined.
          AR is Arithmetic Reasoning. MK is Mathematics Knowledge.
        </p>

        <p className="text-text-secondary">
          Notice that VE is doubled. This is the single most important thing
          about ASVAB test scoring. Your verbal subtests carry twice the weight
          of your math subtests in the AFQT calculation.
        </p>

        <p className="text-text-secondary">
          Here&apos;s what that means in practice. Say your scores look like
          this: VE = 55, AR = 52, MK = 48. Your raw AFQT composite is 2(55) +
          52 + 48 = 210.
        </p>

        <p className="text-text-secondary">
          Now bump your VE to 60 through better vocab and reading skills. New
          raw composite: 2(60) + 52 + 48 = 220. That&apos;s a 10-point gain
          from improving just one area by 5 points. No other subtest gives you
          that kind of leverage.
        </p>

        <p className="text-text-secondary">
          Now consider the opposite scenario. A test-taker with VE = 40, AR =
          60, MK = 58 gets a raw composite of 2(40) + 60 + 58 = 198. Despite
          strong math scores, the low verbal score drags the total down. Raising
          that VE from 40 to 50 would add 20 points to the raw composite,
          jumping it to 218. The same 10-point improvement in AR would only add
          10.
        </p>

        <p className="text-text-secondary">
          The raw composite then gets mapped to a percentile score based on a
          1997 reference population of 18- to 23-year-olds. Your AFQT percentile
          (1 to 99) means you scored equal to or better than that percentage of
          the reference group. A 60th percentile means you outperformed 60% of
          that population.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            WK and PC give you double the AFQT payoff of any other subtest. If
            you&apos;re short on study time, verbal prep is your highest-return
            investment. See our guide on{" "}
            <Link
              href="/how-to-study-for-the-asvab"
              className="text-accent hover:text-accent-hover"
            >
              How to Study for the ASVAB
            </Link>{" "}
            for a week-by-week plan.
          </p>
        </aside>

        {/* ── AFQT Categories ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories: What Your Percentile Score Means
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT percentile doesn&apos;t just sit there as a number. It gets
          sorted into a category. That category determines everything about your
          enlistment options.
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
                  Top tier. Every branch, nearly every job open to you.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">
                  II
                </td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">
                  Strong. Full access to most jobs across all branches.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  IIIA
                </td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">
                  Above average. Solid options, some competitive jobs may
                  require higher.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  IIIB
                </td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">
                  Below average. You qualify to enlist, but job selection
                  narrows significantly.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IV
                </td>
                <td className="py-2 pr-4 font-mono">10&ndash;30</td>
                <td className="py-2">
                  Marginal. Branches can only accept 4% of annual enlistments
                  from this category.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  V
                </td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">
                  Ineligible. Federal law (10 U.S.C. 520) prohibits enlistment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Category V is off the table entirely. Congress wrote that into law.
          Category IV is technically eligible, but each branch is capped at
          accepting only 4% of its annual enlistees from this group. In
          practice, most branches won&apos;t consider Category IV applicants
          during normal recruiting years.
        </p>

        <p className="text-text-secondary">
          The real story is Category IIIB. You&apos;re technically qualified to
          enlist, but the job options shrink fast. High-demand technical jobs,
          intelligence roles, and anything requiring a security clearance usually
          need scores in Category II or higher.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Category IIIB is the danger zone. You technically qualify, but job
            options shrink dramatically. If you scored here, retaking is almost
            always worth it. Check{" "}
            <Link
              href="/what-is-a-good-asvab-score"
              className="text-accent hover:text-accent-hover"
            >
              What Is a Good ASVAB Score
            </Link>{" "}
            for branch-specific breakdowns.
          </p>
        </aside>

        {/* ── Minimum Scores by Branch ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum ASVAB Scores by Branch: All 6 Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Every branch sets its own minimum AFQT score for the ASVAB test.
          Here&apos;s the full picture.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  High School Diploma Minimum
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
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Two things jump out. First, the Coast Guard is the most selective at
          40 for diploma holders. Second, GED holders face a universal minimum
          of 50 across every single branch. That&apos;s a 19-point jump from the
          Army, Navy, and Marines minimums, and a 14-point jump from the Air
          Force and Space Force.
        </p>

        <p className="text-text-secondary">
          If you have a GED, the math is straightforward: you need at least a 50
          no matter where you want to serve.
        </p>

        <p className="text-text-secondary">
          The military uses an education tier system. Tier 1 includes high school
          diplomas, and Tier 2 includes GEDs and alternative credentials. Tier 2
          applicants face higher AFQT minimums because historical data shows
          higher attrition rates for this group during basic training. Some
          branches also limit the number of Tier 2 enlistees per fiscal year.
        </p>

        <p className="text-text-secondary">
          These are enlistment floors, not job floors. Meeting the branch minimum
          means you can enlist. It does not mean you qualify for the job you
          want. Most desirable jobs require composite scores well above these
          minimums.
        </p>

        <p className="text-text-secondary">
          These published minimums can also shift with recruiting demand. When a
          branch struggles to meet recruiting goals, it may lower operational
          standards. When recruiting is strong, branches can be more selective.
          The numbers in the table reflect the standard published minimums.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GED holders need a 50 across all branches. WK and PC prep gives the
            fastest path there because verbal scores are double-counted in the
            AFQT formula. Use the{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Score Calculator
            </Link>{" "}
            to see where you stand.
          </p>
        </aside>

        {/* ── Composite Scores ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Composite Scores: How the Military Matches You to Jobs
        </h2>

        <p className="mt-4 text-text-secondary">
          AFQT gets you in the door. Composite scores decide what you&apos;ll
          actually do every day.
        </p>

        <p className="text-text-secondary">
          After your AFQT qualifies you for enlistment, the military combines
          your ASVAB test subtest scores into composite scores (also called line
          scores). Each job in each branch requires minimum composite scores in
          specific areas.
        </p>

        <p className="text-text-secondary">
          Every branch has its own system.
        </p>

        <p className="text-text-secondary">
          <strong>Army:</strong> Uses 10 line scores. The most common is GT
          (General Technical) = VE + AR. Others include CL (Clerical), CO
          (Combat Operations), EL (Electronics), FA (Field Artillery), GM
          (General Maintenance), MM (Mechanical Maintenance), OF (Operators and
          Food), SC (Surveillance and Communications), and ST (Skilled
          Technical). Each MOS lists required minimums. A GT of 110+ opens
          high-value jobs like 35F Intelligence Analyst. A GT of 100 still
          qualifies for many roles, but the intelligence and cyber fields start
          disappearing.
        </p>

        <p className="text-text-secondary">
          <strong>Air Force and Space Force:</strong> Uses the MAGE system. M
          (Mechanical), A (Administrative), G (General), E (Electronics). Each
          AFSC requires minimums in one or more of these four areas.
        </p>

        <p className="text-text-secondary">
          <strong>Navy:</strong> Uses custom composites per rating. Some are
          straightforward, some are extreme. The Nuclear Field program, for
          example, requires AR + MK + EI + GS of 252 or higher. That&apos;s one
          of the most demanding composite requirements in any branch.
        </p>

        <p className="text-text-secondary">
          <strong>Marines:</strong> Uses composites similar to the Army system.
          GT, EL, MM, and CL are the primary line scores for MOS qualification.
        </p>

        <p className="text-text-secondary">
          <strong>Coast Guard:</strong> Uses a combination of individual subtest
          scores and composite scores. Many ratings require specific minimums in
          AR, MK, or VE individually rather than combined composites.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Plug your 9 subtest scores into our{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Score Calculator
            </Link>{" "}
            to see which jobs you qualify for across all 6 branches. It
            calculates every composite automatically.
          </p>
        </aside>

        <p className="mt-4 text-text-secondary">
          For a full breakdown of how composites work, see{" "}
          <Link
            href="/asvab-scores-explained"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Scores Explained
          </Link>
          .
        </p>

        {/* ── Three Ways to Take ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Three Ways to Take the ASVAB: CAT, Paper, and PiCAT Compared
        </h2>

        <p className="mt-4 text-text-secondary">
          You won&apos;t just &ldquo;take the ASVAB test.&rdquo; You&apos;ll
          take one of three versions, and the differences matter.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Feature
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  CAT-ASVAB
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Paper ASVAB
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  PiCAT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Where
                </td>
                <td className="py-2 pr-4">MEPS or MET site</td>
                <td className="py-2 pr-4">Schools, MET sites</td>
                <td className="py-2">Your home computer</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Questions
                </td>
                <td className="py-2 pr-4 font-mono">~145</td>
                <td className="py-2 pr-4 font-mono">225</td>
                <td className="py-2 font-mono">~145</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Time
                </td>
                <td className="py-2 pr-4">~2 hours</td>
                <td className="py-2 pr-4">3&ndash;4 hours</td>
                <td className="py-2">Untimed</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Adaptive
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Review answers
                </td>
                <td className="py-2 pr-4">Cannot go back</td>
                <td className="py-2 pr-4">Can skip/return within subtest</td>
                <td className="py-2">Can review before submitting</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Score delivery
                </td>
                <td className="py-2 pr-4">Immediate</td>
                <td className="py-2 pr-4">Several days</td>
                <td className="py-2">After Vtest at MEPS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Who takes it
                </td>
                <td className="py-2 pr-4">Most enlistees</td>
                <td className="py-2 pr-4">
                  High school students (ASVAB CEP)
                </td>
                <td className="py-2">First-time testers via recruiter</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          <strong>CAT-ASVAB</strong> is the computer-adaptive version most
          enlistees take at MEPS. &ldquo;Adaptive&rdquo; means the test adjusts
          difficulty based on your answers. Get a question right, the next one
          gets harder. Get it wrong, it gets easier. You cannot go back to
          previous questions. Scores are available immediately. Your recruiter
          schedules your MEPS visit, typically within 1 to 2 weeks of your
          request.
        </p>

        <p className="text-text-secondary">
          <strong>Paper ASVAB</strong> is the traditional version given at high
          schools and MET sites through the ASVAB Career Exploration Program.
          It&apos;s longer (225 questions vs ~145), takes 3&ndash;4 hours, and
          you can skip around within each subtest. Scores take several days to
          arrive. The paper version combines Auto and Shop into a single AS
          subtest, while the CAT splits them.
        </p>

        <p className="text-text-secondary">
          <strong>PiCAT</strong> is the newest option. Your recruiter gives you
          an access code, and you take it at home on your own computer with no
          time limit. The catch: you must complete a 30-question proctored
          verification test (Vtest) at MEPS within 45 days. If your Vtest
          answers are consistent with your PiCAT, your full PiCAT score stands.
          If not, the Vtest becomes a full CAT-ASVAB.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            PiCAT advantage: untimed and at home. The catch: you must pass a
            30-question proctored verification test at MEPS within 45 days, or
            your score is invalid.
          </p>
        </aside>

        {/* ── Retake Rules ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Retake Rules: Waiting Periods and the Score Replacement Trap
        </h2>

        <p className="mt-4 text-text-secondary">
          You can retake the ASVAB. But there&apos;s a trap most people
          don&apos;t know about until it&apos;s too late.
        </p>

        <p className="text-text-secondary">
          Here&apos;s the retake timeline:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Initial test
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Take the ASVAB for the first time
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              1st retake
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait at least 1 calendar month
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              2nd retake
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait at least 1 more calendar month
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              3rd+ retake
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait 6 calendar months between each additional attempt
            </p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          There&apos;s no lifetime limit on retakes. But the waiting periods add
          up fast after the second attempt. Miss your target on the third try and
          you&apos;re looking at half a year before the next shot.
        </p>

        <p className="text-text-secondary">
          Now the trap: your most recent score replaces your previous score. Not
          your highest score. Your most recent score. If you retake the ASVAB
          and score lower, that lower score is now your official score. The old,
          higher score is gone.
        </p>

        <p className="text-text-secondary">
          This is not hypothetical. It happens regularly to people who retake
          without enough preparation, thinking they&apos;ll just &ldquo;do
          better this time.&rdquo;
        </p>

        <p className="text-text-secondary">
          The safe approach: only retake when you&apos;re consistently scoring
          10 or more points higher on practice tests than your official score.
          Some recruiters will require you to demonstrate study progress before
          they approve a retest.
        </p>

        <p className="text-text-secondary">
          ASVAB scores are valid for 2 years from the test date. PiCAT scores
          can remain valid for up to 5 years in some cases, depending on branch
          policy.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent score replaces your previous score, even if
            it&apos;s lower. Never retake without consistent improvement on{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              practice tests
            </Link>
            . Use our{" "}
            <Link
              href="/asvab-study-guide"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Study Guide
            </Link>{" "}
            to build a real prep plan first.
          </p>
        </aside>

        {/* ── What Happens After ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Happens After the ASVAB: From Score to Ship Date
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB is step one. Here&apos;s the full sequence from test to
          basic training.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 1: ASVAB complete.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You have your scores. Your recruiter reviews them with you.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 2: Physical exam at MEPS.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Height, weight, hearing, vision, blood draw, urinalysis, and a
              full medical history review. This takes most of a day.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 3: Job counseling.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              A military classifier reviews your AFQT, composite scores, and
              medical results. They show you which jobs are available.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 4: Job selection.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You pick your MOS (Army/Marines), AFSC (Air Force/Space Force), or
              rating (Navy/Coast Guard) based on your composites AND current
              openings.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 5: Sign your enlistment contract.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              This locks in your branch, job, rank, and any bonuses.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 6: Delayed Entry Program (DEP) or ship directly.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              DEP can last up to 365 days. Most people ship within 1 to 6
              months.
            </p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          You do not have to sign the same day you test. Take your time with the
          job selection. The classifier will show you what&apos;s available, but
          you are not obligated to accept the first offer.
        </p>

        <p className="text-text-secondary">
          If your MEPS location is more than an hour from your home, the
          military typically provides a hotel the night before your testing and
          physical day. Plan for a full overnight trip in that case.
        </p>

        <p className="text-text-secondary">
          Job availability depends on four things: your AFQT and composite
          scores, medical eligibility, security clearance eligibility, and what
          openings exist at that moment. High-demand jobs fill quickly. If the
          job you want isn&apos;t available, you can wait in DEP for a slot to
          open or choose a different job.
        </p>

        {/* ── How to Start Preparing ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Start Preparing for the ASVAB Today
        </h2>

        <p className="mt-4 text-text-secondary">
          You know what the ASVAB test is. Here&apos;s how to beat it.
        </p>

        <p className="text-text-secondary">
          <strong>Step 1: Take a diagnostic practice test.</strong> Find your
          baseline before you study anything. You need to know where
          you&apos;re starting. Take a free{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Practice Test
          </Link>{" "}
          right now.
        </p>

        <p className="text-text-secondary">
          <strong>Step 2: Focus on the AFQT four.</strong> WK, PC, AR, and MK
          are the only subtests that count toward your enlistment score. Within
          those four, prioritize WK and PC first. The VE double-count means
          verbal improvement gives you twice the AFQT points per hour of study.
        </p>

        <p className="text-text-secondary">
          <strong>Step 3: Check your job eligibility.</strong> Use the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Score Calculator
          </Link>{" "}
          to see which jobs your current scores unlock across all six branches.
          This shows you exactly how many points you need and where.
        </p>

        <p className="text-text-secondary">
          <strong>Step 4: Build a study plan.</strong> Most people study 4 to 6
          weeks, spending 30 to 60 minutes daily. The{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Study Guide
          </Link>{" "}
          and{" "}
          <Link
            href="/how-to-study-for-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            How to Study for the ASVAB
          </Link>{" "}
          break it down week by week.
        </p>

        <p className="text-text-secondary">
          The ASVAB is a learnable test. It covers material through early high
          school level. It is not an IQ test. It rewards preparation, and the
          people who study consistently outperform the people who wing it. Every
          time.
        </p>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does the ASVAB take?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB takes about 2 hours. The paper version takes 3 to 4
              hours (225 questions vs ~145). The PiCAT is untimed but requires a
              30-minute proctored Vtest at MEPS within 45 days.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you fail the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              There&apos;s no pass or fail. You receive a score, and that score
              either meets a branch&apos;s minimum or it doesn&apos;t. If you
              score below 31, you can&apos;t enlist in any branch. You can
              retake after one calendar month.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you use a calculator on the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. No calculators, phones, smartwatches, or reference materials.
              Scratch paper and pencils are provided. AR and MK are designed to
              be solved without a calculator.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many times can you take the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No lifetime limit. Waiting periods: 1 month after your first test,
              1 month after your second, then 6 months between each attempt
              after that. Your most recent score always replaces the previous
              one.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do ASVAB scores expire?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Scores are valid for 2 years from the test date. If you
              haven&apos;t enlisted within 2 years, you need to retest.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the ASVAB hard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The content covers material through early high school level. AR and
              MK are the hardest subtests for most people. Four to six weeks of
              focused study makes a significant difference.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the difference between AFQT and the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The ASVAB is the full 10-subtest battery. The AFQT is a single
              percentile score from 4 of those subtests (WK, PC, AR, MK). AFQT
              determines enlistment eligibility. The remaining subtests feed
              composite scores for job eligibility. See{" "}
              <Link
                href="/asvab-scores-explained"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB Scores Explained
              </Link>{" "}
              for a deep dive.
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs italic text-text-tertiary">
          The appearance of U.S. Department of Defense (DoD) visual information does
          not imply or constitute DoD endorsement.
        </p>

        {/* ── CTA ── */}
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
