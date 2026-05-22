import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import GTScoreCalculator from "@/components/GTScoreCalculator";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "GT Score Calculator (2026): Estimate Your Army GT Score | ASVAB Hero",
  description:
    "Calculate your ASVAB GT score instantly with our free calculator. Enter your subtests to get your GT, plus Army, Marine Corps and Air Force formulas and how to raise it.",
  alternates: {
    canonical: "https://asvabhero.com/gt-score-calculator",
  },
};

const faqs = [
  {
    q: "What is the difference between a GT score and an AFQT score?",
    a: "Your AFQT is a percentile score (1-99) derived from four subtests (WK, PC, AR, MK) using the formula 2VE + AR + MK. It determines whether you can enlist. Your GT score is a composite line score derived from three subtests (WK, PC, AR) using VE + AR. It determines which jobs and programs you qualify for. A strong AFQT does not guarantee a strong GT, since GT drops MK from the calculation.",
  },
  {
    q: "Does the Navy use a GT score?",
    a: "No. The Navy does not calculate a GT composite score. Each Navy rating has its own set of required line scores drawn from individual subtest combinations. If you&apos;re targeting a specific Navy rating, look up that rating&apos;s line score requirements directly rather than trying to hit a GT number.",
  },
  {
    q: "What subtest scores do I need to calculate my GT score?",
    a: "For Army, Coast Guard, and Air Force (G score): Word Knowledge (WK), Paragraph Comprehension (PC), and Arithmetic Reasoning (AR). For the Marine Corps, also add Mechanical Comprehension (MC). All are standard ASVAB subtests listed as standard scores on your score report. You cannot calculate GT from your AFQT percentile alone.",
  },
  {
    q: "What is a good GT score for Army jobs?",
    a: "GT 110 opens every officer pathway (OCS, Warrant Officer) and the most competitive enlisted programs including Special Forces and Cyber. Most technical and medical MOS cluster around 107. Administrative and clerical roles typically require 100-105. Anything above 115 gives you full flexibility across the Army&apos;s career catalog. For job-specific requirements, check the ASVAB score chart.",
  },
  {
    q: "Can I retake the ASVAB to improve my GT score?",
    a: "Yes. For pre-enlistment candidates, the standard schedule is a 1-month wait after your initial test, another 1 month after the first retake, then 6 months between each subsequent attempt. Your most recent score replaces all previous scores, so study before you retest. Active duty soldiers take the AFCT instead and can access the BSEP program for preparation.",
  },
  {
    q: "Is the GT score formula the same for all branches?",
    a: "No. Army, Coast Guard, and Air Force all use VE + AR, though the Air Force calls it the G score. Marine Corps adds Mechanical Comprehension: VE + AR + MC. The Navy doesn&apos;t use a GT composite at all. Calculate your GT using the formula for your specific branch.",
  },
  {
    q: "What GT score do I need for Army Special Forces?",
    a: "Army 18X (Special Forces Recruit) requires a minimum GT score of 110. That&apos;s one of three simultaneous line score requirements: GT 110, CO (Combat) 100, and SC (Surveillance and Communications) 100. All three must be met at the same time. GT 110 also meets the requirement for OCS, Warrant Officer, and most other officer pathways.",
  },
];

export default function GTScoreCalculatorPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GT Score Calculator: Calculate Your ASVAB GT Score Instantly",
    description:
      "Calculate your ASVAB GT score instantly. Learn the Army, Marine Corps, and Air Force GT formulas, score requirements, and how to raise your GT.",
    url: "https://asvabhero.com/gt-score-calculator",
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
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a.replace(/&apos;/g, "'").replace(/&amp;/g, "&"),
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          GT Score Calculator: Calculate Your ASVAB GT Score Instantly
        </h1>

        <p className="mt-4 text-text-secondary">
          You have your ASVAB subtest scores. You need your{" "}
          <strong>gt score calculator</strong> result before you can confirm
          whether you qualify for the job, program, or commission pathway
          you&apos;re targeting. Three subtest numbers. One formula. Two steps.
        </p>

        <p className="text-text-secondary">
          Use the interactive calculator below to get your GT score in seconds.
        </p>

        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <Suspense
            fallback={
              <div className="p-6 text-text-secondary">
                Loading calculator...
              </div>
            }
          >
            <GTScoreCalculator />
          </Suspense>
        </div>

        <p className="text-text-secondary">
          Below, you&apos;ll find the full formula with a worked example,
          branch-by-branch differences, a complete breakdown of what each GT
          threshold unlocks, and a step-by-step plan for raising your score if
          you&apos;re not at your target yet. If your recruiter showed you a
          number that looks different from what you calculate, the accuracy
          section explains exactly why.
        </p>

        <p className="text-text-secondary">
          For a deeper look at the full ASVAB scoring system, see{" "}
          <Link href="/asvab-scores-explained">ASVAB Scores Explained</Link>.
        </p>

        {/* ── What Is the GT Score ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Is the GT Score on the ASVAB?
        </h2>

        <p className="mt-4 text-text-secondary">
          Your ASVAB produces two distinct types of scores that serve different
          purposes. Your AFQT percentile is the gate for enlistment eligibility.
          Your composite line scores, including the GT, determine which specific
          jobs and programs you qualify for once you&apos;re in.
        </p>

        <p className="text-text-secondary">
          GT stands for General Technical. It measures the combination of your
          verbal reasoning ability and your arithmetic reasoning ability, which
          together predict how quickly you can learn and apply technical material
          during training. Most of the Army&apos;s technical MOS, all officer
          commissioning programs, and every Special Operations pathway run
          through a GT score threshold.
        </p>

        <p className="text-text-secondary">
          The distinction between GT and AFQT trips up a lot of candidates.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT formula = 2VE + AR + MK. It&apos;s a percentile score that
            determines enlistment eligibility. GT formula = VE + AR. It&apos;s
            a composite that determines job and program eligibility. Both use VE
            and AR, but AFQT also folds in Mathematics Knowledge (MK). You can
            have a 75th percentile AFQT and still miss the GT 110 threshold if
            your verbal scores are mediocre and your MK was carrying your AFQT.
          </p>
        </aside>

        <p className="text-text-secondary">
          Your GT score won&apos;t appear as a labeled line on your Student
          Score Report. What you&apos;ll see there are individual subtest
          standard scores: WK, PC, AR, and others. The composite GT shows up in
          your Enlistment Score Report at MEPS, or your recruiter can pull it
          directly. You can calculate it yourself from your subtest scores using
          the formula below, or use our{" "}
          <Link href="/calculator">ASVAB score calculator</Link> to see it
          alongside every other line score you might need.
        </p>

        <p className="text-text-secondary">
          Understanding how the GT fits within the broader scoring picture is
          covered in detail at{" "}
          <Link href="/asvab-scoring-and-results">ASVAB Scoring and Results</Link>{" "}
          and <Link href="/afqt-score">AFQT Score</Link> if you want to go
          deeper.
        </p>

        {/* ── GT Formula ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT Score Formula: Step-by-Step with a Worked Example
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army GT score requires three pieces of information from your ASVAB
          results: your Word Knowledge (WK) score, your Paragraph Comprehension
          (PC) score, and your Arithmetic Reasoning (AR) score. These are all
          standard scores listed on your score report, typically in the 20-80
          range.
        </p>

        <p className="text-text-secondary">The calculation is two steps.</p>

        <p className="text-text-secondary">
          <strong>Step 1: Calculate your VE (Verbal Expression) score.</strong>
        </p>

        <p className="text-text-secondary">
          Add your WK and PC standard scores together, then multiply the sum by
          2.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          VE = (WK + PC) &times; 2
        </div>

        <p className="text-text-secondary">
          Working example: WK = 40, PC = 38
          <br />
          VE = (40 + 38) &times; 2 = <strong>156</strong>
        </p>

        <p className="text-text-secondary">
          <strong>Step 2: Add AR to get your GT.</strong>
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          Working example: VE = 156, AR = 42
          <br />
          GT = 156 + 42 = <strong>198</strong>
        </p>

        <p className="text-text-secondary">
          That 198 is your raw GT composite. The Department of Defense applies a
          final conversion table to produce the scaled GT score your recruiter
          sees, which typically falls in the 80-140 range. Our gt score
          calculator uses the raw composite. If your result sits clearly above
          or below the threshold, the raw number is a reliable guide. If
          you&apos;re within 5-10 points of a critical line, confirm the scaled
          number at MEPS. If you prefer to follow the math by hand, our{" "}
          <Link
            href="/gt-score"
            className="text-accent hover:text-accent-hover"
          >
            how to calculate your GT score
          </Link>{" "}
          companion walks through each step.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Multiple published articles claim the VE formula is VE = 2(WK + PC)
            and show VE scores like 240 or 256. That formula produces the same
            raw GT result because the math is equivalent, but it
            misrepresents VE as a standalone score in the 200+ range. Your VE
            as shown on official records is a scaled score in the 20-62 range.
            Our calculator handles the conversion correctly. When you see a
            competitor&apos;s &ldquo;sample calculation&rdquo; showing
            impossible VE numbers, that&apos;s a sign the article
            wasn&apos;t reviewed by anyone who&apos;s looked at an actual ASVAB
            score report.
          </p>
        </aside>

        <p className="text-text-secondary">
          The VE multiplier is where most candidates find their leverage.
          Because VE is doubled in the GT formula, every 5-point increase in
          your combined WK+PC adds 10 points to your raw GT. A focused 4-week
          block studying vocabulary and paragraph reasoning can move your GT
          more efficiently than the same time spent on arithmetic. See{" "}
          <Link href="/asvab-word-knowledge-tips">
            ASVAB Word Knowledge Tips
          </Link>{" "}
          and{" "}
          <Link href="/asvab-arithmetic-reasoning-tips">
            ASVAB Arithmetic Reasoning Tips
          </Link>{" "}
          for targeted preparation guidance.
        </p>

        {/* ── GT by Branch ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score by Branch: Army, Marines, Air Force, and Coast Guard
        </h2>

        <p className="mt-4 text-text-secondary">
          The GT score formula varies by branch, which means the same three
          subtest scores can produce different GT results depending on which
          recruiter you&apos;re talking to. Know your branch&apos;s formula
          before you calculate.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Score Name
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2">
                  Standard reference for most MOS and officer requirements
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marine Corps
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR + MC</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2">
                  Adds Mechanical Comprehension; same thresholds, higher raw
                  number
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force / Space Force
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4 font-mono">G score</td>
                <td className="py-2">
                  Called &ldquo;General Aptitude&rdquo; (G); formula identical
                  to Army
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2">Same as Army</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">Per-rating</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2">
                  No GT composite; each rating has unique subtest requirements
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For Army, Coast Guard, and Air Force candidates, the formula is the
          same three subtests. The Air Force calls the resulting score the
          &ldquo;G&rdquo; (General Aptitude) score rather than GT, but your
          recruiter is running the same calculation.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Marine Corps candidates need to include their MC (Mechanical
            Comprehension) subtest score in the formula. Because MC is added to
            the total, a Marine GT raw composite will be numerically higher than
            an Army candidate&apos;s at identical WK, PC, and AR performance.
            The qualifying thresholds are calibrated to account for this. If
            you&apos;re cross-referencing Army GT requirements while planning
            for the Marines, you need the USMC-specific line score minimums.
          </p>
        </aside>

        <p className="text-text-secondary">
          Navy candidates searching for their &ldquo;GT score&rdquo; won&apos;t
          find a single number to target. Each Navy rating uses a specific
          combination of subtest scores. Pull up the specific rating
          you&apos;re targeting and work backward to the subtests it requires.
        </p>

        <p className="text-text-secondary">
          For specific job requirements, the{" "}
          <Link href="/army-mos-list">Army MOS List 2026</Link> and{" "}
          <Link href="/usmc-mos-list">USMC MOS List 2026</Link> have complete
          line score tables for every enlisted specialty.
        </p>

        {/* ── GT Requirements ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Requirements: What Score Opens Which Doors
        </h2>

        <p className="mt-4 text-text-secondary">
          The 110 threshold is the one most people know, but GT requirements
          span a range. What you need depends entirely on your specific goal.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Programs and MOS It Unlocks
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-400">
                  110+
                </td>
                <td className="py-2">
                  OCS, Warrant Officer, Green to Gold, 18X Special Forces, CID
                  Agent (31D), Cyber Operations Specialist (17C), Prime Power
                  Production Specialist (12P)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  107
                </td>
                <td className="py-2">
                  Psychological Operations Specialist (37F), Civil Affairs
                  Specialist (38B), Combat Medic (68W), Public Affairs (46S),
                  Orthopedic Specialist (68B), Physical Therapy Specialist
                  (68F), most 68-series medical MOS
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  105
                </td>
                <td className="py-2">Cyber Network Defender (25D)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  100
                </td>
                <td className="py-2">Human Resources Specialist (42A)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  95
                </td>
                <td className="py-2">Allied Trade Specialist (91E)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 110 is a hard requirement for all Army officer-producing programs
            under AR 135-100. This covers OCS, Warrant Officer accessions, and
            the Green to Gold active duty option. There is no waiver process for
            the GT threshold on officer programs. If you want a commission
            pathway and your GT is 108 or 109, you need to retest.
          </p>
        </aside>

        <p className="text-text-secondary">
          Keep in mind that GT is one line score among several that any given
          MOS requires. The 18X Special Forces track requires GT 110, CO
          (Combat) 100, and SC (Surveillance and Communications) 100, and all
          three must be met simultaneously. Hitting GT 110 but falling short on
          CO disqualifies you from that track just as effectively.
        </p>

        <p className="text-text-secondary">
          The pattern in the table above reflects a meaningful divide in
          military job categories. Roles involving direct technical
          responsibility, intelligence work, or leadership development cluster
          at 107 and above. Support and administrative functions tend to require
          95-105. Combat arms generally don&apos;t carry a GT floor at all,
          though specific skill identifiers and career development programs may.
        </p>

        <p className="text-text-secondary">
          Use the{" "}
          <Link href="/asvab-score-chart">ASVAB score chart</Link> or the{" "}
          <Link href="/army-mos-list">Army MOS List</Link> to check exact
          requirements for a specific job you&apos;re targeting.
        </p>

        {/* ── Find Your GT Score ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Find Your GT Score on Your ASVAB Score Report
        </h2>

        <p className="mt-4 text-text-secondary">
          Your subtest scores and your composite line scores appear on different
          documents, which is why candidates often can&apos;t locate their GT
          until they get to MEPS.
        </p>

        <p className="text-text-secondary">
          The <strong>Student Score Report</strong> is what you receive after
          taking the ASVAB for career exploration purposes (often through school
          or a recruiter appointment). It shows individual subtest standard
          scores in columns labeled WK, PC, AR, MC, and others. It typically
          does not show computed line score composites like GT.
        </p>

        <p className="text-text-secondary">
          The <strong>Enlistment Score Report</strong> is generated at MEPS and
          includes computed line scores. This is where your official GT
          composite appears. Your recruiter always has access to this document
          and can read you the GT directly.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Army GT</p>
            <p className="mt-1 text-sm text-text-secondary">
              Needs WK, PC, and AR from your score report
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Marine GT</p>
            <p className="mt-1 text-sm text-text-secondary">
              Needs WK, PC, AR, and MC from your score report
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Air Force G score
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Needs WK, PC, and AR (same formula as Army)
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you only have your Student Score Report, use the calculator at
            the top of this page. Plug in your WK, PC, and AR standard scores
            and it will give you your raw GT composite. If you&apos;ve already
            been to MEPS and your recruiter quoted you a GT number, that&apos;s
            the official scaled version. They will look different numerically
            but they track together directly.
          </p>
        </aside>

        <p className="text-text-secondary">
          One thing that catches people off guard: you cannot back-calculate
          your GT from your AFQT percentile. The AFQT is a percentile derived
          from a 1997 norming study, while GT is a raw composite from different
          inputs. You need your individual WK, PC, and AR standard scores to
          compute GT. If you have those numbers, the calculation is
          straightforward.
        </p>

        {/* ── Raise Your GT Score ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Raise Your GT Score: BSEP for Active Duty and Study Tips for
          Everyone
        </h2>

        <p className="mt-4 text-text-secondary">
          If your GT score is below the threshold you need, the next steps
          depend on whether you&apos;re already serving or still in the
          pre-enlistment phase.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Active Duty Soldiers: The BSEP Path
        </h3>

        <p className="mt-4 text-text-secondary">
          Active duty Army soldiers have access to BSEP (Basic Skills Education
          Program), a free Army-funded course specifically designed to raise GT
          scores on the AFCT (Armed Forces Classification Test), the active duty
          version of the ASVAB.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            BSEP is free and open to active Army, National Guard, and Army
            Reserve soldiers with GT scores of 109 or below. Many installations
            also open seats to Marines, Sailors, and Airmen when space permits.
            The goal is to get soldiers to 110 for warrant officer applications
            and MOS reclassifications.
          </p>
        </aside>

        <p className="text-text-secondary">
          Here&apos;s what the program looks like in practice:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Duration:</strong> 40 hours of face-to-face classroom
            instruction plus 20 hours of online coursework, completed over 10
            days
          </li>
          <li>
            <strong>Test day:</strong> Day 11 is the AFCT retest
          </li>
          <li>
            <strong>Average score improvement:</strong> 19 points
          </li>
          <li>
            <strong>Record improvement:</strong> 35 points (Staff Sgt. Samuel
            Lovato, Fort Leonard Wood)
          </li>
          <li>
            <strong>Seats per class:</strong> 15, offered monthly
          </li>
        </ul>

        <p className="text-text-secondary">
          The Army&apos;s documented outcomes show that soldiers who start BSEP
          with GT scores below 90 have regularly finished above 110. The program
          focuses on the exact two things the GT tests: math and verbal
          reasoning. There is a limit to how far the number can climb, though,
          and our guide to the{" "}
          <Link
            href="/gt-score"
            className="text-accent hover:text-accent-hover"
          >
            highest possible GT score
          </Link>{" "}
          covers the documented 144 ceiling.
        </p>

        <p className="text-text-secondary">
          To enroll, contact your installation&apos;s Education Center.
          You&apos;ll take the Pre-TABE (Pre-Test for Adult Education) as a
          diagnostic, then get your Commander&apos;s approval to attend during
          duty hours.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Pre-Enlistment Candidates: Target the Right Subtests
        </h3>

        <p className="mt-4 text-text-secondary">
          Your GT score is driven entirely by WK, PC, and AR. A targeted study
          plan that focuses on those three subtests will move your gt score
          calculator result faster than general ASVAB prep.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Weeks 1-2</p>
            <p className="mt-1 text-sm text-text-secondary">
              Take a diagnostic practice test. Identify whether WK/PC or AR is
              your weaker half.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Weeks 3-4</p>
            <p className="mt-1 text-sm text-text-secondary">
              Daily targeted drill. Root word lists and vocabulary flashcards for
              WK/PC. Word problem translation practice for AR.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Weeks 5-6</p>
            <p className="mt-1 text-sm text-text-secondary">
              Timed full-length practice tests under realistic conditions. Review
              every missed question the same day.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The VE leverage point is worth repeating: because VE = (WK + PC)
          &times; 2, a 5-point combined improvement in WK and PC adds 10 points
          to your raw GT. The same 5-point gain in AR only adds 5 points. If
          you&apos;re close to a threshold, verbal prep is the higher-leverage
          move.
        </p>

        <p className="text-text-secondary">
          Start with a{" "}
          <Link href="/practice-test">free practice test</Link> to establish
          your baseline subtest scores. For focused prep by subtest, see{" "}
          <Link href="/asvab-word-knowledge-tips">
            ASVAB Word Knowledge Tips
          </Link>
          ,{" "}
          <Link href="/asvab-paragraph-comprehension-tips">
            ASVAB Paragraph Comprehension Tips
          </Link>
          , and{" "}
          <Link href="/asvab-arithmetic-reasoning-tips">
            ASVAB Arithmetic Reasoning Tips
          </Link>
          .
        </p>

        {/* ── GT Score Accuracy ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Accuracy: Why Your Calculated Number May Look Different from
          Official Records
        </h2>

        <p className="mt-4 text-text-secondary">
          If the gt score calculator gives you 198 but your recruiter shows you
          a GT of 112, both numbers are correct. They&apos;re measuring the
          same thing in different units.
        </p>

        <p className="text-text-secondary">
          The raw composite you calculate (VE + AR) feeds into the Department of
          Defense&apos;s official conversion table, which outputs the scaled GT
          score that appears in your service record and that MOS eligibility
          tables reference. The scaled score typically falls in the 80-140
          range. The raw composite can run considerably higher.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            A raw GT composite in the 175-210 range typically maps to a scaled
            GT of approximately 107-115, which covers the most consequential
            thresholds. If your raw composite puts you clearly above or below a
            threshold on the raw scale, you can use the calculator result as a
            reliable directional indicator. If you&apos;re within 5-10 raw
            points of a critical threshold like the 110 equivalent, verify the
            exact scaled score with your recruiter before making enlistment
            decisions based on it.
          </p>
        </aside>

        <p className="text-text-secondary">
          The formula is correct. The output units differ from what official
          records display. Use the calculator for planning and comparison,
          confirm the official scaled number at MEPS.
        </p>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Calculator FAQ
        </h2>

        <div className="mt-4 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-display text-base font-bold text-text-primary">
                {faq.q}
              </h3>
              <p
                className="mt-1 text-sm text-text-secondary"
                dangerouslySetInnerHTML={{ __html: faq.a }}
              />
            </div>
          ))}
        </div>

        <section className="mt-10 not-prose">
          <EmailCapture
            headline="Get the GT Score Booster guide — push your GT 10+ points in 14 days"
            subhead="The formula, the cutoffs that unlock real MOS, the 14-day schedule that actually works, and the retake math that tells you when a second test is worth it."
            cta="Email me the GT booster"
            tag="gt-calculator"
          />
        </section>

        {/* ── CTA Box ── */}
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
