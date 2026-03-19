import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ASVAB Paragraph Comprehension Tips: 9 Strategies | ASVAB Hero",
  description:
    "Master ASVAB paragraph comprehension with 9 tested strategies. Learn question types, trap patterns, and pacing tips to boost your PC score and AFQT.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-paragraph-comprehension-tips",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "ASVAB Paragraph Comprehension Tips: 9 Strategies That Actually Move Your Score",
  description:
    "Master ASVAB paragraph comprehension with 9 tested strategies. Learn question types, trap patterns, and pacing tips to boost your PC score and AFQT.",
  url: "https://asvabhero.com/asvab-paragraph-comprehension-tips",
  author: {
    "@type": "Organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many paragraph comprehension questions are on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the format. The CAT-ASVAB has 11 Paragraph Comprehension questions with a 22-minute time limit. The paper-and-pencil version has 15 questions with a 13-minute time limit. Your recruiter can tell you which format you will take.",
      },
    },
    {
      "@type": "Question",
      name: "What are the question types on the ASVAB paragraph comprehension section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are five main types: specific detail, main idea, vocabulary-in-context, inference, and EXCEPT/NOT. Each type requires a different reading strategy.",
      },
    },
    {
      "@type": "Question",
      name: "How does paragraph comprehension affect my AFQT score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PC combines with Word Knowledge (WK) to form your Verbal Expression (VE) score. VE is the only AFQT component that gets doubled in the formula: AFQT = 2(VE) + AR + MK. A 5-point improvement in VE translates to a 10-point AFQT jump.",
      },
    },
    {
      "@type": "Question",
      name: "Can I go back and change answers on the ASVAB paragraph comprehension section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only on the paper-and-pencil version. The CAT-ASVAB does not allow going back. Once you submit an answer on the CAT, it is final.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my ASVAB paragraph comprehension score quickly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest gains come from two immediate changes: reading the question before the passage so you know what to look for, and learning the 5 wrong-answer trap patterns so you can eliminate on sight. These work on test day without weeks of preparation.",
      },
    },
    {
      "@type": "Question",
      name: "Is paragraph comprehension the same as reading comprehension on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paragraph Comprehension is the official ASVAB subtest name. It tests standard reading comprehension skills: understanding main ideas, finding details, interpreting vocabulary in context, and drawing inferences.",
      },
    },
  ],
};

export default function ASVABParagraphComprehensionTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Paragraph Comprehension Tips: 9 Strategies That Actually Move
          Your Score
        </h1>

        <p className="mt-4 text-text-secondary">
          Most ASVAB prep advice for Paragraph Comprehension boils down to
          &ldquo;read more books.&rdquo; That&apos;s like telling someone to
          get stronger by &ldquo;going to the gym more.&rdquo; You need
          specific techniques, not vague encouragement.
        </p>
        <p className="text-text-secondary">
          Here&apos;s why <strong>ASVAB paragraph comprehension tips</strong>{" "}
          matter more than most test-takers realize: PC feeds directly into your
          Verbal Expression (VE) score, and VE is the only AFQT component that
          gets doubled. A 5-point VE improvement creates a 10-point AFQT jump.
          No other subtest gives you that kind of leverage.
        </p>
        <p className="text-text-secondary">
          Whether you&apos;re taking the CAT-ASVAB (11 questions, 22 minutes)
          or the paper-and-pencil version (15 questions, 13 minutes), these
          strategies work for both formats.
        </p>
        <p className="text-text-secondary">
          Below you&apos;ll find 9 strategies covering everything from reading
          the question before the passage to eliminating trap answers to
          type-specific tactics for each question format. The goal is to turn PC
          from a score you hope works out into a score you control. Already have
          scores? Plug them into the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            free ASVAB score calculator
          </Link>{" "}
          to see where you stand.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT = 2(VE) + AR + MK. VE is the only component multiplied by 2.
            Improving PC directly inflates VE, which double-inflates your AFQT.
          </p>
        </aside>

        {/* Step 1 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 1: Read the Question Before the Passage
        </h2>
        <p className="mt-4 text-text-secondary">
          Most people read the passage first, then the question, then the
          passage again. That&apos;s three reads. You only have time for two.
        </p>
        <p className="text-text-secondary">
          Reading the question first tells you HOW to read the passage. There
          are two reading modes, and the question type determines which one you
          need.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Question Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Reading Mode
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What to Look For
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Specific detail / factual
                </td>
                <td className="py-2 pr-4 font-mono">Scan</td>
                <td className="py-2">Keywords from the question</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Main idea / author&apos;s purpose
                </td>
                <td className="py-2 pr-4 font-mono">Synthesize</td>
                <td className="py-2">First + last sentences</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Vocabulary-in-context
                </td>
                <td className="py-2 pr-4 font-mono">Scan</td>
                <td className="py-2">Surrounding sentence only</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Inference
                </td>
                <td className="py-2 pr-4 font-mono">Synthesize</td>
                <td className="py-2">
                  What the passage implies but doesn&apos;t state
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EXCEPT / NOT
                </td>
                <td className="py-2 pr-4 font-mono">Scan</td>
                <td className="py-2">Eliminate 3 that ARE stated</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Scan mode</strong> is for factual and detail questions.
          You&apos;re hunting for a specific piece of information. Skim until
          you find the keyword match, then read that sentence carefully.
        </p>
        <p className="text-text-secondary">
          <strong>Synthesize mode</strong> is for main idea and inference
          questions. You need the overall meaning, not a single fact. Read for
          the big picture, focusing on the first and last sentences.
        </p>
        <p className="text-text-secondary">
          Here&apos;s the process in practice. You open a question and see
          &ldquo;According to the passage, what is the primary cause
          of...&rdquo; That&apos;s a specific detail question, so you&apos;re
          in scan mode. Quick skim of the passage (10 seconds max) to get the
          topic. Read the question fully. Identify &ldquo;primary cause&rdquo;
          as your keyword. Do a targeted second read, scanning for that phrase
          or its synonyms. Two reads, not three.
        </p>
        <p className="text-text-secondary">
          Contrast that with a question like &ldquo;What is the main idea of
          this passage?&rdquo; Now you&apos;re in synthesize mode. Your
          10-second skim focuses on the first and last sentences. You read for
          the big picture, ignoring individual facts. Same passage, completely
          different reading approach.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            This one change eliminates the most common PC mistake: reading the
            passage without knowing what you&apos;re looking for.
          </p>
        </aside>

        <p className="text-text-secondary">
          On the CAT-ASVAB, you can&apos;t skip questions or go back. Choosing
          the wrong reading mode wastes your limited time on a question you
          can&apos;t revisit. Getting the mode right on the first pass is the
          single biggest time-saver among all ASVAB paragraph comprehension
          tips.
        </p>

        {/* Step 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 2: Learn the 5 Wrong-Answer Traps So You Can Eliminate on Sight
        </h2>
        <p className="mt-4 text-text-secondary">
          The ASVAB doesn&apos;t write random wrong answers. Test writers
          engineer every incorrect choice to look right in a specific way. Once
          you recognize the patterns, wrong answers become obvious.
        </p>
        <p className="text-text-secondary">
          <strong>1. Too Extreme.</strong> Absolute language like
          &ldquo;always,&rdquo; &ldquo;never,&rdquo; &ldquo;all,&rdquo;
          &ldquo;none,&rdquo; or &ldquo;must.&rdquo; Correct answers almost
          always use hedged language: &ldquo;often,&rdquo;
          &ldquo;likely,&rdquo; &ldquo;frequently,&rdquo; &ldquo;may.&rdquo;
          Think of it as the &ldquo;never say never&rdquo; rule. If an answer
          choice contains an absolute qualifier, it&apos;s probably wrong.
        </p>
        <p className="text-text-secondary">
          <strong>2. Too Narrow.</strong> A true detail pulled from the passage,
          but it doesn&apos;t answer the actual question. This is the go-to
          trap for main idea questions. The answer is factually correct and
          appears in the passage, which is exactly why people pick it. Ask
          yourself: does this cover the WHOLE passage or just one part?
        </p>
        <p className="text-text-secondary">
          <strong>3. Opposite.</strong> Reverses the passage&apos;s meaning.
          Often the test writers flip just one word. If the passage says a
          process &ldquo;reduces&rdquo; something, the trap answer says it
          &ldquo;increases&rdquo; it. Read every word.
        </p>
        <p className="text-text-secondary">
          <strong>4. Half Right, All Wrong.</strong> The first half matches the
          passage perfectly. The second half adds information the passage never
          stated. You stop reading after the first half because it sounds right.
          Don&apos;t. Read the entire answer choice before selecting it.
        </p>
        <p className="text-text-secondary">
          <strong>5. Definition Too Literal.</strong> Shows up on
          vocabulary-in-context questions. Gives you the dictionary definition
          instead of the passage-specific meaning. Example:
          &ldquo;pressed&rdquo; as &ldquo;ironed&rdquo; instead of the correct
          answer &ldquo;forced.&rdquo;
        </p>
        <p className="text-text-secondary">
          These five traps work fastest when you&apos;ve already identified the
          question type from Step 1. If you know you&apos;re on a main idea
          question, you&apos;re specifically watching for &ldquo;Too
          Narrow.&rdquo; If you&apos;re on a vocab-in-context question,
          you&apos;re watching for &ldquo;Definition Too Literal.&rdquo; The
          reading mode tells you which trap to expect.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The qualifier rule. When stuck between two answers, pick the one
            with softer language. And when two choices are nearly identical to
            each other, eliminate both &ndash; they can&apos;t both be right
            and the test-maker wouldn&apos;t offer two versions of the same
            correct answer.
          </p>
        </aside>

        {/* Step 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 3: Crack Specific Detail Questions by Matching Keywords
        </h2>
        <p className="mt-4 text-text-secondary">
          Specific detail questions are free points. The passage states the
          answer directly. You don&apos;t need to interpret anything.
        </p>
        <p className="text-text-secondary">
          You&apos;ll recognize them by phrases like &ldquo;According to the
          passage...&rdquo;, &ldquo;The passage states that...&rdquo;, or
          &ldquo;Which of the following is true about...&rdquo;
        </p>
        <p className="text-text-secondary">The keyword-matching strategy:</p>
        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Read the question first (scan mode from Step 1).</li>
          <li>Identify one or two keywords from the question.</li>
          <li>Scan the passage for those keywords or close synonyms.</li>
          <li>
            Read the sentence containing the keywords plus one sentence before
            and after.
          </li>
          <li>
            Match to the answer choice that paraphrases the passage (not copies
            it word-for-word).
          </li>
        </ol>
        <p className="text-text-secondary">
          Here&apos;s a worked example. Suppose the passage discusses tire
          maintenance and states: &ldquo;Steel-belted radials, when properly
          maintained, can last up to 60,000 miles.&rdquo; The question asks:
          &ldquo;According to the passage, how long can steel-belted radials
          last?&rdquo; Your keywords are &ldquo;steel-belted radials&rdquo; and
          &ldquo;last.&rdquo; You scan, find the sentence, and the answer is
          &ldquo;up to 60,000 miles.&rdquo;
        </p>
        <p className="text-text-secondary">
          Now map the wrong answers to the trap types from Step 2.
          &ldquo;Exactly 60,000 miles&rdquo; is Too Extreme, since the passage
          says &ldquo;up to.&rdquo; &ldquo;80,000 miles&rdquo; is an
          Opposite/distortion of the stated number. A detail about a different
          tire type is Too Narrow, answering a question that wasn&apos;t asked.
          Recognizing these traps turns four choices into one.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The paraphrase trap. The correct answer almost never uses the exact
            same words as the passage. Word-for-word copies are often &ldquo;Too
            Narrow&rdquo; or &ldquo;Half Right&rdquo; traps. Look for the
            answer that says the same thing in different words.
          </p>
        </aside>

        <p className="text-text-secondary">
          Never use outside knowledge. You might know facts about the topic that
          go beyond what the passage says. Only passage-supported answers count.
        </p>

        {/* Step 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 4: Solve Main Idea Questions with the First-and-Last Sentence
          Method
        </h2>
        <p className="mt-4 text-text-secondary">
          Main idea questions are where most people lose points. Not because the
          passage is hard, but because they pick an answer that&apos;s true but
          too specific.
        </p>
        <p className="text-text-secondary">
          You&apos;ll spot these with phrasing like &ldquo;What is the main
          idea?&rdquo;, &ldquo;The author&apos;s primary purpose is
          to...&rdquo;, &ldquo;This passage is mainly about...&rdquo;, or
          &ldquo;The best title for this passage would be...&rdquo;
        </p>
        <p className="text-text-secondary">
          Use the first-and-last sentence method:
        </p>
        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Read the first sentence of the passage.</li>
          <li>Read the last sentence of the passage.</li>
          <li>Ask: what topic connects both?</li>
          <li>That connection IS the main idea.</li>
          <li>Scan answer choices for the one that matches.</li>
        </ol>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              First sentence
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Introduces the topic or claim
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Last sentence
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Reinforces or concludes the point
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Connection between them
            </p>
            <p className="mt-1 text-sm text-text-secondary">The main idea</p>
          </div>
        </div>

        <p className="text-text-secondary">
          This works because ASVAB passages are short, usually one to two
          paragraphs. Writers state their point at the beginning and reinforce
          it at the end. The middle sentences are supporting details.
        </p>
        <p className="text-text-secondary">
          Take a passage about coin collecting where the first sentence mentions
          the history of coin theft in museums and the last sentence discusses
          modern security measures for rare collections. The connection?
          Protecting valuable coins. An answer about &ldquo;a specific 1804
          silver dollar stolen in 1967&rdquo; is a detail from the middle. True,
          but Too Narrow.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The &ldquo;Too Narrow&rdquo; detector. If an answer choice contains
            a specific fact, person, or number, it&apos;s almost certainly a
            detail, not the main idea. Main idea answers are always broader than
            any single sentence in the passage.
          </p>
        </aside>

        <p className="text-text-secondary">
          &ldquo;Main idea&rdquo; and &ldquo;author&apos;s purpose&rdquo; use
          the same method with a different lens. Main idea = what the passage is
          about. Author&apos;s purpose = why the author wrote it (to inform, to
          persuade, to explain). Read for &ldquo;what&rdquo; on main idea
          questions. Read for &ldquo;why&rdquo; on author&apos;s purpose
          questions.
        </p>

        {/* Step 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 5: Decode Vocabulary-in-Context Questions Using the IDEAS
          Framework
        </h2>
        <p className="mt-4 text-text-secondary">
          Vocabulary-in-context questions aren&apos;t vocabulary tests.
          They&apos;re context-reading tests. You don&apos;t need a bigger
          vocabulary. You need to read the surrounding sentences.
        </p>
        <p className="text-text-secondary">
          These questions look like: &ldquo;As used in the passage, the word
          ___ most nearly means...&rdquo; or &ldquo;The word ___ in line X
          refers to...&rdquo;
        </p>
        <p className="text-text-secondary">
          The IDEAS framework gives you five types of context clues to look for:
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clue Type
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Signal
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <strong>I</strong>nference
                </td>
                <td className="py-2 pr-4">Implied by the situation</td>
                <td className="py-2">
                  &ldquo;pressed into service&rdquo; = forced (not ironed)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <strong>D</strong>efinition
                </td>
                <td className="py-2 pr-4">
                  Defined with &ldquo;is,&rdquo; &ldquo;means,&rdquo; commas
                </td>
                <td className="py-2">
                  &ldquo;Assembling, or putting together, the
                  ingredients...&rdquo;
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <strong>E</strong>xample
                </td>
                <td className="py-2 pr-4">Examples clarify meaning</td>
                <td className="py-2">
                  &ldquo;Noxious gases, such as carbon monoxide...&rdquo;
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <strong>A</strong>ntonym
                </td>
                <td className="py-2 pr-4">
                  Contrast with &ldquo;but,&rdquo; &ldquo;however,&rdquo;
                  &ldquo;unlike&rdquo;
                </td>
                <td className="py-2">
                  &ldquo;Unlike the fragile vase, the bowl was sturdy&rdquo;
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <strong>S</strong>ynonym
                </td>
                <td className="py-2 pr-4">
                  Restatement with &ldquo;or,&rdquo; &ldquo;also known
                  as&rdquo;
                </td>
                <td className="py-2">
                  &ldquo;The arid, or dry, climate...&rdquo;
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">The strategy, step by step:</p>
        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Cover the answer choices so they don&apos;t influence you.</li>
          <li>Re-read the sentence with a mental blank where the word is.</li>
          <li>Fill in your own word that fits the blank.</li>
          <li>Uncover the choices and match to the closest one.</li>
          <li>
            Test your pick by substituting it back into the sentence. Does the
            sentence still make sense? Keep it. Does it break the meaning? Try
            another choice.
          </li>
        </ol>
        <p className="text-text-secondary">
          Worked example: A baking passage reads &ldquo;Assembling the
          ingredients is the first step.&rdquo; Cover the choices. The blank
          version: &ldquo;___ the ingredients is the first step.&rdquo; Your
          word: &ldquo;putting together&rdquo; or &ldquo;gathering.&rdquo;
          Uncover the choices. Match to &ldquo;putting together.&rdquo;
          Substitute back in: &ldquo;Putting together the ingredients is the
          first step.&rdquo; The meaning holds. That&apos;s your answer.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The literal definition trap. &ldquo;Pressed&rdquo; =
            &ldquo;ironed&rdquo; is the trap answer. The most common dictionary
            definition of a word is almost never the correct answer on context
            questions. The test checks whether you can read context, not whether
            you own a dictionary.
          </p>
        </aside>

        {/* Step 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 6: Answer Inference Questions by Eliminating What the Passage
          Contradicts
        </h2>
        <p className="mt-4 text-text-secondary">
          Inference questions are where most people panic. The answer
          isn&apos;t stated in the passage, so it feels like guessing.
          It&apos;s not guessing. It&apos;s elimination.
        </p>
        <p className="text-text-secondary">
          You&apos;ll see phrasing like &ldquo;It can be inferred...&rdquo;,
          &ldquo;The author would most likely agree...&rdquo;, or &ldquo;Based
          on the passage, which is probably true?&rdquo;
        </p>
        <p className="text-text-secondary">
          Use the inference elimination method:
        </p>
        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>Read the question (synthesize mode from Step 1).</li>
          <li>Read the full passage for overall meaning.</li>
          <li>
            For each answer choice, ask: &ldquo;Does the passage contradict
            this?&rdquo; If yes, eliminate it.
          </li>
          <li>
            For the remaining choices, ask: &ldquo;Does the passage support
            this, even indirectly?&rdquo; The supported one wins.
          </li>
        </ol>
        <p className="text-text-secondary">
          The key rule: a correct inference is ALWAYS supported by passage
          evidence. If you can&apos;t point to a specific sentence or
          combination of sentences that supports the answer, it&apos;s outside
          knowledge, not an inference.
        </p>
        <p className="text-text-secondary">
          Worked example: A passage about boiler technicians describes their
          training requirements and safety protocols. Choice A says &ldquo;boiler
          technicians require no formal training.&rdquo; Sentence 2 mentions a
          certification program. Contradicted. Eliminate. Choice C says
          &ldquo;boiler work is the most dangerous trade.&rdquo; The passage
          never compares it to other trades. Not supported. Eliminate. Choice D
          says &ldquo;safety training is a significant part of becoming a boiler
          technician.&rdquo; Sentences 1 and 3 together establish that training
          includes extensive safety protocols. Supported. Correct.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Inference vs. Assumption. An inference has support in the text. An
            assumption adds information the passage never implies. If
            you&apos;re reaching beyond what the passage says, you&apos;ve
            crossed from inference into assumption.
          </p>
        </aside>

        <p className="text-text-secondary">
          Watch for the EXCEPT/NOT variant. These flip the logic: three answers
          ARE inferable, and one is NOT. Use the same elimination method, but
          mark answers as &ldquo;supported&rdquo; instead of
          &ldquo;contradicted.&rdquo; The one without support is your answer.
        </p>
        <p className="text-text-secondary">
          Read the word &ldquo;EXCEPT&rdquo; or &ldquo;NOT&rdquo; twice before
          answering. Missing the negation is the number one mistake on these
          questions.
        </p>

        {/* Step 7 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 7: Manage Your Time Differently on CAT vs. Paper-and-Pencil
        </h2>
        <p className="mt-4 text-text-secondary">
          The ASVAB comes in two formats with completely different time
          pressures. Using the wrong pacing strategy costs points even if you
          know the material. These ASVAB paragraph comprehension tips only work
          if you have enough time to apply them, so pacing is non-negotiable.
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
                <td className="py-2 pr-4 font-mono">11</td>
                <td className="py-2 font-mono">15</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Time
                </td>
                <td className="py-2 pr-4 font-mono">22 minutes</td>
                <td className="py-2 font-mono">13 minutes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Per question
                </td>
                <td className="py-2 pr-4 font-mono">~2 min</td>
                <td className="py-2 font-mono">~51 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Can skip?
                </td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Adaptive?
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>CAT strategy: The First Five Rule.</strong>
        </p>
        <p className="text-text-secondary">
          On the CAT-ASVAB, the first five questions carry disproportionate
          weight. The adaptive algorithm uses your early answers to determine
          your ability level. Get the first five right, and the algorithm locks
          you into harder questions worth more points.
        </p>
        <p className="text-text-secondary">
          Spend up to 3 minutes each on the first 5 questions. Be deliberate.
          Use every strategy from Steps 1 through 6. Then budget the remaining 7
          minutes across the last 6 questions, roughly 70 seconds each.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              First 5 questions
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Up to 3 min each (15 min total)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Remaining 6 questions
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              ~70 sec each (7 min total)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Total</p>
            <p className="mt-1 text-sm text-text-secondary">22 minutes</p>
          </div>
        </div>

        <p className="text-text-secondary">
          You cannot go back on CAT. Every answer is final. No skipping. This is
          why the reading-mode decision from Step 1 matters so much. One wrong
          reading mode on an early question can cascade.
        </p>
        <p className="text-text-secondary">
          <strong>Paper-and-pencil strategy: The Two-Pass Method.</strong>
        </p>
        <p className="text-text-secondary">
          With 51 seconds per question, you can&apos;t afford to get stuck. Pass
          1: answer every question you can in under 45 seconds. Flag anything
          that takes longer. Pass 2: return to flagged questions with your
          remaining time.
        </p>
        <p className="text-text-secondary">
          You CAN skip and return on paper-and-pencil. Use this advantage.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Which format will you take? MEPS (Military Entrance Processing
            Station) uses the CAT-ASVAB. MET sites sometimes use
            paper-and-pencil. Ask your recruiter which one you&apos;ll be taking
            so you can practice the right pacing strategy.
          </p>
        </aside>

        <p className="text-text-secondary">
          One rule applies to both formats: you can always reference the passage
          while answering. Never answer from memory. Always go back and verify.
        </p>

        {/* Step 8 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 8: Build Long-Term PC Skills Between Now and Test Day
        </h2>
        <p className="mt-4 text-text-secondary">
          Steps 1 through 7 are test-day strategies you can apply immediately.
          This step is for the weeks leading up to your test when you have time
          to build the underlying skill.
        </p>
        <p className="text-text-secondary">
          <strong>Daily reading practice (15&ndash;20 minutes).</strong>
        </p>
        <p className="text-text-secondary">
          Read at your current level. Don&apos;t force yourself through dense
          academic papers. Good sources: news articles, Wikipedia entries,
          science magazines, anything with short 1-2 paragraph sections that
          mirror the ASVAB format.
        </p>
        <p className="text-text-secondary">
          After each article, close it and summarize the main idea in one
          sentence. This trains synthesize mode from Step 1 without requiring a
          practice test.
        </p>
        <p className="text-text-secondary">
          <strong>Active reading technique.</strong>
        </p>
        <p className="text-text-secondary">
          After every paragraph, pause and ask: &ldquo;What was the point of
          that paragraph?&rdquo; This forces your brain to process meaning in
          real time instead of letting your eyes slide across words.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Take timed practice tests weekly. Before answering each question,
            identify the question type first (detail, main idea,
            vocab-in-context, inference, EXCEPT/NOT). Naming the type activates
            the right strategy from Steps 3 through 6. Try a{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              free practice test
            </Link>{" "}
            to start.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            The audiobook trick. Listen to an audiobook at 1.25x speed while
            following along with the text. This trains your brain to process
            written language faster, which directly helps on the timed test.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>Vocabulary building.</strong> Don&apos;t memorize word lists.
          When you hit an unknown word while reading, use the IDEAS framework
          from Step 5 to figure it out from context. That&apos;s the exact skill
          the test measures.
        </p>
        <p className="text-text-secondary">
          <strong>Timeline.</strong> Two or more weeks out: daily reading plus
          weekly practice tests. One week out: focus on the ASVAB paragraph
          comprehension tips in Steps 1&ndash;7 and do a full timed practice
          section. Day before: review the 5 trap types from Step 2, then rest.
        </p>

        {/* Step 9 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 9: See How PC Affects Your AFQT and Branch Qualification
        </h2>
        <p className="mt-4 text-text-secondary">
          PC doesn&apos;t just affect one score. It cascades through your entire
          ASVAB results because of how the scoring formulas work. Understanding
          this connection is the reason these ASVAB paragraph comprehension tips
          focus so heavily on PC as a leverage point.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          PC + WK = VE (Verbal Expression)
          <br />
          AFQT = 2(VE) + AR + MK
          <br />
          VE is the ONLY component that gets doubled.
          <br />
          5-point VE gain = 10-point AFQT gain.
        </div>

        <p className="text-text-secondary">
          What this means in real numbers: if your AFQT is sitting at 28,
          you&apos;re below the Army&apos;s minimum of 31. Improving PC alone
          could push you over the line. If you&apos;re at 33, you qualify for
          Army, Navy, and Marines, but you&apos;re locked out of the Air Force
          (36 minimum). A few more PC points could open two additional branches.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Minimum AFQT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 font-mono">40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Beyond the AFQT, PC feeds into composite line scores like Clerical
          (CL) and General Technical (GT) that determine which specific jobs you
          qualify for. Higher composites mean more MOS options
          (Army/Marines), more AFSC options (Air Force/Space Force), and more
          rating options (Navy/Coast Guard). More options mean more bargaining
          power with your recruiter when it&apos;s time to pick your job.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Plug your scores into the{" "}
            <Link
              href="/calculator"
              className="text-accent hover:text-accent-hover"
            >
              free ASVAB score calculator
            </Link>{" "}
            to see exactly which jobs you qualify for across all six branches.
            For a deeper dive on how AFQT, VE, and composite scores all
            connect, check out our{" "}
            <Link
              href="/asvab-scores-explained"
              className="text-accent hover:text-accent-hover"
            >
              ASVAB scores explained
            </Link>{" "}
            guide.
          </p>
        </aside>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>
        <div className="divide-y divide-navy-border/40">
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How many paragraph comprehension questions are on the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends on the format. The CAT-ASVAB (computerized version
              taken at MEPS) has 11 Paragraph Comprehension questions with a
              22-minute time limit. The paper-and-pencil version has 15
              questions with a 13-minute time limit. Either way, each question
              is tied to a short passage of one to two paragraphs. Your
              recruiter can tell you which format you&apos;ll take.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              What are the question types on the ASVAB paragraph comprehension
              section?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              There are five main types: specific detail (asks about a fact
              stated in the passage), main idea (asks what the passage is about
              overall), vocabulary-in-context (asks what a word means as used
              in the passage), inference (asks what the passage implies but
              doesn&apos;t directly state), and EXCEPT/NOT (asks you to
              identify the one answer that ISN&apos;T supported). Each type
              requires a different reading strategy, covered in Steps 3 through
              6 above.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How does paragraph comprehension affect my AFQT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              PC combines with Word Knowledge (WK) to form your Verbal
              Expression (VE) score. VE is the only AFQT component that gets
              doubled in the formula: AFQT = 2(VE) + AR + MK. That means a
              5-point improvement in VE translates to a 10-point AFQT jump. No
              other subtest gives you that kind of scoring leverage.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I go back and change answers on the ASVAB paragraph
              comprehension section?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Only on the paper-and-pencil version. The P&amp;P ASVAB lets you
              skip questions and return to them within the time limit. The
              CAT-ASVAB does not. Once you submit an answer on the CAT,
              it&apos;s final. You cannot go back, skip ahead, or change a
              previous response. This is why the First Five Rule from Step 7
              matters: invest extra time in early questions when the stakes are
              highest.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              How can I improve my ASVAB paragraph comprehension score quickly?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The fastest gains come from two immediate changes: reading the
              question before the passage (Step 1) so you know what to look
              for, and learning the 5 wrong-answer trap patterns (Step 2) so
              you can eliminate on sight. These work on test day without weeks
              of preparation. For pacing, learn the First Five Rule for CAT or
              the Two-Pass Method for P&amp;P (Step 7). For sustained
              improvement, add the daily reading practice from Step 8. Even one
              to two weeks of 15-minute daily sessions builds the comprehension
              speed that PC questions demand.
            </p>
          </div>
          <div className="py-6">
            <h3 className="font-display text-base font-bold text-text-primary">
              Is paragraph comprehension the same as reading comprehension on
              the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The official subtest name is &ldquo;Paragraph
              Comprehension,&rdquo; but it tests standard reading comprehension
              skills: understanding main ideas, finding details, interpreting
              vocabulary in context, and drawing inferences. The ASVAB
              doesn&apos;t have a separate &ldquo;reading comprehension&rdquo;
              section. If you see that term in study guides, they&apos;re
              referring to Paragraph Comprehension.
            </p>
          </div>
        </div>

        {/* CTA */}
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
