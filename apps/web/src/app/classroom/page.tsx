import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ClassroomKit from "@/components/ClassroomKit";

export const metadata: Metadata = {
  title: "Free ASVAB Practice for Your Classroom: Link + Printable Handout",
  description:
    "Counselors, teachers, and JROTC instructors: give your whole class a free ASVAB practice test with one link and a printable handout. No accounts, no student data, no cost.",
  alternates: { canonical: "https://asvabhero.com/classroom" },
};

const FAQ = [
  {
    q: "Is it really free for a whole class?",
    a: "Yes. The practice test, calculators, and study guides are free with no signup wall, so you can share them with an entire class at no cost. There is no per-student charge and no account is required to use the core tools.",
  },
  {
    q: "Do my students have to create accounts or give any personal data?",
    a: "No. Students open the link and start practicing. No email, no sign up, and no roster or student records are collected. An optional free account only exists if a student chooses to save their own progress.",
  },
  {
    q: "How is this different from the paid Program License?",
    a: "This free classroom kit is a share-a-link-and-print handout for casual class use. The paid Program License adds full Pro for every cadet (adaptive practice that targets weak areas), a plan paced to your test date, and a weekly cohort report so you can see who is on track. Start free here and upgrade if you want score tracking and Pro.",
  },
  {
    q: "Can I put ASVAB Hero on our school or library website?",
    a: "Yes. You can link any tool, or embed a free calculator on your page with one line of HTML from the embed page. The counselor reference gives a source-cited overview of the ASVAB you can share with advisors.",
  },
];

const STEPS: [string, string][] = [
  [
    "1. Share the link",
    "Post asvabhero.com/practice-test in your LMS or class page, or print the handout and pass it out.",
  ],
  [
    "2. Students practice free",
    "They open it on any device and start. No sign up, no email, no cost.",
  ],
  [
    "3. They see what to study",
    "Every answer has an explanation, so students spot their weak areas right away.",
  ],
];

const MORE: [string, string, string][] = [
  [
    "/counselor-resources",
    "ASVAB counselor reference",
    "A source-cited overview of the ASVAB for advisors, plus free tools to link.",
  ],
  [
    "/embed",
    "Embed a free calculator",
    "Put the AFQT calculator on your own school or library page with one line of HTML.",
  ],
  [
    "/practice-test",
    "Free practice test",
    "The test your students will use. Diagnostic plus per-subtest drills, no account.",
  ],
  [
    "/asvab-study-guide",
    "Free study guides",
    "Guides for every ASVAB subtest, free to share with students.",
  ],
];

export default function ClassroomPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        Free for educators
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        Give your class a free ASVAB practice test
      </h1>
      <p className="mt-4 text-text-secondary leading-relaxed">
        Counselors, teachers, and JROTC instructors: share one link and hand out
        a printable sheet, and your whole class can practice the ASVAB for free.
        No accounts, no student data, no cost. ASVAB Hero is not affiliated with
        the U.S. Department of Defense.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Make a classroom handout
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          Add your class name (and an optional test date), then copy the link or
          print a one-page handout to give students.
        </p>
        <div className="mt-5">
          <ClassroomKit />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          How it works
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {STEPS.map(([t, d]) => (
            <div
              key={t}
              className="rounded-xl border border-navy-border bg-navy-light p-5"
            >
              <h3 className="font-display text-base font-bold text-text-primary">
                {t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Funnel to the paid Program License */}
      <section className="mt-12 rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Want score tracking for your program?
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          The free kit is great for casual class use. If you run a JROTC program
          with a test date and want full Pro for every cadet, adaptive practice,
          and a weekly report showing who is on track, look at the{" "}
          <Link
            href="/programs"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            Program License
          </Link>
          . One flat price, unlimited cadets, no roster setup.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          More free ways to use ASVAB Hero
        </h2>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {MORE.map(([href, label, blurb]) => (
            <Link key={href} href={href} className="group block no-underline">
              <span className="text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                {label} &rarr;
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-text-secondary">
                {blurb}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Classroom FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {FAQ.map((f) => (
            <div key={f.q} className="py-4">
              <h3 className="font-display text-base font-bold text-text-primary">
                {f.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
