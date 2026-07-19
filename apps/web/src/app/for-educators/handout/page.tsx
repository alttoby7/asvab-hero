import type { Metadata } from "next";
import Link from "next/link";
import HandoutPrintButton from "@/components/HandoutPrintButton";
import { TOPIC_COUNT } from "@/lib/bank-stats";

export const metadata: Metadata = {
  title: "Printable ASVAB Handout for Students (Free, One Page)",
  description:
    "A free, print-ready one-page handout for counselors, librarians, and JROTC instructors. Post it on a bulletin board or LibGuide to point students at free ASVAB practice, calculators, and study guides. No account, no cost, no student data.",
  alternates: { canonical: "https://asvabhero.com/for-educators/handout" },
};

const STUDENT_URL = "asvabhero.com/practice-test";

// One-page handout an educator prints or saves to PDF and posts. The paper is
// rendered light-on-white so the screen preview matches the printout exactly.
// Print rules (globals.css, scoped by body:has(.handout-print)) drop the site
// chrome and everything marked print:hidden, leaving just the paper.
export default function EducatorHandoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Screen-only header: what this is + how to use it. Hidden in print. */}
      <div className="print:hidden">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          Partner kit for educators
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Printable one-page student handout
        </h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Print this or save it as a PDF, then post it on a bulletin board, a
          counseling wall, or a LibGuide. It points students at the free ASVAB
          practice test, calculators, and study guides. Nothing to fill in, no
          student data, and no cost. The preview below is exactly what prints.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <HandoutPrintButton />
          <Link
            href="/for-educators"
            className="rounded-md border border-navy-border bg-navy px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter no-underline"
          >
            Back to the full kit
          </Link>
        </div>
        <p className="mt-3 text-xs text-text-tertiary">
          Tip: in the print dialog, set margins to Default and turn on
          &quot;Background graphics&quot; for the cleanest result. To add a QR
          code, point any free QR generator at{" "}
          <span className="font-mono text-text-secondary">
            https://{STUDENT_URL}
          </span>{" "}
          and drop it in the box on the sheet.
        </p>
      </div>

      {/* The paper. Light-on-white so it prints clean. */}
      <div className="mt-10 print:mt-0">
        <div className="handout-print mx-auto max-w-[8.5in] rounded-2xl border border-navy-border bg-white p-10 text-slate-900 shadow-2xl sm:p-12">
          {/* Masthead */}
          <div className="flex items-baseline justify-between border-b-2 border-slate-900 pb-3">
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
              ASVAB Hero
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Free ASVAB practice
            </span>
          </div>

          <h2 className="mt-8 font-display text-4xl font-extrabold leading-tight text-slate-900">
            Study for the ASVAB, free
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">
            Practice the military entrance test on any phone, tablet, or
            computer. No account and no email needed to start.
          </p>

          {/* Big URL callout, QR-friendly */}
          <div className="mt-8 grid grid-cols-[1fr_auto] items-center gap-6 rounded-xl border-2 border-slate-900 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Go to this free practice test
              </p>
              <p className="mt-2 break-all font-display text-3xl font-extrabold text-orange-600">
                {STUDENT_URL}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Type it in, or scan the code with your phone camera.
              </p>
            </div>
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-slate-400 text-center text-[11px] font-medium leading-tight text-slate-400">
              Add a QR
              <br />
              code here
            </div>
          </div>

          {/* What students get */}
          <div className="mt-8">
            <p className="font-display text-lg font-bold text-slate-900">
              What you get, free
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                "A full practice test plus drills for every subtest",
                "A free diagnostic with your estimated AFQT score",
                "Score calculators for all 6 branches and 500+ jobs",
                `Study guides covering all ${TOPIC_COUNT} ASVAB topics`,
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[15px] leading-snug text-slate-800"
                >
                  <span aria-hidden className="font-bold text-orange-600">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Three steps */}
          <div className="mt-8 rounded-xl bg-slate-100 p-6">
            <p className="font-display text-lg font-bold text-slate-900">
              How to start
            </p>
            <ol className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-slate-800">
              <li>
                <span className="font-semibold">1.</span> Open the link above on
                any device.
              </li>
              <li>
                <span className="font-semibold">2.</span> Take the practice test.
                No account or email needed to start.
              </li>
              <li>
                <span className="font-semibold">3.</span> Read every answer
                explanation to see what to study next.
              </li>
            </ol>
          </div>

          {/* Honest context line */}
          <p className="mt-8 text-sm leading-relaxed text-slate-600">
            The official ASVAB is free to take at a Military Entrance Processing
            Station through a recruiter. ASVAB Hero is independent practice to
            get ready for it, not the official test, and the calculators give
            estimates, not official scores.
          </p>

          {/* Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-300 pt-4 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">
              asvabhero.com
            </span>
            <span>
              Not affiliated with the U.S. Department of Defense.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
