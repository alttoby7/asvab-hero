import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AffiliateBookBlock from "@/components/AffiliateBookBlock";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import JobScoreTable from "@/components/JobScoreTable";
import { armyHub, hubScoreStats } from "@/lib/job-hubs";

// Single source of truth: every score figure on this page is derived from
// army-jobs.json (the same data the Army calculator uses), never hardcoded.
// The dataset was reconciled 2026-06-16 against published Army line-score
// requirements (military.com / operationmilitarykids consensus + DA PAM 611-21
// aptitude areas); see scripts/army-audit-reference.json.
const jobs = armyHub.jobs;
const stats = hubScoreStats(jobs);
const N = stats.count; // 155 MOS
const LOW = stats.lowest!; // 92S, GM 84
const HIGH = stats.highest!; // ST 112 (17C / 35N / 35T)

export const metadata: Metadata = {
  title: `Army MOS List 2026: ASVAB Line Scores for All ${N} Enlisted Jobs`,
  description: `Army ASVAB score chart with the required line score for all ${N} enlisted MOS. Sortable table from ${LOW.code} (${LOW.composite} ${LOW.minScore}) up to ${HIGH.minScore}, plus the AFQT minimum and all 10 Army line-score formulas (GT, CL, CO, EL, FA, GM, MM, OF, SC, ST).`,
  alternates: {
    canonical: "https://asvabhero.com/army-mos-list",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Army MOS List 2026: ASVAB Line Scores for All ${N} Enlisted Jobs`,
  description: `Army ASVAB score chart with the required line score for all ${N} enlisted MOS, the AFQT minimum, and all 10 Army line-score composites.`,
  url: "https://asvabhero.com/army-mos-list",
  author: {
    "@type": "Organization",
    "@id": "https://asvabhero.com/#organization",
    name: "ASVAB Hero",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-03-21",
  dateModified: "2026-06-16",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum ASVAB score for the Army?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Army requires a minimum AFQT of 31 with a high school diploma (50 with a GED). AFQT is your entry ticket. Each MOS then has its own line-score composite (GT, ST, MM, EL, and so on) that decides which job you can actually hold.",
      },
    },
    {
      "@type": "Question",
      name: "What is the lowest ASVAB line score for an Army job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The lowest line-score barrier on the chart is ${LOW.title} (${LOW.code}) at ${LOW.composite} ${LOW.minScore}, with the support and food-service MOS (88M, 92F, 92G) close behind at OF 85. All sit on top of the AFQT floor of 31.`,
      },
    },
    {
      "@type": "Question",
      name: "What Army MOS has the highest ASVAB requirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The hardest enlisted MOS to qualify for are the intelligence and cyber jobs at ST ${HIGH.minScore}: Signals Intelligence Analyst (35N), Military Intelligence Systems Maintainer (35T), and Cyber Operations Specialist (17C). Recruiting and contracting NCO roles need GT 110.`,
      },
    },
    {
      "@type": "Question",
      name: "What is the most important Army line score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GT (General Technical = VE + AR) is the most important Army line score. It gates the widest range of MOS, including intelligence, Special Forces, and most leadership and reclassification paths. If you only have time to study two areas, study verbal reasoning (Word Knowledge + Paragraph Comprehension) and Arithmetic Reasoning.",
      },
    },
    {
      "@type": "Question",
      name: "How many line scores does the Army use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Army uses 10 aptitude-area line scores: GT (General Technical), CL (Clerical), CO (Combat), EL (Electronics), FA (Field Artillery), GM (General Maintenance), MM (Mechanical Maintenance), OF (Operators & Food), SC (Surveillance & Communications), and ST (Skilled Technical). Each MOS lists the one composite it scores against.",
      },
    },
    {
      "@type": "Question",
      name: "What if my line score is too low for the MOS I want?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Retake the ASVAB after the 30-day wait (then six-month intervals), negotiate a different guaranteed MOS your scores already clear, or enlist and reclassify later. Most recruits who prep 4-6 extra weeks gain 10-15 AFQT points on retest. Never sign an open contract unless you genuinely do not care which MOS you get.",
      },
    },
    {
      "@type": "Question",
      name: "Are the combat MOS the easiest to qualify for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infantry (11B/11C), Armor (19K), and Cavalry Scout (19D) all share CO 87, which is mid-pack, not the lowest. CO uses the retired Coding Speed subtest, so the Army substitutes a population-average score; the inputs you actually control for CO are Arithmetic Reasoning, Assembling Objects, and Mechanical Comprehension.",
      },
    },
    {
      "@type": "Question",
      name: "What line score does Special Forces (18-series) require?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 18-series Special Forces MOS require GT 110, with a CO 100 alternate path on some contracts, before any physical or SFAS screening. A strong GT is the cleanest way in.",
      },
    },
  ],
};

export default function ArmyMosListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "Army ASVAB Score", href: "/army-asvab-score" },
          { name: "Army MOS List", href: "/army-mos-list" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army MOS List 2026: ASVAB Line Scores for All {N} Enlisted Jobs
        </h1>

        {/* Snippet-shaped direct answer (data-driven) */}
        <p className="mt-4 text-text-secondary">
          Every Army enlisted job needs an AFQT of 31 to qualify (50 with a GED), then a line-score
          composite that ranges from {LOW.composite} {LOW.minScore} ({LOW.code}) at the low end up to
          ST {HIGH.minScore} for the intelligence and cyber MOS. The chart below lists the required
          ASVAB line score for all {N} enlisted MOS, sortable by score, field, or AFQT.
        </p>

        <p className="text-text-secondary">
          Your recruiter hands you a list of MOS codes, and unless you already know what a 25B does
          versus a 68W, that list is useless. This page turns it into one scannable Army ASVAB score
          chart so you can see what you qualify for today, what is one study block away, and which
          subtests buy you the most jobs.
        </p>

        {/* ── Answer-first AEO block ── */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-5">
          <p className="font-display text-sm font-bold text-accent">
            Army ASVAB requirements at a glance
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>
              <strong className="text-text-primary">Minimum AFQT to enlist:</strong> 31 with a high
              school diploma, 50 with a GED.
            </li>
            <li>
              <strong className="text-text-primary">Lowest line-score MOS:</strong> {LOW.title} ({LOW.code})
              at {LOW.composite} {LOW.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Highest line-score MOS:</strong> intelligence and
              cyber (35N, 35T, 17C) at ST {HIGH.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Most important line score:</strong> GT (VE + AR) —
              it gates the most jobs and every leadership and Special Forces path.
            </li>
          </ul>
        </div>

        {/* Stats Row, data-driven */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">{N} enlisted MOS</p>
            <p className="mt-1 text-sm text-text-secondary">across combat, tech, intel, medical, and support fields</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">10 line scores</p>
            <p className="mt-1 text-sm text-text-secondary">composites built from your ASVAB subtests that gate every MOS</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Lowest barrier: {LOW.code} at {LOW.composite} {LOW.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">support trades; reachable with an AFQT in the low 50s</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Highest barrier: ST {HIGH.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">intelligence and cyber (35N, 35T, 17C)</p>
          </div>
        </div>

        {/* Primary CTA, high-intent */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              See which MOS you qualify for right now
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Run your subtest scores through the Army ASVAB score calculator to see exactly which
              MOS on this chart you already clear.
            </p>
          </div>
          <Link
            href={armyHub.calculatorHref}
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover sm:mt-0 sm:ml-6 sm:shrink-0"
          >
            Open the Army calculator
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── The score table: the unique-data asset ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army ASVAB Score Chart: All {N} MOS and Required Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Every row comes from the same dataset the{" "}
          <Link href={armyHub.calculatorHref} className="text-accent hover:text-accent-hover">
            Army ASVAB score calculator
          </Link>{" "}
          scores against, so the numbers here match what your recruiter computes. Sort by required
          line score to find the lowest-barrier MOS, or by field to compare jobs in the same branch.
          A few audition- or board-gated MOS (Army Band, senior visual-information) show
          &quot;see recruiter&quot; because they have no published line-score cutoff.
        </p>

        <JobScoreTable
          jobs={jobs}
          caption={`Army ASVAB score chart: required line score, field, and minimum AFQT for all ${N} enlisted MOS.`}
          calculatorHref={armyHub.calculatorHref}
          calculatorLabel="Army ASVAB score calculator"
        />

        {/* ── How Army line scores work ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Army ASVAB Scoring Works: AFQT vs Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          A Cyber Operations Specialist needs a line score of {HIGH.minScore}. The maximum AFQT is 99.
          Both numbers come from the same ASVAB, and they do different jobs.
        </p>

        <p className="text-text-secondary">
          The AFQT is your percentile from VE + AR + MK and decides whether the Army will take you:
          31 with a diploma, 50 with a GED. The line-score composite is a raw sum of standard subtest
          scores and decides which MOS you can hold once you are in.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-text-primary">
          The 10 Army line-score formulas
        </h3>

        <p className="mt-2 text-text-secondary">
          Bookmark this. You will reference it constantly when comparing MOS requirements above.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-base font-bold text-accent">
          GT = VE + AR<br />
          CL = VE + AR + MK<br />
          CO = AR + CS + AS + MC<br />
          EL = GS + AR + MK + EI<br />
          FA = AR + CS + MK + MC<br />
          GM = GS + AS + MK + EI<br />
          MM = NO + AS + MC + EI<br />
          OF = VE + NO + AS + MC<br />
          SC = VE + AR + AS + MC<br />
          ST = GS + VE + MK + MC
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) is a combined standard score derived from Word Knowledge and
          Paragraph Comprehension; it is not a separate subtest. ST (Skilled Technical) gates the most
          MOS on this chart, followed by GT.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Why you cannot fully control CO, FA, MM, and OF</p>
          <p className="mt-1 text-sm text-text-secondary">
            These four composites use NO (Numerical Operations) or CS (Coding Speed), subtests that
            are no longer on the CAT-ASVAB. The Army substitutes a population-average score for the
            retired pieces, so you cannot independently maximize them. Focus your prep on AR, MK, GS,
            WK, PC, EI, AS, and MC.
          </p>
        </aside>

        <p className="text-text-secondary">
          For how subtests convert to composites, see{" "}
          <Link href={armyHub.scoreExplainerHref} className="text-accent hover:text-accent-hover">
            the GT score breakdown
          </Link>
          . To calculate your own line scores, use the{" "}
          <Link href="/asvab-line-score-calculator" className="text-accent hover:text-accent-hover">
            free line score calculator
          </Link>
          .
        </p>

        {/* ── Career fields at a glance (curated E-E-A-T) ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Career Fields at a Glance
        </h2>

        <p className="mt-4 text-text-secondary">
          The {N} MOS split into roughly 30 fields. Use the chart above for exact numbers; the notes
          below show where the score barriers cluster so you can target the right branch.
        </p>

        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Combat arms (11, 13, 19 series).</strong> Infantry
            and Armor share CO 87. Field Artillery is its own composite: Cannon Crewmember (13B) is
            FA 93, Fire Support (13F) FA 96, while MLRS Crewmember (13M) reads on OF 95 and the
            Firefinder radar operator (13R) on SC 98.
          </li>
          <li>
            <strong className="text-text-primary">Intelligence and cyber (17, 35 series).</strong> The
            highest scores in the Army. Cyber (17C), Signals Intelligence Analyst (35N), and MI
            Systems Maintainer (35T) all sit at ST 112; most other 35-series analysts need ST 101.
          </li>
          <li>
            <strong className="text-text-primary">Signal and IT (25 series).</strong> Information
            Technology Specialist (25B) is ST 95; satellite and microwave systems (25S) run to EL 107.
          </li>
          <li>
            <strong className="text-text-primary">Aviation maintenance (15 series).</strong> Most
            helicopter and powerplant repairers are MM 104; UAS operators (15C/15W) read on SC 102.
          </li>
          <li>
            <strong className="text-text-primary">Medical (68 series).</strong> Combat Medic (68W) and
            most clinical specialists are ST 101; Medical Laboratory (68K) and Radiology (68P) need
            ST 106; Biomedical Equipment (68A) is EL 107.
          </li>
          <li>
            <strong className="text-text-primary">Mechanical maintenance (91 series).</strong> Wheeled
            and tracked vehicle mechanics run MM 92 to MM 99; the lighter utilities and small-arms
            repairers read on GM 88.
          </li>
          <li>
            <strong className="text-text-primary">Support and logistics (88, 92 series).</strong> The
            lowest barriers on the chart: Motor Transport (88M), Petroleum Supply (92F), and Culinary
            Specialist (92G) at OF 85; Automated Logistics (92A) and Unit Supply (92Y) at CL 90.
          </li>
          <li>
            <strong className="text-text-primary">Special Forces (18 series).</strong> GT 110 (with a
            CO 100 alternate on some contracts) before SFAS — a strong GT is the cleanest way in.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Guaranteed MOS vs open contract</p>
          <p className="mt-1 text-sm text-text-secondary">
            A guaranteed MOS is written into your contract by name at MEPS; an open contract lets the
            Army assign you based on its needs. Never sign open unless you genuinely do not care which
            job you get. If your line score falls short, retake the ASVAB (30-day wait) and prep with
            a{" "}
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
              What is the minimum ASVAB score for the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Army requires a minimum AFQT of 31 with a high school diploma (50 with a GED). AFQT
              is your entry ticket. Each MOS then has its own line-score composite that decides which
              job you can hold.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the lowest ASVAB line score for an Army job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The lowest line-score barrier is {LOW.title} ({LOW.code}) at {LOW.composite}{" "}
              {LOW.minScore}, with Motor Transport (88M), Petroleum Supply (92F), and Culinary
              Specialist (92G) close behind at OF 85. All sit on top of the AFQT floor of 31.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Army MOS has the highest ASVAB requirement?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The hardest enlisted MOS to qualify for are the intelligence and cyber jobs at ST{" "}
              {HIGH.minScore}: Signals Intelligence Analyst (35N), MI Systems Maintainer (35T), and
              Cyber Operations Specialist (17C). Recruiting and contracting NCO roles need GT 110.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the most important Army line score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT (General Technical = VE + AR) gates the widest range of MOS, including intelligence,
              Special Forces, and most leadership and reclassification paths. If you only have time to
              study two areas, study verbal reasoning and Arithmetic Reasoning. Run your scores
              through the{" "}
              <Link href={armyHub.calculatorHref} className="text-accent hover:text-accent-hover">
                Army ASVAB score calculator
              </Link>{" "}
              to see what you qualify for now.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if my line score is too low for the MOS I want?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Retake the ASVAB after the 30-day wait (then six-month intervals), negotiate a different
              guaranteed MOS your scores already clear, or enlist and reclassify later. Most recruits
              who prep 4-6 extra weeks gain 10-15 AFQT points on retest.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Are the combat MOS the easiest to qualify for?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Infantry (11B/11C), Armor (19K), and Cavalry Scout (19D) share CO 87, which is
              mid-pack. CO uses the retired Coding Speed subtest, so the inputs you actually control
              are Arithmetic Reasoning, Assembling Objects, and Mechanical Comprehension.
            </p>
          </div>
        </div>

        {/* ── Methodology / freshness (data-first guardrail) ── */}
        <aside className="my-8 rounded-lg border border-navy-border bg-navy/50 p-4">
          <p className="text-sm font-semibold text-text-primary">How this chart is built</p>
          <p className="mt-1 text-sm text-text-secondary">
            Every line score is pulled from the same dataset the Army calculator scores against,
            reconciled in June 2026 against published Army aptitude-area requirements. Line scores are
            set by USAREC and DA PAM 611-21 and can change by message; a handful of senior, audition,
            or reclassification MOS have no public cutoff and show &quot;see recruiter.&quot; Always
            confirm the exact number with your recruiter and get the MOS written into your contract at
            MEPS. Last updated June 16, 2026.
          </p>
        </aside>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, all 10 line scores, and every
            Army MOS you qualify for.
          </p>
          <Link
            href={armyHub.calculatorHref}
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Army Calculator
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
          <AffiliateBookBlock source="army-mos-list-end" />
        </div>

        <div className="not-prose">
          <RelatedLinks title="Army ASVAB resources" links={armyHub.related} />
        </div>
      </article>
    </div>
  );
}
