import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import AfqtCalculator from "@/components/AfqtCalculator";
import EmbedSnippet from "@/components/EmbedSnippet";
import { TOPIC_COUNT } from "@/lib/bank-stats";

export const metadata: Metadata = {
  title: "ASVAB Hero Partner Kit for Educators: Embed, Handout, Classroom Link",
  description:
    "One page for counselors, librarians, and JROTC instructors: embed a free ASVAB calculator on your site, print a one-page student handout, and share the practice test with your class. No account, no cost, no student data.",
  alternates: { canonical: "https://asvabhero.com/for-educators" },
};

// The three kit pieces, each linking to its dedicated tool/page. This page is
// the single hub outreach points at; it hands off to the existing surfaces
// (/embed, /classroom, /counselor-resources) rather than duplicating them.
const KIT: { href: string; label: string; blurb: string }[] = [
  {
    href: "/embed",
    label: "Embeddable calculator widget",
    blurb:
      "Drop the free AFQT calculator onto your counseling page or LibGuide with one line of HTML. Students use it without leaving your site and without an account.",
  },
  {
    href: "/for-educators/handout",
    label: "Printable one-page handout",
    blurb:
      "A print-ready sheet for a bulletin board or LibGuide that points students at the free practice test. Print it as is, or build a version with your class name.",
  },
  {
    href: "/counselor-resources",
    label: "Source-cited ASVAB reference",
    blurb:
      "A plain, official-source overview of the ASVAB for the adults who advise students, plus every free tool you can link.",
  },
];

export default function ForEducatorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "ASVAB Hero partner kit for educators",
          description:
            "A free kit for counselors, librarians, and JROTC instructors: an embeddable ASVAB calculator, a printable student handout, and a source-cited reference.",
          itemListElement: KIT.map((k, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: k.label,
            url: `https://asvabhero.com${k.href}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is the ASVAB Hero educator kit really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The embeddable calculator, the printable handout, and the practice test are free with no account required. An optional free account only saves a student's own progress, and it is never required.",
              },
            },
            {
              "@type": "Question",
              name: "Do you collect student data or require a roster?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Students open a link and start. There is no email, no roster, and no student records are collected. The embed and the handout are backend-free.",
              },
            },
            {
              "@type": "Question",
              name: "Is ASVAB Hero affiliated with the Department of Defense?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. ASVAB Hero is an independent test-prep site and is not affiliated with the U.S. Department of Defense or any branch of the armed services. Official sources are linked on our counselor reference so you can verify any detail.",
              },
            },
          ],
        }}
      />

      {/* Intro / offer */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        Partner kit for educators
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        A free ASVAB kit for counselors, librarians, and JROTC instructors
      </h1>
      <p className="mt-4 text-text-secondary leading-relaxed">
        Everything here is free and yours to use: embed a calculator on your
        page, print a handout for your students, and share the practice test
        with a class. No account, no cost, and no student data collected. Take
        what is useful and leave the rest.
      </p>
      <p className="mt-3 text-sm text-text-tertiary leading-relaxed">
        ASVAB Hero is an independent test-prep site and is not affiliated with
        the U.S. Department of Defense or any branch of the armed services. Our
        calculators give estimates, not official scores.
      </p>

      {/* The three-piece kit at a glance */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What is in the kit
        </h2>
        <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {KIT.map((item) => (
            <Link key={item.href} href={item.href} className="group block no-underline">
              <span className="text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                {item.label} &rarr;
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-text-secondary">
                {item.blurb}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 1. Embed */}
      <section className="mt-12 rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          Kit piece 1
        </p>
        <h2 className="mt-2 font-display text-lg font-bold text-text-primary">
          Embed a free calculator on your page
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          Students enter their four AFQT subtest scores and see their percentile,
          DoD category, and which branches they qualify for. Paste one line of
          HTML into your counseling page or LibGuide. Here is the live tool:
        </p>

        <div className="mt-6 rounded-xl border border-navy-border bg-navy p-4">
          <Suspense
            fallback={
              <div className="rounded-lg border border-navy-border bg-navy-light p-6 text-text-secondary">
                Loading calculator demo...
              </div>
            }
          >
            <AfqtCalculator embedded />
          </Suspense>
        </div>

        <div className="mt-6">
          <EmbedSnippet
            src="https://asvabhero.com/embed/afqt-calculator"
            title="AFQT Calculator by ASVAB Hero"
            height={820}
            creditHref="https://asvabhero.com/afqt-calculator"
            creditLabel="AFQT calculator"
          />
        </div>

        <p className="mt-6 text-sm text-text-secondary leading-relaxed">
          Prefer a compact reference? The score-requirements table shows the
          minimum AFQT to enlist in each branch. Same one-line paste:
        </p>
        <div className="mt-3">
          <EmbedSnippet
            src="https://asvabhero.com/embed/score-requirements"
            title="ASVAB Score Requirements by ASVAB Hero"
            height={420}
            creditHref="https://asvabhero.com/asvab-score-requirements"
            creditLabel="ASVAB score requirements table"
          />
        </div>

        <p className="mt-4 text-sm text-text-tertiary">
          Previews and more options live on the{" "}
          <Link
            href="/embed"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            embed directory
          </Link>
          .
        </p>
      </section>

      {/* 2. Handout */}
      <section className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          Kit piece 2
        </p>
        <h2 className="mt-2 font-display text-lg font-bold text-text-primary">
          Print a one-page handout for students
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          The{" "}
          <Link
            href="/for-educators/handout"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            printable handout
          </Link>{" "}
          is a ready-to-post sheet with the practice-test link and simple steps.
          Open it, print it or save it as a PDF, and pin it to a board or add it
          to a LibGuide. No signup and no student data.
        </p>
        <p className="mt-4">
          <Link
            href="/for-educators/handout"
            className="inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Open the printable handout &rarr;
          </Link>
        </p>
        <p className="mt-4 text-sm text-text-tertiary leading-relaxed">
          Want your class name on it? Build a version from the{" "}
          <Link
            href="/classroom"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            classroom kit
          </Link>
          , or download the plain{" "}
          <a
            href="/asvab-at-a-glance.pdf"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            ASVAB at a Glance PDF
          </a>
          .
        </p>
      </section>

      {/* 3. Reference */}
      <section className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          Kit piece 3
        </p>
        <h2 className="mt-2 font-display text-lg font-bold text-text-primary">
          Share a source-cited ASVAB reference
        </h2>
        <p className="mt-2 text-text-secondary leading-relaxed">
          The{" "}
          <Link
            href="/counselor-resources"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            counselor reference
          </Link>{" "}
          is a plain overview of what the ASVAB is, the nine subtests, how AFQT
          and line scores work, and where to send students next, with every
          detail linked to an official source. It also links the free{" "}
          <Link
            href="/practice-test"
            className="text-accent underline hover:text-accent-hover"
          >
            practice test
          </Link>{" "}
          and study guides covering all {TOPIC_COUNT} ASVAB topics.
        </p>
      </section>

      {/* Low-friction ask */}
      <section className="mt-12 border-t border-navy-border pt-8">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The only ask
        </h2>
        <p className="mt-3 text-text-secondary leading-relaxed">
          If a tool is useful to your students, link it from your resource page
          or embed it with the snippet above. That is it. If you keep the small
          credit line under the embedded tool, it helps other educators find the
          kit too. Want us to list your school or library as a partner, or need
          a handout or widget tailored to your program?{" "}
          <Link
            href="/contact"
            className="font-semibold text-accent underline hover:text-accent-hover"
          >
            Email us
          </Link>{" "}
          and we will set it up.
        </p>
      </section>

      <RelatedLinks
        title="Free tools for your students"
        links={[
          { href: "/embed", label: "Embed a calculator", blurb: "Put the AFQT calculator on your own page with one line of HTML." },
          { href: "/classroom", label: "Classroom kit", blurb: "Share the practice test with a class and print a handout." },
          { href: "/counselor-resources", label: "Counselor reference", blurb: "Source-cited ASVAB overview for advisors." },
          { href: "/calculator", label: "ASVAB score calculator", blurb: "Every job a student qualifies for, all 6 branches." },
          { href: "/practice-test", label: "Free practice test", blurb: "Diagnostic plus per-subtest drills, no account." },
          { href: "/asvab-study-guide", label: "Study guides", blurb: "Free guides for every ASVAB subtest." },
        ]}
      />
    </div>
  );
}
