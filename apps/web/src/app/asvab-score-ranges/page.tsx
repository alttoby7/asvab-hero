import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AfqtScoreMeaning from "@/components/AfqtScoreMeaning";

export const metadata: Metadata = {
  title: "ASVAB Score Ranges: What 31, 50, 70, and 99 Mean (2026)",
  description:
    "Enter any AFQT score to see what it means: your category, which branches you qualify for, the jobs it unlocks, and what to aim for next. All 6 branches.",
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
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-03-22",
  dateModified: "2026-06-14",
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
          ASVAB Score Ranges: Is Your Score Good Enough?
        </h1>

        <p className="mt-4 text-lg text-text-primary">
          Your AFQT score (1&ndash;99) is a percentile that sorts you into one of six categories. <strong>31&ndash;49</strong> meets the enlistment floor for most branches; <strong>50+</strong> is the practical target that unlocks bonuses and most jobs; <strong>65+</strong> opens nearly everything; and <strong>93+</strong> is the top tier. Enter your score below to see exactly what it means.
        </p>

        <div className="mt-6">
          <AfqtScoreMeaning />
        </div>

        <p className="mt-8 text-text-secondary">
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
          Every AFQT score falls into one of six tiers, and the tier you land in is what actually controls your options. Category V (1-9) is a permanent disqualifier. Category IV (10-30) is legally capped at 4% of each branch&apos;s annual accessions, so acceptance is rare. Category IIIB (31-49) gets you in the door with limited leverage. Category IIIA (50+) is the threshold where bonuses, jobs, and recruiter attention open up. Category II (65+) puts nearly every job within reach, and Category I (93+) is the top 7% who get first pick on everything.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category I (93+) and II (65+)</p>
            <p className="mt-1 text-sm text-text-secondary">Highly qualified across all branches, full bonus eligibility, nearly every job open</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category IIIA (50+)</p>
            <p className="mt-1 text-sm text-text-secondary">The real threshold where bonuses, jobs, and recruiter attention all open up</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Category IIIB (31-49) and below</p>
            <p className="mt-1 text-sm text-text-secondary">In the door at best, with limited leverage and shrinking job selection</p>
          </div>
        </div>

        <p className="text-text-secondary">
          The 50-point threshold is the real dividing line. Category IIIA and above unlocks enlistment incentives across all branches. The Army offers enlistment bonuses specifically for scores exceeding 50, and the Air Force approves over 90% of recruits scoring 50+. Below 50, you are working uphill. For the full AFQT category chart with exact percentile bands, share of test-takers, and the federal cap rules (10 USC 520), see the <Link href="/asvab-score-chart">ASVAB score chart</Link>.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Branch Minimum Scores: Diploma vs GED Requirements for 2026
        </h2>

        <p className="mt-4 text-text-secondary">
          Each branch sets its own AFQT floor, and diploma holders get a lower one than GED holders. The Army needs a 31 for diploma graduates, the Air Force and Space Force need a 36, and GED holders face a 50 in most branches and a 65 for Air Force or Space Force. These are floors, not targets, since the average enlistee scores between 55 and 65. For the complete diploma-versus-GED minimums by branch and the 15-credit-hour reclassification rule, see our full <Link href="/asvab-score-requirements">ASVAB score requirements</Link> guide.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Composite and Line Score Ranges by Branch
        </h2>

        <p className="mt-4 text-text-secondary">
          The military uses a two-gate system. Your AFQT decides whether you can enlist, but your composite (line) scores decide which jobs you actually qualify for. Each branch builds composites from different subtest combinations on scales separate from the AFQT percentile: the Army uses up to 10 line scores, the Marines use 3, the Air Force and Space Force use the four-part MAGE system, and the Navy and Coast Guard use rating-specific formulas. For every composite formula and the per-branch job lookup tables, check the <Link href="/asvab-score-chart">ASVAB score chart</Link>.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Real Jobs at Every Score Level
        </h2>

        <p className="mt-4 text-text-secondary">
          Stop wondering &ldquo;is my score good enough.&rdquo; This is the heart of what your ASVAB score range actually buys you. Below is what each AFQT tier puts on the table, then real jobs with real score requirements across four branches.
        </p>

        <div className="my-4 space-y-3">
          <div className="rounded-lg border-l-4 border-amber-400 bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">31&ndash;49 (Category IIIB): the floor</p>
            <p className="mt-1 text-sm text-text-secondary">Enough to enlist in the Army, Navy, Marines, or Coast Guard, but the job list is short. Realistic options cluster in combat arms and entry support roles: Army 11B Infantryman (CO 87), 92G Culinary Specialist, 88M Motor Transport Operator, or Marine 0311 Rifleman (GT 90). No enlistment bonus, and your recruiter has little room to negotiate.</p>
          </div>
          <div className="rounded-lg border-l-4 border-sky-400 bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-sky-400">50&ndash;64 (Category IIIA): jobs and bonuses open up</p>
            <p className="mt-1 text-sm text-text-secondary">The list multiplies. Most administrative, logistics, and entry-technical roles come online, along with bonus eligibility. Think Army 68W Combat Medic (ST 101 + GT 107), 25B IT Specialist, or Navy Master-at-Arms. This is where the average enlistee lands and where a recruiter starts treating you as a real candidate.</p>
          </div>
          <div className="rounded-lg border-l-4 border-emerald-300 bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-300">65&ndash;92 (Category II): nearly everything</p>
            <p className="mt-1 text-sm text-text-secondary">With qualifying composites, almost every MOS, rating, and AFSC opens, including most technical and medical fields. Army 35F Intelligence Analyst (ST 101), Navy ET Electronics Technician (AR+MK+EI+GS &gt;= 222), and Air Force linguist tracks become realistic. Full bonus eligibility and strong negotiating leverage.</p>
          </div>
          <div className="rounded-lg border-l-4 border-emerald-400 bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">93&ndash;99 (Category I): first pick on everything</p>
            <p className="mt-1 text-sm text-text-secondary">The most selective and highest-payoff roles actively recruit from this pool: Army 17C Cyber Operations (GT 110 + ST 112 + ICTL 60), Navy Nuclear Field (VE+AR+MK+MC &gt;= 252), and special operations pipelines. Maximum incentives and an officer-track signal, though these still require the right composites, not just a high AFQT.</p>
          </div>
        </div>

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

        <p className="text-text-secondary">
          Because the GT composite (VE+AR) gates more high-value roles than any other line score, it is the clearest single predictor of what your range unlocks. Here is roughly what each GT band opens:
        </p>

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
          Moving from Category IIIB (31-49) to Category IIIA (50+) is the single most valuable jump you can make, and the highest-leverage path is the verbal side: because VE is doubled in the AFQT formula, gains in Word Knowledge and Paragraph Comprehension count twice. Take a <Link href="/practice-test">practice test</Link> for your baseline, then follow the full diagnostic-to-retake plan (including the 1-1-6 retake rule and how to study for a specific composite) in our <Link href="/asvab-study-guide">ASVAB study guide</Link>.
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
