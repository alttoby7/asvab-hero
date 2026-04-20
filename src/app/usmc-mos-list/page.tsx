import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "USMC MOS List 2026: Marine Corps Jobs with ASVAB Scores | ASVAB Hero",
  description:
    "Complete USMC MOS list with ASVAB line score requirements, FY26 bonuses up to $15K, TS/SCI clearances, and Force Design 2030 changes by occupational field.",
  alternates: {
    canonical: "https://asvabhero.com/usmc-mos-list",
  },
};

export default function USMCMOSListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "USMC MOS List 2026: Every Marine Corps Job with ASVAB Score Requirements",
          description:
            "Complete USMC MOS list with ASVAB line score requirements, FY26 bonuses up to $15K, TS/SCI clearances, and Force Design 2030 changes by occupational field.",
          url: "https://asvabhero.com/usmc-mos-list",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-20",
          dateModified: "2026-03-20",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What MOS requires the highest ASVAB score in the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "2651 Special Communications Signals Collection Operator requires both GT=110 AND EL=110, making it the toughest dual-score MOS in the Marine Corps. For single-composite MOSs, GT=110+ is required for 1721 Cyberspace Warfare Operator, 2336 EOD, 0651 Cyber Network Operator, and 0681 Information Security Technician.",
              },
            },
            {
              "@type": "Question",
              name: "What is a GT score on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT (General Technical) equals VE + AR, which is Verbal Expression plus Arithmetic Reasoning. It is the most important Marine Corps line score because more MOSs use GT as a gatekeeper than any other composite.",
              },
            },
            {
              "@type": "Question",
              name: "Can I change my MOS after enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, through a lateral move (lat move), but it takes time. Most lat moves happen after your first enlistment, typically 3-4 years in. Approval depends on your current MOS manning levels, target MOS manning, your ASVAB scores for the new MOS, and command recommendation. Nothing is guaranteed.",
              },
            },
            {
              "@type": "Question",
              name: "What if I don&apos;t qualify for the MOS I want?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Three options: (1) retake the ASVAB after a 30-day waiting period, (2) choose a different MOS you currently qualify for, or (3) spend 30+ days studying and retake with better preparation.",
              },
            },
            {
              "@type": "Question",
              name: "What is the minimum ASVAB score for the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AFQT 31 for high school diploma holders and AFQT 50 for GED holders. The AFQT only determines enlistment eligibility. Line scores determine your MOS options, and most desirable MOSs require GT=100 or higher.",
              },
            },
            {
              "@type": "Question",
              name: "Which Marine MOS gets the best bonuses in 2026?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Four MOSs offer $15K FY26 enlistment bonuses: 1721 Cyberspace Warfare Operator, 2621 Cryptologic Digital Network Tech, 2831 Digital Wideband Repairer, and 2171 Electro-Optical Ordnance Repairer. For reenlistment bonuses, 1751 Influence Specialist leads at $65K Zone A, followed by 2336 EOD at $60K.",
              },
            },
            {
              "@type": "Question",
              name: "What is Force Design 2030 and how does it affect MOS options?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Force Design 2030 is the Marine Corps restructuring plan that realigns the force for peer-level conflict. Tanks (1812) and Assaultman (0351) were eliminated. Cyber warfare (17XX), HIMARS artillery (0814), and unmanned systems are expanding. The expanding fields have more open slots, faster promotion timelines, and higher bonuses.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          USMC MOS List 2026: Every Marine Corps Job with ASVAB Score
          Requirements
        </h1>

        <p className="mt-4 text-text-secondary">
          The Marine Corps lists 300+ MOSs across dozens of occupational fields.
          Your ASVAB score narrows that number to the ones you actually qualify
          for. Knowing which line scores matter is the difference between picking
          your job and getting assigned one.
        </p>
        <p className="text-text-secondary">
          This <strong>USMC MOS list</strong> covers every major occupational
          field organized by MOS code, the line score minimums you need (GT, EL,
          MM, CL, ST), FY26 enlistment bonuses, security clearance requirements,
          and which fields are expanding or shrinking under Force Design 2030.
        </p>
        <p className="text-text-secondary">
          The baseline to enlist in the Marine Corps is an AFQT score of 31 for
          high school diploma holders or 50 for GED holders. That gets you
          through the door. Your line scores, composite scores calculated from
          your ASVAB subtests, determine which MOSs you can actually lock in at
          MEPS.
        </p>
        <p className="text-text-secondary">
          Quick glossary: MOS stands for Military Occupational Specialty. It is
          your job title in the Marine Corps. Line scores are composite scores
          derived from combinations of your nine ASVAB subtest scores. Each MOS
          requires a minimum in one or more line scores.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Enter your ASVAB subtest scores into our{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Score Calculator
            </Link>{" "}
            to instantly see which Marine Corps MOSs you qualify for, including
            GT, EL, MM, CL, and ST composites.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. How USMC Line Scores Work (With a Worked Example)
        </h2>

        <p className="mt-4 text-text-secondary">
          The Marine Corps uses five line scores to determine MOS eligibility.
          Each one is a composite of specific ASVAB subtests. Here are the
          formulas:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          EL = GS + AR + MK + EI
        </div>
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          MM = AR + EI + MC + AS
        </div>
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          CL = WK + PC + MK
        </div>
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          ST = GS + VE + MK + MC
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) is itself a composite of Word Knowledge (WK)
          and Paragraph Comprehension (PC). The rest are individual ASVAB
          subtests: AR (Arithmetic Reasoning), GS (General Science), MK
          (Mathematics Knowledge), EI (Electronics Information), MC (Mechanical
          Comprehension), and AS (Auto &amp; Shop Information).
        </p>
        <p className="text-text-secondary">
          <strong>Worked example.</strong> A recruit scores WK=30, PC=28, AR=52,
          GS=55, MK=50, EI=48, MC=45, AS=50. VE = WK + PC = 30 + 28 = 58.
          Their line scores:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>GT</strong> = 58 + 52 = <strong>110</strong>
          </li>
          <li>
            <strong>EL</strong> = 55 + 52 + 50 + 48 = <strong>205</strong>
          </li>
          <li>
            <strong>MM</strong> = 52 + 48 + 45 + 50 = <strong>195</strong>
          </li>
          <li>
            <strong>CL</strong> = 30 + 28 + 50 = <strong>108</strong>
          </li>
          <li>
            <strong>ST</strong> = 55 + 58 + 50 + 45 = <strong>208</strong>
          </li>
        </ul>

        <p className="text-text-secondary">
          With GT=110, this recruit qualifies for 0651 Cyber Network Operator
          (GT=110), 1721 Cyberspace Warfare Operator (GT=110), and 2336 EOD
          (GT=110). Their EL=205 clears the EL=115 threshold for electronics
          repair MOSs. Their MM=195 opens every aviation maintenance MOS.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT gets you in the door. Your line scores determine which
            door you walk through. Understand the difference at{" "}
            <Link
              href="/asvab-scores-explained"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Scores Explained
            </Link>
            .
          </p>
        </aside>

        <p className="text-text-secondary">
          GT is the single most important line score because more MOSs reference
          it than any other composite. The fastest way to raise your GT is to
          improve Arithmetic Reasoning and Word Knowledge, since VE feeds
          directly from WK and PC. Use our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Score Calculator
          </Link>{" "}
          to see exactly where you stand.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. How MOS Assignment Works: Open Contract vs. Guaranteed MOS
        </h2>

        <p className="mt-4 text-text-secondary">
          Two paths lead to your MOS in the Marine Corps. One gives you control.
          The other leaves it to the Corps.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Guaranteed MOS
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You negotiate a specific MOS (or MOS field) at MEPS before you
              ship. Your contract locks in the job. You know what you are
              training for on Day 1.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Open Contract
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You enlist without a guaranteed MOS. The Marine Corps assigns you
              a job based on your ASVAB scores, the needs of the service, and
              available slots at your training pipeline start date.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Higher scores matter even when you already meet the minimum. A
          recruiter filling a 0651 Cyber Network Operator slot (GT=110 minimum)
          will prioritize the recruit with GT=120 over the one sitting at
          exactly 110. Scoring above the minimum gives you leverage during
          contract negotiations at MEPS.
        </p>
        <p className="text-text-secondary">
          At MEPS, contract options are grouped into lettered program codes (BK
          for infantry, CK for electronics maintenance, DB for intelligence,
          etc.). Each program code bundles related MOSs from the{" "}
          <strong>USMC MOS list</strong> into a single contract option. Your
          recruiter can show you which program codes your line scores unlock.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Never sign an open contract if you care about your MOS. If your
            scores are too low for the job you want, study harder and retake the
            ASVAB. Use our{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              free practice tests
            </Link>{" "}
            to prep before you walk into MEPS with a signature.
          </p>
        </aside>

        <p className="text-text-secondary">
          Force Design 2030 is reshaping which MOSs have open slots. The Marine
          Corps eliminated tanks (1812) and Assaultman (0351). It expanded cyber
          warfare (17XX), HIMARS rocket artillery (0814), and unmanned systems.
          The expanding fields have more billets, faster promotions, and bigger
          bonuses. The shrinking fields have fewer seats and longer wait times.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. 03XX Infantry: Every Ground Combat MOS
        </h2>

        <p className="mt-4 text-text-secondary">
          Infantry has the lowest GT minimums in the Corps. But elite
          specializations like Recon, Sniper, and MARSOC demand GT=100 or
          higher, plus additional selection pipelines.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0311</td>
                <td className="py-2 pr-4">Rifleman</td>
                <td className="py-2 pr-4 font-mono">GT=80</td>
                <td className="py-2">Published minimum; some recruiters cite GT=90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0313</td>
                <td className="py-2 pr-4">LAV Crewman</td>
                <td className="py-2 pr-4 font-mono">GT=90</td>
                <td className="py-2">Light Armored Vehicles</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0317</td>
                <td className="py-2 pr-4">Scout Sniper</td>
                <td className="py-2 pr-4 font-mono">GT=100</td>
                <td className="py-2">Volunteer; Sniper School required</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0321</td>
                <td className="py-2 pr-4">Reconnaissance Marine</td>
                <td className="py-2 pr-4 font-mono">GT=105</td>
                <td className="py-2">+ Basic Reconnaissance Course (BRC)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0331</td>
                <td className="py-2 pr-4">Machine Gunner</td>
                <td className="py-2 pr-4 font-mono">GT=80</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0341</td>
                <td className="py-2 pr-4">Mortarman</td>
                <td className="py-2 pr-4 font-mono">GT=80</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0352</td>
                <td className="py-2 pr-4">Anti-Tank Missile Gunner</td>
                <td className="py-2 pr-4 font-mono">GT=80</td>
                <td className="py-2">Expanded after 0351 was cut</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0372</td>
                <td className="py-2 pr-4">Critical Skills Operator (MARSOC)</td>
                <td className="py-2 pr-4 font-mono">GT=105</td>
                <td className="py-2">+ MARSOC Assessment and Selection</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The published minimum for 0311 Rifleman is GT=80, but some
            recruiters and training commands cite GT=90. Score higher than the
            minimum for priority placement regardless of the published number.
          </p>
        </aside>

        <p className="text-text-secondary">
          Force Design 2030 eliminated 0351 Assaultman around 2021. The 0352
          Anti-Tank Missile Gunner role expanded to absorb that mission set with
          updated weapon systems.
        </p>
        <p className="text-text-secondary">
          Infantry is the default open-contract assignment. If you sign open and
          your scores fall on the lower end, you will likely end up as a 0311
          Rifleman. Specializations like 0317 Scout Sniper or 0321 Recon require
          scores well above the minimum, a volunteer packet, and survival of a
          selection pipeline that washes out most candidates. Use this{" "}
          <strong>USMC MOS list</strong> to identify the GT you need, then build
          a study plan around it.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. 06XX Communications and 17XX Cyber/Information Warfare
        </h2>

        <p className="mt-4 text-text-secondary">
          The Marine Corps created an entirely new occupational field, 17XX, for
          cyber and information warfare. These MOSs did not exist five years ago,
          and they come with the highest enlistment bonuses in the Corps.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clearance
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  FY26 Bonus
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0612</td>
                <td className="py-2 pr-4">Tactical Switching Operator</td>
                <td className="py-2 pr-4 font-mono">EL=90</td>
                <td className="py-2 pr-4">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0621</td>
                <td className="py-2 pr-4">Transmission Systems Operator</td>
                <td className="py-2 pr-4 font-mono">EL=105</td>
                <td className="py-2 pr-4">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0651</td>
                <td className="py-2 pr-4">Cyber Network Operator</td>
                <td className="py-2 pr-4 font-mono">GT=110</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0671</td>
                <td className="py-2 pr-4">Data Systems Administrator</td>
                <td className="py-2 pr-4 font-mono">GT=110</td>
                <td className="py-2 pr-4">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0681</td>
                <td className="py-2 pr-4">Information Security Technician</td>
                <td className="py-2 pr-4 font-mono">GT=110</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clearance
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  FY26 Bonus
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">1721</td>
                <td className="py-2 pr-4">Cyberspace Warfare Operator</td>
                <td className="py-2 pr-4 font-mono">GT=110</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2 font-semibold text-emerald-400">$15K</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">1751</td>
                <td className="py-2 pr-4">Influence Specialist</td>
                <td className="py-2 pr-4 font-mono">GT=110</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">$65K SRB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            FY26 Bonus Alert: 1721 Cyberspace Warfare Operator qualifies for a
            $15K enlistment bonus. You need GT=110+ and must pass a TS/SCI
            background investigation, which takes 6-12 months.
          </p>
        </aside>

        <p className="text-text-secondary">
          Security clearance is the hidden gatekeeper for these MOSs. Drug use
          history, foreign contacts, or significant financial issues (collections,
          bankruptcy) can block a TS/SCI investigation. This affects 0651, 0681,
          and 1721. If your background is clean, these fields are wide open.
        </p>
        <p className="text-text-secondary">
          Civilian crossover is where 06XX and 17XX pay off long-term. Cyber
          Network Operators, Data Systems Admins, and Cyberspace Warfare
          Operators transition into $80K&ndash;$130K cybersecurity and IT jobs
          after their enlistment. The security clearance alone adds
          $15K&ndash;$20K to civilian salary offers.
        </p>
        <p className="text-text-secondary">
          The 06XX and 17XX fields represent the fastest-growing section of the{" "}
          <strong>USMC MOS list</strong>. The Marine Corps activated 17XX in
          2018, and billet counts have increased every fiscal year since.
          Recruits who score GT=110+ and pass the clearance investigation face
          less competition for guaranteed contracts here than in legacy fields
          like infantry or artillery.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. 26XX Signals Intelligence
        </h2>

        <p className="mt-4 text-text-secondary">
          SIGINT MOSs are the intelligence community&apos;s primary pipeline
          from the Marine Corps. Every one requires a TS/SCI clearance, and the
          analytical skills translate directly to three-letter agency careers.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clearance
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  FY26 Bonus
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2611</td>
                <td className="py-2 pr-4">Cryptologic Digital Network Exploitation Analyst</td>
                <td className="py-2 pr-4 font-mono">GT=105</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2621</td>
                <td className="py-2 pr-4">Cryptologic Digital Network Tech</td>
                <td className="py-2 pr-4 font-mono">GT=105</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2 font-semibold text-emerald-400">$15K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2631</td>
                <td className="py-2 pr-4">Electronic Intelligence Intercept Operator</td>
                <td className="py-2 pr-4 font-mono">GT=100</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2641</td>
                <td className="py-2 pr-4">Cryptologic Language Analyst</td>
                <td className="py-2 pr-4 font-mono">GT=105</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">+ DLAB</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2651</td>
                <td className="py-2 pr-4">Special Comms Signals Collection Operator</td>
                <td className="py-2 pr-4 font-mono">GT=110 + EL=110</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            2621 Cryptologic Digital Network Tech has a $15K FY26 enlistment
            bonus. If you score GT=105+ and can clear a TS/SCI investigation,
            this is one of the best deals in the Marine Corps right now.
          </p>
        </aside>

        <p className="text-text-secondary">
          The 2641 Cryptologic Language Analyst MOS requires the Defense
          Language Aptitude Battery (DLAB) in addition to your ASVAB scores. The
          DLAB measures your ability to learn foreign languages and is a separate
          test administered at MEPS. A minimum DLAB score of 100 is typically
          required.
        </p>
        <p className="text-text-secondary">
          The civilian pipeline from 26XX is direct. The NSA, CIA, DIA, and
          defense contractors like Booz Allen and Leidos actively recruit Marines
          out of the SIGINT field. Many 26XX Marines have job offers before they
          separate.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. 08XX Field Artillery
        </h2>

        <p className="mt-4 text-text-secondary">
          The Marine Corps eliminated its tank battalions under Force Design 2030
          but doubled down on HIMARS rocket artillery. 0814 HIMARS Operator is
          one of the fastest-growing MOSs in the Corps.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0811</td>
                <td className="py-2 pr-4">Field Artillery Cannoneer (M777A2)</td>
                <td className="py-2 pr-4 font-mono">GT=90</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0814</td>
                <td className="py-2 pr-4">HIMARS Operator</td>
                <td className="py-2 pr-4 font-mono">GT=90</td>
                <td className="py-2">Expanding under FD2030</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0842</td>
                <td className="py-2 pr-4">Field Artillery Radar Operator</td>
                <td className="py-2 pr-4 font-mono">GT=105</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0844</td>
                <td className="py-2 pr-4">Field Artillery Fire Control Marine</td>
                <td className="py-2 pr-4 font-mono">GT=100</td>
                <td className="py-2"></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0861</td>
                <td className="py-2 pr-4">Fire Support Marine</td>
                <td className="py-2 pr-4 font-mono">GT=100</td>
                <td className="py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          HIMARS proved its value in real-world conflicts, and the Marine Corps
          is investing heavily. New HIMARS battalions are standing up, which
          means more open billets for 0814 than in any previous year. The GT=90
          minimum is relatively accessible compared to cyber and intelligence
          fields.
        </p>
        <p className="text-text-secondary">
          The technical roles in this field (0842 and 0844) require GT=100-105,
          putting them in the mid-range. Fire Support Marine (0861) works
          directly with infantry units calling in fire missions and is one of the
          more competitive billets in the artillery field.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. 28XX and 59XX: Ground and Aviation Electronics
        </h2>

        <p className="mt-4 text-text-secondary">
          Every MOS in this section requires EL=115, the highest line score
          threshold in the Marine Corps. That means strong scores across General
          Science, Arithmetic Reasoning, Mathematics Knowledge, and Electronics
          Information. The payoff: matching or exceeding civilian wages while
          still on active duty BAH.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  FY26 Bonus/SRB
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2821</td>
                <td className="py-2 pr-4">Technical Controller</td>
                <td className="py-2 pr-4 font-mono">EL=115</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2831</td>
                <td className="py-2 pr-4">Digital Wideband Repairer</td>
                <td className="py-2 pr-4 font-mono">EL=115</td>
                <td className="py-2 font-semibold text-emerald-400">$15K bonus</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2841</td>
                <td className="py-2 pr-4">Ground Radio Repairer</td>
                <td className="py-2 pr-4 font-mono">EL=115</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">5974</td>
                <td className="py-2 pr-4">Tactical Data Systems Technician</td>
                <td className="py-2 pr-4 font-mono">EL=115</td>
                <td className="py-2">$46K SRB</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">5979</td>
                <td className="py-2 pr-4">Tactical Air Ops Module Repairer</td>
                <td className="py-2 pr-4 font-mono">EL=115</td>
                <td className="py-2">$59K SRB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            2831 Digital Wideband Repairer has a $15K FY26 enlistment bonus.
            5979 Tactical Air Ops Module Repairer has a $59K Selective
            Reenlistment Bonus for those who reenlist. EL=115 requires strong
            GS+AR+MK+EI scores across the board. Check where you stand with our{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Score Calculator
            </Link>{" "}
            or start prepping with our{" "}
            <Link
              href="/asvab-study-guide"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB Study Guide
            </Link>
            .
          </p>
        </aside>

        <p className="text-text-secondary">
          These are the hardest MOSs to fill because the EL=115 threshold
          eliminates most recruits before they reach the schoolhouse. The Marine
          Corps compensates with bonuses and SRBs that rival anything in the
          other services. If your ASVAB subtests in math and science are your
          strength, this field is where the money is.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          8. 21XX/23XX Ordnance, Ammo, and EOD
        </h2>

        <p className="mt-4 text-text-secondary">
          2336 Explosive Ordnance Disposal has the highest SRB in the Corps at
          $60K. Getting there requires GT=110+ and surviving one of the
          military&apos;s toughest training pipelines, with attrition rates
          regularly exceeding 50%.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  FY26 Bonus/SRB
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2111</td>
                <td className="py-2 pr-4">Small Arms Repairer/Technician</td>
                <td className="py-2 pr-4 font-mono">MM=95</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2131</td>
                <td className="py-2 pr-4">Towed Artillery Systems Tech</td>
                <td className="py-2 pr-4 font-mono">MM=95</td>
                <td className="py-2">-</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2171</td>
                <td className="py-2 pr-4">Electro-Optical Ordnance Repairer</td>
                <td className="py-2 pr-4 font-mono">MM=105 or EL=115</td>
                <td className="py-2 font-semibold text-emerald-400">$15K bonus</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2311</td>
                <td className="py-2 pr-4">Ammunition Technician</td>
                <td className="py-2 pr-4 font-mono">GT=100</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2336</td>
                <td className="py-2 pr-4">Explosive Ordnance Disposal</td>
                <td className="py-2 pr-4 font-mono">GT=110</td>
                <td className="py-2">$60K SRB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            2336 EOD: $60K SRB, GT=110+ required, and one of the highest
            attrition pipelines in the military. The $15K bonus for 2171
            Electro-Optical Ordnance Repairer is more attainable but still
            requires elite scores (MM=105 or EL=115).
          </p>
        </aside>

        <p className="text-text-secondary">
          The ordnance field spans from basic small arms repair (MM=95) to bomb
          disposal (GT=110). If your MM composite is strong but your GT is below
          110, the 2111 and 2131 MOSs offer solid technical training without the
          extreme selection pipeline. 2311 Ammunition Technician sits in the
          middle at GT=100.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          9. 6XXX Aviation Maintenance
        </h2>

        <p className="mt-4 text-text-secondary">
          Aviation maintenance is the largest technical field in the Marine
          Corps. The line score threshold is almost universally MM=105, and the
          field has more available billets than most other technical tracks.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6048</td>
                <td className="py-2 pr-4">Flight Equipment Technician</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6062</td>
                <td className="py-2 pr-4">Aircraft Hydraulic/Pneumatic Mechanic</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6072</td>
                <td className="py-2 pr-4">Aircraft Intermediate Level Structures Mechanic</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6073</td>
                <td className="py-2 pr-4">Aircraft Intermediate Level Electrician</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6153</td>
                <td className="py-2 pr-4">Helicopter Airframe Mechanic (CH-53)</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6174</td>
                <td className="py-2 pr-4">Helicopter Crew Chief (UH-1Y/AH-1Z)</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">6214</td>
                <td className="py-2 pr-4">Fixed-Wing Aircraft Mechanic (MV-22)</td>
                <td className="py-2 font-mono">MM=105</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Remember: MM = AR + EI + MC + AS. To hit MM=105, focus your study time
          on Arithmetic Reasoning, Electronics Information, Mechanical
          Comprehension, and Auto &amp; Shop Information. These four subtests are
          the only ones that matter for your MM composite.
        </p>
        <p className="text-text-secondary">
          Civilian value is strong here. Marines who complete their enlistment in
          6XXX can pursue FAA Airframe and Powerplant (A&amp;P) certification
          with credit for military training. Combined with hands-on experience on
          military aircraft, that translates to $60K&ndash;$90K jobs at airlines,
          MRO facilities, and defense contractors.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          10. 58XX Military Police and Support Fields
        </h2>

        <p className="mt-4 text-text-secondary">
          Support MOSs have the most available slots and the broadest score
          ranges in the Marine Corps. If your line scores fall in the moderate
          range (GT 90-100, CL 90-100), this is where you will find the most
          guaranteed contract options on the{" "}
          <strong>USMC MOS list</strong>.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Line Score
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">5811</td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2 font-mono">GT=100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">5812</td>
                <td className="py-2 pr-4">Working Dog Handler</td>
                <td className="py-2 font-mono">GT=100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0111</td>
                <td className="py-2 pr-4">Administrative Specialist</td>
                <td className="py-2 font-mono">CL=100</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">0431</td>
                <td className="py-2 pr-4">Logistics/Embarkation Specialist</td>
                <td className="py-2 font-mono">CL=90</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">3521</td>
                <td className="py-2 pr-4">Motor Vehicle Operator</td>
                <td className="py-2 font-mono">MM=85</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">3531</td>
                <td className="py-2 pr-4">Motor Vehicle Mechanic</td>
                <td className="py-2 font-mono">MM=95</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">3043</td>
                <td className="py-2 pr-4">Supply Chain/Materiel Management Specialist</td>
                <td className="py-2 font-mono">CL=90</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Military Police requires GT=100, higher than many recruits expect for
          a law enforcement MOS. Working Dog Handler (5812) uses the same GT=100
          threshold but is one of the most competitive billets in the entire
          Marine Corps. Very few slots open each year, and selection favors
          Marines who already have an MP background.
        </p>
        <p className="text-text-secondary">
          The CL-based MOSs (0111, 0431, 3043) use the Clerical composite: WK +
          PC + MK. If your verbal and math subtests are solid but your mechanical
          and electronics scores lag, these fields are a strong fit. Check your
          CL composite with our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Score Calculator
          </Link>{" "}
          to see where you qualify.
        </p>
        <p className="text-text-secondary">
          For context on what score ranges open the most doors, see{" "}
          <Link
            href="/what-is-a-good-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            What Is a Good ASVAB Score
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          11. FY26 Enlistment Bonuses and SRBs: Where the Money Is
        </h2>

        <p className="mt-4 text-text-secondary">
          Every FY26 bonus MOS requires GT=105+ or EL=115+. The Marine Corps
          pays the most for the hardest-to-fill technical roles. Higher ASVAB
          scores literally pay you more.
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
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Score Required
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">1721</td>
                <td className="py-2 pr-4">Cyberspace Warfare Operator</td>
                <td className="py-2 font-mono">GT=110+, TS/SCI</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2621</td>
                <td className="py-2 pr-4">Cryptologic Digital Network Tech</td>
                <td className="py-2 font-mono">GT=105, TS/SCI</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2831</td>
                <td className="py-2 pr-4">Digital Wideband Repairer</td>
                <td className="py-2 font-mono">EL=115</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2171</td>
                <td className="py-2 pr-4">Electro-Optical Ordnance Repairer</td>
                <td className="py-2 font-mono">MM=105 or EL=115</td>
              </tr>
            </tbody>
          </table>
        </div>

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
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  SRB Amount
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">1751</td>
                <td className="py-2 pr-4">Influence Specialist</td>
                <td className="py-2 font-semibold text-emerald-400">$65K Zone A</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">2336</td>
                <td className="py-2 pr-4">EOD Technician</td>
                <td className="py-2 font-semibold text-emerald-400">$60K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">5979</td>
                <td className="py-2 pr-4">Tactical Air Ops Module Repairer</td>
                <td className="py-2 font-semibold text-emerald-400">$59K</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">5974</td>
                <td className="py-2 pr-4">Tactical Data Systems Tech</td>
                <td className="py-2 font-semibold text-emerald-400">$46K</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Higher ASVAB scores literally pay you more. Every bonus MOS in FY26
            requires GT=105+ or EL=115+. Confirm current bonus amounts with your
            recruiter since they change by fiscal year.
          </p>
        </aside>

        <p className="text-text-secondary">
          Fine print: enlistment bonuses typically require a 4-5 year contract
          commitment. SRBs are paid upon reenlistment and may be split across
          installments. Both are taxable income. Your recruiter can pull current
          bonus listings at MEPS, but these numbers reflect FY26 published data.
        </p>
        <p className="text-text-secondary">
          Check if your scores qualify for bonus MOSs with our{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Score Calculator
          </Link>
          . If you are close but not quite there, a focused study plan can close
          the gap. See our{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Study Guide
          </Link>{" "}
          and{" "}
          <Link
            href="/asvab-score-chart"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB Score Chart
          </Link>{" "}
          for the full breakdown of how subtests feed into composites.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          USMC MOS List FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What MOS requires the highest ASVAB score in the Marines?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              2651 Special Communications Signals Collection Operator requires
              both GT=110 AND EL=110, making it the toughest dual-score MOS in
              the Marine Corps. For single-composite MOSs, GT=110+ is required
              for 1721 Cyberspace Warfare Operator, 2336 EOD, 0651 Cyber Network
              Operator, and 0681 Information Security Technician.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a GT score on the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT (General Technical) equals VE + AR, which is Verbal Expression
              plus Arithmetic Reasoning. It is the most important Marine Corps
              line score because more MOSs use GT as a gatekeeper than any other
              composite. Learn how all five composites work at{" "}
              <Link
                href="/asvab-scores-explained"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB Scores Explained
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I change my MOS after enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, through a lateral move (lat move), but it takes time. Most
              lat moves happen after your first enlistment, typically 3-4 years
              in. Approval depends on your current MOS manning levels, target
              MOS manning, your ASVAB scores for the new MOS, and command
              recommendation. Nothing is guaranteed.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if I don&apos;t qualify for the MOS I want?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Three options: (1) retake the ASVAB after a 30-day waiting period,
              (2) choose a different MOS you currently qualify for, or (3) spend
              30+ days studying and retake with better preparation. Our{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                free practice tests
              </Link>{" "}
              and{" "}
              <Link
                href="/asvab-study-guide"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB Study Guide
              </Link>{" "}
              can help close the gap.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Marines?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT 31 for high school diploma holders and AFQT 50 for GED
              holders. The AFQT only determines enlistment eligibility. Line
              scores determine your MOS options, and most desirable MOSs require
              GT=100 or higher. See{" "}
              <Link
                href="/what-is-a-good-asvab-score"
                className="text-accent hover:text-accent-hover"
              >
                What Is a Good ASVAB Score
              </Link>{" "}
              for context.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Which Marine MOS gets the best bonuses in 2026?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Four MOSs offer $15K FY26 enlistment bonuses: 1721 Cyberspace
              Warfare Operator, 2621 Cryptologic Digital Network Tech, 2831
              Digital Wideband Repairer, and 2171 Electro-Optical Ordnance
              Repairer. For reenlistment bonuses, 1751 Influence Specialist leads
              at $65K Zone A, followed by 2336 EOD at $60K.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is Force Design 2030 and how does it affect MOS options?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Force Design 2030 is the Marine Corps restructuring plan that
              realigns the force for peer-level conflict. Tanks (1812) and
              Assaultman (0351) were eliminated. Cyber warfare (17XX), HIMARS
              artillery (0814), and unmanned systems are expanding. The expanding
              fields have more open slots, faster promotion timelines, and higher
              bonuses.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which MOSs You Qualify For
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 ASVAB subtest scores and instantly see your GT, EL, MM,
            CL, and ST composites plus every Marine Corps MOS you qualify for.
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
