import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Air Force AFSC List 2026: Every Job With ASVAB Scores | ASVAB Hero",
  description:
    "Complete Air Force AFSC list with MAGE composite score requirements for every enlisted job. Find which AFSCs your ASVAB score qualifies you for in 2026.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-afsc-list",
  },
};

export default function AirForceAFSCListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Air Force AFSC List 2026: Every Job With ASVAB Scores",
          description:
            "Complete Air Force AFSC list with MAGE composite score requirements for every enlisted job. Find which AFSCs your ASVAB score qualifies you for in 2026.",
          url: "https://asvabhero.com/air-force-afsc-list",
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
          dateModified: "2026-03-22",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How many AFSCs are in the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Air Force has approximately 130 enlisted AFSCs across four major career groups: Operations (1-series), Maintenance and Logistics (2-series), Support (3-series), and Medical (4-series). Additional specialty codes exist for special duty assignments (8-series) and reporting identifiers (9-series). The exact count changes as the Air Force adds, merges, or eliminates career fields.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do you need for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You need an AFQT score of 31 with a high school diploma or 50 with a GED to enlist. But the AFQT only gets you in the door. Individual AFSCs require specific MAGE composite scores ranging from G 33 (Security Forces) to G 72 (Cryptologic Language Analyst).",
              },
            },
            {
              "@type": "Question",
              name: "Can you pick your AFSC before enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You list preferred AFSCs on a \"dream sheet,\" but you do not get to choose a guaranteed job before swearing in. Your recruiter books you into an available slot that matches your qualifications. Listing 8-10 AFSCs increases the odds of getting something you want. The job you are offered is locked into your contract before you ship to basic training.",
              },
            },
            {
              "@type": "Question",
              name: "What is the hardest Air Force AFSC to get into?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "By ASVAB score alone, Cryptologic Language Analyst (1N3X1) and Airborne Cryptologic Language Analyst (1A8X1) require the highest composite at G 72, plus a passing DLAB score. Cyber Warfare Operations (1B4X1) requires a separate EDPT with a minimum score of 70. By overall selection difficulty, special warfare AFSCs (Combat Controller, Pararescue, TACP) have 60-80% training attrition.",
              },
            },
            {
              "@type": "Question",
              name: "Can you change your AFSC after enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, but not easily. You can apply to retrain into a new AFSC at certain career milestones, typically at the end of your first enlistment or when your career field is overmanned. The Air Force publishes annual retraining advisory lists showing which AFSCs accept retrainees. Some high-demand AFSCs (cyber, special warfare) accept retrainees more readily.",
              },
            },
            {
              "@type": "Question",
              name: "Do Air Force AFSC requirements change?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Air Force reviews and updates composite score minimums periodically. Requirements can increase when a career field has too many applicants or decrease when manning is short. Bonus eligibility and clearance requirements also shift. The scores in this guide reflect current standards as of 2026, but confirm requirements with your recruiter before making final decisions.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Every Air Force AFSC Listed, With the ASVAB Scores You Actually Need (2026)
        </h1>

        <p className="mt-4 text-text-secondary">
          The Air Force has over 130 enlisted AFSCs (Air Force Specialty Codes), but your ASVAB score eliminates most of them before you ever talk to a recruiter. That is the part nobody tells you upfront.
        </p>

        <p className="text-text-secondary">
          Your AFQT score gets you through the door. A 31 with a diploma (50 with a GED) qualifies you to enlist. But the <strong>Air Force AFSC list</strong> you actually qualify for depends on four composite scores most recruits have never heard of: Mechanical (M), Administrative (A), General (G), and Electronics (E). The MAGE system.
        </p>

        <p className="text-text-secondary">
          Every AFSC requires a minimum score in one of those four composites. Some jobs need a G of 33. Others need a G of 72. Same test, wildly different career paths.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Not sure what your MAGE composites are? Use our{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">
              ASVAB Score Calculator
            </Link>{" "}
            to plug in your subtest scores and see every AFSC you qualify for.
          </p>
        </aside>

        <p className="text-text-secondary">
          This guide lists the major enlisted Air Force specialty codes across every career group, with the exact composite and minimum score for each one. No vague &ldquo;score high&rdquo; advice. Actual numbers.
        </p>

        <p className="text-text-secondary">
          If you are still unfamiliar with how the ASVAB works, start with our{" "}
          <Link href="/what-is-the-asvab" className="text-accent hover:text-accent-hover">
            guide to the ASVAB
          </Link>{" "}
          and come back here once you know your subtest scores.
        </p>

        <p className="text-text-secondary">
          The list below covers operations, maintenance, support, and medical AFSCs, plus the bonus-eligible jobs the Air Force is throwing money at in FY2026. Every score listed comes from current Air Force qualification standards.
        </p>

        <p className="text-text-secondary">
          Your recruiter will hand you a dream sheet. What you put on it determines the next 4-6 years of your life. Know your options before that conversation happens.
        </p>

        {/* ── Section 1: How AFSC Codes Work ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. How Air Force AFSC Codes Work (and What MAGE Scores Mean)
        </h2>

        <p className="mt-4 text-text-secondary">
          Every enlisted Air Force job has a 5-character AFSC code. Once you understand the format, you can decode any job in the Air Force AFSC list on sight.
        </p>

        <p className="text-text-secondary">
          Take 1N0X1 (All Source Intelligence Analyst):
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li><strong>1</strong> &ndash; Career group (Operations)</li>
          <li><strong>N</strong> &ndash; Career field (Intelligence)</li>
          <li><strong>0</strong> &ndash; Specific career field subdivision</li>
          <li><strong>X</strong> &ndash; Skill level (X is a placeholder in published codes)</li>
          <li><strong>1</strong> &ndash; Specific shredout (All Source)</li>
        </ul>

        <p className="text-text-secondary">
          The skill level digit follows a set progression: 1 (helper) after basic training, 3 (apprentice) after tech school, 5 (journeyman) after on-the-job training, 7 (craftsman) for NCOs, and 9 (superintendent) for senior NCOs. When you see &ldquo;X&rdquo; in published AFSC codes, it means the code applies across all skill levels.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          MAGE Composites
        </h3>

        <p className="mt-4 text-text-secondary">
          Your ASVAB produces 9 subtest scores. The Air Force combines specific subtests into four composite scores. These composites, not your AFQT, determine which AFSCs you qualify for.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          G (General) = AR + VE, where VE = WK + PC
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          M (Mechanical) = GS + MC + AS
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          E (Electronics) = GS + AR + MK + EI
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          A (Administrative) = VE, where VE = WK + PC
        </div>

        {/* MAGE Composites Breakdown Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtests</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Score Range</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Common Career Fields</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">G (General)</td>
                <td className="py-2 pr-4">Arithmetic Reasoning + Word Knowledge + Paragraph Comprehension</td>
                <td className="py-2 pr-4 font-mono">20-99</td>
                <td className="py-2">Intelligence, Cyber, Medical, Aircrew</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">M (Mechanical)</td>
                <td className="py-2 pr-4">General Science + Mechanical Comprehension + Auto &amp; Shop Info</td>
                <td className="py-2 pr-4 font-mono">20-99</td>
                <td className="py-2">Aircraft Maintenance, Vehicle Mx, Munitions</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">E (Electronics)</td>
                <td className="py-2 pr-4">General Science + Arithmetic Reasoning + Math Knowledge + Electronics Info</td>
                <td className="py-2 pr-4 font-mono">20-99</td>
                <td className="py-2">Avionics, Cyber Transport, Missile Systems</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">A (Administrative)</td>
                <td className="py-2 pr-4">Word Knowledge + Paragraph Comprehension</td>
                <td className="py-2 pr-4 font-mono">20-99</td>
                <td className="py-2">Personnel, Finance, Contracting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          G is the most common composite requirement across Air Force AFSC codes. If you score well on Arithmetic Reasoning, Word Knowledge, and Paragraph Comprehension, the majority of career fields open up.
        </p>

        <p className="text-text-secondary">
          For a deeper breakdown of how these subtests map to your scores, see our guides on{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">
            ASVAB scores explained
          </Link>{" "}
          and{" "}
          <Link href="/asvab-scoring-and-results" className="text-accent hover:text-accent-hover">
            ASVAB scoring and results
          </Link>.
        </p>

        {/* ── Section 2: Operations AFSCs ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. Operations AFSCs (1-Series): Intelligence, Cyber, Aircrew, and Special Warfare
        </h2>

        <p className="mt-4 text-text-secondary">
          The 1-series contains the highest-profile and most competitive enlisted Air Force jobs. Intelligence analysts, cyber warfare operators, aircrews, and special warfare operators all fall here. If you are chasing a TS/SCI clearance or an aircrew slot, this is your section.
        </p>

        <p className="text-text-secondary">
          Most 1-series AFSCs require a G composite, and the minimums are steep compared to other career groups.
        </p>

        {/* Operations AFSCs Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Clearance</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1A0X1</td>
                <td className="py-2 pr-4">In-Flight Refueling</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">55</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Aircrew</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1A2X1</td>
                <td className="py-2 pr-4">Aircraft Loadmaster</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">57</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Aircrew</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1A8X1</td>
                <td className="py-2 pr-4">Airborne Cryptologic Language Analyst</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">72</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">Highest G requirement</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1B4X1</td>
                <td className="py-2 pr-4">Cyber Warfare Operations</td>
                <td className="py-2 pr-4 font-mono">EDPT</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">Separate aptitude test</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C1X1</td>
                <td className="py-2 pr-4">Air Traffic Control</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">FAA certification path</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C2X1</td>
                <td className="py-2 pr-4">Combat Controller</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Special warfare pipeline</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1N0X1</td>
                <td className="py-2 pr-4">All Source Intelligence</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">64</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">High demand</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1N3X1</td>
                <td className="py-2 pr-4">Cryptologic Language Analyst</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">72</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">DLAB required</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1T2X1</td>
                <td className="py-2 pr-4">Pararescue</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Special warfare pipeline</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">1W0X1</td>
                <td className="py-2 pr-4">Weather</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">66</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Specialized science</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Cyber Warfare Is Different
        </h3>

        <p className="mt-4 text-text-secondary">
          Cyber Warfare Operations (1B4X1) does not use MAGE composites at all. Qualification requires the EDPT (Electronic Data Processing Test), a separate 90-minute logic and reasoning exam with a minimum score of 70. The EDPT tests pattern recognition, spatial reasoning, and abstract logic. It has nothing to do with your ASVAB subtests.
        </p>

        <p className="text-text-secondary">
          You take the EDPT at MEPS or your recruiter&apos;s office, and it is a standalone pass/fail gate. A perfect ASVAB score will not help you if you cannot pass the EDPT.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Language Analyst AFSCs
        </h3>

        <p className="mt-4 text-text-secondary">
          Both 1N3X1 and 1A8X1 require the DLAB (Defense Language Aptitude Battery) in addition to the G 72 minimum. The DLAB tests your ability to learn a new language, not any language you already speak. Scoring well on the DLAB opens the door; the language you get assigned depends on Air Force needs.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-accent">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Special warfare AFSCs like Combat Controller (1C2X1) and Pararescue (1T2X1) have modest ASVAB minimums (G 44) because the real filter is the physical pipeline. Attrition runs 60-80% during training. The ASVAB is the easy part.
          </p>
        </aside>

        <p className="text-text-secondary">
          Intelligence AFSCs (1N series) are consistently high-demand. If you score a G 64 or higher and can pass a TS/SCI background investigation, 1N0X1 is one of the most available bookings in the Air Force.
        </p>

        <p className="text-text-secondary">
          Check your MAGE composites against these requirements using our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            ASVAB Score Calculator
          </Link>. For context on what the top scores look like, see our breakdown of the{" "}
          <Link href="/highest-asvab-score" className="text-accent hover:text-accent-hover">
            highest ASVAB score
          </Link>.
        </p>

        {/* ── Section 3: Maintenance and Logistics AFSCs ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. Maintenance and Logistics AFSCs (2-Series): Aircraft Maintenance, Avionics, and Munitions
        </h2>

        <p className="mt-4 text-text-secondary">
          The 2-series is the largest career group in the Air Force. If the Air Force flies it, someone in a 2-series AFSC maintains it. This group uses M (Mechanical) and E (Electronics) composites almost exclusively.
        </p>

        <p className="text-text-secondary">
          The good news: most aircraft maintenance AFSCs require only an M 47, which is achievable for average ASVAB scorers. The barrier to entry is low. The work is demanding.
        </p>

        {/* Maintenance AFSCs Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Civilian Cert</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A0X1</td>
                <td className="py-2 pr-4">Avionics Test Station &amp; Components</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">Avionics tech</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A3X3</td>
                <td className="py-2 pr-4">Tactical Aircraft Maintenance</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">A&amp;P license eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A5X1</td>
                <td className="py-2 pr-4">Airlift/Special Mission Aircraft Mx</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">A&amp;P license eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A6X1</td>
                <td className="py-2 pr-4">Aerospace Propulsion</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">Jet engine tech</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A7X3</td>
                <td className="py-2 pr-4">Aircraft Structural Maintenance</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">Sheet metal tech</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2M0X1</td>
                <td className="py-2 pr-4">Missile &amp; Space Systems Mx</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">Defense contractor</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2S0X1</td>
                <td className="py-2 pr-4">Materiel Management</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Supply chain</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2T1X1</td>
                <td className="py-2 pr-4">Ground Transportation</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2">CDL/fleet mgmt</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2W0X1</td>
                <td className="py-2 pr-4">Munitions Systems</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">Ordnance tech</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">2W1X1</td>
                <td className="py-2 pr-4">Aircraft Armament Systems</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">47</td>
                <td className="py-2">Weapons systems tech</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The M 47 vs. E 70 Gap
        </h3>

        <p className="mt-4 text-text-secondary">
          There is a significant jump between the two score tiers in this group. An M 47 gets you into most hands-on aircraft maintenance jobs. An E 70 is required for avionics (2A0X1) and missile systems (2M0X1), which involve more electronics theory and troubleshooting with advanced test equipment.
        </p>

        <p className="text-text-secondary">
          If you are sitting at an M 50 but an E 55, the aircraft maintenance path is open. The avionics and missile path is not. That distinction matters when you are building your dream sheet.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-accent">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Aircraft maintenance AFSCs (2A3, 2A5, 2A6) qualify you for FAA Airframe and Powerplant (A&amp;P) certification. A&amp;P mechanics earn $60,000 to $90,000 in the civilian sector. The Air Force pays for your training; the certification follows you out the door.
          </p>
        </aside>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Missile and Space Systems
        </h3>

        <p className="mt-4 text-text-secondary">
          Missile and Space Systems Maintenance (2M0X1) is FY2026 bonus-eligible, driven by the Air Force&apos;s ICBM modernization program (the Sentinel program replacing Minuteman III). The E 70 requirement filters out a large portion of applicants, which keeps demand high. If you have the Electronics composite, this AFSC offers job security for decades.
        </p>

        <p className="text-text-secondary">
          Ground Transportation (2T1X1) has the lowest requirement in the group at M 40 and leads to a CDL (Commercial Driver&apos;s License), which translates directly to civilian logistics and fleet management roles.
        </p>

        <p className="text-text-secondary">
          If your M or E scores are close to these thresholds, a targeted study plan can close the gap. See our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">
            ASVAB study guide
          </Link>{" "}
          for subtest-specific strategies, or plug your current scores into the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            calculator
          </Link>{" "}
          to see where you stand.
        </p>

        {/* ── Section 4: Support AFSCs ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. Support AFSCs (3-Series): Security Forces, Civil Engineering, Cyber Systems, and Services
        </h2>

        <p className="mt-4 text-text-secondary">
          The 3-series has the widest score range of any career group, from a G 33 (Security Forces) all the way up to E 70 (Cyber Transport Systems). This group covers base operations: police, fire, construction, IT, HR, finance, legal, and public affairs.
        </p>

        <p className="text-text-secondary">
          The Air Force AFSC list for 3-series support jobs includes something for nearly every score range.
        </p>

        {/* Support AFSCs Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3D0X2</td>
                <td className="py-2 pr-4">Cyber Systems Operations</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">64</td>
                <td className="py-2">CompTIA Sec+ eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3D1X2</td>
                <td className="py-2 pr-4">Cyber Transport Systems</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">Network engineering</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3E0X1</td>
                <td className="py-2 pr-4">Electrical Systems</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2">Base infrastructure</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3E3X1</td>
                <td className="py-2 pr-4">Structural</td>
                <td className="py-2 pr-4 font-mono">M</td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2">Construction</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3E7X1</td>
                <td className="py-2 pr-4">Fire Protection</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">38</td>
                <td className="py-2">Firefighter/EMT</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3E8X1</td>
                <td className="py-2 pr-4">Explosive Ordnance Disposal</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">57</td>
                <td className="py-2">Bonus-eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3F0X1</td>
                <td className="py-2 pr-4">Personnel</td>
                <td className="py-2 pr-4 font-mono">A</td>
                <td className="py-2 pr-4 font-mono">41</td>
                <td className="py-2">HR management</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3N0X6</td>
                <td className="py-2 pr-4">Public Affairs</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">55</td>
                <td className="py-2">Media/journalism</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3P0X1</td>
                <td className="py-2 pr-4">Security Forces</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">33</td>
                <td className="py-2">Lowest G in any AFSC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">5J0X1</td>
                <td className="py-2 pr-4">Paralegal</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">51</td>
                <td className="py-2">Legal assistant</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">6F0X1</td>
                <td className="py-2 pr-4">Financial Management</td>
                <td className="py-2 pr-4 font-mono">A</td>
                <td className="py-2 pr-4 font-mono">55</td>
                <td className="py-2">Finance/accounting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The Security Forces Reality
        </h3>

        <p className="mt-4 text-text-secondary">
          Security Forces (3P0X1) has a G 33 minimum, the lowest of any AFSC on the Air Force AFSC list. That is not a coincidence. The Air Force needs a large security force across every installation, and the low threshold ensures a steady supply of qualified recruits.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you list fewer than 8-10 AFSCs on your dream sheet, you increase your chances of being assigned Security Forces by default. Recruiters need to fill slots, and 3P0X1 always has openings. Build a long dream sheet with jobs you actually want.
          </p>
        </aside>

        <p className="text-text-secondary">
          Security Forces is a legitimate career path that leads to civilian law enforcement and federal security jobs. But if you scored well enough for other AFSCs and end up in Security Forces because your dream sheet was thin, that is on you.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Cyber and IT
        </h3>

        <p className="mt-4 text-text-secondary">
          Cyber Systems Operations (3D0X2) and Cyber Transport Systems (3D1X2) are the IT backbone of the Air Force. Both lead to CompTIA certifications the Air Force pays for. Civilian network engineers and cybersecurity analysts routinely earn six figures. The G 64 and E 70 minimums reflect the technical aptitude required.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          EOD
        </h3>

        <p className="mt-4 text-text-secondary">
          Explosive Ordnance Disposal (3E8X1) is bonus-eligible in FY2026. The G 57 gets you in the door, but the training pipeline is physically and mentally demanding, similar to special warfare attrition rates. EOD techs are among the most respected enlisted specialists in the Air Force.
        </p>

        <p className="text-text-secondary">
          For score benchmarks across all these roles, see{" "}
          <Link href="/what-is-a-good-asvab-score" className="text-accent hover:text-accent-hover">
            what is a good ASVAB score
          </Link>. If you want to practice before your test, try our{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            ASVAB practice test
          </Link>.
        </p>

        {/* ── Section 5: Medical AFSCs ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. Medical AFSCs (4-Series): Medics, Surgical Techs, Lab, and Dental
        </h2>

        <p className="mt-4 text-text-secondary">
          The 4-series is a direct pipeline to civilian healthcare careers. The Air Force trains you, certifies you, and the credentials transfer to the civilian sector the day you separate.
        </p>

        <p className="text-text-secondary">
          Most medical AFSCs require a G 44, which makes them accessible to a wide range of ASVAB scorers. Lab roles bump the requirement to G 55. No medical AFSC requires a security clearance.
        </p>

        {/* Medical AFSCs Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Civilian Cert</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4N0X1</td>
                <td className="py-2 pr-4">Aerospace Medical Service (Medic)</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">NREMT/Paramedic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4N1X1</td>
                <td className="py-2 pr-4">Surgical Service</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Surgical tech cert</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4P0X1</td>
                <td className="py-2 pr-4">Pharmacy</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Pharmacy tech cert</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4R0X1</td>
                <td className="py-2 pr-4">Diagnostic Imaging</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Radiology tech cert</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4T0X1</td>
                <td className="py-2 pr-4">Medical Laboratory</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">55</td>
                <td className="py-2">MLT certification</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4T0X2</td>
                <td className="py-2 pr-4">Histopathology</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">55</td>
                <td className="py-2">Histotech cert</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">4Y0X1</td>
                <td className="py-2 pr-4">Dental Assistant</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Dental assistant cert</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Why Medical AFSCs Are Underrated
        </h3>

        <p className="mt-4 text-text-secondary">
          The 4-series does not get the same attention as intelligence or cyber, but the return on investment is hard to beat. You train for 4-12 months depending on the AFSC, earn a nationally recognized certification, and walk into a civilian job market that is perpetually short-staffed.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-accent">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The NREMT certification from Aerospace Medical Service (4N0X1) starts a civilian EMS career at $40,000 to $55,000 immediately after separation. Many 4N graduates use it as a stepping stone to nursing or physician assistant programs with GI Bill funding.
          </p>
        </aside>

        <p className="text-text-secondary">
          Diagnostic Imaging (4R0X1) is one of the strongest long-term plays. Radiology techs earn $55,000 to $75,000 in the civilian sector. The Air Force covers training that would cost $30,000+ at a civilian program.
        </p>

        <p className="text-text-secondary">
          Medical Laboratory (4T0X1) and Histopathology (4T0X2) require a G 55, reflecting the additional science and analytical aptitude needed. Both lead to lab certifications that are in high demand at hospitals and reference labs nationwide.
        </p>

        <p className="text-text-secondary">
          The pharmacy tech certification from 4P0X1 is another undervalued outcome. Pharmacy techs earn $35,000 to $45,000 out the gate, and the cert transfers to retail, hospital, and compounding pharmacy settings.
        </p>

        <p className="text-text-secondary">
          If your G composite is in the 44-55 range and you want a career with immediate civilian transferability, the 4-series deserves a hard look. For strategies to improve your General composite, check our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">
            ASVAB study guide
          </Link>. For a full breakdown of what your scores mean, see{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">
            ASVAB scores explained
          </Link>.
        </p>

        {/* ── Section 6: High-Demand and Bonus-Eligible AFSCs ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. High-Demand and Bonus-Eligible AFSCs for 2026
        </h2>

        <p className="mt-4 text-text-secondary">
          The Air Force&apos;s FY2026 enlistment bonus budget hit $141 million, tripled from the prior year. Over 25,000 airmen are bonus-eligible. That kind of money signals exactly where the Air Force is struggling to fill seats.
        </p>

        {/* Stats Row */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">$141M</p>
            <p className="mt-1 text-sm text-text-secondary">Total FY2026 bonus budget (3x prior year)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">25,000+</p>
            <p className="mt-1 text-sm text-text-secondary">Bonus-eligible airmen</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">$2,500 / $75,000</p>
            <p className="mt-1 text-sm text-text-secondary">Minimum and maximum bonus amounts</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">6 years</p>
            <p className="mt-1 text-sm text-text-secondary">Required enlistment contract for all bonuses</p>
          </div>
        </div>

        {/* Bonus-Eligible AFSCs Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Why In-Demand</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1B4X1</td>
                <td className="py-2 pr-4">Cyber Warfare Operations</td>
                <td className="py-2 pr-4 font-mono">EDPT</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">Private sector competition</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1N3X1</td>
                <td className="py-2 pr-4">Cryptologic Language Analyst</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">72</td>
                <td className="py-2">Language shortage</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1A8X1</td>
                <td className="py-2 pr-4">Airborne Cryptologic Language Analyst</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">72</td>
                <td className="py-2">Language + flight</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C2X1</td>
                <td className="py-2 pr-4">Combat Controller</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Special warfare attrition</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1T2X1</td>
                <td className="py-2 pr-4">Pararescue</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Special warfare attrition</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C4X1</td>
                <td className="py-2 pr-4">Tactical Air Control Party (TACP)</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">44</td>
                <td className="py-2">Special warfare attrition</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3E8X1</td>
                <td className="py-2 pr-4">Explosive Ordnance Disposal</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">57</td>
                <td className="py-2">Pipeline difficulty</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2M0X1</td>
                <td className="py-2 pr-4">Missile &amp; Space Systems Mx</td>
                <td className="py-2 pr-4 font-mono">E</td>
                <td className="py-2 pr-4 font-mono">70</td>
                <td className="py-2">ICBM modernization</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">3P0X1</td>
                <td className="py-2 pr-4">Security Forces</td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">33</td>
                <td className="py-2">Manning shortages</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Why These AFSCs Pay Bonuses
        </h3>

        <p className="mt-4 text-text-secondary">
          The pattern is straightforward. Bonuses exist where the Air Force cannot retain or recruit enough people.
        </p>

        <p className="text-text-secondary">
          Cyber Warfare (1B4X1) competes directly with private sector cybersecurity jobs paying $100K+ for the same skill set. The Air Force cannot match that salary, so bonuses close the gap.
        </p>

        <p className="text-text-secondary">
          Language analyst AFSCs (1N3X1, 1A8X1) require rare aptitude. Not many recruits pass the DLAB at the level needed for critical languages like Mandarin, Arabic, or Farsi. Small qualified pool, persistent demand.
        </p>

        <p className="text-text-secondary">
          Special warfare AFSCs (Combat Controller, Pararescue, TACP) have the highest bonuses because 60-80% of candidates wash out during the training pipeline. The Air Force needs a large funnel of recruits to produce a small number of operators.
        </p>

        <p className="text-text-secondary">
          Missile and Space Systems (2M0X1) is driven by the Sentinel ICBM modernization program, the largest nuclear weapons project in decades. The Air Force needs technicians now and for the next 20 years.
        </p>

        <p className="text-text-secondary">
          Security Forces (3P0X1) appears on the bonus list because of chronic manning shortages across installations, not because the job is hard to qualify for. The low G 33 minimum means almost everyone qualifies. The challenge is getting people to choose it.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Bonus amounts change quarterly and are not publicly listed with specific dollar figures. Ask your recruiter for current amounts. Do not pick an AFSC solely for the bonus. The bonus pays once; you live with the job for 6 years.
          </p>
        </aside>

        <p className="text-text-secondary">
          All bonuses require a 6-year enlistment contract. The money is paid after you complete training, not at the time of signing. If you wash out of a pipeline, you do not receive the bonus and may be reclassified into a different AFSC.
        </p>

        <p className="text-text-secondary">
          See which bonus-eligible AFSCs match your scores with our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            calculator
          </Link>. For a breakdown of enlisted pay and rank progression, see{" "}
          <Link href="/air-force-ranks" className="text-accent hover:text-accent-hover">
            Air Force ranks
          </Link>.
        </p>

        {/* ── Section 7: How to Match Your Score ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. How to Match Your ASVAB Score to the Right AFSC
        </h2>

        <p className="mt-4 text-text-secondary">
          Reading through the full Air Force AFSC list is step one. Turning it into an action plan is step two.
        </p>

        {/* Steps Stats Row */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 1</p>
            <p className="mt-1 text-sm text-text-secondary">Calculate your 4 MAGE composites from your subtest scores</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 2</p>
            <p className="mt-1 text-sm text-text-secondary">Filter this list to AFSCs where you meet or exceed the minimum</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 3</p>
            <p className="mt-1 text-sm text-text-secondary">Rank qualifying AFSCs by interest, not just score (career fit, deployment tempo, civilian creds)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 4</p>
            <p className="mt-1 text-sm text-text-secondary">List 8-10 AFSCs on your dream sheet. More options means better booking odds.</p>
          </div>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          What the Minimums Do Not Tell You
        </h3>

        <p className="mt-4 text-text-secondary">
          Meeting the minimum composite score does not guarantee you get the job. AFSC availability changes monthly based on Air Force manning levels, training seat capacity, and separation rates. A recruiter can only book you into a slot that exists in the system at the time you are ready to ship.
        </p>

        <p className="text-text-secondary">
          That is why listing 8-10 AFSCs matters. If your top choice has no open slots for three months, your second or third choice might ship next week. A short dream sheet gives you fewer options and more waiting.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          When to Retake the ASVAB
        </h3>

        <p className="mt-4 text-text-secondary">
          If you are within 5-10 points of a composite minimum for an AFSC you want, a retake is worth considering. You can retake the ASVAB after 30 days, then again after another 30 days, then every 6 months after that.
        </p>

        <p className="text-text-secondary">
          Focused study on the specific subtests that feed your weak composite can move the needle significantly. If your G composite is short, study Arithmetic Reasoning, Word Knowledge, and Paragraph Comprehension. If your E composite is low, focus on Electronics Information and Math Knowledge.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Beyond the ASVAB
        </h3>

        <p className="mt-4 text-text-secondary">
          Some AFSCs have qualification factors the ASVAB does not measure. TS/SCI clearance AFSCs require a clean background investigation that can take 6-12 months. Aircrew AFSCs require a flight physical. Special warfare AFSCs require a PAST (Physical Ability and Stamina Test). Cyber Warfare requires the EDPT.
        </p>

        <p className="text-text-secondary">
          Know the full qualification picture for your target AFSCs before you commit.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Use our{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">
              ASVAB Score Calculator
            </Link>{" "}
            to see which AFSCs you qualify for right now. Enter your subtest scores and get a full list instantly.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you have not taken the ASVAB yet, start with our{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">
            practice test
          </Link>{" "}
          to estimate your scores, then build your dream sheet from the results. Our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">
            ASVAB study guide
          </Link>{" "}
          covers subtest-specific strategies to boost the composites that matter most for your target AFSCs.
        </p>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many AFSCs are in the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Air Force has approximately 130 enlisted AFSCs across four major career groups: Operations (1-series), Maintenance and Logistics (2-series), Support (3-series), and Medical (4-series). Additional specialty codes exist for special duty assignments (8-series) and reporting identifiers (9-series). The exact count changes as the Air Force adds, merges, or eliminates career fields.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do you need for the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You need an AFQT score of 31 with a high school diploma or 50 with a GED to enlist. But the AFQT only gets you in the door. Individual AFSCs require specific MAGE composite scores ranging from G 33 (Security Forces) to G 72 (Cryptologic Language Analyst). Use our{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">
                ASVAB Score Calculator
              </Link>{" "}
              to see which jobs match your scores, and check{" "}
              <Link href="/what-is-a-good-asvab-score" className="text-accent hover:text-accent-hover">
                what is a good ASVAB score
              </Link>{" "}
              for benchmarks.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you pick your AFSC before enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You list preferred AFSCs on a &ldquo;dream sheet,&rdquo; but you do not get to choose a guaranteed job before swearing in. Your recruiter books you into an available slot that matches your qualifications. Listing 8-10 AFSCs increases the odds of getting something you want. The job you are offered is locked into your contract before you ship to basic training.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the hardest Air Force AFSC to get into?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              By ASVAB score alone, Cryptologic Language Analyst (1N3X1) and Airborne Cryptologic Language Analyst (1A8X1) require the highest composite at G 72, plus a passing DLAB score. Cyber Warfare Operations (1B4X1) requires a separate EDPT with a minimum score of 70. By overall selection difficulty, special warfare AFSCs (Combat Controller, Pararescue, TACP) have 60-80% training attrition.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you change your AFSC after enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, but not easily. You can apply to retrain into a new AFSC at certain career milestones, typically at the end of your first enlistment or when your career field is overmanned. The Air Force publishes annual retraining advisory lists showing which AFSCs accept retrainees. Some high-demand AFSCs (cyber, special warfare) accept retrainees more readily. Talk to your career advisor about eligibility windows and try a{" "}
              <Link href="/practice-test" className="text-accent hover:text-accent-hover">
                practice test
              </Link>{" "}
              if your target AFSC has a higher composite requirement.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do Air Force AFSC requirements change?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The Air Force reviews and updates composite score minimums periodically. Requirements can increase when a career field has too many applicants or decrease when manning is short. Bonus eligibility and clearance requirements also shift. The scores in this guide reflect current standards as of 2026, but confirm requirements with your recruiter before making final decisions.
            </p>
          </div>
        </div>

        {/* ── CTA Box ── */}
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
