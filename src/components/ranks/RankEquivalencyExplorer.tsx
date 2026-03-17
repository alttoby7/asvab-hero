"use client";

import { useState } from "react";

type Branch = "army" | "navy" | "air_force" | "marines" | "coast_guard" | "space_force";

const BRANCH_LABELS: Record<Branch, string> = {
  army: "Army",
  navy: "Navy",
  air_force: "Air Force",
  marines: "Marines",
  coast_guard: "Coast Guard",
  space_force: "Space Force",
};

// Abbreviated rank name per branch per paygrade
const ENLISTED_RANKS: Record<string, Record<Branch, { title: string; abbr: string }>> = {
  "E-1": {
    army: { title: "Private", abbr: "PVT" },
    navy: { title: "Seaman Recruit", abbr: "SR" },
    air_force: { title: "Airman Basic", abbr: "AB" },
    marines: { title: "Private", abbr: "Pvt" },
    coast_guard: { title: "Seaman Recruit", abbr: "SR" },
    space_force: { title: "Specialist 1", abbr: "Spc1" },
  },
  "E-2": {
    army: { title: "Private Second Class", abbr: "PV2" },
    navy: { title: "Seaman Apprentice", abbr: "SA" },
    air_force: { title: "Airman", abbr: "Amn" },
    marines: { title: "Private First Class", abbr: "PFC" },
    coast_guard: { title: "Seaman Apprentice", abbr: "SA" },
    space_force: { title: "Specialist 2", abbr: "Spc2" },
  },
  "E-3": {
    army: { title: "Private First Class", abbr: "PFC" },
    navy: { title: "Seaman", abbr: "SN" },
    air_force: { title: "Airman First Class", abbr: "A1C" },
    marines: { title: "Lance Corporal", abbr: "LCpl" },
    coast_guard: { title: "Seaman", abbr: "SN" },
    space_force: { title: "Specialist 3", abbr: "Spc3" },
  },
  "E-4": {
    army: { title: "Specialist / Corporal", abbr: "SPC/CPL" },
    navy: { title: "Petty Officer 3rd Class", abbr: "PO3" },
    air_force: { title: "Senior Airman", abbr: "SrA" },
    marines: { title: "Corporal", abbr: "Cpl" },
    coast_guard: { title: "Petty Officer 3rd Class", abbr: "PO3" },
    space_force: { title: "Specialist 4", abbr: "Spc4" },
  },
  "E-5": {
    army: { title: "Sergeant", abbr: "SGT" },
    navy: { title: "Petty Officer 2nd Class", abbr: "PO2" },
    air_force: { title: "Staff Sergeant", abbr: "SSgt" },
    marines: { title: "Sergeant", abbr: "Sgt" },
    coast_guard: { title: "Petty Officer 2nd Class", abbr: "PO2" },
    space_force: { title: "Sergeant", abbr: "Sgt" },
  },
  "E-6": {
    army: { title: "Staff Sergeant", abbr: "SSG" },
    navy: { title: "Petty Officer 1st Class", abbr: "PO1" },
    air_force: { title: "Technical Sergeant", abbr: "TSgt" },
    marines: { title: "Staff Sergeant", abbr: "SSgt" },
    coast_guard: { title: "Petty Officer 1st Class", abbr: "PO1" },
    space_force: { title: "Technical Sergeant", abbr: "TSgt" },
  },
  "E-7": {
    army: { title: "Sergeant First Class", abbr: "SFC" },
    navy: { title: "Chief Petty Officer", abbr: "CPO" },
    air_force: { title: "Master Sergeant / First Sergeant", abbr: "MSgt" },
    marines: { title: "Gunnery Sergeant", abbr: "GySgt" },
    coast_guard: { title: "Chief Petty Officer", abbr: "CPO" },
    space_force: { title: "Master Sergeant", abbr: "MSgt" },
  },
  "E-8": {
    army: { title: "Master Sergeant / First Sergeant", abbr: "MSG/1SG" },
    navy: { title: "Senior Chief Petty Officer", abbr: "SCPO" },
    air_force: { title: "Senior Master Sergeant / First Sergeant", abbr: "SMSgt" },
    marines: { title: "Master Sergeant / First Sergeant", abbr: "MSgt/1stSgt" },
    coast_guard: { title: "Senior Chief Petty Officer", abbr: "SCPO" },
    space_force: { title: "Senior Master Sergeant", abbr: "SMSgt" },
  },
  "E-9": {
    army: { title: "Sergeant Major / CSM / SMA", abbr: "SGM/CSM/SMA" },
    navy: { title: "Master Chief / Fleet / MCPON", abbr: "MCPO" },
    air_force: { title: "Chief Master Sergeant / CMSAF", abbr: "CMSgt" },
    marines: { title: "Master Gunnery Sgt / SgtMaj / SgtMajMC", abbr: "MGySgt" },
    coast_guard: { title: "Master Chief / Fleet / MCPOCG", abbr: "MCPO" },
    space_force: { title: "Chief Master Sergeant / CSOF", abbr: "CMSgt" },
  },
};

const OFFICER_RANKS: Record<string, Record<Branch, { title: string; abbr: string }>> = {
  "O-1": {
    army: { title: "Second Lieutenant", abbr: "2LT" },
    navy: { title: "Ensign", abbr: "ENS" },
    air_force: { title: "Second Lieutenant", abbr: "2d Lt" },
    marines: { title: "Second Lieutenant", abbr: "2ndLt" },
    coast_guard: { title: "Ensign", abbr: "ENS" },
    space_force: { title: "Second Lieutenant", abbr: "2d Lt" },
  },
  "O-2": {
    army: { title: "First Lieutenant", abbr: "1LT" },
    navy: { title: "Lieutenant Junior Grade", abbr: "LTJG" },
    air_force: { title: "First Lieutenant", abbr: "1st Lt" },
    marines: { title: "First Lieutenant", abbr: "1stLt" },
    coast_guard: { title: "Lieutenant Junior Grade", abbr: "LTJG" },
    space_force: { title: "First Lieutenant", abbr: "1st Lt" },
  },
  "O-3": {
    army: { title: "Captain", abbr: "CPT" },
    navy: { title: "Lieutenant", abbr: "LT" },
    air_force: { title: "Captain", abbr: "Capt" },
    marines: { title: "Captain", abbr: "Capt" },
    coast_guard: { title: "Lieutenant", abbr: "LT" },
    space_force: { title: "Captain", abbr: "Capt" },
  },
  "O-4": {
    army: { title: "Major", abbr: "MAJ" },
    navy: { title: "Lieutenant Commander", abbr: "LCDR" },
    air_force: { title: "Major", abbr: "Maj" },
    marines: { title: "Major", abbr: "Maj" },
    coast_guard: { title: "Lieutenant Commander", abbr: "LCDR" },
    space_force: { title: "Major", abbr: "Maj" },
  },
  "O-5": {
    army: { title: "Lieutenant Colonel", abbr: "LTC" },
    navy: { title: "Commander", abbr: "CDR" },
    air_force: { title: "Lieutenant Colonel", abbr: "Lt Col" },
    marines: { title: "Lieutenant Colonel", abbr: "LtCol" },
    coast_guard: { title: "Commander", abbr: "CDR" },
    space_force: { title: "Lieutenant Colonel", abbr: "Lt Col" },
  },
  "O-6": {
    army: { title: "Colonel", abbr: "COL" },
    navy: { title: "Captain", abbr: "CAPT" },
    air_force: { title: "Colonel", abbr: "Col" },
    marines: { title: "Colonel", abbr: "Col" },
    coast_guard: { title: "Captain", abbr: "CAPT" },
    space_force: { title: "Colonel", abbr: "Col" },
  },
  "O-7": {
    army: { title: "Brigadier General", abbr: "BG" },
    navy: { title: "Rear Admiral (Lower Half)", abbr: "RDML" },
    air_force: { title: "Brigadier General", abbr: "Brig Gen" },
    marines: { title: "Brigadier General", abbr: "BGen" },
    coast_guard: { title: "Rear Admiral (Lower Half)", abbr: "RDML" },
    space_force: { title: "Brigadier General", abbr: "Brig Gen" },
  },
  "O-8": {
    army: { title: "Major General", abbr: "MG" },
    navy: { title: "Rear Admiral (Upper Half)", abbr: "RADM" },
    air_force: { title: "Major General", abbr: "Maj Gen" },
    marines: { title: "Major General", abbr: "MajGen" },
    coast_guard: { title: "Rear Admiral (Upper Half)", abbr: "RADM" },
    space_force: { title: "Major General", abbr: "Maj Gen" },
  },
  "O-9": {
    army: { title: "Lieutenant General", abbr: "LTG" },
    navy: { title: "Vice Admiral", abbr: "VADM" },
    air_force: { title: "Lieutenant General", abbr: "Lt Gen" },
    marines: { title: "Lieutenant General", abbr: "LtGen" },
    coast_guard: { title: "Vice Admiral", abbr: "VADM" },
    space_force: { title: "Lieutenant General", abbr: "Lt Gen" },
  },
  "O-10": {
    army: { title: "General", abbr: "GEN" },
    navy: { title: "Admiral", abbr: "ADM" },
    air_force: { title: "General", abbr: "Gen" },
    marines: { title: "General", abbr: "Gen" },
    coast_guard: { title: "Admiral", abbr: "ADM" },
    space_force: { title: "General", abbr: "Gen" },
  },
};

const BRANCHES: Branch[] = ["army", "navy", "air_force", "marines", "coast_guard", "space_force"];
const ENLISTED_GRADES = ["E-1","E-2","E-3","E-4","E-5","E-6","E-7","E-8","E-9"];
const OFFICER_GRADES = ["O-1","O-2","O-3","O-4","O-5","O-6","O-7","O-8","O-9","O-10"];

export default function RankEquivalencyExplorer() {
  const [track, setTrack] = useState<"enlisted" | "officers">("enlisted");
  const [selected, setSelected] = useState<string>("E-4");

  const grades = track === "enlisted" ? ENLISTED_GRADES : OFFICER_GRADES;
  const data = track === "enlisted" ? ENLISTED_RANKS : OFFICER_RANKS;
  const selectedData = data[selected];

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-navy-border px-5 py-4">
        <div>
          <h3 className="font-display text-base font-bold text-text-primary">Rank Equivalency Explorer</h3>
          <p className="mt-0.5 text-xs text-text-tertiary">Same pay grade, different names. Click any grade to compare across branches.</p>
        </div>
        <div className="flex shrink-0 rounded-lg border border-navy-border bg-navy overflow-hidden text-xs font-semibold">
          <button
            onClick={() => { setTrack("enlisted"); setSelected("E-4"); }}
            className={`px-3 py-1.5 transition-colors ${track === "enlisted" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}
          >
            Enlisted
          </button>
          <button
            onClick={() => { setTrack("officers"); setSelected("O-1"); }}
            className={`px-3 py-1.5 transition-colors ${track === "officers" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}
          >
            Officers
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Grade list */}
        <div className="shrink-0 border-b border-navy-border sm:border-b-0 sm:border-r sm:w-24">
          <div className="flex flex-row sm:flex-col overflow-x-auto sm:overflow-x-visible">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setSelected(g)}
                className={`flex-shrink-0 px-4 py-2.5 sm:w-full text-left text-sm font-mono font-bold transition-colors ${
                  selected === g
                    ? "bg-accent/20 text-accent border-b-2 sm:border-b-0 sm:border-l-2 border-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-navy-lighter"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Branch grid */}
        <div className="flex-1 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-2xl font-bold text-accent">{selected}</span>
            <span className="text-xs text-text-tertiary">across all branches</span>
          </div>
          {selectedData ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {BRANCHES.map((branch) => (
                <div key={branch} className="rounded-lg bg-navy border border-navy-border px-3 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1">{BRANCH_LABELS[branch]}</p>
                  <p className="text-sm font-semibold text-text-primary leading-snug">{selectedData[branch].title}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-accent">{selectedData[branch].abbr}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-tertiary">Select a pay grade to compare.</p>
          )}
        </div>
      </div>
    </div>
  );
}
