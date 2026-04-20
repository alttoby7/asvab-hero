import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "How ASVAB Scoring Works: AFQT Formula, VE Double-Count, Results Timeline",
  description:
    "AFQT = 2×(WK+PC) + AR + MK → percentile. Word Knowledge counts twice. CAT scores: same day. Paper: 30 days. Every number on your report explained, plus 2026 branch minimums.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-scoring-and-results",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "ASVAB Scoring and Results: What Every Number on Your Score Report Means",
  description:
    "Understand ASVAB scoring and results: AFQT formula with VE double-count, line scores by branch, 2026 minimums, and what to do after testing.",
  url: "https://asvabhero.com/asvab-scoring-and-results",
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
  dateModified: "2026-04-19",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good ASVAB score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 50 AFQT is average. Scoring 60+ (Category IIIA) opens most jobs and bonus eligibility. A 70+ gives strong leverage across all branches. Good depends on your target branch and job. An Army infantryman needs a 31 AFQT. An Air Force cyber operations specialist needs a 72+ with specific MAGE scores.",
      },
    },
    {
      "@type": "Question",
      name: "How is the AFQT score calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AFQT = 2(VE) + AR + MK. VE (Verbal Expression) combines your Word Knowledge and Paragraph Comprehension raw scores into a standard score scaled 20 to 62. VE is doubled, making verbal the highest-leverage study area. The raw total converts to a percentile from 1 to 99 based on the 1997 PAY97 norming study.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between AFQT and line scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your AFQT is a single percentile from 4 subtests that determines enlistment eligibility. Line scores (composites) combine various subtests into branch-specific scores that determine job qualification. AFQT gets you in the door. Composites get you the job you want.",
      },
    },
    {
      "@type": "Question",
      name: "How long are ASVAB scores valid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two years from your test date. After 2 years, you need to retest. Scores used for job qualification follow the same validity window.",
      },
    },
    {
      "@type": "Question",
      name: "Can my ASVAB score go down on a retake?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your most recent score replaces all previous scores. If you retake and score lower, the lower score becomes your official result. Never retake without consistent improvement on practice tests first.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I score below the minimum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You cannot enlist in that branch until you retake and score at or above their minimum AFQT. You can retake after 1 month. You may still qualify for a different branch with a lower minimum while you study.",
      },
    },
    {
      "@type": "Question",
      name: "Does the ASVAB affect my rank or pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your ASVAB determines enlistment eligibility and job qualification only. Starting rank and pay depend on education level, prior service, and your enlistment contract.",
      },
    },
    {
      "@type": "Question",
      name: "What is the C-Test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Confirmation Test triggered when your AFQT jumps 20+ points within 6 months. It verifies the improvement is legitimate. The C-Test is administered at MEPS with no additional waiting period.",
      },
    },
    {
      "@type": "Question",
      name: "Can I see which jobs I qualify for based on my scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use our free ASVAB score calculator to enter your 9 subtest scores and see qualifying jobs across all 6 branches, including AFQT, composites, and current job requirements.",
      },
    },
  ],
};

export default function ASVABScoringAndResultsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          How ASVAB Scoring Works: AFQT Formula, VE Double-Count, Results Timeline
        </h1>

        <VerifiedBlock
          verifiedDate="April 2026"
          sources={[
            { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
          ]}
        >
          <p>
            <strong>AFQT formula:</strong> 2×(WK + PC) + AR + MK → converted
            to a 1–99 percentile. Word Knowledge and Paragraph Comprehension
            count <strong>twice</strong> because they feed the Verbal
            Expression (VE) component. Scores come back <strong>same day</strong>{" "}
            for the computerized (CAT-ASVAB) version, about <strong>30 days</strong>{" "}
            for paper (P&amp;P-ASVAB). Your score report shows the AFQT
            percentile plus all 9 standard subtest scores (20–80) and branch
            composite / line scores. Only the 4 AFQT subtests (AR, WK, PC,
            MK) determine enlistment eligibility; all 9 feed the composites
            that determine which jobs you qualify for.
          </p>
        </VerifiedBlock>

        <p className="mt-4 text-text-secondary">
          You get your score report back and it&apos;s a wall of numbers,
          abbreviations, and Roman numerals that nobody explains. Your recruiter
          glances at it and says &ldquo;you&apos;re good&rdquo; or &ldquo;you
          need to retake,&rdquo; but never walks you through what any of it
          actually means. You&apos;re left Googling abbreviations and still
          confused.
        </p>

        <p className="text-text-secondary">
          Your <strong>ASVAB scoring and results</strong> break down into three
          distinct score types, and each one controls a different gate in your
          military career. This guide covers the AFQT formula where verbal
          counts double, how each branch uses composites differently, branch
          minimums for 2026, score validity and delivery timing, retake rules,
          and next steps. If you already have scores, plug them into our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          to see which jobs you qualify for across all 6 branches.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your ASVAB produces 3 types of scores: 9 subtest standard scores
            (how you performed per section), 1 AFQT percentile (whether you can
            enlist), and 10+ composite scores (which jobs you qualify for). Each
            controls a different gate.
          </p>
        </aside>

        {/* Section 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your Score Report Actually Shows
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score report is a grid of numbers with abbreviations you&apos;ve
          never encountered. This is what each section means.
        </p>

        <p className="text-text-secondary">
          <strong>Your Score Report at a Glance:</strong>
        </p>

        <ol className="my-4 list-decimal space-y-3 pl-6 text-text-secondary">
          <li>
            <strong>AFQT Percentile.</strong> The big number, ranging from 1 to
            99. This single score determines basic enlistment eligibility.
            It&apos;s usually the most prominent number on your report.
          </li>
          <li>
            <strong>AFQT Category.</strong> A Roman numeral from I through V.
            Your tier classification based on your AFQT percentile. Categories I
            through IIIA give you the most options. Category V is a permanent
            disqualifier.
          </li>
          <li>
            <strong>9 Subtest Standard Scores.</strong> Individual section
            scores labeled GS, AR, WK, PC, MK, EI, AS, MC, and AO. Each is
            scaled with a mean around 50 and a standard deviation around 10.
            These are the building blocks for everything else on your report.
          </li>
          <li>
            <strong>Composite/Line Scores.</strong> Ten DoD-standard composites
            calculated by combining specific subtests. These are the scores each
            branch uses to determine which jobs you qualify for. Different
            branches weight them differently.
          </li>
        </ol>

        <p className="text-text-secondary">
          Your recruiter checks the AFQT percentile first. It answers the binary
          question: can this person enlist? The subtest scores and composites
          matter for job selection, and they&apos;re where most of the confusion
          lives. Most people fixate on the AFQT and ignore the composites, which
          is a mistake if you care about your job assignment.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you took the CAT-ASVAB at MEPS, you got a printed score report
            before you left the building. Paper-and-pencil test takers wait days
            to weeks. PiCAT takers get preliminary results but must verify at
            MEPS within 45 days.
          </p>
        </aside>

        <p className="text-text-secondary">
          Your subtest scores are the foundation. The next three sections
          explain what each score type means.
        </p>

        {/* Section 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Standard Scores: Your 9 Subtest Results
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score report lists 9 individual subtest scores. Each one is a
          &ldquo;standard score&rdquo; scaled so the average is roughly 50 and
          about two-thirds of test-takers score between 40 and 60.
        </p>

        <p className="text-text-secondary">
          <strong>Quick interpretation:</strong> Below 40 is below average. 40
          to 60 is the average range. Above 60 is above average (roughly the
          top 16%). Above 70 is well above average (top 2% or so).
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Abbreviation
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What It Measures
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Feeds AFQT?
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  GS
                </td>
                <td className="py-2 pr-4">General Science</td>
                <td className="py-2 pr-4">
                  Physical, earth, and biological sciences
                </td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  AR
                </td>
                <td className="py-2 pr-4">Arithmetic Reasoning</td>
                <td className="py-2 pr-4">Math word problems</td>
                <td className="py-2 font-semibold text-accent">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  WK
                </td>
                <td className="py-2 pr-4">Word Knowledge</td>
                <td className="py-2 pr-4">Vocabulary and word meaning</td>
                <td className="py-2 font-semibold text-accent">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  PC
                </td>
                <td className="py-2 pr-4">Paragraph Comprehension</td>
                <td className="py-2 pr-4">Reading passages and inference</td>
                <td className="py-2 font-semibold text-accent">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  MK
                </td>
                <td className="py-2 pr-4">Mathematics Knowledge</td>
                <td className="py-2 pr-4">Algebra and geometry concepts</td>
                <td className="py-2 font-semibold text-accent">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  EI
                </td>
                <td className="py-2 pr-4">Electronics Information</td>
                <td className="py-2 pr-4">Electrical circuits and systems</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  AS
                </td>
                <td className="py-2 pr-4">Auto &amp; Shop Information</td>
                <td className="py-2 pr-4">Automotive and shop practices</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  MC
                </td>
                <td className="py-2 pr-4">Mechanical Comprehension</td>
                <td className="py-2 pr-4">Gears, levers, pulleys, force</td>
                <td className="py-2">No</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  AO
                </td>
                <td className="py-2 pr-4">Assembling Objects</td>
                <td className="py-2 pr-4">
                  Spatial reasoning and visualization
                </td>
                <td className="py-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Only 4 of the 9 subtests feed the AFQT: AR, WK, PC, and MK. The other
          5 don&apos;t affect whether you can enlist. But they heavily affect
          which jobs you qualify for through composite scores.
        </p>

        <p className="text-text-secondary">
          A 55 in Word Knowledge and a 38 in Electronics Information? Your
          enlistment eligibility is fine (WK feeds AFQT), but you may be locked
          out of electronics-related jobs across every branch (EI feeds those
          composites).
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Standard scores are NOT percentiles. A standard score of 50 means
            you scored at the average, but that&apos;s different from a 50th
            percentile AFQT. The AFQT uses its own conversion formula.
            Don&apos;t confuse the two.
          </p>
        </aside>

        <p className="text-text-secondary">
          Your subtest scores are the raw ingredients. The AFQT is the first
          recipe that matters.
        </p>

        {/* Section 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The AFQT: The Formula, the Double-Count, and What Your Percentile
          Means
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT comes from only 4 of 9 subtests. One component, verbal,
          counts double. This changes how you should study.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          VE = WK + PC (raw scores combined, then converted to a standard score
          scaled 20&ndash;62)
          <br />
          AFQT Raw = 2(VE) + AR + MK
          <br />
          AFQT Raw is then converted to a percentile (1&ndash;99)
        </div>

        <p className="text-text-secondary">
          <strong>The double-counting leverage, with a worked example:</strong>
        </p>

        <p className="text-text-secondary">
          Start with VE = 55, AR = 52, MK = 48.
          <br />
          AFQT raw = 2(55) + 52 + 48 = 210.
        </p>

        <p className="text-text-secondary">
          Now bump VE by 5 points to 60: 2(60) + 52 + 48 = 220. That&apos;s a
          10-point raw gain from a 5-point VE improvement.
        </p>

        <p className="text-text-secondary">
          Apply the same 5-point gain to AR instead: 2(55) + 57 + 48 = 215.
          That&apos;s only a 5-point raw gain.
        </p>

        <p className="text-text-secondary">
          The takeaway: a 5-point improvement in VE produces double the AFQT
          impact of the same improvement in AR or MK. Verbal is the
          highest-leverage area on the entire test.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 5-point VE gain equals a 10-point AFQT raw gain. No other subtest
            has this multiplier. If you need to raise your AFQT, start with
            vocabulary and reading comprehension. Check our{" "}
            <Link
              href="/asvab-study-guide"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB study guide
            </Link>{" "}
            for targeted verbal strategies.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>What the percentile means.</strong> Your AFQT is expressed as
          a percentile from 1 to 99. A score of 60 means you outperformed 60%
          of the reference group. That reference group comes from a 1997 norming
          study of roughly 6,000 18-to-23-year-olds (the PAY97 cohort).
          You&apos;re compared to that fixed cohort, not to whoever took the
          test this month.
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
                  Practical Impact
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
                  First pick of jobs, bonuses, special programs
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">
                  II
                </td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">
                  Full access to nearly all jobs and incentives
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  IIIA
                </td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">
                  Above average. Strong position for most roles
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  IIIB
                </td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">
                  Meets minimum for most branches. Fewer bonus and job options
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IVA
                </td>
                <td className="py-2 pr-4 font-mono">21&ndash;30</td>
                <td className="py-2">
                  Legally restricted. Congress caps Cat IV enlistments at 4%
                  annually (10 U.S.C. 520)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IVB
                </td>
                <td className="py-2 pr-4 font-mono">16&ndash;20</td>
                <td className="py-2">Same legal restriction as IVA</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IVC
                </td>
                <td className="py-2 pr-4 font-mono">10&ndash;15</td>
                <td className="py-2">Same legal restriction as IVA</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  V
                </td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">
                  Permanently ineligible. No branch, no waiver
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Categories I through IIIA give you leverage: broader MOS choices,
          signing bonus eligibility, special operations pathways, and priority
          scheduling. Category IIIB gets you through the door with limited
          options. Category IV is legally capped at 4% of annual enlistments
          across all branches, and Category V is a permanent bar from military
          service. No waiver, no exception, no appeal.
        </p>

        <p className="text-text-secondary">
          The PAY97 norming cohort is fixed, so percentiles don&apos;t shift
          year to year. A 65 today means the same thing it meant in 2010.
        </p>

        <p className="text-text-secondary">
          Your AFQT determines IF you enlist. The next section covers the scores
          that determine WHERE you work.
        </p>

        {/* Section 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Composite and Line Scores: How Each Branch Picks Your Job
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT gets you through the front door. Composite scores decide
          which rooms you enter. Think of it as a two-gate system: Gate 1 is
          AFQT (enlistment eligibility), Gate 2 is composites (job
          qualification). Passing Gate 1 with a high AFQT does not guarantee
          you pass Gate 2 for your target job.
        </p>

        <p className="text-text-secondary">
          Your <strong>ASVAB scoring and results</strong> report shows 10
          DoD-standard composites. Each combines 2 to 4 subtests into a single
          score. Each branch takes those composites and applies its own system.
        </p>

        <p className="text-text-secondary">
          <strong>Army (10 Line Scores).</strong> GT, CL, CO, EL, FA, GM, MM,
          OF, SC, ST. Each MOS requires minimum scores in specific line scores.
          GT (General Technical = AR + VE) is the most common gatekeeper.
          Intelligence, cyber, and technical jobs typically require GT scores of
          105 or above. Other key formulas: CL (Clerical = VE + AR + MK), EL
          (Electronics = GS + AR + MK + EI), and ST (Skilled Technical = GS +
          VE + MK + MC).
        </p>

        <p className="text-text-secondary">
          <strong>Marines (3 Composites).</strong> GT, MM, EL. Same concept as
          the Army but with fewer categories. Each composite maps to a family of
          MOSs. Marine GT uses the same formula as Army GT (AR + VE). MM
          (Mechanical Maintenance) and EL (Electronics) gate most technical and
          maintenance MOSs.
        </p>

        <p className="text-text-secondary">
          <strong>Air Force and Space Force (MAGE System).</strong> Mechanical
          (M), Administrative (A), General (G), Electronics (E). These are
          percentile-based scores from 0 to 99, not standard scores like the
          Army and Marines use. Space Force adopted the same MAGE system.
          Example: General (G) combines VE + AR, while Electronics (E) combines
          AR + MK + EI + GS.
        </p>

        <p className="text-text-secondary">
          <strong>Navy and Coast Guard (Job-Specific Formulas).</strong> Each of
          80+ Navy ratings has its own subtest combination formula. Hospital
          Corpsman (HM) uses GS + MK + VE. Nuclear Electronics Technician
          requires AR + MK + EI + GS with a combined minimum of 252. The Coast
          Guard follows a similar job-specific model with fewer ratings.
          Assembling Objects (AO) feeds Navy composites exclusively and does not
          affect any other branch&apos;s scoring.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A high AFQT does NOT guarantee high composites. You can score an
            80th percentile AFQT but have low Electronics Information and
            General Science, locking you out of every electronics and technical
            job across every branch. AFQT and composites are independent gates.
          </p>
        </aside>

        <p className="text-text-secondary">
          Plug your 9 subtest scores into our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          to see your composites and which jobs you qualify for across all 6
          branches. To look up score requirements for specific jobs, see the{" "}
          <Link
            href="/asvab-score-chart"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score chart
          </Link>
          .
        </p>

        {/* Section 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2026 Branch Minimums and What Higher Scores Unlock
        </h2>

        <p className="mt-4 text-text-secondary">
          Every branch publishes a minimum AFQT for enlistment. Meeting it means
          you can technically enlist. But minimum is not competitive, and the
          gap between &ldquo;eligible&rdquo; and &ldquo;competitive&rdquo; is
          where your job options live.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  HS Diploma Minimum
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

        <p className="text-text-secondary">
          GED holders face higher thresholds across all branches. If you have a
          GED, earning 15 or more college credits can reclassify you at the
          diploma tier, dropping your minimum significantly.
        </p>

        <p className="text-text-secondary">
          <strong>
            What higher ASVAB scoring and results actually unlock:
          </strong>
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>31&ndash;49 (Cat IIIB).</strong> Gets you through the door
            at most branches. Limited job selection, fewer signing bonuses, and
            restricted access to special programs.
          </li>
          <li>
            <strong>50&ndash;64 (Cat IIIA).</strong> Above average. Opens most
            standard jobs and qualifies you for some signing bonuses and
            enlistment incentives.
          </li>
          <li>
            <strong>65&ndash;92 (Cat II).</strong> Full job access, bonus
            eligibility, special programs, and priority for competitive MOSs.
            This is the tier where special operations pipelines (Army Ranger,
            Air Force TACP, Navy SEAL challenge contracts), language analyst
            positions, and cyber warfare jobs open up.
          </li>
          <li>
            <strong>93+ (Cat I).</strong> Top priority for everything. First
            pick of jobs, programs, and duty stations.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Space Force technically requires only a 36, but most Space Force
            jobs require MAGE scores that effectively demand a 60 to 72+ AFQT.
            The minimum gets you eligible; the composites filter you out if your
            subtests don&apos;t match.
          </p>
        </aside>

        <p className="text-text-secondary">
          Category IV waivers exist in theory, but branches rarely grant them
          outside wartime surges. If you score in Cat IV, a retake is almost
          always the better path than pursuing a waiver.
        </p>

        <p className="text-text-secondary">
          Scoring above 50 puts you in a meaningfully better position than
          someone sitting at the minimum. That gap widens with every 10 points.
        </p>

        {/* Section 7 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          When You Get Your Scores and How Long They Last
        </h2>

        <p className="mt-4 text-text-secondary">
          When you receive your <strong>ASVAB scoring and results</strong>{" "}
          depends on which version of the test you took.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Test Version
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Where Taken
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  When You Get Scores
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CAT-ASVAB
                </td>
                <td className="py-2 pr-4">MEPS</td>
                <td className="py-2">Immediately, printed before you leave</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Paper-and-Pencil
                </td>
                <td className="py-2 pr-4">MET site</td>
                <td className="py-2">Days to weeks</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PiCAT
                </td>
                <td className="py-2 pr-4">Remote/home</td>
                <td className="py-2">
                  Preliminary results immediately, must verify at MEPS within 45
                  days
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CEP ASVAB
                </td>
                <td className="py-2 pr-4">High school</td>
                <td className="py-2">
                  Recruiter gets preliminary AFQT within 72 hours via MIRS
                  system
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>PiCAT details.</strong> The PiCAT is an unproctored
          preliminary test you take remotely. Your scores are provisional until
          you complete a verification test at MEPS. If your verification scores
          are close to your PiCAT scores, the PiCAT stands. You have 45 days
          from PiCAT completion to verify, or your scores expire and you take
          the full CAT-ASVAB.
        </p>

        <p className="text-text-secondary">
          <strong>CEP (high school) details.</strong> The CEP ASVAB taken in
          high school counts for enlistment if you were in 11th grade or above
          and within the 2-year validity window. The CEP does NOT count as your
          required initial MEPS test. You&apos;ll still process through MEPS
          when you enlist. The upside: the high school ASVAB doesn&apos;t count
          against your retest limit, so you can retake within 30 days when you
          meet a recruiter.
        </p>

        <p className="text-text-secondary">
          <strong>Score validity.</strong> All ASVAB scores are valid for 2
          years from your test date. After 2 years, you need a fresh test.
          Planning to enlist in 18 months? Your current scores will cover you.
          Three years out? Don&apos;t bother testing now. The 2-year clock
          starts on the date you sat for the test, not the date you received
          results or enlisted.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your recruiter sees your preliminary AFQT within 72 hours through
            the MIRS (Military Information and Retrieval System), even before
            you receive the full score report.
          </p>
        </aside>

        <p className="text-text-secondary">
          If your scores aren&apos;t where you need them, you have options.
        </p>

        {/* Section 8 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What to Do Next: Retakes, Strategy, and Your Job Search
        </h2>

        <p className="mt-4 text-text-secondary">
          You have your <strong>ASVAB scoring and results</strong>. Now
          you&apos;re on one of three paths: your scores qualify you for the job
          you want, your scores are close but not there, or your scores need
          significant improvement.
        </p>

        <p className="text-text-secondary">
          <strong>Retake waiting periods:</strong>
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              1st retake
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              1 month after initial test
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              2nd retake
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              1 month after 1st retake
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              3rd+ retakes
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              6 months between each subsequent attempt
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>The most-recent-score rule.</strong> Your most recent score
          completely replaces all previous scores. This is not a &ldquo;take the
          highest&rdquo; system. If you scored a 72 and retake for a 58, your
          official AFQT is now 58. Never retake unless practice tests
          consistently show improvement over your current score.
        </p>

        <p className="text-text-secondary">
          <strong>The C-Test trigger.</strong> If your AFQT jumps 20 or more
          points within 6 months, the system flags it and you&apos;ll take a
          Confirmation Test (C-Test) at MEPS. The C-Test verifies the
          improvement is legitimate. There&apos;s no additional waiting period.
          If your C-Test confirms the gain, your higher score stands. If it
          doesn&apos;t, you keep the C-Test score.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The 6-month wall after your 3rd attempt is real. If you&apos;ve
            already used two retakes, study extensively before attempt 3.
            Burning it on a marginal improvement means waiting half a year for
            another shot.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>If your scores qualify you for the job you want:</strong>
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Plug your 9 subtest scores into the{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              free ASVAB score calculator
            </Link>{" "}
            to see every job you qualify for across all 6 branches.
          </li>
          <li>
            Research specific MOSs, AFSCs, or ratings that match your composites
            and your interests.
          </li>
          <li>
            Walk into your recruiter meeting already knowing what you qualify
            for. That puts you in a stronger negotiating position.
          </li>
        </ol>

        <p className="text-text-secondary">
          <strong>If you need to retake:</strong>
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Start with verbal (WK + PC) because of the 2x AFQT multiplier.</li>
          <li>Target your weakest remaining AFQT subtest (AR or MK).</li>
          <li>
            Study for 4 to 6 weeks. A focused study period typically yields a 5
            to 15 percentile point improvement.
          </li>
          <li>
            Benchmark with our{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              practice test
            </Link>{" "}
            before scheduling your retake.
          </li>
        </ol>

        <p className="text-text-secondary">
          Your ASVAB scores tell you where you stand right now, not where
          you&apos;re stuck forever. With a clear target and the right study
          plan, you can move the numbers that matter most.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Scoring and Results FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A 50 AFQT is average. Scoring 60+ (Category IIIA) opens most jobs
              and bonus eligibility. A 70+ gives strong leverage across all
              branches. &ldquo;Good&rdquo; depends on your target branch and
              job. An Army infantryman needs a 31 AFQT. An Air Force cyber
              operations specialist needs a 72+ with specific MAGE scores.
              Define your goal first, then evaluate your score against it. For a
              full breakdown by branch and job type, see{" "}
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
              How is the AFQT score calculated?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT = 2(VE) + AR + MK. VE (Verbal Expression) combines your Word
              Knowledge and Paragraph Comprehension raw scores into a standard
              score scaled 20 to 62. VE is doubled, making verbal the
              highest-leverage study area. The raw total converts to a percentile
              from 1 to 99 based on the 1997 PAY97 norming study.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between AFQT and line scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Your AFQT is a single percentile from 4 subtests that determines
              enlistment eligibility. Line scores (composites) combine various
              subtests into branch-specific scores that determine job
              qualification. AFQT gets you in the door. Composites get you the
              job you want.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long are ASVAB scores valid?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Two years from your test date. After 2 years, you need to retest.
              Scores used for job qualification follow the same validity window.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can my ASVAB score go down on a retake?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Your most recent score replaces all previous scores. If you
              retake and score lower, the lower score becomes your official
              result. Never retake without consistent improvement on practice
              tests first.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if I score below the minimum?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You cannot enlist in that branch until you retake and score at or
              above their minimum AFQT. You can retake after 1 month. You may
              still qualify for a different branch with a lower minimum while
              you study.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the ASVAB affect my rank or pay?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Your ASVAB determines enlistment eligibility and job
              qualification only. Starting rank and pay depend on education
              level, prior service, and your enlistment contract.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the C-Test?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A Confirmation Test triggered when your AFQT jumps 20+ points
              within 6 months. It verifies the improvement is legitimate. The
              C-Test is administered at MEPS with no additional waiting period.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I see which jobs I qualify for based on my scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Use our{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                free ASVAB score calculator
              </Link>{" "}
              to enter your 9 subtest scores and see qualifying jobs across all 6
              branches, including AFQT, composites, and current job requirements.
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
