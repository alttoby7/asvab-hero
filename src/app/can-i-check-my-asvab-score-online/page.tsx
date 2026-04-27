import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Can I Check My ASVAB Score Online? | ASVAB Hero",
  description:
    "Yes, if you took the high school CEP test. Learn which portal fits your path and how to get your ASVAB score online fast.",
  alternates: {
    canonical: "https://asvabhero.com/can-i-check-my-asvab-score-online",
  },
};

export default function CanICheckMyASVABScoreOnlinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Can I Check My ASVAB Score Online? Here's the Honest Answer",
          description:
            "Yes, if you took the high school CEP test. Learn which portal fits your path and how to get your ASVAB score online fast.",
          url: "https://asvabhero.com/can-i-check-my-asvab-score-online",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-04-27",
          dateModified: "2026-04-27",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is there a single ASVAB score lookup website for everyone?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No unified DoD portal exists. CEP test-takers use asvabprogram.com. Applicants rely on their recruiter and the MEPS printout. Active duty use a branch portal (ACT, BOL, MOL, Direct Access, or vMPF). JST covers four branches but excludes Air Force and Space Force.",
              },
            },
            {
              "@type": "Question",
              name: "How long after testing can I see my score online?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "CAT-ASVAB at MEPS prints scores immediately. Paper-and-pencil at MET sites takes about two weeks. CEP scores post within 1 to 2 weeks. PiCAT scores stay hidden until you complete the Vtest at MEPS.",
              },
            },
            {
              "@type": "Question",
              name: "Can my parents check my ASVAB score online?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Only with your CEP access code and date of birth at asvabprogram.com. Applicant scores are recruiter-controlled. Active duty scores require a CAC, which parents won't have.",
              },
            },
            {
              "@type": "Question",
              name: "How long are ASVAB scores valid online?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Two years from the test date. After that, scores are deleted from the active DoD scoring database, CEP access codes expire, and MEPS will not accept the scores for enlistment. Plan to retest if you're past the window.",
              },
            },
            {
              "@type": "Question",
              name: "Why can't I see my line scores on the CEP portal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CEP is built for high school career exploration, not enlistment. Line and composite scores (GT, CL, MM, etc.) get computed only when MEPS processes your file as an applicant. The CEP portal shows AFQT, subtest standard scores, and Career Exploration Scores instead.",
              },
            },
            {
              "@type": "Question",
              name: "My JST account is locked. How do I check my ASVAB now?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Email the JST help desk for a reset, or skip JST and go directly to your branch portal. Army uses ACT, Navy uses BOL, Marines use MOL, Coast Guard uses Direct Access. Air Force and Space Force should use vMPF since JST won't return their records.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Can I Check My ASVAB Score Online? Here&apos;s the Honest Answer
        </h1>

        <p className="mt-4 text-text-secondary">
          <strong>Can I check my ASVAB score online?</strong> Yes, but only if
          you took the test through your high school&apos;s Career Exploration
          Program (CEP). For everyone else, the answer involves a phone call to
          your recruiter.
        </p>
        <p className="text-text-secondary">
          No single DoD portal returns ASVAB scores for every test-taker. Access
          depends on where you took it, when you took it, and your current
          military status. That&apos;s why every answer you&apos;ve read online
          so far has contradicted the last one.
        </p>
        <p className="text-text-secondary">
          This guide splits the question &ldquo;can I check my ASVAB score
          online&rdquo; by path so you can jump to yours, then plug your numbers
          into our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            score calculator
          </Link>{" "}
          to see what you qualify for.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your access path falls into one of three buckets. High school CEP
            test-takers get an online portal. Military applicants who tested at
            MEPS or a MET site go through their recruiter. Active duty and
            veterans use a branch personnel system.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 1: Identify Which ASVAB Path You Took
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            Before you can check your ASVAB score online, identify which version
            of the ASVAB you took.
          </strong>{" "}
          Your access path was set the day you sat down at that computer, and it
          doesn&apos;t change.
        </p>
        <p className="text-text-secondary">
          There are five paths. Match yours by the single identifier in
          parentheses:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>CEP (Career Exploration Program):</strong> taken at your
            high school, proctored by a DoD examiner. You walked away with an
            ASR sheet.
          </li>
          <li>
            <strong>CAT-ASVAB at MEPS:</strong> taken at a Military Entrance
            Processing Station on a computer, sent there by your recruiter.
          </li>
          <li>
            <strong>Paper-and-pencil at a MET site:</strong> taken at a Mobile
            Examination Test site (rural areas), used a paper booklet, results
            took about two weeks.
          </li>
          <li>
            <strong>PiCAT:</strong> taken from home on your own computer, then
            verified at MEPS later with a short proctored Vtest.
          </li>
          <li>
            <strong>In-service ASVAB:</strong> retook the test while already on
            active duty for reclassification.
          </li>
        </ul>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Test Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Where You Took It
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Online Self-Service?
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CEP
                </td>
                <td className="py-2 pr-4">High school</td>
                <td className="py-2">Yes, asvabprogram.com</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CAT-ASVAB
                </td>
                <td className="py-2 pr-4">MEPS</td>
                <td className="py-2">No, printed report only</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Paper-and-pencil
                </td>
                <td className="py-2 pr-4">MET site</td>
                <td className="py-2">No, recruiter delivers</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PiCAT
                </td>
                <td className="py-2 pr-4">Home computer</td>
                <td className="py-2">No, recruiter only</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  In-service
                </td>
                <td className="py-2 pr-4">Military installation</td>
                <td className="py-2">Yes, branch portal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you took the PiCAT, you cannot see your scores at all. Only the
            recruiter who registered you has access until you complete the
            verification Vtest at MEPS.
          </p>
        </aside>

        <p className="text-text-secondary">
          Once you know your path, jump to the matching step below.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 2: Check Scores Online via the CEP Portal (High School
          Test-Takers)
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            If you took the ASVAB through your high school&apos;s Career
            Exploration Program, you can log in to asvabprogram.com and see your
            scores in under two minutes.
          </strong>{" "}
          This is the only true self-service ASVAB portal that exists, and
          it&apos;s the cleanest answer to &ldquo;can I check my ASVAB score
          online.&rdquo;
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Find your ASR
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The ASVAB Summary Results sheet from your school counselor or
              mailed home
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Locate the access code
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Lower-right corner of the ASR sheet
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Open the portal
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Go to asvabprogram.com and click &ldquo;Score Login&rdquo;
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Enter credentials
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Access code plus your date of birth
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              View results
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT, eight subtest scores, and Career Exploration Scores
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          You&apos;ll see your AFQT percentile (1 to 99), eight subtest standard
          scores (mean of 50, standard deviation of 10) with percentile bands,
          and three Career Exploration Scores covering Verbal, Math, and
          Science-Technical skills.
        </p>
        <p className="text-text-secondary">
          The portal does NOT show line or composite scores. Those only get
          computed when MEPS processes you as an actual enlistment applicant.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Lost your ASR or access code? Request a replacement at
            asvabprogram.com/score-request, or email dodhra.asvab-cep@mail.mil
            with your full name, test date, school name, and date of birth. New
            codes typically arrive in 5 to 10 business days.
          </p>
        </aside>

        <p className="text-text-secondary">
          Once you&apos;re logged in, head to our{" "}
          <Link
            href="/asvab-scores-explained"
            className="text-accent hover:text-accent-hover"
          >
            scores explained guide
          </Link>{" "}
          to interpret what those numbers mean for enlistment eligibility.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 3: Get Scores from MEPS or a MET Site (Military Applicants)
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            If you took the ASVAB at MEPS or a MET site through a recruiter, no
            public online portal exists.
          </strong>{" "}
          Your recruiter holds your scores in the Recruiter Eligibility System
          (RES), and that&apos;s the only place they live.
        </p>
        <p className="text-text-secondary">
          <strong>MEPS / CAT-ASVAB:</strong> Scores are available immediately at
          the testing location. Before you leave the building, you&apos;ll get a
          printed score report showing your AFQT and every line or composite
          score your branch uses. Take a photo of it before you leave. No
          follow-up email, no login link, and no portal account exist for
          applicants.
        </p>
        <p className="text-text-secondary">
          <strong>MET Site / Paper-and-Pencil:</strong> Used in remote areas
          where MEPS travel isn&apos;t practical. Your test booklet ships back
          to MEPS for scoring. Your recruiter is notified within 72 hours, and
          you&apos;ll get the printed report from your recruiter about two weeks
          after testing.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Lost the printout? Call your recruiter. They can pull your scores
            from RES, screenshot them, and text you a copy in five minutes. No
            self-service site exists for applicants, so don&apos;t waste time
            searching for one. The honest answer to &ldquo;can I check my ASVAB
            score online&rdquo; in this case is no.
          </p>
        </aside>

        <p className="text-text-secondary">
          Once you have the printout, check our{" "}
          <Link
            href="/asvab-score-chart"
            className="text-accent hover:text-accent-hover"
          >
            score chart
          </Link>{" "}
          to see what jobs your line scores qualify you for in each branch.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 4: Pull Scores via JST or Branch Portals (Active Duty and
          Veterans)
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            If you&apos;re serving or recently separated, your scores live in
            your branch&apos;s personnel system.
          </strong>{" "}
          No shared cross-branch portal exists, and the system you use depends
          on which uniform you wore.
        </p>
        <p className="text-text-secondary">
          You have two tracks. JST (Joint Services Transcript) at jst.doded.mil
          covers Army, Coast Guard, Marines, and Navy. It requires a CAC or a
          registered account, locks after three failed logins, and disables
          after 30 days of inactivity. Branch personnel portals are usually
          faster and more reliable for ASVAB specifically.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Primary Portal
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Login Method
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">ACT (Army Career Tracker)</td>
                <td className="py-2 font-mono">CAC or AKO</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">BOL (BUPERS Online)</td>
                <td className="py-2 font-mono">CAC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">MOL (Marine Online)</td>
                <td className="py-2 font-mono">CAC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">Direct Access</td>
                <td className="py-2 font-mono">CAC</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force / Space Force
                </td>
                <td className="py-2 pr-4">vMPF</td>
                <td className="py-2 font-mono">CAC</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Air Force and Space Force members cannot use JST for ASVAB scores.
            JST does not pull from AFPC records. Use vMPF or visit your MPF in
            person to get a verified score printout.
          </p>
        </aside>

        <p className="text-text-secondary">
          Once you have your line scores in hand, plug them into the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            calculator
          </Link>{" "}
          to confirm reclassification eligibility for the MOS or rate
          you&apos;re targeting.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 5: Understand What Scores You&apos;ll Actually See Online
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            Your &ldquo;ASVAB score&rdquo; is actually a stack of numbers, and
            which ones you can see online depends on the portal.
          </strong>{" "}
          Confusion here is why people think their score &ldquo;changed&rdquo;
          between high school and MEPS. It didn&apos;t. They&apos;re looking at
          different score types.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Score Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What It Means
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Where You&apos;ll See It
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AFQT (1&ndash;99 percentile)
                </td>
                <td className="py-2 pr-4">Overall enlistment eligibility</td>
                <td className="py-2">
                  CEP portal, MEPS printout, all branch portals
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Subtest standard scores (mean 50, SD 10)
                </td>
                <td className="py-2 pr-4">
                  Performance on each of 8&ndash;10 subtests
                </td>
                <td className="py-2">CEP portal, MEPS printout</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Career Exploration Scores (Verbal, Math, Science-Technical)
                </td>
                <td className="py-2 pr-4">Aggregate career planning scores</td>
                <td className="py-2">CEP portal ONLY</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Line / composite scores (GT, CL, MM, etc.)
                </td>
                <td className="py-2 pr-4">
                  Branch-specific job qualification
                </td>
                <td className="py-2">
                  MEPS printout + branch portals (NOT CEP)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          AFQT determines whether you can enlist at all. Line scores determine
          which jobs you qualify for once you do. CEP test-takers won&apos;t see
          line scores in the portal because those numbers aren&apos;t computed
          until MEPS processes your file as an actual applicant.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            The number a recruiter quotes (&ldquo;you got a 72&rdquo;) is your
            AFQT percentile, not a raw score. Read our{" "}
            <Link
              href="/afqt-score"
              className="text-accent hover:text-accent-hover"
            >
              AFQT score guide
            </Link>{" "}
            to see what each range qualifies you for in every branch.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 6: Recover Scores That Are Missing or Expired
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            ASVAB scores get deleted from the active DoD scoring database two
            years after your test date.
          </strong>{" "}
          After that, no portal will return them. The 2-year rule is also the
          validity window for enlistment, so retesting is usually the right
          answer anyway.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Fastest (same day)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Retake the ASVAB. Scores older than two years aren&apos;t valid
              for enlistment regardless of what a printout says.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Medium (1&ndash;2 weeks)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Request a new CEP access code at asvabprogram.com/score-request.
              Only works if your test was within the 2-year window.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Slowest (4&ndash;8 weeks)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Submit SF-180 to the National Personnel Records Center (NPRC) for
              archival records. Useful only for proving you tested, not for
              enlisting.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The 2-year rule applies to BOTH online score deletion AND validity for
          enlistment. Even if you find an old printout in a drawer, MEPS will
          not accept scores past two years. Plan to retest if you&apos;re
          outside that window. Our{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            retake guide
          </Link>{" "}
          walks through the waiting period, retest rules, and how to prepare.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            SF-180 records are for archival or legal purposes only. They will
            not get you back into the enlistment pipeline. To enlist, you must
            retest and produce fresh scores at MEPS.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 7: Handle DEP and PiCAT Edge Cases
        </h2>
        <p className="mt-4 text-text-secondary">
          <strong>
            Two situations completely lock you out of online access: being in
            the Delayed Entry Program, or having taken the PiCAT.
          </strong>{" "}
          Both are recruiter-only by design, so the question &ldquo;can I check
          my ASVAB score online&rdquo; has only one answer here. No.
        </p>
        <p className="text-text-secondary">
          <strong>DEP recruits:</strong> Once you&apos;ve enlisted into the
          Delayed Entry Program but haven&apos;t shipped to basic training yet,
          you have no independent online portal. Your scores sit with your
          recruiter in RES. Most branches prohibit retesting once you&apos;re in
          DEP unless you cancel your contract and re-enlist, so don&apos;t
          expect a self-service path.
        </p>
        <p className="text-text-secondary">
          <strong>PiCAT test-takers:</strong> The Pending Internet Computerized
          Adaptive Test is taken at home, but you cannot see your score after
          submitting. Only the recruiter who registered you has access. You must
          complete a Vtest at MEPS within 45 days to verify the result. Only
          then are scores released into the system.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            In both DEP and PiCAT cases, the answer is the same. Call your
            recruiter. Do not waste time on score-lookup sites, third-party
            portals, or &ldquo;DoD score check&rdquo; pages. Those don&apos;t
            exist.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you&apos;re stuck waiting on results, see our{" "}
          <Link
            href="/asvab-scoring-and-results"
            className="text-accent hover:text-accent-hover"
          >
            scoring and results guide
          </Link>{" "}
          for what to expect after your MEPS visit.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is there a single ASVAB score lookup website for everyone?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No unified DoD portal exists. CEP test-takers use
              asvabprogram.com. Applicants rely on their recruiter and the MEPS
              printout. Active duty use a branch portal (ACT, BOL, MOL, Direct
              Access, or vMPF). JST covers four branches but excludes Air Force
              and Space Force.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long after testing can I see my score online?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              CAT-ASVAB at MEPS prints scores immediately. Paper-and-pencil at
              MET sites takes about two weeks. CEP scores post within 1 to 2
              weeks. PiCAT scores stay hidden until you complete the Vtest at
              MEPS.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can my parents check my ASVAB score online?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Only with your CEP access code and date of birth at
              asvabprogram.com. Applicant scores are recruiter-controlled.
              Active duty scores require a CAC, which parents won&apos;t have.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long are ASVAB scores valid online?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Two years from the test date. After that, scores are deleted from
              the active DoD scoring database, CEP access codes expire, and MEPS
              will not accept the scores for enlistment. Plan to retest if
              you&apos;re past the window.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why can&apos;t I see my line scores on the CEP portal?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CEP is built for high school career exploration, not
              enlistment. Line and composite scores (GT, CL, MM, etc.) get
              computed only when MEPS processes your file as an applicant. The
              CEP portal shows AFQT, subtest standard scores, and Career
              Exploration Scores instead.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              My JST account is locked. How do I check my ASVAB now?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Email the JST help desk for a reset, or skip JST and go directly
              to your branch portal. Army uses ACT, Navy uses BOL, Marines use
              MOL, Coast Guard uses Direct Access. Air Force and Space Force
              should use vMPF since JST won&apos;t return their records.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          For more on what your numbers mean once you finally see them, head to
          our{" "}
          <Link
            href="/asvab-score-ranges"
            className="text-accent hover:text-accent-hover"
          >
            score ranges guide
          </Link>
          .
        </p>

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
