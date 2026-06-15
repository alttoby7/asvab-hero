import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import AffiliateBookBlock from "@/components/AffiliateBookBlock";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import DvidsHeroImage from "@/components/DvidsHeroImage";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "ASVAB Scores Explained: AFQT, Line Scores & What They Mean (2026)",
  description:
    "ASVAB scores explained: your AFQT gates enlistment, your line scores gate jobs. What every number on your score sheet means, plus the 2026 branch minimums.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-scores-explained",
  },
};

const faqItems = [
  {
    q: "What is a good ASVAB score?",
    a: "A 50 AFQT is average. A 60+ puts you in Category IIIA, which opens most jobs and bonus eligibility across all branches. Scoring 70+ gives you strong leverage for your preferred MOS. \"Good\" depends on your target branch and job, but aim for 50+ at minimum.",
  },
  {
    q: "Is the ASVAB hard?",
    a: "The content covers roughly high school level material. The challenge is breadth: vocabulary, math, science, electronics, mechanics, and spatial reasoning in one sitting. If you graduated high school with decent grades, you can score above minimum thresholds with modest preparation.",
  },
  {
    q: "Can you fail the ASVAB?",
    a: "There's no pass/fail. But scoring below your target branch's minimum AFQT (31 Army, 32 Marines, 35 Navy, 36 Air Force/Space Force, 32 Coast Guard) means you can't enlist with that branch. Scoring below 10 (Category V) disqualifies you from all branches.",
  },
  {
    q: "What ASVAB score do I need for a specific job?",
    a: "Each job has its own composite/line score requirement, not just an AFQT cutoff. For example, Army 35F (Intelligence Analyst) requires an ST (Skilled Technical) score of 101. Run your subtests through the calculator to see which jobs your composites unlock.",
  },
  {
    q: "How long are ASVAB scores valid?",
    a: "ASVAB scores are valid for 2 years from your test date. After that, you need a fresh test to enlist.",
  },
  {
    q: "Can I retake the ASVAB?",
    a: "Yes. After 1 month you can retake, then 1 month again, then 6 months for every attempt after that. Your newest score replaces all previous scores.",
  },
  {
    q: "What's the difference between AFQT and line scores?",
    a: "Your AFQT is a single percentile (1-99) from 4 subtests that determines enlistment eligibility. Line scores (composites) combine various subtests and determine which specific jobs you qualify for. You need both.",
  },
  {
    q: "Does the ASVAB score affect my rank or pay?",
    a: "No. Your ASVAB determines enlistment eligibility and job qualification only. Starting rank depends on education level and special programs. Pay follows rank and time in service.",
  },
  {
    q: "What happens if my score goes down on a retake?",
    a: "Your most recent score replaces all prior scores. If you scored 72 and retake for a 58, your official AFQT is now 58. The military does not let you keep the higher number.",
  },
  {
    q: "Is the ASVAB the same as the AFQT?",
    a: "No. The ASVAB is the full test with 9 subtests. The AFQT is a score derived from 4 of those subtests. When someone says \"I got a 70 on the ASVAB,\" they almost always mean their AFQT percentile.",
  },
];

export default function ASVABScoresExplainedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "ASVAB Scores Explained: What Your Numbers Actually Mean",
          description:
            "How to read every number on your ASVAB score sheet: AFQT percentiles, the 9 subtest standard scores, composite line scores, and 2026 branch minimums.",
          url: "https://asvabhero.com/asvab-scores-explained",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-17",
          dateModified: "2026-06-14",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "ASVAB Scores Explained", href: "/asvab-scores-explained" },
        ]}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Scores Explained: What Every Number on Your Score Sheet Means
        </h1>

        <VerifiedBlock
          verifiedDate="April 2026"
          sources={[
            { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
          ]}
        >
          <p>
            Your ASVAB score sheet has two kinds of numbers. The{" "}
            <strong>AFQT</strong> (a 1–99 percentile built from AR + MK + 2×VE)
            decides whether you can enlist at all, branch minimums run 31–40.
            The <strong>line scores / composites</strong> (Army GT, Air Force
            MAGE, Navy rating combos, Marines GT/EL/MM/CL/ST) decide which
            jobs you qualify for. AFQT ≠ jobs. Line scores = jobs. Scroll
            down for the exact formulas, branch-by-branch minimums, and which
            subtests matter most for what you want.
          </p>
        </VerifiedBlock>

        <DvidsHeroImage
          src="/images/asvab-scores-explained/hero.jpg"
          alt="The largest administration of the ASVAB test ever given in the Pacific, with students seated at rows of computers"
          credit="Yasuo Osakabe"
          branch="Air Force"
          dvidsUrl="https://www.dvidshub.net/image/6928241/largest-administration-asvab-test-ever-given-pacific"
          width={1200}
          height={700}
        />

        <section className="my-8 not-prose">
          <EmailCapture
            headline="Want a study plan that targets the highest-leverage subtests?"
            subhead="Free 6-page PDF plus a 5-email crash course on AFQT, line scores, and which subtests matter for your branch."
            cta="Email me the plan"
            tag="scores-explained"
          />
        </section>

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

        {/* ─── HOW TO READ YOUR SCORE SHEET ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Read Your ASVAB Score Sheet
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score sheet shows three different kinds of numbers on three different scales. Mixing them up is the most common reason people misread their results, a &ldquo;62&rdquo; next to one label is well above average, and a &ldquo;62&rdquo; next to another barely clears the door. Sort them into three buckets and the page stops being intimidating.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">What you see</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Scale</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What it decides</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">9 subtest standard scores</td>
                <td className="py-2 pr-4 font-mono">mean 50, SD 10</td>
                <td className="py-2">Nothing on their own, they feed the two scores below.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AFQT</td>
                <td className="py-2 pr-4 font-mono">1&ndash;99 percentile</td>
                <td className="py-2">Whether you can enlist (the branch-minimum gate).</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Composite / line scores</td>
                <td className="py-2 pr-4 font-mono">branch-specific</td>
                <td className="py-2">Which jobs you qualify for.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Start with the standard scores.</strong> Each of the 9 subtests is reported on a scale where 50 is the average and every 10 points is one standard deviation, so most scores land between 30 and 70. A 60 in Word Knowledge means one standard deviation above average, not &ldquo;60% correct.&rdquo; These nine numbers are the raw material; the two numbers that actually decide anything are built from them.
        </p>
        <p className="text-text-secondary">
          <strong>Then find your AFQT.</strong> It&apos;s the only percentile on the sheet (1&ndash;99), built from four subtests as 2(VE) + AR + MK, and it&apos;s the number your recruiter means when they ask what you got. It decides eligibility, not jobs. <strong>Last, read your composite / line scores</strong>, Army GT, Air Force MAGE, Navy rating combos, which decide the jobs you can pick. Check the AFQT against the branch minimums further down, then drop all nine subtests into our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free ASVAB score calculator
          </Link>{" "}
          to turn the composites into an actual job list.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT is a percentile, not a percent. An AFQT of 50 doesn&apos;t mean you answered half the questions correctly, it means you scored as well as or better than 50% of the 1997 reference group. The subtest standard scores (mean 50) and the AFQT percentile (1&ndash;99) look like the same kind of number and measure completely different things.
          </p>
        </aside>

        {/* ─── AFQT SCORE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Your AFQT Score: The One Number Every Branch Cares About
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score sheet has a lot of numbers on it. Only one of them decides whether you can enlist at all: the <strong>AFQT</strong> (Armed Forces Qualification Test), a percentile from 1 to 99 built from just 4 of your 9 subtests using the formula <span className="font-mono text-accent">2(VE) + AR + MK</span>. A 50 is the <Link href="/asvab-score-average" className="text-accent hover:text-accent-hover">average ASVAB score</Link>, and every branch sets its enlistment gate against this single number.
        </p>
        <p className="text-text-secondary">
          The detail that trips people up: VE (Verbal Expression, from your Word Knowledge and Paragraph Comprehension) is <strong>doubled</strong> in the formula, so verbal prep gives you twice the leverage of any other subtest. For the full walkthrough (the VE 2x math, the 1997 percentile baseline, and how to raise your AFQT) see our deep dive on the{" "}
          <Link href="/afqt-score" className="text-accent hover:text-accent-hover">
            AFQT score
          </Link>, or drop your four subtests into the{" "}
          <Link href="/afqt-calculator" className="text-accent hover:text-accent-hover">
            AFQT calculator
          </Link>{" "}
          to see your exact percentile.
        </p>

        {/* ─── AFQT CATEGORIES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories: Where You Land on the Military&apos;s Ranking System
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT percentile doesn&apos;t just decide whether you can enlist. It slots you into a category (I through V) that sets your priority for jobs, bonuses, and enlistment slots. Categories I to IIIA (50 and up) give you the strongest negotiating position, IIIB (31 to 49) gets you through the door with narrower options, and Category V (1 to 9) is a permanent disqualifier.
        </p>
        <p className="text-text-secondary">
          The full tier table (every category, its exact percentile band, and what each one unlocks) lives on our{" "}
          <Link href="/asvab-score-chart" className="text-accent hover:text-accent-hover">
            ASVAB score chart
          </Link>, which lays the categories, branch minimums, and composite tables out side by side.
        </p>

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
          The third type of number on your sheet is your composite (or line) scores. Think of it as a two-gate system: gate one is the AFQT minimum for enlistment, and gate two is a set of composites, each built from a different combination of subtests, that decide which specific jobs you qualify for. Each branch names them differently, the Army uses 10 line scores including the{" "}
          <Link href="/gt-score" className="text-accent hover:text-accent-hover">
            GT score
          </Link>, the Air Force and Space Force use MAGE, and the Navy and Coast Guard use a unique formula per rating.
        </p>
        <p className="text-text-secondary">
          A high AFQT doesn&apos;t guarantee high composites. Score an 80th-percentile AFQT but a low Electronics Information and General Science, and you&apos;re locked out of technical jobs. For every composite formula and the full branch-by-branch line-score tables, see the{" "}
          <Link href="/asvab-score-chart" className="text-accent hover:text-accent-hover">
            ASVAB score chart
          </Link>.
        </p>

        {/* ─── BRANCH MINIMUMS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum ASVAB Scores by Branch (2026 Requirements)
        </h2>

        <p className="mt-4 text-text-secondary">
          Each branch sets its own minimum AFQT to enlist, and these are floors, not competitive scores. Diploma minimums run roughly 31 (Army) to 36 (Air Force and Space Force), GED holders face higher bars (typically 50, and 65 for the Air Force and Space Force), and earning 15+ college credits can reclassify a GED holder at the diploma tier. The average enlistee actually scores between 55 and 65.
        </p>
        <p className="text-text-secondary">
          For the full branch-by-branch table (diploma and GED minimums for all six branches, plus the composite scores specific jobs require) see our{" "}
          <Link href="/asvab-score-requirements" className="text-accent hover:text-accent-hover">
            ASVAB score requirements by branch
          </Link>. Or plug your scores into the{" "}
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
          If your scores aren&apos;t where you need them, you can retake the ASVAB, but two rules catch people off guard. First, there are wait periods (1 month before your first retake, 1 month before the second, then 6 months between every attempt after that). Second, your most recent score completely replaces all previous scores, so a 72 followed by a 58 leaves you with an official 58.
        </p>
        <p className="text-text-secondary">
          For the complete wait-time schedule, the score-replacement rules, and the strategy on when a retake is worth it, see our{" "}
          <Link href="/asvab-retake-policy" className="text-accent hover:text-accent-hover">
            ASVAB retake policy
          </Link>. When you do retake, build a study plan with our{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            practice tests
          </Link>.
        </p>

        {/* ─── IMPROVING SCORES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Improve Your ASVAB Scores (Based on What Actually Moves the Needle)
        </h2>

        <p className="mt-4 text-text-secondary">
          Not every subtest moves your scores equally. Start with verbal, because VE is doubled in the AFQT formula every point in Word Knowledge or Paragraph Comprehension counts twice, then prioritize your weakest AFQT subtests. For composites, work backwards from your target job and drill the subtests that feed its line score. A focused 4 to 6 week effort typically yields a 5 to 15 percentile point gain.
        </p>
        <p className="text-text-secondary">
          For the full week-by-week plan and subtest drills, see our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">
            ASVAB study guide
          </Link>; if your goal is a higher enlistment score specifically, the{" "}
          <Link href="/afqt-score" className="text-accent hover:text-accent-hover">
            AFQT score
          </Link>{" "}
          guide covers the highest-leverage moves. Find your baseline with a{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            practice test
          </Link>{" "}
          first.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Scores FAQ
        </h2>

        <div className="mt-4 space-y-6">
          {faqItems.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-display text-base font-bold text-text-primary">
                {faq.q}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs italic text-text-tertiary">
          The appearance of U.S. Department of Defense (DoD) visual information
          does not imply or constitute DoD endorsement.
        </p>

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

        <section className="mt-8 not-prose">
          <AffiliateBookBlock source="scores-explained-end" />
        </section>

        <section className="mt-8 not-prose">
          <EmailCapture
            headline="Get the plan that turns this score sheet into a job offer"
            subhead="The four subtests that move your AFQT fastest, plus a short email crash course on VE leverage and line scores. Free."
            cta="Email me the plan"
            tag="scores-explained-end"
            variant="inline"
          />
        </section>

        <div className="not-prose">
          <RelatedLinks
            title="Understand your ASVAB scores"
            links={[
              { href: "/asvab-score-requirements", label: "ASVAB Score Requirements by Branch", blurb: "Every branch minimum AFQT and the composite scores jobs need." },
              { href: "/what-is-a-good-asvab-score", label: "What Is a Good ASVAB Score?", blurb: "How to judge your score against your goals." },
              { href: "/afqt-score", label: "AFQT Score Explained", blurb: "The one number that decides if you can enlist." },
              { href: "/gt-score", label: "GT Score Explained", blurb: "The line score that unlocks the most jobs and warrant tracks." },
              { href: "/how-many-questions-on-the-asvab", label: "How Many Questions Are on the ASVAB?", blurb: "Question counts and timing for every subtest." },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
