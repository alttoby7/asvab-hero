import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "9 ASVAB Arithmetic Reasoning Tips to Raise Your Score | ASVAB Hero",
  description:
    "Learn 9 proven ASVAB arithmetic reasoning tips with worked examples, mental math shortcuts, and a 5-week study plan to boost your AR, AFQT, and GT scores.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-arithmetic-reasoning-tips",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "9 ASVAB Arithmetic Reasoning Tips to Raise Your Score Fast",
  description:
    "Learn 9 proven ASVAB arithmetic reasoning tips with worked examples, mental math shortcuts, and a 5-week study plan to boost your AR, AFQT, and GT scores.",
  url: "https://asvabhero.com/asvab-arithmetic-reasoning-tips",
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
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many arithmetic reasoning questions are on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CAT-ASVAB has 16 AR questions with a 39-minute time limit, giving you about 2.4 minutes per question. The paper-and-pencil version has 30 questions in 36 minutes, or about 1.2 minutes each. Most test-takers today take the CAT version at a MEPS or MET site.",
      },
    },
    {
      "@type": "Question",
      name: "What math topics appear on the AR section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AR covers 9 topic categories: basic arithmetic, percentages, ratios and proportions, distance-rate-time, averages, geometry (perimeter and area), unit conversions, combined work rates, and number theory. Proportions, rates, and unit conversions appear most frequently. All problems are presented as word problems.",
      },
    },
    {
      "@type": "Question",
      name: "Is Arithmetic Reasoning the same as Mathematics Knowledge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. AR tests your ability to solve word problems by translating English into math equations. MK tests pure math concepts like algebra, geometry, and equation solving without the word problem layer. Both feed into your AFQT, but they require different preparation strategies.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a calculator on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Calculators are not allowed on any ASVAB subtest, including AR and MK. You receive scratch paper for working out problems by hand. This is why mental math shortcuts and estimation skills are critical for managing your time.",
      },
    },
    {
      "@type": "Question",
      name: "How does AR affect my AFQT score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AR is a direct input to the AFQT formula: AFQT = 2(VE) + AR + MK. It also makes up 50% of the GT composite (GT = VE + AR). Improving AR raises both scores simultaneously, which is why it offers the best return on study time of any single subtest.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good AR score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average AR standard score is around 50. For most enlistment purposes, average is sufficient. If you are targeting GT-dependent jobs like intelligence or cyber, aim for 55 or above on AR to push your GT past 110. Use the ASVAB Score Calculator to see how your AR score maps to specific job qualifications.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my AR score quickly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the fastest gains, focus on Steps 2 through 4: learn the buzzword-to-operation translations, memorize the five core formulas, and practice mental math shortcuts. These three skills address the most common reasons people lose AR points. For sustained improvement, follow the 5-week study plan in Step 8.",
      },
    },
  ],
};

export default function ASVABArithmeticReasoningTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          9 ASVAB Arithmetic Reasoning Tips to Raise Your Score Fast
        </h1>

        <p className="mt-4 text-text-secondary">
          Most ASVAB math advice boils down to &ldquo;memorize formulas and practice.&rdquo; That misses the point. Arithmetic Reasoning is not a math test. It is a word problem test. The math is usually basic. The challenge is translating English sentences into equations under time pressure, with no calculator.
        </p>
        <p className="text-text-secondary">
          That matters because AR pulls double duty on your score. It is one of four subtests that feed your AFQT, the score that determines whether you can enlist. It is also 50% of your General Technical (GT) composite, the score that controls access to intel, cyber, and special operations jobs.
        </p>
        <p className="text-text-secondary">
          Here are the <strong>ASVAB arithmetic reasoning tips</strong> that actually move the needle, from translating word problems to managing the adaptive test format.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
          <br />
          GT = VE + AR
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AR score affects both your ability to enlist (AFQT) and the jobs you qualify for (GT and 5 other composites). Use the{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB Score Calculator</Link>{" "}
            to see exactly how your AR score changes your options.
          </p>
        </aside>

        {/* Step 1 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 1: Understand Why AR Controls Your Career Options
        </h2>
        <p className="mt-4 text-text-secondary">
          AR appears in more composite line scores than any other ASVAB subtest. In the Army alone, it feeds 6 of 10 composites: GT, CL, CO, EL, FA, and SC. The Air Force uses it in G, E, and M composites. The Navy includes it in GT, NUC, and EL. Marines use it in GT, CL, EL, and Mechanical.
        </p>
        <p className="text-text-secondary">
          That reach means a weak AR score locks you out of jobs across every branch, not just a few.
        </p>
        <p className="text-text-secondary">
          The GT composite is where this hits hardest. GT equals VE plus AR, so AR is literally half the score. The highest-demand military jobs all require GT 110 or above.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">MOS/AFSC</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Job Title</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">GT/Composite Minimum</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4 font-mono">35F</td>
                <td className="py-2 pr-4">Intelligence Analyst</td>
                <td className="py-2 font-mono">GT 101</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4 font-mono">17C</td>
                <td className="py-2 pr-4">Cyber Operations</td>
                <td className="py-2 font-mono">GT 110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4 font-mono">18X</td>
                <td className="py-2 pr-4">Special Forces Candidate</td>
                <td className="py-2 font-mono">GT 110</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 pr-4 font-mono">1N0X1</td>
                <td className="py-2 pr-4">Operations Intel</td>
                <td className="py-2 font-mono">G 57</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Marines</td>
                <td className="py-2 pr-4 font-mono">0231</td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2 font-mono">GT 105</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4 font-mono">CTN</td>
                <td className="py-2 pr-4">Cryptologic Technician</td>
                <td className="py-2 font-mono">AR+MK+EI+GS = 222</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Here is the math that should get your attention: raising your AR score by 10 points lifts your GT by 10 AND your AFQT by 10. No other subtest gives you that kind of two-for-one return.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            If you are aiming for intelligence, cyber, or special operations in any branch, AR is your gatekeeper. These are the jobs with the best training, highest security clearances, and strongest civilian career translation.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you are targeting a specific job, check the full requirements on the{" "}
          <Link href="/army-mos-list" className="text-accent hover:text-accent-hover">Army MOS List</Link>{" "}
          or{" "}
          <Link href="/usmc-mos-list" className="text-accent hover:text-accent-hover">USMC MOS List</Link>. Then visit{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB Scores Explained</Link>{" "}
          to understand how composites are calculated.
        </p>
        <p className="text-text-secondary">
          Every point you gain on AR echoes across multiple scores. The next eight strategies show you how to get those points.
        </p>

        {/* Step 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 2: Translate Word Problems with the Buzzword Method
        </h2>
        <p className="mt-4 text-text-secondary">
          The math on AR is rarely harder than what you did in middle school. The difficulty is figuring out what math to do. Every word problem contains buzzwords that map directly to operations. Learn the translations and the test gets predictable.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Buzzword</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Operation</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">total, combined, sum, altogether, in all</td>
                <td className="py-2">Addition</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">difference, fewer, less than, remain, left over</td>
                <td className="py-2">Subtraction</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">times, product, each, per, of, doubled, tripled</td>
                <td className="py-2">Multiplication</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">per, each, split, ratio, shared equally, divided</td>
                <td className="py-2">Division</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">is, was, equals, results in, gives</td>
                <td className="py-2">Equals</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Apply this 4-step method on every problem:
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li><strong>Read the full problem.</strong> Do not start solving halfway through. The question at the end often changes what you need to find.</li>
          <li><strong>Identify exactly what the question asks.</strong> Circle it or underline it on your scratch paper. &ldquo;How many miles total&rdquo; is different from &ldquo;how many more miles.&rdquo;</li>
          <li><strong>Map the buzzwords to operations.</strong> Write the translation above each keyword.</li>
          <li><strong>Build the equation, then solve.</strong> Only pick up your pencil to calculate after steps 1 through 3 are done.</li>
        </ol>

        <p className="text-text-secondary">
          <strong>Worked example:</strong> A soldier runs 3 miles every morning and 2 miles every evening. How many total miles does the soldier run in a 5-day work week?
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>Buzzwords: &ldquo;every&rdquo; signals multiplication. &ldquo;Total&rdquo; signals addition followed by multiplication.</li>
          <li>Daily miles: 3 + 2 = 5</li>
          <li>Weekly miles: 5 x 5 = 25</li>
          <li>Answer: 25 miles</li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            &ldquo;Less than&rdquo; reverses the order. &ldquo;5 less than 12&rdquo; means 12 minus 5, not 5 minus 12. The ASVAB uses this reversal to generate wrong answer choices. Write the phrase out in English first, then translate.
          </p>
        </aside>

        <p className="text-text-secondary">
          This buzzword method turns ASVAB arithmetic reasoning tips from abstract advice into a repeatable system. Drill it until the translations are automatic. The translation step is where most people lose AR points, not the arithmetic itself.
        </p>

        {/* Step 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 3: Memorize the 5 Formulas That Cover 80% of AR
        </h2>
        <p className="mt-4 text-text-secondary">
          You do not need to memorize dozens of formulas. Five cover roughly 80% of the problems you will see. Learn these cold and you will recognize most AR questions on sight.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Formula Category</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Approximate Frequency</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Ratios and Proportions</td>
                <td className="py-2 pr-4 font-mono">20-25%</td>
                <td className="py-2">Easy once you know cross-multiply</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Percentages</td>
                <td className="py-2 pr-4 font-mono">15-20%</td>
                <td className="py-2">Watch for &ldquo;percent of&rdquo; vs &ldquo;percent off&rdquo;</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Distance, Rate, Time</td>
                <td className="py-2 pr-4 font-mono">15-20%</td>
                <td className="py-2">Easy with triangle method</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Perimeter and Area</td>
                <td className="py-2 pr-4 font-mono">10-15%</td>
                <td className="py-2">Know rectangles, triangles, circles</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Averages</td>
                <td className="py-2 pr-4 font-mono">10-15%</td>
                <td className="py-2">Reverse problems are tricky</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          1. Distance = Rate x Time (D = RT)
        </h3>
        <p className="mt-4 text-text-secondary">
          Picture a triangle with D on top, R and T on the bottom. Cover what you need to find. Need Rate? R = D/T. Need Time? T = D/R.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> A truck drives 55 mph for 3 hours. Distance = 55 x 3 = 165 miles.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          2. Percent = (Part / Whole) x 100
        </h3>
        <p className="mt-4 text-text-secondary">
          Reverse it when needed: Part = (Percent / 100) x Whole.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> 18 out of 60 soldiers passed the PT test. Percent = (18/60) x 100 = 30%.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          3. Ratio and Proportion (Cross-Multiply)
        </h3>
        <p className="mt-4 text-text-secondary">
          Set up two equal fractions and cross-multiply to solve.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> If 3 MREs cost $12, how much do 7 MREs cost? Set up 3/12 = 7/x. Cross-multiply: 3x = 84. x = $28.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          4. Perimeter and Area
        </h3>
        <p className="mt-4 text-text-secondary">
          Rectangle: P = 2L + 2W, A = L x W. Triangle: A = (1/2) x B x H. Circle: C = 2(pi)r, A = (pi)r squared.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> A rectangular barracks floor is 40 ft by 25 ft. Area = 40 x 25 = 1,000 sq ft.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          5. Average = Sum / Count
        </h3>
        <p className="mt-4 text-text-secondary">
          Reverse it for &ldquo;what score do I need&rdquo; problems: Sum = Average x Count.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> PT scores of 82, 91, and 76. Average = (82 + 91 + 76) / 3 = 249 / 3 = 83.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            No calculators are allowed on any ASVAB math subtest. You get scratch paper. That is it. Practice every formula by hand until you can solve them without hesitation. The challenge is recognizing WHICH formula a word problem is testing. That is where Step 2&apos;s buzzword mapping helps.
          </p>
        </aside>

        {/* Step 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 4: Use Mental Math Shortcuts to Save Time
        </h2>
        <p className="mt-4 text-text-secondary">
          Speed matters on the ASVAB. On the CAT, you have about 2.4 minutes per question. On paper, you have 1.2 minutes. These five shortcuts buy you time on problems that would otherwise eat through your clock.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          1. The 10% Trick for Percentages
        </h3>
        <p className="mt-4 text-text-secondary">
          Find 10% by moving the decimal one place left. Build from there. Need 30% of 250? 10% = 25, so 30% = 75. Need 15%? That is 10% + 5% = 25 + 12.5 = 37.5. For 25%, divide by 4. Faster than multiplying by 0.25.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          2. Backsolving from Answer Choices
        </h3>
        <p className="mt-4 text-text-secondary">
          Plug answer choice B or C into the problem. If it works, you are done. If the result is too high, try A. Too low, try D. This turns algebra into arithmetic and eliminates equation setup entirely on some problems.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          3. Distributive Property for Hard Multiplication
        </h3>
        <p className="mt-4 text-text-secondary">
          Break one number apart. 17 x 6 = (10 x 6) + (7 x 6) = 60 + 42 = 102. Faster than long multiplication every time.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          4. Cross-Multiply Proportions Immediately
        </h3>
        <p className="mt-4 text-text-secondary">
          Do not try to simplify or reason through proportions. Set up two fractions, cross-multiply, and divide. It works every time with no thinking required.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          5. Estimate, Then Eliminate
        </h3>
        <p className="mt-4 text-text-secondary">
          Round the numbers, get a ballpark answer, and cross off choices that are way off. If the answer choices are 42, 78, 156, and 312, and your rough estimate is &ldquo;somewhere around 150,&rdquo; you can eliminate three choices without finishing the calculation.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">10% Trick</p>
            <p className="mt-1 text-sm text-text-secondary">Saves ~30 seconds per percentage problem</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Backsolving</p>
            <p className="mt-1 text-sm text-text-secondary">Saves ~45 seconds on algebra problems</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Estimation</p>
            <p className="mt-1 text-sm text-text-secondary">Eliminates 2 wrong answers in under 15 seconds</p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            On the CAT, if you are stuck with under 30 seconds left on a question, estimate and eliminate. A 50/50 guess beats running out of time. Unanswered questions at the end of the CAT trigger a scoring penalty.
          </p>
        </aside>

        <p className="text-text-secondary">
          Practice these shortcuts with scratch paper until they are automatic. Speed on easy arithmetic buys you time for harder questions.
        </p>

        {/* Step 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 5: Master Rate, Proportion, and Unit Conversion Problems
        </h2>
        <p className="mt-4 text-text-secondary">
          Of all the ASVAB arithmetic reasoning tips in this guide, this one has the highest payoff. These three problem types show up more than any other category on AR. They also share a single core skill: cross-multiplication. Get fast at setting up two equal fractions and you handle all three.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Rate Problems (Combined Work)
        </h3>
        <p className="mt-4 text-text-secondary">
          When two people or machines work together, add their rates as fractions, then flip the result for total time.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> Painter A finishes a room in 4 hours. Painter B finishes it in 6 hours. Working together, how long does it take?
        </p>
        <p className="text-text-secondary">
          Rate A = 1/4 room per hour. Rate B = 1/6 room per hour. Combined = 1/4 + 1/6 = 3/12 + 2/12 = 5/12 room per hour. Time = 12/5 = 2.4 hours.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Proportion Problems (Map Scales, Recipes, Ratios)
        </h3>
        <p className="mt-4 text-text-secondary">
          Set up a ratio, cross-multiply, and solve. Every time.
        </p>
        <p className="text-text-secondary">
          <em>Example:</em> A map scale shows 1 inch = 50 miles. Two cities are 3.5 inches apart on the map. Actual distance?
        </p>
        <p className="text-text-secondary">
          Set up: 1/50 = 3.5/x. Cross-multiply: x = 175 miles.
        </p>

        <h3 className="mt-6 font-display text-lg font-bold text-text-primary">
          Unit Conversion Problems
        </h3>
        <p className="mt-4 text-text-secondary">
          These test whether you can convert between units before or after solving. Multiply by conversion factors to move between units.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Conversion</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Value</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1 foot</td>
                <td className="py-2 font-mono">12 inches</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1 yard</td>
                <td className="py-2 font-mono">3 feet</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1 mile</td>
                <td className="py-2 font-mono">5,280 feet</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1 gallon</td>
                <td className="py-2 font-mono">4 quarts</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">1 hour</td>
                <td className="py-2 font-mono">60 minutes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">1 pound</td>
                <td className="py-2 font-mono">16 ounces</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            All three problem types (rates, proportions, unit conversions) use cross-multiplication as the core solving method. If you drill one skill, drill this one.
          </p>
        </aside>

        <p className="text-text-secondary">
          Drill these three categories first. Once they are automatic, the remaining AR topics (geometry, statistics, probability) are lower-frequency and easier to pick up.
        </p>

        {/* Step 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 6: Recognize the 4 Trap Answer Patterns
        </h2>
        <p className="mt-4 text-text-secondary">
          The ASVAB does not generate random wrong answers. Test makers build traps from predictable mistakes. Once you know the four patterns, you can spot them before they catch you.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Trap 1: The Intermediate Calculation Trap</p>
          <p className="mt-1 text-sm text-text-secondary">
            You solve part of the problem correctly, see your partial answer in the choices, and select it. But the question asked for the final answer, not the step along the way. <em>Example:</em> A problem asks for total cost including tax. You calculate the tax amount ($4.50) and see it in the choices. But the question asked for total cost ($54.50). Always re-read the question before selecting.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Trap 2: The Wrong Operation Trap</p>
          <p className="mt-1 text-sm text-text-secondary">
            The problem says &ldquo;how many more&rdquo; (subtraction) but you add instead. Or it says &ldquo;each&rdquo; (division) and you multiply. This is why the buzzword method from Step 2 matters. Map the keywords before you calculate.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Trap 3: The Unit Mismatch Trap</p>
          <p className="mt-1 text-sm text-text-secondary">
            The problem gives time in hours but the answer choices are in minutes. Or it mixes feet and inches. You solve correctly but pick the wrong unit. Before solving, check that your units match the answer choices. Convert first if they do not.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Trap 4: The Off-by-One Trap</p>
          <p className="mt-1 text-sm text-text-secondary">
            Classic fence-post problem. A 100-foot fence needs posts every 10 feet. How many posts? The answer is 11, not 10. You need one post at the start plus one at every interval. Any time a problem asks you to count dividers, markers, or endpoints, add one.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Before you select your answer, re-read the final sentence of the problem. What exactly did it ask for? Total or difference? Dollars or cents? Hours or minutes? This 5-second habit catches most trap answers.
          </p>
        </aside>

        {/* Step 7 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 7: Adapt Your Strategy to the CAT-ASVAB Format
        </h2>
        <p className="mt-4 text-text-secondary">
          The CAT-ASVAB is not a normal test. It is adaptive, meaning the computer picks your next question based on whether you got the last one right. Correct answers lead to harder questions worth more points. Wrong answers lead to easier questions worth less. This changes your pacing strategy completely.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Feature</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">CAT-ASVAB</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Paper-and-Pencil</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Questions</td>
                <td className="py-2 pr-4 font-mono">16</td>
                <td className="py-2 font-mono">30</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Time Limit</td>
                <td className="py-2 pr-4 font-mono">39 minutes</td>
                <td className="py-2 font-mono">36 minutes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Time per Question</td>
                <td className="py-2 pr-4 font-mono">~2.4 minutes</td>
                <td className="py-2 font-mono">~1.2 minutes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Can Skip Questions</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Can Go Back</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Adaptive Difficulty</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">No</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Early Questions Weight</td>
                <td className="py-2 pr-4">Higher</td>
                <td className="py-2">Equal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Understanding the CAT format is one of the most overlooked ASVAB arithmetic reasoning tips. The first five questions carry the most weight. They set the difficulty range for the rest of your test. Get them right and you are playing at a higher scoring level for the remaining 11 questions.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">First 5 questions</p>
            <p className="mt-1 text-sm text-text-secondary">Spend up to 3 minutes each</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Remaining 11 questions</p>
            <p className="mt-1 text-sm text-text-secondary">Spend about 2 minutes each</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Never leave a question blank</p>
            <p className="mt-1 text-sm text-text-secondary">Unanswered questions at the end trigger a scoring penalty</p>
          </div>
        </div>

        <p className="text-text-secondary">
          On the CAT, you cannot skip questions and you cannot go back. Every answer is final. If you are stuck, eliminate what you can and pick from what remains. A wrong answer is better than no answer.
        </p>
        <p className="text-text-secondary">
          For the paper-and-pencil version, use the two-pass method. First pass: answer every question you can solve in under 90 seconds. Second pass: return to the harder ones with your remaining time.
        </p>
        <p className="text-text-secondary">
          For a deeper breakdown of ASVAB study strategy, check out{" "}
          <Link href="/how-to-study-for-the-asvab" className="text-accent hover:text-accent-hover">How to Study for the ASVAB</Link>.
        </p>

        {/* Step 8 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 8: Follow a 5-Week AR Study Plan
        </h2>
        <p className="mt-4 text-text-secondary">
          Structured practice beats random studying. This 5-week plan builds your ASVAB arithmetic reasoning skills in the right order, from foundations to test-day simulation.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 1</p>
            <p className="mt-1 text-sm text-text-secondary">Foundations (buzzwords, basic operations) / 30 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 2</p>
            <p className="mt-1 text-sm text-text-secondary">Core Formulas (D=RT, percent, ratio, area, average) / 30 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 3</p>
            <p className="mt-1 text-sm text-text-secondary">Word Problem Drills (translate and solve, no timer) / 45 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 4</p>
            <p className="mt-1 text-sm text-text-secondary">Timed Practice (2.4 min/question CAT pace) / 45 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 5</p>
            <p className="mt-1 text-sm text-text-secondary">Full Test Simulation (complete practice tests under real conditions) / 60 min/day</p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Week 1</strong> focuses on the buzzword-to-operation translations from Step 2 and basic arithmetic without a calculator. If you cannot multiply two-digit numbers on paper reliably, this is the week to fix that.
        </p>
        <p className="text-text-secondary">
          <strong>Week 2</strong> drills the five formulas from Step 3. Solve 10 problems per formula category each day. By the end of the week, you should recognize problem types on sight.
        </p>
        <p className="text-text-secondary">
          <strong>Week 3</strong> shifts to full word problems. Do not time yourself yet. Focus on the 4-step translation method: read, identify, map buzzwords, write equation. Accuracy before speed.
        </p>
        <p className="text-text-secondary">
          <strong>Week 4</strong> adds the clock. Set a timer for 2.4 minutes per question (CAT pace) and practice under pressure. This is where the mental math shortcuts from Step 4 start paying off.
        </p>
        <p className="text-text-secondary">
          <strong>Week 5</strong> is full test simulation. Take complete AR sections back-to-back. Review every wrong answer and identify which trap pattern (Step 6) caught you.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Short on time? Compress to 3 weeks: combine Weeks 1-2 into one week of formulas, Week 3 stays as word problem drills, and combine Weeks 4-5 into timed test practice. The key is doing some practice every day rather than cramming 5 hours once a week. Check the{" "}
            <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">ASVAB Study Guide</Link>{" "}
            and{" "}
            <Link href="/practice-test" className="text-accent hover:text-accent-hover">Practice Test</Link>{" "}
            pages for additional resources.
          </p>
        </aside>

        <p className="text-text-secondary">
          Consistency beats intensity. 30 minutes a day for 5 weeks will raise your AR score more than a weekend of cramming.
        </p>

        {/* Step 9 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Step 9: Calculate Your Score Impact Before Test Day
        </h2>
        <p className="mt-4 text-text-secondary">
          Before you walk into the testing center, run the numbers. Knowing exactly how your AR improvement translates to AFQT and GT changes keeps your preparation focused.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
          <br />
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          AR feeds directly into both formulas with no multiplier tricks. Every point you gain on AR adds one point to your AFQT and one point to your GT. The only subtest with more AFQT weight is VE, which gets doubled.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Minimum AFQT</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Marines</td>
                <td className="py-2 font-mono">31</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Space Force</td>
                <td className="py-2 font-mono">36</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Coast Guard</td>
                <td className="py-2 font-mono">40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Here is what those numbers mean in practice. If your AFQT is sitting at 28, raising your AR by 10 points pushes you to 38. That qualifies you for 5 of 6 branches. If your GT is 100, that same 10-point AR increase puts you at 110, which unlocks Intelligence Analyst, Cyber Operations, and Special Forces candidacy. These are achievable gains from 5 weeks of focused study.
        </p>
        <p className="text-text-secondary">
          Use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB Score Calculator</Link>{" "}
          to plug in your current or estimated scores and see exactly which jobs open up as your AR improves.
        </p>
        <p className="text-text-secondary">
          For the full scoring picture, see{" "}
          <Link href="/asvab-scoring-and-results" className="text-accent hover:text-accent-hover">ASVAB Scoring and Results</Link>,{" "}
          <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB Scores Explained</Link>,{" "}
          <Link href="/what-is-a-good-asvab-score" className="text-accent hover:text-accent-hover">What Is a Good ASVAB Score</Link>, and the{" "}
          <Link href="/asvab-score-chart" className="text-accent hover:text-accent-hover">ASVAB Score Chart</Link>.
        </p>
        <p className="text-text-secondary">
          Math is the number one reason people fail the ASVAB. AR is where the biggest gains are available. These nine ASVAB arithmetic reasoning tips give you a system, not just advice.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How many arithmetic reasoning questions are on the ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB has 16 AR questions with a 39-minute time limit, giving you about 2.4 minutes per question. The paper-and-pencil version has 30 questions in 36 minutes, or about 1.2 minutes each. Most test-takers today take the CAT version at a MEPS or MET site.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What math topics appear on the AR section?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              AR covers 9 topic categories: basic arithmetic, percentages, ratios and proportions, distance-rate-time, averages, geometry (perimeter and area), unit conversions, combined work rates, and number theory. Proportions, rates, and unit conversions appear most frequently. All problems are presented as word problems.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Is Arithmetic Reasoning the same as Mathematics Knowledge?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. AR tests your ability to solve word problems by translating English into math equations. MK tests pure math concepts like algebra, geometry, and equation solving without the word problem layer. Both feed into your AFQT, but they require different preparation strategies.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Can I use a calculator on the ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Calculators are not allowed on any ASVAB subtest, including AR and MK. You receive scratch paper for working out problems by hand. This is why mental math shortcuts and estimation skills are critical for managing your time.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How does AR affect my AFQT score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              AR is a direct input to the AFQT formula: AFQT = 2(VE) + AR + MK. It also makes up 50% of the GT composite (GT = VE + AR). Improving AR raises both scores simultaneously, which is why it offers the best return on study time of any single subtest.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is a good AR score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The average AR standard score is around 50. For most enlistment purposes, average is sufficient. If you are targeting GT-dependent jobs like intelligence or cyber, aim for 55 or above on AR to push your GT past 110. Use the{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB Score Calculator</Link>{" "}
              to see how your AR score maps to specific job qualifications.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How can I improve my AR score quickly?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              For the fastest gains, focus on Steps 2 through 4: learn the buzzword-to-operation translations, memorize the five core formulas, and practice mental math shortcuts. These three skills address the most common reasons people lose AR points. For sustained improvement, follow the 5-week study plan in Step 8.
            </p>
          </div>
        </div>

        {/* CTA */}
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
