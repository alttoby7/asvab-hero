import type { Metadata } from "next";
import Link from "next/link";
import ARCRecruitCapture from "@/components/ARCRecruitCapture";
import { practiceHref } from "@/lib/routes";

// Advance-reader-copy (ARC) recruit landing for "ASVAB Math, Explained".
// noindex: thin opt-in landing, not for search. Capture-only; the advance PDF is
// emailed to opt-ins (the book becomes a paid product, so it is never a public download).
export const metadata: Metadata = {
  title: "Get a Free Advance Copy of ASVAB Math, Explained",
  description:
    "Read the new ASVAB Math, Explained workbook before it launches. Free advance copy for people preparing for the math half of the AFQT.",
  robots: { index: false, follow: false },
};

const diagnosticHref = `${practiceHref("diagnostic", {
  authed: false,
})}&utm_source=advance-copy&utm_medium=page&utm_campaign=book-arc`;

export default function AdvanceCopyPage() {
  return (
    <main className="min-h-screen bg-navy">
      <section
        className="px-5 pt-12 pb-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,51,80,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(36,51,80,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Advance reader copy
          </p>
          {/* Continuity lockup: mirrors the cover. */}
          <p className="mt-3 font-display text-2xl font-extrabold leading-none text-text-primary">
            ASVAB Math, <span className="text-accent">Explained</span>
          </p>

          <h1 className="mt-8 font-display text-3xl font-extrabold leading-tight text-text-primary">
            Read it before it launches
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-text-secondary">
            Get a free advance copy of the new workbook for the math half of the
            AFQT. In return, honest feedback if you have it, no strings.
          </p>

          <div className="mt-8 text-left">
            <ARCRecruitCapture source="book-arc-page" />
          </div>
        </div>
      </section>

      {/* Secondary: keep practicing, free. */}
      <section className="border-t border-navy-border px-5 py-10">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
            <h2 className="font-display text-lg font-bold text-text-primary">
              Want to practice for real?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Take a free practice test and see your AFQT score instantly. No
              account needed.
            </p>
            <Link
              href={diagnosticHref}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline transition-colors hover:bg-accent-hover"
            >
              Start a free practice test
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
