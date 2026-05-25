import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Army ASVAB Scores: Line Scores, MOS Requirements, GT Guide (2026)",
  description:
    "Learn Army ASVAB score requirements for 2026. AFQT minimums, all 10 line score formulas, MOS job table, and GT score thresholds for career advancement.",
  alternates: {
    canonical: "https://asvabhero.com/army-asvab-score",
  },
};

export default function ArmyASVABScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Army ASVAB Scores: The Complete Guide to Qualifying, Line Scores, and Career Advancement",
          description:
            "Learn Army ASVAB score requirements for 2026. AFQT minimums, all 10 line score formulas, MOS job table, and GT score thresholds for career advancement.",
          url: "https://asvabhero.com/army-asvab-score",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-05-13",
          dateModified: "2026-05-13",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the minimum ASVAB score for the Army?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AFQT 31 with a high school diploma, AFQT 50 with a GED. The Army can grant waivers down to AFQT 26 in rare cases, but don't count on it. GED holders can drop to the diploma tier by earning 15+ college credits.",
              },
            },
            {
              "@type": "Question",
              name: "What Army jobs can I get with a 31 ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 31 AFQT meets the enlistment minimum, but your job options depend on your line scores, not AFQT alone. At the lower end, MOS like Food Service Specialist (92G, OF 90) and Motor Transport Operator (88M, OF 90) have relatively lower composite thresholds. Check the calculator to see which jobs match your specific subtest scores.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need for Army warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT 110. No waivers are granted for this threshold. It applies to every warrant officer specialty in the Army, from aviation (153A) to cyber (170A) to intelligence (350F). If your GT is below 110, BSEP can help you get there.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB to get a better Army job?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "If you haven't enlisted yet, you can retake after a 1-month wait (then 1 month, then 6 months for subsequent attempts). If you're active duty, you take the AFCT instead. Both cases: your newest score replaces all previous scores.",
              },
            },
            {
              "@type": "Question",
              name: "What is the highest ASVAB score for the Army?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The highest AFQT is 99 (99th percentile). But AFQT only determines enlistment eligibility. Your line scores, which have different scales, determine which specific MOS you qualify for. A high AFQT with weak line scores still limits your job options.",
              },
            },
            {
              "@type": "Question",
              name: "How do Army line scores differ from AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AFQT uses 4 subtests (AR, MK, WK, PC) and determines enlistment eligibility. Line scores use various combinations of all 9 subtests and determine which MOS you qualify for. You need to clear both. See ASVAB scores explained for the full breakdown.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Army guarantee your job based on ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Army is the only branch that guarantees a specific MOS in your enlistment contract. Your line scores determine which MOS you can choose from, and once it's in your contract, it's locked. Other branches offer some combination of guaranteed job or guaranteed career field.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army ASVAB Scores: The Complete Guide to Qualifying, Line Scores, and Career Advancement
        </h1>

        <p className="mt-4 text-text-secondary">
          The Army has the lowest AFQT minimum of any branch. That gets people in the door. But your <strong>army asvab scores</strong> are what actually determine your job, your bonus eligibility, and whether you ever get promoted past the career ceiling most soldiers don&apos;t see coming.
        </p>

        <p className="text-text-secondary">
          This guide covers both sides of the coin: what you need to enlist, and what you need to build a career worth staying for. We break down AFQT minimums by education tier, all 10 Army line score formulas, the MOS requirements for the most popular jobs, and the GT score thresholds that control warrant officer eligibility, Special Forces, and MOS reclassification.
        </p>

        <p className="text-text-secondary">
          If you already have your scores, plug them into our <Link href="/calculator">free ASVAB score calculator</Link> to see which Army jobs you qualify for right now.
        </p>

        {/* ── Section: Minimum ASVAB Score for Army Enlistment ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum ASVAB Score for Army Enlistment
        </h2>

        <p className="mt-4 text-text-secondary">
          The short answer: AFQT 31 with a high school diploma, AFQT 50 with a GED.
        </p>

        <p className="text-text-secondary">
          That 31 is the lowest minimum across all six branches. But meeting the minimum and being competitive are two different things. Your AFQT score slots you into a category that determines recruiter priority, bonus eligibility, and how many MOS options you can negotiate.
        </p>

        {/* AFQT Categories Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFQT Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Means for Army Enlistment</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-400">I</td>
                <td className="py-2 pr-4 font-mono">93&ndash;99</td>
                <td className="py-2">First pick of every MOS. Maximum bonus eligibility.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">II</td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">Full access to jobs and enlistment incentives.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">IIIA</td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">Above average. Bonus eligible. Most MOS available.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">IIIB</td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">Meets minimum (diploma). Limited bonuses. Fewer MOS.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">IV</td>
                <td className="py-2 pr-4 font-mono">10&ndash;30</td>
                <td className="py-2">Restricted. Congress caps at 4% of annual enlistments.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">V</td>
                <td className="py-2 pr-4 font-mono">1&ndash;9</td>
                <td className="py-2">Permanent disqualifier. No waiver. No exceptions.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GED holders need AFQT 50 to enlist, not 31. If you have a GED and score in the 31&ndash;49 range, you can drop to the diploma tier by earning 15 or more college credits. That reclassification can save you a retake.
          </p>
        </aside>

        <p className="text-text-secondary">
          The AFQT 50 threshold is the practical dividing line. Above it, you qualify for enlistment bonuses that can reach $50,000 for high-demand MOS. Below it, your options narrow and bonus eligibility disappears. When the Army is meeting recruiting goals comfortably, Category IIIB applicants may face longer wait times or limited MOS availability.
        </p>

        <p className="text-text-secondary">
          For a deeper look at how your <Link href="/afqt-score">AFQT score</Link> is calculated and why it matters, check our dedicated breakdown.
        </p>

        <EmailCapture
          tag="army-asvab-score"
          headline="Get Your Free Army MOS Match Report"
          subhead="Enter your email and we'll send you a personalized breakdown of which Army jobs match your score profile."
        />

        {/* ── Section: How Army Line Scores Work ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Army Line Scores Work
        </h2>

        <p className="mt-4 text-text-secondary">
          Your AFQT gets you through the front door. Your line scores decide which rooms you can enter.
        </p>

        <p className="text-text-secondary">
          Think of Army qualification as a two-gate system. Gate one is the AFQT minimum for enlistment. Gate two is a set of 10 composite scores, each calculated from different subtest combinations, that determine which specific MOS you qualify for. You need to clear both gates.
        </p>

        <p className="text-text-secondary">
          The Army calculates 10 line scores from your performance on the 9 ASVAB subtests:
        </p>

        {/* Army Line Score Formulas Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Line Score</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Name</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Formula</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GT</td>
                <td className="py-2 pr-4">General Technical</td>
                <td className="py-2 font-mono">VE + AR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CL</td>
                <td className="py-2 pr-4">Clerical</td>
                <td className="py-2 font-mono">VE + AR + MK</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">CO</td>
                <td className="py-2 pr-4">Combat</td>
                <td className="py-2 font-mono">AR + CS* + AS + MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">EL</td>
                <td className="py-2 pr-4">Electronics</td>
                <td className="py-2 font-mono">GS + AR + MK + EI</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">FA</td>
                <td className="py-2 pr-4">Field Artillery</td>
                <td className="py-2 font-mono">AR + CS* + MK + MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">GM</td>
                <td className="py-2 pr-4">General Maintenance</td>
                <td className="py-2 font-mono">GS + AS + MK + EI</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">MM</td>
                <td className="py-2 pr-4">Mechanical Maintenance</td>
                <td className="py-2 font-mono">NO* + AS + MC + EI</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">OF</td>
                <td className="py-2 pr-4">Operators and Food</td>
                <td className="py-2 font-mono">VE + NO* + AS + MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">SC</td>
                <td className="py-2 pr-4">Surveillance and Communications</td>
                <td className="py-2 font-mono">VE + AR + AS + MC</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">ST</td>
                <td className="py-2 pr-4">Skilled Technical</td>
                <td className="py-2 font-mono">GS + VE + MK + MC</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            CS (Coding Speed) and NO (Numerical Operations) were phased out of the CAT-ASVAB. The Army now plugs in dummy scores (population averages) for any formula that includes them. The asterisks above mark those legacy subtests. You cannot study for or improve CS/NO scores. Your actual performance on the 9 active subtests is what you control.
          </p>
        </aside>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          GT (General Technical) is the most important Army line score for career advancement. It uses just two inputs: Verbal Expression (derived from Word Knowledge + Paragraph Comprehension) and Arithmetic Reasoning. More on why GT matters in the section below.
        </p>

        <p className="text-text-secondary">
          One pattern worth noticing: VE (Verbal Expression) appears in 6 of the 10 Army line score formulas (GT, CL, OF, SC, ST, and indirectly in CO through the verbal component). Improving your verbal skills cascades across the majority of your army asvab scores.
        </p>

        <p className="text-text-secondary">
          Use our <Link href="/asvab-line-score-calculator">line score calculator</Link> to plug in your subtest scores and see all 10 composites instantly.
        </p>

        {/* ── Section: Army MOS Requirements ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army MOS Requirements: Jobs and the Scores You Need
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army offers 140+ enlisted MOS. Unlike other branches, the Army guarantees your specific job in your enlistment contract before you ship to basic training. Your line scores determine which jobs you can negotiate.
        </p>

        <p className="text-text-secondary">
          Here are the most popular Army MOS organized by career field, with their minimum line score requirements:
        </p>

        {/* Popular Army MOS Requirements Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">MOS</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Line Score Required</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {/* Combat */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Combat</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">11B</td>
                <td className="py-2 pr-4">Infantryman</td>
                <td className="py-2 font-mono">CO 87</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">19D</td>
                <td className="py-2 pr-4">Cavalry Scout</td>
                <td className="py-2 font-mono">CO 87</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">12B</td>
                <td className="py-2 pr-4">Combat Engineer</td>
                <td className="py-2 font-mono">CO 87</td>
              </tr>
              {/* Medical */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Medical</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">68W</td>
                <td className="py-2 pr-4">Combat Medic</td>
                <td className="py-2 font-mono">ST 101, GT 107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">68C</td>
                <td className="py-2 pr-4">Practical Nursing Specialist</td>
                <td className="py-2 font-mono">ST 101</td>
              </tr>
              {/* Intelligence and Cyber */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Intelligence &amp; Cyber</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">35F</td>
                <td className="py-2 pr-4">Intelligence Analyst</td>
                <td className="py-2 font-mono">ST 101</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">35N</td>
                <td className="py-2 pr-4">Signals Intelligence Analyst</td>
                <td className="py-2 font-mono">ST 112</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">17C</td>
                <td className="py-2 pr-4">Cyber Operations Specialist</td>
                <td className="py-2 font-mono">GT 110, ST 112</td>
              </tr>
              {/* Technical */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Technical</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">25B</td>
                <td className="py-2 pr-4">IT Specialist</td>
                <td className="py-2 font-mono">ST 95</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">15Q</td>
                <td className="py-2 pr-4">Air Traffic Control Operator</td>
                <td className="py-2 font-mono">ST 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">15W</td>
                <td className="py-2 pr-4">UAS Operator</td>
                <td className="py-2 font-mono">SC 102</td>
              </tr>
              {/* Admin and Support */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Admin &amp; Support</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">42A</td>
                <td className="py-2 pr-4">Human Resources Specialist</td>
                <td className="py-2 font-mono">CL 90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">92G</td>
                <td className="py-2 pr-4">Food Service Specialist</td>
                <td className="py-2 font-mono">OF 90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">31B</td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2 font-mono">ST 95</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">88M</td>
                <td className="py-2 pr-4">Motor Transport Operator</td>
                <td className="py-2 font-mono">OF 90</td>
              </tr>
              {/* Special Operations */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Special Operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">18X</td>
                <td className="py-2 pr-4">Special Forces Candidate</td>
                <td className="py-2 font-mono">GT 110, CO 100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">37F</td>
                <td className="py-2 pr-4">Psychological Operations</td>
                <td className="py-2 font-mono">ST 105</td>
              </tr>
              {/* Other High-Demand */}
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary" colSpan={3}>Other High-Demand</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">46Q</td>
                <td className="py-2 pr-4">Journalist</td>
                <td className="py-2 font-mono">GT 110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono">13F</td>
                <td className="py-2 pr-4">Fire Support Specialist</td>
                <td className="py-2 font-mono">FA 100</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">74B</td>
                <td className="py-2 pr-4">Info Systems Operator-Analyst</td>
                <td className="py-2 font-mono">ST 100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Some MOS require you to hit thresholds on two composites simultaneously. The 68W Combat Medic, for example, needs both ST 101 and GT 107. If you nail the ST but fall short on GT, you don&apos;t qualify.
        </p>

        <p className="text-text-secondary">
          For the full list of 140+ Army MOS with every line score requirement, see our complete <Link href="/army-mos-list">Army MOS list</Link>.
        </p>

        {/* ── Section: Why Your GT Score Matters ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why Your GT Score Matters More Than Any Other Composite
        </h2>

        <p className="mt-4 text-text-secondary">
          GT is calculated from just two subtests, but it controls more career doors than any other Army line score.
        </p>

        <p className="text-text-secondary">
          Every warrant officer specialty in the Army requires GT 110. No waivers. Every OCS application needs it. Special Forces (18X) requires it. Cyber Operations (17C) requires it. And if you want to reclassify into a higher-skill MOS mid-career, GT 100+ is the starting line for most options.
        </p>

        {/* GT Score Thresholds Stats Row */}
        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">GT 110+</span>
            <span className="text-sm text-text-secondary">Warrant officer, OCS, Special Forces, Cyber, Journalist, Recruiter NCO</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">GT 107</span>
            <span className="text-sm text-text-secondary">Combat Medic (68W), Air Defense Early Warning (14J)</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">GT 100&ndash;106</span>
            <span className="text-sm text-text-secondary">Most reclass options, Criminal Investigations (31D requires ST 110 + GT 110)</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">GT 99 &amp; below</span>
            <span className="text-sm text-text-secondary">Eligible for BSEP (free Army GT improvement program)</span>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            A GT below 100 doesn&apos;t just limit your first job. It limits lateral moves, promotion packets, and commissioning programs for your entire career. Army Times has described GT as a &ldquo;career-saving&rdquo; metric, since soldiers with low GT scores face dead-end paths regardless of their experience and leadership ability.
          </p>
        </aside>

        <p className="text-text-secondary">
          GT feeds on Verbal Expression and Arithmetic Reasoning. If you&apos;re pre-enlistment, verbal and math prep is your highest-leverage study time. If you&apos;re active duty with a GT below 110, the <Link href="/bsep">BSEP program</Link> and <Link href="/afct">AFCT retake</Link> are your path forward.
        </p>

        <p className="text-text-secondary">
          Check where you stand with our <Link href="/gt-score-calculator">GT score calculator</Link>.
        </p>

        {/* ── Section: AFQT Score Tiers ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Score Tiers: Bonuses, Recruiter Priority, and MOS Access
        </h2>

        <p className="mt-4 text-text-secondary">
          The AFQT categories table above shows the scoring brackets. Here&apos;s what matters in practice: where you fall in those brackets directly affects how your recruiter treats you and what&apos;s on the table.
        </p>

        <p className="text-text-secondary">
          Category I and II applicants (AFQT 65+) get first pick of available MOS, maximum enlistment bonus eligibility (up to $50,000 for select jobs), and recruiter priority. Category IIIA (50&ndash;64) still qualifies for bonuses and most MOS. Category IIIB (31&ndash;49) meets the diploma minimum but loses bonus eligibility and faces a noticeably smaller MOS pool.
        </p>

        <p className="text-text-secondary">
          Category IV (10&ndash;30) is restricted by federal law (10 U.S.C. 520) to no more than 4% of annual Army accessions. Category V (1&ndash;9) is a permanent disqualifier across all branches.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The AFQT 50 line is the single most impactful threshold to clear. It separates bonus-eligible from non-bonus, GED-eligible from diploma-only, and opens Category IIIA, where recruiters actively want to work with you. If you&apos;re scoring in the low 40s on practice tests, a focused 4&ndash;6 week study push can get you across that line.
          </p>
        </aside>

        <p className="text-text-secondary">
          For benchmarks on what qualifies as a competitive score, see our guide on <Link href="/what-is-a-good-asvab-score">what counts as a good ASVAB score</Link>. For a full breakdown of each score tier, see <Link href="/asvab-score-ranges">ASVAB score ranges</Link>.
        </p>

        {/* ── Section: How to Calculate Your Army Line Scores ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Calculate Your Army Line Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Here&apos;s a worked example using hypothetical subtest standard scores:
        </p>

        <p className="text-text-secondary">
          AR = 55, VE = 52, MK = 48, GS = 50, MC = 45, EI = 47, AS = 44
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR = 52 + 55 = 107
          <br />
          ST = GS + VE + MK + MC = 50 + 52 + 48 + 45 = 195
          <br />
          CL = VE + AR + MK = 52 + 55 + 48 = 155
          <br />
          EL = GS + AR + MK + EI = 50 + 55 + 48 + 47 = 200
        </div>

        <p className="text-text-secondary">
          With a GT of 107, this soldier qualifies for 68W Combat Medic (GT 107, ST 101) and most technical MOS. But they fall 3 points short of the GT 110 threshold for warrant officer, Special Forces, and Cyber Operations.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE feeds into GT, CL, ST, OF, and SC. A 5-point improvement in Verbal Expression (through better Word Knowledge and Paragraph Comprehension) would push this soldier&apos;s GT to 112, clearing the warrant officer threshold and simultaneously raising 4 other line scores.
          </p>
        </aside>

        <p className="text-text-secondary">
          Don&apos;t do this math by hand. Use our <Link href="/calculator">ASVAB score calculator</Link> to see all 10 Army line scores and your qualifying MOS instantly.
        </p>

        {/* ── Section: Already Serving? ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Already Serving? How Active-Duty Soldiers Can Improve Their Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Your army asvab scores aren&apos;t carved in stone. If you&apos;re already in the Army and your GT or other line scores are blocking a career move, you have options.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The AFCT (Armed Forces Classification Test)
        </h3>

        <p className="mt-4 text-text-secondary">
          The AFCT is functionally identical to the ASVAB but taken by active-duty service members. It&apos;s your retake path. Contact your installation&apos;s education center or submit a DA Form 4187 to request scheduling.
        </p>

        <p className="text-text-secondary">
          One critical rule: the AFCT replaces ALL of your previous ASVAB scores. Every subtest, every line score. If you improve GT but decline in Mechanical Comprehension or Electronics Information, your MM or EL composites could drop. Study across all subtests, not just the two that feed GT.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          BSEP: The Army&apos;s Free GT Improvement Program
        </h3>

        <p className="mt-4 text-text-secondary">
          BSEP (Basic Skills Education Program) is a free, Army-funded program designed specifically to raise GT scores. It targets soldiers with GT below 110 who need the score for warrant officer packets, OCS, or MOS reclassification.
        </p>

        {/* BSEP Stats Row */}
        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">Duration</span>
            <span className="text-sm text-text-secondary">10 days (40 hours classroom + 20 hours online)</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">Avg GT increase</span>
            <span className="text-sm text-text-secondary">19 points</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">Success rate</span>
            <span className="text-sm text-text-secondary">115 of 127 participants raised their GT; 77 exceeded 110</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">Best result</span>
            <span className="text-sm text-text-secondary">One soldier gained 35 points in a single cohort</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">Cost</span>
            <span className="text-sm text-text-secondary">Free for active-duty soldiers</span>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            BSEP prepares you for the AFCT, and the AFCT replaces all scores. Even with BSEP&apos;s strong results (average +19 points), go in prepared across all subtests. A focused GT jump that tanks your ST or EL could close one door while opening another.
          </p>
        </aside>

        <p className="text-text-secondary">
          Classes run monthly at most installations with 10&ndash;15 slots each. Contact your Army Education Center to enroll. Start with our <Link href="/afct-practice-test">free AFCT practice test</Link> to identify weak spots before you commit to a class date.
        </p>

        <p className="text-text-secondary">
          For the full BSEP guide, see our <Link href="/bsep">BSEP breakdown</Link>. For AFCT retake rules and process, see our <Link href="/afct">AFCT guide</Link>.
        </p>

        {/* ── Section: Study Strategy ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Study Strategy: Which Subtests to Prioritize for Army Jobs
        </h2>

        <p className="mt-4 text-text-secondary">
          Study backwards from your target MOS. Every Army job maps to specific subtests through the line score formulas. Here&apos;s how to allocate your study time by career path:
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Combat Roles (11B, 19D, 12B)
        </h3>

        <p className="mt-4 text-text-secondary">
          CO = AR + CS* + AS + MC. Focus on Arithmetic Reasoning, Auto &amp; Shop Information, and Mechanical Comprehension. CS uses a dummy score, so you&apos;re really working three subtests.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Medical and Technical (68W, 35F, 25B)
        </h3>

        <p className="mt-4 text-text-secondary">
          ST = GS + VE + MK + MC. These jobs pull from four subtests across science, verbal, math, and mechanical. Start with your weakest among those four.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Intelligence and Cyber (17C, 35N)
        </h3>

        <p className="mt-4 text-text-secondary">
          GT (VE + AR) and ST (GS + VE + MK + MC) both required. VE appears in both composites, making verbal your highest-priority study area.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Admin and Clerical (42A, 71D)
        </h3>

        <p className="mt-4 text-text-secondary">
          CL = VE + AR + MK. Heavy on verbal and math. The Legal Specialist (71D) requires CL 110, one of the highest clerical thresholds.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE (Verbal Expression) feeds 6 of 10 Army line scores. Regardless of your target MOS, improving Word Knowledge and Paragraph Comprehension gives you the widest score improvement across your army asvab score profile. If you only have 2 weeks to study, spend them on verbal.
          </p>
        </aside>

        <p className="text-text-secondary">
          Build a focused study plan with our <Link href="/asvab-study-guide">ASVAB study guide</Link> or take a <Link href="/practice-test">free practice test</Link> to find your baseline.
        </p>

        {/* ── Section: Army ASVAB Retake Rules ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army ASVAB Retake Rules
        </h2>

        <p className="mt-4 text-text-secondary">
          You can retake the ASVAB, but there are wait periods and one rule that catches people off guard.
        </p>

        {/* Retake Wait Periods Stats Row */}
        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">1st retake</span>
            <span className="text-sm text-text-secondary">1 month after initial test</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">2nd retake</span>
            <span className="text-sm text-text-secondary">1 month after 1st retake</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">3rd+ retakes</span>
            <span className="text-sm text-text-secondary">6 months between each subsequent attempt</span>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your most recent score completely replaces all previous scores. If you scored a 72 AFQT and retake for a 58, your official score is now 58. The Army does not let you keep the higher number. Only retake when practice tests show consistent improvement over your current score.
          </p>
        </aside>

        <p className="text-text-secondary">
          ASVAB scores are valid for 2 years from your test date. There&apos;s no maximum number of retakes, but the 6-month wait after your third attempt means poor timing can cost you an enlistment window.
        </p>

        <p className="text-text-secondary">
          If you&apos;re already active duty, retakes go through the <Link href="/afct">AFCT process</Link>, not the standard ASVAB. See the full retake rules in our <Link href="/asvab-retake-policy">ASVAB retake policy guide</Link>.
        </p>

        {/* ── Section: The Bottom Line ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Bottom Line
        </h2>

        <p className="mt-4 text-text-secondary">
          Two audiences read this page, and both need to hear the same thing: your army asvab scores are the foundation of your Army career, not just a gate you pass through once.
        </p>

        <p className="text-text-secondary">
          <strong>If you&apos;re enlisting:</strong> AFQT 31 gets you in, but AFQT 50+ is where the real options start. Study backwards from your target MOS, prioritize verbal skills for the widest line score improvement, and negotiate your guaranteed job with the strongest scores you can bring.
        </p>

        <p className="text-text-secondary">
          <strong>If you&apos;re already serving:</strong> Your scores aren&apos;t permanent. BSEP averages a 19-point GT improvement, and the AFCT gives you a clean slate. GT 110 is the number that unlocks warrant officer, OCS, Special Forces, and most reclass paths.
        </p>

        <p className="text-text-secondary">
          Use our <Link href="/calculator">free ASVAB calculator</Link> to check your current line scores against Army MOS requirements.
        </p>

        {/* ── FAQ Section ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army ASVAB Scores FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT 31 with a high school diploma, AFQT 50 with a GED. The Army can grant waivers down to AFQT 26 in rare cases, but don&apos;t count on it. GED holders can drop to the diploma tier by earning 15+ college credits.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Army jobs can I get with a 31 ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A 31 AFQT meets the enlistment minimum, but your job options depend on your line scores, not AFQT alone. At the lower end, MOS like Food Service Specialist (92G, OF 90) and Motor Transport Operator (88M, OF 90) have relatively lower composite thresholds. Check the <Link href="/calculator">calculator</Link> to see which jobs match your specific subtest scores.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need for Army warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT 110. No waivers are granted for this threshold. It applies to every warrant officer specialty in the Army, from aviation (153A) to cyber (170A) to intelligence (350F). If your GT is below 110, BSEP can help you get there.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB to get a better Army job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              If you haven&apos;t enlisted yet, you can retake after a 1-month wait (then 1 month, then 6 months for subsequent attempts). If you&apos;re active duty, you take the AFCT instead. Both cases: your newest score replaces all previous scores.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the highest ASVAB score for the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The highest AFQT is 99 (99th percentile). But AFQT only determines enlistment eligibility. Your line scores, which have different scales, determine which specific MOS you qualify for. A high AFQT with weak line scores still limits your job options.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do Army line scores differ from AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT uses 4 subtests (AR, MK, WK, PC) and determines enlistment eligibility. Line scores use various combinations of all 9 subtests and determine which MOS you qualify for. You need to clear both. See <Link href="/asvab-scores-explained">ASVAB scores explained</Link> for the full breakdown.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Army guarantee your job based on ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The Army is the only branch that guarantees a specific MOS in your enlistment contract. Your line scores determine which MOS you can choose from, and once it&apos;s in your contract, it&apos;s locked. Other branches offer some combination of guaranteed job or guaranteed career field.
            </p>
          </div>
        </div>

        {/* ── CTA Box ── */}

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which Army Jobs Match Your Scores
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, all 10 Army line scores, and every MOS you qualify for.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Free Calculator
          </Link>
        </div>

        {/* Related links */}
        <section className="my-8 not-prose rounded-xl border border-accent/30 bg-navy-light p-6">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Related ASVAB Score Guides
          </h2>
          <ul className="mt-4 space-y-3 text-text-secondary">
            <li>
              Compare every service on the{" "}
              <Link
                href="/asvab-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                ASVAB score requirements by branch
              </Link>{" "}
              hub.
            </li>
            <li>
              Run your numbers on the{" "}
              <Link
                href="/army-asvab-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                Army ASVAB calculator
              </Link>{" "}
              and find qualifying jobs in the{" "}
              <Link
                href="/army-mos-list"
                className="text-accent underline hover:text-accent-hover"
              >
                full Army MOS list
              </Link>
              .
            </li>
            <li>
              Targeting warrant officer, Cyber, or Special Forces? See the{" "}
              <Link
                href="/gt-score"
                className="text-accent underline hover:text-accent-hover"
              >
                GT score breakdown
              </Link>{" "}
              and how scores map to{" "}
              <Link
                href="/army-ranks"
                className="text-accent underline hover:text-accent-hover"
              >
                Army ranks
              </Link>
              .
            </li>
            <li>
              Already serving and looking to advance? See{" "}
              <Link
                href="/warrant-officer-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                Army warrant officer requirements
              </Link>
              ,{" "}
              <Link
                href="/gt-score-requirements"
                className="text-accent underline hover:text-accent-hover"
              >
                GT score requirements
              </Link>
              , and how to{" "}
              <Link
                href="/mos-reclassification"
                className="text-accent underline hover:text-accent-hover"
              >
                reclassify into a new MOS
              </Link>
              .
            </li>
            <li>
              Other branches:{" "}
              <Link
                href="/navy-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Navy
              </Link>{" "}
              and{" "}
              <Link
                href="/air-force-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Air Force
              </Link>{" "}
              ASVAB scores.
            </li>
            <li>
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                Take a free ASVAB practice test
              </Link>{" "}
              to see if you clear the line scores you need.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
