import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "GT Score Max: The Highest Possible GT Score | ASVAB Hero",
  description:
    "The GT score max is widely misreported. The only sourced ceiling is 144 (Army AFCT). Learn why GT can top 100 and what an elite GT unlocks.",
  alternates: {
    canonical: "https://asvabhero.com/gt-score-max",
  },
};

export default function GTScoreMaxPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "GT Score Max: How High Can Your ASVAB GT Score Actually Go?",
          description:
            "The GT score max is widely misreported. The only sourced ceiling is 144 (Army AFCT). Learn why GT can top 100 and what an elite GT unlocks.",
          url: "https://asvabhero.com/gt-score-max",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-05-20",
          dateModified: "2026-05-20",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the highest possible GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The best-sourced ceiling is 144 for the Army's AFCT, confirmed by Army Personnel Testing officials. Figures of 145 to 147 for the Army and 151 for the Marine Corps circulate online but lack an authoritative source. Because GT is a standard score and not a percentile, it can exceed 100 and is not capped at 99 like the AFQT.",
              },
            },
            {
              "@type": "Question",
              name: "Why can a GT score be over 100 if the max ASVAB score is 99?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The 99 ceiling is the AFQT, which is a percentile ranked against a 1997 sample. The GT is a standard score, a different scale built by adding your VE and AR standard scores. Standard scores are not percentiles, so they are not capped at 99 or 100. An average GT is 100, and the scale climbs well past it.",
              },
            },
            {
              "@type": "Question",
              name: "What is the max GT score for the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The commonly cited Marine Corps GT max is 151, but that number is unverified and we could not trace it to a Department of Defense source. The Marine composite is sometimes calculated with an added math subtest beyond VE + AR, which could let a Marine GT read higher than an Army GT. Treat 151 as widely repeated, not confirmed.",
              },
            },
            {
              "@type": "Question",
              name: "Is a higher GT score always better?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not really. GT 110 already unlocks officer programs, warrant officer tracks, and most elite technical jobs. Very few positions ask for more than 110, so the absolute GT score max is a curiosity rather than a goal. Aim for the threshold your target job requires, then stop.",
              },
            },
            {
              "@type": "Question",
              name: "Has anyone ever gotten a perfect GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Sergeant 1st Class Ashley Hackley scored a perfect 144 on the AFCT in March 2023, and Army University officials said she was the first soldier they knew of to do it. Her instructor's previous best witnessed was 137, which shows how rare scores above the high 130s are.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force have a GT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The Air Force and Space Force use a \"General\" (G) composite reported on a percentile-style scale, not the Army's GT standard score. The two are not directly comparable, so an Air Force G score and an Army GT cannot be matched number for number. To see what your scores qualify you for across branches, run them through the ASVAB score calculator.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          GT Score Max: How High Can Your ASVAB GT Score Actually Go?
        </h1>

        <p className="mt-4 text-text-secondary">
          Almost every page that talks about the <strong>GT score max</strong>{" "}
          hands you a confident number, and most of those numbers have nothing
          behind them. You will see 145, 147, even 151 stated like settled fact.
          The only ceiling backed by an authoritative source is 144, the number
          Army Personnel Testing officials gave for the Army&apos;s version of
          the test.
        </p>

        <p className="text-text-secondary">
          The bigger confusion is the scale itself. People assume the GT tops
          out at 99 because that is the highest ASVAB score they have heard of.
          That number is the AFQT, a different score on a different scale. Your
          GT can sit well above 100.
        </p>

        <p className="text-text-secondary">
          This page breaks down the real GT score max, why GT can exceed 100,
          how the standard-score math works, what an elite GT unlocks, and how
          the figures differ by branch. Want to see where your number lands
          first? Run it through the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What the GT Score Max Really Is
        </h2>

        <p className="mt-4 text-text-secondary">
          On March 22, 2023, Sergeant 1st Class Ashley Hackley scored a perfect
          GT on the Armed Forces Classification Test (AFCT), the active-duty
          version of the ASVAB. When Fort Knox Education Center trainers asked
          Army Personnel Testing whether anyone could beat a 144, the answer was
          direct.
        </p>

        <p className="text-text-secondary">
          &ldquo;Nothing. 144 is the highest possible score.&rdquo;
        </p>

        <p className="text-text-secondary">
          Army University officials added that Hackley was the first soldier they
          knew of to earn a perfect score on the test. That makes 144 the only
          GT ceiling number tied to an actual authority rather than a blog
          repeating another blog.
        </p>

        <p className="text-text-secondary">
          The AFCT produces the same GT line score as the enlistment ASVAB, so
          this ceiling applies to the Army GT whether you tested at MEPS or
          retested in uniform.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            Unverified figures
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            You will see the Army GT max listed as 145 to 147 and the Marine
            Corps max as 151. We could not trace either number to a Department of
            Defense or MEPCOM source. We are not presenting them as fact. The
            Marine Corps composite is sometimes described with an extra math
            subtest, which would let a Marine GT read higher than an Army GT, but
            the exact ceiling is not authoritatively documented.
          </p>
        </aside>

        <p className="text-text-secondary">
          So the honest answer is this: 144 for the Army, with strong sourcing.
          Anything higher floating around online is unverified. If you want the
          full background on how the score is built, start with our{" "}
          <Link
            href="/gt-score"
            className="text-accent hover:text-accent-hover"
          >
            GT score
          </Link>{" "}
          overview.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Why Your GT Can Be Over 100 When the Highest ASVAB Score Is 99
        </h2>

        <p className="mt-4 text-text-secondary">
          If 99 is the highest ASVAB score, how does anyone post a GT of 130?
          Because those are two different scales measuring two different things.
        </p>

        <p className="text-text-secondary">
          The number capped at 99 is the AFQT (Armed Forces Qualification Test).
          The AFQT is a percentile, ranked from 1 to 99 against a 1997 national
          sample of 18-to-23-year-olds. A 99 means you outperformed 99% of that
          group. A percentile cannot go above 99 by definition.
        </p>

        <p className="text-text-secondary">
          The GT is not a percentile. It is a standard score, and standard
          scores are not capped at 99.
        </p>

        <p className="text-text-secondary">
          Here is how the standard-score scale works. Per the official ASVAB
          program, every subtest standard score is set to a mean of 50 and a
          standard deviation of 10. A standard score of 40 sits one standard
          deviation below the mean. A 70 sits two standard deviations above it.
        </p>

        <p className="text-text-secondary">
          The GT is built from two of those subtest-scale standard scores.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE is Verbal Expression, a single standard score the test derives from
          your Word Knowledge and Paragraph Comprehension performance. AR is
          Arithmetic Reasoning. Because the GT adds two standard scores that each
          center near 50, the GT composite centers near 100 with a standard
          deviation of roughly 20.
        </p>

        <p className="text-text-secondary">
          That is why 100 is an average GT, not a maximum. The scale keeps
          climbing past it, which is exactly how a 130 or a 144 is possible. For
          the parallel story on the AFQT side, see what a{" "}
          <Link
            href="/highest-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            99 AFQT actually means
          </Link>{" "}
          and how the{" "}
          <Link
            href="/afqt-score"
            className="text-accent hover:text-accent-hover"
          >
            AFQT score
          </Link>{" "}
          is calculated.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT Score Distribution: What 110, 130, and 140 Actually Mean
        </h2>

        <p className="mt-4 text-text-secondary">
          A 144 sounds impressive until you know how rare it is. With a mean
          near 100 and a standard deviation around 20, you can place any GT
          against the rest of the field.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Band
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Approx. Percentile
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Signals
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Below 80
                </td>
                <td className="py-2 pr-4 font-mono">Bottom 16%</td>
                <td className="py-2">Limited job options</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  80 to 99
                </td>
                <td className="py-2 pr-4 font-mono">16th to 50th</td>
                <td className="py-2">Below average to average</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  100 to 109
                </td>
                <td className="py-2 pr-4 font-mono">50th to 65th</td>
                <td className="py-2">Average to above average</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  110 to 119
                </td>
                <td className="py-2 pr-4 font-mono">65th to 84th</td>
                <td className="py-2">Officer and special-program eligible</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  120 to 129
                </td>
                <td className="py-2 pr-4 font-mono">84th to 93rd</td>
                <td className="py-2">Outstanding</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  130 to 139
                </td>
                <td className="py-2 pr-4 font-mono">93rd to 98th</td>
                <td className="py-2">Elite, roughly top 7%</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  140 to 144
                </td>
                <td className="py-2 pr-4 font-mono">98th and up</td>
                <td className="py-2">Near the ceiling, almost no one</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            These percentiles are approximate, derived from the standard-score
            model (mean 100, standard deviation about 20). They are not official
            cut scores. Treat them as a map, not a measurement.
          </p>
        </aside>

        <p className="text-text-secondary">
          The real-world data backs up how thin the air gets near the top.
          Soldiers in the Army&apos;s Basic Skills Education Program improve
          about 23 points on average, moving from an entry average of 98 to
          roughly 123. Even inside a dedicated improvement program, the highest
          score one Fort Knox instructor had personally witnessed was 137, until
          Hackley posted a perfect 144.
        </p>

        <p className="text-text-secondary">
          Want to know which band you are in right now? A{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free ASVAB practice test
          </Link>{" "}
          gives you a baseline before you start chasing points.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What an Elite GT Score Unlocks
        </h2>

        <p className="mt-4 text-text-secondary">
          Past a certain point, a higher GT stops being about bragging rights
          and starts being about access. The hinge is 110.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            GT 110 is the single most important number in most military careers.
            Below it, your options narrow. At or above it, the competitive doors
            open.
          </p>
        </aside>

        <p className="text-text-secondary">
          A high GT mainly buys you eligibility for three things:
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Officer programs.</strong> Officer Candidate School and the
            Army&apos;s Green to Gold program both require a GT of 110, and the
            Green to Gold minimum is non-waiverable. No exceptions, no waiver
            packet.
          </li>
          <li>
            <strong>Warrant officer tracks.</strong> Warrant officer packets
            gate on GT thresholds, and a low GT can keep you out of
            consideration entirely. The full breakdown lives in our{" "}
            <Link
              href="/army-warrant-officer-requirements"
              className="text-accent hover:text-accent-hover"
            >
              Army warrant officer requirements
            </Link>{" "}
            guide.
          </li>
          <li>
            <strong>Special and technical programs.</strong> Intelligence,
            cyber, linguist, and special-operations-adjacent roles cluster
            around 105 to 110 and up.
          </li>
        </ul>

        <p className="text-text-secondary">
          SFC Hackley is the cautionary tale. Her entry GT of 87 got her
          overlooked for 30 to 40 nominative positions and blocked her from
          warrant officer and commissioning tracks. Raising her GT was the only
          way to be considered.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Most jobs cap their GT requirement around 110. Chasing the absolute
            GT score max past your target has diminishing returns. The number
            above your goal is a curiosity, not a requirement.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you are already in uniform, a new GT can also requalify you for a
          different job through{" "}
          <Link
            href="/mos-reclassification"
            className="text-accent hover:text-accent-hover"
          >
            MOS reclassification
          </Link>
          . To see which jobs a given GT opens across all six branches, run your
          numbers through the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Push Toward Your Maximum GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          The fastest path to a higher GT is also the narrowest. Only three
          subtests feed it, so most of the ASVAB is irrelevant to your GT.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Word Knowledge (WK)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Half of your Verbal Expression score. Build vocabulary through
              roots, prefixes, and suffixes.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Paragraph Comprehension (PC)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The other half of VE. Drill reading for main idea and inference.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Arithmetic Reasoning (AR)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The second half of the GT sum. Master word-problem translation and
              mental math.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Word Knowledge and Paragraph Comprehension combine into VE, so verbal
          prep does double duty inside the GT. The other seven subtests,
          including General Science, Mechanical Comprehension, and Auto and Shop,
          do nothing for your GT.
        </p>

        <p className="text-text-secondary">
          Timed, full-length practice is what converts knowledge into
          standard-score points under real conditions. If you are active-duty,
          the Army&apos;s{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP program
          </Link>{" "}
          is the free, structured route, and the{" "}
          <Link href="/afct" className="text-accent hover:text-accent-hover">
            AFCT
          </Link>{" "}
          is how you retest after prep.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Set a realistic target. Structured prep typically moves a GT 10 to
            20 points. A perfect 144 is a once-in-a-program event, not a study
            goal. Model your own number with the{" "}
            <Link
              href="/calculate-gt-score"
              className="text-accent hover:text-accent-hover"
            >
              GT score calculator
            </Link>{" "}
            and aim for the threshold your job actually needs.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Max by Branch
        </h2>

        <p className="mt-4 text-text-secondary">
          The conflicting &ldquo;max&rdquo; numbers online mostly come from
          branches scoring the GT differently. Here is how the GT score max
          breaks down by service.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula / Scale
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Ceiling Note
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">VE + AR, standard score</td>
                <td className="py-2">144 (AFCT), sourced</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">VE + AR, standard score</td>
                <td className="py-2">Same scale as Army</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marine Corps
                </td>
                <td className="py-2 pr-4">
                  VE + AR, sometimes with added math
                </td>
                <td className="py-2">151 commonly cited, unverified</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4">
                  &ldquo;General&rdquo; (G), percentile-style scale
                </td>
                <td className="py-2">Not comparable to Army GT</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4">
                  &ldquo;General&rdquo; (G), percentile-style scale
                </td>
                <td className="py-2">Same as Air Force</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">VE + AR inside rating composites</td>
                <td className="py-2">No single GT line score</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do not compare an Air Force &ldquo;G&rdquo; score to an Army GT. The
            Air Force and Space Force report a General score on a percentile-style
            scale, while the Army GT is a standard score. A &ldquo;60&rdquo; in
            one system is not a &ldquo;60&rdquo; in the other.
          </p>
        </aside>

        <p className="text-text-secondary">
          The Marine Corps composite is sometimes described as VE + AR + MK, with
          the extra math subtest pushing the possible top higher. That is the
          most likely reason the 151 figure exists, but we still cannot source it
          to an official document. For the full cross-branch picture, see our{" "}
          <Link
            href="/gt-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            GT score requirements
          </Link>{" "}
          page and the complete{" "}
          <Link
            href="/asvab-gt-score"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB GT score
          </Link>{" "}
          guide.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT Score Max FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the highest possible GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The best-sourced ceiling is 144 for the Army&apos;s AFCT, confirmed
              by Army Personnel Testing officials. Figures of 145 to 147 for the
              Army and 151 for the Marine Corps circulate online but lack an
              authoritative source. Because GT is a standard score and not a
              percentile, it can exceed 100 and is not capped at 99 like the
              AFQT.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Why can a GT score be over 100 if the max ASVAB score is 99?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The 99 ceiling is the AFQT, which is a percentile ranked against a
              1997 sample. The GT is a standard score, a different scale built by
              adding your VE and AR standard scores. Standard scores are not
              percentiles, so they are not capped at 99 or 100. An average GT is
              100, and the scale climbs well past it.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the max GT score for the Marines?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The commonly cited Marine Corps GT max is 151, but that number is
              unverified and we could not trace it to a Department of Defense
              source. The Marine composite is sometimes calculated with an added
              math subtest beyond VE + AR, which could let a Marine GT read
              higher than an Army GT. Treat 151 as widely repeated, not
              confirmed.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is a higher GT score always better?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Not really. GT 110 already unlocks officer programs, warrant
              officer tracks, and most elite technical jobs. Very few positions
              ask for more than 110, so the absolute GT score max is a curiosity
              rather than a goal. Aim for the threshold your target job requires,
              then stop.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Has anyone ever gotten a perfect GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Sergeant 1st Class Ashley Hackley scored a perfect 144 on the
              AFCT in March 2023, and Army University officials said she was the
              first soldier they knew of to do it. Her instructor&apos;s previous
              best witnessed was 137, which shows how rare scores above the high
              130s are.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Air Force have a GT score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The Air Force and Space Force use a &ldquo;General&rdquo; (G)
              composite reported on a percentile-style scale, not the Army&apos;s
              GT standard score. The two are not directly comparable, so an Air
              Force G score and an Army GT cannot be matched number for number. To
              see what your scores qualify you for across branches, run them
              through the{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB score calculator
              </Link>
              .
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
