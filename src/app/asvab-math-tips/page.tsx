import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "10 ASVAB Math Tips That Actually Raise Your Score",
  description:
    "Proven ASVAB math tips for Arithmetic Reasoning and Mathematics Knowledge. Formulas, pacing strategies, and a 5-week study plan to boost your AFQT score.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-math-tips",
  },
};

const faqItems = [
  {
    q: "Is the ASVAB math hard?",
    a: "The content is high school level. AR covers word problems through basic algebra — ratios, percentages, distance-rate-time. MK covers algebra and geometry — equations, formulas, exponent rules. If you passed Algebra 1 and basic geometry, you have the foundation. The real challenge is speed (especially MK's 75-second pace) and the no-calculator rule.",
  },
  {
    q: "What math is on the ASVAB?",
    a: "Two subtests: Arithmetic Reasoning (16 word problems covering ratios, percentages, distance-rate-time, fractions, and unit conversions) and Mathematics Knowledge (16 direct math problems split roughly 55% algebra and 45% geometry). Both are multiple choice. Formulas are not provided.",
  },
  {
    q: "How can I improve my ASVAB math score fast?",
    a: "Focus on formula memorization for MK and the 3-step word problem method for AR first — these cover the most ground in the least time. Then build mental math speed and practice under timed conditions. Three to five weeks of focused daily practice typically yields a 10–20 point AFQT improvement.",
  },
  {
    q: "Can I use a calculator on the ASVAB?",
    a: "No. No calculator on any ASVAB section. Build mental math shortcuts and practice every problem by hand. If you're relying on a calculator during study sessions, you're not preparing for real test conditions.",
  },
  {
    q: "What ASVAB math score do I need?",
    a: "Depends on your branch and target job. Minimum AFQT for Army is 31 (with a diploma), Air Force is 36, Navy is 35, Marines is 32. Scoring 50+ opens most jobs across all branches and makes you eligible for enlistment bonuses.",
  },
  {
    q: "How is ASVAB math scored?",
    a: "AR and MK each produce individual standard scores (mean around 50, standard deviation around 10). Both feed directly into your AFQT: AFQT = 2VE + AR + MK. Higher math scores also unlock branch-specific composite scores — like the Army's GT or the Navy's BEE — that determine which jobs you qualify for beyond basic enlistment.",
  },
];

export default function ASVABMathTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "10 ASVAB Math Tips That Actually Raise Your Score",
          description:
            "Proven ASVAB math tips for Arithmetic Reasoning and Mathematics Knowledge. Formulas, pacing strategies, and a 5-week study plan to boost your AFQT score.",
          url: "https://asvabhero.com/asvab-math-tips",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-18",
          dateModified: "2026-03-18",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
              "@type": "Answer",
              text: a,
            },
          })),
        }}
      />

      <article className="prose-asvab">
        <h1>10 ASVAB Math Tips That Actually Raise Your Score</h1>

        <p>Your AFQT score decides whether you enlist or go home. Here&apos;s the formula:</p>

        <p>
          <strong>AFQT = 2VE + AR + MK</strong>
        </p>

        <p>
          Two of those four inputs — Arithmetic Reasoning and Mathematics Knowledge — are pure math.
          Math controls half your enlistment eligibility, half your job options, and half your shot
          at a signing bonus.
        </p>

        <p>
          AR and MK aren&apos;t the same test. AR gives you word problems and 2.5 minutes per
          question. MK gives you straight math and 75 seconds per question. They demand different
          knowledge, different speed, and different strategies.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AFQT = 2VE + AR + MK. Two of those four inputs are math subtests. Improving your math
            directly raises the score that determines whether you qualify to enlist.
          </p>
        </aside>

        <p>
          These 10 tips cover test structure, in-test strategy, and study planning. Every tip is
          specific to the ASVAB — not generic &ldquo;study harder&rdquo; advice.
        </p>

        <p>
          Plug your current scores into our{" "}
          <Link href="/calculator">free ASVAB score calculator</Link> before you start studying.
          Knowing your baseline makes everything else in this guide more useful.
        </p>

        {/* Tip 1 */}
        <h2>
          <strong>Tip 1:</strong> Know Why AR and MK Matter More Than You Think
        </h2>

        <p>
          Every point you gain on AR or MK adds one raw point to your AFQT — a direct 1:1
          relationship. Raise AR by 5 and MK by 5, and your AFQT jumps by 10.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          AFQT = 2(VE) + AR + MK
        </div>

        <p>
          But the AFQT is just the starting point. AR and MK also feed into branch-specific
          composite scores that determine which jobs you qualify for.
        </p>

        <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            "AR appears in 5 of 9 Army composite scores",
            "MK appears in 4 of 9",
            "GT 110+ required for cyber and intel jobs",
          ].map((stat) => (
            <div
              key={stat}
              className="rounded-lg bg-navy px-4 py-3 text-center text-sm font-semibold text-accent"
            >
              {stat}
            </div>
          ))}
        </div>

        <p>
          The Army&apos;s General Technical (GT) score is VE + AR. A GT of 110 or higher gates
          cyber and intelligence roles like 17C (Cyber Operations Specialist) — some of the
          best-paying, most transferable jobs in the military. The Air Force General composite uses
          AR + VE. The Navy&apos;s BEE composite double-weights MK, making it critical for nuclear
          and electronics ratings.
        </p>

        <p>
          Scoring 50+ on the AFQT opens most Military Occupational Specialties across all branches,
          plus enlistment bonus eligibility — up to $20,000 or more in signing bonuses and up to
          $50,000 in student loan repayment. The difference between a 45 and a 55 AFQT can be worth
          tens of thousands of dollars before you ship to basic.
        </p>

        <p>
          For a deeper breakdown, see our guide to{" "}
          <Link href="/asvab-scores-explained">ASVAB scores explained</Link>.
        </p>

        {/* Tip 2 */}
        <h2>
          <strong>Tip 2:</strong> Understand What&apos;s Actually on AR vs. MK
        </h2>

        <p>
          AR and MK have different content, different formats, and very different time pressure.
          Studying for one does not prepare you for the other.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th></th>
                <th>AR</th>
                <th>MK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Questions</strong>
                </td>
                <td>16</td>
                <td>16</td>
              </tr>
              <tr>
                <td>
                  <strong>Time</strong>
                </td>
                <td>39 min (~2.5 min/q)</td>
                <td>20 min (~75 sec/q)</td>
              </tr>
              <tr>
                <td>
                  <strong>Format</strong>
                </td>
                <td>Word problems</td>
                <td>Direct math</td>
              </tr>
              <tr>
                <td>
                  <strong>Top topics</strong>
                </td>
                <td>Ratios, D=RT, percentages</td>
                <td>Algebra (~55%), Geometry (~45%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Arithmetic Reasoning</strong> is all word problems. You read a scenario, identify
          what&apos;s being asked, then set up and solve an equation. Most common topics: ratios and
          proportions, distance-rate-time, percentages, fractions, geometry word problems, unit
          conversions, and basic probability. At about 2 minutes 26 seconds per question, the pace
          is generous — if you have a method for breaking down word problems (see Tip 3).
        </p>

        <p>
          <strong>Mathematics Knowledge</strong> is direct math — no stories, no scenarios. You see
          an equation or geometric figure and solve it. Content splits roughly 55% algebra
          (equations, inequalities, exponents, quadratics) and 45% geometry (polygons are the most
          tested topic, coordinate geometry the least). Formulas are <strong>NOT</strong> provided.
          Every formula you need must come from memory.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            MK gives you 75 seconds per question vs. AR&apos;s 2.5 minutes. That&apos;s roughly
            half the time. If you&apos;re spending equal study time on both, you&apos;re probably
            under-preparing for MK speed.
          </p>
        </aside>

        <p>
          For a complete study approach to both subtests, check out our{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        {/* Tip 3 */}
        <h2>
          <strong>Tip 3:</strong> Use the 3-Step Method for Every AR Word Problem
        </h2>

        <p>
          Most AR mistakes happen before anyone does any math. People read a word problem, latch
          onto the numbers, and start calculating before they understand what&apos;s being asked.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">The 3-Step Method</p>
          <ul className="mt-3 space-y-3 text-sm text-text-secondary">
            <li>
              <strong className="text-text-primary">Step 1 — WANT:</strong> What is the question
              actually asking for? Identify the unknown and its unit.
            </li>
            <li>
              <strong className="text-text-primary">Step 2 — HAVE:</strong> What numbers and
              relationships are given? Write them down with units.
            </li>
            <li>
              <strong className="text-text-primary">Step 3 — CONNECT:</strong> Which operation or
              formula links HAVE to WANT? Set up the equation, then solve.
            </li>
          </ul>
        </div>

        <p>
          <strong>Worked example:</strong> &ldquo;A truck uses 12 gallons of gas to travel 180
          miles. How many gallons will it need to travel 300 miles?&rdquo;
        </p>

        <p>
          <strong>WANT:</strong> Gallons needed for 300 miles.
          <br />
          <strong>HAVE:</strong> 12 gallons per 180 miles. Trip distance is 300 miles.
          <br />
          <strong>CONNECT:</strong> Ratio/proportion. Set up: 12/180 = x/300. Cross-multiply: 180x
          = 3,600. Divide: x = 20 gallons.
        </p>

        <p>
          That took about 30 seconds once the setup was clear. Without the method, people often
          multiply 12 × 300, divide by random numbers, or confuse which value goes where in the
          proportion.
        </p>

        <p>
          AR word problems are designed with extra information, tricky phrasing, and multiple
          possible operations. The test writers know most mistakes come from misreading the problem,
          not from inability to do the math. Step 1 neutralizes that.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Practice this on every word problem in your study sessions. After 50+ problems, the
            3-step process becomes automatic.
          </p>
        </aside>

        {/* Tip 4 */}
        <h2>
          <strong>Tip 4:</strong> Learn the Signal Words That Trick You on AR
        </h2>

        <p>
          Word problems translate English into math. The ASVAB uses specific phrases that map to
          specific operations — and some are deliberately counterintuitive.
        </p>

        <p>
          The biggest trap: <strong>&ldquo;less than&rdquo; reverses the order.</strong> &ldquo;Five
          less than x&rdquo; means x − 5, not 5 − x. This single pattern accounts for a huge number
          of wrong answers on AR.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Signal Word/Phrase</th>
                <th>Operation</th>
                <th>Example</th>
                <th>Translation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&ldquo;more than&rdquo;, &ldquo;increased by&rdquo;, &ldquo;sum of&rdquo;</td>
                <td>Addition</td>
                <td>&ldquo;8 more than y&rdquo;</td>
                <td>y + 8</td>
              </tr>
              <tr>
                <td>
                  &ldquo;less than&rdquo;, &ldquo;decreased by&rdquo;, &ldquo;fewer than&rdquo;
                </td>
                <td>Subtraction (REVERSED)</td>
                <td>&ldquo;5 less than x&rdquo;</td>
                <td>x − 5</td>
              </tr>
              <tr>
                <td>&ldquo;of&rdquo; (with fractions/percents)</td>
                <td>Multiplication</td>
                <td>&ldquo;1/3 of 60&rdquo;</td>
                <td>(1/3) × 60</td>
              </tr>
              <tr>
                <td>&ldquo;per&rdquo;, &ldquo;each&rdquo;, &ldquo;every&rdquo;</td>
                <td>Division (rate)</td>
                <td>&ldquo;miles per gallon&rdquo;</td>
                <td>miles ÷ gallons</td>
              </tr>
              <tr>
                <td>&ldquo;is&rdquo;, &ldquo;was&rdquo;, &ldquo;equals&rdquo;</td>
                <td>Equals sign</td>
                <td>&ldquo;The result is 12&rdquo;</td>
                <td>= 12</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            &ldquo;Less than&rdquo; and &ldquo;fewer than&rdquo; reverse the order. &ldquo;A less
            than B&rdquo; always means B − A. This is the single most common translation mistake on
            AR.
          </p>
        </aside>

        <p>
          A sentence using multiple signal words: &ldquo;Three-fourths of a number, decreased by
          10, is 50.&rdquo; Translation: (3/4)x − 10 = 50. &ldquo;Of&rdquo; means multiply,
          &ldquo;decreased by&rdquo; means subtract, &ldquo;is&rdquo; means equals. If you can
          parse that sentence correctly, you can handle any AR phrasing.
        </p>

        <p>
          During practice, circle the signal words in each problem before solving. After a few dozen
          problems, you&apos;ll spot them instantly.
        </p>

        {/* Tip 5 */}
        <h2>
          <strong>Tip 5:</strong> Memorize This MK Formula List (They Won&apos;t Give It to You)
        </h2>

        <p>
          The ASVAB does not provide a formula sheet — not for MK, not for AR, not for any section.
          Every formula you need must already be in your head.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4 font-mono text-sm text-text-secondary">
          <p className="font-semibold text-text-primary">Geometry</p>
          <ul className="mt-2 space-y-1">
            <li>Area of rectangle: A = lw</li>
            <li>Area of triangle: A = ½bh</li>
            <li>Area of circle: A = πr²</li>
            <li>Circumference: C = 2πr</li>
            <li>Volume of rectangular solid: V = lwh</li>
            <li>Volume of cylinder: V = πr²h</li>
            <li>Pythagorean theorem: a² + b² = c²</li>
            <li>Perimeter of rectangle: P = 2l + 2w</li>
          </ul>
          <p className="mt-4 font-semibold text-text-primary">Algebra</p>
          <ul className="mt-2 space-y-1">
            <li>Slope: m = (y₂ − y₁) / (x₂ − x₁)</li>
            <li>Slope-intercept: y = mx + b</li>
            <li>Quadratic formula: x = (−b ± √(b² − 4ac)) / 2a</li>
            <li>Order of operations: PEMDAS</li>
            <li>
              Exponent rules: x<sup>a</sup> × x<sup>b</sup> = x<sup>a+b</sup> | (x<sup>a</sup>)
              <sup>b</sup> = x<sup>ab</sup>
            </li>
          </ul>
        </div>

        <p>
          You also need fraction-decimal conversions memorized cold. These appear in both AR and MK,
          and converting in your head saves 15–20 seconds per problem.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Fraction</th>
                <th>Decimal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1/2", "0.5"],
                ["1/3", "0.333"],
                ["1/4", "0.25"],
                ["1/5", "0.2"],
                ["1/8", "0.125"],
                ["3/4", "0.75"],
                ["2/3", "0.667"],
              ].map(([frac, dec]) => (
                <tr key={frac}>
                  <td className="font-mono">{frac}</td>
                  <td className="font-mono">{dec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <strong>How to memorize these:</strong> Make flashcards — formula on one side, name on the
          other. Test yourself daily starting at least three weeks before your test date. Each day,
          write every formula from memory on a blank sheet before checking your cards. By test day,
          writing the entire list should take under two minutes.
        </p>

        <p>
          Week one: geometry formulas. Week two: add algebra. Week three: add fraction-decimal
          conversions and start full recall drills. Spreading it out makes the recall stick.
        </p>

        {/* Tip 6 */}
        <h2>
          <strong>Tip 6:</strong> Build Mental Math Speed (No Calculator Allowed)
        </h2>

        <p>
          No calculator on any ASVAB section. Every multiplication, division, percentage, and
          fraction conversion happens in your head or on scratch paper. If your mental math is slow,
          you&apos;ll run out of time on MK regardless of whether you know the material.
        </p>

        <p>Four techniques that cover most of what you&apos;ll need:</p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <ul className="space-y-4 text-sm text-text-secondary">
            <li>
              <p className="font-semibold text-text-primary">
                Technique 1 — Distributive multiplication
              </p>
              <p className="mt-1 font-mono">
                4 × 53 = (4 × 50) + (4 × 3) = 200 + 12 = 212
              </p>
              <p className="mt-1">Break awkward multiplications into round numbers plus a small remainder.</p>
            </li>
            <li>
              <p className="font-semibold text-text-primary">
                Technique 2 — Halving for division by 4
              </p>
              <p className="mt-1 font-mono">340 ÷ 4 = (340 ÷ 2) ÷ 2 = 170 ÷ 2 = 85</p>
              <p className="mt-1">Dividing by 4 is just halving twice.</p>
            </li>
            <li>
              <p className="font-semibold text-text-primary">
                Technique 3 — Build percentages from 10%
              </p>
              <p className="mt-1">
                10% = move the decimal left one place. 20% = double it. 5% = halve it. 15% = 10% +
                5%.
              </p>
              <p className="mt-1 font-mono">
                15% of 240 → 10% is 24, 5% is 12, total is 36
              </p>
            </li>
            <li>
              <p className="font-semibold text-text-primary">
                Technique 4 — Estimation to eliminate choices
              </p>
              <p className="mt-1">
                Round the numbers, estimate the answer, and cross out obviously wrong choices before
                solving exactly. If you estimate ~80 and the choices are 42, 78, 156, and 312, you
                only need to verify one answer.
              </p>
            </li>
          </ul>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Memorize these fraction-decimal equivalents — they show up constantly: 1/2=0.5,
            1/4=0.25, 1/3=0.333, 1/8=0.125, 3/4=0.75.
          </p>
        </aside>

        <p>
          Build this skill with daily repetition. Spend 10 minutes a day doing arithmetic without a
          calculator — calculate tips in your head, estimate grocery totals, multiply license plate
          numbers. After two weeks, you&apos;ll notice a real difference in how fast you work
          through ASVAB problems.
        </p>

        {/* Tip 7 */}
        <h2>
          <strong>Tip 7:</strong> Back-Solve When the Algebra Gets Ugly
        </h2>

        <p>
          The ASVAB is multiple choice. The correct answer is already on the screen. When a problem
          looks complicated, plug the answer choices back into the original equation instead of
          solving forward through messy algebra.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4 text-sm text-text-secondary">
          <p className="font-semibold text-text-primary">
            Example: &ldquo;What value of x satisfies 3x² − 12 = 0?&rdquo;
          </p>
          <p className="mt-2">Choices: A) 1&nbsp;&nbsp;B) 2&nbsp;&nbsp;C) 3&nbsp;&nbsp;D) 4</p>
          <p className="mt-2 font-mono">
            Plug in B: 3(2²) − 12 = 3(4) − 12 = 12 − 12 = 0 ✓
          </p>
          <p className="mt-1">Done in 10 seconds.</p>
        </div>

        <p>
          Solving algebraically requires adding 12, dividing by 3, then taking a square root. Not
          hard, but slower. On MK&apos;s 75-second clock, those saved seconds compound.
        </p>

        <p>
          <strong>When to back-solve:</strong> Quadratics, problems with fractions or nested
          expressions, anything where you don&apos;t immediately see a clean algebraic path.
        </p>

        <p>
          <strong>When NOT to back-solve:</strong> Simple linear equations. If the problem is 2x +
          5 = 15, just solve it directly.
        </p>

        <p>
          <strong>Start with choice B or C</strong> (the middle values). If the result is too high,
          try lower. If too low, go higher. You&apos;ll usually find the answer in one or two
          attempts.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            On MK you have 75 seconds per question. Back-solving a tough problem in 20 seconds
            leaves time banked for the next one.
          </p>
        </aside>

        {/* Tip 8 */}
        <h2>
          <strong>Tip 8:</strong> Slow Down on the First 5 CAT-ASVAB Questions
        </h2>

        <p>
          If you&apos;re taking the ASVAB at a Military Entrance Processing Station (MEPS),
          you&apos;re on the CAT-ASVAB — the computer-adaptive version. This changes how scoring
          works.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">How CAT-ASVAB Scoring Works</p>
          <ul className="mt-2 space-y-1 text-sm text-text-secondary">
            <li>Test starts at medium difficulty</li>
            <li>Correct answer → next question is harder (higher score ceiling)</li>
            <li>Wrong answer → next question is easier (lower score ceiling)</li>
            <li>First 5 questions carry the highest scoring weight</li>
            <li>You CANNOT go back and change answers</li>
          </ul>
        </div>

        <p>
          Not all questions count equally. Getting questions 1 through 5 right pushes you into a
          harder bracket where even mediocre performance on later questions still yields a strong
          score. Getting those early questions wrong drops you into an easier bracket where perfect
          performance later can&apos;t fully recover your score.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            A wrong answer on question 3 hurts more than a wrong answer on question 14. Invest
            extra time on questions 1–5.
          </p>
        </aside>

        <p>
          <strong>AR pacing (39 min, 16 questions):</strong> Spend 3–4 minutes on each of the first
          5 questions. That uses about 18 minutes, leaving 21 minutes for the remaining 11 — still
          nearly 2 minutes each.
        </p>

        <p>
          <strong>MK pacing (20 min, 16 questions):</strong> Spend about 90 seconds on each of the
          first 5 questions. That&apos;s 7.5 minutes, leaving 12.5 minutes for the remaining 11 —
          over a minute each. Tight but workable if your formula recall is solid.
        </p>

        <p>
          Read the first five questions carefully. Double-check your work before clicking next. Once
          you submit, there&apos;s no going back.
        </p>

        {/* Tip 9 */}
        <h2>
          <strong>Tip 9:</strong> Pace AR and MK on Completely Different Clocks
        </h2>

        <p>
          People study AR and MK together, practice them together, and walk into the test treating
          them like the same section. The time pressure is drastically different.
        </p>

        <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            "AR: 39 min ÷ 16 questions = 2 min 26 sec each",
            "MK: 20 min ÷ 16 questions = 1 min 15 sec each",
            "MK gives you roughly HALF the time per question",
          ].map((stat) => (
            <div
              key={stat}
              className="rounded-lg bg-navy px-4 py-3 text-center text-sm font-semibold text-accent"
            >
              {stat}
            </div>
          ))}
        </div>

        <p>
          <strong>AR pacing: use your time.</strong> Two and a half minutes per question is enough
          to read the problem twice, set up your equation, solve, and check. Most AR mistakes come
          from misreading the problem. If you&apos;re finishing AR with 10 minutes to spare,
          you&apos;re probably rushing and making avoidable errors.
        </p>

        <p>
          <strong>MK pacing: recognize and execute.</strong> Seventy-five seconds is not enough
          time to figure out a solution from scratch. You need to see a question and immediately know
          which formula or method applies. If you don&apos;t know the approach within 15 seconds,
          make your best educated guess and move on. Burning 2 minutes on one MK question steals
          time from two or three others.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Practice under timed conditions. Set a 20-minute timer for 16 MK problems. If you
            can&apos;t finish, your formula recall or mental math needs more work.
          </p>
        </aside>

        <p>
          Always time yourself during practice: 75 seconds per MK question, 2.5 minutes per AR
          question. Train your internal clock so on test day you instinctively know when you&apos;re
          spending too long. Head to our <Link href="/practice-test">practice tests</Link> for timed
          practice sets.
        </p>

        {/* Tip 10 */}
        <h2>
          <strong>Tip 10:</strong> Follow a 5-Week Study Plan With Real Score Targets
        </h2>

        <p>
          These tips only work with consistent practice. The good news: you don&apos;t need months.
          Data from the Army&apos;s Academic Skills Development Program shows an average 17-point
          AFQT improvement in 3 weeks of structured study. One documented case went from a 38 to a
          72 AFQT (a 34-point gain). Across the program, 43–50% of participants moved up at least
          one AFQT category.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead className="bg-navy-lighter/50">
              <tr>
                <th>Week</th>
                <th>Focus</th>
                <th>Daily Time</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "1",
                  "Diagnostic test + identify weak areas",
                  "30 min",
                  "Know your baseline AR and MK scores",
                ],
                [
                  "2",
                  "Formula memorization + mental math drills",
                  "45 min",
                  "Recall all MK formulas from memory",
                ],
                [
                  "3",
                  "AR word problems using 3-step method",
                  "45 min",
                  "Complete 15 AR problems under time",
                ],
                [
                  "4",
                  "MK timed practice (75 sec/question)",
                  "45 min",
                  "Complete 16 MK problems in 20 min",
                ],
                [
                  "5",
                  "Full timed practice tests + error review",
                  "60 min",
                  "Consistent improvement on practice scores",
                ],
              ].map(([week, focus, time, goal]) => (
                <tr key={week}>
                  <td className="font-mono font-bold">{week}</td>
                  <td>{focus}</td>
                  <td className="font-mono">{time}</td>
                  <td>{goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Week 1 is diagnostic — take a full-length practice test and identify where you&apos;re
          losing points. Slow on MK? Missing AR setups? Forgetting geometry formulas? Your weak
          spots dictate where to focus. Weeks 2 through 4 target specific skills in sequence: you
          can&apos;t do timed MK practice if you haven&apos;t memorized the formulas yet. Week 5
          puts it all together with full timed sections and error analysis.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            30–60 focused minutes beats 3 hours of unfocused review. Study with a timer, work
            specific problem types, and review every mistake.
          </p>
        </aside>

        <p>
          <strong>Realistic expectations:</strong> 4–6 weeks of structured daily study typically
          yields a 10–20 point AFQT improvement. Starting below 50, you&apos;ll likely see bigger
          gains because foundational skills have the steepest improvement curve. Already scoring in
          the 60s or 70s, gains are smaller but still meaningful for composite scores and job
          qualification.
        </p>

        <p>
          Start with a <Link href="/practice-test">practice test</Link> to set your baseline. Then
          check your scores against job requirements with the{" "}
          <Link href="/calculator">ASVAB score calculator</Link>. Knowing exactly how many points
          you need — and for which subtests — makes your study time dramatically more efficient.
        </p>

        <p>
          For the complete study approach beyond just math, see the full{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        {/* FAQ */}
        <h2>ASVAB Math Tips: Frequently Asked Questions</h2>

        <div className="divide-y divide-navy-border/40">
          {faqItems.map(({ q, a }) => (
            <div key={q} className="py-6">
              <h3 className="mt-0">{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which Jobs Your Scores Qualify For
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and get your AFQT, all branch composites, and every
            qualifying job across Army, Navy, Air Force, Marines, Coast Guard, and Space Force.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Free Calculator →
          </Link>
        </div>
      </article>
    </div>
  );
}
