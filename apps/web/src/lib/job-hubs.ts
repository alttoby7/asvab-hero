import type { Branch, MilitaryJob } from "@/types";
import type { RelatedLink } from "@/components/RelatedLinks";
import navyJobsRaw from "@/data/navy-jobs.json";
import armyJobsRaw from "@/data/army-jobs.json";
import marinesJobsRaw from "@/data/marines-jobs.json";
import coastGuardJobsRaw from "@/data/coast-guard-jobs.json";
import spaceForceJobsRaw from "@/data/space-force-jobs.json";
import airForceJobsRaw from "@/data/air-force-jobs.json";

/**
 * Single source of truth for the "jobs by ASVAB score" hub pages (one per
 * branch). Each hub is a thin page shell that imports its config here and
 * renders the shared <JobScoreTable>. Only the per-branch curated prose +
 * score-system explainer live in the page itself; everything structural
 * (data, calculator funnel, related links, head term) is declared here so the
 * other five branches replicate cheaply.
 *
 * scoreSystem keys the explainer block + how the table reads:
 *   navy-composite : named composites (VE+AR+MK+MC ...), AND/OR via
 *                    requirements / anyOf. Sums of standard scores. (live)
 *   army-line / marine-line : line scores (GT, CL, EL, MM ...), same data shape.
 *   mage           : Air Force / Space Force 4-area aptitude; many AFSCs have no
 *                    public numeric cutoff (render honestly, never invent one).
 *   cg-composite   : Coast Guard, Navy-like composites.
 */
export type ScoreSystem =
  | "navy-composite"
  | "army-line"
  | "marine-line"
  | "mage"
  | "cg-composite";

export type JobHub = {
  branch: Branch;
  route: string;
  /** navy-jobs.json with `branch` attached (JSON omits branch). */
  jobs: MilitaryJob[];
  scoreSystem: ScoreSystem;
  calculatorHref: string;
  branchAfqtHref: string;
  scoreExplainerHref: string;
  related: RelatedLink[];
  /** Head keyword fragment, e.g. "Navy ASVAB Score Chart". */
  titleHead: string;
};

/** Attach `branch` to a branch JSON file (the JSON itself omits it). */
function withBranch(raw: unknown[], branch: Branch): MilitaryJob[] {
  return (raw as Omit<MilitaryJob, "branch">[]).map(
    (j) => ({ ...j, branch }) as MilitaryJob,
  );
}

export const navyHub: JobHub = {
  branch: "navy",
  route: "/navy-ratings-list",
  jobs: withBranch(navyJobsRaw, "navy"),
  scoreSystem: "navy-composite",
  calculatorHref: "/navy-asvab-score-calculator",
  branchAfqtHref: "/navy-afqt-calculator",
  scoreExplainerHref: "/afqt-score",
  titleHead: "Navy ASVAB Score Chart",
  related: [
    {
      href: "/navy-asvab-score",
      label: "Navy ASVAB Score Requirements",
      blurb: "Minimum AFQT and line scores to enlist in the Navy.",
    },
    {
      href: "/navy-asvab-score-calculator",
      label: "Navy ASVAB Score Calculator",
      blurb: "Enter your subtest scores to see the ratings you qualify for.",
    },
    {
      href: "/what-jobs-qualify-asvab-score",
      label: "What Jobs Qualify for Your ASVAB Score",
      blurb: "Match your AFQT and line scores to jobs across every branch.",
    },
    {
      href: "/navy-afqt-calculator",
      label: "Navy AFQT Calculator",
      blurb: "Estimate the AFQT percentile the Navy uses to qualify you.",
    },
    {
      href: "/navy-ranks",
      label: "Navy Ranks Guide",
      blurb: "How ratings map to rate, rank, and pay.",
    },
  ],
};

export const armyHub: JobHub = {
  branch: "army",
  route: "/army-mos-list",
  jobs: withBranch(armyJobsRaw, "army"),
  scoreSystem: "army-line",
  calculatorHref: "/army-asvab-calculator",
  branchAfqtHref: "/army-afqt-calculator",
  scoreExplainerHref: "/gt-score",
  titleHead: "Army ASVAB Score Chart",
  related: [
    {
      href: "/army-asvab-score",
      label: "Army ASVAB Score Requirements",
      blurb: "Minimum AFQT and the line scores you need to enlist in the Army.",
    },
    {
      href: "/army-asvab-calculator",
      label: "Army ASVAB Score Calculator",
      blurb: "Enter your subtest scores to see the MOSs you qualify for.",
    },
    {
      href: "/what-jobs-qualify-asvab-score",
      label: "What Jobs Qualify for Your ASVAB Score",
      blurb: "Match your AFQT and line scores to jobs across every branch.",
    },
    {
      href: "/gt-score",
      label: "GT Score Explained",
      blurb: "The Army's most important line score and how to raise it.",
    },
    {
      href: "/army-ranks",
      label: "Army Ranks Guide",
      blurb: "How enlisted MOSs map to rank, grade, and pay.",
    },
  ],
};

export const marinesHub: JobHub = {
  branch: "marines",
  route: "/usmc-mos-list",
  jobs: withBranch(marinesJobsRaw, "marines"),
  scoreSystem: "marine-line",
  calculatorHref: "/marines-asvab-calculator",
  branchAfqtHref: "/marines-afqt-calculator",
  scoreExplainerHref: "/marines-asvab-score",
  titleHead: "Marine Corps ASVAB Score Chart",
  related: [
    {
      href: "/marines-asvab-score",
      label: "Marine Corps ASVAB Score Requirements",
      blurb: "Minimum AFQT and the GT/EL/MM/CL/ST line scores to enlist.",
    },
    {
      href: "/marines-asvab-calculator",
      label: "Marine Corps ASVAB Calculator",
      blurb: "Enter your subtest scores to see the MOS you qualify for.",
    },
    {
      href: "/what-jobs-qualify-asvab-score",
      label: "What Jobs Qualify for Your ASVAB Score",
      blurb: "Match your AFQT and line scores to jobs across every branch.",
    },
    {
      href: "/marines-afqt-calculator",
      label: "Marine Corps AFQT Calculator",
      blurb: "Estimate the AFQT percentile the Marines use to qualify you.",
    },
    {
      href: "/asvab-score-chart",
      label: "ASVAB Score Chart",
      blurb: "How each ASVAB subtest feeds into the line-score composites.",
    },
  ],
};

export const coastGuardHub: JobHub = {
  branch: "coast_guard",
  route: "/coast-guard-ratings-list",
  jobs: withBranch(coastGuardJobsRaw, "coast_guard"),
  scoreSystem: "cg-composite",
  calculatorHref: "/coast-guard-asvab-calculator",
  branchAfqtHref: "/afqt-calculator",
  scoreExplainerHref: "/coast-guard-asvab-score",
  titleHead: "Coast Guard ASVAB Score Chart",
  related: [
    {
      href: "/coast-guard-asvab-score",
      label: "Coast Guard ASVAB Score Requirements",
      blurb: "Minimum AFQT and the subtest-sum formula for every Coast Guard rating.",
    },
    {
      href: "/coast-guard-asvab-calculator",
      label: "Coast Guard ASVAB Calculator",
      blurb: "Enter your subtest scores to see the ratings you qualify for.",
    },
    {
      href: "/what-jobs-qualify-asvab-score",
      label: "What Jobs Qualify for Your ASVAB Score",
      blurb: "Match your AFQT and subtest scores to jobs across every branch.",
    },
    {
      href: "/afqt-calculator",
      label: "AFQT Calculator",
      blurb: "Check the AFQT percentile the Coast Guard uses to qualify you.",
    },
    {
      href: "/asvab-score-chart",
      label: "ASVAB Score Chart",
      blurb: "How each ASVAB subtest feeds into every branch's score formulas.",
    },
  ],
};

export const spaceForceHub: JobHub = {
  branch: "space_force",
  route: "/space-force-afsc-list",
  jobs: withBranch(spaceForceJobsRaw, "space_force"),
  scoreSystem: "mage",
  calculatorHref: "/space-force-asvab-calculator",
  branchAfqtHref: "/afqt-calculator",
  scoreExplainerHref: "/air-force-mage-score",
  titleHead: "Space Force ASVAB Score Chart",
  related: [
    {
      href: "/space-force-asvab-calculator",
      label: "Space Force ASVAB Calculator",
      blurb: "Enter your subtest scores to see your MAGE composites and every Guardian AFSC.",
    },
    {
      href: "/air-force-mage-score",
      label: "MAGE Composite Scores Explained",
      blurb: "How Mechanical, Administrative, General, and Electronics scores are built.",
    },
    {
      href: "/what-jobs-qualify-asvab-score",
      label: "What Jobs Qualify for Your ASVAB Score",
      blurb: "Match your AFQT and composite scores to jobs across every branch.",
    },
    {
      href: "/afqt-calculator",
      label: "AFQT Calculator",
      blurb: "Check the AFQT percentile the Space Force uses to qualify you.",
    },
    {
      href: "/air-force-asvab-calculator",
      label: "Air Force ASVAB Calculator",
      blurb: "The same MAGE system, every AFSC and its score requirement.",
    },
  ],
};

export const airForceHub: JobHub = {
  branch: "air_force",
  route: "/air-force-afsc-list",
  jobs: withBranch(airForceJobsRaw, "air_force"),
  scoreSystem: "mage",
  calculatorHref: "/air-force-asvab-calculator",
  branchAfqtHref: "/air-force-afqt-calculator",
  scoreExplainerHref: "/air-force-mage-score",
  titleHead: "Air Force ASVAB Score Chart",
  related: [
    {
      href: "/air-force-asvab-score",
      label: "Air Force ASVAB Score Requirements",
      blurb: "Minimum AFQT and how the four MAGE composites gate every AFSC.",
    },
    {
      href: "/air-force-asvab-calculator",
      label: "Air Force ASVAB Calculator",
      blurb: "Enter your subtest scores to see your MAGE composites and every AFSC.",
    },
    {
      href: "/what-jobs-qualify-asvab-score",
      label: "What Jobs Qualify for Your ASVAB Score",
      blurb: "Match your AFQT and composite scores to jobs across every branch.",
    },
    {
      href: "/air-force-afqt-calculator",
      label: "Air Force AFQT Calculator",
      blurb: "Estimate the AFQT percentile the Air Force uses to qualify you.",
    },
    {
      href: "/space-force-asvab-calculator",
      label: "Space Force ASVAB Calculator",
      blurb: "The same MAGE system, every Guardian AFSC and its score.",
    },
  ],
};

/**
 * Lowest non-zero line-score barrier and highest barrier across a hub's jobs,
 * plus the count, driven from the data (never hardcode). minScore 0 (e.g. the
 * audition-gated Navy Musician) is excluded from the "lowest" figure.
 */
export function hubScoreStats(jobs: MilitaryJob[]): {
  count: number;
  lowest: { code: string; title: string; composite: string; minScore: number } | null;
  highest: { code: string; title: string; composite: string; minScore: number } | null;
} {
  let lowest: ReturnType<typeof hubScoreStats>["lowest"] = null;
  let highest: ReturnType<typeof hubScoreStats>["highest"] = null;
  for (const job of jobs) {
    const reqs = job.requirements?.length ? job.requirements : (job.anyOf ?? []);
    for (const r of reqs) {
      if (r.minScore > 0 && (!lowest || r.minScore < lowest.minScore)) {
        lowest = { code: job.code, title: job.title, composite: r.composite, minScore: r.minScore };
      }
      if (!highest || r.minScore > highest.minScore) {
        highest = { code: job.code, title: job.title, composite: r.composite, minScore: r.minScore };
      }
    }
  }
  return { count: jobs.length, lowest, highest };
}
