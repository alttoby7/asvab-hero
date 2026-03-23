import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Score for Marines: Line Scores, MOS Requirements (2026) | ASVAB Hero",
  description:
    "Learn the minimum ASVAB score for Marines, all 5 line score formulas, MOS requirements for popular jobs, and FY2026 enlistment bonuses. Free calculator included.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-score-for-marines",
  },
};

export default function ASVABScoreForMarinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "ASVAB Score for Marines: Minimum Scores, Line Score Formulas, and MOS Requirements (2026)",
          description:
            "Learn the minimum ASVAB score for Marines, all 5 line score formulas, MOS requirements for popular jobs, and FY2026 enlistment bonuses. Free calculator included.",
          url: "https://asvabhero.com/asvab-score-for-marines",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-23",
          dateModified: "2026-03-23",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the minimum ASVAB score for the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The minimum AFQT score is 31 with a high school diploma or 50 with a GED. Waivers down to 25 exist but are approved for roughly 1% of applicants. A 31 is an enlistment floor, not a job qualification score. Most Marine MOSs require line scores well above what a 31 AFQT produces.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do you need for Marine infantry (0311)?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Infantry requires a GT line score of 80, one of the lower MOS thresholds. GT = VE + AR (which is WK + PC + AR). Most recruits who pass the 31 AFQT minimum will still need to score somewhat higher to reach GT 80.",
              },
            },
            {
              "@type": "Question",
              name: "What is a GT score on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT stands for General Technical. It is the most commonly required line score for Marine Corps MOSs. The formula is GT = VE + AR, where VE is your combined Word Knowledge and Paragraph Comprehension score. GT is not capped at 99 like AFQT. Scores above 150 are achievable with strong verbal and arithmetic performance.",
              },
            },
            {
              "@type": "Question",
              name: "What happens if my ASVAB score is too low for the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "If your AFQT is below 31, you cannot enlist without a rare waiver. If your AFQT is above 31 but your line scores are too low for your target MOS, you can retake the ASVAB after 30 days. Focus on AR and WK/PC, which feed the most line scores. Use the calculator to identify exactly which subtests to target.",
              },
            },
            {
              "@type": "Question",
              name: "How long are ASVAB scores valid for the Marine Corps?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ASVAB scores are valid for two years from the test date. If your scores expire before you ship to boot camp, you will need to retest. Scores do not expire once you have enlisted and entered active duty or the reserves.",
              },
            },
            {
              "@type": "Question",
              name: "What Marine jobs require the highest ASVAB scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Cyberspace Warfare Operator (1721) requires GT 115 and EL 115, making it one of the toughest to qualify for. Unmanned Aircraft Systems Operator (7314) needs GT 110. Network Administrator (0631) requires both GT 110 and EL 110. These MOSs also carry the largest enlistment bonuses.",
              },
            },
            {
              "@type": "Question",
              name: "Which ASVAB subtests do Marines actually use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Marine Corps uses 8 of the 9 ASVAB subtests: WK, PC, AR, MK, GS, EI, MC, and AS. Assembling Objects (AO) is not used in any USMC line score formula. If study time is limited, skip AO entirely and focus on AR and the verbal subtests. See how many questions on the ASVAB for the full subtest breakdown.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Score for Marines: Minimum Scores, Line Score Formulas, and MOS Requirements (2026)
        </h1>

        <p className="mt-4 text-text-secondary">
          The minimum <strong>ASVAB score for Marines</strong> is 31. That&apos;s the second-lowest of any branch. It&apos;s also almost meaningless.
        </p>

        <p className="text-text-secondary">
          A 31 AFQT gets you through the door at your recruiting station. It does not get you a job worth doing. Line scores determine which of 300+ Marine Corps MOSs you actually qualify for, and most websites get the formulas wrong. This page breaks down the real formulas, shows you how each subtest feeds into your line scores, and lists the requirements for the most popular Marine jobs in FY2026.
        </p>

        <p className="text-text-secondary">
          Want to see where you stand right now? Plug your scores into our <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB calculator</Link> and check your eligibility across every <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">Marine Corps MOS</Link>.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            This guide covers AFQT minimums, all 5 USMC line score formulas, MOS requirements for 12+ popular jobs, FY2026 enlistment bonuses, and a subtest study priority system.
          </p>
        </aside>

        {/* ─── Minimum ASVAB Score ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum ASVAB Score to Join the Marines
        </h2>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">31 AFQT</p>
            <p className="mt-1 text-sm text-text-secondary">High school diploma minimum</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">50 AFQT</p>
            <p className="mt-1 text-sm text-text-secondary">GED minimum</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">25 AFQT</p>
            <p className="mt-1 text-sm text-text-secondary">Waiver floor (approved for roughly 1% of applicants)</p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          Your AFQT score is a percentile. A 31 means you scored better than 31% of the norming population on four subtests: Arithmetic Reasoning (AR), Mathematics Knowledge (MK), Word Knowledge (WK), and Paragraph Comprehension (PC). The full breakdown is at <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB scores explained</Link>.
        </p>

        <p className="text-text-secondary">
          GED holders face a higher bar. The Marines require a 50 AFQT with a GED, and fewer than 5% of annual enlistees come in through this path. If you&apos;ve completed 15 or more college semester hours, you may reclassify as a Tier 1 applicant and use the 31 minimum instead. This is not automatic. Confirm eligibility with your recruiter before counting on it.
        </p>

        {/* Branch AFQT Minimums Table */}
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
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Marines</strong></td>
                <td className="py-2 pr-4 font-mono"><strong>31</strong></td>
                <td className="py-2 font-mono"><strong>50</strong></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Waivers to 25 AFQT exist but are rare. They require your recruiter to submit a package demonstrating other qualifying factors, and approval rates sit around 1%. Don&apos;t plan around getting one.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 31 gets you in the door but qualifies you for almost nothing worth choosing. Most desirable MOSs need line scores of 90 to 115+, which demands subtest performance well above the AFQT floor.
          </p>
        </aside>

        <p className="text-text-secondary">
          For context on where 31 falls across all branches, see our <Link href="/asvab-score-ranges" className="text-accent hover:text-accent-hover">ASVAB score ranges</Link> breakdown and the full guide on <Link href="/what-is-a-good-asvab-score" className="text-accent hover:text-accent-hover">what is a good ASVAB score</Link>.
        </p>

        {/* ─── Line Score Formulas ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps Line Score Formulas
        </h2>

        <p className="mt-4 text-text-secondary">
          Search &ldquo;Marine Corps GT formula&rdquo; and you&apos;ll find three different answers across three different websites. Two are correct notations of the same formula. One is flat wrong.
        </p>

        <p className="text-text-secondary">
          The Marines use five composite line scores. Each is built from specific ASVAB subtests. Here are the actual formulas:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            GT (General Technical) = VE + AR
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            EL (Electronics) = GS + AR + MK + EI
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            MM (Mechanical Maintenance) = AR + EI + MC + AS
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            CL (Clerical) = VE + AR + MK
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            ST (Skilled Technical) = GS + VE + MK + MC
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          One critical detail: <strong>VE is not a subtest you take.</strong> VE (Verbal Expression) is a derived score calculated as WK + PC. So when you see GT = VE + AR, that&apos;s really GT = WK + PC + AR. Both notations are correct. The wrong version floating around adds MK to the GT formula. That&apos;s the CL formula, not GT.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Info</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE = WK + PC. This is a combined verbal score, not a standalone subtest. When a formula says VE, substitute WK + PC.
          </p>
        </aside>

        <p className="text-text-secondary">
          Look at the overlap across line scores:
        </p>

        {/* Subtest x Line Score Grid */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">GT</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">EL</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">MM</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">CL</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">ST</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">WK (via VE)</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 font-mono">&check;</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">PC (via VE)</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 font-mono">&check;</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AR</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 font-mono"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MK</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 font-mono">&check;</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GS</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 font-mono">&check;</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EI</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 font-mono"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MC</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 font-mono">&check;</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">AS</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 pr-4 font-mono">&check;</td>
                <td className="py-2 pr-4 font-mono"></td>
                <td className="py-2 font-mono"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          The pattern matters. AR feeds into 4 of the 5 line scores. VE (WK + PC) feeds into 3 of 5. These are your highest-leverage subtests, and we&apos;ll come back to that in the study section. Check the full <Link href="/asvab-score-chart" className="text-accent hover:text-accent-hover">ASVAB score chart</Link> for more on how composites work, or run your own numbers through the <Link href="/calculator" className="text-accent hover:text-accent-hover">calculator</Link>.
        </p>

        <p className="text-text-secondary">
          For a deeper look at how scoring works across all branches, see <Link href="/asvab-scoring-and-results" className="text-accent hover:text-accent-hover">ASVAB scoring and results</Link>.
        </p>

        {/* ─── Worked Example ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Worked Example: Calculating Your Marine Corps Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Meet a sample recruit. Here are her standard scores from the ASVAB:
        </p>

        {/* Sample Subtest Scores Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Standard Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">WK</td>
                <td className="py-2 font-mono">55</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">PC</td>
                <td className="py-2 font-mono">52</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AR</td>
                <td className="py-2 font-mono">58</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MK</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GS</td>
                <td className="py-2 font-mono">48</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EI</td>
                <td className="py-2 font-mono">45</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MC</td>
                <td className="py-2 font-mono">52</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">AS</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          First, calculate VE: 55 (WK) + 52 (PC) = <strong>107 VE</strong>
        </p>

        <p className="text-text-secondary">
          Now run each formula:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            GT = VE + AR = 107 + 58 = <strong>165</strong>
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            EL = GS + AR + MK + EI = 48 + 58 + 50 + 45 = <strong>201</strong>
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            MM = AR + EI + MC + AS = 58 + 45 + 52 + 50 = <strong>205</strong>
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            CL = VE + AR + MK = 107 + 58 + 50 = <strong>215</strong>
          </div>
          <div className="rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
            ST = GS + VE + MK + MC = 48 + 107 + 50 + 52 = <strong>257</strong>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          With these scores, this recruit qualifies for most Marine Corps MOSs. Her GT of 165 clears every GT requirement on the books. Her EL of 201 easily passes the toughest electronics thresholds. Cross-reference these against the MOS table in the next section to see exactly which jobs open up.
        </p>

        <p className="text-text-secondary">
          Now watch what happens if her AR drops by just 4 points (from 58 to 54):
        </p>

        {/* AR Cascade Effect Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Line Score</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Before (AR=58)</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">After (AR=54)</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Change</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GT</td>
                <td className="py-2 pr-4 font-mono">165</td>
                <td className="py-2 pr-4 font-mono">161</td>
                <td className="py-2 font-mono">-4</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EL</td>
                <td className="py-2 pr-4 font-mono">201</td>
                <td className="py-2 pr-4 font-mono">197</td>
                <td className="py-2 font-mono">-4</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MM</td>
                <td className="py-2 pr-4 font-mono">205</td>
                <td className="py-2 pr-4 font-mono">201</td>
                <td className="py-2 font-mono">-4</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CL</td>
                <td className="py-2 pr-4 font-mono">215</td>
                <td className="py-2 pr-4 font-mono">211</td>
                <td className="py-2 font-mono">-4</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">ST</td>
                <td className="py-2 pr-4 font-mono">257</td>
                <td className="py-2 pr-4 font-mono">257</td>
                <td className="py-2 font-mono">0 (no AR)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          A 4-point swing in AR cascades across four line scores simultaneously. That single subtest has more influence on your Marine Corps job options than any other.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Skip the math. Plug your subtest scores into the <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB calculator</Link> and instantly see your line scores, AFQT, and every <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">Marine Corps MOS</Link> you qualify for.
          </p>
        </aside>

        {/* ─── Popular MOS Requirements ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Score Requirements for Popular Marine Corps Jobs
        </h2>

        <p className="mt-4 text-text-secondary">
          Not all MOSs are created equal. Some need a single line score. Others require you to clear thresholds on two or more composites. Here are the requirements for the most sought-after Marine jobs:
        </p>

        {/* Popular USMC MOS Requirements Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">MOS</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Line Score Requirements</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0311</td>
                <td className="py-2 pr-4">Rifleman</td>
                <td className="py-2 font-mono">GT 80</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0317</td>
                <td className="py-2 pr-4">Scout Sniper</td>
                <td className="py-2 font-mono">GT 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0321</td>
                <td className="py-2 pr-4">Reconnaissance Marine</td>
                <td className="py-2 font-mono">GT 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0111</td>
                <td className="py-2 pr-4">Administrative Specialist</td>
                <td className="py-2 font-mono">CL 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0621</td>
                <td className="py-2 pr-4">Radio Operator</td>
                <td className="py-2 font-mono">GT 100, EL 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0631</td>
                <td className="py-2 pr-4">Network Administrator</td>
                <td className="py-2 font-mono">GT 110, EL 110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0861</td>
                <td className="py-2 pr-4">Fire Support Marine</td>
                <td className="py-2 font-mono">GT 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1141</td>
                <td className="py-2 pr-4">Electrician</td>
                <td className="py-2 font-mono">EL 90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1371</td>
                <td className="py-2 pr-4">Combat Engineer</td>
                <td className="py-2 font-mono">MM 95</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2621</td>
                <td className="py-2 pr-4">Signals Intelligence Analyst</td>
                <td className="py-2 font-mono">GT 100, EL 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2831</td>
                <td className="py-2 pr-4">Digital Wideband System Tech</td>
                <td className="py-2 font-mono">EL 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">7314</td>
                <td className="py-2 pr-4">Unmanned Aircraft Systems Operator</td>
                <td className="py-2 font-mono">GT 110</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">1721</td>
                <td className="py-2 pr-4">Cyberspace Warfare Operator</td>
                <td className="py-2 font-mono">GT 115, EL 115</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT is the most common gatekeeper. In this list alone, 11 of 13 MOSs require a GT threshold. If you only improve one line score, make it GT.
          </p>
        </aside>

        <p className="text-text-secondary">
          Pay attention to dual requirements. MOS 0631 (Network Administrator) needs both GT 110 and EL 110. Meeting one but not the other disqualifies you. MOS 2621 (Signals Intelligence) has the same structure: GT 100 and EL 100. Your ASVAB score for Marines is rarely about a single number.
        </p>

        <p className="text-text-secondary">
          Cyber and intelligence MOSs sit at the top. MOS 1721 demands GT 115 and EL 115, making it one of the hardest Marine jobs to qualify for. Those high thresholds also come with the biggest enlistment bonuses. If you&apos;re 5 points short, the study section below tells you exactly where to focus.
        </p>

        <p className="text-text-secondary">
          Browse the full list of qualifying scores at our <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">USMC MOS list</Link>, or check your numbers with the <Link href="/calculator" className="text-accent hover:text-accent-hover">calculator</Link>. For a look at the rank structure you&apos;ll enter, see <Link href="/marine-corps-ranks" className="text-accent hover:text-accent-hover">Marine Corps ranks</Link>.
        </p>

        {/* ─── AFQT vs Line Scores ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT vs Line Scores: What Actually Matters for Marines
        </h2>

        <p className="mt-4 text-text-secondary">
          These two scoring systems serve completely different purposes. Confusing them is the most common ASVAB mistake recruits make.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          AFQT (Armed Forces Qualification Test)
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-text-secondary">
          <li>Percentile score (1&ndash;99)</li>
          <li>Formula: 2(VE) + AR + MK</li>
          <li>Purpose: determines whether you can enlist</li>
          <li>Threshold: 31 for Marines (diploma)</li>
        </ul>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Line Scores (GT, EL, MM, CL, ST)
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-text-secondary">
          <li>Raw composite scores (no fixed max)</li>
          <li>Purpose: determines which MOS you qualify for</li>
          <li>Higher scores unlock more and better jobs</li>
        </ul>

        <p className="mt-4 text-text-secondary">
          The key distinction: once you clear 31 AFQT, a higher AFQT score does not unlock more jobs. No MOS in the Marine Corps requires &ldquo;AFQT 70&rdquo; or &ldquo;AFQT 85.&rdquo; Jobs only care about line scores.
        </p>

        <p className="text-text-secondary">
          One qualifier: AFQT 50+ opens certain enlistment incentives and gives recruiters more scheduling flexibility. It&apos;s also the minimum for GED holders. But no MOS lists an AFQT requirement.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT 35 with GT 115 qualifies you for more Marine jobs than AFQT 85 with GT 90. The percentile gets you in. The line scores get you the job.
          </p>
        </aside>

        <p className="text-text-secondary">
          There is overlap. The AFQT formula uses VE, AR, and MK. GT uses VE and AR. CL uses all three. So studying for a higher AFQT naturally boosts GT and CL. MK is the swing subtest: it feeds AFQT, EL, CL, and ST, making it the best single addition to a study plan after you&apos;ve covered AR and VE.
        </p>

        <p className="text-text-secondary">
          Read the full breakdown at <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB scores explained</Link> and see <Link href="/what-is-a-good-asvab-score" className="text-accent hover:text-accent-hover">what is a good ASVAB score</Link> for context across branches.
        </p>

        {/* ─── FY2026 Enlistment Bonuses ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FY2026 Marine Corps Enlistment Bonuses by ASVAB Score
        </h2>

        <p className="mt-4 text-text-secondary">
          The Marine Corps ties its biggest enlistment bonuses directly to ASVAB line scores. Higher scores unlock higher-paying contracts. Here is what FY2026 looks like based on MARADMIN 526/25:
        </p>

        {/* FY2026 USMC Enlistment Bonuses Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Bonus Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Eligible MOSs (examples)</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Amount</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Line Score Requirement</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Electronics Maintenance</td>
                <td className="py-2 pr-4">2171, 2831</td>
                <td className="py-2 pr-4 font-mono">Up to $15,000</td>
                <td className="py-2 font-mono">EL 105+</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Cyber/Intel</td>
                <td className="py-2 pr-4">1721, 2621</td>
                <td className="py-2 pr-4 font-mono">Up to $15,000</td>
                <td className="py-2 font-mono">GT 110&ndash;115+, EL 100&ndash;115+</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Shipping Bonus</td>
                <td className="py-2 pr-4">Various</td>
                <td className="py-2 pr-4 font-mono">$5,000&ndash;$10,000</td>
                <td className="py-2 font-mono">Varies by MOS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Contract Extension (5&ndash;6 yr)</td>
                <td className="py-2 pr-4">Various</td>
                <td className="py-2 pr-4 font-mono">$7,000&ndash;$15,000</td>
                <td className="py-2 font-mono">Meets MOS minimums</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          The pattern is straightforward. The highest-paying bonuses attach to MOSs with the highest line score requirements. Cyber and electronics fields consistently top the list because they compete directly with private-sector salaries, and the Marines struggle to fill these billets. Your ASVAB score for Marines determines not just your job but your bonus eligibility.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 10-point EL improvement could be worth $15,000. If you&apos;re scoring EL 95 right now and the bonus threshold is EL 105, that gap is not just about job options. It&apos;s cash in your pocket at boot camp.
          </p>
        </aside>

        <p className="text-text-secondary">
          Important: bonuses require a guaranteed MOS contract. Open contracts do not qualify. You must sign for a specific program designator that includes the bonus-eligible MOS before you ship.
        </p>

        <p className="text-text-secondary">
          Bonus amounts and eligibility change quarterly. These are FY2026 figures from MARADMIN 526/25. Confirm current numbers with your recruiter, but use these figures for planning. For study strategies to close the gap, see <Link href="/how-to-study-for-the-asvab" className="text-accent hover:text-accent-hover">how to study for the ASVAB</Link>. Browse all eligible MOSs at the <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">USMC MOS list</Link>.
        </p>

        {/* ─── What to Study First ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What to Study First: Highest Leverage Subtests for Marines
        </h2>

        <p className="mt-4 text-text-secondary">
          Not all subtests are equally important. Some feed into four line scores. Others feed into one or none. Here is the priority system:
        </p>

        {/* Subtest Study Priority Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Tier</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Feeds Into</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Impact</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 1</strong></td>
                <td className="py-2 pr-4">AR (Arithmetic Reasoning)</td>
                <td className="py-2 pr-4 font-mono">GT, EL, MM, CL (4/5)</td>
                <td className="py-2">Highest leverage subtest</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 1</strong></td>
                <td className="py-2 pr-4">WK + PC (Verbal Expression)</td>
                <td className="py-2 pr-4 font-mono">GT, CL, ST (3/5)</td>
                <td className="py-2">Easiest to improve quickly</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 2</strong></td>
                <td className="py-2 pr-4">MK (Math Knowledge)</td>
                <td className="py-2 pr-4 font-mono">EL, CL, ST (3/5)</td>
                <td className="py-2">Unlocks electronics and clerical</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 2</strong></td>
                <td className="py-2 pr-4">GS (General Science)</td>
                <td className="py-2 pr-4 font-mono">EL, ST (2/5)</td>
                <td className="py-2">Boosts technical composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 3</strong></td>
                <td className="py-2 pr-4">EI (Electronics Info)</td>
                <td className="py-2 pr-4 font-mono">EL, MM (2/5)</td>
                <td className="py-2">Electronics-specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 3</strong></td>
                <td className="py-2 pr-4">MC (Mechanical Comprehension)</td>
                <td className="py-2 pr-4 font-mono">MM, ST (2/5)</td>
                <td className="py-2">Mechanical-specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Tier 3</strong></td>
                <td className="py-2 pr-4">AS (Auto &amp; Shop)</td>
                <td className="py-2 pr-4 font-mono">MM (1/5)</td>
                <td className="py-2">Narrow impact</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary"><strong>Not used</strong></td>
                <td className="py-2 pr-4">AO (Assembling Objects)</td>
                <td className="py-2 pr-4 font-mono">None (0/5)</td>
                <td className="py-2">Not in any USMC line score</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          The AR cascade effect is real. A 5-point AR improvement gives you +5 in GT, +5 in EL, +5 in MM, and +5 in CL simultaneously. No other single subtest moves the needle that much.
        </p>

        <p className="text-text-secondary">
          VE (WK + PC) is your second priority and the easiest to improve. Vocabulary builds on itself. Reading comprehension strategies can be learned in days. These verbal skills feed GT, CL, and ST.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>2 weeks to test?</strong> Focus 60% on AR, 40% on WK/PC. That covers GT and CL, the two most common MOS gatekeepers. <strong>4+ weeks?</strong> Add MK and GS to unlock higher EL and ST scores.
          </p>
        </aside>

        <p className="text-text-secondary">
          Start with our <Link href="/asvab-arithmetic-reasoning-tips" className="text-accent hover:text-accent-hover">Arithmetic Reasoning tips</Link> and <Link href="/asvab-word-knowledge-tips" className="text-accent hover:text-accent-hover">Word Knowledge tips</Link>. For reading strategies, see <Link href="/asvab-paragraph-comprehension-tips" className="text-accent hover:text-accent-hover">Paragraph Comprehension tips</Link>. The full <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">ASVAB study guide</Link> ties everything together.
        </p>

        {/* ─── How to Retake ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Retake the ASVAB for a Higher Marine Corps Score
        </h2>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">30 days</p>
            <p className="mt-1 text-sm text-text-secondary">Wait after first attempt</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">30 days</p>
            <p className="mt-1 text-sm text-text-secondary">Wait after second attempt</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">6 months (180 days)</p>
            <p className="mt-1 text-sm text-text-secondary">Wait after third and every subsequent attempt</p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          Your most recent score replaces your previous one. There is no &ldquo;keep the higher score&rdquo; rule. If you scored GT 105 the first time and retake without adequate preparation, you could end up with GT 98.
        </p>

        <p className="text-text-secondary">
          The C-Test is the other consideration. If your retest score jumps 20 or more points above your previous AFQT, MEPS may flag you for a confirmation test. This is a different ASVAB version administered under tighter proctoring. It is not a punishment. It is a verification tool. Study genuinely and you will confirm the gain.
        </p>

        <p className="text-text-secondary">
          If you&apos;re in the Delayed Entry Program (DEP) already, talk to your recruiter before retaking. A lower score could affect your current MOS contract. Some recruiters will discourage a retest if you already have a guaranteed contract you want.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The 30-day wait is a gift. Use it. That&apos;s enough time to move AR and VE scores meaningfully with focused daily study. Don&apos;t retest on a whim.
          </p>
        </aside>

        <p className="text-text-secondary">
          Full retake rules and strategies are at <Link href="/how-to-retake-the-asvab" className="text-accent hover:text-accent-hover">how to retake the ASVAB</Link>. Build your study plan with a <Link href="/practice-test" className="text-accent hover:text-accent-hover">practice test</Link> and the <Link href="/how-to-study-for-the-asvab" className="text-accent hover:text-accent-hover">study guide</Link>.
        </p>

        {/* ─── Open Contract vs Guaranteed MOS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Open Contract vs Guaranteed MOS: Why Your Score Matters Even More
        </h2>

        <p className="mt-4 text-text-secondary">
          There are two ways to enlist in the Marine Corps, and your ASVAB score for Marines directly determines which option you get.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Guaranteed MOS (Program Designator)
        </h3>
        <p className="mt-2 text-text-secondary">
          You sign a contract specifying your occupational field before you ship to boot camp. Examples: BK (infantry), CK (electronics/communications), DB (data/intelligence). Your MOS is locked. You know what you&apos;re training for.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Open Contract
        </h3>
        <p className="mt-2 text-text-secondary">
          You ship with no guaranteed MOS. The Marine Corps assigns you a job during or after boot camp based on what they need to fill. You might get something decent. You might get something you never wanted.
        </p>

        <p className="mt-4 text-text-secondary">
          Higher ASVAB scores give you leverage. With strong line scores, you qualify for more program designators and can negotiate with your recruiter from a position of strength. A recruit with GT 115 and EL 110 has options. A recruit with GT 82 does not.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Never sign an open contract if you care about your MOS. If your scores aren&apos;t high enough for the job you want, retake the ASVAB. A 30-day wait beats four years in a job you didn&apos;t choose.
          </p>
        </aside>

        <p className="text-text-secondary">
          Recruiters sometimes push open contracts when they have quotas to fill. That&apos;s their job. Your job is to know your line scores, understand what you qualify for, and hold out for a guaranteed contract. Check your qualifications at the <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">USMC MOS list</Link>, use the <Link href="/calculator" className="text-accent hover:text-accent-hover">calculator</Link> to verify your scores, and if you&apos;re short, see <Link href="/how-to-retake-the-asvab" className="text-accent hover:text-accent-hover">how to retake the ASVAB</Link>.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is the minimum ASVAB score for the Marines?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The minimum AFQT score is 31 with a high school diploma or 50 with a GED. Waivers down to 25 exist but are approved for roughly 1% of applicants. A 31 is an enlistment floor, not a job qualification score. Most Marine MOSs require line scores well above what a 31 AFQT produces.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What ASVAB score do you need for Marine infantry (0311)?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Infantry requires a GT line score of 80, one of the lower MOS thresholds. GT = VE + AR (which is WK + PC + AR). Most recruits who pass the 31 AFQT minimum will still need to score somewhat higher to reach GT 80.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is a GT score on the ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT stands for General Technical. It is the most commonly required line score for Marine Corps MOSs. The formula is GT = VE + AR, where VE is your combined Word Knowledge and Paragraph Comprehension score. GT is not capped at 99 like AFQT. Scores above 150 are achievable with strong verbal and arithmetic performance.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What happens if my ASVAB score is too low for the Marines?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              If your AFQT is below 31, you cannot enlist without a rare waiver. If your AFQT is above 31 but your line scores are too low for your target MOS, you can retake the ASVAB after 30 days. Focus on AR and WK/PC, which feed the most line scores. Use the <Link href="/calculator" className="text-accent hover:text-accent-hover">calculator</Link> to identify exactly which subtests to target.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How long are ASVAB scores valid for the Marine Corps?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              ASVAB scores are valid for two years from the test date. If your scores expire before you ship to boot camp, you will need to retest. Scores do not expire once you have enlisted and entered active duty or the reserves.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What Marine jobs require the highest ASVAB scores?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Cyberspace Warfare Operator (1721) requires GT 115 and EL 115, making it one of the toughest to qualify for. Unmanned Aircraft Systems Operator (7314) needs GT 110. Network Administrator (0631) requires both GT 110 and EL 110. These MOSs also carry the largest enlistment bonuses.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Which ASVAB subtests do Marines actually use?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Marine Corps uses 8 of the 9 ASVAB subtests: WK, PC, AR, MK, GS, EI, MC, and AS. Assembling Objects (AO) is not used in any USMC line score formula. If study time is limited, skip AO entirely and focus on AR and the verbal subtests. See <Link href="/how-many-questions-on-the-asvab" className="text-accent hover:text-accent-hover">how many questions on the ASVAB</Link> for the full subtest breakdown.
            </p>
          </div>
        </div>

        {/* ─── CTA Box ─── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">See What Your Scores Unlock</h3>
          <p className="mt-2 text-sm text-text-secondary">Enter your 9 subtest scores and instantly see your AFQT, composite scores, and every job you qualify for.</p>
          <Link href="/calculator" className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline">Try the Free Calculator</Link>
        </div>
      </article>
    </div>
  );
}
