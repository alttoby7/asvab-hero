import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "9 ASVAB Word Knowledge Tips That Actually Work | ASVAB Hero",
  description:
    "Learn 9 proven ASVAB word knowledge tips: VE double-count mechanics, root-word decoding, synonym clusters, trap answer patterns, and CAT pacing strategy.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-word-knowledge-tips",
  },
};

export default function ASVABWordKnowledgeTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "ASVAB Word Knowledge Tips: 9 Strategies That Actually Move Your Score",
          description:
            "Learn 9 proven ASVAB word knowledge tips: VE double-count mechanics, root-word decoding, synonym clusters, trap answer patterns, and CAT pacing strategy.",
          url: "https://asvabhero.com/asvab-word-knowledge-tips",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-23",
          dateModified: "2026-03-23",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How many questions are on the ASVAB Word Knowledge section?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CAT-ASVAB has 16 questions in 8 minutes, about 30 seconds per question. The paper-and-pencil version has 35 questions in 11 minutes, roughly 19 seconds each. Most recruits take the CAT version at MEPS. The CAT is adaptive (difficulty adjusts based on your answers); the paper version uses fixed difficulty.",
              },
            },
            {
              "@type": "Question",
              name: "How does Word Knowledge affect my AFQT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "WK combines with Paragraph Comprehension to form VE (Verbal Expression). VE is doubled in the AFQT formula: AFQT = 2(VE) + AR + MK. A 5-point VE improvement creates a 10-point AFQT jump. No other subtest has this multiplier, making WK the highest-leverage subtest for AFQT improvement.",
              },
            },
            {
              "@type": "Question",
              name: "What are the two question types on the Word Knowledge subtest?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The first type is definition-only: a single word presented alone, and you choose its synonym from 4 options. The second type is emphasized word in context: a word underlined in a sentence, and you select its meaning using surrounding clues. Slightly more than half of WK questions use the definition-only format.",
              },
            },
            {
              "@type": "Question",
              name: "Should I guess if I don't know the answer on WK?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "On paper ASVAB, always guess. There is no penalty for wrong answers, so blank equals 0% while guessing gives you a 25% chance. On CAT-ASVAB, guess when you must but use elimination strategies first. Avoid clustering wrong guesses at the end of the section, as the adaptive algorithm may interpret this negatively.",
              },
            },
            {
              "@type": "Question",
              name: "Is it better to study word roots or memorize vocabulary lists?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Start with roots. Latin and Greek roots account for over 60% of English words, so 30 high-frequency roots unlock decoding ability for hundreds of ASVAB-level words. Use vocabulary lists to fill gaps for high-frequency words that do not yield to root analysis. Both strategies together produce the strongest results.",
              },
            },
            {
              "@type": "Question",
              name: "How long does it take to improve my Word Knowledge score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Plan for 4-8 weeks of consistent daily study, spending 30-60 minutes per day targeting 200-300 words. Learn 10 new words per day through spaced repetition flashcards and take one timed practice test per week.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Word Knowledge Tips: 9 Strategies That Actually Move Your Score
        </h1>

        <p className="mt-4 text-text-secondary">
          Most ASVAB prep treats Word Knowledge as a memorization grind. That
          misses the scoring math that makes WK the single highest-leverage
          subtest on the entire exam.
        </p>
        <p className="text-text-secondary">
          WK feeds into VE (Verbal Expression), and VE is the only AFQT
          component that gets doubled.{" "}
          <strong>ASVAB word knowledge tips</strong> that ignore this formula
          leave points on the table. A 5-point VE improvement creates a 10-point
          AFQT jump. No other subtest offers that return. The subtest has two
          formats: definition-only (choose a synonym for an isolated word) and
          word-in-context (identify the meaning of an underlined word in a
          sentence). The 9 strategies below cover both formats, from root-word
          decoding to CAT-adaptive pacing to trap answer elimination. Plug your
          current scores into the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          to see where you stand.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point:</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT = 2(VE) + AR + MK. VE is the ONLY component multiplied by 2.
            Improving WK directly inflates VE, which double-inflates your AFQT.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. Understand Why WK Has 2x AFQT Leverage
        </h2>

        <p className="mt-4 text-text-secondary">
          Most test-takers split study time equally across subtests. The AFQT
          formula punishes that approach.
        </p>
        <p className="text-text-secondary">
          The scoring chain works like this. Your WK and PC raw scores combine
          into a VE (Verbal Expression) scaled score via a lookup table. VE
          ranges from 20 (0&ndash;3 correct across both subtests) to 62 (all 50
          correct). That VE score then gets doubled in the AFQT formula. AR and
          MK count once each. They are not doubled.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-sm font-bold text-accent">
          <p>WK + PC = VE (Verbal Expression)</p>
          <p>AFQT = 2(VE) + AR + MK</p>
          <p>VE is the ONLY doubled component.</p>
          <p>5-point VE improvement = 10-point AFQT jump.</p>
        </div>

        <p className="text-text-secondary">
          The cascade goes beyond AFQT. VE appears in 13+ branch composite
          scores: Army GT, CL, SC, OF, ST; Navy GT, NUC, OPS, HM; Air Force A,
          G; Marine Corps CL, GT, ST. Improving your WK score raises your GT,
          CL, SC, and other line scores simultaneously. A single subtest
          improvement moves your qualification status for dozens of military jobs
          across every branch.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              VE multiplier in AFQT
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              2x (AR and MK are 1x each)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Branch composites using VE
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              13+ across all branches
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Study time recommendation
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              50% of total ASVAB prep on vocabulary
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          If you only have 4 weeks to prepare, spend half your study time on
          vocabulary. In a 60-minute session, that means 30 minutes on
          WK-targeted vocabulary work. The math justifies the allocation: no
          other subtest delivers this return. Of the 20,000 most common English
          words, approximately 10,000 derive from Latin and 2,000 from Greek, so
          vocabulary study follows learnable patterns rather than brute
          memorization. For a deeper look at how AFQT, VE, and composites
          connect, check out{" "}
          <Link
            href="/asvab-scores-explained"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB scores explained
          </Link>{" "}
          or the{" "}
          <Link
            href="/afqt-score"
            className="text-accent hover:text-accent-hover"
          >
            AFQT score
          </Link>{" "}
          breakdown.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. Decode Unknown Words with Prefix, Root, and Suffix Analysis
        </h2>

        <p className="mt-4 text-text-secondary">
          You will see words on the ASVAB you have never studied. Root-word
          decoding turns an unknown word into a solvable puzzle instead of a
          guess.
        </p>
        <p className="text-text-secondary">
          The method has three steps. First, identify the prefix if one exists.
          Prefixes signal negation, direction, or degree. Second, find the root,
          which carries the core meaning. Third, combine prefix and root to build
          a working definition, then match it to the closest answer choice.
        </p>
        <p className="text-text-secondary">
          Apply this process to three ASVAB-level examples.
        </p>
        <p className="text-text-secondary">
          &ldquo;Introspect&rdquo;: the prefix &ldquo;intro&rdquo; means
          &ldquo;within&rdquo; and the root &ldquo;spect&rdquo; means &ldquo;to
          look.&rdquo; Combined meaning: to look within. That gets you to the
          correct answer.
        </p>
        <p className="text-text-secondary">
          &ldquo;Incoherent&rdquo;: the prefix &ldquo;in-&rdquo; means
          &ldquo;not&rdquo; and &ldquo;coherent&rdquo; means logical. So
          &ldquo;incoherent&rdquo; means not logical. The correct answer is
          &ldquo;disjointed,&rdquo; and you can eliminate &ldquo;lucid&rdquo;
          (opposite), &ldquo;resistant&rdquo; (unrelated), and
          &ldquo;sleepy&rdquo; (tangential).
        </p>
        <p className="text-text-secondary">
          &ldquo;Beneficent&rdquo;: you might not know this word, but you
          recognize &ldquo;benefi-&rdquo; from &ldquo;benefit.&rdquo; That
          connection to helpfulness eliminates &ldquo;troubled,&rdquo;
          &ldquo;unhappy,&rdquo; and &ldquo;beautiful,&rdquo; leaving
          &ldquo;kind&rdquo; as the correct answer.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Root
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Meaning
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example Words
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  port
                </td>
                <td className="py-2 pr-4">carry</td>
                <td className="py-2">import, export, transport, portable</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  spect
                </td>
                <td className="py-2 pr-4">look/see</td>
                <td className="py-2">inspect, spectator, introspect</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  rupt
                </td>
                <td className="py-2 pr-4">break</td>
                <td className="py-2">rupture, interrupt, disrupt, erupt</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  mal
                </td>
                <td className="py-2 pr-4">bad/evil</td>
                <td className="py-2">malevolent, malicious, malfunction</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  bene
                </td>
                <td className="py-2 pr-4">good</td>
                <td className="py-2">benefit, benevolent, beneficent</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  dict
                </td>
                <td className="py-2 pr-4">speak</td>
                <td className="py-2">dictate, predict, contradict</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  struct
                </td>
                <td className="py-2 pr-4">build</td>
                <td className="py-2">construct, instruct, obstruct</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  tract
                </td>
                <td className="py-2 pr-4">pull/drag</td>
                <td className="py-2">extract, retract, distract</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Latin and Greek roots account for over 60% of English words. In
          science and technical vocabulary, that figure rises above 90%. About
          80% of entries in any English dictionary are borrowed, mainly from
          Latin. Learning 30 high-frequency roots unlocks decoding ability for
          hundreds of ASVAB-level words.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip:</p>
          <p className="mt-1 text-sm text-text-secondary">
            You don&apos;t need the precise definition. Recognizing
            &ldquo;benefi-&rdquo; from &ldquo;benefit&rdquo; is enough to
            eliminate 3 of 4 answer choices. Partial recognition wins.
          </p>
        </aside>

        <p className="text-text-secondary">
          Practice with the table above. Cover the right two columns and quiz
          yourself on each root&apos;s meaning. Then try generating example
          words from memory.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. Study Words in Synonym Clusters, Not Isolation
        </h2>

        <p className="mt-4 text-text-secondary">
          Studying &ldquo;vague&rdquo; in isolation prepares you for one
          question. Studying its synonym cluster prepares you for five.
        </p>
        <p className="text-text-secondary">
          A synonym cluster is a group of words that share the same core
          meaning. On the ASVAB, any word in the cluster could appear as the
          target word or as the correct answer choice. Knowing the cluster gives
          you multiple attack angles on test day.
        </p>
        <p className="text-text-secondary">
          Build clusters in three steps. Start with a target word you missed on
          a practice test. Use a thesaurus to find 3&ndash;5 synonyms at ASVAB
          difficulty level. Study the group as a unit because all the words map
          to one meaning.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Core Meaning
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Cluster Words
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  unclear
                </td>
                <td className="py-2">
                  vague, ambiguous, dubious, obscure, imprecise
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  hostile
                </td>
                <td className="py-2">
                  belligerent, bellicose, antagonistic, combative
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  kind/generous
                </td>
                <td className="py-2">
                  benevolent, charitable, altruistic, magnanimous
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  brief/short
                </td>
                <td className="py-2">concise, succinct, terse, pithy</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  hinder/block
                </td>
                <td className="py-2">impede, obstruct, inhibit, hamper</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Learning &ldquo;vague&rdquo; with its cluster means you can answer
          correctly whether &ldquo;vague,&rdquo; &ldquo;dubious,&rdquo; or
          &ldquo;ambiguous&rdquo; appears as the target. If the test asks for a
          synonym of &ldquo;imprecise,&rdquo; you already know the answer maps
          to &ldquo;unclear&rdquo; because you studied the entire cluster. One
          study session covers five potential test questions.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip:</p>
          <p className="mt-1 text-sm text-text-secondary">
            Flashcard hack: put the core meaning on the front, all cluster words
            on the back. Quiz yourself by naming 3+ synonyms for each meaning.
          </p>
        </aside>

        <p className="text-text-secondary">
          This approach is especially powerful combined with root decoding from
          Tip 2. The &ldquo;mal&rdquo; cluster (malevolent, malicious, malign,
          malice) shares both a root and a synonym family. Two{" "}
          <strong>ASVAB word knowledge tips</strong> working together. Build
          antonym clusters too: pairing &ldquo;hostile&rdquo; words with
          &ldquo;kind/generous&rdquo; words reinforces both groups and prepares
          you for the Opposite trap (Tip 4).
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. Recognize the 4 Wrong-Answer Traps on WK Questions
        </h2>

        <p className="mt-4 text-text-secondary">
          The ASVAB test writers do not write random wrong answers. They engineer
          each incorrect choice to trap a specific mistake. Learn the four
          patterns and you can eliminate on sight.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Trap Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  How It Works
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Synonym Pair
                </td>
                <td className="py-2 pr-4">
                  Two choices mean the same thing. Eliminate both (only one
                  answer can be correct).
                </td>
                <td className="py-2">
                  &ldquo;inhabit&rdquo;: vacate/depart/leave are all synonyms.
                  Eliminate all three. &ldquo;reside&rdquo; is correct.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Opposite
                </td>
                <td className="py-2 pr-4">
                  One choice is the antonym of the target word.
                </td>
                <td className="py-2">
                  If two choices have opposite meanings, one is likely correct.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Sounds-Like
                </td>
                <td className="py-2 pr-4">
                  A choice sounds similar but differs in meaning.
                </td>
                <td className="py-2">
                  &ldquo;bate&rdquo; (to lessen) vs. &ldquo;bait&rdquo; (to
                  lure)
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Partial Meaning
                </td>
                <td className="py-2 pr-4">
                  Captures only one sense of a multi-meaning word.
                </td>
                <td className="py-2">
                  Selecting a common definition when context demands an uncommon
                  one.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Worked example using the Synonym Pair trap.</strong> The word
          is &ldquo;inform.&rdquo; Your choices are: ignore, ask, question,
          tell. &ldquo;Ask&rdquo; and &ldquo;question&rdquo; are synonyms of
          each other, so eliminate both. &ldquo;Ignore&rdquo; is the opposite of
          inform, so eliminate that too. Remaining answer: &ldquo;tell.&rdquo;
          You solved it without needing to know the definition.
        </p>
        <p className="text-text-secondary">
          <strong>Worked example combining Opposite + Root analysis.</strong>{" "}
          The word is &ldquo;deform.&rdquo; Choices A and B are synonyms (both
          mean to fix or heal), so eliminate both. Apply root analysis:
          &ldquo;de-&rdquo; means &ldquo;away from&rdquo; and
          &ldquo;form&rdquo; means &ldquo;shape.&rdquo; Deform means to twist
          away from shape. The answer is &ldquo;contort.&rdquo;
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point:</p>
          <p className="mt-1 text-sm text-text-secondary">
            The synonym pair rule is the most powerful elimination tool. If two
            choices mean the same thing, neither can be correct. This often
            eliminates 2 of 4 options instantly.
          </p>
        </aside>

        <p className="text-text-secondary">
          After every practice question, name which trap you avoided or fell
          into. Track your results across 50+ questions to identify which trap
          catches you most often. Building pattern recognition on practice
          questions means you spot traps automatically on test day.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. Pace the CAT-ASVAB with the First Five Rule
        </h2>

        <p className="mt-4 text-text-secondary">
          The CAT-ASVAB is adaptive. The first five questions determine your
          scoring ceiling for the entire section. Rush them and you cap your
          score before you even hit question six.
        </p>
        <p className="text-text-secondary">
          The algorithm starts you at assumed average difficulty. A correct
          answer triggers a harder next question worth more points. A wrong
          answer triggers an easier next question worth fewer points. The first 5
          questions bracket your ability level. Once the algorithm locks you into
          a tier, later questions fine-tune within that range.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary"></th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  CAT-ASVAB
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Paper-and-Pencil
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Questions
                </td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 font-mono">35</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Time
                </td>
                <td className="py-2 pr-4 font-mono">8 minutes</td>
                <td className="py-2 font-mono">11 minutes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Per question
                </td>
                <td className="py-2 pr-4 font-mono">~30 sec</td>
                <td className="py-2 font-mono">~19 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Can skip?
                </td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Adaptive?
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">No</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Wrong-answer penalty?
                </td>
                <td className="py-2 pr-4">Clustered errors penalized</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Front-load your time on the CAT. The first five questions deserve
          extra investment because they set the difficulty tier for the rest of
          the section.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              First 5 questions
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Up to 45 sec each (3:45 total)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Remaining 11 questions
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              ~23 sec each (4:15 total)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Total</p>
            <p className="mt-1 text-sm text-text-secondary">8 minutes</p>
          </div>
        </div>

        <p className="text-text-secondary">
          Two critical CAT rules. You cannot go back. Every answer is final.
          Pressing the red HELP key pauses your timer, so help time does not
          count against your subtest limit.
        </p>
        <p className="text-text-secondary">
          <strong>Paper-and-pencil strategy.</strong> With 19 seconds per
          question, speed is everything. Pass 1: answer every word you know
          instantly. Pass 2: return to unknowns and apply root decoding (Tip 2)
          and elimination (Tip 4).
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning:</p>
          <p className="mt-1 text-sm text-text-secondary">
            Never leave a question blank on paper ASVAB. There is no penalty for
            wrong answers. Blank = 0% chance. Guess = 25% chance.
          </p>
        </aside>

        <p className="text-text-secondary">
          Ask your recruiter which format you will take. MEPS uses the CAT. MET
          sites sometimes use paper-and-pencil. Practice the pacing strategy
          that matches your test format.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. Use Context Clues on In-Sentence Questions
        </h2>

        <p className="mt-4 text-text-secondary">
          Roughly half of WK questions give you a sentence with an underlined
          word. That sentence is a gift. It contains clues the standalone format
          does not provide.
        </p>
        <p className="text-text-secondary">
          The WK subtest has two question types. The first is definition-only: a
          word presented alone, and you choose its synonym. Slightly more than
          half of WK questions use this format. The second is an emphasized word
          in context: a word underlined in a sentence, and you select its meaning
          using surrounding clues. The strategy below applies to the second type.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clue Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Signal Words
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Direct definition
                </td>
                <td className="py-2 pr-4">
                  &ldquo;is,&rdquo; &ldquo;means,&rdquo; comma-separated
                </td>
                <td className="py-2">
                  &ldquo;The desert is arid and dry.&rdquo; &ldquo;dry&rdquo;
                  defines &ldquo;arid.&rdquo;
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Contrast/antonym
                </td>
                <td className="py-2 pr-4">
                  &ldquo;but,&rdquo; &ldquo;however,&rdquo;
                  &ldquo;unlike,&rdquo; &ldquo;not like&rdquo;
                </td>
                <td className="py-2">
                  &ldquo;Jonah was not like his neurotic brother; he was much
                  more placid.&rdquo; neurotic = opposite of placid.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Example
                </td>
                <td className="py-2 pr-4">
                  &ldquo;such as,&rdquo; &ldquo;for example,&rdquo;
                  &ldquo;including&rdquo;
                </td>
                <td className="py-2">
                  &ldquo;Noxious gases, such as carbon monoxide...&rdquo;
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Hyperbole/tone
                </td>
                <td className="py-2 pr-4">
                  Exaggerated language signaling magnitude
                </td>
                <td className="py-2">
                  &ldquo;The prodigious amount of food was enough to feed a
                  whole country.&rdquo; prodigious = enormous.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Use this four-step strategy for in-sentence questions.
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Read the sentence and mentally blank the underlined word.</li>
          <li>Fill in your own word that fits the blank.</li>
          <li>Match your word to the closest answer choice.</li>
          <li>
            Substitute back into the sentence to verify it makes sense.
          </li>
        </ol>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip:</p>
          <p className="mt-1 text-sm text-text-secondary">
            Contrast clues are the most reliable. Words like
            &ldquo;although,&rdquo; &ldquo;despite,&rdquo;
            &ldquo;however,&rdquo; and &ldquo;while&rdquo; signal that the
            unknown word means the opposite of something already stated. Spot the
            contrast word, find the opposite.
          </p>
        </aside>

        <p className="text-text-secondary">
          On standalone questions where no context exists, fall back to root
          decoding (Tip 2) and trap elimination (Tip 4). The two strategies
          complement each other and cover both{" "}
          <strong>ASVAB word knowledge</strong> question formats.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. Use Spaced Repetition Flashcards, Not Cram Sessions
        </h2>

        <p className="mt-4 text-text-secondary">
          Reviewing 200 flashcards once is less effective than reviewing 15
          cards every day for two weeks. The difference is spaced repetition.
        </p>
        <p className="text-text-secondary">
          The algorithm surfaces words you are about to forget, right before the
          memory fades. Each successful recall extends the interval before the
          card appears again. Anki&apos;s default algorithm doubles the interval
          after each correct recall: a card you get right at 1 day reappears at
          2 days, then 4, then 8. Words you struggle with show up more
          frequently. Words you know well fade into longer intervals.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              New words per day
            </p>
            <p className="mt-1 text-sm text-text-secondary">10</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Review cards per day
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              15&ndash;20 (mix of new + due reviews)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Session length
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              10&ndash;15 minutes
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Weekly target
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              70 new words + ongoing review
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Design your flashcards for the WK subtest specifically. Put the target
          word on the front. On the back, include the definition, 2&ndash;3
          synonyms, and one example sentence. For root-decodable words, add the
          prefix and root breakdown on the back so you reinforce both strategies
          at once.
        </p>
        <p className="text-text-secondary">
          Tools that work: Anki (free, best spaced repetition algorithm), Quizlet
          (free, community ASVAB sets available), or a simple two-column notebook
          with the word on the left and synonyms on the right. Cover one side to
          quiz yourself.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip:</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do your flashcard session during dead time: bus rides, lunch breaks,
            waiting rooms. Consistency matters more than duration. 10 minutes
            daily for 6 weeks beats 3 hours on a single weekend.
          </p>
        </aside>

        <p className="text-text-secondary">
          Combine flashcards with synonym clusters from Tip 3. Put the core
          meaning on front, all cluster words on back. This multiplies the value
          of every card and builds stronger{" "}
          <strong>ASVAB word knowledge</strong> retention.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          8. Read Above Your Level to Build Passive Vocabulary
        </h2>

        <p className="mt-4 text-text-secondary">
          &ldquo;Read more&rdquo; is the most common ASVAB vocabulary advice and
          the least actionable. Active reading with a specific protocol builds
          WK-relevant vocabulary. Passive page-turning does not.
        </p>
        <p className="text-text-secondary">
          The real enemy is the recognition gap. Many WK words are words you
          have heard but cannot define: &ldquo;acute,&rdquo;
          &ldquo;debonair,&rdquo; &ldquo;slander.&rdquo; You recognize them in
          conversation but cannot match them to a synonym under time pressure.
          Active reading closes this gap.
        </p>
        <p className="text-text-secondary">
          The protocol has four steps.
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            Choose material slightly above your current level. AP News, Reuters,
            NPR, and Wikipedia entries work well because they use short
            1&ndash;2 paragraph sections that mirror the ASVAB passage format.
            Military.com articles build vocabulary and domain knowledge
            simultaneously.
          </li>
          <li>
            When you hit an unfamiliar word, try to decode it from context clues
            (Tip 6) or root analysis (Tip 2) before looking it up.
          </li>
          <li>
            After each paragraph, pause and state the main idea in one sentence.
          </li>
          <li>Add unfamiliar words to your flashcard deck (Tip 7).</li>
        </ol>

        <p className="text-text-secondary">
          Daily target: 15&ndash;20 minutes of active reading. That is one or
          two news articles.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip:</p>
          <p className="mt-1 text-sm text-text-secondary">
            You don&apos;t need to learn 10,000 new words. You need to convert
            the 200&ndash;300 words you already half-know into words you can
            define under pressure. That is the recognition gap, and closing it
            is the fastest path to a higher WK score.
          </p>
        </aside>

        <p className="text-text-secondary">
          Reading builds vocabulary passively. Flashcards (Tip 7) and root study
          (Tip 2) build it actively. Use both for the strongest ASVAB word
          knowledge stack. For a complete study timeline, check out the{" "}
          <Link
            href="/asvab-study-guide"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB study guide
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          9. Know Which Jobs Your WK Score Unlocks
        </h2>

        <p className="mt-4 text-text-secondary">
          WK does not just affect a number. It determines which military jobs you
          can access. Every branch uses VE in composites that gate their most
          competitive career fields.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example Jobs
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">
                  Combat Medic (68W), HUMINT (35M), Cyber (17C)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">
                  Intel (02xx), Cyber (17xx), Linguist (2641)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">G</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">Cyber (1D7X1), Intel (1N0X1)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">CTI (Linguist), IS (Intel Specialist)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">GT</td>
                <td className="py-2 pr-4 font-mono">WK + AR + PC</td>
                <td className="py-2">OS, IS, IT rates</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Key thresholds to know. Army Rangers and Special Forces require GT 107
          as an initial screen. Army Cyber Operations (17C) requires GT 110 and
          ST 112. The Green to Gold officer program and Army Nuclear specialties
          also require GT 110. Navy Cyber Warfare requires VE+AR+MK+MC of 239 or
          higher. The minimum AFQT for any enlistment is 31, though Navy, Marine
          Corps, and Air Force require 36 or above for GED holders.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point:</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE appears in 13+ branch composite scores. A strong WK score does
            not just get you in. It gets you the job you actually want.
          </p>
        </aside>

        <p className="text-text-secondary">
          Before studying, look up the composite score requirements for your
          target MOS, AFSC, or rating. Set a concrete WK goal based on the GT or
          VE composite you need, not a vague &ldquo;do well.&rdquo; If your
          target is Army 17C Cyber, for example, you need GT 110, which means
          maximizing both VE and AR.
        </p>
        <p className="text-text-secondary">
          Plug your current scores into the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB score calculator
          </Link>{" "}
          to see which jobs you qualify for right now. For full composite
          breakdowns by branch, see the{" "}
          <Link
            href="/asvab-gt-score"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB GT score
          </Link>{" "}
          guide or the{" "}
          <Link
            href="/asvab-score-chart"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score chart
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many questions are on the ASVAB Word Knowledge section?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB has 16 questions in 8 minutes, about 30 seconds per
              question. The paper-and-pencil version has 35 questions in 11
              minutes, roughly 19 seconds each. Most recruits take the CAT
              version at MEPS. The CAT is adaptive (difficulty adjusts based on
              your answers); the paper version uses fixed difficulty.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How does Word Knowledge affect my AFQT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              WK combines with Paragraph Comprehension to form VE (Verbal
              Expression). VE is doubled in the AFQT formula: AFQT = 2(VE) + AR
              + MK. A 5-point VE improvement creates a 10-point AFQT jump. No
              other subtest has this multiplier, making WK the highest-leverage
              subtest for AFQT improvement.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What are the two question types on the Word Knowledge subtest?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The first type is definition-only: a single word presented alone,
              and you choose its synonym from 4 options. The second type is
              emphasized word in context: a word underlined in a sentence, and
              you select its meaning using surrounding clues. Slightly more than
              half of WK questions use the definition-only format.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Should I guess if I don&apos;t know the answer on WK?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              On paper ASVAB, always guess. There is no penalty for wrong
              answers, so blank equals 0% while guessing gives you a 25% chance.
              On CAT-ASVAB, guess when you must but use elimination strategies
              first. Avoid clustering wrong guesses at the end of the section, as
              the adaptive algorithm may interpret this negatively.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is it better to study word roots or memorize vocabulary lists?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Start with roots. Latin and Greek roots account for over 60% of
              English words, so 30 high-frequency roots unlock decoding ability
              for hundreds of ASVAB-level words. Use vocabulary lists to fill
              gaps for high-frequency words that do not yield to root analysis.
              Both strategies together produce the strongest results.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does it take to improve my Word Knowledge score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Plan for 4&ndash;8 weeks of consistent daily study, spending
              30&ndash;60 minutes per day targeting 200&ndash;300 words. Learn 10
              new words per day through spaced repetition flashcards and take one
              timed practice test per week. Try a{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                free practice test
              </Link>{" "}
              to benchmark where you stand today.
            </p>
          </div>
        </div>

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
      </article>
    </div>
  );
}
