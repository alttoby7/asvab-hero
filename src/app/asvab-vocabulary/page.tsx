import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Vocabulary: Word Knowledge Study Guide",
  description:
    "ASVAB vocabulary study pays double via the VE formula. Get a high-frequency word list, root word decode system, CAT pacing tips, and a 4-week study plan.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-vocabulary",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "ASVAB Vocabulary: The Word Knowledge Study Guide That Doubles Your Score",
  description:
    "ASVAB vocabulary study pays double via the VE formula. Get a high-frequency word list, root word decode system, CAT pacing tips, and a 4-week study plan.",
  url: "https://asvabhero.com/asvab-vocabulary",
  author: {
            "@type": "Person",
            "@id": "https://asvabhero.com/team/jordan-avery#editor",
            name: "Jordan Avery",
            url: "https://asvabhero.com/team/jordan-avery",
          },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many words do I need to know for the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No fixed list exists, and you do not need thousands. Master 30 to 40 high-yield roots and prefixes plus the 30 high-frequency words in this guide, and you can decode most of what the test throws at you. The root system stretches that base across hundreds of words you never directly studied.",
      },
    },
    {
      "@type": "Question",
      name: "How is Word Knowledge scored, and why does it count twice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Word Knowledge combines with Paragraph Comprehension into your Verbal Expression (VE) score. The AFQT formula is AFQT = 2(VE) + AR + MK, so VE is multiplied by 2. That doubling turns a 5-point VE gain into a 10-point AFQT gain. No other subtest gets this multiplier, which is why vocabulary pays the highest return.",
      },
    },
    {
      "@type": "Question",
      name: "How many questions are on the Word Knowledge subtest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CAT-ASVAB has 15 scored questions in 9 minutes. The paper-and-pencil test has 35 questions in 11 minutes. The PiCAT has 16 questions and is untimed, with in-person verification later.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Word Knowledge and Verbal Expression (VE)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Word Knowledge (WK) is a single subtest measuring vocabulary. Verbal Expression (VE) is a composite combining WK with Paragraph Comprehension (PC). You take WK and PC as separate sections, then they merge into one VE score that feeds both your AFQT and your GT.",
      },
    },
    {
      "@type": "Question",
      name: "Can I improve my ASVAB vocabulary in two weeks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most people see measurable improvement in 2 to 3 weeks at 30 minutes a day, and 82 percent of our tutoring students reached GT 110 in a 2-week intensive. Use the 2-week crash plan: roots first, then drill tiers, then timed practice tests every other day.",
      },
    },
    {
      "@type": "Question",
      name: "Are prefixes and roots really worth memorizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, they are the highest-leverage thing you can study. Thirty to forty word parts decode hundreds of test words you have never seen. Break benevolent into bene (good) and volent (wishing) and the meaning falls out. Even a rough decode flags whether a word is positive or negative, which kills wrong answers fast.",
      },
    },
    {
      "@type": "Question",
      name: "Should I guess on a word I do not know on the CAT-ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only after a genuine attempt. Decode it with roots first and eliminate the obvious wrong answers, then pick the best remaining option. You cannot go back on the CAT, and the early questions matter most, so spend real effort on questions 1 through 4.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good Word Knowledge score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good target is whatever clears your goal jobs, since requirements run on composites like AFQT and GT, not WK alone. A strong WK lifts both. Plug your scores into the calculator and take a practice test to see where you stand.",
      },
    },
  ],
};

export default function ASVABVocabularyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        {/* ─── H1 + INTRO ─── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Vocabulary: The Word Knowledge Study Guide That Doubles Your
          Score
        </h1>

        <p className="mt-4 text-text-secondary">
          Most candidates treat <strong>asvab vocabulary</strong> as a stack of
          flashcards, when it is the highest-return study time on the entire
          test. Word Knowledge feeds the Verbal Expression composite, and that
          composite gets doubled inside the AFQT formula, so every point you
          gain on WK is worth roughly double on your enlistment score.
        </p>
        <p className="text-text-secondary">
          This guide covers why vocabulary outweighs every other subtest, how
          Word Knowledge works, a root-word system to decode words you have
          never seen, a high-frequency word list sorted by difficulty, the two
          question types and how to beat each, CAT-ASVAB pacing, a 4-week and
          2-week study plan, and the exact jobs a strong verbal score unlocks.
        </p>
        <p className="text-text-secondary">
          Find your starting line first. Take a free{" "}
          <Link href="/practice-test">practice test</Link> and see where your
          Word Knowledge sits today.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Memorize one formula: AFQT = 2(VE) + AR + MK. The &ldquo;2&rdquo;
            in front of your verbal score is the whole reason vocabulary pays
            double.
          </p>
        </aside>

        {/* ─── SECTION 2: WHY VOCABULARY MATTERS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why ASVAB Vocabulary Matters More Than You Think
        </h2>

        <p className="mt-4 text-text-secondary">
          No other subtest gives you this much leverage, and the arithmetic
          proves it.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK, where VE = WK + PC
        </div>

        <p className="text-text-secondary">
          Word Knowledge (WK) and Paragraph Comprehension (PC) combine into
          your Verbal Expression (VE) score. The AFQT multiplies VE by 2, so
          verbal makes up roughly half of your entire enlistment score. Math
          (MK) and arithmetic (AR) each count once. Verbal counts twice.
        </p>
        <p className="text-text-secondary">
          Run a real example. Say your standard scores come in at WK 30, PC 13,
          AR 15, and MK 12.
        </p>
        <ul>
          <li>VE = WK + PC = 30 + 13 = 43</li>
          <li>2(VE) = 86</li>
          <li>AFQT composite = 2(VE) + AR + MK = 86 + 15 + 12 = 113</li>
        </ul>
        <p className="text-text-secondary">
          Now raise just your verbal. A 5-point VE gain becomes a 10-point AFQT
          gain, because the formula doubles it. No single subtest on the ASVAB
          offers that return on study time.
        </p>
        <p className="text-text-secondary">
          The leverage does not stop at enlistment. Your GT score, the line
          score that gates the most jobs, is calculated as GT = VE + AR. Push
          your verbal up and you move two numbers at once: your AFQT, which
          decides if you qualify, and your GT, which decides what you can do.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            One study focus, two payoffs. Improving{" "}
            <strong>asvab vocabulary</strong> raises your AFQT for enlistment
            AND your GT for job access. That is why verbal beats every other
            subtest for point-per-hour return.
          </p>
        </aside>

        <p className="text-text-secondary">
          Run the math on your own numbers. Plug your scores into the{" "}
          <Link href="/calculator">ASVAB calculator</Link> to see which jobs
          they open across all six branches. Read the breakdowns on{" "}
          <Link href="/afqt-score">AFQT score</Link> and{" "}
          <Link href="/gt-score">GT score</Link>, or get the full picture in{" "}
          <Link href="/asvab-scoring-and-results">
            ASVAB scoring and results
          </Link>
          . Then shore up the other half of VE with our{" "}
          <Link href="/asvab-paragraph-comprehension-tips">
            paragraph comprehension tips
          </Link>
          .
        </p>

        {/* ─── SECTION 3: HOW WK WORKS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How the Word Knowledge Subtest Actually Works
        </h2>

        <p className="mt-4 text-text-secondary">
          The format you take changes the strategy, so know exactly what you are
          walking into before you grind vocabulary.
        </p>
        <p className="text-text-secondary">
          Word Knowledge comes in three versions depending on how and where you
          test.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Version
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Questions
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Time
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Can go back?
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CAT-ASVAB
                </td>
                <td className="py-2 pr-4 font-mono">15 scored</td>
                <td className="py-2 pr-4">9 min (~36 sec/question)</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Paper-and-pencil
                </td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 pr-4">11 min</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PiCAT
                </td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 pr-4">Untimed</td>
                <td className="py-2">Yes (in-person verification later)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Every version measures one thing: do you know what words mean. It
          tests that two ways.
        </p>
        <p className="text-text-secondary">
          The first is a standalone synonym question. You get a single word and
          pick its closest match. Official sample: &ldquo;Antagonize most nearly
          means,&rdquo; correct answer provoke.
        </p>
        <p className="text-text-secondary">
          The second is a word-in-sentence question. The word sits inside a
          sentence and you use context to find its meaning. Sample: &ldquo;His
          record provides no reason for apprehension,&rdquo; where apprehension
          means anxiety.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            On the CAT-ASVAB you cannot return to a question after you answer
            it. First-pass accuracy matters far more here than on paper, so do
            not rush the click.
          </p>
        </aside>

        <p className="text-text-secondary">
          For question-by-question tactics, see our{" "}
          <Link href="/asvab-word-knowledge-tips">Word Knowledge tips</Link>,
          and fold WK into your full prep with the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        {/* ─── SECTION 4: ROOT WORD SYSTEM ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Root Word System: Decode Words You Have Never Seen
        </h2>

        <p className="mt-4 text-text-secondary">
          Skip memorizing the dictionary. Learn 30 to 40 high-yield word parts
          and you can decode hundreds of test words on the fly, including ones
          you have never seen.
        </p>
        <p className="text-text-secondary">
          A word breaks into three pieces: a prefix at the front, a root in the
          middle, and a suffix at the end. Learn the common ones and the meaning
          falls out.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Part
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Meaning
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">bene-</td>
                <td className="py-2 pr-4">good</td>
                <td className="py-2">benefactor</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">mal-</td>
                <td className="py-2 pr-4">bad</td>
                <td className="py-2">malevolent</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">anti-</td>
                <td className="py-2 pr-4">against</td>
                <td className="py-2">antagonist</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">pre-</td>
                <td className="py-2 pr-4">before</td>
                <td className="py-2">preliminary</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">sub-</td>
                <td className="py-2 pr-4">under</td>
                <td className="py-2">submerge</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">super-</td>
                <td className="py-2 pr-4">above</td>
                <td className="py-2">superficial</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">un-</td>
                <td className="py-2 pr-4">not</td>
                <td className="py-2">unfamiliar</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prefix</td>
                <td className="py-2 pr-4 font-mono">dis-</td>
                <td className="py-2 pr-4">not</td>
                <td className="py-2">disagree</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">cogn</td>
                <td className="py-2 pr-4">know</td>
                <td className="py-2">recognize</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">dict</td>
                <td className="py-2 pr-4">speak</td>
                <td className="py-2">dictate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">path</td>
                <td className="py-2 pr-4">feeling</td>
                <td className="py-2">empathy</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">scrib</td>
                <td className="py-2 pr-4">write</td>
                <td className="py-2">inscribe</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">tract</td>
                <td className="py-2 pr-4">pull</td>
                <td className="py-2">retract</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">anthro</td>
                <td className="py-2 pr-4">human</td>
                <td className="py-2">anthropology</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">bio</td>
                <td className="py-2 pr-4">life</td>
                <td className="py-2">biology</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Root</td>
                <td className="py-2 pr-4 font-mono">graph</td>
                <td className="py-2 pr-4">write</td>
                <td className="py-2">biography</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Suffix</td>
                <td className="py-2 pr-4 font-mono">-ology</td>
                <td className="py-2 pr-4">study of</td>
                <td className="py-2">pathology</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Suffix</td>
                <td className="py-2 pr-4 font-mono">-able/-ible</td>
                <td className="py-2 pr-4">capable of</td>
                <td className="py-2">readable</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Suffix</td>
                <td className="py-2 pr-4 font-mono">-ness</td>
                <td className="py-2 pr-4">quality of</td>
                <td className="py-2">darkness</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Suffix</td>
                <td className="py-2 pr-4 font-mono">-ous</td>
                <td className="py-2 pr-4">having quality</td>
                <td className="py-2">dangerous</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Suffix</td>
                <td className="py-2 pr-4 font-mono">-ment</td>
                <td className="py-2 pr-4">result of</td>
                <td className="py-2">movement</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Suffix</td>
                <td className="py-2 pr-4 font-mono">-ful</td>
                <td className="py-2 pr-4">full of</td>
                <td className="py-2">helpful</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Watch the system work on a word you might not know. Take benevolent:{" "}
          <strong>bene</strong> (good) + <strong>volent</strong> (wishing). It
          means wishing good, or showing goodwill. You decoded it without
          memorizing it.
        </p>
        <p className="text-text-secondary">
          Stack the parts and the range multiplies. Combine the malevolent
          prefix <strong>mal-</strong> (bad) with the same volent root and you
          get wishing evil. Add the root <strong>dict</strong> (speak) to the
          prefix <strong>contra-</strong> (against) and contradict reads as
          speak against. Each part you learn unlocks every word that contains
          it, so 30 parts cover far more than 30 words.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Break an unfamiliar word into parts before you read the answer
            choices. Even a rough read of the parts tells you whether the word
            is positive or negative, and that alone eliminates half the options.
          </p>
        </aside>

        {/* ─── SECTION 5: HIGH-FREQUENCY WORDS ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          High-Frequency ASVAB Vocabulary Words and Definitions
        </h2>

        <p className="mt-4 text-text-secondary">
          These words show up often, sorted into tiers so you can self-place and
          study at the right level. Start where you get challenged, not where
          you feel comfortable.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Word
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Definition
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Abundant</td>
                <td className="py-2 pr-4">Present in great quantity</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Blunt</td>
                <td className="py-2 pr-4">Not sharp</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Candid</td>
                <td className="py-2 pr-4">Honest and straightforward</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Diligent</td>
                <td className="py-2 pr-4">Steady attention and effort</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Frugal</td>
                <td className="py-2 pr-4">Avoiding waste</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Idle</td>
                <td className="py-2 pr-4">Not in action</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Keen</td>
                <td className="py-2 pr-4">Quick and ardent readiness</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Weary</td>
                <td className="py-2 pr-4">Physically and mentally fatigued</td>
                <td className="py-2 font-mono text-emerald-400">Basic</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Ambiguous</td>
                <td className="py-2 pr-4">Having more than one possible meaning</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Benevolent</td>
                <td className="py-2 pr-4">Showing goodwill</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Concise</td>
                <td className="py-2 pr-4">Expressing much in few words</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Eloquent</td>
                <td className="py-2 pr-4">Expressing yourself readily and clearly</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Meticulous</td>
                <td className="py-2 pr-4">Marked by precise accordance with details</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Obstinate</td>
                <td className="py-2 pr-4">Stubbornly persistent</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Prudent</td>
                <td className="py-2 pr-4">Showing good judgment</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Scrutinize</td>
                <td className="py-2 pr-4">Examine closely and critically</td>
                <td className="py-2 font-mono text-sky-400">Intermediate</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Abate</td>
                <td className="py-2 pr-4">Decrease in amount or intensity</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Audacious</td>
                <td className="py-2 pr-4">Disposed to take risks; bold</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Belligerent</td>
                <td className="py-2 pr-4">Inclined to hostility; eager to fight</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Clandestine</td>
                <td className="py-2 pr-4">Secret; done to avoid detection</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Intrepid</td>
                <td className="py-2 pr-4">Fearless</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Pragmatic</td>
                <td className="py-2 pr-4">Concerned with practical matters</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Tenacious</td>
                <td className="py-2 pr-4">Stubbornly unyielding</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Malevolent</td>
                <td className="py-2 pr-4">Wishing evil to others</td>
                <td className="py-2 font-mono text-amber-400">Advanced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Adversary</td>
                <td className="py-2 pr-4">An enemy</td>
                <td className="py-2 font-mono text-accent">Military</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Breach</td>
                <td className="py-2 pr-4">A violation or opening</td>
                <td className="py-2 font-mono text-accent">Military</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Deploy</td>
                <td className="py-2 pr-4">Distribute strategically</td>
                <td className="py-2 font-mono text-accent">Military</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Garrison</td>
                <td className="py-2 pr-4">Troops stationed in a fortified place</td>
                <td className="py-2 font-mono text-accent">Military</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Liaison</td>
                <td className="py-2 pr-4">A link between groups</td>
                <td className="py-2 font-mono text-accent">Military</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Reconnaissance</td>
                <td className="py-2 pr-4">Military observation to locate the enemy</td>
                <td className="py-2 font-mono text-accent">Military</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Notice how the root system cross-checks this list. Benevolent and
          malevolent share the <strong>volent</strong> root, so learning one
          teaches the other. Belligerent and adversary both read as hostile,
          which links your military-relevant tier to your advanced tier. Group
          words by shared parts and you study the whole table faster.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Start one tier above where you feel comfortable. That is where the
            fastest VE gains live. Turn each word into a flashcard with the
            definition on the back plus one synonym, so you train recognition
            and recall together.
          </p>
        </aside>

        {/* ─── SECTION 6: TWO QUESTION TYPES ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Two Question Types and How to Beat Each
        </h2>

        <p className="mt-4 text-text-secondary">
          Word Knowledge throws only two pitches. Read each one correctly and
          you stop guessing.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Type 1 &mdash; Direct synonym
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              &ldquo;Antagonize most nearly means,&rdquo; answer provoke. Decode
              the word and match its meaning. When the word is unfamiliar, fall
              back on your root and prefix knowledge to get the connotation,
              then pick the closest fit.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Type 2 &mdash; Word in sentence context
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              &ldquo;His record provides no reason for apprehension,&rdquo;
              answer anxiety. Read the entire sentence for tone, positive or
              negative. Watch for contrast signals like <em>but</em>,{" "}
              <em>however</em>, and <em>unlike</em>, or similarity signals like{" "}
              <em>also</em> and <em>similarly</em>. Use the word&apos;s part of
              speech to throw out answers of the wrong type.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          One trap catches people on both types, and the fix is simple once you
          see it.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            If two answer choices are near-synonyms of each other, both are
            almost certainly wrong. The ASVAB has exactly one correct answer, so
            two options that mean the same thing cancel each other out. Eliminate
            the pair and choose from what is left.
          </p>
        </aside>

        <p className="text-text-secondary">
          Build one more habit for sentence questions: predict the meaning from
          context before you look at the choices. Decide what word you would
          drop in the blank, then find the match. Work in that order and the
          distractors cannot anchor you to a wrong answer.
        </p>
        <p className="text-text-secondary">
          A worked case shows it. Read &ldquo;Despite the chaos, she remained
          composed,&rdquo; cover the choices, and predict &ldquo;calm.&rdquo;
          Now the choices appear: frantic, calm, tired, loud. Your prediction
          lands on calm before any distractor can pull you. Reverse the order
          and frantic, the opposite, tempts you because the sentence mentions
          chaos.
        </p>
        <p className="text-text-secondary">
          For more reps on both types, work through our{" "}
          <Link href="/asvab-word-knowledge-tips">Word Knowledge tips</Link> and
          the companion{" "}
          <Link href="/asvab-paragraph-comprehension-tips">
            paragraph comprehension tips
          </Link>
          .
        </p>

        {/* ─── SECTION 7: CAT PACING ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          CAT-ASVAB Pacing: Why Your First Few Questions Matter Most
        </h2>

        <p className="mt-4 text-text-secondary">
          On the computerized test, the order you answer in changes your score,
          and most candidates never realize it.
        </p>
        <p className="text-text-secondary">
          The CAT-ASVAB is adaptive and adjusts to you in real time. Answer
          correctly and it routes you to a harder, higher-value question next.
          Miss one and it drops you to an easier, lower-value question. Harder
          questions are worth more, so getting routed up is exactly what you
          want.
        </p>
        <p className="text-text-secondary">
          The catch is timing. The first 3 to 4 questions disproportionately set
          your difficulty bracket and your score ceiling for the whole subtest.
          Stumble early and you spend the rest of the section climbing back out
          of a low-value pool. Two test-takers who finish with the same number
          of correct answers can land on different scores when one nailed the
          opening questions and the other recovered late.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              The pacing math
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              15 scored WK questions in 9 minutes is about 36 seconds per
              question on average.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              How to spend it
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Bank extra time on questions 1 through 4 to lock in a high
              bracket, then move faster on the back half once your difficulty
              level is set.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Slow down on the opening questions, then pick up the pace. You
            cannot go back on the CAT, so only guess and move after a genuine
            attempt, never as a reflex.
          </p>
        </aside>

        <p className="text-text-secondary">
          Paper-and-pencil works differently. Every question carries equal
          weight, so pace evenly across all 35 and skip the early-question
          premium. For the full scoring picture across both formats, see{" "}
          <Link href="/asvab-scoring-and-results">
            ASVAB scoring and results
          </Link>
          , and rehearse the timing on a timed{" "}
          <Link href="/practice-test">practice test</Link>.
        </p>

        {/* ─── SECTION 8: STUDY PLAN ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Your Vocabulary Study Plan: 4-Week Build or 2-Week Crash
        </h2>

        <p className="mt-4 text-text-secondary">
          Pick the runway you have. Both plans run on the systems already in
          this guide, so you sequence what you know rather than learn anything
          new.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The 4-Week Build (about 30 minutes a day)
        </h3>
        <ol>
          <li>
            <strong>Week 1:</strong> Learn the high-yield roots, prefixes, and
            suffixes from the root system above. Take a{" "}
            <Link href="/practice-test">practice test</Link> to place yourself
            and find your weakest tier.
          </li>
          <li>
            <strong>Week 2:</strong> Drill your weakest vocabulary tier, 15
            words a day with flashcards.
          </li>
          <li>
            <strong>Week 3:</strong> Add 10 advanced words a day and start timed
            sentence-context practice.
          </li>
          <li>
            <strong>Week 4:</strong> Run timed WK sets and re-drill only the
            words you miss.
          </li>
        </ol>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          The 2-Week Crash
        </h3>
        <ol>
          <li>
            <strong>Days 1 to 3:</strong> Learn all the roots and prefixes.
          </li>
          <li>
            <strong>Days 4 to 7:</strong> Drill the basic and intermediate
            tiers, 15 words a day.
          </li>
          <li>
            <strong>Days 8 to 14:</strong> Push into the advanced tier and take
            one timed practice test every other day.
          </li>
        </ol>

        <p className="text-text-secondary">
          Here is the honest data on what that buys you. At 30 minutes a day,
          most people see measurable improvement in 2 to 3 weeks. Focused study
          over 4 to 6 weeks commonly produces 10 to 20 GT point gains. In our
          own tutoring, 82 percent of students, 37 of 45, reached GT 110 inside
          a 2-week intensive.
        </p>
        <p className="text-text-secondary">
          That GT number is a gate, and verbal is the lever that opens it.
        </p>
        <ul>
          <li>
            <strong>Army:</strong> GT 110+ for Cyber Operations (17C) and
            Special Forces (18X); GT 107+ for Combat Medic (68W).
          </li>
          <li>
            <strong>Navy:</strong> VE 52+ for Legalman (LN); VE 53+ for Mass
            Communication Specialist (MC).
          </li>
          <li>
            <strong>Air Force:</strong> a G score (VE + AR) of 64+ for Cyber
            Operations (1B4).
          </li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            A higher verbal score opens these career fields, and{" "}
            <strong>asvab vocabulary</strong> is the single lever that moves it.
            Build the words, unlock the jobs.
          </p>
        </aside>

        <p className="text-text-secondary">
          Build the rest of your prep around this with the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link> and{" "}
          <Link href="/how-to-study-for-the-asvab">
            how to study for the ASVAB
          </Link>
          . Check your target bars in{" "}
          <Link href="/asvab-score-requirements">ASVAB score requirements</Link>{" "}
          and{" "}
          <Link href="/navy-asvab-score-requirements">
            Navy ASVAB score requirements
          </Link>
          , and browse the full job list in the{" "}
          <Link href="/air-force-afsc-list">Air Force AFSC list</Link>.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many words do I need to know for the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No fixed list exists, and you do not need thousands. Master 30 to
              40 high-yield roots and prefixes plus the 30 high-frequency words
              in this guide, and you can decode most of what the test throws at
              you. The root system stretches that base across hundreds of words
              you never directly studied.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is Word Knowledge scored, and why does it count twice?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Word Knowledge combines with Paragraph Comprehension into your
              Verbal Expression (VE) score. The AFQT formula is AFQT = 2(VE) +
              AR + MK, so VE is multiplied by 2. That doubling turns a 5-point
              VE gain into a 10-point AFQT gain. No other subtest gets this
              multiplier, which is why vocabulary pays the highest return.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many questions are on the Word Knowledge subtest?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB has 15 scored questions in 9 minutes. The
              paper-and-pencil test has 35 questions in 11 minutes. The PiCAT
              has 16 questions and is untimed, with in-person verification later.
              See{" "}
              <Link href="/asvab-scoring-and-results">
                ASVAB scoring and results
              </Link>{" "}
              for how each is scored.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between Word Knowledge and Verbal Expression
              (VE)?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Word Knowledge (WK) is a single subtest measuring vocabulary.
              Verbal Expression (VE) is a composite combining WK with Paragraph
              Comprehension (PC). You take WK and PC as separate sections, then
              they merge into one VE score that feeds both your AFQT and your
              GT. More in{" "}
              <Link href="/asvab-scores-explained">ASVAB scores explained</Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I improve my ASVAB vocabulary in two weeks?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Most people see measurable improvement in 2 to 3 weeks at 30
              minutes a day, and 82 percent of our tutoring students reached GT
              110 in a 2-week intensive. Use the 2-week crash plan above: roots
              first, then drill tiers, then timed practice tests every other day.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Are prefixes and roots really worth memorizing?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, they are the highest-leverage thing you can study. Thirty to
              forty word parts decode hundreds of test words you have never seen.
              Break benevolent into bene (good) and volent (wishing) and the
              meaning falls out. Even a rough decode flags whether a word is
              positive or negative, which kills wrong answers fast.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Should I guess on a word I do not know on the CAT-ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Only after a genuine attempt. Decode it with roots first and
              eliminate the obvious wrong answers, then pick the best remaining
              option. You cannot go back on the CAT, and the early questions
              matter most, so spend real effort on questions 1 through 4. See
              our{" "}
              <Link href="/asvab-word-knowledge-tips">
                Word Knowledge tips
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good Word Knowledge score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A good target is whatever clears your goal jobs, since requirements
              run on composites like AFQT and GT, not WK alone. A strong WK
              lifts both. See{" "}
              <Link href="/what-is-a-good-asvab-score">
                what is a good ASVAB score
              </Link>
              , then plug your scores into the{" "}
              <Link href="/calculator">calculator</Link> and take a{" "}
              <Link href="/practice-test">practice test</Link>.
            </p>
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            Find Your Word Knowledge Baseline
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Take a free practice test and see exactly where your Word Knowledge
            score sits today. Then track how much every study session moves the
            needle.
          </p>
          <Link
            href="/practice-test"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Take a Free Practice Test
          </Link>
        </div>
      </article>
    </div>
  );
}
