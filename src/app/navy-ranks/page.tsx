import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RankEquivalencyExplorer from "@/components/ranks/RankEquivalencyExplorer";
import StartingRankEstimator from "@/components/ranks/StartingRankEstimator";
import PromotionPathPlanner from "@/components/ranks/PromotionPathPlanner";
import BranchJobUnlockExplorer from "@/components/ranks/BranchJobUnlockExplorer";

export const metadata: Metadata = {
  title: "Navy Ranks: Complete Guide to Every Pay Grade (2026)",
  description:
    "All Navy ranks explained — enlisted E-1 to E-9, warrant officers W-2 to W-5, and officers O-1 to O-10 with 2026 pay, the rating system, and promotion timelines.",
  alternates: {
    canonical: "https://asvabhero.com/navy-ranks",
  },
};

export default function NavyRanksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Navy Ranks: Complete Guide to Every Pay Grade (2026)",
          description:
            "All Navy ranks explained — enlisted E-1 to E-9, warrant officers W-2 to W-5, and officers O-1 to O-10 with 2026 pay, the rating system, and promotion timelines.",
          url: "https://asvabhero.com/navy-ranks",
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
              name: "What rank do you start at in the Navy?",
              acceptedAnswer: { "@type": "Answer", text: "Most enlistees start at E-1 (Seaman Recruit). You can enter at E-2 with 15+ college credits, JROTC completion, or referrals. E-3 is possible with 45+ college credits or completion of certain programs like Eagle Scout or Civil Air Patrol. Officers start at O-1 (Ensign) upon commissioning through USNA, NROTC, OCS, or direct commission programs." },
            },
            {
              "@type": "Question",
              name: "What is the Navy rating system?",
              acceptedAnswer: { "@type": "Answer", text: "The rating system combines your job specialty and pay grade into a single title called your rate. Your rating is your occupational specialty (like Electronics Technician). Your rate adds the pay grade (like ET2 for an E-5 Electronics Technician). No other branch does this. It has been a core part of Navy identity for over a century." },
            },
            {
              "@type": "Question",
              name: "How long does it take to make Chief Petty Officer (E-7)?",
              acceptedAnswer: { "@type": "Answer", text: "Most sailors who make Chief have between 12 and 16 years of service. There is no exam. A selection board reviews your entire record, including evaluations, awards, warfare qualifications, and sustained performance. The FY2024 selection rate was approximately 31%. Some ratings are more competitive than others, and not everyone will make it." },
            },
            {
              "@type": "Question",
              name: "What is the difference between a Navy Captain and an Army Captain?",
              acceptedAnswer: { "@type": "Answer", text: "A Navy Captain is O-6, equivalent to an Army Colonel. An Army Captain is O-3, which the Navy calls Lieutenant. This is the single most confusing rank difference across branches. When someone on a Navy ship says the Captain, they typically mean the commanding officer of the vessel, regardless of that person's actual pay grade." },
            },
            {
              "@type": "Question",
              name: "Does the Navy have warrant officers?",
              acceptedAnswer: { "@type": "Answer", text: "Yes, but fewer than most people expect. The Navy has roughly 1,500 active-duty warrant officers serving in grades W-2 through W-5. The Navy skips W-1 entirely. Warrant officers are selected from senior enlisted sailors (typically E-7+) and serve as technical specialists in fields like ordnance, intelligence, aviation maintenance, and information warfare." },
            },
            {
              "@type": "Question",
              name: "What ASVAB score do you need for the Navy?",
              acceptedAnswer: { "@type": "Answer", text: "You need a minimum AFQT score of 35 to enlist in the Navy. However, specific ratings require composite line scores from ASVAB subtests that go far beyond AFQT. Nuclear ratings require a 252 on the NF composite. Some ratings like Culinary Specialist need only an 87 on VE+AR." },
            },
            {
              "@type": "Question",
              name: "How do Navy promotions work for enlisted sailors?",
              acceptedAnswer: { "@type": "Answer", text: "E-1 to E-3 advance on time in service, roughly 9 months per step. E-4 is now largely automatic after A-School and 18 months TIS (changed July 2024). E-5 and E-6 require passing the Navy-Wide Advancement Exam, with a Final Multiple Score determining selection. E-7 and above are board-selected with no exam. Advancement is quota-based per rating." },
            },
            {
              "@type": "Question",
              name: "Who is the current Master Chief Petty Officer of the Navy?",
              acceptedAnswer: { "@type": "Answer", text: "John Perryman is the 17th Master Chief Petty Officer of the Navy (MCPON), serving since September 2025. He succeeded James Honea, the 16th MCPON, who served from September 2022 to September 2025. The MCPON is the senior enlisted advisor to the Chief of Naval Operations and represents the interests of all enlisted sailors across the fleet." },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy Ranks: The Complete Guide for 2026
        </h1>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "Total Ranks", value: "27" },
            { label: "Warrant Officers", value: "~1.5K" },
            { label: "Min AFQT", value: "35" },
            { label: "Active Duty", value: "347K" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 rounded-full border border-navy-border bg-navy-lighter px-4 py-1.5 text-sm">
              <span className="font-mono font-bold text-accent">{stat.value}</span>
              <span className="text-text-tertiary">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-text-secondary">
          The Navy is the only branch where your job title is baked into your rank. An E-6 in the Army is a Staff Sergeant no matter what. An E-6 in the Navy might be an IT1 (Information Systems Technician First Class) or an HM1 (Hospital Corpsman First Class). That one quirk trips up almost everyone who starts researching <strong>navy ranks</strong>.
        </p>
        <p className="mt-3 text-text-secondary">
          The Navy uses three labeling systems that overlap. Pay grade (E-5) tells you where someone sits on the DoD pay scale. Rank title (Petty Officer Second Class) is the formal name. Rate (ET2, Electronics Technician Second Class) combines pay grade and job specialty into a single designation. Once you understand those three layers, everything else clicks.
        </p>
        <p className="mt-3 text-text-secondary">
          There are three career tracks. Enlisted sailors span E-1 through E-9. Warrant officers run W-2 through W-5 (the Navy skips W-1 entirely). Commissioned officers hold O-1 through O-10.
        </p>
        <p className="mt-3 text-text-secondary">
          This guide covers every rank across all three tracks, what each grade means day-to-day, how promotions actually work, 2026 base pay tables, and how your{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover underline">
            ASVAB score
          </Link>{" "}
          connects to the rating you&apos;ll hold for the rest of your career. If you haven&apos;t taken the ASVAB yet, start with a{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover underline">
            practice test
          </Link>{" "}
          to see where you stand.
        </p>

        {/* ─── RANK EQUIVALENCY EXPLORER ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Compare Navy Ranks to Other Branches
        </h2>
        <p className="mt-2 text-text-secondary">
          See how every Navy rank lines up against the Army, Air Force, Marines, Coast Guard, and Space Force.
        </p>
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — Compare pay grades across all 6 branches →</p>
          <RankEquivalencyExplorer />
        </div>

        {/* ─── THREE RANK TRACKS ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          The Three Navy Rank Tracks
        </h2>
        <p className="mt-2 text-text-secondary">
          The Navy splits its workforce into three separate pipelines, each with different entry requirements and promotion mechanics.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Track</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grades</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">How You Enter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">Enlisted</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">E-1 to E-9</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Enlist with high school diploma + AFQT minimum 35</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">Warrant Officer</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">W-2 to W-5</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Selected from senior enlisted (typically E-7+); Navy skips W-1</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">Commissioned Officer</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">O-1 to O-10</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">USNA, NROTC, OCS, or direct commission</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          Enlisted sailors make up roughly 82% of the Navy. They operate equipment, maintain systems, and lead small teams. Warrant officers are rare technical specialists, fewer than 1,500 on active duty. Commissioned officers lead divisions, departments, and commands.
        </p>
        <p className="mt-3 text-text-secondary">
          Enlisted promotions at the lower levels run on exams and time in service. Officer promotions at the junior levels are mostly time-based, then shift to competitive selection boards at O-4 and above. Warrant officers follow a separate board process entirely. Your track choice at the start shapes your entire career trajectory.
        </p>

        {/* ─── ENLISTED E-1 TO E-3 ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Navy Enlisted Ranks E-1 to E-3: Junior Sailors
        </h2>
        <p className="mt-2 text-text-secondary">
          Your first months in the Navy start here. E-1 through E-3 are the learning ranks.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank Title</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Abbreviation</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-1</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Seaman Recruit</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">SR</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$1,833/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-2</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Seaman Apprentice</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">SA</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$2,055/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-3</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Seaman</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">SN</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$2,161/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          Those titles (&quot;Seaman Recruit,&quot; &quot;Seaman Apprentice,&quot; &quot;Seaman&quot;) only apply to one occupational community. The Navy has five communities, and your E-1 to E-3 title changes depending on which one you&apos;re assigned to:
        </p>
        <ul className="mt-3 space-y-1 text-text-secondary list-disc pl-5">
          <li><strong className="text-text-primary">Seaman (SN/SA/SR):</strong> General and deck ratings</li>
          <li><strong className="text-text-primary">Fireman (FN/FA/FR):</strong> Engineering and hull ratings</li>
          <li><strong className="text-text-primary">Airman (AN/AA/AR):</strong> Aviation ratings</li>
          <li><strong className="text-text-primary">Constructionman (CN/CA/CR):</strong> Seabees and construction ratings</li>
          <li><strong className="text-text-primary">Hospitalman (HN/HA/HR):</strong> Medical ratings</li>
        </ul>
        <p className="mt-3 text-text-secondary">
          Stripe colors on dress uniforms distinguish the communities visually. White stripes for seaman, red for fireman, green for airman, light blue for constructionman, and white with a caduceus for hospitalman. You can identify someone&apos;s community from across the room before you ever read their nametape.
        </p>
        <p className="mt-3 text-text-secondary">
          At E-1 through E-3, you may be &quot;undesignated&quot; (no rating yet) or a &quot;striker&quot; (actively working toward a specific rating). The difference matters. Undesignated sailors get assigned to wherever the Navy needs bodies. Strikers are training toward a specific job and have a clearer path forward. Once you earn a rating, your job specialty gets locked into your rank title permanently. An E-3 Hospitalman is called &quot;HN,&quot; but once they advance to E-4, they become HM3 (Hospital Corpsman Third Class). The job becomes the rank.
        </p>
        <p className="mt-3 text-text-secondary">
          Most recruits enter at E-1. College credits (15+ semester hours bumps you to E-2, 45+ to E-3), JROTC completion, or Eagle Scout/Gold Award status can earn you a higher starting rank. Advancement from E-1 to E-3 is largely time-based, roughly 9 months per step, assuming you stay out of trouble and meet basic requirements. These early promotions are nearly automatic, so the real career decision at this stage is locking in the right rating.
        </p>
        <p className="mt-3 text-text-secondary">
          Use our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover underline">
            ASVAB calculator
          </Link>{" "}
          to figure out which ratings your scores qualify you for before you talk to a recruiter.
        </p>

        {/* ─── PETTY OFFICERS E-4 TO E-6 ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Petty Officers E-4 to E-6: The Navy&apos;s NCO Backbone
        </h2>
        <p className="mt-2 text-text-secondary">
          E-4 marks the transition from junior sailor to noncommissioned officer. You gain real authority, real accountability, and a rank title that now includes your job.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank Title</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Abbreviation</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-4</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Petty Officer Third Class</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">PO3</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$2,393/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-5</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Petty Officer Second Class</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">PO2</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$2,610/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-6</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Petty Officer First Class</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">PO1</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$2,926/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          This is where the Navy&apos;s rate and rating system fully kicks in.
        </p>
        <ul className="mt-3 space-y-2 text-text-secondary list-disc pl-5">
          <li><strong className="text-text-primary">Rating</strong> is your occupational specialty. Boatswain&apos;s Mate, Electronics Technician, Hospital Corpsman. Think of it as your job title.</li>
          <li><strong className="text-text-primary">Rate</strong> is your pay grade and rating combined into one abbreviation. BM1 means Boatswain&apos;s Mate First Class (E-6). ET2 means Electronics Technician Second Class (E-5). YN2 means Yeoman Second Class (E-5).</li>
        </ul>
        <p className="mt-3 text-text-secondary">
          This system is uniquely Navy. No other branch bakes your job into your rank title. When someone calls you &quot;IT1,&quot; they know your pay grade and your specialty in two syllables. Examples you&apos;ll hear on every ship: MM3 (Machinist&apos;s Mate Third Class), IT1 (Information Systems Technician First Class), HM2 (Hospital Corpsman Second Class).
        </p>
        <p className="mt-3 text-text-secondary">
          As of July 2024, E-4 advancement is now largely automatic after completing A-School and reaching 18 months of time in service. This was a significant policy shift. Previously, E-4 required passing the Navy-Wide Advancement Exam (NWAE).
        </p>
        <p className="mt-3 text-text-secondary">
          E-5 and E-6 still require the NWAE, administered twice per year in March and September. Your Final Multiple Score (FMS) determines whether you advance. FMS combines your Performance Mark Average (PMA), exam score, time in rate, awards, and warfare or specialty qualifications. Advancement is competitive and quota-based per rating. Some ratings advance 80% of eligible sailors. Others advance fewer than 10%.
        </p>
        <div className="mt-4 rounded-lg border border-navy-border bg-navy-lighter p-4 text-sm text-text-secondary">
          <p>
            <strong className="text-text-primary">A quick history:</strong> In September 2016, Secretary of the Navy Ray Mabus abolished the rating system entirely, calling it &quot;archaic and confusing.&quot; The backlash from sailors was immediate and intense. Chief of Naval Operations Admiral John Richardson reversed the decision three months later. Ratings are core Navy identity, and the fleet made that clear.
          </p>
        </div>

        {/* ─── CHIEF PETTY OFFICERS E-7 TO E-9 ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Chief Petty Officers E-7 to E-9: The Khaki Mafia
        </h2>
        <p className="mt-2 text-text-secondary">
          &quot;Officers run the Navy, but chiefs make the Navy run.&quot; You&apos;ll hear that on every ship and every base. It&apos;s not a joke.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank Title</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Abbreviation</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-7</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Chief Petty Officer</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">CPO</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$3,385/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-8</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Senior Chief Petty Officer</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">SCPO</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$4,868/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">E-9</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Master Chief Petty Officer</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">MCPO</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$5,789&ndash;$6,240/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          Pinning on E-7 anchors is a cultural milestone in the Navy, not just a promotion. When you make Chief, you swap from dungarees to khakis, the same uniform color worn by officers. You gain access to the Chief&apos;s Mess, a separate dining and meeting space with its own traditions, its own expectations, and its own accountability structure. The title &quot;Chief&quot; carries weight that outpaces the pay grade.
        </p>
        <p className="mt-3 text-text-secondary">
          The CPO 365 program is a year-long leadership development process for newly selected chiefs. It replaced the old six-week initiation in 2017 after concerns about hazing. The program emphasizes deckplate leadership, mentoring, and professional development.
        </p>
        <p className="mt-3 text-text-secondary">
          Making Chief is hard. The FY2024 E-7 selection rate was approximately 31%. There is no exam. A selection board reviews your entire record: evaluations, awards, warfare qualifications, community involvement, and sustained superior performance. The word &quot;petit&quot; in &quot;Petty Officer&quot; comes from the French for &quot;small&quot; or &quot;subordinate.&quot; The Chief Petty Officer grade was established on April 1, 1893.
        </p>
        <p className="mt-3 text-text-secondary">
          E-9 has three levels of responsibility. Master Chief Petty Officer (MCPO) serves at the unit level. Fleet Master Chief (FLTCM) advises a fleet commander. And the Master Chief Petty Officer of the Navy (MCPON) is the top enlisted sailor in the entire service, serving as senior enlisted advisor to the Chief of Naval Operations.
        </p>
        <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-text-secondary">
          <p>
            The current MCPON is <strong className="text-text-primary">John Perryman</strong>, the 17th to hold the position, serving since September 2025. He succeeded James Honea, the 16th MCPON, who served from September 2022 to September 2025.
          </p>
        </div>
        <p className="mt-3 text-text-secondary">
          High Year Tenure (HYT) enforces an up-or-out policy for enlisted navy ranks. E-7 sailors get 24 years. E-8 gets 26 years. E-9 gets 30 years. If you don&apos;t advance within those limits, you separate.
        </p>

        {/* ─── STARTING RANK ESTIMATOR ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Estimate Your Starting Navy Rank
        </h2>
        <p className="mt-2 text-text-secondary">
          Your starting rank depends on your education, prior service, and qualifications. Use this tool to see where you&apos;d enter.
        </p>
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — Estimate your starting rank based on your background →</p>
          <StartingRankEstimator />
        </div>

        {/* ─── WARRANT OFFICERS W-2 TO W-5 ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Navy Warrant Officer Ranks W-2 to W-5
        </h2>
        <p className="mt-2 text-text-secondary">
          The Navy has no W-1. Every Navy warrant officer enters as W-2 (Chief Warrant Officer 2), already commissioned from day one. That surprises people who are familiar with the Army&apos;s system.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank Title</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Abbreviation</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">W-2</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Chief Warrant Officer 2</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">CWO2</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$3,630/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">W-3</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Chief Warrant Officer 3</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">CWO3</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$4,175/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">W-4</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Chief Warrant Officer 4</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">CWO4</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">$4,570/mo</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">W-5</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Chief Warrant Officer 5</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">CWO5</td>
                <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">~$5,000/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          Warrant officers are technical specialists selected from the senior enlisted ranks, typically E-7 and above. They serve as subject matter experts in fields like ordnance, intelligence, aviation maintenance, and information warfare.
        </p>
        <p className="mt-3 text-text-secondary">
          Fewer than roughly 1,500 active-duty Navy warrant officers serve at any given time. The Army, by contrast, has tens of thousands of warrant officers, especially in aviation where every helicopter pilot is a WO. The Army also uses W-1 through W-5, while the Navy skips W-1 entirely.
        </p>
        <p className="mt-3 text-text-secondary">
          You can&apos;t walk into a recruiter&apos;s office and sign up to be a warrant officer. You earn it through years of enlisted service, demonstrated technical mastery, and a competitive selection board.
        </p>

        {/* ─── OFFICER RANKS O-1 TO O-10 ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Navy Officer Ranks O-1 to O-10
        </h2>
        <p className="mt-2 text-text-secondary">
          Officers lead. They plan missions, manage divisions, command ships, and set strategy. Navy officer ranks use titles that differ from every other branch, which creates confusion.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank Title</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Abbreviation</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: "O-1", title: "Ensign", abbr: "ENS", pay: "$3,918/mo" },
                { grade: "O-2", title: "Lieutenant Junior Grade", abbr: "LTJG", pay: "$4,516/mo" },
                { grade: "O-3", title: "Lieutenant", abbr: "LT", pay: "$5,241/mo" },
                { grade: "O-4", title: "Lieutenant Commander", abbr: "LCDR", pay: "$5,990/mo" },
                { grade: "O-5", title: "Commander", abbr: "CDR", pay: "$6,965/mo" },
                { grade: "O-6", title: "Captain", abbr: "CAPT", pay: "$8,345/mo" },
                { grade: "O-7", title: "Rear Admiral (Lower Half)", abbr: "RDML", pay: "Flag officer" },
                { grade: "O-8", title: "Rear Admiral (Upper Half)", abbr: "RADM", pay: "Flag officer" },
                { grade: "O-9", title: "Vice Admiral", abbr: "VADM", pay: "Flag officer" },
                { grade: "O-10", title: "Admiral", abbr: "ADM", pay: "Flag officer" },
              ].map((row) => (
                <tr key={row.grade}>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">{row.grade}</td>
                  <td className="border border-navy-border px-3 py-2 text-text-secondary">{row.title}</td>
                  <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-tertiary">{row.abbr}</td>
                  <td className={`border border-navy-border px-3 py-2 font-mono text-sm ${row.pay.startsWith("$") ? "text-accent" : "text-text-tertiary"}`}>{row.pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          Important terminology: a Navy &quot;Captain&quot; is O-6, equivalent to an Army or Air Force Colonel. A Navy O-3 is a &quot;Lieutenant,&quot; not a &quot;Captain.&quot; This trips up everyone who crosses branches.
        </p>
        <p className="mt-3 text-text-secondary">
          There are four main commissioning paths: the U.S. Naval Academy (USNA) in Annapolis; Naval Reserve Officers Training Corps (NROTC) at civilian universities; Officer Candidate School (OCS) for college graduates; and direct commission for professionals in medicine, law (JAG), chaplaincy, and some engineering fields.
        </p>
        <p className="mt-3 text-text-secondary">
          Officer designators are four-digit codes that define your community and determine your career path, duty stations, and command opportunities:
        </p>
        <ul className="mt-3 space-y-1 text-text-secondary list-disc pl-5">
          <li><strong className="text-text-primary">1100:</strong> Surface Warfare Officer (SWO)</li>
          <li><strong className="text-text-primary">1310:</strong> Naval Aviator</li>
          <li><strong className="text-text-primary">1130:</strong> Special Warfare (SEAL)</li>
          <li><strong className="text-text-primary">2000s:</strong> Restricted Line (Engineering Duty, Aerospace Engineering, etc.)</li>
          <li><strong className="text-text-primary">3000s:</strong> Staff Corps (Medical, JAG, Supply, Chaplain)</li>
        </ul>
        <p className="mt-3 text-text-secondary">
          Promotions from O-1 to O-3 are mostly time-based, roughly two years per grade. At O-4 and above, a selection board reviews your record. Up-or-out rules apply: if you&apos;re passed over twice for O-4, you face involuntary separation.
        </p>

        {/* ─── PROMOTION PATH PLANNER ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Plan Your Promotion Path
        </h2>
        <p className="mt-2 text-text-secondary">
          See how long it realistically takes to reach your target rank based on your entry point and track.
        </p>
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — Map your promotion timeline from enlistment to retirement →</p>
          <PromotionPathPlanner />
        </div>

        {/* ─── HOW PROMOTIONS WORK ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          How Navy Promotions Actually Work
        </h2>
        <p className="mt-2 text-text-secondary">
          Navy promotions run on three distinct systems depending on where you are in the rank structure.
        </p>

        <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
          Time-Based Promotions (E-1 to E-3, O-1 to O-3)
        </h3>
        <p className="mt-2 text-text-secondary">
          The junior ranks advance mostly on a clock. E-1 to E-2 takes roughly 9 months. E-2 to E-3 takes another 9 months. On the officer side, O-1 to O-2 is about 2 years, and O-2 to O-3 is another 2 years. These promotions are close to automatic as long as you meet basic standards and stay out of trouble.
        </p>

        <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
          Exam-Based Promotions (E-4 to E-6)
        </h3>
        <p className="mt-2 text-text-secondary">
          As of July 2024, E-4 is now largely automatic after completing A-School and hitting 18 months of time in service. That was a major policy change.
        </p>
        <p className="mt-3 text-text-secondary">
          E-5 and E-6 still require passing the Navy-Wide Advancement Exam, given in March and September each cycle. Your Final Multiple Score determines your fate. FMS includes your Performance Mark Average (PMA), exam score, time in rate, awards, and warfare or specialty qualifications. Advancement is quota-based per rating. An Electronics Technician might see an 80% advancement rate to E-5 while a Hospital Corpsman might sit below 10%. Your rating choice at enlistment directly affects your advancement odds.
        </p>

        <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
          Board-Selected Promotions (E-7 and Above, O-4 and Above)
        </h3>
        <p className="mt-2 text-text-secondary">
          No exam for E-7 and above. A selection board reads your record and decides. The FY2024 CPO selection rate was approximately 31%. Officer boards for O-4 and above are similarly competitive.
        </p>
        <p className="mt-3 text-text-secondary">
          Up-or-out applies at both levels. Enlisted sailors face High Year Tenure limits that cap how long you can serve at each grade. Officers face statutory limits, and being passed over twice at certain grades means involuntary separation.
        </p>
        <p className="mt-3 text-text-secondary">
          The bottom line: your rating choice at enlistment directly shapes your promotion timeline. A sailor in a critically manned rating with 80% advancement to E-5 lives in a different Navy than one in an overmanned rating advancing fewer than 10%. Research advancement percentages for your target rating before you sign a contract.
        </p>

        {/* ─── 2026 PAY ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          2026 Navy Pay by Rank
        </h2>
        <p className="mt-2 text-text-secondary">
          Base pay is just the starting point. BAH, BAS, sea pay, and specialty pays can add $1,000 to $3,000+ per month depending on location and rank. These are 2026 base pay rates at the entry step for each grade.
        </p>

        <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
          Enlisted Pay (E-1 to E-9)
        </h3>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: "E-1", title: "Seaman Recruit", pay: "$1,833/mo" },
                { grade: "E-2", title: "Seaman Apprentice", pay: "$2,055/mo" },
                { grade: "E-3", title: "Seaman", pay: "$2,161/mo" },
                { grade: "E-4", title: "Petty Officer 3rd Class", pay: "$2,393/mo" },
                { grade: "E-5", title: "Petty Officer 2nd Class", pay: "$2,610/mo" },
                { grade: "E-6", title: "Petty Officer 1st Class", pay: "$2,926/mo" },
                { grade: "E-7", title: "Chief Petty Officer", pay: "$3,385/mo" },
                { grade: "E-8", title: "Senior Chief Petty Officer", pay: "$4,868/mo" },
                { grade: "E-9", title: "Master Chief Petty Officer", pay: "$5,789/mo" },
              ].map((row) => (
                <tr key={row.grade}>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">{row.grade}</td>
                  <td className="border border-navy-border px-3 py-2 text-text-secondary">{row.title}</td>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">{row.pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
          Warrant Officer Pay (W-2 to W-5)
        </h3>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: "W-2", title: "Chief Warrant Officer 2", pay: "$3,630/mo" },
                { grade: "W-3", title: "Chief Warrant Officer 3", pay: "$4,175/mo" },
                { grade: "W-4", title: "Chief Warrant Officer 4", pay: "$4,570/mo" },
                { grade: "W-5", title: "Chief Warrant Officer 5", pay: "~$5,000/mo" },
              ].map((row) => (
                <tr key={row.grade}>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">{row.grade}</td>
                  <td className="border border-navy-border px-3 py-2 text-text-secondary">{row.title}</td>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">{row.pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
          Officer Pay (O-1 to O-6)
        </h3>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Pay Grade</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rank</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">2026 Base Pay</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: "O-1", title: "Ensign", pay: "$3,918/mo" },
                { grade: "O-2", title: "Lieutenant Junior Grade", pay: "$4,516/mo" },
                { grade: "O-3", title: "Lieutenant", pay: "$5,241/mo" },
                { grade: "O-4", title: "Lieutenant Commander", pay: "$5,990/mo" },
                { grade: "O-5", title: "Commander", pay: "$6,965/mo" },
                { grade: "O-6", title: "Captain", pay: "$8,345/mo" },
              ].map((row) => (
                <tr key={row.grade}>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-text-secondary">{row.grade}</td>
                  <td className="border border-navy-border px-3 py-2 text-text-secondary">{row.title}</td>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">{row.pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          BAH varies by zip code (use the DoD BAH calculator on the Defense Travel Management Office website). BAS is approximately $452/mo for enlisted and $311/mo for officers in 2026. Both allowances are tax-free.
        </p>

        {/* ─── BRANCH COMPARISON ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Navy Ranks vs. Army, Air Force, and Marines
        </h2>
        <p className="mt-2 text-text-secondary">
          The Navy is the only branch that puts your job specialty into your rank title. That difference alone makes cross-branch comparisons tricky.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-accent/80">Navy</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Army</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Air Force</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Marines</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">NCO starts at</td>
                <td className="border border-navy-border px-3 py-2 text-text-primary font-semibold bg-accent-dim/20">E-4 (PO3)</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">E-4 (CPL)</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">E-5 (SSgt)</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">E-4 (Cpl)</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">E-4 title</td>
                <td className="border border-navy-border px-3 py-2 text-text-primary font-semibold bg-accent-dim/20">Petty Officer 3rd Class</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Specialist/Corporal</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Senior Airman</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Corporal</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">Warrant Officers</td>
                <td className="border border-navy-border px-3 py-2 text-text-primary font-semibold bg-accent-dim/20">W-2 to W-5</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">W-1 to W-5</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">None</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">W-1 to W-5</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">Job in rank title?</td>
                <td className="border border-navy-border px-3 py-2 text-text-primary font-semibold bg-accent-dim/20">Yes (rate system)</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">No</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">No</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">No</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">O-6 title</td>
                <td className="border border-navy-border px-3 py-2 text-text-primary font-semibold bg-accent-dim/20">Captain</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Colonel</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Colonel</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">Colonel</td>
              </tr>
              <tr>
                <td className="border border-navy-border px-3 py-2 text-text-secondary font-medium">Top enlisted</td>
                <td className="border border-navy-border px-3 py-2 text-text-primary font-semibold bg-accent-dim/20">MCPON</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">SMA</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">CMSAF</td>
                <td className="border border-navy-border px-3 py-2 text-text-secondary">SgtMaj MC</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          When someone says &quot;ET2,&quot; you instantly know their pay grade and their job. No other branch does this. The rate system is a fundamental part of Navy culture.
        </p>
        <p className="mt-3 text-text-secondary">
          NCO status begins at E-4 in the Navy, same as Army and Marines. The Air Force waits until E-5. The Navy&apos;s warrant officer program is much smaller than the Army&apos;s, which uses WOs heavily for aviation. The Air Force eliminated warrant officers entirely in 1959 and has never brought them back.
        </p>
        <p className="mt-3 text-text-secondary">
          For a deeper comparison of what each branch offers, check out our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover underline">
            ASVAB study guide
          </Link>{" "}
          to prepare for whichever path you choose.
        </p>

        {/* ─── BRANCH JOB UNLOCK EXPLORER ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          Explore Jobs You Unlock by Branch
        </h2>
        <p className="mt-2 text-text-secondary">
          See which Navy jobs and leadership roles unlock at each rank, and how they compare to other branches.
        </p>
        <div className="my-6 rounded-2xl ring-1 ring-navy-border overflow-hidden">
          <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">Interactive Tool — See which jobs your ASVAB score unlocks across every branch →</p>
          <BranchJobUnlockExplorer />
        </div>

        {/* ─── CROSS-LINKS ─── */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-navy-border bg-navy-light px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Also explore:</span>
          <Link href="/air-force-ranks" className="rounded-md border border-navy-border px-3 py-1 text-xs font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-accent no-underline">Air Force Ranks</Link>
          <Link href="/army-ranks" className="rounded-md border border-navy-border px-3 py-1 text-xs font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-accent no-underline">Army Ranks</Link>
        </div>

        {/* ─── ASVAB SCORES AND NAVY RATINGS ─── */}
        <h2 className="mt-8 font-display text-2xl font-bold text-text-primary">
          ASVAB Scores and Navy Ratings
        </h2>
        <p className="mt-2 text-text-secondary">
          The Navy&apos;s minimum AFQT score is 35, but AFQT alone doesn&apos;t determine your rating. The Navy uses composite line scores calculated from specific ASVAB subtests. Different ratings require different composites, and the score thresholds vary widely.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Rating</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Composite Formula</th>
                <th className="border border-navy-border bg-navy-lighter px-3 py-2 text-left font-semibold text-text-primary">Minimum Score</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rating: "Nuclear (NF)", formula: "AR+MK+EI+GS", min: "252" },
                { rating: "Electronics Technician (ET)", formula: "AR+MK+EI+GS", min: "222" },
                { rating: "Special Warfare / SEAL (SO)", formula: "AR+VE+MK+MC (BEE)", min: "165" },
                { rating: "Hospital Corpsman (HM)", formula: "VE+MK+GS", min: "156" },
                { rating: "Culinary Specialist (CS)", formula: "VE+AR", min: "87" },
              ].map((row) => (
                <tr key={row.rating}>
                  <td className="border border-navy-border px-3 py-2 text-text-secondary">{row.rating}</td>
                  <td className="border border-navy-border px-3 py-2 font-mono text-xs text-text-secondary">{row.formula}</td>
                  <td className="border border-navy-border px-3 py-2 font-mono text-sm text-accent">{row.min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-text-secondary">
          Composite abbreviations: VE is Verbal Expression (Word Knowledge + Paragraph Comprehension). AR is Arithmetic Reasoning. MK is Math Knowledge. GS is General Science. EI is Electronics Information. MC is Mechanical Comprehension. GT (General Technical) combines VE+AR. BEE combines AR+VE+MK+MC.
        </p>
        <p className="mt-3 text-text-secondary">
          Nuclear ratings have the highest ASVAB bar in the entire Navy, but they also offer the best incentives. Enlistment bonuses can exceed $40,000, and nuclear-trained sailors are aggressively recruited by civilian power companies, defense contractors, and engineering firms after separation.
        </p>
        <p className="mt-3 text-text-secondary">
          Your ASVAB score effectively determines your starting rating. Your rating determines your advancement odds. Your advancement odds determine your career trajectory and earning potential. Study strategically for the subtests that feed into your target rating&apos;s composite, not just for AFQT. Use our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover underline">
            calculator
          </Link>{" "}
          to plug in your scores and see exactly which Navy ratings you qualify for. If your scores aren&apos;t where you need them, our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover underline">
            study guide
          </Link>{" "}
          can help you close the gap before test day.
        </p>

        {/* ─── CTA ─── */}
        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6">
          <h3 className="font-display text-lg font-bold text-text-primary">
            Ready to see which Navy ratings you qualify for?
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your ASVAB scores and see every Navy rating you&apos;re eligible for, plus qualifying jobs across all 6 branches side by side.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Check Your Qualifying Ratings
          </Link>
        </div>

        {/* ─── FAQ ─── */}
        <h2 className="mt-10 font-display text-2xl font-bold text-text-primary">
          Navy Ranks FAQ
        </h2>

        <div className="mt-4 divide-y divide-navy-border/40">
          <div className="pb-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What rank do you start at in the Navy?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Most enlistees start at E-1 (Seaman Recruit). You can enter at E-2 with 15+ college credits, JROTC completion, or referrals. E-3 is possible with 45+ college credits or completion of certain programs like Eagle Scout or Civil Air Patrol. Officers start at O-1 (Ensign) upon commissioning through USNA, NROTC, OCS, or direct commission programs.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the Navy rating system?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The rating system combines your job specialty and pay grade into a single title called your &quot;rate.&quot; Your rating is your occupational specialty (like Electronics Technician). Your rate adds the pay grade (like ET2 for an E-5 Electronics Technician). No other branch does this. It has been a core part of Navy identity for over a century.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does it take to make Chief Petty Officer (E-7)?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Most sailors who make Chief have between 12 and 16 years of service. There is no exam. A selection board reviews your entire record, including evaluations, awards, warfare qualifications, and sustained performance. The FY2024 selection rate was approximately 31%. Some ratings are more competitive than others, and not everyone will make it.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between a Navy Captain and an Army Captain?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A Navy Captain is O-6, equivalent to an Army Colonel. An Army Captain is O-3, which the Navy calls Lieutenant. This is the single most confusing rank difference across branches. When someone on a Navy ship says &quot;the Captain,&quot; they typically mean the commanding officer of the vessel, regardless of that person&apos;s actual pay grade.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Navy have warrant officers?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, but fewer than most people expect. The Navy has roughly 1,500 active-duty warrant officers serving in grades W-2 through W-5. The Navy skips W-1 entirely. Warrant officers are selected from senior enlisted sailors (typically E-7+) and serve as technical specialists in fields like ordnance, intelligence, aviation maintenance, and information warfare.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do you need for the Navy?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You need a minimum AFQT score of 35 to enlist in the Navy. However, specific ratings require composite line scores from ASVAB subtests that go far beyond AFQT. Nuclear ratings require a 252 on the NF composite. Some ratings like Culinary Specialist need only an 87 on VE+AR. Use our{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover underline">
                calculator
              </Link>{" "}
              to see which ratings your scores unlock.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How do Navy promotions work for enlisted sailors?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              E-1 to E-3 advance on time in service, roughly 9 months per step. E-4 is now largely automatic after A-School and 18 months TIS (changed July 2024). E-5 and E-6 require passing the Navy-Wide Advancement Exam, with a Final Multiple Score determining selection. E-7 and above are board-selected with no exam. Advancement is quota-based per rating.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              Who is the current Master Chief Petty Officer of the Navy?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              John Perryman is the 17th Master Chief Petty Officer of the Navy (MCPON), serving since September 2025. He succeeded James Honea, the 16th MCPON, who served from September 2022 to September 2025. The MCPON is the senior enlisted advisor to the Chief of Naval Operations and represents the interests of all enlisted sailors across the fleet.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
