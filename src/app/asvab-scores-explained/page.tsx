import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AFQTFormulaExplorer from "@/components/scores-explained/AFQTFormulaExplorer";
import AFQTCategoryLadder from "@/components/scores-explained/AFQTCategoryLadder";
import BranchCompositeHeatmap from "@/components/scores-explained/BranchCompositeHeatmap";
import ScoreImpactSimulator from "@/components/scores-explained/ScoreImpactSimulator";

export const metadata: Metadata = {
  title: "ASVAB Scores Explained: AFQT, Composites & Branch Minimums",
  description:
    "Learn how ASVAB scores work: the AFQT formula, composite line scores by branch, 2026 minimums, and which subtests matter most. Free interactive tools included.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-scores-explained",
  },
};

export default function ASVABScoresExplainedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "ASVAB Scores Explained: What Your Numbers Actually Mean",
          description:
            "Comprehensive guide to understanding ASVAB scores including AFQT percentiles, composite line scores, branch minimums, and study strategies.",
          url: "https://asvabhero.com/asvab-scores-explained",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-17",
          dateModified: "2026-03-17",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a good ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 50 AFQT is average. A 60+ puts you in Category IIIA, which opens most jobs and bonus eligibility across all branches. Scoring 70+ gives you strong leverage for your preferred MOS and enlistment incentives.",
              },
            },
            {
              "@type": "Question",
              name: "Can you fail the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "There's no pass/fail. But scoring below your target branch's minimum AFQT (as low as 31 for Army/Navy, up to 36 for Air Force/Space Force) means you can't enlist with that branch. Scoring below 10 (Category V) disqualifies you from all branches.",
              },
            },
            {
              "@type": "Question",
              name: "How long are ASVAB scores valid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ASVAB scores are valid for 2 years from your test date. After that, you need a fresh test to enlist.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between AFQT and line scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your AFQT is a single percentile (1-99) from 4 subtests that determines enlistment eligibility. Line scores (composites) combine various subtests and determine which specific jobs you qualify for. You need both.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. After 1 month you can retake, then 1 month again, then 6 months for every attempt after that. Your newest score replaces all previous scores.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Scores Explained: What Your Numbers Actually Mean
        </h1>

        <p className="mt-4 text-text-secondary">
          You took the ASVAB. You got your scores back. Now you&apos;re staring at a page full of numbers, abbreviations, and categories that nobody bothered to explain. Your recruiter says your score is &ldquo;good&rdquo; or tells you to retake it, but you still don&apos;t know what any of it means.
        </p>
        <p className="text-text-secondary">
          The official resources aren&apos;t much help either. The DoD website gives you definitions written for policy analysts, not for someone trying to figure out if they can get the job they want.
        </p>
        <p className="text-text-secondary">
          Here&apos;s what we&apos;ll cover: how your <strong>ASVAB scores</strong> break down into the AFQT percentile that determines basic eligibility, the 9 individual subtests, the composite and line scores each branch uses to assign jobs, minimum score requirements by branch, retake rules, and a study strategy that targets the areas with the biggest payoff.
        </p>
        <p className="text-text-secondary">
          If you already have your scores, plug them into our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free ASVAB score calculator
          </Link>{" "}
          to see which jobs you qualify for across all 6 branches.
        </p>

        {/* ─── AFQT SCORE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Your AFQT Score: The One Number Every Branch Cares About
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score sheet has a lot of numbers on it. Only one of them decides whether you can enlist at all.
        </p>
        <p className="text-text-secondary">
          The <strong>AFQT</strong> (Armed Forces Qualification Test) score is a percentile ranking from 1 to 99. A score of 60 means you performed better than 60% of the reference population. Every branch uses this single number as the first gate: meet the minimum or you don&apos;t get in.
        </p>
        <p className="text-text-secondary">
          Your AFQT isn&apos;t pulled from all 9 subtests. It uses exactly 4: Arithmetic Reasoning (AR), Mathematics Knowledge (MK), Word Knowledge (WK), and Paragraph Comprehension (PC).
        </p>
        <p className="text-text-secondary">The formula:</p>
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>
        <p className="text-text-secondary">
          VE stands for <strong>Verbal Expression</strong>, a combined score derived from your WK and PC raw scores. The scoring system adds your WK raw score and PC raw score together, then converts the total through a standard table into a VE standard score ranging from 20 to 62.
        </p>
        <p className="text-text-secondary">
          Here&apos;s the part most people miss: VE is <strong>doubled</strong> in the formula. A 5-point improvement in your VE score adds 10 raw points to your AFQT calculation. No other subtest has that kind of leverage.
        </p>
        <p className="text-text-secondary">
          Walk through a real example. Say your scores look like this: VE = 55, AR = 52, MK = 48.
        </p>
        <div className="my-3 rounded-lg bg-navy p-3 font-mono text-sm text-text-primary">
          <p>2(55) + 52 + 48 = <strong>210</strong></p>
          <p className="mt-1 text-text-tertiary">
            Bump VE to 60: 2(60) + 52 + 48 = <strong>220</strong> (+10 from verbal alone)
          </p>
        </div>
        <p className="text-text-secondary">
          The same 5-point gain in AR would only add 5 raw points. This 2x multiplier makes verbal prep the single most efficient use of your study time if you need a higher AFQT.
        </p>
        <p className="text-text-secondary">
          The raw total gets converted to a percentile based on the <strong>1997 norming study</strong> (the Profile of American Youth), a nationally representative sample of 18-to-23-year-olds. The reference group is nearly 30 years old and hasn&apos;t been updated. Your percentile compares you to that 1997 cohort, not to current test-takers.
        </p>
        <p className="text-text-secondary">
          Only 4 of your 9 subtests feed the AFQT. The other 5 (General Science, Electronics Information, Auto &amp; Shop Information, Mechanical Comprehension, and Assembling Objects) matter for job qualification, not enlistment eligibility.
        </p>

        <AFQTFormulaExplorer />

        {/* ─── AFQT CATEGORIES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories: Where You Land on the Military&apos;s Ranking System
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT percentile doesn&apos;t just tell you whether you can enlist. It slots you into a category that determines your priority for jobs, bonuses, and enlistment slots.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Percentile</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Means</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-mono font-bold text-emerald-400">I</td><td className="py-2 pr-4">93-99</td><td className="py-2">Top tier. First pick of everything.</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-mono font-bold text-emerald-300">II</td><td className="py-2 pr-4">65-92</td><td className="py-2">Highly qualified. Full access to jobs and bonuses.</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-mono font-bold text-sky-400">IIIA</td><td className="py-2 pr-4">50-64</td><td className="py-2">Above average. Strong position for most roles.</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-mono font-bold text-amber-400">IIIB</td><td className="py-2 pr-4">31-49</td><td className="py-2">Meets minimum for most branches. Limited bonus eligibility.</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-mono font-bold text-orange-400">IV</td><td className="py-2 pr-4">10-30</td><td className="py-2">Restricted. Congress caps at 4% of annual enlistments.</td></tr>
              <tr><td className="py-2 pr-4 font-mono font-bold text-red-400">V</td><td className="py-2 pr-4">1-9</td><td className="py-2">Permanent disqualifier. No exceptions.</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Categories I through IIIA put you in a strong negotiating position with access to the widest range of Military Occupational Specialties, signing bonuses, and training programs. Recruiters want you.
        </p>
        <p className="text-text-secondary">
          Category IIIB still gets you through the door, but your options narrow. Category IV is restricted by federal law (10 U.S.C. 520) to no more than 4% of each branch&apos;s annual enlistments. Category V is a permanent disqualifier with no waiver process.
        </p>
        <p className="text-text-secondary">
          <strong>GED holders face higher thresholds.</strong> Most branches require a minimum AFQT of 50 instead of 31-36. The Air Force and Space Force require 65. Earning 15+ college credits can reclassify you at the diploma tier.
        </p>

        <AFQTCategoryLadder />

        {/* ─── 9 SUBTESTS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The 9 ASVAB Subtests and What Each One Measures
        </h2>

        <p className="mt-4 text-text-secondary">
          Every military job traces back to specific subtests. Here are all 9:
        </p>

        <div className="my-4 space-y-2">
          {[
            { code: "GS", name: "General Science", desc: "Physical, earth, and biological sciences", afqt: false },
            { code: "AR", name: "Arithmetic Reasoning", desc: "Math word problems", afqt: true },
            { code: "WK", name: "Word Knowledge", desc: "Vocabulary and word meaning", afqt: true },
            { code: "PC", name: "Paragraph Comprehension", desc: "Reading passages", afqt: true },
            { code: "MK", name: "Mathematics Knowledge", desc: "Algebra and geometry", afqt: true },
            { code: "EI", name: "Electronics Information", desc: "Electrical circuits and systems", afqt: false },
            { code: "AS", name: "Auto & Shop Information", desc: "Automotive and shop practices", afqt: false },
            { code: "MC", name: "Mechanical Comprehension", desc: "Gears, levers, pulleys, force", afqt: false },
            { code: "AO", name: "Assembling Objects", desc: "Spatial reasoning", afqt: false },
          ].map((st) => (
            <div
              key={st.code}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                st.afqt ? "bg-accent-dim border border-accent/20" : "bg-navy"
              }`}
            >
              <span className="w-8 font-mono text-sm font-bold text-accent">{st.code}</span>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-text-primary">{st.name}</span>
                <span className="ml-2 text-xs text-text-tertiary">{st.desc}</span>
              </div>
              {st.afqt && (
                <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                  AFQT
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-text-tertiary">
          Highlighted subtests feed your AFQT. The rest affect composite/line scores for job qualification only. Each subtest produces a standard score (mean ~50, SD ~10).
        </p>
        <p className="mt-3 text-text-secondary">
          Want to see how you&apos;d perform? Try a{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            free practice test
          </Link>{" "}
          to identify your weak spots.
        </p>

        {/* ─── COMPOSITES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Composite Scores and Line Scores: How Branches Pick Your Job
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT gets you through the front door. Your composite scores decide which rooms you&apos;re allowed to enter.
        </p>
        <p className="text-text-secondary">
          Think of it as a two-gate system. Gate one is the AFQT minimum for enlistment. Gate two is a series of composite scores, each calculated from different subtest combinations, that determine which specific jobs you qualify for.
        </p>

        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">Army: 10 Line Scores</h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT, CL, EL, CO, FA, GM, MM, OF, SC, ST. Each combines 2-4 subtests. GT (AR + VE) is most common for intelligence and technical jobs.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">Marines: 4 Composites</h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT, MM, EL, CL. Same concept as Army, fewer categories. Each maps to a family of MOSs.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">Air Force &amp; Space Force: MAGE</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Mechanical (M), Administrative (A), General (G), Electronics (E). Space Force adopted the Air Force system when it split off in 2019.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">Navy &amp; Coast Guard: Job-Specific</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Each of 80+ ratings has its own unique formula. Hospital Corpsman needs different subtests than Nuclear Electronics Technician. Hardest system to navigate without a lookup tool.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          A high AFQT doesn&apos;t guarantee high composites. If you scored an 80th percentile AFQT but your Electronics Information and General Science scores are low, you&apos;re locked out of electronics and technical jobs across every branch.
        </p>

        <BranchCompositeHeatmap />

        {/* ─── BRANCH MINIMUMS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum ASVAB Scores by Branch (2026 Requirements)
        </h2>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Diploma Min</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">GED Min</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-semibold text-text-primary">Army</td><td className="py-2 pr-4 font-mono">31</td><td className="py-2 font-mono">50</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-semibold text-text-primary">Navy</td><td className="py-2 pr-4 font-mono">31</td><td className="py-2 font-mono">50</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-semibold text-text-primary">Marines</td><td className="py-2 pr-4 font-mono">32</td><td className="py-2 font-mono">50</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td><td className="py-2 pr-4 font-mono">36</td><td className="py-2 font-mono">65</td></tr>
              <tr className="border-b border-navy-border/50"><td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td><td className="py-2 pr-4 font-mono">36</td><td className="py-2 font-mono">50</td></tr>
              <tr><td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td><td className="py-2 pr-4 font-mono">36</td><td className="py-2 font-mono">65</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These are <strong>minimums, not competitive scores</strong>. Scoring a 31 for the Army means you can technically enlist, but you&apos;ll have limited job choices and less leverage with your recruiter. The average enlistee scores between 55 and 65.
        </p>
        <p className="text-text-secondary">
          GED holders face higher bars because the military uses education credentials as a predictor of training completion. Earning <strong>15+ college credits</strong> can reclassify you at the diploma tier.
        </p>
        <p className="text-text-secondary">
          Plug your scores into our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free calculator
          </Link>{" "}
          to see exactly which jobs you qualify for.
        </p>

        {/* ─── RETAKING ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Retaking the ASVAB: Wait Times, Rules, and Strategy
        </h2>

        <p className="mt-4 text-text-secondary">
          You got your scores and they&apos;re not where you need them. You can retake the ASVAB, but there are wait periods and a rule that catches people off guard.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">1st</span>
            <span className="text-sm text-text-secondary">1 month after initial test</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">2nd</span>
            <span className="text-sm text-text-secondary">1 month after 1st retake</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">3rd+</span>
            <span className="text-sm text-text-secondary">6 months between each subsequent attempt</span>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Your most recent score completely replaces all previous scores.</strong> If you scored a 72 and retake for a 58, your official score is now 58. You can&apos;t keep the higher number.
        </p>
        <p className="text-text-secondary">
          ASVAB scores stay valid for 2 years. Retake when you&apos;ve studied for 4-6 weeks and practice tests show consistent improvement. Don&apos;t retake just because your recruiter suggested it without a clear reason.
        </p>
        <p className="text-text-secondary">
          Build a study plan with our{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            practice tests
          </Link>{" "}
          or unlock full score tracking with{" "}
          <Link href="/pricing" className="text-accent hover:text-accent-hover">
            ASVAB Hero Pro
          </Link>.
        </p>

        {/* ─── IMPROVING SCORES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Improve Your ASVAB Scores (Based on What Actually Moves the Needle)
        </h2>

        <p className="mt-4 text-text-secondary">
          Study smart. Not every subtest moves your scores equally.
        </p>
        <p className="text-text-secondary">
          <strong>Start with verbal.</strong> Because VE is doubled in the AFQT formula, every point you gain in Word Knowledge or Paragraph Comprehension counts twice. This is the single highest-leverage move you can make.
        </p>
        <p className="text-text-secondary">
          <strong>Then prioritize your weak AFQT subtests.</strong> Bringing a weak AR from 40 to 50 is more achievable and more impactful than pushing a strong MK from 58 to 62.
        </p>
        <p className="text-text-secondary">
          <strong>For composite improvement, work backwards from your target job.</strong> Find which subtests feed your desired MOS composite. If you want an Army electronics job, GS and EI are your study priorities, even if your AFQT is already solid.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <h3 className="font-display text-base font-bold text-text-primary">4-6 Week Study Plan</h3>
          <ul className="mt-2 space-y-1 text-sm text-text-secondary">
            <li><strong>Weeks 1-2:</strong> Take a diagnostic test. Identify your 2-3 weakest subtests.</li>
            <li><strong>Weeks 3-4:</strong> Drill weak areas daily. Flashcards for WK, word problems for AR.</li>
            <li><strong>Weeks 5-6:</strong> Timed practice tests under realistic conditions. Review every wrong answer.</li>
          </ul>
          <p className="mt-2 text-xs text-text-tertiary">
            A focused 4-6 week study period typically yields a 5 to 15 percentile point improvement.
          </p>
        </div>

        <ScoreImpactSimulator />

        <p className="text-text-secondary">
          Take a{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            practice test
          </Link>{" "}
          to find your baseline, then track progress with{" "}
          <Link href="/pricing" className="text-accent hover:text-accent-hover">
            ASVAB Hero Pro
          </Link>.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Scores FAQ
        </h2>

        <div className="mt-4 space-y-6">
          {[
            {
              q: "What is a good ASVAB score?",
              a: "A 50 AFQT is average. A 60+ puts you in Category IIIA, which opens most jobs and bonus eligibility. Scoring 70+ gives you strong leverage for your preferred MOS. \"Good\" depends on your target branch and job, but aim for 50+ at minimum.",
            },
            {
              q: "Is the ASVAB hard?",
              a: "The content covers roughly high school level material. The challenge is breadth: vocabulary, math, science, electronics, mechanics, and spatial reasoning in one sitting. If you graduated high school with decent grades, you can score above minimum thresholds with modest preparation.",
            },
            {
              q: "Can you fail the ASVAB?",
              a: "There's no pass/fail. But scoring below your target branch's minimum AFQT (as low as 31 for Army/Navy, up to 36 for Air Force/Space Force) means you can't enlist. Scoring below 10 (Category V) disqualifies you from all branches.",
            },
            {
              q: "What ASVAB score do I need for a specific job?",
              a: "Each MOS, rating, or AFSC has its own composite score requirements. For example, Army 35F (Intelligence Analyst) requires GT 101+.",
            },
            {
              q: "How long are ASVAB scores valid?",
              a: "2 years from your test date. After that, you need a fresh test to enlist.",
            },
            {
              q: "Can I retake the ASVAB?",
              a: "Yes. After 1 month you can retake, then 1 month again, then 6 months for every attempt after that. Your newest score replaces all previous scores.",
            },
            {
              q: "What's the difference between AFQT and line scores?",
              a: "Your AFQT is a single percentile (1-99) from 4 subtests that determines enlistment eligibility. Line scores combine various subtests and determine which specific jobs you qualify for. You need both.",
            },
            {
              q: "Does the ASVAB score affect my rank or pay?",
              a: "No. Your ASVAB determines enlistment eligibility and job qualification only. Starting rank depends on education level and special programs. Pay follows rank and time in service.",
            },
            {
              q: "What happens if my score goes DOWN on a retake?",
              a: "Your most recent score replaces all prior scores. If you scored 72 and retake for a 58, your official AFQT is now 58. The military does not let you keep the higher number.",
            },
            {
              q: "Is the ASVAB the same as the AFQT?",
              a: "No. The ASVAB is the full test with 9 subtests. The AFQT is a score derived from 4 of those subtests. When someone says \"I got a 70 on the ASVAB,\" they almost always mean their AFQT percentile.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-display text-base font-bold text-text-primary">
                {faq.q}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
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
