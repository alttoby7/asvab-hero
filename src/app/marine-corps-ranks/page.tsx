import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RankEquivalencyExplorer from "@/components/ranks/RankEquivalencyExplorer";
import StartingRankEstimator from "@/components/ranks/StartingRankEstimator";
import PromotionPathPlanner from "@/components/ranks/PromotionPathPlanner";
import BranchJobUnlockExplorer from "@/components/ranks/BranchJobUnlockExplorer";

export const metadata: Metadata = {
  title: "Marine Corps Ranks: USMC Enlisted, Officer & Pay Guide (2026)",
  description:
    "Complete guide to all 29 Marine Corps ranks with 2026 pay tables, promotion timelines, and how your ASVAB score shapes your USMC career path.",
  alternates: {
    canonical: "https://asvabhero.com/marine-corps-ranks",
  },
};

export default function MarineCorpsRanksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Marine Corps Ranks: Complete Guide to USMC Enlisted, Officer, and Warrant Officer Grades",
          description:
            "Complete guide to all 29 Marine Corps ranks with 2026 pay tables, promotion timelines, and how your ASVAB score shapes your USMC career path.",
          url: "https://asvabhero.com/marine-corps-ranks",
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
              name: "How many ranks are in the Marine Corps?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "29 total: 20 enlisted (including dual tracks at E-8/E-9 plus the Sergeant Major of the Marine Corps), 5 warrant officer, and 4 company-grade plus 7 field/general officer ranks. The exact count varies depending on whether you count the SMMC and dual-track positions separately, but 29 is standard.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do I need to join the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Minimum AFQT of 31 with a high school diploma or 50 with a GED. But the AFQT only gets you in the door. Your USMC line scores (GT, CL, EL, MM, ST) determine which MOSs you qualify for, and your MOS shapes your entire career. A 31 AFQT with a low GT limits you to a handful of MOSs.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between MSgt and 1stSgt?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Same pay grade (E-8), same base pay, different career tracks. Master Sergeants stay technical as MOS experts. First Sergeants move to command leadership as the senior enlisted advisor to a company or battery commander. Once you choose at E-8, you stay on that track through E-9 (MGySgt or SgtMaj).",
              },
            },
            {
              "@type": "Question",
              name: "How long does it take to become a Sergeant?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Typically 4-5 years, but it depends on your composite score and your MOS cutting score. Some MOSs with low cutting scores promote Marines to Sergeant in 3 years. Others stay maxed out, and Marines wait 6+ years. Your rifle score, PFT, CFT, MCIs, and proficiency/conduct marks all factor in.",
              },
            },
            {
              "@type": "Question",
              name: "Can enlisted Marines become officers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The primary path is MECEP (Marine Enlisted Commissioning Education Program). Requirements: AFQT 74+ or SAT 1000+ or ACT 22+, 12+ college credits, ages 20-26, and a 6-year post-commission obligation. You attend 10-week OCS, complete your bachelor's through NROTC at a civilian university (2.5 GPA minimum), then attend The Basic School for 6 months.",
              },
            },
            {
              "@type": "Question",
              name: "What rank do most Marines retire at?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GySgt (E-7) or MSgt/1stSgt (E-8). Reaching E-9 (SgtMaj/MGySgt) typically requires 22-26+ years and is highly competitive. For officers, most retire at O-5 (Lieutenant Colonel) after 20 years.",
              },
            },
            {
              "@type": "Question",
              name: "What does Gunny mean?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Gunny is the nickname for Gunnery Sergeant (E-7). The rank dates to 1899, created for Marines responsible for a ship's naval guns. It is probably the most famous USMC rank nickname thanks to movies and real-life Gunnys who became public figures. Always respectful to use.",
              },
            },
            {
              "@type": "Question",
              name: "Do Marine Corps officers need a GT score to commission?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. There is no GT score requirement for officer commissioning. You need an AFQT of 74+, or an SAT of 1000+, or an ACT of 22+, plus a bachelor's degree. GT scores apply to enlisted MOS qualification only.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Marine Corps Ranks: Complete Guide to USMC Enlisted, Officer, and Warrant Officer Grades
        </h1>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "Total Ranks", value: "29" },
            { label: "Enlisted", value: "E-1 to E-9" },
            { label: "Min AFQT", value: "31" },
            { label: "Active Duty", value: "~172K" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 rounded-full border border-navy-border bg-navy-lighter px-4 py-1.5 text-sm">
              <span className="font-mono font-bold text-accent">{stat.value}</span>
              <span className="text-text-tertiary">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-text-secondary">
          The Marine Corps has 29 ranks across three tiers, and the one you start at depends on decisions you make before you ship to boot camp. Your ASVAB line scores determine which MOSs you qualify for, and your MOS shapes how fast and how far you climb. A GT score of 80 puts you in infantry. A GT of 110 opens intel and cyber. Same boot camp, completely different <strong>marine corps ranks</strong> trajectory.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Quick stat</p>
          <p className="mt-1 text-sm text-text-secondary">
            The average 20-year Marine retires as a GySgt (E-7) or MSgt (E-8). Your starting MOS influences where you land.
          </p>
        </aside>

        {/* ─── RANK EQUIVALENCY EXPLORER ─── */}
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <RankEquivalencyExplorer />
        </div>

        {/* ─── 3 TIERS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The 3 Tiers of Marine Corps Rank Structure
        </h2>
        <p className="mt-4 text-text-secondary">
          Every rank falls into one of three tiers. Each tier has a distinct role, and the path between them is not always a straight line.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Tier</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grades</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Total Ranks</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Role</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Enlisted</td>
                <td className="py-2 pr-4 font-mono">E-1 to E-9</td>
                <td className="py-2 pr-4 font-mono">20</td>
                <td className="py-2">Execute the mission. NCOs and SNCOs train, mentor, and lead Marines.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Warrant Officer</td>
                <td className="py-2 pr-4 font-mono">W-1 to CWO5</td>
                <td className="py-2 pr-4 font-mono">5</td>
                <td className="py-2">Technical specialists. Deep expertise in a single field.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Commissioned Officer</td>
                <td className="py-2 pr-4 font-mono">O-1 to O-10</td>
                <td className="py-2 pr-4 font-mono">11</td>
                <td className="py-2">Plan, decide, and take legal responsibility for outcomes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Enlisted Marines make up roughly 82% of the Corps. They do the work, maintain the gear, and run daily operations. Warrant officers are the rarest tier, existing because some problems need a specialist with 15+ years of hands-on experience, not a generalist officer rotating through commands every two years. Commissioned officers hold legal authority under the UCMJ to issue orders and bear responsibility when things go wrong.
        </p>
        <p className="text-text-secondary">
          One detail unique to the USMC: crossed rifles appear on enlisted rank insignia from Corporal up. No other branch does this. It ties back to the &ldquo;Every Marine a Rifleman&rdquo; culture.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Every Marine a Rifleman</p>
          <p className="mt-1 text-sm text-text-secondary">
            Unlike the Army or Air Force, every Marine completes infantry training at the School of Infantry after boot camp. This shared experience shapes the entire marine corps rank structure and culture. A data systems administrator (MOS 0671) and an infantry rifleman (MOS 0311) both qualify with the same rifle.{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">Check your ASVAB line scores with our free calculator</Link>.
          </p>
        </aside>

        {/* ─── JUNIOR ENLISTED ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Junior Enlisted Ranks (E-1 to E-3): Where Every Marine Starts
        </h2>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbreviation</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Insignia</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Time to Next Rank</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-1</td>
                <td className="py-2 pr-4">Private</td>
                <td className="py-2 pr-4 font-mono">Pvt</td>
                <td className="py-2 pr-4">No insignia (plain collar)</td>
                <td className="py-2">6 months</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-2</td>
                <td className="py-2 pr-4">Private First Class</td>
                <td className="py-2 pr-4 font-mono">PFC</td>
                <td className="py-2 pr-4">One chevron up</td>
                <td className="py-2">9 months</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-3</td>
                <td className="py-2 pr-4">Lance Corporal</td>
                <td className="py-2 pr-4 font-mono">LCpl</td>
                <td className="py-2 pr-4">One chevron up, crossed rifles</td>
                <td className="py-2">8 months (after TIG/TIS met)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Boot camp</p>
            <p className="mt-1 text-sm text-text-secondary">13 weeks at MCRD San Diego or Parris Island</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">School of Infantry</p>
            <p className="mt-1 text-sm text-text-secondary">2-8 weeks (MCT or ITB)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">MOS school</p>
            <p className="mt-1 text-sm text-text-secondary">4 weeks to 12+ months depending on MOS</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Fleet assignment</p>
            <p className="mt-1 text-sm text-text-secondary">Typically 6-9 months after enlistment</p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          Promotions from E-1 to E-3 are automatic, based on time-in-grade. You show up, do your job, stay out of trouble, and you pick up rank on schedule.
        </p>
        <p className="text-text-secondary">
          The real variable at this stage is your MOS. A Marine who scored a GT of 110 on the ASVAB and landed an intel MOS (0231) is learning analysis skills that transfer to the civilian world and position them for faster SNCO promotions later. A Marine with a GT of 80 in a combat arms MOS is building different skills. Neither is wrong, but the trajectories diverge.
        </p>
        <p className="text-text-secondary">
          If you have college credits before enlisting, you can enter as an E-2 (15-29 credits) or E-3 (30+ credits). That is free rank and free money from day one. Learn{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">how ASVAB scoring works</Link>{" "}
          to understand the line scores behind MOS qualification.
        </p>
        <p className="text-text-secondary">
          2026 base pay for E-1 starts at $2,407/month. Housing, food, and healthcare are covered on top of that.
        </p>

        {/* ─── STARTING RANK ESTIMATOR ─── */}
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <StartingRankEstimator />
        </div>

        {/* ─── NCO RANKS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          NCO Ranks (E-4 to E-5): Where Marines Become Leaders
        </h2>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbreviation</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Insignia</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Typical Time in Service</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-4</td>
                <td className="py-2 pr-4">Corporal</td>
                <td className="py-2 pr-4 font-mono">Cpl</td>
                <td className="py-2 pr-4">Two chevrons up, crossed rifles</td>
                <td className="py-2">2-3 years</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-5</td>
                <td className="py-2 pr-4">Sergeant</td>
                <td className="py-2 pr-4 font-mono">Sgt</td>
                <td className="py-2 pr-4">Three chevrons up, crossed rifles</td>
                <td className="py-2">4-5 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Corporal is the first competitive promotion in the Marine Corps. You do not pick it up automatically. The Corps uses a composite score system that weighs:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>Rifle marksmanship score</li>
          <li>PFT (Physical Fitness Test) and CFT (Combat Fitness Test) scores</li>
          <li>Marine Corps Institute (MCI) course completions</li>
          <li>Proficiency and conduct marks from your command</li>
        </ul>
        <p className="text-text-secondary">
          Your composite score gets stacked against the cutting score for your MOS. Some MOSs have low cutting scores (lots of billets, few Marines). Others are brutally competitive. This is where your MOS choice, driven by your ASVAB line scores, starts compounding.
        </p>
        <p className="text-text-secondary">
          Corporals lead fire teams of 4 Marines. Sergeants lead squads of 13. This is real leadership with real consequences. You are responsible for the training, welfare, discipline, and combat readiness of your Marines.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Corporal&apos;s School</p>
          <p className="mt-1 text-sm text-text-secondary">
            Before a Corporal can be promoted to Sergeant, they must complete the Corporal&apos;s Course (formerly Corporal&apos;s School). It covers leadership, mentoring, and small-unit tactics. No waiver, no shortcut.
          </p>
        </aside>

        <p className="text-text-secondary">
          The blood stripe on dress blue trousers appears at Corporal and above. Marine tradition holds it commemorates the blood shed by NCOs and officers at the Battle of Chapultepec in 1847. You will hear this at every Marine Corps Birthday Ball.
        </p>
        <p className="text-text-secondary">
          Looking for which MOSs your line scores qualify you for?{" "}
          <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">Browse the USMC MOS list</Link>.
        </p>

        {/* ─── STAFF NCO ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Staff NCO Ranks (E-6 to E-9): The Career Fork and the Iconic Gunny
        </h2>
        <p className="mt-4 text-text-secondary">
          This is where marine corps ranks split into two distinct tracks, and the choice defines the rest of your career.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Technical Track</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Leadership Track</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Insignia Difference</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-6</td>
                <td className="py-2 pr-4">Staff Sergeant (SSgt)</td>
                <td className="py-2 pr-4">Staff Sergeant (SSgt)</td>
                <td className="py-2">Three up, one rocker, crossed rifles</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-7</td>
                <td className="py-2 pr-4">Gunnery Sergeant (GySgt)</td>
                <td className="py-2 pr-4">Gunnery Sergeant (GySgt)</td>
                <td className="py-2">Three up, two rockers, crossed rifles</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-8</td>
                <td className="py-2 pr-4">Master Sergeant (MSgt)</td>
                <td className="py-2 pr-4">First Sergeant (1stSgt)</td>
                <td className="py-2">Three up, three rockers (MSgt) / Diamond + three up, three rockers (1stSgt)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-9</td>
                <td className="py-2 pr-4">Master Gunnery Sergeant (MGySgt)</td>
                <td className="py-2 pr-4">Sergeant Major (SgtMaj)</td>
                <td className="py-2">Three up, four rockers, bursting bomb (MGySgt) / Three up, four rockers, diamond, star (SgtMaj)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-9 (Special)</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2 pr-4">Sergeant Major of the Marine Corps (SMMC)</td>
                <td className="py-2">One per Corps</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          At E-8, Marines choose. The MSgt/MGySgt track stays technical. You remain the expert in your field, training Marines in your MOS. The 1stSgt/SgtMaj track is command leadership. You serve as the senior enlisted advisor to a commanding officer and are responsible for discipline, morale, and welfare across an entire unit.
        </p>
        <p className="text-text-secondary">
          Same pay grade. Same base pay. Completely different daily life.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">The Gunny</p>
          <p className="mt-1 text-sm text-text-secondary">
            GySgt (E-7) holds a special place in Marine culture. The rank dates to 1899, originally created for Marines responsible for a ship&apos;s guns. Today, &ldquo;Gunny&rdquo; is the most recognized USMC nickname outside the Corps. If you have watched any Marine movie, you have heard it.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">SNCO Nicknames (Get These Right)</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-text-secondary">
            <li><strong>Gunny</strong> = Gunnery Sergeant (E-7). Always acceptable.</li>
            <li><strong>Top</strong> = First Sergeant or Master Sergeant. Used informally.</li>
            <li><strong>Sergeant Major</strong> = Always say the full title. Never shorten it to &ldquo;Sarge&rdquo; or &ldquo;Major.&rdquo; Both will get you corrected fast.</li>
          </ul>
        </aside>

        <p className="text-text-secondary">
          Certain special duty assignments bypass the normal promotion timeline. Drill Instructor duty, recruiter duty, and Marine Security Guard (MSG) duty at U.S. embassies make Marines eligible for meritorious promotion to SSgt or GySgt per MARADMIN 274/25. These are demanding billets, but they accelerate careers.
        </p>

        {/* ─── WARRANT OFFICER ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Warrant Officer Ranks (W-1 to CWO5): The Technical Specialist Track
        </h2>
        <p className="mt-4 text-text-secondary">
          Warrant officers solve the hardest technical problems in their field for decades, while officers rotate through commands and SNCOs manage people.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbreviation</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">2026 Base Pay Range</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Typical Years of Service</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">W-1</td>
                <td className="py-2 pr-4">Warrant Officer</td>
                <td className="py-2 pr-4 font-mono">WO</td>
                <td className="py-2 pr-4 font-mono">$4,057-$7,010</td>
                <td className="py-2">8-12</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">W-2</td>
                <td className="py-2 pr-4">Chief Warrant Officer 2</td>
                <td className="py-2 pr-4 font-mono">CWO2</td>
                <td className="py-2 pr-4 font-mono">$4,622-$7,714</td>
                <td className="py-2">12-16</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">W-3</td>
                <td className="py-2 pr-4">Chief Warrant Officer 3</td>
                <td className="py-2 pr-4 font-mono">CWO3</td>
                <td className="py-2 pr-4 font-mono">$5,223-$9,162</td>
                <td className="py-2">16-20</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">W-4</td>
                <td className="py-2 pr-4">Chief Warrant Officer 4</td>
                <td className="py-2 pr-4 font-mono">CWO4</td>
                <td className="py-2 pr-4 font-mono">$5,720-$10,654</td>
                <td className="py-2">20-24</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">W-5</td>
                <td className="py-2 pr-4">Chief Warrant Officer 5</td>
                <td className="py-2 pr-4 font-mono">CWO5</td>
                <td className="py-2 pr-4 font-mono">$10,170-$13,308</td>
                <td className="py-2">24-30</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          The Marine Corps is the only branch that still appoints Warrant Officers at W-1. Every other service has eliminated or restructured the grade. Appointment requires Sergeant rank and 8+ years of service.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Marine Gunner (MOS 0306)</p>
          <p className="mt-1 text-sm text-text-secondary">
            The most selective warrant officer role in the Corps. Only GySgts with 16+ years of service can apply. Marine Gunners advise commanders on every weapons system in the USMC inventory. About 300 serve at any given time. Their unique insignia: a bursting bomb in place of the standard warrant officer bar.{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">Check if your ASVAB scores qualify you for infantry feeder MOSs</Link>.
          </p>
        </aside>

        {/* ─── COMMISSIONED OFFICER ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Commissioned Officer Ranks (O-1 to O-10): How to Lead Marines
        </h2>
        <p className="mt-4 text-text-secondary">
          Persistent myth: you need a GT of 110 to become a Marine officer. You do not. GT applies to enlisted MOS qualification only.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Officer Commissioning Requirements</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-text-secondary">
            <li><strong>Education:</strong> Bachelor&apos;s degree (any major, 2.0+ GPA minimum, 2.5+ competitive)</li>
            <li><strong>Test scores:</strong> AFQT 74+ OR SAT 1000+ OR ACT 22+</li>
            <li><strong>Age:</strong> Under 28 at time of commissioning (waivers possible)</li>
            <li><strong>Physical:</strong> Pass officer physical fitness standards</li>
            <li><strong>GT score:</strong> Not a requirement. Period.</li>
          </ul>
        </aside>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbreviation</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Nickname</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Typical Command Level</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-1</td>
                <td className="py-2 pr-4">Second Lieutenant</td>
                <td className="py-2 pr-4 font-mono">2ndLt</td>
                <td className="py-2 pr-4">Butter Bar</td>
                <td className="py-2">Platoon (40-50 Marines)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-2</td>
                <td className="py-2 pr-4">First Lieutenant</td>
                <td className="py-2 pr-4 font-mono">1stLt</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2">Platoon/Executive Officer</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-3</td>
                <td className="py-2 pr-4">Captain</td>
                <td className="py-2 pr-4 font-mono">Capt</td>
                <td className="py-2 pr-4">Skipper</td>
                <td className="py-2">Company (150-200 Marines)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-4</td>
                <td className="py-2 pr-4">Major</td>
                <td className="py-2 pr-4 font-mono">Maj</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2">Battalion staff</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-5</td>
                <td className="py-2 pr-4">Lieutenant Colonel</td>
                <td className="py-2 pr-4 font-mono">LtCol</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2">Battalion (800-1,000 Marines)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-6</td>
                <td className="py-2 pr-4">Colonel</td>
                <td className="py-2 pr-4 font-mono">Col</td>
                <td className="py-2 pr-4">Full Bird</td>
                <td className="py-2">Regiment (3,000-5,000 Marines)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-7</td>
                <td className="py-2 pr-4">Brigadier General</td>
                <td className="py-2 pr-4 font-mono">BGen</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2">Deputy division/wing</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-8</td>
                <td className="py-2 pr-4">Major General</td>
                <td className="py-2 pr-4 font-mono">MajGen</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2">Division (20,000 Marines)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-9</td>
                <td className="py-2 pr-4">Lieutenant General</td>
                <td className="py-2 pr-4 font-mono">LtGen</td>
                <td className="py-2 pr-4">(none)</td>
                <td className="py-2">MEF (45,000+ Marines)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-10</td>
                <td className="py-2 pr-4">General</td>
                <td className="py-2 pr-4 font-mono">Gen</td>
                <td className="py-2 pr-4">Four Star</td>
                <td className="py-2">Commandant or Combatant Command</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Five commissioning paths:
        </p>
        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li><strong>OCS:</strong> 10-week program in Quantico, VA. Open to college graduates and seniors.</li>
          <li><strong>Naval Academy (USNA):</strong> 4-year degree at Annapolis. Most competitive path.</li>
          <li><strong>NROTC:</strong> College scholarship program. Commissioned at graduation.</li>
          <li><strong>PLC (Platoon Leaders Class):</strong> Two 6-week summer sessions during college.</li>
          <li><strong>MECEP:</strong> Active-duty enlisted Marines earn a degree and commission. AFQT 74+, 12+ college credits, ages 20-26.</li>
        </ol>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">The Butter Bar</p>
          <p className="mt-1 text-sm text-text-secondary">
            Second Lieutenants wear a single gold bar. The nickname &ldquo;Butter Bar&rdquo; is universal across all branches. Every officer starts here, and every SNCO has a story about training one.
          </p>
        </aside>

        {/* ─── PAY TABLE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2026 Marine Corps Pay by Rank: Complete Pay Table
        </h2>
        <p className="mt-4 text-text-secondary">
          Congress approved a 3.8% military pay raise for 2026, the largest in over a decade. Here is what key marine corps ranks earn in base pay this year.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Entry Base Pay/Month</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Max Base Pay/Month</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-1</td>
                <td className="py-2 pr-4">Private</td>
                <td className="py-2 pr-4 font-mono">$2,407</td>
                <td className="py-2 font-mono">$2,407</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-3</td>
                <td className="py-2 pr-4">Lance Corporal</td>
                <td className="py-2 pr-4 font-mono">$2,554</td>
                <td className="py-2 font-mono">$2,881</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-5</td>
                <td className="py-2 pr-4">Sergeant</td>
                <td className="py-2 pr-4 font-mono">$3,343</td>
                <td className="py-2 font-mono">$4,422</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-7</td>
                <td className="py-2 pr-4">Gunnery Sergeant</td>
                <td className="py-2 pr-4 font-mono">$3,932</td>
                <td className="py-2 font-mono">$7,067</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-9</td>
                <td className="py-2 pr-4">Sergeant Major</td>
                <td className="py-2 pr-4 font-mono">$6,910</td>
                <td className="py-2 font-mono">$10,729</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">E-9 (Special)</td>
                <td className="py-2 pr-4">SMMC</td>
                <td className="py-2 pr-4 font-mono">$10,294.80 (flat)</td>
                <td className="py-2 font-mono">$10,294.80 (flat)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">W-1</td>
                <td className="py-2 pr-4">Warrant Officer</td>
                <td className="py-2 pr-4 font-mono">$4,057</td>
                <td className="py-2 font-mono">$7,010</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">CWO5</td>
                <td className="py-2 pr-4">Chief Warrant Officer 5</td>
                <td className="py-2 pr-4 font-mono">$10,170</td>
                <td className="py-2 font-mono">$13,308</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-1</td>
                <td className="py-2 pr-4">Second Lieutenant</td>
                <td className="py-2 pr-4 font-mono">$4,150</td>
                <td className="py-2 font-mono">$5,222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-3</td>
                <td className="py-2 pr-4">Captain</td>
                <td className="py-2 pr-4 font-mono">$5,535</td>
                <td className="py-2 font-mono">$9,609</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">O-5</td>
                <td className="py-2 pr-4">Lieutenant Colonel</td>
                <td className="py-2 pr-4 font-mono">$7,295</td>
                <td className="py-2 font-mono">$12,394</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Most Marines also receive on top of base pay:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li><strong>BAH (Basic Allowance for Housing):</strong> Tax-free, based on rank and duty station zip code.</li>
          <li><strong>BAS (Basic Allowance for Subsistence):</strong> $460.25/month for enlisted, $334.72/month for officers in 2026.</li>
          <li><strong>Special Duty Pay:</strong> Extra pay for DI duty, recruiter duty, hazardous duty, and more.</li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">BAH varies wildly by location</p>
          <p className="mt-1 text-sm text-text-secondary">
            A GySgt (E-7) with dependents at Camp Pendleton, CA receives roughly $3,200/month in BAH alone. That same GySgt at Camp Lejeune, NC gets around $1,800/month. Duty station matters more than most recruits realize.
          </p>
        </aside>

        <p className="text-text-secondary">
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">Try a free practice test</Link> to see how different scores affect your options.
        </p>

        {/* ─── ASVAB CAREER ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Your ASVAB Score Shapes Your Marine Corps Career and Rank Ceiling
        </h2>
        <p className="mt-4 text-text-secondary">
          Your ASVAB does not determine your marine corps ranks ceiling directly, but it determines your MOS, and your MOS shapes your entire career trajectory.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          ASVAB Line Scores &rarr; MOS Eligibility &rarr; Career Trajectory &rarr; Realistic Rank Ceiling
        </div>

        <p className="text-text-secondary">
          The Marine Corps uses five composite line scores, each calculated from different ASVAB subtests:
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Line Score</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Formula</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Unlocks</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">Admin, intel, cyber, combat arms</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">CL</td>
                <td className="py-2 pr-4 font-mono">VE + AR + MK</td>
                <td className="py-2">Admin, finance, legal</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">EL</td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2">Electronics, communications, avionics</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">MM</td>
                <td className="py-2 pr-4 font-mono">NO + AS + MC + EI</td>
                <td className="py-2">Vehicle/aircraft maintenance, ordnance</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">ST</td>
                <td className="py-2 pr-4 font-mono">GS + VE + MK + MC</td>
                <td className="py-2">Medical, technical, science-adjacent</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">MOS</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Title</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Line Score Requirement</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">SNCO Promotion Speed</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">0311</td>
                <td className="py-2 pr-4">Infantry Rifleman</td>
                <td className="py-2 pr-4 font-mono">GT 80</td>
                <td className="py-2">Average (large MOS, many billets)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">0211</td>
                <td className="py-2 pr-4">Counterintelligence</td>
                <td className="py-2 pr-4 font-mono">GT 110</td>
                <td className="py-2">Above average (smaller MOS, specialist demand)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">2862</td>
                <td className="py-2 pr-4">Electronics Maint Tech</td>
                <td className="py-2 pr-4 font-mono">EL 115</td>
                <td className="py-2">Fast (high technical demand, small community)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">0671</td>
                <td className="py-2 pr-4">Data Systems Admin</td>
                <td className="py-2 pr-4 font-mono">GT 100</td>
                <td className="py-2">Fast (cyber growth under Force Design 2030)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">1721</td>
                <td className="py-2 pr-4">Cyberspace Warfare Operator</td>
                <td className="py-2 pr-4 font-mono">GT 110+</td>
                <td className="py-2">Fast (new MOS, expanding billets)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Technical MOSs promote faster to SNCO because the communities are smaller and the skills harder to replace. A data systems admin with strong performance can make GySgt faster than an infantryman in a larger MOS.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">The line score leverage point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Scoring 10-15 points higher on your ASVAB subtests can open an entirely different set of MOSs and a different 20-year trajectory. That is why preparation matters.
          </p>
        </aside>

        <p className="text-text-secondary">
          <Link href="/calculator" className="text-accent hover:text-accent-hover">Check which MOSs your current scores qualify you for</Link>, explore the{" "}
          <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">USMC MOS list</Link>, or see{" "}
          <Link href="/asvab-score-chart" className="text-accent hover:text-accent-hover">how ASVAB scoring breaks down</Link>.
        </p>

        {/* ─── BRANCH JOB UNLOCK EXPLORER ─── */}
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <BranchJobUnlockExplorer />
        </div>

        {/* ─── PROMOTIONS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Marine Corps Promotions Work: Automatic, Composite, and Board
        </h2>
        <p className="mt-4 text-text-secondary">
          Promotion follows three distinct phases, each with different mechanics.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Phase 1 (E-1 to E-3)</p>
            <p className="mt-1 text-sm text-text-secondary">Time-in-grade. Automatic if you meet TIG/TIS requirements and have no disciplinary issues.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Phase 2 (E-4 to E-5)</p>
            <p className="mt-1 text-sm text-text-secondary">Composite score. Your performance numbers compete against MOS cutting scores monthly.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Phase 3 (E-6 to E-9)</p>
            <p className="mt-1 text-sm text-text-secondary">Selection board. Senior Marines review your entire service record, fitness reports, education, and assignments.</p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          For Corporal and Sergeant (E-4/E-5), the composite score system drives everything. Points come from:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li><strong>Rifle marksmanship:</strong> Expert (5 points), Sharpshooter (4), Marksman (3)</li>
          <li><strong>PFT score:</strong> Up to 100 points based on your Physical Fitness Test</li>
          <li><strong>CFT score:</strong> Up to 100 points from the Combat Fitness Test</li>
          <li><strong>MCI completions:</strong> Marine Corps Institute courses add points per completion</li>
          <li><strong>Proficiency and conduct marks:</strong> Your reporting seniors rate you 0.0-5.0 each period</li>
        </ul>
        <p className="text-text-secondary">
          Each MOS publishes a monthly cutting score. If your composite meets or exceeds it, you get promoted. If not, you try again next month. Some MOSs stay &ldquo;open&rdquo; (low cutting scores, easy pickup). Others stay locked at the maximum for months.
        </p>
        <p className="text-text-secondary">
          For E-6 and above, promotion boards review your complete record. Fitness reports from commanding officers carry the most weight. Education, PME (Professional Military Education) completions, special duty assignments, and awards all factor in.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Meritorious promotion bypass</p>
          <p className="mt-1 text-sm text-text-secondary">
            DI duty at recruit depots, recruiter duty, and Marine Security Guard embassy duty can qualify Marines for meritorious promotion to SSgt or GySgt, bypassing the normal board cycle per MARADMIN 274/25. These are demanding 3-year tours, but they accelerate careers significantly.
          </p>
        </aside>

        <p className="text-text-secondary">
          Learn{" "}
          <Link href="/what-is-a-good-asvab-score" className="text-accent hover:text-accent-hover">what counts as a good ASVAB score</Link>{" "}
          for your target MOS.
        </p>

        {/* ─── PROMOTION PATH PLANNER ─── */}
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <PromotionPathPlanner />
        </div>

        {/* ─── REALISTIC TIMELINE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Realistic Rank Timeline: What You Will Likely Achieve in 4, 10, and 20 Years
        </h2>
        <p className="mt-4 text-text-secondary">
          Honest expectations matter more than motivational posters. Here is what rank progression looks like over a full career.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">4 years (one enlistment)</p>
            <p className="mt-1 text-sm text-text-secondary">E-3 Lance Corporal to E-4 Corporal. Some fast-trackers make Sergeant.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">10 years</p>
            <p className="mt-1 text-sm text-text-secondary">E-6 Staff Sergeant. High performers in technical MOSs may have picked up GySgt.</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">20 years (retirement eligible)</p>
            <p className="mt-1 text-sm text-text-secondary">E-7 Gunnery Sergeant or E-8 Master Sergeant/First Sergeant. Making SgtMaj requires 22-26+ years.</p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          Most Marines serve one four-year enlistment and leave as a Corporal or Sergeant. That is normal. The skills, discipline, and leadership experience from four years in the Corps set you up for civilian success whether you stay or go.
        </p>
        <p className="text-text-secondary">
          For officers: O-1 at commissioning, O-2 at 18-24 months, O-3 at 3.5-4 years. Captain (O-3) is essentially automatic. After that, promotions slow and get competitive. O-5 (Lieutenant Colonel) is a realistic 20-year ceiling for most officers.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">The one-enlistment Marine</p>
          <p className="mt-1 text-sm text-text-secondary">
            About 75% of enlisted Marines separate after their first contract. They leave with GI Bill benefits, VA home loan eligibility, veteran hiring preference, and experience that most civilians their age cannot match. Staying in is not the only good outcome.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Force Design 2030: What Changed</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-text-secondary">
            <li><strong>MOS 0321 (Reconnaissance Scout Sniper):</strong> Eliminated December 15, 2023. Replaced by 0322 (Recon Sniper), which requires a Recon MOS first.</li>
            <li><strong>Historian MOS 8878:</strong> Now open to enlisted Marines, not just officers.</li>
            <li><strong>Lateral entry pilot program:</strong> Civilians with critical skills (cyber, data science) may enter as Sergeants.</li>
            <li><strong>New Fatality Management WO (MOS 0408):</strong> New warrant officer specialty.</li>
            <li><strong>Expansion:</strong> Cyber, unmanned systems, and information warfare MOSs growing. Traditional infantry billets shrinking.</li>
          </ul>
        </aside>

        <p className="text-text-secondary">
          Your starting ASVAB scores set the foundation.{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">Check your scores now</Link> or{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">take a practice test</Link>{" "}
          to find out where you stand.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Common Questions About Marine Corps Ranks
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How many ranks are in the Marine Corps?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              29 total: 20 enlisted (including dual tracks at E-8/E-9 plus the Sergeant Major of the Marine Corps), 5 warrant officer, and 4 company-grade plus 7 field/general officer ranks. The exact count varies depending on whether you count the SMMC and dual-track positions separately, but 29 is standard.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What ASVAB score do I need to join the Marines?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Minimum AFQT of 31 with a high school diploma or 50 with a GED. But the AFQT only gets you in the door. Your USMC line scores (GT, CL, EL, MM, ST) determine which MOSs you qualify for, and your MOS shapes your entire career. A 31 AFQT with a low GT limits you to a handful of MOSs.{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">Use our calculator</Link> to see what your scores unlock.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is the difference between MSgt and 1stSgt?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Same pay grade (E-8), same base pay, different career tracks. Master Sergeants stay technical as MOS experts. First Sergeants move to command leadership as the senior enlisted advisor to a company or battery commander. Once you choose at E-8, you stay on that track through E-9 (MGySgt or SgtMaj).
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How long does it take to become a Sergeant?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Typically 4-5 years, but it depends on your composite score and your MOS cutting score. Some MOSs with low cutting scores promote Marines to Sergeant in 3 years. Others stay maxed out, and Marines wait 6+ years. Your rifle score, PFT, CFT, MCIs, and proficiency/conduct marks all factor in.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Can enlisted Marines become officers?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The primary path is MECEP (Marine Enlisted Commissioning Education Program). Requirements: AFQT 74+ or SAT 1000+ or ACT 22+, 12+ college credits, ages 20-26, and a 6-year post-commission obligation. You attend 10-week OCS, complete your bachelor&apos;s through NROTC at a civilian university (2.5 GPA minimum), then attend The Basic School for 6 months.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What rank do most Marines retire at?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              GySgt (E-7) or MSgt/1stSgt (E-8). Reaching E-9 (SgtMaj/MGySgt) typically requires 22-26+ years and is highly competitive. For officers, most retire at O-5 (Lieutenant Colonel) after 20 years.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What does &ldquo;Gunny&rdquo; mean?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Gunny is the nickname for Gunnery Sergeant (E-7). The rank dates to 1899, created for Marines responsible for a ship&apos;s naval guns. It is probably the most famous USMC rank nickname thanks to movies and real-life Gunnys who became public figures. Always respectful to use.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Do Marine Corps officers need a GT score to commission?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. There is no GT score requirement for officer commissioning. You need an AFQT of 74+, or an SAT of 1000+, or an ACT of 22+, plus a bachelor&apos;s degree. GT scores apply to enlisted MOS qualification only.
            </p>
          </div>
        </div>

        {/* ─── CTA ─── */}
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
