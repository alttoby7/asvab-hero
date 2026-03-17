import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import StudyGuideProvider from "@/components/study-guide/StudyGuideProvider";
import CareerGoalSetter from "@/components/study-guide/CareerGoalSetter";
import SubtestExplorer from "@/components/study-guide/SubtestExplorer";
import StudyPlanGenerator from "@/components/study-guide/StudyPlanGenerator";
import StudyChecklist from "@/components/study-guide/StudyChecklist";

export const metadata: Metadata = {
  title: "ASVAB Study Guide 2026: Free Personalized Study Planner",
  description:
    "Build a personalized ASVAB study plan based on your target branch, dream jobs, and weak areas. Interactive tools: career goal setter, subtest explorer, study plan generator, and progress tracker.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-study-guide",
  },
};

export default function ASVABStudyGuidePage() {
  return (
    <StudyGuideProvider>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "ASVAB Study Guide: How to Build a Personalized Study Plan",
            description:
              "Comprehensive ASVAB study guide with interactive tools. Set career goals, explore all 9 subtests, generate a personalized week-by-week study plan, and track your progress.",
            url: "https://asvabhero.com/asvab-study-guide",
            author: {
              "@type": "Organization",
              name: "ASVAB Hero",
              url: "https://asvabhero.com",
            },
            publisher: {
              "@type": "Organization",
              name: "ASVAB Hero",
            },
            datePublished: "2026-03-17",
            dateModified: "2026-03-17",
          }}
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long should I study for the ASVAB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most successful test-takers study for 4-8 weeks, spending 6-10 hours per week. If you're starting from scratch with weak math or verbal skills, plan for 8-12 weeks. If you scored well on a practice test and just need to sharpen specific areas, 2-4 weeks of focused prep can be enough.",
                },
              },
              {
                "@type": "Question",
                name: "What should I study first for the ASVAB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Start with the four AFQT subtests: Arithmetic Reasoning (AR), Word Knowledge (WK), Paragraph Comprehension (PC), and Mathematics Knowledge (MK). These determine your enlistment eligibility. WK and PC are especially high-value because they form the Verbal Expression (VE) score, which is doubled in the AFQT formula.",
                },
              },
              {
                "@type": "Question",
                name: "Can I study for the ASVAB on my own?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. The ASVAB tests knowledge from high school-level courses — no advanced degrees needed. Free online resources, practice tests, and study guides (like this one) cover everything you need. The key is having a structured plan and sticking to it consistently.",
                },
              },
              {
                "@type": "Question",
                name: "What's the best way to study for the ASVAB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The most effective approach is goal-driven: (1) Pick your target branch and jobs, (2) Identify which subtests those jobs require, (3) Assess your weak areas, (4) Build a weekly schedule focusing on high-impact subtests first, (5) Take timed practice tests regularly to track progress. Studying without a target wastes time on subtests that don't matter for your goals.",
                },
              },
              {
                "@type": "Question",
                name: "How many hours a week should I study for the ASVAB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "6-10 hours per week is the sweet spot for most people. Less than 3 hours per week makes progress too slow. More than 15 hours leads to burnout. Split your time into 30-60 minute focused sessions rather than marathon cramming — your brain retains more with spaced practice.",
                },
              },
              {
                "@type": "Question",
                name: "Which ASVAB subtests are the most important?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The four AFQT subtests (AR, WK, PC, MK) are the most important because they determine whether you can enlist at all. Beyond that, the most important subtests depend on your target jobs. Technical roles need EI and GS. Mechanical roles need MC and AS. Use our Career Goal Setter tool above to see exactly which subtests matter for your specific goals.",
                },
              },
              {
                "@type": "Question",
                name: "Is the ASVAB hard?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The ASVAB covers high school-level material, so nothing on it should be completely new. The challenge is breadth — 9 subtests covering everything from vocabulary to electronics to mechanical physics. With 4-8 weeks of focused study, most people score well above branch minimums. The people who struggle are those who don't study at all.",
                },
              },
              {
                "@type": "Question",
                name: "What happens if I score low on the ASVAB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If your AFQT score is below your target branch's minimum (31–40 depending on branch), you can't enlist with that branch. But you can retake the ASVAB after 1 month (first retest), then after another month, then after 6 months for subsequent retakes. A focused study plan between retakes can dramatically improve your scores.",
                },
              },
            ],
          }}
        />

        {/* Hero */}
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Free Study Planner
          </p>
          <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-text-primary sm:text-4xl">
            ASVAB Study Guide: Build Your Personalized Plan
          </h1>
          <p className="text-lg leading-relaxed text-text-secondary">
            Stop guessing what to study. This guide helps you set career goals,
            identify your weak spots, and generate a personalized week-by-week
            study schedule based on the jobs you actually want. Every tool below
            is free — no sign-up required.
          </p>
        </div>

        {/* Why a study plan matters */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            Why Most ASVAB Study Plans Fail
          </h2>
          <p className="mb-3 text-text-secondary leading-relaxed">
            The number one mistake ASVAB test-takers make? Studying without a
            target. They buy a prep book, flip to page one, and grind through
            every chapter equally. Three weeks later they&apos;re burned out, they
            haven&apos;t touched the subtests that actually matter for their dream
            job, and test day is tomorrow.
          </p>
          <p className="mb-3 text-text-secondary leading-relaxed">
            A good study plan starts with the end: which branch, which jobs, and
            which scores do you need? Then it works backward to figure out where
            your time has the highest return. That&apos;s exactly what the tools on
            this page do.
          </p>
          <p className="text-text-secondary leading-relaxed">
            If you&apos;re not sure how ASVAB scoring works —{" "}
            <Link
              href="/asvab-scores-explained"
              className="text-accent hover:text-accent-hover no-underline"
            >
              read our ASVAB Scores Explained guide
            </Link>{" "}
            first. It covers AFQT, composite scores, and branch minimums with
            interactive tools.
          </p>
        </section>

        {/* Step 1: Set your goals */}
        <section className="mb-12">
          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-bold text-accent">
              Step 1
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
              Set Your Career Goals
            </h2>
            <p className="mt-2 text-text-secondary leading-relaxed">
              Pick your target branch and up to 3 dream jobs. The tool will
              analyze the AFQT and composite score requirements, compare them
              against your self-assessment, and tell you exactly which subtests
              to prioritize. Your study plan is only as good as your goal —
              start here.
            </p>
          </div>
          <div className="rounded-2xl border border-navy-border bg-navy-light p-4 sm:p-6">
            <CareerGoalSetter />
          </div>
        </section>

        {/* What's on the ASVAB */}
        <section className="mb-12">
          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-bold text-accent">
              Step 2
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
              Know Your 9 Subtests
            </h2>
            <p className="mt-2 text-text-secondary leading-relaxed">
              The ASVAB has 9 subtests, but they&apos;re not all equal. Four of
              them (AR, WK, PC, MK) feed your AFQT score — that&apos;s the number
              that determines whether you can enlist at all. The other five feed
              branch-specific composite scores that determine which{" "}
              <em>jobs</em> you qualify for. Click any card to see what it
              covers, which composites use it, and what to study.
            </p>
          </div>
          <SubtestExplorer />
        </section>

        {/* The AFQT formula */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            The AFQT Formula: Where to Get the Biggest Bang
          </h2>
          <p className="mb-3 text-text-secondary leading-relaxed">
            Your AFQT percentile comes from four subtests using this formula:
          </p>
          <div className="mb-4 rounded-xl border border-accent/30 bg-accent-dim p-4 text-center">
            <p className="font-mono text-lg font-bold text-accent">
              AFQT = 2 &times; (WK + PC) + AR + MK
            </p>
          </div>
          <p className="mb-3 text-text-secondary leading-relaxed">
            Notice that WK and PC are <strong className="text-text-primary">doubled</strong> through
            the Verbal Expression (VE) score. This means improving your
            vocabulary (WK) or reading comprehension (PC) by just a few points
            has <em>twice</em> the impact on your AFQT compared to improving AR
            or MK by the same amount. If you&apos;re short on time, verbal
            skills are your highest-leverage study area.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Use our{" "}
            <Link
              href="/asvab-scores-explained#afqt-formula"
              className="text-accent hover:text-accent-hover no-underline"
            >
              interactive AFQT Formula Explorer
            </Link>{" "}
            to see how changing each subtest affects your percentile in real
            time.
          </p>
        </section>

        {/* What to study for each subtest */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            What to Study for Each Subtest
          </h2>
          <p className="mb-4 text-text-secondary leading-relaxed">
            Below is a study checklist with specific topics for all 9 subtests.
            Check off topics as you cover them — your progress saves
            automatically. If you set career goals above, the subtests are
            sorted by priority for your target jobs.
          </p>

          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-bold text-accent">
              Step 3
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-text-primary">
              Track Your Study Progress
            </h3>
          </div>
          <div className="rounded-2xl border border-navy-border bg-navy-light p-4 sm:p-6">
            <StudyChecklist />
          </div>
        </section>

        {/* AFQT Subtests Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            The 4 AFQT Subtests (Study These First)
          </h2>

          <div className="space-y-6">
            <div className="rounded-xl border border-accent/20 bg-navy-light p-5">
              <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
                <span className="mr-2 font-mono text-accent">AR</span>
                Arithmetic Reasoning
              </h3>
              <p className="mb-2 text-sm text-text-secondary leading-relaxed">
                Word problems testing real-world math. You&apos;ll see rate/distance
                problems, percentage calculations, ratio questions, and basic
                algebra. The key skill isn&apos;t math itself — it&apos;s translating
                English sentences into equations. Practice by converting word
                problems into math before solving.
              </p>
              <p className="text-xs text-text-tertiary">
                15 questions &middot; 39 minutes &middot; Feeds AFQT + most branch composites
              </p>
            </div>

            <div className="rounded-xl border border-accent/20 bg-navy-light p-5">
              <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
                <span className="mr-2 font-mono text-accent">WK</span>
                Word Knowledge
                <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
                  2x VE
                </span>
              </h3>
              <p className="mb-2 text-sm text-text-secondary leading-relaxed">
                Vocabulary — pick the word closest in meaning. This subtest is
                pure memorization. Learn 10 new words per day using flashcards
                with root words, prefixes, and suffixes. Focus on Latin/Greek
                roots (bene-, mal-, anti-, pre-) since knowing roots lets you
                decode unfamiliar words on test day.
              </p>
              <p className="text-xs text-text-tertiary">
                15 questions &middot; 9 minutes &middot; DOUBLED in AFQT via VE
              </p>
            </div>

            <div className="rounded-xl border border-accent/20 bg-navy-light p-5">
              <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
                <span className="mr-2 font-mono text-accent">PC</span>
                Paragraph Comprehension
                <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
                  2x VE
                </span>
              </h3>
              <p className="mb-2 text-sm text-text-secondary leading-relaxed">
                Short reading passages with questions about main ideas, details,
                and inferences. Read the questions first, then scan the passage
                for answers. Practice daily reading — even 15 minutes of news
                articles or non-fiction builds the comprehension speed you need.
              </p>
              <p className="text-xs text-text-tertiary">
                10 questions &middot; 22 minutes &middot; DOUBLED in AFQT via VE
              </p>
            </div>

            <div className="rounded-xl border border-accent/20 bg-navy-light p-5">
              <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
                <span className="mr-2 font-mono text-accent">MK</span>
                Mathematics Knowledge
              </h3>
              <p className="mb-2 text-sm text-text-secondary leading-relaxed">
                Straight math problems — no word problems, just equations.
                Covers algebra, geometry, fractions, exponents, and order of
                operations. If you know PEMDAS, can solve for X, and remember
                area/volume formulas, you&apos;re most of the way there. Drill
                practice problems until solving equations feels automatic.
              </p>
              <p className="text-xs text-text-tertiary">
                15 questions &middot; 23 minutes &middot; Feeds AFQT + technical composites
              </p>
            </div>
          </div>
        </section>

        {/* Technical subtests */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            The 5 Technical Subtests (Study Based on Your Goals)
          </h2>
          <p className="mb-4 text-text-secondary leading-relaxed">
            These subtests don&apos;t affect your AFQT, but they determine which
            specific jobs you qualify for. Only study them if your target jobs
            need them — check the Career Goal Setter above to find out.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { code: "GS", name: "General Science", tip: "Review high school biology, chemistry, physics, and earth science. Focus on systems (digestive, respiratory) and basic chemistry (periodic table, reactions)." },
              { code: "EI", name: "Electronics Information", tip: "Learn Ohm's law (V=IR), series vs parallel circuits, and basic component identification. Critical for IT, signals, and electronics jobs." },
              { code: "AS", name: "Auto & Shop", tip: "Know basic engine systems, common hand tools, and shop safety. If you've worked on cars or done woodwork, you have a head start." },
              { code: "MC", name: "Mechanical Comprehension", tip: "Understand levers, pulleys, gears, and force/pressure. Think about WHY things move — mechanical advantage, torque, and balance." },
              { code: "AO", name: "Assembling Objects", tip: "Practice spatial reasoning puzzles. Focus on connection point problems and mentally rotating shapes. This subtest is hard to study for — practice is the best prep." },
            ].map((st) => (
              <div
                key={st.code}
                className="rounded-xl border border-navy-border bg-navy-light p-4"
              >
                <h3 className="mb-1 text-sm font-bold text-text-primary">
                  <span className="mr-1.5 font-mono text-accent">{st.code}</span>
                  {st.name}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {st.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Study Plan Generator */}
        <section className="mb-12">
          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-bold text-accent">
              Step 4
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
              Generate Your Personalized Study Plan
            </h2>
            <p className="mt-2 text-text-secondary leading-relaxed">
              Set your test date and available study hours. The planner uses your
              career goals, skill ratings, and the AFQT formula weights to
              create a week-by-week schedule. It automatically shifts from
              learning new material to practice to review as your test date
              approaches — like a real training program.
            </p>
          </div>
          <div className="rounded-2xl border border-navy-border bg-navy-light p-4 sm:p-6">
            <StudyPlanGenerator />
          </div>
        </section>

        {/* Study tips */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            ASVAB Study Tips That Actually Work
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-navy-border bg-navy-light p-5">
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                Study in 30-minute blocks
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your brain retains more from three 30-minute sessions than one
                90-minute marathon. Set a timer, focus on one subtest, take a
                break, repeat. This is why our study plan generator allocates
                time in 30-minute blocks.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-5">
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                Take timed practice tests weekly
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                The ASVAB is timed, so you need to build speed, not just
                knowledge. Take our{" "}
                <Link
                  href="/practice-test"
                  className="text-accent hover:text-accent-hover no-underline"
                >
                  free practice test
                </Link>{" "}
                weekly to track your progress and get comfortable with the time
                pressure.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-5">
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                Focus on the AFQT subtests first
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                If your AFQT is below 31, nothing else matters — you can&apos;t
                enlist. Get your AFQT above your branch&apos;s minimum with a
                safety buffer (aim for 50+), then shift focus to the technical
                subtests your target jobs need.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-5">
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                Don&apos;t cram the night before
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                The last week before your test should be light review and rest.
                Sleep is when your brain consolidates what you&apos;ve learned. A
                well-rested brain with decent prep beats an exhausted brain with
                perfect prep every time.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-5">
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                Use the process of elimination
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every ASVAB question has 4 answer choices. Even if you&apos;re
                unsure, you can usually eliminate 1-2 obviously wrong answers.
                Going from 4 choices to 2 doubles your odds. Never leave a
                question blank — there&apos;s no penalty for wrong answers on the
                ASVAB.
              </p>
            </div>
          </div>
        </section>

        {/* How long to study */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            How Long Should You Study for the ASVAB?
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-navy-border bg-navy-light p-4 text-center">
              <p className="font-display text-2xl font-bold text-accent">
                2-4
              </p>
              <p className="text-xs font-semibold text-text-secondary">weeks</p>
              <p className="mt-2 text-xs text-text-tertiary">
                If you scored 50+ on a practice test and just need to sharpen
                specific areas
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-dim p-4 text-center">
              <p className="font-display text-2xl font-bold text-accent">
                4-8
              </p>
              <p className="text-xs font-semibold text-text-secondary">weeks</p>
              <p className="mt-2 text-xs text-text-tertiary">
                The sweet spot for most test-takers. Enough time to build skills
                without burnout.
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-4 text-center">
              <p className="font-display text-2xl font-bold text-accent">
                8-12
              </p>
              <p className="text-xs font-semibold text-text-secondary">weeks</p>
              <p className="mt-2 text-xs text-text-tertiary">
                If you&apos;re starting from scratch or scored below 31 on a
                practice test
              </p>
            </div>
          </div>
        </section>

        {/* Retake info */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            What If You Need to Retake the ASVAB?
          </h2>
          <p className="mb-4 text-text-secondary leading-relaxed">
            A low score isn&apos;t the end. You can retake the ASVAB — but
            there are waiting periods:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-navy-border bg-navy-light p-4 text-center">
              <p className="font-display text-xl font-bold text-text-primary">
                1 month
              </p>
              <p className="text-xs text-text-tertiary">
                Wait time for your first retest
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-4 text-center">
              <p className="font-display text-xl font-bold text-text-primary">
                1 month
              </p>
              <p className="text-xs text-text-tertiary">
                Wait time for your second retest
              </p>
            </div>
            <div className="rounded-xl border border-navy-border bg-navy-light p-4 text-center">
              <p className="font-display text-xl font-bold text-text-primary">
                6 months
              </p>
              <p className="text-xs text-text-tertiary">
                Wait time for every retest after that
              </p>
            </div>
          </div>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Use the waiting period wisely. Come back to this page, update your
            study plan with your actual scores, and focus on the specific areas
            where you fell short. Most retakers improve significantly with
            targeted prep.
          </p>
        </section>

        {/* Branch minimums */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
            AFQT Minimums by Branch
          </h2>
          <p className="mb-4 text-text-secondary leading-relaxed">
            Your AFQT percentile determines which branches you can enlist in.
            Aim higher than the minimum — a 50+ AFQT opens most jobs and bonus
            eligibility.
          </p>
          <div className="overflow-hidden rounded-xl border border-navy-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-border bg-navy-lighter">
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                    Branch
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-text-secondary">
                    Minimum AFQT
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { branch: "Army", min: 31 },
                  { branch: "Marines", min: 32 },
                  { branch: "Navy", min: 35 },
                  { branch: "Air Force", min: 36 },
                  { branch: "Space Force", min: 36 },
                  { branch: "Coast Guard", min: 40 },
                ].map((row) => (
                  <tr
                    key={row.branch}
                    className="border-b border-navy-border last:border-0"
                  >
                    <td className="px-4 py-2.5 text-text-primary">
                      {row.branch}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-accent">
                      {row.min}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
            ASVAB Study Guide FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How long should I study for the ASVAB?",
                a: "Most successful test-takers study for 4-8 weeks at 6-10 hours per week. If starting from scratch, plan for 8-12 weeks. If you just need to sharpen specific areas, 2-4 weeks of focused prep can be enough.",
              },
              {
                q: "What should I study first for the ASVAB?",
                a: "Start with the four AFQT subtests: AR, WK, PC, and MK. These determine your enlistment eligibility. WK and PC are highest-value because they're doubled in the AFQT formula through Verbal Expression (VE).",
              },
              {
                q: "Can I study for the ASVAB on my own?",
                a: "Yes. The ASVAB tests high school-level knowledge. Free online resources, practice tests, and study guides cover everything you need. The key is having a structured plan and consistent daily practice.",
              },
              {
                q: "What's the best way to study for the ASVAB?",
                a: "Goal-driven study: (1) Pick target branch and jobs, (2) Identify required subtests, (3) Assess weak areas, (4) Build a weekly schedule focusing on high-impact subtests, (5) Take timed practice tests regularly.",
              },
              {
                q: "How many hours a week should I study for the ASVAB?",
                a: "6-10 hours per week is the sweet spot. Less than 3 makes progress too slow. More than 15 leads to burnout. Split into 30-60 minute focused sessions rather than marathon cramming.",
              },
              {
                q: "Which ASVAB subtests are the most important?",
                a: "The four AFQT subtests (AR, WK, PC, MK) determine enlistment eligibility. Beyond that, importance depends on your target jobs — use the Career Goal Setter above to see which subtests matter for your goals.",
              },
              {
                q: "Is the ASVAB hard?",
                a: "It covers high school-level material across 9 subjects. The challenge is breadth, not depth. With 4-8 weeks of focused study, most people score well above branch minimums.",
              },
              {
                q: "What happens if I score low on the ASVAB?",
                a: "You can retake after 1 month (first retest), another month (second retest), then 6 months for each subsequent attempt. Use the waiting period to study with a focused plan targeting your weak areas.",
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

        {/* CTA */}
        <section className="rounded-2xl border border-accent/30 bg-accent-dim p-6 text-center sm:p-8">
          <h2 className="mb-3 font-display text-2xl font-bold text-text-primary">
            Ready to Start Studying?
          </h2>
          <p className="mb-6 text-text-secondary">
            Take a free practice test to see where you stand, then come back
            here to build your plan.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/practice-test"
              className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-accent-hover no-underline"
            >
              Take Free Practice Test
            </Link>
            <Link
              href="/calculator"
              className="rounded-xl border border-navy-border bg-navy-light px-6 py-3 font-display text-sm font-bold text-text-primary transition-colors hover:bg-navy-lighter no-underline"
            >
              Calculate Your Scores
            </Link>
          </div>
        </section>
      </div>
    </StudyGuideProvider>
  );
}
