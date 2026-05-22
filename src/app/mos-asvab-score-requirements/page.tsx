import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "MOS ASVAB Score Requirements by Branch",
  description:
    "MOS ASVAB score requirements for every branch: Army line scores, Air Force MAGE, Navy ratings, and Marine composites, with formulas and exact job numbers.",
  alternates: {
    canonical: "https://asvabhero.com/mos-asvab-score-requirements",
  },
};

export default function MOSASVABScoreRequirementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "MOS ASVAB Score Requirements: Every Branch's Line Scores by Job",
          description:
            "MOS ASVAB score requirements for every branch: Army line scores, Air Force MAGE, Navy ratings, and Marine composites, with formulas and exact job numbers.",
          url: "https://asvabhero.com/mos-asvab-score-requirements",
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
              name: "What ASVAB score do I need for a specific MOS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Each MOS, AFSC, or rating has its own composite requirement, not a single ASVAB number. Find your target job in its branch table above, note the required line score or composite, then study the subtests that feed it. Plug your scores into our ASVAB score calculator to see which jobs you already qualify for.",
              },
            },
            {
              "@type": "Question",
              name: "Do MOS requirements use my AFQT or a different score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A different score. Your AFQT is the enlistment gate, a percentile from 4 subtests. Jobs are gated by composites: line scores in the Army and Marines, MAGE composites in the Air Force and Space Force, and rating composites in the Navy and Coast Guard. You need to clear both gates.",
              },
            },
            {
              "@type": "Question",
              name: "What is the highest line score requirement in the Army?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "EL 117 for MOS 25S, Satellite Communication Systems Operator-Maintainer, is the highest single line score requirement in the Army. EL combines General Science, Arithmetic Reasoning, Mathematics Knowledge, and Electronics Information, so it rewards strong math and science scores.",
              },
            },
            {
              "@type": "Question",
              name: "Is the Marine GT score WK + PC + AR + MC?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Marine GT is VE + AR, where VE is your combined Word Knowledge and Paragraph Comprehension. The longer formula is a common myth that sends recruits to study mechanical comprehension, which does nothing for GT. Study verbal and arithmetic reasoning instead.",
              },
            },
            {
              "@type": "Question",
              name: "Why do some Army composites include subtests not on the test?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CO, FA, MM, and OF formulas still reference Coding Speed and Numerical Operations, two subtests removed from the modern ASVAB. The Army plugs in fixed dummy averages for them, so you cannot raise those composites by studying those phantom subtests.",
              },
            },
            {
              "@type": "Question",
              name: "What MOS can I get with a low ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Low-composite jobs exist, like Army Infantry (CO 87) and Unit Supply (CL 90), or Marine Rifleman (GT 80). You still have to clear your branch's AFQT minimum first. A low score limits your options and your bonus eligibility, so retaking is often worth it.",
              },
            },
            {
              "@type": "Question",
              name: "What GT score do I need to be an officer or go Special Forces?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT 110. That threshold gates Army and Marine officer and warrant officer candidacy, Army Special Forces (18X), and most cyber and intelligence MOSs. Because GT is VE + AR and VE is doubled in the AFQT, verbal study is the fastest way to reach 110.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          MOS ASVAB Score Requirements: Every Branch&apos;s Line Scores by Job
        </h1>

        <p className="mt-4 text-text-secondary">
          You cleared the AFQT and you can enlist. Now you want a specific job,
          and that runs on a completely different number.
        </p>

        <p className="text-text-secondary">
          The score that decides which job you get is not your AFQT. It is a
          composite built from your individual subtests, and every branch
          calculates it differently. That gap is where most recruits get stuck.
        </p>

        <p className="text-text-secondary">
          &ldquo;MOS&rdquo; is Army terminology. The Air Force calls jobs AFSCs,
          the Navy calls them ratings, and the Marines use MOS like the Army. The
          label changes, but the rule does not: every branch gates jobs with
          composite or line scores built from your ASVAB subtests. This page lays
          out the <strong>mos asvab score requirements</strong> that matter, with
          the formula behind each one and the actual per-job numbers, branch by
          branch, Army first.
        </p>

        <p className="text-text-secondary">
          If you already have your subtest scores, plug them into our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          to see your composites and which jobs you qualify for across all six
          branches.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. How to Read These Requirements (AFQT vs Line Scores vs Composites)
        </h2>

        <p className="mt-4 text-text-secondary">
          A 64 and a 222 can both be passing scores for two different jobs,
          because the branches do not measure on the same scale. Until you know
          which scale you are reading, the MOS ASVAB score requirements on this
          page are just noise.
        </p>

        <p className="text-text-secondary">
          Two gates stand between you and a job. The first is the{" "}
          <strong>AFQT</strong>, the percentile from 1 to 99 that decides whether
          you can enlist at all. The second is a job-specific composite, also
          called a line score, that decides which jobs you qualify for once you
          are in. You need to clear both.
        </p>

        <p className="text-text-secondary">
          The catch is that the second gate uses a different scale in every
          branch.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job-Score Name
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Scale
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">Line scores</td>
                <td className="py-2 pr-4">Summed standard scores</td>
                <td className="py-2 font-mono">GT 110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">Line scores</td>
                <td className="py-2 pr-4">Summed standard scores</td>
                <td className="py-2 font-mono">GT 105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4">MAGE composites</td>
                <td className="py-2 pr-4">Percentile (about 20-99)</td>
                <td className="py-2 font-mono">G 64</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4">MAGE composites</td>
                <td className="py-2 pr-4">Percentile (about 20-99)</td>
                <td className="py-2 font-mono">G 64</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">Rating composites</td>
                <td className="py-2 pr-4">Summed standard scores</td>
                <td className="py-2 font-mono">222</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">Rating composites</td>
                <td className="py-2 pr-4">Summed standard scores</td>
                <td className="py-2 font-mono">171</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          An Air Force &ldquo;G 64&rdquo; is a percentile, so it tops out near
          99. A Navy &ldquo;222&rdquo; is the sum of several standard scores, so
          it runs into the 200s. Comparing them directly is like comparing a
          temperature in Celsius to one in Fahrenheit.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The AFQT minimum is a separate gate from the job score. The diploma
            minimums are Army 31, Marines 32, Navy 35, Air Force 36, Coast Guard
            32, and Space Force 36. GED holders face higher bars (usually 50, or
            65 for Air Force and Space Force). See our full{" "}
            <Link
              href="/asvab-score-requirements"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB score requirements
            </Link>{" "}
            breakdown and{" "}
            <Link
              href="/asvab-scores-explained"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB scores explained
            </Link>{" "}
            for how the scoring works.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. Army MOS ASVAB Line Score Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army does not use your AFQT to assign your job. It converts your
          subtests into 10 line scores and matches those to MOS requirements.
        </p>

        <p className="text-text-secondary">
          Here are all 10 formulas. VE means Verbal Expression, which is your
          Word Knowledge and Paragraph Comprehension scores combined.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
          <br />
          CL = VE + AR + MK
          <br />
          CO = AR + CS + AS + MC
          <br />
          EL = GS + AR + MK + EI
          <br />
          FA = AR + CS + MK + MC
          <br />
          GM = GS + AS + MK + EI
          <br />
          MM = NO + AS + MC + EI
          <br />
          OF = VE + NO + AS + MC
          <br />
          SC = VE + AR + AS + MC
          <br />
          ST = GS + VE + MK + MC
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The CO, FA, MM, and OF formulas reference CS (Coding Speed) and NO
            (Numerical Operations). Both subtests were removed from the modern
            CAT-ASVAB, and the Army now plugs in population-average dummy scores
            you cannot change. You cannot raise these four composites by studying
            those phantom subtests. Direct your study at AR, MK, GS, AS, MC, and
            EI instead.
          </p>
        </aside>

        <p className="text-text-secondary">
          The table below covers a representative span of Army MOSs, from
          entry-level infantry to the most demanding intel and cyber roles.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Required Line Score(s)
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  11B
                </td>
                <td className="py-2 pr-4">Infantryman</td>
                <td className="py-2 pr-4 font-mono">CO 87</td>
                <td className="py-2">Most available slots</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  19D
                </td>
                <td className="py-2 pr-4">Cavalry Scout</td>
                <td className="py-2 pr-4 font-mono">CO 87</td>
                <td className="py-2">Reconnaissance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  12B
                </td>
                <td className="py-2 pr-4">Combat Engineer</td>
                <td className="py-2 pr-4 font-mono">CO 87</td>
                <td className="py-2">Breaching, demolitions</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  12D
                </td>
                <td className="py-2 pr-4">Diver</td>
                <td className="py-2 pr-4 font-mono">GM 98, GT 107, ST 106</td>
                <td className="py-2">Triple requirement</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  13B
                </td>
                <td className="py-2 pr-4">Cannon Crewmember</td>
                <td className="py-2 pr-4 font-mono">FA 93</td>
                <td className="py-2">Howitzer crews</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  13F
                </td>
                <td className="py-2 pr-4">Joint Fire Support Specialist</td>
                <td className="py-2 pr-4 font-mono">FA 96</td>
                <td className="py-2">Calls for fire</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  15W
                </td>
                <td className="py-2 pr-4">UAS Operator</td>
                <td className="py-2 pr-4 font-mono">SC 102</td>
                <td className="py-2">Drone operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  17C
                </td>
                <td className="py-2 pr-4">Cyber Operations Specialist</td>
                <td className="py-2 pr-4 font-mono">GT 110, ST 112, ICTL 60</td>
                <td className="py-2">Most demanding MOS</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  25B
                </td>
                <td className="py-2 pr-4">IT Specialist</td>
                <td className="py-2 pr-4 font-mono">ST 95</td>
                <td className="py-2">Entry-level IT</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  25D
                </td>
                <td className="py-2 pr-4">Cyber Network Defender</td>
                <td className="py-2 pr-4 font-mono">GT 105, ST 105</td>
                <td className="py-2">Defensive cyber</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  25S
                </td>
                <td className="py-2 pr-4">Satellite Comm Systems Operator</td>
                <td className="py-2 pr-4 font-mono">EL 117</td>
                <td className="py-2">Highest Army line score</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  31B
                </td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2 pr-4 font-mono">ST 91</td>
                <td className="py-2">Law enforcement</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  35F
                </td>
                <td className="py-2 pr-4">Intelligence Analyst</td>
                <td className="py-2 pr-4 font-mono">ST 101</td>
                <td className="py-2">Entry-level intel</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  35N
                </td>
                <td className="py-2 pr-4">Signals Intelligence Analyst</td>
                <td className="py-2 pr-4 font-mono">ST 112</td>
                <td className="py-2">SIGINT analysis</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  35M
                </td>
                <td className="py-2 pr-4">Human Intelligence Collector</td>
                <td className="py-2 pr-4 font-mono">DLAB 107</td>
                <td className="py-2">Language test, no line score</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  68W
                </td>
                <td className="py-2 pr-4">Combat Medic Specialist</td>
                <td className="py-2 pr-4 font-mono">ST 101, GT 107</td>
                <td className="py-2">EMT certification</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  68K
                </td>
                <td className="py-2 pr-4">Medical Laboratory Specialist</td>
                <td className="py-2 pr-4 font-mono">ST 106</td>
                <td className="py-2">Lab analysis</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  89D
                </td>
                <td className="py-2 pr-4">EOD Specialist</td>
                <td className="py-2 pr-4 font-mono">GM 105</td>
                <td className="py-2">Highly selective</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  91B
                </td>
                <td className="py-2 pr-4">Wheeled Vehicle Mechanic</td>
                <td className="py-2 pr-4 font-mono">MM 87, GT 85</td>
                <td className="py-2">Most common mechanic MOS</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  92Y
                </td>
                <td className="py-2 pr-4">Unit Supply Specialist</td>
                <td className="py-2 pr-4 font-mono">CL 90</td>
                <td className="py-2">Logistics</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  88M
                </td>
                <td className="py-2 pr-4">Motor Transport Operator</td>
                <td className="py-2 pr-4 font-mono">OF 85</td>
                <td className="py-2">Driving and transport</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  27D
                </td>
                <td className="py-2 pr-4">Paralegal Specialist</td>
                <td className="py-2 pr-4 font-mono">CL 105</td>
                <td className="py-2">Legal support</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  12P
                </td>
                <td className="py-2 pr-4">Prime Power Production Specialist</td>
                <td className="py-2 pr-4 font-mono">GT 110, EL 107, ST 107</td>
                <td className="py-2">Hardest engineer MOS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  18X
                </td>
                <td className="py-2 pr-4">Special Forces Candidate</td>
                <td className="py-2 pr-4 font-mono">GT 110, CO 100</td>
                <td className="py-2">Enlistment option</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          GT 110 keeps showing up in the high-value rows, and that is not a
          coincidence. More on the GT threshold below. For the complete branch
          list, see our{" "}
          <Link
            href="/army-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            Army MOS list
          </Link>
          , and for enlistment minimums see{" "}
          <Link
            href="/army-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Army ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. Air Force AFSC ASVAB Requirements (MAGE Composites)
        </h2>

        <p className="mt-4 text-text-secondary">
          An Air Force &ldquo;G 64&rdquo; looks tiny next to a Navy 222, but it
          is a percentile, not a sum. On the MAGE scale, anything in the 60s is a
          strong score.
        </p>

        <p className="text-text-secondary">
          The Air Force sorts every job into four composite areas called MAGE:
          Mechanical, Administrative, General, and Electronics. Space Force
          adopted the same system when it split off.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          G (General) = AR + VE
          <br />
          M (Mechanical) = GS + MC + AS
          <br />
          E (Electronics) = GS + AR + MK + EI
          <br />
          A (Administrative) = VE (WK + PC)
        </div>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  AFSC
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Min
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  3P0X1
                </td>
                <td className="py-2 pr-4">Security Forces</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">33</td>
                <td className="py-2">Lowest in any AFSC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  2T1X1
                </td>
                <td className="py-2 pr-4">Ground Transportation</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2">Fleet and CDL</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  3E0X1
                </td>
                <td className="py-2 pr-4">Electrical Systems</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2">Base infrastructure</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  3F0X1
                </td>
                <td className="py-2 pr-4">Personnel</td>
                <td className="py-2 pr-4 font-mono">A</td>
                <td className="py-2 pr-4 font-mono">41</td>
                <td className="py-2">HR management</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  2A6X1
                </td>
                <td className="py-2 pr-4">Aerospace Propulsion</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">Jet engine tech</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  2W0X1
                </td>
                <td className="py-2 pr-4">Munitions Systems</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">Ordnance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1A2X1
                </td>
                <td className="py-2 pr-4">Aircraft Loadmaster</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">57</td>
                <td className="py-2">Aircrew</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  3D0X2
                </td>
                <td className="py-2 pr-4">Cyber Systems Operations</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">64</td>
                <td className="py-2">Sec+ eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  3D1X2
                </td>
                <td className="py-2 pr-4">Cyber Transport Systems</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">Network engineering</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1C1X1
                </td>
                <td className="py-2 pr-4">Air Traffic Control</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">FAA certification path</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1N0X1
                </td>
                <td className="py-2 pr-4">All Source Intelligence</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">64</td>
                <td className="py-2">High demand</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1N3X1
                </td>
                <td className="py-2 pr-4">Cryptologic Language Analyst</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">72</td>
                <td className="py-2">DLAB required</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1T2X1
                </td>
                <td className="py-2 pr-4">Pararescue</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Special warfare pipeline</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  4N0X1
                </td>
                <td className="py-2 pr-4">Aerospace Medical Service</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">NREMT path</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  3E8X1
                </td>
                <td className="py-2 pr-4">Explosive Ordnance Disposal</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">57</td>
                <td className="py-2">Bonus-eligible</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1B4X1
                </td>
                <td className="py-2 pr-4">Cyber Warfare Operations</td>
                <td className="py-2 pr-4 font-mono">EDPT</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">Separate aptitude test</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Cyber Warfare Operations (1B4X1) does not use MAGE at all. It
            requires the EDPT (Electronic Data Processing Test), a separate
            90-minute logic and reasoning exam with a minimum score of 70. Your
            ASVAB subtests do not feed it.
          </p>
        </aside>

        <p className="text-text-secondary">
          For every Air Force career field and its MAGE minimum, see our{" "}
          <Link
            href="/air-force-afsc-list"
            className="text-accent hover:text-accent-hover"
          >
            Air Force AFSC list
          </Link>
          , and check enlistment standards at{" "}
          <Link
            href="/air-force-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Air Force ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. Navy Rating ASVAB Composite Score Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          The Navy is the hardest scale to navigate because there is no master
          formula. Each rating sums its own combination of subtests, and many
          ratings accept more than one composite, so the same job can list two
          different acceptable totals.
        </p>

        <p className="text-text-secondary">
          Navy composites are summed standard scores, usually landing somewhere
          between 90 and 255. A higher number is not automatically harder than a
          lower one, because each one adds up a different set of subtests.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite Formula
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Min Score
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  ET
                </td>
                <td className="py-2 pr-4">Electronics Technician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 font-mono">222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  AT
                </td>
                <td className="py-2 pr-4">Aviation Electronics Technician</td>
                <td className="py-2 pr-4 font-mono">
                  AR+MK+EI+GS or VE+AR+MK+MC
                </td>
                <td className="py-2 font-mono">222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  HM
                </td>
                <td className="py-2 pr-4">Hospital Corpsman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+GS or AR+PC+MK</td>
                <td className="py-2 font-mono">208 / 156</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  MA
                </td>
                <td className="py-2 pr-4">Master-at-Arms</td>
                <td className="py-2 pr-4 font-mono">AR+VE+MK+MC or WK+AR</td>
                <td className="py-2 font-mono">192 / 98</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  IS
                </td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 font-mono">107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  IT
                </td>
                <td className="py-2 pr-4">Information Systems Technician</td>
                <td className="py-2 pr-4 font-mono">
                  AR+2MK+GS or AR+MK+EI+GS
                </td>
                <td className="py-2 font-mono">222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  CTN
                </td>
                <td className="py-2 pr-4">Cryptologic Tech Networks</td>
                <td className="py-2 pr-4 font-mono">
                  AR+2MK+GS or VE+AR+MK+MC
                </td>
                <td className="py-2 font-mono">255 / 235</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  GM
                </td>
                <td className="py-2 pr-4">Gunner&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 font-mono">205</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  BM
                </td>
                <td className="py-2 pr-4">Boatswain&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">
                  VE+AR+MK+AS or MK+AS+AO
                </td>
                <td className="py-2 font-mono">175 / 135</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  CS
                </td>
                <td className="py-2 pr-4">Culinary Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 font-mono">76-88</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  LS
                </td>
                <td className="py-2 pr-4">Logistics Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 font-mono">92-102</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The Navy&apos;s hardest programs add extra gates. The Nuclear Field
            ratings (MMN, EMN, ETN) require either composite (AR+MK+EI+GS or
            VE+AR+MK+MC) at 252 or higher, or both at 235 or higher with a NAPT
            of 50 or higher. Special warfare adds subtest floors: Navy SEAL (SO)
            needs VE+AR at 108 or higher with MC at 50 or higher and AR+MK at 100
            or higher. SWCC and Navy Diver need AR+VE at 105 or higher with MC at
            51 or higher. EOD needs AR+VE at 109 or higher with MC at 51 or
            higher.
          </p>
        </aside>

        <p className="text-text-secondary">
          The full rating-by-rating breakdown is on our{" "}
          <Link
            href="/navy-ratings-list"
            className="text-accent hover:text-accent-hover"
          >
            Navy ratings list
          </Link>
          , with tier minimums at{" "}
          <Link
            href="/navy-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Navy ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. Marine Corps MOS ASVAB Line Score Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Half the sites online list the Marine GT formula wrong, which sends
          recruits to study the wrong material. The correct formula is simple: GT
          is Verbal Expression plus Arithmetic Reasoning, the same as the Army.
        </p>

        <p className="text-text-secondary">
          The Marines use five line scores. Here is how each one is built.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
          <br />
          EL = GS + AR + MK + EI
          <br />
          MM = AR + EI + MC + AS
          <br />
          CL = WK + PC + MK
          <br />
          ST = GS + VE + MK + MC
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Marine GT is VE + AR, not WK + PC + AR + MC. If you want a GT-gated
            MOS, study verbal and arithmetic reasoning. Drilling mechanical
            comprehension does nothing for your GT.
          </p>
        </aside>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Required Line Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0311
                </td>
                <td className="py-2 pr-4">Rifleman</td>
                <td className="py-2 pr-4 font-mono">GT 80</td>
                <td className="py-2">Most infantry slots</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0331
                </td>
                <td className="py-2 pr-4">Machine Gunner</td>
                <td className="py-2 pr-4 font-mono">GT 80</td>
                <td className="py-2">Crew-served weapons</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0341
                </td>
                <td className="py-2 pr-4">Mortarman</td>
                <td className="py-2 pr-4 font-mono">GT 80</td>
                <td className="py-2">Indirect fire</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0317
                </td>
                <td className="py-2 pr-4">Scout Sniper</td>
                <td className="py-2 pr-4 font-mono">GT 100</td>
                <td className="py-2">Sniper school required</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0321
                </td>
                <td className="py-2 pr-4">Reconnaissance Marine</td>
                <td className="py-2 pr-4 font-mono">GT 105</td>
                <td className="py-2">Plus BRC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0372
                </td>
                <td className="py-2 pr-4">Critical Skills Operator (MARSOC)</td>
                <td className="py-2 pr-4 font-mono">GT 105</td>
                <td className="py-2">Plus assessment and selection</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0811
                </td>
                <td className="py-2 pr-4">Field Artillery Cannoneer</td>
                <td className="py-2 pr-4 font-mono">GT 90</td>
                <td className="py-2">M777A2 crews</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0621
                </td>
                <td className="py-2 pr-4">Transmission Systems Operator</td>
                <td className="py-2 pr-4 font-mono">EL 105</td>
                <td className="py-2">Tactical comms</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0651
                </td>
                <td className="py-2 pr-4">Cyber Network Operator</td>
                <td className="py-2 pr-4 font-mono">GT 110</td>
                <td className="py-2">Secret clearance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  0671
                </td>
                <td className="py-2 pr-4">Data Systems Administrator</td>
                <td className="py-2 pr-4 font-mono">GT 110</td>
                <td className="py-2">IT administration</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  1721
                </td>
                <td className="py-2 pr-4">Cyberspace Warfare Operator</td>
                <td className="py-2 pr-4 font-mono">GT 110</td>
                <td className="py-2">TS/SCI clearance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  2651
                </td>
                <td className="py-2 pr-4">Special Comms Signals Collection</td>
                <td className="py-2 pr-4 font-mono">GT 110, EL 110</td>
                <td className="py-2">TS/SCI clearance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  2831
                </td>
                <td className="py-2 pr-4">Digital Wideband Repairer</td>
                <td className="py-2 pr-4 font-mono">EL 115</td>
                <td className="py-2">Highest common EL req</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  6111
                </td>
                <td className="py-2 pr-4">
                  Helicopter/Tiltrotor Mechanic-Trainee
                </td>
                <td className="py-2 pr-4 font-mono">MM 105</td>
                <td className="py-2">Aviation maintenance</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          For the complete Marine list, see our{" "}
          <Link
            href="/usmc-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            USMC MOS list
          </Link>
          , and check minimums at{" "}
          <Link
            href="/marines-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Marines ASVAB score requirements
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. The GT 110 Threshold: The Score That Unlocks the Most Jobs
        </h2>

        <p className="mt-4 text-text-secondary">
          If you only chase one composite, chase GT. It appears in both the Army
          and the Marines, it gates more jobs than any other line score, and 110
          is the magic number across the board.
        </p>

        <p className="text-text-secondary">
          GT is VE + AR, the same two ingredients in both branches. Here is what
          each GT tier unlocks.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GT 110</p>
            <p className="mt-1 text-sm text-text-secondary">
              Officer and warrant officer candidacy, Special Forces, and most
              cyber and intelligence MOSs
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GT 107</p>
            <p className="mt-1 text-sm text-text-secondary">
              Many medical specialties, plus Psychological Operations and Civil
              Affairs
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GT 100</p>
            <p className="mt-1 text-sm text-text-secondary">
              Human Resources and broad qualification for technical and
              administrative roles
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GT 95</p>
            <p className="mt-1 text-sm text-text-secondary">
              A solid baseline that keeps most non-specialized doors open
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The fastest way to move your GT is verbal. VE is one of the two GT
          components, and it is also doubled in the AFQT formula. Every point you
          gain in Word Knowledge or Paragraph Comprehension raises your GT and
          your AFQT at the same time.
        </p>

        <p className="text-text-secondary">
          Read the full breakdown in our{" "}
          <Link
            href="/gt-score"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB GT score guide
          </Link>
          , or run your own numbers with the{" "}
          <Link
            href="/asvab-line-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB line score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. How to Hit Your Target Job&apos;s Score
        </h2>

        <p className="mt-4 text-text-secondary">
          A requirement table is useless until you turn it into a study list. The
          MOS ASVAB score requirements above tell you what to study, not just
          what to clear.
        </p>

        <p className="text-text-secondary">
          Work backward from your job to the subtests that feed it:
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Confirm you clear your branch&apos;s AFQT minimum, the enlistment
            gate.
          </li>
          <li>
            Find your target job&apos;s required composite in its branch table
            above.
          </li>
          <li>Read that composite&apos;s formula to see which subtests feed it.</li>
          <li>Drill those specific subtests, not the whole test evenly.</li>
          <li>
            Recompute your composite with the line score calculator to confirm
            you cleared it.
          </li>
        </ol>

        <p className="text-text-secondary">
          Run a real example. Army 35F (Intelligence Analyst) needs ST 101, and
          ST = GS + VE + MK + MC. That means your study time goes to General
          Science, verbal, Mathematics Knowledge, and Mechanical Comprehension.
          Auto and Shop or Electronics Information would not move that number at
          all.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Verbal (VE) feeds GT, CL, ST, SC, and OF, and it is doubled in the
            AFQT. No other study area pays off in more places. If you are unsure
            where to start, start with vocabulary and reading.
          </p>
        </aside>

        <p className="text-text-secondary">
          Build your plan with our{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB study guide
          </Link>
          , find your weak subtests with a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice test
          </Link>
          , and check your composites against any job with the{" "}
          <Link
            href="/asvab-line-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            line score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          MOS ASVAB Score Requirements FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for a specific MOS?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Each MOS, AFSC, or rating has its own composite requirement, not a
              single ASVAB number. Find your target job in its branch table
              above, note the required line score or composite, then study the
              subtests that feed it. Plug your scores into our{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB score calculator
              </Link>{" "}
              to see which jobs you already qualify for.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do MOS requirements use my AFQT or a different score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A different score. Your AFQT is the enlistment gate, a percentile
              from 4 subtests. Jobs are gated by composites: line scores in the
              Army and Marines, MAGE composites in the Air Force and Space Force,
              and rating composites in the Navy and Coast Guard. You need to clear
              both gates.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the highest line score requirement in the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              EL 117 for MOS 25S, Satellite Communication Systems
              Operator-Maintainer, is the highest single line score requirement
              in the Army. EL combines General Science, Arithmetic Reasoning,
              Mathematics Knowledge, and Electronics Information, so it rewards
              strong math and science scores.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the Marine GT score WK + PC + AR + MC?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Marine GT is VE + AR, where VE is your combined Word Knowledge
              and Paragraph Comprehension. The longer formula is a common myth
              that sends recruits to study mechanical comprehension, which does
              nothing for GT. Study verbal and arithmetic reasoning instead.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why do some Army composites include subtests not on the test?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CO, FA, MM, and OF formulas still reference Coding Speed and
              Numerical Operations, two subtests removed from the modern ASVAB.
              The Army plugs in fixed dummy averages for them, so you cannot raise
              those composites by studying those phantom subtests.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What MOS can I get with a low ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Low-composite jobs exist, like Army Infantry (CO 87) and Unit
              Supply (CL 90), or Marine Rifleman (GT 80). You still have to clear
              your branch&apos;s AFQT minimum first. A low score limits your
              options and your bonus eligibility, so retaking is often worth it.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need to be an officer or go Special Forces?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT 110. That threshold gates Army and Marine officer and warrant
              officer candidacy, Army Special Forces (18X), and most cyber and
              intelligence MOSs. Because GT is VE + AR and VE is doubled in the
              AFQT, verbal study is the fastest way to reach 110.
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
