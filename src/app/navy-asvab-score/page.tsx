import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Navy ASVAB Score: What You Need to Enlist | ASVAB Hero",
  description:
    "Learn what navy ASVAB score you need to enlist and qualify for 80+ Navy ratings. Covers minimums by tier, composites, nuclear field, and SEAL requirements.",
  alternates: {
    canonical: "https://asvabhero.com/navy-asvab-score",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Navy ASVAB Score: What You Actually Need to Enlist and Pick Your Rating",
  description:
    "Learn what navy ASVAB score you need to enlist and qualify for 80+ Navy ratings. Covers minimums by tier, composites, nuclear field, and SEAL requirements.",
  url: "https://asvabhero.com/navy-asvab-score",
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
      name: "What is the minimum ASVAB score for the Navy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum AFQT score is 31 for diploma holders and 50 for GED holders. Applicants scoring 26-30 may qualify for the FSPC-A bridge program. Individual ratings require separate subtest score thresholds on top of the AFQT minimum.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good ASVAB score for the Navy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A score of 50+ gives you meaningful rating choices. Scoring 65+ puts you in Category II, where most ratings and bonuses become available. For nuclear field, you'll need subtest combinations above 235. Aim for the highest score you can achieve.",
      },
    },
    {
      "@type": "Question",
      name: "What Navy jobs can I get with a 31 ASVAB score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roughly 12 of 80+ ratings. These tend to be deck ratings like BM (Boatswain's Mate) and others with low subtest thresholds. Most technical ratings require subtest sums difficult to reach at a 31 AFQT.",
      },
    },
    {
      "@type": "Question",
      name: "How do Navy ASVAB scores differ from Army scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Army uses 10 named line scores (GT, CL, EL, etc.). The Navy skips named composites entirely. Each rating has its own formula adding specific subtest scores directly, often with multiple alternative formulas. An Army GT score is irrelevant for Navy rating qualification.",
      },
    },
    {
      "@type": "Question",
      name: "What ASVAB score do I need for Navy Nuclear Field?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuclear field requires the highest subtest scores in the Navy. Without the NAPT, both VE+AR+MK+MC and AR+MK+EI+GS must be 235+, with one reaching 252+. With the NAPT, both combos must hit 225+, NAPT must be 50+, and the combined total must reach 290+.",
      },
    },
    {
      "@type": "Question",
      name: "What ASVAB score do I need to be a Navy SEAL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum is GS+MC+EI >= 170 or VE+MK+MC+CS >= 220, plus VE+AR >= 110 and MC >= 50. AFQT minimum is 35th percentile, but BUD/S graduates historically score at the 78th percentile or higher.",
      },
    },
    {
      "@type": "Question",
      name: "Can I retake the ASVAB to get a better Navy score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The first two retakes require a 1-month wait. After that, you must wait 6 months. Your newest score replaces all previous scores, so retaking is risky if you might score lower. A 20+ point gain within 6 months triggers a confirmation test.",
      },
    },
    {
      "@type": "Question",
      name: "Does my ASVAB score affect my Navy rank or pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your ASVAB score does not determine your starting rank or pay grade. All enlisted sailors start at E-1 unless they have qualifying factors like college credits, JROTC, or Eagle Scout. Your ASVAB score determines which ratings you can access, but pay at each rank is the same across all ratings.",
      },
    },
    {
      "@type": "Question",
      name: "What is FSPC-A?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FSPC-A (Future Sailor Preparatory Course - Academic) is a bridge program for applicants scoring 26-30 on the AFQT. You attend a short course, retest, and if you hit 31+, you proceed to boot camp. The floor was raised from 21 to 26 on April 1, 2025.",
      },
    },
    {
      "@type": "Question",
      name: "Are Navy ASVAB requirements going up in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, effectively. Line score reductions from the 2022-2023 recruiting crisis reverted on October 1, 2025. FY2026 recruits face the original, stricter subtest requirements. AFQT minimums (31 for diploma, 50 for GED) are unchanged, but rating formulas are back to pre-crisis thresholds.",
      },
    },
  ],
};

export default function NavyASVABScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy ASVAB Score: What You Actually Need to Enlist and Pick Your
          Rating
        </h1>

        <p className="mt-4 text-text-secondary">
          The Navy&apos;s minimum AFQT is 31. But scoring a 31 qualifies you
          for roughly 12 of 80+ ratings. Your{" "}
          <strong>navy ASVAB score</strong> determines whether you enlist, and
          your subtest score combinations determine which rating (Navy job) you
          actually get. Those combinations are unique to the Navy and have
          nothing to do with your AFQT alone.
        </p>
        <p className="text-text-secondary">
          This guide covers the exact AFQT and subtest thresholds for
          enlistment, popular ratings, nuclear field, and special warfare
          programs. If you already have scores, plug them into our{" "}
          <Link href="/calculator">free ASVAB calculator</Link> to see which
          Navy ratings you qualify for right now.
        </p>

        {/* Section 2: Navy AFQT Minimum Scores by Education Tier */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy AFQT Minimum Scores by Education Tier
        </h2>

        <p className="mt-4 text-text-secondary">
          Your education level changes the AFQT score you need to walk through
          the door. The Navy sorts applicants into three tiers.
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
                <td className="py-2 pr-4">GED</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier III
                </td>
                <td className="py-2 pr-4">No credential (since Jan 22, 2024)</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Tier II and III applicants face the same 50+ threshold. No shortcuts
          there.
        </p>
        <p className="text-text-secondary">
          <strong>FSPC-A (Future Sailor Preparatory Course - Academic)</strong>{" "}
          is a bridge program for applicants who score between 26 and 30 on the
          AFQT. You attend a short academic course, retest, and if you hit 31+,
          you ship to boot camp. The FSPC-A floor was raised from 21 to 26 on
          April 1, 2025, so sub-26 scores no longer qualify for the program.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            In December 2022, during a severe recruiting shortage, the Navy
            accepted AFQT scores as low as 10. About 6,400 recruits (roughly
            17% of FY2024 new enlistees) scored at or below the 30th
            percentile. Their attrition rate was 8.25%, well below the 11%
            target. Commander David Benham noted:{" "}
            &ldquo;The change means that prospective Sailors who have high
            enough ASVAB line scores to qualify for a Navy rating will not be
            held back by a low AFQT score.&rdquo; The Navy reversed this policy
            in May/August 2024, restoring the 31 minimum.
          </p>
        </aside>

        <p className="text-text-secondary">
          Line score reductions that were introduced in November 2022 also
          reverted on October 1, 2025. FY2026 recruits now face the original,
          stricter subtest requirements for every rating.
        </p>
        <p className="text-text-secondary">
          How does the Navy stack up against other branches?
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum AFQT
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
          The Navy ties the Army and Marines for the lowest minimum. But
          don&apos;t let that fool you.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Scoring 31&ndash;35 qualifies you to enlist but locks you out of
            most desirable ratings. At that range, you&apos;re looking at
            roughly 12 of 80+ available ratings. If you want meaningful
            choices, aim for 50+.
          </p>
        </aside>

        {/* Section 3: How the AFQT Formula Works */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How the AFQT Formula Works (and Why Verbal Scores Matter 2x)
        </h2>

        <p className="mt-4 text-text-secondary">
          Every branch uses the same AFQT formula, but few applicants
          understand the math well enough to exploit it. Four ASVAB subtests
          feed the calculation.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>

        <p className="text-text-secondary">
          VE stands for Verbal Expression. It is not a subtest you sit for. VE
          is derived from two subtests: Word Knowledge (WK) and Paragraph
          Comprehension (PC). Your WK and PC raw scores are combined and
          converted to a standard score ranging from 20 to 62.
        </p>
        <p className="text-text-secondary">
          The critical insight: VE is doubled in the formula. A 5-point
          improvement in VE produces a 10-point gain in your raw AFQT
          composite. The same 5-point improvement in AR or MK only moves you 5
          points. Verbal has 2x leverage over either math subtest.
        </p>
        <p className="text-text-secondary">
          <strong>Worked example:</strong> Say your scores are VE=50, AR=52,
          MK=48.
        </p>
        <p className="text-text-secondary">
          Your raw composite: 2(50) + 52 + 48 = 200.
        </p>
        <p className="text-text-secondary">
          Now bump VE to 55: 2(55) + 52 + 48 = 210. That&apos;s a 10-point
          gain.
        </p>
        <p className="text-text-secondary">
          Bump AR to 57 instead: 2(50) + 57 + 48 = 205. Only a 5-point gain
          from the same effort.
        </p>
        <p className="text-text-secondary">
          The raw composite gets converted to a percentile (1&ndash;99) based
          on the 1997 DoD norming study. Less than 20% of test-takers score 60
          or above. The 50th percentile is average by definition.
        </p>
        <p className="text-text-secondary">
          <strong>What this means for your study plan:</strong> If your AFQT is
          the bottleneck keeping you from enlisting, WK and PC deliver the
          fastest score gains. A test-taker who raises WK from 45 to 55 and PC
          from 40 to 48 could see a 15&ndash;20 percentile jump in their AFQT.
          That single shift can move someone from Category IIIB into Category
          IIIA, unlocking GED eligibility and dozens more ratings. Check our{" "}
          <Link href="/asvab-scores-explained">ASVAB scores explained</Link>{" "}
          guide for a deeper breakdown of how percentiles map to categories.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The 2x VE leverage is the single most actionable study insight for
            improving your navy ASVAB score. If you&apos;re studying to hit a
            higher AFQT threshold, start with Word Knowledge and Paragraph
            Comprehension.
          </p>
        </aside>

        {/* Section 4: AFQT Categories */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Categories: What Your Score Tier Means for Navy Opportunities
        </h2>

        <p className="mt-4 text-text-secondary">
          The military groups AFQT percentiles into six categories. Each one
          carries different implications for what the Navy will offer you.
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
                  Strong position, most ratings and bonuses available
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
                  Can enlist (diploma), limited to narrow rating band, fewer
                  bonuses
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">
                  IV
                </td>
                <td className="py-2 pr-4 font-mono">10&ndash;30</td>
                <td className="py-2">
                  Restricted, Congress caps at 4% per branch, Navy rarely
                  accepts
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">
                  V
                </td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">Permanently ineligible, no waivers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Category I&ndash;IIIA applicants get first pick of ratings and the
          best bonus packages. Category II (65&ndash;92) is the sweet spot
          where nearly every rating is on the table, assuming your subtest sums
          qualify.
        </p>
        <p className="text-text-secondary">
          Category IIIB (31&ndash;49) gets you in the door with a diploma, but
          your rating options shrink dramatically. Expect fewer signing bonuses
          and longer wait times for your preferred school dates.
        </p>
        <p className="text-text-secondary">
          Category IV (10&ndash;30) is heavily restricted. Congress limits each
          branch to accepting no more than 4% of annual recruits from this
          category. The Navy rarely dips into it outside of recruiting
          emergencies.
        </p>
        <p className="text-text-secondary">
          Category V (1&ndash;9) is a hard stop. No branch accepts Category V
          scores under any circumstances.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GED holders must score 50+ just to enlist. That&apos;s Category
            IIIA minimum. Even with qualifying subtest sums for a great rating,
            a GED holder scoring 49 can&apos;t ship. Diploma holders have a
            significant advantage at the lower score ranges.
          </p>
        </aside>

        <p className="text-text-secondary">
          Practical guidance: aim for 50+ for meaningful choices. Scoring 65+
          puts you in Category II, a competitive position for nearly any rating
          the Navy offers. Use our{" "}
          <Link href="/calculator">calculator</Link> to check which category
          your AFQT falls into and which ratings open up at your current score
          level.
        </p>

        {/* Section 5: How Navy Composite Scores Work */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Navy Composite Scores Work (They Are Not Like the Army)
        </h2>

        <p className="mt-4 text-text-secondary">
          The Navy&apos;s scoring system confuses more applicants than any
          other branch&apos;s. The reason: the Navy does not use named
          composites the way the Army, Air Force, and Marines do.
        </p>
        <p className="text-text-secondary">
          The Army uses 10 named line scores (GT, CL, EL, ST, etc.). The Air
          Force groups subtests into 4 MAGE composites (Mechanical,
          Administrative, General, Electronics). The Marines use 5 composites.
          The Navy uses none of these.
        </p>
        <p className="text-text-secondary">
          Instead, each of the Navy&apos;s 80+ ratings has its own formula that
          adds specific subtest standard scores directly. Many ratings offer two
          or three alternative formulas. You only need to meet one of them.
        </p>
        <p className="text-text-secondary">
          <strong>Example: Hospital Corpsman (HM)</strong> has three qualifying
          paths:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>VE+AR+MK+GS &gt;= 208</li>
          <li>MK+GS+2VE &gt;= 208</li>
          <li>AR+PC+MK &gt;= 156</li>
        </ul>
        <p className="text-text-secondary">
          You might fail the first formula but pass the third. That&apos;s why
          you must check every alternative.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Generic ASVAB calculators that only show Army line scores are
            useless for Navy applicants. You need a tool that checks
            Navy-specific subtest formulas. Use our{" "}
            <Link href="/calculator">Navy ASVAB calculator</Link> to see
            exactly which ratings your scores unlock.
          </p>
        </aside>

        <p className="text-text-secondary">
          The nine subtests used in Navy rating formulas are: General Science
          (GS), Arithmetic Reasoning (AR), Word Knowledge (WK), Paragraph
          Comprehension (PC), Mathematics Knowledge (MK), Electronics
          Information (EI), Auto &amp; Shop Information (AS), Mechanical
          Comprehension (MC), and Assembling Objects (AO). VE (derived from
          WK+PC) also appears in many formulas.
        </p>
        <p className="text-text-secondary">
          Your score report shows all nine subtest standard scores. To check a
          rating, add the specified subtests from the formula and compare your
          sum to the minimum. If the rating lists multiple formulas, check each
          one.
        </p>
        <p className="text-text-secondary">
          <strong>Common misconception:</strong> Some applicants assume their
          recruiter&apos;s software handles all of this automatically. It does,
          but only for ratings with current openings. If a rating has no
          available slots when you visit MEPS, it won&apos;t appear on your
          eligibility list, even if your scores qualify. Knowing your formulas
          in advance lets you request a specific rating and ask your recruiter
          to check future class dates.
        </p>
        <p className="text-text-secondary">
          <strong>Why this matters for study strategy:</strong> Because each
          rating has a unique formula, two applicants with identical AFQT scores
          can qualify for completely different sets of ratings. An applicant
          with strong EI and GS scores unlocks electronics and technical
          ratings. An applicant with strong VE and AR scores unlocks
          administrative and medical ratings. Your subtest score profile, not
          just your AFQT percentile, shapes your Navy career options.
        </p>

        {/* Section 6: Navy Ratings Job Table */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy Ratings Job Table: ASVAB Requirements for Popular Ratings
        </h2>

        <p className="mt-4 text-text-secondary">
          Your recruiter will show you a list of available ratings at MEPS.
          Knowing the score thresholds in advance lets you walk in with a
          target instead of reacting to whatever is offered.
        </p>

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
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  HM
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Hospital Corpsman
                </td>
                <td className="py-2">
                  VE+AR+MK+GS &gt;= 208 OR MK+GS+2VE &gt;= 208 OR AR+PC+MK
                  &gt;= 156
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  ET
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Electronics Technician
                </td>
                <td className="py-2">
                  AR+MK+EI+GS &gt;= 222 OR AR+2MK+GS &gt;= 230
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  IT
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Information Systems Technician
                </td>
                <td className="py-2">AR+2MK+GS &gt;= 222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  FC
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fire Controlman
                </td>
                <td className="py-2">AR+MK+EI+GS &gt;= 223</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  GM
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Gunner&apos;s Mate
                </td>
                <td className="py-2">AR+MK+EI+GS &gt;= 205</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  ABE
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Aviation Boatswain&apos;s Mate (Equipment)
                </td>
                <td className="py-2">VE+AR+MK+AS &gt;= 184</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  CS
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Culinary Specialist
                </td>
                <td className="py-2">VE+AR &gt;= 88</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  BM
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Boatswain&apos;s Mate
                </td>
                <td className="py-2">No minimum line score (AFQT only)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  YN
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Yeoman
                </td>
                <td className="py-2">VE+AR &gt;= 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  MA
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Master-at-Arms
                </td>
                <td className="py-2">
                  AR+WK+PC &gt;= 100 with WK+PC &gt;= 43
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  CTR
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Cryptologic Technician (Collection)
                </td>
                <td className="py-2">
                  VE+AR &gt;= 110 AND AR+MK+EI+GS &gt;= 222
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  LS
                </td>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Logistics Specialist
                </td>
                <td className="py-2">VE+AR &gt;= 102</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          A few patterns stand out in this table. BM (Boatswain&apos;s Mate)
          requires no line score minimum at all. If you meet the AFQT
          threshold, you&apos;re eligible. CS (Culinary Specialist) has one of
          the lowest line score bars at VE+AR &gt;= 88.
        </p>
        <p className="text-text-secondary">
          On the other end, CTR (Cryptologic Technician) is one of the hardest
          to qualify for. It requires passing two separate formulas
          simultaneously: VE+AR &gt;= 110 AND AR+MK+EI+GS &gt;= 222. You need
          both strong verbal-math skills and a high technical composite.
        </p>
        <p className="text-text-secondary">
          The electronics and fire control ratings (ET, FC) cluster around the
          222&ndash;223 range for their four-subtest composites. These are
          competitive ratings with strong civilian career crossover into defense
          contracting, cybersecurity, and telecommunications.
        </p>
        <p className="text-text-secondary">
          <strong>Score clustering by career field:</strong>
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Technical/Electronics (ET, FC, CTR, IT):</strong>{" "}
            Four-subtest sums in the 222&ndash;223 range. These ratings lead to
            the highest-paying civilian careers and typically carry the largest
            enlistment bonuses.
          </li>
          <li>
            <strong>Medical/Admin (HM, YN, LS):</strong> VE-heavy formulas in
            the 102&ndash;208 range. Strong readers with solid math qualify
            here.
          </li>
          <li>
            <strong>General/Deck (BM, CS, ABE, GM):</strong> Lowest thresholds
            or AFQT-only. These are available to most applicants who clear the
            enlistment gate.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Line score requirements reverted to pre-2022 levels on October 1,
            2025. If you were counting on the relaxed standards from the
            recruiting crisis era, verify current requirements before making
            plans. The numbers in this table reflect the restored FY2026
            standards.
          </p>
        </aside>

        <p className="text-text-secondary">
          This table is a representative sample. The Navy has 80+ ratings, and
          requirements shift with manpower needs. Your recruiter will have the
          most current list, but these numbers give you a solid baseline for
          study planning.
        </p>

        {/* Section 7: Nuclear Field and Navy SEAL */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Nuclear Field and Navy SEAL Score Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Nuclear field and special warfare programs demand the highest navy
          ASVAB scores in the entire Navy. These programs also offer the
          largest bonuses and the strongest post-service career prospects.
        </p>
        <p className="text-text-secondary">
          <strong>Nuclear Field (NF)</strong> has two qualification paths:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          NFa (No NAPT Required):
          <br />
          BOTH VE+AR+MK+MC &gt;= 235 AND AR+MK+EI+GS &gt;= 235
          <br />
          At least ONE combo must be &gt;= 252
          <br />
          <br />
          NFb (NAPT Required):
          <br />
          BOTH VE+AR+MK+MC &gt;= 225 AND AR+MK+EI+GS &gt;= 225
          <br />
          NAPT score &gt;= 50
          <br />
          Combined (NAPT + either combo) &gt;= 290
        </div>

        <p className="text-text-secondary">
          If either combo falls below 225, there are no waivers. The NAPT
          (Nuclear Field Aptitude Test) is 80 questions covering Algebra II,
          trigonometry, chemistry, and physics. Minimum passing score is 50.
          Your NAPT result is valid for 2 years with a 90-day wait between
          retakes.
        </p>
        <p className="text-text-secondary">
          Nuclear field sailors serve as MMN (Machinist&apos;s Mate Nuclear),
          EMN (Electrician&apos;s Mate Nuclear), or ETN (Electronics Technician
          Nuclear). Bonuses reach up to $40K. After a 6-year enlistment,
          nuclear-trained sailors routinely earn $80K&ndash;$120K in civilian
          nuclear power, defense contracting, or utility industries. The
          training pipeline is 18&ndash;24 months and is widely considered the
          most rigorous technical education in the enlisted military.
        </p>
        <p className="text-text-secondary">
          <strong>Navy SEAL (SO):</strong>
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>GS+MC+EI &gt;= 170 OR VE+MK+MC+CS &gt;= 220</li>
          <li>AND VE+AR &gt;= 110 with MC &gt;= 50</li>
          <li>Minimum AFQT: 35th percentile</li>
          <li>Competitive AFQT: 78th percentile</li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The minimum ASVAB score gets you in the door for a SEAL contract.
            But BUD/S graduates historically score at the 78th percentile or
            higher. Meeting the minimum and being competitive are very different
            things.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>EOD (Explosive Ordnance Disposal):</strong>
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>AR+VE &gt;= 109 AND MC &gt;= 51</li>
          <li>OR GS+MC+EI &gt;= 169</li>
        </ul>
        <p className="text-text-secondary">
          <strong>SWCC (Special Warfare Combatant-craft Crewmen):</strong>
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>AR+VE &gt;= 103 AND MC &gt;= 51</li>
          <li>OR GS+MC+EI &gt;= 165</li>
        </ul>

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
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum AFQT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Nuclear Field (NFa)
                </td>
                <td className="py-2 pr-4">
                  Both combos &gt;= 235, one &gt;= 252
                </td>
                <td className="py-2 font-mono">31 (diploma)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Nuclear Field (NFb)
                </td>
                <td className="py-2 pr-4">
                  Both combos &gt;= 225, NAPT &gt;= 50
                </td>
                <td className="py-2 font-mono">31 (diploma)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy SEAL (SO)
                </td>
                <td className="py-2 pr-4">
                  GS+MC+EI &gt;= 170 or VE+MK+MC+CS &gt;= 220, plus VE+AR
                  &gt;= 110, MC &gt;= 50
                </td>
                <td className="py-2 font-mono">35</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EOD
                </td>
                <td className="py-2 pr-4">
                  AR+VE &gt;= 109, MC &gt;= 51 or GS+MC+EI &gt;= 169
                </td>
                <td className="py-2 font-mono">31 (diploma)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SWCC
                </td>
                <td className="py-2 pr-4">
                  AR+VE &gt;= 103, MC &gt;= 51 or GS+MC+EI &gt;= 165
                </td>
                <td className="py-2 font-mono">31 (diploma)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Nuclear field has the highest raw subtest demands in the Navy. SEAL
          has a moderate ASVAB bar but an extreme physical and mental selection
          process beyond the test.
        </p>

        {/* Section 8: How to Read Your Score Report */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Read Your Score Report and Check Rating Eligibility
        </h2>

        <p className="mt-4 text-text-secondary">
          Your ASVAB score report contains everything you need to determine
          your Navy options. Here&apos;s how to use it in six steps.
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Find your AFQT percentile.</strong> This is the big number.
            31+ with a diploma or 50+ with a GED clears the enlistment gate.
          </li>
          <li>
            <strong>Find your 9 subtest standard scores.</strong> They&apos;re
            listed individually: GS, AR, WK, PC, MK, EI, AS, MC, AO.
          </li>
          <li>
            <strong>Look up your target rating&apos;s formula.</strong> Use the
            table above or our{" "}
            <Link href="/calculator">calculator</Link>.
          </li>
          <li>
            <strong>Add the specified subtests.</strong> Grab the exact subtests
            the formula calls for and sum them.
          </li>
          <li>
            <strong>Compare your sum to the minimum.</strong> Meet or exceed it,
            and you qualify.
          </li>
          <li>
            <strong>Check ALL alternative formulas.</strong> Most ratings have
            two or three paths. You only need to pass one.
          </li>
        </ol>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              AFQT Score
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Your enlistment gate (determines IF you can join)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Subtest Sums
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Your rating gate (determines WHAT job you get)
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Worked example for Hospital Corpsman (HM):</strong>
        </p>
        <p className="text-text-secondary">
          Say your scores are VE=55, AR=52, MK=48, GS=45.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            Formula 1: VE+AR+MK+GS = 55+52+48+45 = 200. Need 208. Fail.
          </li>
          <li>
            Formula 2: MK+GS+2VE = 48+45+110 = 203. Need 208. Fail.
          </li>
          <li>
            Formula 3: AR+PC+MK. With PC=50: 52+50+48 = 150. Need 156. Fail.
          </li>
        </ul>
        <p className="text-text-secondary">
          In this case, you&apos;re close on all three but don&apos;t qualify
          yet. Raising VE by 4 points would push Formula 2 over the line
          (48+45+118 = 211).
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Aim 10+ points above any minimum. Even when you qualify on paper,
            manpower needs and class availability affect final rating
            assignments. A comfortable margin gives you leverage.
          </p>
        </aside>

        <p className="text-text-secondary">
          Note that some formulas reference VE directly while others reference
          WK and PC separately. VE is always derived from WK+PC, but the sum
          used in formulas is the converted VE standard score, not the raw
          subtest scores added together.
        </p>

        {/* Section 9: ASVAB Retake Rules and Navy Study Strategy */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Retake Rules and Navy Study Strategy
        </h2>

        <p className="mt-4 text-text-secondary">
          If your navy ASVAB score didn&apos;t hit your target, you can retake
          the test. But there are rules.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Attempt
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Wait Period
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  1st retake
                </td>
                <td className="py-2">1 month after initial test</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  2nd retake
                </td>
                <td className="py-2">1 month after 1st retake</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  3rd+ retakes
                </td>
                <td className="py-2">6 months after previous attempt</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Critical rule: your newest score replaces all previous scores. There
          is no cherry-picking your best subtest scores from different sittings.
          If you score worse on a retake, that lower score stands.
        </p>
        <p className="text-text-secondary">
          Scores are valid for 2 years from the test date. After that, you must
          retest.
        </p>
        <p className="text-text-secondary">
          <strong>C-Test:</strong> If your AFQT jumps 20+ points within 6
          months, you&apos;ll be flagged for a confirmation test. This is a
          proctored retest to verify the gain is legitimate.
        </p>
        <p className="text-text-secondary">
          <strong>PiCAT:</strong> This is an unproctored version you take at
          home. You then verify your score at MEPS within 30 days. If you
          don&apos;t verify in time, you take the full ASVAB at MEPS instead.
        </p>
        <p className="text-text-secondary">
          <strong>Navy study strategy by goal:</strong>
        </p>
        <p className="text-text-secondary">
          <strong>Raising AFQT (enlistment qualification):</strong> Prioritize
          Word Knowledge and Paragraph Comprehension first. Because VE is
          doubled in the AFQT formula, these two subtests deliver the biggest
          return on study time. Then focus on your weaker math subtest, AR or
          MK.
        </p>
        <p className="text-text-secondary">
          <strong>Qualifying for a specific rating:</strong> Identify which
          subtests your target rating&apos;s formula requires and drill those.
          This may include subtests that don&apos;t affect your AFQT at all.
        </p>
        <p className="text-text-secondary">
          Example: Targeting ET (Electronics Technician)? The formula is
          AR+MK+EI+GS &gt;= 222. EI and GS aren&apos;t in the AFQT formula, so
          studying them won&apos;t raise your AFQT, but they&apos;re critical
          for this rating.
        </p>
        <p className="text-text-secondary">
          Example: Targeting HM (Hospital Corpsman)? You have three formula
          paths. Figure out which you&apos;re closest to meeting and focus your
          study on the subtests in that formula.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Four to six weeks of focused daily study typically yields a 5&ndash;15
            percentile point improvement on the AFQT. Start with a{" "}
            <Link href="/practice-test">practice test</Link> to identify your
            weak subtests, then use our{" "}
            <Link href="/asvab-study-guide">study guide</Link> to target those
            areas.
          </p>
        </aside>

        {/* Section 10: FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy ASVAB Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Navy?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The minimum AFQT score is 31 for diploma holders and 50 for GED
              holders. Applicants scoring 26&ndash;30 may qualify for the
              FSPC-A bridge program. Individual ratings require separate subtest
              score thresholds on top of the AFQT minimum.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good ASVAB score for the Navy?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A score of 50+ gives you meaningful rating choices. Scoring 65+
              puts you in Category II, where most ratings and bonuses become
              available. For nuclear field, you&apos;ll need subtest
              combinations above 235. Aim for the highest score you can
              achieve.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Navy jobs can I get with a 31 ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Roughly 12 of 80+ ratings. These tend to be deck ratings like BM
              (Boatswain&apos;s Mate) and others with low subtest thresholds.
              Most technical ratings require subtest sums difficult to reach at
              a 31 AFQT.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do Navy ASVAB scores differ from Army scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Army uses 10 named line scores (GT, CL, EL, etc.). The Navy
              skips named composites entirely. Each rating has its own formula
              adding specific subtest scores directly, often with multiple
              alternative formulas. An Army GT score is irrelevant for Navy
              rating qualification.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for Navy Nuclear Field?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Nuclear field requires the highest subtest scores in the Navy.
              Without the NAPT, both VE+AR+MK+MC and AR+MK+EI+GS must be 235+,
              with one reaching 252+. With the NAPT, both combos must hit 225+,
              NAPT must be 50+, and the combined total must reach 290+.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need to be a Navy SEAL?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Minimum is GS+MC+EI &gt;= 170 or VE+MK+MC+CS &gt;= 220, plus
              VE+AR &gt;= 110 and MC &gt;= 50. AFQT minimum is 35th percentile,
              but BUD/S graduates historically score at the 78th percentile or
              higher.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB to get a better Navy score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The first two retakes require a 1-month wait. After that,
              you must wait 6 months. Your newest score replaces all previous
              scores, so retaking is risky if you might score lower. A 20+
              point gain within 6 months triggers a confirmation test.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does my ASVAB score affect my Navy rank or pay?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Your ASVAB score does not determine your starting rank or pay
              grade. All enlisted sailors start at E-1 unless they have
              qualifying factors like college credits, JROTC, or Eagle Scout.
              Your navy ASVAB score determines which ratings you can access, but
              pay at each rank is the same across all ratings.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is FSPC-A?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              FSPC-A (Future Sailor Preparatory Course - Academic) is a bridge
              program for applicants scoring 26&ndash;30 on the AFQT. You
              attend a short course, retest, and if you hit 31+, you proceed to
              boot camp. The floor was raised from 21 to 26 on April 1, 2025.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Are Navy ASVAB requirements going up in 2026?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, effectively. Line score reductions from the 2022&ndash;2023
              recruiting crisis reverted on October 1, 2025. FY2026 recruits
              face the original, stricter subtest requirements. AFQT minimums
              (31 for diploma, 50 for GED) are unchanged, but rating formulas
              are back to pre-crisis thresholds.
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
