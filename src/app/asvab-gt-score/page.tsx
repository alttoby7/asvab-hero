import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "What GT Score Do You Need? Army Jobs at 100, 107, 110+ (2026)",
  description:
    "GT = VE + AR. Army needs 100 for most tech jobs, 107 for Rangers, 110 for Cyber / OCS / Green to Gold. Raise WK by 1 point → GT jumps 2. Full tables, branch differences, and how to close the gap.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-gt-score",
  },
};

export default function ASVABGTScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "ASVAB GT Score: The Complete Guide to the Military's Most Important Line Score",
          description:
            "Learn what the ASVAB GT score is, how it's calculated (VE + AR), what each score range unlocks, and how to raise it. Branch formulas, job tables, and special program requirements.",
          url: "https://asvabhero.com/asvab-gt-score",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-22",
          dateModified: "2026-04-19",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the highest possible GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No official ceiling. The practical maximum is approximately 145-147 for Army and 151 for Marines. Scores above 130 place you in roughly the top 7%.",
              },
            },
            {
              "@type": "Question",
              name: "Is the GT score the same as the AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. AFQT is a percentile (1-99) for enlistment eligibility. GT is a composite standard score for job eligibility. Different formulas: AFQT = AR + MK + 2(VE), GT = VE + AR. See ASVAB scores explained for the full breakdown.",
              },
            },
            {
              "@type": "Question",
              name: "What 3 subtests make up the GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Word Knowledge (WK), Paragraph Comprehension (PC), and Arithmetic Reasoning (AR). WK and PC combine into VE, then GT = VE + AR. The other 7 subtests do not affect GT.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force use GT scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not exactly. The Air Force uses \"General (G),\" the same VE + AR formula expressed as a percentile (0-99). An Air Force G of 72 means 72nd percentile, roughly equivalent to Army GT 115-120. See the Air Force AFSC list for specific requirements.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB just to raise my GT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, but your most recent score replaces the previous, even if lower. Wait periods: 1 month, 1 month, then 6 months between subsequent attempts. Active duty soldiers use the AFCT. See our retake guide.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need for Special Forces?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Civilian 18X contract: GT 110 plus CO (Combat) score of 100. Active duty soldiers pursuing SF through the SFAS pipeline only need GT 100.",
              },
            },
            {
              "@type": "Question",
              name: "How fast can I raise my GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Four to six weeks of focused study on WK, PC, and AR is realistic for a 10-20 point gain. Operation Connect the Dots achieved 82% success in just 2 weeks. Take a free practice test to benchmark where you stand.",
              },
            },
            {
              "@type": "Question",
              name: "Do Marine Corps and Army GT scores use the same formula?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Both use GT = VE + AR. Some sources incorrectly claim Marines add MC (Mechanical Comprehension). That is wrong. Formulas are identical, though MOS thresholds differ.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          What GT Score Do You Need? Army Jobs at 100, 107, 110+ (2026)
        </h1>

        <VerifiedBlock
          verifiedDate="April 2026"
          sources={[
            { label: "goarmy.com", url: "https://www.goarmy.com/careers-and-jobs/about-army-jobs/asvab" },
            { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
          ]}
        >
          <p>
            The <strong>GT (General Technical)</strong> score is the single
            most important Army line score. Formula:{" "}
            <strong>GT = VE + AR</strong>, where VE = 2×WK + PC. Common
            cutoffs: <strong>GT 100</strong> opens most Army tech/intel MOS
            (25B, 35F). <strong>GT 107</strong> is the Ranger threshold.{" "}
            <strong>GT 110</strong> unlocks Cyber (17C), OCS, Green to Gold,
            and 18X Special Forces. Because WK is doubled, raising your
            Word Knowledge by 1 standard score point raises GT by 2.
          </p>
        </VerifiedBlock>

        <p className="mt-4 text-text-secondary">
          Your AFQT gets you through the door. Your{" "}
          <strong>ASVAB GT score</strong> decides which rooms you can enter. A
          recruit with an AFQT of 90 and a GT of 98 has fewer career options
          than someone with an AFQT of 65 and a GT of 112.
        </p>
        <p className="text-text-secondary">
          GT stands for General Technical, a composite line score from three
          ASVAB subtests. It gates officer programs, special forces contracts,
          cyber jobs, medical MOS, and over 100 career fields.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Average GT
            </p>
            <p className="mt-1 text-sm text-text-secondary">100</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Key Threshold
            </p>
            <p className="mt-1 text-sm text-text-secondary">110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Subtests Involved
            </p>
            <p className="mt-1 text-sm text-text-secondary">3 of 10</p>
          </div>
        </div>

        <p className="text-text-secondary">
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            Plug your subtest scores into our calculator
          </Link>{" "}
          to see your GT now, or read on for the full breakdown.
        </p>

        {/* What the GT Score Actually Is */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What the GT Score Actually Is
        </h2>
        <p className="mt-4 text-text-secondary">
          &ldquo;I got a 72 on my ASVAB.&rdquo; That almost always means AFQT,
          not GT. These are different scores, and mixing them up is the most
          common mistake recruits make.
        </p>
        <p className="text-text-secondary">
          GT stands for General Technical. It is a composite line score, not the
          overall ASVAB score. Your AFQT is a percentile from 1 to 99 that
          determines whether you can enlist. Your GT is a standard score
          (typically ranging from about 40 to 145) that determines what you can
          do after enlistment.
        </p>
        <p className="text-text-secondary">
          This distinction matters more than most recruiters explain. A high AFQT
          with a low GT means you qualify to join but are locked out of the jobs
          you actually want. Once you clear your branch&apos;s AFQT minimum (31
          for Army, 32 for Marines, 36 for Navy, 36 for Air Force), your AFQT is
          essentially irrelevant. Line scores like GT control your career from
          that point forward.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>GT is NOT your AFQT score.</strong> Your AFQT is a percentile
            (1-99) that determines enlistment eligibility. Your GT is a composite
            standard score that determines job eligibility. You can have a high
            AFQT and a low GT, or a low AFQT and a high GT. They use different
            formulas.
          </p>
        </aside>

        <p className="text-text-secondary">
          AFQT answers &ldquo;Can I join?&rdquo; Your ASVAB GT score answers
          &ldquo;What can I become?&rdquo;
        </p>
        <p className="text-text-secondary">
          Two recruits walk into MEPS on the same day. Recruit A scores AFQT 90
          and GT 98. Recruit B scores AFQT 65 and GT 112. Recruit A looks better
          on paper, but Recruit B qualifies for Cyber Operations, Special Forces
          contracts, and every officer program. Recruit A does not.
        </p>

        {/* TABLE: AFQT vs GT Comparison */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Feature
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFQT
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
                <td className="py-2 pr-4">Percentile ranking</td>
                <td className="py-2">Composite standard score</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Scale
                </td>
                <td className="py-2 pr-4 font-mono">1-99</td>
                <td className="py-2 font-mono">~40-145</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Formula
                </td>
                <td className="py-2 pr-4 font-mono">AR + MK + 2(VE)</td>
                <td className="py-2 font-mono">VE + AR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Subtests used
                </td>
                <td className="py-2 pr-4 font-mono">4 (AR, MK, WK, PC)</td>
                <td className="py-2 font-mono">3 (WK, PC, AR)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Purpose
                </td>
                <td className="py-2 pr-4">
                  Determines enlistment eligibility
                </td>
                <td className="py-2">Determines job eligibility</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it gates
                </td>
                <td className="py-2 pr-4">Whether you can join</td>
                <td className="py-2">
                  Which MOS, officer programs, and special ops you qualify for
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For a deeper look at how all ASVAB scores interact, see our{" "}
          <Link
            href="/asvab-scoring-and-results"
            className="text-accent hover:text-accent-hover"
          >
            guide to ASVAB scoring and results
          </Link>
          .
        </p>

        {/* How the GT Score Is Calculated */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How the GT Score Is Calculated
        </h2>
        <p className="mt-4 text-text-secondary">
          Your GT score depends on exactly 3 of the 10 ASVAB subtests. The other
          7 do not affect it at all, which means most people waste study time on
          the wrong material.
        </p>
        <p className="text-text-secondary">Here is the formula:</p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
          <br />
          <br />
          Where VE (Verbal Expression) is a scaled standard score derived from:
          <br />
          WK (Word Knowledge) + PC (Paragraph Comprehension)
          <br />
          <br />
          So the full chain is: WK + PC &#8594; VE (scaled) &#8594; VE + AR = GT
        </div>

        <p className="text-text-secondary">
          VE is not simply WK added to PC. The ASVAB converts your raw WK and PC
          performance into a single scaled standard score called VE. This VE
          score then adds directly to your Arithmetic Reasoning (AR) standard
          score to produce GT.
        </p>
        <p className="text-text-secondary">
          Individual subtests use a mean of 50 with a standard deviation of 10.
          Since GT combines two standard-scale components (VE and AR), the GT
          mean lands at approximately 100 with a standard deviation of about 20.
        </p>
        <p className="text-text-secondary">
          <strong>Worked examples:</strong>
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            VE = 58, AR = 52 &#8594; GT = 110. Just above the critical
            officer/SF threshold.
          </li>
          <li>VE = 50, AR = 50 &#8594; GT = 100. Dead average.</li>
          <li>
            VE = 48, AR = 50 &#8594; GT = 98. Twelve points short of officer
            programs.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE combines two subtests (WK and PC), so improvements in vocabulary
            and reading comprehension each contribute separately to your GT. This
            effectively doubles their impact compared to AR alone. A 5-point gain
            in both WK and PC can raise VE by roughly 10 points, lifting your GT
            by 10.
          </p>
        </aside>

        {/* TABLE: The 3 GT Subtests */}
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

        <p className="text-text-secondary">
          VE draws from two subtests while AR is just one. If you improve both WK
          and PC by a few points each, the combined lift to VE (and therefore GT)
          is larger than the same improvement in AR alone. That does not mean
          ignore AR. It means vocabulary and reading comprehension give you two
          levers instead of one.
        </p>
        <p className="text-text-secondary">
          Want to see how your subtests translate to a GT score?{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            Run your numbers through the calculator
          </Link>
          . For AR-specific prep strategies, check out our{" "}
          <Link
            href="/asvab-arithmetic-reasoning-tips"
            className="text-accent hover:text-accent-hover"
          >
            Arithmetic Reasoning tips
          </Link>
          , since AR accounts for a full 50% of your ASVAB GT score.
        </p>

        {/* GT Score Formulas by Branch */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Formulas by Branch
        </h2>
        <p className="mt-4 text-text-secondary">
          Same formula, different names, different scales. Every branch
          calculates a general technical composite, but they do not all call it
          GT, and the numbers are not directly comparable.
        </p>

        {/* TABLE: GT Score by Branch */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Score Name
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Scale
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Range
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
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Standard score</td>
                <td className="py-2 pr-4 font-mono">~40-147</td>
                <td className="py-2">The baseline reference</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Standard score</td>
                <td className="py-2 pr-4 font-mono">~40-151</td>
                <td className="py-2">Identical to Army formula</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2 pr-4 font-mono">
                  VE + AR used in composites
                </td>
                <td className="py-2 pr-4">Varies by rating</td>
                <td className="py-2 pr-4">Varies</td>
                <td className="py-2">No single &ldquo;GT&rdquo; label</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">General (G)</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Percentile</td>
                <td className="py-2 pr-4 font-mono">0-99</td>
                <td className="py-2">Same formula, different scale</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">General (G)</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Percentile</td>
                <td className="py-2 pr-4 font-mono">0-99</td>
                <td className="py-2">Same as Air Force</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2 pr-4">Multi-subtest composites</td>
                <td className="py-2 pr-4">Varies</td>
                <td className="py-2 pr-4">Varies</td>
                <td className="py-2">Navy-style formulas</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The Army and Marines use the identical GT = VE + AR formula and express
          it as a standard score. Your ASVAB GT score of 110 means the same
          thing in either branch.
        </p>
        <p className="text-text-secondary">
          The Navy does not officially label a single score as
          &ldquo;GT.&rdquo; Navy ratings use multi-subtest composites instead.
          Hospital Corpsman requires VE+AR+MK+GS of 208 or higher. Logistics
          Specialist requires VE+AR of 92 or higher. The VE+AR piece is
          functionally GT, but the Navy bundles it with other subtests for most
          ratings.
        </p>
        <p className="text-text-secondary">
          The Air Force and Space Force use the same VE + AR formula but express
          it as a percentile from 0 to 99.
        </p>

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
          Some sources claim the Marine Corps GT formula includes Mechanical
          Comprehension (MC). That is incorrect. Marine GT = VE + AR, identical
          to Army. If you have been studying MC to boost your Marine GT, redirect
          that effort to WK, PC, and AR.
        </p>
        <p className="text-text-secondary">
          For branch-specific job requirements, see our{" "}
          <Link
            href="/army-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            Army MOS list
          </Link>
          ,{" "}
          <Link
            href="/usmc-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            USMC MOS list
          </Link>
          , or{" "}
          <Link
            href="/air-force-afsc-list"
            className="text-accent hover:text-accent-hover"
          >
            Air Force AFSC list
          </Link>
          .
        </p>

        {/* What Your GT Score Means */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your GT Score Means
        </h2>
        <p className="mt-4 text-text-secondary">
          A GT of 110 sounds like a modest number. Only about 30-40% of
          test-takers score that high.
        </p>
        <p className="text-text-secondary">
          Because GT has a mean of 100 and a standard deviation of approximately
          20, you can map any GT score to a rough percentile. Here is how the
          distribution breaks down:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Average</p>
            <p className="mt-1 text-sm text-text-secondary">
              100 (50th percentile)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Officer Threshold
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              110 (top ~35%)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Outstanding
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              120+ (top ~16%)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Elite</p>
            <p className="mt-1 text-sm text-text-secondary">
              130+ (top ~7%)
            </p>
          </div>
        </div>

        {/* TABLE: GT Score Ranges */}
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

        <p className="text-text-secondary">
          The practical maximum is roughly 145-147 for Army and 151 for Marines.
          Scores above 130 are rare, and anything above 120 puts you ahead of
          roughly 84% of test-takers.
        </p>
        <p className="text-text-secondary">
          An ASVAB GT score of 110 is the single most important threshold in
          military careers. It separates &ldquo;standard enlisted&rdquo; from
          &ldquo;officer-eligible, SF-eligible, and cyber-eligible.&rdquo; If
          you are within 10-15 points, the improvement strategies later in this
          article can close that gap.
        </p>
        <p className="text-text-secondary">
          For broader context on what constitutes a strong ASVAB performance, see{" "}
          <Link
            href="/what-is-a-good-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            what is a good ASVAB score
          </Link>
          . You can also{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            run your scores through our calculator
          </Link>{" "}
          to see exactly where you land.
        </p>

        {/* Jobs That Require a High GT Score */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Jobs That Require a High GT Score
        </h2>
        <p className="mt-4 text-text-secondary">
          Your GT score is a key that opens specific doors.
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
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">51C</td>
                <td className="py-2 pr-4">Contracting NCO</td>
                <td className="py-2">None</td>
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
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">5711</td>
                <td className="py-2 pr-4">CBRN Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">7257</td>
                <td className="py-2 pr-4">Air Traffic Controller</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">4341</td>
                <td className="py-2 pr-4">Combat Correspondent</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">3451</td>
                <td className="py-2 pr-4">Financial Management</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0511</td>
                <td className="py-2 pr-4">MAGTF Planning</td>
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
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">46Q</td>
                <td className="py-2 pr-4">Public Affairs Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">46R</td>
                <td className="py-2 pr-4">Broadcast Journalist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">12D</td>
                <td className="py-2 pr-4">Diver</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">68B/C/F/L/N/U</td>
                <td className="py-2 pr-4">Medical specialties</td>
                <td className="py-2 font-mono">Most also require ST:101</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* GT 105+ */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          GT 105+ (Tactical Elite)
        </h3>
        <p className="mt-4 text-text-secondary">
          Special operations and advanced technical roles just below the 110
          line.
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
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">25D</td>
                <td className="py-2">Cyber Network Defender</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0321</td>
                <td className="py-2">Reconnaissance Marine</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0372</td>
                <td className="py-2">Critical Skills Operator (Raiders)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0612</td>
                <td className="py-2">Tactical Switching Operator</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">2671-2676</td>
                <td className="py-2">Cryptologic Linguists</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">7314</td>
                <td className="py-2">UAS Operator</td>
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
                <td className="py-2 pr-4 font-mono">0317</td>
                <td className="py-2 pr-4">Scout Sniper</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0231</td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0241</td>
                <td className="py-2 pr-4">Imagery Analysis Specialist</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">5811</td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0431</td>
                <td className="py-2 pr-4">Logistics/Embarkation</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Air Force equivalents use the General (G) percentile scale: Airborne
          Cryptologic Language Analyst (1A8X1) requires G 72+, Cyber Systems
          Operations (3D0X2) requires G 64+.
        </p>

        {/* GT 80-99 */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          GT 80-99 (Standard Tier)
        </h3>

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
                  GT Required
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">14G</td>
                <td className="py-2 pr-4">
                  Battle Management System Operator
                </td>
                <td className="py-2 font-mono">98</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">91A</td>
                <td className="py-2 pr-4">M1 Abrams Maintainer</td>
                <td className="py-2 font-mono">92</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">91B</td>
                <td className="py-2 pr-4">Wheeled Vehicle Mechanic</td>
                <td className="py-2 font-mono">85</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0811</td>
                <td className="py-2 pr-4">FA Cannoneer</td>
                <td className="py-2 font-mono">90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0311</td>
                <td className="py-2 pr-4">Rifleman</td>
                <td className="py-2 font-mono">80</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">0331</td>
                <td className="py-2 pr-4">Machine Gunner</td>
                <td className="py-2 font-mono">80</td>
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

        {/* GT Requirements for Special Programs */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Requirements for Special Programs
        </h2>
        <p className="mt-4 text-text-secondary">
          An ASVAB GT score of 110 is not just a job requirement. It is the
          regulatory minimum for every path from enlisted to officer. Miss it by
          one point and you are categorically ineligible.
        </p>
        <p className="text-text-secondary">
          AR 135-100 establishes GT 110 as the floor for all officer-producing
          programs. Green to Gold is specifically non-waiverable.
        </p>

        {/* TABLE: Special Program GT Requirements */}
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
                <td className="py-2 pr-4">
                  E-4+, meet physical standards
                </td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Ranger Regiment (Option 40)
                </td>
                <td className="py-2 pr-4 font-mono">
                  110 (competitive)
                </td>
                <td className="py-2 pr-4">GT 105 floor</td>
                <td className="py-2">Rare</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Drill Sergeant
                </td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2 pr-4">E-5+</td>
                <td className="py-2">No</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Recruiter Duty
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
          110. The civilian 18X contract demands the higher threshold.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>
              The GT 110 requirement for Green to Gold is specifically
              non-waiverable per AR 135-100.
            </strong>{" "}
            There is no exception process regardless of GPA, leadership record,
            or other qualifications. If your GT is 109, you are ineligible.
            Period.
          </p>
        </aside>

        <p className="text-text-secondary">
          While Ranger School itself has a GT 105 floor, competitive Option 40
          contracts (which guarantee a shot at the 75th Ranger Regiment)
          typically expect GT 110. Waivers exist in theory but are rare in
          practice.
        </p>
        <p className="text-text-secondary">
          A soldier with GT 101 is locked out of OCS, Green to Gold, WOCS, 18X,
          Drill Sergeant duty, and Recruiter duty simultaneously. That 9-point
          gap closes every advanced career door at once. The good news: 9 points
          is closable with focused preparation through BSEP or Operation Connect
          the Dots.
        </p>
        <p className="text-text-secondary">
          If you need to raise your score, our guide on{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            how to retake the ASVAB
          </Link>{" "}
          covers the full process, including wait times, DEP restrictions, and
          the C-Test formula.
        </p>

        {/* How to Raise Your GT Score */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Raise Your GT Score
        </h2>
        <p className="mt-4 text-text-secondary">
          The Army&apos;s Operation Connect the Dots program proved it: 82% of
          soldiers (37 out of 45) reached GT 110 in just two weeks of intensive
          preparation. Your ASVAB GT score only depends on 3 subtests, so you
          can ignore the other 7 entirely.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Operation Connect the Dots
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              82% success rate
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Duration</p>
            <p className="mt-1 text-sm text-text-secondary">
              2 weeks intensive
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Result</p>
            <p className="mt-1 text-sm text-text-secondary">
              7 soldiers changed MOS
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Two distinct paths depending on your situation.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Pre-Enlistment or Civilian Retake
        </h3>
        <p className="mt-4 text-text-secondary">
          Focus only on Word Knowledge, Paragraph Comprehension, and Arithmetic
          Reasoning. Every minute spent on General Science, Electronics
          Information, or Mechanical Comprehension is a minute wasted for GT
          purposes.
        </p>
        <p className="text-text-secondary">
          <strong>Word Knowledge (WK):</strong> Learn 10-15 new words per day.
          Focus on roots, prefixes, and suffixes so you can decode unfamiliar
          words on test day.
        </p>
        <p className="text-text-secondary">
          <strong>Paragraph Comprehension (PC):</strong> Read short passages
          daily from newspapers, textbooks, or military manuals. After each
          passage, identify the main idea in one sentence. Practice spotting
          author&apos;s purpose and implied meaning.
        </p>
        <p className="text-text-secondary">
          <strong>Arithmetic Reasoning (AR):</strong> This is where most people
          leave the most GT points on the table. Master percentages, ratios,
          fractions, distance/rate/time problems, and basic algebra. Always read
          the problem twice and set up the equation before calculating. See our{" "}
          <Link
            href="/asvab-arithmetic-reasoning-tips"
            className="text-accent hover:text-accent-hover"
          >
            Arithmetic Reasoning tips
          </Link>{" "}
          for a full breakdown.
        </p>
        <p className="text-text-secondary">
          Study at least 30 minutes daily for 4-6 weeks. Take a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            practice test
          </Link>{" "}
          weekly to track progress. A realistic gain is 10-20 GT points in that
          window.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Active Duty (AFCT Pathway)
        </h3>
        <p className="mt-4 text-text-secondary">
          Active duty soldiers do not retake the civilian ASVAB. Instead, you go
          through the AFCT (Armed Forces Classification Test) process:
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Request GT improvement counseling through your chain of command.
          </li>
          <li>
            Enroll in BSEP (Basic Skills Education Program) at your
            installation&apos;s education center.
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
          Soldiers effectively have 3 AFCT attempts in their career (excluding
          the initial enlistment test). Do not schedule the AFCT until your
          predictor consistently shows you are ready.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>
              Your most recent ASVAB/AFCT score replaces your previous score, not
              the highest.
            </strong>{" "}
            If you score lower on a retake, the lower score counts. Never retest
            without thorough preparation and a diagnostic showing clear
            improvement.
          </p>
        </aside>

        {/* TABLE: Improvement Path Comparison */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Path
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Timeline
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Cost
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Score Risk
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Self-study (pre-enlistment)
                </td>
                <td className="py-2 pr-4">4-6 weeks</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2 pr-4">Score replacement if retaking</td>
                <td className="py-2">High with discipline</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  BSEP (active duty)
                </td>
                <td className="py-2 pr-4">4-6 weeks</td>
                <td className="py-2 pr-4">Free (Army program)</td>
                <td className="py-2 pr-4">Score replacement on AFCT</td>
                <td className="py-2">High (structured)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Operation Connect the Dots
                </td>
                <td className="py-2 pr-4">2 weeks</td>
                <td className="py-2 pr-4">Army-funded</td>
                <td className="py-2 pr-4">Score replacement on AFCT</td>
                <td className="py-2">82% reached 110+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For the complete retake process including wait periods and the C-Test
          formula, see our{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB retake guide
          </Link>
          . For a full study plan covering all subtests, check out{" "}
          <Link
            href="/how-to-study-for-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            how to study for the ASVAB
          </Link>
          .
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the highest possible GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No official ceiling. The practical maximum is approximately 145-147
              for Army and 151 for Marines. Scores above 130 place you in
              roughly the top 7%.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the GT score the same as the AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. AFQT is a percentile (1-99) for enlistment eligibility. GT is
              a composite standard score for job eligibility. Different formulas:
              AFQT = AR + MK + 2(VE), GT = VE + AR. See{" "}
              <Link
                href="/asvab-scores-explained"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB scores explained
              </Link>{" "}
              for the full breakdown.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What 3 subtests make up the GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Word Knowledge (WK), Paragraph Comprehension (PC), and Arithmetic
              Reasoning (AR). WK and PC combine into VE, then GT = VE + AR. The
              other 7 subtests do not affect GT.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Air Force use GT scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Not exactly. The Air Force uses &ldquo;General (G),&rdquo; the
              same VE + AR formula expressed as a percentile (0-99). An Air Force
              G of 72 means 72nd percentile, roughly equivalent to Army GT
              115-120. See the{" "}
              <Link
                href="/air-force-afsc-list"
                className="text-accent hover:text-accent-hover"
              >
                Air Force AFSC list
              </Link>{" "}
              for specific requirements.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB just to raise my GT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, but your most recent score replaces the previous, even if
              lower. Wait periods: 1 month, 1 month, then 6 months between
              subsequent attempts. Active duty soldiers use the AFCT. See our{" "}
              <Link
                href="/how-to-retake-the-asvab"
                className="text-accent hover:text-accent-hover"
              >
                retake guide
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need for Special Forces?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Civilian 18X contract: GT 110 plus CO (Combat) score of 100.
              Active duty soldiers pursuing SF through the SFAS pipeline only
              need GT 100.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How fast can I raise my GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Four to six weeks of focused study on WK, PC, and AR is realistic
              for a 10-20 point gain. Operation Connect the Dots achieved 82%
              success in just 2 weeks. Take a{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                free practice test
              </Link>{" "}
              to benchmark where you stand.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do Marine Corps and Army GT scores use the same formula?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Both use GT = VE + AR. Some sources incorrectly claim Marines
              add MC (Mechanical Comprehension). That is wrong. Formulas are
              identical, though MOS thresholds differ.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Ready to check your GT score?{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              Use our free ASVAB calculator
            </Link>{" "}
            to enter your subtest scores and see exactly which jobs and programs
            you qualify for.
          </p>
        </aside>

        {/* CTA */}
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
