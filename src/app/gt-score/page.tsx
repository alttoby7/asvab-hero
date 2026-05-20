import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "What Is a GT Score? ASVAB GT Explained | ASVAB Hero",
  description:
    "Your GT score decides which military jobs you can hold. Learn the VE + AR formula, GT vs AFQT, what your number means, the 110 threshold, and how to raise it.",
  alternates: {
    canonical: "https://asvabhero.com/gt-score",
  },
};

export default function GTScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "GT Score: What It Is and Why It Decides Your Military Career",
          description:
            "Your GT score decides which military jobs you can hold. Learn the VE + AR formula, GT vs AFQT, what your number means, the 110 threshold, and how to raise it.",
          url: "https://asvabhero.com/gt-score",
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
              name: "Is the GT score the same as the AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The AFQT is a percentile from 1 to 99 that decides whether you can enlist. The GT score is a composite standard score that decides which jobs and programs you can hold once you are in. They share some subtests but use different formulas and different scales.",
              },
            },
            {
              "@type": "Question",
              name: "What is a good GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A GT of 100 is roughly average. A 110 is the threshold that opens officer, warrant, special operations, and most technical roles, so it is the number most people aim for. Anything above 110 is strong. What counts as good depends on the specific job you want.",
              },
            },
            {
              "@type": "Question",
              name: "How is the GT score calculated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT = VE + AR. VE (Verbal Expression) is a combined score from your Word Knowledge and Paragraph Comprehension results, and AR is Arithmetic Reasoning. So three subtests feed it: WK, PC, and AR.",
              },
            },
            {
              "@type": "Question",
              name: "Why does Word Knowledge matter so much for GT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The verbal half of your GT is VE, which comes from Word Knowledge and Paragraph Comprehension. Together those two subtests are half your GT score, so vocabulary and reading carry as much weight as all your math reasoning. Drilling vocabulary is one of the most efficient ways to move your GT.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need to be an officer or warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A GT of 110 is the qualifying minimum for Army officer-producing programs under AR 135-100, and warrant officer requires 110 with no waiver. Below 110 you cannot submit the packet.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force have a GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The Air Force and Space Force do not use a GT line score. They use four MAGE composites: Mechanical, Administrative, General, and Electronic. If you are headed for the Air Force, focus on those, not a GT.",
              },
            },
            {
              "@type": "Question",
              name: "Can I get a waiver for a GT below 110?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For Army warrant officer, no. The 110 minimum is nonwaivable. Other programs vary, but the reliable move is to raise the score rather than chase an exception. Active-duty soldiers do this through the AFCT and Army BSEP.",
              },
            },
            {
              "@type": "Question",
              name: "How fast can I raise my GT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Active-duty soldiers who complete the Army's roughly two-week BSEP course gain about 19 points on average, with some classes averaging 23. Future recruits can move their GT in a few weeks of focused prep on Word Knowledge, Paragraph Comprehension, and Arithmetic Reasoning.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          GT Score: What It Is and Why It Decides Your Military Career
        </h1>

        <p className="mt-4 text-text-secondary">
          You passed the ASVAB and you&apos;re cleared to enlist. One number you
          barely noticed will quietly control which jobs and programs you can
          ever reach: your <strong>GT score</strong>.
        </p>

        <p className="text-text-secondary">
          GT stands for General Technical. It is not the same thing as your
          AFQT, and it is not your overall ASVAB result. It is a separate
          composite that the services use to match you to careers.
        </p>

        <p className="text-text-secondary">
          Here is what we cover below: what a GT score actually is, the VE + AR
          formula behind it, how GT differs from the AFQT, what your specific
          number means, why 110 matters so much, how each branch handles it, and
          how to raise it. If you already have your subtest scores, run them
          through our{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>{" "}
          to see your number now.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What a GT Score Actually Is
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score report is full of two-letter codes. GT is one of the most
          important, and most people have no idea what it is.
        </p>

        <p className="text-text-secondary">
          GT, or General Technical, is a composite score. The services build it
          by combining specific subtest results, then use it to decide which
          jobs you can hold. It sits alongside other composites like Clerical,
          Electronics, and Mechanical Maintenance, each built from a different
          mix of subtests.
        </p>

        <p className="text-text-secondary">
          A GT score measures two things: how well you read and use language,
          and how well you reason through math word problems. That makes it the
          broadest, most widely-used composite, which is why so many jobs and
          programs gate on it.
        </p>

        <p className="text-text-secondary">
          Two things it is not. It is not a subtest you sit down and take. And
          it is not your overall ASVAB score. It is calculated from subtests you
          already completed.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT decides whether you can enlist. Your GT score decides
            which jobs and programs you can hold once you are in. They are two
            different numbers doing two different jobs.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the full map of how every line score works, see our{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements guide
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT Score Formula: VE + AR
        </h2>

        <p className="mt-4 text-text-secondary">
          Here is the part that confuses almost everyone. The formula on your
          score report is:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE stands for Verbal Expression. AR stands for Arithmetic Reasoning.
          The catch is that VE is not a test you take. It is a combined verbal
          score built from two subtests you did take: Word Knowledge (WK) and
          Paragraph Comprehension (PC). The scoring system adds those raw scores
          and converts the total through a standard table into your VE score.
        </p>

        <p className="text-text-secondary">
          So the three subtests that actually feed your GT are Word Knowledge,
          Paragraph Comprehension, and Arithmetic Reasoning. That is why a lot
          of websites write the GT score as WK + PC + AR. Same inputs, they just
          skip the VE step.
        </p>

        <p className="text-text-secondary">
          This matters because Word Knowledge and Paragraph Comprehension
          together make up half of your GT. Vocabulary and reading are not side
          subjects here. They are 50 percent of the score.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do not confuse the GT formula with the AFQT formula. The AFQT
            doubles the verbal half and adds Math Knowledge: AFQT = 2VE + AR +
            MK. The GT score counts verbal once and ignores MK entirely. Same
            family of subtests, different math.
          </p>
        </aside>

        <p className="text-text-secondary">
          Want the worked examples and branch math in detail? Our{" "}
          <Link
            href="/asvab-gt-score"
            className="text-accent hover:text-accent-hover"
          >
            complete ASVAB GT score guide
          </Link>{" "}
          breaks the calculation down step by step. To sharpen the inputs, see
          our{" "}
          <Link
            href="/asvab-word-knowledge-tips"
            className="text-accent hover:text-accent-hover"
          >
            Word Knowledge tips
          </Link>{" "}
          and{" "}
          <Link
            href="/asvab-arithmetic-reasoning-tips"
            className="text-accent hover:text-accent-hover"
          >
            Arithmetic Reasoning tips
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score vs AFQT Score: The Difference That Trips Everyone Up
        </h2>

        <p className="mt-4 text-text-secondary">
          Mixing up GT and AFQT is the single most common ASVAB scoring
          mistake. They are not the same number, not the same scale, and they do
          not do the same job.
        </p>

        <p className="text-text-secondary">
          Your AFQT is a percentile from 1 to 99. It is the first gate, and
          every branch uses it the same way: meet the minimum or you do not
          enlist. Your GT is a composite standard score, built differently, used
          to assign jobs and programs after you are in.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary"></th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFQT Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GT Score
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it is
                </td>
                <td className="py-2 pr-4">Enlistment percentile</td>
                <td className="py-2">Job-matching composite</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Scale
                </td>
                <td className="py-2 pr-4">1 to 99 percentile</td>
                <td className="py-2">Standard score, around 100 average</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Formula
                </td>
                <td className="py-2 pr-4 font-mono">2VE + AR + MK</td>
                <td className="py-2 font-mono">VE + AR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  What it gates
                </td>
                <td className="py-2 pr-4">Whether you can enlist at all</td>
                <td className="py-2">Which jobs and programs you qualify for</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Used by
                </td>
                <td className="py-2 pr-4">Every branch, first gate</td>
                <td className="py-2">
                  Army, Marines, Coast Guard, Navy job matching
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The minimums work differently too. AFQT minimums are branch percentile
          floors. The Coast Guard requires a minimum AFQT of 32 with a high
          school diploma, and the Air Force requires a minimum AFQT of 65 with a
          GED. None of those numbers are GT scores.
        </p>

        <p className="text-text-secondary">
          A high AFQT does not guarantee a high GT, and the reverse is also
          true. They share the WK, PC, and AR inputs, but the AFQT also leans on
          Math Knowledge while GT does not. For the AFQT side of the house, see
          our{" "}
          <Link
            href="/afqt-score"
            className="text-accent hover:text-accent-hover"
          >
            AFQT score guide
          </Link>
          . For branch-by-branch minimums, see our{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your GT Number Means: Ranges and How to Read It
        </h2>

        <p className="mt-4 text-text-secondary">
          You have a GT score. Is it good? That depends on what you want, but
          the scale gives you a rough read.
        </p>

        <p className="text-text-secondary">
          Every ASVAB subtest is reported as a standard score with a mean of 50
          and a standard deviation of 10, measured against a national sample of
          test-takers. Composite scores like GT are built from those, and they
          cluster around an average near 100. So a GT of 100 is roughly average,
          and a GT of 110 sits well above the middle of the pack.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Around 80 to 90
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Basic range. Qualifies you for entry-level jobs but limits your
              options.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Around 90 to 109
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Competitive. Opens a much wider set of technical jobs.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              110 and above
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Strong. Officer, warrant, and special operations doors open here.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Treat the precise statistics loosely. The exact composite standard
            deviation (often quoted as roughly 20) and the percentile
            conversions you see online (such as 110 equals about the 84th
            percentile) are derived estimates, not figures published by an
            official source. Use these as a rough guide, not gospel. The
            documented ceiling, however, is firm: Army Personnel Testing states
            144 is the highest possible GT score, and a soldier earned the first
            known perfect 144 on the AFCT in 2023. Ignore the 145 to 151 figures
            floating around online; those are unsourced blog lore.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the exact GT cutoffs tied to specific jobs, do not guess from the
          ranges above. Our{" "}
          <Link
            href="/gt-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            GT score requirements page
          </Link>{" "}
          lists the thresholds by program and MOS, and the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          shows which jobs your full score set qualifies you for across all six
          branches.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why 110 Is the GT Number Everyone Chases
        </h2>

        <p className="mt-4 text-text-secondary">
          If you spend any time around the Army, you will hear 110 over and
          over. There is a reason that number carries so much weight.
        </p>

        <p className="text-text-secondary">
          Army Regulation 135-100, which governs the appointment of commissioned
          and warrant officers, sets 110 as the qualifying minimum GT score for
          officer-producing programs. The U.S. Army Recruiting Command states
          plainly that a minimum GT score of 110 is required for warrant officer
          appointment, and that it is nonwaivable.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            A GT of 110 is the floor to even submit, or &ldquo;drop,&rdquo;
            packets for officer programs. Below 110, the application is not
            eligible in the first place.
          </p>
        </aside>

        <p className="text-text-secondary">
          What a GT of 110 commonly opens:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>Officer Candidate School and Green to Gold packets</li>
          <li>Warrant officer appointment (110 nonwaivable)</li>
          <li>
            Eligibility for nearly all of the Army&apos;s MOS, useful if you
            want to reclassify
          </li>
          <li>Consideration for special operations pipelines</li>
        </ul>

        <p className="text-text-secondary">
          On the special operations side, Army Special Forces (18X) generally
          requires a GT of 110 or higher, and Marine MARSOC has been cited at a
          GT of 105. UNVERIFIED: program-specific cutoffs other than the 110
          officer floor change with policy, so confirm current numbers before
          you bank on them.
        </p>

        <p className="text-text-secondary">
          For warrant officer specifically, there is no waiver below 110. The
          only path up is to raise the score. The full breakdown of GT
          thresholds by job lives on our{" "}
          <Link
            href="/gt-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            GT score requirements page
          </Link>
          , and the officer track is covered in our{" "}
          <Link
            href="/army-warrant-officer-requirements"
            className="text-accent hover:text-accent-hover"
          >
            Army warrant officer requirements
          </Link>{" "}
          guide.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How the GT Score Differs by Branch
        </h2>

        <p className="mt-4 text-text-secondary">
          People assume every branch builds and uses the GT score the same way.
          They do not, and acting on the wrong branch&apos;s rules will cost
          you.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Uses a GT score?
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  How it works
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">
                  GT = VE + AR. Its single most important line score.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">
                  GT = VE + AR. Some sources add Mechanical Comprehension
                  (UNVERIFIED).
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">A GT-style composite, VE + AR.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">Yes (listed)</td>
                <td className="py-2">
                  A GT (AR + VE) appears on the Navy line-score list, but
                  ratings are matched by rating-specific composites.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force / Space Force
                </td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">
                  No GT line score. Uses four MAGE composites: Mechanical,
                  Administrative, General, Electronic.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The big correction here is the Air Force. It does not have a GT score.
          If you want the Air Force or Space Force, the numbers that matter are
          the MAGE composites, not a GT. Plenty of websites get this wrong and
          tell Air Force applicants to chase a GT that does not exist for them.
        </p>

        <p className="text-text-secondary">
          The Army leans on GT harder than anyone, which is why nearly all the
          110 talk is Army talk. For the full set of branch minimums and how
          each service maps scores to jobs, see our{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Raise Your GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          A low GT is not permanent. There are two real paths up, and which one
          applies depends on whether you have enlisted yet.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Because Word Knowledge and Paragraph Comprehension make up the
            entire verbal half of your GT, vocabulary and reading are your
            highest-leverage study targets. Arithmetic Reasoning is the other
            half. Skip everything that does not feed those three.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>Before you enlist.</strong> Drill the three inputs that build
          GT: Word Knowledge, Paragraph Comprehension, and Arithmetic Reasoning.
          Take a full practice test to find your weak subtest, then retake the
          full ASVAB under the standard retake timing. Start with a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice test
          </Link>{" "}
          and check your projected number with the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
          .
        </p>

        <p className="text-text-secondary">
          <strong>Already serving.</strong> You do not retake the civilian
          ASVAB. You take the AFCT (Armed Forces Classification Test) instead.
          The Army runs a roughly two-week course called BSEP (Basic Skills
          Education Program) that preps the math and English portions that build
          your GT. Soldiers may retest up to three times on the AFCT, with
          documented prep required for each attempt. The Army reports an average
          GT gain of about 19 points from BSEP, with some classes averaging
          around 23 and individual reports of 30-point jumps.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent score replaces your previous one. It is not the
            highest score that counts. A poorly prepared retake can lower your
            GT, so do not test until your practice scores are consistently where
            you need them.
          </p>
        </aside>

        <p className="text-text-secondary">
          A higher GT is how active-duty soldiers reclassify into better jobs.
          See our{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP guide
          </Link>{" "}
          for the program in depth and our{" "}
          <Link
            href="/mos-reclassification"
            className="text-accent hover:text-accent-hover"
          >
            MOS reclassification guide
          </Link>{" "}
          for using the score once you have it.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the GT score the same as the AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The AFQT is a percentile from 1 to 99 that decides whether you
              can enlist. The GT score is a composite standard score that
              decides which jobs and programs you can hold once you are in. They
              share some subtests but use different formulas and different
              scales. See our{" "}
              <Link
                href="/afqt-score"
                className="text-accent hover:text-accent-hover"
              >
                AFQT score guide
              </Link>{" "}
              for the enlistment side.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A GT of 100 is roughly average. A 110 is the threshold that opens
              officer, warrant, special operations, and most technical roles, so
              it is the number most people aim for. Anything above 110 is
              strong. What counts as &ldquo;good&rdquo; depends on the specific
              job you want.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is the GT score calculated?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT = VE + AR. VE (Verbal Expression) is a combined score from your
              Word Knowledge and Paragraph Comprehension results, and AR is
              Arithmetic Reasoning. So three subtests feed it: WK, PC, and AR.
              Run your numbers through our{" "}
              <Link
                href="/gt-score-calculator"
                className="text-accent hover:text-accent-hover"
              >
                GT score calculator
              </Link>{" "}
              to see your result.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why does Word Knowledge matter so much for GT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The verbal half of your GT is VE, which comes from Word Knowledge
              and Paragraph Comprehension. Together those two subtests are half
              your GT score, so vocabulary and reading carry as much weight as
              all your math reasoning. Drilling vocabulary is one of the most
              efficient ways to move your GT.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need to be an officer or warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A GT of 110 is the qualifying minimum for Army officer-producing
              programs under AR 135-100, and warrant officer requires 110 with
              no waiver. Below 110 you cannot submit the packet. See our{" "}
              <Link
                href="/army-warrant-officer-requirements"
                className="text-accent hover:text-accent-hover"
              >
                Army warrant officer requirements
              </Link>{" "}
              for the full track.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Air Force have a GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The Air Force and Space Force do not use a GT line score. They
              use four MAGE composites: Mechanical, Administrative, General, and
              Electronic. If you are headed for the Air Force, focus on those,
              not a GT. Check the{" "}
              <Link
                href="/asvab-score-requirements"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB score requirements
              </Link>{" "}
              for the right numbers.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I get a waiver for a GT below 110?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              For Army warrant officer, no. The 110 minimum is nonwaivable.
              Other programs vary, but the reliable move is to raise the score
              rather than chase an exception. Active-duty soldiers do this
              through the AFCT and Army BSEP. See our{" "}
              <Link href="/bsep" className="text-accent hover:text-accent-hover">
                BSEP guide
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How fast can I raise my GT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Active-duty soldiers who complete the Army&apos;s roughly two-week
              BSEP course gain about 19 points on average, with some classes
              averaging 23. Future recruits can move their GT in a few weeks of
              focused prep on Word Knowledge, Paragraph Comprehension, and
              Arithmetic Reasoning. Start with a{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                free practice test
              </Link>
              .
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
