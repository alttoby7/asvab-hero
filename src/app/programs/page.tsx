import type { Metadata } from "next";
import Link from "next/link";
import ProgramInquiryForm from "@/components/ProgramInquiryForm";
import RelatedLinks from "@/components/RelatedLinks";

// Live Stripe payment links (one-time charges; manual provisioning within 1
// business day). Created 2026-05-22. If you rotate these, update here.
const BUY_PROGRAM = "https://buy.stripe.com/14AeVddT71CofA6gcG0Jq01"; // $999/yr unlimited
const BUY_PILOT = "https://buy.stripe.com/4gMcN5dT7ftefA69Oi0Jq02"; // $299 one cycle

export const metadata: Metadata = {
  title: "JROTC ASVAB Prep: Program License for Instructors",
  description:
    "JROTC ASVAB prep that moves AFQT and GT scores before test day. One flat price, unlimited cadets, no roster setup, plus a weekly cohort report for instructors. From $299.",
  alternates: { canonical: "https://asvabhero.com/programs" },
  openGraph: {
    title: "JROTC ASVAB Prep: Program License for Instructors",
    description:
      "A score-movement system for JROTC programs with a test date. Unlimited cadets, no roster setup, weekly cohort report.",
    url: "https://asvabhero.com/programs",
    type: "website",
  },
};

const FAQ = [
  {
    q: "How is this different from March2Success, which is free?",
    a: "March2Success is a strong free content library. The Program License is a score-movement system for programs with a test date: an adaptive AFQT engine that targets each cadet's weak areas and auto-resurfaces their misses, a weekly plan phased to your test date, and one cohort report instead of per-student monitors you have to set up. There is also no bulk registration in March2Success; here your whole program is running off one join link in a day.",
  },
  {
    q: "Is it really unlimited cadets?",
    a: "Yes. One flat price covers every cadet in your program for the license period. No per-seat math, no minimums, no overage charges. Add cadets mid-year at no extra cost.",
  },
  {
    q: "How do my cadets get set up?",
    a: "After you purchase, I email you a join link within one business day. Cadets sign up with their own email and they have full Pro immediately. No roster upload, no spreadsheet, no IT ticket.",
  },
  {
    q: "What student data do you collect, and is it safe?",
    a: "Cadets register with their own email and their practice activity is stored to measure progress. I do not sell data, there are no ads, and ASVAB Hero is not affiliated with the U.S. Department of Defense. No roster or student-record upload is required. Cadet accounts and their data are deleted on request.",
  },
  {
    q: "Can I pay by purchase order or invoice? Do you have a W-9?",
    a: "Yes. Use “Talk to us” below and I will send an invoice and a W-9. Pay by card, check, or PO, whatever your program needs.",
  },
  {
    q: "What is the weekly cohort report?",
    a: "Each week I email you a one-page summary of your program: who is active, who has stalled, and the weakest domains across your cohort, so you know where to spend drill time. A self-serve dashboard is on the roadmap; the weekly report is how it works today.",
  },
  {
    q: "What if our ASVAB date is months away?",
    a: "That is ideal. The weekly plan paces cadets so the work is spread out instead of crammed. If you only want to cover one testing cycle, start with the Pilot and upgrade later.",
  },
  {
    q: "Refunds?",
    a: "If it is not a fit within the first 14 days, email me and I will refund you. No forms.",
  },
];

const COMPARISON: { dim: string; m2s: string; hero: string }[] = [
  {
    dim: "Cost",
    m2s: "Free (Army-funded)",
    hero: "$999/yr, unlimited cadets",
  },
  {
    dim: "Getting cadets started",
    m2s: "Each cadet self-registers and links the monitor; no bulk registration",
    hero: "One join link, your program is running in a day",
  },
  {
    dim: "Practice model",
    m2s: "Course library you assign",
    hero: "Adaptive AFQT engine that targets weak areas and auto-resurfaces misses",
  },
  {
    dim: "Tied to your test date",
    m2s: "General prep",
    hero: "Weekly plan phased to your program's ASVAB date",
  },
  {
    dim: "What you see",
    m2s: "Per-student monitor you set up",
    hero: "One weekly cohort report: who's active, who's at risk, weakest domains",
  },
];

export default function ProgramsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ASVAB Hero Program License (JROTC ASVAB Prep)",
    description:
      "JROTC ASVAB prep for instructors: adaptive AFQT/GT practice for unlimited cadets in one program, with a weekly cohort report.",
    brand: { "@type": "Brand", name: "ASVAB Hero" },
    offers: [
      {
        "@type": "Offer",
        name: "Pilot License (one test cycle)",
        price: "299",
        priceCurrency: "USD",
        url: "https://asvabhero.com/programs",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Program License (annual, unlimited cadets)",
        price: "999",
        priceCurrency: "USD",
        url: "https://asvabhero.com/programs",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <div className="programs-page">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .programs-page .reveal { opacity: 0; transform: translateY(12px); animation: programsReveal .6s cubic-bezier(.16,1,.3,1) forwards; }
            .programs-page .reveal-1 { animation-delay: .05s; }
            .programs-page .reveal-2 { animation-delay: .15s; }
            .programs-page .reveal-3 { animation-delay: .25s; }
            .programs-page .reveal-4 { animation-delay: .35s; }
            @keyframes programsReveal { to { opacity: 1; transform: none; } }
            @media (prefers-reduced-motion: reduce) {
              .programs-page .reveal { opacity: 1; transform: none; animation: none; }
            }
          `,
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-navy-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-navy-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-navy-border) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="reveal reveal-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            For JROTC Programs
          </p>
          <h1 className="reveal reveal-1 mt-3 font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl">
            JROTC ASVAB Prep that moves AFQT and GT scores before test day
          </h1>
          <p className="reveal reveal-2 mt-5 max-w-2xl text-lg text-text-secondary">
            One flat price covers your whole program. Cadets get adaptive practice that
            targets their weak areas; you get a weekly cohort report showing who is on track
            and who needs a push. No roster setup, no per-seat math.
          </p>

          <div className="reveal reveal-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-text-primary">$999</span>
              <span className="text-sm text-text-secondary">/ year &middot; unlimited cadets</span>
            </div>
            <span className="hidden h-6 w-px bg-navy-border sm:block" />
            <span className="text-sm text-text-tertiary">or a $299 single-test-cycle pilot</span>
          </div>

          <div className="reveal reveal-4 mt-8 flex flex-wrap gap-3">
            <a
              href={BUY_PROGRAM}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
            >
              Buy a Program License
            </a>
            <a
              href="#talk"
              className="rounded-xl border border-navy-border bg-navy-light px-6 py-3 text-sm font-semibold text-text-primary no-underline transition-colors hover:border-accent"
            >
              Talk to us / get an invoice
            </a>
          </div>
          <p className="reveal reveal-4 mt-4 text-xs text-text-tertiary">
            Built and used by individual recruits every day. Not affiliated with the U.S. Department of Defense.
          </p>
        </div>
      </section>

      {/* ---------- WHY PAY WHEN MARCH2SUCCESS IS FREE ---------- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The honest comparison</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
          Why pay when March2Success is free?
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Because they solve different problems. March2Success is a great free content
          library. The Program License is a score-movement system for programs with a test
          date, built so an instructor spends minutes, not hours, knowing where the cohort stands.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-navy-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-navy-light text-left">
                <th className="p-4 font-semibold text-text-secondary"> </th>
                <th className="p-4 font-semibold text-text-secondary">March2Success</th>
                <th className="p-4 font-semibold text-accent">ASVAB Hero Program License</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.dim} className={i % 2 ? "bg-navy-light/40" : ""}>
                  <td className="border-t border-navy-border p-4 font-medium text-text-primary align-top">
                    {row.dim}
                  </td>
                  <td className="border-t border-navy-border p-4 text-text-tertiary align-top">
                    {row.m2s}
                  </td>
                  <td className="border-t border-navy-border p-4 text-text-primary align-top">
                    {row.hero}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="border-y border-navy-border bg-navy-light">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How the Program License works</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
            Running in a day, not a semester
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                t: "One price, every cadet",
                d: "Buy once and every cadet in your program gets full Pro. Add cadets mid-year at no extra cost. No per-seat licenses to track.",
              },
              {
                t: "One join link",
                d: "I send you a link. Cadets sign up with their own email and they're practicing the same hour. No roster upload, no IT ticket.",
              },
              {
                t: "Paced to your test date",
                d: "Each cadet gets an adaptive plan that targets weak areas and resurfaces misses, spread across the weeks before your ASVAB.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-navy-border bg-navy p-6">
                <h3 className="font-display text-lg font-bold text-text-primary">{c.t}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT INSTRUCTORS SEE ---------- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What you see as the instructor</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
              A weekly cohort report, not another dashboard to babysit
            </h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Every week I email you a one-page summary of your program. You see at a glance
              who is putting in the reps, who has gone quiet, and the weakest domains across
              the cohort, so PT-style accountability is easy and your drill time goes where it
              counts.
            </p>
            <p className="mt-3 text-sm text-text-tertiary">
              A self-serve dashboard is on the roadmap. The weekly report is how it works today,
              and it means zero setup for you.
            </p>
          </div>
          <div className="rounded-xl border border-navy-border bg-navy-light p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Sample weekly report
            </p>
            <ul className="mt-4 space-y-3 text-sm list-none p-0">
              <li className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">Active this week</span>
                <span className="font-semibold text-success">48 / 60 cadets</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">Gone quiet (no reps 7+ days)</span>
                <span className="font-semibold text-almost">9 cadets</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">Near qualifying AFQT</span>
                <span className="font-semibold text-text-primary">14 cadets</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">Weakest domain (cohort)</span>
                <span className="font-semibold text-text-primary">Arithmetic Reasoning</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-text-tertiary">Illustrative figures.</p>
          </div>
        </div>
      </section>

      {/* ---------- PRIVACY ---------- */}
      <section className="border-y border-navy-border bg-navy-light">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Student data</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
            What we collect, and what we don&apos;t
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-border bg-navy p-5">
              <h3 className="text-sm font-semibold text-text-primary">What we collect</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-text-secondary list-disc pl-5">
                <li>The cadet&apos;s own email at signup</li>
                <li>Their practice activity, to measure progress</li>
              </ul>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy p-5">
              <h3 className="text-sm font-semibold text-text-primary">What we don&apos;t do</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-text-secondary list-disc pl-5">
                <li>No roster or student-record upload required</li>
                <li>No selling data, no ads</li>
                <li>Accounts and data deleted on request</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-xs text-text-tertiary">
            ASVAB Hero is not affiliated with the U.S. Department of Defense. Need a signed data
            agreement for your district? Ask in the form below.
          </p>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Pricing</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
          Start small or cover the whole year
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* Pilot */}
          <div className="flex flex-col rounded-xl border border-navy-border bg-navy-light p-7">
            <h3 className="font-display text-lg font-bold text-text-primary">Pilot License</h3>
            <p className="mt-1 text-sm text-text-secondary">One ASVAB test cycle, one program.</p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-text-primary">$299</span>
              <span className="text-sm text-text-tertiary">one-time</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-text-secondary list-none p-0">
              <li>✓ Unlimited cadets, full Pro</li>
              <li>✓ Adaptive AFQT/GT practice</li>
              <li>✓ Weekly cohort report</li>
              <li>✓ A low-risk way to try it against your next test date</li>
            </ul>
            <a
              href={BUY_PILOT}
              className="mt-6 rounded-xl border border-accent px-6 py-3 text-center text-sm font-semibold text-accent no-underline transition-colors hover:bg-accent hover:text-white"
            >
              Start a Pilot
            </a>
          </div>
          {/* Program */}
          <div className="relative flex flex-col rounded-xl border border-accent bg-navy-light p-7">
            <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              Most programs pick this
            </span>
            <h3 className="font-display text-lg font-bold text-text-primary">Program License</h3>
            <p className="mt-1 text-sm text-text-secondary">A full year, your whole program.</p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-text-primary">$999</span>
              <span className="text-sm text-text-tertiary">/ year</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-text-secondary list-none p-0">
              <li>✓ Everything in the Pilot, all year</li>
              <li>✓ Unlimited cadets, add anytime free</li>
              <li>✓ Founding-program pricing locked while you renew</li>
              <li>✓ Direct line to the founder</li>
            </ul>
            <a
              href={BUY_PROGRAM}
              className="mt-6 rounded-xl bg-accent px-6 py-3 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
            >
              Buy a Program License
            </a>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-text-tertiary">
          Need a purchase order, invoice, or W-9?{" "}
          <a href="#talk" className="text-accent no-underline hover:text-accent-hover">
            Talk to us
          </a>{" "}
          and I&apos;ll send one.
        </p>
      </section>

      {/* ---------- FOUNDING PROGRAMS ---------- */}
      <section className="border-y border-navy-border bg-navy-light">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Founding programs</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
            Be one of the first programs
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            The Program License is new. I&apos;d rather earn a handful of programs with the tool and
            a founder who answers email than inflate claims or post testimonials I don&apos;t have yet.
            Early programs lock founding pricing for as long as they renew and get a direct line to me.
          </p>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Pricing &amp; procurement FAQ</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">Questions instructors ask</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-xl border border-navy-border bg-navy-light p-5">
              <summary className="cursor-pointer list-none font-semibold text-text-primary marker:hidden">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- TALK TO US ---------- */}
      <section id="talk" className="border-t border-navy-border bg-navy-light scroll-mt-20">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Talk to us</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
            Questions, an invoice, or a data agreement?
          </h2>
          <p className="mt-3 text-text-secondary">
            Tell me about your program and I&apos;ll reply within one business day. Or just{" "}
            <a href={BUY_PROGRAM} className="text-accent no-underline hover:text-accent-hover">buy now</a>{" "}
            and I&apos;ll set you up.
          </p>
          <div className="mt-8">
            <ProgramInquiryForm />
          </div>
          <p className="mt-6 text-sm text-text-tertiary">
            Prefer email?{" "}
            <Link href="/contact" className="text-accent no-underline hover:text-accent-hover">
              Contact page
            </Link>
            .
          </p>
          <RelatedLinks
            title="Free resources for counselors and educators"
            links={[
              { href: "/counselor-resources", label: "ASVAB counselor reference", blurb: "Source-cited overview for advisors, plus free tools to link." },
              { href: "/embed", label: "Embed a free calculator", blurb: "Put the AFQT calculator on your own school or library page." },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
