import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "What Jobs Do I Qualify For With My ASVAB Score?",
  description:
    "Find out what jobs you qualify for with your ASVAB score. Learn the two-gate AFQT and composite system, then check every job in our free calculator.",
  alternates: {
    canonical: "https://asvabhero.com/what-jobs-qualify-asvab-score",
  },
};

export default function WhatJobsQualifyASVABScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Jobs Do I Qualify For With My ASVAB Score?",
          description:
            "Find out what jobs you qualify for with your ASVAB score. Learn the two-gate AFQT and composite system, then check every job in our free calculator.",
          url: "https://asvabhero.com/what-jobs-qualify-asvab-score",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-05-20",
          dateModified: "2026-05-20",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What jobs can I get with a 50 ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 50 AFQT clears every branch minimum and puts you at the average. It opens most entry-level jobs across all six branches. Technical and specialty jobs depend on your line and composite scores, not the AFQT, so check those separately or run your scores through the calculator.",
              },
            },
            {
              "@type": "Question",
              name: "Does a high AFQT mean I qualify for any job?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The AFQT is only the enlistment gate. Specific jobs require specific composite scores built from different subtests. You can score in the 85th percentile and still miss a cyber or electronics job if your General Science and Electronics Information scores are low.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need for the job I want?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Find the composite the job uses, then meet its threshold. Army Combat Medic needs ST 101 and GT 107; Air Force Air Traffic Controller needs a G of 55. The ASVAB score calculator checks your scores against job requirements across all branches.",
              },
            },
            {
              "@type": "Question",
              name: "Are these the same scores my recruiter sees?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Your recruiter uses the same AFQT and composite scores, matched against the current open job list and quotas. The difference is they also know which jobs are actually available right now, since qualifying does not guarantee a slot.",
              },
            },
            {
              "@type": "Question",
              name: "How many jobs do I qualify for with just the minimum score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Fewer than you would like. Hitting the bare minimum (31 for the Army) clears enlistment but leaves most technical and competitive jobs out of reach because their composites sit higher. Aim well above the floor to widen your options.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between AFQT and line scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your AFQT is one percentile from 4 subtests that decides whether you can enlist. Line and composite scores combine various subtests and decide which specific jobs you qualify for. You need both gates to land the job you want.",
              },
            },
            {
              "@type": "Question",
              name: "Can I check what jobs I qualify for before I take the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Take a practice test to project your scores, then enter those into the calculator to preview your likely job list. Real numbers replace the estimate once you test for real.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          What Jobs Do I Qualify For With My ASVAB Score?
        </h1>

        <p className="mt-4 text-text-secondary">
          You got your scores back, and now you want the real answer: which
          military jobs does this number actually unlock? Figuring out{" "}
          <strong>
            what jobs you qualify for with your ASVAB score
          </strong>{" "}
          trips up most people because they treat it as one number doing one job.
          It is not.
        </p>

        <p className="text-text-secondary">
          Your ASVAB results are really two scores working two different gates.
          One decides if you can enlist. The other decides which jobs you can
          pick. Once you see the split, the whole thing gets simple.
        </p>

        <p className="text-text-secondary">
          If you already have your scores and want the fast answer, plug them into
          our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          to see every job you qualify for across all six branches.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            No single ASVAB number decides your job. Your AFQT gets you in the
            door; your composite scores decide which doors you can open.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Two-Gate System: AFQT to Enlist, Composites to Qualify
        </h2>

        <p className="mt-4 text-text-secondary">
          Most confusion about ASVAB jobs comes from skipping this one fact. There
          are two gates, not one, and they use different scores.
        </p>

        <p className="text-text-secondary">
          Gate one is your AFQT (Armed Forces Qualification Test) score, a
          percentile from 1 to 99. It comes from exactly 4 of your 9 subtests:
          Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge, and
          Paragraph Comprehension. This single number decides whether a branch
          will take you at all.
        </p>

        <p className="text-text-secondary">
          Gate two is your composite scores, also called line scores. Each branch
          recombines your subtest results into job-family categories. These decide
          which specific jobs you qualify for, and they pull from subtests the
          AFQT ignores.
        </p>

        <p className="text-text-secondary">
          Only 4 of your 9 subtests feed the AFQT. The other 5 (General Science,
          Electronics Information, Auto &amp; Shop Information, Mechanical
          Comprehension, and Assembling Objects) do nothing for enlistment and
          everything for job qualification.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            A high AFQT does not guarantee a technical job. You can land in the
            80th percentile and still get locked out of electronics or medical
            jobs if your General Science and Electronics Information scores are
            low. See the full breakdown in{" "}
            <Link
              href="/asvab-scores-explained"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB scores explained
            </Link>{" "}
            and the{" "}
            <Link
              href="/afqt-score"
              className="text-accent hover:text-accent-hover"
            >
              AFQT score guide
            </Link>
            .
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Gate One: Do You Clear Your Branch&apos;s AFQT Minimum?
        </h2>

        <p className="mt-4 text-text-secondary">
          Before any job list matters, your AFQT has to clear the branch&apos;s
          floor. Here are the 2026 minimums.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Diploma Minimum
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GED Minimum
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
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marine Corps
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
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These are floors, not targets. Scoring a 31 for the Army means you can
          technically enlist, but your job choices shrink and your leverage with a
          recruiter drops to near zero. The average enlistee scores between 55 and
          65.
        </p>

        <p className="text-text-secondary">
          GED holders face a higher bar because the military uses your education
          credential to predict training completion. Earning 15 or more college
          credits can reclassify you at the diploma tier and drop your minimum
          back down.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Branch minimums move with recruiting needs. The Navy temporarily
            lowered its floor in 2022, then raised it back. Verify the current
            number with your recruiter or the official branch site within 30 days
            of testing. See the full{" "}
            <Link
              href="/asvab-score-requirements"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB score requirements
            </Link>{" "}
            for every branch.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Gate Two: How Line and Composite Scores Build Your Job List
        </h2>

        <p className="mt-4 text-text-secondary">
          Clear the AFQT and gate two opens. Each branch takes your 9 standard
          subtest scores and recombines them into composites, and every job sets a
          threshold on one or more of those composites.
        </p>

        <p className="text-text-secondary">
          The Army uses 10 line scores: GT, CL, EL, CO, FA, GM, MM, OF, SC, and
          ST. The most common is General Technical:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) is your combined WK and PC score. A real Army
          profile of VE 52 and AR 55 produces a GT of 107, which clears most
          technical and intelligence jobs.
        </p>

        <p className="text-text-secondary">
          The Air Force and Space Force use four MAGE composites:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          M = GS + MC + 2(AS)
          <br />
          A = WK + PC + MK
          <br />
          G = AR + WK + PC
          <br />
          E = GS + AR + MK + EI
        </div>

        <p className="text-text-secondary">
          The Marines use four line scores: GT, EL, MM, and CL. The Marine GT is
          VE + AR, the same as the Army. Plenty of competitor sites list it as WK
          + PC + AR + MC, which is wrong. Do not study toward a formula that does
          not exist.
        </p>

        <p className="text-text-secondary">
          Navy and Coast Guard skip the grouping system entirely. Each rating has
          its own additive composite formula and threshold, which makes them the
          hardest to navigate by hand.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  System
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example Composite
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">10 line scores</td>
                <td className="py-2 font-mono">GT = VE + AR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">4 line scores</td>
                <td className="py-2 font-mono">GT = VE + AR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force / Space Force
                </td>
                <td className="py-2 pr-4">4 MAGE composites</td>
                <td className="py-2 font-mono">G = AR + WK + PC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">Job-specific formulas</td>
                <td className="py-2 font-mono">HM = VE + AR + MK + GS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">Job-specific formulas</td>
                <td className="py-2 font-mono">ET = AR + MK + EI + GS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For the full job-to-score map across branches, see{" "}
          <Link
            href="/mos-asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            MOS ASVAB score requirements
          </Link>{" "}
          and the{" "}
          <Link
            href="/asvab-line-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB line score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Find Your Qualifying Jobs in 4 Steps
        </h2>

        <p className="mt-4 text-text-secondary">
          You do not need a recruiter to start narrowing your list. Run these four
          steps in order.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 1</p>
            <p className="mt-1 text-sm text-text-secondary">
              Confirm your AFQT clears your target branch&apos;s minimum from the
              table above. If it does not, your first move is a retake, not a job
              search.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 2</p>
            <p className="mt-1 text-sm text-text-secondary">
              Find your strongest subtests and note which composites they feed.
              Strong AR and VE build a high GT; strong GS and EI build technical
              composites.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 3</p>
            <p className="mt-1 text-sm text-text-secondary">
              Match those composites against the job thresholds for your branch. A
              GT of 107 unlocks a different list than a GT of 90.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 4</p>
            <p className="mt-1 text-sm text-text-secondary">
              Plug every score into the calculator. It runs all the formulas at
              once and returns your full qualifying list.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The shortcut for all four steps is the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>
          . Enter your AFQT and subtest scores, and it does the matching for you
          across every branch.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Qualifying Jobs by Branch (and Where to See the Full List)
        </h2>

        <p className="mt-4 text-text-secondary">
          Each branch runs hundreds of jobs, and the lists change with staffing
          needs. Here is the high-level map, with links to the maintained detail
          pages so you are never working from a stale table.
        </p>

        <p className="text-text-secondary">
          <strong>Army.</strong> 10 line scores cover everything from infantry to
          cyber. Combat Medic (68W) needs ST 101 and GT 107. Infantryman (11B)
          needs CO 87. See the full breakdown at{" "}
          <Link
            href="/army-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Army ASVAB score requirements
          </Link>{" "}
          and the complete{" "}
          <Link
            href="/army-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            Army MOS list
          </Link>
          .
        </p>

        <p className="text-text-secondary">
          <strong>Navy.</strong> Job-specific composites. Hospital Corpsman builds
          from VE + AR + MK + GS. Electronics Technician builds from AR + MK + EI
          + GS. Full details at{" "}
          <Link
            href="/navy-asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            Navy ASVAB score requirements
          </Link>{" "}
          and the{" "}
          <Link
            href="/navy-ratings-list"
            className="text-accent hover:text-accent-hover"
          >
            Navy ratings list
          </Link>
          .
        </p>

        <p className="text-text-secondary">
          <strong>Air Force and Space Force.</strong> MAGE composites. Security
          Forces (3P0X1) needs a G score of 33; Air Traffic Controller (1C1X1)
          needs a G of 55; Intelligence Analyst (1N0X1) needs a G of 64. See{" "}
          <Link
            href="/air-force-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Air Force ASVAB score requirements
          </Link>{" "}
          and the{" "}
          <Link
            href="/air-force-afsc-list"
            className="text-accent hover:text-accent-hover"
          >
            Air Force AFSC list
          </Link>
          .
        </p>

        <p className="text-text-secondary">
          <strong>Marines.</strong> Four line scores. Infantry Rifleman (0311)
          needs GT 80; Military Police (5811) needs GT 100. Full details at{" "}
          <Link
            href="/asvab-marines-score"
            className="text-accent hover:text-accent-hover"
          >
            Marines ASVAB score requirements
          </Link>{" "}
          and the{" "}
          <Link
            href="/usmc-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            USMC MOS list
          </Link>
          .
        </p>

        <p className="text-text-secondary">
          <strong>Coast Guard.</strong> Additive composite scores per rating, with
          some setting a subtest floor like AR 52. See{" "}
          <Link
            href="/coast-guard-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Coast Guard ASVAB score requirements
          </Link>{" "}
          for the rating breakdown.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Worked Examples: What These Scores Actually Open Up
        </h2>

        <p className="mt-4 text-text-secondary">
          Numbers in a table feel abstract until you map them to a person. Here
          are three profiles and what they unlock.
        </p>

        <p className="text-text-secondary">
          <strong>Profile A: 60 AFQT, balanced subtests.</strong> A 60 clears
          every branch minimum with room to spare and lands you in Category IIIA.
          With evenly spread subtests, most entry-level jobs open across all six
          branches, plus a chunk of technical jobs where your composites land high
          enough.
        </p>

        <p className="text-text-secondary">
          <strong>Profile B: Army recruit, GT 107 and ST 101.</strong> This
          profile qualifies for Combat Medic (68W), which needs ST 101 and GT 107,
          and Intelligence Analyst (35F), which needs ST 101. Both are competitive
          jobs that a mid-range AFQT alone would not reveal.
        </p>

        <p className="text-text-secondary">
          <strong>Profile C: high AFQT, weak GS and EI.</strong> Say you score an
          85 AFQT but bomb General Science and Electronics Information. You still
          cannot touch Army Cyber Operations (17C), which needs GT 110 and ST 112,
          or most electronics jobs. The headline percentile looks great; the
          composites do not back it up.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Profile
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Key Scores
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Sample Jobs Unlocked
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  A: balanced
                </td>
                <td className="py-2 pr-4 font-mono">AFQT 60</td>
                <td className="py-2">Most entry-level jobs, all branches</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  B: technical
                </td>
                <td className="py-2 pr-4 font-mono">GT 107, ST 101</td>
                <td className="py-2">Combat Medic 68W, Intel Analyst 35F</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  C: lopsided
                </td>
                <td className="py-2 pr-4 font-mono">AFQT 85, low GS/EI</td>
                <td className="py-2">Blocked from Cyber 17C and electronics</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The subtest mix decides your technical jobs, not the headline AFQT.
            Two people with the same AFQT can qualify for completely different
            jobs.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Fastest Way to See Every Job You Qualify For
        </h2>

        <p className="mt-4 text-text-secondary">
          Matching composites against job thresholds by hand is slow, and one math
          slip puts the wrong jobs on your list. Skip it.
        </p>

        <p className="text-text-secondary">
          Enter your AFQT and subtest scores into the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>
          . It runs every branch&apos;s composite formulas, checks them against
          current job thresholds, and returns your qualifying list across all six
          branches in seconds. That is the interactive answer to the question that
          brought you here.
        </p>

        <p className="text-text-secondary">
          Have not tested yet? Take a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB practice test
          </Link>{" "}
          first to project your scores, then run those numbers through the
          calculator to see what you are tracking toward.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Jobs FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What jobs can I get with a 50 ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A 50 AFQT clears every branch minimum and puts you at the average. It
              opens most entry-level jobs across all six branches. Technical and
              specialty jobs depend on your line and composite scores, not the
              AFQT, so check those separately or run your scores through the
              calculator.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does a high AFQT mean I qualify for any job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The AFQT is only the enlistment gate. Specific jobs require
              specific composite scores built from different subtests. You can
              score in the 85th percentile and still miss a cyber or electronics
              job if your General Science and Electronics Information scores are
              low.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for the job I want?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Find the composite the job uses, then meet its threshold. Army
              Combat Medic needs ST 101 and GT 107; Air Force Air Traffic
              Controller needs a G of 55. The{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB score calculator
              </Link>{" "}
              checks your scores against job requirements across all branches.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Are these the same scores my recruiter sees?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Your recruiter uses the same AFQT and composite scores, matched
              against the current open job list and quotas. The difference is they
              also know which jobs are actually available right now, since
              qualifying does not guarantee a slot.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many jobs do I qualify for with just the minimum score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Fewer than you would like. Hitting the bare minimum (31 for the
              Army) clears enlistment but leaves most technical and competitive
              jobs out of reach because their composites sit higher. Aim well
              above the floor to widen your options.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between AFQT and line scores?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Your AFQT is one percentile from 4 subtests that decides whether you
              can enlist. Line and composite scores combine various subtests and
              decide which specific jobs you qualify for. You need both gates to
              land the job you want.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I check what jobs I qualify for before I take the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Take a{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                practice test
              </Link>{" "}
              to project your scores, then enter those into the calculator to
              preview your likely job list. Real numbers replace the estimate once
              you test for real.
            </p>
          </div>
        </div>

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
