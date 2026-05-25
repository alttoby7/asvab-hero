import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Retake Policy 2026: Rules & Waiting Periods",
  description:
    "Learn the complete ASVAB retake policy for 2026: the 1-1-6 waiting period rule, DEP restrictions by branch, C-Test triggers, and score expiration.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-retake-policy",
  },
};

export default function AsvabRetakePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "ASVAB Retake Policy 2026: What the Rules Actually Say",
          description:
            "Learn the complete ASVAB retake policy for 2026: the 1-1-6 waiting period rule, DEP restrictions by branch, C-Test triggers, and score expiration.",
          url: "https://asvabhero.com/asvab-retake-policy",
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
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can I retake the ASVAB if I'm already in DEP?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on your branch. Air Force DEP members cannot retake unless line scores prevent job matching. Navy DEP members can only retake through the DEP Enrichment Program (AFQT 28-30, must score 31+ to ship). Army DEP members can retake for expired scores, failure to qualify, or unusual circumstances. Marine Corps and Coast Guard allow retakes with recruiter discretion.",
              },
            },
            {
              "@type": "Question",
              name: "What happens if I score lower on my ASVAB retake?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The lower score becomes your official ASVAB score. The military uses your most recent score, not your highest. If your current score qualifies you for the job you want, retaking without consistent preparation could cost you that position.",
              },
            },
            {
              "@type": "Question",
              name: "Does taking the ASVAB in high school count toward my retake waiting period?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The student ASVAB and the enlistment ASVAB are tracked separately. Taking the ASVAB in high school does not start the 1-1-6 clock. When you take your first enlistment ASVAB at MEPS, that's your initial test for retake purposes.",
              },
            },
            {
              "@type": "Question",
              name: "What triggers an ASVAB confirmation test?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A gain of 20 or more AFQT points within a 6-month period triggers a C-Test. You take it at MEPS immediately, with no waiting period. To pass, your C-Test AFQT can't drop more than half the original gain. If you pass, your retest score is your enlistment score. If you fail, you wait 6 months to retest.",
              },
            },
            {
              "@type": "Question",
              name: "How long are ASVAB scores valid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Standard ASVAB scores are valid for 2 years from your test date. Verified PiCAT scores are valid for 5 years. After expiration, you must retest before enlisting, though most branches authorize the retest without applying standard waiting-period restrictions from your previous tests.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the PiCAT if I'm unhappy with my score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The PiCAT can only be taken once. If you need to improve your score, you must take the full CAT-ASVAB at MEPS under standard conditions, subject to the 1-1-6 waiting period rules.",
              },
            },
            {
              "@type": "Question",
              name: "What happens if my ASVAB was cancelled because of a fire drill?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "An administrative invalidation does not count as a test attempt. You can reschedule without any waiting period. Only cheating-related invalidations trigger the 6-month wait.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Retake Policy 2026: What the Rules Actually Say
        </h1>

        <p className="mt-4 text-text-secondary">
          Most people assume the military keeps their best ASVAB score. It
          doesn&apos;t. Your most recent score is your official score, and that
          one rule changes the calculation for every retake decision you&apos;ll
          make.
        </p>

        <p className="text-text-secondary">
          The <strong>ASVAB retake policy</strong> starts with the DoD&apos;s
          1-1-6 waiting period rule. But each branch layers its own restrictions
          on top, and some of those restrictions permanently close the retake
          window once you sign into DEP.
        </p>

        <p className="text-text-secondary">
          This article covers the complete retake policy: waiting periods, the
          most-recent-score rule, branch-specific DEP restrictions, C-Test
          triggers, score expiration, and PiCAT implications. If you want the
          step-by-step process for scheduling a retest, see our guide on{" "}
          <Link href="/how-to-retake-the-asvab" className="text-accent hover:text-accent-hover">
            how to retake the ASVAB
          </Link>
          .
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent ASVAB score replaces all previous scores. If you
            scored a 72 and retake for a 58, you&apos;re now officially a 58.
            Read before you retake.
          </p>
        </aside>

        {/* Section 1: The 1-1-6 Waiting Period Rule */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The 1-1-6 Waiting Period Rule
        </h2>

        <p className="mt-4 text-text-secondary">
          The DoD baseline is clean and simple. After your initial test, you
          wait one month. After your first retest, you wait one more month.
          After your second retest, you wait six months between every subsequent
          attempt.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Initial Test</p>
            <p className="mt-1 text-sm text-text-secondary">Take your first ASVAB</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Wait 1 Month</p>
            <p className="mt-1 text-sm text-text-secondary">Eligible for first retest</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Wait 1 More Month</p>
            <p className="mt-1 text-sm text-text-secondary">Eligible for second retest</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Wait 6 Months</p>
            <p className="mt-1 text-sm text-text-secondary">
              Required between every test after that (no lifetime cap)
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          There is no lifetime cap on ASVAB attempts. You can retake as many
          times as you need, subject to the waiting periods.
        </p>

        <p className="text-text-secondary">
          The clock starts from your actual test date, not from when you receive
          your score report. If your first retest was March 20, your second
          retest is eligible on April 20 or later. The day matters, not the
          week.
        </p>

        <p className="text-text-secondary">
          Two points about the 1-1-6 rule that regularly trip up applicants:
        </p>

        <p className="text-text-secondary">
          First, it applies equally whether your initial test was a student
          ASVAB or an enlistment ASVAB. The policy doesn&apos;t care which type
          of test started the clock, and it applies uniformly across all test
          formats, whether you&apos;re taking the CAT-ASVAB at MEPS or a P&amp;P
          version at a MET site.
        </p>

        <p className="text-text-secondary">
          Second, the rule is the DoD floor only. The 1-1-6 rule tells you the
          earliest possible date you can retest. Whether your branch will
          actually authorize a retest at that date is governed by
          branch-specific policy, which is covered below.
        </p>

        <p className="text-text-secondary">
          The waiting periods exist for a reason. A recruit who retakes after
          three weeks of scattered study is worse off than one who waits the
          full month and works through a structured plan. Before scheduling any
          retest, your{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            ASVAB practice test
          </Link>{" "}
          scores should consistently exceed your current score across multiple
          sessions. Occasional spikes don&apos;t count. The ASVAB retake policy
          gives you time to use correctly.
        </p>

        {/* Section 2: Most Recent Score */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Rule That Surprises Every Retaker: Your Latest Score Wins
        </h2>

        <p className="mt-4 text-text-secondary">
          The military does not keep your best ASVAB score. It keeps your most
          recent one.
        </p>

        <p className="text-text-secondary">
          Every score you&apos;ve ever recorded is in the system. But the score
          your recruiter uses for job matching and enlistment eligibility is the
          one from your most recent test. If you scored a 72, retake and get a
          58, your official AFQT is now 58. The 72 is gone.
        </p>

        <p className="text-text-secondary">
          Here&apos;s a concrete example of how this plays out. An applicant
          scores a 54, which qualifies them for most Army jobs but not the ones
          they want (say, intelligence roles requiring 105+ GT). They study
          hard, feel prepared, and retake. They get a 49. They&apos;ve now lost
          their original qualifying score and dropped below the Army minimum for
          many roles. That 49 is their record until they wait out another retest
          window.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Before scheduling your retake, your practice test scores should be
            consistently above your current score across four or more sessions,
            not just occasionally higher. One strong practice session is not a
            green light.
          </p>
        </aside>

        <p className="text-text-secondary">
          The standard benchmark: if your last four practice tests average above
          your current official score, you&apos;re likely ready. If those scores
          vary widely, give it more time and target the specific subtests
          dragging down your AFQT. Remember that Verbal Expression (VE) is
          doubled in the AFQT formula, so every point gained in Word Knowledge
          or Paragraph Comprehension counts twice. Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            ASVAB score calculator
          </Link>{" "}
          to model which subtests will move your AFQT the most.
        </p>

        <p className="text-text-secondary">
          A focused 4 to 6 week study window typically produces a 5 to 15
          percentile point improvement. That range is wide because it depends on
          your starting point and the quality of your study approach, not just
          the time you put in.
        </p>

        {/* Section 3: Branch-Specific Rules */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Branch-Specific Rules and DEP Restrictions
        </h2>

        <p className="mt-4 text-text-secondary">
          The 1-1-6 rule is the floor. Your branch sets the ceiling, and for
          Air Force DEP members, that ceiling is zero.
        </p>

        <p className="text-text-secondary">
          Each branch applies its own eligibility filter on top of the DoD
          baseline. Pre-DEP, the rules are fairly permissive across most
          branches. Once you&apos;re in DEP, some branches lock the retake
          window shut entirely.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pre-DEP Retake</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">In-DEP Retake</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">When Authorized</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">Limited</td>
                <td className="py-2">Expired score; failed to qualify; unusual circumstances only. Cannot retake to boost an already-qualifying score.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">Limited</td>
                <td className="py-2">DEP Enrichment Program for AFQT 28&ndash;30 only. Must score 31+ to access active duty.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">Rarely</td>
                <td className="py-2">Only when your current line scores can&apos;t match you to an Air Force AFSC. DEP is otherwise permanently locked.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Marines</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">Yes (recruiter request)</td>
                <td className="py-2">Expired score, or recruiter believes score doesn&apos;t reflect true ability.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">With approval</td>
                <td className="py-2">Score improvement for a specific enlistment option; recruiter must approve.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4">Rarely</td>
                <td className="py-2">Follows Air Force policy entirely. No separate Space Force ASVAB retake policy.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Air Force:</strong> The ASVAB retake policy for the Air Force
          is the most restrictive of any branch. Once you sign DEP, you cannot
          retake. The single exception is when your current line scores make it
          impossible to match you with any available AFSC. That&apos;s a narrow
          carve-out that doesn&apos;t apply to applicants who simply want a
          better job. Air Force applicants should treat their pre-DEP test as
          their one realistic opportunity to establish a strong score.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Air Force applicants must be satisfied with their ASVAB scores
            before signing DEP. There is no second chance once you&apos;re in.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>Navy:</strong> The DEP Enrichment Program applies only to high
          school diploma holders who scored AFQT 28 to 30. Those applicants can
          be provisionally enlisted, receive structured academic training, then
          retest. They must score 31 or higher to access active duty. This
          isn&apos;t an upgrade path for people who want better ratings.
          It&apos;s a mechanism to bring borderline-qualifying applicants up to
          minimum standard.
        </p>

        <p className="text-text-secondary">
          <strong>Army:</strong> Army applicants often assume they can retake to
          qualify for a better MOS. They can&apos;t. The Army authorizes
          retesting only for three reasons: expired scores, failure to meet the
          minimum AFQT for enlistment, or unusual circumstances that prevented
          normal test completion. An already-qualifying score doesn&apos;t
          unlock a retake, regardless of which jobs it does or doesn&apos;t
          open.
        </p>

        <p className="text-text-secondary">
          <strong>Marines and Coast Guard:</strong> Recruiter discretion plays a
          meaningful role in both branches. USMC recruiters can request a retest
          when they believe a score doesn&apos;t reflect a candidate&apos;s true
          capability, experience, or education level. Coast Guard recruiters can
          authorize a 30-day retest with substantial evidence. For both,
          it&apos;s worth raising the question with your recruiter if you have a
          specific reason your performance was off. Check{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">
            ASVAB scores explained
          </Link>{" "}
          to understand how your line scores affect job matching before that
          conversation.
        </p>

        {/* Section 4: C-Test */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The C-Test: What Happens When Your Score Jumps 20+ Points
        </h2>

        <p className="mt-4 text-text-secondary">
          Score 20 or more AFQT points higher within a 6-month period and the
          military schedules an integrity check. That check is called a
          Confirmation Test, or C-Test. It&apos;s not a punishment and
          it&apos;s not an accusation of cheating. It&apos;s a routine
          verification triggered by a statistically unusual score jump.
        </p>

        <p className="text-text-secondary">
          Most applicants who trigger a C-Test pass without any trouble. The
          threshold is designed to catch impersonation and coaching fraud, not
          honest improvement by a motivated applicant who actually studied.
        </p>

        <p className="text-text-secondary">
          <strong>What the C-Test is:</strong> A full ASVAB administered only at
          MEPS. Not at a school. Not at a MET site. You take it immediately
          after your recruiter processes the gain, with no waiting period. Your
          recruiter schedules it and it happens as soon as MEPS can accommodate
          you. The test itself is a standard full-length CAT-ASVAB with a
          different question set than your retest.
        </p>

        <p className="text-text-secondary">
          The C-Test doesn&apos;t produce a score that replaces your retest. Its
          only job is to confirm your retest was authentic.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">C-Test Result</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What Happens</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AFQT doesn&apos;t drop more than half the gain</td>
                <td className="py-2">Pass. Your retest score counts for enlistment.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AFQT drops more than half the gain</td>
                <td className="py-2">Fail. Wait 6 months from C-Test date to retest.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">C-Test no-show</td>
                <td className="py-2">6-month wait from the Critical Gain Retest date.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>The passing math:</strong> If you gained 24 points (say you
          went from 15 to 39), your C-Test AFQT must not fall below 27.
          That&apos;s your retest score of 39 minus half of 24, which equals 12,
          subtracted from 39. A C-Test AFQT of 28 passes. A C-Test AFQT of 26
          fails. The formula gives you meaningful room. You don&apos;t need to
          replicate your exact retest score.
        </p>

        <p className="text-text-secondary">
          If you pass, your enlistment score is the retest result (39 in this
          example), not the C-Test score. The C-Test is invisible to your
          job-matching process as long as you pass.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            After a C-Test is administered, you can no longer take the
            pencil-and-paper ASVAB. All future retests will be the CAT-ASVAB at
            MEPS.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you miss your C-Test appointment, the 6-month clock starts from
          the Critical Gain Retest date, not the date you missed. A no-show is
          not neutral. It triggers the same 6-month wait as a failed C-Test.
        </p>

        {/* Section 5: Score Expiration */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Score Expiration: The 2-Year Clock
        </h2>

        <p className="mt-4 text-text-secondary">
          ASVAB scores are valid for exactly 2 years from your test date for
          enlistment purposes. After that, they expire and can&apos;t be used to
          enlist.
        </p>

        <p className="text-text-secondary">
          Score expiration creates two distinct situations:
        </p>

        <p className="text-text-secondary">
          <strong>Forced retake:</strong> If you&apos;re in DEP and your ship
          date gets pushed past the 2-year mark from your original test, your
          scores expire and you must retest before accessing active duty. This is
          enforced across all branches regardless of score level. A 99 AFQT that
          expires still requires a retest.
        </p>

        <p className="text-text-secondary">
          <strong>Unexpected retake opportunity:</strong> If your scores expired
          before you enlisted, most branches authorize a fresh retest without
          counting it under the standard 1-1-6 restrictions from your previous
          tests. An expired score is effectively no score for waiting-period
          purposes. For Army DEP members looking for a retake pathway, score
          expiration is one of the three authorized triggers, and it&apos;s the
          most clear-cut of the three.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            PiCAT scores (if verified through the VTest) are valid for 5 years,
            not 2. That&apos;s more than twice the standard ASVAB validity
            period.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you&apos;re in a long DEP window and your original test is
          approaching 2 years old, check with your recruiter before it lapses.
          Some applicants with 18-to-24-month DEP commitments discover their
          scores expired without realizing the clock was running.
        </p>

        {/* Section 6: PiCAT */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The PiCAT: One Shot, Different Rules
        </h2>

        <p className="mt-4 text-text-secondary">
          An increasing number of recruits take the PiCAT instead of the
          standard ASVAB. The retake rules are fundamentally different,
          primarily because you can&apos;t retake the PiCAT at all.
        </p>

        <p className="text-text-secondary">
          The PiCAT (Prescreen Internet-Delivered Computer Adaptive Test) is an
          unproctored, full-ASVAB-length test taken from home. It covers all the
          same content as the ASVAB and produces scores that work the same way.
          It&apos;s available to applicants who have never taken the ASVAB
          before. After completing it, you must take a 25 to 30 minute
          verification test called the VTest in person at a METS or MEPS site
          within 45 days. The VTest doesn&apos;t produce its own score. It
          exists only to confirm your PiCAT performance was authentic.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            The VTest must be completed within 45 days of your PiCAT date. If
            that window closes before you make it in, contact your recruiter
            immediately. The 45-day deadline is firm.
          </p>
        </aside>

        <p className="text-text-secondary">
          If your VTest confirms your PiCAT results, your scores become your
          official ASVAB scores of record and are valid for 5 years. If your
          VTest doesn&apos;t match your PiCAT performance closely enough, you
          must take the full CAT-ASVAB at MEPS under standard conditions. You
          cannot take the PiCAT again. That option is gone.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The PiCAT is a one-shot deal. If your practice scores aren&apos;t
            consistently where you need them, take the standard ASVAB instead.
            It&apos;s retakable under the 1-1-6 rule. The PiCAT isn&apos;t.
          </p>
        </aside>

        <p className="text-text-secondary">
          The practical difference: the standard ASVAB gives you a known retake
          path if your score isn&apos;t what you needed. The PiCAT trades that
          flexibility for the convenience of testing from home. For applicants
          who are well-prepared and just want to avoid an early MEPS trip,
          it&apos;s a good option. For applicants who aren&apos;t confident in
          their scores, the standard test is the lower-risk path. See{" "}
          <Link href="/what-is-the-asvab" className="text-accent hover:text-accent-hover">
            what is the ASVAB
          </Link>{" "}
          for a full comparison of CAT-ASVAB, P&amp;P ASVAB, and PiCAT formats.
        </p>

        {/* Section 7: Special Scenarios */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Special Scenarios: Edge Cases in the Official Policy
        </h2>

        <p className="mt-4 text-text-secondary">
          The official DoD policy covers seven specific scenarios beyond the
          standard 1-1-6 rule. Most people only know three of them.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Scenario</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Does It Count as a Test?</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Waiting Period</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Test cancelled for admin reasons (fire drill, power outage)</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">None. Reschedule based on MEPS availability.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Test invalidated for cheating</td>
                <td className="py-2 pr-4">Yes (and flags your record)</td>
                <td className="py-2">6 months mandatory.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">C-Test no-show</td>
                <td className="py-2 pr-4">Original retest counts</td>
                <td className="py-2">6 months from Critical Gain Retest date.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">High school student ASVAB</td>
                <td className="py-2 pr-4">No (separate tracking)</td>
                <td className="py-2">Can take enlistment ASVAB without waiting.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Expired scores</td>
                <td className="py-2 pr-4">Score gone, doesn&apos;t count</td>
                <td className="py-2">Retake authorized per branch rules, no prior-test wait.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Prior service returning</td>
                <td className="py-2 pr-4">Varies</td>
                <td className="py-2">Branch-specific. Confirm with recruiter.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Administrative invalidations</strong> do not count. If your
          test gets cancelled because of a fire drill, power failure, or similar
          non-fault situation, that attempt is not in your record. You can
          reschedule without any waiting period. The key requirement is that the
          invalidation was for an administrative reason, not a personal one (like
          leaving early or refusing to continue).
        </p>

        <p className="text-text-secondary">
          <strong>The high school ASVAB exception</strong> catches a lot of
          applicants by surprise. Taking the ASVAB in 10th or 11th grade does
          not start your retake clock for the enlistment process. The student
          ASVAB and the enlistment ASVAB are tracked separately in the ASVAB
          retake policy system. When you take your first enlistment ASVAB at
          MEPS, that&apos;s your initial test for the 1-1-6 waiting period,
          regardless of how recently you took a student ASVAB.
        </p>

        <p className="text-text-secondary">
          <strong>Cheating invalidations</strong> work the other way. A test
          flagged for cheating counts as a test attempt and starts a mandatory
          6-month wait. It also flags your record. The C-Test system exists in
          part to catch suspicious gains before a cheating determination is
          needed. A 20-point jump triggers a C-Test first. Only if the C-Test
          fails does the system move toward an invalidation review.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB if I&apos;m already in DEP?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends on your branch. Air Force DEP members cannot retake
              unless line scores prevent job matching. Navy DEP members can only
              retake through the DEP Enrichment Program (AFQT 28&ndash;30, must
              score 31+ to ship). Army DEP members can retake for expired scores,
              failure to qualify, or unusual circumstances. Marine Corps and
              Coast Guard allow retakes with recruiter discretion. See the branch
              policy table above for a full breakdown.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if I score lower on my ASVAB retake?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The lower score becomes your official ASVAB score. The military
              uses your most recent score, not your highest. If your current
              score qualifies you for the job you want, retaking without
              consistent preparation could cost you that position. Check what
              your current scores qualify you for with the{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">
                ASVAB score calculator
              </Link>{" "}
              before deciding whether a retake is worth the risk.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does taking the ASVAB in high school count toward my retake
              waiting period?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The student ASVAB and the enlistment ASVAB are tracked
              separately. Taking the ASVAB in high school does not start the
              1-1-6 clock. When you take your first enlistment ASVAB at MEPS,
              that&apos;s your initial test for retake purposes, regardless of
              when your high school test was.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What triggers an ASVAB confirmation test?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A gain of 20 or more AFQT points within a 6-month period triggers
              a C-Test. You take it at MEPS immediately, with no waiting period.
              To pass, your C-Test AFQT can&apos;t drop more than half the
              original gain. If you pass, your retest score is your enlistment
              score. If you fail, you wait 6 months to retest. After a C-Test,
              you can no longer take the pencil-and-paper ASVAB.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long are ASVAB scores valid?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Standard ASVAB scores are valid for 2 years from your test date.
              Verified PiCAT scores are valid for 5 years. After expiration, you
              must retest before enlisting, though most branches authorize the
              retest without applying standard waiting-period restrictions from
              your previous tests.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the PiCAT if I&apos;m unhappy with my score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The PiCAT can only be taken once. If you need to improve your
              score, you must take the full CAT-ASVAB at MEPS under standard
              conditions, subject to the 1-1-6 waiting period rules. If
              you&apos;re not confident in your preparation, take the standard
              ASVAB instead of the PiCAT. It preserves your retake options.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if my ASVAB was cancelled because of a fire drill?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              An administrative invalidation does not count as a test attempt.
              You can reschedule without any waiting period. Only
              cheating-related invalidations trigger the 6-month wait. If your
              test was cancelled for any non-fault reason, contact your recruiter
              to reschedule as soon as MEPS availability allows.
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
