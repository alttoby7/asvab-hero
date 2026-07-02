import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Do You Need an ASVAB Tutor? An Honest Guide | ASVAB Hero",
  description:
    "Wondering if you need an ASVAB tutor? See real tutoring costs, when a tutor is worth it, when it's overkill, and the free self-study path that works for most.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-tutor",
  },
};

const faqItems = [
  {
    q: "How much does an ASVAB tutor cost?",
    a: "Wyzant tutors typically run $35 to $65 an hour (the full range is $15 to $485 plus a 9% fee). Varsity Tutors charges $80 to $173 an hour (roughly $350 to $639 a month, unpublished online). Structured packages run $280 to $880. For a real engagement that moves a struggling student, budget $400 to $1,000+.",
  },
  {
    q: "Are ASVAB tutors worth it?",
    a: "It depends on your situation. A tutor is worth it for severe skill gaps, a short timeline, or a failed prior self-study attempt. It's overkill if you already clear your branch minimum with a month or more to study. The clearest “tell” is whether self-study already failed you.",
  },
  {
    q: "Can I pass the ASVAB without a tutor?",
    a: "Yes, and most people do. There's no pass or fail, just branch minimums. With structured self-study, free resources plus an adaptive practice tool, 10 to 20 AFQT percentile points over four to eight weeks is realistic. See how to study for the ASVAB for a full plan.",
  },
  {
    q: "Online vs in-person ASVAB tutor, which is better?",
    a: "Online tutoring (Wyzant, Varsity, MyGuru's virtual whiteboard) is usually cheaper, gives you a wider tutor pool, and is just as effective for test prep. In-person helps only if you specifically need physical accountability or focus support. For most people, online wins on cost and selection.",
  },
  {
    q: "What are free alternatives to an ASVAB tutor?",
    a: "March2Success (DoD-endorsed), Khan Academy (math gaps), Union Test Prep (1,000+ questions), recruiting-office study groups, and free ASVAB practice tests. Pair any of them with wrong-answer review for real gains. The calculator shows which jobs your scores unlock as you improve.",
  },
];

export default function AsvabTutorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Do You Actually Need an ASVAB Tutor?",
          description:
            "Wondering if you need an ASVAB tutor? See real tutoring costs, when a tutor is worth it, when it's overkill, and the free self-study path that works for most.",
          url: "https://asvabhero.com/asvab-tutor",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-06-18",
          dateModified: "2026-06-18",
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
          { name: "ASVAB Hero", href: "/" },
          {
            name: "Do You Actually Need an ASVAB Tutor?",
            href: "/asvab-tutor",
          },
        ]}
      />

      <article className="prose-asvab">
        {/* ─── INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Do You Actually Need an ASVAB Tutor?
        </h1>

        <p className="mt-6 text-text-secondary">
          You searched &ldquo;asvab tutor&rdquo; because your score isn&apos;t
          where it needs to be, and a tutor feels like the obvious fix. But
          before you spend $300 to $800, there&apos;s a question nobody selling
          tutoring wants you to ask: do you actually need one?
        </p>

        <p className="text-text-secondary">
          Most students who search this don&apos;t. The ones who genuinely do
          have a specific profile, and we&apos;ll show you exactly what it looks
          like.
        </p>

        <p className="text-text-secondary">
          Here&apos;s what we&apos;ll cover: what an <strong>asvab tutor</strong>{" "}
          really does and costs (real numbers, not hidden pricing), the
          situations where a tutor earns its price, when it&apos;s overkill, the
          cheaper self-serve path that works for most people, and how to vet a
          tutor if you decide to hire one.
        </p>

        <p className="text-text-secondary">
          If you&apos;re not sure how far you are from your target, plug your
          numbers into the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          and see the gap before you decide anything.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            This is a decision guide, not a sales page. We build ASVAB practice
            tools, and we&apos;ll tell you flat-out when a human tutor beats
            them.
          </p>
        </aside>

        {/* ─── WHAT A TUTOR DOES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What an ASVAB Tutor Actually Does (and What It Costs)
        </h2>

        <p className="mt-4 text-text-secondary">
          ASVAB tutoring isn&apos;t one price. It ranges from $15 an hour to
          $485 an hour on the same platform, and almost nobody publishes a
          number.
        </p>

        <p className="text-text-secondary">
          That opacity is the first problem. Varsity Tutors won&apos;t show you
          a price online until you call their team. The site asvab-tutoring.com
          hides its packages behind a &ldquo;Loading packages...&rdquo;
          placeholder. You can&apos;t comparison-shop a service that won&apos;t
          tell you what it costs.
        </p>

        <p className="text-text-secondary">
          What a tutor actually does is less mysterious than the pricing. A good
          one runs a diagnostic first, then targets your weak spots. On MyGuru,
          session one is a practice-test review plus a section-by-section
          overview and a custom study plan. Sessions after that are targeted
          strategy, practice problems on a virtual whiteboard, and weekly
          homework. It&apos;s structured practice with feedback and
          accountability, not secret content you can&apos;t get anywhere else.
        </p>

        <p className="text-text-secondary">
          Now the part competitors bury: real prices.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Option
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Format
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Typical Price
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Wyzant 1-on-1
                </td>
                <td className="py-2 pr-4">Online or in-person marketplace</td>
                <td className="py-2 pr-4 font-mono">
                  $35&ndash;$65/hr (range $15&ndash;$485) + 9% fee
                </td>
                <td className="py-2">Per-tutor reviews and hours visible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Varsity Tutors 1-on-1
                </td>
                <td className="py-2 pr-4">Online marketplace</td>
                <td className="py-2 pr-4 font-mono">
                  $80&ndash;$173/hr (~$350&ndash;$639/mo)
                </td>
                <td className="py-2">Pricing not published online</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Independent / Sylvan
                </td>
                <td className="py-2 pr-4">Online or local</td>
                <td className="py-2 pr-4 font-mono">$40&ndash;$100/hr</td>
                <td className="py-2">Varies by tutor</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  asvab-tutors.com packages
                </td>
                <td className="py-2 pr-4">Structured 1-on-1 + email</td>
                <td className="py-2 pr-4 font-mono">
                  $279.99 (2 wk) / $479.99 (4 wk) / $879.99 (8 wk)
                </td>
                <td className="py-2">8-week plan includes a pass guarantee</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Group class (e.g. Andy&apos;s)
                </td>
                <td className="py-2 pr-4">Live group</td>
                <td className="py-2 pr-4 font-mono">~$210 course</td>
                <td className="py-2">Not personalized</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Community-college prep
                </td>
                <td className="py-2 pr-4">6&ndash;8 week class</td>
                <td className="py-2 pr-4 font-mono">$50&ndash;$150 total</td>
                <td className="py-2">Local, group-paced</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            One $60 session won&apos;t move a struggling student. A real 1-on-1
            engagement usually means 8 to 15 hours or more, so budget $400 to
            $1,000+, not a single hour.
          </p>
        </aside>

        <p className="text-text-secondary">
          The verdict on cost: tutoring is a real investment, not a quick
          add-on. Whether it&apos;s worth that investment depends entirely on
          your situation, which is the next two sections.
        </p>

        {/* ─── WORTH IT ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          When an ASVAB Tutor Is Genuinely Worth It
        </h2>

        <p className="mt-4 text-text-secondary">
          Some students absolutely should hire a tutor, and the cost is worth
          every dollar for them. The trick is knowing whether you&apos;re one of
          them.
        </p>

        <p className="text-text-secondary">
          A tutor is the right call when your situation matches one of these:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Severe foundational math gaps.</strong> You can&apos;t
            reliably do fractions, ratios, or percents. You need someone to
            re-teach pre-algebra, not just tell you to &ldquo;practice
            more.&rdquo;
          </li>
          <li>
            <strong>A very short timeline.</strong> Under six weeks to MEPS and
            15+ AFQT percentile points below your target. There&apos;s no runway
            to self-teach math from scratch.
          </li>
          <li>
            <strong>Self-study already failed you.</strong> You tried it once
            and your practice scores didn&apos;t move. That&apos;s the single
            clearest signal that more of the same won&apos;t work.
          </li>
          <li>
            <strong>
              Test anxiety severe enough to tank a score you otherwise have.
            </strong>{" "}
            You know the material in practice but freeze on the clock.
          </li>
          <li>
            <strong>You won&apos;t sustain a solo plan.</strong> You know
            yourself, and a four-to-eight-week routine alone isn&apos;t
            happening without accountability.
          </li>
        </ul>

        <p className="text-text-secondary">
          One scenario stands out because no competitor mentions it.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">
            Accommodations don&apos;t transfer to MEPS
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            IEP or 504 accommodations may apply to the school-administered
            ASVAB, but accommodated scores cannot be used for enlistment. Only
            standard-condition scores count at MEPS. A student with documented
            ADHD or dyslexia who must pass the unaccommodated test is a genuine
            1-on-1 case. The tutor isn&apos;t teaching secret content,
            they&apos;re building test-taking strategy for conditions the
            student can&apos;t get adjusted.
          </p>
        </aside>

        <p className="text-text-secondary">
          One caution on the anxiety case: test anxiety alone is not an ADA
          disability. Only a diagnosed disorder like Generalized Anxiety
          Disorder qualifies for any accommodation, and even then it won&apos;t
          transfer to MEPS.
        </p>

        <p className="text-text-secondary">
          Best for: students with a real skill gap, a tight clock, a failed
          prior attempt, or a documented learning difference. If that&apos;s
          you, the next sections still matter. They&apos;ll help you pick a good
          tutor instead of an expensive one.
        </p>

        {/* ─── OVERKILL ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          When a Tutor Is Overkill (Which Is Most People)
        </h2>

        <p className="mt-4 text-text-secondary">
          For most people, a tutor is overkill, and the marketing that says
          otherwise leans on a number that doesn&apos;t mean what you think.
        </p>

        <p className="text-text-secondary">
          You&apos;re probably in the overkill group if you already clear your
          branch minimum, have two or more months before testing, and can hold a
          routine. That describes most people typing &ldquo;asvab tutor&rdquo;
          into Google.
        </p>

        <p className="text-text-secondary">
          Every tutoring service promises a &ldquo;20 to 50 point
          increase,&rdquo; and that claim is doing a lot of quiet work.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            The percentile myth
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT is a percentile from 1 to 99, not a percentage-correct or
            &ldquo;raw point&rdquo; score. When a service says &ldquo;20 to 50
            points,&rdquo; they mean percentile points, and moving from the 25th
            to the 45th percentile is a different lift than 65th to 85th. None of
            them disclose baseline scores, sample sizes, or whether they mean
            AFQT percentile or standard subtest scores (mean 50, SD 10), a
            different scale using the same confusing 1-to-99 language. Treat the
            claims as best-case, not average.
          </p>
        </aside>

        <p className="text-text-secondary">
          What actually drives a score gain: practice volume, spaced repetition,
          and targeting your weakest AFQT subtests. That&apos;s a method, not a
          mode. A tutor is one delivery vehicle for it. So is structured
          self-study.
        </p>

        <p className="text-text-secondary">
          The realistic number, stripped of marketing, is 10 to 20 AFQT
          percentile points over four to eight weeks at 5 to 10 hours a week for
          a motivated student. Khan Academy&apos;s SAT data showed 20 hours of
          focused practice produced a measurable gain, a proxy for the
          principle, not an ASVAB promise. Anyone guaranteeing a specific number
          is selling, not measuring.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            The retake trap
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Your latest score counts, not your highest. And gaining 20+ AFQT
            points triggers a mandatory Confirmation Test. &ldquo;Just retake
            it&rdquo; without real prep can lock in a worse score and delay you,
            which is one more reason method matters more than buying hours.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you&apos;re above your minimum with weeks to spare, $600 of
          tutoring buys accountability you could get from a $15 study app and a
          calendar. Here&apos;s what that self-serve path looks like.
        </p>

        {/* ─── SELF-SERVE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Self-Serve Alternative: Structured Practice That Actually Works
        </h2>

        <p className="mt-4 text-text-secondary">
          You can run the exact playbook a good tutor uses for a fraction of the
          cost. Diagnose, target, repeat.
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              Step 1 Diagnose
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Take a full-length timed practice test for a real baseline (AFQT
              plus subtest standard scores).
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              Step 2 Target
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Map your weak subtests to the line scores your target job needs,
              and study those, not just overall AFQT.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              Step 3 Repeat
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              30 to 60 minutes daily with spaced repetition beats weekend
              cramming for retention.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              Step 4 Review
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Study every wrong answer for the concept, then retest with a
              practice test before committing to a real date.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Self-study has a real catch, and we won&apos;t hide it. It demands
          discipline and honest self-assessment. Without feedback, you can
          reinforce a wrong understanding and never notice. That&apos;s exactly
          the gap good tools and free resources fill.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Path
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What You Get
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Free tier (March2Success, Khan Academy, Union Test Prep)
                </td>
                <td className="py-2 pr-4">Broad practice, no personalization</td>
                <td className="py-2 font-mono">$0</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Budget course (Kaplan)
                </td>
                <td className="py-2 pr-4">
                  Structured practice + score guarantee
                </td>
                <td className="py-2 font-mono">~$149</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ASVAB Hero
                </td>
                <td className="py-2 pr-4">
                  Adaptive practice, weak-area targeting, study guides, progress
                  tracking
                </td>
                <td className="py-2 font-mono">
                  Free to start; Pro $14.99/mo or $59 for a 90-day pass
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  1-on-1 tutor
                </td>
                <td className="py-2 pr-4">Personalized live help</td>
                <td className="py-2 font-mono">$400&ndash;$1,000+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          March2Success is DoD-endorsed and free to any potential recruit. Khan
          Academy is the best free option for closing math gaps. Union Test Prep
          has over 1,000 free practice questions across all nine subtests.
        </p>

        <p className="text-text-secondary">
          ASVAB Hero automates the diagnose-target-repeat loop. The adaptive
          questions surface your weak subtests, the{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            study guide
          </Link>{" "}
          re-teaches the concepts you miss, and the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            calculator
          </Link>{" "}
          shows which jobs your scores unlock. Start with{" "}
          <Link
            href="/free-asvab-practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice tests
          </Link>{" "}
          and upgrade only if you want the adaptive targeting. See the full plan
          in{" "}
          <Link
            href="/how-to-study-for-the-asvab"
            className="text-accent hover:text-accent-hover"
          >
            how to study for the ASVAB
          </Link>{" "}
          and the{" "}
          <Link
            href="/pricing"
            className="text-accent hover:text-accent-hover"
          >
            pricing
          </Link>{" "}
          page.
        </p>

        <p className="text-text-secondary">
          Direct recommendation: if you have a few weeks and a clear target,
          start free, find your weak subtests, and only spend money once you
          know exactly where the gap is.
        </p>

        {/* ─── HOW TO CHOOSE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Choose an ASVAB Tutor If You Get One
        </h2>

        <p className="mt-4 text-text-secondary">
          &ldquo;Tutors the ASVAB&rdquo; on a profile means nothing. Anyone can
          list it. Here&apos;s how to separate a real specialist from a general
          math tutor charging the same $75 an hour.
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              1. Ask their own AFQT score.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Expect 90th percentile or higher. Some Wyzant tutors advertise
              99th-percentile AFQT scores. Reluctance to answer is a red flag.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              2. Ask which subtests they specialize in.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              AR and MK for AFQT is different from MC and EI for technical line
              scores. Match it to your gap.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              3. Ask how the first session works.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The correct answer is a diagnostic first, then a custom plan.
              Jumping straight to generic content is a red flag.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              4. Ask if they can re-teach foundational math.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Fractions and ratios, not just test strategy. Essential if your
              gap is skills, not tactics.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              5. Ask how many ASVAB students they&apos;ve worked with.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              On Wyzant, check reviews and hours logged. High-volume tutors
              recognize error patterns.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <p className="font-mono text-sm font-bold text-accent">
              6. Confirm they know the retake policy.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Latest score counts, and 20+ point gains trigger a C-Test. A tutor
              who doesn&apos;t know this doesn&apos;t know the test.
            </p>
          </div>
        </div>

        <figure className="my-8 overflow-hidden rounded-2xl border border-navy-border bg-navy-light">
          <div className="flex items-center justify-between gap-4 border-b border-navy-border px-4 py-3">
            <div>
              <p className="font-display text-sm font-bold text-text-primary">
                ASVAB Tutor Vetting Checklist
              </p>
              <p className="text-xs text-text-secondary">
                The six questions above, on one printable page.
              </p>
            </div>
            <a
              href="/asvab-tutor-vetting-checklist.pdf"
              download
              className="shrink-0 rounded-xl bg-accent px-4 py-2 font-display text-sm font-bold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
            >
              Download PDF
            </a>
          </div>
          <object
            data="/asvab-tutor-vetting-checklist.pdf#toolbar=0&navpanes=0&view=FitH"
            type="application/pdf"
            aria-label="ASVAB Tutor Vetting Checklist preview"
            className="h-[600px] w-full bg-white"
          >
            <div className="px-4 py-10 text-center text-sm text-text-secondary">
              Your browser can&apos;t display the PDF inline.{" "}
              <a
                href="/asvab-tutor-vetting-checklist.pdf"
                download
                className="text-accent hover:text-accent-hover"
              >
                Download the printable checklist
              </a>
              .
            </div>
          </object>
        </figure>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Military-veteran tutors often know which subtests gate which MOS or
            rating, a dimension purely academic tutors miss. Useful if
            you&apos;re chasing a specific job, not just an AFQT minimum.
          </p>
        </aside>

        <p className="text-text-secondary">
          The verdict: if a tutor can&apos;t answer questions 1 through 4
          confidently, keep your $75. You&apos;ll get the same generic
          curriculum from a free practice platform.
        </p>

        {/* ─── BOTTOM LINE ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Bottom Line: A 30-Second Self-Check
        </h2>

        <p className="mt-4 text-text-secondary">
          Most people searching &ldquo;asvab tutor&rdquo; don&apos;t need one.
          They need a method, and the method is the same whether a tutor or an
          app delivers it.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">
            Run this on yourself
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Lean tutor if two or more of these are true: severe math gaps, under
            six weeks to MEPS and 15+ points below target, you already tried
            self-study and didn&apos;t improve, a documented learning difference
            you must test around, or you know you won&apos;t sustain a solo plan.
            Lean self-serve if you clear your branch minimum, have a month or
            more, and can hold a daily routine.
          </p>
        </aside>

        <p className="text-text-secondary">
          Either way, start by finding out exactly how far you are from your
          target and which subtests are weak. A full-length timed practice test
          plus your branch minimum gives you the gap in one sitting. That single
          diagnostic decides everything, and it costs nothing.
        </p>

        <div className="my-6 rounded-2xl border border-accent/40 bg-navy p-5">
          <p className="font-display text-base font-bold text-text-primary">
            Find your baseline first
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Plug your scores into the{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              free calculator
            </Link>{" "}
            and take a{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              practice test
            </Link>{" "}
            to find your baseline. Upgrade to Pro only if you want the adaptive
            weak-area targeting.
          </p>
        </div>

        <p className="text-text-secondary">
          Don&apos;t pay for a tutor, or a Pro plan, until you know what your gap
          actually is.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          ASVAB Tutor FAQ
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

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            Before you retake
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Your latest score counts, not your highest, and a 20+ point jump
            triggers a Confirmation Test. Don&apos;t schedule a real retest until
            practice scores consistently clear your target. See the full{" "}
            <Link
              href="/asvab-retake-policy"
              className="text-accent hover:text-accent-hover"
            >
              retake policy
            </Link>
            .
          </p>
        </aside>

        {/* ─── CTA ─── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite
            scores, and every job you qualify for.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Free Calculator
          </Link>
        </div>

        <div className="not-prose">
          <RelatedLinks
            title="Plan your ASVAB prep"
            links={[
              {
                href: "/how-to-study-for-the-asvab",
                label: "How to Study for the ASVAB",
                blurb: "The full diagnose-target-repeat plan most students need instead of a tutor.",
              },
              {
                href: "/free-asvab-practice-test",
                label: "Free ASVAB Practice Test",
                blurb: "Get a real baseline and find your weak subtests before you spend a dollar.",
              },
              {
                href: "/asvab-study-guide",
                label: "ASVAB Study Guide",
                blurb: "Re-teach the concepts you miss, subtest by subtest.",
              },
              {
                href: "/asvab-retake-policy",
                label: "ASVAB Retake Policy",
                blurb: "Why your latest score counts and what triggers a Confirmation Test.",
              },
              {
                href: "/pricing",
                label: "ASVAB Hero Pricing",
                blurb: "Free to start, with a 90-day pass when you want adaptive targeting.",
              },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
