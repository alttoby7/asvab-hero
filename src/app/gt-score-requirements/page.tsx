import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "GT Score Military: Requirements & the 110 Wall",
  description:
    "What a GT score is in the military, how it differs from AFQT, the thresholds for warrant officer, OCS, and 18X, and how to raise it. See where you stand.",
  alternates: {
    canonical: "https://asvabhero.com/gt-score-requirements",
  },
};

export default function GTScoreRequirementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "GT Score in the Military: What It Is and Why It Controls Your Career",
          description:
            "What a GT score is in the military, how it differs from AFQT, the thresholds for warrant officer, OCS, and 18X, and how to raise it. See where you stand.",
          url: "https://asvabhero.com/gt-score-requirements",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
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
              name: "What is a good GT score in the military?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A GT of 100 opens most technical jobs. A GT of 110 is the universal wall for officer programs, 18X Special Forces, cyber, and special-duty assignments. If advancement matters to you, treat 110 as the real target rather than the bare minimum to qualify for an entry-level MOS.",
              },
            },
            {
              "@type": "Question",
              name: "Is the GT score the same as the AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The AFQT is a 1 to 99 percentile that decides whether you can enlist. The GT is a standard-score composite, GT = VE + AR, that decides which jobs and programs you qualify for after you enlist. They share subtests but do different jobs.",
              },
            },
            {
              "@type": "Question",
              name: "How do I calculate my GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT = VE + AR, where VE is built from your Word Knowledge and Paragraph Comprehension scores and AR is Arithmetic Reasoning. The conversion is not a simple raw sum, so the easiest way to estimate it is the GT score calculator, which handles the VE conversion for you.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need for warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You need a GT of 110. AR 135-100 sets 110 as the qualifying minimum for any officer-producing program, and it is non-waiverable. That same 110 also gates OCS, Green to Gold, and Officer Candidate School, so it is the single number most warrant officer candidates have to clear.",
              },
            },
            {
              "@type": "Question",
              name: "Can I raise my GT score after I enlist?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Active-duty soldiers raise their GT by retaking the AFCT, not the ASVAB, after prepping through a free Army program. The BSEP course targets the three GT subtests and reports an average gain of 19 points, which is enough to move many soldiers from the high 90s past 110.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need for 18X Special Forces?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The 18X Special Forces candidate contract requires a minimum GT of 110, along with other line-score and physical standards. A recruit who falls a few points short can study and retest before shipping, or enlist into a different MOS and pursue Special Forces on an in-service path later.",
              },
            },
            {
              "@type": "Question",
              name: "Why is 110 the magic number?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Because one regulation, AR 135-100, sets GT 110 as the non-waiverable floor for every officer-producing program. Since the requirement lives in a single rule, the same number ends up gating warrant officer, OCS, Green to Gold, and several special-duty assignments all at once.",
              },
            },
          ],
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "GT Score", href: "/gt-score" },
          { name: "GT Score Requirements", href: "/gt-score-requirements" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          GT Score in the Military: What It Is and Why It Controls Your Career
        </h1>

        <p className="mt-4 text-text-secondary">
          A soldier can have a flawless record, a fistful of awards, and a
          packet ready to submit, and still get told no. Not because of
          leadership, fitness, or attitude. Because of one number.
        </p>

        <p className="text-text-secondary">
          That number is your <strong>GT score</strong>. Your military career
          turns on it, and almost every advancement gate in the Army runs
          through this one figure. Warrant officer, OCS, Green to Gold, Special
          Forces, cyber, drill sergeant, recruiter. Most of them share the same
          wall, and the wall is 110.
        </p>

        <p className="text-text-secondary">
          This page explains what the GT score actually is, how it differs from
          your AFQT, what specific GT thresholds unlock by goal, and exactly how
          to raise it. If you want a fast number to work from,{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            estimate your GT with the calculator
          </Link>{" "}
          before you read on.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT decides whether you can enlist. Your GT decides what you
            can become after you do. For advancement, 110 is the most important
            number on your score sheet.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What a GT Score Actually Is
        </h2>

        <p className="mt-4 text-text-secondary">
          Roughly half the GT articles online get the formula wrong, so start
          here.
        </p>

        <p className="text-text-secondary">
          GT stands for <strong>General Technical</strong>. It is a composite
          line score, not a percentile. While your AFQT compares you to a
          national sample, your GT is a standard score that the military uses to
          match you to jobs and programs. If this is the first time you have run
          into the term, start with our plain-language explainer of{" "}
          <Link
            href="/gt-score"
            className="text-accent hover:text-accent-hover"
          >
            what a GT score is
          </Link>
          .
        </p>

        <p className="text-text-secondary">The formula is short:</p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE is <strong>Verbal Expression</strong>, a combined score built from
          your Word Knowledge (WK) and Paragraph Comprehension (PC) raw scores.
          AR is <strong>Arithmetic Reasoning</strong>. So your GT is driven by
          exactly three subtests: WK, PC, and AR.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A lot of sites claim the Army GT is just WK + AR + PC added together,
            or that Marines tack on Mechanical Comprehension. Both are wrong.
            Army and Marine GT use the same VE + AR formula, where VE is
            converted from WK and PC, not summed raw.
          </p>
        </aside>

        <p className="text-text-secondary">
          The Air Force does not call it GT at all. It uses a General (G)
          aptitude area with the same VE + AR makeup but a different scale, so an
          Air Force &ldquo;G&rdquo; number will not match an Army GT number. The
          thing every branch shares is the trio of subtests that feed it: verbal
          comprehension and arithmetic reasoning, the skills that show up in
          nearly every job that involves training, problem solving, or
          communication.
        </p>

        <p className="text-text-secondary">
          For the full formula breakdown and branch-by-branch differences, see
          the{" "}
          <Link
            href="/gt-score"
            className="text-accent hover:text-accent-hover"
          >
            complete GT score guide
          </Link>
          . To run your own numbers, use the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT vs AFQT: The Two-Gate System
        </h2>

        <p className="mt-4 text-text-secondary">
          You can clear the enlistment gate and still be locked out of the job
          you want. That trips up a lot of people.
        </p>

        <p className="text-text-secondary">
          Think of it as two gates. Gate one is the <strong>AFQT</strong>, a
          percentile from 1 to 99 that decides whether you qualify to enlist at
          all. Gate two is your <strong>GT and the other line scores</strong>,
          standard scores that decide which jobs and programs you can actually
          pursue once you are in.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Feature
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFQT
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it controls
                </td>
                <td className="py-2 pr-4">Whether you can enlist</td>
                <td className="py-2">
                  Which jobs and programs you qualify for
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Scale
                </td>
                <td className="py-2 pr-4 font-mono">Percentile, 1 to 99</td>
                <td className="py-2 font-mono">
                  Standard score, typically 50 to 130+
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it measures
                </td>
                <td className="py-2 pr-4">
                  Overall trainability vs a national sample
                </td>
                <td className="py-2">Verbal and arithmetic reasoning</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Subtests used
                </td>
                <td className="py-2 pr-4 font-mono">AR, MK, WK, PC</td>
                <td className="py-2 font-mono">AR, WK, PC (via VE)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Both pull from Arithmetic Reasoning, Word Knowledge, and Paragraph
          Comprehension, so studying for one usually lifts the other. That
          overlap is the reason GT prep is efficient.
        </p>

        <p className="text-text-secondary">
          Here is the trap in real numbers. A recruit with a 58 AFQT can enlist
          in any branch. But if that same recruit has a GT of 95, they are
          locked out of intelligence jobs that want GT 110 and combat medic that
          wants GT 107. The eligibility number looked fine. The career number
          did not.
        </p>

        <p className="text-text-secondary">
          For the AFQT side of the picture, read the{" "}
          <Link
            href="/afqt-score"
            className="text-accent hover:text-accent-hover"
          >
            AFQT score breakdown
          </Link>
          . For every branch minimum in one place, see the{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements hub
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Thresholds by Goal
        </h2>

        <p className="mt-4 text-text-secondary">
          Find your number on the table and you will know in about ten seconds
          what it unlocks.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Band
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Unlocks
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  Below 90
                </td>
                <td className="py-2">
                  Entry level only. Many technical and elite MOS are closed.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  90 to 99
                </td>
                <td className="py-2">A broad set of enlisted jobs opens up.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  100 to 109
                </td>
                <td className="py-2">
                  Most technical MOS, including many intelligence and medical
                  roles.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  110 and up
                </td>
                <td className="py-2">
                  The wall clears: warrant officer, OCS, Green to Gold, 18X,
                  cyber, drill sergeant, recruiter.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Specific jobs cluster right in that 100 to 110 band, which is why so
          many recruits and soldiers obsess over a handful of points:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              35F Intelligence Analyst
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 101</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              68W Combat Medic
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 107</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              09L Interpreter/Translator
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              17C Cyber Operations Specialist
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110+</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              18X Special Forces Candidate
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
        </div>

        <p className="text-text-secondary">
          Notice how tightly those numbers stack. The gap between a combat medic
          at 107 and the officer-program floor at 110 is three points, often a
          single subtest question or two. That is why soldiers who land in the
          high 90s or low 100s rarely shrug it off. A few raw points decide
          whether an entire tier of jobs and programs is open or closed.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            110 matters more than any other GT number because it is the floor
            for advancement, not just for jobs. Below it you can still build a
            career. At or above it, the officer and special-duty doors all unlock
            at once.
          </p>
        </aside>

        <p className="text-text-secondary">
          GT requirements shift by branch and get updated over time, so treat
          these as a starting point and confirm the current cutoff for your
          specific goal with your recruiter or an official source. To match your
          scores against Army jobs, use the{" "}
          <Link
            href="/army-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Army ASVAB score guide
          </Link>
          , check which jobs open up across all branches with the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            score calculator
          </Link>
          , and model a target number with the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why GT 110 Is the Wall: Warrant Officer, OCS, and Green to Gold
        </h2>

        <p className="mt-4 text-text-secondary">
          One regulation locks the same door for warrant officer, OCS, and Green
          to Gold, at exactly 110, with no waiver.
        </p>

        <p className="text-text-secondary">
          That regulation is <strong>AR 135-100</strong>, which governs the
          appointment of commissioned and warrant officers. It sets GT 110 as
          the qualifying minimum for any officer-producing program, and it is
          non-waiverable. Not &ldquo;usually 110.&rdquo; Not &ldquo;110 unless
          your record is strong.&rdquo; Exactly 110, every time.
        </p>

        <p className="text-text-secondary">
          Because the floor lives in one rule, the same number gates a long list
          of programs:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Warrant Officer (WOCS)
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Officer Candidate School (OCS)
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Green to Gold
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              18X Special Forces
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              17C Cyber Operations
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Drill Sergeant and Recruiter duty
            </p>
            <p className="mt-1 text-sm text-text-secondary">GT 110</p>
          </div>
        </div>

        <p className="text-text-secondary">
          Some of these layer on extra requirements. Green to Gold also wants a
          minimum of two years of active duty, an ACFT pass within the last six
          months, a 2.5 GPA, and a ROTC acceptance letter. Of all those boxes,
          GT is the only one with zero waiver path. You can request exceptions on
          the others. You cannot on the 110.
        </p>

        <p className="text-text-secondary">
          The logic behind the rule is consistency. Every officer-producing
          program funnels through the same minimum, so a board never has to
          decide whether a 105 from one soldier is &ldquo;close enough&rdquo;
          while a 108 from another is not. The line is bright on purpose, and it
          does not bend for a strong evaluation report or a deployment record.
        </p>

        <p className="text-text-secondary">
          That is why a soldier sitting at GT 101 with an otherwise strong file
          feels stuck. One number blocks warrant officer, OCS, Green to Gold,
          18X, and special-duty assignments at the same time. The fix is not a
          better packet. The fix is a higher GT, and the next two sections cover
          exactly how to get there whether you are still a recruit or already in
          uniform.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Raise Your GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          Your GT comes from only three subtests, so the study load is narrower
          than you think.
        </p>

        <p className="text-text-secondary">
          Because GT = VE + AR, you only have to move Word Knowledge, Paragraph
          Comprehension, and Arithmetic Reasoning. Ignore the rest of the ASVAB
          while you chase GT. Here is the order that gets the most points per
          hour:
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Take a diagnostic to find your current AR, WK, and PC standard
            scores.
          </li>
          <li>
            Attack Arithmetic Reasoning first. Translate word problems into
            equations on paper and drill timed sets.
          </li>
          <li>
            Build Verbal Expression next. For WK, learn vocabulary in context,
            not flashcard definitions. For PC, read the questions before the
            passage.
          </li>
          <li>
            Raise weak areas before polishing strong ones. Moving a 45 to a 55
            buys more points than nudging a 55 to a 58.
          </li>
          <li>
            Run full, timed sections weekly and review every wrong answer until
            the pattern is automatic.
          </li>
        </ol>

        <p className="text-text-secondary">
          A worked example shows how fast this moves. A recruit with WK 48, PC
          46, and AR 50 lands around GT 100. Raising those to WK 54, PC 52, and
          AR 56 lifts the GT to roughly 112, clearing the 110 wall. That gain is
          realistic in four to six weeks of focused work.
        </p>

        <p className="text-text-secondary">
          The math behind that jump is worth seeing. Six points on each subtest
          is not a transformation, it is steady reps. AR responds fastest
          because most of its difficulty is translation, turning a sentence into
          an equation, rather than advanced math. Word Knowledge climbs with
          daily exposure, and Paragraph Comprehension improves the moment you
          start reading the questions before the passage so you know what to hunt
          for.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Studying for your GT raises your AFQT at the same time. Both scores
            pull from AR, WK, and PC, so every point you earn counts twice across
            your record.
          </p>
        </aside>

        <p className="text-text-secondary">
          Start by finding your baseline with a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice test
          </Link>
          , then use the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>{" "}
          to model exactly how many points each subtest gain adds to your GT.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Raising GT After You Enlist: BSEP, FAST, and the AFCT
        </h2>

        <p className="mt-4 text-text-secondary">
          You are already in, you need 110 for a packet, and the MEPS recruiter
          route is gone. The in-service path works differently.
        </p>

        <p className="text-text-secondary">
          Active-duty soldiers do not retake the ASVAB. You raise your GT with
          the <strong>AFCT</strong> (Armed Forces Classification Test), taken at
          your installation testing facility, not at MEPS. Take it in the wrong
          place and the wrong test gets administered, or none at all.
        </p>

        <p className="text-text-secondary">
          Two free Army programs prep you for it.{" "}
          <strong>BSEP</strong> (Basic Skills Education Program) runs 40 hours in
          person plus 20 hours online and targets the exact three subtests that
          build GT: Word Knowledge, Paragraph Comprehension, and Arithmetic. The
          reported average GT increase after BSEP is 19 points.{" "}
          <strong>FAST</strong> (Functional Academic Skills Training) is a longer
          option, roughly 80 hours per subject, with placement testing for
          eligibility.
        </p>

        <p className="text-text-secondary">The in-service workflow runs in order:</p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 1</p>
            <p className="mt-1 text-sm text-text-secondary">
              Enroll in BSEP or FAST through your installation education center.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 2</p>
            <p className="mt-1 text-sm text-text-secondary">
              Take the GT predictor test, with up to 30 days to study for it.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 3</p>
            <p className="mt-1 text-sm text-text-secondary">
              Score above 100 on the predictor to clear you for the AFCT.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 4</p>
            <p className="mt-1 text-sm text-text-secondary">
              Take the AFCT at the installation testing facility.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 5</p>
            <p className="mt-1 text-sm text-text-secondary">
              Submit your packet once your GT is 110 or higher.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your new AFCT score replaces your old one even if it is lower. There
            is no keeping your higher number. Only retest when your practice
            scores are consistently above your target.
          </p>
        </aside>

        <p className="text-text-secondary">
          The Army also funds free online prep at march2success.com and
          official-asvab.com that you can use during the waiting period. For the
          full active-duty retest rules, see the{" "}
          <Link
            href="/afct"
            className="text-accent hover:text-accent-hover"
          >
            AFCT guide
          </Link>
          , and for a deeper look at the program that clears most warrant officer
          candidates, read the{" "}
          <Link
            href="/bsep"
            className="text-accent hover:text-accent-hover"
          >
            BSEP breakdown
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Bottom Line on Your GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          Two gates, one wall. Your AFQT gets you in the door. Your GT decides
          how far you go once you are inside. And for nearly every advancement
          program in the Army, the wall sits at 110.
        </p>

        <p className="text-text-secondary">
          Know your number and know the gap. If you are above 110, your options
          are wide open. If you are below it, the path is clear: drill the three
          subtests that feed GT, take a diagnostic, and retest when your practice
          scores hold above target.
        </p>

        <p className="text-text-secondary">
          The fastest first move is to see where you stand. Plug your scores into
          the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>{" "}
          to find your GT, then run a what-if with the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            score calculator
          </Link>{" "}
          to see which jobs and programs open up at your target number.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good GT score in the military?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A GT of 100 opens most technical jobs. A GT of 110 is the universal
              wall for officer programs, 18X Special Forces, cyber, and
              special-duty assignments. If advancement matters to you, treat 110
              as the real target rather than the bare minimum to qualify for an
              entry-level MOS.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the GT score the same as the AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The AFQT is a 1 to 99 percentile that decides whether you can
              enlist. The GT is a standard-score composite, GT = VE + AR, that
              decides which jobs and programs you qualify for after you enlist.
              They share subtests but do different jobs.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do I calculate my GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT = VE + AR, where VE is built from your Word Knowledge and
              Paragraph Comprehension scores and AR is Arithmetic Reasoning. The
              conversion is not a simple raw sum, so the easiest way to estimate
              it is the{" "}
              <Link
                href="/gt-score-calculator"
                className="text-accent hover:text-accent-hover"
              >
                GT score calculator
              </Link>
              . If you would rather work the math by hand, our{" "}
              <Link
                href="/gt-score"
                className="text-accent hover:text-accent-hover"
              >
                step-by-step guide to calculating a GT score
              </Link>{" "}
              shows the VE conversion in full.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need for warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You need a GT of 110. AR 135-100 sets 110 as the qualifying minimum
              for any officer-producing program, and it is non-waiverable. That
              same 110 also gates OCS, Green to Gold, and Officer Candidate
              School, so it is the single number most warrant officer candidates
              have to clear.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I raise my GT score after I enlist?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Active-duty soldiers raise their GT by retaking the AFCT, not
              the ASVAB, after prepping through a free Army program. The{" "}
              <Link
                href="/bsep"
                className="text-accent hover:text-accent-hover"
              >
                BSEP course
              </Link>{" "}
              targets the three GT subtests and reports an average gain of 19
              points, which is enough to move many soldiers from the high 90s
              past 110.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need for 18X Special Forces?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The 18X Special Forces candidate contract requires a minimum GT of
              110, along with other line-score and physical standards. A recruit
              who falls a few points short can study and retest before shipping,
              or enlist into a different MOS and pursue Special Forces on an
              in-service path later.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why is 110 the magic number?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Because one regulation, AR 135-100, sets GT 110 as the
              non-waiverable floor for every officer-producing program. Since the
              requirement lives in a single rule, the same number ends up gating
              warrant officer, OCS, Green to Gold, and several special-duty
              assignments all at once.
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

        <div className="not-prose">
          <RelatedLinks
            title="GT score and ASVAB resources"
            links={[
              { href: "/gt-score", label: "GT Score Explained", blurb: "What the GT line score is and how it is built." },
              { href: "/asvab-scores-explained", label: "ASVAB Scores Explained", blurb: "How GT relates to your AFQT and other line scores." },
              { href: "/army-asvab-score", label: "Army ASVAB Score Requirements", blurb: "GT cutoffs for Army jobs and enlistment." },
              { href: "/mos-reclassification", label: "MOS Reclassification", blurb: "Raise your GT score to qualify for a new job." },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
