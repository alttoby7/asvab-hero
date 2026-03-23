import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Score Ranges: What Each Score Level Unlocks | ASVAB Hero",
  description:
    "Understand what each ASVAB score range unlocks: AFQT categories, branch minimums, composite scores, and real job examples across all 6 branches.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-score-ranges",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ASVAB Score Ranges: What Every Score Level Actually Unlocks",
  description:
    "Understand what each ASVAB score range unlocks: AFQT categories, branch minimums, composite scores, and real job examples across all 6 branches.",
  url: "https://asvabhero.com/asvab-score-ranges",
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
  dateModified: "2026-03-22",
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
        text: "A 50+ AFQT (Category IIIA) is the practical target that unlocks bonuses and most jobs across all branches. A 65+ gives you a strong negotiating position with your recruiter and opens nearly every available MOS, rating, or AFSC. For elite roles like cyber, intel, and special operations, aim for 85+.",
      },
    },
    {
      "@type": "Question",
      name: "What is the highest possible ASVAB score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AFQT maxes out at 99 because it is a percentile, not a raw score. A 99 means you scored as well as or better than 99% of the 1997 reference group. There is no single maximum ASVAB score since each subtest and composite has its own scale.",
      },
    },
    {
      "@type": "Question",
      name: "Does my ASVAB score affect my rank or pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your ASVAB determines enlistment eligibility and job qualification only. Starting rank depends on education level, prior service, and other factors. Pay is determined by rank and time in service, not test scores.",
      },
    },
    {
      "@type": "Question",
      name: "Can a GED holder join the military?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with higher AFQT minimums. Most branches require a 50 for GED holders (compared to 31-36 for diploma holders). Air Force and Space Force require a 65. Completing 15+ college credit hours at the 100-level or higher reclassifies you as a diploma holder, dropping your minimum to match.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Space Force have its own ASVAB requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Space Force minimum is 36 AFQT, identical to the Air Force. But nearly every Space Force job is technical, so most roles practically require a 70+ AFQT and specific composite scores. Space Systems Operations needs a GC of 60. Intelligence roles need GC 72.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my score goes down on a retake?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your most recent score replaces all prior scores. There is no keeping your old score as a backup. Only retake when practice tests consistently show you performing at your target level.",
      },
    },
  ],
};

export default function ASVABScoreRangesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Score Ranges: What Every Score Level Actually Unlocks
        </h1>

        <p className="mt-4 text-text-secondary">
          Two people both passed the ASVAB. One scored a 35, the other a 72. Same test, completely different futures. The 35 qualifies for roughly 20 Army jobs. The 72 qualifies for 150+. Your <strong>ASVAB score range</strong> changes everything about your military career before it even starts.
        </p>

        <p className="text-text-secondary">
          This article breaks down what different ASVAB score ranges mean in practice. Not how scores are calculated (that&apos;s covered in our <Link href="/asvab-scores-explained">ASVAB scores explained</Link> and <Link href="/asvab-scoring-and-results">scoring and results</Link> guides). Instead, you&apos;ll see AFQT categories, branch minimums for diploma and GED holders, composite score ranges, real job examples at each level, and how to move up.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Already have your scores? Plug them into our <Link href="/calculator">free ASVAB calculator</Link> to see which jobs you qualify for across all 6 branches.
          </p>
        </aside>

        <p className="text-text-secondary">
          Below: the six AFQT tiers that legally define your eligibility, what each branch actually requires, the composite score walls that block specific jobs, and a concrete plan for moving up a tier.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories: The Six Tiers That Define Your Military Future
        </h2>

        <p className="mt-4 text-text-secondary">
          Congress literally caps how many low-scoring recruits each branch can accept. Your AFQT category is not just a label on a score report. It is a legal classification written into federal law (10 USC 520).
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Percentile Range</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Share of Test-Takers</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Unlocks</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-400">I</td>
                <td className="py-2 pr-4">93&ndash;99</td>
                <td className="py-2 pr-4">Top 7%</td>
                <td className="py-2">First pick on virtually every job. Maximum enlistment bonuses. Officer-track signal. Intel, cyber, and special ops units actively recruit from this pool.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">II</td>
                <td className="py-2 pr-4">65&ndash;92</td>
                <td className="py-2 pr-4">Next 28%</td>
                <td className="py-2">Highly qualified across all branches. Full bonus eligibility. Nearly every MOS, rating, and AFSC open.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">IIIA</td>
                <td className="py-2 pr-4">50&ndash;64</td>
                <td className="py-2 pr-4">Next 15%</td>
                <td className="py-2">Above average. Bonus eligible. Most jobs available. This is the threshold where branches start treating you as a competitive candidate.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">IIIB</td>
                <td className="py-2 pr-4">31&ndash;49</td>
                <td className="py-2 pr-4">Next 19%</td>
                <td className="py-2">Meets most branch minimums but limited bonuses. Fewer job options. Recruiters have less flexibility to negotiate on your behalf.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">IV</td>
                <td className="py-2 pr-4">10&ndash;30</td>
                <td className="py-2 pr-4">Next 21%</td>
                <td className="py-2">Legally capped at 4% of annual accessions per branch. Acceptance is rare. Severely limited job options even when accepted.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">V</td>
                <td className="py-2 pr-4">1&ndash;9</td>
                <td className="py-2 pr-4">Bottom 9%</td>
                <td className="py-2">Permanently ineligible. No waiver process exists.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category V (1-9)</p>
            <p className="mt-1 text-sm text-text-secondary">Permanent disqualification, no exceptions</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category IV (10-30)</p>
            <p className="mt-1 text-sm text-text-secondary">4% statutory cap, rarely accepted even within that limit</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category IIIB (31-49)</p>
            <p className="mt-1 text-sm text-text-secondary">In the door, but limited leverage and job selection</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category IIIA (50+)</p>
            <p className="mt-1 text-sm text-text-secondary">The real threshold where bonuses, jobs, and recruiter attention all open up</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category II (65+)</p>
            <p className="mt-1 text-sm text-text-secondary">Nearly everything available across every branch</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category I (93+)</p>
            <p className="mt-1 text-sm text-text-secondary">Top 7%, maximum incentives, officer-track signal</p>
          </div>
        </div>

        <p className="text-text-secondary">
          The 50-point threshold is the real dividing line. Category IIIA and above unlocks enlistment incentives across all branches. The Army offers enlistment bonuses specifically for scores exceeding 50. The Air Force approves over 90% of recruits scoring 50+. Below 50, you are working uphill.
        </p>

        <p className="text-text-secondary">
          In December 2025, the DoD Inspector General found that the Army and Navy had been miscounting Category IV recruits (report DODIG-2026-031). Both services used improved prep-course retest scores instead of initial results when tallying their Category IV numbers. The result: both branches exceeded the statutory 4% cap without obtaining the required Secretary of Defense waiver or notifying Congress. If the military takes these ASVAB score ranges seriously enough to trigger an IG investigation, so should you.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Category V (1-9) is a permanent disqualifier with no waiver process. Category IV (10-30) acceptance is rare even within the 4% cap, and both Army and Navy are under scrutiny for exceeding it.
          </p>
        </aside>

        <p className="text-text-secondary">
          The AFQT itself comes from just four of the nine subtests. The formula is straightforward:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) combines your Word Knowledge and Paragraph Comprehension scores. Because VE is doubled, verbal skills carry 50% of the weight in determining your AFQT. More on why that matters for score improvement in a later section. For a full breakdown of how the formula works, see our <Link href="/asvab-scores-explained">ASVAB scores explained</Link> guide.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Branch Minimum Scores: Diploma vs GED Requirements for 2026
        </h2>

        <p className="mt-4 text-text-secondary">
          A high school graduate needs a 36 to join the Air Force. A GED holder needs a 65. That is not a small gap. It is the difference between Category IIIB and Category II performance, nearly 30 percentile points apart.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Diploma Minimum</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">GED Minimum</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Marine Corps</td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These are floors, not targets. The average enlistee scores somewhere between 55 and 65. Scoring the bare minimum means limited job choices and zero negotiating leverage with your recruiter. A 31 gets you into the Army. It does not get you the Army job you want.
        </p>

        <p className="text-text-secondary">
          Understanding ASVAB score ranges at the branch level matters because each service applies these floors differently. The Army fills the most slots and accepts the broadest range. The Air Force and Space Force are the most selective, rejecting GED holders below 65 outright.
        </p>

        <p className="text-text-secondary">
          There is an escape hatch for GED holders. Complete 15 or more college credit hours at the 100-level or higher, and you are reclassified as a diploma holder for enlistment purposes. That drops the Air Force minimum from 65 to 36 and the Space Force minimum from 65 to 36.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you are a GED holder targeting Air Force or Space Force, completing 15 credit hours at a community college may be faster and more reliable than studying to score a 65+ on the ASVAB. Two semesters of gen-ed courses gets you there.
          </p>
        </aside>

        <p className="text-text-secondary">
          Space Force uses the same minimums as the Air Force (36 diploma, 65 GED), but most Space Force roles practically need a 70+ AFQT. Space Systems Operations requires a GC composite of 60. Intelligence roles require GC 72. Cyber Transport Systems needs an Electronics composite of 55. The minimum is a technicality for a branch where nearly every job is technical.
        </p>

        <p className="text-text-secondary">
          Minimums get you in the door. Composite scores decide your job.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Composite and Line Score Ranges by Branch
        </h2>

        <p className="mt-4 text-text-secondary">
          You scored a 72 AFQT. You walk into the recruiter&apos;s office expecting to pick any job you want. Then you find out your GT is only 98 and you need 110 for cyber, intel, and Special Forces. Welcome to the composite score wall.
        </p>

        <p className="text-text-secondary">
          The military uses a two-gate system. Gate 1 is your AFQT: can you enlist? Gate 2 is your composite scores: what can you do once you&apos;re in? A high AFQT with low composites means you qualify to serve but qualify for very few of the jobs you actually want.
        </p>

        <p className="text-text-secondary">
          Each branch builds composite scores from different subtest combinations. These ASVAB score ranges operate on entirely separate scales from the AFQT percentile.
        </p>

        <p className="text-text-secondary">
          <strong>Army: 10 Line Scores.</strong> The Army has the most complex composite system. GT (VE+AR) gates intel, cyber, Special Forces, and OCS. ST (GS+VE+MK+MC) gates medical and technical roles. EL (GS+AR+MK+EI) gates electronics. Most high-demand MOSs require hitting thresholds on two or three composites simultaneously.
        </p>

        <p className="text-text-secondary">
          <strong>Marine Corps: 3 Composites.</strong> Marines simplify to GT (VE+AR), MM (GS+AS+MK+MC), and EL (GS+AR+MK+EI). Fewer composites, but higher minimums for specialized roles. GT 110 is the cutoff for air traffic control and several aviation MOSs.
        </p>

        <p className="text-text-secondary">
          <strong>Air Force and Space Force: MAGE System.</strong> Four composites converted to percentiles (0-99) instead of raw totals: Mechanical (GS+MC+2AS), Administrative (NO+CS+VE), General (AR+VE), and Electronics (GS+AR+MK+EI). Note that AS is doubled in the Mechanical composite, unlike Army or Navy formulas.
        </p>

        <p className="text-text-secondary">
          <strong>Navy and Coast Guard: Rating-Specific Formulas.</strong> Each Navy rating (job) has its own qualifying formula. Most ratings offer multiple pathways, which gives you flexibility if your strengths are lopsided. Hospital Corpsman can be reached through VE+AR+MK+GS &gt;= 209 or MK+GS+2VE &gt;= 209. If you are strong in one area, there is often a second formula that plays to your strengths. The Coast Guard uses similar formulas but with fewer ratings and generally higher competition for slots.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT score (VE+AR) appears across Army, Navy, and Marines. If you are undecided on branch, maximizing your VE and AR covers the most ground. Those two subtests feed into more composites than any other pair.
          </p>
        </aside>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">GT Range</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What Opens Up</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">Below 90</td>
                <td className="py-2">Limited to basic combat arms and support roles</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">90&ndash;99</td>
                <td className="py-2">Standard jobs across most branches</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">100&ndash;109</td>
                <td className="py-2">Mid-tier technical and administrative roles</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">110+</td>
                <td className="py-2">Elite and restricted roles: Special Forces, cyber, intel, OCS, WOCS, recruiting, contracting, public affairs, signal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For full composite formulas and job lookup tables by branch, check the <Link href="/asvab-score-chart">ASVAB score chart</Link>.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Real Jobs at Every Score Level
        </h2>

        <p className="mt-4 text-text-secondary">
          Stop wondering &ldquo;is my score good enough.&rdquo; Here are real jobs with real score requirements across four branches.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">MOS</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Score Requirements</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">11B</td>
                <td className="py-2 pr-4">Infantryman</td>
                <td className="py-2 font-mono">CO 87</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">35F</td>
                <td className="py-2 pr-4">Intelligence Analyst</td>
                <td className="py-2 font-mono">ST 101</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">68W</td>
                <td className="py-2 pr-4">Combat Medic</td>
                <td className="py-2 font-mono">ST 101 + GT 107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">17C</td>
                <td className="py-2 pr-4">Cyber Operations Specialist</td>
                <td className="py-2 font-mono">GT 110 + ST 112 + ICTL 60</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">12D</td>
                <td className="py-2 pr-4">Diver</td>
                <td className="py-2 font-mono">GM 98 + GT 107 + ST 106</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Notice the jump from Infantry (one composite, low threshold) to Cyber Operations (three simultaneous requirements). The 17C MOS is the most demanding in the Army. You need to excel across verbal reasoning, math, science, and mechanical comprehension all at once.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Score Requirements</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">HM</td>
                <td className="py-2 pr-4">Hospital Corpsman</td>
                <td className="py-2 font-mono">VE+AR+MK+GS &gt;= 209</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">ET</td>
                <td className="py-2 pr-4">Electronics Technician</td>
                <td className="py-2 font-mono">AR+MK+EI+GS &gt;= 222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">NUC</td>
                <td className="py-2 pr-4">Nuclear Field</td>
                <td className="py-2 font-mono">VE+AR+MK+MC &gt;= 252 (or NAPT pathway)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">SO</td>
                <td className="py-2 pr-4">Navy SEAL</td>
                <td className="py-2 font-mono">AR+VE &gt;= 110 and MC+EI &gt;= 110 (or VE+MK+MC+CS &gt;= 220)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Navy Nuclear Field requires composite scores averaging 63 per subtest across four areas. The alternative NAPT pathway still demands a combined score of 290+ with the supplementary test scoring at least 55. Average qualifying candidates score in the 260-270 range on the primary formulas.
        </p>

        <p className="text-text-secondary">
          Navy SEALs have a dual-pathway composite requirement plus the separate PST (Physical Screening Test). Meeting the ASVAB threshold is only the first filter. The PST standards (500yd swim, pushups, situps, pullups, 1.5mi run) eliminate far more candidates than the ASVAB does.
        </p>

        <p className="text-text-secondary">
          <strong>Marine Corps highlights:</strong> 0311 Rifleman requires GT 90. 7257 Air Traffic Controller requires GT 110. 5939 Aviation Communications Tech requires EL 115 and GT 105, a dual composite gate.
        </p>

        <p className="text-text-secondary">
          <strong>Air Force highlights:</strong> 1B4X1 Cyber Warfare Operations requires G 64. 1A8X1 Cryptologic Language Analyst requires G 72, the highest General composite requirement in the Air Force, plus a separate DLAB score. 4A2X1 Biomedical Equipment Tech requires E 70 and M 60, a dual composite gate that demands strength in both electronics and mechanical aptitude.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Dual composite requirements are the real gatekeepers. A high GT will not save you if your EL or ST is low. Before you study, look up your target job&apos;s specific composite formula and work backwards from there. Our <Link href="/calculator">ASVAB calculator</Link> shows you exactly which composites you hit and miss.
          </p>
        </aside>

        <p className="text-text-secondary">
          If your scores fall short of your target job, the next section shows how to close the gap. For complete job lists with every score requirement, see our <Link href="/army-mos-list">Army MOS list</Link> and <Link href="/usmc-mos-list">USMC MOS list</Link>.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Move Up a Score Range
        </h2>

        <p className="mt-4 text-text-secondary">
          Moving from Category IIIB (31-49) to Category IIIA (50+) is the single most valuable jump you can make. It unlocks bonuses, expands your job list by dozens of options, and changes how recruiters treat you. Everything below 50 is uphill. Everything above it opens doors.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">31-49 to 50+</p>
            <p className="mt-1 text-sm text-text-secondary">Unlocks enlistment bonuses, expands MOS options, gains recruiter flexibility</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">50-64 to 65+</p>
            <p className="mt-1 text-sm text-text-secondary">Opens nearly every job, maximizes bonus eligibility, strong negotiating position</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Below 90 GT to 110+ GT</p>
            <p className="mt-1 text-sm text-text-secondary">Unlocks Special Forces, cyber, intel, OCS, WOCS, and 10+ high-promotion career fields</p>
          </div>
        </div>

        <p className="text-text-secondary">
          VE is your highest-leverage study target. Because VE is doubled in the AFQT formula, improving your Word Knowledge or Paragraph Comprehension by 5 standard score points adds 10 to your raw AFQT. Improving AR or MK by 5 points adds only 5. Dollar for dollar, hour for hour, vocabulary study is the best investment you can make. Allocate at least half your study time there.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Weeks</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Focus</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Daily Activity</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Expected Impact</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1&ndash;2</td>
                <td className="py-2 pr-4">Diagnostic + weakness ID</td>
                <td className="py-2 pr-4">Take a full practice test, identify your 2-3 weakest AFQT subtests</td>
                <td className="py-2">Baseline established</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3&ndash;4</td>
                <td className="py-2 pr-4">Targeted drills</td>
                <td className="py-2 pr-4">15-20 new vocabulary words/day for WK, word problem setups for AR, formula drills for MK</td>
                <td className="py-2">Subtest scores begin climbing</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">5&ndash;6</td>
                <td className="py-2 pr-4">Timed practice tests</td>
                <td className="py-2 pr-4">Full-length timed tests every 3-4 days, review every missed question</td>
                <td className="py-2">5-15 percentile point improvement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For composite score improvement, work backwards from your target job. If you need Army EL (GS+AR+MK+EI), prioritize GS and EI study since AR and MK already count toward your AFQT and you are likely studying them already. Subtests that overlap between AFQT and your target composite give you double returns. This strategy applies across all ASVAB score ranges, whether you are climbing from Category IIIB to IIIA or pushing from II into I.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your AFQT score jumps 20+ points within 6 months, expect a confirmation test (C-test). You can take it immediately with no waiting period. It is not an accusation. It is a standard verification step. Be ready to perform consistently.
          </p>
        </aside>

        <p className="text-text-secondary">
          Retake timing follows the 1-1-6 rule: 1 month after the initial test, 1 month for a second retest, then 6 months between every attempt after that. Do not retake until your practice tests show consistent improvement at the level you are targeting. A wasted retake starts another clock.
        </p>

        <p className="text-text-secondary">
          Take a <Link href="/practice-test">practice test</Link> for your baseline score, then build your plan with our <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Score Ranges and Career Impact After Enlistment
        </h2>

        <p className="mt-4 text-text-secondary">
          Your ASVAB does not expire once you raise your right hand. Scores stay valid indefinitely for reclassification and retraining. That GT score you ignored at 18 can block your career at 25.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GT 110+ required for</p>
            <p className="mt-1 text-sm text-text-secondary">OCS, WOCS, Special Forces, cyber, intel, recruiting, contracting, public affairs, signal</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">No waivers granted</p>
            <p className="mt-1 text-sm text-text-secondary">The GT 110 threshold is absolute for these career fields</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Score validity</p>
            <p className="mt-1 text-sm text-text-secondary">2 years for initial enlistment, indefinitely once serving</p>
          </div>
        </div>

        <p className="text-text-secondary">
          Army soldiers with a GT below 110 are locked out of OCS, WOCS, Special Forces, military intelligence, engineer, recruiting, public affairs, contracting, and signal. These are not just niche specialties. They are the career fields with the highest promotion rates, the best civilian transferability, and the strongest paths to senior leadership.
        </p>

        <p className="text-text-secondary">
          You can retake the ASVAB while enlisted to qualify for different MOSs or retraining programs. Your scores are valid for reclassification regardless of how long ago you tested. Many soldiers discover at the 3-4 year mark that their initial scores block their next career move. Retesting while on active duty follows the same 1-1-6 rule, and your command must approve the request.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Score as high as you can on your first test even if your initial MOS does not require it. Your career goals at 18 will not be your career goals at 25. A high score keeps every door open.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is a good ASVAB score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              A 50+ AFQT (Category IIIA) is the practical target that unlocks bonuses and most jobs across all branches. A 65+ gives you a strong negotiating position with your recruiter and opens nearly every available MOS, rating, or AFSC. For elite roles like cyber, intel, and special operations, aim for 85+.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is the highest possible ASVAB score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The AFQT maxes out at 99 because it is a percentile, not a raw score. A 99 means you scored as well as or better than 99% of the 1997 reference group. There is no single &ldquo;maximum ASVAB score&rdquo; since each subtest and composite has its own scale.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Does my ASVAB score affect my rank or pay?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Your ASVAB determines enlistment eligibility and job qualification only. Starting rank depends on education level, prior service, and other factors. Pay is determined by rank and time in service, not test scores.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Can a GED holder join the military?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, with higher AFQT minimums. Most branches require a 50 for GED holders (compared to 31-36 for diploma holders). Air Force and Space Force require a 65. Completing 15+ college credit hours at the 100-level or higher reclassifies you as a diploma holder, dropping your minimum to match.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Does the Space Force have its own ASVAB requirements?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Space Force minimum is 36 AFQT, identical to the Air Force. But nearly every Space Force job is technical, so most roles practically require a 70+ AFQT and specific composite scores. Space Systems Operations needs a GC of 60. Intelligence roles need GC 72.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What happens if my score goes down on a retake?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Your most recent score replaces all prior scores. There is no keeping your old score as a backup. Only retake when practice tests consistently show you performing at your target level.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Still unsure where you stand? Use our <Link href="/calculator">free ASVAB calculator</Link> to check your scores against every branch and job.
          </p>
        </aside>

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite scores, and every job you qualify for.
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
