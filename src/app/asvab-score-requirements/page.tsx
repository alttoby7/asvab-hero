import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Score Requirements by Branch (2026)",
  description:
    "Every 2026 ASVAB score requirement by branch, from AFQT minimums and GED tiers to composite scores for specific jobs. Find what score you need.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-score-requirements",
  },
};

export default function ASVABScoreRequirementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "ASVAB Score Requirements: Every Branch Minimum, Composite Score, and Career Threshold for 2026",
          description:
            "Every 2026 ASVAB score requirement by branch, from AFQT minimums and GED tiers to composite scores for specific jobs. Find what score you need.",
          url: "https://asvabhero.com/asvab-score-requirements",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-05-13",
          dateModified: "2026-05-13",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What ASVAB score do I need for the Army?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Army requires a minimum AFQT of 31 with a high school diploma or 50 with a GED. Specific jobs have separate composite requirements. For example, Intelligence Analyst (35F) needs ST 101 and GT 107. Infantry (11B) requires CO 87. Use the calculator to check your composites against all Army MOSs.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Air Force minimum is AFQT 36 with a diploma, 65 with a GED. Air Force jobs use the MAGE composite system (Mechanical, Administrative, General, Electronics). Many technical and cyber roles require General scores of 60 or higher. Space Force uses the same minimums and system.",
              },
            },
            {
              "@type": "Question",
              name: "Can I join the military with a GED?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, but most branches require an AFQT of 50 instead of the diploma minimum (31-36). The Coast Guard requires 50. Earning 15 college credits at the 100-level or higher reclassifies you as Tier I, dropping your requirement to diploma-level minimums.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between AFQT and composite scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your AFQT is a single percentile (1-99) calculated from 4 subtests (WK, PC, AR, MK) that determines enlistment eligibility. Composite scores combine different subtest groups and determine which specific jobs you qualify for. You need both: AFQT to enlist, composites to get your job.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB after enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, through the AFCT (Armed Forces Classification Test). Active-duty and reserve members can retake after a 6-month wait with commander approval. Your new scores replace all previous scores, even if they are lower. Programs like BSEP (free, average 19-point GT increase) help you prepare.",
              },
            },
            {
              "@type": "Question",
              name: "What is the GT score and why does it matter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT equals VE plus AR. It is the most important composite for career advancement: MOS reclassification, warrant officer packets (GT 110 non-waiverable), OCS eligibility, and Special Forces (GT 110 plus CO 100). Active-duty soldiers can raise GT through BSEP or OASC, then retake via the AFCT.",
              },
            },
            {
              "@type": "Question",
              name: "What happens if I score below the minimum AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can retake the ASVAB. The first retake is available after 1 month, the second after another month, and every attempt after that requires a 6-month wait. Your most recent score replaces all previous scores. Most candidates improve 5-15 points with focused study.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Score Requirements: Every Branch Minimum, Composite Score, and
          Career Threshold for 2026
        </h1>

        <p className="mt-4 text-text-secondary">
          Every military branch publishes a minimum ASVAB score. The problem is
          that different websites report different numbers, and none of them
          explain the part that actually matters: the minimum just gets you in
          the door. Your composite scores determine which jobs you can hold.
        </p>

        <p className="text-text-secondary">
          This page covers every <strong>ASVAB score requirements</strong> gate
          for 2026, from AFQT branch minimums and GED tiers to composite line
          scores, GT thresholds for career advancement, and active-duty retake
          options. Whether you are taking the ASVAB for the first time or
          retaking as active-duty to reclass into a better MOS, plug your scores
          into the{" "}
          <Link href="/calculator">free ASVAB score calculator</Link> to see
          where you stand.
        </p>

        <p className="text-text-secondary">
          Below you will find verified minimums for all six branches, the
          education tier system that changes your required score, a breakdown of
          how composite scores control job access, and a section specifically for
          active-duty members looking to improve their scores through the AFCT.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Section 1: Minimum AFQT Scores by Branch */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum AFQT Scores by Branch (2026)
        </h2>

        <p className="mt-4 text-text-secondary">
          Some prep sites list the Air Force minimum at 31. Others say 36. The
          Coast Guard shows up as 32, 36, or 40 depending on who you ask, the current diploma floor is 32. Here are the verified 2026 AFQT
          minimums for all six branches, broken out by education tier.
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
                <td className="py-2 font-mono">50</td>
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
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These numbers are floors. Scoring a 31 for the Army means you can
          technically enlist, but you will have limited job choices and zero
          leverage when your recruiter starts assigning MOSs. The average
          enlistee scores between 55 and 65. Recruiters at every branch prefer
          candidates well above the minimum because higher scores predict better
          training completion rates.
        </p>

        <p className="text-text-secondary">
          The Navy sits at 35, slightly above the Army and the most common
          source of confusion in score tables. The Marine Corps requires 32 with
          a diploma but rarely accepts GED holders, capping them at 5% of annual
          enlistments. The Air Force and Space Force both require 36, the
          highest diploma-tier minimum among standard enlistment branches. The
          Coast Guard sits lower at 32 but requires 95% of its recruits to
          hold diplomas, making it the most selective branch by education
          credential.
        </p>

        <p className="text-text-secondary">
          Keep in mind that these minimums change based on recruiting needs. In
          2022, the Navy temporarily lowered its minimum to address a recruiting
          shortfall, then raised it back the following year. Always verify
          current numbers with your recruiter or the branch&apos;s official
          website within 30 days of your test date.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GED holders with 15 or more college credits at the 100-level or
            higher are reclassified as Tier I, the same category as diploma
            holders. That drops the required AFQT back to diploma-level minimums
            for every branch.
          </p>
        </aside>

        <p className="text-text-secondary">
          The Space Force uses the same AFQT threshold as the Air Force (36),
          but with fewer than 500 enlisted slots per year, competitive scores
          typically start at 70. Many Space Force positions require General
          composite scores of 60&ndash;72 just to apply.
        </p>

        <p className="text-text-secondary">
          For a deeper breakdown of what each AFQT level unlocks, see the{" "}
          <Link href="/afqt-score">full AFQT score guide</Link> and the{" "}
          <Link href="/asvab-score-ranges">score ranges breakdown</Link>.
        </p>

        <section className="my-8 not-prose">
          <EmailCapture
            headline="Want to know exactly which jobs your score unlocks?"
            subhead="Free 6-page PDF plus a 5-email crash course on AFQT, composites, and which subtests matter for your branch."
            cta="Email me the plan"
            tag="asvab-score-requirements"
          />
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section 2: AFQT Categories */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories and What They Unlock
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT percentile does more than determine whether you can enlist.
          It slots you into a category that controls bonus eligibility, recruiter
          priority, and how many jobs you can access. Understanding these
          categories is essential for interpreting your ASVAB score requirements
          in practical terms.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Category
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Percentile
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Means in Practice
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
                  Top tier. First pick of jobs, bonuses, and training slots.
                  Recruiters compete for you.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">
                  II
                </td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">
                  Highly qualified. Full access to nearly every MOS, AFSC, and
                  rating. Strong bonus eligibility.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  IIIA
                </td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">
                  Above average. Most jobs open. Some bonus eligibility depending
                  on branch and MOS.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  IIIB
                </td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">
                  Meets minimum for most branches. Limited job selection and
                  minimal bonus access.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IV
                </td>
                <td className="py-2 pr-4 font-mono">10&ndash;30</td>
                <td className="py-2">
                  Restricted by law. Congress caps Category IV at 4% of each
                  branch&apos;s annual enlistments (10 U.S.C. 520).
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  V
                </td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">
                  Permanent disqualifier. No branch, no waiver, no exceptions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The jump from Category IIIB to IIIA at the 50-point mark is the
          single biggest quality-of-life threshold in the enlistment process.
          Below 50, your options narrow and recruiters have less incentive to
          work with you on job selection. Above 50, you unlock the majority of
          available MOSs and become eligible for enlistment bonuses that can
          exceed $50,000 in high-demand fields.
        </p>

        <p className="text-text-secondary">
          Category II (65&ndash;92) is where the real leverage lives. At this
          tier, you qualify for virtually every enlisted position across all
          branches. Signing bonuses for critical MOSs are most accessible here.
          Department of Defense data shows that high-scoring recruits are more
          than twice as likely to move into leadership positions within five
          years.
        </p>

        <p className="text-text-secondary">
          Category IV enlistees exist, but federal law limits them to 4% of
          annual accessions per branch. In practice, most branches fill that cap
          with waivers for otherwise exceptional candidates. Category V is a
          permanent bar with no appeal process.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you are sitting in the low 40s, a targeted 4&ndash;6 week study
            push focused on verbal skills (WK and PC) can push you past 50 and
            into Category IIIA. That one jump opens more doors than any other
            single score improvement. See{" "}
            <Link href="/what-is-a-good-asvab-score">
              what counts as a good score
            </Link>{" "}
            for more context.
          </p>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* Section 3: Diploma vs. GED */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Diploma vs. GED: How Education Tier Changes Your Required Score
        </h2>

        <p className="mt-4 text-text-secondary">
          A GED does not disqualify you from military service, but it raises the
          AFQT bar at every branch. If you hold a GED, your minimum ASVAB score
          needed for enlistment is significantly higher than for diploma holders.
        </p>

        <p className="text-text-secondary">
          The military uses a tiering system to classify recruits by education
          credential. Tier I includes high school diploma holders and GED
          holders with 15 or more college credits. Tier II covers GED holders
          without college credits. Tier III is for applicants with no diploma or
          equivalency.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Tier I (Diploma / GED + 15 Credits)
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Tier II (GED Only)
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
                <td className="py-2 font-mono">50</td>
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
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The gap ranges from 15 to 29 points depending on the branch. For the
          Army, a GED holder needs to score 19 points higher (50 vs. 31). For
          the Coast Guard, the gap is 18 points (50 vs. 32). That is a
          meaningful difference in study time and test performance.
        </p>

        <p className="text-text-secondary">
          Each branch handles GED applicants differently in practice. The Air
          Force is the hardest to enter without a diploma, with over 90% of
          approved applicants scoring 50 or higher regardless of education tier.
          The Army is the most flexible, with some recruiting years allowing up
          to 15% of recruits to hold a GED. The Coast Guard requires 95% of its
          recruits to hold diplomas. The Marine Corps caps GED enlistments at 5%.
        </p>

        <p className="text-text-secondary">
          Navy GED applicants face an additional hurdle: three community
          references in addition to the AFQT 50 requirement. This is unique
          among all branches and adds a documentation step that diploma holders
          skip entirely.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Earning 15 college credits at the 100-level or higher, roughly one
            community college semester, reclassifies you as Tier I. That drops
            your required AFQT by 11 to 19 points depending on branch. If you
            have a GED and your score falls short, this is often the fastest
            fix. Some branches also grant advanced enlistment rank for college
            credits: the Coast Guard awards E-2 for 30 credits and E-3 for 60.
          </p>
        </aside>

        <p className="text-text-secondary">
          For a structured approach to raising your score, start with the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Section 4: Composite Scores */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Composite Scores: The Real Gatekeepers for Military Jobs
        </h2>

        <p className="mt-4 text-text-secondary">
          Meeting the AFQT minimum gets you through the front door. Composite
          scores decide which rooms you are allowed to enter.
        </p>

        <p className="text-text-secondary">
          Think of enlistment as a two-gate system. Gate one is your AFQT
          percentile, the number every branch checks first. Gate two is a set of
          composite scores, each calculated from different combinations of ASVAB
          subtests, that control which specific jobs you qualify for. This
          two-gate structure is what makes ASVAB score requirements more complex
          than a single number.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          How Each Branch Calculates Composites
        </h3>

        <p className="mt-4 text-text-secondary">
          <strong>Army:</strong> 10 line scores (GT, CL, CO, EL, FA, GM, MM,
          OF, SC, ST). Each combines 2&ndash;4 subtests. GT (VE + AR) is the
          most referenced for intelligence, technical, and leadership MOSs. CL
          (VE + AR + MK) covers administrative and clerical roles. CO (AR + AS +
          MC) gates combat positions. See the full{" "}
          <Link href="/army-mos-list">Army MOS list</Link> with score
          requirements.
        </p>

        <p className="text-text-secondary">
          <strong>Marine Corps:</strong> 4 composites (GT, MM, EL, CL). Same
          concept as Army, fewer categories. Each maps to a family of MOSs. The
          Marines calculate GT as VE + AR (same formula as Army). Full list at
          the <Link href="/usmc-mos-list">USMC MOS guide</Link>.
        </p>

        <p className="text-text-secondary">
          <strong>Air Force and Space Force:</strong> MAGE system (Mechanical,
          Administrative, General, Electronics). These are percentile-based
          scores (1&ndash;99), unlike Army and Marine raw sums. A General (G)
          score of 64 means you performed at the 64th percentile on the subtests
          feeding that composite. Browse all AFSCs in the{" "}
          <Link href="/air-force-afsc-list">Air Force AFSC list</Link>.
        </p>

        <p className="text-text-secondary">
          <strong>Navy and Coast Guard:</strong> Job-specific composite formulas.
          Each of the Navy&apos;s 80+ ratings has its own unique subtest
          combination. Hospital Corpsman needs different scores than Nuclear
          Electronics Technician. The Navy Nuclear Power Program requires
          AR+MK+EI+GS totaling 252 or higher (or qualification through the
          NAPT). Check requirements in the{" "}
          <Link href="/navy-ratings-list">Navy ratings list</Link>.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          What Competitive Scores Look Like
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Required Composites
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Intelligence Analyst (35F)
                </td>
                <td className="py-2 pr-4">Army</td>
                <td className="py-2 font-mono">ST 101, GT 107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Special Forces (18X)
                </td>
                <td className="py-2 pr-4">Army</td>
                <td className="py-2 font-mono">GT 110, CO 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Cyber Operations (17C)
                </td>
                <td className="py-2 pr-4">Army</td>
                <td className="py-2 font-mono">GT 110, ST 112</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army Medic (68W)
                </td>
                <td className="py-2 pr-4">Army</td>
                <td className="py-2 font-mono">ST 101, GT 107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Nuclear Electronics Tech
                </td>
                <td className="py-2 pr-4">Navy</td>
                <td className="py-2 font-mono">
                  AR+MK+EI+GS &ge; 252 (or NAPT)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Cyber Warfare (1B4)
                </td>
                <td className="py-2 pr-4">Air Force</td>
                <td className="py-2 font-mono">G 64</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Infantry (0311)
                </td>
                <td className="py-2 pr-4">Marines</td>
                <td className="py-2 font-mono">GT 80</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Notice the pattern: the most competitive and highest-paying MOSs
          cluster around GT 107&ndash;112 and ST 101&ndash;112. Combat roles
          have lower composite thresholds but still require specific score
          combinations. A candidate scoring the bare AFQT minimum will likely
          qualify only for a handful of combat support or administrative
          positions.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A high AFQT does not guarantee high composites. If you scored an
            80th percentile AFQT but your Electronics Information and General
            Science scores are low, you are locked out of every electronics and
            technical job across every branch. The AFQT and composite scores
            test overlapping but different subtest combinations.
          </p>
        </aside>

        <p className="text-text-secondary">
          Use the{" "}
          <Link href="/asvab-line-score-calculator">line score calculator</Link>{" "}
          to check your composites against job requirements, or plug your
          subtest scores into the{" "}
          <Link href="/calculator">ASVAB score calculator</Link> to see every
          job you qualify for across all six branches.
        </p>

        <p className="text-text-secondary">
          For a full explanation of how the scoring system works, see{" "}
          <Link href="/asvab-scores-explained">ASVAB scores explained</Link>.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Section 5: GT Score */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT Score: Why It Matters More Than Any Other Composite
        </h2>

        <p className="mt-4 text-text-secondary">
          Of all the composite scores across every branch, GT controls more
          career doors than any other single number. For active-duty service
          members looking at ASVAB score requirements for career advancement, GT
          is the score that matters most.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
          <br />
          (Verbal Expression + Arithmetic Reasoning)
        </div>

        <p className="text-text-secondary">
          GT is the gatekeeper for intelligence jobs, technical MOSs, Special
          Forces, warrant officer programs, and officer commissioning. If you are
          active-duty and want to advance beyond your current MOS, GT is almost
          certainly the score you need to raise.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 95
            </span>
            <span className="text-sm text-text-secondary">
              Entry-level technical MOSs, some admin roles
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 100
            </span>
            <span className="text-sm text-text-secondary">
              Most technical and skilled MOSs
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 107
            </span>
            <span className="text-sm text-text-secondary">
              Intelligence Analyst (35F), Army Medic (68W)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 110
            </span>
            <span className="text-sm text-text-secondary">
              Special Forces (18X), Warrant Officer, OCS (non-waiverable per AR
              135-100)
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          The GT 110 threshold deserves emphasis. AR 135-100 establishes GT 110
          as the qualifying minimum for any Army officer-producing program. It is
          non-waiverable for warrant officer candidates. No exceptions, no
          waivers, no alternatives. If your GT is 109, your warrant officer
          packet will not be accepted.
        </p>

        <p className="text-text-secondary">
          This matters beyond the Army too. The Marine Corps uses the same GT
          formula (VE + AR) for its intelligence and technical MOSs. The Air
          Force General (G) composite, while calculated differently, tests a
          similar aptitude blend. Across branches, the pattern holds: verbal
          reasoning plus math reasoning equals access to the highest-value
          career fields.
        </p>

        <p className="text-text-secondary">
          For enlisted members considering warrant officer or commissioning
          paths, GT 110 is the non-negotiable starting line. An E-6 with GT 105
          cannot submit a warrant officer packet regardless of years of service,
          leadership evaluations, or recommendations. The score is the first
          filter, and the system does not flex on it. That is why programs like
          BSEP exist: to give motivated soldiers a concrete path past the
          threshold.
        </p>

        <p className="text-text-secondary">
          For active-duty soldiers, GT is also the score that blocks or enables
          MOS reclassification. Want to move from an admin MOS to intelligence?
          You need GT 107. Want Special Forces? GT 110 plus CO 100. The{" "}
          <Link href="/gt-score-calculator">GT score calculator</Link> shows
          exactly where you stand, and the{" "}
          <Link href="/gt-score">full GT score guide</Link> covers every
          threshold and formula.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Since GT = VE + AR, improving your verbal and math reasoning skills
            moves the two subtests that matter most for both your AFQT and your
            GT. Studying for one improves both.
          </p>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* Section 6: Already Enlisted */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Already Enlisted? How to Improve Your Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Your initial ASVAB scores are not permanent. Active-duty and reserve
          members can retake the test to unlock better job options, submit
          reclassification packets, or qualify for career-advancing programs.
          Most guides focus exclusively on enlistment minimums. This matters to
          thousands of service members stuck in MOSs they want to leave.
        </p>

        <p className="text-text-secondary">
          The retake is called the{" "}
          <strong>AFCT (Armed Forces Classification Test)</strong>. It covers
          the same content as the ASVAB and produces the same line scores. The
          key differences: you need commander approval, there is a 6-month
          minimum wait between attempts, and your new scores replace your old
          ones even if they are lower.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The AFCT score replacement is permanent. If you scored GT 105 on
            your original ASVAB and retake for GT 98, your official score is now
            98. Do not retake without preparation.
          </p>
        </aside>

        <p className="text-text-secondary">
          The best preparation path for GT improvement is{" "}
          <strong>BSEP (Basic Skills Education Program)</strong>, a free,
          teacher-facilitated course available to active-duty Army soldiers. BSEP
          focuses specifically on the verbal and math skills that feed the GT
          composite.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Duration
            </span>
            <span className="text-sm text-text-secondary">
              3&ndash;6 weeks, full-time
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Cost
            </span>
            <span className="text-sm text-text-secondary">
              Free (Army-funded)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Avg GT Improvement
            </span>
            <span className="text-sm text-text-secondary">19 points</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Success Rate
            </span>
            <span className="text-sm text-text-secondary">
              91% of enrollees raised their GT score
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 110+ Rate
            </span>
            <span className="text-sm text-text-secondary">
              61% of enrollees reached GT 110 or higher
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Those numbers come from the 2022 cohort at Rhine Ordnance Barracks:
          127 service members enrolled, 115 raised their GT, and 77 achieved GT
          110 or above. At Fort Leonard Wood, two soldiers improved by 30 or
          more points. The Indiana National Guard&apos;s version of the program
          reported a 98% success rate.
        </p>

        <p className="text-text-secondary">
          If BSEP is not available at your installation, the{" "}
          <strong>OASC (Online Academic Skills Course)</strong> offers a free,
          self-paced alternative with an average 13-point GT improvement. OASC
          builds a customized curriculum based on a diagnostic pre-test,
          targeting your specific weak areas rather than covering everything.
        </p>

        <p className="text-text-secondary">
          The path from current score to reclassification:
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Identify your target MOS and its composite score requirements
          </li>
          <li>Compare your current line scores to the requirements</li>
          <li>Enroll in BSEP (if available) or OASC (online)</li>
          <li>
            Request AFCT authorization from your commander (DA Form 4187 for
            Army)
          </li>
          <li>Take the AFCT after completing the prep program</li>
          <li>Submit your reclassification packet with the new scores</li>
        </ol>

        <p className="text-text-secondary">
          At some installations, BSEP enrollment can waive the standard 6-month
          AFCT waiting period, letting you retake sooner. Check with your
          education center.
        </p>

        <p className="text-text-secondary">
          For full details on the retake process, see the{" "}
          <Link href="/afct">AFCT guide</Link>. For BSEP eligibility and
          enrollment, see the <Link href="/bsep">BSEP guide</Link>. And for
          practice before retaking, try the{" "}
          <Link href="/afct-practice-test">free AFCT practice test</Link>.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Section 7: How to Hit the Score You Need */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Hit the Score You Need
        </h2>

        <p className="mt-4 text-text-secondary">
          Knowing your target score is step one. Studying the right subtests is
          step two.
        </p>

        <p className="text-text-secondary">
          The AFQT formula gives verbal skills a built-in advantage:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
          <br />
          VE is doubled. Every VE point = 2 AFQT points.
        </div>

        <p className="text-text-secondary">
          That 2x multiplier makes Word Knowledge and Paragraph Comprehension
          the highest-leverage subtests for anyone trying to raise their AFQT. A
          5-point VE improvement adds 10 raw points to your AFQT calculation.
          The same 5-point gain in AR only adds 5. This is the single most
          efficient study strategy for meeting minimum ASVAB score requirements.
        </p>

        <p className="text-text-secondary">
          <strong>For AFQT improvement:</strong> Start with verbal (WK and PC).
          Then target whichever is weaker between AR and MK. A focused 4&ndash;6
          week study period typically yields a 5 to 15 percentile point
          improvement.
        </p>

        <p className="text-text-secondary">
          <strong>For composite improvement:</strong> Work backwards from your
          target job. Find which subtests feed the required composites. If you
          want Army electronics jobs, study GS and EI. If you want intelligence,
          focus on VE and AR (GT). The{" "}
          <Link href="/asvab-score-chart">ASVAB score chart</Link> maps every
          job to its required composites.
        </p>

        <p className="text-text-secondary">
          <strong>For active-duty retake:</strong> Combine the AFQT strategy
          with composite targeting. BSEP and OASC both focus on the verbal and
          math foundations that drive GT, but you may also need to self-study
          specific technical subtests (EI, GS, MC) depending on your target MOS.
        </p>

        <p className="text-text-secondary">
          Walk through a concrete example. Say your AFQT sits at 44 (Category
          IIIB) and your GT is 98. Your goal is Intelligence Analyst (35F),
          which requires GT 107. You need 9 more GT points, which means
          improving VE, AR, or both. Since VE also doubles into your AFQT,
          studying WK and PC raises both scores simultaneously. Four to six
          weeks of targeted verbal prep could push your AFQT past 50 (into
          Category IIIA) and your GT past 107 in one effort.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do not study all 9 subtests equally. Identify your 2&ndash;3 weakest
            AFQT subtests first, then target the composites for your desired
            job. Take a{" "}
            <Link href="/practice-test">free practice test</Link> to find your
            baseline, then build your plan from there.
          </p>
        </aside>

        <p className="text-text-secondary">
          Use the <Link href="/calculator">calculator</Link> to check which jobs
          your current scores unlock. If you see gaps between where you are and
          where you want to be, the{" "}
          <Link href="/asvab-study-guide">study guide</Link> maps out a
          week-by-week plan.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Section 8: Bottom Line */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Bottom Line
        </h2>

        <p className="mt-4 text-text-secondary">
          ASVAB score requirements work on two levels. The AFQT minimum gets you
          into a branch. Composite scores get you the job you actually want.
          Knowing the difference between these two gates, and which specific
          scores you need for your target career path, is the foundation for
          every decision that follows.
        </p>

        <p className="text-text-secondary">
          For pre-enlistment test-takers: take a{" "}
          <Link href="/practice-test">practice test</Link> to find your
          baseline, focus your study time on verbal skills (the
          highest-leverage subtests), and use the{" "}
          <Link href="/calculator">calculator</Link> to track which jobs open as
          your scores improve. If you have a GED, look into the 15-credit Tier I
          reclassification before assuming you need a 50.
        </p>

        <p className="text-text-secondary">
          For active-duty members: your scores are not locked in. BSEP offers a
          free path to raise your GT by an average of 19 points, and the AFCT
          lets you retake with new composite scores. If a better MOS, warrant
          officer packet, or commissioning program requires a score you do not
          have yet, there is a concrete path to get it.
        </p>

        <p className="text-text-secondary">
          The scores are the starting point. What you do with them is up to you.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ */}
        {/* ---------------------------------------------------------------- */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Army requires a minimum AFQT of 31 with a high school diploma
              or 50 with a GED. Specific jobs have separate composite
              requirements. For example, Intelligence Analyst (35F) needs ST 101
              and GT 107. Infantry (11B) requires CO 87. Use the{" "}
              <Link href="/calculator">calculator</Link> to check your
              composites against all Army MOSs.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Air Force minimum is AFQT 36 with a diploma, 65 with a GED.
              Air Force jobs use the MAGE composite system (Mechanical,
              Administrative, General, Electronics). Many technical and cyber
              roles require General scores of 60 or higher. Space Force uses the
              same minimums and system.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I join the military with a GED?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, but most branches require an AFQT of 50 instead of the
              diploma minimum (31&ndash;36). The Coast Guard requires 50.
              Earning 15 college credits at the 100-level or higher reclassifies
              you as Tier I, dropping your requirement to diploma-level minimums.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between AFQT and composite scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Your AFQT is a single percentile (1&ndash;99) calculated from 4
              subtests (WK, PC, AR, MK) that determines enlistment eligibility.
              Composite scores combine different subtest groups and determine
              which specific jobs you qualify for. You need both: AFQT to
              enlist, composites to get your job.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB after enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, through the AFCT (Armed Forces Classification Test).
              Active-duty and reserve members can retake after a 6-month wait
              with commander approval. Your new scores replace all previous
              scores, even if they are lower. Programs like BSEP (free, average
              19-point GT increase) help you prepare.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the GT score and why does it matter?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT equals VE plus AR. It is the most important composite for
              career advancement: MOS reclassification, warrant officer packets
              (GT 110 non-waiverable), OCS eligibility, and Special Forces (GT
              110 plus CO 100). Active-duty soldiers can raise GT through BSEP
              or OASC, then retake via the AFCT.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if I score below the minimum AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You can retake the ASVAB. The first retake is available after 1
              month, the second after another month, and every attempt after
              that requires a 6-month wait. Your most recent score replaces all
              previous scores. Most candidates improve 5&ndash;15 points with
              focused study.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CTA Box */}
        {/* ---------------------------------------------------------------- */}

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
            ASVAB Score Requirements by Branch
          </h2>
          <ul className="mt-4 space-y-3 text-text-secondary">
            <li>
              <Link
                href="/army-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Army ASVAB scores
              </Link>{" "}, line scores, MOS minimums, and the GT score that gates
              warrant officer and Special Forces.
            </li>
            <li>
              <Link
                href="/navy-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Navy ASVAB scores
              </Link>{" "}, AFQT tiers, rating composites, and the Nuclear Field and
              SEAL pipelines.
            </li>
            <li>
              <Link
                href="/air-force-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Air Force ASVAB scores
              </Link>{" "}, the MAGE composites and which AFSC each one unlocks.
            </li>
            <li>
              <Link
                href="/marines-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Marines ASVAB scores
              </Link>{" "}, the GT formula and line score minimums for every MOS field.
            </li>
            <li>
              <Link
                href="/coast-guard-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Coast Guard ASVAB scores
              </Link>{" "}, rating-specific requirements and the most selective
              enlistment standards of any branch.
            </li>
            <li>
              Targeting a specific job or career advancement? See{" "}
              <Link
                href="/gt-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                GT score requirements
              </Link>
,{" "}
              <Link
                href="/mos-asvab-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                MOS ASVAB score requirements by job
              </Link>
, and{" "}
              <Link
                href="/what-jobs-qualify-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                what jobs your score qualifies you for
              </Link>
              .
            </li>
            <li>
              New to scoring? Start with the{" "}
              <Link
                href="/afqt-score"
                className="text-accent underline hover:text-accent-hover"
              >
                AFQT score guide
              </Link>{" "}
              and the{" "}
              <Link
                href="/asvab-score-ranges"
                className="text-accent underline hover:text-accent-hover"
              >
                score ranges breakdown
              </Link>
, then{" "}
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                take a free practice test
              </Link>{" "}
              to see where you stand.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
