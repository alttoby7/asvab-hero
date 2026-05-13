import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Air Force ASVAB Score: MAGE Requirements for Every AFSC (2026)",
  description:
    "Learn Air Force ASVAB score requirements for 2026. AFQT minimums, MAGE composite formulas, AFSC score tables, special warfare thresholds, and study strategies.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-asvab-score",
  },
};

export default function AirForceASVABScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Air Force ASVAB Score: What You Need to Qualify and Which Jobs You Can Get",
          description:
            "Learn Air Force ASVAB score requirements for 2026. AFQT minimums, MAGE composite formulas, AFSC score tables, special warfare thresholds, and study strategies.",
          url: "https://asvabhero.com/air-force-asvab-score",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
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
              name: "What is the minimum ASVAB score for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Air Force standard minimum is AFQT 36 for high school diploma holders and AFQT 65 for GED holders. Many websites cite 31 and 50, but those are rare waiver exceptions. The 36/65 thresholds are what recruiters actually enforce. Earning 15+ college credits can reclassify GED holders at the diploma tier.",
              },
            },
            {
              "@type": "Question",
              name: "What is a good Air Force ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "An AFQT of 50 or above makes you competitive for enlistment. For job placement, your MAGE composites matter more. A G score of 57+ opens roughly 70% of General-dependent AFSCs. Aim for 60+ on your target composite to have real flexibility during job booking.",
              },
            },
            {
              "@type": "Question",
              name: "What Air Force jobs can I get with a low ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "With minimum qualifying scores, you can access Services (G24), Regional Band (G24 or A21), Security Forces (G33), and Fire Protection (G38). These are entry-level MAGE thresholds. Higher scores unlock more career fields with better civilian transfer value and enlistment bonuses.",
              },
            },
            {
              "@type": "Question",
              name: "Is the Air Force G score the same as the Army GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Same formula: AR + VE (Verbal Expression). Different scale. The Army reports GT as a raw sum (typically 85-145). The Air Force converts G to a percentile (0-99). An AF G55 and Army GT 110 represent similar aptitude levels.",
              },
            },
            {
              "@type": "Question",
              name: "Can I retake the ASVAB for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Wait 30 days for the first retake, 30 more days for the second, then 6 months for each attempt after that. Your most recent score replaces all previous scores permanently, so only retake after focused preparation. Active-duty airmen take the AFCT, which follows the same replacement rule.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need for Air Force special ops?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pararescue (PJ) requires G44. Combat Controller (CCT) needs G55 and M55. TACP requires G49. SERE needs G55. These ASVAB thresholds are moderate because the Physical Ability and Stamina Test (PAST) and the training pipeline are the real selection filters.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force ASVAB Score: What You Need to Qualify and Which Jobs You Can Get
        </h1>

        <p className="mt-4 text-text-secondary">
          You hit the AFQT minimum, but your recruiter says you don&apos;t qualify for the job you want. That&apos;s because the Air Force uses a second scoring system that most people never hear about until it&apos;s too late.
        </p>
        <p className="text-text-secondary">
          The <strong>Air Force ASVAB score</strong> requirements work as a two-gate system. Your AFQT percentile decides whether you can enlist. Your MAGE composite scores decide what you can do once you&apos;re in. The Air Force sets the highest ASVAB thresholds of any branch, and roughly 60% of recruits enlist under an aptitude area rather than a guaranteed job, which means your composites control your career.
        </p>
        <p className="text-text-secondary">
          This guide covers the real AFQT minimums, how all four MAGE composites are calculated, score requirements for popular AFSCs, special warfare thresholds, bonuses tied to high scores, and what active-duty airmen need to know about retesting. If you already have your scores, plug them into our{" "}
          <Link href="/calculator">free ASVAB score calculator</Link> to see which Air Force jobs you qualify for right now.
        </p>

        {/* ─── AFQT MINIMUMS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force AFQT Minimums: Stricter Than You Think
        </h2>

        <p className="mt-4 text-text-secondary">
          Most websites will tell you the Air Force minimum AFQT is 31. That number is technically a waiver floor, not the standard.
        </p>
        <p className="text-text-secondary">
          The Air Force operating minimum is <strong>AFQT 36</strong> for high school diploma holders and <strong>AFQT 65</strong> for GED holders. That makes the Air Force the second-strictest branch behind the Coast Guard for diploma holders, and the strictest for GED holders by a wide margin.
        </p>

        {/* Branch AFQT Minimums Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Diploma Minimum</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">GED Minimum</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Marines</td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td>
                <td className="py-2 pr-4 font-mono">40</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The AFQT is a percentile (1&ndash;99) calculated from four subtests: Arithmetic Reasoning (AR), Mathematics Knowledge (MK), Word Knowledge (WK), and Paragraph Comprehension (PC). The formula doubles Verbal Expression (VE = WK + PC), which means verbal improvement gives you twice the leverage of any other subtest.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you hold a GED, the Air Force requires an AFQT of 65. That puts you squarely in Category II territory, where most diploma holders would already be competitive for their top-choice AFSCs. Earning 15 or more college credits can reclassify you at the diploma tier (AFQT 36 minimum).
          </p>
        </aside>

        <p className="text-text-secondary">
          Your AFQT score slots you into a category that affects job access and bonus eligibility. Categories I through IIIA (AFQT 50&ndash;99) put you in the strongest position. Category IIIB (31&ndash;49) technically qualifies for enlistment, but the Air Force fills most slots with applicants scoring 50 and above.
        </p>
        <p className="text-text-secondary">
          For a deeper look at the AFQT formula and how the VE double-count works, see our{" "}
          <Link href="/afqt-score">AFQT score guide</Link>.
        </p>

        {/* ─── MAGE COMPOSITES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Air Force MAGE Composites Work (And Why They Look Different From Army Scores)
        </h2>

        <p className="mt-4 text-text-secondary">
          An Army GT of 110 and an Air Force G of 55 can represent roughly the same aptitude. The numbers look wildly different because the two branches use completely different scoring scales.
        </p>
        <p className="text-text-secondary">
          The Air Force groups your ASVAB subtest scores into four composites called <strong>MAGE</strong>: Mechanical (M), Administrative (A), General (G), and Electronics (E). Each composite pulls from a different combination of subtests.
        </p>

        {/* MAGE Composite Formulas Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">What It Measures</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Example AFSCs</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">M (Mechanical)</td>
                <td className="py-2 pr-4 font-mono">GS + MC + 2xAS</td>
                <td className="py-2 pr-4">Physical principles, machines, auto/shop</td>
                <td className="py-2">Aircraft Maintenance, Propulsion, EOD</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">A (Administrative)</td>
                <td className="py-2 pr-4 font-mono">WK + PC + MK</td>
                <td className="py-2 pr-4">Verbal reasoning and math for office roles</td>
                <td className="py-2">Personnel, Logistics, Traffic Management</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">G (General)</td>
                <td className="py-2 pr-4 font-mono">AR + WK + PC</td>
                <td className="py-2 pr-4">General aptitude for most career fields</td>
                <td className="py-2">Cyber, Intel, Air Traffic, Medical, Finance</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">E (Electronics)</td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2 pr-4">Technical and electronics aptitude</td>
                <td className="py-2">Avionics, Space Systems, Cyber Transport</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MAGE Formulas */}
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          M = GS + MC + 2(AS)
          <br />
          A = WK + PC + MK
          <br />
          G = AR + WK + PC
          <br />
          E = GS + AR + MK + EI
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Many websites still list the Administrative (A) composite as NO + CS + VE. The Numerical Operations and Coding Speed subtests were removed from the ASVAB over two decades ago. The current A composite uses WK + PC + MK.
          </p>
        </aside>

        <p className="text-text-secondary">
          Here is the distinction that no other guide explains clearly. After calculating each composite from the raw subtest scores, the Air Force converts that number to a <strong>percentile</strong> ranging from 0 to 99. The Army, by contrast, simply adds your standard scores together and reports the raw sum.
        </p>
        <p className="text-text-secondary">
          This is why Air Force MAGE minimums (ranging from 24 to 72) look so different from Army line score minimums (ranging from 85 to 130+). An AF G55 means you scored in the 55th percentile for General aptitude. An Army GT 110 means the raw sum of your AR + VE standard scores equals 110. Different scales measuring the same underlying aptitude.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The Air Force General (G) composite uses the same formula as the Army and Marines GT score: AR + VE. If you&apos;re comparing scores across branches or considering a transfer, the G composite is your GT equivalent. See our{" "}
            <Link href="/asvab-gt-score">GT score guide</Link> for the full breakdown, or use the{" "}
            <Link href="/gt-score-calculator">GT score calculator</Link> to check your number.
          </p>
        </aside>

        <p className="text-text-secondary">
          The G composite is the most commonly required across Air Force jobs. A G score of 57 or above opens roughly 70% of all General-dependent AFSCs. Use our{" "}
          <Link href="/asvab-line-score-calculator">line score calculator</Link> to see your MAGE composites from your subtest scores.
        </p>

        {/* ─── JOBS AND MAGE REQUIREMENTS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Jobs and Their MAGE Score Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Instead of dumping 130+ AFSCs into one table, here are the most popular career fields organized by the composite they require.
        </p>

        {/* General (G) Composite AFSCs */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          General (G) Composite AFSCs
        </h3>

        <p className="mt-4 text-text-secondary">
          The G composite is required for the widest range of Air Force jobs, from cyber operations to medical services.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Min Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1B4X1</td>
                <td className="py-2 pr-4">Cyber Warfare Operations</td>
                <td className="py-2 font-mono">G64</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1N0X1</td>
                <td className="py-2 pr-4">Intelligence Analyst</td>
                <td className="py-2 font-mono">G64</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1N3X1</td>
                <td className="py-2 pr-4">Cryptologic Language Analyst</td>
                <td className="py-2 font-mono">G72</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1N7X1</td>
                <td className="py-2 pr-4">Human Intelligence Specialist</td>
                <td className="py-2 font-mono">G72</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C1X1</td>
                <td className="py-2 pr-4">Air Traffic Controller</td>
                <td className="py-2 font-mono">G55</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1W0X1</td>
                <td className="py-2 pr-4">Weather</td>
                <td className="py-2 font-mono">G66 &amp; E50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">6F0X1</td>
                <td className="py-2 pr-4">Financial Management</td>
                <td className="py-2 font-mono">G57</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">6C0X1</td>
                <td className="py-2 pr-4">Contracting</td>
                <td className="py-2 font-mono">G72</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4N0X1</td>
                <td className="py-2 pr-4">Aerospace Medical Services</td>
                <td className="py-2 font-mono">G50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3E8X1</td>
                <td className="py-2 pr-4">EOD (Explosive Ordnance Disposal)</td>
                <td className="py-2 font-mono">M60 &amp; G64</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3P0X1</td>
                <td className="py-2 pr-4">Security Forces</td>
                <td className="py-2 font-mono">G33</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">3F1X1</td>
                <td className="py-2 pr-4">Services</td>
                <td className="py-2 font-mono">G24</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mechanical (M) Composite AFSCs */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Mechanical (M) Composite AFSCs
        </h3>

        <p className="mt-4 text-text-secondary">
          The M composite covers aircraft maintenance, propulsion, and weapons systems.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Min Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A5X1</td>
                <td className="py-2 pr-4">Airlift/Special Mission Aircraft Maintenance</td>
                <td className="py-2 font-mono">M47</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A6X1</td>
                <td className="py-2 pr-4">Aerospace Propulsion</td>
                <td className="py-2 font-mono">M56</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A6X5</td>
                <td className="py-2 pr-4">Aircraft Hydraulic Systems</td>
                <td className="py-2 font-mono">M56</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2W0X1</td>
                <td className="py-2 pr-4">Munitions Systems</td>
                <td className="py-2 font-mono">M60 or G57</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2W2X1</td>
                <td className="py-2 pr-4">Nuclear Weapons</td>
                <td className="py-2 font-mono">M60</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">1P0X1</td>
                <td className="py-2 pr-4">Aircrew Flight Equipment</td>
                <td className="py-2 font-mono">M40</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Electronics (E) Composite AFSCs */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Electronics (E) Composite AFSCs
        </h3>

        <p className="mt-4 text-text-secondary">
          The E composite gates access to the most technically advanced and transferable career fields.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Min Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C6X1</td>
                <td className="py-2 pr-4">Space Systems Operations</td>
                <td className="py-2 font-mono">E70</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2A0X1</td>
                <td className="py-2 pr-4">Avionics Test Stations</td>
                <td className="py-2 font-mono">E70</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3D1X2</td>
                <td className="py-2 pr-4">Cyber Transport Systems</td>
                <td className="py-2 font-mono">E70</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3D1X1</td>
                <td className="py-2 pr-4">Client Systems</td>
                <td className="py-2 font-mono">E60</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1A3X1</td>
                <td className="py-2 pr-4">Airborne Mission Systems</td>
                <td className="py-2 font-mono">E70</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">4A2X1</td>
                <td className="py-2 pr-4">Biomedical Equipment</td>
                <td className="py-2 font-mono">E70 &amp; M60</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Administrative (A) Composite AFSCs */}
        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Administrative (A) Composite AFSCs
        </h3>

        <p className="mt-4 text-text-secondary">
          The A composite covers a smaller set of office and logistics roles.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Min Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3F0X1</td>
                <td className="py-2 pr-4">Personnel</td>
                <td className="py-2 font-mono">A41</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2G0X1</td>
                <td className="py-2 pr-4">Logistics Plans</td>
                <td className="py-2 font-mono">A56</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">2T0X1</td>
                <td className="py-2 pr-4">Traffic Management</td>
                <td className="py-2 font-mono">A35</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">3F5X1</td>
                <td className="py-2 pr-4">Administration</td>
                <td className="py-2 font-mono">A47</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Some AFSCs accept either of two composites. Munitions Systems (2W0X1), for example, accepts M60 or G57. If your M composite is low, a strong G score can still qualify you. Check the{" "}
            <Link href="/air-force-afsc-list">full Air Force AFSC list</Link> for every job and its composite requirements.
          </p>
        </aside>

        <p className="text-text-secondary">
          Note that some jobs require meeting two composites simultaneously. Weather (1W0X1) needs G66 AND E50. EOD (3E8X1) needs M60 AND G64. Both thresholds must be met. Plug your scores into the{" "}
          <Link href="/calculator">ASVAB score calculator</Link> to check all your composites at once.
        </p>

        {/* ─── SPECIAL WARFARE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Special Warfare and Special Duty ASVAB Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          The Air Force ASVAB score requirements for special warfare jobs are surprisingly moderate. Pararescue only needs G44. The real filter is everything that comes after the ASVAB.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Min Score</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Additional Requirements</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1T2X1</td>
                <td className="py-2 pr-4">Pararescue (PJ)</td>
                <td className="py-2 pr-4 font-mono">G44</td>
                <td className="py-2">PAST + 2-year pipeline</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C2X1</td>
                <td className="py-2 pr-4">Combat Controller (CCT)</td>
                <td className="py-2 pr-4 font-mono">G55 &amp; M55</td>
                <td className="py-2">PAST + selection</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1C4X1</td>
                <td className="py-2 pr-4">Tactical Air Control Party (TACP)</td>
                <td className="py-2 pr-4 font-mono">G49</td>
                <td className="py-2">PAST + selection</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1T0X1</td>
                <td className="py-2 pr-4">SERE Specialist</td>
                <td className="py-2 pr-4 font-mono">G55</td>
                <td className="py-2">PAST + selection</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1Z1X1</td>
                <td className="py-2 pr-4">Special Reconnaissance</td>
                <td className="py-2 pr-4 font-mono">G55</td>
                <td className="py-2">PAST + selection</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">1A9X1</td>
                <td className="py-2 pr-4">Special Mission Aviator</td>
                <td className="py-2 pr-4 font-mono">G57 &amp; M60</td>
                <td className="py-2">Flight physical</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The ASVAB is gate one. Gate two is the <strong>PAST</strong> (Physical Ability and Stamina Test), which includes timed runs, swims, pull-ups, and sit-ups. Minimums vary: CCT, TACP, and SERE candidates need at least 48 sit-ups in 2 minutes. PJ candidates need 54. These are minimums, not competitive standards.
        </p>
        <p className="text-text-secondary">
          After PAST comes selection and an extended training pipeline that ranges from one to two-plus years depending on the AFSC. Attrition rates in SPECWAR pipelines run high. The moderate ASVAB thresholds exist specifically because SPECWAR selection is physically brutal, and the cognitive screening happens through the training itself.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Women have been eligible for all Air Force Special Warfare career fields since 2016. Some older reference sites still incorrectly mark these AFSCs as male-only.
          </p>
        </aside>

        {/* ─── SCORE TIERS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Score Tiers: What Each MAGE Range Unlocks
        </h2>

        <p className="mt-4 text-text-secondary">
          Your score falls into a tier that determines how many doors are open. Here is what each General (G) composite range unlocks, since G is the most commonly required composite across AFSCs.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">G24&ndash;33</span>
            <span className="text-sm text-text-secondary">Entry-level AFSCs (Services, Security Forces, Band). Limited career fields, but still meaningful work.</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">G38&ndash;49</span>
            <span className="text-sm text-text-secondary">Technical support roles (Fire Protection, Engineering, Pararescue, TACP). Growing options with moderate study.</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">G50&ndash;57</span>
            <span className="text-sm text-text-secondary">Mid-range (Air Traffic Control, Flight Engineer, Loadmaster, Financial Management, Medical Services). The sweet spot where options expand significantly.</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">G57&ndash;66</span>
            <span className="text-sm text-text-secondary">Upper-mid (Intelligence, Cyber Operations, Weather, Manpower, Dental Lab). High-demand fields with strong civilian transfer value.</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">G72</span>
            <span className="text-sm text-text-secondary">Elite tier (Cryptologic Linguist, HUMINT, Contracting, Public Affairs). Highest enlistment bonuses and most competitive career fields.</span>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            A G-score of 57 opens approximately 70% of General-dependent career fields. If you&apos;re scoring in the low 50s, pushing to 57 yields a disproportionate jump in available AFSCs. That&apos;s the highest-leverage target for most applicants.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the E composite, the critical threshold is 60. Below E60, your electronics options are limited. At E70, every avionics and advanced communications AFSC opens up.
        </p>
        <p className="text-text-secondary">
          For M, most aircraft maintenance jobs require M47. Moving to M56 adds propulsion and hydraulics. M60 unlocks munitions and EOD.
        </p>
        <p className="text-text-secondary">
          See the full score tier breakdown across all branches in our{" "}
          <Link href="/asvab-score-ranges">ASVAB score ranges guide</Link>.
        </p>

        {/* ─── ENLISTMENT BONUSES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Enlistment Bonuses: Higher Scores Mean More Money
        </h2>

        <p className="mt-4 text-text-secondary">
          FY2026 Air Force enlistment bonuses range from $15,000 to $45,000 depending on contract length and career field. The cumulative bonus cap per enlistee is $50,000.
        </p>
        <p className="text-text-secondary">
          The AFSCs with the largest bonuses consistently require high MAGE composites.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Cryptologic Language Analyst (G72) and EOD (M60 &amp; G64) are among the highest-bonus AFSCs. Cyber Warfare Operations (G64) and all Special Warfare career fields also carry bonus eligibility plus Special Duty Assignment Pay. A 10-point improvement on your G composite from 55 to 65 could be the difference between a zero-bonus AFSC and a $40,000 signing bonus.
          </p>
        </aside>

        <p className="text-text-secondary">
          Not every AFSC is bonus-eligible at all times. The Air Force adjusts bonus-eligible career fields each fiscal year based on manning shortfalls. Check with your recruiter for the current FY2026 list.
        </p>
        <p className="text-text-secondary">
          Higher scores also give you leverage during the job booking process. If you qualify for a high-demand AFSC that happens to carry a bonus, your recruiter has less room to steer you toward whatever needs filling. Good scores are negotiating power. For how rank and pay interact with your career field choice, see our{" "}
          <Link href="/air-force-ranks">Air Force ranks guide</Link>.
        </p>

        {/* ─── RETAKING ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Retaking the ASVAB and the AFCT for Active-Duty Airmen
        </h2>

        <p className="mt-4 text-text-secondary">
          If your Air Force ASVAB score didn&apos;t land where you need it, you have options. But the retake rules come with a catch that costs people their qualifying scores every year.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Pre-Enlistment Retakes
        </h3>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">1st retake</span>
            <span className="text-sm text-text-secondary">30 days after initial test</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">2nd retake</span>
            <span className="text-sm text-text-secondary">30 days after 1st retake</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">3rd+ retakes</span>
            <span className="text-sm text-text-secondary">6 months between each subsequent attempt</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">Score validity</span>
            <span className="text-sm text-text-secondary">2 years from test date</span>
          </div>
        </div>

        <p className="text-text-secondary">
          Your most recent ASVAB score <strong>completely replaces</strong> all previous scores. If you scored a 72 and retake for a 58, your official score is now 58. The military does not let you keep the higher number.
        </p>
        <p className="text-text-secondary">
          Only retake when you&apos;ve studied for 4 to 6 weeks and your practice test scores show consistent improvement. Retaking without preparation is gambling with your future.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Active-Duty: The AFCT
        </h3>

        <p className="mt-4 text-text-secondary">
          Already in the Air Force and want to retrain into a new AFSC? You take the <strong>AFCT</strong> (Armed Forces Classification Test). It&apos;s the same test as the ASVAB under a different name.
        </p>
        <p className="text-text-secondary">
          The AFCT follows the same replacement rule. Your new scores permanently overwrite your previous scores, even if they&apos;re lower. This means an airman who currently qualifies for a retraining AFSC could take the AFCT unprepared, score lower, and lose that qualification entirely.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do not take the AFCT without preparation. If your current scores already qualify you for your target retraining AFSC, there is no reason to retake. If they don&apos;t qualify you, study for a minimum of 4&ndash;6 weeks before retesting. Contact your base Education Counseling Center for free prep resources.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the full active-duty retake process, including the approval chain and branch-specific rules, see our{" "}
          <Link href="/afct">AFCT guide</Link>. Practice with our{" "}
          <Link href="/afct-practice-test">free AFCT practice test</Link>.
        </p>

        {/* ─── HOW TO IMPROVE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Improve Your Air Force ASVAB Score
        </h2>

        <p className="mt-4 text-text-secondary">
          Study smart by working backwards from your target AFSC. Not every subtest moves your composites equally.
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li><strong>Identify which MAGE composite your target AFSC requires.</strong> Look it up in the tables above or on the{" "}
            <Link href="/air-force-afsc-list">full AFSC list</Link>.</li>
          <li><strong>Map the subtests that feed that composite.</strong> Reference the MAGE formula table from earlier in this guide.</li>
          <li><strong>Take a diagnostic{" "}
            <Link href="/practice-test">practice test</Link></strong> and identify which contributing subtest is your weakest.</li>
          <li><strong>Study the weakest subtest intensively.</strong> This yields the biggest composite gains because you&apos;re raising the floor, not polishing the ceiling.</li>
        </ol>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Study priorities by composite</p>
          <ul className="mt-2 space-y-1 text-sm text-text-secondary">
            <li><strong>Raising G?</strong> Focus on Arithmetic Reasoning first (math word problems), then Word Knowledge and Paragraph Comprehension (verbal).</li>
            <li><strong>Raising E?</strong> Focus on Electronics Information and General Science. These are the fastest to improve with targeted study.</li>
            <li><strong>Raising M?</strong> Focus on Mechanical Comprehension and Auto &amp; Shop. Hands-on knowledge responds well to practice problems.</li>
            <li><strong>Raising A?</strong> Focus on Mathematics Knowledge. Verbal Expression (WK+PC) also feeds in.</li>
          </ul>
        </aside>

        <p className="text-text-secondary">
          Word Knowledge and Paragraph Comprehension improvements pull double duty. They boost both your G and A composites AND your AFQT percentile through the VE double-count. If you need to raise multiple numbers simultaneously, verbal study is the highest-leverage move.
        </p>
        <p className="text-text-secondary">
          Four to six weeks of focused preparation typically yields a 10 to 15 point composite improvement. That&apos;s not a guess. It&apos;s a consistent pattern across test-prep programs when study is concentrated on the weakest contributing subtest rather than spread thin across all nine.
        </p>
        <p className="text-text-secondary">
          Start with a{" "}
          <Link href="/practice-test">practice test</Link> to find your baseline, then build a plan with our{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        {/* ─── BOTTOM LINE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Bottom Line
        </h2>

        <p className="mt-4 text-text-secondary">
          The Air Force requires an AFQT of 36 (diploma) or 65 (GED) to enlist, making it the strictest branch for GED holders and second-strictest overall. But the AFQT only gets you through the door. Your MAGE composite scores determine which of 130+ AFSCs you can actually get.
        </p>
        <p className="text-text-secondary">
          The G composite opens the most doors. A G57 or above gives you access to roughly 70% of General-dependent career fields, and the highest-bonus AFSCs cluster at G64 and above.
        </p>
        <p className="text-text-secondary">
          If you&apos;re preparing to enlist, take a{" "}
          <Link href="/practice-test">practice test</Link>, run your scores through the{" "}
          <Link href="/calculator">calculator</Link>, and identify which subtests feed the composite you need. If you&apos;re active-duty and considering the AFCT, make sure you actually need a retake before you risk replacing your current scores.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force ASVAB Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Air Force standard minimum is AFQT 36 for high school diploma holders and AFQT 65 for GED holders. Many websites cite 31 and 50, but those are rare waiver exceptions. The 36/65 thresholds are what recruiters actually enforce. Earning 15+ college credits can reclassify GED holders at the diploma tier.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good Air Force ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              An AFQT of 50 or above makes you competitive for enlistment. For job placement, your MAGE composites matter more. A G score of 57+ opens roughly 70% of General-dependent AFSCs. Aim for 60+ on your target composite to have real flexibility during job booking.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Air Force jobs can I get with a low ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              With minimum qualifying scores, you can access Services (G24), Regional Band (G24 or A21), Security Forces (G33), and Fire Protection (G38). These are entry-level MAGE thresholds. Higher scores unlock more career fields with better civilian transfer value and enlistment bonuses.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the Air Force G score the same as the Army GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Same formula: AR + VE (Verbal Expression). Different scale. The Army reports GT as a raw sum (typically 85&ndash;145). The Air Force converts G to a percentile (0&ndash;99). An AF G55 and Army GT 110 represent similar aptitude levels. Use our{" "}
              <Link href="/gt-score-calculator">GT score calculator</Link> to check yours.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB for the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Wait 30 days for the first retake, 30 more days for the second, then 6 months for each attempt after that. Your most recent score replaces all previous scores permanently, so only retake after focused preparation. Active-duty airmen take the AFCT, which follows the same replacement rule.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do I need for Air Force special ops?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Pararescue (PJ) requires G44. Combat Controller (CCT) needs G55 and M55. TACP requires G49. SERE needs G55. These ASVAB thresholds are moderate because the Physical Ability and Stamina Test (PAST) and the training pipeline are the real selection filters.
            </p>
          </div>
        </div>

        {/* ─── CTA BOX ─── */}
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
