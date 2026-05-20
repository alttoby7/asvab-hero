import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "ASVAB Marines Score: GT Formula, MOS Requirements (2026)",
  description:
    "Learn the real ASVAB marines score requirements for 2026. GT formula corrected, all 5 line scores, Recon/MARSOC pipeline, and a GT tier-by-tier MOS breakdown.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-marines-score",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ASVAB Marines Score: What You Actually Need to Qualify in 2026",
  description:
    "Learn the real ASVAB marines score requirements for 2026. GT formula corrected, all 5 line scores, Recon/MARSOC pipeline, and a GT tier-by-tier MOS breakdown.",
  url: "https://asvabhero.com/asvab-marines-score",
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
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum ASVAB score for the Marines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum AFQT score is 31 with a high school diploma, 50 with a GED, and 25 with a rare waiver (approved for roughly 1% of applicants). The 31 is an enlistment floor. It does not qualify you for most Marine Corps jobs. Line scores determine MOS eligibility, and most MOSs require composites well above a 31 AFQT.",
      },
    },
    {
      "@type": "Question",
      name: "What ASVAB score do you need for Marine infantry (0311)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infantry requires a GT line score of 80. GT = VE + AR, which expands to WK + PC + AR. A GT of 80 is one of the lowest MOS thresholds in the Marine Corps. Most recruits who clear the 31 AFQT minimum will still need solid AR and verbal scores to reach GT 80.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Marine GT formula VE + AR or VE + AR + MC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GT = VE + AR. The version that adds Mechanical Comprehension (MC) to the formula is a persistent myth. MC feeds into MM and ST composites, not GT. If you are studying gears and levers to raise your GT, you are wasting time. Focus on AR and WK/PC instead.",
      },
    },
    {
      "@type": "Question",
      name: "How long are ASVAB scores valid for the Marine Corps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASVAB scores are valid for 2 years from the test date. If your scores expire before you ship to boot camp, you must retest. Once you have enlisted and entered active duty or the reserves, your scores do not expire.",
      },
    },
    {
      "@type": "Question",
      name: "Can I retake the ASVAB to get a better Marine Corps job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The first retake is available after 30 days, the second after another 30 days, and subsequent retakes require a 6-month wait. Your most recent score replaces all previous scores. There is no option to keep the higher number, so study before you retest.",
      },
    },
    {
      "@type": "Question",
      name: "What GT score do I need for Marine Recon or MARSOC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both Recon (0321) and MARSOC CSO (0372) require a minimum GT of 105. But GT is just the entry ticket. Recon requires a first-class PFT and first-class swim qualification. MARSOC requires PFT 225+, swim assessment, 3+ years of service, and Corporal/Sergeant rank.",
      },
    },
    {
      "@type": "Question",
      name: "Can active-duty Marines retake the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, through the AFCT (Armed Forces Classification Test). You need a command authorization letter. Schedule through Education Services. New scores replace your old scores within 14 to 30 days and apply to MOS qualification immediately.",
      },
    },
  ],
};

export default function ASVABMarinesScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Marines Score: What You Actually Need to Qualify in 2026
        </h1>

        <p className="mt-4 text-text-secondary">
          Search for your <strong>ASVAB marines score</strong> requirements and
          you will find three different minimums, two different GT formulas, and
          MOS tables that contradict each other from one site to the next. Some
          of that misinformation will cost you weeks of misdirected study time.
        </p>

        <p className="text-text-secondary">
          This page cuts through it. We cover the official AFQT floor, correct
          the most persistent GT formula myth in ASVAB prep, break down all five
          USMC line scores, and map every GT tier to specific Marine Corps jobs.
          If you are already active duty and need a higher score for a lateral
          move, we cover that too.
        </p>

        <p className="text-text-secondary">
          Plug your subtest scores into the{" "}
          <Link href="/calculator">ASVAB calculator</Link> right now to see
          where you stand across every Marine Corps MOS.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT gets you through the door. Your line scores determine your
            career. Most websites only cover the first part.
          </p>
        </aside>

        {/* ── Section: Minimum ASVAB Score ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Minimum ASVAB Score for the Marine Corps
        </h2>

        <p className="mt-4 text-text-secondary">
          Three different websites give three different numbers for the Marine
          AFQT minimum. Here is the official answer.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              31 AFQT
            </span>
            <span className="text-sm text-text-secondary">
              High school diploma minimum (per marines.com, updated 2026)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              50 AFQT
            </span>
            <span className="text-sm text-text-secondary">
              GED or non-traditional diploma minimum
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              25 AFQT
            </span>
            <span className="text-sm text-text-secondary">
              Waiver floor (approved for roughly 1% of applicants)
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          The official Marine Corps recruiting website lists 31 as the minimum
          AFQT for diploma holders. Some third-party sources cite 32,
          referencing MCO 1230.5C from 2014. Others cite 35. The 31 figure from
          marines.com is the authoritative current number.
        </p>

        <p className="text-text-secondary">
          GED holders face a steeper climb. The Marines require AFQT 50 with a
          GED, and they cap non-diploma enlistees at 5% of annual recruits. That
          is the strictest GED policy of any branch. If you have earned 15 or
          more college semester hours, you may reclassify as a Tier 1 applicant
          and qualify at the 31 threshold. This is not automatic. Confirm with
          your recruiter before counting on it.
        </p>

        <p className="text-text-secondary">
          The minimum AFQT score for Marines is an enlistment floor. It does not
          qualify you for a job. A 31 gets you into the recruiting station. Line
          scores determine which of 300+ MOSs you can actually hold, and most
          require performance well above what a 31 AFQT produces.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 31 AFQT qualifies you for enlistment. It does not qualify you for
            any job worth choosing. Most desirable Marine Corps MOSs need line
            scores of 90 to 115+, which demands subtest performance well above
            the AFQT floor.
          </p>
        </aside>

        <p className="text-text-secondary">
          For context on how 31 compares across all branches, see the full{" "}
          <Link href="/asvab-score-ranges">ASVAB score ranges</Link> breakdown
          and our guide on{" "}
          <Link href="/what-is-a-good-asvab-score">
            what is a good ASVAB score
          </Link>
          .
        </p>

        <EmailCapture
          tag="asvab-marines-score"
          headline="Get a Free Marine Corps ASVAB Study Plan"
          subhead="We'll send you a personalized study plan based on the Marine MOS you're targeting."
          cta="Send My Study Plan"
        />

        {/* ── Section: Line Score Formulas ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps Line Score Formulas (and the GT Myth You Need to Ignore)
        </h2>

        <p className="mt-4 text-text-secondary">
          The Marine Corps GT formula is the single most misquoted fact in ASVAB
          prep. Get this wrong and you will waste study time on the wrong
          subtest.
        </p>

        <p className="text-text-secondary">
          The Marines use five composite line scores. Here are the actual
          formulas:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT (General Technical) = VE + AR
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          EL (Electronics) = GS + AR + MK + EI
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          MM (Mechanical Maintenance) = AR + EI + MC + AS
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          CL (Clerical) = VE + AR + MK
        </div>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          ST (Skilled Technical) = GS + VE + MK + MC
        </div>

        <p className="text-text-secondary">
          VE is not a subtest you take. VE (Verbal Expression) is a derived
          score: WK + PC. So GT = VE + AR expands to GT = WK + PC + AR. Both
          notations mean the same thing.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The Myth
        </h3>

        <p className="mt-4 text-text-secondary">
          Search &ldquo;Marine Corps GT formula&rdquo; and you will find sites
          listing GT = WK + PC + AR + MC. That version adds Mechanical
          Comprehension to the formula. It is wrong.
        </p>

        <p className="text-text-secondary">
          The correct Marine GT formula is VE + AR, identical to the Army GT
          formula. The version with MC appears on several websites citing MCO
          1230.5C from 2014, but the GT = VE + AR formula is what military.com,
          the ASVAB Hero calculator, and current recruiting sources use. MC feeds
          into MM and ST, not GT.
        </p>

        <p className="text-text-secondary">
          Why this matters: if you are studying gears and levers to raise your
          GT, you are burning days on a subtest that does not affect that
          composite. Your GT study time should go entirely toward AR (Arithmetic
          Reasoning) and WK/PC (Word Knowledge and Paragraph Comprehension).
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT = VE + AR. Full stop. If a website tells you Mechanical
            Comprehension is in the Marine GT formula, close that tab and come
            back here.
          </p>
        </aside>

        <p className="text-text-secondary">
          Here is which subtests feed which line scores:
        </p>

        {/* Subtest Cross-Reference Table */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  EL
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MM
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  CL
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  ST
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  WK (via VE)
                </td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 font-mono">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PC (via VE)
                </td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 font-mono">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AR
                </td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MK
                </td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 font-mono">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GS
                </td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 font-mono">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EI
                </td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MC
                </td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 font-mono">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AS
                </td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono">Yes</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2"></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AO
                </td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4"></td>
                <td className="py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          AR feeds into 4 of the 5 line scores. VE feeds into 3 of 5. AO
          (Assembling Objects) is not used in any USMC line score formula. If you
          are studying for the Marines, skip AO entirely.
        </p>

        <p className="text-text-secondary">
          For the full formula breakdown with a worked example, see our{" "}
          <Link href="/asvab-line-score-calculator">
            ASVAB line score calculator
          </Link>
          . Calculate your GT specifically at the{" "}
          <Link href="/gt-score-calculator">GT score calculator</Link>.
        </p>

        {/* ── Section: GT Tier Breakdown ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your GT Score Unlocks: A Tier-by-Tier Breakdown
        </h2>

        <p className="mt-4 text-text-secondary">
          Instead of scrolling through 300 MOSs, here is what each GT level
          actually opens for you.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Representative MOSs
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What This Tier Means
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  80
                </td>
                <td className="py-2 pr-4">
                  0311 Rifleman, 0331 Machine Gunner, 0351 Assaultman
                </td>
                <td className="py-2">
                  Entry-level combat roles. Lowest GT threshold in the Marine
                  Corps.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  90
                </td>
                <td className="py-2 pr-4">
                  0313 LAV Crewman, 1812 Tank Crewman, 0811 Field Artillery,
                  3381 Food Service
                </td>
                <td className="py-2">
                  Mid-range combat and support roles. Some come with shipping
                  bonuses.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  100
                </td>
                <td className="py-2 pr-4">
                  0231 Intelligence Specialist, 5811 Military Police, 0861 Fire
                  Support, 4341 Combat Correspondent
                </td>
                <td className="py-2">
                  Technical and intel entry point. This is where career-building
                  MOSs start.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  105
                </td>
                <td className="py-2 pr-4">
                  0321 Recon Marine, 0317 Scout Sniper, 267x Linguist MOSs,
                  0842 Field Artillery Radar
                </td>
                <td className="py-2">
                  Elite combat and specialized roles. Recon and MARSOC pipeline
                  entry.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  110
                </td>
                <td className="py-2 pr-4">
                  7314 UAS Operator, 5711 NBC Defense, 0631 Network Admin (also
                  EL 110), 0511 MAGTF Planning
                </td>
                <td className="py-2">
                  Technical leadership. Highest enlistment bonuses begin here.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  115+
                </td>
                <td className="py-2 pr-4">
                  1721 Cyberspace Warfare (also EL 115), 2336 EOD
                </td>
                <td className="py-2">
                  Toughest dual-score MOSs. Up to $15,000 enlistment bonus.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Your ASVAB marines score tier determines your career trajectory. The
          jump from GT 80 to GT 100 is the most consequential. At GT 80, you are
          picking from infantry and a handful of support roles. At GT 100,
          intelligence, military police, fire support, and communications open
          up. That 20-point gap is the difference between a narrow MOS selection
          and a career with options.
        </p>

        <p className="text-text-secondary">
          Watch for dual-score requirements. MOS 0631 (Network Administrator)
          needs both GT 110 and EL 110. Meeting one but not the other
          disqualifies you. MOS 1721 (Cyberspace Warfare Operator) needs GT 115
          and EL 115. The dual gate makes these among the hardest Marine jobs to
          qualify for.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 80 qualifies you for infantry. It does not give you negotiating
            leverage with your recruiter. If your GT is under 100, you are
            choosing from the narrowest slice of the Marine Corps. A 30-day
            study push to raise your GT above 100 opens a fundamentally
            different set of career paths.
          </p>
        </aside>

        <p className="text-text-secondary">
          Check your exact qualifications across every Marine MOS at the{" "}
          <Link href="/usmc-mos-list">USMC MOS list</Link>, or plug your subtest
          scores into the <Link href="/calculator">calculator</Link> to see your
          GT and every job you qualify for.
        </p>

        {/* ── Section: Top MOS Requirements by Line Score ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Top Marine Corps MOS Requirements by Line Score
        </h2>

        <p className="mt-4 text-text-secondary">
          GT is the loudest gatekeeper, but it is not the only one. Electronics,
          Mechanical Maintenance, and Clerical composites control entire career
          families that GT never touches.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Primary Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Threshold
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  0311
                </td>
                <td className="py-2 pr-4">Rifleman</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 font-mono">80</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  0321
                </td>
                <td className="py-2 pr-4">Reconnaissance Marine</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 font-mono">105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  0231
                </td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 font-mono">100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  1721
                </td>
                <td className="py-2 pr-4">Cyberspace Warfare Operator</td>
                <td className="py-2 pr-4 font-mono">GT + EL</td>
                <td className="py-2 font-mono">115 each</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  5811
                </td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 font-mono">100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  0861
                </td>
                <td className="py-2 pr-4">Fire Support Marine</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 font-mono">100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  7314
                </td>
                <td className="py-2 pr-4">UAS Operator</td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 font-mono">110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  2811
                </td>
                <td className="py-2 pr-4">Telephone Technician</td>
                <td className="py-2 pr-4 font-mono">EL</td>
                <td className="py-2 font-mono">115</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  2841
                </td>
                <td className="py-2 pr-4">Ground Radio Repairer</td>
                <td className="py-2 pr-4 font-mono">EL</td>
                <td className="py-2 font-mono">115</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  5937
                </td>
                <td className="py-2 pr-4">Aviation Radio Repairer</td>
                <td className="py-2 pr-4 font-mono">EL</td>
                <td className="py-2 font-mono">105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  0621
                </td>
                <td className="py-2 pr-4">Field Radio Operator</td>
                <td className="py-2 pr-4 font-mono">EL</td>
                <td className="py-2 font-mono">90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  1371
                </td>
                <td className="py-2 pr-4">Combat Engineer</td>
                <td className="py-2 pr-4 font-mono">MM</td>
                <td className="py-2 font-mono">95</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  3521
                </td>
                <td className="py-2 pr-4">Automotive Mechanic</td>
                <td className="py-2 pr-4 font-mono">MM</td>
                <td className="py-2 font-mono">95</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  6048
                </td>
                <td className="py-2 pr-4">Flight Equipment Technician</td>
                <td className="py-2 pr-4 font-mono">MM</td>
                <td className="py-2 font-mono">105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  1161
                </td>
                <td className="py-2 pr-4">Refrigeration Mechanic</td>
                <td className="py-2 pr-4 font-mono">MM</td>
                <td className="py-2 font-mono">105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  0111
                </td>
                <td className="py-2 pr-4">Administrative Specialist</td>
                <td className="py-2 pr-4 font-mono">CL</td>
                <td className="py-2 font-mono">100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  3043
                </td>
                <td className="py-2 pr-4">Supply Administration</td>
                <td className="py-2 pr-4 font-mono">CL</td>
                <td className="py-2 font-mono">110</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  3432
                </td>
                <td className="py-2 pr-4">Finance Technician</td>
                <td className="py-2 pr-4 font-mono">CL</td>
                <td className="py-2 font-mono">110</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Electronics repair MOSs carry the highest single-composite threshold
          in the Marine Corps: EL 115. That is harder to reach than any GT
          requirement because EL combines four subtests (GS + AR + MK + EI), and
          each one must contribute meaningfully to clear the bar.
        </p>

        <p className="text-text-secondary">
          If you are aiming for a mechanical MOS like Combat Engineer (1371) or
          an aviation maintenance role, your MM score matters more than your GT.
          If you want a clerical or finance path, CL is your gatekeeper. Know
          which composite controls your target MOS before you build a study plan.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            MOS score requirements can change between fiscal years. The numbers
            above reflect FY2026 published thresholds. Confirm with your
            recruiter for the most current data. For the complete list, see the{" "}
            <Link href="/usmc-mos-list">USMC MOS list</Link>.
          </p>
        </aside>

        {/* ── Section: Recon, MARSOC, and Special Ops ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Recon, MARSOC, and Special Operations ASVAB Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Recon and MARSOC are the most competitive Marine Corps career paths.
          The ASVAB is the first filter, not the last, and GT 105 is the floor
          for both.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Recon Marine (0321)
        </h3>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 105
            </span>
            <span className="text-sm text-text-secondary">
              Minimum line score
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              1st Class PFT
            </span>
            <span className="text-sm text-text-secondary">
              Required (no minimum point threshold specified, must be 1st class)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              1st Class Swim Qual
            </span>
            <span className="text-sm text-text-secondary">Required</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Secret Clearance
            </span>
            <span className="text-sm text-text-secondary">
              Must be eligible
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              20/20 Vision
            </span>
            <span className="text-sm text-text-secondary">
              Correctable, normal color vision
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          The Marine Corps overhauled the reconnaissance training pipeline in
          April 2026. The old path ran through Marine Combat Training (MCT) into
          the 12-week Basic Reconnaissance Course. The new path is longer and
          builds a stronger infantry foundation:
        </p>

        <ul className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Boot Camp (13 weeks)</li>
          <li>
            Infantry Rifleman Course (replaces MCT for the recon track)
          </li>
          <li>
            Ground Reconnaissance Course (9 weeks): land navigation,
            demolitions, call-for-fire, comms, live-fire, patrol phase
          </li>
          <li>
            Amphibious Reconnaissance Course (9 weeks): pool phase, scout
            swimmer, culminating exercise
          </li>
        </ul>

        <p className="text-text-secondary">
          Total time to fully qualified Reconnaissance Marine: approximately 1.5
          to 2 years. Both new courses incorporate robotics and sensor technology
          alongside traditional skills. Standards have not changed. The pipeline
          just builds a better foundation.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          MARSOC Critical Skills Operator (0372)
        </h3>

        <p className="mt-4 text-text-secondary">
          MARSOC is not an entry-level path. You must already be an active-duty
          Marine.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              GT 105
            </span>
            <span className="text-sm text-text-secondary">
              Minimum for enlisted (GT/GCT 110 for officers)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              3+ Years Service
            </span>
            <span className="text-sm text-text-secondary">Required</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Corporal or Sergeant
            </span>
            <span className="text-sm text-text-secondary">
              Rank requirement
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              PFT 225+
            </span>
            <span className="text-sm text-text-secondary">
              Minimum physical fitness score
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Swim + Loaded March
            </span>
            <span className="text-sm text-text-secondary">
              Additional physical assessments
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              60-Month Obligation
            </span>
            <span className="text-sm text-text-secondary">
              Upon selection
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Assessment and Selection runs roughly 40 days across two phases.
          Candidates are evaluated on 10 attributes including Effective
          Intelligence, Adaptability, Stress Tolerance, and Teamwork. The
          Individual Training Course (ITC) that follows is 9 months, covering
          direct action, special reconnaissance, irregular warfare, and a
          capstone exercise. After ITC, expect Basic Airborne Course and 6
          months of language training.
        </p>

        <p className="text-text-secondary">
          Historical selection rates are around 28% of candidates who enter
          A&amp;S. The GT 105 minimum ensures candidates can handle the cognitive
          demands: communications, tactics, medicine, planning, culture, and
          language acquisition on top of the physical requirements.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 105 gets you in the door for both Recon and MARSOC screening. The
            physical standards, swim qualifications, and mental evaluations
            eliminate most candidates long before GT becomes the issue. If you
            have the GT, start training your body.
          </p>
        </aside>

        {/* ── Section: AFCT Retake ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Already Active Duty? How to Retake via AFCT
        </h2>

        <p className="mt-4 text-text-secondary">
          If you are already in and your GT score is blocking a lateral move, you
          are not stuck. The AFCT (Armed Forces Classification Test) exists
          specifically for this situation.
        </p>

        <p className="text-text-secondary">
          The AFCT is the same test content as the ASVAB, administered to
          active-duty service members who need updated scores. For Marines, the
          process works like this:
        </p>

        <ul className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Obtain a command authorization letter from your unit</li>
          <li>
            Schedule the AFCT through Education Services on your installation
          </li>
          <li>Take the test under standard proctored conditions</li>
          <li>New scores are reported in MCTFS within 14 to 30 days</li>
          <li>
            Updated scores replace your previous ASVAB scores for MOS
            qualification
          </li>
        </ul>

        <p className="text-text-secondary">
          The most common use case: a Marine with GT 98 who wants to lateral
          move to 0321 Reconnaissance Marine (GT 105 required). The Recon
          lateral move policy explicitly encourages Marines below GT 105 to
          retake via AFCT. Your command already expects this request.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              14&ndash;30 Days
            </span>
            <span className="text-sm text-text-secondary">
              Score reporting timeline
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Command Auth Required
            </span>
            <span className="text-sm text-text-secondary">
              Must have authorization letter
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Scores Replace Previous
            </span>
            <span className="text-sm text-text-secondary">
              Your most recent test result becomes your official score
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          The same 30/30/180-day retake waiting periods apply to the AFCT. Your
          newest score replaces all previous scores, so do not retake on a whim.
          Study first. Build your study plan with our{" "}
          <Link href="/afct-practice-test">AFCT practice test</Link>, and read
          the full <Link href="/afct">AFCT guide</Link> for branch-specific
          retake rules.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your target MOS requires GT 105 and you are sitting at GT 98,
            that 7-point gap is entirely closable with 4&ndash;6 weeks of
            focused AR and WK/PC study. The AFCT is the same test. The prep is
            the same prep.
          </p>
        </aside>

        {/* ── Section: FY2026 Enlistment Bonuses ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FY2026 Enlistment Bonuses Tied to ASVAB Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Your ASVAB marines score is worth up to $15,000 in cash before you
          ship to boot camp.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Bonus Category
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Eligible MOSs (Examples)
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Amount
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Line Score Requirement
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Electronics/Cyber
                </td>
                <td className="py-2 pr-4">1721, 2621, 2831</td>
                <td className="py-2 pr-4 font-mono">Up to $15,000</td>
                <td className="py-2">GT 110&ndash;115+, EL 105+</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Shipping Bonus
                </td>
                <td className="py-2 pr-4">Any of 31 career programs</td>
                <td className="py-2 pr-4 font-mono">$5,000&ndash;$10,000</td>
                <td className="py-2">Varies by MOS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Contract Extension (5&ndash;6 yr)
                </td>
                <td className="py-2 pr-4">Various</td>
                <td className="py-2 pr-4 font-mono">$7,000&ndash;$15,000</td>
                <td className="py-2">Meets MOS minimums</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The pattern is consistent: the highest bonuses attach to the highest
          line score requirements. Your ASVAB marines score directly determines
          your bonus eligibility. Cyber and electronics fields carry the biggest
          incentives because the Marine Corps competes directly with
          private-sector tech salaries for that talent pool.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            A 10-point EL improvement could be worth $15,000. If you are scoring
            EL 95 and the bonus threshold is EL 105, that gap is not just about
            job options. It is cash you collect at boot camp.
          </p>
        </aside>

        <p className="text-text-secondary">
          These figures come from MARADMIN 526/25 (November 2025). Bonus amounts
          and eligibility change quarterly. Confirm current numbers with your
          recruiter, but use these figures for planning. For a deeper look at how
          bonuses map to MOS requirements, see the full breakdown on our{" "}
          <Link href="/asvab-score-for-marines">
            ASVAB score for Marines
          </Link>{" "}
          page.
        </p>

        {/* ── Section: What to Study First ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What to Study First for a Higher Marine ASVAB Score
        </h2>

        <p className="mt-4 text-text-secondary">
          You know your target. Here is where to aim your study time.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Priority
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Feeds Into
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 1
                </td>
                <td className="py-2 pr-4 font-mono">AR</td>
                <td className="py-2 pr-4 font-mono">GT, EL, MM, CL (4/5)</td>
                <td className="py-2">
                  Highest leverage subtest for Marines
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 1
                </td>
                <td className="py-2 pr-4 font-mono">WK + PC</td>
                <td className="py-2 pr-4 font-mono">GT, CL, ST (3/5)</td>
                <td className="py-2">Easiest to improve quickly</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 2
                </td>
                <td className="py-2 pr-4 font-mono">MK</td>
                <td className="py-2 pr-4 font-mono">EL, CL, ST (3/5)</td>
                <td className="py-2">
                  Unlocks electronics and clerical paths
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 2
                </td>
                <td className="py-2 pr-4 font-mono">GS</td>
                <td className="py-2 pr-4 font-mono">EL, ST (2/5)</td>
                <td className="py-2">Boosts technical composites</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 3
                </td>
                <td className="py-2 pr-4 font-mono">EI</td>
                <td className="py-2 pr-4 font-mono">EL, MM (2/5)</td>
                <td className="py-2">Electronics-specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 3
                </td>
                <td className="py-2 pr-4 font-mono">MC</td>
                <td className="py-2 pr-4 font-mono">MM, ST (2/5)</td>
                <td className="py-2">Mechanical-specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Tier 3
                </td>
                <td className="py-2 pr-4 font-mono">AS</td>
                <td className="py-2 pr-4 font-mono">MM (1/5)</td>
                <td className="py-2">Narrow impact</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Skip
                </td>
                <td className="py-2 pr-4 font-mono">AO</td>
                <td className="py-2 pr-4 font-mono">None (0/5)</td>
                <td className="py-2">Not used by Marines</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Raising your ASVAB marines score starts with AR. Every 5-point
          improvement in AR adds 5 points to GT, EL, MM, and CL simultaneously.
          No other single subtest cascades across 4 composites. That makes AR
          your highest-priority study target for any Marine Corps career path.
        </p>

        <p className="text-text-secondary">
          VE (WK + PC) is your second priority and the easiest to move.
          Vocabulary builds on itself, and reading comprehension strategies can
          be learned in days. These verbal skills feed GT, CL, and ST.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Two weeks to test? Spend 60% of your time on AR, 40% on WK/PC. That
            covers GT and CL, the two most common MOS gatekeepers. Four or more
            weeks? Add MK and GS to unlock higher EL and ST scores.
          </p>
        </aside>

        <p className="text-text-secondary">
          Start with our{" "}
          <Link href="/asvab-arithmetic-reasoning-tips">
            Arithmetic Reasoning tips
          </Link>{" "}
          and{" "}
          <Link href="/asvab-word-knowledge-tips">Word Knowledge tips</Link>.
          Build your full plan with the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>, or take a{" "}
          <Link href="/practice-test">practice test</Link> to find your
          baseline.
        </p>

        {/* ── FAQ Section ── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps ASVAB Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Marines?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The minimum AFQT score is 31 with a high school diploma, 50 with a
              GED, and 25 with a rare waiver (approved for roughly 1% of
              applicants). The 31 is an enlistment floor. It does not qualify you
              for most Marine Corps jobs. Line scores determine MOS eligibility,
              and most MOSs require composites well above a 31 AFQT.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do you need for Marine infantry (0311)?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Infantry requires a GT line score of 80. GT = VE + AR, which
              expands to WK + PC + AR. A GT of 80 is one of the lowest MOS
              thresholds in the Marine Corps. Most recruits who clear the 31
              AFQT minimum will still need solid AR and verbal scores to reach
              GT 80.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is the Marine GT formula VE + AR or VE + AR + MC?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT = VE + AR. The version that adds Mechanical Comprehension (MC)
              to the formula is a persistent myth. MC feeds into MM and ST
              composites, not GT. If you are studying gears and levers to raise
              your GT, you are wasting time. Focus on AR and WK/PC instead. See
              the{" "}
              <Link href="/gt-score-calculator">GT score calculator</Link> for
              details.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long are ASVAB scores valid for the Marine Corps?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              ASVAB scores are valid for 2 years from the test date. If your
              scores expire before you ship to boot camp, you must retest. Once
              you have enlisted and entered active duty or the reserves, your
              scores do not expire.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake the ASVAB to get a better Marine Corps job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The first retake is available after 30 days, the second after
              another 30 days, and subsequent retakes require a 6-month wait.
              Your most recent score replaces all previous scores. There is no
              option to keep the higher number, so study before you retest.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need for Marine Recon or MARSOC?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Both Recon (0321) and MARSOC CSO (0372) require a minimum GT of
              105. But GT is just the entry ticket. Recon requires a first-class
              PFT and first-class swim qualification. MARSOC requires PFT 225+,
              swim assessment, 3+ years of service, and Corporal/Sergeant rank.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can active-duty Marines retake the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, through the AFCT (Armed Forces Classification Test). You need
              a command authorization letter. Schedule through Education
              Services. New scores replace your old scores within 14 to 30 days
              and apply to MOS qualification immediately. The{" "}
              <Link href="/afct">AFCT guide</Link> covers the full process.
            </p>
          </div>
        </div>

        {/* ── CTA Box ── */}

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, all 5
            Marine Corps composites, and every MOS you qualify for.
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
              Go deeper in the{" "}
              <Link
                href="/asvab-score-for-marines"
                className="text-accent underline hover:text-accent-hover"
              >
                complete ASVAB score guide for Marines
              </Link>{" "}
              and browse jobs in the{" "}
              <Link
                href="/usmc-mos-list"
                className="text-accent underline hover:text-accent-hover"
              >
                USMC MOS list
              </Link>
              .
            </li>
            <li>
              Check your line scores on the{" "}
              <Link
                href="/marines-afqt-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                Marines AFQT calculator
              </Link>{" "}
              and see how scores map to{" "}
              <Link
                href="/marine-corps-ranks"
                className="text-accent underline hover:text-accent-hover"
              >
                Marine Corps ranks
              </Link>
              .
            </li>
            <li>
              Other branches:{" "}
              <Link
                href="/navy-asvab-score-requirements"
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
              to see if you clear the GT and line scores you need.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
