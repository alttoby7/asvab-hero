import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How Many Questions Are on the ASVAB? (2026) | ASVAB Hero",
  description:
    "The ASVAB has 145 questions on CAT or 225 on paper. See every subtest's question count, time limit, and pacing strategy for both versions.",
  alternates: {
    canonical: "https://asvabhero.com/how-many-questions-on-the-asvab",
  },
};

export default function HowManyQuestionsOnTheASVABPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "How Many Questions Are on the ASVAB? The Real Answer Nobody Gets Right",
          description:
            "The ASVAB has 145 questions on CAT or 225 on paper. See every subtest's question count, time limit, and pacing strategy for both versions.",
          url: "https://asvabhero.com/how-many-questions-on-the-asvab",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-22",
          dateModified: "2026-03-22",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How long does the ASVAB take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CAT-ASVAB takes about 1.5 hours on average. The paper ASVAB takes 149 minutes of timed testing, with the full session running 3 to 4 hours including administrative tasks and breaks. The PiCAT (home version) takes 2 to 3 hours with no per-subtest time limits.",
              },
            },
            {
              "@type": "Question",
              name: "Does the CAT-ASVAB have fewer questions because it is easier?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The CAT uses adaptive testing, which selects each question based on your demonstrated ability level. Because every question is optimally targeted, 15 questions per subtest can achieve the same measurement precision as 25 to 35 fixed questions on paper. Fewer questions, same accuracy.",
              },
            },
            {
              "@type": "Question",
              name: "What are tryout questions on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Tryout questions are unscored experimental items the DoD includes to evaluate potential future test questions. Each CAT-ASVAB examinee gets tryout items in 2 to 4 subtests, randomly mixed with scored questions. You cannot identify them during the test, and they do not affect your score.",
              },
            },
            {
              "@type": "Question",
              name: "Can I choose whether to take the CAT or paper ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The version is determined by your test location. Recruits at MEPS take the CAT-ASVAB. Recruits sent to a MET site take the paper version. Your recruiter may also offer the PiCAT as a pre-screening option you can complete at home.",
              },
            },
            {
              "@type": "Question",
              name: "Do harder questions count for more on the CAT-ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, specifically on the math subtests (Arithmetic Reasoning and Mathematics Knowledge). On these adaptive subtests, harder questions are worth more points than easier ones. Getting early questions right pushes you into harder, higher-value territory.",
              },
            },
            {
              "@type": "Question",
              name: "How many ASVAB questions determine my AFQT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "On the CAT-ASVAB, 59 of approximately 145 questions feed into your AFQT (Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge, and Paragraph Comprehension). On the paper version, it is 105 of 225. Run your scores through the calculator to see your estimated AFQT percentile.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          How Many Questions Are on the ASVAB? The Real Answer Nobody Gets Right
        </h1>

        <p className="mt-4 text-text-secondary">
          Search <strong>how many questions on the ASVAB</strong> and you&apos;ll find four different numbers: 126, 145, 190, and 225. The confusing part is that all four are correct. They just refer to different versions of the same test.
        </p>

        <p className="text-text-secondary">
          The ASVAB comes in three formats: the CAT-ASVAB (computer adaptive, taken at MEPS), the P&amp;P-ASVAB (paper, taken at MEPS or MET sites), and the PiCAT (unproctored, taken at home). Each format has a different number of questions, different time limits, and different pacing demands.
        </p>

        <p className="text-text-secondary">
          This guide breaks down every subtest for every version, explains why the numbers don&apos;t match, and shows you which of those questions actually determine your score. If you already know your subtest scores, <Link href="/calculator" className="text-accent hover:text-accent-hover">plug them into the ASVAB calculator</Link> to see what jobs you qualify for. For a broader overview of the test itself, start with <Link href="/what-is-the-asvab" className="text-accent hover:text-accent-hover">What Is the ASVAB</Link>.
        </p>

        {/* ─── The Short Answer ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Short Answer: 145 (CAT) or 225 (Paper)
        </h2>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">CAT-ASVAB</p>
            <p className="mt-1 text-sm text-text-secondary">~145 questions (126 scored + ~19 tryout items)</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">P&amp;P MEPS</p>
            <p className="mt-1 text-sm text-text-secondary">225 questions, 149 minutes</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">MET-Site P&amp;P</p>
            <p className="mt-1 text-sm text-text-secondary">190 questions (no Assembling Objects)</p>
          </div>
        </div>

        <p className="mt-4 text-text-secondary">
          The version you take depends on where you test. Most recruits take the CAT-ASVAB at a Military Entrance Processing Station (MEPS). If your recruiter sends you to a Mobile Examination Test (MET) site instead, you get the paper version with 190 questions. Some MEPS locations also administer the full 225-question paper test.
        </p>

        <p className="text-text-secondary">
          There is a fourth option. The PiCAT is an unproctored version you take at home with no per-subtest time limits. You must complete it within 48 hours. If your scores hold up, you take a 25 to 30 minute Verification Test (V-Test) at MEPS to confirm the results.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>Most recruits take the CAT-ASVAB at MEPS.</strong> You cannot choose which version you get. The format is determined by your test location.
          </p>
        </aside>

        {/* ─── CAT-ASVAB Breakdown ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          CAT-ASVAB: Every Subtest, Question Count, and Time Limit
        </h2>

        <p className="mt-4 text-text-secondary">
          The CAT-ASVAB has 10 subtests with 126 scored questions. That number comes directly from officialasvab.com, and it represents the questions that actually count toward your score.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbr</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Scored Questions</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Time Limit</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Time per Question</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">General Science</td>
                <td className="py-2 pr-4 font-mono">GS</td>
                <td className="py-2 pr-4 font-mono">12</td>
                <td className="py-2 pr-4 font-mono">12 min</td>
                <td className="py-2 font-mono">60 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Arithmetic Reasoning</td>
                <td className="py-2 pr-4 font-mono">AR</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2 pr-4 font-mono">55 min</td>
                <td className="py-2 font-mono">3 min 40 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Word Knowledge</td>
                <td className="py-2 pr-4 font-mono">WK</td>
                <td className="py-2 pr-4 font-mono">9</td>
                <td className="py-2 pr-4 font-mono">18 min</td>
                <td className="py-2 font-mono">2 min</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Paragraph Comprehension</td>
                <td className="py-2 pr-4 font-mono">PC</td>
                <td className="py-2 pr-4 font-mono">10</td>
                <td className="py-2 pr-4 font-mono">27 min</td>
                <td className="py-2 font-mono">2 min 42 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mathematics Knowledge</td>
                <td className="py-2 pr-4 font-mono">MK</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2 pr-4 font-mono">31 min</td>
                <td className="py-2 font-mono">2 min 4 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Electronics Information</td>
                <td className="py-2 pr-4 font-mono">EI</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2 pr-4 font-mono">10 min</td>
                <td className="py-2 font-mono">40 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Auto Information</td>
                <td className="py-2 pr-4 font-mono">AI</td>
                <td className="py-2 pr-4 font-mono">10</td>
                <td className="py-2 pr-4 font-mono">7 min</td>
                <td className="py-2 font-mono">42 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Shop Information</td>
                <td className="py-2 pr-4 font-mono">SI</td>
                <td className="py-2 pr-4 font-mono">10</td>
                <td className="py-2 pr-4 font-mono">6 min</td>
                <td className="py-2 font-mono">36 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mechanical Comprehension</td>
                <td className="py-2 pr-4 font-mono">MC</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2 pr-4 font-mono">22 min</td>
                <td className="py-2 font-mono">1 min 28 sec</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Assembling Objects</td>
                <td className="py-2 pr-4 font-mono">AO</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2 pr-4 font-mono">18 min</td>
                <td className="py-2 font-mono">1 min 12 sec</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Total</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">126</td>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">206 min</td>
                <td className="py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          Look at Arithmetic Reasoning. You get 55 minutes for 15 questions. That is over 3.5 minutes per question, making it the most generous subtest by far. Compare that to Electronics Information: 15 questions in 10 minutes, giving you just 40 seconds each.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          What About the 145 Number?
        </h3>

        <p className="mt-4 text-text-secondary">
          Many sources cite 145 total questions on the CAT-ASVAB. That number includes tryout questions, which are unscored experimental items the DoD uses to evaluate potential future test questions. Each test-taker receives tryout items in 2 to 4 subtests, randomly mixed in with scored questions.
        </p>

        <p className="text-text-secondary">
          You cannot tell which questions are tryout items. They look identical to scored questions, and they are timed within the same subtest clock. The time limits listed above account for the possibility of tryout questions in any given subtest.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>AI + SI split:</strong> The paper ASVAB combines Auto and Shop into one 25-question subtest (AS). The CAT splits them into Auto Information (10 questions) and Shop Information (10 questions) as separate timed sections. The scores recombine into a single AS composite for <Link href="/calculator" className="text-accent hover:text-accent-hover">job qualification purposes</Link>.
          </p>
        </aside>

        {/* ─── P&P-ASVAB ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          P&amp;P-ASVAB: The Paper Version Has Nearly Twice as Many Questions
        </h2>

        <p className="mt-4 text-text-secondary">
          The paper ASVAB at MEPS has 225 questions across 9 subtests. That is 99 more questions than the CAT&apos;s scored total, crammed into 149 minutes of timed testing.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Abbr</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Questions</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Time Limit</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Time per Question</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">General Science</td>
                <td className="py-2 pr-4 font-mono">GS</td>
                <td className="py-2 pr-4 font-mono">25</td>
                <td className="py-2 pr-4 font-mono">11 min</td>
                <td className="py-2 font-mono">26 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Arithmetic Reasoning</td>
                <td className="py-2 pr-4 font-mono">AR</td>
                <td className="py-2 pr-4 font-mono">30</td>
                <td className="py-2 pr-4 font-mono">36 min</td>
                <td className="py-2 font-mono">72 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Word Knowledge</td>
                <td className="py-2 pr-4 font-mono">WK</td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 pr-4 font-mono">11 min</td>
                <td className="py-2 font-mono">19 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Paragraph Comprehension</td>
                <td className="py-2 pr-4 font-mono">PC</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2 pr-4 font-mono">13 min</td>
                <td className="py-2 font-mono">52 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mathematics Knowledge</td>
                <td className="py-2 pr-4 font-mono">MK</td>
                <td className="py-2 pr-4 font-mono">25</td>
                <td className="py-2 pr-4 font-mono">24 min</td>
                <td className="py-2 font-mono">58 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Electronics Information</td>
                <td className="py-2 pr-4 font-mono">EI</td>
                <td className="py-2 pr-4 font-mono">20</td>
                <td className="py-2 pr-4 font-mono">9 min</td>
                <td className="py-2 font-mono">27 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Auto &amp; Shop Information</td>
                <td className="py-2 pr-4 font-mono">AS</td>
                <td className="py-2 pr-4 font-mono">25</td>
                <td className="py-2 pr-4 font-mono">11 min</td>
                <td className="py-2 font-mono">26 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mechanical Comprehension</td>
                <td className="py-2 pr-4 font-mono">MC</td>
                <td className="py-2 pr-4 font-mono">25</td>
                <td className="py-2 pr-4 font-mono">19 min</td>
                <td className="py-2 font-mono">46 sec</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Assembling Objects</td>
                <td className="py-2 pr-4 font-mono">AO</td>
                <td className="py-2 pr-4 font-mono">25</td>
                <td className="py-2 pr-4 font-mono">15 min</td>
                <td className="py-2 font-mono">36 sec</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Total</td>
                <td className="py-2 pr-4"></td>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">225</td>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">149 min</td>
                <td className="py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          The total session runs 3 to 4 hours once you factor in check-in, instructions, and breaks between subtests.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          MET-Site Version (190 Questions)
        </h3>

        <p className="mt-4 text-text-secondary">
          If you take the paper ASVAB at a MET site rather than MEPS, you get a shortened version. The MET-site test drops Assembling Objects entirely, leaving 8 subtests and 190 total questions.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>Word Knowledge pacing on paper is brutal.</strong> You get 19 seconds per question for WK on the P&amp;P version versus 2 minutes on the CAT. If you are taking the paper test, <Link href="/asvab-word-knowledge-tips" className="text-accent hover:text-accent-hover">practice WK under timed conditions</Link> before test day. Any question left blank counts as wrong.
          </p>
        </aside>

        <p className="text-text-secondary">
          One advantage of the paper format: you can skip hard questions and come back to them within each subtest&apos;s time window. On the CAT, once you submit an answer, it is locked.
        </p>

        {/* ─── Why the CAT Version Has Fewer Questions ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why the CAT Version Has Fewer Questions
        </h2>

        <p className="mt-4 text-text-secondary">
          Fewer questions does not mean an easier test. The CAT-ASVAB uses Item Response Theory (IRT) with a Bayesian adaptive algorithm that tailors every question to your ability level.
        </p>

        <p className="text-text-secondary">
          Here is how it works. You start each subtest with a medium-difficulty question. Answer correctly, and the next question gets harder. Answer incorrectly, and it gets easier. After each response, the system updates its estimate of your ability and selects the next question that provides maximum information at your current level.
        </p>

        <p className="text-text-secondary">
          Because every question is targeted, 15 adaptive questions can achieve the same measurement precision as 30 fixed questions on paper. The test is not shorter because it is measuring less. It is shorter because it is measuring smarter.
        </p>

        <p className="text-text-secondary">
          The key implication for ASVAB math subtests: on the CAT, harder questions on Arithmetic Reasoning and Mathematics Knowledge are worth more points than easier ones. Getting early questions right pushes you into harder territory, which unlocks higher score potential. Rushing through easy questions and getting them right does less for your score than carefully working through medium and hard ones. For a deeper look at how this affects your results, see <Link href="/asvab-scoring-and-results" className="text-accent hover:text-accent-hover">ASVAB Scoring and Results</Link>.
        </p>

        {/* ─── Which Questions Actually Determine Your Score ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Which Questions Actually Determine Your Score
        </h2>

        <p className="mt-4 text-text-secondary">
          Not all ASVAB questions carry equal weight. Your AFQT score, the number that determines whether you can enlist, comes from just four subtests.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = AR + MK + 2(VE)<br />
          Where VE (Verbal Expression) = WK + PC
        </div>

        <p className="text-text-secondary">
          On the CAT-ASVAB, that means 59 of your approximately 145 questions (41%) determine your enlistment eligibility. On the paper version, it is 105 of 225 (47%).
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">CAT Questions</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">P&amp;P Questions</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Weight in AFQT</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Arithmetic Reasoning (AR)</td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 pr-4 font-mono">30</td>
                <td className="py-2">1x</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mathematics Knowledge (MK)</td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 pr-4 font-mono">25</td>
                <td className="py-2">1x</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Word Knowledge (WK)</td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2">Part of VE (2x)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Paragraph Comprehension (PC)</td>
                <td className="py-2 pr-4 font-mono">11</td>
                <td className="py-2 pr-4 font-mono">15</td>
                <td className="py-2">Part of VE (2x)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Total AFQT Questions</td>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">59</td>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">105</td>
                <td className="py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>VE counts double.</strong> Word Knowledge and Paragraph Comprehension combine into your Verbal Expression (VE) score, and VE is multiplied by 2 in the AFQT formula. That makes your verbal subtests the highest-leverage section on the entire test. <Link href="/asvab-paragraph-comprehension-tips" className="text-accent hover:text-accent-hover">Review PC strategies</Link> and <Link href="/asvab-word-knowledge-tips" className="text-accent hover:text-accent-hover">WK techniques</Link> if your verbal scores need work.
          </p>
        </aside>

        <p className="text-text-secondary">
          The remaining subtests (GS, EI, AI, SI, MC, AO) feed into branch-specific composite scores that determine which jobs you qualify for. An Army recruit needs a GT score of 110 for many intelligence MOS codes, and GT uses AR + WK + PC. A future Air Force mechanic needs a strong Mechanical (M) composite built from GS, AS, MC, and AI. Every question on the ASVAB matters for something. <Link href="/calculator" className="text-accent hover:text-accent-hover">Check which composites your target jobs require</Link>.
        </p>

        <p className="text-text-secondary">
          For the full breakdown of how composites work across all six branches, see <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB Scores Explained</Link>.
        </p>

        {/* ─── Pacing Strategy ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Pacing Strategy: Time Per Question on Each Subtest
        </h2>

        <p className="mt-4 text-text-secondary">
          Knowing the ASVAB question count is only useful if you know how to budget your time. The gap between the fastest and slowest subtests is enormous.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Subtest</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">CAT Time/Question</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">P&amp;P Time/Question</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Difference</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Arithmetic Reasoning</td>
                <td className="py-2 pr-4 font-mono">3 min 40 sec</td>
                <td className="py-2 pr-4 font-mono">72 sec</td>
                <td className="py-2">CAT gives 3x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Paragraph Comprehension</td>
                <td className="py-2 pr-4 font-mono">2 min 42 sec</td>
                <td className="py-2 pr-4 font-mono">52 sec</td>
                <td className="py-2">CAT gives 3x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mathematics Knowledge</td>
                <td className="py-2 pr-4 font-mono">2 min 4 sec</td>
                <td className="py-2 pr-4 font-mono">58 sec</td>
                <td className="py-2">CAT gives 2x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Word Knowledge</td>
                <td className="py-2 pr-4 font-mono">2 min</td>
                <td className="py-2 pr-4 font-mono">19 sec</td>
                <td className="py-2">CAT gives 6x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">General Science</td>
                <td className="py-2 pr-4 font-mono">60 sec</td>
                <td className="py-2 pr-4 font-mono">26 sec</td>
                <td className="py-2">CAT gives 2.3x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Electronics Information</td>
                <td className="py-2 pr-4 font-mono">40 sec</td>
                <td className="py-2 pr-4 font-mono">27 sec</td>
                <td className="py-2">CAT gives 1.5x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mechanical Comprehension</td>
                <td className="py-2 pr-4 font-mono">1 min 28 sec</td>
                <td className="py-2 pr-4 font-mono">46 sec</td>
                <td className="py-2">CAT gives 1.9x more time</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Auto/Shop (AI+SI or AS)</td>
                <td className="py-2 pr-4 font-mono">36-42 sec</td>
                <td className="py-2 pr-4 font-mono">26 sec</td>
                <td className="py-2">CAT gives 1.5x more time</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Assembling Objects</td>
                <td className="py-2 pr-4 font-mono">1 min 12 sec</td>
                <td className="py-2 pr-4 font-mono">36 sec</td>
                <td className="py-2">CAT gives 2x more time</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-text-secondary">
          The CAT gives you significantly more time per question on every subtest. But there is a trade-off.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>On the CAT-ASVAB, you cannot skip questions or go back.</strong> Every answer is final the moment you submit it. On the paper version, you can skip and return within each subtest&apos;s time window. Plan your approach accordingly.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you are taking the CAT, use the extra time on AR and MK deliberately. Those subtests are adaptive, and careful work on early questions sets your difficulty trajectory for the rest of the section. For the paper version, flag hard questions immediately and circle back after you have grabbed every easy point.
        </p>

        <p className="text-text-secondary">
          Build your pacing instincts before test day. <Link href="/practice-test" className="text-accent hover:text-accent-hover">Take a timed practice test</Link> to find out which subtests feel rushed and which give you room to breathe. Then <Link href="/how-to-study-for-the-asvab" className="text-accent hover:text-accent-hover">build a study plan</Link> that targets your weakest areas.
        </p>

        {/* ─── FAQ ─── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How long does the ASVAB take?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB takes about 1.5 hours on average. The paper ASVAB takes 149 minutes of timed testing, with the full session running 3 to 4 hours including administrative tasks and breaks. The PiCAT (home version) takes 2 to 3 hours with no per-subtest time limits.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Does the CAT-ASVAB have fewer questions because it is easier?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The CAT uses adaptive testing, which selects each question based on your demonstrated ability level. Because every question is optimally targeted, 15 questions per subtest can achieve the same measurement precision as 25 to 35 fixed questions on paper. Fewer questions, same accuracy.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What are tryout questions on the ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Tryout questions are unscored experimental items the DoD includes to evaluate potential future test questions. Each CAT-ASVAB examinee gets tryout items in 2 to 4 subtests, randomly mixed with scored questions. You cannot identify them during the test, and they do not affect your score.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Can I choose whether to take the CAT or paper ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The version is determined by your test location. Recruits at MEPS take the CAT-ASVAB. Recruits sent to a MET site take the paper version. Your recruiter may also offer the PiCAT as a pre-screening option you can complete at home.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Do harder questions count for more on the CAT-ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, specifically on the math subtests (Arithmetic Reasoning and Mathematics Knowledge). On these adaptive subtests, harder questions are worth more points than easier ones. Getting early questions right pushes you into harder, higher-value territory.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How many ASVAB questions determine my AFQT score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              On the CAT-ASVAB, 59 of approximately 145 questions feed into your AFQT (Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge, and Paragraph Comprehension). On the paper version, it is 105 of 225. <Link href="/calculator" className="text-accent hover:text-accent-hover">Run your scores through the calculator</Link> to see your estimated AFQT percentile.
            </p>
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">See What Your Scores Unlock</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite scores, and every job you qualify for.
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
