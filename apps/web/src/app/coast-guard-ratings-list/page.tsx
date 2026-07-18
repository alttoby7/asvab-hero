import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AffiliateBookBlock from "@/components/AffiliateBookBlock";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import JobScoreTable from "@/components/JobScoreTable";
import { coastGuardHub, hubScoreStats } from "@/lib/job-hubs";

// Single source of truth: every score figure on this page is derived from
// coast-guard-jobs.json (the same data the Coast Guard calculator uses), never
// hardcoded. Dataset audited June 2026 against GO Coast Guard / military.com /
// operationmilitarykids / Mometrix / GAO-25-107224; the Machinery Technician (MK)
// alternative-path fix (AND -> OR) was applied alongside this page.
const jobs = coastGuardHub.jobs;
const stats = hubScoreStats(jobs);
const N = stats.count; // 22 ratings
const LOW = stats.lowest!; // ME, VE+AR 100
const HIGH = stats.highest!; // AMT, AR+MC+AS+EI 213

export const metadata: Metadata = {
  title: `Coast Guard Ratings List 2026: ASVAB Score Chart for All ${N} Ratings`,
  description: `Coast Guard ASVAB score chart with the required subtest-sum score for all ${N} enlisted ratings. Sortable table from ${LOW.title} (${LOW.composite} ${LOW.minScore}) up to ${HIGH.code} (${HIGH.composite} ${HIGH.minScore}), plus the AFQT floor and how CG scoring differs from named-composite branches.`,
  alternates: {
    canonical: "https://asvabhero.com/coast-guard-ratings-list",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Coast Guard Ratings List 2026: ASVAB Score Chart for All ${N} Ratings`,
  description: `Coast Guard ASVAB score chart with the required subtest-sum score for all ${N} enlisted ratings, the AFQT minimum, and how CG scoring works.`,
  url: "https://asvabhero.com/coast-guard-ratings-list",
  author: {
    "@type": "Organization",
    "@id": "https://asvabhero.com/#organization",
    name: "ASVAB Hero",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum ASVAB score for the Coast Guard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Coast Guard requires a minimum AFQT of 32 with a high school diploma (50 with a GED), the lowest floor of any branch since it dropped from 40 in November 2023. Clearing the floor only gets you in the door: each of the 22 enlisted ratings then has its own subtest-sum requirement that decides which job you can hold.",
      },
    },
    {
      "@type": "Question",
      name: "How is Coast Guard ASVAB scoring different from the Army or Marines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Coast Guard, like the Navy, doesn't use named composites such as GT or CL. Instead, each rating lists a straight sum of specific subtest standard scores (for example VE+AR >= 101 for Boatswain's Mate). There's no formula to memorize beyond adding up the listed subtests.",
      },
    },
    {
      "@type": "Question",
      name: "What is the lowest ASVAB score rating in the Coast Guard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The lowest-barrier rating on the chart is ${LOW.title} (${LOW.code}) at ${LOW.composite} ${LOW.minScore}, with several administrative and deck ratings clustered close behind at VE+AR 106. All sit on top of the AFQT floor of 32.`,
      },
    },
    {
      "@type": "Question",
      name: "What Coast Guard rating requires the highest ASVAB score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Aviation Maintenance Technician (AMT) needs the highest subtest sum at AR+MC+AS+EI ${HIGH.minScore} (plus AR >= 52). Aviation Survival Technician, the rescue swimmer rating, is the most selective overall at VE+MC+AS 162 combined with an AFQT of at least 65.`,
      },
    },
    {
      "@type": "Question",
      name: "Why does Machinery Technician (MK) show two different score paths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MK is one of the few Coast Guard ratings with an alternative qualifying path: you can qualify with either AR+MC+AS 150+ or VE+AR 106+. You only need to clear one path, not both, which is why the chart lists it as an \"or.\"",
      },
    },
    {
      "@type": "Question",
      name: "What ASVAB score do Coast Guard officer programs require?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every Coast Guard officer commissioning path (OCS, SRDC, PPEP, and CSPI) requires a GT score of 109 or higher, using the Army-style GT = VE+AR formula. That's a higher bar than most other branches' officer floors, reflecting how selective the Coast Guard is even for commissioning.",
      },
    },
  ],
};

export default function CoastGuardRatingsListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "Coast Guard ASVAB Score", href: "/coast-guard-asvab-score" },
          { name: "Coast Guard Ratings List", href: "/coast-guard-ratings-list" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Coast Guard Ratings List 2026: ASVAB Score Chart for All {N} Ratings
        </h1>

        {/* Snippet-shaped direct answer (data-driven) */}
        <p className="mt-4 text-text-secondary">
          Every Coast Guard enlisted rating needs an AFQT of 32 to qualify (50 with a GED), then a
          subtest-sum score that ranges from {LOW.composite} {LOW.minScore} ({LOW.code}) at the low
          end up to {HIGH.composite} {HIGH.minScore} for Aviation Maintenance Technician. The chart
          below lists the required score for all {N} enlisted ratings, the smallest job list of any
          branch, sortable by score, community, or AFQT.
        </p>

        <p className="text-text-secondary">
          The Coast Guard is the most selective branch by enlistment volume: about 5,200 accessions a
          year across the entire service. It also scores differently than the Army or Marine Corps.
          There is no GT, no CL, no named composite. Instead, every rating lists a straight sum of
          specific subtest standard scores, and you either clear the number or you don&apos;t. This
          page turns that list into one scannable Coast Guard ASVAB score chart.
        </p>

        {/* ── Answer-first AEO block ── */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-5">
          <p className="font-display text-sm font-bold text-accent">
            Coast Guard ASVAB requirements at a glance
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>
              <strong className="text-text-primary">Minimum AFQT to enlist:</strong> 32 with a high
              school diploma, 50 with a GED (lowered from 40 in November 2023).
            </li>
            <li>
              <strong className="text-text-primary">Lowest-score rating:</strong> {LOW.title} ({LOW.code})
              at {LOW.composite} {LOW.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Highest-score rating:</strong> Aviation Maintenance
              Technician (AMT) at {HIGH.composite} {HIGH.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Scoring system:</strong> subtest-sum totals, not
              named composites &mdash; add up the listed subtests, no formula conversion.
            </li>
          </ul>
        </div>

        {/* Stats Row, data-driven */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">{N} enlisted ratings</p>
            <p className="mt-1 text-sm text-text-secondary">the fewest of any branch, across engineering, aviation, operations, and administrative fields</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Subtest-sum scoring</p>
            <p className="mt-1 text-sm text-text-secondary">no named composites like GT or CL, just a straight sum of listed subtests</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Lowest barrier: {LOW.code} at {LOW.composite} {LOW.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">Maritime Enforcement Specialist; law enforcement and port security</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Highest barrier: {HIGH.composite} {HIGH.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">Aviation Maintenance Technician (AMT), plus an AR sub-floor of 52</p>
          </div>
        </div>

        {/* Primary CTA, high-intent */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              See which ratings you qualify for right now
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Run your subtest scores through the Coast Guard ASVAB calculator to see exactly which
              rating on this chart you already clear.
            </p>
          </div>
          <Link
            href={coastGuardHub.calculatorHref}
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover sm:mt-0 sm:ml-6 sm:shrink-0"
          >
            Open the Coast Guard calculator
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── The score table: the unique-data asset ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Coast Guard ASVAB Score Chart: All {N} Ratings and Required Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Every row comes from the same dataset the{" "}
          <Link href={coastGuardHub.calculatorHref} className="text-accent hover:text-accent-hover">
            Coast Guard ASVAB calculator
          </Link>{" "}
          scores against. Sort by required score to find the lowest-barrier rating, or by community
          to compare jobs in the same career field. Two subtest sums joined by{" "}
          <span className="font-mono">or</span> (Machinery Technician, MK) mean you only need to clear
          one of the two paths, not both.
        </p>

        <JobScoreTable
          jobs={jobs}
          caption={`Coast Guard ASVAB score chart: required subtest-sum score, community, and minimum AFQT for all ${N} enlisted ratings.`}
          calculatorHref={coastGuardHub.calculatorHref}
          calculatorLabel="Coast Guard ASVAB calculator"
        />

        {/* ── How Coast Guard scoring works ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Coast Guard ASVAB Scoring Works: Sums, Not Composites
        </h2>

        <p className="mt-4 text-text-secondary">
          Information Systems Technician needs a subtest sum of 171. There is no &ldquo;IT
          score&rdquo; formula printed anywhere, no named composite to look up. You add three
          subtest standard scores together and compare the total to 171.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-base font-bold text-accent">
          IT (Information Systems Technician) = MK + EI + GS &ge; 171
        </div>

        <p className="text-text-secondary">
          This is the same system the Navy uses, and it is genuinely simpler than the Army or Marine
          Corps line scores: there is no VE, GT, or EL to translate first. You only need to know which
          of the 9 subtests feed a given rating, then add up your standard scores. The one exception is
          the officer-program GT score, which borrows the Army&apos;s exact formula.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-base font-bold text-accent">
          GT (officer programs only) = VE + AR
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) is a combined standard score from Word Knowledge + Paragraph
          Comprehension; it is not a separate subtest. AR (Arithmetic Reasoning) and VE appear in more
          rating formulas here than any other subtest, so they are the highest-leverage areas to study
          if you are targeting a specific Coast Guard rating.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Some ratings add a sub-floor on top of the sum (for example AMT requires AR&nbsp;&ge;&nbsp;52
            in addition to the combined 213). Clearing the sum alone is not always enough. For the full
            breakdown of the AFQT floor and how it compares to other branches, see{" "}
            <Link href={coastGuardHub.scoreExplainerHref} className="text-accent hover:text-accent-hover">
              the Coast Guard ASVAB score guide
            </Link>
            .
          </p>
        </aside>

        {/* ── Career fields at a glance (curated E-E-A-T) ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Coast Guard Career Fields at a Glance
        </h2>

        <p className="mt-4 text-text-secondary">
          The {N} ratings split across roughly half a dozen career fields. Use the chart above for
          exact numbers; the notes below show where the score barriers cluster.
        </p>

        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Deck and operations.</strong> Boatswain&apos;s Mate
            (BM), Operations Specialist (OS), and Gunner&apos;s Mate (GM) run VE+AR 101-106, with GM
            higher at AR+MK+EI+GS 208 for its ordnance and weapons systems work.
          </li>
          <li>
            <strong className="text-text-primary">Engineering.</strong> Machinery Technician (MK, the
            OR-path rating), Electronics Technician (ET), Electrician&apos;s Mate (EM), and Information
            Systems Technician (IT) cluster around 150-171 on mechanical or electronics-heavy sums, most
            with an AR sub-floor of 52.
          </li>
          <li>
            <strong className="text-text-primary">Aviation.</strong> The highest barriers in the Corps:
            Aviation Maintenance Technician (AMT) at AR+MC+AS+EI 213, and Aviation Survival Technician
            (AST), the rescue swimmer rating, at VE+MC+AS 162 plus an AFQT of 65. Aviation Electrical
            Technician (AET) sits at 171; the older AVI rating was redesignated as AET.
          </li>
          <li>
            <strong className="text-text-primary">Maritime law enforcement.</strong> Maritime
            Enforcement Specialist (ME) and Port Security Specialist (PS) are the lowest-barrier ratings
            on the chart at VE+AR 100-101.
          </li>
          <li>
            <strong className="text-text-primary">Administrative and medical.</strong> Storekeeper (SK),
            Yeoman (YN), Culinary Specialist (CS), and Public Affairs Specialist (PA) score on VE+AR;
            Health Services Technician (HS), the CG&apos;s primary medical rating, uses VE+MK+GS 154.
          </li>
          <li>
            <strong className="text-text-primary">Intelligence and investigations.</strong> Intelligence
            Specialist (IS) lists VE+AR 100. Investigator (IV), a lateral-select role within the Coast
            Guard Investigative Service, has no published ASVAB minimum since it is filled from within
            the service, not directly at accession.
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Guaranteed rating vs undesignated (non-rate)</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your scores don&apos;t clear an A-school rating you want, or the rating has no open
            seats, you enlist as an undesignated non-rate (Seaman, Fireman, or Airman) and strike for a
            rating later once you&apos;re in. Prep with a{" "}
            <Link href="/practice-test" className="text-accent hover:text-accent-hover">
              free practice test
            </Link>{" "}
            first if your scores are close to a threshold above.
          </p>
        </aside>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Coast Guard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Coast Guard requires a minimum AFQT of 32 with a high school diploma (50 with a GED),
              the lowest floor of any branch since it dropped from 40 in November 2023. Each of the 22
              enlisted ratings then has its own subtest-sum requirement that decides which job you can
              hold.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is Coast Guard ASVAB scoring different from the Army or Marines?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Coast Guard, like the Navy, doesn&apos;t use named composites such as GT or CL.
              Instead, each rating lists a straight sum of specific subtest standard scores. There is
              no formula to memorize beyond adding up the listed subtests.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the lowest ASVAB score rating in the Coast Guard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The lowest-barrier rating is {LOW.title} ({LOW.code}) at {LOW.composite} {LOW.minScore},
              with several administrative and deck ratings clustered close behind at VE+AR 106. All sit
              on top of the AFQT floor of 32.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why does Machinery Technician (MK) show two different score paths?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              MK is one of the few Coast Guard ratings with an alternative qualifying path: AR+MC+AS
              150+ or VE+AR 106+. You only need to clear one path, which is why the chart lists it as
              an &ldquo;or.&rdquo; Run your scores through the{" "}
              <Link href={coastGuardHub.calculatorHref} className="text-accent hover:text-accent-hover">
                Coast Guard ASVAB calculator
              </Link>{" "}
              to see which path (if either) you clear.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if my score is too low for the rating I want?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Retake the ASVAB after the standard wait period, enlist as an undesignated non-rate and
              strike for the rating later, or negotiate a different rating your scores already clear.
              Most recruits who prep 4-6 extra weeks gain 5-15 AFQT points on retest.
            </p>
          </div>
        </div>

        {/* ── Methodology / freshness (data-first guardrail) ── */}
        <aside className="my-8 rounded-lg border border-navy-border bg-navy/50 p-4">
          <p className="text-sm font-semibold text-text-primary">How this chart is built</p>
          <p className="mt-1 text-sm text-text-secondary">
            Every score is pulled from the same dataset the Coast Guard calculator scores against,
            audited in June 2026 against GO Coast Guard, military.com, operationmilitarykids, Mometrix,
            and GAO-25-107224. Two ratings (Investigator and Intelligence Specialist) have thresholds
            that are unconfirmed or not centrally published because they are lateral-select or
            competitive-assignment roles rather than direct-accession A-schools; treat those as
            directional, not guaranteed. Ratings and thresholds are set by Coast Guard Recruiting
            Command and can change by message. Always confirm the exact number with your recruiter and
            get the rating written into your contract at MEPS. Last updated July 17, 2026.
          </p>
        </aside>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT and every Coast Guard rating you
            qualify for.
          </p>
          <Link
            href={coastGuardHub.calculatorHref}
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Coast Guard Calculator
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
          <AffiliateBookBlock source="coast-guard-ratings-list-end" />
        </div>

        <div className="not-prose">
          <RelatedLinks title="Coast Guard ASVAB resources" links={coastGuardHub.related} />
        </div>
      </article>
    </div>
  );
}
