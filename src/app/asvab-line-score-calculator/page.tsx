import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Calculator from "@/components/Calculator";
import EmailCapture from "@/components/EmailCapture";
import type { MilitaryJob } from "@/types";

import armyJobs from "@/data/army-jobs.json";
import airForceJobs from "@/data/air-force-jobs.json";
import marinesJobs from "@/data/marines-jobs.json";
import navyJobs from "@/data/navy-jobs.json";
import coastGuardJobs from "@/data/coast-guard-jobs.json";
import spaceForceJobs from "@/data/space-force-jobs.json";

function addBranch(
  jobs: Record<string, unknown>[],
  branch: MilitaryJob["branch"]
): MilitaryJob[] {
  return jobs.map((j) => ({ ...j, branch }) as MilitaryJob);
}

const allJobs: MilitaryJob[] = [
  ...addBranch(armyJobs, "army"),
  ...addBranch(airForceJobs, "air_force"),
  ...addBranch(marinesJobs, "marines"),
  ...addBranch(navyJobs, "navy"),
  ...addBranch(coastGuardJobs, "coast_guard"),
  ...addBranch(spaceForceJobs, "space_force"),
];

export const metadata: Metadata = {
  title: "Free ASVAB Line Score Calculator: All 6 Branches (2026)",
  description:
    "Calculate your ASVAB line scores free for Army, Marines, Air Force, Navy, Space Force and Coast Guard. Enter your subtests and instantly see every military job you qualify for.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-line-score-calculator",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "ASVAB Line Score Calculator: Turn Your Subtest Scores Into a Job List",
  description:
    "Learn how ASVAB line scores are calculated for Army, Marines, Air Force, Navy, and Coast Guard. Use our free calculator to see every job you qualify for.",
  url: "https://asvabhero.com/asvab-line-score-calculator",
  author: {
            "@type": "Person",
            "@id": "https://asvabhero.com/team/jordan-avery#editor",
            name: "Jordan Avery",
            url: "https://asvabhero.com/team/jordan-avery",
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
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between an AFQT score and a line score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AFQT is one percentile (1 to 99) from four subtests using 2(VE) + AR + MK. It decides whether you can enlist. Line scores are raw sums of standard scores using all 9 subtests, and they decide which MOS, AFSC, or rating you qualify for. AFQT is the gate. Line scores are the menu.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Marine Corps GT formula include Mechanical Comprehension?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. USMC GT = VE + AR, identical to Army GT. MC feeds the Marine MM composite. Sites that list Marine GT as WK + PC + AR + MC produce wrong numbers for Recon (GT 105), Cyber 0651 (GT 110), and every other GT-gated USMC MOS.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Air Force MAGE system and how is it different from Army line scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MAGE stands for Mechanical, Administrative, General, Electronics: M = GS + MC + 2(AS), A = WK + PC + MK, G = AR + VE, E = GS + AR + MK + EI. MAGE composites are scaled to percentiles (0 to 99), not raw sums. A G of 72 means you outperformed 72 percent of the reference population. Space Force uses the same system with some higher minimums.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Navy Nuclear Field (NUC) composite calculated and what is the minimum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NUC uses a dual-path composite, qualifying if either clears 252: VE + AR + MK + MC OR AR + MK + EI + GS. Floor: AR + MK >= 110, AFQT >= 50. NAPT backup: VE + AR + MK + MC + NAPT >= 290 with NAPT >= 55.",
      },
    },
    {
      "@type": "Question",
      name: "What subtests should I study hardest to improve the most line scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arithmetic Reasoning (AR) appears in roughly 14 named composites across all six branches. Verbal Expression (VE) appears in 12 and is doubled in AFQT. Recommended split: 30% AR, 25% VE, 25% MK, 20% EI.",
      },
    },
  ],
};

export default function ASVABLineScoreCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">

        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Line Score Calculator: Turn Your Subtest Scores Into a Job List
        </h1>

        <p className="mt-4 text-text-secondary">
          You walked out of the test with a stack of numbers. A 64 here, a 102
          there, a 51 percentile somewhere else. Now you want to know which
          military jobs those numbers actually unlock.
        </p>

        <p className="text-text-secondary">
          AFQT decides whether you can enlist. Line scores decide which job you
          get.
        </p>

        <p className="text-text-secondary">
          Use the <strong>ASVAB line score calculator</strong> below to enter
          your subtest standard scores and see every composite at once: Army GT,
          Marine CL, Air Force MAGE, Navy NUC, Coast Guard ratings, Space Force
          percentiles.
        </p>

        <p className="text-text-secondary">
          This guide explains how line scores are calculated for all six
          branches, fixes the two myths that break most home-built calculators
          (AFQT is not a line score, and Marine GT does not include Mechanical
          Comprehension), and shows how to reverse-engineer your study plan from
          the MOS you want.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Two gates. AFQT decides if you can enlist. Line scores decide which
            job you qualify for. Read both numbers, not just one.
          </p>
        </aside>

        <div className="my-6 overflow-hidden rounded-2xl ring-1 ring-navy-border">
          <Suspense>
            <Calculator allJobs={allJobs} />
          </Suspense>
        </div>

        {/* AFQT vs Line Scores */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT vs Line Scores: The Two Gates Every Recruit Must Clear
        </h2>

        <p className="mt-4 text-text-secondary">
          A 99 AFQT does not guarantee you qualify for a single technical job.
          That trips up almost every recruit who walks out of MEPS thinking AFQT
          is the only number that matters.
        </p>

        <p className="text-text-secondary">
          The <Link href="/afqt-score">AFQT score</Link> is one percentile from
          1 to 99, derived from four subtests: AR, MK, WK, PC. The formula is{" "}
          <code className="font-mono text-sm text-accent">2(VE) + AR + MK</code>
          . VE is doubled, which is why verbal study has so much leverage on
          AFQT.
        </p>

        <p className="text-text-secondary">
          Line scores are raw sums of standard scores (mean 50, SD ~10, range 20
          to 145). The Army has 10. The Air Force has 4. The Navy has dozens,
          one per rating — see the full{" "}
          <Link href="/navy-ratings-list" className="text-accent hover:text-accent-hover">
            Navy ratings list
          </Link>{" "}
          with the required composite for each. Line scores use all 9 subtests,
          including GS, EI, AS, and MC. AFQT ignores those four.
        </p>

        <p className="text-text-secondary">
          A recruit with 99 AFQT and weak EI or GS still has electronics and
          technical jobs locked out. AFQT cleared the enlistment gate. Line
          scores did not clear the job gate.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Dimension
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFQT
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Line Scores
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it measures
                </td>
                <td className="py-2 pr-4">Trainability percentile</td>
                <td className="py-2">Specific job aptitude</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Number of scores
                </td>
                <td className="py-2 pr-4 font-mono">1</td>
                <td className="py-2">4 to 30+ by branch</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Subtests used
                </td>
                <td className="py-2 pr-4 font-mono">AR, MK, WK, PC</td>
                <td className="py-2">All 9 including GS, EI, AS, MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Score type
                </td>
                <td className="py-2 pr-4">Percentile (1&ndash;99)</td>
                <td className="py-2">Raw sum of standard scores</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it determines
                </td>
                <td className="py-2 pr-4">Whether you can enlist</td>
                <td className="py-2">Which MOS, AFSC, or rating</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT gets you in. Line scores get you the job you want. If a
            recruiter only quotes your AFQT, ask for the full line score
            breakdown before signing anything.
          </p>
        </aside>

        {/* How Subtest Scores Build Line Scores */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Subtest Scores Build Line Scores: Standard Scores, VE, and the
          Math
        </h2>

        <p className="mt-4 text-text-secondary">
          Standard scores are the currency of every line score formula. Each
          subtest produces a standard score with mean 50, SD ~10, range 20 to
          145. Line scores add standard scores. Not raw correct counts. Not
          percentiles.
        </p>

        <p className="text-text-secondary">
          The 9 ASVAB subtests that feed line score composites:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>GS</strong> (General Science), <strong>AR</strong>{" "}
            (Arithmetic Reasoning), <strong>WK</strong> (Word Knowledge)
          </li>
          <li>
            <strong>PC</strong> (Paragraph Comprehension), <strong>MK</strong>{" "}
            (Mathematics Knowledge), <strong>EI</strong> (Electronics
            Information)
          </li>
          <li>
            <strong>AS</strong> (Auto and Shop), <strong>MC</strong> (Mechanical
            Comprehension), <strong>AO</strong> (Assembling Objects)
          </li>
        </ul>

        <p className="text-text-secondary">
          Two legacy subtests, Numerical Operations (NO) and Coding Speed (CS),
          appeared in older Air Force formulas but were removed from the ASVAB in
          2002. All current branch formulas use the nine subtests listed above.
        </p>

        <p className="text-text-secondary">
          VE is the verbal expression score. It is not simply WK + PC. The
          actual conversion uses a lookup table, but VE arrives pre-calculated
          on your score report. Use the printed VE value.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>

        <p className="text-text-secondary">
          A 5-point gain in VE means a 10-point AFQT swing. A 5-point gain in
          AR or MK only moves AFQT by 5.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE is the most common mistake on home-built calculators. Use the VE
            value printed on your score report rather than reconstructing it
            from WK and PC. The calculator above accepts the printed VE
            directly.
          </p>
        </aside>

        <p className="text-text-secondary">
          For deeper subtest scaling details, see{" "}
          <Link href="/asvab-scores-explained">ASVAB Scores Explained</Link>.
        </p>

        {/* Army Line Scores */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Line Scores: 10 Composites and the GT 110 Threshold
        </h2>

        <p className="mt-4 text-text-secondary">
          GT 110 opens Special Forces, Army Cyber (17C), Drill Sergeant,
          Recruiter, and Green to Gold. It comes from two subtests: VE + AR.
        </p>

        <p className="text-text-secondary">
          The Army uses 10 line score composites: GT, CL, CO, EL, FA, GM, MM,
          OF, SC, ST. The max GT is 135; the competitive range runs 100 to 135.
          GT 107 opens Rangers, Combat Medic (68W), and Intel Analyst (35F).
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Sample MOS Requiring It
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GT (General Technical)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">
                  17C Cyber Ops (GT 110), 18X Special Forces (GT 110)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CL (Clerical)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR + MK</td>
                <td className="py-2">42A Human Resources</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CO (Combat)
                </td>
                <td className="py-2 pr-4 font-mono">AR + CS + AS + MC</td>
                <td className="py-2">11B Infantry</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EL (Electronics)
                </td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2">25B IT Specialist</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  FA (Field Artillery)
                </td>
                <td className="py-2 pr-4 font-mono">AR + CS + MK + MC</td>
                <td className="py-2">13B Cannon Crewmember</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GM (General Maintenance)
                </td>
                <td className="py-2 pr-4 font-mono">GS + AS + MK + EI</td>
                <td className="py-2">91J Quartermaster</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MM (Mechanical Maintenance)
                </td>
                <td className="py-2 pr-4 font-mono">AS + EI + MC</td>
                <td className="py-2">91B Wheeled Vehicle Mechanic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  OF (Operators and Food)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AS + MC</td>
                <td className="py-2">92G Culinary Specialist</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SC (Surveillance and Communications)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR + AS + MC</td>
                <td className="py-2">25C Radio Operator</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ST (Skilled Technical)
                </td>
                <td className="py-2 pr-4 font-mono">GS + VE + MK + MC</td>
                <td className="py-2">68W Combat Medic (ST 107)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          CO and FA include CS (Coding Speed), which is not on the modern
          CAT-ASVAB. Scores get reconciled at MEPS using equivalent measures.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 110 is the single most strategic threshold in the Army ASVAB
            game. If you are within 5 points, retake. A 5 to 10 point GT
            improvement is realistic in 4 to 6 weeks of focused AR and verbal
            study.
          </p>
        </aside>

        <p className="text-text-secondary">
          Scroll to the calculator above to see your GT alongside
          all 10 Army composites.
        </p>

        {/* Marine Corps */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps Line Scores: Correcting the GT Formula Myth
        </h2>

        <p className="mt-4 text-text-secondary">
          Half the calculators online tell you Marine GT = WK + PC + AR + MC.
          That is wrong. Marine GT = VE + AR, identical to Army GT.
        </p>

        <p className="text-text-secondary">
          The error spreads because popular sites (including easy-prep.org) list
          USMC GT with Mechanical Comprehension. MC feeds the USMC MM composite,
          not GT. If a calculator returns a USMC GT in the 90 to 99 range while
          your AR and VE are strong, the formula is wrong.
        </p>

        <p className="text-text-secondary">
          The Marine Corps uses four line score composites: GT, CL, EL, MM.
          Each MOS lists one with a minimum.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  USMC Composite
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Sample MOS
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GT (General Technical)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Recon 0321</td>
                <td className="py-2 font-mono">105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GT
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Cyber Network Operator 0651</td>
                <td className="py-2 font-mono">110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GT
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2 pr-4">Rifleman 0311</td>
                <td className="py-2 font-mono">80</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CL (Clerical)
                </td>
                <td className="py-2 pr-4 font-mono">VE + MK + AS</td>
                <td className="py-2 pr-4">Administrative Clerk</td>
                <td className="py-2">varies</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EL (Electronics)
                </td>
                <td className="py-2 pr-4 font-mono">AR + MK + EI + GS</td>
                <td className="py-2 pr-4">Ground Radio Repairer</td>
                <td className="py-2 font-mono">115</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MM (Mechanical Maintenance)
                </td>
                <td className="py-2 pr-4 font-mono">NO + AS + MC + EI</td>
                <td className="py-2 pr-4">Calibration Tech 2871</td>
                <td className="py-2 font-mono">115</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">
            Key Point: Myth vs Fact
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Myth: Marine GT includes Mechanical Comprehension. Fact: USMC GT =
            VE + AR. MC feeds MM, not GT. Any calculator using a different USMC
            GT formula returns wrong numbers for Recon, Cyber, and every other
            GT-gated USMC MOS.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the full list of Marine job codes, see{" "}
          <Link href="/usmc-mos-list">USMC MOS List</Link>.
        </p>

        {/* Air Force MAGE */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force and Space Force MAGE: Why Your Composite Is a Percentile
        </h2>

        <p className="mt-4 text-text-secondary">
          Your Air Force G score is not on the same scale as your Army GT, even
          though they use almost the same subtests. That trips up recruits
          comparing composites across branches.
        </p>

        <p className="text-text-secondary">
          The Air Force uses MAGE: Mechanical, Administrative, General,
          Electronics. Space Force inherited the system and uses identical MAGE
          composites for every Guardian career field, though some roles set
          higher minimums.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          M (Mechanical) = GS + MC + 2(AS)
          <br />
          A (Administrative) = WK + PC + MK
          <br />
          G (General) = AR + VE
          <br />
          E (Electronics) = GS + AR + MK + EI
        </div>

        <p className="text-text-secondary">
          AS is double-weighted in M. Auto and Shop matters twice as much for
          mechanical AFSCs as it does for any other composite in any other
          branch.
        </p>

        <p className="text-text-secondary">
          AF MAGE composites are scaled to percentiles (0 to 99), not raw sums.
          A G of 72 means you outperformed 72 percent of the reference
          population. It does not mean VE + AR equals 72. AFSC minimums
          typically run 28 to 72.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFSC
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Cyber Warfare Operations 1B4X1
                </td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 font-mono">72</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SIGINT Analyst 1N2X1
                </td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 font-mono">72</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Intelligence Analyst 1N0X1
                </td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 font-mono">64</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Loadmaster 1A2X1
                </td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 font-mono">55</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Security Forces 3P0X1
                </td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 font-mono">33</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Aerospace Propulsion 2A6X1
                </td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 font-mono">56</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tactical Aircraft Maintenance 2A3X7
                </td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 font-mono">47</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Avionics Test Station 2A0X1
                </td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 font-mono">70</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Some USSF roles have higher minimums than their AF equivalents.
            Check the official Guardian career list before assuming a G 64 will
            clear every Space Force AFSC.
          </p>
        </aside>

        <p className="text-text-secondary">
          Full AFSC list at{" "}
          <Link href="/air-force-afsc-list">Air Force AFSC List</Link>.
        </p>

        {/* Navy and Coast Guard */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy and Coast Guard Composites: Rating-Specific Math
        </h2>

        <p className="mt-4 text-text-secondary">
          The Navy has no GT score. Every rating has its own formula, and some
          require clearing two or three thresholds at once. The Coast Guard
          borrows the Navy system.
        </p>

        <p className="text-text-secondary">
          The Nuclear Field (NUC) program uses a dual-path composite. You
          qualify if either path clears.
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>Path 1: VE + AR + MK + MC &gt;= 252</li>
          <li>Path 2: AR + MK + EI + GS &gt;= 252</li>
        </ul>

        <p className="text-text-secondary">
          Floor: AR + MK &gt;= 110. AFQT must be 50+. If you fall short, the
          Navy Advanced Programs Test (NAPT) provides a backup: VE + AR + MK +
          MC + NAPT &gt;= 290 with NAPT &gt;= 55.
        </p>

        <p className="text-text-secondary">
          The SEAL (SO) rating uses three composite paths.
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>Path 1: GS + MC + EI &gt;= 170</li>
          <li>Path 2: VE + MK + MC + CS &gt;= 220</li>
          <li>Path 3: AR + VE &gt;= 110 with MC &gt; 50</li>
        </ul>

        <p className="text-text-secondary">
          All three share a floor: AR + MK &gt;= 100.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite Formula
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Nuclear Field (NUC)
                </td>
                <td className="py-2 pr-4 font-mono">
                  VE+AR+MK+MC or AR+MK+EI+GS
                </td>
                <td className="py-2 font-mono">252</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Special Warfare Operator (SEAL)
                </td>
                <td className="py-2 pr-4 font-mono">
                  GS+MC+EI / VE+MK+MC+CS / AR+VE
                </td>
                <td className="py-2 font-mono">170 / 220 / 110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Hospital Corpsman (HM)
                </td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+GS</td>
                <td className="py-2 font-mono">208</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fire Controlman (FC)
                </td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 font-mono">222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Cyber Warfare Tech (CWT)
                </td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS</td>
                <td className="py-2 font-mono">239</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Logistics Specialist (LS)
                </td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 font-mono">96</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Aviation Electronics Tech (AT)
                </td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 font-mono">222</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Coast Guard borrows the Navy composite system. Same math, different
            career field.
          </p>
        </aside>

        <p className="text-text-secondary">
          For a deeper breakdown of Navy scoring conventions, see{" "}
          <Link href="/navy-asvab-score">Navy ASVAB Score</Link>.
        </p>

        {/* AR Highest-Leverage */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AR Is the Highest-Leverage Subtest: The Study Math No One Else
          Mentions
        </h2>

        <p className="mt-4 text-text-secondary">
          If you only have time to drill one subtest, drill Arithmetic Reasoning.
          AR appears in roughly 14 named composite formulas across all six
          branches, more than any other subtest.
        </p>

        <p className="text-text-secondary">
          AR is in Army GT, CL, EL, FA, and SC. Marines GT and EL. Air Force G
          and E. Navy NUC (both paths), SEAL path 3, AT, FC, and CWT. The Coast
          Guard inherits all the Navy AR-driven composites.
        </p>

        <p className="text-text-secondary">
          VE is close behind. It appears in roughly 12 composites and is doubled
          in AFQT. VE wins for AFQT-only optimization because of the double
          weight; AR wins for line-score breadth because of the formula count.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              AR 30%
            </span>
            <span className="text-sm text-text-secondary">
              Appears in roughly 14 composites across all 6 branches
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              VE 25%
            </span>
            <span className="text-sm text-text-secondary">
              Doubled in AFQT, appears in roughly 12 composites
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              MK 25%
            </span>
            <span className="text-sm text-text-secondary">
              Key for Navy technical ratings and Air Force Electronics
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              EI 20%
            </span>
            <span className="text-sm text-text-secondary">
              Feeds EL composites, Nuclear path 2, and SEAL path 1
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          MK anchors Navy technical ratings (CWT weights it double) and Air
          Force E. EI feeds Electronics composites in every branch plus Nuclear
          path 2 and SEAL path 1.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your goal is AFQT-only, front-load VE for the double-weight. If
            your goal is a specific line score (Cyber, Nuclear, SEAL), check
            that rating&apos;s formula and study the named subtests directly.
          </p>
        </aside>

        <p className="text-text-secondary">
          Build your plan from the{" "}
          <Link href="/asvab-study-guide">ASVAB Study Guide</Link>.
        </p>

        {/* How to Use the Calculator */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Use the Calculator: Reverse-Engineer Your Study Plan from the
          Job You Want
        </h2>

        <p className="mt-4 text-text-secondary">
          The smartest way to use a line score calculator is backwards. Start
          with the job, find its formula, study those subtests.
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Pick the job.</strong> Use your branch&apos;s official MOS,
            AFSC, or rating list.
          </li>
          <li>
            <strong>Find the requirement.</strong> Army Cyber 17C needs GT 110
            and ST 112. Navy Nuclear needs dual-path 252. Marine Recon needs GT
            105.
          </li>
          <li>
            <strong>Identify the subtests.</strong> Army GT = VE + AR. Army ST =
            GS + VE + MK + MC. Navy NUC path 1 = VE + AR + MK + MC.
          </li>
          <li>
            <strong>Calculate the gap.</strong> Enter scores in the calculator
            above. Study subtests with the
            biggest gap first.
          </li>
        </ol>

        <p className="text-text-secondary">
          Worked example: a reader wants Army Cyber 17C (GT 110, ST 112).
          Current scores: VE 50, AR 52, GS 45, MK 50, MC 50.
        </p>

        <p className="text-text-secondary">
          GT = VE + AR = 102. Gap to 110: 8 points. ST = GS + VE + MK + MC =
          195, clearing 112 easily.
        </p>

        <p className="text-text-secondary">
          The bottleneck is GT. AR is the cheapest lever because raising AR from
          52 to 60 also boosts every other AR-driven composite. Eight AR points
          in 4 to 6 weeks is realistic.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 1
            </span>
            <span className="text-sm text-text-secondary">
              Pick the job from the official MOS, AFSC, or rating list
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 2
            </span>
            <span className="text-sm text-text-secondary">
              Find the requirement, including dual-path or floor minimums
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 3
            </span>
            <span className="text-sm text-text-secondary">
              Identify subtests in the formula
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 4
            </span>
            <span className="text-sm text-text-secondary">
              Calculate the gap and study what is short
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Retake rules: first two retakes wait 30 days; after that, 6 months. A
          4 to 6 week prep cycle on AR, WK, and PC reliably moves GT by 10 to
          15 points.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Recruiters do this reverse calculation on a clipboard. The
            calculator lets you do it first, so you walk into MEPS knowing
            exactly which jobs your scores unlock.
          </p>
        </aside>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between an AFQT score and a line score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT is one percentile (1 to 99) from four subtests using{" "}
              <code className="font-mono text-accent">2(VE) + AR + MK</code>. It
              decides whether you can enlist. Line scores are raw sums of
              standard scores using all 9 subtests, and they decide which MOS,
              AFSC, or rating you qualify for. AFQT is the gate. Line scores are
              the menu.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Marine Corps GT formula include Mechanical Comprehension?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. USMC GT = VE + AR, identical to Army GT. MC feeds the Marine
              MM composite. Sites that list Marine GT as WK + PC + AR + MC
              produce wrong numbers for Recon (GT 105), Cyber 0651 (GT 110), and
              every other GT-gated USMC MOS.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the Air Force MAGE system and how is it different from
              Army line scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              MAGE stands for Mechanical, Administrative, General, Electronics:
              M = GS + MC + 2(AS), A = WK + PC + MK, G = AR + VE, E = GS + AR
              + MK + EI. MAGE composites are scaled to percentiles (0 to 99),
              not raw sums. A G of 72 means you outperformed 72 percent of the
              reference population. Space Force uses the same system with some
              higher minimums.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is the Navy Nuclear Field (NUC) composite calculated and what
              is the minimum?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              NUC uses a dual-path composite, qualifying if either clears 252: VE
              + AR + MK + MC OR AR + MK + EI + GS. Floor: AR + MK &gt;= 110,
              AFQT &gt;= 50. NAPT backup: VE + AR + MK + MC + NAPT &gt;= 290
              with NAPT &gt;= 55.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What subtests should I study hardest to improve the most line
              scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Arithmetic Reasoning (AR) appears in roughly 14 named composites
              across all six branches. Verbal Expression (VE) appears in 12 and
              is doubled in AFQT. Recommended split: 30% AR, 25% VE, 25% MK,
              20% EI.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Verify line score thresholds with your recruiter before signing.
            Branches update minimums regularly. Run scenarios in the calculator
            above before MEPS so you walk in knowing which jobs your numbers
            unlock.
          </p>
        </aside>

        <section className="mt-10 not-prose">
          <EmailCapture
            headline="Hit your target line score — free 30-day study plan"
            subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
            cta="Email me the plan"
            tag="line-score-calculator"
          />
        </section>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            Find Your Weak Subtests Before MEPS
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Take a free 30-question practice test, see which subtests are
            holding back your line scores, and get a study plan that targets
            exactly what you need.
          </p>
          <Link
            href="/practice-test"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Take the Free Practice Test
          </Link>
        </div>

      </article>
    </div>
  );
}
