import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";
import BrandHero from "@/components/BrandHero";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "AFQT vs. ASVAB: What Each Score Means and Why You Need Both (2026)",
  description:
    "The AFQT is a percentile built from 4 of the 9 ASVAB subtests. The ASVAB is the full battery. One gates enlistment; the other gates your job choices. Here is the difference.",
  alternates: {
    canonical: "https://asvabhero.com/afqt-vs-asvab",
  },
};

const faqItems = [
  {
    q: "Is the AFQT the same as the ASVAB?",
    a: "No. The ASVAB is the full 9-subtest battery you take at MEPS or a recruiter's office. The AFQT (Armed Forces Qualification Test) is a single percentile score derived from 4 of those 9 subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. When someone says 'I got a 72 on the ASVAB,' they almost always mean their AFQT percentile.",
  },
  {
    q: "What is the AFQT formula?",
    a: "AFQT raw score = 2 x VE (Verbal Expression, which equals WK + PC) + AR + MK. The result is converted to a percentile from 1 to 99 by comparing it to a 1997 national reference group. VE is doubled, so Word Knowledge and Paragraph Comprehension give you twice the leverage of any other AFQT subtest.",
  },
  {
    q: "Can you pass the ASVAB and still fail to qualify?",
    a: "Yes. There is no pass/fail on the ASVAB itself, but you can score above minimum AFQT thresholds and still not qualify for a specific job if your line scores (from the other subtests) are too low. Getting into a branch requires meeting the AFQT minimum; getting the job you want requires meeting the composite score minimums for that job.",
  },
  {
    q: "Which score should I focus on studying for?",
    a: "Fix the AFQT first if you are below your target branch's minimum (31 for Army and Navy, 32 for Marines and Coast Guard, 36 for Air Force and Space Force). Once you clear that gate, shift focus to the line scores for the specific jobs you want. Studying AR, WK, PC, and MK covers the AFQT and also feeds several line scores.",
  },
  {
    q: "Do all 9 ASVAB subtests count toward the AFQT?",
    a: "No. Only 4 of the 9 subtests count toward your AFQT: Arithmetic Reasoning (AR), Word Knowledge (WK), Paragraph Comprehension (PC), and Mathematics Knowledge (MK). The other 5 subtests (General Science, Electronics Information, Auto and Shop, Mechanical Comprehension, Assembling Objects) feed line scores for job qualification only.",
  },
  {
    q: "What AFQT score do I need to enlist?",
    a: "Army: 31, Marines: 32, Navy: 31, Air Force: 36, Space Force: 36, Coast Guard: 32. These are minimum floors for diploma holders. GED holders typically need a higher score (often 50+) and face additional requirements. The average enlistee scores between 55 and 65.",
  },
];

export default function AfqtVsAsvabPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "AFQT vs. ASVAB: What Each Score Means and Why You Need Both",
          description:
            "The AFQT is a percentile score calculated from 4 of the 9 ASVAB subtests; the ASVAB is the full 9-subtest battery. The AFQT determines whether you can enlist; line scores from all 9 subtests determine which jobs you qualify for.",
          url: "https://asvabhero.com/afqt-vs-asvab",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-07-09",
          dateModified: "2026-07-09",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />

      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "AFQT vs. ASVAB", href: "/afqt-vs-asvab" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          AFQT vs. ASVAB: What Each Score Means and Why You Need Both
        </h1>

        <p className="mt-4 text-text-secondary">
          The AFQT (Armed Forces Qualification Test) is a percentile score calculated from 4 of the 9 ASVAB subtests. The ASVAB (Armed Services Vocational Aptitude Battery) is the full 9-subtest battery you take at MEPS or a recruiter&apos;s office. The AFQT determines whether you can enlist; line scores built from all 9 subtests determine which jobs you qualify for. You need both, and they measure different things.
        </p>
        <p className="mt-4 text-text-secondary">
          This page explains exactly how each score is built, what it controls, and which one to focus on first when you prepare.
        </p>

        <section className="my-8 not-prose">
          <EmailCapture
            headline="Want a study plan that targets the highest-leverage subtests?"
            subhead="Free guide covering which ASVAB subtests move your AFQT fastest, plus a short crash course on line scores and branch minimums."
            cta="Email me the plan"
            tag="afqt-vs-asvab"
          />
        </section>

        <BrandHero
          src="/images/afqt-vs-asvab/hero.jpg"
          alt="Recruits preparing for the ASVAB at a military entrance processing station"
          width={1536}
          height={1024}
          className="my-6 overflow-hidden rounded-lg border border-navy-border"
        />

        {/* ─── WHAT IS THE ASVAB ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Is the ASVAB?
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB is a standardized aptitude test with 9 subtests covering vocabulary, reading comprehension, math, science, electronics, mechanics, automotive knowledge, and spatial reasoning. You take it at a Military Entrance Processing Station (MEPS) or a Military Entrance Test (MET) site before enlisting. The full battery takes about 3 hours in its computer-adaptive (CAT-ASVAB) form.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Code</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">What it tests</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Counts toward AFQT?</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                { code: "AR", name: "Arithmetic Reasoning", desc: "Math word problems", afqt: true },
                { code: "WK", name: "Word Knowledge", desc: "Vocabulary", afqt: true },
                { code: "PC", name: "Paragraph Comprehension", desc: "Reading passages", afqt: true },
                { code: "MK", name: "Mathematics Knowledge", desc: "Algebra and geometry", afqt: true },
                { code: "GS", name: "General Science", desc: "Physical, earth, and biological sciences", afqt: false },
                { code: "EI", name: "Electronics Information", desc: "Electrical circuits and systems", afqt: false },
                { code: "AS", name: "Auto & Shop Information", desc: "Automotive and shop practices", afqt: false },
                { code: "MC", name: "Mechanical Comprehension", desc: "Gears, levers, pulleys", afqt: false },
                { code: "AO", name: "Assembling Objects", desc: "Spatial reasoning", afqt: false },
              ].map((st) => (
                <tr key={st.code} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">{st.code}</td>
                  <td className="py-2 pr-4 font-semibold text-text-primary">{st.name}</td>
                  <td className="py-2 pr-4">{st.desc}</td>
                  <td className="py-2">
                    {st.afqt ? (
                      <span className="rounded bg-accent/20 px-1.5 py-0.5 text-xs font-semibold text-accent">Yes</span>
                    ) : (
                      <span className="text-text-tertiary">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Each subtest produces a standard score on a scale where 50 is the average and every 10 points equals one standard deviation. These 9 standard scores are the raw material that feeds both the AFQT and the job-qualification composites.
        </p>

        {/* ─── WHAT IS THE AFQT ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Is the AFQT?
        </h2>

        <p className="mt-4 text-text-secondary">
          The AFQT is a percentile from 1 to 99 calculated from 4 of the 9 ASVAB subtests using this formula:
        </p>

        <div className="my-4 rounded-lg border border-navy-border bg-navy p-4 text-center">
          <p className="font-mono text-lg font-bold text-accent">
            AFQT = 2 &times; VE + AR + MK
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            where VE (Verbal Expression) = WK + PC
          </p>
        </div>

        <p className="text-text-secondary">
          Because VE is doubled, Word Knowledge and Paragraph Comprehension each carry twice the weight of Arithmetic Reasoning or Mathematics Knowledge in your final AFQT. If you are below your target minimum, drilling vocabulary and reading comprehension gives you the biggest return per hour of study.
        </p>

        <p className="mt-4 text-text-secondary">
          The raw score is then converted to a percentile by comparing it against a 1997 national reference group. An AFQT of 60 means you scored as well as or better than 60% of the reference group, not that you answered 60% of questions correctly.
        </p>

        <p className="mt-4 text-text-secondary">
          The DoD groups AFQT percentiles into categories:
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AFQT Percentile</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What it means</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                { cat: "I", range: "93–99", meaning: "Highest aptitude; easiest access to any job and bonus" },
                { cat: "II", range: "65–92", meaning: "Above average; strong job selection and bonus eligibility" },
                { cat: "IIIA", range: "50–64", meaning: "Average and above; opens most jobs and enlistment bonuses" },
                { cat: "IIIB", range: "31–49", meaning: "Below average; clears the door for most branches, narrower job options" },
                { cat: "IVA", range: "21–30", meaning: "Below minimum for all branches except under waiver" },
                { cat: "IVB–C", range: "10–20", meaning: "Generally ineligible" },
                { cat: "V", range: "1–9", meaning: "Permanently disqualified from all branches" },
              ].map((row) => (
                <tr key={row.cat} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-semibold text-text-primary">Cat {row.cat}</td>
                  <td className="py-2 pr-4 font-mono">{row.range}</td>
                  <td className="py-2">{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── KEY DIFFERENCES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Key Differences Between AFQT and ASVAB
        </h2>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary"></th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">ASVAB</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">AFQT</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                { label: "What it is", asvab: "A 9-subtest aptitude battery", afqt: "A single percentile derived from 4 of those subtests" },
                { label: "Number of subtests", asvab: "9", afqt: "4 (AR, WK, PC, MK)" },
                { label: "Score format", asvab: "9 standard scores (mean 50) + composites", afqt: "Percentile 1–99" },
                { label: "What it controls", asvab: "Job eligibility (via line scores/composites)", afqt: "Enlistment eligibility (the branch-minimum gate)" },
                { label: "Can you retake separately?", asvab: "No — you retake the whole ASVAB", afqt: "No — AFQT recalculates from the new ASVAB scores" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-semibold text-text-primary">{row.label}</td>
                  <td className="py-2 pr-4">{row.asvab}</td>
                  <td className="py-2">{row.afqt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFQT is not a separate test you can retake on its own. When you retake the ASVAB, the military recalculates your AFQT from the new scores. Your most recent score replaces all previous scores across the board, so a score that goes down is official.
          </p>
        </aside>

        {/* ─── BRANCH MINIMUMS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT Branch Minimums (2026)
        </h2>

        <p className="mt-4 text-text-secondary">
          These are the minimum AFQT percentiles for diploma holders. GED holders typically need 50 or higher, and some branches require 15+ college credits to qualify at all.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Minimum AFQT (diploma)</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                { branch: "Army", min: "31" },
                { branch: "Navy", min: "31" },
                { branch: "Marines", min: "32" },
                { branch: "Coast Guard", min: "32" },
                { branch: "Air Force", min: "36" },
                { branch: "Space Force", min: "36" },
              ].map((row) => (
                <tr key={row.branch} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-semibold text-text-primary">{row.branch}</td>
                  <td className="py-2 font-mono">{row.min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These floors are not competitive scores. The average enlistee scores between 55 and 65. Scoring above 50 (Category IIIA) gives you access to most jobs and bonus programs.
        </p>

        {/* ─── LINE SCORES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Line Scores (from the Full ASVAB) Determine Job Eligibility
        </h2>

        <p className="mt-4 text-text-secondary">
          Each branch creates its own composite scores, called line scores, by combining different subsets of the 9 ASVAB subtests. These composites are what actually gate specific jobs. A high AFQT does not guarantee access to technical jobs if your non-AFQT subtests are weak.
        </p>

        <p className="mt-4 text-text-secondary">
          For example, the Army&apos;s GT (General Technical) score combines VE + AR. The Army&apos;s EL (Electronics) score combines GS + AR + MK + EI. An 80th-percentile AFQT does not help you if your GS and EI are below what a specific MOS (Military Occupational Specialty) requires.
        </p>

        <p className="mt-4 text-text-secondary">
          Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free ASVAB score calculator
          </Link>{" "}
          to enter all 9 subtest scores and see both your AFQT estimate and every job composite across all 6 branches.
        </p>

        {/* ─── WHICH SCORE TO FOCUS ON ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Which Score Should You Focus On?
        </h2>

        <p className="mt-4 text-text-secondary">
          If your practice AFQT is below your target branch&apos;s minimum, fix that first. There is no point optimizing line scores if you cannot enlist. Focus on AR, WK, PC, and MK, with extra attention on WK and PC because VE is doubled.
        </p>

        <p className="mt-4 text-text-secondary">
          Once you clear the AFQT gate, study backward from your target job. Look up the line score it requires, identify which subtests feed that composite, and drill those. For most Army jobs that is GT (VE + AR). For technical Air Force jobs it is the MAGE composites (Mechanical, Administrative, General, Electronic). For Navy ratings, check the specific rating formula.
        </p>

        <p className="mt-4 text-text-secondary">
          The good news: studying AR and verbal (WK + PC) moves your AFQT and also improves most line scores at the same time, so there is strong overlap in the study plan no matter what job you are targeting.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFQT vs. ASVAB FAQ
        </h2>

        <div className="mt-4 space-y-6">
          {faqItems.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-display text-base font-bold text-text-primary">
                {faq.q}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="not-prose mt-12">
          <RelatedLinks
            links={[
              { href: "/asvab-scores-explained", label: "ASVAB Scores Explained" },
              { href: "/afqt-score", label: "AFQT Score Deep Dive" },
              { href: "/what-is-a-good-asvab-score", label: "What Is a Good ASVAB Score?" },
              { href: "/calculator", label: "Free ASVAB Score Calculator" },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
