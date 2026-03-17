import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ASVAB Resources & Study Guides",
  description:
    "Free ASVAB study guides, score explainers, and tools to help you pass and qualify for the military jobs you want.",
};

const resources = [
  {
    href: "/asvab-study-guide",
    tag: "Study Guide",
    tagColor: "bg-accent/20 text-accent",
    title: "ASVAB Study Guide 2026",
    description:
      "A free, personalized study planner for every subtest. Pick your branch and dream jobs, generate a week-by-week schedule, and track your progress with built-in checklists.",
    cta: "Build Your Study Plan",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    featured: true,
  },
  {
    href: "/asvab-scores-explained",
    tag: "Explainer",
    tagColor: "bg-success-dim text-success",
    title: "ASVAB Scores Explained",
    description:
      "What is an AFQT score? How are composites calculated? What scores do you need for each branch? Everything you need to understand your results — with interactive visualizations.",
    cta: "Understand Your Scores",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    featured: true,
  },
  {
    href: "/calculator",
    tag: "Tool",
    tagColor: "bg-navy-lighter text-text-secondary",
    title: "ASVAB Score Calculator",
    description:
      "Enter your 9 subtest scores and instantly see your AFQT percentile, all branch composite scores, and every military job you qualify for across all 6 branches.",
    cta: "Calculate Your Scores",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
    featured: false,
  },
  {
    href: "/practice-test",
    tag: "Practice Test",
    tagColor: "bg-navy-lighter text-text-secondary",
    title: "Free ASVAB Practice Test",
    description:
      "30 questions across all 9 subtests, scored instantly. See how you stack up, identify weak areas, and import your results directly into the study planner.",
    cta: "Take a Practice Test",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    featured: false,
  },
];

const quickFacts = [
  { label: "AFQT Score Range", value: "1–99", note: "Percentile vs. other test-takers" },
  { label: "Army Minimum AFQT", value: "31", note: "Diploma required" },
  { label: "Coast Guard Minimum", value: "40", note: "Highest of all branches" },
  { label: "9 Subtests", value: "~3 hrs", note: "Total testing time" },
  { label: "AFQT Subtests", value: "4 of 9", note: "AR, WK, PC, MK" },
  { label: "Jobs Unlocked", value: "500+", note: "Across all 6 branches" },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          Free Resources
        </p>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Everything You Need to Ace the ASVAB
        </h1>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Free guides, interactive tools, and practice tests — built for people
          who actually want to understand their scores and land the job they
          want.
        </p>
      </div>

      {/* Featured resources */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-tertiary">
          Guides & Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group relative flex flex-col rounded-xl border border-navy-border bg-navy-light p-6 transition-all duration-200 hover:border-accent/30 hover:bg-navy-lighter no-underline"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-text-secondary transition-colors group-hover:text-accent">
                  {r.icon}
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${r.tagColor}`}>
                  {r.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {r.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent">
                {r.cta}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick facts */}
      <section className="mb-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-tertiary">
          ASVAB Quick Reference
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickFacts.map((f) => (
            <div key={f.label} className="rounded-lg bg-navy px-3 py-3 text-center">
              <p className="font-display text-xl font-bold text-accent">{f.value}</p>
              <p className="mt-0.5 text-xs font-semibold text-text-primary">{f.label}</p>
              <p className="mt-0.5 text-[10px] text-text-tertiary">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's coming */}
      <section className="rounded-xl border border-dashed border-navy-border p-6 text-center">
        <p className="text-sm font-semibold text-text-tertiary">More Coming Soon</p>
        <p className="mt-1 text-sm text-text-secondary">
          Branch-specific job guides, MOS deep-dives, and score improvement strategies.
        </p>
      </section>
    </div>
  );
}
