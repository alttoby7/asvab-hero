import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RankEquivalencyExplorer from "@/components/ranks/RankEquivalencyExplorer";
import StartingRankEstimator from "@/components/ranks/StartingRankEstimator";
import PromotionPathPlanner from "@/components/ranks/PromotionPathPlanner";
import BranchJobUnlockExplorer from "@/components/ranks/BranchJobUnlockExplorer";

export const metadata: Metadata = {
  title: "Army Ranks: Complete Guide to Every Grade (2026)",
  description:
    "All 29 Army ranks explained — enlisted E-1 to E-9, warrant officers W-1 to W-5, and officers O-1 to O-10 with 2026 pay and promotion timelines.",
  alternates: {
    canonical: "https://asvabhero.com/army-ranks",
  },
};

export default function ArmyRanksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Army Ranks: The Complete Guide to Every Grade from E-1 to General",
          description:
            "Complete guide to all 29 Army ranks — enlisted E-1 through E-9, warrant officers W-1 through W-5, and officers O-1 through O-10, with 2026 pay, promotion timelines, and ASVAB connections.",
          url: "https://asvabhero.com/army-ranks",
          author: { "@type": "Organization", name: "ASVAB Hero", url: "https://asvabhero.com" },
          publisher: { "@type": "Organization", name: "ASVAB Hero" },
          datePublished: "2026-03-17",
          dateModified: "2026-03-17",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What rank do you start at in the Army?",
              acceptedAnswer: { "@type": "Answer", text: "Most enlistees start at E-1 Private. With 3+ years of JROTC or 24+ college semester credits you can enter at E-3 Private First Class. A four-year college degree qualifies you for E-4 Specialist. Confirm your qualifying rank with a recruiter before signing any contract." },
            },
            {
              "@type": "Question",
              name: "What is the difference between a Specialist and a Corporal?",
              acceptedAnswer: { "@type": "Answer", text: "Both are E-4 with identical pay at $2,415/month. A Corporal is a noncommissioned officer with formal leadership responsibility over a fire team. A Specialist is a technical worker without NCO status. This is an Army-only distinction." },
            },
            {
              "@type": "Question",
              name: "What is the highest enlisted rank in the Army?",
              acceptedAnswer: { "@type": "Answer", text: "Sergeant Major of the Army (SMA). Only one person holds this rank at any given time. The current SMA is Michael R. Weimer, the 17th Sergeant Major of the Army, who assumed duties in August 2023." },
            },
            {
              "@type": "Question",
              name: "How long does it take to become a Sergeant in the Army?",
              acceptedAnswer: { "@type": "Answer", text: "Typically 3-4 years minimum. Requirements are 36 months time in service (waivable to 18), 8 months as an E-4, and completion of the Basic Leader Course (BLC). Actual timeline depends on your MOS promotion point cutoff scores." },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do you need to join the Army?",
              acceptedAnswer: { "@type": "Answer", text: "Minimum AFQT score of 31, the lowest of any active duty branch. Your 10 line scores (GT, ST, EL, CO, and others) determine which MOSs you qualify for. A GT score of 100+ opens most technical and leadership-track roles." },
            },
            {
              "@type": "Question",
              name: "What are Army warrant officers?",
              acceptedAnswer: { "@type": "Answer", text: "Warrant officers hold grades W-1 through W-5. They are technical specialists who outrank all enlisted soldiers but are outranked by all commissioned officers. The Army maintains roughly 25,000 warrant officers. Major specialties include aviation (helicopter pilots), intelligence, and cyber operations." },
            },
            {
              "@type": "Question",
              name: "How does Army rank compare to the Air Force?",
              acceptedAnswer: { "@type": "Answer", text: "Army NCO status begins at E-4 Corporal. Air Force NCO status starts at E-5. The Air Force abolished warrant officers in 1959. The Army minimum AFQT is 31 versus the Air Force minimum of 36. Pay at the same grade is identical across all branches." },
            },
            {
              "@type": "Question",
              name: "How do promotions work for senior Army NCOs?",
              acceptedAnswer: { "@type": "Answer", text: "E-7 through E-9 promotions are decided by centralized boards at Army Human Resources Command. A board panel evaluates your complete record: NCOER ratings, awards, ACFT scores, PME completion, and leadership positions held. Results take 4-6 months after the panel concludes." },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army Ranks: The Complete Guide to Every Grade from E-1 to General
        </h1>
        <p className="mt-4 text-text-secondary">
          The Army is the only branch where NCO status can begin at E-4, and it maintains the largest warrant officer corps in the US military at roughly 25,000. The Air Force has essentially none. If you are researching <strong>army ranks</strong> before talking to a recruiter, those two facts alone tell you the Army&apos;s structure is different from what you have seen in movies or video games.
        </p>
        <p className="text-text-secondary">
          The Army uses 29 ranks across three separate tracks: enlisted (E-1 to E-9), warrant officer (W-1 to W-5), and commissioned officer (O-1 to O-10). Each track has its own entry requirements, promotion system, and career ceiling.
        </p>
        <p className="text-text-secondary">
          This guide covers every rank, what it pays in 2026, how promotions actually work, and how your ASVAB scores connect to the career track you land in. If you are 17 to 24 and still deciding whether to enlist, this is where you figure out where you could start and where the ceiling is.
        </p>

        <RankEquivalencyExplorer />

        {/* ─── THREE TRACKS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Three Army Rank Tracks: Enlisted, Warrant Officer, and Commissioned Officer
        </h2>
        <p className="mt-4 text-text-secondary">
          Warrant officers occupy a unique hybrid position that exists in the Army but barely anywhere else. The Air Force abolished the rank in 1959 and only brought back an extremely limited version in 2022. The Army, by contrast, has about 25,000 of them flying helicopters, running intelligence operations, and leading cyber teams.
        </p>
        <p className="text-text-secondary">
          Three tracks, three entry points. Enlisted soldiers enter between E-1 and E-4 depending on qualifications like JROTC time, college credits, or a four-year degree. Warrant officers enter through the Warrant Officer Candidate School (WOCS) at Fort Novosel, Alabama, mostly from the enlisted ranks. Commissioned officers enter through West Point, ROTC, or Officer Candidate School (OCS), and nearly all need a college degree.
        </p>
        <p className="text-text-secondary">
          Within each track, authority flows upward. Across tracks, the hierarchy is absolute: all warrant officers outrank all enlisted personnel, including an E-9 Sergeant Major. All commissioned officers outrank all warrant officers.
        </p>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Track</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Entry Path</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Example Top Rank</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["Enlisted", "Basic training, E-1 to E-4 based on qualifications", "Sergeant Major of the Army (E-9)"],
                ["Warrant Officer", "WOCS (mostly from enlisted); WOFT for civilian pilots", "Chief Warrant Officer 5 (W-5)"],
                ["Commissioned Officer", "West Point, ROTC, OCS, Direct Commission", "General (O-10)"],
              ].map(([track, entry, top]) => (
                <tr key={track} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-semibold text-text-primary">{track}</td>
                  <td className="py-2 pr-4">{entry}</td>
                  <td className="py-2">{top}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">
          Enlisted soldiers make up about 82% of the Army. Commissioned officers account for roughly 18%. Warrant officers are the smallest group at about 5%.
        </p>
        <p className="text-text-secondary">
          If you are considering enlistment, the enlisted and warrant officer tracks are your primary paths. The commissioned officer track requires a college degree. Everything below starts with the enlisted ranks.
        </p>

        {/* ─── ENLISTED E-1 TO E-4 ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Enlisted Ranks E-1 Through E-4: Where Every Soldier Starts
        </h2>
        <p className="mt-4 text-text-secondary">
          Most people assume everyone starts at the bottom. What your JROTC instructor may never have told you: 3 years of JROTC gets you promoted before you ever set foot on a base.
        </p>
        <div className="my-4 space-y-2 text-text-secondary">
          <p><strong className="text-text-primary">E-1 Private (PVT).</strong> No insignia. Base pay: $1,833/month. Auto-advances to E-2 at 6 months TIS.</p>
          <p><strong className="text-text-primary">E-2 Private Second Class (PV2).</strong> One chevron. Base pay: $2,054/month. Auto-advances to E-3 at 12 months TIS and 4 months TIG. You can enter at E-2 with 1-2 years of JROTC, 20-24 college semester credits, Eagle Scout, or Girl Scout Gold Award.</p>
          <p><strong className="text-text-primary">E-3 Private First Class (PFC).</strong> One chevron with a rocker. Base pay: $2,161/month. You can enter at this rank with 3+ years of JROTC or 24+ semester hours of college. Higher pay from day one and a shorter timeline to Sergeant.</p>
          <p><strong className="text-text-primary">E-4 Specialist (SPC).</strong> Eagle device insignia. Base pay: $2,415/month. NOT an NCO. You can enter at E-4 with a four-year college degree.</p>
          <p><strong className="text-text-primary">E-4 Corporal (CPL).</strong> Two chevrons. Same pay as Specialist: $2,415/month. But a Corporal IS an NCO. This is unique to the Army. Corporals lead fire teams with formal authority to direct soldiers. The Air Force does not grant NCO status until E-5.</p>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Specialist vs. Corporal: Same Pay, Very Different Authority
        </h3>
        <p className="mt-2 text-text-secondary">
          Both are E-4 at $2,415/month. A Specialist is a technical worker. A Corporal is a noncommissioned officer who leads a fire team of 3-4 soldiers. The Army promotes soldiers to Corporal when a squad needs a designated team leader. Your commander can laterally appoint you from Specialist to Corporal.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Abbr.</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Insignia</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">2026 Base Pay</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">NCO?</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-1", "Private", "PVT", "No insignia", "$1,833", "No"],
                ["E-2", "Private Second Class", "PV2", "1 chevron", "$2,054", "No"],
                ["E-3", "Private First Class", "PFC", "1 chevron + rocker", "$2,161", "No"],
                ["E-4", "Specialist", "SPC", "Eagle device", "$2,415", "No"],
                ["E-4", "Corporal", "CPL", "2 chevrons", "$2,415", "Yes"],
              ].map(([grade, rank, abbr, insignia, pay, nco]) => (
                <tr key={grade + rank} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{grade}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{rank}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{abbr}</td>
                  <td className="py-2 pr-3 text-xs">{insignia}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{pay}</td>
                  <td className={`py-2 text-xs font-semibold ${nco === "Yes" ? "text-success" : "text-text-tertiary"}`}>{nco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">
          Confirm your qualifying rank with a recruiter before you sign. Starting at E-3 instead of E-1 means higher pay from day one and a faster path to Sergeant.
        </p>

        {/* ─── NCO E-5 TO E-9 ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army NCO and Senior NCO Ranks: E-5 Through E-9
        </h2>
        <p className="mt-4 text-text-secondary">
          Getting to Sergeant is mostly a matter of time and showing up. Getting to Sergeant First Class is a completely different game.
        </p>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Junior NCOs: E-5 and E-6</h3>
        <div className="mt-2 space-y-2 text-text-secondary">
          <p><strong className="text-text-primary">E-5 Sergeant (SGT).</strong> Three chevrons. First formal NCO rank. Leads a fire team of 3-5 soldiers. Requires Basic Leader Course (BLC), minimum 36 months TIS (waivable to 18 months). Base pay: $3,434 to $3,873.</p>
          <p><strong className="text-text-primary">E-6 Staff Sergeant (SSG).</strong> Three chevrons with one rocker. Leads a squad of 8-16 soldiers. Requires Advanced Leader Course (ALC), minimum 84 months TIS (7 years). Base pay: $3,959 to $4,526.</p>
        </div>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Senior NCOs: E-7 Through E-9</h3>
        <p className="mt-2 text-text-secondary">
          Centralized promotion boards enter the picture here. You no longer compete locally. A board at Army Human Resources Command evaluates your entire career file.
        </p>
        <div className="mt-2 space-y-2 text-text-secondary">
          <p><strong className="text-text-primary">E-7 Sergeant First Class (SFC).</strong> Three chevrons with two rockers. Platoon sergeant for 30-40 soldiers. Requires Senior Leader Course (SLC). Typical timeline: 10-13 years. Base pay: $5,396 to $6,305.</p>
          <p><strong className="text-text-primary">E-8 Master Sergeant (MSG).</strong> Three chevrons with three rockers. Battalion-level NCO. Requires Master Leader Course (MLC). Typical timeline: 15-17 years. Position variant: First Sergeant (1SG) adds a diamond to the insignia and serves as senior NCO for a company of up to 200 soldiers.</p>
          <p><strong className="text-text-primary">E-9 Sergeant Major (SGM).</strong> Three chevrons with three rockers and a star. Requires Sergeants Major Course (SMC). Typical timeline: 19-22 years. Base pay: $7,198 to $7,933. Position variant: Command Sergeant Major (CSM) adds a wreath and serves as senior enlisted adviser to a commander at battalion level and above.</p>
        </div>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">The Sergeant Major of the Army</h3>
        <p className="mt-2 text-text-secondary">
          Only one person holds this rank at any time. The current SMA is Michael R. Weimer, the 17th Sergeant Major of the Army, who assumed duties in August 2023. He enlisted in 1993, earned his Green Beret in 1996, and spent roughly 20 years in Special Mission Units. His awards include 6 Bronze Stars and 2 Purple Hearts. Pay: approximately $9,080/month.
        </p>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">The PME Ladder (Required, Not Optional)</h3>
        <div className="my-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Required PME</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["SGT (E-5)", "Basic Leader Course (BLC)"],
                ["SSG (E-6)", "Advanced Leader Course (ALC)"],
                ["SFC (E-7)", "Senior Leader Course (SLC)"],
                ["MSG/1SG (E-8)", "Master Leader Course (MLC)"],
                ["SGM/CSM/SMA (E-9)", "Sergeants Major Course (SMC)"],
              ].map(([rank, pme]) => (
                <tr key={rank} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono text-xs font-bold text-accent">{rank}</td>
                  <td className="py-2 text-xs">{pme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">
          The NCO path is best for soldiers who want hands-on leadership with progressively larger units. If you prefer deep technical specialization without the leadership track, the warrant officer section is next.
        </p>

        <StartingRankEstimator />

        {/* ─── WARRANT OFFICERS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Warrant Officer Ranks W-1 Through W-5: The Specialist Track
        </h2>
        <p className="mt-4 text-text-secondary">
          The Army has roughly 25,000 warrant officers, the largest warrant officer corps in the US military. The Air Force abolished the rank entirely in 1959. If you want to fly Army helicopters without a college degree, warrant officer is the path.
        </p>
        <p className="text-text-secondary">
          A warrant officer is a technical specialist who ranks above all enlisted soldiers but below all commissioned officers. Unlike commissioned officers who rotate through broad command assignments, warrant officers spend an entire career building deep expertise in one field.
        </p>
        <p className="text-text-secondary">
          Most warrant officers come from the enlisted ranks. Senior NCO status is typically required before applying to WOCS at Fort Novosel, Alabama. The major exception is the Warrant Officer Flight Training (WOFT) program, which allows civilian applicants with zero prior military service to become Army helicopter pilots.
        </p>
        <p className="text-text-secondary">
          Aviation is the biggest specialty. Army helicopter pilots are overwhelmingly warrant officers, not commissioned officers. Beyond aviation, warrant officers serve in intelligence, cyber operations, maintenance, signal, and civil affairs.
        </p>
        <p className="text-text-secondary">
          The chain of command is clear. W-1 through W-5 outrank all enlisted soldiers, including an E-9 Sergeant Major with 25 years of service. Every commissioned officer from O-1 through O-10 outranks every warrant officer. The Air Force reintroduced the rank in 2022 for extremely limited IT roles after a 60-year gap.
        </p>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Title</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Role</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["W-1", "Warrant Officer 1 (WO1)", "Junior technical leader", "$4,773 (4 yr TIS)"],
                ["W-2", "Chief Warrant Officer 2 (CW2)", "Technical specialist", "$5,439 (6 yr TIS)"],
                ["W-3", "Chief Warrant Officer 3 (CW3)", "Senior technical leader", "$6,714 (12 yr TIS)"],
                ["W-4", "Chief Warrant Officer 4 (CW4)", "Senior technical adviser", "$7,345 (16 yr TIS)"],
                ["W-5", "Chief Warrant Officer 5 (CW5)", "Master technical adviser", "$8,261 (20 yr TIS)"],
              ].map(([grade, title, role, pay]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{grade}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{title}</td>
                  <td className="py-2 pr-3 text-xs">{role}</td>
                  <td className="py-2 font-mono text-xs">{pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">
          If you want to spend a career mastering one technical domain rather than leading progressively larger units, the warrant officer track is purpose-built for that.
        </p>

        {/* ─── OFFICER RANKS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Officer Ranks O-1 Through O-10: Company, Field Grade, and Generals
        </h2>
        <p className="mt-4 text-text-secondary">
          Becoming an officer is a separate decision with entirely different requirements. Prior enlisted soldiers have their own pathway to a commission, and it comes with higher pay.
        </p>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Company Grade Officers: O-1 to O-3</h3>
        <div className="mt-2 space-y-2 text-text-secondary">
          <p><strong className="text-text-primary">O-1 Second Lieutenant (2LT).</strong> Single gold bar. Leads a platoon of 16-44 soldiers alongside an E-7 platoon sergeant. Base pay: $4,018/month.</p>
          <p><strong className="text-text-primary">O-2 First Lieutenant (1LT).</strong> Single silver bar. Promoted at 18-24 months. Serves as executive officer or senior platoon leader. Base pay: $4,629/month.</p>
          <p><strong className="text-text-primary">O-3 Captain (CPT).</strong> Two silver bars. Commands a company of 60-200 soldiers with a First Sergeant as NCO adviser. Often called the best command job in the Army. Base pay: $5,356/month at 4 years.</p>
        </div>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Field Grade Officers: O-4 to O-6</h3>
        <p className="mt-2 text-text-secondary">Competitive promotions begin here.</p>
        <div className="mt-2 space-y-2 text-text-secondary">
          <p><strong className="text-text-primary">O-4 Major (MAJ).</strong> Gold oak leaf. Staff officer at battalion and brigade level. Typical timeline: ~10 years. Base pay: $6,446/month.</p>
          <p><strong className="text-text-primary">O-5 Lieutenant Colonel (LTC).</strong> Silver oak leaf. Commands a battalion of 300-1,000 soldiers. Typical timeline: ~16 years. Base pay: $7,475/month.</p>
          <p><strong className="text-text-primary">O-6 Colonel (COL).</strong> Silver eagle. Commands a brigade of 1,500-3,200 soldiers. Fewer than 50% of Lieutenant Colonels make Colonel. Base pay: $12,611/month at 22 years.</p>
        </div>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">General Officers: O-7 to O-10</h3>
        <p className="mt-2 text-text-secondary">
          One to four silver stars. Require presidential nomination and Senate confirmation. Pay capped at $18,808/month. General of the Army (five stars, O-11) is a wartime-only rank last used in World War II.
        </p>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Four Commissioning Paths</h3>
        <ul className="my-3 space-y-1.5 text-text-secondary">
          {[
            ["West Point", "Free college, 5-year active duty commitment."],
            ["Army ROTC", "College-based, scholarship or non-scholarship, 4-year commitment."],
            ["OCS", "Open to civilians with degrees and enlisted soldiers. 12 weeks."],
            ["Direct Commission", "For doctors, lawyers, chaplains. Can enter at O-3 or O-4."],
          ].map(([name, desc]) => (
            <li key={name} className="flex gap-2">
              <span className="mt-1 shrink-0 text-accent">▸</span>
              <span><strong className="text-text-primary">{name}.</strong> {desc}</span>
            </li>
          ))}
        </ul>
        <p className="text-text-secondary">
          Enlisted soldiers who later commission receive O-1E/O-2E/O-3E pay, which is higher than standard officer pay at the same grade.
        </p>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Tier</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Grades</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">2026 Base Pay Range</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Commands</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["Company Grade", "O-1 to O-3", "$4,018–$5,356", "Platoon to Company"],
                ["Field Grade", "O-4 to O-6", "$6,446–$12,611", "Staff to Brigade"],
                ["General", "O-7 to O-10", "$12,848–$18,808 (cap)", "Division to Army"],
              ].map(([tier, grades, pay, cmd]) => (
                <tr key={tier} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-semibold text-text-primary">{tier}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{grades}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{pay}</td>
                  <td className="py-2 text-xs">{cmd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PromotionPathPlanner />

        {/* ─── PROMOTIONS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Army Promotions Work: From Automatic Advances to Centralized Boards
        </h2>
        <p className="mt-4 text-text-secondary">
          From E-1 to E-4, the Army promotes you on a schedule. From E-4 to E-6, it is a point game. From E-7 onward, a board decides if you make the cut.
        </p>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Phase 1: Automatic and Time-Based (E-1 to E-3)</h3>
        <p className="mt-2 text-text-secondary">No competition. Meet the time requirements and stay out of trouble.</p>
        <ul className="my-2 space-y-1 text-sm text-text-secondary">
          <li className="flex gap-2"><span className="text-accent">▸</span>E-1 to E-2: 6 months TIS.</li>
          <li className="flex gap-2"><span className="text-accent">▸</span>E-2 to E-3: 12 months TIS and 4 months TIG.</li>
        </ul>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Phase 2: Semi-Centralized with Promotion Points (E-4 to E-6)</h3>
        <p className="mt-2 text-text-secondary">
          Soldiers earn promotion points from ACFT scores, military awards, civilian education credits, and military education. Each month, the Army publishes cutoff scores per MOS. If your points meet or exceed the cutoff, you get promoted.
        </p>
        <ul className="my-2 space-y-1 text-sm text-text-secondary">
          <li className="flex gap-2"><span className="text-accent">▸</span>E-3 to E-4: 24 months TIS, 6 months TIG.</li>
          <li className="flex gap-2"><span className="text-accent">▸</span>E-4 to E-5: Minimum 36 months TIS (waivable to 18 months), BLC required.</li>
          <li className="flex gap-2"><span className="text-accent">▸</span>E-5 to E-6: Minimum 84 months TIS (7 years), ALC required.</li>
        </ul>
        <p className="text-text-secondary">
          Some MOSs have low cutoff scores because the Army needs more NCOs in that field. Others max out at 798 points and rarely drop. Your MOS choice directly affects how fast you promote.
        </p>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Phase 3: Centralized Board Selection (E-7 to E-9)</h3>
        <p className="mt-2 text-text-secondary">
          Army Human Resources Command convenes annual promotion boards. A board president (minimum O-7) leads a panel that evaluates your complete career file: NCOERs, military awards, PME completion, ACFT scores, and leadership billets held. Results take 4-6 months.
        </p>
        <ul className="my-2 space-y-1 text-sm text-text-secondary">
          <li className="flex gap-2"><span className="text-accent">▸</span>SFC (E-7): SLC required. Typical timeline: 10-13 years TIS.</li>
          <li className="flex gap-2"><span className="text-accent">▸</span>MSG/1SG (E-8): MLC required. Typical timeline: 15-17 years.</li>
          <li className="flex gap-2"><span className="text-accent">▸</span>SGM/CSM (E-9): SMC required. Typical timeline: 19-22 years.</li>
        </ul>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">Officer Promotions</h3>
        <p className="mt-2 text-text-secondary">
          O-1 to O-2 is automatic at 18 months. O-2 to O-3 is automatic at 4 years. O-4 and above require competitive board selection. General officer ranks require presidential nomination and Senate confirmation.
        </p>
        <p className="text-text-secondary">
          If you plan to make the Army a career, treat every NCOER, every award, and every PME course as points in a board packet you will need 10-15 years from now.
        </p>

        {/* ─── PAY ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2026 Army Pay by Rank: Base Pay for Every Grade
        </h2>
        <p className="mt-4 text-text-secondary">
          Military pay increased 3.8% for 2026. These figures are base pay only. On top of base pay, soldiers receive Basic Allowance for Housing (BAH) and Basic Allowance for Subsistence (BAS), both tax-free. BAH can add $1,500 to $3,000+ per month depending on location.
        </p>

        <h3 className="mt-4 font-display text-base font-bold text-text-primary">Enlisted Base Pay</h3>
        <div className="my-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">2026 Monthly Base Pay</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-1", "Private (PVT)", "$1,833"],
                ["E-2", "Private Second Class (PV2)", "$2,054"],
                ["E-3", "Private First Class (PFC)", "$2,161"],
                ["E-4", "Specialist / Corporal (SPC/CPL)", "$2,415"],
                ["E-5", "Sergeant (SGT)", "$3,434 (2 yr TIS)"],
                ["E-6", "Staff Sergeant (SSG)", "$3,959 (6 yr TIS)"],
                ["E-7", "Sergeant First Class (SFC)", "$5,396 (10 yr TIS)"],
                ["E-8", "Master Sergeant / First Sergeant (MSG/1SG)", "$6,468 (16 yr TIS)"],
                ["E-9", "Sergeant Major / CSM (SGM/CSM)", "$7,198–$7,933"],
                ["E-9", "Sergeant Major of the Army (SMA)", "~$9,080"],
              ].map(([grade, rank, pay]) => (
                <tr key={grade + rank} className="border-b border-navy-border/50">
                  <td className="py-1.5 pr-3 font-mono text-xs font-bold text-accent">{grade}</td>
                  <td className="py-1.5 pr-3 text-text-primary">{rank}</td>
                  <td className="py-1.5 font-mono text-xs">{pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-4 font-display text-base font-bold text-text-primary">Warrant Officer Base Pay (Selected)</h3>
        <div className="my-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">2026 Monthly Base Pay</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["W-1", "Warrant Officer 1 (WO1)", "$4,773 (4 yr TIS)"],
                ["W-3", "Chief Warrant Officer 3 (CW3)", "$6,714 (12 yr TIS)"],
                ["W-5", "Chief Warrant Officer 5 (CW5)", "$8,261 (20 yr TIS)"],
              ].map(([grade, rank, pay]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-1.5 pr-3 font-mono text-xs font-bold text-accent">{grade}</td>
                  <td className="py-1.5 pr-3 text-text-primary">{rank}</td>
                  <td className="py-1.5 font-mono text-xs">{pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-4 font-display text-base font-bold text-text-primary">Officer Base Pay (Selected)</h3>
        <div className="my-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">2026 Monthly Base Pay</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["O-1", "Second Lieutenant (2LT)", "$4,018"],
                ["O-3", "Captain (CPT)", "$5,356 (4 yr TIS)"],
                ["O-6", "Colonel (COL)", "$12,611 (22 yr TIS)"],
                ["O-10", "General (GEN)", "$18,808 (cap)"],
              ].map(([grade, rank, pay]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-1.5 pr-3 font-mono text-xs font-bold text-accent">{grade}</td>
                  <td className="py-1.5 pr-3 text-text-primary">{rank}</td>
                  <td className="py-1.5 font-mono text-xs">{pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">Run the full numbers with a recruiter before comparing to civilian salaries.</p>

        {/* ─── BRANCH COMPARISON ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Army Ranks Compare to Other Branches
        </h2>
        <p className="mt-4 text-text-secondary">
          The same pay grade (E-5) grants NCO status in the Army, Navy, and Marines. The Air Force does not grant NCO status until E-5 Staff Sergeant, but its NCO tier structure differs from the Army&apos;s. Structural differences like this matter when choosing a branch.
        </p>

        <div className="my-4 space-y-3">
          {[
            { label: "NCO Threshold", desc: "Army NCO status begins at E-4 Corporal (leadership-designated) or E-5 Sergeant for most soldiers. The Air Force and Space Force do not grant NCO status until E-5." },
            { label: "Warrant Officers", desc: "The Army maintains roughly 25,000 warrant officers across W-1 to W-5. The Air Force abolished the rank in 1959 and only reintroduced it in 2022 for extremely limited technical roles. The Navy and Marines maintain small programs in select specialties." },
            { label: "AFQT Minimums", desc: "The Army requires the lowest AFQT score of any active branch: 31. Marines require 32. Navy requires 35. Air Force and Space Force require 36. Coast Guard requires 40." },
            { label: "Job Selection", desc: "The Army offers 150+ MOS codes, the widest job selection of any branch." },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-navy p-4">
              <span className="font-mono text-sm font-bold text-accent">{item.label}</span>
              <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Army</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Air Force / SF</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Navy / CG</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Marines</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-4", "SPC / CPL", "Senior Airman", "PO3", "Corporal"],
                ["E-5", "Sergeant", "Staff Sergeant", "PO2", "Sergeant"],
                ["E-7", "Sergeant First Class", "Master Sergeant", "Chief PO", "Gunnery Sgt"],
                ["E-9", "Sergeant Major", "Chief Master Sgt", "Master Chief PO", "Sergeant Major"],
              ].map(([grade, army, af, navy, marines]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{grade}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{army}</td>
                  <td className="py-2 pr-3">{af}</td>
                  <td className="py-2 pr-3">{navy}</td>
                  <td className="py-2">{marines}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">
          The Army is the best fit if you want the widest job selection, warrant officer eligibility (especially aviation), or the lowest ASVAB threshold. Consider the Air Force if structured technical training with stronger civilian certification alignment matters more to you.
        </p>

        <BranchJobUnlockExplorer />

        {/* ─── ASVAB ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Scores and Army Rank: How Your Test Results Shape Your Career Track
        </h2>
        <p className="mt-4 text-text-secondary">
          Recruiters will tell you the AFQT minimum for the Army is 31. What they sometimes skip: the 10 line scores actually determine which jobs you qualify for. Some of the best careers require scores that take months of preparation to hit.
        </p>

        <div className="my-4 space-y-3">
          {[
            { label: "GT (General Technical) = AR + VE", desc: "The most broadly used score. Required for Special Forces, OCS applications, and most leadership-track roles. Many technical MOSs require GT 100+." },
            { label: "ST (Skilled Technical) = GS + MC + MK + VE", desc: "Intelligence, medical, and cyber jobs." },
            { label: "EL (Electronics) = AR + EI + GS + MK", desc: "Electronic repair and signal MOSs." },
            { label: "CO (Combat) = AR + AS + CS + MC", desc: "Combat arms including infantry, cavalry, and armor." },
            { label: "FA, GM, MM, OF, SC, CL", desc: "Each controls access to specific MOS families: field artillery, maintenance, operators, food, surveillance, and clerical." },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-navy p-4">
              <span className="font-mono text-sm font-bold text-accent">{item.label}</span>
              <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-6 font-display text-base font-bold text-text-primary">MOS Examples and Required Scores</h3>
        <div className="my-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">MOS</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Score Requirement</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["11B", "Infantry", "CO 87"],
                ["68W", "Combat Medic", "ST 101 + GT 107"],
                ["35F", "Intelligence Analyst", "ST 101"],
                ["17C", "Cyber Operations", "GT 110 + ST 112"],
              ].map(([mos, title, req]) => (
                <tr key={mos} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono text-xs font-bold text-accent">{mos}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{title}</td>
                  <td className="py-2 font-mono text-xs">{req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-secondary">
          Your MOS determines your promotion point cutoff scores and long-term career ceiling. High-demand, high-score MOSs often have lower promotion point cutoffs, which means faster advancement to SGT and SSG.
        </p>
        <p className="text-text-secondary">
          Treat the ASVAB as career-shaping, not just an entry ticket. A GT score of 110+ opens the Army&apos;s most career-valuable MOSs, from cyber operations to intelligence to Special Forces.{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">Study the subtests</Link> that feed your target line scores, not just the AFQT composite.
        </p>
        <p className="text-text-secondary">
          Before you sit down with a recruiter, take an{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">ASVAB practice test</Link>.
          {" "}Knowing your likely line scores tells you which conversation you are walking into. Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">free ASVAB score calculator</Link>{" "}
          to see which Army jobs your current scores would unlock.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions About Army Ranks
        </h2>
        <div className="mt-4 space-y-6">
          {[
            { q: "What rank do you start at in the Army?", a: "Most enlistees start at E-1 Private. If you have 3+ years of JROTC or 24+ college semester credits, you can enter at E-3 Private First Class. A four-year college degree qualifies you for E-4 Specialist. These advanced entry ranks mean higher pay from your first day. Confirm your qualifying rank with a recruiter before signing any contract." },
            { q: "What is the difference between a Specialist and a Corporal?", a: "Both are E-4 and earn identical pay at $2,415/month. The difference is authority. A Corporal is a noncommissioned officer with formal leadership responsibility over a fire team. A Specialist is a technical worker without NCO status. This is an Army-only distinction. Commanders laterally appoint Specialists to Corporal when a team leader position needs to be filled." },
            { q: "What is the highest enlisted rank in the Army?", a: "Sergeant Major of the Army (SMA). Only one person holds this rank at any given time. The current SMA is Michael R. Weimer, the 17th Sergeant Major of the Army, who assumed duties in August 2023. He is the senior enlisted adviser to the Army Chief of Staff and represents the interests of all enlisted soldiers." },
            { q: "How long does it take to become a Sergeant in the Army?", a: "Typically 3-4 years minimum. The requirements are 36 months time in service (waivable to 18 months), 8 months as an E-4, and completion of the Basic Leader Course (BLC). Your actual timeline depends heavily on your MOS promotion point cutoff scores. Some MOSs promote to SGT in under 3 years. Others take 5+." },
            { q: "What ASVAB score do you need to join the Army?", a: "Minimum AFQT score of 31, the lowest of any active duty branch. However, the AFQT only gets you in the door. Your 10 line scores (GT, ST, EL, CO, and others) determine which MOSs you qualify for. A GT score of 100+ opens most technical and leadership-track roles. Aim higher than the minimum." },
            { q: "What are Army warrant officers and how are they different from regular officers?", a: "Warrant officers hold grades W-1 through W-5. They are technical specialists who outrank all enlisted soldiers but are outranked by all commissioned officers. The Army maintains roughly 25,000 warrant officers. Major specialties include aviation (helicopter pilots make up the largest group), intelligence, and cyber operations. Unlike commissioned officers who rotate broadly, warrant officers build deep expertise in one field." },
            { q: "How does Army rank compare to the Air Force?", a: "Army NCO status begins at E-4 Corporal. Air Force NCO status starts at E-5. The Air Force abolished warrant officers in 1959 (very limited reintroduction in 2022). The Army minimum AFQT is 31 versus the Air Force minimum of 36. Pay at the same grade is identical across all branches." },
            { q: "How do promotions work for senior Army NCOs?", a: "E-7 through E-9 promotions are decided by centralized boards at Army Human Resources Command. A board panel evaluates your complete record: NCOER ratings, military awards, ACFT scores, professional military education completion, and leadership positions held. Board results take 4-6 months after the panel concludes. There is no point system at this level." },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-display text-base font-bold text-text-primary">{faq.q}</h3>
              <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which Army Jobs Your ASVAB Score Unlocks
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, line scores, and every Army MOS you qualify for.
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
