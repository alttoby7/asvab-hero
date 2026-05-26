import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import EmailCapture from "@/components/EmailCapture";
import VerifiedBlock from "@/components/VerifiedBlock";
import { subtestPracticeIndex } from "@/lib/free-practice";

export const metadata: Metadata = {
  title: "Free ASVAB Practice Tests (2026): What's Actually Worth Using",
  description:
    "Honest reviews of the 6 best free ASVAB practice tests in 2026. Includes question counts, explanations, signup requirements, and an AFQT estimator comparison. Plus our free 30-question diagnostic.",
  alternates: {
    canonical: "https://asvabhero.com/free-asvab-practice-tests",
  },
};

export default function FreeAsvabPracticeTestsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Free ASVAB Practice Tests (2026 Resource List + What's Worth Your Time)",
          description:
            "Honest reviews of the 6 best free ASVAB practice tests in 2026. Includes question counts, explanations, signup requirements, and an AFQT estimator comparison.",
          url: "https://asvabhero.com/free-asvab-practice-tests",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-04-27",
          dateModified: "2026-04-27",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is one free practice test enough to prepare for the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "One practice test is enough to get a baseline, not enough to prepare. A single test shows you where you stand today. Fixing weak spots takes repeated drilling on the specific subtests dragging your score down. Treat your first practice test as a diagnosis, not as prep.",
              },
            },
            {
              "@type": "Question",
              name: "How accurate are free AFQT estimates from practice tests?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Reasonably close if the test covers all four AFQT subtests (AR, WK, PC, MK) with real question difficulty. Generic quiz-style tests with easy questions will overestimate your real AFQT. The ASVAB Hero diagnostic covers all 9 subtests in the same multiple-choice format as the CAT-ASVAB, but treat the result as a practice estimate, not an official score. Only a test-center sitting produces an official AFQT.",
              },
            },
            {
              "@type": "Question",
              name: "Can I take the real ASVAB online?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The PiCAT (Pre-screen, internet-delivered CAT) can be taken at home, but it requires recruiter authorization and a follow-up verification test at MEPS within 45 days. The full CAT-ASVAB is always administered in person at MEPS or a MET site. There is no way to take the official scored ASVAB from home without the verification step.",
              },
            },
            {
              "@type": "Question",
              name: "Are PDF practice tests worth using?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For question variety, yes. For simulating real test conditions, no. The actual ASVAB is adaptive and computer-based, adjusting question difficulty as you go. A static PDF gives you fixed questions and no timing enforcement. Use PDFs to drill specific subtests, but do at least one full timed digital practice test before you sit at MEPS.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between a practice test and the real ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The real CAT-ASVAB at MEPS is computer-adaptive, questions get harder as you answer correctly, which means the test is always working at the edge of your ability. Practice tests are typically fixed-difficulty. The real test also covers 9 subtests under timed conditions in a proctored room. Most free practice tests cover fewer subtests or don't enforce time limits. Practice tests are useful for identifying weak areas and building familiarity with question formats, but they aren't a perfect simulation of MEPS conditions.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Free ASVAB Practice Tests (2026 Resource List + What&apos;s Worth
          Your Time)
        </h1>

        <p className="mt-4 text-text-secondary">
          You searched for free ASVAB practice tests. There are dozens of them.
          Most aren&apos;t worth your time. This page covers the six that
          actually are, what each one does well, where it falls short, and how
          to use any of them so you walk out of MEPS with the score you need. If
          you&apos;ve already tested once, read the{" "}
          <Link
            href="/how-to-retake-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB retake rules
          </Link>{" "}
          before booking your next attempt.
        </p>

        <VerifiedBlock
          title="Before you pick one, start here"
          verifiedDate="May 2026"
          sources={[
            { label: "Official ASVAB sample questions", url: "https://www.officialasvab.com/applicants/sample-questions/" },
            { label: "Official ASVAB prep disclaimer", url: "https://www.officialasvab.com/applicants/asvab-test-preparation-disclaimer/" },
            { label: "March2Success (free, official)", url: "https://www.march2success.com" },
          ]}
        >
          <p>
            The official ASVAB program directs test-takers to its own free
            sample questions and to March2Success first. The reviews below are
            independent and include ASVAB Hero (we publish this page); use
            multiple sources, and treat any practice score as an estimate.
          </p>
        </VerifiedBlock>

        {/* TL;DR — independent options first, our diagnostic listed last with disclosure */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Where to start (free, no purchase)</p>
          <ul className="mt-2 space-y-1 text-sm text-text-secondary list-none">
            <li>
              <strong className="text-text-primary">Official ASVAB sample questions:</strong> a small but authoritative set published by the ASVAB program itself; the cleanest place to begin.
            </li>
            <li>
              <strong className="text-text-primary">March2Success:</strong> the U.S. Army&apos;s free official prep portal; broad coverage. Signup required, dated UX.
            </li>
            <li>
              <strong className="text-text-primary">UnionTestPrep:</strong> large independent question bank, no signup, decent explanations. Ad-heavy but usable.
            </li>
            <li>
              <strong className="text-text-primary">ASVAB Hero diagnostic (we publish this page):</strong> 30 questions across all 9 subtests, full explanations, AFQT estimate, no signup. Listed last for transparency; use alongside the resources above, not in place of them.
            </li>
          </ul>
        </aside>

        {/* Section 1: Why most waste your time */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why Most &ldquo;Free&rdquo; Practice Tests Waste Your Time
        </h2>

        <p className="mt-4 text-text-secondary">
          The problem with free ASVAB tests online isn&apos;t that they
          don&apos;t exist. It&apos;s that most of them share the same four
          flaws:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">5&ndash;10 questions total</p>
            <p className="mt-1 text-sm text-text-secondary">
              Not enough to identify real weaknesses. A 5-question &ldquo;practice test&rdquo; is a quiz, not a diagnostic.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">No explanations</p>
            <p className="mt-1 text-sm text-text-secondary">
              You see a wrong answer, click next, and learn nothing. Without per-question explanations, you just practiced your mistakes.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Outdated questions</p>
            <p className="mt-1 text-sm text-text-secondary">
              Some sites are running question banks from 2010. The ASVAB format has changed. Old questions don&apos;t reflect current difficulty calibration.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">No AFQT estimator</p>
            <p className="mt-1 text-sm text-text-secondary">
              If the test doesn&apos;t cover AR, WK, PC, and MK together and give you an AFQT estimate, you have no idea where you&apos;d actually land at MEPS.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The six options below have real question counts, real explanations, or
          real institutional backing, in some cases all three.
        </p>

        {/* Section 2: Methodology */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What We Used to Evaluate Them
        </h2>

        <p className="mt-4 text-text-secondary">
          Each option below was reviewed against the same criteria:
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Criterion</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Why It Matters</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Question count per test</td>
                <td className="py-2">Fewer than 15 per subtest isn&apos;t meaningful for diagnosis</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Per-question explanations</td>
                <td className="py-2">Required to learn from wrong answers, not just count them</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">AFQT-eligible content</td>
                <td className="py-2">Must cover AR, WK, PC, MK to estimate enlistment eligibility</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Ad density</td>
                <td className="py-2">Heavy ads break concentration; some sites are unusable on mobile</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mobile usability</td>
                <td className="py-2">Most recruits study from their phone</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Signup required</td>
                <td className="py-2">A paywall or forced registration kills impulse study sessions</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Score tracking</td>
                <td className="py-2">Lets you see progress over multiple sessions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: #1: ASVAB Hero */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          #1: ASVAB Hero Free Diagnostic
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB Hero diagnostic is 30 questions spread across all 9
          subtests. No signup required to take it. You get an AFQT estimate
          and a subtest-by-subtest breakdown the moment you finish, plus a
          per-question explanation for every answer.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">Pros</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>30 questions covering all 9 subtests, enough for a real baseline</li>
              <li>AFQT estimate shown at the end</li>
              <li>Full explanation for every question, including why wrong answers are wrong</li>
              <li>Weak-topic identification, shows which subtests need the most work</li>
              <li>No signup required to start or finish the test</li>
              <li>Mobile-friendly, no ads</li>
            </ul>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">Limitation</p>
            <p className="mt-1 text-sm text-text-secondary">
              The free diagnostic is 30 questions. To drill individual subtests
              with more questions and track progress across sessions, you need
              a free account (or upgrade to Pro).
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          It&apos;s designed for recruits who want to know where they actually
          stand, not a vague letter grade, but a real AFQT estimate and a
          list of which subtests are holding them back.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/practice-test"
            className="inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white text-center transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Take the Free 30-Question Diagnostic
          </Link>
          <Link
            href="/signup"
            className="inline-block rounded-xl border border-accent px-6 py-3 font-display text-base font-bold text-accent text-center transition-all duration-200 hover:bg-accent/10 no-underline"
          >
            Save Progress with a Free Account
          </Link>
        </div>

        {/* Section 4: #2: UnionTestPrep */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          #2: UnionTestPrep
        </h2>

        <p className="mt-4 text-text-secondary">
          UnionTestPrep has one of the larger free question banks for the ASVAB.
          You can practice individual subtests by category without creating an
          account, and the explanations are generally solid, more than just
          &ldquo;the answer is B.&rdquo;
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">Pros</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Large question bank across all subtests</li>
              <li>No signup required</li>
              <li>Reasonable explanations on most questions</li>
            </ul>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">Cons</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Ad-heavy, distracting on mobile, intrusive on desktop</li>
              <li>No AFQT estimator; you&apos;ll have to do the math yourself</li>
              <li>No progress tracking across sessions without an account</li>
            </ul>
          </div>
        </div>

        <p className="text-text-secondary">
          UnionTestPrep is a good supplement if you want more question variety
          after you&apos;ve used the ASVAB Hero diagnostic to identify your
          weak spots. Use it for subtest drilling, not for a baseline assessment.
        </p>

        {/* Email Capture, inline, mid-page */}
        <div className="my-10">
          <EmailCapture
            variant="inline"
            tag="free-tests-page"
            headline="Get your 30-day ASVAB study plan"
            subhead="We&apos;ll email you a week-by-week prep schedule + a 5-email crash course on AFQT and line scores. Free."
            cta="Send it to me"
          />
        </div>

        {/* Our free per-subtest practice tests */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Free ASVAB practice tests by subtest
        </h2>
        <p className="mt-4 text-text-secondary">
          Beyond the full diagnostic, we publish free practice questions for each
          ASVAB subtest, every question has the correct answer and a full
          explanation, and none of them require an account:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {subtestPracticeIndex().map((s) => (
            <li key={s.slug}>
              <Link
                href={`/free-asvab-practice-test/${s.slug}`}
                className="text-accent underline hover:text-accent-hover"
              >
                ASVAB {s.meta.fullName} practice test ({s.questions.length} questions)
              </Link>
            </li>
          ))}
        </ul>

        {/* Section 5: #3: March2Success */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          #3: March2Success (Army&apos;s Free Portal)
        </h2>

        <p className="mt-4 text-text-secondary">
          March2Success is the U.S. Army&apos;s free academic prep program.
          It includes full ASVAB prep across all subtests, not just math and
          English, but the full battery. The content is accurate, institution-
          backed, and genuinely comprehensive.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">Pros</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Official Army resource, content is reliable and current</li>
              <li>Free and comprehensive</li>
              <li>Covers all ASVAB subtests with study lessons, not just quizzes</li>
            </ul>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">Cons</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Signup required before accessing any content</li>
              <li>Dated interface, slow to navigate on mobile</li>
              <li>Army-focused framing; recruits targeting other branches may find the context off</li>
              <li>No AFQT estimator</li>
            </ul>
          </div>
        </div>

        <p className="text-text-secondary">
          If you&apos;re targeting the Army specifically, March2Success is
          worth creating an account. If you want branch-agnostic prep with less
          friction, start elsewhere.
        </p>

        {/* Section 6: #4: 4Tests / Test-Guide */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          #4: 4Tests / Test-Guide.com
        </h2>

        <p className="mt-4 text-text-secondary">
          These two sites take a similar approach: multiple short practice tests
          for each ASVAB subtest, no signup required, accessible on any device.
          The variety is genuinely useful if you&apos;ve already diagnosed your
          weak spots and want more reps.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">Pros</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Multiple short tests per subtest, useful for variety</li>
              <li>No signup</li>
              <li>Accessible and fast to load</li>
            </ul>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">Cons</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Individual tests are short (10&ndash;20 questions); not a full diagnostic</li>
              <li>No AFQT calculation</li>
              <li>Explanation quality is inconsistent</li>
              <li>No cross-session tracking</li>
            </ul>
          </div>
        </div>

        <p className="text-text-secondary">
          Good for drilling a specific subtest on a lunch break. Not a
          replacement for a full-length timed test before MEPS.
        </p>

        {/* Section 7: #5: Kaplan */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          #5: Kaplan Free Sample
        </h2>

        <p className="mt-4 text-text-secondary">
          Kaplan offers a small free sample of their ASVAB course, typically
          around 20 questions. The quality is noticeably higher than generic
          quiz sites. The questions are well-written, the explanations are clear,
          and the interface is clean.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">Pros</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>High-quality questions and explanations</li>
              <li>Clean, ad-free interface</li>
              <li>Good preview of what structured test prep looks like</li>
            </ul>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">Cons</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Only ~20 items, too short for a real diagnostic</li>
              <li>Explicitly a teaser for their paid course ($200+)</li>
              <li>The free portion is gated, you&apos;ll see upsell prompts throughout</li>
            </ul>
          </div>
        </div>

        <p className="text-text-secondary">
          Kaplan&apos;s free sample is worth a look to understand what
          high-quality questions feel like. Don&apos;t expect it to substitute
          for a full practice test.
        </p>

        {/* Section 8: #6: GoArmy.com / Official */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          #6: GoArmy.com / Official Government Practice
        </h2>

        <p className="mt-4 text-text-secondary">
          GoArmy.com and some .mil resources include basic ASVAB practice
          content. The content is accurate, it&apos;s official government
          material, but the experience is basic. Expect a small number of
          sample questions with minimal feedback.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-emerald-400">Pros</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Official government content, accurate and current</li>
              <li>Free with no signup</li>
              <li>Good for understanding what the real ASVAB covers</li>
            </ul>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-amber-400">Cons</p>
            <ul className="mt-1 space-y-1 text-sm text-text-secondary list-disc list-inside">
              <li>Very few questions, more of an orientation than a practice test</li>
              <li>No AFQT estimator, no score tracking, minimal explanations</li>
              <li>Navigation is cumbersome on .mil sites</li>
            </ul>
          </div>
        </div>

        <p className="text-text-secondary">
          Use this to confirm you understand the test format from an official
          source. Don&apos;t rely on it for actual prep.
        </p>

        {/* Section 9: Comparison Table */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Comparison: All 6 Free Options Side by Side
        </h2>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Option</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Questions</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Explanations</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Signup?</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">AFQT Est.</th>
                <th className="pb-2 pr-3 text-left font-semibold text-text-secondary">Tracking</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Mobile</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-3 font-semibold text-text-primary">ASVAB Hero</td>
                <td className="py-2 pr-3">30 (all 9 subtests)</td>
                <td className="py-2 pr-3 text-emerald-400">Yes</td>
                <td className="py-2 pr-3 text-emerald-400">No</td>
                <td className="py-2 pr-3 text-emerald-400">Yes</td>
                <td className="py-2 pr-3">With account</td>
                <td className="py-2 text-emerald-400">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-3 font-semibold text-text-primary">UnionTestPrep</td>
                <td className="py-2 pr-3">Large bank</td>
                <td className="py-2 pr-3 text-emerald-400">Yes</td>
                <td className="py-2 pr-3 text-emerald-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 text-amber-400">Ad-heavy</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-3 font-semibold text-text-primary">March2Success</td>
                <td className="py-2 pr-3">Comprehensive</td>
                <td className="py-2 pr-3 text-emerald-400">Yes</td>
                <td className="py-2 pr-3 text-amber-400">Required</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 pr-3 text-emerald-400">Yes</td>
                <td className="py-2 text-amber-400">Dated</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-3 font-semibold text-text-primary">4Tests / Test-Guide</td>
                <td className="py-2 pr-3">10&ndash;20 / test</td>
                <td className="py-2 pr-3 text-amber-400">Partial</td>
                <td className="py-2 pr-3 text-emerald-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 text-emerald-400">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-3 font-semibold text-text-primary">Kaplan Sample</td>
                <td className="py-2 pr-3">~20 (teaser)</td>
                <td className="py-2 pr-3 text-emerald-400">Yes</td>
                <td className="py-2 pr-3 text-amber-400">Yes</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 text-emerald-400">Yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-semibold text-text-primary">GoArmy.com</td>
                <td className="py-2 pr-3">Very few</td>
                <td className="py-2 pr-3 text-amber-400">Minimal</td>
                <td className="py-2 pr-3 text-emerald-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 pr-3 text-amber-400">No</td>
                <td className="py-2 text-amber-400">Clunky</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 10: What free can't give you */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What &ldquo;Free&rdquo; Can&apos;t Give You
        </h2>

        <p className="mt-4 text-text-secondary">
          Free practice tests will give you a baseline. They&apos;ll show you
          which subtests are dragging your AFQT down. That&apos;s genuinely
          useful, but it&apos;s step one, not step three.
        </p>

        <p className="text-text-secondary">
          What free resources almost never include:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Unlimited drilling on your weak subtests</p>
            <p className="mt-1 text-sm text-text-secondary">
              One free test gives you a snapshot. Fixing weak spots means doing
              50&ndash;100 more questions on that subtest until you stop missing
              the same patterns.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Progress tracking across sessions</p>
            <p className="mt-1 text-sm text-text-secondary">
              You can&apos;t tell if you&apos;re improving without data across
              multiple sessions. Most free sites reset when you close the tab.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Adaptive difficulty</p>
            <p className="mt-1 text-sm text-text-secondary">
              The real ASVAB at MEPS is adaptive, it adjusts to your level.
              Static free tests don&apos;t simulate that experience.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          If you want to fix weak spots rather than just identify them, your
          options are a study book ($20&ndash;35 one-time, see our{" "}
          <Link href="/best-asvab-study-book" className="text-accent hover:text-accent-hover">
            best ASVAB study book guide
          </Link>
          ) or unlimited online practice. ASVAB Hero&apos;s{" "}
          <Link href="/upgrade?from=free-tests" className="text-accent hover:text-accent-hover">
            Pro plan ($9.99/mo)
          </Link>{" "}
          gives you unlimited subtest drilling, full-length practice tests, and
          progress tracking, cancel anytime once you&apos;ve sat at MEPS.
        </p>

        {/* Section 11: How to use a free practice test wisely */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Use a Free Practice Test Wisely
        </h2>

        <p className="mt-4 text-text-secondary">
          A free practice test is only useful if you use the results. Here&apos;s
          how to get the most out of one:
        </p>

        <div className="my-4 space-y-3">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">1. Take it timed</p>
            <p className="mt-1 text-sm text-text-secondary">
              The real CAT-ASVAB has per-subtest time limits. Don&apos;t give
              yourself unlimited time. Set a timer and simulate real conditions.
              How you perform under time pressure is what matters at MEPS.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">2. Review every wrong answer</p>
            <p className="mt-1 text-sm text-text-secondary">
              Don&apos;t skip the explanations. If you don&apos;t understand why
              you got something wrong, you&apos;ll get it wrong again. Read the
              explanation, rework the problem from scratch, and confirm you can
              solve the same type on a different question before moving on.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">3. Don&apos;t retake the same test</p>
            <p className="mt-1 text-sm text-text-secondary">
              Retaking the same questions gives you inflated scores because
              you&apos;ve seen the questions before. Use different tests when
              drilling the same subtest. Your goal is to improve on question
              types, not memorize specific answers.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">4. Drill weak subtests specifically</p>
            <p className="mt-1 text-sm text-text-secondary">
              If your diagnostic shows you&apos;re weak in Arithmetic Reasoning
              and strong in Word Knowledge, put 80% of your study time into AR.
              Improving by 5 points in your weakest subtest does more for your
              AFQT than improving by 5 points in your strongest.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">5. Benchmark weekly, not daily</p>
            <p className="mt-1 text-sm text-text-secondary">
              One week of drilling will show meaningful improvement. One day
              won&apos;t. Take a full diagnostic at the start of each week,
              compare your AFQT estimate, and adjust your study plan based on
              what moved and what didn&apos;t.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is one free practice test enough to prepare for the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              One practice test is enough to get a baseline, not enough to
              prepare. A single test shows you where you stand today. Fixing
              weak spots takes repeated drilling on the specific subtests
              dragging your score down. Treat your first practice test as a
              diagnosis, not as prep.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How accurate are free AFQT estimates from practice tests?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Reasonably close if the test covers all four AFQT subtests (AR,
              WK, PC, MK) with real question difficulty. Generic quiz-style
              tests with easy questions will overestimate your real AFQT. The
              ASVAB Hero diagnostic covers all 9 subtests in the same multiple-
              choice format as the CAT-ASVAB, but treat the result as a practice
              estimate, not an official score. Only a test-center sitting
              produces an official AFQT.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I take the real ASVAB online?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The PiCAT (Pre-screen, internet-delivered CAT) can be taken at
              home, but it requires recruiter authorization and a follow-up
              verification test at MEPS within 45 days. The full CAT-ASVAB is
              always administered in person at MEPS or a MET site. There is no
              way to take the official scored ASVAB from home without the
              verification step.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Are PDF practice tests worth using?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              For question variety, yes. For simulating real test conditions,
              no. The actual ASVAB is adaptive and computer-based, adjusting
              question difficulty as you go. A static PDF gives you fixed
              questions and no timing enforcement. Use PDFs to drill specific
              subtests, but do at least one full timed digital practice test
              before you sit at MEPS.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s the difference between a practice test and the real
              ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The real CAT-ASVAB at MEPS is computer-adaptive, questions get
              harder as you answer correctly, which means the test is always
              working at the edge of your ability. Practice tests are typically
              fixed-difficulty. The real test also covers 9 subtests under
              timed conditions in a proctored room. Most free practice tests
              cover fewer subtests or don&apos;t enforce time limits. Practice
              tests are useful for identifying weak areas and building
              familiarity with question formats, but they aren&apos;t a perfect
              simulation of MEPS conditions.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            Ready to See Where You Stand?
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Take the free 30-question diagnostic now. No signup required. Get
            your AFQT estimate and a subtest-by-subtest breakdown in under 20
            minutes.
          </p>
          <Link
            href="/practice-test"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Take the Free Diagnostic Now
          </Link>
        </div>
      </article>
    </div>
  );
}
