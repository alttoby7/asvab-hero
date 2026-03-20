import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "9 ASVAB Mechanical Comprehension Tips That Work | ASVAB Hero",
  description:
    "Master ASVAB Mechanical Comprehension with 9 proven tips: lever classes, gear ratios, pulley counting, Pascal&apos;s Law, and diagram strategies.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-mechanical-comprehension-tips",
  },
};

export default function ASVABMechanicalComprehensionTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "9 ASVAB Mechanical Comprehension Tips That Actually Work",
          description:
            "Master ASVAB Mechanical Comprehension with 9 proven tips: lever classes, gear ratios, pulley counting, Pascal's Law, and diagram strategies.",
          url: "https://asvabhero.com/asvab-mechanical-comprehension-tips",
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
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Does Mechanical Comprehension count toward my AFQT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The AFQT uses four subtests only: Word Knowledge, Paragraph Comprehension, Arithmetic Reasoning, and Mathematics Knowledge. MC affects composite line scores that determine job eligibility but has zero impact on your AFQT percentile. If your AFQT is below your branch minimum (Army/Navy/Marines: 31, Air Force: 36, Coast Guard: 40), fix that first before spending time on MC.",
              },
            },
            {
              "@type": "Question",
              name: "How many questions are on the ASVAB Mechanical Comprehension subtest?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CAT-ASVAB has 15 questions with a 22-minute time limit, about 88 seconds per question. The paper-and-pencil version has 25 questions in 19 minutes, about 46 seconds per question. The P&P is significantly more time-pressured. Ask your recruiter which format you will take before you practice, so you train at the right pace.",
              },
            },
            {
              "@type": "Question",
              name: "What military jobs require a high Mechanical Comprehension score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "In the Army, high MC helps with MOS requiring CO (Combat), FA (Field Artillery), or MM (Mechanical Maintenance) composites, including infantry, artillery, and maintenance jobs. In the Air Force, MC feeds the M (Mechanical) aptitude area required for aircraft maintenance and munitions AFSCs. In the Navy, Machinist's Mate, Hull Technician, Boiler Technician, and Aviation Machinist's Mate all require solid MC scores.",
              },
            },
            {
              "@type": "Question",
              name: "What is the hardest topic on the Mechanical Comprehension subtest?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Fluid dynamics (Pascal's Law, hydraulics, pressure calculations) tends to trip up recruits with no physics background because it looks nothing like the other machine questions. Gear direction in multi-gear chains is a close second. Both topics have simple rules once you learn them: P = F/A for fluids, alternate-direction rule for meshed gears.",
              },
            },
            {
              "@type": "Question",
              name: "How long does it take to study for the Mechanical Comprehension subtest?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Recruits with hands-on mechanical experience (auto repair, construction, machinery) typically need 1-2 weeks of focused review to hit their target score. Recruits with little mechanical background should plan 3-4 weeks. Either way, start with simple machines (levers, pulleys, gears) since they account for the majority of test questions.",
              },
            },
            {
              "@type": "Question",
              name: "Can I improve my MC score significantly in a short time?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, especially if you focus on the right material. Simple machines account for roughly 60% of MC questions and have straightforward formulas. A recruit who spends one week learning lever classes, the pulley rope-counting method, and the gear ratio formula can see significant score improvement.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          9 ASVAB Mechanical Comprehension Tips That Actually Work
        </h1>

        <p className="mt-4 text-text-secondary">
          Most people skip <strong>ASVAB Mechanical Comprehension</strong> prep
          because it doesn&apos;t affect their AFQT score. That&apos;s exactly
          why their job options are limited after they test.
        </p>
        <p className="text-text-secondary">
          MC controls five composite scores across the branches: Army CO, FA,
          and MM; Air Force M; and multiple Navy ratings. A weak MC score locks
          you out of infantry, field artillery, aircraft maintenance, and
          technical trades before you ever talk to a recruiter about a specific
          job.
        </p>
        <p className="text-text-secondary">
          These 9 tips cover every topic category on the test: levers, pulleys,
          gears, fluid dynamics, inclined planes, and the test-taking strategies
          that work when you&apos;re under 88 seconds per question on the
          CAT-ASVAB. Already have scores?{" "}
          <Link href="/calculator">Plug them into the calculator</Link> to see
          which jobs you qualify for now.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            MC does NOT affect AFQT. But it feeds Army CO, FA, and MM
            composites; Air Force M composite; and Navy ratings like
            Machinist&apos;s Mate and Hull Technician. If you need those jobs,
            MC matters.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. Know Which Composites MC Feeds Before You Study
        </h2>
        <p className="mt-4 text-text-secondary">
          The worst way to prep for MC is to study everything without knowing
          whether MC actually affects the jobs you want. Check this before you
          open a single study guide.
        </p>
        <p className="text-text-secondary">
          MC doesn&apos;t touch your AFQT percentile. That&apos;s a common
          misconception. But it feeds several composite line scores that
          determine specific job eligibility.
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
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  MC Used With
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">CO (Combat)</td>
                <td className="py-2">VE + AS + MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">FA (Field Artillery)</td>
                <td className="py-2">AR + MK + MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">
                  MM (Mechanical Maintenance)
                </td>
                <td className="py-2">AS + EI + MC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">M (Mechanical)</td>
                <td className="py-2">MC feeds M aptitude area</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">Machinist&apos;s Mate</td>
                <td className="py-2">Direct MC score</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">Hull Technician</td>
                <td className="py-2">Direct MC score</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">
                  Aviation Machinist&apos;s Mate
                </td>
                <td className="py-2">Direct MC score</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          If your AFQT is below the branch minimum, fix that first. Every branch
          has an AFQT floor: Army, Navy, and Marines at 31; Air Force and Space
          Force at 36; Coast Guard at 40. MC prep doesn&apos;t move that number
          at all.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your AFQT is below your branch minimum, focus on AR, MK, WK, and
            PC first. MC has zero impact on AFQT. Spending study hours on MC
            when your AFQT is at risk is a strategic mistake.
          </p>
        </aside>

        <p className="text-text-secondary">
          If your AFQT is solid and you&apos;re targeting a technical or combat
          MOS, Army job, Air Force AFSC, or Navy rating that requires the CO,
          FA, MM, or M composite, MC prep is a direct ROI play. Know your target
          job&apos;s composite requirements before you plan your study schedule.
          Use the{" "}
          <Link href="/asvab-score-chart">ASVAB score chart</Link> to look up
          requirements by job.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. Master the 3 Lever Classes with One Mental Framework
        </h2>
        <p className="mt-4 text-text-secondary">
          Lever questions appear on almost every MC test and they always follow
          the same three patterns. One framework identifies any lever class in
          under five seconds.
        </p>
        <p className="text-text-secondary">
          The framework: identify the order of three components. Fulcrum
          (pivot), Load, and Effort. Figure out which component sits in the
          middle. That&apos;s your lever class.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Class
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What&apos;s in the Middle
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Real-World Examples
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Mechanical Advantage
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Class 1
                </td>
                <td className="py-2 pr-4">Fulcrum</td>
                <td className="py-2 pr-4">Crowbar, scissors, seesaw</td>
                <td className="py-2">MA &gt; 1, = 1, or &lt; 1 depending on arm lengths</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Class 2
                </td>
                <td className="py-2 pr-4">Load</td>
                <td className="py-2 pr-4">Wheelbarrow, nutcracker, bottle opener</td>
                <td className="py-2">Always MA &gt; 1 (you always gain force)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Class 3
                </td>
                <td className="py-2 pr-4">Effort</td>
                <td className="py-2 pr-4">Tweezers, forearm/bicep, shovel</td>
                <td className="py-2">Always MA &lt; 1 (you trade force for speed/distance)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          On a diagram, find the triangle or pivot point first. That&apos;s your
          fulcrum. Then identify which component is in the middle. The class
          follows immediately.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Class 1 is the only class where MA can be less than 1, equal to 1,
            or greater than 1 depending on where the fulcrum sits relative to
            load and effort. Classes 2 and 3 always produce the same MA outcome
            every time.
          </p>
        </aside>

        <p className="text-text-secondary">
          Worked example: a diagram shows a person using a crowbar to lift a
          rock. The pivot (fulcrum) sits between the person&apos;s hand (effort)
          and the rock (load). Class 1. If the effort arm is 3 feet and the load
          arm is 0.5 feet, MA = 3 / 0.5 = 6. You apply 1/6 the force needed to
          lift the rock directly. If the rock weighs 120 lbs, you lift it with
          20 lbs of effort.
        </p>
        <p className="text-text-secondary">
          Mechanical advantage formula for all levers: MA = Effort Arm Length /
          Load Arm Length.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. Count the Ropes to Solve Any Pulley Question
        </h2>
        <p className="mt-4 text-text-secondary">
          Pulley diagrams look complicated. They aren&apos;t. One rule solves
          every block-and-tackle question on the test.
        </p>
        <p className="text-text-secondary">
          Count the number of rope segments attached to the movable (lower)
          pulley block. That number is your mechanical advantage.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Fixed pulley only (1 rope segment)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              MA = 1. You pull the same force as the load. Only benefit is
              changing direction.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Single movable pulley (2 rope segments)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              MA = 2. You pull half the load&apos;s weight over twice the
              distance.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Block-and-tackle, 3 segments
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              MA = 3. You pull 1/3 the load&apos;s weight over 3x the distance.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Block-and-tackle, 4 segments
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              MA = 4. You pull 1/4 the load&apos;s weight over 4x the distance.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do NOT count the rope going to your hand. Only count rope segments
            that connect directly to the movable pulley block. The pulling rope
            doesn&apos;t count toward MA.
          </p>
        </aside>

        <p className="text-text-secondary">
          Worked example: you have a 200-lb load hanging from a block-and-tackle
          with 4 rope segments supporting the lower block. Force needed = 200 /
          4 = 50 lbs. You&apos;d need to pull 4 feet of rope to raise the load 1
          foot.
        </p>
        <p className="text-text-secondary">
          Direction rules: a single fixed pulley reverses your pulling direction
          (you pull down to lift up). A movable pulley does not reverse
          direction. On a two-rope system with one fixed and one movable pulley,
          you pull down and the load moves up. MA = 2.
        </p>
        <p className="text-text-secondary">
          Practice counting rope segments on every pulley diagram you encounter
          and the formula becomes automatic within a single study session.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. Use the Gear Ratio Rule to Predict Speed and Torque
        </h2>
        <p className="mt-4 text-text-secondary">
          Every gear question on the ASVAB is asking one of two things: how fast
          does a gear spin, or which direction does it spin. One formula and one
          direction rule cover both.
        </p>
        <p className="text-text-secondary">
          Formula: Gear Ratio = Teeth on Driven Gear / Teeth on Driver Gear.
        </p>
        <p className="text-text-secondary">
          The driven gear is the output. The driver gear is where power enters.
          Speed output = Driver Speed / Gear Ratio. Torque output = Input Torque
          &times; Gear Ratio.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary"></th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Driver Gear
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Driven Gear
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Teeth
                </td>
                <td className="py-2 pr-4 font-mono">10</td>
                <td className="py-2 font-mono">40</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Gear Ratio
                </td>
                <td className="py-2 pr-4 font-mono">(input)</td>
                <td className="py-2 font-mono">4:1</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Speed
                </td>
                <td className="py-2 pr-4 font-mono">1,000 RPM</td>
                <td className="py-2 font-mono">250 RPM</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Torque
                </td>
                <td className="py-2 pr-4 font-mono">10 ft-lb</td>
                <td className="py-2 font-mono">40 ft-lb</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Speed and torque always trade off. Larger driven gear = slower speed,
          more torque. Smaller driven gear = faster speed, less torque. You
          never get more of both.
        </p>
        <p className="text-text-secondary">
          Direction rule: two directly meshed gears always spin in opposite
          directions. In a three-gear chain (A-B-C), gears A and C spin the same
          direction. Gear B is an idler that reverses direction twice, canceling
          out. Belt and chain drives spin connected gears in the same direction.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            On a multiple-choice question asking &ldquo;which gear spins
            faster,&rdquo; the answer is always the smaller gear (fewer teeth).
            You can eliminate wrong answers in under five seconds with this
            shortcut.
          </p>
        </aside>

        <p className="text-text-secondary">
          This two-part system (ratio math and direction rule) covers the vast
          majority of gear questions. If you know the tooth counts and can trace
          the direction of spin, you can answer any gear question the ASVAB
          Mechanical Comprehension subtest throws at you.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. Apply the Work Conservation Rule to Inclined Planes and Screws
        </h2>
        <p className="mt-4 text-text-secondary">
          Machines don&apos;t reduce the total work you do. They redistribute
          force and distance. This single principle eliminates multiple wrong
          answers on every mechanical advantage question.
        </p>
        <p className="text-text-secondary">
          Work = Force &times; Distance. Whether you lift a crate straight up or
          push it up a ramp, you always do the same total work.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          Work = Force &times; Distance
          <br />
          MA = Slope Length / Rise Height
          <br />
          Force Needed = Object Weight / MA
        </div>

        <p className="text-text-secondary">
          Example: move a 100-lb crate up a ramp that&apos;s 10 feet long and 2
          feet high.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>MA = 10 / 2 = 5</li>
          <li>Force needed = 100 / 5 = 20 lbs</li>
          <li>Work = 20 lbs &times; 10 ft = 200 ft-lbs</li>
          <li>Check: lifting directly = 100 lbs &times; 2 ft = 200 ft-lbs. Same.</li>
        </ul>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The test regularly offers an answer that says a machine
            &ldquo;reduces the total work needed.&rdquo; That&apos;s always
            wrong. Machines redistribute work across force and distance. They
            never eliminate it. Eliminate that answer immediately.
          </p>
        </aside>

        <p className="text-text-secondary">
          Screws work the same way: the thread pitch determines MA. Finer
          threads (more threads per inch) = more rotations needed = higher MA =
          less force per rotation. A bolt with 20 threads per inch requires more
          rotations than one with 10 threads per inch but needs less torque each
          turn.
        </p>
        <p className="text-text-secondary">
          Wedges: a long, thin wedge has higher MA than a short, thick one. More
          travel distance for the same result, same total work.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. Solve Fluid Pressure Questions with Pascal&apos;s Law
        </h2>
        <p className="mt-4 text-text-secondary">
          Fluid dynamics questions feel foreign if you haven&apos;t studied
          physics. They&apos;re not. They follow one pressure formula, and every
          question is just a variation.
        </p>
        <p className="text-text-secondary">
          The formula: P = F / A (Pressure = Force / Area).
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          P = F / A
          <br />
          Output Force = Pressure &times; Output Area
        </div>

        <p className="text-text-secondary">
          How a hydraulic jack works: you push 50 lbs on a small piston with 2
          square inches of area. Pressure = 50 / 2 = 25 psi. A large piston
          with 10 square inches of area on the same system has output force = 25
          &times; 10 = 250 lbs. Pascal&apos;s Law: pressure transmits equally
          through a closed fluid. You&apos;ve multiplied your force by 5.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Two numbers come up directly in MC questions: atmospheric pressure at
            sea level is approximately 14.7 psi. Water pressure increases about
            0.43 psi per foot of depth. Memorize both.
          </p>
        </aside>

        <p className="text-text-secondary">
          Connected containers rule: fluid in connected containers reaches the
          same height on both sides regardless of container width, as long as the
          same fluid type fills both sides. A narrow tube connected to a wide
          tank both settle at the same water level. This resolves
          &ldquo;which side is higher&rdquo; questions without any calculation.
        </p>
        <p className="text-text-secondary">
          Drag is the one fluid dynamics topic that doesn&apos;t use P = F/A.
          Drag = friction from moving through a fluid (water or air). Faster
          speed = more drag. Streamlined shapes = less drag. That&apos;s all you
          need for drag questions.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. Label Diagrams Before You Calculate Anything
        </h2>
        <p className="mt-4 text-text-secondary">
          Knowing the formulas is half the battle. The other half is reading the
          diagram correctly. Misidentifying one component, driver vs. driven gear
          or load arm vs. effort arm, flips your answer entirely.
        </p>
        <p className="text-text-secondary">
          Use this five-step diagram protocol before touching a formula:
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 1: Read the question first
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Know what you&apos;re solving for (force, direction, speed,
              pressure). This tells you which components matter.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 2: Label key components
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              For levers: mark fulcrum, load, effort. For gears: mark driver and
              driven. For pulleys: mark the movable block. For hydraulics: mark
              piston areas.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 3: Identify the machine type
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Lever, pulley, gear, inclined plane, hydraulic, or spring.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 4: Apply the relevant formula
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Use the formula that matches the machine type you identified.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Step 5: Eliminate impossible answers
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Force &gt; load weight? Wrong. Single-outcome trade-off answer?
              Probably wrong.
            </p>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            On gear diagrams, always confirm which gear receives power input. A
            diagram showing a large gear turning a small gear could be asking
            about speed increase (correct answer) or torque increase (wrong
            answer). Getting driver and driven reversed flips your answer
            completely.
          </p>
        </aside>

        <p className="text-text-secondary">
          This protocol takes 10-15 seconds per question. On the CAT-ASVAB with
          88 seconds per question, that&apos;s time well spent. On the P&amp;P
          with 46 seconds per question, spend 8 seconds labeling then calculate.
        </p>
        <p className="text-text-secondary">
          The ASVAB Mechanical Comprehension tips that help most on test day are
          the ones that become automatic through practice. Use the{" "}
          <Link href="/practice-test">free ASVAB practice test</Link> with
          diagram-heavy MC questions to drill this protocol until the labeling
          becomes a reflex.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          8. Eliminate Using the Force-Weight Rule and Trade-Off Principle
        </h2>
        <p className="mt-4 text-text-secondary">
          When you&apos;re stuck on an MC question with no clear path to the
          formula, two universal elimination rules cut your choices without any
          math.
        </p>
        <p className="text-text-secondary">
          Rule 1 (Force-Weight Rule): the force required to move a load through
          any frictionless simple machine never exceeds the weight of the load
          itself. Any answer choice showing required force greater than the
          object&apos;s weight is always wrong. Eliminate it immediately.
        </p>
        <p className="text-text-secondary">
          Rule 2 (Trade-Off Principle): correct answers about mechanical changes
          almost always acknowledge a trade-off. &ldquo;Increases torque while
          decreasing speed.&rdquo; &ldquo;Provides mechanical advantage but
          requires pulling more rope.&rdquo; Single-outcome answers like
          &ldquo;just increases torque&rdquo; with no cost stated are traps.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            A third quick elimination: match the machine type to the action
            described. If a question asks what an automatic sump pump uses to
            detect water, eliminate any answer involving manual valves. Automatic
            and manual are mutually exclusive. You don&apos;t need physics to
            make that cut.
          </p>
        </aside>

        <p className="text-text-secondary">
          These rules work across every MC topic category. They&apos;re most
          valuable on questions outside your comfort zone: fluid dynamics if you
          haven&apos;t studied physics, or spring questions if you haven&apos;t
          covered Hooke&apos;s Law. The Force-Weight Rule alone can eliminate one
          to two answer choices on every inclined-plane and pulley question.
        </p>
        <p className="text-text-secondary">
          Applied together with the diagram protocol from Tip 7, you have a
          complete test-taking system for MC questions where you&apos;re unsure:
          label the diagram, identify the machine, apply the formula if you know
          it, then eliminate using these two rules before guessing.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          9. Build a 3-Week MC Study Plan Around Your Test Date
        </h2>
        <p className="mt-4 text-text-secondary">
          MC covers seven distinct topic categories. Trying to cover all of them
          in the final week guarantees you finish none of them well. Sequence
          matters.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Week 1: Simple Machines
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Levers (Tip 2), pulleys (Tip 3), gears (Tip 4), inclined planes
              (Tip 5). These are the highest-frequency topics on the test. Nail
              the formulas and practice with diagrams daily.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Week 2: Applied Physics
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Fluid dynamics/Pascal&apos;s Law (Tip 6), springs/Hooke&apos;s Law
              (F = k &times; x), work-energy-power relationships, velocity and
              acceleration. Lower frequency but still tested.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Week 3: Timed Practice
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Full timed MC practice tests. Drill the diagram protocol. Identify
              your weakest topic and put extra time there.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          If you have less than three weeks, prioritize simple machines first.
          Simple machines account for roughly 60% of MC questions. You can skip
          springs and fluid dynamics entirely if your timeline is short; they&apos;re
          worth fewer total questions.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            CAT-ASVAB: 15 questions in 22 minutes (about 88 seconds each).
            P&amp;P: 25 questions in 19 minutes (about 46 seconds each). The
            P&amp;P is significantly more time-pressured. Know which format
            you&apos;re taking, ask your recruiter, and practice with that pace.
            Take a{" "}
            <Link href="/practice-test">free practice test</Link> to benchmark
            your current MC level before building your schedule.
          </p>
        </aside>

        <p className="text-text-secondary">
          Short daily sessions beat marathon weekend cramming for mechanical
          topics. 20-30 minutes per day with worked examples sticks better than
          3 hours on a Saturday. Mechanical principles require spaced repetition:
          seeing a pulley diagram four times across four days beats seeing it
          four times in one sitting.
        </p>
        <p className="text-text-secondary">
          Three weeks out, use the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link> to build a
          full schedule. Run the{" "}
          <Link href="/calculator">calculator</Link> after you have scores to see
          which composites you&apos;re hitting and which need work.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does Mechanical Comprehension count toward my AFQT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The AFQT uses four subtests only: Word Knowledge, Paragraph
              Comprehension, Arithmetic Reasoning, and Mathematics Knowledge. MC
              affects composite line scores that determine job eligibility but
              has zero impact on your AFQT percentile. If your AFQT is below
              your branch minimum (Army/Navy/Marines: 31, Air Force: 36, Coast
              Guard: 40), fix that first before spending time on MC.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How many questions are on the ASVAB Mechanical Comprehension
              subtest?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB has 15 questions with a 22-minute time limit, about
              88 seconds per question. The paper-and-pencil version has 25
              questions in 19 minutes, about 46 seconds per question. The P&amp;P
              is significantly more time-pressured. Ask your recruiter which
              format you will take before you practice, so you train at the
              right pace.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What military jobs require a high Mechanical Comprehension score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              In the Army, high MC helps with MOS requiring CO (Combat), FA
              (Field Artillery), or MM (Mechanical Maintenance) composites,
              including infantry, artillery, and maintenance jobs. In the Air
              Force, MC feeds the M (Mechanical) aptitude area required for
              aircraft maintenance and munitions AFSCs. In the Navy,
              Machinist&apos;s Mate, Hull Technician, Boiler Technician, and
              Aviation Machinist&apos;s Mate all require solid MC scores.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the hardest topic on the Mechanical Comprehension subtest?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Fluid dynamics (Pascal&apos;s Law, hydraulics, pressure
              calculations) tends to trip up recruits with no physics background
              because it looks nothing like the other machine questions. Gear
              direction in multi-gear chains is a close second. Both topics have
              simple rules once you learn them: P = F/A for fluids,
              alternate-direction rule for meshed gears.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does it take to study for the Mechanical Comprehension
              subtest?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Recruits with hands-on mechanical experience (auto repair,
              construction, machinery) typically need 1-2 weeks of focused
              review to hit their target score. Recruits with little mechanical
              background should plan 3-4 weeks. Either way, start with simple
              machines (levers, pulleys, gears) since they account for the
              majority of test questions. Use the{" "}
              <Link href="/calculator">free calculator</Link> to see your current
              score gaps across all composites.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I improve my MC score significantly in a short time?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, especially if you focus on the right material. Simple
              machines account for roughly 60% of MC questions and have
              straightforward formulas. A recruit who spends one week learning
              lever classes, the pulley rope-counting method, and the gear ratio
              formula can see significant score improvement. The biggest gains
              come from understanding the work-conservation principle: once you
              internalize that machines redistribute rather than eliminate work,
              several wrong-answer traps disappear.
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
