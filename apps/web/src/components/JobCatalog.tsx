"use client";

import Link from "next/link";
import type { MilitaryJob, Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";
import { trackEvent } from "@/lib/analytics";

/**
 * Catalog of every military job and its ASVAB requirements.
 *
 * All jobs render into the static HTML (client components are prerendered in the
 * static export), so search + AI crawlers index the full list + requirements +
 * descriptions with no interaction. On top of that, it captures ANONYMOUS
 * interest, no login needed:
 *   • `catalog_job_open`   when a visitor expands a job (branch, code, title)
 *   • `catalog_branch_jump` when they use the jump-to-branch nav
 * That's the per-job interest signal we otherwise can't see (jobs aren't pages).
 */

const BRANCH_ORDER: Branch[] = [
  "army",
  "air_force",
  "marines",
  "navy",
  "coast_guard",
  "space_force",
];

function reqLabel(job: MilitaryJob): string {
  const parts: string[] = [];
  if (typeof job.minAFQT === "number") parts.push(`AFQT ${job.minAFQT}+`);
  for (const r of job.requirements ?? []) {
    parts.push(`${r.composite} ${r.minScore}+`);
  }
  if ((!job.requirements || job.requirements.length === 0) && job.anyOf?.length) {
    parts.push(job.anyOf.map((r) => `${r.composite} ${r.minScore}+`).join(" or "));
  }
  return parts.join(" · ") || "See branch requirements";
}

function JobRow({ job }: { job: MilitaryJob }) {
  return (
    <details
      className="group/job px-3 py-1"
      onToggle={(e) => {
        if (!(e.currentTarget as HTMLDetailsElement).open) return;
        trackEvent("catalog_job_open", {
          job_branch: job.branch,
          job_code: job.code,
          job_title: job.title,
          job_category: job.category,
        });
      }}
    >
      <summary className="flex cursor-pointer flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-1.5 marker:content-['']">
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="font-mono text-xs font-bold text-accent">
            {job.code}
          </span>
          <span className="text-sm text-text-primary">{job.title}</span>
          <span className="truncate text-xs text-text-tertiary">
            {job.category}
          </span>
        </span>
        <span className="font-mono text-xs text-text-secondary">
          {reqLabel(job)}
        </span>
      </summary>
      <div className="pb-2 pl-1 text-xs text-text-tertiary">
        {job.description && <p>{job.description}</p>}
        <p className="mt-1">
          Requirements: <span className="text-text-secondary">{reqLabel(job)}</span>
        </p>
        <Link
          href="/calculator"
          className="mt-1 inline-block text-accent underline-offset-2 hover:underline"
        >
          See if you qualify →
        </Link>
      </div>
    </details>
  );
}

export default function JobCatalog({ jobs }: { jobs: MilitaryJob[] }) {
  const byBranch = BRANCH_ORDER.map((branch) => ({
    branch,
    jobs: jobs
      .filter((j) => j.branch === branch)
      .sort((a, b) => a.code.localeCompare(b.code)),
  })).filter((g) => g.jobs.length > 0);

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-text-primary">
        All military jobs and their ASVAB score requirements
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        Browse every enlisted job across all six branches and the minimum AFQT
        and line/composite scores each one requires, no scores needed. Tap any
        job for details, or enter your scores above to see which you qualify for.
      </p>

      {/* Jump-to-branch nav */}
      <nav aria-label="Jump to branch" className="mt-5 flex flex-wrap gap-2">
        {byBranch.map(({ branch, jobs: branchJobs }) => (
          <a
            key={branch}
            href={`#jobs-${branch}`}
            onClick={() => trackEvent("catalog_branch_jump", { job_branch: branch })}
            className="rounded-md border border-navy-border bg-navy px-3 py-1.5 text-xs font-medium text-text-secondary no-underline transition-colors hover:border-accent/40 hover:text-text-primary"
          >
            {BRANCH_NAMES[branch]}{" "}
            <span className="text-text-tertiary">({branchJobs.length})</span>
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-3">
        {byBranch.map(({ branch, jobs: branchJobs }) => (
          <details
            key={branch}
            id={`jobs-${branch}`}
            open
            className="group scroll-mt-24 rounded-xl border border-navy-border bg-navy-light"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 font-display text-base font-semibold text-text-primary marker:content-['']">
              <span>{BRANCH_NAMES[branch]}</span>
              <span className="text-xs font-normal text-text-tertiary">
                {branchJobs.length} jobs
                <span className="ml-2 inline-block transition-transform group-open:rotate-180">
                  ▾
                </span>
              </span>
            </summary>
            <div className="border-t border-navy-border px-2 pb-2">
              <ul className="divide-y divide-navy-border/60">
                {branchJobs.map((job) => (
                  <li key={job.id}>
                    <JobRow job={job} />
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
