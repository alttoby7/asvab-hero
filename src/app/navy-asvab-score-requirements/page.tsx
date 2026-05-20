import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Navy ASVAB Score Requirements 2026: Ratings, Nuclear, SEAL",
  description:
    "Learn the exact Navy ASVAB score requirements for 2026. AFQT minimums, 20 rating formulas, nuclear field paths, SEAL/EOD thresholds, and FY2026 bonus caps.",
  alternates: {
    canonical: "https://asvabhero.com/navy-asvab-score-requirements",
  },
};

export default function NavyASVABScoreRequirementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Navy ASVAB Score Requirements: The Complete Qualification Guide for 2026",
          description:
            "Learn the exact Navy ASVAB score requirements for 2026. AFQT minimums, 20 rating formulas, nuclear field paths, SEAL/EOD thresholds, and FY2026 bonus caps.",
          url: "https://asvabhero.com/navy-asvab-score-requirements",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
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
              name: "What is the minimum ASVAB score for the Navy?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The minimum AFQT is 31 for high school diploma holders and 50 for GED or Tier III (no credential) applicants. Applicants scoring 26 to 30 may qualify for the FSPC-A bridge program, which lets you attend a short academic course, retest, and ship to boot camp if you reach 31 or improve by 10+ points.",
              },
            },
            {
              "@type": "Question",
              name: "What Navy jobs can I get with a low ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "At a 31 AFQT, you qualify for roughly 12 of 80+ ratings. These include BM (Boatswain's Mate) with no line score minimum and CS (Culinary Specialist) at VE+AR >= 82. Most technical ratings require composites above 200. Scoring 50+ opens significantly more options.",
              },
            },
            {
              "@type": "Question",
              name: "How do Navy ASVAB scores differ from Army scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Army uses 10 named line scores (GT, CL, EL, etc.). The Navy skips named composites entirely. Each rating has its own formula adding specific subtest scores, often with multiple alternative paths. An Army GT score has no bearing on Navy rating qualification.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need for Navy Nuclear Field?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Without the NAPT: both VE+AR+MK+MC and AR+MK+EI+GS must be 235+, with one reaching 252+. With the NAPT: both combos must hit 225+, NAPT must be 50+, and the combined total must reach 290+. One year of algebra is also required.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need to be a Navy SEAL?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Minimum is GS+MC+EI >= 170 or VE+MK+MC+CS >= 220, plus VE+AR >= 110 and MC >= 50. AFQT minimum is 35. BUD/S graduates historically score at the 78th percentile or higher. The ASVAB is the easy part of SEAL qualification.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB to get a better Navy score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. First retake requires a 1-month wait, second retake another month, then 6 months between each attempt. Your newest score replaces all previous scores. A 20+ point gain within 6 months triggers a confirmation test. Use our calculator to check how improved scores change your options.",
              },
            },
            {
              "@type": "Question",
              name: "Are Navy ASVAB requirements going up in 2026?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Effectively, yes. Line score reductions from the 2022-2023 recruiting crisis reverted on October 1, 2025. FY2026 recruits face the original, stricter subtest requirements. AFQT minimums (31 for diploma, 50 for GED) are unchanged, but rating composites are back to pre-crisis levels.",
              },
            },
            {
              "@type": "Question",
              name: "Can active-duty sailors improve their ASVAB scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, through the AFCT (Armed Forces Classification Test). You need 24+ months in your current rate, under 12 years of service, and PO1 or below. The AFCT is identical to the ASVAB. New scores replace previous scores and can unlock cross-rating opportunities.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy ASVAB Score Requirements: The Complete Qualification Guide for
          2026
        </h1>

        <p className="mt-4 text-text-secondary">
          The Navy&apos;s minimum AFQT is 31. But that number only gets you
          through the front door. A 31 qualifies you for roughly 12 of 80+
          ratings, and most of those are deck jobs.
        </p>

        <p className="text-text-secondary">
          Your <strong>navy ASVAB score</strong> works as a two-gate system. Gate
          one: your AFQT percentile determines whether you can enlist. Gate two:
          your subtest score combinations determine which rating you get. The
          Navy&apos;s composite system is unlike every other branch. No named
          line scores like the Army&apos;s GT or the Air Force&apos;s MAGE. Each
          rating has its own formula, and many offer two or three alternative
          paths to qualify.
        </p>

        <p className="text-text-secondary">
          This guide covers exact AFQT and subtest thresholds for enlistment,
          the 20 most popular ratings, nuclear field, special warfare,
          active-duty retesting via AFCT, FY2026 bonuses, and which subtests to
          study first. If you already have scores, plug them into our{" "}
          <Link href="/calculator">free ASVAB calculator</Link> to see which
          Navy ratings you qualify for.
        </p>

        {/* ── Section: Navy AFQT Minimums by Education Tier ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy AFQT Minimums by Education Tier
        </h2>

        <p className="mt-4 text-text-secondary">
          Your education level sets the AFQT floor. The Navy sorts applicants
          into three tiers.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Education Tier
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Credential
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum AFQT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier I
                </td>
                <td className="py-2 pr-4">High school diploma</td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier II
                </td>
                <td className="py-2 pr-4">GED or equivalent</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier III
                </td>
                <td className="py-2 pr-4">
                  No credential (eligible since Jan 22, 2024)
                </td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Tier II and Tier III applicants face the same 50-point threshold. No
          exceptions.
        </p>

        <p className="text-text-secondary">
          Some websites incorrectly list 35 as the Navy minimum. The official
          number is 31 for diploma holders.
        </p>

        <p className="text-text-secondary">
          <strong>FSPC-A (Future Sailor Preparatory Course &ndash; Academic)</strong>{" "}
          is a bridge program for applicants scoring 26 to 30 on the AFQT. You
          attend a short academic course, retest, and if you hit 31 or gain 10+
          points, you ship to boot camp. The FSPC-A floor was raised from 21 to
          26 on April 1, 2025. As of March 2025, the Navy had graduated 6,002
          recruits through the program.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum AFQT (Diploma)
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 font-mono">40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The Navy ties the Army and Marines for the lowest minimum. But a low
          minimum means limited choices, not easy entry.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GED holders must score 50+ just to enlist. That is Category IIIA
            minimum. Even if your subtest sums qualify you for a great rating, a
            GED holder scoring 49 cannot ship. Diploma holders have a 19-point
            advantage at the gate.
          </p>
        </aside>

        <p className="text-text-secondary">
          For a deeper explanation of the AFQT formula (including the VE
          double-count), see our{" "}
          <Link href="/afqt-score">AFQT score guide</Link>.
        </p>

        <EmailCapture
          headline="Want to know exactly which Navy ratings your scores unlock?"
          subhead="Free PDF study plan plus a 5-email crash course on AFQT, composites, and which subtests matter most for Navy ratings."
          cta="Email me the plan"
          tag="navy-asvab-score-requirements"
        />

        {/* ── Section: AFQT Categories ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories and What They Mean for Navy Opportunities
        </h2>

        <p className="mt-4 text-text-secondary">
          During the 2022 recruiting crisis, the Navy accepted AFQT scores as
          low as 10. Those recruits had an 8.25% attrition rate, below the 11%
          target. The experiment worked, but the standards are back. Your AFQT
          category now shapes everything from rating selection to bonus
          eligibility.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Category
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFQT Range
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Navy Implications
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
                  First pick of any rating, maximum bonus eligibility
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">
                  II
                </td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">
                  Most ratings and bonuses available, strong negotiating position
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">
                  IIIA
                </td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">
                  Solid options, GED holders must reach this tier to enlist
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">
                  IIIB
                </td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">
                  Can enlist (diploma only), limited to ~12 ratings, fewer
                  bonuses
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IV
                </td>
                <td className="py-2 pr-4 font-mono">10&ndash;30</td>
                <td className="py-2">
                  Congress caps at 4% per branch, Navy rarely accepts
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  V
                </td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">
                  Permanently ineligible, no waivers
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Category I and II applicants get first pick of ratings and the best
          bonus packages. Category II (65&ndash;92) is the sweet spot where
          nearly every rating is on the table.
        </p>

        <p className="text-text-secondary">
          Category IIIB (31&ndash;49) gets you through the door with a diploma,
          but your rating options shrink. Fewer signing bonuses and longer wait
          times for preferred school dates.
        </p>

        <p className="text-text-secondary">
          Category IV is restricted by federal law. Congress limits each branch
          to 4% of annual recruits from this tier. In FY2025, the Navy hit 11.3%
          based on pre-FSPC scores, prompting the FY2026 NDAA to modify how
          FSPC graduates are counted against the cap.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Raising your navy ASVAB score from 49 to 50 AFQT does not just shift
            you from Category IIIB to IIIA. It opens the Loan Repayment Program
            and expands your rating choices. One point, major impact.
          </p>
        </aside>

        <p className="text-text-secondary">
          For more on what different score levels unlock, see our{" "}
          <Link href="/asvab-score-ranges">ASVAB score ranges</Link> breakdown.
        </p>

        {/* ── Section: How Navy Composite Scores Work ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Navy Composite Scores Work (Not Like the Army)
        </h2>

        <p className="mt-4 text-text-secondary">
          The Navy&apos;s scoring system confuses more applicants than any other
          branch&apos;s.
        </p>

        <p className="text-text-secondary">
          The Army uses 10 named line scores (GT, CL, EL, ST, etc.). The Air
          Force uses 4 MAGE composites. The Marines use 4 composites. The Navy
          uses none of these.
        </p>

        <p className="text-text-secondary">
          Instead, each Navy rating has its own formula adding specific subtest
          standard scores. Many ratings offer two or three alternative formulas.
          You only need to meet one.
        </p>

        <p className="text-text-secondary">
          Hospital Corpsman (HM) has three qualifying paths:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          HM Path 1: VE+AR+MK+GS &gt;= 208
          <br />
          HM Path 2: MK+GS+2VE &gt;= 208
          <br />
          HM Path 3: AR+PC+MK &gt;= 156
        </div>

        <p className="text-text-secondary">
          You might fail Path 1 and Path 2 but pass Path 3. Always check every
          alternative formula for your target rating.
        </p>

        <p className="text-text-secondary">
          Two applicants with identical AFQT scores can qualify for completely
          different ratings. Strong EI and GS scores unlock electronics and
          technical ratings. Strong VE and AR scores unlock administrative and
          medical ratings. Your subtest profile shapes your Navy career, not just
          your AFQT percentile.
        </p>

        <p className="text-text-secondary">
          AR (Arithmetic Reasoning) appears in almost every Navy rating formula.
          VE (Verbal Expression) is second most common. If you are studying
          without a specific target, these two subtests have the broadest impact.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Generic ASVAB calculators that only show Army line scores are useless
            for Navy applicants. You need a tool that checks Navy-specific
            formulas. Use our{" "}
            <Link href="/calculator">Navy ASVAB calculator</Link> to see exactly
            which ratings your scores unlock.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the full breakdown of line scores across all branches, see our{" "}
          <Link href="/asvab-line-score-calculator">
            line score calculator
          </Link>
          .
        </p>

        {/* ── Section: 20 Most Popular Navy Ratings ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Requirements for the 20 Most Popular Navy Ratings
        </h2>

        <p className="mt-4 text-text-secondary">
          Knowing the navy ASVAB score requirements before you visit MEPS lets
          you walk in with a target instead of reacting to whatever your
          recruiter offers. These are FY2026 requirements (post-reversion to
          pre-crisis standards).
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Technical and Electronics Ratings
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Full Name
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Qualifying Formula(s)
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ET
                </td>
                <td className="py-2 pr-4">Electronics Technician</td>
                <td className="py-2 font-mono text-xs">
                  AR+MK+EI+GS &gt;= 222 OR AR+2MK+GS &gt;= 230
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  IT
                </td>
                <td className="py-2 pr-4">Information Systems Technician</td>
                <td className="py-2 font-mono text-xs">
                  AR+VE+MK+GS &gt;= 222 OR VE+MK+GS &gt;= 162
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  FC
                </td>
                <td className="py-2 pr-4">Fire Controlman</td>
                <td className="py-2 font-mono text-xs">
                  AR+MK+EI+GS &gt;= 222 OR AR+2MK+GS &gt;= 230
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CTN
                </td>
                <td className="py-2 pr-4">
                  Cryptologic Technician (Networks)
                </td>
                <td className="py-2 font-mono text-xs">
                  AR+2MK+GS &gt;= 212
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CTR
                </td>
                <td className="py-2 pr-4">
                  Cryptologic Technician (Collection)
                </td>
                <td className="py-2 font-mono text-xs">
                  MK+PC &gt;= 110 OR AR+MK+PC &gt;= 164
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CTM
                </td>
                <td className="py-2 pr-4">
                  Cryptologic Technician (Maintenance)
                </td>
                <td className="py-2 font-mono text-xs">
                  AR+MK+EI+VE &gt;= 221
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ST
                </td>
                <td className="py-2 pr-4">Sonar Technician</td>
                <td className="py-2 font-mono text-xs">
                  AR+MK+EI+GS &gt;= 223 OR AR+MK+VE+AO &gt;= 228
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Technical ratings cluster around the 212&ndash;223 range for
          four-subtest composites. These carry the strongest civilian career
          crossover into cybersecurity, defense contracting, and
          telecommunications, and typically come with the largest enlistment
          bonuses.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Medical and Administrative Ratings
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Full Name
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Qualifying Formula(s)
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  HM
                </td>
                <td className="py-2 pr-4">Hospital Corpsman</td>
                <td className="py-2 font-mono text-xs">
                  VE+AR+MK+GS &gt;= 208 OR MK+GS+2VE &gt;= 208 OR AR+PC+MK
                  &gt;= 156
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  YN
                </td>
                <td className="py-2 pr-4">Yeoman</td>
                <td className="py-2 font-mono text-xs">
                  VE+MK &gt;= 99 OR VE+MK+CS &gt;= 148
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  LS
                </td>
                <td className="py-2 pr-4">Logistics Specialist</td>
                <td className="py-2 font-mono text-xs">
                  VE+AR &gt;= 96
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PS
                </td>
                <td className="py-2 pr-4">Personnel Specialist</td>
                <td className="py-2 font-mono text-xs">
                  VE+MK &gt;= 103 OR VE+MK+CS &gt;= 148
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  LN
                </td>
                <td className="py-2 pr-4">Legalman</td>
                <td className="py-2 font-mono text-xs">
                  VE+MK &gt;= 105 and VE &gt;= 52 OR VE+AR &gt;= 105 and VE
                  &gt;= 52
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MA
                </td>
                <td className="py-2 pr-4">Master-at-Arms</td>
                <td className="py-2 font-mono text-xs">
                  WK+AR &gt;= 98, minimum WK &gt;= 43
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  IS
                </td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2 font-mono text-xs">
                  VE+AR+MK+GS &gt;= 215
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Medical and admin ratings lean on VE and AR. Hospital Corpsman is one
          of the most competitive ratings despite having three qualifying paths.
          Limited slots mean even qualified applicants may wait for openings.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Aviation and General Ratings
        </h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Full Name
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Qualifying Formula(s)
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AC
                </td>
                <td className="py-2 pr-4">Air Traffic Controller</td>
                <td className="py-2 font-mono text-xs">
                  VE+AR+MK+MC &gt;= 220 OR VE+MK+MC+CS &gt;= 220
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AE
                </td>
                <td className="py-2 pr-4">
                  Aviation Electrician&apos;s Mate
                </td>
                <td className="py-2 font-mono text-xs">
                  VE+AR+MK+MC &gt;= 217 OR VE+AR+MK+AO &gt;= 217
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AD
                </td>
                <td className="py-2 pr-4">
                  Aviation Machinist&apos;s Mate
                </td>
                <td className="py-2 font-mono text-xs">
                  VE+MK+AS &gt;= 158 OR VE+MK+EI &gt;= 155
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  BM
                </td>
                <td className="py-2 pr-4">Boatswain&apos;s Mate</td>
                <td className="py-2 font-mono text-xs">
                  No line score minimum (AFQT only)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CS
                </td>
                <td className="py-2 pr-4">Culinary Specialist</td>
                <td className="py-2 font-mono text-xs">
                  VE+AR &gt;= 82
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ABE
                </td>
                <td className="py-2 pr-4">
                  Aviation Boatswain&apos;s Mate (Equipment)
                </td>
                <td className="py-2 font-mono text-xs">
                  VE+AR+MK+AS &gt;= 184
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          BM (Boatswain&apos;s Mate) requires no line score minimum. Meet the
          AFQT threshold and you are eligible. CS (Culinary Specialist) has one
          of the lowest bars at VE+AR &gt;= 82.
        </p>

        <p className="text-text-secondary">
          For the complete list of all 89 Navy ratings, see our{" "}
          <Link href="/navy-ratings-list">Navy ratings list</Link>.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Line score requirements reverted to pre-crisis levels on October 1,
            2025. If you are using a 2023 or 2024 requirements chart, verify the
            numbers. Many online tables still show the relaxed crisis-era
            standards.
          </p>
        </aside>

        {/* ── Section: Nuclear Field Requirements ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Nuclear Field Requirements: The Highest Bar in the Navy
        </h2>

        <p className="mt-4 text-text-secondary">
          Nuclear field demands the highest navy ASVAB score combinations in the
          entire military. It also offers the largest bonuses and the strongest
          post-service career pipeline.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          NFa (No NAPT Required)
        </h3>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Both VE+AR+MK+MC &gt;= 235 AND AR+MK+EI+GS &gt;= 235
          <br />
          At least one combo must be &gt;= 252
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          NFb (With NAPT)
        </h3>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Both VE+AR+MK+MC &gt;= 225 AND AR+MK+EI+GS &gt;= 225
          <br />
          NAPT score &gt;= 50
          <br />
          Combined (NAPT + higher combo) &gt;= 290
        </div>

        <p className="text-text-secondary">
          If either combo falls below 225, no amount of NAPT performance can
          save you. The 225 floor is absolute.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Criteria
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  NFa (No NAPT)
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  NFb (With NAPT)
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Both combo minimums
                </td>
                <td className="py-2 pr-4 font-mono">235</td>
                <td className="py-2 font-mono">225</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  One combo must reach
                </td>
                <td className="py-2 pr-4 font-mono">252</td>
                <td className="py-2">N/A</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  NAPT minimum
                </td>
                <td className="py-2 pr-4">Not required</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Combined score (NAPT + combo)
                </td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2 font-mono">290</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The NAPT (Nuclear Field Aptitude Test) covers Algebra II,
          trigonometry, chemistry, and physics across 80 questions. Minimum
          passing score is 50. Retest authorized if initial score was 40+.
          Results valid for 2 years.
        </p>

        <p className="text-text-secondary">
          Nuclear field also requires at least one year of high school or
          college-level algebra. Automatic review triggers include 5+ years
          since your last qualifying math course, any D or F in high school
          math, or junior/senior GPA below 2.0.
        </p>

        <p className="text-text-secondary">
          Sailors serve as MMN, EMN, or ETN. Training runs 18 to 24 months.
          FY2026 bonuses reach $75,000 (highest in the Navy), with source rate
          bonus at $40,000. After a 6-year enlistment, nuclear-trained sailors
          routinely earn $80,000 to $120,000 in civilian nuclear power, defense
          contracting, or utilities.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Some websites list the NAPT minimum as 55. The official minimum is
            50 per NavyCS and current CNRC guidance.
          </p>
        </aside>

        {/* ── Section: SEAL, SWCC, and EOD ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy SEAL, SWCC, and EOD Score Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Special warfare programs have moderate ASVAB minimums but extreme
          selection beyond the test. Meeting the minimum and being competitive
          are very different.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Program
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Key Formula
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Min AFQT
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Competitive AFQT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SEAL (SO)
                </td>
                <td className="py-2 pr-4 font-mono text-xs">
                  GS+MC+EI &gt;= 170 OR VE+MK+MC+CS &gt;= 220, plus VE+AR
                  &gt;= 110 and MC &gt;= 50
                </td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 font-mono">78+</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SWCC (SB)
                </td>
                <td className="py-2 pr-4 font-mono text-xs">
                  AR+VE &gt;= 103 and MC &gt;= 51 OR GS+MC+EI &gt;= 165
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2">N/A</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EOD
                </td>
                <td className="py-2 pr-4 font-mono text-xs">
                  AR+VE &gt;= 109 and MC &gt;= 51 OR GS+MC+EI &gt;= 169
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Every special warfare program requires MC (Mechanical Comprehension)
          &gt;= 51 as a hard floor. No other subtest combination compensates for
          a low MC.
        </p>

        <p className="text-text-secondary">
          BUD/S graduates historically score at the 78th AFQT percentile despite
          the 35 minimum. Attrition runs 68% to 80% per class. The ASVAB gets
          you a contract. Physical screening and mental toughness determine
          whether you graduate.
        </p>

        <p className="text-text-secondary">
          FY2026 bonus caps for special warfare reach $60,000.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            SEAL navy ASVAB score requirements look moderate on paper. In
            practice, candidates who complete BUD/S are significantly above
            minimum in every category. Train to exceed, not to meet.
          </p>
        </aside>

        {/* ── Section: FY2026 Changes ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FY2026 Changes: What Reverted and What Stayed
        </h2>

        <p className="mt-4 text-text-secondary">
          If you were planning around relaxed standards from the 2022&ndash;2023
          recruiting crisis, those are gone.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Nov 2022
            </span>
            <span className="text-sm text-text-secondary">
              Navy lowered line scores and AFQT minimum (down to 10) during
              recruiting shortfall
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              May/Aug 2024
            </span>
            <span className="text-sm text-text-secondary">
              AFQT minimum restored to 31 for diploma holders
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Oct 1, 2025
            </span>
            <span className="text-sm text-text-secondary">
              All rating-specific line score formulas reverted to pre-crisis
              levels
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Apr 1, 2025
            </span>
            <span className="text-sm text-text-secondary">
              FSPC-A floor raised from 21 to 26
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>What stayed:</strong> AFQT minimums unchanged (31 diploma, 50
          GED). FSPC-A bridge still active. Tier III eligibility remains since
          January 2024.
        </p>

        <p className="text-text-secondary">
          <strong>What changed:</strong> Every rating composite formula reverted
          to original thresholds. FY2026 recruits face higher subtest bars than
          anyone who enlisted between November 2022 and September 2025.
        </p>

        <p className="text-text-secondary">
          The FY2026 NDAA also modified Category IV accounting. FSPC-A graduates
          whose scores improved sufficiently are now excluded from the 4% Cat IV
          quota, giving the Navy more flexibility with the bridge program.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you are using ASVAB requirements from any source published before
            October 2025, verify the numbers. Many websites have not updated
            their tables.
          </p>
        </aside>

        {/* ── Section: Enlistment Bonuses ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Enlistment Bonuses by Score Level
        </h2>

        <p className="mt-4 text-text-secondary">
          Your navy ASVAB score directly affects how much bonus money is on the
          table. Higher scores unlock higher-paying ratings and bigger signing
          incentives.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Category
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Maximum Bonus Cap
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Examples
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Nuclear Field
                </td>
                <td className="py-2 pr-4 font-mono">$75,000</td>
                <td className="py-2">MMN, EMN, ETN</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Special Warfare / Advanced Technical
                </td>
                <td className="py-2 pr-4 font-mono">$60,000</td>
                <td className="py-2">SEAL, SWCC, EOD, HM-ATF, AIRR</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  All Other Ratings
                </td>
                <td className="py-2 pr-4 font-mono">$50,000</td>
                <td className="py-2">MA, ET, IT, CTN, and others</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Top source rate bonuses: Nuclear $40,000. AIRR, EOD, HM-ATF, ND,
          SB-ATF at $30,000 each.
        </p>

        <p className="text-text-secondary">Bonus eligibility by score:</p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>AFQT &gt;= 31:</strong> Required for any Enlistment Bonus
            for Shipping (EBSHP)
          </li>
          <li>
            <strong>AFQT &gt;= 50:</strong> Required for the Loan Repayment
            Program (LRP)
          </li>
          <li>
            <strong>Tier III education:</strong> Ineligible for any enlistment
            bonus regardless of score
          </li>
        </ul>

        <p className="text-text-secondary">
          Real example: a Master-at-Arms enlisting in April 2026 could stack
          $50,000 total across multiple bonus components.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Bonus amounts change multiple times per fiscal year. Ask your
            recruiter for the current GENADMIN message, not last quarter&apos;s
            numbers.
          </p>
        </aside>

        {/* ── Section: Active-Duty AFCT ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Active-Duty Sailors: Retaking the ASVAB via AFCT
        </h2>

        <p className="mt-4 text-text-secondary">
          This page is not just for future sailors. If you are already serving
          and want a different rating, you can improve your scores through the
          AFCT.
        </p>

        <p className="text-text-secondary">
          The Armed Forces Classification Test (AFCT) is the active-duty version
          of the ASVAB. Identical content, identical scoring.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Eligibility
            </span>
            <span className="text-sm text-text-secondary">
              24+ months in current rate
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Time in service
            </span>
            <span className="text-sm text-text-secondary">
              Under 12 years
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Maximum rank
            </span>
            <span className="text-sm text-text-secondary">
              PO1 (E-6) or below
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Governing policy
            </span>
            <span className="text-sm text-text-secondary">
              MILPERSMAN 1236-010
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Request authorization through your chain of command, study the subtests
          feeding your target rating&apos;s formula, take the AFCT, and submit a
          cross-rate request if your new scores qualify.
        </p>

        <p className="text-text-secondary">
          Your newest score replaces all previous scores. If you score lower,
          that lower number stands. Study before you test.
        </p>

        <p className="text-text-secondary">
          For the full active-duty retesting process, see our{" "}
          <Link href="/afct">AFCT guide</Link>. Practice first with our{" "}
          <Link href="/afct-practice-test">free AFCT practice test</Link>.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            The AFCT is the most underutilized tool for active-duty sailors
            stuck in a rating they did not choose. If your initial ASVAB locked
            you out of your preferred career field, you can change that.
          </p>
        </aside>

        {/* ── Section: Study Strategy ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Study Strategy: How to Hit Your Navy Target Score
        </h2>

        <p className="mt-4 text-text-secondary">
          Your study approach depends on which gate is blocking you.
        </p>

        <p className="text-text-secondary">
          <strong>Raising your AFQT (enlistment gate):</strong> Prioritize Word
          Knowledge and Paragraph Comprehension first. VE is doubled in the AFQT
          formula, so every verbal point carries twice the weight of a math
          point. After verbal, focus on whichever of AR or MK is weaker.
        </p>

        <p className="text-text-secondary">
          <strong>Qualifying for a specific rating (composite gate):</strong>{" "}
          Identify which subtests your target formula requires and drill those.
          This may include EI, GS, or MC, which have zero effect on your AFQT.
          Targeting ET? The formula is AR+MK+EI+GS &gt;= 222. Two of those four
          subtests are invisible to your AFQT.
        </p>

        <p className="text-text-secondary">
          <strong>Maximizing options across ratings:</strong> AR is the
          highest-leverage single subtest for Navy applicants. It appears in
          almost every rating formula and feeds the AFQT. Allocate roughly 30%
          of study time to AR, 25% to VE (WK+PC), 25% to MK, and 20% to your
          weakest technical subtest.
        </p>

        <p className="text-text-secondary">
          Four to six weeks of focused daily study typically produces a 5 to 15
          percentile point AFQT improvement. Start with a{" "}
          <Link href="/practice-test">practice test</Link> to find your
          baseline, then build a plan with our{" "}
          <Link href="/asvab-study-guide">study guide</Link>.
        </p>

        <p className="text-text-secondary">
          Retake timing: 1 month, 1 month, then 6 months between attempts. A
          20+ point gain within 6 months triggers a confirmation test (C-Test).
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your target rating has multiple qualifying formulas, identify
            which one you are closest to meeting and focus entirely on those
            subtests. Do not spread effort across all paths.
          </p>
        </aside>

        {/* ── FAQ Section ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy ASVAB Score Requirements FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Navy?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The minimum AFQT is 31 for high school diploma holders and 50 for
              GED or Tier III (no credential) applicants. Applicants scoring 26
              to 30 may qualify for the FSPC-A bridge program, which lets you
              attend a short academic course, retest, and ship to boot camp if
              you reach 31 or improve by 10+ points.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Navy jobs can I get with a low ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              At a 31 AFQT, you qualify for roughly 12 of 80+ ratings. These
              include BM (Boatswain&apos;s Mate) with no line score minimum and
              CS (Culinary Specialist) at VE+AR &gt;= 82. Most technical ratings
              require composites above 200. Scoring 50+ opens significantly more
              options.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do Navy ASVAB scores differ from Army scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Army uses 10 named line scores (GT, CL, EL, etc.). The Navy
              skips named composites entirely. Each rating has its own formula
              adding specific subtest scores, often with multiple alternative
              paths. An Army GT score has no bearing on Navy rating
              qualification.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for Navy Nuclear Field?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Without the NAPT: both VE+AR+MK+MC and AR+MK+EI+GS must be 235+,
              with one reaching 252+. With the NAPT: both combos must hit 225+,
              NAPT must be 50+, and the combined total must reach 290+. One year
              of algebra is also required.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need to be a Navy SEAL?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Minimum is GS+MC+EI &gt;= 170 or VE+MK+MC+CS &gt;= 220, plus
              VE+AR &gt;= 110 and MC &gt;= 50. AFQT minimum is 35. BUD/S
              graduates historically score at the 78th percentile or higher. The
              ASVAB is the easy part of SEAL qualification.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB to get a better Navy score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. First retake requires a 1-month wait, second retake another
              month, then 6 months between each attempt. Your newest score
              replaces all previous scores. A 20+ point gain within 6 months
              triggers a confirmation test. Use our{" "}
              <Link href="/calculator">calculator</Link> to check how improved
              scores change your options.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Are Navy ASVAB requirements going up in 2026?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Effectively, yes. Line score reductions from the 2022&ndash;2023
              recruiting crisis reverted on October 1, 2025. FY2026 recruits
              face the original, stricter subtest requirements. AFQT minimums
              (31 for diploma, 50 for GED) are unchanged, but rating composites
              are back to pre-crisis levels.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can active-duty sailors improve their ASVAB scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, through the AFCT (Armed Forces Classification Test). You need
              24+ months in your current rate, under 12 years of service, and
              PO1 or below. The AFCT is identical to the ASVAB. New scores
              replace previous scores and can unlock cross-rating opportunities.
            </p>
          </div>
        </div>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which Navy Ratings Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, every Navy
            rating formula, and which jobs you qualify for.
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
            Related ASVAB Score Guides
          </h2>
          <ul className="mt-4 space-y-3 text-text-secondary">
            <li>
              Compare every service on the{" "}
              <Link
                href="/asvab-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                ASVAB score requirements by branch
              </Link>{" "}
              hub.
            </li>
            <li>
              Go deeper on Navy scoring in the{" "}
              <Link
                href="/navy-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                complete Navy ASVAB score guide
              </Link>{" "}
              and browse jobs in the{" "}
              <Link
                href="/navy-ratings-list"
                className="text-accent underline hover:text-accent-hover"
              >
                Navy ratings list
              </Link>
              .
            </li>
            <li>
              Check eligibility with the{" "}
              <Link
                href="/navy-afqt-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                Navy AFQT calculator
              </Link>{" "}
              and see how scores map to{" "}
              <Link
                href="/navy-ranks"
                className="text-accent underline hover:text-accent-hover"
              >
                Navy ranks
              </Link>
              .
            </li>
            <li>
              Other branches:{" "}
              <Link
                href="/coast-guard-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Coast Guard
              </Link>{" "}
              and{" "}
              <Link
                href="/army-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Army
              </Link>{" "}
              ASVAB scores.
            </li>
            <li>
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                Take a free ASVAB practice test
              </Link>{" "}
              before you sit for the real thing.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
