import { Suspense } from "react";
import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import type { MilitaryJob } from "@/types";

import armyJobs from "@/data/army-jobs.json";
import airForceJobs from "@/data/air-force-jobs.json";
import marinesJobs from "@/data/marines-jobs.json";
import navyJobs from "@/data/navy-jobs.json";
import coastGuardJobs from "@/data/coast-guard-jobs.json";
import spaceForceJobs from "@/data/space-force-jobs.json";

export const metadata: Metadata = {
  title: "Free ASVAB Score Calculator — See Every Job You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores and instantly see your AFQT percentile, composite line scores, and every military job you qualify for across all 6 branches.",
  alternates: {
    canonical: "https://asvabhero.com/calculator",
  },
};

function addBranch(
  jobs: Record<string, unknown>[],
  branch: MilitaryJob["branch"]
): MilitaryJob[] {
  return jobs.map((j) => ({ ...j, branch }) as MilitaryJob);
}

const allJobs: MilitaryJob[] = [
  ...addBranch(armyJobs, "army"),
  ...addBranch(airForceJobs, "air_force"),
  ...addBranch(marinesJobs, "marines"),
  ...addBranch(navyJobs, "navy"),
  ...addBranch(coastGuardJobs, "coast_guard"),
  ...addBranch(spaceForceJobs, "space_force"),
];

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ASVAB Score Calculator",
          url: "https://asvabhero.com/calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Enter your 9 ASVAB subtest scores and instantly see your AFQT percentile, composite scores, and qualifying military jobs across all 6 branches.",
        }}
      />
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Score Calculator
        </h1>
        <p className="mt-2 text-text-secondary">
          Enter your 9 subtest standard scores to see your AFQT percentile,
          branch-specific composite scores, and every military job you qualify
          for.
        </p>
      </div>
      <Suspense>
        <Calculator allJobs={allJobs} />
      </Suspense>
    </div>
  );
}
