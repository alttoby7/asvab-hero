// Single source of truth for the calculator cluster's internal-link graph.
//
// Powers three surfaces so they can't drift:
//   1. The homepage "Jump to a specific calculator" block (curated 8 of 17).
//   2. The /calculator hub's full grouped directory (all 17).
//   3. The on-page <RelatedCalculators> block at the bottom of each spoke (4 links).
//
// Why this exists: the homepage out-ranks its own calculator spokes because the
// spokes are link-thin. A consistent, capped, cluster-driven link graph pushes
// internal authority down to the buried spokes without footer/nav bloat or
// doorway-page link dumps. Every href must be a real route in
// scripts/generate-sitemap.mjs (no trailing slash).

export type CalcGroup = "core" | "branch-full" | "branch-afqt" | "utility";
export type Branch =
  | "army"
  | "navy"
  | "air-force"
  | "marines"
  | "coast-guard"
  | "space-force";

export type CalculatorEntry = {
  href: string;
  label: string;
  group: CalcGroup;
  branch?: Branch;
  /** Short, plain description used in directory + related cards. */
  blurb: string;
  /** Up to 4 sibling hrefs, ordered by relevance. Drives <RelatedCalculators>. */
  related: string[];
};

// The 17 calculator spokes (the /calculator hub is the directory, not a spoke).
export const CALCULATORS: CalculatorEntry[] = [
  // ── Core scoring ──────────────────────────────────────────────────────────
  {
    href: "/afqt-calculator",
    label: "AFQT Calculator",
    group: "core",
    blurb: "Your enlistment-eligibility percentile from the 4 AFQT subtests.",
    related: [
      "/gt-score-calculator",
      "/asvab-line-score-calculator",
      "/asvab-composite-score-calculator",
      "/asvab-score-converter",
    ],
  },
  {
    href: "/gt-score-calculator",
    label: "GT Score Calculator",
    group: "core",
    blurb: "The General Technical line score that gates the most Army MOSs.",
    related: [
      "/afqt-calculator",
      "/asvab-line-score-calculator",
      "/asvab-composite-score-calculator",
      "/army-asvab-calculator",
    ],
  },
  {
    href: "/asvab-line-score-calculator",
    label: "Line Score Calculator",
    group: "core",
    blurb: "Every Army/branch composite line score from your subtest scores.",
    related: [
      "/asvab-composite-score-calculator",
      "/gt-score-calculator",
      "/afqt-calculator",
      "/army-asvab-calculator",
    ],
  },
  {
    href: "/asvab-composite-score-calculator",
    label: "Composite Score Calculator",
    group: "core",
    blurb: "All branch composite formulas computed side by side.",
    related: [
      "/asvab-line-score-calculator",
      "/gt-score-calculator",
      "/afqt-calculator",
      "/asvab-score-converter",
    ],
  },
  // ── Branch (full) calculators ─────────────────────────────────────────────
  {
    href: "/army-asvab-calculator",
    label: "Army ASVAB Calculator",
    group: "branch-full",
    branch: "army",
    blurb: "Your AFQT, all 10 Army line scores, and every MOS you qualify for.",
    related: [
      "/army-afqt-calculator",
      "/calculator",
      "/navy-asvab-score-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/navy-asvab-score-calculator",
    label: "Navy ASVAB Calculator",
    group: "branch-full",
    branch: "navy",
    blurb: "Your AFQT, Navy line scores, and every rating you qualify for.",
    related: [
      "/navy-afqt-calculator",
      "/calculator",
      "/army-asvab-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/air-force-asvab-calculator",
    label: "Air Force ASVAB Calculator",
    group: "branch-full",
    branch: "air-force",
    blurb: "Your AFQT, the 4 MAGE composites, and every AFSC you qualify for.",
    related: [
      "/air-force-afqt-calculator",
      "/calculator",
      "/space-force-asvab-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/marines-asvab-calculator",
    label: "Marines ASVAB Calculator",
    group: "branch-full",
    branch: "marines",
    blurb: "Your AFQT, the 3 Marine line scores, and every MOS you qualify for.",
    related: [
      "/marines-afqt-calculator",
      "/calculator",
      "/army-asvab-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/coast-guard-asvab-calculator",
    label: "Coast Guard ASVAB Calculator",
    group: "branch-full",
    branch: "coast-guard",
    blurb: "Your AFQT, Coast Guard composites, and every rating you qualify for.",
    related: [
      "/navy-asvab-score-calculator",
      "/calculator",
      "/afqt-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/space-force-asvab-calculator",
    label: "Space Force ASVAB Calculator",
    group: "branch-full",
    branch: "space-force",
    blurb: "Your AFQT, the 4 MAGE composites, and every Guardian AFSC and its score.",
    related: [
      "/air-force-asvab-calculator",
      "/calculator",
      "/afqt-calculator",
      "/asvab-retake-calculator",
    ],
  },
  // ── Branch AFQT calculators ───────────────────────────────────────────────
  {
    href: "/army-afqt-calculator",
    label: "Army AFQT Calculator",
    group: "branch-afqt",
    branch: "army",
    blurb: "The AFQT percentile the Army needs, with its enlistment floor.",
    related: [
      "/army-asvab-calculator",
      "/afqt-calculator",
      "/navy-afqt-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/navy-afqt-calculator",
    label: "Navy AFQT Calculator",
    group: "branch-afqt",
    branch: "navy",
    blurb: "The AFQT percentile the Navy needs, with its enlistment floor.",
    related: [
      "/navy-asvab-score-calculator",
      "/afqt-calculator",
      "/army-afqt-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/air-force-afqt-calculator",
    label: "Air Force AFQT Calculator",
    group: "branch-afqt",
    branch: "air-force",
    blurb: "The AFQT percentile the Air Force needs, diploma vs GED.",
    related: [
      "/air-force-asvab-calculator",
      "/afqt-calculator",
      "/marines-afqt-calculator",
      "/asvab-retake-calculator",
    ],
  },
  {
    href: "/marines-afqt-calculator",
    label: "Marines AFQT Calculator",
    group: "branch-afqt",
    branch: "marines",
    blurb: "The AFQT percentile the Marine Corps needs to enlist.",
    related: [
      "/calculator",
      "/afqt-calculator",
      "/air-force-afqt-calculator",
      "/asvab-retake-calculator",
    ],
  },
  // ── Utilities ─────────────────────────────────────────────────────────────
  {
    href: "/asvab-retake-calculator",
    label: "Retake Date Calculator",
    group: "utility",
    blurb: "When you're eligible to retest under the ASVAB retake rules.",
    related: [
      "/afqt-calculator",
      "/calculator",
      "/asvab-score-converter",
      "/army-asvab-calculator",
    ],
  },
  {
    href: "/asvab-score-converter",
    label: "ASVAB Score Converter",
    group: "utility",
    blurb: "Convert subtest standard scores into AFQT and line scores.",
    related: [
      "/afqt-calculator",
      "/gt-score-calculator",
      "/calculator",
      "/asvab-retake-calculator",
    ],
  },
];

const BY_HREF: Record<string, CalculatorEntry> = Object.fromEntries(
  CALCULATORS.map((c) => [c.href, c])
);

/** Look up a single calculator by its route. */
export function getCalculator(href: string): CalculatorEntry | undefined {
  return BY_HREF[href];
}

/** A uniform link shape for the related block (covers spokes + the hub). */
export type RelatedLink = { href: string; label: string; blurb: string };

/** The hub link, surfaced explicitly because it has no spoke entry. */
export const CALCULATOR_HUB: RelatedLink = {
  href: "/calculator",
  label: "All-Branch ASVAB Calculator",
  blurb: "Every branch, every score, side by side.",
};

/**
 * Resolve a calculator's `related` hrefs to uniform links, including the
 * /calculator hub (which has no spoke entry). Order is preserved and the cap of
 * 4 is whatever the taxonomy declares. Used by <RelatedCalculators>.
 */
export function relatedLinksFor(href: string): RelatedLink[] {
  const entry = BY_HREF[href];
  if (!entry) return [];
  return entry.related
    .map((h): RelatedLink | undefined => {
      if (h === CALCULATOR_HUB.href) return CALCULATOR_HUB;
      const e = BY_HREF[h];
      return e ? { href: e.href, label: e.label, blurb: e.blurb } : undefined;
    })
    .filter((l): l is RelatedLink => Boolean(l));
}

// Ordered groups for the /calculator hub's full directory.
export const DIRECTORY_GROUPS: { title: string; group: CalcGroup }[] = [
  { title: "Core scoring", group: "core" },
  { title: "Branch calculators", group: "branch-full" },
  { title: "Branch AFQT", group: "branch-afqt" },
  { title: "Utilities", group: "utility" },
];

export function calculatorsInGroup(group: CalcGroup): CalculatorEntry[] {
  return CALCULATORS.filter((c) => c.group === group);
}

// The 8 spokes featured on the homepage (curated, not all 17). The homepage
// also links "See all calculators" → /calculator for the rest.
export const HOMEPAGE_FEATURED: string[] = [
  "/afqt-calculator",
  "/gt-score-calculator",
  "/asvab-line-score-calculator",
  "/asvab-composite-score-calculator",
  "/army-asvab-calculator",
  "/navy-asvab-score-calculator",
  "/air-force-asvab-calculator",
  "/asvab-retake-calculator",
];

export function homepageFeatured(): CalculatorEntry[] {
  return HOMEPAGE_FEATURED.map((h) => BY_HREF[h]).filter(Boolean);
}
