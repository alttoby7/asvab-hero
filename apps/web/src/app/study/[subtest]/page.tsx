import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest } from "@/types";
import topics from "@/data/topics.seed.json";

interface PageProps {
  params: Promise<{ subtest: string }>;
}

type Topic = {
  id: string;
  subtest: string;
  slug: string;
  title: string;
  sort_order: number;
  study_guide_href: string;
};

const ALL_TOPICS = topics as Topic[];

/**
 * The seed JSON stores subtest codes uppercase (e.g. "AR") while the public URL
 * segment is lowercase (e.g. "/study/ar"). We key everything off the lowercase
 * segment and look the full name up from SUBTEST_NAMES (the single source of
 * truth for subtest display names).
 */
function distinctSubtests(): string[] {
  return Array.from(new Set(ALL_TOPICS.map((t) => t.subtest.toLowerCase())));
}

function topicsForSubtest(subtestLower: string): Topic[] {
  return ALL_TOPICS.filter((t) => t.subtest.toLowerCase() === subtestLower).sort(
    (a, b) => a.sort_order - b.sort_order
  );
}

function subtestName(subtestLower: string): string | null {
  const code = subtestLower.toUpperCase() as AsvabSubtest;
  return SUBTEST_NAMES[code] ?? null;
}

export function generateStaticParams() {
  return distinctSubtests().map((subtest) => ({ subtest }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subtest } = await params;
  const lower = subtest.toLowerCase();
  const name = subtestName(lower);
  if (!name) return {};

  return {
    title: `ASVAB ${name} Study Guides`,
    description: `Free ASVAB ${name} study guides, organized by topic. Read clear explanations of every ${name} concept tested on the ASVAB, then practice what you learned.`,
    alternates: {
      canonical: `https://asvabhero.com/study/${lower}`,
    },
  };
}

export default async function SubtestIndexPage({ params }: PageProps) {
  const { subtest } = await params;
  const lower = subtest.toLowerCase();
  const name = subtestName(lower);
  const subtestTopics = topicsForSubtest(lower);

  if (!name || subtestTopics.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "ASVAB Study Guide", href: "/asvab-study-guide" },
          { name, href: `/study/${lower}` },
        ]}
      />

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB {name} Study Guides
        </h1>
        <p className="mt-3 text-text-secondary">
          Every {name} topic tested on the ASVAB, broken into focused study
          guides. Each guide is free to read. When you are ready to test
          yourself, the practice drills and full question bank are part of Pro.
        </p>
      </div>

      <ul className="space-y-4 list-none p-0">
        {subtestTopics.map((topic) => (
          <li
            key={topic.id}
            className="rounded-xl border border-navy-border bg-navy-light p-5"
          >
            <Link
              href={topic.study_guide_href}
              className="font-display text-lg font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
            >
              {topic.title} &rarr;
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              Read the {name} study guide on {topic.title.toLowerCase()},
              including what the ASVAB tests and how to work the questions.
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-navy-border pt-8">
        <p className="text-sm text-text-secondary">
          New to this section? Start with the{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent underline hover:text-accent-hover"
          >
            full ASVAB study guide
          </Link>{" "}
          to see every subtest, or run your numbers through the{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>{" "}
          to see which jobs you qualify for.
        </p>
      </div>
    </main>
  );
}
