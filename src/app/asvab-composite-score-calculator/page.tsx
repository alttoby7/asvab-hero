import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Composite Score Calculator | ASVAB Hero",
  description:
    "Calculate ASVAB composite scores for all 6 branches. See which MOS, rate, and AFSC you qualify for with worked examples and the free calculator.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-composite-score-calculator",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "ASVAB Composite Score Calculator: Turn Your Subtest Scores Into Job Qualifications",
  description:
    "Calculate ASVAB composite scores for all 6 branches. See which MOS, rate, and AFSC you qualify for with worked examples and the free calculator.",
  url: "https://asvabhero.com/asvab-composite-score-calculator",
  author: {
    "@type": "Organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-04-27",
  dateModified: "2026-04-27",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the formula for the ASVAB GT score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Army GT = VE + AR, where VE = WK + PC. Marine GT uses the same formula: WK + PC + AR. Some guides add Mechanical Comprehension to the Marine GT formula, but MC feeds the Marine MM composite, not GT. Any calculator returning a USMC GT above 130 is including MC incorrectly.",
      },
    },
    {
      "@type": "Question",
      name: "How is the AFQT score calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AFQT raw = 2VE + AR + MK, where VE = WK + PC. The raw sum then converts to a percentile from 1 to 99 against a 1997 reference population. VE counts double, which is why Word Knowledge and Paragraph Comprehension are roughly twice as efficient per point of improvement compared to math subtests.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good ASVAB composite score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the target job. Army GT 110 unlocks Cyber, Special Forces, and most premium MOSs. ST 100 or higher covers most technical fields. Air Force E of 70 or higher unlocks Cyber AFSCs. Marine GT 105 covers Recon. Below 90 in most composites significantly narrows your options.",
      },
    },
    {
      "@type": "Question",
      name: "Is the AFQT the same as my line score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. AFQT is your enlistment percentile from 1 to 99 calculated from four subtests. Line scores (also called composite or aptitude area scores) are job-qualification scores using different subtest combinations. AFQT is the enlistment gate. Line scores are the job-selection gate. You have to clear both, and they use different math.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate Air Force MAGE scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mechanical = MC + GS + AS. Administrative = WK + PC + MK. General = WK + PC + AR. Electronic = AR + MK + EI + GS. Results are standard scores roughly in the 1 to 99 range, but they are not percentiles. A G score of 62 does not mean you scored higher than 62 percent of test takers.",
      },
    },
    {
      "@type": "Question",
      name: "What composite scores do I need for Navy SEAL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two qualification paths. Path A: GS + MC + EI must total 165 or higher. Path B: VE + MK + MC + CS must total 220 or higher. Path A is more common because not all ASVAB versions include Coding Speed. SEAL candidates also need AR + MK of 100 or higher and MC of 50 or higher.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a composite score calculator for retake planning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this is the single best use case. Run your current scores in the ASVAB composite score calculator, then bump any subtest by 5 or 10 points and re-run. The tool shows exactly which jobs that change unlocks. That tells you which subtest to drill before your retake to maximize the number of new options on the table.",
      },
    },
  ],
};

export default function ASVABCompositeScoreCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">

        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Composite Score Calculator: Turn Your Subtest Scores Into Job
          Qualifications
        </h1>

        <p className="mt-4 text-text-secondary">
          You took the practice ASVAB. You have an AFQT score and nine subtest
          scores staring back at you from the printout. Now your recruiter is
          asking about your GT, your CL, your MAGE, and none of those numbers
          are anywhere on the sheet.
        </p>

        <p className="text-text-secondary">
          That gap is the whole problem. AFQT decides whether you can enlist.
          Composite scores decide which job you actually get. They are two
          different gates, and most candidates only see the first one until a
          recruiter waves them off a job they thought they qualified for.
        </p>

        <p className="text-text-secondary">
          This page walks you through how to calculate every branch&apos;s
          composite scores by hand, what each number unlocks, and how to plug
          your scores into the{" "}
          <Link href="/calculator">asvab composite score calculator</Link> to
          skip the math entirely.
        </p>

        <p className="text-text-secondary">
          By the end you will know exactly which subtest scores are dragging
          your job options down, and which ones would unlock the most if you
          retake.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT is the enlistment gate. Composite and line scores are the
            job-selection gate. You need to clear both, and they are calculated
            from different subtest combinations.
          </p>
        </aside>

        {/* Section 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT vs Composite Scores: The Two-Gate System Most Recruits Miss
        </h2>

        <p className="mt-4 text-text-secondary">
          The AFQT and composite scores are not the same number on different
          scales. They are two completely separate calculations using
          overlapping subtests for completely separate purposes.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          What AFQT Actually Is
        </h3>

        <p className="mt-4 text-text-secondary">
          AFQT stands for Armed Forces Qualification Test. It is a percentile
          from 1 to 99 that compares you to a reference population of 18 to 23
          year olds tested in 1997. An AFQT of 70 means you scored as well as
          or better than 70 percent of that reference group.
        </p>

        <p className="text-text-secondary">
          AFQT is calculated from only four subtests: Word Knowledge (WK),
          Paragraph Comprehension (PC), Arithmetic Reasoning (AR), and
          Mathematics Knowledge (MK).
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT raw score = 2VE + AR + MK
          <br />
          Where VE = WK + PC
        </div>

        <p className="text-text-secondary">
          That doubled VE is the most important quirk on the page. Word
          Knowledge and Paragraph Comprehension count twice as much per point
          as Arithmetic Reasoning or Math Knowledge. AFQT is your enlistment
          gate. It does not pick your job.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          What Composite Scores Actually Are
        </h3>

        <p className="mt-4 text-text-secondary">
          Composite scores (also called line scores or aptitude area scores)
          are standard scores roughly on a 20 to 80 scale that combine
          different subtest groups for different job families. Each branch
          picks its own subtest combinations and its own naming.
        </p>

        <p className="text-text-secondary">
          The Army has 10 line scores: GT, CL, CO, EL, FA, GM, MM, OF, SC,
          ST. The Marines use the same GT formula as the Army (VE + AR). The
          Navy uses around 80 rating-specific formulas based on raw subtest
          sums. The Air Force and Space Force use four MAGE composites:
          Mechanical, Administrative, General, Electronic.
        </p>

        <p className="text-text-secondary">
          One thing trips up nearly every Air Force candidate.{" "}
          <strong>
            MAGE composites are standard scores that fall roughly in the 1 to
            99 range, but they are not percentiles
          </strong>
          . A G score of 62 does not mean you beat 62 percent of test takers.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Why Both Matter Simultaneously
        </h3>

        <p className="mt-4 text-text-secondary">
          You can pass AFQT comfortably and still fail to qualify for the job
          you want. Imagine a candidate with AFQT 75. That clears every
          branch&apos;s enlistment minimum. But Army 17C Cyber Operations needs
          a Skilled Technical (ST) composite of 112, and this
          candidate&apos;s ST sits at 109. Three points short. The job is
          closed regardless of how good the AFQT looks.
        </p>

        <p className="text-text-secondary">
          This is why the{" "}
          <Link href="/calculator">asvab composite score calculator</Link>{" "}
          shows both gates side by side. Pass-fail on AFQT is binary.
          Pass-fail on composites is job by job by job.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  High School Diploma
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GED
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
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2">Not accepted</td>
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

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT gets you in. Composites get you the job. You need both.
          </p>
        </aside>

        {/* Section 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Each Branch Calculates Composites: Formulas With a Worked Example
        </h2>

        <p className="mt-4 text-text-secondary">
          Meet Jordan, a fictional candidate we will use across every branch.
          Jordan&apos;s standard scores from the ASVAB Student Results sheet are:
        </p>

        <p className="text-text-secondary">
          GS 55, AR 60, WK 58, PC 56, MK 62, EI 50, AS 52, MC 58, AO 54.
        </p>

        <p className="text-text-secondary">
          Jordan&apos;s VE = WK + PC = 58 + 56 = 114. Jordan&apos;s AFQT raw
          = 2(114) + 60 + 62 = 350. That converts to roughly the 70th
          percentile, an AFQT of 70. Now run that same set of subtest scores
          through every branch.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Army (10 Line Scores)
        </h3>

        <p className="mt-4 text-text-secondary">
          The Army builds 10 line scores from different subtest combinations.
          Two matter most for the largest set of MOSs: GT (General Technical)
          and ST (Skilled Technical).
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Army GT = VE + AR
          <br />
          Army ST = GS + VE + MK + MC
        </div>

        <p className="text-text-secondary">
          Jordan&apos;s GT = 114 + 60 = 174 raw, which converts to a standard
          score around <strong>107</strong>. Jordan&apos;s ST = 55 + 114 + 62
          + 58 = 289 raw, converting to a standard score around{" "}
          <strong>106</strong>.
        </p>

        <p className="text-text-secondary">
          Combat Medic 68W requires ST 101 and GT 107. Jordan barely qualifies.
          Lose two points on ST and the door closes.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Navy (Roughly 80 Rating-Specific Formulas)
        </h3>

        <p className="mt-4 text-text-secondary">
          The Navy does not use named composites the way the Army does. Each
          rating has its own formula using raw subtest sums on a different
          scale, and many of them include CS (Coding Speed), which is not on
          every ASVAB version.
        </p>

        <p className="text-text-secondary">
          Jordan&apos;s SEAL Path A = GS + MC + EI = 55 + 58 + 50 = 163. The
          threshold is 165. Jordan misses by two points.
        </p>

        <p className="text-text-secondary">
          Nuclear (NUC) requires VE + AR + MK + MC = 252. Jordan = 114 + 60 +
          62 + 58 = 294. Clears it comfortably.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Marines
        </h3>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Marine GT = WK + PC + AR
        </div>

        <p className="mt-4 text-text-secondary">
          Marine GT uses the same formula as Army GT: VE + AR, where VE = WK
          + PC. Some older study guides add Mechanical Comprehension to the
          formula. MC feeds the Marine MM (Mechanical Maintenance) composite,
          not GT. Any calculator returning USMC GT above 130 is including MC
          and producing wrong numbers.
        </p>

        <p className="text-text-secondary">
          Jordan&apos;s Marine GT = 58 + 56 + 60 = 174 raw, converting to a
          standard score around <strong>107</strong>.
        </p>

        <p className="text-text-secondary">
          Recon Marine 0321 needs GT 105. Jordan qualifies with 2 points to
          spare.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Air Force MAGE
        </h3>

        <p className="mt-4 text-text-secondary">
          Four composites, four formulas:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          M (Mechanical) = MC + GS + AS
          <br />
          A (Administrative) = WK + PC + MK
          <br />
          G (General) = WK + PC + AR
          <br />
          E (Electronic) = AR + MK + EI + GS
        </div>

        <p className="text-text-secondary">
          Some versions of the formulas double-weight AS or AR depending on
          the source document. The four-subtest E composite is the version
          published in current Air Force AFSC requirements.
        </p>

        <p className="text-text-secondary">
          Jordan&apos;s MAGE:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>M = 58 + 55 + 52 = 165, standard ~61</li>
          <li>A = 58 + 56 + 62 = 176, standard ~67</li>
          <li>G = 58 + 56 + 60 = 174, standard ~62</li>
          <li>E = 60 + 62 + 50 + 55 = 227, standard ~63</li>
        </ul>

        <p className="text-text-secondary">
          Cyber Warfare Operations 1B4 requires E ≥ 70. Jordan misses by 7.
          Pararescue 1T2 requires G ≥ 44 and M ≥ 60, and Jordan clears both
          comfortably.
        </p>

        <p className="text-text-secondary">
          Remember those MAGE numbers are standard scores in the 1 to 99
          range, not percentiles. A G of 62 is not &ldquo;the 62nd
          percentile.&rdquo;
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Coast Guard and Space Force
        </h3>

        <p className="mt-4 text-text-secondary">
          Coast Guard rating qualifications mirror Navy-style raw composite
          formulas. Aviation Survival Technician (AST) needs an AST composite
          of 162 plus AFQT 65. Jordan&apos;s AFQT 70 clears the second gate.
        </p>

        <p className="text-text-secondary">
          Space Force uses Air Force MAGE scoring. Signals Intelligence
          requires G ≥ 72. Jordan&apos;s G of 62 misses by 10. Space Force
          generally does not accept GED candidates.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Key Composite
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Jordan&apos;s Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Sample Job
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Qualifies?
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">GT 107, ST 106</td>
                <td className="py-2 pr-4">Pass</td>
                <td className="py-2 pr-4">68W Combat Medic</td>
                <td className="py-2">Yes (barely)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">GT 107, ST 106</td>
                <td className="py-2 pr-4">Pass</td>
                <td className="py-2 pr-4">17C Cyber Ops</td>
                <td className="py-2">No (ST short)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">SEAL 163</td>
                <td className="py-2 pr-4">Fail</td>
                <td className="py-2 pr-4">SO SEAL</td>
                <td className="py-2">No (short 2)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">NUC 294</td>
                <td className="py-2 pr-4">Pass</td>
                <td className="py-2 pr-4">Nuclear (NUC)</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">GT ~107</td>
                <td className="py-2 pr-4">Pass</td>
                <td className="py-2 pr-4">0321 Recon</td>
                <td className="py-2">Yes (barely)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">E ~63</td>
                <td className="py-2 pr-4">Fail</td>
                <td className="py-2 pr-4">1B4 Cyber</td>
                <td className="py-2">No (short 7)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">G ~62, M ~61</td>
                <td className="py-2 pr-4">Pass</td>
                <td className="py-2 pr-4">1T2 Pararescue</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">G ~62</td>
                <td className="py-2 pr-4">Fail</td>
                <td className="py-2 pr-4">Signals Intel</td>
                <td className="py-2">No (short 10)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Jordan qualifies for some jobs in 4 branches but misses Cyber in
            every single one. Composite gaps are job-specific, not
            branch-specific. Switching branches rarely fixes a weak composite.
          </p>
        </aside>

        {/* Section 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your Composite Scores Actually Unlock: Job Thresholds by Branch
        </h2>

        <p className="mt-4 text-text-secondary">
          Composite scores are gates. Each MOS, rate, and AFSC has published
          minimums in the branch&apos;s classification documents (Army DA Pam
          611-21, Navy NAVPERS 18068, Marine MCO 1220.1, AFECD/AFOCD). Below
          the threshold, the job is not on your list. At or above it, you are
          eligible to compete for the slot, subject to clearance, medical, and
          slot availability.
        </p>

        <p className="text-text-secondary">
          The asvab composite score calculator at{" "}
          <Link href="/calculator">/calculator</Link> maps your numbers against
          this threshold database automatically. The breakdown below shows the
          marquee jobs at each branch so you can see what you are aiming at.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Army MOS Thresholds
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  11B
                </td>
                <td className="py-2 pr-4">Infantry</td>
                <td className="py-2 font-mono">CO 87</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  68W
                </td>
                <td className="py-2 pr-4">Combat Medic</td>
                <td className="py-2 font-mono">ST 101, GT 107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  17C
                </td>
                <td className="py-2 pr-4">Cyber Operations</td>
                <td className="py-2 font-mono">GT 110, ST 112</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  18X
                </td>
                <td className="py-2 pr-4">Special Forces</td>
                <td className="py-2 font-mono">GT 110, SC 100</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  25U
                </td>
                <td className="py-2 pr-4">Signal Support</td>
                <td className="py-2 font-mono">EL 95, SC 95</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          GT 110 is the number that gates the most competitive Army jobs.
          Cyber, Special Forces, OCS, and most premium MOSs all live above
          that line. The Army runs a confirmation test option that lets you
          re-test if your scores look out of pattern. ST 100 is the secondary
          gate that opens medical, intelligence, and most signal MOSs.
        </p>

        <p className="text-text-secondary">
          For the full job catalog, see{" "}
          <Link href="/army-mos-list">/army-mos-list</Link>.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Navy Rating Thresholds
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Composite Requirement
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SO (SEAL)
                </td>
                <td className="py-2 font-mono">
                  GS+MC+EI=165 OR VE+MK+MC+CS=220
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  NUC (Nuclear)
                </td>
                <td className="py-2 font-mono">VE+AR+MK+MC=252</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  HM (Hospital Corpsman)
                </td>
                <td className="py-2 font-mono">VE+MK=104</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CTT (Cryptologic Tech Technical)
                </td>
                <td className="py-2 font-mono">AR+2MK+GS=212</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Navy Nuclear (NUC) at 252 is the highest absolute composite
          threshold in any branch. The math is intentionally aggressive because
          the Navy is screening for the few candidates capable of nuclear
          engineering training. Most other Navy ratings sit well below NUC.
          NUC also pairs with one of the largest enlistment bonuses in the
          military, often above $75,000 for a six-year contract.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Air Force AFSC Thresholds
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFSC
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Family
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Required
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  1B4 (Cyber Warfare)
                </td>
                <td className="py-2 pr-4">Electronic</td>
                <td className="py-2 font-mono">E ≥ 70</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  1T2 (Pararescue)
                </td>
                <td className="py-2 pr-4">General + Mechanical</td>
                <td className="py-2 font-mono">G ≥ 44, M ≥ 60</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  3D1X2 (Cyber Transport)
                </td>
                <td className="py-2 pr-4">Electronic</td>
                <td className="py-2 font-mono">E ≥ 70</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          MAGE scores look small compared to Army GT numbers because the scale
          is different. Do not compare an Air Force E of 65 to an Army GT of
          110 and assume Air Force is &ldquo;easier.&rdquo; They are different
          scales measuring different things. The bulk of high-demand AFSCs
          (cyber, intelligence, special warfare) sit at or above 70 in their
          primary composite, with most maintenance and support AFSCs gated
          around 50 to 60.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Marines, Coast Guard, Space Force
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Requirement
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">0311 Infantry</td>
                <td className="py-2 font-mono">GT 80</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">0321 Recon</td>
                <td className="py-2 font-mono">GT 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">0651 Cyber Network Ops</td>
                <td className="py-2 font-mono">GT 110, EL 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">AST</td>
                <td className="py-2 font-mono">Composite 162 + AFQT 65</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4">Cyber / Signals Intel</td>
                <td className="py-2 font-mono">G ≥ 72</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 110 unlocks Cyber, Special Forces, and OCS across multiple
            branches. If you are sitting at GT 105, a retake almost always pays
            off. See{" "}
            <Link href="/how-to-retake-the-asvab">/how-to-retake-the-asvab</Link>{" "}
            for the rules.
          </p>
        </aside>

        <p className="text-text-secondary">
          For full job lists, see{" "}
          <Link href="/army-mos-list">/army-mos-list</Link> and{" "}
          <Link href="/asvab-score-chart">/asvab-score-chart</Link>.
        </p>

        {/* Section 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Strategic Score Leverage: Which Subtests Move the Most Composites
        </h2>

        <p className="mt-4 text-text-secondary">
          Not all subtests are equal. If you are retaking, targeting the
          subtests that appear in the most composites is the highest-ROI move
          you can make.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The VE Double-Count Effect
        </h3>

        <p className="mt-4 text-text-secondary">
          Verbal Expression (VE) is doubled in the AFQT formula. A 5-point
          gain on Word Knowledge or Paragraph Comprehension is worth twice as
          much for AFQT as a 5-point gain on math.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              +5 WK
            </span>
            <span className="text-sm text-text-secondary">
              +10 AFQT raw points (2x because VE is doubled)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              +5 PC
            </span>
            <span className="text-sm text-text-secondary">
              +10 AFQT raw points (2x because VE is doubled)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              +10 AR
            </span>
            <span className="text-sm text-text-secondary">
              +10 AFQT raw points (1x weight)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              +10 MK
            </span>
            <span className="text-sm text-text-secondary">
              +10 AFQT raw points (1x weight)
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Word Knowledge and Paragraph Comprehension are roughly twice as
          efficient per study hour for AFQT improvement. If you are stuck
          below an AFQT cutoff, drill verbal first.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          AR&apos;s Dual Role in Air Force MAGE
        </h3>

        <p className="mt-4 text-text-secondary">
          Arithmetic Reasoning shows up in two MAGE composites: G (General)
          and E (Electronic). Improving AR lifts both at once.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">AR</span>
            <span className="text-sm text-text-secondary">
              appears in G composite and E composite (2 MAGE scores)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">WK</span>
            <span className="text-sm text-text-secondary">
              appears in A composite and G composite (2 MAGE scores)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">MK</span>
            <span className="text-sm text-text-secondary">
              appears in A composite and E composite (2 MAGE scores)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">GS</span>
            <span className="text-sm text-text-secondary">
              appears in M composite and E composite (2 MAGE scores)
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Air Force candidates targeting Cyber AFSCs (E ≥ 70) should hammer
          Arithmetic Reasoning. It is the single highest-leverage subtest for
          that goal because it pulls double duty.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Subtest-to-Composite Master Table
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Army Line Scores
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Marines GT
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AF MAGE
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Navy Key Scores
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Total Reach
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AR
                </td>
                <td className="py-2 pr-4">GT, CL, EL, FA, GM, MM, OF, SC, ST</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">G, E</td>
                <td className="py-2 pr-4">NUC, CTT, many</td>
                <td className="py-2 font-semibold">Highest</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  WK (via VE)
                </td>
                <td className="py-2 pr-4">GT, CL, OF, SC, ST</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">A, G</td>
                <td className="py-2 pr-4">HM, NUC, many</td>
                <td className="py-2 font-semibold">Highest</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MK
                </td>
                <td className="py-2 pr-4">CL, EL, GM, ST</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">A, E</td>
                <td className="py-2 pr-4">NUC, CTT, HM</td>
                <td className="py-2 font-semibold">High</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GS
                </td>
                <td className="py-2 pr-4">ST, SC</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">M, E</td>
                <td className="py-2 pr-4">NUC, SEAL</td>
                <td className="py-2 font-semibold">High</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MC
                </td>
                <td className="py-2 pr-4">GM, MM, ST</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">M</td>
                <td className="py-2 pr-4">NUC, SEAL</td>
                <td className="py-2 font-semibold">Medium</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EI
                </td>
                <td className="py-2 pr-4">EL</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">E</td>
                <td className="py-2 pr-4">SEAL</td>
                <td className="py-2 font-semibold">Low</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AS
                </td>
                <td className="py-2 pr-4">GM, MM</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">M</td>
                <td className="py-2 pr-4">Few</td>
                <td className="py-2 font-semibold">Low</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AO
                </td>
                <td className="py-2 pr-4">OF</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">None</td>
                <td className="py-2 pr-4">Few</td>
                <td className="py-2 font-semibold">Lowest</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Subtests You Can Skip
        </h3>

        <p className="mt-4 text-text-secondary">
          Assembling Objects (AO) shows up in only a handful of formulas,
          mostly Army OF (Operators and Food) and a few Air Force/Navy
          contexts. If your target jobs do not require it, do not waste study
          hours on it.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Two-week retake plan: drill AR and WK. They touch every
            branch&apos;s most-wanted composites and give you the biggest score
            lift per study hour.
          </p>
        </aside>

        <p className="text-text-secondary">
          For drill resources, see{" "}
          <Link href="/practice-test">/practice-test</Link> and{" "}
          <Link href="/asvab-study-guide">/asvab-study-guide</Link>.
        </p>

        {/* Section 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Use the ASVAB Hero Composite Score Calculator
        </h2>

        <p className="mt-4 text-text-secondary">
          Doing the math by hand is fine for one branch. If you are comparing
          all six, or running retake what-if scenarios, use the{" "}
          <strong>asvab composite score calculator</strong> at{" "}
          <Link href="/calculator">/calculator</Link>. The tool runs every
          branch&apos;s formulas in parallel from a single set of subtest
          inputs, so you do not have to copy numbers between worksheets.
        </p>

        <p className="text-text-secondary">
          The calculator was built for two specific moments: the day you get
          your practice score sheet back, and the day you decide whether to
          retake. Both decisions hinge on the same question, which jobs are on
          the table at the score you have right now.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 1
            </span>
            <span className="text-sm text-text-secondary">
              Enter your nine subtest standard scores: GS, AR, WK, PC, MK, EI,
              AS, MC, AO. These are on your ASVAB Student Results sheet, not
              the AFQT line.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 2
            </span>
            <span className="text-sm text-text-secondary">
              Pick your branch or &ldquo;all six.&rdquo; Selecting all six runs
              the full matrix and shows you side-by-side how the same subtest
              scores get reshaped into different composites for different
              branches.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 3
            </span>
            <span className="text-sm text-text-secondary">
              Review your AFQT. The calculator shows your percentile and which
              branch enlistment gates you have cleared, including the diploma vs
              GED splits.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 4
            </span>
            <span className="text-sm text-text-secondary">
              Review your composites. Every Army line score, Marine GT, MAGE
              composite, and Navy/Coast Guard rating composite is calculated
              automatically and displayed with the threshold context.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 5
            </span>
            <span className="text-sm text-text-secondary">
              Browse qualifying jobs. The tool flags which MOS, rate, and AFSC
              you currently qualify for and which ones you miss, with the gap in
              points.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 6
            </span>
            <span className="text-sm text-text-secondary">
              Run what-if retake scenarios. Bump any subtest up by 5 or 10
              points and re-run. The tool shows which jobs the new scores unlock
              so you know exactly which subtests to study.
            </span>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The asvab composite score calculator is free, with no signup and no
            email gate. Bookmark it and run your scores after every practice
            test to watch your job options expand in real time.
          </p>
        </aside>

        <p className="text-text-secondary">
          <Link href="/calculator">
            Plug your scores into the ASVAB Hero composite score calculator
          </Link>
          . It takes 90 seconds and gives you a complete branch-by-branch
          breakdown of every job you qualify for. Pair it with{" "}
          <Link href="/asvab-scores-explained">/asvab-scores-explained</Link>{" "}
          for full context on what each number means.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the formula for the ASVAB GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Army GT = VE + AR, where VE = WK + PC. Marine GT uses the same
              formula: WK + PC + AR. Some guides add Mechanical Comprehension
              to the Marine GT formula, but MC feeds the Marine MM (Mechanical
              Maintenance) composite, not GT. Any calculator returning a USMC
              GT above 130 is including MC incorrectly.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is the AFQT score calculated?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT raw = 2VE + AR + MK, where VE = WK + PC. The raw sum then
              converts to a percentile from 1 to 99 against a 1997 reference
              population. VE counts double, which is why Word Knowledge and
              Paragraph Comprehension are roughly twice as efficient per point
              of improvement compared to math subtests.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good ASVAB composite score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends on the target job. Army GT 110 unlocks Cyber, Special
              Forces, and most premium MOSs. ST 100 or higher covers most
              technical fields. Air Force E of 70 or higher unlocks Cyber
              AFSCs. Marine GT 105 covers Recon. Below 90 in most composites
              significantly narrows your options.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the AFQT the same as my line score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. AFQT is your enlistment percentile from 1 to 99 calculated
              from four subtests. Line scores (also called composite or aptitude
              area scores) are job-qualification scores using different subtest
              combinations. AFQT is the enlistment gate. Line scores are the
              job-selection gate. You have to clear both, and they use different
              math.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do I calculate Air Force MAGE scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Mechanical = MC + GS + AS. Administrative = WK + PC + MK. General
              = WK + PC + AR. Electronic = AR + MK + EI + GS. Results are
              standard scores roughly in the 1 to 99 range, but they are not
              percentiles. A G score of 62 does not mean you scored higher than
              62 percent of test takers.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What composite scores do I need for Navy SEAL?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Two qualification paths. Path A: GS + MC + EI must total 165 or
              higher. Path B: VE + MK + MC + CS must total 220 or higher. Path
              A is more common because not all ASVAB versions include Coding
              Speed. SEAL candidates also need AR + MK of 100 or higher and MC
              of 50 or higher.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I use a composite score calculator for retake planning?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, this is the single best use case. Run your current scores in
              the{" "}
              <Link href="/calculator">asvab composite score calculator</Link>,
              then bump any subtest by 5 or 10 points and re-run. The tool
              shows exactly which jobs that change unlocks. That tells you which
              subtest to drill before your retake to maximize the number of new
              options on the table.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite
            scores, and every job you qualify for across all 6 branches.
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
