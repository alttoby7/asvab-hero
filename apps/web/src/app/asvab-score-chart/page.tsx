import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";
import DvidsHeroImage from "@/components/DvidsHeroImage";
import VerifiedBlock from "@/components/VerifiedBlock";
import AFQTCategoryLadder from "@/components/scores-explained/AFQTCategoryLadder";
import BranchCompositeHeatmap from "@/components/scores-explained/BranchCompositeHeatmap";

export const metadata: Metadata = {
  title: "ASVAB Score Chart: AFQT Categories, Line Scores & Branch Minimums (2026)",
  description:
    "AFQT Category I = 93–99. II = 65–92. IIIA = 50–64. IIIB = 31–49. IV = 10–30. Branch minimums: Army 31, Marines 32, Navy 31, Air Force/Space Force 36, Coast Guard 32. GED floors are higher.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-score-chart",
  },
};

export default function ASVABScoreChartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "ASVAB Score Chart: What Every Score Means for Your Military Career",
          description:
            "Complete ASVAB score chart covering AFQT categories I through V, branch minimums for all 6 branches, composite line score formulas, and what each score range actually unlocks.",
          url: "https://asvabhero.com/asvab-score-chart",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-18",
          dateModified: "2026-06-14",
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
                text: "A 50 AFQT is average and qualifies you for most branches and a solid range of jobs. Scoring 60+ opens the majority of career fields and bonus eligibility. For competitive jobs in intel, cyber, or special operations, aim for 70+.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You need a 36 AFQT minimum with a high school diploma or a 65 with a GED. Your MAGE composite scores determine which AFSCs (jobs) you can select.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB if I score low?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. You can retest after 1 month, retest again after another month, then wait 6 months for any further retakes. Your most recent score is the one that counts, not your highest.",
              },
            },
            {
              "@type": "Question",
              name: "What is the AFQT score on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The AFQT (Armed Forces Qualification Test) is a percentile score derived from four subtests: Arithmetic Reasoning, Math Knowledge, Word Knowledge, and Paragraph Comprehension. It determines whether you can enlist, separate from your composite scores that determine job options.",
              },
            },
            {
              "@type": "Question",
              name: "Do ASVAB scores expire?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. ASVAB scores are valid for 2 years from the test date. If you tested more than 2 years ago and have not enlisted, you need to retest.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need for Special Forces?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Army Special Forces (18X) requires a GT composite score of 105 or higher (GT = VE + AR). Meeting the score minimum qualifies you to apply. Selection involves extensive physical and psychological screening beyond the ASVAB.",
              },
            },
            {
              "@type": "Question",
              name: "Is a 70 on the ASVAB good?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 70 AFQT means you scored better than 70% of the 1997 reference population, placing you in Category II. You qualify for every branch, nearly every job, and enlistment bonuses.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between AFQT and composite scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your AFQT is a single percentile that determines if you can enlist. Composite scores combine different subtests into branch-specific formulas that determine which jobs you qualify for. You can have a high AFQT but miss a composite minimum for a specific job, or vice versa.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Score Chart: AFQT Categories I–V + Branch Minimums (2026)
        </h1>

        <VerifiedBlock
          verifiedDate="April 2026"
          sources={[
            { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
          ]}
        >
          <p>
            <strong>AFQT categories:</strong> Cat I = 93–99 (top 7%). II =
            65–92. IIIA = 50–64. IIIB = 31–49. IV = 10–30. V = 1–9
            (disqualified).{" "}
            <strong>2026 branch minimum AFQT (diploma):</strong> Army 31,
            Marines 32, Navy 31, Air Force/Space Force 36, Coast Guard 32.
            GED applicants face higher floors (typically 50) plus per-branch
            quota caps. Line scores (Army 10 composites, Air Force MAGE,
            Navy rating combos, Marines GT/EL/MM/CL/ST) determine which
            specific jobs you qualify for within each branch.
          </p>
        </VerifiedBlock>

        <DvidsHeroImage
          src="/images/asvab-score-chart/hero.jpg"
          alt="Students seated at computers taking the ASVAB test at a large military testing facility in the Pacific"
          credit="Yasuo Osakabe"
          branch="Air Force"
          dvidsUrl="https://www.dvidshub.net/image/6928242/largest-administration-asvab-test-ever-given-pacific"
          width={1200}
          height={700}
        />

        <p className="mt-4 text-text-secondary">
          You got your ASVAB score back. Now you need to know what it actually does for you. A 50 and a 70 both &ldquo;pass,&rdquo; but they open completely different careers, bonuses, and branches. This{" "}
          <strong>ASVAB score chart</strong> breaks down every score range, every branch minimum, and every composite formula so you can see exactly where you stand.
        </p>
        <p className="text-text-secondary">
          Two numbers matter most: your AFQT score (determines if you can enlist) and your composite scores (determine which jobs you qualify for). You can have a high AFQT and still miss the composite minimum for a specific job, so both scores shape your career options. Use the{" "}
          <Link href="/afqt-score" className="text-accent hover:text-accent-hover">
            AFQT calculator
          </Link>{" "}
          to pin down your percentile, or browse the{" "}
          <Link href="/navy-ratings-list" className="text-accent hover:text-accent-hover">
            Navy ratings list
          </Link>{" "}
          to see required scores job by job.
        </p>
        <p className="text-text-secondary">
          AFQT is a percentile comparing you to a 1997 national reference group of about 6,000 young adults, not a percent-correct grade. A score of 60 means you outperformed 60% of that group. Your AFQT comes from four subtests (Arithmetic Reasoning, Math Knowledge, Word Knowledge, and Paragraph Comprehension), while your remaining subtests feed into composite scores that each branch calculates differently. The{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            ASVAB calculator
          </Link>{" "}
          is the fastest way to plug in your subtest scores and see qualifying jobs across all six branches.
        </p>

        <section className="my-8 not-prose">
          <EmailCapture
            headline="Climbing categories, IIIB to IIIA, IIIA to II?"
            subhead="Free 30-day plan plus a 5-email crash course on the highest-leverage AFQT moves to bump your category and unlock more jobs and bonuses."
            cta="Email me the plan"
            tag="score-chart"
          />
        </section>

        {/* ─── AFQT CATEGORIES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Score Categories: Where You Fall on the Chart
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT score slots you into one of eight categories. The category, not just the number, determines what happens next.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Category</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">AFQT Range</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Percentile</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">What It Means for You</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-emerald-400">I</td>
                <td className="px-3 py-3">93–99</td>
                <td className="px-3 py-3">Top 7%</td>
                <td className="px-3 py-3">Every branch, every job, elite programs (nuclear, intel, crypto linguist), max enlistment bonuses</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-emerald-300">II</td>
                <td className="px-3 py-3">65–92</td>
                <td className="px-3 py-3">Top 35%</td>
                <td className="px-3 py-3">Virtually all jobs across all branches, strong bonus eligibility</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-sky-400">IIIA</td>
                <td className="px-3 py-3">50–64</td>
                <td className="px-3 py-3">Above average</td>
                <td className="px-3 py-3">Most jobs available, qualifies for enlistment incentives</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-amber-400">IIIB</td>
                <td className="px-3 py-3">31–49</td>
                <td className="px-3 py-3">Below average</td>
                <td className="px-3 py-3">Meets minimum for most branches (with diploma), limited job selection</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-orange-400">IVA</td>
                <td className="px-3 py-3">21–30</td>
                <td className="px-3 py-3">Well below average</td>
                <td className="px-3 py-3">Army only (Future Soldier Prep Course), very limited jobs</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-orange-500">IVB</td>
                <td className="px-3 py-3">16–20</td>
                <td className="px-3 py-3">Bottom 20%</td>
                <td className="px-3 py-3">Requires waiver, 4% annual cap applies</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-mono font-bold text-red-400">IVC</td>
                <td className="px-3 py-3">10–15</td>
                <td className="px-3 py-3">Bottom 15%</td>
                <td className="px-3 py-3">Requires waiver, rarely approved</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-mono font-bold text-red-500">V</td>
                <td className="px-3 py-3">1–9</td>
                <td className="px-3 py-3">Bottom 9%</td>
                <td className="px-3 py-3">Legally prohibited from enlisting (10 USC 520)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Category I and II scorers (65+) are in the strongest position. Every branch accepts them, nearly every job is available, and enlistment bonuses hit their highest levels. Recruiters actively pursue Category I applicants for nuclear, intel, and special operations pipelines.
        </p>
        <p className="text-text-secondary">
          Category IIIA (50–64) is the practical threshold where your options expand significantly. Enlistment bonuses, school seats, and MOS choice all start opening up at 50. The difference between a 48 and a 52 is not just four points. It is the jump from Category IIIB to IIIA, from limited options to most jobs plus incentives.
        </p>
        <p className="text-text-secondary">
          Category IIIB (31–49) gets you through the door at most branches with a diploma, but your job pool is narrow and enlistment bonuses are unlikely. Category IV is legally capped at 4% of annual enlistments per branch, so even with an approved waiver, slots are scarce. Category IVB and IVC waivers are rarely approved, and the approval rate drops further each year as branches meet their recruiting targets. Category V is a statutory bar under 10 USC 520. Federal law prohibits enlistment at that level.
        </p>
        <p className="text-text-secondary">
          Your percentile compares you to a fixed group of about 6,000 young adults surveyed in 1997 (the PAY97 study). A score of 50 means you outperformed 50% of that reference group, not 50% of the people who took the test the same day you did.
        </p>

        <AFQTCategoryLadder />

        {/* ─── BRANCH MINIMUMS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Minimum Scores by Branch: Diploma vs GED
        </h2>

        <p className="mt-4 text-text-secondary">
          Having a GED does not disqualify you. But it nearly doubles the score you need for most branches.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Branch</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Diploma Min</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">GED Min</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-semibold">Army</td>
                <td className="px-3 py-3">31</td>
                <td className="px-3 py-3">50</td>
                <td className="px-3 py-3">Future Soldier Prep Course for 21–30 scorers</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-semibold">Air Force</td>
                <td className="px-3 py-3">36</td>
                <td className="px-3 py-3">65</td>
                <td className="px-3 py-3">Most competitive enlisted branch</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-semibold">Marines</td>
                <td className="px-3 py-3">32</td>
                <td className="px-3 py-3">50</td>
                <td className="px-3 py-3">Waivers possible but rare below 32</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-semibold">Navy</td>
                <td className="px-3 py-3">31</td>
                <td className="px-3 py-3">50</td>
                <td className="px-3 py-3">Tier II/III policy updated Jan 2024</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="px-3 py-3 font-semibold">Coast Guard</td>
                <td className="px-3 py-3">32</td>
                <td className="px-3 py-3">47</td>
                <td className="px-3 py-3">Smallest branch, fewer annual slots</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-semibold">Space Force</td>
                <td className="px-3 py-3">36</td>
                <td className="px-3 py-3">65</td>
                <td className="px-3 py-3">~85% of recruits score Cat I–IIIA (50+)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These are floors, not targets. Scoring the minimum gets you through the door but limits your job options severely.
        </p>
        <p className="text-text-secondary">
          Space Force technically accepts a 36 with a diploma, but in practice, most recruits score 50 or higher because competition for limited slots is intense. The Army&apos;s Future Soldier Prep Course (launched 2022) is unique. It lets scorers in the 21–30 range attend a prep program, retest, and enlist if they hit 31+. No other branch offers this.
        </p>
        <p className="text-text-secondary">
          The Navy made a significant policy change in January 2024, becoming the first branch to allow Tier III enlistment (no diploma or GED) with a minimum AFQT of 50. This expanded the Navy&apos;s recruiting pool but did not lower its standards. You still need to meet the same composite score thresholds for every rating.
        </p>
        <p className="text-text-secondary">
          If you have a GED, the higher minimum is real. The gap is steepest at the Air Force: 36 with a diploma versus 65 with a GED, a 29-point difference. Once you are in, though, your score works the same as a diploma holder&apos;s for job qualification. The credential gap only affects the entry threshold.
        </p>
        <p className="text-text-secondary">
          The Coast Guard is the smallest branch with the fewest annual enlistment slots. Its minimum of 32 is the floor, but the limited number of openings means practical competition pushes the effective threshold higher.
        </p>
        <p className="text-text-secondary">
          Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            ASVAB calculator
          </Link>{" "}
          to check specific job eligibility for your branch.
        </p>

        {/* ─── SCORE INTERPRETATION (demoted → ranges) ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your ASVAB Score Actually Unlocks: 50 vs 70 vs 90
        </h2>

        <p className="mt-4 text-text-secondary">
          A 50 and a 90 both qualify you to enlist, but they do not open the same career. A 50 (Category IIIA) gets you most jobs plus enlistment incentives, while a 70 or 90 (Category II and I) opens nearly everything, including intel, cyber, and special programs. The jump from 50 to 70 unlocks more doors than the jump from 70 to 90.
        </p>
        <p className="text-text-secondary">
          For the full tier-by-tier breakdown of which real jobs each score range opens, see{" "}
          <Link href="/asvab-score-ranges" className="text-accent hover:text-accent-hover">
            ASVAB score ranges and the jobs they unlock
          </Link>.
        </p>

        {/* ─── COMPOSITES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Composite Scores and Line Score Formulas
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT score decides if you enlist. Your composite scores decide what you do for the next 4–6 years.
        </p>
        <p className="text-text-secondary">
          Each branch combines different ASVAB subtests into composite (or &ldquo;line&rdquo;) scores. Every job requires minimum composite scores, not just a minimum AFQT. The formulas differ by branch, so the same subtest scores produce different composites depending on which service you are joining.
        </p>

        <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">Subtest Abbreviations</h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Abbreviation</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Subtest</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["AR", "Arithmetic Reasoning"],
                ["MK", "Math Knowledge"],
                ["WK", "Word Knowledge"],
                ["PC", "Paragraph Comprehension"],
                ["VE", "Verbal Expression (WK + PC)"],
                ["GS", "General Science"],
                ["AS", "Auto & Shop Information"],
                ["MC", "Mechanical Comprehension"],
                ["EI", "Electronics Information"],
                ["NO", "Numerical Operations"],
                ["CS", "Coding Speed"],
                ["AO", "Assembling Objects"],
              ].map(([abbr, name], i, arr) => (
                <tr key={abbr} className={i < arr.length - 1 ? "border-b border-navy-border/50" : ""}>
                  <td className="px-3 py-3 font-mono font-bold text-accent">{abbr}</td>
                  <td className="px-3 py-3">{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">Army Composite Scores</h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Composite</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Formula</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Jobs It Covers</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["GT (General Technical)", "VE + AR", "Intel, Cyber, Special Forces"],
                ["CL (Clerical)", "VE + AR + MK", "Admin, Finance, HR"],
                ["EL (Electronics)", "GS + AR + MK + EI", "Electronics, Communications"],
                ["ST (Skilled Technical)", "GS + VE + MK + MC", "Medical, Lab, Technical"],
                ["FA (Field Artillery)", "AR + CS + MK + MC", "Artillery, Fire Support"],
                ["GM (General Maintenance)", "GS + AS + MK + EI", "Mechanics, Maintenance"],
                ["MM (Mechanical Maintenance)", "NO + AS + MC + EI", "Vehicle/Equipment Maintenance"],
                ["OF (Operators and Food)", "VE + NO + AS + MC", "Drivers, Food Service"],
                ["SC (Surveillance & Comms)", "VE + AR + AS + MC", "Intel, Reconnaissance"],
              ].map(([composite, formula, jobs], i, arr) => (
                <tr key={composite} className={i < arr.length - 1 ? "border-b border-navy-border/50" : ""}>
                  <td className="px-3 py-3 font-semibold">{composite}</td>
                  <td className="px-3 py-3 font-mono text-xs">{formula}</td>
                  <td className="px-3 py-3">{jobs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">Air Force MAGE Composite Scores</h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Composite</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Formula</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Common AFSCs</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["Mechanical (M)", "AR + AS + MC + VE", "Maintenance, Munitions"],
                ["Administrative (A)", "MK + VE", "Finance, Services, Intel"],
                ["General (G)", "AR + VE", "Linguist, Security Forces, Cyber"],
                ["Electronic (E)", "AR + EI + GS + MK", "Avionics, Electronic Systems"],
              ].map(([composite, formula, afscs], i, arr) => (
                <tr key={composite} className={i < arr.length - 1 ? "border-b border-navy-border/50" : ""}>
                  <td className="px-3 py-3 font-semibold">{composite}</td>
                  <td className="px-3 py-3 font-mono text-xs">{formula}</td>
                  <td className="px-3 py-3">{afscs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The Marines use four composites (MM, CL, GT, EL) with formulas similar to the Army&apos;s. The Navy uses 15+ rating-specific composites, making it the most granular system. Each branch independently validates its composite formulas based on which subtest combinations best predict on-the-job performance.
        </p>
        <p className="text-text-secondary">
          The same subtest scores can produce very different outcomes depending on your branch. High AR and MK scores feed the Army GT and EL composites but also power the Navy&apos;s nuclear field composite. Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            calculator
          </Link>{" "}
          to see all your composites at once instead of doing the math by hand.
        </p>

        <BranchCompositeHeatmap />

        {/* ─── SPECIAL OPS (demoted → ranges) ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Special Operations and High-Demand Job Score Benchmarks
        </h2>

        <p className="mt-4 text-text-secondary">
          Minimum branch scores get you in the door, but elite jobs set their own composite bars. Army Special Forces and Rangers need a GT of 105+, Marine Recon needs GT 100+, and Navy Nuclear is the most score-intensive enlisted program in any branch. Competitive candidates usually clear these minimums by 10 to 20 points, and special operations layer physical and psychological screening on top of the ASVAB.
        </p>
        <p className="text-text-secondary">
          For the job-by-job benchmark list across every branch, see{" "}
          <Link href="/asvab-score-ranges" className="text-accent hover:text-accent-hover">
            the score requirements for high-demand and special operations jobs
          </Link>.
        </p>

        {/* ─── RETAKE RULES (demoted → retake-policy) ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Retake Rules and How Much You Can Realistically Improve
        </h2>

        <p className="mt-4 text-text-secondary">
          You can retake the ASVAB, but your latest score is the one that counts, not your highest. The standard schedule is a 1-month wait for your first retest, another month for your second, then 6 months for any retest after that. A 5 to 10 point AFQT gain is typical with 4 to 6 weeks of focused study.
        </p>
        <p className="text-text-secondary">
          For the full retake timing rules, score-replacement policy, and where retaking pays off most, see the{" "}
          <Link href="/asvab-retake-policy" className="text-accent hover:text-accent-hover">
            ASVAB retake policy guide
          </Link>.
        </p>

        {/* ─── HOW PERCENTILE WORKS (demoted → afqt-score) ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How ASVAB Percentile Scores Work (and Why the 1997 Baseline Matters)
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT is a percentile, not a percent-correct grade. It compares you to about 6,000 young adults surveyed in 1997 (the PAY97 study), the permanent reference group implemented in 2004. A score of 50 means you outperformed half of that group, and a 70 in 2026 means the same thing it did in 2010.
        </p>
        <p className="text-text-secondary">
          For the full AFQT formula (AR + MK + 2x VE), why Verbal Expression is double-weighted, and how the 1997 baseline shapes your percentile, see the{" "}
          <Link href="/afqt-score" className="text-accent hover:text-accent-hover">
            AFQT score guide
          </Link>.
        </p>

        {/* ─── MASTER CHART ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Score Chart by Branch: Putting It All Together
        </h2>

        <p className="mt-4 text-text-secondary">
          One chart. Every score range. Every branch. Every outcome.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">AFQT</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Category</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Army</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Air Force</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Marines</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Navy</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">CG</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Space Force</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Job Access</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Bonuses</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["93–99", "I", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "All jobs, elite programs", "Maximum"],
                ["65–92", "II", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Nearly all jobs", "Strong"],
                ["50–64", "IIIA", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Most jobs", "Yes"],
                ["36–49", "IIIB", "Yes", "Yes", "Yes", "Yes", "Yes", "Competitive", "Limited selection", "Rare"],
                ["32–35", "IIIB", "Yes", "No", "Yes", "Yes", "Yes", "No", "Very limited", "No"],
                ["31", "IIIB", "Yes", "No", "No", "Yes", "No", "No", "Minimal", "No"],
                ["21–30", "IVA", "FSPC", "No", "No", "No", "No", "No", "Army prep only", "No"],
                ["16–20", "IVB", "Waiver", "No", "No", "No", "No", "No", "Waiver required", "No"],
                ["10–15", "IVC", "Waiver*", "No", "No", "No", "No", "No", "Rarely approved", "No"],
                ["1–9", "V", "No", "No", "No", "No", "No", "No", "Legally barred", "No"],
              ].map(([afqt, cat, army, af, marines, navy, cg, sf, jobs, bonuses], i, arr) => (
                <tr key={afqt} className={i < arr.length - 1 ? "border-b border-navy-border/50" : ""}>
                  <td className="px-3 py-3 font-mono font-bold">{afqt}</td>
                  <td className="px-3 py-3 font-semibold">{cat}</td>
                  <td className={`px-3 py-3 ${army === "Yes" ? "text-emerald-400" : army === "No" ? "text-red-400/70" : "text-amber-400"}`}>{army}</td>
                  <td className={`px-3 py-3 ${af === "Yes" ? "text-emerald-400" : af === "No" ? "text-red-400/70" : "text-amber-400"}`}>{af}</td>
                  <td className={`px-3 py-3 ${marines === "Yes" ? "text-emerald-400" : marines === "No" ? "text-red-400/70" : "text-amber-400"}`}>{marines}</td>
                  <td className={`px-3 py-3 ${navy === "Yes" ? "text-emerald-400" : navy === "No" ? "text-red-400/70" : "text-amber-400"}`}>{navy}</td>
                  <td className={`px-3 py-3 ${cg === "Yes" ? "text-emerald-400" : cg === "No" ? "text-red-400/70" : "text-amber-400"}`}>{cg}</td>
                  <td className={`px-3 py-3 ${sf === "Yes" ? "text-emerald-400" : sf === "No" ? "text-red-400/70" : "text-amber-400"}`}>{sf}</td>
                  <td className="px-3 py-3">{jobs}</td>
                  <td className="px-3 py-3">{bonuses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Read the chart from bottom to top to see how each score threshold opens new doors.
        </p>
        <p className="text-text-secondary">
          At 31, the Army and Navy doors open. At 32, the Marines and Coast Guard join. At 36, the Air Force and Space Force. At 50, enlistment bonuses and most job classifications unlock. At 65, you qualify for virtually everything. At 93, you enter Category I and elite programs like Navy Nuclear and crypto linguist actively recruit you.
        </p>
        <p className="text-text-secondary">
          Space Force shows &ldquo;Competitive&rdquo; at 36–49 because it technically accepts a 36 with a diploma, but 85% of recruits score 50 or higher. Treat 50 as the practical minimum for Space Force.
        </p>
        <p className="text-text-secondary">
          Your AFQT gets you into a branch. Your composite scores get you into a job. Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            ASVAB calculator
          </Link>{" "}
          to see exactly which jobs your scores qualify you for across all six branches.
        </p>

        {/* ─── TIPS (shortened → study-guide) ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Tips to Raise Your ASVAB Score Before Test Day
        </h2>

        <p className="mt-4 text-text-secondary">
          The biggest score gains come from the subtests you have been ignoring, not the ones you are already strong in. Study Arithmetic Reasoning and Math Knowledge first (they feed your AFQT and most composites), build vocabulary for double-weighted Verbal Expression, and spread your prep over 4 to 6 weeks of timed practice rather than a weekend cram.
        </p>
        <p className="text-text-secondary">
          For the full study plan and per-subtest drills, use the{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">
            ASVAB study guide
          </Link>{" "}
          and test yourself with{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            practice tests
          </Link>.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Score Chart FAQ
        </h2>

        <div className="mt-6 divide-y divide-navy-border/40">
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">What is a good ASVAB score?</h3>
            <p className="mt-2 text-text-secondary">
              A 50 AFQT is average and qualifies you for most branches and a solid range of jobs. Scoring 60+ opens the majority of career fields and bonus eligibility. For competitive jobs in intel, cyber, or special operations, aim for 70+.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">What ASVAB score do I need for the Air Force?</h3>
            <p className="mt-2 text-text-secondary">
              You need a 36 AFQT minimum with a high school diploma or a 65 with a GED. Your MAGE composite scores determine which AFSCs (jobs) you can select.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">Can I retake the ASVAB if I score low?</h3>
            <p className="mt-2 text-text-secondary">
              Yes. You can retest after 1 month, retest again after another month, then wait 6 months for any further retakes. Your most recent score is the one that counts, not your highest.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">What is the AFQT score on the ASVAB?</h3>
            <p className="mt-2 text-text-secondary">
              The AFQT (Armed Forces Qualification Test) is a percentile score derived from four subtests: Arithmetic Reasoning, Math Knowledge, Word Knowledge, and Paragraph Comprehension. It determines whether you can enlist, separate from your composite scores that determine job options.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">Do ASVAB scores expire?</h3>
            <p className="mt-2 text-text-secondary">
              Yes. ASVAB scores are valid for 2 years from the test date. If you tested more than 2 years ago and have not enlisted, you need to retest.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">What ASVAB score do I need for Special Forces?</h3>
            <p className="mt-2 text-text-secondary">
              Army Special Forces (18X) requires a GT composite score of 105 or higher (GT = VE + AR). Meeting the score minimum qualifies you to apply. Selection involves extensive physical and psychological screening beyond the ASVAB.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">Is a 70 on the ASVAB good?</h3>
            <p className="mt-2 text-text-secondary">
              A 70 AFQT means you scored better than 70% of the 1997 reference population, placing you in Category II. You qualify for every branch, nearly every job, and enlistment bonuses.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">What&apos;s the difference between AFQT and composite scores?</h3>
            <p className="mt-2 text-text-secondary">
              Your AFQT is a single percentile that determines if you can enlist. Composite scores combine different subtests into branch-specific formulas that determine which jobs you qualify for. You can have a high AFQT but miss a composite minimum for a specific job, or vice versa. Check your composites with the{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">
                ASVAB calculator
              </Link>.
            </p>
          </div>
        </div>
        <p className="mt-8 text-xs italic text-text-tertiary">
          The appearance of U.S. Department of Defense (DoD) visual information
          does not imply or constitute DoD endorsement.
        </p>
      </article>
    </div>
  );
}
