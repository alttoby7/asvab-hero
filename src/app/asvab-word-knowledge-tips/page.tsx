import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "11 ASVAB Word Knowledge Tips to Boost Your Score | ASVAB Hero",
  description:
    "Discover 11 ASVAB Word Knowledge tips covering root words, Paragraph Comprehension strategy, and a 4-week verbal study plan to raise your AFQT score.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-word-knowledge-tips",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "11 ASVAB Word Knowledge Tips to Boost Your Verbal Score",
  description:
    "Discover 11 ASVAB Word Knowledge tips covering root words, Paragraph Comprehension strategy, and a 4-week verbal study plan to raise your AFQT score.",
  url: "https://asvabhero.com/asvab-word-knowledge-tips",
  author: {
    "@type": "Organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
  },
  publisher: { "@type": "Organization", name: "ASVAB Hero" },
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many questions are on the ASVAB Word Knowledge section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16 questions in 8 minutes on the CAT-ASVAB (computer version). 35 questions in 11 minutes on the paper version. Both average about 30 seconds per question. The CAT version is the standard at MEPS testing locations.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good ASVAB Word Knowledge score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WK standard scores are part of your VE composite, which ranges from 20 to 62. A VE score of 50 or higher puts you above average. Higher VE directly raises your AFQT because it counts double in the formula (AFQT = 2VE + AR + MK).",
      },
    },
    {
      "@type": "Question",
      name: "Is ASVAB Word Knowledge hard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The vocabulary is below SAT level. These are common English words from news articles and books, not obscure academic terms. The challenge is speed (30 seconds per question) and precision (knowing exact definitions, not vague impressions).",
      },
    },
    {
      "@type": "Question",
      name: "How do I study for ASVAB Word Knowledge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Combine three methods: (1) learn the 24 root words to decode unfamiliar vocabulary, (2) read news articles daily to build natural word exposure, (3) use spaced repetition flashcards for words you miss on practice tests.",
      },
    },
    {
      "@type": "Question",
      name: "What is Verbal Expression (VE) on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VE combines your Word Knowledge and Paragraph Comprehension scores into a single scaled score ranging from 20 to 62. It carries 2x weight in the AFQT formula: AFQT = 2VE + AR + MK. Improving VE is twice as efficient for raising your AFQT as improving AR or MK by the same amount.",
      },
    },
    {
      "@type": "Question",
      name: "Can I retake just the Word Knowledge section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You must retake the entire ASVAB. Retake rules: wait 1 month after your first attempt, 1 month after your second, then 6 months between each subsequent attempt. Your most recent scores replace all previous ones, including scores that were higher.",
      },
    },
  ],
};

export default function ASVABWordKnowledgeTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          11 ASVAB Word Knowledge Tips to Boost Your Verbal Score
        </h1>

        <p className="mt-4 text-text-secondary">
          A 5-point gain on your Verbal Expression score adds 10 points to your
          AFQT. The same 5-point gain on Arithmetic Reasoning? Only 5. VE counts
          double in the AFQT formula, which makes{" "}
          <strong>ASVAB Word Knowledge tips</strong> the fastest route to a
          higher qualifying score.
        </p>

        <p className="text-text-secondary">
          VE is built from two subtests: Word Knowledge (WK) and Paragraph
          Comprehension (PC). Most ASVAB advice treats WK as &ldquo;just
          vocabulary&rdquo; and ignores PC entirely. That&apos;s leaving points
          on the table.
        </p>

        <p className="text-text-secondary">
          These 11 tips cover both subtests. WK strategies for vocabulary
          questions, PC strategies for reading passages, and the study habits
          that tie them together. Each tip includes a specific technique you can
          apply in your next study session.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT = 2VE + AR + MK. VE = WK + PC. Every verbal point you gain
            counts twice. This is the fastest path to raising your AFQT.
          </p>
        </aside>

        <p className="text-text-secondary">
          Already have scores? Plug them into the{" "}
          <Link href="/calculator">free ASVAB score calculator</Link> to see
          your current VE and AFQT.
        </p>

        {/* TIP 1 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. Understand Why VE Is the Highest-Leverage Score on the ASVAB
        </h2>

        <p className="mt-4 text-text-secondary">
          Most people study all four AFQT subtests equally. That&apos;s a
          mistake. The AFQT formula gives VE twice the weight of every other
          score.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK, where VE = WK + PC
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) combines your Word Knowledge and Paragraph
          Comprehension raw scores into a single scaled score ranging from 20 to
          62. Because VE is multiplied by 2 in the AFQT calculation, every point
          of VE improvement has double the AFQT impact of an AR or MK point.
        </p>

        <p className="text-text-secondary">
          Concrete comparison: if your VE goes from 45 to 50, your AFQT
          calculation gains 10 raw points. If your AR goes from 45 to 50, you
          gain only 5. Same effort, double the payoff on the verbal side.
        </p>

        <p className="text-text-secondary">
          VE also feeds into branch-specific composite scores that determine
          which jobs you qualify for.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Composite</th>
                <th>Formula</th>
                <th>Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Army GT</td>
                <td>VE + AR</td>
                <td>110+ required for cyber, intel, medical jobs</td>
              </tr>
              <tr>
                <td>Air Force General</td>
                <td>VE + AR</td>
                <td>Feeds most AFSC assignments</td>
              </tr>
              <tr>
                <td>Marine Corps GT</td>
                <td>VE + AR</td>
                <td>Gateway to technical MOS</td>
              </tr>
              <tr>
                <td>Army CL</td>
                <td>VE + AR + MK</td>
                <td>Clerical and admin roles</td>
              </tr>
              <tr>
                <td>Army ST</td>
                <td>VE + GS + MK</td>
                <td>Science and technical fields</td>
              </tr>
              <tr>
                <td>Army FA</td>
                <td>VE + AR + MK + MC</td>
                <td>Field artillery positions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          VE appears in 6 Army composites, 2 Air Force composites, and the
          Marine GT score, making it the single most reused score across all
          branches. Raising your VE doesn&apos;t just boost your AFQT. It opens
          doors to more military career fields.
        </p>

        <p className="text-text-secondary">
          For a full breakdown of how these scores connect, see{" "}
          <Link href="/asvab-scores-explained">ASVAB scores explained</Link>.
        </p>

        {/* TIP 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. Know Exactly What WK and PC Test (They&apos;re Different)
        </h2>

        <p className="mt-4 text-text-secondary">
          People study &ldquo;verbal&rdquo; as one thing. WK and PC are two
          separate tests with different formats, different timing, and different
          skills. Treating them the same wastes your prep time.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th></th>
                <th>Word Knowledge (WK)</th>
                <th>Paragraph Comprehension (PC)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CAT Questions</td>
                <td>16</td>
                <td>11</td>
              </tr>
              <tr>
                <td>CAT Time</td>
                <td>8 min (~30 sec/q)</td>
                <td>22 min (~2 min/q)</td>
              </tr>
              <tr>
                <td>Paper Questions</td>
                <td>35</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Paper Time</td>
                <td>11 min (~19 sec/q)</td>
                <td>13 min (~52 sec/q)</td>
              </tr>
              <tr>
                <td>Format</td>
                <td>Single word + 4 answer choices</td>
                <td>Short passage + question</td>
              </tr>
              <tr>
                <td>Skill Tested</td>
                <td>Vocabulary breadth</td>
                <td>Reading comprehension</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          WK has two question types. The first and most common is &ldquo;X most
          nearly means ___,&rdquo; a pure synonym question. The second is
          &ldquo;X as used in the sentence most nearly means ___,&rdquo; which
          tests definition-in-context.
        </p>

        <p className="text-text-secondary">
          PC covers a wider range. Question types include main idea,
          author&apos;s purpose, supporting detail, inference,
          vocabulary-in-context, tone/mood, and cause/effect. Each one requires a
          slightly different reading approach.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            WK is a speed test. 30 seconds per question means you know the word
            or you don&apos;t. PC gives you 2 minutes per question, which means
            strategy matters more than raw knowledge.
          </p>
        </aside>

        <p className="text-text-secondary">
          WK words are below SAT level. These are words like
          &ldquo;benevolent,&rdquo; &ldquo;arduous,&rdquo; or
          &ldquo;mitigate.&rdquo; You don&apos;t need a graduate-level
          vocabulary. You need solid command of everyday English words that
          educated adults use in writing.
        </p>

        {/* TIP 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. Learn These 24 Root Words to Decode Words You&apos;ve Never Seen
        </h2>

        <p className="mt-4 text-text-secondary">
          You won&apos;t memorize every word on the ASVAB. But you can learn 24
          Latin and Greek roots that unlock hundreds of words. When a WK question
          throws a word you&apos;ve never seen, roots let you make an educated
          breakdown instead of a blind guess.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Root</th>
                <th>Meaning</th>
                <th>Example Words</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>dict</td>
                <td>say, speak</td>
                <td>dictate, predict, verdict</td>
              </tr>
              <tr>
                <td>port</td>
                <td>carry</td>
                <td>transport, portable, export</td>
              </tr>
              <tr>
                <td>scrib/script</td>
                <td>write</td>
                <td>describe, manuscript, inscription</td>
              </tr>
              <tr>
                <td>bene</td>
                <td>good, well</td>
                <td>benefit, benevolent, benefactor</td>
              </tr>
              <tr>
                <td>mal</td>
                <td>bad</td>
                <td>malfunction, malicious, malcontent</td>
              </tr>
              <tr>
                <td>tract</td>
                <td>pull, drag</td>
                <td>extract, retract, traction</td>
              </tr>
              <tr>
                <td>voc/vok</td>
                <td>call, voice</td>
                <td>vocal, invoke, revoke</td>
              </tr>
              <tr>
                <td>mit/miss</td>
                <td>send</td>
                <td>transmit, missile, dismiss</td>
              </tr>
              <tr>
                <td>man/manu</td>
                <td>hand</td>
                <td>manual, manufacture, manipulate</td>
              </tr>
              <tr>
                <td>cap/cept</td>
                <td>take, seize</td>
                <td>capture, accept, intercept</td>
              </tr>
              <tr>
                <td>duc/duct</td>
                <td>lead</td>
                <td>conduct, deduce, induct</td>
              </tr>
              <tr>
                <td>fac/fic</td>
                <td>make, do</td>
                <td>factory, efficient, artificial</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Root</th>
                <th>Meaning</th>
                <th>Example Words</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cogn</td>
                <td>know</td>
                <td>recognize, cognition, incognito</td>
              </tr>
              <tr>
                <td>path</td>
                <td>feeling</td>
                <td>sympathy, apathy, empathetic</td>
              </tr>
              <tr>
                <td>aud</td>
                <td>hear</td>
                <td>audible, audience, auditorium</td>
              </tr>
              <tr>
                <td>vis/vid</td>
                <td>see</td>
                <td>visible, evidence, visual</td>
              </tr>
              <tr>
                <td>spec</td>
                <td>look</td>
                <td>inspect, spectacle, perspective</td>
              </tr>
              <tr>
                <td>ped</td>
                <td>foot</td>
                <td>pedestrian, pedal, expedition</td>
              </tr>
              <tr>
                <td>terr</td>
                <td>earth</td>
                <td>terrain, territory, terrestrial</td>
              </tr>
              <tr>
                <td>aqua</td>
                <td>water</td>
                <td>aquatic, aquarium, aqueduct</td>
              </tr>
              <tr>
                <td>bio</td>
                <td>life</td>
                <td>biology, biography, antibiotic</td>
              </tr>
              <tr>
                <td>graph/gram</td>
                <td>write, record</td>
                <td>paragraph, telegram, graphic</td>
              </tr>
              <tr>
                <td>temp</td>
                <td>time</td>
                <td>temporary, contemporary, tempo</td>
              </tr>
              <tr>
                <td>struct</td>
                <td>build</td>
                <td>construct, structure, destruct</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Combine roots with common prefixes: un- (not), pre- (before), re-
            (again), mis- (wrong), sub- (under), trans- (across).
            &ldquo;Transport&rdquo; = trans (across) + port (carry) = carry
            across.
          </p>
        </aside>

        <p className="text-text-secondary">
          Study method: learn 4 roots per day. In 6 days you cover all 24. Drill
          with flashcards until you recall each root&apos;s meaning in under 3
          seconds.
        </p>

        {/* TIP 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. Use Prefix and Suffix Clues When You&apos;re Stuck
        </h2>

        <p className="mt-4 text-text-secondary">
          When you can&apos;t identify the root, check the prefix and suffix.
          The beginning and ending of a word often reveal enough meaning to
          eliminate wrong answers.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Prefix</th>
                <th>Meaning</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>un-, in-, im-, ir-, il-</td>
                <td>not</td>
                <td>unable, incomplete, impossible</td>
              </tr>
              <tr>
                <td>pre-</td>
                <td>before</td>
                <td>predict, prevent, premature</td>
              </tr>
              <tr>
                <td>re-</td>
                <td>again</td>
                <td>rebuild, revisit, reconsider</td>
              </tr>
              <tr>
                <td>mis-</td>
                <td>wrong, bad</td>
                <td>mislead, misunderstand, misjudge</td>
              </tr>
              <tr>
                <td>dis-</td>
                <td>opposite, apart</td>
                <td>disagree, disconnect, displace</td>
              </tr>
              <tr>
                <td>sub-</td>
                <td>under, below</td>
                <td>submarine, substandard, subtitle</td>
              </tr>
              <tr>
                <td>trans-</td>
                <td>across</td>
                <td>transfer, translate, transform</td>
              </tr>
              <tr>
                <td>anti-</td>
                <td>against</td>
                <td>antibody, antisocial, antidote</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Key suffixes reveal part of speech, which helps you match the answer
          format.
        </p>

        <p className="text-text-secondary">
          Noun suffixes: -tion/-sion (action), -ment (result), -ness (quality),
          -er/-or (person who). Adjective suffixes: -ous/-ious (full of),
          -able/-ible (capable of), -ful (having), -less (without). Verb
          suffixes: -ify (to make), -ize (to cause), -ate (to act).
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            On WK questions, run a 3-step check: (1) Does it start with a
            negative prefix? That eliminates positive choices. (2) What root do I
            see? (3) Does the suffix tell me if it&apos;s a noun, verb, or
            adjective?
          </p>
        </aside>

        <p className="text-text-secondary">
          Worked example: &ldquo;Benevolent.&rdquo; Bene (good) + vol
          (will/wish) + -ent (adjective suffix) = having good will = kind,
          generous. Even if you&apos;ve never seen the word, the pieces give you
          the answer.
        </p>

        {/* TIP 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. Slow Down on the First 5 CAT-ASVAB Word Knowledge Questions
        </h2>

        <p className="mt-4 text-text-secondary">
          The first few WK questions carry the highest scoring weight on the
          CAT-ASVAB. The adaptive algorithm is still calibrating your ability
          level, so early mistakes cost more than late ones.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>
              <strong>Starting point:</strong> Test begins at medium difficulty
            </li>
            <li>
              <strong>Right answer:</strong> Next word is harder
            </li>
            <li>
              <strong>Wrong answer:</strong> Next word is easier
            </li>
            <li>
              <strong>First 5 questions:</strong> Carry the highest scoring
              weight and set your difficulty bracket
            </li>
            <li>
              <strong>No going back:</strong> You cannot skip or return to
              previous answers
            </li>
            <li>
              <strong>Late questions:</strong> Fine-tune your score but
              can&apos;t fully recover from early mistakes
            </li>
          </ul>
        </div>

        <p className="text-text-secondary">
          Sixteen questions in 8 minutes works out to 30 seconds each. That
          feels fast, so people rush through the opening questions to
          &ldquo;bank&rdquo; time. This is backwards.
        </p>

        <p className="text-text-secondary">
          On questions 1 through 5, use the full 30 seconds. Read every answer
          choice. Distinguish between similar words like &ldquo;amiable&rdquo;
          (friendly) and &ldquo;amenable&rdquo; (willing to agree). A wrong
          answer on question 2 hurts far more than a wrong answer on question
          14.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            There&apos;s no passage to re-read, no calculation to check. Read
            all four choices before clicking. That takes 10 seconds. Do not skip
            it on early questions.
          </p>
        </aside>

        <p className="text-text-secondary">
          Time budget: spend 35 to 40 seconds on questions 1 through 5 (roughly
          3 minutes total). That leaves 5 minutes for the remaining 11
          questions, about 27 seconds each. The math works. If you finish early
          on later questions, that confirms you allocated correctly.
        </p>

        {/* TIP 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. Read the Question Before the Passage on PC
        </h2>

        <p className="mt-4 text-text-secondary">
          PC gives you about 2 minutes per question. The order you read in
          determines whether you use that time well or waste it scanning the
          same passage twice.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>
              <strong>Step 1:</strong> Read the question first (5-10 seconds)
            </li>
            <li>
              <strong>Step 2:</strong> Now you know what you&apos;re looking for
            </li>
            <li>
              <strong>Step 3:</strong> Read the passage with that question in
              mind
            </li>
            <li>
              <strong>Step 4:</strong> Answer directly from the text, not from
              your own knowledge
            </li>
          </ul>
        </div>

        <p className="text-text-secondary">
          Reading the question first turns passive reading into active scanning.
          Instead of absorbing the entire passage and then trying to remember
          what matters, you know exactly what detail, idea, or inference the
          question targets before you start reading.
        </p>

        <p className="text-text-secondary">
          Recognize the question type before you read. Main idea questions mean
          you&apos;re looking for the central point. Supporting detail questions
          mean you&apos;re looking for a specific fact. Inference questions mean
          you need one logical step beyond what&apos;s stated. Author&apos;s
          purpose questions focus on why the passage was written.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            For &ldquo;according to the passage&rdquo; questions, the answer is
            stated directly in the text. For inference questions, the answer is
            one logical step beyond what&apos;s stated. Know which type
            you&apos;re dealing with before you read.
          </p>
        </aside>

        <p className="text-text-secondary">
          Common mistake: using prior knowledge instead of the passage. If the
          passage says &ldquo;the process takes 3 days,&rdquo; the correct
          answer is 3, even if you happen to know it actually takes 5. PC tests
          reading comprehension, not subject expertise.
        </p>

        {/* TIP 7 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. Master the Four Context Clue Types for PC Vocabulary Questions
        </h2>

        <p className="mt-4 text-text-secondary">
          When PC asks what a word means &ldquo;as used in the passage,&rdquo;
          the answer is sitting in the surrounding text. You just need to know
          where to look. There are four types of context clues, and recognizing
          them turns guesswork into a system.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Clue Type</th>
                <th>How It Works</th>
                <th>Signal Words</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Definition</td>
                <td>Passage directly defines the word</td>
                <td>
                  &ldquo;which means,&rdquo; &ldquo;is defined as,&rdquo;
                  &ldquo;refers to&rdquo;
                </td>
                <td>
                  &ldquo;Osmosis, which is the movement of water...&rdquo;
                </td>
              </tr>
              <tr>
                <td>Example</td>
                <td>Passage gives examples that reveal meaning</td>
                <td>
                  &ldquo;such as,&rdquo; &ldquo;for example,&rdquo;
                  &ldquo;including&rdquo;
                </td>
                <td>
                  &ldquo;Nocturnal animals, such as owls and bats...&rdquo;
                </td>
              </tr>
              <tr>
                <td>Substitution</td>
                <td>Replace the word with each answer choice</td>
                <td>(none, you test each option)</td>
                <td>Plug each choice in and see which fits</td>
              </tr>
              <tr>
                <td>Logic</td>
                <td>Surrounding sentences reveal meaning through contrast</td>
                <td>
                  &ldquo;but,&rdquo; &ldquo;however,&rdquo;
                  &ldquo;although,&rdquo; &ldquo;unlike&rdquo;
                </td>
                <td>
                  &ldquo;Unlike the gregarious mayor, the treasurer was
                  shy...&rdquo;
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Substitution is the most universally useful. It works on every
          vocabulary-in-context question regardless of what clues the passage
          provides. Plug each answer choice into the sentence where the word
          appears. The one that preserves the sentence&apos;s meaning is
          correct.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Logic clues with contrast words (&ldquo;but,&rdquo;
            &ldquo;however,&rdquo; &ldquo;although&rdquo;) are the easiest to
            spot. If the passage says &ldquo;Although the task was arduous, the
            reward was generous,&rdquo; the contrast tells you
            &ldquo;arduous&rdquo; means something negative or difficult.
          </p>
        </aside>

        <p className="text-text-secondary">
          Build this skill outside of test prep. When reading anything, pause on
          unfamiliar words and identify which context clue type the surrounding
          text provides. This trains the exact skill PC tests.
        </p>

        {/* TIP 8 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          8. Eliminate Wrong Answers Before You Pick on WK
        </h2>

        <p className="mt-4 text-text-secondary">
          Even when you don&apos;t know a word&apos;s exact meaning, you can
          often eliminate 2 or 3 wrong answers and turn a blind guess into a
          coin flip or better.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>
              <strong>Eliminate opposites:</strong> Vague sense the word is
              positive? Cross out negative choices.
            </li>
            <li>
              <strong>Eliminate unrelated words:</strong> One or two choices are
              often completely unrelated to the word&apos;s domain.
            </li>
            <li>
              <strong>Watch for look-alike traps:</strong>{" "}
              &ldquo;Ingenious&rdquo; (clever) vs. &ldquo;ingenuous&rdquo;
              (innocent/naive) are designed to trip you up.
            </li>
            <li>
              <strong>Use root knowledge:</strong> Apply what you learned in Tip
              3 to confirm or eliminate choices.
            </li>
          </ul>
        </div>

        <p className="text-text-secondary">
          The process takes 10 seconds. Scan all four choices. Cross out what
          clearly doesn&apos;t fit. Then compare the remaining options more
          carefully.
        </p>

        <p className="text-text-secondary">
          Worked example: &ldquo;Credulous&rdquo; most nearly means (A)
          skeptical, (B) gullible, (C) angry, (D) creative. You recognize
          &ldquo;cred&rdquo; (believe, as in &ldquo;credible&rdquo;). The
          suffix &ldquo;-ulous&rdquo; means &ldquo;tending to.&rdquo; So
          &ldquo;credulous&rdquo; means tending to believe. Cross out (C) angry
          and (D) creative, both unrelated. Between (A) skeptical and (B)
          gullible, &ldquo;tending to believe&rdquo; matches gullible. Answer:
          B.
        </p>

        <p className="text-text-secondary">
          Another heuristic: if the word feels negative, eliminate positive
          choices. If it feels positive, eliminate negative ones. Even a vague
          sense of tone narrows the field.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The most common WK trap is the &ldquo;sounds right&rdquo; answer, a
            choice that sounds related but means something different.
            &ldquo;Fortuitous&rdquo; sounds like &ldquo;fortunate&rdquo; but
            means accidental, not lucky. Always read all four choices.
          </p>
        </aside>

        <p className="text-text-secondary">
          Guessing rule: eliminate at least 2 choices, then pick from the
          remaining options if time is short. A 50/50 guess beats an unanswered
          question on the CAT-ASVAB. The test penalizes unanswered questions
          more heavily than wrong answers because the adaptive algorithm
          interprets no response as inability to answer at any difficulty level.
        </p>

        {/* TIP 9 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          9. Build Vocabulary Through Reading, Not Just Flashcards
        </h2>

        <p className="mt-4 text-text-secondary">
          Flashcards drill words you&apos;ve already encountered. Reading is how
          you encounter new words in the first place. Reading also builds the
          comprehension speed you need for PC, which flashcards cannot do.
        </p>

        <p className="text-text-secondary">
          WK tests definition knowledge, so flashcards help there. PC tests
          comprehension in context, where flashcards fall short. You need both
          methods working together: reading to discover words in natural context,
          flashcards to lock in definitions.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>
              <strong>News articles:</strong> AP News, Reuters, BBC. Written at
              exactly the vocabulary level the ASVAB tests.
            </li>
            <li>
              <strong>Nonfiction books:</strong> Military history, science,
              biography.
            </li>
            <li>
              <strong>Time commitment:</strong> 20-30 minutes daily.
            </li>
            <li>
              <strong>Active reading method:</strong> Hit an unfamiliar word, use
              root/prefix/suffix analysis, look it up, add to your flashcard
              deck.
            </li>
          </ul>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            ASVAB WK vocabulary is below SAT level. These are words like
            &ldquo;pragmatic,&rdquo; &ldquo;concur,&rdquo;
            &ldquo;mitigate,&rdquo; &ldquo;facilitate.&rdquo; Regular reading
            of news articles closes this gap naturally.
          </p>
        </aside>

        <p className="text-text-secondary">
          Active reading in practice: you read a Reuters article and hit the
          word &ldquo;ameliorate.&rdquo; Break it down: &ldquo;a-&rdquo; (to) +
          &ldquo;melior&rdquo; (better). Guess it means &ldquo;to make
          better.&rdquo; Look it up, confirm, add it to your flashcard deck.
          That single encounter teaches the word more durably than seeing it on a
          random vocab list.
        </p>

        <p className="text-text-secondary">
          Research from ERIC studies shows distributed practice beats massed
          practice on vocabulary retention. Reading 20 minutes daily for 4 weeks
          outperforms a 10-hour weekend cram session on follow-up retention
          tests. The brain consolidates vocabulary during sleep, so daily
          exposure triggers more consolidation cycles than binge sessions.
        </p>

        <p className="text-text-secondary">
          Every 20 minutes of reading simultaneously builds WK vocabulary and PC
          reading speed.
        </p>

        {/* TIP 10 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          10. Use Spaced Repetition Flashcards the Right Way
        </h2>

        <p className="mt-4 text-text-secondary">
          Flashcards work, but only with spaced repetition, reviewing at
          increasing intervals based on how well you know each word. Random
          flipping through a deck is the least efficient vocabulary study method.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>
              <strong>Pile 1 (Don&apos;t Know):</strong> Review every day
            </li>
            <li>
              <strong>Pile 2 (Kinda Know):</strong> Review every 3 days
            </li>
            <li>
              <strong>Pile 3 (Know It):</strong> Review once a week
            </li>
            <li>
              <strong>Right answer:</strong> Move the card up one pile
            </li>
            <li>
              <strong>Wrong answer:</strong> Back to Pile 1 (Don&apos;t Know)
            </li>
          </ul>
        </div>

        <p className="text-text-secondary">
          What words to study matters as much as how you study them. Start with
          the 24 roots from Tip 3. Add words you miss on practice tests. Add
          unfamiliar words from daily reading (Tip 9). Don&apos;t start with a
          random &ldquo;500 ASVAB Words&rdquo; list. Generic lists waste time on
          words you already know and skip words in your specific gap areas.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Free apps like Anki automate spaced repetition for you. A physical
            3-pile system works just as well. What matters is the method, not the
            medium.
          </p>
        </aside>

        <p className="text-text-secondary">
          Target 10 to 15 new words per week. Over 4 weeks, that&apos;s 40 to
          60 new words. Combined with root word knowledge from Tip 3, that
          covers the WK vocabulary range. Don&apos;t try to learn 50 words in a
          day. Your brain retains 10 words reviewed across 5 days better than 50
          words crammed in one sitting.
        </p>

        {/* TIP 11 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          11. Follow a 4-Week Verbal Study Plan With Real Benchmarks
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army Academic Skills Development Program documented an average
          17-point AFQT improvement in just 3 weeks of structured study. One
          participant went from a 38 to a 72 AFQT, a 34-point gain. Between 43%
          and 50% of participants moved up at least one AFQT category.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Week</th>
                <th>WK Focus (20 min)</th>
                <th>PC Focus (15 min)</th>
                <th>Daily Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  Learn 12 Latin roots (Table 1 from Tip 3) + prefix/suffix
                  drill
                </td>
                <td>
                  Read 1 news article, practice &ldquo;question first&rdquo;
                  method
                </td>
                <td>35 min</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  Learn 12 Greek roots (Table 2) + begin flashcard deck
                </td>
                <td>
                  Read 1 article + answer 3 PC practice questions
                </td>
                <td>35 min</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  Flashcard review (spaced repetition) + practice test WK
                  sections
                </td>
                <td>
                  Timed PC practice (2 min per question) + context clue drill
                </td>
                <td>40 min</td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  Full timed WK practice (16 questions, 8 min) + review missed
                  words
                </td>
                <td>
                  Full timed PC practice (11 questions, 22 min) + error review
                </td>
                <td>45 min</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            35-45 minutes a day. Verbal improvement doesn&apos;t require
            marathon sessions, just consistent daily contact. Spaced repetition
            research confirms short daily sessions beat weekend cramming on
            long-term retention.
          </p>
        </aside>

        <p className="text-text-secondary">
          Score expectations: 4 weeks of structured study typically yields 5 to
          10 VE points, translating to 10 to 20 AFQT points because of the 2x
          multiplier. Gains are largest when your baseline VE is below 40.
        </p>

        <p className="text-text-secondary">
          Start with a <Link href="/practice-test">practice test</Link> to set
          your baseline. Then check your scores with the{" "}
          <Link href="/calculator">ASVAB score calculator</Link> to see exactly
          where you stand.
        </p>

        <p className="text-text-secondary">
          For the complete plan covering all 9 subtests, see{" "}
          <Link href="/asvab-study-guide">how to study for the ASVAB</Link>.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 divide-y divide-navy-border/40">
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How many questions are on the ASVAB Word Knowledge section?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              16 questions in 8 minutes on the CAT-ASVAB (computer version). 35
              questions in 11 minutes on the paper version. Both average about 30
              seconds per question. The CAT version is the standard at MEPS
              testing locations.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a good ASVAB Word Knowledge score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              WK standard scores are part of your VE composite, which ranges
              from 20 to 62. A VE score of 50 or higher puts you above average.
              Higher VE directly raises your AFQT because it counts double in
              the formula (AFQT = 2VE + AR + MK). Use the{" "}
              <Link href="/calculator">ASVAB score calculator</Link> to see how
              your VE affects your AFQT.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              Is ASVAB Word Knowledge hard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The vocabulary is below SAT level. These are common English words
              from news articles and books, not obscure academic terms. The
              challenge is speed (30 seconds per question) and precision (knowing
              exact definitions, not vague impressions).
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How do I study for ASVAB Word Knowledge?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Combine three methods: (1) learn the 24 root words in Tip 3 to
              decode unfamiliar vocabulary, (2) read news articles daily to build
              natural word exposure, (3) use spaced repetition flashcards for
              words you miss on practice tests.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What is Verbal Expression (VE) on the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              VE combines your Word Knowledge and Paragraph Comprehension scores
              into a single scaled score ranging from 20 to 62. It carries 2x
              weight in the AFQT formula: AFQT = 2VE + AR + MK. Improving VE is
              twice as efficient for raising your AFQT as improving AR or MK by
              the same amount.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I retake just the Word Knowledge section?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. You must retake the entire ASVAB. Retake rules: wait 1 month
              after your first attempt, 1 month after your second, then 6 months
              between each subsequent attempt. Your most recent scores replace
              all previous ones, including scores that were higher.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            Test Your Verbal Skills
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Take a free practice test to see where your WK and PC scores stand
            before you start studying.
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
