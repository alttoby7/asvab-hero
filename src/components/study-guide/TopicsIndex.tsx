import Link from "next/link";
import topicsData from "@/data/topics.seed.json";
import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest } from "@/types";

interface Topic {
  id: string;
  subtest: string;
  slug: string;
  title: string;
  sort_order: number;
  study_guide_href: string;
}

const SUBTEST_ORDER: AsvabSubtest[] = ["AR", "WK", "PC", "MK", "GS", "EI", "AS", "MC", "AO"];

export default function TopicsIndex() {
  const topics = topicsData as Topic[];

  const grouped = SUBTEST_ORDER.reduce<Record<string, Topic[]>>((acc, sub) => {
    acc[sub] = topics
      .filter((t) => t.subtest === sub)
      .sort((a, b) => a.sort_order - b.sort_order);
    return acc;
  }, {});

  return (
    <section className="mb-12">
      <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">
        Topic Study Pages
      </h2>
      <p className="mb-6 text-text-secondary">
        Each topic page includes a formula reference, worked examples, common pitfalls, and a quick 5-question drill pulled from the live question bank.
      </p>

      <div className="space-y-6">
        {SUBTEST_ORDER.map((sub) => {
          const subtopics = grouped[sub];
          if (!subtopics || subtopics.length === 0) return null;
          const subtestName = SUBTEST_NAMES[sub];
          const isAFQT = ["AR", "WK", "PC", "MK"].includes(sub);

          return (
            <div key={sub} className="rounded-xl border border-navy-border bg-navy-light overflow-hidden">
              <div className="flex items-center gap-3 border-b border-navy-border px-4 py-3">
                <span className="font-mono text-sm font-bold text-accent">{sub}</span>
                <span className="text-sm font-semibold text-text-primary">{subtestName}</span>
                {isAFQT && (
                  <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
                    AFQT
                  </span>
                )}
              </div>
              <ul className="divide-y divide-navy-border">
                {subtopics.map((topic) => (
                  <li key={topic.id}>
                    <Link
                      href={topic.study_guide_href}
                      className="flex items-center justify-between px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary"
                    >
                      <span>{topic.title}</span>
                      <span className="ml-2 flex-shrink-0 text-text-tertiary">&#8594;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
