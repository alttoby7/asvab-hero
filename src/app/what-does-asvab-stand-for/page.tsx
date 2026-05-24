import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "What Does ASVAB Stand For? Acronym Decoded",
  description:
    "ASVAB stands for Armed Services Vocational Aptitude Battery. Decode each word, see 2026 branch minimums, and discover what higher scores unlock.",
  alternates: {
    canonical: "https://asvabhero.com/what-does-asvab-stand-for",
  },
};

export default function WhatDoesASVABStandForPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Does ASVAB Stand For? The Acronym, Decoded",
          description:
            "ASVAB stands for Armed Services Vocational Aptitude Battery. Decode each word, see 2026 branch minimums, and discover what higher scores unlock.",
          url: "https://asvabhero.com/what-does-asvab-stand-for",
          author: {
            "@type": "Person",
            "@id": "https://asvabhero.com/team/jordan-avery#editor",
            name: "Jordan Avery",
            url: "https://asvabhero.com/team/jordan-avery",
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
              name: "What does ASVAB stand for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ASVAB stands for Armed Services Vocational Aptitude Battery. All six U.S. military branches use it to determine enlistment eligibility and assign military jobs. It was created in 1968 and standardized across the Department of Defense in 1976.",
              },
            },
            {
              "@type": "Question",
              name: "Why is it called a battery?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Battery is a psychometric term, coined by Francis Galton in 1884, for a coordinated set of distinct short tests given in one session. The ASVAB has 9 subtests on the computerized version, each measuring a different aptitude. You don&apos;t get one ASVAB score, you get a profile across nine.",
              },
            },
            {
              "@type": "Question",
              name: "Is the ASVAB an IQ test?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The ASVAB measures developed aptitudes, not innate intelligence. It tests skills you&apos;ve built through schooling and experience: vocabulary, math reasoning, mechanical knowledge. Because aptitudes are developed, you can study for them. Most recruits who prep 4-6 weeks raise their AFQT by 10-15 points.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between ASVAB and AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The ASVAB is the full 9-subtest battery. The AFQT (Armed Forces Qualification Test) is a single percentile derived from four subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. AFQT decides whether you can enlist. The other five subtests decide which jobs you qualify for.",
              },
            },
            {
              "@type": "Question",
              name: "Is the ASVAB the same as the SAT or ACT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The SAT and ACT predict college academic readiness. The ASVAB predicts job performance across roughly 200 military occupational specialties. The ASVAB tests electronics, mechanical comprehension, auto and shop knowledge, and spatial reasoning, none of which appear on college entrance exams.",
              },
            },
            {
              "@type": "Question",
              name: "What is a good ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 50 AFQT is the practical threshold where most jobs open up. A 65+ is competitive for technical fields like cyber, intel, and aviation maintenance. Scores of 80+ unlock signing bonuses of $10K to $50K in 2026 and first pick of duty stations and reporting dates.",
              },
            },
            {
              "@type": "Question",
              name: "Can I take the ASVAB without joining the military?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Career Exploration Program (CEP) is offered free in high schools starting in 10th grade with no military obligation. If you take it in 11th or 12th grade, your AFQT score is valid for actual enlistment for two years if you decide to join.",
              },
            },
            {
              "@type": "Question",
              name: "How long are ASVAB scores valid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Standard ASVAB scores are valid for 2 years toward enlistment. PiCAT scores remain valid for 5 years once verified at MEPS. Retake spacing: 30 days after your first attempt, 30 days after your second, then 6 months between any further attempts.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          What Does ASVAB Stand For? The Acronym, Decoded
        </h1>

        <p className="mt-4 text-text-secondary">
          ASVAB stands for <strong>Armed Services Vocational Aptitude Battery</strong>, a multi-subtest exam the U.S. military uses to determine enlistment eligibility and job placement for every branch.
        </p>
        <p className="text-text-secondary">
          Most articles stop at the definition. Each word in that name was chosen deliberately, and the meaning behind &ldquo;Vocational,&rdquo; &ldquo;Aptitude,&rdquo; and &ldquo;Battery&rdquo; changes how you should approach the test.
        </p>
        <p className="text-text-secondary">
          Below: a letter-by-letter breakdown, the 9 subtests inside the battery, the AFQT score that decides if you can enlist, 2026 branch minimums, three test versions, and a prep roadmap. Want to see what your AFQT looks like right now? Try the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">free calculator</Link>.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            ASVAB = Armed Services Vocational Aptitude Battery. Created in 1968 and standardized across all U.S. military branches in 1976, it&apos;s a battery of 9&ndash;10 timed subtests that measures your aptitude for military jobs and determines enlistment eligibility through the AFQT score.
          </p>
        </aside>

        {/* Section 2: Letter by Letter */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Letter by Letter: What Each Word Means
        </h2>

        <p className="mt-4 text-text-secondary">
          Each word in &ldquo;Armed Services Vocational Aptitude Battery&rdquo; was chosen deliberately. Decoding them tells you what the test actually measures and how to prepare.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Letter</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Word</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Means</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">A</td>
                <td className="py-2 pr-4 font-semibold text-text-primary">Armed</td>
                <td className="py-2">All six U.S. Armed Forces use it: Army, Navy, Air Force, Marine Corps, Coast Guard, Space Force.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">S</td>
                <td className="py-2 pr-4 font-semibold text-text-primary">Services</td>
                <td className="py-2">One unified test replacing the fragmented branch-specific exams used before 1976.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">V</td>
                <td className="py-2 pr-4 font-semibold text-text-primary">Vocational</td>
                <td className="py-2">Career and job placement focused, not academic like the SAT or ACT.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">A</td>
                <td className="py-2 pr-4 font-semibold text-text-primary">Aptitude</td>
                <td className="py-2">Measures developed ability and potential, not memorized knowledge. You can study for it.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">B</td>
                <td className="py-2 pr-4 font-semibold text-text-primary">Battery</td>
                <td className="py-2">A psychometric term for a coordinated set of multiple distinct tests in one session.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Armed.</strong> Every branch of the U.S. Armed Forces uses ASVAB scores. Army, Navy, Air Force, Marine Corps, Coast Guard, and Space Force all pull recruits from the same scoring system. A single score qualifies you for any branch you want to talk to. The test doesn&apos;t change based on which recruiter you walked in to see.
        </p>
        <p className="text-text-secondary">
          <strong>Services.</strong> Before 1976, each branch ran its own entrance exam with its own scoring. A score from one branch meant nothing to the others. The Department of Defense forced standardization that year so the services could compare candidates on a single scale and share aptitude data nationally. The &ldquo;S&rdquo; is the reason cross-branch transfers and joint qualification standards exist at all.
        </p>
        <p className="text-text-secondary">
          <strong>Vocational.</strong> The SAT and ACT predict college academic readiness. The ASVAB predicts job performance in roughly 200 military occupational specialties. Every subtest maps to job clusters: mechanical scores feed mechanic and aviation maintenance jobs, electronics scores feed avionics and cyber, clerical scores feed admin and intel. The test isn&apos;t asking if you&apos;d succeed in college. It&apos;s asking which military job you&apos;d succeed in.
        </p>
        <p className="text-text-secondary">
          <strong>Aptitude.</strong> Aptitude means developed ability, not innate IQ and not raw memorization. The myth that aptitude tests are immune to studying costs recruits real points every year. You build aptitude the same way you build any skill: targeted practice on the question types the test uses. Recruits who study 4&ndash;6 weeks routinely pick up 10&ndash;15 AFQT points.
        </p>
        <p className="text-text-secondary">
          <strong>Battery.</strong> Psychometricians use &ldquo;battery&rdquo; to describe a coordinated set of distinct short tests given in one session. The term traces to Francis Galton in 1884. The ASVAB battery has 9 subtests on the computer-adaptive version, each measuring a different aptitude domain. You don&apos;t get one ASVAB score. You get a score on every subtest, plus composite scores derived from them.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The myth that aptitude tests can&apos;t be studied for is wrong. Studies consistently show prep raises ASVAB scores 10&ndash;15 points, enough to unlock dozens more jobs and bonuses up to $50K.
          </p>
        </aside>

        {/* Section 3: 9 Subtests */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The 9 ASVAB Subtests: What the Battery Actually Measures
        </h2>

        <p className="mt-4 text-text-secondary">
          The CAT-ASVAB has 9 subtests. Each one measures a specific aptitude that maps to military job clusters.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Code</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">What It Measures</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Approx. Questions</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">General Science</td>
                <td className="py-2 pr-4 font-mono">GS</td>
                <td className="py-2 pr-4">Life, earth, physical sciences</td>
                <td className="py-2 font-mono">16</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Arithmetic Reasoning</td>
                <td className="py-2 pr-4 font-mono">AR</td>
                <td className="py-2 pr-4">Math word problems</td>
                <td className="py-2 font-mono">16</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Word Knowledge</td>
                <td className="py-2 pr-4 font-mono">WK</td>
                <td className="py-2 pr-4">Vocabulary</td>
                <td className="py-2 font-mono">16</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Paragraph Comprehension</td>
                <td className="py-2 pr-4 font-mono">PC</td>
                <td className="py-2 pr-4">Reading comprehension</td>
                <td className="py-2 font-mono">11</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mathematics Knowledge</td>
                <td className="py-2 pr-4 font-mono">MK</td>
                <td className="py-2 pr-4">High school math concepts</td>
                <td className="py-2 font-mono">16</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Electronics Information</td>
                <td className="py-2 pr-4 font-mono">EI</td>
                <td className="py-2 pr-4">Electrical principles, circuits</td>
                <td className="py-2 font-mono">16</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Auto &amp; Shop Information</td>
                <td className="py-2 pr-4 font-mono">AS</td>
                <td className="py-2 pr-4">Auto and shop knowledge</td>
                <td className="py-2 font-mono">11</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mechanical Comprehension</td>
                <td className="py-2 pr-4 font-mono">MC</td>
                <td className="py-2 pr-4">Mechanical principles, physics</td>
                <td className="py-2 font-mono">16</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Assembling Objects</td>
                <td className="py-2 pr-4 font-mono">AO</td>
                <td className="py-2 pr-4">Spatial reasoning</td>
                <td className="py-2 font-mono">16</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Four of those subtests carry outsized weight. Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge feed the AFQT score, the percentile every branch uses to decide if you can enlist at all. The other five subtests only affect job qualification through line scores. If your AFQT is below the branch minimum, your score on Electronics Information doesn&apos;t matter, because you can&apos;t enlist in the first place.
        </p>
        <p className="text-text-secondary">
          The other five subtests still control your job options. Electronics Information feeds avionics, cyber, and signal intelligence ratings. Mechanical Comprehension and Auto &amp; Shop feed maintenance, motor transport, and aviation mechanic slots. General Science feeds medical, nuclear, and bio-tech ratings. Assembling Objects feeds engineering, drafting, and certain aviation roles. Each branch combines these scores into composite &ldquo;line scores&rdquo; with different formulas, then matches them against minimum cutoffs for every Military Occupational Specialty (MOS), rate, or Air Force Specialty Code (AFSC).
        </p>
        <p className="text-text-secondary">
          The practical takeaway. AFQT subtests open the door. Line-score subtests pick the room. Plan your study time accordingly. Try a{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">free practice test</Link> to see where you stand.
        </p>

        {/* Section 4: AFQT */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT: The Score That Decides If You Can Enlist
        </h2>

        <p className="mt-4 text-text-secondary">
          People say &ldquo;ASVAB score&rdquo; but mean &ldquo;AFQT score.&rdquo; AFQT is a single percentile derived from four ASVAB subtests, and it&apos;s the number every branch uses to decide if you qualify.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = AR + MK + (2 &times; VE)
          <br />
          where VE = WK + PC
        </div>

        <p className="text-text-secondary">
          The raw subtest scores convert to a percentile from 1 to 99. A 50 means you scored better than 50% of a 1997 reference population of 18&ndash;23-year-olds. It is not a percentage of questions correct. It is not a grade. A 65 AFQT does not mean you got 65% right. It means you outperformed 65% of that reference group.
        </p>
        <p className="text-text-secondary">
          The Department of Defense sorts those percentiles into eight categories. Categories I through IIIA (50 and above) are considered fully qualified. Categories IIIB and below face job restrictions, slot caps, and recruiter quotas, especially when the services are meeting recruiting goals. Category V is automatically disqualified by federal law. For the complete scoring breakdown, see{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB scores explained</Link>.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Percentile Range</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Signals</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-400">I</td>
                <td className="py-2 pr-4 font-mono">93&ndash;99</td>
                <td className="py-2">Exceptional</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-emerald-300">II</td>
                <td className="py-2 pr-4 font-mono">65&ndash;92</td>
                <td className="py-2">Above average</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-sky-400">IIIA</td>
                <td className="py-2 pr-4 font-mono">50&ndash;64</td>
                <td className="py-2">Average, full job range opens</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-amber-400">IIIB</td>
                <td className="py-2 pr-4 font-mono">31&ndash;49</td>
                <td className="py-2">Below average, limited jobs</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">IVA</td>
                <td className="py-2 pr-4 font-mono">21&ndash;30</td>
                <td className="py-2">Marginal</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">IVB</td>
                <td className="py-2 pr-4 font-mono">16&ndash;20</td>
                <td className="py-2">Marginal</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-bold text-orange-400">IVC</td>
                <td className="py-2 pr-4 font-mono">10&ndash;15</td>
                <td className="py-2">Rarely accepted</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-bold text-red-400">V</td>
                <td className="py-2 pr-4 font-mono">0&ndash;9</td>
                <td className="py-2">Disqualified</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Hitting the minimum opens the door but limits your options. A 50+ AFQT unlocks the full range of MOS, rate, and AFSC choices in most branches. Aim for 65+ to be competitive for technical jobs and bonuses.
          </p>
        </aside>

        <p className="text-text-secondary">
          Run your projected AFQT through the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">calculator</Link> to see which category you&apos;re sitting in.
        </p>

        {/* Section 5: Branch Minimums */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2026 Branch Minimums and What Higher Scores Unlock
        </h2>

        <p className="mt-4 text-text-secondary">
          Each branch sets its own minimum AFQT. Clearing the minimum gets you in the door. The higher you score, the more jobs and money you unlock.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Minimum AFQT</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 font-mono">35</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Marine Corps</td>
                <td className="py-2 font-mono">32</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td>
                <td className="py-2 font-mono">32</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Published minimums are floors for high school diploma graduates. GED holders typically need 50 or higher across every branch, and the services routinely raise their internal cutoffs above the published number when recruiting is strong. In 2026 the Coast Guard and Space Force commonly require 50+ in practice, and the Air Force often passes on diploma applicants under 50 unless they fill a critical specialty.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Minimum to 49</p>
            <p className="mt-1 text-sm text-text-secondary">You qualify, but available jobs are limited. Expect general labor, infantry, or open contracts where the branch picks for you.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">50 to 64</p>
            <p className="mt-1 text-sm text-text-secondary">Full range opens in most branches. Technical fields like avionics, intel analyst, and combat medic become accessible.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">65 to 79</p>
            <p className="mt-1 text-sm text-text-secondary">Competitive territory. Most specialized jobs, cleared positions, and language schools open up.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">80 and above</p>
            <p className="mt-1 text-sm text-text-secondary">Elite range. Cyber, intel, linguist, and nuclear ratings come with signing bonuses of $10K to $50K+ in 2026, plus first pick of duty stations and reporting dates.</p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The minimum is a floor, not a goal. Aim for 65+ as your baseline target. Recruits scoring 80+ pick from every job and frequently negotiate signing bonuses.
          </p>
        </aside>

        {/* Section 6: Three Ways to Take */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Three Ways to Take the ASVAB: CAT, PiCAT, and CEP
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB you take depends on where you take it. Three formats are in use in 2026, each with different rules.
        </p>

        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">CAT-ASVAB (Computerized Adaptive Test)</h3>
            <p className="mt-1 text-sm text-text-secondary">
              You take this at a Military Entrance Processing Station (MEPS). 145 questions across 9 subtests, roughly 155 minutes total. The software is adaptive, meaning it serves harder questions when you answer correctly and easier ones when you miss. The CAT-ASVAB is the official enlistment test, and it&apos;s the one your contract is built on.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              The adaptive nature trips up first-timers. The test feels brutal because the software is targeting your skill ceiling. If the questions seem hard, that&apos;s a signal you&apos;re scoring well, not a sign you&apos;re failing.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">PiCAT (Pre-screen, internet-delivered Computerized Adaptive Test)</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The PiCAT is taken at home, on your own computer, untimed, with up to 24 hours to complete. Same 145 questions as the CAT-ASVAB. After you submit, you go to MEPS for a 25&ndash;30 minute proctored verification test called the Vtest. Pass the Vtest and your PiCAT score becomes your official ASVAB score.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              PiCAT is for first-time takers only, and scores stay valid for 5 years. Removing time pressure changes the game for anyone who freezes under a clock.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">CEP (Career Exploration Program)</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CEP is the school-based version, free, with no military obligation. Available in 10th grade and up. It&apos;s paper-based and runs about 160 minutes. If you take it in 11th or 12th grade, the AFQT score from your CEP test is valid for actual enlistment. Many recruits don&apos;t realize they already have a usable ASVAB score from sophomore or junior year.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Scores from any version count for two years toward enlistment. Retake spacing: 30 days after your first attempt, 30 days after your second, then 6 months between any further attempts.
          </p>
        </aside>

        {/* Section 7: History */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why the Military Built the ASVAB: A 60-Second History
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB exists because every branch used to run its own incompatible entrance test, making cross-branch standards impossible.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">1968</p>
            <p className="mt-1 text-sm text-text-secondary">First version of ASVAB developed for high school career counseling</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">1973</p>
            <p className="mt-1 text-sm text-text-secondary">Air Force becomes the first branch to adopt it for enlistment</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">1976</p>
            <p className="mt-1 text-sm text-text-secondary">All U.S. military branches mandated to use ASVAB exclusively</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">1980</p>
            <p className="mt-1 text-sm text-text-secondary">Reference population study establishes the percentile baseline still used today</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">2026</p>
            <p className="mt-1 text-sm text-text-secondary">Roughly 1.2 million test-takers per year across CAT, PiCAT, and CEP</p>
          </div>
        </div>

        <p className="text-text-secondary">
          Before 1976, an Army recruit and a Navy recruit took completely different tests with incompatible scoring systems. A high score in one branch told you nothing about how that recruit would have performed in another. Standardization meant cross-branch transfers became possible, joint qualification standards could be set, and the Department of Defense could finally compare aptitude data on a single national scale.
        </p>
        <p className="text-text-secondary">
          The 1980 reference population study, called the Profile of American Youth, surveyed nearly 12,000 young Americans aged 18&ndash;23 and remains the baseline that every AFQT percentile is calculated against today. When a recruit scores a 65 in 2026, that 65 is benchmarked against 1980 test-takers, which keeps scoring stable across decades.
        </p>

        {/* Section 8: What to Do Next */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What to Do Next: Your ASVAB Prep Roadmap
        </h2>

        <p className="mt-4 text-text-secondary">
          Knowing what does ASVAB stand for is the easy part. The next step is figuring out where you stand and how much prep gets you to your target score.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 1</p>
            <p className="mt-1 text-sm text-text-secondary">Take a free practice test to baseline your current AFQT</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Weeks 2&ndash;4</p>
            <p className="mt-1 text-sm text-text-secondary">Drill the four AFQT subtests (AR, WK, PC, MK) — these decide enlistment</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Weeks 5&ndash;6</p>
            <p className="mt-1 text-sm text-text-secondary">Add line-score subtests for the jobs you actually want (EI, MC, GS, AS, AO)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 7</p>
            <p className="mt-1 text-sm text-text-secondary">Full-length timed practice test to simulate MEPS conditions</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Test day</p>
            <p className="mt-1 text-sm text-text-secondary">Show up rested. CAT-ASVAB rewards steady accuracy, not speed.</p>
          </div>
        </div>

        <p className="text-text-secondary">
          Most recruits who study 4&ndash;6 weeks see 10&ndash;15 point AFQT improvements. That&apos;s often the difference between an open contract and a guaranteed technical job with a $20K+ bonus. Run your numbers through the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">AFQT calculator</Link> and stress-test them with a full-length{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">practice test</Link> before you sit at MEPS.
        </p>
        <p className="text-text-secondary">
          Two prep moves return the most points per hour. First, drill Word Knowledge with vocabulary flashcards because WK questions are pure recall and counted twice in the AFQT formula. Second, work Arithmetic Reasoning word problems daily because AR scores correlate most strongly with overall AFQT and most retakers report the steepest gains there.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Want a 7-week ASVAB study plan in your inbox? Subscribe to ASVAB Hero and we&apos;ll send you week-by-week drills mapped to your target AFQT.
          </p>
        </aside>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What does ASVAB stand for?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              ASVAB stands for Armed Services Vocational Aptitude Battery. All six U.S. military branches use it to determine enlistment eligibility and assign military jobs. It was created in 1968 and standardized across the Department of Defense in 1976.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Why is it called a &ldquo;battery&rdquo;?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              &ldquo;Battery&rdquo; is a psychometric term, coined by Francis Galton in 1884, for a coordinated set of distinct short tests given in one session. The ASVAB has 9 subtests on the computerized version, each measuring a different aptitude. You don&apos;t get one ASVAB score, you get a profile across nine.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Is the ASVAB an IQ test?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The ASVAB measures developed aptitudes, not innate intelligence. It tests skills you&apos;ve built through schooling and experience: vocabulary, math reasoning, mechanical knowledge. Because aptitudes are developed, you can study for them. Most recruits who prep 4&ndash;6 weeks raise their AFQT by 10&ndash;15 points.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What&apos;s the difference between ASVAB and AFQT?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The ASVAB is the full 9-subtest battery. The AFQT (Armed Forces Qualification Test) is a single percentile derived from four subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. AFQT decides whether you can enlist. The other five subtests decide which jobs you qualify for.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Is the ASVAB the same as the SAT or ACT?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The SAT and ACT predict college academic readiness. The ASVAB predicts job performance across roughly 200 military occupational specialties. The ASVAB tests electronics, mechanical comprehension, auto and shop knowledge, and spatial reasoning, none of which appear on college entrance exams.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is a good ASVAB score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              A 50 AFQT is the practical threshold where most jobs open up. A 65+ is competitive for technical fields like cyber, intel, and aviation maintenance. Scores of 80+ unlock signing bonuses of $10K to $50K in 2026 and first pick of duty stations and reporting dates.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Can I take the ASVAB without joining the military?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The Career Exploration Program (CEP) is offered free in high schools starting in 10th grade with no military obligation. If you take it in 11th or 12th grade, your AFQT score is valid for actual enlistment for two years if you decide to join.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How long are ASVAB scores valid?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Standard ASVAB scores are valid for 2 years toward enlistment. PiCAT scores remain valid for 5 years once verified at MEPS. Retake spacing: 30 days after your first attempt, 30 days after your second, then 6 months between any further attempts.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Ready to check your AFQT? Try our{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">free calculator</Link>{" "}
            or take a full{" "}
            <Link href="/practice-test" className="text-accent hover:text-accent-hover">practice test</Link>.
          </p>
        </aside>

        {/* CTA Box */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite scores, and every job you qualify for.
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
