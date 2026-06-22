import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AffiliateBookBlock from "@/components/AffiliateBookBlock";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import JobScoreTable from "@/components/JobScoreTable";
import { navyHub, hubScoreStats } from "@/lib/job-hubs";

// Single source of truth: every score figure on this page is derived from
// navy-jobs.json (the same data the Navy calculator uses), never hardcoded.
const jobs = navyHub.jobs;
const stats = hubScoreStats(jobs);
const N = stats.count; // 79 ratings
const LOW = stats.lowest!; // CS, VE+AR 76
const HIGH = stats.highest!; // CTN / CWT, 255

export const metadata: Metadata = {
  title: "Navy ASVAB Score Chart (2026): Required Line Scores for Every Navy Job",
  description: `Navy ASVAB score chart with the required line score for all ${N} Navy ratings. Sortable table of ASVAB scores for Navy jobs, from ${LOW.code} (${LOW.composite} ${LOW.minScore}) up to ${HIGH.minScore}, plus AFQT minimums, FY2026 bonuses, and the PACT path.`,
  alternates: {
    canonical: "https://asvabhero.com/navy-ratings-list",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Navy ASVAB Score Chart 2026: Required Line Scores for All ${N} Navy Ratings`,
  description: `Navy ASVAB score chart with the required line score for all ${N} Navy ratings, AFQT minimums, FY2026 bonuses, NAPT requirements, and the PACT path.`,
  url: "https://asvabhero.com/navy-ratings-list",
  author: {
    "@type": "Organization",
    "@id": "https://asvabhero.com/#organization",
    name: "ASVAB Hero",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-04-27",
  dateModified: "2026-06-14",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the lowest ASVAB score for a Navy job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The lowest Navy line score on the chart is Culinary Specialist (CS) at VE+AR ${LOW.minScore}, followed by Retail Services Specialist (RS) at 83 and Logistics Specialist (LS) at 92. All sit on top of the Tier I AFQT floor of 31 to 35. Musician (MU) takes AFQT 31 plus an audition instead of a line-score cutoff.`,
      },
    },
    {
      "@type": "Question",
      name: "What Navy job has the highest ASVAB requirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Cryptologic Technician Networks (CTN) and Cyber Warfare Technician (CWT) tie for the highest at ${HIGH.minScore} (CTN on AR+2MK+GS). Cryptologic Technician Maintenance (CTM) is next at 223, then a 222 cluster: AE, AT, ET, FC, IT, RW, and STG.`,
      },
    },
    {
      "@type": "Question",
      name: "What's the easiest Navy rating to qualify for in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CS at VE+AR=76 sits lowest, followed by RS at 83, LS at 92, YN at 99, and QM at 100. MU is AFQT 31 (audition-gated). All are reachable with an AFQT in the 50-60 range. The lowest-scoring entry path overall is PACT at VE+AR=85.",
      },
    },
    {
      "@type": "Question",
      name: "What's the hardest Navy rating to qualify for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CTN at AR+2MK+GS=255 and CWT at 255 are tied at the top. CTM follows at 223, then the 222 cluster (AE, AT, ET, FC, IT, RW, STG). Nuclear-field candidates clear a 252+ single composite or take the NAPT.",
      },
    },
    {
      "@type": "Question",
      name: "Why do submarine versions of ratings need higher scores than surface?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small crew (~140), nuclear power, no resupply for 60-90 days, constant cross-training in damage control and reactor safety. The composite is the Navy's proxy for that cognitive load. CS surface needs VE+AR=76, CSS submarine needs 200. Same job, a 124-point gap.",
      },
    },
    {
      "@type": "Question",
      name: "What's the NAPT and do I need to take it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Navy Advanced Programs Test runs 2 hours, 80 questions on chemistry, math, physics, and reading. Required only for nuclear candidates whose composites land in the 235-251 range. Hit 252 or higher on a single composite and you skip NAPT.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pick my rating before enlisting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Guaranteed ratings get written into your contract before you process at MEPS. The alternatives are open contract or PACT. Get the rating, bonus, and school start date in writing. Verbal promises do not count once you ship.",
      },
    },
    {
      "@type": "Question",
      name: "Which ASVAB subtests should I study hardest for Navy ratings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AR appears in roughly 70% of Navy formulas. MK is second, EI third, GS fourth. For AFQT, VE (WK+PC) is doubled. Study AR and MK first, then layer EI and GS for technical or nuclear ratings.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't qualify for the rating I want?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three options: retake the ASVAB after the one-month wait; enlist via PACT and designate at 12 months; or enlist in a lower-composite rating and apply for lateral conversion later. Most recruits who prep 4-6 extra weeks gain 10-15 AFQT points on retest.",
      },
    },
    {
      "@type": "Question",
      name: "How do dual-formula ratings work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some ratings list two qualifying paths joined by 'or' and you only need to hit one. Navy SEAL (SO) takes GS+MC+EI=165 or VE+AR+MK+MC=220. Score over the line on either and you qualify. Recruiters run both calculations automatically.",
      },
    },
  ],
};

export default function NavyRatingsListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "Navy ASVAB Score", href: "/navy-asvab-score" },
          { name: "Navy Ratings List", href: "/navy-ratings-list" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy ASVAB Score Chart (2026): Required Line Scores for All {N} Navy Jobs
        </h1>

        {/* Snippet-shaped direct answer */}
        <p className="mt-4 text-text-secondary">
          Every Navy enlisted job needs an AFQT of 31 to 35 to qualify, then a
          line-score composite that ranges from {LOW.code} ({LOW.composite}={LOW.minScore}) at the
          low end up to {HIGH.minScore} for Cryptologic Technician Networks and Cyber Warfare
          Technician. The chart below lists the required ASVAB line score for all {N} Navy ratings,
          sortable by score, community, or AFQT.
        </p>

        <p className="text-text-secondary">
          Your recruiter hands you a list of ratings, and unless you already know what an Aviation
          Boatswain&apos;s Mate does versus a Cryptologic Technician, that list is useless. This page
          turns it into one scannable Navy ASVAB score chart so you can see what you qualify for
          today, what is one study block away, and which subtests buy you the most ratings.
        </p>

        {/* Stats Row, data-driven */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">{N} ratings</p>
            <p className="mt-1 text-sm text-text-secondary">across 10 career communities</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Lowest barrier: {LOW.code} at {LOW.composite}={LOW.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">achievable with an AFQT in the low 50s</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Highest barrier: {HIGH.code} at {HIGH.composite}={HIGH.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">top 5% range, tied with CWT</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Top bonus cap: $75,000</p>
            <p className="mt-1 text-sm text-text-secondary">for Nuclear Field (MMN/EMN/ETN)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">PACT designation rate FY2025: 87%</p>
            <p className="mt-1 text-sm text-text-secondary">got their preferred rating</p>
          </div>
        </div>

        {/* Primary CTA, high-intent: find the ratings you already qualify for */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              See which ratings you qualify for right now
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Run your subtest scores through the Navy ASVAB score calculator to see exactly which
              ratings on this chart you already clear.
            </p>
          </div>
          <Link
            href={navyHub.calculatorHref}
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover sm:mt-0 sm:ml-6 sm:shrink-0"
          >
            Open the Navy calculator
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── The score table: the unique-data asset ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy ASVAB Score Chart: All {N} Ratings and Required Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Every row comes from the same dataset the{" "}
          <Link href={navyHub.calculatorHref} className="text-accent hover:text-accent-hover">
            Navy ASVAB score calculator
          </Link>{" "}
          scores against, so the numbers here match what your recruiter computes. Sort by required
          line score to find the lowest-barrier ratings, or by community to compare jobs in the same
          field. Where two formulas are joined by &quot;or&quot; you only need to hit one; joined by
          a dot, all are required.
        </p>

        <JobScoreTable
          jobs={jobs}
          caption={`Navy ASVAB score chart: required line score, community, and minimum AFQT for all ${N} Navy ratings.`}
          calculatorHref={navyHub.calculatorHref}
          calculatorLabel="Navy ASVAB score calculator"
        />

        {/* ── How Navy ASVAB scoring works ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Navy ASVAB Scoring Works: AFQT vs Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          A Cryptologic Technician Networks job needs a line score of 255. The maximum AFQT is 99.
          Both numbers are real, both come from the same ASVAB, and they do different jobs.
        </p>

        <p className="text-text-secondary">
          The Navy uses a two-tier system. The AFQT is your percentile from VE+AR+MK and decides
          whether the Navy will take you. The line-score composite is a raw sum of standard subtest
          scores and decides which rating you can hold.
        </p>

        <p className="text-text-secondary">
          For 2026 the Tier I (diploma) AFQT floor is 31 on paper, but in practice the Navy ships
          diploma holders at 35+, so treat 35 as your working target. Tier II (GED) applicants need
          50 plus 15 college credits, and the Future Sailor Preparatory Course academic track opens
          at 26-30. Hit the minimum and you are in. The line score determines what you do once you
          are in.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Most-used Navy line score composites:<br />
          AR + MK + EI + GS, electronics, nuclear, IT<br />
          VE + AR + MK + MC, engineering, aviation generalist<br />
          VE + AR + MK + AS, mechanical, maintenance trades<br />
          VE + AR, admin, general, support (lowest bar)
        </div>

        <p className="text-text-secondary">
          Standard subtest scores run roughly 20 to 80, with 50 as the population average. A
          composite of 222 means averaging 55-56 across four subtests. A composite of 255 means
          hitting close to 64 on each. The math gets steep fast.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Standard Scores Explained</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 222 composite means averaging 55-56 on each of four subtests. A 255 composite means
            averaging about 64 on each, putting you in the top 10-15% across all four areas at once.
          </p>
        </aside>

        <p className="text-text-secondary">
          For percentile mechanics, see the{" "}
          <Link href={navyHub.scoreExplainerHref} className="text-accent hover:text-accent-hover">
            AFQT score breakdown
          </Link>
          . To preview which composites you hit, plug subtest scores into the{" "}
          <Link href="/asvab-line-score-calculator" className="text-accent hover:text-accent-hover">
            free line score calculator
          </Link>
          .
        </p>

        {/* ── Career communities at a glance (curated E-E-A-T) ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy Career Communities at a Glance
        </h2>

        <p className="mt-4 text-text-secondary">
          The {N} ratings split into 10 communities. Use the chart above for exact numbers; the notes
          below explain where the score barriers cluster so you can target the right field.
        </p>

        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Aviation (20 ratings).</strong> The widest range on
            the ship. AZ (aviation maintenance admin) gets you in at VE+AR=102; the technical seats
            (AE, AT) sit at 222 on the same AR+MK+EI+GS composite the surface electronics rates use.
          </li>
          <li>
            <strong className="text-text-primary">Intelligence, crypto and cyber (7 ratings).</strong>{" "}
            The highest scores in the Navy. CTN and CWT top out at 255, CTM at 223. CTR is the way in
            at 109 if you want the community without the top composite.
          </li>
          <li>
            <strong className="text-text-primary">Engineering and propulsion (15 ratings).</strong>{" "}
            Mostly 180-218. Submarine variants (GSM, MMA, FT, MT, ETV, SECF) run higher than their
            surface counterparts because of the reactor and damage-control load.
          </li>
          <li>
            <strong className="text-text-primary">Operations and deck (10 ratings).</strong> QM and BM
            anchor the low end (100-163); FC, RW and STG sit at 222 with the combat-systems techs.
          </li>
          <li>
            <strong className="text-text-primary">Administrative and supply (12 ratings).</strong> The
            lowest barriers on the chart: CS at 76, RS at 83, LS at 92, YN at 99. MU is audition-gated
            at AFQT 31.
          </li>
          <li>
            <strong className="text-text-primary">Special warfare (5 ratings).</strong> SO (Navy SEAL),
            ND, EOD, SB and UCT. These use &quot;or&quot; logic: SO qualifies on GS+MC+EI=165 or
            VE+AR+MK+MC=220, so a strong technical profile or a strong verbal-math profile both open
            the door, before any physical screening.
          </li>
          <li>
            <strong className="text-text-primary">Construction (Seabees, 7 ratings) and medical
            (HM).</strong> Seabee rates (BU, EO, SW) start at 145; Hospital Corpsman sits at 156 and
            carries a $30,000 bonus.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Nuclear and NAPT note</p>
          <p className="mt-1 text-sm text-text-secondary">
            The Nuclear Field program (MMN/EMN/ETN) layers the Navy Advanced Programs Test (NAPT) and
            a higher composite on top of the base machinist, electrician, and electronics rates. Clear
            a 252+ single composite and you skip NAPT; land in the 235-251 band and you take it. The
            program carries the Navy&apos;s largest enlistment bonus, up to $75,000.
          </p>
        </aside>

        {/* ── PACT and FY2026 Bonus Summary (kept curated data) ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          PACT Undesignated Path and FY2026 Bonus Summary
        </h2>

        <p className="mt-4 text-text-secondary">
          If you do not qualify for any rating composite on this chart, the Navy has PACT
          (Professional Apprenticeship Career Track). You enlist undesignated, ship to a fleet
          command, and pick a rating at the 12-month mark.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Seaman PACT (general/deck)</p>
            <p className="mt-1 text-sm text-text-secondary">VE+AR &ge; 85</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Airman PACT (aviation)</p>
            <p className="mt-1 text-sm text-text-secondary">AR+AS+MK+VE &ge; 167 or AR+VE &ge; 85</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Engineering PACT (propulsion)</p>
            <p className="mt-1 text-sm text-text-secondary">AR+MK+MC+VE &ge; 189 or AR+AS+MK+VE &ge; 184</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Designation timeline</p>
            <p className="mt-1 text-sm text-text-secondary">~12 months at first command (~24 months total service)</p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            PACT is not a downgrade. Designation rates ran 87% in FY2025: almost every PACT sailor got
            their preferred rating or a close adjacency at the 12-month board. Same paycheck for your
            paygrade, same sea time, same GI Bill as a guaranteed-rating recruit.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you qualify for a high-bonus rating, get it written into your contract before you ship.
          Bonuses are renegotiated quarterly. Below is the FY2026 stack as of April 2026.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Bonus Amount</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Type</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Cap</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MMN/EMN/ETN (Nuclear)</td>
                <td className="py-2 pr-4 font-mono">$40,000</td>
                <td className="py-2 pr-4">EBSR</td>
                <td className="py-2">$75,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AIRR</td>
                <td className="py-2 pr-4 font-mono">$30,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EOD</td>
                <td className="py-2 pr-4 font-mono">$30,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">HM</td>
                <td className="py-2 pr-4 font-mono">$30,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">ND</td>
                <td className="py-2 pr-4 font-mono">$30,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SB (SWCC)</td>
                <td className="py-2 pr-4 font-mono">$30,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SECF</td>
                <td className="py-2 pr-4 font-mono">$20,000</td>
                <td className="py-2 pr-4">5YO</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTI</td>
                <td className="py-2 pr-4 font-mono">$15,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">ITS</td>
                <td className="py-2 pr-4 font-mono">$15,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SO (SEAL)</td>
                <td className="py-2 pr-4 font-mono">$15,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">IT</td>
                <td className="py-2 pr-4 font-mono">$10,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$50,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          ATF = Advanced Training Field. 5YO = Five-Year Obligation. EBSR = Enlistment Bonus Specific
          Rating. The MEPS contract names every component separately; totals only add up if every box
          is checked.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Get it in writing. Bonuses update quarterly by NAVADMIN and must be written into your
            contract at MEPS. Verbal promises do not survive boot camp. If the bonus is not on the
            page you sign, it does not exist.
          </p>
        </aside>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the lowest ASVAB score for a Navy job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The lowest Navy line score on the chart is Culinary Specialist (CS) at VE+AR={LOW.minScore},
              followed by Retail Services Specialist (RS) at 83 and Logistics Specialist (LS) at 92.
              All sit on top of the Tier I AFQT floor of 31 to 35. Musician (MU) takes AFQT 31 plus an
              audition instead of a line-score cutoff.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Navy job has the highest ASVAB requirement?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Cryptologic Technician Networks (CTN) and Cyber Warfare Technician (CWT) tie for the
              highest at {HIGH.minScore}, CTN on AR+2MK+GS. Cryptologic Technician Maintenance (CTM)
              is next at 223, then a 222 cluster: AE, AT, ET, FC, IT, RW, and STG.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the easiest Navy rating to qualify for in 2026?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              CS at VE+AR=76 sits lowest, followed by RS at 83, LS at 92, YN at 99, and QM at 100. MU
              is AFQT 31 (audition-gated). All are reachable with an AFQT in the 50-60 range. The
              lowest-scoring entry path overall is PACT at VE+AR=85.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the hardest Navy rating to qualify for?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              CTN at AR+2MK+GS=255 and CWT at 255 are tied at the top. CTM follows at 223, then the
              222 cluster (AE, AT, ET, FC, IT, RW, STG). Nuclear-field candidates clear a 252+ single
              composite or take the NAPT.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why do submarine versions of ratings need higher scores than surface?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Small crew (~140), nuclear power, no resupply for 60-90 days, constant cross-training in
              damage control and reactor safety. The composite is the Navy&apos;s proxy for that
              cognitive load. CS surface needs VE+AR=76, CSS submarine needs 200. Same job, a
              124-point gap.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the NAPT and do I need to take it?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Navy Advanced Programs Test runs 2 hours, 80 questions on chemistry, math, physics,
              and reading. Required only for nuclear candidates whose composites land in the 235-251
              range. Hit 252 or higher on a single composite and you skip NAPT.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I pick my rating before enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Guaranteed ratings get written into your contract before you process at MEPS. The
              alternatives are open contract or PACT. Get the rating, bonus, and school start date in
              writing. Verbal promises do not count once you ship.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Which ASVAB subtests should I study hardest for Navy ratings?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AR appears in roughly 70% of Navy formulas, the highest leverage of any subtest. MK is
              second, EI third, GS fourth. For AFQT, VE (WK+PC) is doubled. Study AR and MK first,
              then layer EI and GS for technical or nuclear ratings. Run scores through the{" "}
              <Link href={navyHub.calculatorHref} className="text-accent hover:text-accent-hover">
                Navy ASVAB score calculator
              </Link>{" "}
              to see what you qualify for now.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if I don&apos;t qualify for the rating I want?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Three options. Retake the ASVAB after the one-month wait, then six-month intervals.
              Enlist via PACT and designate at 12 months using this chart as your shortlist. Or enlist
              in a lower-composite rating and apply for lateral conversion later. Most recruits who
              prep 4-6 extra weeks gain 10-15 AFQT points on retest.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do dual-formula ratings work?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Some ratings list two qualifying paths joined by &quot;or&quot; and you only need to hit
              one. Navy SEAL (SO) takes GS+MC+EI=165 or VE+AR+MK+MC=220. Score over the line on either
              and you qualify. Recruiters run both calculations automatically, so target the formula
              that matches your existing subtest strengths.
            </p>
          </div>
        </div>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, line scores, and every Navy
            rating you qualify for.
          </p>
          <Link
            href={navyHub.calculatorHref}
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Navy Calculator
          </Link>
          <p className="mt-3 text-xs text-text-tertiary">
            Or take a{" "}
            <Link href="/practice-test" className="text-accent hover:text-accent-hover">
              free 3-minute diagnostic
            </Link>{" "}
            to estimate your scores first.
          </p>
        </div>

        <div className="mt-8 not-prose">
          <AffiliateBookBlock source="navy-ratings-list-end" />
        </div>

        <div className="not-prose">
          <RelatedLinks title="Navy ASVAB resources" links={navyHub.related} />
        </div>
      </article>
    </div>
  );
}
