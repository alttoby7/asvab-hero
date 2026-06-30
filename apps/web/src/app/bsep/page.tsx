import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "BSEP: Army's Free GT Score Improvement Program (2026 Guide)",
  description:
    "Learn how BSEP raises your GT score by 19-23 points on average. Eligibility tiers, enrollment steps, curriculum breakdown, and real outcome data from 6 installations.",
  alternates: {
    canonical: "https://asvabhero.com/bsep",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "BSEP: The Army&apos;s Free GT Score Improvement Program (Complete Guide)",
  description:
    "Learn how BSEP raises your GT score by 19-23 points on average. Eligibility tiers, enrollment steps, curriculum breakdown, and real outcome data from 6 installations.",
  url: "https://asvabhero.com/bsep",
  author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-05-12",
  dateModified: "2026-05-12",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is BSEP the same as FAST?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BSEP was formerly called FAST (Functional Academic Skills Training). They are the same program under a different name. BSEP is now one of four FAST-category programs under the Army Continuing Education System (ACES). Some installations and older resources still use FAST interchangeably. When someone says FAST class, they mean BSEP.",
      },
    },
    {
      "@type": "Question",
      name: "How long does BSEP take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies by installation. Most common formats: 10 full days (Fort Leonard Wood), 3 to 4 weeks of half-day sessions (Fort Liberty), or 20 days virtual. Total instruction averages approximately 60 hours (40 face-to-face plus 20 online). The AFCT is typically scheduled the day after the course ends.",
      },
    },
    {
      "@type": "Question",
      name: "Can I take BSEP online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Virtual BSEP is available at many installations using the Talent MLS platform. The 20-day format includes weekend access. Fort Polk&apos;s first virtual cohorts in 2020 showed a 92.3% GT improvement rate. Contact your Education Center to ask if virtual BSEP is available at your installation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the TABE test and do I need to take it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TABE (Test of Adult Basic Education) is a civilian academic placement test that BSEP uses to set your baseline and measure improvement. Most installations require it before enrollment, and AR 621-5 requires a post-TABE for course completion. TABE scores are valid for 6 months. The TABE does not update your military record.",
      },
    },
    {
      "@type": "Question",
      name: "Is it embarrassing to attend BSEP as a senior NCO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This concern comes up often on military forums. Staff Sgt. Samuel Lovato attended after 10 years of service and set the installation record with a 35-point gain. SFC Ashley Hackley attended after 14 years and scored a perfect 144. Career advancement outweighs classroom optics every time.",
      },
    },
    {
      "@type": "Question",
      name: "What if my GT score still doesn&apos;t reach my target after BSEP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can attend BSEP up to 3 times per career. After your first attempt, review your AFCT subtest breakdown to identify your weakest area, use Peterson&apos;s OASC for targeted remediation, and re-enroll. Each completion grants another immediate AFCT authorization. Use the calculator to project whether another round would close the gap.",
      },
    },
    {
      "@type": "Question",
      name: "Does BSEP waive the 6-month AFCT waiting period?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Completing BSEP is an approved exception to policy that bypasses the standard 6-month wait between AFCT retests. Graduates can schedule the AFCT immediately upon program completion. This is the single biggest tactical advantage BSEP has over self-study.",
      },
    },
    {
      "@type": "Question",
      name: "Can National Guard, Reserve, or other-service members attend BSEP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Army Guard and Reserve soldiers are eligible. Some ARNG state programs offer their own BSEP. Operation Connect the Dots (2023, Puerto Rico) ran BSEP specifically for 45 Reserve soldiers, with 82% achieving GT 110+. Marines, Sailors, and Airmen can attend on a space-available basis when Army slots are unfilled.",
      },
    },
  ],
};

export default function BSEPPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        {/* ───────── H1 ───────── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          BSEP: The Army&apos;s Free GT Score Improvement Program (Complete
          Guide)
        </h1>

        <p className="mt-4 text-text-secondary">
          SFC Ashley Hackley served 14 years with a GT of 87 and was overlooked
          for 30 to 40 nominative positions before a counselor mentioned a
          program she didn&apos;t know existed. The cost of not knowing was more
          than a decade of blocked career advancement.
        </p>

        <p className="text-text-secondary">
          <strong>BSEP</strong> (Basic Skills Education Program) is the
          Army&apos;s free, on-duty GT score improvement course. Average
          improvement across installations: 19 to 23 points. Over 90% of
          participants raise their GT. And unlike self-study, completing BSEP
          waives the 6-month <Link href="/afct">AFCT</Link> retest wait
          entirely.
        </p>

        <p className="text-text-secondary">
          This guide covers who qualifies, how to enroll, what the course looks
          like day by day, and what realistic outcomes look like, with data from
          Fort Knox, Fort Leonard Wood, Rhine Ordnance Barracks, and Fort
          Buchanan. If you need context on what{" "}
          <Link href="/gt-score">GT actually measures</Link>, start there
          first. Already have your scores? Plug them into the{" "}
          <Link href="/calculator">All-Branch ASVAB Calculator</Link> to see where
          you stand before starting the process.
        </p>

        {/* Key-point callout */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            19&ndash;23 pt average gain. 90%+ of participants improve. 6-month
            AFCT wait waived. $0 cost. On-duty hours.
          </p>
        </aside>

        {/* ───────── S2: Eligibility ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Who Qualifies for BSEP: Eligibility Tiers Explained
        </h2>

        <p className="mt-4 text-text-secondary">
          Most soldiers assume BSEP is only for low scorers. It&apos;s not. AR
          621-5 defines three eligibility tiers, and the middle tier catches more
          people than you&apos;d expect.
        </p>

        <p className="text-text-secondary">
          <strong>GT 99 and below:</strong> automatically eligible. Walk into
          your installation&apos;s Education Center and start the process. No
          commander referral needed to begin the inquiry.
        </p>

        <p className="text-text-secondary">
          <strong>GT 100 to 109:</strong> eligible via command referral. Your
          commander can nominate you, or you can self-refer and request commander
          approval. This is the tier most soldiers don&apos;t realize they
          qualify for.
        </p>

        <p className="text-text-secondary">
          <strong>GT 110 and above:</strong> case-by-case exceptions for soldiers
          needing a higher score for a specific MOS. If you have GT 110 but need
          ST 112 for 17C Cyber Operations, BSEP builds the underlying skills
          that move both scores.
        </p>

        {/* TABLE: Eligibility Tiers */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Your GT Score
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Eligibility Status
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What to Do
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  99 or below
                </td>
                <td className="py-2 pr-4">Automatically eligible</td>
                <td className="py-2">Contact Education Center directly</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  100 to 109
                </td>
                <td className="py-2 pr-4">
                  Command-referred or self-referred
                </td>
                <td className="py-2">
                  Talk to your commander or self-refer at Education Center
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  110+
                </td>
                <td className="py-2 pr-4">Case-by-case exception</td>
                <td className="py-2">
                  Request through commander if a specific{" "}
                  <Link href="/army-mos-list">MOS</Link> requires higher GT
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Component access.</strong> Active duty Army soldiers have full
          access at all installations. Army National Guard soldiers can access
          BSEP through some state programs or at active-duty installations. Army
          Reserve soldiers are eligible. Operation Connect the Dots at Fort
          Buchanan in 2023 ran BSEP specifically for 45 Reserve soldiers, and
          82% hit GT 110+. Marines, Sailors, and Airmen can attend on a
          space-available basis when Army slots are unfilled.
        </p>

        {/* Info callout */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            You do not need your commander to start the process. Any soldier can
            walk into the Education Center and ask about BSEP. Commander
            signature is required on the DA 4187, but you initiate the
            conversation.
          </p>
        </aside>

        <p className="text-text-secondary">
          Self-referral is permitted under AR 621-5. A motivated soldier can
          approach the Education Center, learn the process, and then bring the
          paperwork to their commander for signature.
        </p>

        {/* ───────── S3: GT Score Formula ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT Score Formula and Why BSEP Targets Exactly the Right Subtests
        </h2>

        <p className="mt-4 text-text-secondary">
          Three subtests control your GT score. Not nine. Not five. Three.
          BSEP&apos;s entire curriculum is built around those three.
        </p>

        {/* FORMULA */}
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          VE = WK + PC (converted to standard score, range 20&ndash;62)
          <br />
          GT = VE + AR
          <br />
          AFQT = 2(VE) + AR + MK
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) combines your Word Knowledge and Paragraph
          Comprehension scores. GT equals VE plus Arithmetic Reasoning. WK, PC,
          and AR are the only subtests that move your GT, and BSEP targets all
          three with dedicated curriculum modules.
        </p>

        <p className="text-text-secondary">
          VE is also doubled inside the AFQT formula, so every point you gain on
          WK or PC counts twice toward your AFQT while simultaneously raising
          your GT.
        </p>

        {/* TABLE: GT Subtest Breakdown */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  What It Tests
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Impact on GT
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  BSEP Coverage
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <Link href="/asvab-word-knowledge-tips">
                    Word Knowledge
                  </Link>{" "}
                  (WK)
                </td>
                <td className="py-2 pr-4">Vocabulary, word meaning</td>
                <td className="py-2 pr-4">
                  Part of VE (doubled in AFQT)
                </td>
                <td className="py-2">Full curriculum module</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <Link href="/asvab-paragraph-comprehension-tips">
                    Paragraph Comprehension
                  </Link>{" "}
                  (PC)
                </td>
                <td className="py-2 pr-4">Reading comprehension</td>
                <td className="py-2 pr-4">
                  Part of VE (doubled in AFQT)
                </td>
                <td className="py-2">Full curriculum module</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  <Link href="/asvab-arithmetic-reasoning-tips">
                    Arithmetic Reasoning
                  </Link>{" "}
                  (AR)
                </td>
                <td className="py-2 pr-4">Word problems, math reasoning</td>
                <td className="py-2 pr-4">Direct GT component</td>
                <td className="py-2">Full curriculum module</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Mathematics Knowledge (MK)
                </td>
                <td className="py-2 pr-4">Algebra, geometry</td>
                <td className="py-2 pr-4">AFQT only, not GT</td>
                <td className="py-2">Not primary BSEP focus</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          If you&apos;re 5 points from GT 110, prioritize WK and PC because VE
          improvements translate directly to GT. If you&apos;re 15 or more
          points below target, the AR component has the widest improvement
          range. Fort Knox instructor Lola Best puts it simply: &ldquo;Math
          skill-building drives the curriculum&apos;s effectiveness.&rdquo; Plug
          your current scores into the{" "}
          <Link href="/gt-score">GT score calculator</Link> to see
          which subtest gains would push you past your target.
        </p>

        {/* ───────── S4: Enrollment ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Enroll in BSEP: Step by Step
        </h2>

        <p className="mt-4 text-text-secondary">
          No competitor walks through the actual enrollment process. Here it is,
          condensed from installation guides and AR 621-5 into a clean sequence
          you can start today.
        </p>

        <ol className="my-4 list-decimal space-y-3 pl-6 text-text-secondary">
          <li>
            <strong>Confirm eligibility.</strong> GT 109 or below makes you
            automatically eligible. GT 100 to 109 requires a commander referral
            or self-referral. Check your most recent{" "}
            <Link href="/asvab-scores-explained">ASVAB scores</Link> if
            you&apos;re unsure of your current GT.
          </li>
          <li>
            <strong>Visit your installation&apos;s Education Center.</strong>{" "}
            This is the Army Education Center, not your career counselor&apos;s
            office. Ask specifically for BSEP enrollment forms.
          </li>
          <li>
            <strong>Take the TABE.</strong> The Test of Adult Basic Education is
            administered at the Army Personnel Testing (APT) office. TABE scores
            are valid for 6 months. Some installations (Fort Liberty) administer
            TABE during the course itself. Confirm your local policy.
          </li>
          <li>
            <strong>Select your class session.</strong> Morning, afternoon, or
            evening where available. Classes start the first workday of each
            month at most installations.
          </li>
          <li>
            <strong>Complete DA Form 4187.</strong> Have your commander (O-3 or
            above at some installations) sign it. Both soldier and commander must
            sign and date.
          </li>
          <li>
            <strong>Submit paperwork.</strong> Bring the signed DA 4187 and
            enrollment forms to the Education Center during designated hours.
            Fort Liberty example: forms must be submitted in person during
            0800&ndash;0900 or 1300&ndash;1400, Monday through Friday.
          </li>
          <li>
            <strong>Confirm in GoArmyEd.</strong> Log into goarmyed.com, find
            your record, select &ldquo;On-Duty Enrollment Request,&rdquo; enter
            the Class ID from the Education Center, change status to
            &ldquo;Confirmed,&rdquo; and click Submit.
          </li>
          <li>
            <strong>Show up on day one.</strong> No late arrivals accepted.
          </li>
        </ol>

        {/* Warning callout */}
        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Start 60 days early. Class sizes are 10 to 15 soldiers per month. If
            you need BSEP before a board date or packet deadline, begin the
            process at least 2 months out.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>Virtual enrollment variant.</strong> Email your Education
          Center requesting virtual BSEP. You&apos;ll receive an enrollment
          packet and virtual Class ID. The DA 4187 and GoArmyEd process is the
          same. Once confirmed, you access the 20-day Talent MLS curriculum
          online with weekend access included. For{" "}
          <Link href="/how-to-retake-the-asvab">AFCT retake planning</Link>,
          factor in the virtual program&apos;s 20-day timeline.
        </p>

        {/* STATS-ROW: Enrollment steps */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 1</p>
            <p className="mt-1 text-sm text-text-secondary">
              Confirm eligibility (GT 109 or below)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 2</p>
            <p className="mt-1 text-sm text-text-secondary">
              Visit Education Center
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 3</p>
            <p className="mt-1 text-sm text-text-secondary">Take the TABE</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 4</p>
            <p className="mt-1 text-sm text-text-secondary">
              Select class session
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 5</p>
            <p className="mt-1 text-sm text-text-secondary">
              Commander signs DA 4187
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 6</p>
            <p className="mt-1 text-sm text-text-secondary">
              Submit paperwork
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 7</p>
            <p className="mt-1 text-sm text-text-secondary">
              Confirm in GoArmyEd
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 8</p>
            <p className="mt-1 text-sm text-text-secondary">
              Show up day one (no late arrivals)
            </p>
          </div>
        </div>

        {/* ───────── S5: Curriculum ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Happens Inside BSEP: Curriculum, TABE Testing, and Daily Schedule
        </h2>

        <p className="mt-4 text-text-secondary">
          Knowing you need to enroll is one thing. Knowing what to expect on day
          one is another.
        </p>

        <p className="text-text-secondary">
          <strong>The TABE: your bookend assessment.</strong> The pre-TABE
          establishes your baseline and determines instruction pace. The
          post-TABE is required by AR 621-5 for course completion. If your
          post-TABE exceeds grade level 10.2, you&apos;re referred directly to
          APT for AFCT scheduling. TABE scores are valid for 6 months.
        </p>

        {/* Tip callout */}
        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            TABE is not the AFCT. It&apos;s a civilian academic placement test
            used to set your baseline. Scoring well on the TABE does not update
            your military record. Only the AFCT does that.
          </p>
        </aside>

        <p className="text-text-secondary">
          <strong>Program format varies by installation.</strong> No single
          answer is correct. The standard format is 40 hours face-to-face plus
          20 hours online, totaling 60 hours. Actual delivery differs.
        </p>

        {/* TABLE: Format Variations by Installation */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Installation
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Format
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Duration
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Daily Schedule
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Leonard Wood
                </td>
                <td className="py-2 pr-4">Full-day intensive</td>
                <td className="py-2 pr-4 font-mono">
                  10 days + test day 11
                </td>
                <td className="py-2">0800&ndash;1700, M&ndash;F</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Liberty
                </td>
                <td className="py-2 pr-4">Half-day sessions</td>
                <td className="py-2 pr-4 font-mono">3&ndash;4 weeks</td>
                <td className="py-2">
                  AM 0900&ndash;1300 or PM 1300&ndash;1700
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Rhine Ordnance Barracks (Germany)
                </td>
                <td className="py-2 pr-4">Half-day sessions</td>
                <td className="py-2 pr-4 font-mono">2&ndash;3 weeks</td>
                <td className="py-2">Varies by class</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Virtual (Talent MLS)
                </td>
                <td className="py-2 pr-4">Online</td>
                <td className="py-2 pr-4 font-mono">20 days</td>
                <td className="py-2">Self-paced with weekend access</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>What you actually study.</strong> The curriculum runs on
          Peterson&apos;s Online Academic Skills Course (OASC) and covers Word
          Knowledge (vocabulary, root words, prefixes, context clues), Paragraph
          Comprehension (main idea, inference, detail extraction, timed
          reading), and Arithmetic Reasoning (fractions, decimals, percentages,
          ratios, equations, word problem setup).
        </p>

        <p className="text-text-secondary">
          <strong>Instructor expectations are high.</strong> Terry Taylor at
          Rhine Ordnance Barracks: &ldquo;Service members should expect to have
          homework every night.&rdquo; Timed practice is a major component
          because speed matters as much as accuracy on the AFCT. Classes run 10
          to 15 soldiers, and Emerald Schumacher notes that &ldquo;we all teach
          from the same curriculum, but we all bring our own teaching
          perspective.&rdquo; Build a{" "}
          <Link href="/asvab-study-guide">study guide</Link> to supplement what
          you learn in class. Free{" "}
          <Link href="/practice-test">practice tests</Link> help you drill
          outside of BSEP hours.
        </p>

        {/* STATS-ROW: Daily experience */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              3&ndash;8 hours
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Instruction per day (varies by format)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Homework</p>
            <p className="mt-1 text-sm text-text-secondary">
              Every night, no exceptions
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              10&ndash;15 soldiers
            </p>
            <p className="mt-1 text-sm text-text-secondary">Per class</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Timed drills
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              On WK, PC, and AR daily
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Post-TABE
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Final day, then AFCT scheduling
            </p>
          </div>
        </div>

        {/* ───────── S6: Classroom vs Virtual ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Classroom vs Virtual BSEP: Which Format Works Better
        </h2>

        <p className="mt-4 text-text-secondary">
          Fort Polk&apos;s first virtual BSEP cohorts in 2020 posted a 92.3% GT
          improvement rate. That&apos;s higher than some classroom programs. The
          data suggests the format you choose matters less than how you use it.
        </p>

        <p className="text-text-secondary">
          <strong>Virtual BSEP data.</strong> The 20-day Talent MLS format
          produced individual gains of 3 to 22 points across early cohorts.
          Students get 2 to 3 completion attempts per assignment, lowering the
          stakes on each individual task. Weekend access means more total
          exposure time than a Monday-through-Friday classroom. Instructor
          Beatrice Johnson observed that &ldquo;the virtual format paradoxically
          provides more total exposure time than the traditional classroom
          model.&rdquo;
        </p>

        <p className="text-text-secondary">
          <strong>Classroom BSEP data.</strong> Rhine Ordnance Barracks in 2022
          reported a 90.5% improvement rate across 127 soldiers, with an overall
          average GT of 128. Fort Knox averaged a 23-point gain (98 to 121).
          Fort Leonard Wood averaged 19 points. Fort Hood in FY2014 put 450+
          students through the program, with 83% scoring 100+ and 51% hitting
          110+. Classroom brings higher accountability through daily instructor
          contact and peer motivation.
        </p>

        {/* TABLE: Format Comparison */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Factor
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Classroom BSEP
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Virtual BSEP
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Improvement rate
                </td>
                <td className="py-2 pr-4">90.5% (Rhine Ordnance 2022)</td>
                <td className="py-2">92.3% (Fort Polk 2020)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Average GT gain
                </td>
                <td className="py-2 pr-4 font-mono">19&ndash;23 points</td>
                <td className="py-2 font-mono">
                  3&ndash;22 points (early cohorts)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Duration
                </td>
                <td className="py-2 pr-4">10 days to 3 weeks</td>
                <td className="py-2">20 days</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Accountability
                </td>
                <td className="py-2 pr-4">
                  High (daily instructor, peers)
                </td>
                <td className="py-2">
                  Moderate (self-paced with tutoring)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Weekend access
                </td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  6-month waiver
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Best for
                </td>
                <td className="py-2 pr-4">
                  Structure seekers, on-post soldiers
                </td>
                <td className="py-2">
                  Deployed, remote, schedule-constrained
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info callout */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Both formats produce the same credential: BSEP completion, which
            waives the 6-month AFCT retest wait. The format affects your
            learning experience, not your eligibility to test immediately.
          </p>
        </aside>

        {/* ───────── S7: Outcomes ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Realistic Outcomes: What the Data Actually Shows
        </h2>

        <p className="mt-4 text-text-secondary">
          Anecdotes are useful. Data across five installations on three
          continents is better.
        </p>

        {/* TABLE: Installation Outcomes */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Installation
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Year
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Soldiers
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Improved
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Hit GT 110+
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Avg Gain
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Knox
                </td>
                <td className="py-2 pr-4 font-mono">2023</td>
                <td className="py-2 pr-4">Class-level</td>
                <td className="py-2 pr-4">--</td>
                <td className="py-2 pr-4">--</td>
                <td className="py-2 font-mono">23 pts (98 to 121)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Leonard Wood
                </td>
                <td className="py-2 pr-4 font-mono">2023</td>
                <td className="py-2 pr-4">Class-level</td>
                <td className="py-2 pr-4">--</td>
                <td className="py-2 pr-4">--</td>
                <td className="py-2 font-mono">19 pts</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Rhine Ordnance (Germany)
                </td>
                <td className="py-2 pr-4 font-mono">2022</td>
                <td className="py-2 pr-4 font-mono">127</td>
                <td className="py-2 pr-4">115 (90.5%)</td>
                <td className="py-2 pr-4">77 (60.6%)</td>
                <td className="py-2 font-mono">Avg GT 128</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Hood
                </td>
                <td className="py-2 pr-4 font-mono">FY2014</td>
                <td className="py-2 pr-4 font-mono">450+</td>
                <td className="py-2 pr-4">83% scored 100+</td>
                <td className="py-2 pr-4">51% hit 110+</td>
                <td className="py-2">--</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Polk (Virtual)
                </td>
                <td className="py-2 pr-4 font-mono">2020</td>
                <td className="py-2 pr-4">Cohort-level</td>
                <td className="py-2 pr-4">92.3%</td>
                <td className="py-2 pr-4">--</td>
                <td className="py-2 font-mono">3&ndash;22 pts</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Fort Buchanan (Reserve)
                </td>
                <td className="py-2 pr-4 font-mono">2023</td>
                <td className="py-2 pr-4 font-mono">45</td>
                <td className="py-2 pr-4">--</td>
                <td className="py-2 pr-4">37 (82%)</td>
                <td className="py-2">--</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Named case studies.</strong> These are real soldiers with
          published outcomes.
        </p>

        <p className="text-text-secondary">
          SFC Ashley Hackley entered at GT 87 and scored 144, a 57-point gain
          and the first known perfect AFCT score in Army history. She cleared
          over 30 blocked positions in one test.
        </p>

        <p className="text-text-secondary">
          Staff Sgt. Samuel Lovato gained 35 points after 10 years of service,
          setting the installation record at Fort Leonard Wood.
        </p>

        <p className="text-text-secondary">
          Spc. Neil Moncrieffe went from 89 to 119, a 30-point gain that made
          him OCS eligible. &ldquo;The feeling was like a dream come
          true.&rdquo;
        </p>

        <p className="text-text-secondary">
          Sgt. Danielle Vaughn jumped from 86 to 121 (+35), opening MOS
          reclassification pathways. Her advice: &ldquo;Don&apos;t take as long
          as I did.&rdquo;
        </p>

        {/* STATS-ROW: Case studies */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Hackley</p>
            <p className="mt-1 text-sm text-text-secondary">
              87 to 144 (+57), perfect AFCT score
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Lovato</p>
            <p className="mt-1 text-sm text-text-secondary">
              +35 points, installation record
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Vaughn</p>
            <p className="mt-1 text-sm text-text-secondary">
              86 to 121 (+35)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Moncrieffe
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              89 to 119 (+30), OCS eligible
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Payne</p>
            <p className="mt-1 text-sm text-text-secondary">
              +20 points, warrant officer qualified
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Honest caveats.</strong> Results range from 3 to 57 points.
          Not everyone hits 110. Effort is non-negotiable. Sgt. Chris Payne
          attended his first BSEP in Korea and got nothing from it because he
          &ldquo;lacked maturity to benefit.&rdquo; He returned eight years
          later and gained 20 points. Education counselor Amelia McKen frames
          the target: &ldquo;A good score is 110 or above. This score gives them
          a good spectrum of jobs.&rdquo; Instructor Zanti Andriani sees the
          range firsthand: &ldquo;I have had several Soldiers come to BSEP with
          GT scores that are below 90 and leave with scores above 110.&rdquo;
        </p>

        {/* Key-point callout */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            BSEP is not magic. The program works when you do. Payne&apos;s first
            attempt yielded nothing. His second attempt, with full commitment,
            produced the score he needed for warrant officer.
          </p>
        </aside>

        {/* ───────── S8: Alternatives ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          BSEP vs Other GT Score Improvement Options
        </h2>

        <p className="mt-4 text-text-secondary">
          BSEP is not the only path to a higher GT. But it&apos;s the only free
          option that waives the 6-month AFCT wait.
        </p>

        {/* TABLE: Alternatives Comparison */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Option
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Format
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Waives 6-Month Wait
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Avg GT Gain
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Cost
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Access
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  BSEP Classroom
                </td>
                <td className="py-2 pr-4">
                  In-person, 2&ndash;3 weeks
                </td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4 font-mono">19&ndash;23 pts</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">
                  Army (others space-available)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  BSEP Virtual
                </td>
                <td className="py-2 pr-4">Online, 20 days</td>
                <td className="py-2 pr-4">Yes</td>
                <td className="py-2 pr-4 font-mono">
                  3&ndash;22 pts (early data)
                </td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">Army</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Peterson&apos;s OASC
                </td>
                <td className="py-2 pr-4">Online, self-paced</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">Variable</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">
                  All services + families
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  March2Success
                </td>
                <td className="py-2 pr-4">Online, adaptive</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">Variable</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">All services</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Self-study
                </td>
                <td className="py-2 pr-4">On your own</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">Variable</td>
                <td className="py-2 pr-4">Variable</td>
                <td className="py-2">Anyone</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Peterson&apos;s OASC</strong> (dantes.petersons.com) is the
          same curriculum platform BSEP uses, and it&apos;s free to all service
          members, families, and DoD civilians. It does not waive the 6-month
          wait. Use it as a supplement before or after BSEP, or as a fallback
          when you can&apos;t get a BSEP slot.
        </p>

        <p className="text-text-secondary">
          <strong>Self-study</strong> carries the highest risk. You get no
          accountability, no waiver, and you&apos;re burning one of three
          lifetime AFCT retests without structured preparation. The 3-retest cap
          makes unprepared testing expensive. Use the{" "}
          <Link href="/calculator">All-Branch ASVAB Calculator</Link> to check
          whether your projected gains are realistic before you test.
        </p>

        <p className="text-text-secondary">
          <strong>Re-enrollment and fallback planning.</strong> Soldiers can
          attend BSEP up to 3 times per career. If your first attempt
          didn&apos;t reach your target, review your{" "}
          <Link href="/afct">AFCT</Link> subtest breakdown to identify your
          weakest area, use OASC for targeted remediation, then re-enroll. Each
          BSEP completion grants another immediate AFCT authorization.
        </p>

        {/* Tip callout */}
        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your first BSEP didn&apos;t reach your target: (1) Get your AFCT
            subtest breakdown from the Education Center. (2) Use Peterson&apos;s
            OASC to target your weakest subtest. (3) Re-enroll in BSEP (up to 3
            times per career). (4) Each completion grants another immediate AFCT
            authorization.
          </p>
        </aside>

        <p className="text-text-secondary">
          Only BSEP and FAST-category programs waive the 6-month AFCT wait. If
          you need to test within 6 months, BSEP is the path.
        </p>

        {/* ───────── S9: Tips ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Get the Most Out of BSEP: Tips From Instructors and Graduates
        </h2>

        <p className="mt-4 text-text-secondary">
          The difference between a 3-point gain and a 30-point gain comes down
          to five things. Every instructor and high-performing graduate
          emphasizes the same patterns.
        </p>

        <p className="text-text-secondary">
          <strong>1. Start before BSEP starts.</strong> Use Peterson&apos;s OASC
          (dantes.petersons.com, free) to identify your weakest areas in WK, PC,
          and AR before your first day of class. Arrive knowing where to focus.
          Soldiers who walk in cold spend the first few days finding their
          baseline instead of building on it.
        </p>

        <p className="text-text-secondary">
          <strong>2. Prioritize vocabulary for maximum GT leverage.</strong>{" "}
          Because VE is doubled in the AFQT formula and VE drives GT, each
          vocabulary word you learn has outsized impact. Flash cards, root-word
          patterns, and daily reading should be habits before and during the
          program. See our{" "}
          <Link href="/asvab-word-knowledge-tips">Word Knowledge tips</Link>{" "}
          for specific techniques.
        </p>

        <p className="text-text-secondary">
          <strong>3. Do all the homework, every night.</strong> Terry Taylor:
          &ldquo;Service members should expect to have homework every
          night.&rdquo; Instructors consistently name this as the single biggest
          predictor of outcome. It&apos;s not optional.
        </p>

        <p className="text-text-secondary">
          <strong>4. Practice under timed conditions.</strong> Speed matters as
          much as accuracy on the AFCT. BSEP includes timed drills for this
          reason. When studying outside class, always set a timer. Try a{" "}
          <Link href="/practice-test">practice test</Link> to calibrate your
          pace.
        </p>

        <p className="text-text-secondary">
          <strong>5. Test immediately after graduation.</strong> BSEP completion
          grants an immediate AFCT authorization. Do not delay. Schedule your
          AFCT for the next available slot after your post-TABE. Material is
          freshest the day you finish.
        </p>

        {/* Info callout */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Spc. Moncrieffe went from GT 89 to 119 by following these
            principles. His advice: &ldquo;Asking questions is a must while
            you&apos;re seated in the BSEP course. There&apos;s no shame in
            doing that.&rdquo;
          </p>
        </aside>

        {/* STATS-ROW: Tips summary */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Pre-study
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Use OASC before day one
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Prioritize WK/PC
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Doubled in AFQT, direct GT impact
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Homework</p>
            <p className="mt-1 text-sm text-text-secondary">
              Complete all assignments every night
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Timed drills
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Always practice with a timer
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Test immediately
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Schedule AFCT the day you graduate
            </p>
          </div>
        </div>

        {/* ───────── FAQ Section ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is BSEP the same as FAST?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              BSEP was formerly called FAST (Functional Academic Skills
              Training). They are the same program under a different name. BSEP
              is now one of four FAST-category programs under the Army Continuing
              Education System (ACES). Some installations and older resources
              still use &ldquo;FAST&rdquo; interchangeably. When someone says
              &ldquo;FAST class,&rdquo; they mean BSEP.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does BSEP take?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It varies by installation. Most common formats: 10 full days (Fort
              Leonard Wood), 3 to 4 weeks of half-day sessions (Fort Liberty),
              or 20 days virtual. Total instruction averages approximately 60
              hours (40 face-to-face plus 20 online). The AFCT is typically
              scheduled the day after the course ends.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I take BSEP online?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Virtual BSEP is available at many installations using the
              Talent MLS platform. The 20-day format includes weekend access.
              Fort Polk&apos;s first virtual cohorts in 2020 showed a 92.3% GT
              improvement rate. Contact your Education Center to ask if virtual
              BSEP is available at your installation.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the TABE test and do I need to take it?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The TABE (Test of Adult Basic Education) is a civilian academic
              placement test that BSEP uses to set your baseline and measure
              improvement. Most installations require it before enrollment, and
              AR 621-5 requires a post-TABE for course completion. TABE scores
              are valid for 6 months. The TABE does not update your military
              record.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is it embarrassing to attend BSEP as a senior NCO?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              This concern comes up often on military forums. Staff Sgt. Samuel
              Lovato attended after 10 years of service and set the installation
              record with a 35-point gain. SFC Ashley Hackley attended after 14
              years and scored a perfect 144. Career advancement outweighs
              classroom optics every time.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if my GT score still doesn&apos;t reach my target after BSEP?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You can attend BSEP up to 3 times per career. After your first
              attempt, review your AFCT subtest breakdown to identify your
              weakest area, use Peterson&apos;s OASC for targeted remediation,
              and re-enroll. Each completion grants another immediate AFCT
              authorization. Use the{" "}
              <Link href="/calculator">calculator</Link> to project whether
              another round would close the gap.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does BSEP waive the 6-month AFCT waiting period?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. Completing BSEP is an approved exception to policy that
              bypasses the standard 6-month wait between AFCT retests. Graduates
              can schedule the AFCT immediately upon program completion. This is
              the single biggest tactical advantage BSEP has over self-study.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can National Guard, Reserve, or other-service members attend BSEP?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Army Guard and Reserve soldiers are eligible. Some ARNG state
              programs offer their own BSEP. Operation Connect the Dots (2023,
              Puerto Rico) ran BSEP specifically for 45 Reserve soldiers, with
              82% achieving GT 110+. Marines, Sailors, and Airmen can attend on
              a space-available basis when Army slots are unfilled.
            </p>
          </div>
        </div>

        {/* ───────── CTA Box ───────── */}
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
