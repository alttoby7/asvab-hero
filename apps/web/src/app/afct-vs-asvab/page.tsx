import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";
import BrandHero from "@/components/BrandHero";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "AFCT vs. ASVAB: What Active-Duty Service Members Need to Know (2026)",
  description:
    "The AFCT is the in-service version of the ASVAB for active-duty service members. Same content, same scoring, different rules. The biggest difference: AFCT scores always replace your old scores.",
  alternates: {
    canonical: "https://asvabhero.com/afct-vs-asvab",
  },
};

const faqItems = [
  {
    q: "Is the AFCT the same test as the ASVAB?",
    a: "In content and scoring, yes. Both tests cover the same 9 subtests and use identical scoring scales. The difference is administrative: the ASVAB is taken by civilian recruits at MEPS before enlistment; the AFCT (Armed Forces Classification Test) is taken by active-duty service members at an Education Center on their installation.",
  },
  {
    q: "Can AFCT scores go down?",
    a: "Yes. AFCT scores always replace your previous scores with no exceptions. If you scored a 72 on your original ASVAB and score a 58 on the AFCT, your official score is now 58. This is the most important practical difference between the AFCT and the ASVAB and the main reason preparation is non-negotiable before retesting.",
  },
  {
    q: "Who can take the AFCT?",
    a: "Active-duty service members who want to improve their GT score for MOS reclassification, meet promotion or school eligibility requirements, or qualify for a program that requires a higher composite score. You must have command approval and take the test at your installation's Education Center or Army Learning Center.",
  },
  {
    q: "How do I know if my GT score is high enough to retake?",
    a: "A GT score of 110 or higher is the threshold for many warrant officer and advanced MOS tracks. If you are below 110 and targeting reclassification to a technical or intelligence MOS, the AFCT is often the path. Check the specific GT requirement for your target MOS before deciding to retake.",
  },
  {
    q: "Is the AFCT harder than the ASVAB?",
    a: "No. The tests are identical in content. Whether it feels harder depends entirely on how much time has passed since your original ASVAB and how much you have studied in the interim. Service members who have been out of an academic environment for years often find math subtests (AR, MK) have drifted without practice.",
  },
  {
    q: "What is BSEP and how does it relate to the AFCT?",
    a: "BSEP (Basic Skills Education Program) is a free military education program that helps service members prepare for retesting on the ASVAB or AFCT. It focuses on the math and verbal skills that drive GT scores. Completing BSEP before taking the AFCT significantly reduces the risk of a score decrease.",
  },
];

export default function AfctVsAsvabPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "AFCT vs. ASVAB: What Active-Duty Service Members Need to Know",
          description:
            "The AFCT (Armed Forces Classification Test) is the in-service version of the ASVAB for active-duty service members. The tests are identical in content and scoring; the difference is who takes them and where.",
          url: "https://asvabhero.com/afct-vs-asvab",
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
          { name: "AFCT vs. ASVAB", href: "/afct-vs-asvab" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          AFCT vs. ASVAB: What Active-Duty Service Members Need to Know
        </h1>

        <p className="mt-4 text-text-secondary">
          The AFCT (Armed Forces Classification Test) is the in-service version of the ASVAB for active-duty service members. The tests are identical in content and scoring; the difference is who takes them and where. Recruits take the ASVAB at a Military Entrance Processing Station (MEPS) before enlisting. Active-duty service members who want to retest take the AFCT at an Education Center on their installation.
        </p>
        <p className="mt-4 text-text-secondary">
          The most important practical difference: AFCT scores always replace your previous scores. If your new score is lower, that lower score becomes your official score. There is no superscore, no option to keep the higher number. Preparation is not optional.
        </p>

        <section className="my-8 not-prose">
          <EmailCapture
            headline="Preparing to retake? Get a focused study plan."
            subhead="Free guide targeting the GT score subtests that matter most for MOS reclassification, plus tips on reducing score-drop risk."
            cta="Email me the plan"
            tag="afct-vs-asvab"
          />
        </section>

        <BrandHero
          src="/images/afct-vs-asvab/hero.jpg"
          alt="Active-duty service member studying at a military education center"
          width={1536}
          height={1024}
          className="my-6 overflow-hidden rounded-lg border border-navy-border"
        />

        {/* ─── WHAT IS THE ASVAB ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Is the ASVAB?
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB (Armed Services Vocational Aptitude Battery) is a 9-subtest aptitude test taken by recruits at MEPS before enlistment. The AFQT (Armed Forces Qualification Test) percentile, derived from 4 of those 9 subtests, determines whether you can enlist. The remaining subtest scores determine which jobs you qualify for through branch-specific composite or line scores.
        </p>
        <p className="text-text-secondary">
          For a full breakdown of how each subtest works and what it controls, see{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">
            ASVAB scores explained
          </Link>.
        </p>

        {/* ─── WHAT IS THE AFCT ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Is the AFCT?
        </h2>

        <p className="mt-4 text-text-secondary">
          The AFCT is the version of the ASVAB administered to active-duty service members who want to improve their scores after enlistment. It covers the same 9 subtests with the same content, same scoring scale, and same composite formulas. Your branch uses the resulting scores in exactly the same way it uses ASVAB scores.
        </p>
        <p className="text-text-secondary">
          The AFCT is typically administered in paper-and-pencil format at an Army Learning Center (ALC) or Education Center, though some installations offer a computer-based version. Command approval is required before scheduling.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFCT scores always replace your prior scores with no exceptions across any branch. If you take the AFCT and score lower than your original ASVAB, that lower score becomes your official record. There is no way to keep the higher score. Preparation is critical before sitting for the AFCT.
          </p>
        </aside>

        {/* ─── KEY DIFFERENCES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Key Differences Between AFCT and ASVAB
        </h2>

        <p className="mt-4 text-text-secondary">
          The differences are administrative, not academic. The content is the same.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary"></th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">ASVAB</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">AFCT</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                { label: "Who takes it", asvab: "Civilian recruits before enlistment", afct: "Active-duty service members after enlistment" },
                { label: "Where it is given", asvab: "MEPS or MET site", afct: "Installation Education Center or Army Learning Center" },
                { label: "Format", asvab: "Computer-adaptive (CAT-ASVAB) at MEPS", afct: "Usually paper-and-pencil; some installations offer CAT" },
                { label: "Content", asvab: "9 subtests (same)", afct: "9 subtests (same)" },
                { label: "Scoring", asvab: "Identical scale and composites", afct: "Identical scale and composites" },
                { label: "Score replacement", asvab: "Most recent replaces prior", afct: "Most recent replaces prior (same rule, higher stakes)" },
                { label: "Command approval needed?", asvab: "No (civilian)", afct: "Yes" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-semibold text-text-primary">{row.label}</td>
                  <td className="py-2 pr-4">{row.asvab}</td>
                  <td className="py-2">{row.afct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── WHO SHOULD CONSIDER ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Who Should Consider Taking the AFCT?
        </h2>

        <p className="mt-4 text-text-secondary">
          Service members typically consider the AFCT in one of three situations:
        </p>

        <ul className="mt-4 space-y-3 pl-5 text-text-secondary list-disc">
          <li>
            <strong className="text-text-primary">MOS or rating reclassification.</strong> If you want to switch to a job that requires a higher{" "}
            <Link href="/gt-score" className="text-accent hover:text-accent-hover">
              GT score
            </Link>{" "}
            or a different composite score than your current one qualifies for, the AFCT is the path. See{" "}
            <Link href="/mos-reclassification" className="text-accent hover:text-accent-hover">
              MOS reclassification
            </Link>{" "}
            for details on the process.
          </li>
          <li>
            <strong className="text-text-primary">Promotion or school eligibility.</strong> Some branches require a minimum GT score (often 110) for warrant officer application, specific advanced schools, or competitive assignments.
          </li>
          <li>
            <strong className="text-text-primary">BSEP completion.</strong> Service members who complete the{" "}
            <Link href="/bsep" className="text-accent hover:text-accent-hover">
              Basic Skills Education Program (BSEP)
            </Link>{" "}
            typically take the AFCT immediately after to measure improvement in a controlled environment. BSEP graduates show statistically stronger AFCT results.
          </li>
        </ul>

        {/* ─── SCORE REPLACEMENT RISK ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Score Replacement Risk: The Biggest Practical Difference
        </h2>

        <p className="mt-4 text-text-secondary">
          For a civilian recruit, a lower ASVAB retake score is disappointing but recoverable. You can retake again after the mandatory waiting period. For an active-duty service member, a lower AFCT score can immediately close off options that your current score keeps open, including job changes, school applications, and promotion tracks you were already eligible for.
        </p>
        <p className="text-text-secondary">
          This asymmetry matters. If you are already at a GT score of 110 and want 120 for a warrant officer track, a drop to 95 hurts you in ways it would not hurt a pre-enlistment recruit. Think through what you have to lose, not just what you have to gain, before scheduling.
        </p>
        <p className="text-text-secondary">
          For more on retake rules and when a retest makes sense, see the{" "}
          <Link href="/asvab-retake-policy" className="text-accent hover:text-accent-hover">
            ASVAB retake policy
          </Link>{" "}
          page, which covers the same score-replacement logic that applies to the AFCT.
        </p>

        {/* ─── HOW TO PREPARE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Prepare for the AFCT
        </h2>

        <p className="mt-4 text-text-secondary">
          Preparation for the AFCT is identical to preparation for the ASVAB. The{" "}
          <Link href="/afct" className="text-accent hover:text-accent-hover">
            AFCT overview page
          </Link>{" "}
          covers what to expect in detail. For timed practice in the same format, use the{" "}
          <Link href="/afct-practice-test" className="text-accent hover:text-accent-hover">
            AFCT practice test
          </Link>.
        </p>
        <p className="text-text-secondary">
          If your GT score is the primary target, focus on Verbal Expression (Word Knowledge + Paragraph Comprehension) and Arithmetic Reasoning, which together drive the GT composite. If you have been away from formal academics for years, completing{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP
          </Link>{" "}
          before retesting is strongly recommended.
        </p>

        {/* ─── WHERE TO START ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Where to Start
        </h2>

        <p className="mt-4 text-text-secondary">
          A clear 3-step framework before scheduling the AFCT:
        </p>

        <ol className="mt-4 space-y-4 pl-5 text-text-secondary list-decimal">
          <li>
            <strong className="text-text-primary">Check your current GT score and the target score for your goal.</strong> Know the exact gap. If you need 110 and have 95, that is a 15-point gap on the GT composite. If you need 110 and have 108, that is a tight margin where a small vocabulary improvement may be enough.
          </li>
          <li>
            <strong className="text-text-primary">Decide if the retake is worth the risk.</strong> If your current score already keeps important options open, be deliberate. A score you are satisfied with is worth protecting. The AFCT is not mandatory for service members who simply want to improve.
          </li>
          <li>
            <strong className="text-text-primary">Prepare specifically for the subtests that drive your target composite.</strong> Do not study everything equally. Identify which subtests feed the line score you need, drill those, and take the{" "}
            <Link href="/afct-practice-test" className="text-accent hover:text-accent-hover">
              AFCT practice test
            </Link>{" "}
            until your practice scores comfortably exceed your target by at least 5 to 10 points before you schedule.
          </li>
        </ol>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFCT vs. ASVAB FAQ
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
              { href: "/afct", label: "AFCT Overview" },
              { href: "/afct-practice-test", label: "AFCT Practice Test" },
              { href: "/bsep", label: "BSEP (Basic Skills Education Program)" },
              { href: "/gt-score", label: "GT Score Explained" },
              { href: "/mos-reclassification", label: "MOS Reclassification Guide" },
              { href: "/asvab-retake-policy", label: "ASVAB Retake Policy" },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
