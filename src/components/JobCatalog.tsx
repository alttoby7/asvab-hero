import type { MilitaryJob, Branch } from "@/types";
import { BRANCH_NAMES } from "@/types";

/**
 * Server-rendered catalog of every military job and its ASVAB requirements.
 *
 * This renders ALL jobs into the static HTML regardless of calculator state, so
 * search and AI crawlers can index the full job list + score requirements
 * without any client interaction (the interactive Calculator only shows jobs
 * once all 9 subtests are entered). Grouped by branch in <details> blocks —
 * collapsed for tidiness, but the content is present in the DOM either way.
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
        and line/composite scores each one requires — no scores needed. Enter
        your scores above to see exactly which of these you qualify for.
      </p>

      {/* Jump-to-branch nav */}
      <nav
        aria-label="Jump to branch"
        className="mt-5 flex flex-wrap gap-2"
      >
        {byBranch.map(({ branch, jobs: branchJobs }) => (
          <a
            key={branch}
            href={`#jobs-${branch}`}
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
                  <li
                    key={job.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3 py-2.5"
                  >
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="font-mono text-xs font-bold text-accent">
                        {job.code}
                      </span>
                      <span className="text-sm text-text-primary">
                        {job.title}
                      </span>
                      <span className="truncate text-xs text-text-tertiary">
                        {job.category}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      {reqLabel(job)}
                    </span>
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
