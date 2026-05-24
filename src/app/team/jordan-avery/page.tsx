import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AUTHOR_PERSON, AUTHOR_NAME, AUTHOR_URL } from "@/lib/author";

export const metadata: Metadata = {
  title: "Jordan Avery — Editor at ASVAB Hero",
  description:
    "Jordan Avery is the editor at ASVAB Hero, keeping every guide accurate against official DoD/ASVAB sources and the research on what actually raises scores.",
  alternates: { canonical: AUTHOR_URL },
};

const PROFILE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: "2026-05-24",
  mainEntity: AUTHOR_PERSON,
};

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={PROFILE_SCHEMA} />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        <span className="text-accent">●</span> Editorial
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        {AUTHOR_NAME}
      </h1>
      <p className="mt-1 text-sm font-semibold text-accent">Editor, ASVAB Hero</p>

      <div className="prose-asvab mt-8 space-y-5 text-text-secondary">
        <p>
          Jordan Avery is the editor at ASVAB Hero. Every calculator, score guide,
          and study article on the site is reviewed against{" "}
          <span className="text-text-primary">official primary sources</span> — the
          PAY97 AFQT norming tables the services actually use, each branch&apos;s
          published AFQT and line-score minimums, and the cognitive-science
          research on what reliably raises test scores (retrieval practice,
          spacing, and adaptive targeting).
        </p>
        <p>
          The goal is simple: tell future service members the truth about their
          numbers — what a score means, which jobs it opens, and the fastest
          honest path to a higher one — without the hype or the guesswork.
        </p>
        <p className="text-sm text-text-tertiary">
          ASVAB Hero is an independent test-prep resource and is not affiliated
          with, or endorsed by, the U.S. military or the Department of Defense.
        </p>
      </div>

      <h2 className="mt-10 font-display text-lg font-bold text-text-primary">
        What Jordan covers
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {[
          { label: "AFQT & how it's scored", href: "/afqt-score" },
          { label: "What's a good ASVAB score", href: "/what-is-a-good-asvab-score" },
          { label: "GT score & requirements", href: "/gt-score" },
          { label: "How to study for the ASVAB", href: "/how-to-study-for-the-asvab" },
          { label: "Branch score requirements", href: "/asvab-score-requirements" },
          { label: "Retaking the ASVAB", href: "/how-to-retake-the-asvab" },
        ].map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-accent underline-offset-2 hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-base font-bold text-text-primary">
          Our editorial standard
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Facts on this site are sourced to official DoD/ASVAB references and
          dated &ldquo;last verified.&rdquo; Scores you calculate here are
          estimates, never official results. Found something off?{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Tell us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
