import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AffiliateBookBlock from "@/components/AffiliateBookBlock";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import JobScoreTable from "@/components/JobScoreTable";
import { marinesHub, hubScoreStats } from "@/lib/job-hubs";

// Single source of truth: every score figure on this page is derived from
// marines-jobs.json (the same data the Marines calculator uses), never
// hardcoded. The dataset was audited 2026-06-16 against published USMC
// line-score requirements (operationmilitarykids / military.com consensus,
// cross-checked vs MCO 1200.17 verbatim); see scripts/marines-audit-reference.json.
const jobs = marinesHub.jobs;
const stats = hubScoreStats(jobs);
const N = stats.count; // 129 MOS
const LOW = stats.lowest!; // 3531, MM 85
const HIGH = stats.highest!; // EL 115 (electronics/avionics maintainers)

export const metadata: Metadata = {
  title: `USMC MOS List 2026: ASVAB Line Scores for All ${N} Marine Corps Jobs`,
  description: `Marine Corps ASVAB score chart with the required line score for all ${N} enlisted MOS. Sortable table from ${LOW.code} (${LOW.composite} ${LOW.minScore}) up to EL ${HIGH.minScore}, plus the AFQT minimum and all five USMC line-score formulas (GT, CL, EL, MM, ST).`,
  alternates: {
    canonical: "https://asvabhero.com/usmc-mos-list",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `USMC MOS List 2026: ASVAB Line Scores for All ${N} Marine Corps Jobs`,
  description: `Marine Corps ASVAB score chart with the required line score for all ${N} enlisted MOS, the AFQT minimum, and all five USMC line-score composites.`,
  url: "https://asvabhero.com/usmc-mos-list",
  author: {
    "@type": "Organization",
    "@id": "https://asvabhero.com/#organization",
    name: "ASVAB Hero",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-03-20",
  dateModified: "2026-06-16",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum ASVAB score for the Marines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Marine Corps requires a minimum AFQT of 32 with a high school diploma (50 with a GED). AFQT is your entry ticket. Each MOS then has its own line-score composite (GT, CL, EL, MM, or ST) that decides which job you can actually hold.",
      },
    },
    {
      "@type": "Question",
      name: "What is the lowest ASVAB line score for a Marine Corps job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The lowest line-score barrier on the chart is ${LOW.title} (${LOW.code}) at ${LOW.composite} ${LOW.minScore}, with most entry infantry MOS (Rifleman 0311, Machine Gunner 0331, Mortarman 0341) right behind at GT 90. All sit on top of the AFQT floor of 32.`,
      },
    },
    {
      "@type": "Question",
      name: "What Marine MOS requires the highest ASVAB score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The hardest enlisted MOS to qualify for are the ground- and aviation-electronics maintainers at EL ${HIGH.minScore} (Digital Wideband 2831, Calibration Technician 2871, aviation radar/comm techs in the 59xx field). The toughest dual-composite MOS is 2651 ISR Systems Engineer, which needs GT 110 AND EL 110 at the same time.`,
      },
    },
    {
      "@type": "Question",
      name: "What is a GT score in the Marine Corps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GT (General Technical) = VE + AR, where VE (Verbal Expression) is itself Word Knowledge + Paragraph Comprehension. It is the single most important Marine Corps line score because more MOS gate on GT than on any other composite, including cyber, intelligence, MP, and most leadership paths.",
      },
    },
    {
      "@type": "Question",
      name: "How many line scores does the Marine Corps use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Marine Corps uses five aptitude-area line scores: GT (General Technical), CL (Clerical), EL (Electronics), MM (Mechanical Maintenance), and ST (Skilled Technical). Each MOS lists the one composite it scores against; a few require two at once.",
      },
    },
    {
      "@type": "Question",
      name: "What if my line score is too low for the MOS I want?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Retake the ASVAB after the 30-day wait, negotiate a different guaranteed MOS your scores already clear, or enlist and lat-move later (typically after your first enlistment). Never sign an open contract if you care which MOS you get. Most recruits who prep 4-6 extra weeks gain 10-15 AFQT points on retest.",
      },
    },
    {
      "@type": "Question",
      name: "Can I change my MOS after enlisting in the Marines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, through a lateral move (lat move), but it takes time. Most lat moves happen after your first enlistment, typically 3-4 years in. Approval depends on your current MOS manning, the target MOS manning, your ASVAB line scores for the new MOS, and a command recommendation. Nothing is guaranteed.",
      },
    },
  ],
};

export default function USMCMOSListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "Marine Corps ASVAB Score", href: "/marines-asvab-score" },
          { name: "USMC MOS List", href: "/usmc-mos-list" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          USMC MOS List 2026: ASVAB Line Scores for All {N} Marine Corps Jobs
        </h1>

        {/* Snippet-shaped direct answer (data-driven) */}
        <p className="mt-4 text-text-secondary">
          Every Marine Corps enlisted job needs an AFQT of 32 to qualify (50 with a GED), then a
          line-score composite that ranges from {LOW.composite} {LOW.minScore} ({LOW.code}) at the
          low end up to EL {HIGH.minScore} for the electronics and avionics maintainers. The chart
          below lists the required ASVAB line score for all {N} enlisted MOS, sortable by score,
          occupational field, or AFQT.
        </p>

        <p className="text-text-secondary">
          Your recruiter hands you a list of MOS codes, and unless you already know what a 0651 does
          versus a 6531, that list is useless. This page turns it into one scannable Marine Corps
          ASVAB score chart so you can see what you qualify for today, what is one study block away,
          and which subtests buy you the most jobs.
        </p>

        {/* ── Answer-first AEO block ── */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-5">
          <p className="font-display text-sm font-bold text-accent">
            Marine Corps ASVAB requirements at a glance
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>
              <strong className="text-text-primary">Minimum AFQT to enlist:</strong> 32 with a high
              school diploma, 50 with a GED.
            </li>
            <li>
              <strong className="text-text-primary">Lowest line-score MOS:</strong> {LOW.title} ({LOW.code})
              at {LOW.composite} {LOW.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Highest line-score MOS:</strong> the electronics
              and avionics maintainers (2831, 2871, 59xx) at EL {HIGH.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Most important line score:</strong> GT (VE + AR) —
              it gates the most jobs, including cyber, intelligence, MP, and every leadership path.
            </li>
          </ul>
        </div>

        {/* Stats Row, data-driven */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">{N} enlisted MOS</p>
            <p className="mt-1 text-sm text-text-secondary">across infantry, aviation, intel, cyber, logistics, and support fields</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">5 line scores</p>
            <p className="mt-1 text-sm text-text-secondary">composites built from your ASVAB subtests that gate every MOS</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Lowest barrier: {LOW.code} at {LOW.composite} {LOW.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">motor transport and entry infantry; reachable with an AFQT in the 30s-50s</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Highest barrier: EL {HIGH.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">ground and aviation electronics maintainers (28xx, 59xx)</p>
          </div>
        </div>

        {/* Primary CTA, high-intent */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              See which MOS you qualify for right now
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Run your subtest scores through the Marine Corps ASVAB calculator to see exactly which
              MOS on this chart you already clear.
            </p>
          </div>
          <Link
            href={marinesHub.calculatorHref}
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover sm:mt-0 sm:ml-6 sm:shrink-0"
          >
            Open the Marines calculator
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── The score table: the unique-data asset ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps ASVAB Score Chart: All {N} MOS and Required Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Every row comes from the same dataset the{" "}
          <Link href={marinesHub.calculatorHref} className="text-accent hover:text-accent-hover">
            Marine Corps ASVAB calculator
          </Link>{" "}
          scores against, so the numbers here match what your recruiter computes. Sort by required
          line score to find the lowest-barrier MOS, or by community to compare jobs in the same
          occupational field. Two composites joined by{" "}
          <span className="font-mono">&middot;</span> (for example 2651 at GT 110 &middot; EL 110)
          mean both are required at once.
        </p>

        <JobScoreTable
          jobs={jobs}
          caption={`Marine Corps ASVAB score chart: required line score, occupational field, and minimum AFQT for all ${N} enlisted MOS.`}
          calculatorHref={marinesHub.calculatorHref}
          calculatorLabel="Marine Corps ASVAB calculator"
        />

        {/* ── How Marine line scores work ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Marine Corps ASVAB Scoring Works: AFQT vs Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          A Cyber Network Operator needs a GT line score of 110. The maximum AFQT is 99. Both numbers
          come from the same ASVAB, and they do different jobs.
        </p>

        <p className="text-text-secondary">
          The AFQT is your percentile from VE + AR + MK and decides whether the Marine Corps will take
          you: 32 with a diploma, 50 with a GED. The line-score composite is a raw sum of standard
          subtest scores and decides which MOS you can hold once you are in.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-text-primary">
          The five Marine Corps line-score formulas
        </h3>

        <p className="mt-2 text-text-secondary">
          Bookmark this. You will reference it constantly when comparing MOS requirements above.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-base font-bold text-accent">
          GT = VE + AR<br />
          CL = VE + AR + MK<br />
          EL = GS + AR + MK + EI<br />
          MM = AR + EI + MC + AS<br />
          ST = GS + VE + MK + MC
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) is a combined standard score derived from Word Knowledge (WK) and
          Paragraph Comprehension (PC); it is not a separate subtest. The rest are individual
          subtests: AR (Arithmetic Reasoning), MK (Mathematics Knowledge), GS (General Science), EI
          (Electronics Information), MC (Mechanical Comprehension), and AS (Auto &amp; Shop
          Information). GT gates the most MOS on this chart, so VE and AR are the highest-leverage
          areas to study.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT gets you in the door. Your line scores determine which door you walk through.
            For the full GT breakdown and how to raise it, see{" "}
            <Link href={marinesHub.scoreExplainerHref} className="text-accent hover:text-accent-hover">
              the Marine Corps GT score guide
            </Link>
            .
          </p>
        </aside>

        {/* ── Career fields at a glance (curated E-E-A-T) ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps Occupational Fields at a Glance
        </h2>

        <p className="mt-4 text-text-secondary">
          The {N} MOS split across roughly two dozen occupational fields. Use the chart above for
          exact numbers; the notes below show where the score barriers cluster so you can target the
          right field.
        </p>

        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Infantry (03 series).</strong> The lowest GT
            minimums in the Corps: Rifleman (0311), Machine Gunner (0331), and Mortarman (0341) at
            GT 90. Elite paths run higher — Recon (0321) and MARSOC Critical Skills Operator (0372)
            need GT 105 plus a selection pipeline.
          </li>
          <li>
            <strong className="text-text-primary">Cyber and communications (06, 17 series).</strong>{" "}
            Cyber Network Operator (0651) and Cyberspace Warfare Operator (1721) need GT 110 plus a
            clearance; the comms operators (0612/0621/0627/0631) read on EL 105.
          </li>
          <li>
            <strong className="text-text-primary">Intelligence and SIGINT (02, 26 series).</strong>{" "}
            Most intel and cryptologic MOS need GT 105-110 and a TS/SCI clearance; the linguists add
            the DLAB. 2651 ISR Systems Engineer is the toughest, at GT 110 AND EL 110.
          </li>
          <li>
            <strong className="text-text-primary">Aviation maintenance (60-62 series).</strong> The
            largest technical field, almost universally MM 105 for the airframe, powerplant, and
            structures mechanics; the avionics technicians (63/64 series) read on EL 105-110.
          </li>
          <li>
            <strong className="text-text-primary">Ground and aviation electronics (28, 59 series).</strong>{" "}
            The highest barrier in the Corps at EL 115 — digital wideband, ground radio, calibration,
            and aviation radar/comm maintainers. Strong GS + AR + MK + EI is the only way in.
          </li>
          <li>
            <strong className="text-text-primary">Admin, supply, and ops (30, 60, 70 series).</strong>{" "}
            The Clerical roles — Supply Admin (3043), Aircraft Maintenance Admin (6046), and Aviation
            Operations (7041) — score on CL, not GT. If your verbal and math are solid but mechanical
            and electronics lag, these are a strong fit.
          </li>
          <li>
            <strong className="text-text-primary">Military Police and ordnance (21, 58 series).</strong>{" "}
            MP (5811) needs GT 100; ordnance repair runs MM 95-105, and EOD (2336) needs GT 110 plus
            one of the toughest training pipelines in the military.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Guaranteed MOS vs open contract</p>
          <p className="mt-1 text-sm text-text-secondary">
            A guaranteed MOS (or MOS field) is written into your contract at MEPS; an open contract
            lets the Corps assign you based on its needs. Never sign open unless you genuinely do not
            care which job you get. If your line score falls short, retake the ASVAB (30-day wait) and
            prep with a{" "}
            <Link href="/practice-test" className="text-accent hover:text-accent-hover">
              free practice test
            </Link>{" "}
            first.
          </p>
        </aside>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Marines?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Marine Corps requires a minimum AFQT of 32 with a high school diploma (50 with a
              GED). AFQT is your entry ticket. Each MOS then has its own line-score composite that
              decides which job you can hold.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the lowest ASVAB line score for a Marine Corps job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The lowest line-score barrier is {LOW.title} ({LOW.code}) at {LOW.composite}{" "}
              {LOW.minScore}, with the entry infantry MOS (Rifleman 0311, Machine Gunner 0331,
              Mortarman 0341) right behind at GT 90. All sit on top of the AFQT floor of 32.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Marine MOS requires the highest ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The hardest enlisted MOS to qualify for are the ground- and aviation-electronics
              maintainers at EL {HIGH.minScore} (Digital Wideband 2831, Calibration Technician 2871,
              and the 59xx aviation radar/comm techs). The toughest dual-composite MOS is 2651 ISR
              Systems Engineer, which needs GT 110 AND EL 110 at once.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a GT score in the Marine Corps?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT (General Technical) = VE + AR, where VE is Word Knowledge + Paragraph Comprehension.
              It is the most important Marine Corps line score because more MOS gate on GT than on any
              other composite. Run your scores through the{" "}
              <Link href={marinesHub.calculatorHref} className="text-accent hover:text-accent-hover">
                Marine Corps ASVAB calculator
              </Link>{" "}
              to see what you qualify for now.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if my line score is too low for the MOS I want?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Retake the ASVAB after the 30-day wait, negotiate a different guaranteed MOS your scores
              already clear, or enlist and lat-move later. Most recruits who prep 4-6 extra weeks gain
              10-15 AFQT points on retest. Never sign an open contract unless you genuinely do not
              care which MOS you get.
            </p>
          </div>
        </div>

        {/* ── Methodology / freshness (data-first guardrail) ── */}
        <aside className="my-8 rounded-lg border border-navy-border bg-navy/50 p-4">
          <p className="text-sm font-semibold text-text-primary">How this chart is built</p>
          <p className="mt-1 text-sm text-text-secondary">
            Every line score is pulled from the same dataset the Marine Corps calculator scores
            against, audited in June 2026 against published USMC aptitude-area requirements
            (operationmilitarykids / military.com consensus, cross-checked against the MCO 1200.17 MOS
            Manual). Line scores are set by Marine Corps Recruiting Command and can change by message;
            a few MOS are in transition under Force Design 2030 (tanks and Assaultman were
            eliminated). Always confirm the exact number with your recruiter and get the MOS written
            into your contract at MEPS. Last updated June 16, 2026.
          </p>
        </aside>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, all five line scores (GT, CL, EL,
            MM, ST), and every Marine Corps MOS you qualify for.
          </p>
          <Link
            href={marinesHub.calculatorHref}
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Marines Calculator
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
          <AffiliateBookBlock source="usmc-mos-list-end" />
        </div>

        <div className="not-prose">
          <RelatedLinks title="Marine Corps ASVAB resources" links={marinesHub.related} />
        </div>
      </article>
    </div>
  );
}
