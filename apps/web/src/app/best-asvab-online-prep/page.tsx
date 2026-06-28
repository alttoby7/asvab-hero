import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { QUESTIONS_PLUS } from "@/lib/bank-stats";

export const metadata: Metadata = {
  title: "Best ASVAB Online Prep 2026: Honest Comparison",
  description:
    "An honest head-to-head comparison of the best ASVAB online prep services in 2026, ASVAB Hero Pro, Mometrix Academy, Kaplan, Princeton Review, Peterson's, and UnionTestPrep. Price, question count, score tracking, and refund policy, all in one place.",
  alternates: {
    canonical: "https://asvabhero.com/best-asvab-online-prep",
  },
};

export default function BestASVABOnlinePrepPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Best ASVAB Online Prep 2026 (Honest Comparison: ASVAB Hero, Mometrix, Kaplan, More)",
          description:
            "An honest head-to-head comparison of the best ASVAB online prep services in 2026, price, question count, score tracking, and refund policy.",
          url: "https://asvabhero.com/best-asvab-online-prep",
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
              name: "Is paid ASVAB prep necessary?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No, free resources exist (UnionTestPrep, Khan Academy for math, government practice tests) and many recruits pass without paying. Paid prep earns its cost when you need structured progress tracking, weak-topic identification, or unlimited practice volume without hunting across a dozen sites.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use multiple ASVAB prep services at once?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, but it rarely helps. Most people get better results going deep on one platform than wide across several. The exception: use a free tool (UnionTestPrep) for additional question volume while a paid platform tracks your progress.",
              },
            },
            {
              "@type": "Question",
              name: "What is the cheapest ASVAB online prep option?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UnionTestPrep is completely free and covers all ASVAB subtests with a large question bank, no account required. Among paid options, ASVAB Hero Pro is the best value, a one-time 90-Day Pass for $59 (or $24.99/month) with score tracking and unlimited practice.",
              },
            },
            {
              "@type": "Question",
              name: "Are there free ASVAB prep alternatives?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. UnionTestPrep (uniontestprep.com) offers free practice questions across all subtests. Khan Academy covers the math subtests well. The official ASVAB website (official.asvabprogram.com) has sample questions. ASVAB Hero also offers a free 30-question diagnostic to start.",
              },
            },
            {
              "@type": "Question",
              name: "Can I get a refund if I'm not happy with an ASVAB prep course?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Refund policies vary significantly. ASVAB Hero Pro offers a 7-day money-back guarantee, no questions asked. Mometrix Academy has a lifetime guarantee on their book products but check their specific online course terms. Kaplan and Princeton Review offer conditional satisfaction guarantees, read the fine print carefully before purchasing. Peterson's terms vary by product.",
              },
            },
          ],
        }}
      />

      {/* Hero */}
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
          Comparison Guide · 2026
        </p>
        <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-text-primary sm:text-4xl">
          Best ASVAB Online Prep 2026: Honest Comparison
        </h1>
        <p className="text-base text-text-tertiary">
          ASVAB Hero Pro &middot; Mometrix Academy &middot; Kaplan &middot; Princeton Review &middot; Peterson&apos;s &middot; UnionTestPrep (free)
        </p>
      </div>

      {/* Transparency note */}
      <div className="mb-8 rounded-xl border border-navy-border bg-navy-light p-4">
        <p className="text-sm italic text-text-secondary leading-relaxed">
          <strong className="text-text-primary not-italic">Transparency:</strong> ASVAB Hero Pro is on this list. We built it. We ranked it where the math puts it, using the same criteria applied to every other product. Our methodology is in the next section. Judge for yourself.
        </p>
      </div>

      {/* TL;DR */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          TL;DR, Quick Picks
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-accent/30 bg-accent-dim p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
              Best for self-study
            </p>
            <p className="font-display text-sm font-bold text-text-primary mb-1">
              ASVAB Hero Pro
            </p>
            <p className="text-xs text-text-secondary">
              Lowest price, unlimited practice, per-topic tracking. Starts with a free diagnostic.
            </p>
          </div>
          <div className="rounded-xl border border-navy-border bg-navy-light p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-1">
              Best for video learners
            </p>
            <p className="font-display text-sm font-bold text-text-primary mb-1">
              Mometrix Academy
            </p>
            <p className="text-xs text-text-secondary">
              Video-heavy, strong reputation, good explanations. Costs more.
            </p>
          </div>
          <div className="rounded-xl border border-navy-border bg-navy-light p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-1">
              Best free option
            </p>
            <p className="font-display text-sm font-bold text-text-primary mb-1">
              UnionTestPrep
            </p>
            <p className="text-xs text-text-secondary">
              Completely free, large question bank. No progress tracking.
            </p>
          </div>
        </div>
      </section>

      {/* How we picked */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          How We Picked
        </h2>
        <p className="mb-4 text-text-secondary leading-relaxed">
          We evaluated each service on six criteria. Every service got scored the same way, including ours.
        </p>
        <div className="space-y-2">
          {[
            { label: "Price", desc: "One-time pass or monthly cost. Cheaper wins, all else equal." },
            { label: "Practice question count", desc: "More questions = more drilling variety = better prep." },
            { label: "Score tracking", desc: "Does the platform show you where you're improving and where you're not?" },
            { label: "Answer explanations", desc: "Can you learn from wrong answers, or just see a correct answer?" },
            { label: "Mobile experience", desc: "Can you study on a phone without frustration?" },
            { label: "Refund policy", desc: "Is there a meaningful money-back window?" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex gap-3 rounded-xl border border-navy-border bg-navy-light p-3"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">{c.label}:</strong> {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* #1 ASVAB Hero Pro */}
      <section className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white">
            #1
          </span>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            ASVAB Hero Pro
          </h2>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          90-Day Pass $59 one-time &middot; or $24.99/mo
        </p>

        <p className="mb-4 text-text-secondary leading-relaxed">
          ASVAB Hero Pro is the platform we built, and it ranks first on value for most self-study users. The one-time 90-Day Test Pass is $59 and covers your whole study window with nothing to cancel; if you&apos;d rather go month-to-month it&apos;s $24.99. Either way you get real score tracking and unlimited practice, and the calculator stays free forever.
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          What&apos;s included
        </h3>
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          {[
            `${QUESTIONS_PLUS} practice questions across all ASVAB subtests`,
            "39 topic categories, each drillable independently",
            "All 5 difficulty levels (Beginner → Expert)",
            "AFQT estimator, see your projected percentile",
            "Weak-topic recommendations based on your answers",
            "Score history so you can track improvement over time",
            "Free 30-question diagnostic to find your starting point",
          ].map((f) => (
            <div key={f} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-success text-sm leading-none">✓</span>
              <p className="text-sm text-text-secondary leading-relaxed">{f}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Spaced-repetition flashcards
        </h3>
        <div className="mb-4 rounded-xl border border-navy-border bg-navy-light p-4">
          <p className="text-sm text-text-secondary leading-relaxed">
            Six <strong className="text-text-primary">flashcard decks</strong> covering Word Knowledge synonyms, root words, prefixes/suffixes, MK geometry, EI Ohm&apos;s law, and AS hand tools. The synonyms deck is free; Pro unlocks the rest. Cards you miss come back sooner using a simplified SM-2 algorithm.
          </p>
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Who it&apos;s for
        </h3>
        <p className="mb-4 text-text-secondary leading-relaxed">
          Anyone doing self-directed prep who wants unlimited practice and wants to know exactly which topics to focus on. The 90-Day Pass covers a full study window for $59 with nothing to cancel; if your test is close, a single month at $24.99 can be enough to drill hard and go.
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          What could be better
        </h3>
        <p className="mb-6 text-text-secondary leading-relaxed">
          ASVAB Hero Pro is a newer product. There are no instructor-led video lessons, this is question-and-explanation drill work, not a course with a teacher walking you through concepts. Flashcards are coming but aren&apos;t here yet. Mometrix has more feature polish from years in the market. If you&apos;re the type of learner who needs video instruction to understand a concept before drilling it, read the Mometrix section next.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/practice-test"
            className="rounded-xl border border-navy-border bg-navy-light px-5 py-3 text-center font-display text-sm font-bold text-text-primary transition-colors hover:bg-navy-lighter no-underline"
          >
            Start free diagnostic
          </Link>
          <Link
            href="/upgrade?from=best-online-prep"
            className="rounded-xl bg-accent px-5 py-3 text-center font-display text-sm font-bold text-white transition-colors hover:bg-accent-hover no-underline"
          >
            Get the 90-Day Pass, $59
          </Link>
        </div>
      </section>

      {/* #2 Mometrix */}
      <section className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-navy-lighter border border-navy-border px-2.5 py-0.5 text-xs font-bold text-text-secondary">
            #2
          </span>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Mometrix Academy
          </h2>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          ~$39.99/mo (current price varies, check{" "}
          <a
            href="https://www.mometrix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            mometrix.com
          </a>{" "}
, no affiliate link)
        </p>

        <p className="mb-4 text-text-secondary leading-relaxed">
          Mometrix is the name most people recognize in test prep. They&apos;ve been in the market for years, and their ASVAB offering reflects that maturity, polished video lessons, solid practice questions, and explanations that go beyond &quot;the answer is C.&quot;
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Pros
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "Video-heavy instruction, if you need someone to explain a concept before drilling, this is where Mometrix wins",
            "Strong brand reputation with a long track record in standardized test prep",
            "Platform covers many other tests (GED, SAT, nursing exams), so there's no ASVAB-only focus diluting the team's attention to their core market",
            "Practice questions include detailed explanations, not just answer keys",
          ].map((p) => (
            <div key={p} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-success text-sm leading-none">✓</span>
              <p className="text-sm text-text-secondary leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Cons
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "At ~$39.99/month, well above ASVAB Hero Pro's $24.99/month — and no one-time pass option",
            "Monthly auto-renew, easy to forget and get charged for a month you don't use",
            "Per-topic score tracking is less granular than what Pro offers",
            "No AFQT estimator based on your actual practice performance",
          ].map((c) => (
            <div key={c} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-danger text-sm leading-none">✗</span>
              <p className="text-sm text-text-secondary leading-relaxed">{c}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Who it&apos;s for
        </h3>
        <p className="text-text-secondary leading-relaxed">
          Learners who need video instruction to understand concepts before drilling. If you watch a lesson and then do practice problems, rather than learning from practice problems directly, Mometrix is worth the price premium. Budget-conscious self-studiers will likely find more value elsewhere.
        </p>
      </section>

      {/* #3 Kaplan */}
      <section className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-navy-lighter border border-navy-border px-2.5 py-0.5 text-xs font-bold text-text-secondary">
            #3
          </span>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Kaplan ASVAB Online
          </h2>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          ~$49+ depending on package (current price varies, check{" "}
          <a
            href="https://www.kaptest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            kaptest.com
          </a>{" "}
, no affiliate link)
        </p>

        <p className="mb-4 text-text-secondary leading-relaxed">
          Kaplan is one of the largest test prep brands in the country. Their ASVAB materials are thorough and professionally produced. The platform carries decades of brand equity from SAT, LSAT, and medical board prep, which is both a strength and a limitation for ASVAB students.
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Pros
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "High-quality, professionally produced study materials",
            "Includes full-length practice tests with realistic timing",
            "Strong content coverage across all 9 ASVAB subtests",
            "Brand reputation carries some psychological comfort for test-anxious students",
          ].map((p) => (
            <div key={p} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-success text-sm leading-none">✓</span>
              <p className="text-sm text-text-secondary leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Cons
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "ASVAB is a relatively small market for Kaplan, the product exists but it's not their priority vertical",
            "Higher price point with less ASVAB-specific tracking than dedicated platforms",
            "Some users find the interface more suited to academic tests than military enlistment prep",
            "Pricing is package-based and can be confusing, compare carefully before purchasing",
          ].map((c) => (
            <div key={c} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-danger text-sm leading-none">✗</span>
              <p className="text-sm text-text-secondary leading-relaxed">{c}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Who it&apos;s for
        </h3>
        <p className="text-text-secondary leading-relaxed">
          Students already familiar with Kaplan from academic test prep who want a consistent platform experience. Not the top pick for dedicated ASVAB prep on its own merits.
        </p>
      </section>

      {/* #4 Princeton Review */}
      <section className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-navy-lighter border border-navy-border px-2.5 py-0.5 text-xs font-bold text-text-secondary">
            #4
          </span>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Princeton Review (Online Tier)
          </h2>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          Price varies by package, check{" "}
          <a
            href="https://www.princetonreview.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            princetonreview.com
          </a>{" "}
          (no affiliate link)
        </p>

        <p className="mb-4 text-text-secondary leading-relaxed">
          Princeton Review&apos;s ASVAB materials are solid, particularly their written content. Their books have long been a staple of test prep retail shelves. The online platform extends that content into a digital format.
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Pros
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "Well-written explanations for math-heavy subtests like AR and MK",
            "Trusted brand with consistent content quality over many editions",
            "Good for learners who prefer book-style reading with a digital supplement",
          ].map((p) => (
            <div key={p} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-success text-sm leading-none">✓</span>
              <p className="text-sm text-text-secondary leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Cons
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "Online-specific ASVAB tools are limited compared to dedicated platforms",
            "No meaningful per-topic adaptive tracking in the online tier",
            "Like Kaplan, ASVAB is a small segment of their overall business, platform investment reflects that",
            "Pricing can be opaque, packages bundle other test materials you may not need",
          ].map((c) => (
            <div key={c} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-danger text-sm leading-none">✗</span>
              <p className="text-sm text-text-secondary leading-relaxed">{c}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Who it&apos;s for
        </h3>
        <p className="text-text-secondary leading-relaxed">
          Students who are also prepping for academic tests (SAT/ACT) and want a single platform. For ASVAB-only prep, the dedicated platforms outperform on feature-per-dollar.
        </p>
      </section>

      {/* #5 Peterson's */}
      <section className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-navy-lighter border border-navy-border px-2.5 py-0.5 text-xs font-bold text-text-secondary">
            #5
          </span>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Peterson&apos;s Test Prep
          </h2>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          Price varies, check{" "}
          <a
            href="https://www.petersons.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            petersons.com
          </a>{" "}
          (no affiliate link)
        </p>

        <p className="mb-4 text-text-secondary leading-relaxed">
          Peterson&apos;s has a long history in military and civil service test prep, longer than most brands on this list. Their ASVAB coverage is comprehensive. The platform has evolved significantly in recent years as they&apos;ve pushed into digital tools.
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Pros
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "Deep heritage in military test prep, they know this space well",
            "Large question bank with full coverage of all ASVAB subtests",
            "Includes detailed score reporting and section analysis on practice tests",
          ].map((p) => (
            <div key={p} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-success text-sm leading-none">✓</span>
              <p className="text-sm text-text-secondary leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Cons
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "Interface feels dated compared to newer platforms, navigation can be clunky",
            "Mobile experience is inconsistent; works better on desktop",
            "Pricing has shifted frequently, confirm current subscription terms before purchasing",
          ].map((c) => (
            <div key={c} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-danger text-sm leading-none">✗</span>
              <p className="text-sm text-text-secondary leading-relaxed">{c}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Who it&apos;s for
        </h3>
        <p className="text-text-secondary leading-relaxed">
          Learners who prioritize question volume and aren&apos;t bothered by an older interface. Good choice if desktop-based study fits your routine.
        </p>
      </section>

      {/* #6 UnionTestPrep (free) */}
      <section className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-success/20 border border-success/30 px-2.5 py-0.5 text-xs font-bold text-success">
            Free Pick
          </span>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            UnionTestPrep
          </h2>
        </div>
        <p className="mb-4 text-sm text-text-secondary">
          Free &middot; No account required &middot;{" "}
          <a
            href="https://www.uniontestprep.com/asvab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            uniontestprep.com/asvab
          </a>{" "}
          (no affiliate link)
        </p>

        <p className="mb-4 text-text-secondary leading-relaxed">
          UnionTestPrep is the best free ASVAB practice option available. The site covers all ASVAB subtests with a large question bank, no account required, no paywall, no trial period that expires. It&apos;s not flashy. It works.
        </p>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Pros
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "Completely free, no credit card, no trial, no upsell",
            "Large question volume covering all 9 subtests",
            "Good supplemental source if you want additional questions beyond your primary platform",
          ].map((p) => (
            <div key={p} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-success text-sm leading-none">✓</span>
              <p className="text-sm text-text-secondary leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Cons
        </h3>
        <div className="mb-4 space-y-2">
          {[
            "No score tracking or progress history, you can't see if you're improving week-over-week",
            "No weak-topic recommendations",
            "No AFQT estimator or composite score projections",
            "Ad-supported interface",
          ].map((c) => (
            <div key={c} className="flex gap-2 rounded-lg border border-navy-border bg-navy-light p-3">
              <span className="mt-0.5 text-danger text-sm leading-none">✗</span>
              <p className="text-sm text-text-secondary leading-relaxed">{c}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          Who it&apos;s for
        </h3>
        <p className="text-text-secondary leading-relaxed">
          Budget-only students. Also useful as a supplemental question source alongside a paid platform that handles your progress tracking. If you can stretch to a $59 pass (or $24.99/month), the tracking features in Pro are worth it.
        </p>
      </section>

      {/* Pricing comparison table */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          Pricing Comparison Table
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          All prices reflect best available information as of April 2026. Competitor prices change, verify at their sites before purchasing.
        </p>
        <div className="overflow-x-auto rounded-xl border border-navy-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border bg-navy-lighter">
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Service</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary">Monthly</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary hidden sm:table-cell">Practice Qs</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary hidden sm:table-cell">Score Tracking</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary hidden md:table-cell">Free Trial</th>
                <th className="px-3 py-3 text-left font-semibold text-text-secondary hidden md:table-cell">Refund</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "ASVAB Hero Pro",
                  price: "$59 pass / $24.99 mo",
                  questions: QUESTIONS_PLUS,
                  tracking: "Yes, per topic",
                  trial: "Free 30-q diagnostic",
                  refund: "7-day guarantee",
                  highlight: true,
                },
                {
                  name: "Mometrix Academy",
                  price: "~$39.99/mo",
                  questions: "1,000+",
                  tracking: "Basic",
                  trial: "Check site",
                  refund: "Varies",
                  highlight: false,
                },
                {
                  name: "Kaplan ASVAB",
                  price: "~$49+ (package)",
                  questions: "500+",
                  tracking: "Basic",
                  trial: "Check site",
                  refund: "Conditional",
                  highlight: false,
                },
                {
                  name: "Princeton Review",
                  price: "Varies",
                  questions: "Varies by package",
                  tracking: "Limited",
                  trial: "Check site",
                  refund: "Conditional",
                  highlight: false,
                },
                {
                  name: "Peterson's",
                  price: "Varies",
                  questions: "Large bank",
                  tracking: "Section-level",
                  trial: "Check site",
                  refund: "Check terms",
                  highlight: false,
                },
                {
                  name: "UnionTestPrep",
                  price: "Free",
                  questions: "Large bank",
                  tracking: "None",
                  trial: "N/A",
                  refund: "N/A",
                  highlight: false,
                },
              ].map((row) => (
                <tr
                  key={row.name}
                  className={`border-b border-navy-border last:border-0 ${
                    row.highlight ? "bg-accent-dim" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 font-medium text-text-primary">
                    {row.name}
                    {row.highlight && (
                      <span className="ml-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                        #1
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary">{row.price}</td>
                  <td className="px-3 py-2.5 text-text-secondary hidden sm:table-cell">{row.questions}</td>
                  <td className="px-3 py-2.5 text-text-secondary hidden sm:table-cell">{row.tracking}</td>
                  <td className="px-3 py-2.5 text-text-secondary hidden md:table-cell">{row.trial}</td>
                  <td className="px-3 py-2.5 text-text-secondary hidden md:table-cell">{row.refund}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-text-tertiary">
          Some columns hidden on mobile. Competitor prices sourced from public listings, verify before purchasing.
        </p>
      </section>

      {/* Who should use what */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          Who Should Use What
        </h2>
        <div className="space-y-3">
          {[
            {
              persona: "You want the cheapest path to unlimited practice",
              rec: "ASVAB Hero Pro, a $59 90-Day Pass or $24.99/mo. Start with the free diagnostic to see where you stand.",
              cta: { label: "Start free diagnostic →", href: "/practice-test" },
            },
            {
              persona: "You learn best from video instruction",
              rec: "Mometrix Academy. The price premium is real, but video-based instruction is genuinely valuable if that's your learning style.",
              cta: null,
            },
            {
              persona: "You are on a strict budget (zero dollars)",
              rec: "UnionTestPrep for practice volume, plus ASVAB Hero's free 30-question diagnostic to benchmark yourself.",
              cta: { label: "Take free diagnostic →", href: "/practice-test" },
            },
            {
              persona: "You're already a Kaplan or Princeton Review student",
              rec: "Stick with what you have for content, but supplement with ASVAB Hero Pro for per-topic tracking, the price is low enough that running both isn't unreasonable.",
              cta: null,
            },
            {
              persona: "You want to prep on a phone during commutes",
              rec: "ASVAB Hero Pro is mobile-optimized. Mometrix is workable on mobile. Peterson's is better on desktop.",
              cta: { label: "Try Pro on your phone →", href: "/upgrade?from=best-online-prep" },
            },
          ].map((item) => (
            <div
              key={item.persona}
              className="rounded-xl border border-navy-border bg-navy-light p-4"
            >
              <p className="mb-1 text-sm font-bold text-text-primary">
                If {item.persona}:
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">
                {item.rec}
              </p>
              {item.cta && (
                <Link
                  href={item.cta.href}
                  className="text-sm text-accent hover:text-accent-hover no-underline font-semibold"
                >
                  {item.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Is paid ASVAB prep necessary?",
              a: "No, free resources exist (UnionTestPrep, Khan Academy for math) and many recruits pass without paying. Paid prep earns its cost when you need structured progress tracking, weak-topic identification, or unlimited practice volume without hunting across a dozen sites.",
            },
            {
              q: "Can I use multiple ASVAB prep services at once?",
              a: "Yes, but it rarely helps. Most people get better results going deep on one platform than wide across several. The exception: use a free tool for additional question volume while a paid platform tracks your progress.",
            },
            {
              q: "What is the cheapest ASVAB online prep option?",
              a: "UnionTestPrep is completely free. Among paid options with score tracking, ASVAB Hero Pro is the best value, a one-time 90-Day Pass for $59 covers a full study window with nothing to cancel, or you can go month-to-month at $24.99.",
            },
            {
              q: "Are there free ASVAB prep alternatives?",
              a: "Yes. UnionTestPrep covers all subtests for free. Khan Academy covers ASVAB math content (AR and MK). The official ASVAB website (official.asvabprogram.com) has sample questions. ASVAB Hero's 30-question diagnostic is also free, no account required.",
            },
            {
              q: "Can I get a refund if I'm not happy with an ASVAB prep course?",
              a: "Refund policies vary. ASVAB Hero Pro has a 7-day money-back guarantee, no questions asked. Mometrix Academy has a lifetime guarantee on their book products, check their online course terms specifically. Kaplan and Princeton Review offer conditional satisfaction guarantees. Read the fine print before purchasing any service.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-navy-border bg-navy-light p-5"
            >
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                {item.q}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom line */}
      <section className="rounded-2xl border border-accent/30 bg-accent-dim p-6 sm:p-8">
        <h2 className="mb-3 font-display text-2xl font-bold text-text-primary">
          Bottom Line
        </h2>
        <p className="mb-4 text-text-secondary leading-relaxed">
          For most self-study students, ASVAB Hero Pro is the right call. It&apos;s the cheapest option with real score tracking, covers all 9 subtests across 39 topic categories, and costs less than a single meal out. Start with the free diagnostic to see your baseline, no account, no credit card. If the results show weak areas you want to systematically address, upgrade.
        </p>
        <p className="mb-6 text-text-secondary leading-relaxed">
          If you&apos;re a video learner who needs conceptual instruction before you drill, Mometrix is worth the higher price. If money is zero, use UnionTestPrep and our free diagnostic in combination.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/practice-test"
            className="rounded-xl border border-navy-border bg-navy-light px-6 py-3 text-center font-display text-sm font-bold text-text-primary transition-colors hover:bg-navy-lighter no-underline"
          >
            Take free diagnostic
          </Link>
          <Link
            href="/upgrade?from=best-online-prep"
            className="rounded-xl bg-accent px-6 py-3 text-center font-display text-sm font-bold text-white transition-colors hover:bg-accent-hover no-underline"
          >
            Get the 90-Day Pass, $59
          </Link>
        </div>
      </section>
    </div>
  );
}
