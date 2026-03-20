"use client";

import { useState } from "react";

type Branch = "army" | "navy" | "air_force" | "marines" | "coast_guard" | "space_force";
type Track = "enlisted" | "officer";

interface RankNode {
  grade: string;
  title: string;
  abbr: string;
  timeToAchieve: string;
  description: string;
  monthlyPay: string;
}

const BRANCH_LABELS: Record<Branch, string> = {
  army: "Army", navy: "Navy", air_force: "Air Force",
  marines: "Marines", coast_guard: "Coast Guard", space_force: "Space Force",
};

const ENLISTED_PATHS: Record<Branch, RankNode[]> = {
  air_force: [
    { grade: "E-1", title: "Airman Basic", abbr: "AB", timeToAchieve: "Entry", description: "Basic training. Learning Air Force culture, procedures, and initial AFSC assignment.", monthlyPay: "$1,833" },
    { grade: "E-2", title: "Airman", abbr: "Amn", timeToAchieve: "~6 months", description: "Basic training complete. Enrolled in technical school for your AFSC.", monthlyPay: "$2,055" },
    { grade: "E-3", title: "Airman First Class", abbr: "A1C", timeToAchieve: "~16 months TIS", description: "Adjusted to military life. Competent in assigned duties.", monthlyPay: "$2,161" },
    { grade: "E-4", title: "Senior Airman", abbr: "SrA", timeToAchieve: "~28 months TIS", description: "Proficient in specialty. Beginning to take on basic instruction roles.", monthlyPay: "$2,393" },
    { grade: "E-5", title: "Staff Sergeant", abbr: "SSgt", timeToAchieve: "3–5 years (competitive)", description: "First NCO grade. Responsible for a small team and mentoring junior airmen.", monthlyPay: "$2,610" },
    { grade: "E-6", title: "Technical Sergeant", abbr: "TSgt", timeToAchieve: "5–8 years (competitive)", description: "Commands flight units. Deep technical expertise required.", monthlyPay: "$2,926" },
    { grade: "E-7", title: "Master Sergeant", abbr: "MSgt", timeToAchieve: "10+ years (highly competitive)", description: "Flight chief or section chief. Most hold undergraduate degrees.", monthlyPay: "$3,294" },
  ],
  army: [
    { grade: "E-1", title: "Private", abbr: "PVT", timeToAchieve: "Entry", description: "Basic Combat Training. Learning Army values and initial MOS assessment.", monthlyPay: "$1,833" },
    { grade: "E-2", title: "Private Second Class", abbr: "PV2", timeToAchieve: "~6 months TIS", description: "AIT or One Station Unit Training in progress.", monthlyPay: "$2,055" },
    { grade: "E-3", title: "Private First Class", abbr: "PFC", timeToAchieve: "~12 months TIS", description: "MOS-qualified. Beginning to develop job skills in unit.", monthlyPay: "$2,161" },
    { grade: "E-4", title: "Specialist", abbr: "SPC", timeToAchieve: "~24 months TIS", description: "Competent in primary MOS. May mentor junior soldiers.", monthlyPay: "$2,393" },
    { grade: "E-5", title: "Sergeant", abbr: "SGT", timeToAchieve: "3–4 years (competitive)", description: "First NCO grade. Team leader responsible for 3–5 soldiers.", monthlyPay: "$2,610" },
    { grade: "E-6", title: "Staff Sergeant", abbr: "SSG", timeToAchieve: "5–7 years (competitive)", description: "Squad leader or staff NCO position. Direct supervision of soldiers.", monthlyPay: "$2,926" },
    { grade: "E-7", title: "Sergeant First Class", abbr: "SFC", timeToAchieve: "10+ years (highly competitive)", description: "Platoon sergeant. Senior tactical advisor to platoon leader.", monthlyPay: "$3,294" },
  ],
  navy: [
    { grade: "E-1", title: "Seaman Recruit", abbr: "SR", timeToAchieve: "Entry", description: "Boot camp at RTC Great Lakes. Learning Navy customs and rate basics.", monthlyPay: "$1,833" },
    { grade: "E-2", title: "Seaman Apprentice", abbr: "SA", timeToAchieve: "~6 months TIS", description: "Boot camp graduate. Beginning 'A' School for your Navy rating.", monthlyPay: "$2,055" },
    { grade: "E-3", title: "Seaman", abbr: "SN", timeToAchieve: "~12 months TIS", description: "A-School complete. Working in your rating aboard ship or at shore command.", monthlyPay: "$2,161" },
    { grade: "E-4", title: "Petty Officer 3rd Class", abbr: "PO3", timeToAchieve: "~24 months TIS", description: "First petty officer grade. Leading small teams, supervising work center tasks.", monthlyPay: "$2,393" },
    { grade: "E-5", title: "Petty Officer 2nd Class", abbr: "PO2", timeToAchieve: "3–5 years (exam-based)", description: "Leading larger work center sections. Advancing in rating expertise.", monthlyPay: "$2,610" },
    { grade: "E-6", title: "Petty Officer 1st Class", abbr: "PO1", timeToAchieve: "6–10 years (competitive)", description: "Senior petty officer. Division leading petty officer role common.", monthlyPay: "$2,926" },
    { grade: "E-7", title: "Chief Petty Officer", abbr: "CPO", timeToAchieve: "10–15 years (highly selective)", description: "Chief's Mess. Fundamental shift — the CPO selection is among the most rigorous in any branch.", monthlyPay: "$3,294" },
  ],
  marines: [
    { grade: "E-1", title: "Private", abbr: "Pvt", timeToAchieve: "Entry", description: "Marine Corps Recruit Depot. The most demanding basic training of any branch.", monthlyPay: "$1,833" },
    { grade: "E-2", title: "Private First Class", abbr: "PFC", timeToAchieve: "~6 months TIS", description: "MCT complete. Assigned to MOS school.", monthlyPay: "$2,055" },
    { grade: "E-3", title: "Lance Corporal", abbr: "LCpl", timeToAchieve: "~14 months TIS", description: "MOS-qualified. Working in unit, beginning to take on basic duties.", monthlyPay: "$2,161" },
    { grade: "E-4", title: "Corporal", abbr: "Cpl", timeToAchieve: "~26 months TIS", description: "First NCO grade in the Marine Corps. Fire team leader.", monthlyPay: "$2,393" },
    { grade: "E-5", title: "Sergeant", abbr: "Sgt", timeToAchieve: "3–5 years (competitive)", description: "Squad leader. Core of the Marine Corps' NCO corps.", monthlyPay: "$2,610" },
    { grade: "E-6", title: "Staff Sergeant", abbr: "SSgt", timeToAchieve: "6–9 years (competitive)", description: "Staff NCO. Platoon sergeant in infantry or senior specialist in technical fields.", monthlyPay: "$2,926" },
    { grade: "E-7", title: "Gunnery Sergeant", abbr: "GySgt", timeToAchieve: "10–14 years (highly competitive)", description: "One of the most respected ranks in the Corps. Technical authority and unit backbone.", monthlyPay: "$3,294" },
  ],
  coast_guard: [
    { grade: "E-1", title: "Seaman Recruit", abbr: "SR", timeToAchieve: "Entry", description: "Basic training at Training Center Cape May. 8 weeks, then 'A' School.", monthlyPay: "$1,833" },
    { grade: "E-2", title: "Seaman Apprentice", abbr: "SA", timeToAchieve: "~6 months TIS", description: "Basic complete. Assigned to first unit or beginning rate school.", monthlyPay: "$2,055" },
    { grade: "E-3", title: "Seaman", abbr: "SN", timeToAchieve: "~12 months TIS", description: "Working in your rating. Learning unit-specific operations.", monthlyPay: "$2,161" },
    { grade: "E-4", title: "Petty Officer 3rd Class", abbr: "PO3", timeToAchieve: "~2 years (exam-based)", description: "First petty officer grade. Taking on supervisory and rate-specific duties.", monthlyPay: "$2,393" },
    { grade: "E-5", title: "Petty Officer 2nd Class", abbr: "PO2", timeToAchieve: "3–5 years (exam-based)", description: "Expanded supervisory role. Leading work center sections.", monthlyPay: "$2,610" },
    { grade: "E-6", title: "Petty Officer 1st Class", abbr: "PO1", timeToAchieve: "6–10 years (competitive)", description: "Senior petty officer. Department leading petty officer common.", monthlyPay: "$2,926" },
    { grade: "E-7", title: "Chief Petty Officer", abbr: "CPO", timeToAchieve: "12+ years (highly selective)", description: "Chief's Mess. Senior enlisted leadership, advisory to officers.", monthlyPay: "$3,294" },
  ],
  space_force: [
    { grade: "E-1", title: "Specialist 1", abbr: "Spc1", timeToAchieve: "Entry", description: "BMT (shared with Air Force). First Space Force-specific training follows.", monthlyPay: "$1,833" },
    { grade: "E-2", title: "Specialist 2", abbr: "Spc2", timeToAchieve: "~6 months TIS", description: "BMT complete. Enrolling in Guardian-specific technical training.", monthlyPay: "$2,055" },
    { grade: "E-3", title: "Specialist 3", abbr: "Spc3", timeToAchieve: "~14 months TIS", description: "Completing specialty technical training. Assigned to first Space Force unit.", monthlyPay: "$2,161" },
    { grade: "E-4", title: "Specialist 4", abbr: "Spc4", timeToAchieve: "~26 months TIS", description: "MOS-qualified Guardian. Gaining proficiency in space operations or support role.", monthlyPay: "$2,393" },
    { grade: "E-5", title: "Sergeant", abbr: "Sgt", timeToAchieve: "3–5 years (competitive)", description: "First NCO grade. Team leader, beginning supervisory responsibilities.", monthlyPay: "$2,610" },
    { grade: "E-6", title: "Technical Sergeant", abbr: "TSgt", timeToAchieve: "5–8 years (competitive)", description: "Senior NCO. Deep specialty expertise, leading technical teams.", monthlyPay: "$2,926" },
    { grade: "E-7", title: "Master Sergeant", abbr: "MSgt", timeToAchieve: "10+ years (highly competitive)", description: "Senior leader in Space Force units. Advisor to officers on technical and personnel matters.", monthlyPay: "$3,294" },
  ],
};

const OFFICER_PATHS: Record<Branch, RankNode[]> = {
  air_force: [
    { grade: "O-1", title: "Second Lieutenant", abbr: "2d Lt", timeToAchieve: "At commission", description: "Newly commissioned via ROTC, OTS, or USAFA. Rated or non-rated assignment.", monthlyPay: "$3,637" },
    { grade: "O-2", title: "First Lieutenant", abbr: "1st Lt", timeToAchieve: "~18 months TIS", description: "Increased responsibility. Same duties as 2Lt with more experience.", monthlyPay: "$4,188" },
    { grade: "O-3", title: "Captain", abbr: "Capt", timeToAchieve: "~4 years TIS", description: "Flight commander or staff position. Manages 20–100 airmen.", monthlyPay: "$4,836" },
    { grade: "O-4", title: "Major", abbr: "Maj", timeToAchieve: "~10 years TIS (competitive)", description: "Squadron or wing-level staff. Advanced education expected.", monthlyPay: "$5,776" },
    { grade: "O-5", title: "Lieutenant Colonel", abbr: "Lt Col", timeToAchieve: "~16 years TIS (competitive)", description: "Squadron commander level. High leadership visibility.", monthlyPay: "$6,759" },
    { grade: "O-6", title: "Colonel", abbr: "Col", timeToAchieve: "~22 years TIS (highly competitive)", description: "Wing commander. Responsible for 1,000–4,000 airmen.", monthlyPay: "$8,106" },
  ],
  army: [
    { grade: "O-1", title: "Second Lieutenant", abbr: "2LT", timeToAchieve: "At commission", description: "Platoon leader. Direct command of 16–40 soldiers.", monthlyPay: "$3,637" },
    { grade: "O-2", title: "First Lieutenant", abbr: "1LT", timeToAchieve: "~18 months TIS", description: "Experienced platoon leader or executive officer of a company.", monthlyPay: "$4,188" },
    { grade: "O-3", title: "Captain", abbr: "CPT", timeToAchieve: "~4 years TIS", description: "Company commander. Commands 62–190 soldiers.", monthlyPay: "$4,836" },
    { grade: "O-4", title: "Major", abbr: "MAJ", timeToAchieve: "~10 years TIS (competitive)", description: "Battalion staff officer or executive officer. CGSC attendance required.", monthlyPay: "$5,776" },
    { grade: "O-5", title: "Lieutenant Colonel", abbr: "LTC", timeToAchieve: "~16 years TIS (competitive)", description: "Battalion commander. Leads 300–1,000 soldiers.", monthlyPay: "$6,759" },
    { grade: "O-6", title: "Colonel", abbr: "COL", timeToAchieve: "~22 years TIS (highly competitive)", description: "Brigade commander. Responsible for 3,000–5,000 soldiers.", monthlyPay: "$8,106" },
  ],
  navy: [
    { grade: "O-1", title: "Ensign", abbr: "ENS", timeToAchieve: "At commission", description: "Division officer. Leading sailors in a specific work center aboard ship or at shore command.", monthlyPay: "$3,637" },
    { grade: "O-2", title: "Lieutenant Junior Grade", abbr: "LTJG", timeToAchieve: "~18 months TIS", description: "Junior department head or continued division officer duties.", monthlyPay: "$4,188" },
    { grade: "O-3", title: "Lieutenant", abbr: "LT", timeToAchieve: "~4 years TIS", description: "Department head or OIC. Direct supervision of multiple work centers.", monthlyPay: "$4,836" },
    { grade: "O-4", title: "Lieutenant Commander", abbr: "LCDR", timeToAchieve: "~10 years TIS (competitive)", description: "Executive officer of a small ship or senior department head position.", monthlyPay: "$5,776" },
    { grade: "O-5", title: "Commander", abbr: "CDR", timeToAchieve: "~16 years TIS (competitive)", description: "Commanding officer of a destroyer or submarine.", monthlyPay: "$6,759" },
    { grade: "O-6", title: "Captain", abbr: "CAPT", timeToAchieve: "~22 years TIS (highly competitive)", description: "Commanding officer of a major warship or large shore command.", monthlyPay: "$8,106" },
  ],
  marines: [
    { grade: "O-1", title: "Second Lieutenant", abbr: "2ndLt", timeToAchieve: "At commission", description: "Platoon commander. Leads 44 Marines in infantry or equivalent in other MOSs.", monthlyPay: "$3,637" },
    { grade: "O-2", title: "First Lieutenant", abbr: "1stLt", timeToAchieve: "~18 months TIS", description: "Executive officer of a platoon or company-level staff officer.", monthlyPay: "$4,188" },
    { grade: "O-3", title: "Captain", abbr: "Capt", timeToAchieve: "~4 years TIS", description: "Company commander. Leads 178 Marines in ground combat or equivalent.", monthlyPay: "$4,836" },
    { grade: "O-4", title: "Major", abbr: "Maj", timeToAchieve: "~10 years TIS (competitive)", description: "Battalion staff officer or executive officer. Senior Marine in planning roles.", monthlyPay: "$5,776" },
    { grade: "O-5", title: "Lieutenant Colonel", abbr: "LtCol", timeToAchieve: "~16 years TIS (competitive)", description: "Battalion commander. Leads 1,000 Marines.", monthlyPay: "$6,759" },
    { grade: "O-6", title: "Colonel", abbr: "Col", timeToAchieve: "~22 years TIS (highly competitive)", description: "Regiment or group commander. Responsible for 3,000+ Marines.", monthlyPay: "$8,106" },
  ],
  coast_guard: [
    { grade: "O-1", title: "Ensign", abbr: "ENS", timeToAchieve: "At commission", description: "Officer of the Deck on a cutter. Responsible for navigation and crew operations.", monthlyPay: "$3,637" },
    { grade: "O-2", title: "Lieutenant Junior Grade", abbr: "LTJG", timeToAchieve: "~18 months TIS", description: "Division officer or department head trainee. Taking on additional operational duties.", monthlyPay: "$4,188" },
    { grade: "O-3", title: "Lieutenant", abbr: "LT", timeToAchieve: "~4 years TIS", description: "Department head. Commanding officer of small boats and stations.", monthlyPay: "$4,836" },
    { grade: "O-4", title: "Lieutenant Commander", abbr: "LCDR", timeToAchieve: "~10 years TIS (competitive)", description: "XO of a medium cutter or sector staff position.", monthlyPay: "$5,776" },
    { grade: "O-5", title: "Commander", abbr: "CDR", timeToAchieve: "~16 years TIS (competitive)", description: "Commanding officer of a 270-foot cutter or sector command.", monthlyPay: "$6,759" },
    { grade: "O-6", title: "Captain", abbr: "CAPT", timeToAchieve: "~22 years TIS (highly competitive)", description: "District commander or major cutter CO. Senior leadership roles.", monthlyPay: "$8,106" },
  ],
  space_force: [
    { grade: "O-1", title: "Second Lieutenant", abbr: "2d Lt", timeToAchieve: "At commission", description: "Entry-level Guardian officer. Satellite operations, cyber, or intelligence roles.", monthlyPay: "$3,637" },
    { grade: "O-2", title: "First Lieutenant", abbr: "1st Lt", timeToAchieve: "~18 months TIS", description: "Gaining operational experience. Space operations or technical staff roles.", monthlyPay: "$4,188" },
    { grade: "O-3", title: "Captain", abbr: "Capt", timeToAchieve: "~4 years TIS", description: "Flight commander or staff captain. Leading small teams in space ops.", monthlyPay: "$4,836" },
    { grade: "O-4", title: "Major", abbr: "Maj", timeToAchieve: "~10 years TIS (competitive)", description: "Squadron or wing-level staff. Advanced education expected.", monthlyPay: "$5,776" },
    { grade: "O-5", title: "Lieutenant Colonel", abbr: "Lt Col", timeToAchieve: "~16 years TIS (competitive)", description: "Squadron commander level in the Space Force.", monthlyPay: "$6,759" },
    { grade: "O-6", title: "Colonel", abbr: "Col", timeToAchieve: "~22 years TIS (highly competitive)", description: "Delta commander. Leading a major Space Force unit.", monthlyPay: "$8,106" },
  ],
};

const BRANCHES: Branch[] = ["army", "navy", "air_force", "marines", "coast_guard", "space_force"];

export default function PromotionPathPlanner() {
  const [branch, setBranch] = useState<Branch>("air_force");
  const [track, setTrack] = useState<Track>("enlisted");
  const [activeNode, setActiveNode] = useState(0);

  const path = track === "enlisted" ? ENLISTED_PATHS[branch] : OFFICER_PATHS[branch];
  const node = path[activeNode];

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-navy-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-base font-bold text-text-primary">Promotion Path Planner</h3>
          <p className="mt-0.5 text-xs text-text-tertiary">Typical promotion timeline. Click any rank to see details.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-navy-border bg-navy overflow-hidden text-xs font-semibold" role="group" aria-label="Track selector">
            <button
              onClick={() => { setTrack("enlisted"); setActiveNode(0); }}
              aria-pressed={track === "enlisted"}
              className={`px-3 py-1.5 transition-colors ${track === "enlisted" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}
            >
              Enlisted
            </button>
            <button
              onClick={() => { setTrack("officer"); setActiveNode(0); }}
              aria-pressed={track === "officer"}
              className={`px-3 py-1.5 transition-colors ${track === "officer" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}
            >
              Officers
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Branch selector */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select branch">
          {BRANCHES.map((b) => (
            <button
              key={b}
              onClick={() => { setBranch(b); setActiveNode(0); }}
              aria-pressed={branch === b}
              aria-label={`${BRANCH_LABELS[b]}${branch === b ? ", selected" : ""}`}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                branch === b
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-navy-border bg-navy text-text-secondary hover:border-navy-lighter hover:text-text-primary"
              }`}
            >
              {BRANCH_LABELS[b]}
            </button>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative overflow-x-auto pb-2">
          <div className="flex min-w-max items-center gap-0">
            {path.map((n, i) => (
              <div key={n.grade} className="flex items-center">
                {/* Node */}
                <button
                  onClick={() => setActiveNode(i)}
                  aria-label={`${n.grade} ${n.title}${i === activeNode ? ", selected" : ""}`}
                  aria-pressed={i === activeNode}
                  className="group flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-200 ${
                    i === activeNode
                      ? "border-accent bg-accent text-white scale-110"
                      : i < activeNode
                      ? "border-accent/50 bg-accent/20 text-accent"
                      : "border-navy-lighter bg-navy text-text-tertiary group-hover:border-accent/40 group-hover:text-text-secondary"
                  }`}>
                    {n.abbr.split("/")[0].length <= 4 ? n.abbr.split("/")[0] : n.grade}
                  </div>
                  <span className={`text-[10px] font-semibold transition-colors ${
                    i === activeNode ? "text-accent" : "text-text-tertiary"
                  }`}>
                    {n.grade}
                  </span>
                </button>
                {/* Connector */}
                {i < path.length - 1 && (
                  <div className={`h-0.5 w-8 sm:w-12 transition-colors ${i < activeNode ? "bg-accent/50" : "bg-navy-lighter"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active node detail */}
        {node && (
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4" style={{ animation: "fadeIn 0.15s ease-out" }}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-accent">{node.grade}</span>
                  <span className="font-display text-lg font-semibold text-text-primary">{node.title}</span>
                  <span className="rounded-md bg-navy px-2 py-0.5 font-mono text-[10px] text-text-tertiary border border-navy-border">{node.abbr}</span>
                </div>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{node.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] text-text-tertiary">Base pay</p>
                <p className="font-mono text-lg font-bold text-text-primary">{node.monthlyPay}<span className="text-xs text-text-tertiary">/mo</span></p>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-navy-border bg-navy px-3 py-1.5 text-xs text-text-secondary">
              <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 1v5l3 2" />
                <circle cx="6" cy="6" r="5" />
              </svg>
              {node.timeToAchieve}
            </div>
          </div>
        )}

        <p className="text-[11px] text-text-tertiary italic">
          Timelines are typical, not guaranteed. Promotion rates vary by branch, MOS/AFSC/rating, and year group. Competitive promotions depend on performance, test scores, and availability.
        </p>
      </div>
    </div>
  );
}
