import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Can You Retake the ASVAB? 1/1/6 Rule, DEP Limits, C-Test (2026)",
  description:
    "Yes — you can retake the ASVAB. Wait 1 month for your first retest, 1 month for your second, then 6 months after that. Branch DEP rules, the Confirmation Test, and how to improve fast.",
  alternates: {
    canonical: "https://asvabhero.com/how-to-retake-the-asvab",
  },
};

export default function HowToRetakeTheASVABPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Can You Retake the ASVAB? 1/1/6 Rule, DEP Limits, C-Test (2026)",
          description:
            "Yes — you can retake the ASVAB. Wait 1 month for your first retest, 1 month for your second, then 6 months after that. Branch DEP rules, the Confirmation Test, and how to improve fast.",
          url: "https://asvabhero.com/how-to-retake-the-asvab",
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
          dateModified: "2026-04-19",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How many times can you retake the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "There is no lifetime limit. The first two retakes require a 1-month wait each. After that, every subsequent retake requires a 6-month wait. The only practical limit is the 2-year score validity window and the 6-month gaps that slow you to 2-3 attempts per year.",
              },
            },
            {
              "@type": "Question",
              name: "Does the military use your highest ASVAB score or most recent?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most recent. Your newest ASVAB score automatically replaces your previous score, even if it is lower. The military does not let you keep your highest score across multiple attempts. Only retake when you are confident you will improve.",
              },
            },
            {
              "@type": "Question",
              name: "Can you retake the ASVAB while in DEP?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on the branch. The Air Force and Space Force do not allow retakes once you have entered DEP. The Navy generally does not, except through the DEP Enrichment Program for applicants with AFQT scores of 26-30. The Army is the most flexible and generally allows retakes during DEP.",
              },
            },
            {
              "@type": "Question",
              name: "Can you use the PiCAT to retake the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The PiCAT is only available to first-time ASVAB takers. If you have already taken the ASVAB and want to retest, you must take the full ASVAB at a MEPS or MET site. Your recruiter will schedule this for you.",
              },
            },
            {
              "@type": "Question",
              name: "Do high school student ASVAB scores count for retest waiting periods?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Per the official ASVAB retest policy, the 1/1/6 wait rule is the same whether the initial test was a student ASVAB (taken through the Career Exploration Program in high school) or an enlistment ASVAB. If you took the student ASVAB on January 15, your first retest opens on February 15. The student ASVAB is also usable as an official enlistment score for up to 2 years.",
              },
            },
            {
              "@type": "Question",
              name: "How long are ASVAB scores valid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ASVAB scores are valid for 2 years from the test date. After 2 years, you will need to retake the test to enlist. If your scores are approaching expiration, talk to your recruiter about your timeline.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Can You Retake the ASVAB? 1/1/6 Rule, DEP Limits, C-Test (2026)
        </h1>

        <aside className="mt-6 rounded-lg border-l-4 border-accent bg-navy-lighter/60 p-5">
          <p className="text-sm font-semibold text-accent">The short answer</p>
          <p className="mt-2 text-text-primary">
            <strong>Yes, you can retake the ASVAB — there is no lifetime limit.</strong>{" "}
            The military uses the <strong>1/1/6 rule</strong>: wait 1 calendar
            month for your 1st retest, 1 month for your 2nd, then 6 months for
            every retest after that. The waiting period is the same whether
            your first test was a student ASVAB or enlistment ASVAB. A{" "}
            <strong>Confirmation Test (C-Test)</strong> is required if your
            AFQT jumps 20+ points within 6 months. DEP restrictions vary by
            branch (Air Force and Space Force block retests in DEP; Army is
            most flexible).
          </p>
          <p className="mt-3 text-sm text-text-tertiary">
            Source:{" "}
            <a
              href="https://www.officialasvab.com/recruiters/asvab-retest-policy/"
              className="underline hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              officialasvab.com retest policy
            </a>
            {" · "}Last verified: April 2026
          </p>
        </aside>

        <p className="mt-6 text-text-secondary">
          You got your ASVAB score back. It&apos;s not what you needed. Maybe
          you fell short of your branch&apos;s minimum, or your line scores
          locked you out of the job you actually want. The good news: you can
          retake it. Thousands of people do every year.
        </p>
        <p className="text-text-secondary">
          But <strong>how to retake the ASVAB</strong> isn&apos;t as simple as
          signing up again. There are mandatory waiting periods,
          branch-specific restrictions, and a confirmation test that catches
          people off guard. Mess up the timing and you&apos;ll wait six months
          instead of one. This guide walks you through all 8 steps, every rule
          current for 2026.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent ASVAB score is your official score, not your
            highest. Make sure you&apos;re ready before retesting.
          </p>
        </aside>

        <p className="text-text-secondary">
          Before you start, make sure you understand{" "}
          <Link
            href="/what-is-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            what the ASVAB actually measures
          </Link>{" "}
          and use our free{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB calculator
          </Link>{" "}
          to see where you stand right now.
        </p>

        {/* Step 1 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 1: Check Your Retake Eligibility and Waiting Period
        </h2>
        <p className="mt-4 text-text-secondary">
          The first thing you need to know is when you&apos;re allowed to test
          again. The answer depends on how many times you&apos;ve already taken
          it.
        </p>
        <p className="text-text-secondary">
          The military follows what&apos;s called the 1/1/6 rule. After your
          initial test, you wait 1 calendar month. After your first retest, you
          wait another 1 calendar month. After your second retest and every
          retest after that, you wait 6 calendar months.
        </p>
        <p className="text-text-secondary">
          Here&apos;s what that looks like in practice. Say you took the ASVAB
          on January 15. Your first retest opens up on February 15. If that
          score still falls short, your second retest opens March 15. But if
          you need a third attempt, you&apos;re waiting until September 15.
          That 6-month gap applies to every retest from that point forward.
        </p>
        <p className="text-text-secondary">
          There is no lifetime cap on retakes. You can take the ASVAB as many
          times as you need.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              1st Retest
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              1 month after initial ASVAB
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              2nd Retest
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              1 month after first retest
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              3rd+ Retest
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              6 months after previous retest (every time)
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          One important clarification: <strong>the student ASVAB you took in
          high school DOES count for retest waiting periods.</strong> Per the
          official ASVAB retest policy, the 1/1/6 rule applies the same way
          whether your first test was a student ASVAB (administered at school
          through the Career Exploration Program) or an enlistment ASVAB
          (administered at MEPS or a MET site). If you took the student ASVAB
          on January 15, your first enlistment-ASVAB retest opens February 15
          — not sooner.
        </p>
        <p className="text-text-secondary">
          Student ASVAB scores are also valid for enlistment for 2 years from
          the test date, so if you&apos;re happy with your student ASVAB score
          you don&apos;t necessarily need to retake it. Your recruiter can
          pull your student scores and use them directly.
        </p>
        <p className="text-text-secondary">
          Your ASVAB scores expire 2 years from the test date. If you&apos;re
          sitting on a score that&apos;s close to expiring, factor that into
          your timeline. Retaking too late means you&apos;re starting from
          scratch anyway.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">
            Student ASVAB counts — verify before you test
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            The high school student ASVAB (Career Exploration Program) uses
            the same retest policy as the enlistment ASVAB. It also produces
            a valid enlistment score for 2 years. Your recruiter can look up
            your student ASVAB scores and confirm your exact retest
            eligibility date before you schedule.
          </p>
        </aside>

        <p className="text-text-secondary">
          Your recruiter can verify your exact eligibility date based on your
          testing history. If you&apos;re unsure where you stand, ask them
          before planning your study schedule.
        </p>
        <p className="text-text-secondary">
          To understand how your scores break down, check out our{" "}
          <Link
            href="/asvab-scoring-and-results"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB scoring and results guide
          </Link>
          .
        </p>

        {/* Step 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 2: Set Your Target Score Before You Study
        </h2>
        <p className="mt-4 text-text-secondary">
          Most people who want to know{" "}
          <strong>how to retake the ASVAB</strong> make the same mistake: they
          aim for &ldquo;higher.&rdquo; That&apos;s not a target. That&apos;s
          a wish.
        </p>
        <p className="text-text-secondary">
          You need two specific numbers before you open a study guide. First,
          the minimum AFQT score your branch requires. Second, the composite
          line scores your target job demands.
        </p>
        <p className="text-text-secondary">
          The AFQT gets you through the door. Every branch has a minimum, and
          it varies:
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Min AFQT (HS Diploma)
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Min AFQT (GED)
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Put your score against the table. If your AFQT is 28 with a high
          school diploma, you need 3 more points for Army, 4 more for Marines,
          and 8 more for Air Force. Those are different study plans with
          different urgency levels.
        </p>
        <p className="text-text-secondary">
          But the AFQT only determines whether you can enlist. Your actual job
          options depend on line scores, which are composites of specific
          subtests. For example, an Army combat medic (68W) requires an ST
          score of 101. An Air Force linguist needs a General score of 72. A
          Navy Nuclear Field (NF) program demands an AR+MK+EI+GS composite of
          252 or a VE+AR+MK+MC of 252. Each job has its own formula.
        </p>
        <p className="text-text-secondary">
          If you don&apos;t know what line scores your target MOS or AFSC
          requires, you&apos;re studying blind.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Use our free{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB calculator
            </Link>{" "}
            to enter your current subtest scores and see exactly which jobs you
            qualify for across all six branches.
          </p>
        </aside>

        <p className="text-text-secondary">
          Check the full{" "}
          <Link
            href="/asvab-score-chart"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score chart
          </Link>{" "}
          to see line score requirements by branch, and read our breakdown of{" "}
          <Link
            href="/what-is-a-good-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            what counts as a good ASVAB score
          </Link>{" "}
          if you need context on where you fall.
        </p>

        {/* Step 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 3: Know Your Branch-Specific Retake Rules
        </h2>
        <p className="mt-4 text-text-secondary">
          The 1/1/6 waiting period is the baseline. But each branch layers its
          own restrictions on top, and some of them are deal-breakers if you
          don&apos;t know ahead of time.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Air Force
        </h3>
        <p className="mt-4 text-text-secondary">
          The Air Force has the strictest retake policy. Once you enter the
          Delayed Entry Program (DEP), you cannot retake the ASVAB. Period.
          Your score is locked. If you want a better score for an Air Force
          job, you must retest before signing your DEP contract. Plan your
          retake timeline so you can study and retest before your recruiter
          pushes the DEP paperwork.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Space Force
        </h3>
        <p className="mt-4 text-text-secondary">
          Same restriction as the Air Force. No retakes after DEP entry.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Navy
        </h3>
        <p className="mt-4 text-text-secondary">
          The Navy generally does not allow retakes after entering DEP. The one
          exception is the DEP Enrichment Program, which applies to applicants
          who scored between 26 and 30 on the AFQT (minimum 26 required, as
          of April 2025). If you qualify, the Navy may authorize a retest.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Army
        </h3>
        <p className="mt-4 text-text-secondary">
          The Army is the most flexible. Standard waiting periods apply, and
          retakes in DEP are generally permitted. The Army also runs the Future
          Soldier Preparatory Course for applicants with AFQT scores between
          21 and 30. It&apos;s a 3-week program at Fort Jackson, SC, that
          averages a 17-point AFQT improvement.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Marines
        </h3>
        <p className="mt-4 text-text-secondary">
          Standard 1/1/6 waiting period rules apply. Marines recruiters also
          have some flexibility: if your recruiter believes your initial score
          doesn&apos;t reflect your true capability based on your education or
          training background, they can advocate for an earlier retest.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Coast Guard
        </h3>
        <p className="mt-4 text-text-secondary">
          Standard waiting periods apply. The Coast Guard permits retests
          within 6 months for score improvement, and recruitment centers can
          request a 30-day retest with substantial evidence that previous
          scores misrepresented your qualifications. Note that Coast Guard
          Academy applicants follow a separate admissions process unrelated to
          ASVAB enlistment scores.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you&apos;re considering Air Force or Space Force, retake BEFORE
            entering DEP. Once you&apos;re in, your score is locked.
          </p>
        </aside>

        {/* Step 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 4: Contact Your Recruiter and Schedule the Test
        </h2>
        <p className="mt-4 text-text-secondary">
          You cannot schedule an ASVAB retake on your own. Every retest goes
          through your recruiter.
        </p>
        <p className="text-text-secondary">
          Contact your recruiter and be direct: &ldquo;I want to schedule an
          ASVAB retest. My last test was on [date], so I&apos;m eligible to
          retest on [date]. Can you submit the request?&rdquo; Having your
          dates ready shows you&apos;ve done your homework and speeds up the
          process. Your recruiter submits the scheduling request, and you get
          assigned to either a MEPS or a MET site. You don&apos;t get to
          choose which one.
        </p>
        <p className="text-text-secondary">
          Expect the scheduling process to take 1 to 3 weeks from your initial
          request. Some MEPS locations book out further, especially during
          peak recruiting months (summer and early fall). Follow up if you
          don&apos;t hear back within a week. Recruiters handle dozens of
          applicants, and the ones who stay in contact get scheduled faster.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Factor
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MEPS
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  MET Site
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Format
                </td>
                <td className="py-2 pr-4">CAT-ASVAB (computer adaptive)</td>
                <td className="py-2">Paper-and-pencil</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Results
                </td>
                <td className="py-2 pr-4">Same day</td>
                <td className="py-2">A few business days</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Scoring
                </td>
                <td className="py-2 pr-4">Adaptive difficulty</td>
                <td className="py-2">Fixed difficulty</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Location
                </td>
                <td className="py-2 pr-4">
                  Major military processing centers
                </td>
                <td className="py-2">
                  Local facilities (National Guard armories, reserve centers)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Both versions are equally valid for enlistment. The CAT-ASVAB
          adjusts question difficulty based on your answers. The paper version
          does not. Your scores are comparable either way.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The PiCAT (Pre-screening internet-delivered Computer Adaptive
            Test) is only for first-time ASVAB takers. It cannot be used for
            retakes. Don&apos;t ask your recruiter about it for a retest.
          </p>
        </aside>

        {/* Step 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 5: Build a 30-Day Study Plan for the Waiting Period
        </h2>
        <p className="mt-4 text-text-secondary">
          You have at least 30 days before your retest. That mandatory wait is
          your biggest advantage if you use it right.
        </p>
        <p className="text-text-secondary">
          Start by identifying where you actually lost points. Take a
          full-length{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            practice test
          </Link>{" "}
          on day one and score it honestly. The results tell you exactly where
          to focus.
        </p>
        <p className="text-text-secondary">
          Your AFQT score comes from four subtests: Arithmetic Reasoning (AR),
          Mathematics Knowledge (MK), Word Knowledge (WK), and Paragraph
          Comprehension (PC). These four sections are the gatekeeper. If your
          AFQT is the problem, allocate roughly 80% of your study time to
          these subtests. That means about 70-80 minutes of a 2-hour daily
          session on AFQT material, with the remaining 20-30 minutes on line
          score subtests if a specific job requires them.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT = AR + MK + VE (where VE is a combined score from WK + PC).
            Master these four subtests and your AFQT will move.
          </p>
        </aside>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Week
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Focus Area
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Daily Time
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Goal
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Days 1-3
                </td>
                <td className="py-2 pr-4">Diagnostic test + weakness ID</td>
                <td className="py-2 pr-4 font-mono">2 hours</td>
                <td className="py-2">Know your starting point</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Days 4-14
                </td>
                <td className="py-2 pr-4">
                  AFQT subtests (AR, MK, WK, PC)
                </td>
                <td className="py-2 pr-4 font-mono">1.5-2 hours</td>
                <td className="py-2">Build core skills</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Days 15-26
                </td>
                <td className="py-2 pr-4">
                  Practice tests every 3-4 days + targeted review
                </td>
                <td className="py-2 pr-4 font-mono">1.5-2 hours</td>
                <td className="py-2">Track improvement, fix gaps</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Days 27-29
                </td>
                <td className="py-2 pr-4">
                  Light review only, no new material
                </td>
                <td className="py-2 pr-4 font-mono">30-60 min</td>
                <td className="py-2">Stay sharp without burnout</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Day 30
                </td>
                <td className="py-2 pr-4">Test day</td>
                <td className="py-2 pr-4 font-mono">Rest</td>
                <td className="py-2">Trust your preparation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Phase 1 (Days 1-3)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Diagnose weaknesses with a full practice test
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Phase 2 (Days 4-14)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Hammer the 4 AFQT subtests daily
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Phase 3 (Days 15-26)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Test, review, repeat every 3-4 days
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Phase 4 (Days 27-30)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Light review and rest before test day
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          If you scored low on line scores for a specific job, add those
          subtests into Phase 2 and 3. For example, if you need a higher
          Electronics (EL) composite, add Electronics Information and General
          Science to your daily rotation. But don&apos;t spread yourself
          across all 9 subtests equally. Focus wins.
        </p>
        <p className="text-text-secondary">
          For study strategies and resources, check out our{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB study guide
          </Link>{" "}
          and{" "}
          <Link
            href="/how-to-study-for-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            how to study for the ASVAB
          </Link>
          .
        </p>

        {/* Step 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 6: Understand the Confirmation Test If Your Score Jumps
        </h2>
        <p className="mt-4 text-text-secondary">
          If your AFQT jumps 20 or more points within 6 months of your
          previous test, you&apos;ll get flagged for a Confirmation Test
          (C-Test). This is something anyone learning{" "}
          <strong>how to retake the ASVAB</strong> needs to understand, because
          it catches a lot of people off guard.
        </p>
        <p className="text-text-secondary">
          The C-Test is a full ASVAB administered only at MEPS (not MET
          sites). You&apos;ll get a different question form than your retest.
          The purpose is to verify your improvement is legitimate. There is no
          waiting period for the C-Test; your recruiter can schedule it as
          soon as results come back.
        </p>
        <p className="text-text-secondary">
          Here&apos;s how they determine if you pass:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          (Retest AFQT - Original AFQT) &#247; 2 = Maximum allowable drop
          from retest score
        </div>

        <p className="text-text-secondary">
          Your C-Test AFQT must be at or above your retest score minus that
          allowable drop.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Scenario
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Original AFQT
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Retest AFQT
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Allowable Drop
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  C-Test Minimum
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  C-Test Result
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Outcome
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Clear pass
                </td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2 pr-4 font-mono">65</td>
                <td className="py-2 pr-4 font-mono">12</td>
                <td className="py-2 pr-4 font-mono">53</td>
                <td className="py-2 pr-4 font-mono">58</td>
                <td className="py-2">Retest score (65) is official</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Borderline pass
                </td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 pr-4 font-mono">60</td>
                <td className="py-2 pr-4 font-mono">12</td>
                <td className="py-2 pr-4 font-mono">48</td>
                <td className="py-2 pr-4 font-mono">49</td>
                <td className="py-2">Retest score (60) is official</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fail
                </td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2 pr-4 font-mono">65</td>
                <td className="py-2 pr-4 font-mono">12</td>
                <td className="py-2 pr-4 font-mono">53</td>
                <td className="py-2 pr-4 font-mono">48</td>
                <td className="py-2">Original score (40) is restored</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Read that fail scenario again. If you fail the C-Test, you don&apos;t
          keep your retest score. You revert to your original score. That&apos;s
          a painful reset.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you fail the C-Test, you revert to your ORIGINAL score, not your
            retest score. A failed C-Test can undo all your progress.
          </p>
        </aside>

        <p className="text-text-secondary">
          Three more things to know. If you miss your C-Test appointment,
          you&apos;ll face a 6-month waiting penalty before you can test again.
          If more than 6 months have passed between your original test and your
          retest, no C-Test is required, even if your score jumped 20+ points.
          And bring the same valid photo ID you used for your retest; the
          C-Test follows the same check-in procedures at MEPS.
        </p>

        {/* Step 7 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 7: Show Up Ready on Test Day
        </h2>
        <p className="mt-4 text-text-secondary">
          Your most recent score replaces your previous score. Not your
          highest. Your most recent. This is the single most important rule to
          understand before you retake the ASVAB.
        </p>
        <p className="text-text-secondary">
          If you scored a 45 last time and score a 38 this time, your official
          AFQT is now 38. There are no do-overs and no keeping the higher
          number.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What to Bring
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What to Expect
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What NOT to Do
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4">Valid government-issued photo ID</td>
                <td className="py-2 pr-4">
                  Same test format, different questions
                </td>
                <td className="py-2">
                  Don&apos;t retake unless you&apos;re confident you&apos;ll
                  improve
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4">
                  Nothing else needed (calculators, phones, notes are
                  prohibited)
                </td>
                <td className="py-2 pr-4">
                  CAT-ASVAB: ~3 hours. Paper: ~3.5 hours
                </td>
                <td className="py-2">Don&apos;t cram the night before</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  Wear comfortable clothes, eat breakfast
                </td>
                <td className="py-2 pr-4">
                  Results: same day (CAT) or a few business days (paper)
                </td>
                <td className="py-2">
                  Don&apos;t rush through sections to finish early
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          You&apos;ve had 30 days of structured study behind you. The questions
          will be different from your first test, but the format is identical.
          No surprises.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your new score replaces your old score, period. Only retake when
            you&apos;re confident you&apos;ll improve.
          </p>
        </aside>

        <p className="text-text-secondary">
          Stay calm. Work through each section at a steady pace. On the
          CAT-ASVAB, the first 5 to 7 questions in each section carry the most
          weight because they establish your ability estimate. The algorithm
          uses your early answers to calibrate the difficulty of everything
          that follows. Take extra time on those opening questions to get them
          right, then maintain a steady pace through the rest of the section.
        </p>

        {/* Step 8 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 8: What to Do If Your Score Still Falls Short
        </h2>
        <p className="mt-4 text-text-secondary">
          If your second retest didn&apos;t get you where you need to be, your
          next attempt comes with a 6-month wait. Every subsequent retest after
          the second also carries that 6-month gap. That&apos;s a long time,
          but it&apos;s not the end.
        </p>
        <p className="text-text-secondary">
          Use those 6 months differently than the first 30 days. If self-study
          didn&apos;t work twice, change your approach entirely. For math (AR
          and MK), Khan Academy offers free, structured lessons that cover
          every concept on the ASVAB from basic algebra through geometry. For
          vocabulary (WK), daily flashcard apps like Anki or Quizlet with
          ASVAB-specific decks build word knowledge faster than reading lists
          alone. Consider a tutor if you&apos;ve hit a ceiling with self-paced
          study.
        </p>
        <p className="text-text-secondary">
          <strong>Army applicants:</strong> If your AFQT falls between 21 and
          30, ask your recruiter about the Future Soldier Preparatory Course.
          It&apos;s a 3-week intensive program run by the Army that averages a
          17-point AFQT improvement. That&apos;s often enough to clear the 31
          minimum.
        </p>
        <p className="text-text-secondary">
          <strong>Adjust your target.</strong> If you&apos;re figuring out{" "}
          <strong>how to retake the ASVAB</strong> for the third or fourth
          time, reconsider your options. Your current scores may already
          qualify you for jobs you haven&apos;t considered. Different branches
          and different MOSs have different score requirements. A score that
          locks you out of one job might open the door to another.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Check our{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              calculator
            </Link>
            . Your current scores may already qualify you for jobs you
            haven&apos;t considered.
          </p>
        </aside>

        <p className="text-text-secondary">
          Don&apos;t panic-retake. Your scores are valid for 2 years. If you
          need more time to study, take it. A rushed retest with the same
          preparation will give you the same result.
        </p>
        <p className="text-text-secondary">
          Keep taking{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            practice tests
          </Link>{" "}
          throughout your waiting period to track real improvement before
          committing to another official test.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many times can you retake the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              There is no lifetime limit. The first two retakes require a
              1-month wait each. After that, every subsequent retake requires a
              6-month wait. The only practical limit is the 2-year score
              validity window and the 6-month gaps that slow you to 2-3
              attempts per year.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the military use your highest ASVAB score or most recent?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Most recent. Your newest ASVAB score automatically replaces your
              previous score, even if it&apos;s lower. The military does not
              let you keep your highest score across multiple attempts. Only
              retake when you&apos;re confident you&apos;ll improve.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you retake the ASVAB while in DEP?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends on the branch. The Air Force and Space Force do not
              allow retakes once you&apos;ve entered DEP. The Navy generally
              does not, except through the DEP Enrichment Program for
              applicants with AFQT scores of 26-30. The Army is the most
              flexible and generally allows retakes during DEP.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you use the PiCAT to retake the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The PiCAT is only available to first-time ASVAB takers. If
              you&apos;ve already taken the ASVAB and want to retest, you must
              take the full ASVAB at a MEPS or MET site. Your recruiter will
              schedule this for you.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do high school student ASVAB scores count for retest waiting periods?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Per the official ASVAB retest policy, the 1/1/6 wait rule
              applies the same way whether your first test was a student
              ASVAB (taken through the Career Exploration Program in high
              school) or an enlistment ASVAB. Student ASVAB scores are also
              usable as an official enlistment score for 2 years.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long are ASVAB scores valid?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              ASVAB scores are valid for 2 years from the test date. After 2
              years, you&apos;ll need to retake the test to enlist. If your
              scores are approaching expiration, talk to your recruiter about
              your timeline.
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
