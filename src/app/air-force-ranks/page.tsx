import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RankEquivalencyExplorer from "@/components/ranks/RankEquivalencyExplorer";
import StartingRankEstimator from "@/components/ranks/StartingRankEstimator";
import PromotionPathPlanner from "@/components/ranks/PromotionPathPlanner";
import BranchJobUnlockExplorer from "@/components/ranks/BranchJobUnlockExplorer";

export const metadata: Metadata = {
  title: "Air Force Ranks: Complete Guide to Every Grade (2026)",
  description:
    "All 20 Air Force ranks explained — enlisted E-1 to E-9 and officer O-1 to O-10 with 2026 pay, insignia, and promotion timelines. See which jobs your ASVAB score unlocks.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-ranks",
  },
};

export default function AirForceRanksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Air Force Ranks: Every Grade from Airman Basic to General",
          description:
            "Complete guide to all 20 Air Force ranks — enlisted E-1 through E-9 and officer O-1 through O-10, with 2026 pay, insignia, promotion timelines, and ASVAB score connections.",
          url: "https://asvabhero.com/air-force-ranks",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
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
              name: "What rank do you start at in the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most enlistees start at E-1 (Airman Basic) at $2,407/mo. You can enter at E-2 with 2 years of JROTC, 20 college credits, or Eagle Scout/Girl Scout Gold Award. You can enter at E-3 with 3+ years of JROTC or 45 semester hours of college. E-3 is the maximum entry rank.",
              },
            },
            {
              "@type": "Question",
              name: "How long does it take to make Staff Sergeant in the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The minimum is 3 years total service plus 6 months as an E-4. In practice, the average is around 4 years total service. E-5 is the first competitive promotion, decided by the Weighted Airman Promotion System (WAPS). Recent selection rates have varied from 25% to 45% depending on career field and cycle.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force have warrant officers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The Air Force eliminated its warrant officer program in 1959 when E-8 and E-9 grades were created. The last active-duty Air Force warrant officer retired in 1980. As of 2026, no warrant officer grade exists in the active force.",
              },
            },
            {
              "@type": "Question",
              name: "What is the highest enlisted rank in the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "E-9 (Chief Master Sergeant) is the highest enlisted pay grade, with 2026 base pay starting at $6,910/mo. Above that is the Chief Master Sergeant of the Air Force (CMSAF), a special position held by one person at a time. The current CMSAF is David R. Wolfe (21st CMSAF), sworn in December 2025. Only 1% of the total enlisted force can hold E-9 at any time, by law.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do you need for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The minimum AFQT is 36 for high school diploma holders and 50 for GED holders. That minimum gets you in the door, but specific AFSCs require higher scores in the G, M, A, or E composites. Cyber Warfare Operations requires a 64 G score. Security Forces requires only a 33 G score.",
              },
            },
            {
              "@type": "Question",
              name: "What is a First Sergeant in the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A First Sergeant (First Shirt) is a special duty assignment, not a separate pay grade. Identifiable by a diamond on the rank insignia. Can be held by E-7, E-8, or E-9. They advise unit commanders on enlisted morale, welfare, and discipline. The designation reverts when leaving the assignment.",
              },
            },
            {
              "@type": "Question",
              name: "Can you become an Air Force officer after enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Three main programs: ASCP (Airman Scholarship and Commissioning Program) provides a full ROTC scholarship. SOAR offers up to $18,000/year. POC-ERP covers those within two years of completing a degree. All result in a commission as Second Lieutenant (O-1). The process typically takes 2-4 years from application to commissioning.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force Ranks: Every Grade from Airman Basic to General
        </h1>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "Total Ranks", value: "20" },
            { label: "Warrant Officers", value: "None" },
            { label: "Min AFQT", value: "36" },
            { label: "Active Duty", value: "330K" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 rounded-full border border-navy-border bg-navy-lighter px-4 py-1.5 text-sm">
              <span className="font-mono font-bold text-accent">{stat.value}</span>
              <span className="text-text-tertiary">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-text-secondary">
          The Air Force is the only branch of the U.S. military with no warrant officers. That single gap reshapes the entire <strong>air force ranks</strong> structure, pushing technical expertise into the enlisted tiers rather than a separate officer track. Every other branch has a middle layer between NCOs and commissioned officers. The Air Force doesn&apos;t.
        </p>
        <p className="text-text-secondary">
          This guide covers all 20 ranks: enlisted E-1 through E-9, officer O-1 through O-10, the Chief Master Sergeant of the Air Force, and how your ASVAB scores connect to which Air Force jobs you can actually get. Pay figures are 2026 base pay at the lowest applicable step.
        </p>
        <p className="text-text-secondary">
          Whether you&apos;re studying for the ASVAB, weighing enlisted vs. officer paths, or comparing the Air Force to other branches, this is the reference that replaces the five tabs you have open right now.
        </p>

        <div className="my-8 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — Compare pay grades across all 6 branches →</p>
          <RankEquivalencyExplorer />
        </div>

        {/* ─── ENLISTED RANKS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Enlisted Ranks: E-1 through E-9
        </h2>

        <p className="mt-4 text-text-secondary">
          Nine enlisted grades split into three tiers — each with a distinct purpose and a different relationship to leadership.
        </p>

        <div className="mt-4 mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-navy-border bg-navy-lighter/40 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Junior Enlisted</span>
            <p className="mt-0.5 font-mono text-sm font-bold text-text-primary">E-1 – E-4</p>
            <p className="mt-1 text-xs text-text-secondary">Learn the job. Execute tasks. Build technical competence.</p>
          </div>
          <div className="rounded-xl border border-accent/30 bg-accent-dim/30 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent/70">NCO</span>
            <p className="mt-0.5 font-mono text-sm font-bold text-text-primary">E-5 – E-6</p>
            <p className="mt-1 text-xs text-text-secondary">Supervise teams. Write performance reports. Own outcomes.</p>
          </div>
          <div className="rounded-xl border border-accent/50 bg-accent-dim/50 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">★ SNCO</span>
            <p className="mt-0.5 font-mono text-sm font-bold text-text-primary">E-7 – E-9</p>
            <p className="mt-1 text-xs text-text-secondary">Advise commanders. Shape policy. Represent the enlisted force.</p>
          </div>
        </div>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank Name</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Abbr.</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Insignia</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">2026 Base Pay</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Tier</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-1", "Airman Basic", "AB", "No insignia", "$2,407/mo", "Airman"],
                ["E-2", "Airman", "Amn", "1 chevron", "$2,698/mo", "Airman"],
                ["E-3", "Airman First Class", "A1C", "2 chevrons", "$2,837/mo", "Airman"],
                ["E-4", "Senior Airman", "SrA", "3 chevrons", "$3,142/mo", "Airman"],
                ["E-5", "Staff Sergeant", "SSgt", "3 chevrons + 1 rocker", "$3,343/mo", "NCO"],
                ["E-6", "Technical Sergeant", "TSgt", "3 chevrons + 2 rockers", "$3,401/mo", "NCO"],
                ["E-7", "Master Sergeant", "MSgt", "Chevrons + star", "$3,932/mo", "SNCO"],
                ["E-8", "Senior Master Sergeant", "SMSgt", "Chevrons + star", "$5,657/mo", "SNCO"],
                ["E-9", "Chief Master Sergeant", "CMSgt", "Chevrons + star + wreath", "$6,910/mo", "SNCO"],
              ].map(([grade, name, abbr, insignia, pay, tier]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{grade}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{name}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{abbr}</td>
                  <td className="py-2 pr-3">{insignia}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{pay}</td>
                  <td className="py-2">{tier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Airmen (E-1 through E-4)</strong> learn their Air Force Specialty Code, execute technical tasks, and follow instructions. They&apos;re the workforce. An E-1 Airman Basic has no rank insignia at all, which makes them easy to spot at BMT. Each chevron earned from E-2 through E-4 marks increased technical competence, not supervisory authority.
        </p>
        <p className="text-text-secondary">
          Airman (E-2) is the first rank with a chevron and typically arrives six months after entering service. Airman First Class (E-3) adds a second chevron and usually comes about 16 months in. Senior Airmen (E-4) are the most experienced in this tier and often serve as informal mentors, but they are not NCOs and hold no formal supervisory role.
        </p>
        <p className="text-text-secondary">
          One detail that trips people up: E-1 trainees at BMT actually start at $2,226/mo for the first four months, then jump to the full E-1 rate after completing basic training. That lower rate applies only during BMT and technical school.
        </p>
        <p className="text-text-secondary">
          <strong>NCOs (E-5 and E-6)</strong> supervise small teams, manage training, and enforce standards. They&apos;re the first line of leadership. Staff Sergeants write performance reports, counsel subordinates, and take responsibility for mission outcomes. Technical Sergeants manage larger teams, oversee multiple work centers, and serve as the primary technical experts within their sections.
        </p>
        <p className="text-text-secondary">
          Air Force NCO status begins at E-5, not E-4. In the Army and Marines, an E-4 Corporal is already an NCO. An Air Force Senior Airman at the same pay grade is not. That difference matters when comparing ranks across branches.
        </p>
        <p className="text-text-secondary">
          The jump from Airman tier to NCO tier isn&apos;t just a pay bump. It&apos;s a shift from &ldquo;do the work&rdquo; to &ldquo;own the work and the people doing it.&rdquo; Staff Sergeants write Enlisted Performance Reports on their subordinates that directly affect those airmen&apos;s careers. A bad EPR from an SSgt can delay someone&apos;s promotion by years.
        </p>
        <p className="text-text-secondary">
          <strong>SNCOs (E-7 through E-9)</strong> advise commanders, shape policy at the squadron and wing level, and mentor the NCOs below them. Master Sergeants typically serve as section chiefs or flight chiefs, managing 20-50 airmen. Senior Master Sergeants fill superintendent roles overseeing entire squadrons. Chief Master Sergeants serve as the senior enlisted advisor to wing commanders and above, influencing decisions that affect thousands of airmen.
        </p>
        <p className="text-text-secondary">
          The pay jump from E-7 to E-8 ($3,932 to $5,657) is the largest single increase in the enlisted structure, reflecting both the responsibility and the extreme selectivity of making Senior Master Sergeant.
        </p>

        <div className="my-8 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — Estimate your starting rank based on your background →</p>
          <StartingRankEstimator />
        </div>

        {/* ─── STARTING RANK ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Your Starting Rank Actually Depends On
        </h2>

        <p className="mt-4 text-text-secondary">
          Most people enter at E-1. You might not have to.
        </p>
        <p className="text-text-secondary">
          The Air Force awards advanced enlistment rank for education and youth program experience. The credits don&apos;t stack. You get the highest one that applies.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Credit Source</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Entry Rank</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Monthly Pay Gain vs E-1</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["2 years JROTC", "E-2", "+$291/mo"],
                ["Eagle Scout or Girl Scout Gold Award", "E-2", "+$291/mo"],
                ["20 college credits", "E-2", "+$291/mo"],
                ["3+ years JROTC", "E-3", "+$430/mo"],
                ["45 semester hours of college", "E-3", "+$430/mo"],
              ].map(([source, rank, gain]) => (
                <tr key={source} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4">{source}</td>
                  <td className="py-2 pr-4 font-mono font-bold text-accent">{rank}</td>
                  <td className="py-2 font-mono text-success text-xs">{gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          E-3 is the maximum entry rank for enlisted members. No combination of credits gets you to E-4 at enlistment. Pay at the advanced rank starts day one of active duty, not after BMT graduation. Over a four-year enlistment, entering at E-3 instead of E-1 adds roughly $5,000 to your total earnings before your first promotion even hits.
        </p>
        <p className="text-text-secondary">
          Civil Air Patrol (CAP) membership can also qualify you for advanced rank. CAP&apos;s Billy Mitchell Award earns E-2, and the Earhart Award earns E-3. These are less well-known than JROTC credit but equally valid.
        </p>
        <p className="text-text-secondary">
          Once you&apos;re in, the next milestone worth knowing is BTZ (Below-the-Zone). Top-performing Senior Airmen (E-4) can be selected for promotion to E-5 up to six months ahead of schedule. About 15% of eligible airmen are recommended by their unit to compete at the BTZ board. The actual selection rate is much lower. Getting BTZ isn&apos;t just about early rank. It signals to future promotion boards that you were ahead of your peers from the start, and that early advantage compounds through every subsequent promotion cycle.
        </p>
        <p className="text-text-secondary">
          If you have credits or JROTC experience, bring original documentation to your recruiter before you sign anything. Advanced rank must be locked into your enlistment contract. Verbal promises don&apos;t count.
        </p>

        {/* ─── PROMOTIONS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Air Force Enlisted Promotions Work
        </h2>

        <p className="mt-4 text-text-secondary">
          E-1 through E-4 promotions are mostly automatic. E-5 onward, you compete. That&apos;s the dividing line in every Air Force enlisted career.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">TIS Req.</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">TIG Req.</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Competitive?</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Avg Time</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-2", "6 months", "—", "No", "6 months"],
                ["E-3", "—", "10 months TIG", "No", "10 months"],
                ["E-4", "36mo TIS + 20mo TIG, or 28mo TIG", "—", "No", "~18-24 months"],
                ["E-5", "3 years TIS", "6 months TIG", "YES (WAPS)", "~4 years total"],
                ["E-6", "5 years TIS", "23 months TIG", "YES (WAPS)", "~12 years"],
                ["E-7", "8 years TIS", "24 months TIG", "YES (board)", "~17 years"],
                ["E-8", "11 years TIS", "20 months TIG", "YES (board, 2% cap)", "~22 years"],
                ["E-9", "14 years TIS", "21 months TIG", "YES (board, 1% cap)", "~26 years"],
              ].map(([rank, tis, tig, comp, avg]) => (
                <tr key={rank} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{rank}</td>
                  <td className="py-2 pr-3 text-xs">{tis}</td>
                  <td className="py-2 pr-3 text-xs">{tig}</td>
                  <td className={`py-2 pr-3 text-xs font-semibold ${comp.startsWith("YES") ? "text-amber-400" : "text-success"}`}>{comp}</td>
                  <td className="py-2 text-xs">{avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          TIS = Time in Service. TIG = Time in Grade. The first three promotions happen almost automatically if you stay out of trouble and meet time requirements. E-4 has two paths: either 36 months of total service plus 20 months in grade, or 28 months in grade regardless of total service. Either way, the promotion is non-competitive.
        </p>
        <p className="text-text-secondary">
          E-5 changes everything. The Weighted Airman Promotion System (WAPS) scores you across multiple factors: the Promotion Fitness Examination (PFE), Specialty Knowledge Test (SKT), decorations, time in service, time in grade, and Enlisted Performance Reports (EPRs). Your total WAPS score is stacked against everyone else testing for the same grade in your AFSC. Points expire and reset each cycle, so last year&apos;s score doesn&apos;t carry over. You test fresh every year you&apos;re eligible.
        </p>
        <p className="text-text-secondary">
          The PFE covers Air Force history, leadership doctrine, and military knowledge. The SKT covers your specific career field. Each exam is worth up to 100 points. Combined with decoration points, TIS/TIG points, and EPR ratings, the maximum possible WAPS score varies by cycle but typically exceeds 460 points.
        </p>
        <p className="text-text-secondary">
          At E-7 and above, promotion shifts from WAPS testing to a central evaluation board. Board members review your entire record: EPRs, decorations, education, duty history, and breadth of experience. There&apos;s no written test. Your career speaks for itself, or it doesn&apos;t.
        </p>
        <p className="text-text-secondary">
          The numbers tell the story. The E-6 selection rate dropped to 16% in a recent cycle, down from 27% a few years prior. Being eligible does not mean being selected. Most eligible TSgts will not make MSgt.
        </p>
        <p className="text-text-secondary">
          At the top, Congress mandates hard caps. Only 2% of the total enlisted force can hold E-8 at any given time. Only 1% can hold E-9. These aren&apos;t guidelines. They&apos;re law. Even exceptional performers get passed over simply because there&apos;s no room. A TSgt who scores in the top 10% of WAPS can still miss E-7 if the quota for their AFSC is filled. The senior enlisted ranks are designed to be small by statute, not just by selection board preference.
        </p>

        {/* ─── CMSAF ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The CMSAF: One Rank Above All Other Enlisted
        </h2>

        <p className="mt-4 text-text-secondary">
          Chief Master Sergeant of the Air Force isn&apos;t a pay grade. It&apos;s a position. There is exactly one at any time.
        </p>
        <p className="text-text-secondary">
          The CMSAF advises the Air Force Chief of Staff and the Secretary of the Air Force on everything affecting the enlisted force: readiness, morale, welfare, professional development, and utilization. They travel to bases worldwide, represent enlisted airmen to senior leadership, and testify before Congress. The role carries the same E-9 pay grade as any other Chief Master Sergeant, but the authority and visibility are unmatched in the enlisted structure.
        </p>
        <p className="text-text-secondary">
          The current CMSAF is David R. Wolfe, the 21st person to hold the position. He was sworn in on December 8, 2025. Wolfe is a former Security Forces airman who replaced David Flosi, who stepped down after his wife died suddenly in October 2025.
        </p>
        <p className="text-text-secondary">
          The position was created in 1967. The first holder was CMSgt Paul Airey, a World War II and Korean War veteran who spent time as a prisoner of war. Since then, each CMSAF has served roughly 3-4 years, shaping enlisted policy during their tenure. The role has no fixed term, but tradition and turnover aligned with Chief of Staff changes have established that cycle.
        </p>

        <aside className="my-6 rounded-xl border-l-4 border-accent bg-navy-lighter px-5 py-4">
          <p className="text-sm font-semibold text-text-primary">Current CMSAF: David R. Wolfe (21st)</p>
          <p className="mt-1 text-sm text-text-secondary">Sworn in December 8, 2025. Exactly one person holds this position at any time — same E-9 pay grade, unmatched authority in the enlisted force.</p>
        </aside>

        {/* ─── OFFICER RANKS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Officer Ranks: O-1 through O-10
        </h2>

        <p className="mt-4 text-text-secondary">
          Ten officer grades in three tiers. Company grade officers (O-1 through O-3) lead flights and small teams. Field grade officers (O-4 through O-6) run squadrons, groups, and wings. General officers (O-7 through O-10) run major commands and the Air Force itself.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Rank Name</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Abbr.</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Insignia</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">2026 Base Pay</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Commands</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["O-1", "Second Lieutenant", "2d Lt", "1 gold bar", "$4,150/mo", "Small teams, learning"],
                ["O-2", "First Lieutenant", "1st Lt", "1 silver bar", "$4,782/mo", "Flight leadership"],
                ["O-3", "Captain", "Capt", "2 silver bars", "$5,535/mo", "Flight command"],
                ["O-4", "Major", "Maj", "Gold oak leaf", "$6,294/mo", "Squadron staff"],
                ["O-5", "Lieutenant Colonel", "Lt Col", "Silver oak leaf", "$7,295/mo", "Squadron command"],
                ["O-6", "Colonel", "Col", "Silver eagle", "$8,751/mo", "Wing/group, 1,000-4,000 airmen"],
                ["O-7", "Brigadier General", "Brig Gen", "1 silver star", "$11,540/mo", "Major wing/base"],
                ["O-8", "Major General", "Maj Gen", "2 silver stars", "$13,888/mo", "~10,000 airmen"],
                ["O-9", "Lieutenant General", "Lt Gen", "3 silver stars", "$18,999/mo (capped)", "Major commands"],
                ["O-10", "General", "Gen", "4 silver stars", "$18,999/mo (capped)", "Pentagon, top commands"],
              ].map(([grade, name, abbr, insignia, pay, cmd]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{grade}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{name}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{abbr}</td>
                  <td className="py-2 pr-3 text-xs">{insignia}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{pay}</td>
                  <td className="py-2 text-xs">{cmd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          There is technically a five-star rank: General of the Air Force. It&apos;s a wartime-only grade, granted exactly once to Gen. Henry &ldquo;Hap&rdquo; Arnold in 1949. No one holds it today, and no one will unless Congress authorizes it during a major conflict.
        </p>
        <p className="text-text-secondary">
          Officers enter through three main commissioning sources: the Air Force Academy (roughly 1,000 graduates per year), Air Force ROTC (roughly 2,000 per year), and Officer Training School (variable, typically 500-1,500 per year). Each source produces the same rank, Second Lieutenant (O-1), but career trajectory and assignment competitiveness can vary by commissioning source in certain career fields.
        </p>
        <p className="text-text-secondary">
          The first two promotions are nearly automatic. O-1 to O-2 happens at roughly two years. O-2 to O-3 at roughly four years. After that, selection boards decide. The O-4 (Major) board is the first real gate, with selection rates typically between 80-90%. That sounds high until you realize 10-20% of officers are told their career has a ceiling.
        </p>
        <p className="text-text-secondary">
          O-5 (Lieutenant Colonel) selection rates drop further, typically 60-70%. Many capable officers retire as Majors or Lieutenant Colonels, often with 20+ years of service and a full pension. That&apos;s not failure. It&apos;s the normal career arc for the majority of commissioned officers.
        </p>
        <p className="text-text-secondary">
          Making Colonel requires both strong performance and the right assignments, including command at the squadron level and joint duty experience. Making General requires all of that plus timing, senior sponsorship, and strategic visibility. There are roughly 300 general officers across the entire Air Force, out of approximately 65,000 active-duty officers. The math alone shows how selective those grades are.
        </p>
        <p className="text-text-secondary">
          Pay at O-9 and O-10 is capped at Level II of the Executive Schedule ($18,999/mo in 2026). A four-star General earns the same base pay as a three-star Lieutenant General. The difference at that level is responsibility, not compensation.
        </p>
        <p className="text-text-secondary">
          One critical distinction: officers do NOT take the ASVAB. They take the Air Force Officer Qualifying Test (AFOQT). If someone tells you they need a certain ASVAB score to become an Air Force officer, they&apos;re confused about how commissioning works.
        </p>

        <div className="my-8 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — Map your promotion timeline from enlistment to retirement →</p>
          <PromotionPathPlanner />
        </div>

        {/* ─── ENLISTED VS OFFICER ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Enlisted vs Officer: Which Path Is Right for You
        </h2>

        <p className="mt-4 text-text-secondary">
          Every recruiter will tell you both paths are great. Here&apos;s what they won&apos;t break down for you.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Factor</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Enlisted</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Officer</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["Education required", "High school diploma", "Bachelor's degree"],
                ["Test required", "ASVAB (AFQT 36+ for HS diploma)", "AFOQT (no ASVAB)"],
                ["Entry pay (2026)", "$2,407/mo (E-1)", "$4,150/mo (O-1)"],
                ["When career starts", "Within months", "After 4+ years of college"],
                ["Who you lead", "Nobody at first; peers/subordinates as NCO", "Small team from day one"],
                ["Specialty focus", "Technical, hands-on, specific AFSC", "Planning, command, management"],
                ["Path to other track", "ASCP, SOAR, OTS (competitive)", "N/A"],
              ].map(([factor, enlisted, officer]) => (
                <tr key={factor} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-semibold text-text-primary">{factor}</td>
                  <td className="py-2 pr-4">{enlisted}</td>
                  <td className="py-2">{officer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          If you don&apos;t have a degree and want to start serving now, enlistment is the path. You&apos;ll earn, learn a trade, and build experience while your peers are still in school. If you already have a bachelor&apos;s degree and want command authority from the start, commissioning pays more and puts you in a leadership role immediately.
        </p>
        <p className="text-text-secondary">
          If you&apos;re 17-20 and unsure, consider enlisting for two to three years, then evaluating whether a commissioning program makes sense. That approach gives you real-world experience, a security clearance, and GI Bill benefits that pay for the degree you&apos;d need to commission.
        </p>
        <p className="text-text-secondary">
          Enlisted members can become officers. The main programs:
        </p>
        <ul className="my-3 space-y-2 text-text-secondary">
          <li className="flex gap-2">
            <span className="mt-1 shrink-0 text-accent">▸</span>
            <span><strong className="text-text-primary">ASCP</strong> (Airman Scholarship and Commissioning Program): Full ROTC scholarship covering tuition, fees, and a monthly stipend. Highly competitive, typically fewer than 100 slots per year.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 shrink-0 text-accent">▸</span>
            <span><strong className="text-text-primary">SOAR</strong> (Scholarships for Outstanding Airmen to ROTC): Up to $18,000 per year for tuition. Requires commander recommendation and a strong enlisted record.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 shrink-0 text-accent">▸</span>
            <span><strong className="text-text-primary">POC-ERP</strong> (Professional Officer Course Early Release Program): For those within two years of completing a degree. Allows early separation to finish school and commission through ROTC.</span>
          </li>
        </ul>
        <p className="text-text-secondary">
          All three result in a commission as Second Lieutenant (O-1). All require separating from active duty to attend college or finish a degree. The transition typically takes 2-4 years from application to commissioning.
        </p>
        <p className="text-text-secondary">
          One factor people overlook: job control. Enlisted members select a specific AFSC before signing their contract (or at least a guaranteed aptitude area). Officers are assigned their career field after commissioning, based on the needs of the Air Force and their class ranking. You might want to fly but get assigned logistics. Enlisted members have more say in what they do. Officers have more say in how it gets done.
        </p>
        <p className="text-text-secondary">
          The honest answer nobody gives you at MEPS: the enlisted path builds depth in a specific trade. The officer path builds breadth across leadership and management. Neither is better. They solve different problems for different people at different points in life.
        </p>

        {/* ─── WARRANT OFFICERS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why the Air Force Has No Warrant Officers
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army, Navy, and Marine Corps all have warrant officers. The Air Force doesn&apos;t.
        </p>
        <p className="text-text-secondary">
          In 1959, Congress created the E-8 and E-9 pay grades across all branches. Air Force leadership looked at these new senior enlisted grades and concluded they covered the same technical expertise that warrant officers were supposed to fill. Rather than maintain a parallel track, the Air Force ended its warrant officer program that same year.
        </p>
        <p className="text-text-secondary">
          The transition took two decades. The last active-duty Air Force warrant officer, CWO4 James H. Long, retired in 1980. Since then, the Air Force has operated without that middle tier entirely.
        </p>
        <p className="text-text-secondary">
          What this means practically: technical expertise is rewarded within the SNCO track (E-7 through E-9) rather than a separate warrant track. A highly skilled avionics specialist or cyber operator becomes a Chief Master Sergeant, not a Chief Warrant Officer. The technical path and the leadership path are the same path.
        </p>
        <p className="text-text-secondary">
          In April 2024, the Secretary of the Air Force announced a study into potentially reintroducing warrant officers to fill critical technical gaps, particularly in cyber and IT. As of 2026, no warrant officer grade exists in the active force, and the study has not produced a formal recommendation.
        </p>

        <aside className="my-6 rounded-xl border-l-4 border-accent bg-navy-lighter px-5 py-4">
          <p className="text-sm font-semibold text-text-primary">Air Force Warrant Officers: A Brief History</p>
          <p className="mt-1 text-sm text-text-secondary">Program abolished 1959 when E-8/E-9 grades were created. Last active-duty warrant officer (CWO4 James H. Long) retired 1980. As of 2026, no warrant officer grade exists in the Air Force.</p>
        </aside>

        {/* ─── ASVAB SCORES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Scores and Air Force Jobs: What the Connection Actually Is
        </h2>

        <p className="mt-4 text-text-secondary">
          Your ASVAB score doesn&apos;t determine your rank. It determines which jobs you can even be offered. That shapes everything else.
        </p>
        <p className="text-text-secondary">
          The Air Force requires a minimum AFQT score of 36 for applicants with a high school diploma and 50 for GED holders. That 36 minimum is the second-highest of any branch. Only the Coast Guard, at 40, sets the bar higher.
        </p>
        <p className="text-text-secondary">
          But the AFQT is just the entry ticket. What actually matters for job qualification are the four MAGE composite scores, each built from different ASVAB subtests:
        </p>

        <div className="my-4 space-y-3">
          {[
            { label: "G (General)", desc: "Verbal Expression + Arithmetic Reasoning. Required for most administrative, intel, and analyst AFSCs. This is the composite that gates the largest number of career fields." },
            { label: "M (Mechanical)", desc: "Mechanical Comprehension + General Science + 2x Auto/Shop. Required for aircraft maintenance, munitions, crew chief, and similar hands-on roles." },
            { label: "A (Administrative)", desc: "Numerical Operations + Coding Speed + Verbal Expression. Used for logistics, finance, personnel, and administrative career fields." },
            { label: "E (Electrical)", desc: "Arithmetic Reasoning + Mathematics Knowledge + Electronics Information + General Science. Required for avionics, cyber, communications, and electronics maintenance." },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-navy p-4">
              <span className="font-mono text-sm font-bold text-accent">{item.label}</span>
              <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-text-secondary">Here&apos;s what minimum composite scores look like for popular AFSCs:</p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">AFSC</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Min Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["3P0X1", "Security Forces", "G", "33"],
                ["1T2X1", "Pararescue", "G", "44"],
                ["1C1X1", "Air Traffic Control", "G", "55"],
                ["1B4X1", "Cyber Warfare Operations", "G", "64"],
                ["2A3X3", "Tactical Aircraft Maintenance", "M", "47"],
                ["3D1X2", "Cyber Transport Systems", "E", "60"],
              ].map(([afsc, title, comp, min]) => (
                <tr key={afsc} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono text-xs text-accent">{afsc}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary">{title}</td>
                  <td className="py-2 pr-3 font-mono font-bold">{comp}</td>
                  <td className="py-2 font-mono font-bold text-accent">{min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Notice the pattern: jobs with strong civilian career equivalents (cyber, air traffic control) require higher scores. Security Forces, one of the most common AFSCs, has the lowest threshold. Scoring in the 70s or above on your composites opens career fields that translate to six-figure civilian salaries after service.
        </p>
        <p className="text-text-secondary">
          A score of 36 AFQT gets you in, but it may limit you to a handful of available AFSCs at your recruiter&apos;s office. The Air Force assigns jobs based on both your qualifications and current manning needs. Higher scores mean more leverage in job negotiation at MEPS.
        </p>
        <p className="text-text-secondary">
          Officers do NOT take the ASVAB. They take the AFOQT. If you&apos;re pursuing a commission, ASVAB scores are irrelevant to your path.
        </p>
        <p className="text-text-secondary">
          Use the ASVAB score calculator at{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            asvabhero.com/calculator
          </Link>{" "}
          to see which Air Force jobs your current or projected scores would qualify you for.
        </p>

        {/* ─── ABBREVIATIONS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Rank Abbreviations: Quick Reference
        </h2>

        <p className="mt-4 text-text-secondary">
          Every branch has its own abbreviation conventions, and getting them wrong on official documents causes real problems. The Air Force uses these abbreviations across all correspondence, evaluations, performance reports, and orders.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Rank</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbreviation</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-1", "Airman Basic", "AB", ""],
                ["E-2", "Airman", "Amn", ""],
                ["E-3", "Airman First Class", "A1C", ""],
                ["E-4", "Senior Airman", "SrA", ""],
                ["E-5", "Staff Sergeant", "SSgt", ""],
                ["E-6", "Technical Sergeant", "TSgt", ""],
                ["E-7", "Master Sergeant", "MSgt", ""],
                ["E-8", "Senior Master Sergeant", "SMSgt", ""],
                ["E-9", "Chief Master Sergeant", "CMSgt", ""],
                ["Special", "First Sergeant", "1st Sgt", "Also \"First Shirt\"; diamond on chevron"],
                ["Special", "CMSAF", "CMSAF", "One per Air Force"],
                ["O-1", "Second Lieutenant", "2d Lt", "Note: \"2d\" not \"2nd\""],
                ["O-2", "First Lieutenant", "1st Lt", ""],
                ["O-3", "Captain", "Capt", ""],
                ["O-4", "Major", "Maj", ""],
                ["O-5", "Lieutenant Colonel", "Lt Col", "Pronounced \"ell-tee colonel\""],
                ["O-6", "Colonel", "Col", ""],
                ["O-7", "Brigadier General", "Brig Gen", ""],
                ["O-8", "Major General", "Maj Gen", ""],
                ["O-9", "Lieutenant General", "Lt Gen", ""],
                ["O-10", "General", "Gen", ""],
              ].map(([grade, rank, abbr, notes]) => (
                <tr key={grade + rank} className="border-b border-navy-border/50">
                  <td className="py-1.5 pr-4 font-mono text-xs font-bold text-accent">{grade}</td>
                  <td className="py-1.5 pr-4 text-text-primary">{rank}</td>
                  <td className="py-1.5 pr-4 font-mono text-xs">{abbr}</td>
                  <td className="py-1.5 text-xs text-text-tertiary">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          A few common sources of confusion. The &ldquo;2d&rdquo; in &ldquo;2d Lt&rdquo; is not a typo. The Air Force officially uses &ldquo;2d&rdquo; rather than &ldquo;2nd.&rdquo; First Sergeants are a special duty assignment, not a separate rank. They can be E-7, E-8, or E-9, identified by a diamond device centered in their rank insignia. The designation reverts when they leave the assignment.
        </p>
        <p className="text-text-secondary">
          The Space Force, despite sharing a Department with the Air Force, uses entirely different rank titles and abbreviations. Enlisted Space Force members are Specialists, Sergeants, and Guardians. Their abbreviations (Spc1, Spc2, etc.) do not overlap with Air Force abbreviations. If you see those titles, that&apos;s Space Force, not Air Force. The two branches share a Department of the Air Force but maintain separate rank structures, promotion systems, and career fields.
        </p>

        {/* ─── BRANCH COMPARISON ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Air Force Ranks Compare to Other Branches
        </h2>

        <p className="mt-4 text-text-secondary">
          All five branches use the same pay grade system. An E-5 in the Air Force earns the same base pay as an E-5 in the Army. The rank names are completely different.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-lighter/50">
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Pay Grade</th>
                <th className="pb-2 pr-3 text-left font-semibold text-accent/80">Air Force</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Army</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Navy</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Marines</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ["E-1", "Airman Basic", "Private", "Seaman Recruit", "Private"],
                ["E-4", "Senior Airman", "Specialist/Corporal", "Petty Officer 3rd Class", "Corporal"],
                ["E-5", "Staff Sergeant", "Sergeant", "Petty Officer 2nd Class", "Sergeant"],
                ["E-7", "Master Sergeant", "Sergeant First Class", "Chief Petty Officer", "Gunnery Sergeant"],
                ["E-9", "Chief Master Sergeant", "Sergeant Major", "Master Chief", "Sergeant Major"],
              ].map(([grade, af, army, navy, marines]) => (
                <tr key={grade} className="border-b border-navy-border/50">
                  <td className="py-2 pr-3 font-mono font-bold text-accent">{grade}</td>
                  <td className="py-2 pr-3 font-semibold text-text-primary bg-accent-dim/20">{af}</td>
                  <td className="py-2 pr-3">{army}</td>
                  <td className="py-2 pr-3">{navy}</td>
                  <td className="py-2">{marines}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The biggest structural difference is where NCO authority begins. In the Air Force, NCO status starts at E-5 (Staff Sergeant). In the Army and Marines, NCO status starts at E-4 (Corporal). An Air Force Senior Airman at E-4 is not an NCO and does not hold supervisory authority. An Army Corporal at the same pay grade does. This matters if you&apos;re comparing career timelines across branches. Air Force members wait longer before they&apos;re formally in a leadership role.
        </p>
        <p className="text-text-secondary">
          The other major difference: warrant officers exist in the Army (W-1 through W-5), Navy (W-2 through W-5), and Marines (W-2 through W-5). They do not exist in the Air Force or Space Force. The Army alone has over 25,000 warrant officers filling technical roles that the Air Force handles through its SNCO track. If you&apos;re a technical specialist who wants a warrant officer career, the Air Force isn&apos;t the branch for that path.
        </p>
        <p className="text-text-secondary">
          Base pay is identical across branches at the same pay grade and years of service. An Air Force E-7 with 10 years makes exactly what a Marine E-7 with 10 years makes. The differences show up in special duty pay, bonuses, and allowances tied to specific assignments.
        </p>

        <div className="my-8 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — See which jobs your ASVAB score unlocks across every branch →</p>
          <BranchJobUnlockExplorer />
        </div>

        {/* ─── CROSS-LINKS ─── */}
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-navy-border bg-navy-light px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Also explore:</span>
          <Link href="/army-ranks" className="rounded-md border border-navy-border px-3 py-1 text-xs font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-accent no-underline">Army Ranks</Link>
          <Link href="/navy-ranks" className="rounded-md border border-navy-border px-3 py-1 text-xs font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-accent no-underline">Navy Ranks</Link>
        </div>

        {/* ─── PAY ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Rank and Pay: What You Actually Take Home
        </h2>

        <p className="mt-4 text-text-secondary">
          An E-4 earning $3,142 per month in base pay might actually take home the equivalent of $55,000 or more per year when you factor in what the military covers that civilians pay out of pocket.
        </p>
        <p className="text-text-secondary">
          Base pay is just the starting point. On top of it, you receive Basic Allowance for Housing (BAH), which is set by your duty station zip code and dependent status. BAH ranges from roughly $1,200 to $2,800+ per month depending on where you&apos;re stationed. You also receive Basic Allowance for Subsistence (BAS) at approximately $519 per month for enlisted members. Both BAH and BAS are tax-free. Add free healthcare through TRICARE, commissary and exchange access, and tax-free pay in combat zones, and the total compensation picture changes dramatically.
        </p>
        <p className="text-text-secondary">
          Concrete example: an E-5 (Staff Sergeant) stationed at Langley AFB, Virginia, with dependents. Base pay of $3,343, plus BAH of approximately $2,400, plus BAS of $519. That&apos;s roughly $6,262 per month, or about $75,000 per year in equivalent compensation, plus free healthcare worth thousands more. A civilian would need to earn roughly $90,000 pre-tax to match that take-home.
        </p>
        <p className="text-text-secondary">
          Do not compare Air Force base pay to a civilian salary without adding BAH and BAS. You&apos;ll undervalue the offer by 40% or more.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Ranks FAQ
        </h2>

        <div className="mt-4 divide-y divide-navy-border/40">
          {[
            {
              q: "What rank do you start at in the Air Force?",
              a: "Most enlistees start at E-1 (Airman Basic) at $2,407/mo. You can enter at E-2 with 2 years of JROTC, 20 college credits, or Eagle Scout/Girl Scout Gold Award. You can enter at E-3 with 3+ years of JROTC or 45 semester hours of college. E-3 is the maximum entry rank under advanced enlistment programs. Bring documentation to your recruiter and ensure the advanced rank is written into your contract.",
            },
            {
              q: "How long does it take to make Staff Sergeant in the Air Force?",
              a: "The minimum is 3 years total service plus 6 months as an E-4. In practice, the average is around 4 years total service. E-5 is the first competitive promotion, decided by the Weighted Airman Promotion System (WAPS). Meeting the minimum requirements doesn't guarantee selection. Recent selection rates have varied from 25% to 45% depending on career field and cycle.",
            },
            {
              q: "Does the Air Force have warrant officers?",
              a: "No. The Air Force eliminated its warrant officer program in 1959 when E-8 and E-9 grades were created. The last active-duty Air Force warrant officer retired in 1980. A 2024 study into reintroducing them has not produced a formal recommendation. As of 2026, no warrant officer grade exists in the active force.",
            },
            {
              q: "What is the highest enlisted rank in the Air Force?",
              a: "E-9 (Chief Master Sergeant) is the highest enlisted pay grade, with 2026 base pay starting at $6,910/mo. Above that is the Chief Master Sergeant of the Air Force (CMSAF), a special position held by one person at a time. The current CMSAF is David R. Wolfe (21st CMSAF), sworn in December 2025. Only 1% of the total enlisted force can hold E-9 at any time, by law.",
            },
            {
              q: "What ASVAB score do you need for the Air Force?",
              a: "The minimum AFQT is 36 for high school diploma holders and 50 for GED holders. That minimum gets you in the door, but specific AFSCs require higher scores in the G, M, A, or E composites. Cyber Warfare Operations (1B4X1) requires a 64 G score. Security Forces (3P0X1) requires only a 33 G score. Higher composite scores give you more job options and more negotiating power at MEPS.",
            },
            {
              q: "What is a First Sergeant in the Air Force?",
              a: "A First Sergeant (\"First Shirt\") is a special duty assignment, not a separate pay grade. Identifiable by a diamond on the rank insignia. Can be held by E-7, E-8, or E-9. They advise unit commanders on enlisted morale, welfare, and discipline. The designation reverts when leaving the assignment.",
            },
            {
              q: "Can you become an Air Force officer after enlisting?",
              a: "Yes. Three main programs: ASCP (Airman Scholarship and Commissioning Program) provides a full ROTC scholarship. SOAR (Scholarships for Outstanding Airmen to ROTC) offers up to $18,000/year. POC-ERP covers those within two years of completing a degree. All result in a commission as Second Lieutenant (O-1). All require separating from active duty. The process from application to commissioning typically takes 2-4 years. These programs are competitive, with ASCP accepting fewer than 100 airmen per year.",
            },
          ].map((faq, i) => (
            <div key={faq.q} className={i === 0 ? "pb-6" : "py-6"}>
              <h3 className="font-display text-base font-bold text-text-primary">
                {faq.q}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which Air Force Jobs Your ASVAB Score Unlocks
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, MAGE composites, and every Air Force job you qualify for.
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
