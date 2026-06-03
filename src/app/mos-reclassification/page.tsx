import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "MOS Reclassification: How to Reclass Army Jobs",
  description:
    "MOS reclassification step by step: eligibility, In/Out Calls, the line score your new MOS needs, the AFCT retake, DA Form 4187, and what changes.",
  alternates: {
    canonical: "https://asvabhero.com/mos-reclassification",
  },
};

export default function MOSReclassificationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "MOS Reclassification: How to Switch to a New Army Job",
          description:
            "MOS reclassification step by step: eligibility, In/Out Calls, the line score your new MOS needs, the AFCT retake, DA Form 4187, and what changes.",
          url: "https://asvabhero.com/mos-reclassification",
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
              name: "Do I lose my rank when I reclass to a new MOS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Army MOS reclassification is rank-protected. You keep your grade and your time in service. You are changing your job, not your pay grade, so an E-5 stays an E-5 after the move. The only rank-related limits are eligibility rules, such as the standard call applying to SSG and below.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need to reclass into a new MOS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You need to meet the line or composite score the target MOS requires, not your old job's score. Some are strict, like MOS 51C requiring a GT of 110. If your current score is short, retake the ASVAB through the AFCT. Plug your scores into our free calculator to see the gap.",
              },
            },
            {
              "@type": "Question",
              name: "Can I reclass if my target MOS is full?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not until the calls align. Your current MOS must be overstrength enough to release you (an out-call), and your target MOS must be understrength enough to accept you (an in-call). Your career counselor checks both in RETAIN. If the target is full, you wait for the next MILPER message that opens it.",
              },
            },
            {
              "@type": "Question",
              name: "How long does MOS reclassification take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It varies widely. Eligibility and counselor steps can move in weeks, but the real bottleneck is usually the school seat in ATRRS, which can push the timeline to several months for high-demand MOSs. Packet-and-board fields like 51C add a board cycle, with notification within 90 days of the board.",
              },
            },
            {
              "@type": "Question",
              name: "Is a DA Form 4187 required to reclass?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on your path. A reclass at your reenlistment window often runs through the reenlistment contract instead. A voluntary reclass outside that window typically uses a DA Form 4187, sometimes with a DA Form 1696. Your counselor confirms which form your situation needs.",
              },
            },
            {
              "@type": "Question",
              name: "What is the Navy or Air Force version of reclassing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Navy calls it a conversion, which changes your rating and often sends you to A-school. The Air Force and Space Force call it retraining, which changes your Control AFSC and runs through programs like the NCO Retraining Program. The Marine Corps calls it a lateral move. All of them still require meeting the new job's ASVAB score.",
              },
            },
          ],
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "How to Retake the ASVAB", href: "/how-to-retake-the-asvab" },
          { name: "MOS Reclassification", href: "/mos-reclassification" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          MOS Reclassification: How to Switch to a New Army Job
        </h1>

        <p className="mt-4 text-text-secondary">
          You want out of your current job and into a better one, but every
          answer you find drowns you in terms like &ldquo;In/Out Call,&rdquo;
          &ldquo;RETAIN,&rdquo; and &ldquo;RCN&rdquo; without explaining any of
          them. The move you are looking for is{" "}
          <strong>mos reclassification</strong>, and the first thing to know is
          that it is rank-protected. You keep your grade and your time in
          service. You change your MOS (Military Occupational Specialty), not your
          paycheck.
        </p>

        <p className="text-text-secondary">
          The catch is that reclass is gated by three things at the same time,
          not one. Your current MOS has to be overstrength enough to release you.
          Your target MOS has to be understrength enough to take you. And your
          ASVAB line score has to meet the new job&apos;s minimum.
        </p>

        <p className="text-text-secondary">
          This is the step-by-step walkthrough, in the order it actually happens.
          It is Army-focused because MOS is an Army term, but the Navy and Air
          Force have their own versions, covered at the end. Before you start,
          look up the line score for the MOS you want in our{" "}
          <Link
            href="/mos-asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            MOS ASVAB score requirements
          </Link>{" "}
          guide.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Three gates must align for a standard reclass: an out-call (your
            losing MOS is overstrength), an in-call (your gaining MOS is
            understrength), and a line score that meets the target MOS minimum.
            Miss any one and the move stalls.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 1: Confirm You Are Eligible to Reclass
        </h2>

        <p className="mt-4 text-text-secondary">
          Most soldiers wash out at the gate, not the finish line. Before you
          pick a job or talk to anyone, check whether you can even start.
        </p>

        <p className="text-text-secondary">
          A standard reclassification has a few hard eligibility rules:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Grade</p>
            <p className="mt-1 text-sm text-text-secondary">
              SSG (nonpromotable) and below, when your MOS is authorized by the
              IN/OUT call message. Higher grades and promotable soldiers face
              tighter rules.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Time to ETS
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              For a voluntary reclass outside your reenlistment window, you
              generally cannot be within 24 months of your ETS (AR 614-200, para
              3-17).
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Reenlistment eligibility
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You must be fully eligible to reenlist or extend per AR 601-280.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Target MOS call
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The MOS you want has to be open under a current IN/OUT call.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Special career fields add their own bars on top of these. MOS 51C
          (Acquisition NCO), for example, restricts applicants to SGT through SSG
          and bands them by time in service: under 10 years is eligible without a
          waiver, 10 to 12 years needs a waiver, and 12-plus years is ineligible.
        </p>

        <p className="text-text-secondary">
          If you clear the basics, you are ready to choose a target job. If you
          do not, your career counselor can tell you what is blocking you and
          whether a waiver exists.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 2: Pick a Target MOS and Check Its ASVAB Line Score
        </h2>

        <p className="mt-4 text-text-secondary">
          The MOS you want, not the one you have, sets the ASVAB bar. Every Army
          job maps to a composite score you must already meet, and a lot of
          soldiers pick a dream MOS before they find out it is out of reach.
        </p>

        <p className="text-text-secondary">
          The Army builds its job requirements from line scores: GT, CL, CO, EL,
          FA, GM, MM, OF, SC, and ST. Each one combines two to four ASVAB
          subtests, and each MOS requires a minimum on a specific line. MOS 51C,
          again, requires a GT of 110, and that one is non-waivable.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Built From
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example MOS Family
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GT (General Technical)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">
                  Intelligence, special programs, leadership tracks
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CO (Combat)
                </td>
                <td className="py-2 pr-4 font-mono">AR + CS + MC</td>
                <td className="py-2">Infantry and combat arms</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EL (Electronics)
                </td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2">Electronics and signal repair</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ST (Skilled Technical)
                </td>
                <td className="py-2 pr-4 font-mono">GS + VE + MK + MC</td>
                <td className="py-2">
                  Medical, intel analyst, technical fields
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Treat the table as orientation, not gospel. Exact minimums and subtest
          combinations change, so confirm the current requirement for your
          specific MOS.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Pull the exact line-score requirement before you commit. Look up your
            target job in our{" "}
            <Link
              href="/mos-asvab-score-requirements"
              className="text-accent hover:text-accent-hover"
            >
              MOS ASVAB score requirements
            </Link>{" "}
            guide, run the math in the{" "}
            <Link
              href="/asvab-line-score-calculator"
              className="text-accent hover:text-accent-hover"
            >
              line score calculator
            </Link>
            , and check the GT threshold against our{" "}
            <Link
              href="/gt-score-requirements"
              className="text-accent hover:text-accent-hover"
            >
              GT score requirements
            </Link>{" "}
            guide.
          </p>
        </aside>

        <p className="text-text-secondary">
          Once you have a target MOS and the score it demands, you can find out
          whether the door is actually open.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 3: See Your Career Counselor and Check the In/Out Call
        </h2>

        <p className="mt-4 text-text-secondary">
          Who actually starts a reclass? Not you, and not your squad leader.
          Every MOS reclassification runs through the career counselor, because
          they are the one who can read the IN/OUT call and pull your control
          number.
        </p>

        <p className="text-text-secondary">
          Here is what In/Out Call means in plain English. An out-call says your
          current MOS is overstrength, so the Army is willing to release you from
          it. An in-call says your target MOS is understrength, so the Army is
          willing to take you into it. Both have to be open at the same time for a
          standard reclass to work.
        </p>

        <p className="text-text-secondary">
          Your counselor checks that status inside RETAIN, the Army&apos;s
          automated reenlistment and reclassification system. RETAIN issues a
          reclassification control number (RCN), which is the green light for the
          whole action. HRC publishes which MOSs are open through MILPER messages,
          and those messages change over time.
        </p>

        <p className="text-text-secondary">
          You will work through your Installation Retention Office or the
          Reenlistment and Reclassification Branch. Start there before you
          contact anyone at HRC directly.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Open calls shift as MILPER messages are published and rescinded,
            sometimes month to month. An MOS that is closed today can open next
            cycle, so timing matters. Ask your counselor to flag you when your
            target opens.
          </p>
        </aside>

        <p className="text-text-secondary">
          When the counselor confirms both calls are open and pulls your RCN, you
          are cleared to move, assuming your score is where it needs to be.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 4: Retake the ASVAB (AFCT) If Your Score Falls Short
        </h2>

        <p className="mt-4 text-text-secondary">
          This is the step everyone forgets. If your existing line score is below
          the target MOS minimum, you are not stuck. You retest.
        </p>

        <p className="text-text-secondary">
          The active-duty retake is called the AFCT (Armed Forces Classification
          Test). It is the same ASVAB content you took to enlist, and the new
          scores replace your old ones for qualification purposes. If you need a
          higher GT specifically, the Army runs BSEP, a free score-improvement
          program built around the GT composite.
        </p>

        <p className="text-text-secondary">
          Do not walk in cold. Take a practice test first to find which subtests
          are dragging your composite down, then study those.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Study the subtests that feed the line score you need, not the whole
            battery. GT is VE plus AR, so for a GT bump you focus on verbal and
            arithmetic reasoning. Plug your current scores into our{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              free calculator
            </Link>{" "}
            to see exactly how far short you are before you book the test.
          </p>
        </aside>

        <p className="text-text-secondary">
          Start with the AFCT prep tools that target your gap: a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice test
          </Link>{" "}
          to baseline, then{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP
          </Link>{" "}
          for GT or self-study for other lines. Full retake rules and waiting
          periods are in our{" "}
          <Link href="/afct" className="text-accent hover:text-accent-hover">
            AFCT guide
          </Link>
          .
        </p>

        <p className="text-text-secondary">
          When your retest clears the MOS minimum, the score gate is behind you
          and the paperwork begins.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 5: Submit the Reclass Action (DA Form 4187 or Reenlistment)
        </h2>

        <p className="mt-4 text-text-secondary">
          The paperwork trips people up because there is no single form for
          everyone. The path you are on decides what you file.
        </p>

        <p className="text-text-secondary">
          If you are reclassing at your reenlistment window, the reclass usually
          rides on the reenlistment contract itself. If you are doing a voluntary
          reclass outside that window, you submit a DA Form 4187 (Personnel
          Action), sometimes paired with a DA Form 1696. Plenty of soldiers have
          never touched a 4187 for a reclass, which is exactly why the confusion
          exists, the answer depends on your timing.
        </p>

        <p className="text-text-secondary">
          For special and packet MOSs, the DA Form 4187 has to be signed by your
          company commander or higher and certifies things like stable personal
          affairs, height and weight compliance, and no derogatory records.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A reclass almost always comes with a Service Remaining Requirement
            (SRR). You may have to reenlist or extend to cover the added
            obligation, and for some MOSs, reclassing to yet another job during
            that SRR is prohibited. Read the obligation before you sign it.
          </p>
        </aside>

        <p className="text-text-secondary">
          Your counselor drives the routing. Your job is to have your records
          clean so the action does not bounce. Once it is approved, you need a
          seat.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 6: Get a School Date Through ATRRS
        </h2>

        <p className="mt-4 text-text-secondary">
          Approval is not arrival. Most reclasses send you to a school or AIT for
          the new MOS, and that seat is scheduled through ATRRS, the Army Training
          Requirements and Resources System. Seat availability, not your
          paperwork, often sets your real timeline.
        </p>

        <p className="text-text-secondary">
          Before booking, your counselor confirms you meet the RETAIN MINQUALS
          (the minimum qualifications, including your line score) and that the
          right ATRRS course is open. Then they reserve a class date.
        </p>

        <p className="text-text-secondary">
          That date can be weeks out or months out depending on the MOS and the
          school&apos;s throughput. High-demand courses fill fast.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Ask for the next available seat and a backup date. If the first class
            fills before your action finalizes, a backup keeps your reclass from
            slipping a full cycle.
          </p>
        </aside>

        <p className="text-text-secondary">
          When you have a reporting date, the move is real. The last thing to
          understand is what actually changes once you graduate.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 7: Know What Changes (Rank, Bonus, Obligation)
        </h2>

        <p className="mt-4 text-text-secondary">
          Before you sign, understand the deal in full. A MOS reclassification
          changes three things, and only one of them is what most soldiers worry
          about.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Rank</p>
            <p className="mt-1 text-sm text-text-secondary">
              Protected. You keep your grade and your time in service. You are
              not starting over as a private.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Bonus</p>
            <p className="mt-1 text-sm text-text-secondary">
              Moving into a priority or shortage MOS can make you competitive for
              a reenlistment bonus under the FY2026 model.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Obligation</p>
            <p className="mt-1 text-sm text-text-secondary">
              Expect a Service Remaining Requirement. You may reenlist or extend
              to cover it, and changing MOS again during the SRR may be off the
              table.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The bonus piece changed recently. For FY2026, the Army moved to a
          performance-based system called the Quality Tiered Incentive Program
          (QTI), which ranks soldiers within their rank-and-MOS cohort on physical
          fitness, technical expertise, and command assessment. Bonus amounts now
          follow Army requirements and individual performance instead of a flat
          table, and the program reached full implementation in April 2026.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Get the exact bonus and obligation in writing through your counselor
            before you commit. FY2026 figures are current-year and subject to
            change as MILPER messages update, so confirm the number tied to your
            specific MOS and rank.
          </p>
        </aside>

        <p className="text-text-secondary">
          That is the full Army picture. If you are not in the Army, the same idea
          exists under a different name.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 8: Other Branches &ndash; Navy Conversion and Air Force Retraining
        </h2>

        <p className="mt-4 text-text-secondary">
          MOS is an Army word. If you serve in another branch and landed here,
          you want the equivalent term, because the process exists everywhere.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What It Is Called
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  How It Works
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">Reclassification (MOS)</td>
                <td className="py-2">IN/OUT call, RETAIN, school via ATRRS</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marine Corps
                </td>
                <td className="py-2 pr-4">Lateral move (lat move)</td>
                <td className="py-2">MOS change through career planner</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">Conversion</td>
                <td className="py-2">Change of rating, often through A-school</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force / Space Force
                </td>
                <td className="py-2 pr-4">Retraining</td>
                <td className="py-2">
                  Changes your Control AFSC, runs through programs like the NCO
                  Retraining Program
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The mechanics differ by branch, but the core rule does not. You still
          have to meet the ASVAB composite or line score for the new job, and the
          gaining career field has to have room. Use our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            score calculator
          </Link>{" "}
          to check requirements across all six branches before you start a
          packet.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          MOS Reclassification FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do I lose my rank when I reclass to a new MOS?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Army mos reclassification is rank-protected. You keep your grade
              and your time in service. You are changing your job, not your pay
              grade, so an E-5 stays an E-5 after the move. The only rank-related
              limits are eligibility rules, such as the standard call applying to
              SSG and below.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need to reclass into a new MOS?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You need to meet the line or composite score the target MOS
              requires, not your old job&apos;s score. Some are strict, like MOS
              51C requiring a GT of 110. If your current score is short, retake
              the ASVAB through the AFCT. Plug your scores into our{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                free calculator
              </Link>{" "}
              to see the gap.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I reclass if my target MOS is full?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Not until the calls align. Your current MOS must be overstrength
              enough to release you (an out-call), and your target MOS must be
              understrength enough to accept you (an in-call). Your career
              counselor checks both in RETAIN. If the target is full, you wait for
              the next MILPER message that opens it.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does MOS reclassification take?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It varies widely. Eligibility and counselor steps can move in weeks,
              but the real bottleneck is usually the school seat in ATRRS, which
              can push the timeline to several months for high-demand MOSs.
              Packet-and-board fields like 51C add a board cycle, with
              notification within 90 days of the board.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is a DA Form 4187 required to reclass?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends on your path. A reclass at your reenlistment window often
              runs through the reenlistment contract instead. A voluntary reclass
              outside that window typically uses a DA Form 4187, sometimes with a
              DA Form 1696. Your counselor confirms which form your situation
              needs.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the Navy or Air Force version of reclassing?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Navy calls it a conversion, which changes your rating and often
              sends you to A-school. The Air Force and Space Force call it
              retraining, which changes your Control AFSC and runs through programs
              like the NCO Retraining Program. The Marine Corps calls it a lateral
              move. All of them still require meeting the new job&apos;s ASVAB
              score.
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
            title="Reclass and score resources"
            links={[
              { href: "/how-to-retake-the-asvab", label: "How to Retake the ASVAB", blurb: "Retest to raise the line score your new MOS needs." },
              { href: "/asvab-retake-policy", label: "ASVAB Retake Policy", blurb: "Waiting periods and rules for a confirmation test." },
              { href: "/army-asvab-score", label: "Army ASVAB Score Requirements", blurb: "The line score cutoffs every Army MOS uses." },
              { href: "/gt-score", label: "GT Score Explained", blurb: "The score that unlocks the most reclass options." },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
