import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Navy Ratings List (2026): Jobs and Required ASVAB Scores",
  description:
    "Complete navy ratings list organized by career community. ASVAB composite scores for all 89 jobs, FY2026 bonuses, NAPT requirements, and PACT path explained.",
  alternates: {
    canonical: "https://asvabhero.com/navy-ratings-list",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Navy Ratings List 2026: All 89 Jobs and Their ASVAB Score Requirements",
  description:
    "Complete navy ratings list organized by career community. ASVAB composite scores for all 89 jobs, FY2026 bonuses, NAPT requirements, and PACT path explained.",
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
  dateModified: "2026-04-27",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the easiest Navy rating to qualify for in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CS at VE+AR=76 sits lowest, followed by RS at 83, LS at 92-102, QM at 96, and MU at AFQT 31 (audition-gated). All reachable with an AFQT in the 50-60 range. The lowest-scoring path is PACT at VE+AR=85.",
      },
    },
    {
      "@type": "Question",
      name: "What's the hardest Navy rating to qualify for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CTN at AR+2MK+GS=255. CWT at 239 second. Nuclear NFa at 252 single-composite third. The next cluster lives at 222: AT, AE, AC, FC, STG, IT, ET.",
      },
    },
    {
      "@type": "Question",
      name: "Why do submarine versions of ratings need higher scores than surface?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small crew (~140), nuclear power, no resupply for 60-90 days, constant cross-training in damage control and reactor safety. The composite is the Navy proxy for that cognitive load. CS surface needs 88, CSS submarine needs 200. Same job, 112-point gap.",
      },
    },
    {
      "@type": "Question",
      name: "What's the NAPT and do I need to take it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Navy Advanced Programs Test runs 2 hours, 80 questions on chemistry, math, physics, and reading. Required only for nuclear candidates whose composites land in the 235-251 range (NFb). Hit 252 or higher on a single composite and you skip NAPT under NFa.",
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
        text: "AR appears in roughly 70% of Navy formulas. MK is second at 65%, EI third at 50%, GS fourth at 45%. For AFQT, VE (WK+PC) is doubled. Study AR and MK first, then layer EI and GS for technical or nuclear ratings.",
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
        text: "You only need to hit one formula. AT requires AR+MK+EI+GS=222 OR VE+AR+MK+MC=222. Score 230 on the first and 200 on the second and you qualify. Recruiters run both calculations automatically.",
      },
    },
  ],
};

export default function NavyRatingsListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy Ratings List for 2026: All 89 Jobs and Their ASVAB Score Requirements
        </h1>

        <p className="mt-4 text-text-secondary">
          The Navy has 89 enlisted ratings. Your recruiter will hand you a list, and unless you
          already know what an Aviation Boatswain&apos;s Mate does versus a Cryptologic Technician
          Networks operator, that list is useless.
        </p>

        <p className="text-text-secondary">
          Ratings are the Navy&apos;s word for enlisted jobs. Each has its own ASVAB composite
          requirement, and many have two paths to qualify. The trick most recruits miss: the Navy
          organizes its career field community-first, rating-second. Pick your deployment environment
          before you pick the specific job. Life on a submarine is nothing like life on a carrier
          flight deck even with the same rating title.
        </p>

        <p className="text-text-secondary">
          This <strong>navy ratings list</strong> organizes all 89 jobs by community, lists the
          composite formula and minimum score for each, flags every FY2026 bonus, and explains two
          paths most recruits never hear about: PACT (the low-score door into the fleet) and Nuclear
          Field with NAPT (the high-score path to the biggest bonus in the military).
        </p>

        {/* Stats Row */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">89 ratings</p>
            <p className="mt-1 text-sm text-text-secondary">organized into 10 career communities</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Lowest barrier: CS at VE+AR=76</p>
            <p className="mt-1 text-sm text-text-secondary">achievable with AFQT in low 50s</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Highest barrier: CTN at AR+2MK+GS=255</p>
            <p className="mt-1 text-sm text-text-secondary">top 5% range</p>
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

        <p className="text-text-secondary">
          Run your subtest scores through the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free ASVAB calculator
          </Link>{" "}
          to see which ratings you already qualify for. Pair it with the{" "}
          <Link href="/navy-asvab-score" className="text-accent hover:text-accent-hover">
            Navy ASVAB score guide
          </Link>{" "}
          for AFQT minimums.
        </p>

        <p className="text-text-secondary">
          By the end of this navy ratings list you&apos;ll know which ratings you qualify for today,
          which you could qualify for with focused study, and which subtests deliver the highest
          return on study time.
        </p>

        {/* Category jump links, TOC into each community */}
        <nav
          aria-label="Jump to a Navy community"
          className="my-6 not-prose rounded-xl border border-navy-border bg-navy-light p-5"
        >
          <p className="text-sm font-semibold text-text-primary">
            Jump to a career community
          </p>
          <div className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {[
              ["#aviation", "Aviation"],
              ["#surface-combat", "Surface Combat & Deck"],
              ["#engineering", "Engineering & Propulsion"],
              ["#intelligence", "Intelligence, Crypto & Cyber"],
              ["#submarine", "Submarine Service"],
              ["#nuclear", "Nuclear Field"],
              ["#medical-admin", "Medical, Admin & Supply"],
              ["#special-warfare", "Special Warfare"],
              ["#seabees", "Seabees / Construction"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                {label} &rarr;
              </a>
            ))}
          </div>
        </nav>

        {/* CTA module, high-intent: find the ratings you already qualify for */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              See which ratings you qualify for right now
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Take a free 3-minute diagnostic to estimate your AFQT and line scores
              before you talk to a recruiter.
            </p>
          </div>
          <Link
            href="/practice-test"
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover sm:mt-0 sm:ml-6 sm:shrink-0"
          >
            Start free diagnostic
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── Section: How Navy ASVAB Scoring Works ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Navy ASVAB Scoring Works: AFQT vs Composite Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          A Cryptologic Technician Networks job needs a composite of 255. The maximum AFQT is 99.
          Both numbers are real, both come from the same ASVAB.
        </p>

        <p className="text-text-secondary">
          The Navy uses a two-tier scoring system. The AFQT is your percentile from VE+AR+MK and
          decides whether the Navy will take you. The line score composite is a raw sum of standard
          subtest scores and decides which rating you can hold.
        </p>

        <p className="text-text-secondary">
          For 2026 the AFQT minimums are 35 for Tier I (diploma or 15+ college credits), 50 for
          Tier II (GED), and 26-30 for the Future Sailor Preparatory Course academic track. Hit the
          minimum and you&apos;re in. The composite determines what you do once you&apos;re in.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Most-used Navy line score composites:<br />
          AR + MK + EI + GS → electronics, nuclear, IT (14+ ratings)<br />
          VE + AR + MK + MC → engineering, aviation generalist (18+ ratings)<br />
          VE + AR + MK + AS → mechanical, maintenance trades (12+ ratings)<br />
          VE + AR → admin, general, support (6+ ratings, lowest bar)
        </div>

        <p className="text-text-secondary">
          Standard subtest scores run roughly 20 to 80, with 50 as the population average. A
          composite of 222 means averaging 55-56 across four subtests. A composite of 255 means
          hitting close to 64 on each. The math gets steep fast.
        </p>

        <p className="text-text-secondary">
          Many ratings list two qualifying formulas. You only need to hit ONE. Your recruiter runs
          both and picks whichever puts you over the line. Heavy on EI and GS but light on MC opens
          different doors than the reverse profile.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Standard Scores Explained</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 222 composite means averaging 55-56 on each of four subtests. A 255 composite means
            averaging about 64 on each, putting you in the top 10-15% across all four areas
            simultaneously.
          </p>
        </aside>

        <p className="text-text-secondary">
          For percentile mechanics, see the{" "}
          <Link href="/afqt-score" className="text-accent hover:text-accent-hover">
            AFQT score breakdown
          </Link>
          . To preview which composites you hit, plug subtest scores into the{" "}
          <Link href="/asvab-line-score-calculator" className="text-accent hover:text-accent-hover">
            free line score calculator
          </Link>
          .
        </p>

        {/* ── Section 1: Aviation Community ── */}
        <h2 id="aviation" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          1. Aviation Community Ratings (14 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          The aviation community has the widest score range on the ship. The lowest aviation job
          needs a 102 composite. The highest needs 222. Both work on the same flight deck.
        </p>

        <p className="text-text-secondary">
          Aviation splits into three sub-clusters. Flight deck ops (ABE/ABF/ABH, AO) launch,
          recover, and arm aircraft. Maintenance (AD, AM, AME, AT, AE, AS, PR) keeps them
          mission-ready. Aircrew and ops (AW family, AIRR, AC, AG, AZ) fly, control, and administer
          the air wing.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">ABE/ABF/ABH</td>
                <td className="py-2 pr-4">Aviation Boatswain&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS</td>
                <td className="py-2 pr-4 font-mono">184</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AC</td>
                <td className="py-2 pr-4">Air Traffic Controller</td>
                <td className="py-2 pr-4 font-mono">MK+EI+GS+AR or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AD</td>
                <td className="py-2 pr-4">Aviation Machinist&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AE</td>
                <td className="py-2 pr-4">Aviation Electrician&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AG</td>
                <td className="py-2 pr-4">Aerographer&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+MK+GS</td>
                <td className="py-2 pr-4 font-mono">162</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AIRR</td>
                <td className="py-2 pr-4">Aviation Rescue Swimmer</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC or VE+AR+MK+AS</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">$30,000 ATF</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AM/AME</td>
                <td className="py-2 pr-4">Aviation Structural Mechanic</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AO</td>
                <td className="py-2 pr-4">Aviation Ordnanceman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or MK+AS+AO</td>
                <td className="py-2 pr-4 font-mono">185 / 140</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AS</td>
                <td className="py-2 pr-4">Aviation Support Equipment Tech</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AT</td>
                <td className="py-2 pr-4">Aviation Electronics Technician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AW (AWF/AWO/AWR/AWS/AWV)</td>
                <td className="py-2 pr-4">Naval Aircrewman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC or VE+AR+MK+AS</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AZ</td>
                <td className="py-2 pr-4">Aviation Maintenance Admin</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">102</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">PR</td>
                <td className="py-2 pr-4">Aircrew Survival Equipmentman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or MK+AS+AO</td>
                <td className="py-2 pr-4 font-mono">185 / 140</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Lowest aviation barrier: AZ at VE+AR=102 is the cheapest way into aviation. Desk in a
            hangar bay processing maintenance records and parts requisitions. Same flight deck pay,
            same sea time, fraction of the score.
          </p>
        </aside>

        <p className="text-text-secondary">
          AIRR carries one of the highest bonuses in the Navy at $30,000 ATF. AIRR school attrition
          runs ~60% on swim and rescue quals, so the bonus rewards finishing, not enlisting.
        </p>

        <p className="text-text-secondary">
          The 222 cluster (AC, AE, AT) keys off AR+MK+EI+GS, the same composite the surface
          electronics community uses. Hit it and you&apos;re cross-qualified for several technical
          paths, which gives you negotiating leverage at the recruiter&apos;s office.
        </p>

        {/* ── Section 2: Surface Combat Systems ── */}
        <h2 id="surface-combat" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          2. Surface Combat Systems and Deck Ratings (12 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          Watched a destroyer deployment video? You&apos;ve seen all twelve of these ratings on
          screen. They fight the ship.
        </p>

        <p className="text-text-secondary">
          Surface combat systems and deck crew destroyers, cruisers, frigates, LCS, and amphibs.
          Deck (BM, QM) handles seamanship, mooring, small boats, and underway replenishment. Combat
          systems (FC, GM, OS, TM, MN) runs the weapons. Sonar (STG) tracks underwater threats.
          Damage control (DC, HT) keeps the ship floating.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">BM</td>
                <td className="py-2 pr-4">Boatswain&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or MK+AS+AO</td>
                <td className="py-2 pr-4 font-mono">175 / 135</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">DC</td>
                <td className="py-2 pr-4">Damage Controlman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">205</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">FC</td>
                <td className="py-2 pr-4">Fire Controlman</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">$15,000 AECF</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GM</td>
                <td className="py-2 pr-4">Gunner&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">205</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">HT</td>
                <td className="py-2 pr-4">Hull Maintenance Technician</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">205</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MN</td>
                <td className="py-2 pr-4">Mineman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC or VE+AR+MK+AO</td>
                <td className="py-2 pr-4 font-mono">210 / 216</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">OS</td>
                <td className="py-2 pr-4">Operations Specialist</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS or VE+MK+CS</td>
                <td className="py-2 pr-4 font-mono">210 / 157</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">QM</td>
                <td className="py-2 pr-4">Quartermaster</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">96</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">STG</td>
                <td className="py-2 pr-4">Sonar Technician Surface</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">$15,000 ATF + $15,000 5YO</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">STS</td>
                <td className="py-2 pr-4">Sonar Technician Submarine</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">218</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">TM</td>
                <td className="py-2 pr-4">Torpedoman&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS</td>
                <td className="py-2 pr-4 font-mono">196</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          STS is technically a submarine rating but the qualification path mirrors STG closely
          enough to list here. The submarine variant adds citizenship and clearance requirements.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Stacked Bonus Alert</p>
          <p className="mt-1 text-sm text-text-secondary">
            STG layers two bonuses in FY2026: $15,000 ATF plus $15,000 for a five-year obligation
            totals $30,000 if you sign the longer contract. Minimum is 222 on AR+MK+EI+GS and the
            A-school pipeline runs roughly six months.
          </p>
        </aside>

        <p className="text-text-secondary">
          QM at VE+AR=96 is the lowest barrier on the surface side. Reading charts, tracking
          position, standing watch with the captain on the bridge. If your AFQT lands in the high
          40s and you want to drive the ship, QM is the door.
        </p>

        {/* ── Section 3: Engineering and Propulsion ── */}
        <h2 id="engineering" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          3. Engineering and Propulsion Ratings (8 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          A Navy ship is a 9,000-ton machine that has to make its own electricity, water, and steam
          in the middle of the ocean. These eight ratings make that work.
        </p>

        <p className="text-text-secondary">
          Steam and diesel propulsion = MM. Gas turbines = GSM (mechanical) and GSE (electrical).
          Electrical systems = EM and IC. Small craft and auxiliary engines = EN. Parts fabrication
          at sea, the literal machine shop, = MR.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EM</td>
                <td className="py-2 pr-4">Electrician&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC or AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EN</td>
                <td className="py-2 pr-4">Engineman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+AO</td>
                <td className="py-2 pr-4 font-mono">200 / 205</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">ET</td>
                <td className="py-2 pr-4">Electronics Technician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GSE</td>
                <td className="py-2 pr-4">Gas Turbine System Tech (Electrical)</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC or AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GSM</td>
                <td className="py-2 pr-4">Gas Turbine System Tech (Mechanical)</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+AO</td>
                <td className="py-2 pr-4 font-mono">200 / 205</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">IC</td>
                <td className="py-2 pr-4">Interior Communications Electrician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">213</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MM</td>
                <td className="py-2 pr-4">Machinist&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+AO</td>
                <td className="py-2 pr-4 font-mono">200 / 205</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">MR</td>
                <td className="py-2 pr-4">Machinery Repairman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">205</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Gateway score for surface combat systems: Electronics Technician (ET) at
            AR+MK+EI+GS=222 is the entry point into the technical fleet. Hit that single composite
            and you&apos;re cross-qualified for FC, STG, GM, and IT. One score, four ratings to
            negotiate.
          </p>
        </aside>

        <p className="text-text-secondary">
          Engineering ratings have one of the highest re-enlistment rates in the surface fleet.
          Skills transfer, civilian demand at every power plant, shipyard, refinery, and HVAC firm
          is steady. An MM with eight years of steam plant experience walks into a $90K civilian
          operator job without re-training.
        </p>

        {/* ── Section 4: Intelligence, Cryptologic, and Cyber ── */}
        <h2 id="intelligence" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          4. Intelligence, Cryptologic, and Cyber Ratings (10 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          The hardest rating to qualify for in the Navy is Cryptologic Technician Networks.
          Composite 255 on AR+2MK+GS, roughly the 95th percentile across three subtests
          simultaneously. The job is offensive cyber ops at NSA Fort Meade.
        </p>

        <p className="text-text-secondary">
          This community works for Navy Information Forces and partners with NSA and U.S. Cyber
          Command. Six rating families live here: five CT variants plus CWT, IS, IT (with submarine
          variant ITS), and the new RW (Robotics Warfare Specialist) that stood up in 2024.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTI</td>
                <td className="py-2 pr-4">Cryptologic Tech Interpretive</td>
                <td className="py-2 pr-4 font-mono">VE+MK+GS + DLAB ≥100</td>
                <td className="py-2 pr-4 font-mono">162</td>
                <td className="py-2">$15,000 ATF</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTM</td>
                <td className="py-2 pr-4">Cryptologic Tech Maintenance</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+VE</td>
                <td className="py-2 pr-4 font-mono">221</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTN</td>
                <td className="py-2 pr-4">Cryptologic Tech Networks</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">255 / 235</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTR</td>
                <td className="py-2 pr-4">Cryptologic Tech Collection</td>
                <td className="py-2 pr-4 font-mono">MK+PC or AR+PC</td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTT</td>
                <td className="py-2 pr-4">Cryptologic Tech Technical</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS or AR+MK+CT</td>
                <td className="py-2 pr-4 font-mono">212 / 159</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CWT</td>
                <td className="py-2 pr-4">Cyber Warfare Technician</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">239</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">IS</td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">107</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">IT</td>
                <td className="py-2 pr-4">Information Systems Tech</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS or AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">$10,000 ATF</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">ITS</td>
                <td className="py-2 pr-4">IT Specialist (Sub)</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS or AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">218</td>
                <td className="py-2">$15,000 ATF</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">RW</td>
                <td className="py-2 pr-4">Robotics Warfare Specialist</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or AR+MK+VE+MC</td>
                <td className="py-2 pr-4 font-mono">222</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">CTI Language Requirement</p>
          <p className="mt-1 text-sm text-text-secondary">
            CTI requires a Defense Language Aptitude Battery (DLAB) score on top of the ASVAB. DLAB
            100-109 qualifies you for Spanish, Hebrew, Farsi, or Russian. DLAB 110+ opens Arabic,
            Chinese, or Korean. Higher DLAB, harder language, longer pipeline, bigger civilian
            payoff.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            CTR clearance timeline: CTR is the easiest CT rating on paper at 110. The catch:
            clearance runs 12-18 months between contract sign and A-school start. If you need to
            ship fast for financial reasons, CTR isn&apos;t your rating.
          </p>
        </aside>

        <p className="text-text-secondary">
          IS at VE+AR=107 is the sleeper pick. Reachable composite, carrier strike group
          intelligence work, TS/SCI on the Navy&apos;s dime, six-figure defense-contractor transfer
          at separation.
        </p>

        <p className="text-text-secondary">
          CTN at 255 is the ceiling. CWT at 239 second. Nuclear at 252 single-composite third.
          Every other technical rating on this navy ratings list tops out at 222.
        </p>

        {/* ── Section 5: Submarine Service ── */}
        <h2 id="submarine" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          5. Submarine Service Ratings (Including SECF)
        </h2>

        <p className="mt-4 text-text-secondary">
          A surface Culinary Specialist needs a composite of 88. The submarine version needs 200.
          Same job, same paycheck. The submarine demands 112 more composite points to feed people
          inside it.
        </p>

        <p className="text-text-secondary">
          Every submarine rating is citizenship-required, security-cleared, and cross-trained in
          damage control and atmosphere control. Submarine ratings either share a surface name with
          an &apos;S&apos; suffix (CSS, LSS, MMS) or live entirely inside the community (FT, STS,
          MMA).
        </p>

        <p className="text-text-secondary">
          The score gap exists because of the environment. Crew of ~140, nuclear-powered, no
          resupply for 60-90 days, zero margin for error. Every submariner cross-trains in damage
          control, atmosphere management, and basic reactor safety regardless of rating. The
          composite is the Navy&apos;s proxy for that cognitive load.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SECF</td>
                <td className="py-2 pr-4">Submarine Electronics/Computer Field</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">218</td>
                <td className="py-2">$20,000 (5YO), cap $60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">FT</td>
                <td className="py-2 pr-4">Fire Control Technician (Sub)</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">218</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">STS</td>
                <td className="py-2 pr-4">Sonar Technician (Submarine)</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS or VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">218</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MMA</td>
                <td className="py-2 pr-4">Auxiliary Machinist&apos;s Mate (Sub)</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MMS</td>
                <td className="py-2 pr-4">Submarine Machinist&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">210</td>
                <td className="py-2">$10,000 (5YO)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CSS</td>
                <td className="py-2 pr-4">Culinary Specialist (Submarine)</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">200</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">LSS</td>
                <td className="py-2 pr-4">Logistics Specialist (Submarine)</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">200</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">SECF Is an Umbrella, Not a Rating</p>
          <p className="mt-1 text-sm text-text-secondary">
            SECF places sailors into FT, STS, ET-Sub, and IT-Sub. Same composite (218), same
            A-school sequence. Your specific rating is assigned by fleet need at A-school
            graduation, not at the recruiter&apos;s desk. If you want a guaranteed rating, ask about
            the rating-specific contract instead of SECF.
          </p>
        </aside>

        <p className="text-text-secondary">
          Every submarine rating requires U.S. citizenship and a Secret-or-higher clearance. Foreign
          national parent, unresolved drug history, or certain financial issues close the community
          regardless of ASVAB score. The ASVAB gets you into the testing pool. The investigation
          decides whether you wear the dolphins.
        </p>

        {/* ── Section 6: Nuclear Field ── */}
        <h2 id="nuclear" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          6. Nuclear Field Ratings and the NAPT Exam
        </h2>

        <p className="mt-4 text-text-secondary">
          The Navy nuclear program offers the highest enlistment bonus on the planet: $40,000 up
          front, capped at $75,000 with reenlistment. It also has the most complicated qualification
          pipeline in the DoD: the ASVAB, then a second test called the NAPT.
        </p>

        <p className="text-text-secondary">
          The Nuclear Field has three ratings: MMN (Machinist&apos;s Mate Nuclear), EMN
          (Electrician&apos;s Mate Nuclear), ETN (Electronics Technician Nuclear). All three share
          A-school, Power School (six months, Charleston SC), and Prototype Training (six months,
          Charleston or Saratoga Springs NY). After Prototype you assign to submarines or carriers
          based on fleet need.
        </p>

        <p className="text-text-secondary">
          Two qualification paths exist: Alpha (NFa) and Bravo (NFb).
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          NUCLEAR FIELD QUALIFICATION PATHS<br />
          NFa (Alpha): At least one composite ≥ 252 AND both composites ≥ 235 → ASVAB alone qualifies. No NAPT required.<br />
          NFb (Bravo): Both composites in the 235-251 range → Must take NAPT. Min NAPT score 50. → Combined composite + NAPT must total ≥ 290.<br />
          Composites used: AR+MK+EI+GS and VE+AR+MK+MC
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">NAPT (Navy Advanced Programs Test) Details</p>
          <ul className="mt-1 space-y-1 text-sm text-text-secondary">
            <li><strong>Format:</strong> 2 hours, ~80 questions</li>
            <li><strong>Content mix:</strong> chemistry ~25%, math ~35%, physics ~25%, reading ~15%</li>
            <li><strong>Qualifying:</strong> 50+ (combined with ASVAB composite ≥ 290)</li>
            <li><strong>Retest:</strong> 40-49 allows one retake after 90 days with documented academic improvement</li>
            <li><strong>Below 40:</strong> no retake, nuclear field disqualified</li>
            <li><strong>Administered:</strong> at MEPS during the same window as the ASVAB</li>
          </ul>
        </aside>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">NFa Path</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">NFb Path</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MMN</td>
                <td className="py-2 pr-4">Machinist&apos;s Mate Nuclear</td>
                <td className="py-2 pr-4">Either composite ≥252 (both ≥235)</td>
                <td className="py-2">Both 235-251, NAPT ≥50, sum ≥290</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EMN</td>
                <td className="py-2 pr-4">Electrician&apos;s Mate Nuclear</td>
                <td className="py-2 pr-4">Same as MMN</td>
                <td className="py-2">Same as MMN</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">ETN</td>
                <td className="py-2 pr-4">Electronics Technician Nuclear</td>
                <td className="py-2 pr-4">Same as MMN</td>
                <td className="py-2">Same as MMN</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">FY2026 Nuclear Field Bonus Package</p>
          <ul className="mt-1 space-y-1 text-sm text-text-secondary">
            <li><strong>Enlistment Bonus on graduation:</strong> $40,000</li>
            <li><strong>Total cap with reenlistment:</strong> $75,000 (highest in the Navy)</li>
            <li><strong>Service obligation:</strong> 6 years active</li>
            <li><strong>U.S. citizenship:</strong> required, no waivers granted</li>
            <li><strong>Age cutoff:</strong> 17-25 at most processing commands</li>
          </ul>
        </aside>

        <p className="text-text-secondary">
          Nuclear is the closest enlisted path to an engineering degree. Power School covers
          thermodynamics, heat transfer, fluid dynamics, reactor theory, chemistry, and math at a
          pace equivalent to a full associate&apos;s in nuclear engineering. Transcripts transfer to
          civilian universities. Reactor operators clear $130,000-$180,000 in commercial nuclear
          power within six months of separating.
        </p>

        <p className="text-text-secondary">
          For Nuclear, the highest-leverage subtests are AR and GS, both feeding the AR+MK+EI+GS
          composite. See{" "}
          <Link href="/asvab-arithmetic-reasoning-tips" className="text-accent hover:text-accent-hover">
            Arithmetic Reasoning study tips
          </Link>{" "}
          and{" "}
          <Link href="/asvab-general-science-tips" className="text-accent hover:text-accent-hover">
            General Science study tips
          </Link>
          .
        </p>

        {/* ── Section 7: Medical, Admin, Supply, and Support ── */}
        <h2 id="medical-admin" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          7. Medical, Admin, Supply, and Support Ratings (10 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          Scoring in the 50-65 AFQT range with your recruiter pushing open contract? Stop. Specific
          ratings here need lower scores than open contract requires, and they&apos;re real career
          paths.
        </p>

        <p className="text-text-secondary">
          HM supports Marines through Fleet Marine Force assignments. LS runs supply chains afloat
          and ashore. YN runs admin. MA does law enforcement and security on every base and ship.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CS</td>
                <td className="py-2 pr-4">Culinary Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">76-88</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">HM</td>
                <td className="py-2 pr-4">Hospital Corpsman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+GS or AR+PC+MK</td>
                <td className="py-2 pr-4 font-mono">208 / 156</td>
                <td className="py-2">$30,000 ATF, cap $60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">LN</td>
                <td className="py-2 pr-4">Legalman</td>
                <td className="py-2 pr-4 font-mono">MK+VE (VE≥52)</td>
                <td className="py-2 pr-4 font-mono">105</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">LS</td>
                <td className="py-2 pr-4">Logistics Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">92-102</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MA</td>
                <td className="py-2 pr-4">Master-at-Arms</td>
                <td className="py-2 pr-4 font-mono">AR+VE+MK+MC or WK+AR</td>
                <td className="py-2 pr-4 font-mono">192 / 98</td>
                <td className="py-2">$20,000 SG</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MC</td>
                <td className="py-2 pr-4">Mass Communication Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR (VE≥53)</td>
                <td className="py-2 pr-4 font-mono">115</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MU</td>
                <td className="py-2 pr-4">Musician</td>
                <td className="py-2 pr-4 font-mono">AFQT minimum only</td>
                <td className="py-2 pr-4 font-mono">31 AFQT</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">NC</td>
                <td className="py-2 pr-4">Navy Counselor</td>
                <td className="py-2 pr-4 font-mono">GS+MK+VE (AR≥51)</td>
                <td className="py-2 pr-4 font-mono">156</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">PS</td>
                <td className="py-2 pr-4">Personnel Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+MK or VE+MK+CS</td>
                <td className="py-2 pr-4 font-mono">105 / 157</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">RS</td>
                <td className="py-2 pr-4">Retail Services Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">83</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">YN</td>
                <td className="py-2 pr-4">Yeoman</td>
                <td className="py-2 pr-4 font-mono">VE+MK or VE+MK+CS</td>
                <td className="py-2 pr-4 font-mono">99 / 148</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            HM career arcs: Hospital Corpsman is the gateway to Fleet Marine Force, SARC (Special
            Amphibious Reconnaissance Corpsman), and Recon Corpsman tracks. Same rating, three
            different paths. The $30,000 ATF bonus stacks for FMF assignments toward the $60,000
            cap.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Musician Is Audition-First</p>
          <p className="mt-1 text-sm text-text-secondary">
            MU is the only rating where the ASVAB is a side requirement, not the gate. You audition
            against ~12 spots per fiscal year. AFQT 31 is the floor. No audition, no path,
            regardless of composite.
          </p>
        </aside>

        <p className="text-text-secondary">
          CS at VE+AR=76 is the lowest barrier to enlistment in the Navy. Same paycheck, GI Bill,
          VA loan, and retirement clock as anyone else on the ship. To enlist now and figure the
          rest out later, CS, RS, and LS are your lowest-friction doors.
        </p>

        {/* ── Section 8: Special Warfare ── */}
        <h2 id="special-warfare" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          8. Special Warfare Ratings (5 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          Every Navy SEAL passed an ASVAB. The composite they needed was 108 on VE+AR. That&apos;s
          barely above the passing score for an Army cook. The hard part wasn&apos;t the test.
        </p>

        <p className="text-text-secondary">
          Special warfare spans five ratings. SO (SEAL) and SB (SWCC) sit under Naval Special
          Warfare Command. EOD handles ordnance disposal across all branches. ND does salvage and
          underwater construction support. UCT builds underwater structures for shore facilities.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EOD</td>
                <td className="py-2 pr-4">Explosive Ordnance Disposal</td>
                <td className="py-2 pr-4 font-mono">AR+VE≥109 + MC≥51 or GS+MC+EI=169</td>
                <td className="py-2 pr-4 font-mono">109</td>
                <td className="py-2">$30,000 ATF, cap $60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">ND</td>
                <td className="py-2 pr-4">Navy Diver</td>
                <td className="py-2 pr-4 font-mono">AR+VE≥105 + MC≥51</td>
                <td className="py-2 pr-4 font-mono">105</td>
                <td className="py-2">$30,000 ATF</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SB</td>
                <td className="py-2 pr-4">SWCC (Spec Warfare Boat Operator)</td>
                <td className="py-2 pr-4 font-mono">AR+VE≥105 + MC≥51</td>
                <td className="py-2 pr-4 font-mono">105</td>
                <td className="py-2">$30,000 ATF, cap $60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SO</td>
                <td className="py-2 pr-4">Navy SEAL</td>
                <td className="py-2 pr-4 font-mono">VE+AR≥108 + MC≥50 + AR+MK≥100</td>
                <td className="py-2 pr-4 font-mono">108</td>
                <td className="py-2">$15,000 ATF</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">UCT</td>
                <td className="py-2 pr-4">Underwater Construction Team</td>
                <td className="py-2 pr-4 font-mono">AR+VE≥103 + MC≥51</td>
                <td className="py-2 pr-4 font-mono">103</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">MC Is the SPECWAR Universal</p>
          <p className="mt-1 text-sm text-text-secondary">
            The MC≥50 floor appears on every special warfare rating. Mechanical Comprehension
            correlates with operating boat engines, breach systems, and dive equipment under
            pressure. If you&apos;re targeting any SPECWAR pipeline, MC and AR are your two
            highest-leverage subtests by a wide margin.
          </p>
        </aside>

        <p className="text-text-secondary">
          Pipeline attrition runs 60-80% depending on the school. The ASVAB gets you to BUD/S, EOD
          school, NDS, or SWCC selection. The test does not predict whether you&apos;ll finish.
          Physical screening, mental resilience, and team chemistry decide that. Pick by
          environment: SO and SB are direct-action shooters, EOD defuses ordnance for every branch,
          ND and UCT live underwater. For MC-specific prep, see the{" "}
          <Link href="/asvab-mechanical-comprehension-tips" className="text-accent hover:text-accent-hover">
            Mechanical Comprehension study tips
          </Link>
          .
        </p>

        {/* ── Section 9: Naval Construction Force ── */}
        <h2 id="seabees" className="mt-12 scroll-mt-24 font-display text-2xl font-bold text-text-primary">
          9. Naval Construction Force and Seabees (7 Jobs)
        </h2>

        <p className="mt-4 text-text-secondary">
          The Marines fight wars. The Seabees build the runways the Marines land on. If you&apos;ve
          watched a Pacific deployment, the people pouring concrete in humidity were Seabees, not
          contractors.
        </p>

        <p className="text-text-secondary">
          The Naval Construction Force runs seven ratings parallel to civilian construction trades.
          Active battalions operate from Gulfport, MS and Port Hueneme, CA. Seabees deploy with
          Marine units, into disaster zones, and to remote bases for runway, port, and base
          construction.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rating</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Full Name</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">FY26 Bonus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">BU</td>
                <td className="py-2 pr-4">Builder</td>
                <td className="py-2 pr-4 font-mono">AR+MC+AS</td>
                <td className="py-2 pr-4 font-mono">145</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CE</td>
                <td className="py-2 pr-4">Construction Electrician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">201</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CM</td>
                <td className="py-2 pr-4">Construction Mechanic</td>
                <td className="py-2 pr-4 font-mono">AR+MC+AS</td>
                <td className="py-2 pr-4 font-mono">162</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EA</td>
                <td className="py-2 pr-4">Engineering Aide</td>
                <td className="py-2 pr-4 font-mono">AR+2MK+GS</td>
                <td className="py-2 pr-4 font-mono">207</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EO</td>
                <td className="py-2 pr-4">Equipment Operator</td>
                <td className="py-2 pr-4 font-mono">AR+MC+AS</td>
                <td className="py-2 pr-4 font-mono">145</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SW</td>
                <td className="py-2 pr-4">Steelworker</td>
                <td className="py-2 pr-4 font-mono">AR+MC+AS</td>
                <td className="py-2 pr-4 font-mono">145</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">UT</td>
                <td className="py-2 pr-4">Utilitiesman</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">201</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          BU, EO, and SW share the 145 composite. Useful if you have broad construction interest but
          haven&apos;t picked a trade. The Navy assigns between them partly by aptitude testing at
          A-school and partly by fleet need. If you have civilian construction experience, bring
          documentation; direct-rating opportunities exist. CE and UT at 201 are the technical
          tracks: high-voltage power and water/HVAC. Both transfer cleanly to journeyman civilian
          licenses after one enlistment.
        </p>

        {/* ── Section: PACT and FY2026 Bonus Summary ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          PACT Undesignated Path and FY2026 Bonus Summary
        </h2>

        <p className="mt-4 text-text-secondary">
          If you don&apos;t qualify for any rating composite on this navy ratings list, the Navy has
          PACT (Professional Apprenticeship Career Track). You enlist undesignated, ship to a fleet
          command, and pick a rating at the 12-month mark.
        </p>

        <p className="text-text-secondary">
          PACT splits into three apprenticeship tracks by environment.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Seaman PACT (general/deck)</p>
            <p className="mt-1 text-sm text-text-secondary">VE+AR ≥ 85</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Airman PACT (aviation)</p>
            <p className="mt-1 text-sm text-text-secondary">AR+AS+MK+VE ≥ 167 or AR+VE ≥ 85</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Engineering PACT (propulsion)</p>
            <p className="mt-1 text-sm text-text-secondary">AR+MK+MC+VE ≥ 189 or AR+AS+MK+VE ≥ 184</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Designation timeline</p>
            <p className="mt-1 text-sm text-text-secondary">~12 months at first command (~24 months total service)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">AN-PACT bonus (April-July 2026 only)</p>
            <p className="mt-1 text-sm text-text-secondary">$15,000</p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            PACT is not a downgrade: Designation rates ran 87% in FY2025. Almost every PACT sailor
            got their preferred rating or a close adjacency at the 12-month board. Same paycheck for
            your paygrade, same sea time, same GI Bill as a guaranteed-rating recruit.
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
                <td className="py-2 pr-4 font-semibold text-text-primary">MA (shore)</td>
                <td className="py-2 pr-4 font-mono">$20,000</td>
                <td className="py-2 pr-4">SG</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SECF</td>
                <td className="py-2 pr-4 font-mono">$20,000</td>
                <td className="py-2 pr-4">5YO</td>
                <td className="py-2">$60,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AN-PACT</td>
                <td className="py-2 pr-4 font-mono">$15,000</td>
                <td className="py-2 pr-4">Seasonal</td>
                <td className="py-2">Apr-Jul 2026</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CTI</td>
                <td className="py-2 pr-4 font-mono">$15,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">FC (AECF)</td>
                <td className="py-2 pr-4 font-mono">$15,000</td>
                <td className="py-2 pr-4">Program</td>
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
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">STG</td>
                <td className="py-2 pr-4 font-mono">$15,000 + $15,000</td>
                <td className="py-2 pr-4">ATF + 5YO</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">IT</td>
                <td className="py-2 pr-4 font-mono">$10,000</td>
                <td className="py-2 pr-4">ATF</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">MMS</td>
                <td className="py-2 pr-4 font-mono">$10,000</td>
                <td className="py-2 pr-4">5YO</td>
                <td className="py-2">$50,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          ATF = Advanced Training Field. SG = Surface General. 5YO = Five-Year Obligation. AECF =
          Advanced Electronics/Computer Field. EBSR = Enlistment Bonus Specific Rating. The MEPS
          contract names every component separately; totals only add up if every box is checked.
        </p>

        <p className="text-text-secondary">
          Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free ASVAB calculator
          </Link>{" "}
          to check your subtest scores against these community composites before your next recruiter
          conversation.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Get it in writing: Bonuses update quarterly by NAVADMIN and must be written into your
            contract at MEPS. Verbal promises do not survive boot camp. If the bonus isn&apos;t on
            the page you sign, it doesn&apos;t exist.
          </p>
        </aside>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the easiest Navy rating to qualify for in 2026?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              CS at VE+AR=76 sits lowest, followed by RS at 83, LS at 92-102, QM at 96, and MU at
              AFQT 31 (audition-gated). All reachable with an AFQT in the 50-60 range. The
              lowest-scoring path is PACT at VE+AR=85.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the hardest Navy rating to qualify for?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              CTN at AR+2MK+GS=255. CWT at 239 second. Nuclear NFa at 252 single-composite third.
              The next cluster lives at 222: AT, AE, AC, FC, STG, IT, ET.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why do submarine versions of ratings need higher scores than surface?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Small crew (~140), nuclear power, no resupply for 60-90 days, constant cross-training
              in damage control and reactor safety. The composite is the Navy&apos;s proxy for that
              cognitive load. CS surface needs 88, CSS submarine needs 200. Same job, 112-point gap.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the NAPT and do I need to take it?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Navy Advanced Programs Test runs 2 hours, 80 questions on chemistry, math,
              physics, and reading. Required only for nuclear candidates whose composites land in the
              235-251 range (NFb). Hit 252+ on a single composite and you skip NAPT under NFa.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I pick my rating before enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Guaranteed ratings get written into your contract before you process at MEPS. The
              alternatives are open contract or PACT. Get the rating, bonus, and school start date
              in writing. Verbal promises do not count once you ship.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Which ASVAB subtests should I study hardest for Navy ratings?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AR appears in ~70% of Navy formulas, the highest leverage of any subtest. MK is second
              at 65%, EI third at 50%, GS fourth at 45%. For AFQT, VE (WK+PC) is doubled. Study AR
              and MK first, then layer EI and GS for technical or nuclear ratings. Run scores
              through the{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">
                free ASVAB calculator
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
              Enlist via PACT and designate at 12 months using this navy ratings list as your
              shortlist. Or enlist in a lower-composite rating and apply for lateral conversion
              later. Most recruits who prep 4-6 extra weeks gain 10-15 AFQT points on retest.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do dual-formula ratings work?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You only need to hit one. AT requires AR+MK+EI+GS=222 OR VE+AR+MK+MC=222. Score 230
              on the first and 200 on the second and you qualify. Recruiters run both calculations.
              Target the formula that matches your existing subtest strengths.
            </p>
          </div>
        </div>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite scores, and every
            job you qualify for.
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
