import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { practiceHref } from "@/lib/routes";

// QR-landing for the printed "ASVAB Math, Explained" workbook. Mobile-first
// (all traffic is phone-camera scans). noindex: thin opt-in landing, not for search.
export const metadata: Metadata = {
  title: "Your Free AFQT Math Cheat-Sheet",
  description:
    "Get the free 2-page AFQT Math cheat-sheet for Arithmetic Reasoning and Mathematics Knowledge, and keep practicing with ASVAB Hero.",
  robots: { index: false, follow: false },
};

// Skip-email readers who tap straight into practice still carry book attribution.
const diagnosticHref = `${practiceHref("diagnostic", {
  authed: false,
})}&utm_source=book&utm_medium=qr&utm_campaign=book`;

export default function BookLandingPage() {
  return (
    <main className="min-h-screen bg-navy">
      {/* Hero: single-screen-first. Subtle graph-paper texture echoes the workbook. */}
      <section
        className="px-5 pt-12 pb-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,51,80,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(36,51,80,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div className="mx-auto max-w-md text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            From your workbook
          </p>
          {/* Continuity lockup: mirrors the cover so the scan obviously matches the book. */}
          <p className="mt-3 font-display text-2xl font-extrabold leading-none text-text-primary">
            ASVAB Math, <span className="text-accent">Explained</span>
          </p>

          <h1 className="mt-8 font-display text-3xl font-extrabold leading-tight text-text-primary">
            Your free AFQT Math Cheat-Sheet
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-text-secondary">
            Two pages. Every Arithmetic Reasoning and Mathematics Knowledge
            formula, plus the traps that cost you points.
          </p>

          <div className="mt-6 text-left">
            <EmailCapture
              variant="inline"
              tag="book"
              source="book"
              headline=""
              subhead=""
              cta="Email me the cheat-sheet"
              successDownloadHref="/afqt-math-cheat-sheet.pdf"
              successTitle="Your cheat-sheet is ready."
              successBody="Tap below to download the PDF. We also added you to the free ASVAB Hero study list. Unsubscribe any time."
            />
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
