import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "AFCT (Armed Forces Classification Test): Active-Duty Retake Guide",
  description:
    "Learn the AFCT score replacement rule, branch retake policies, BSEP prep programs, and GT-to-MOS thresholds. Free calculator and practice test included.",
  alternates: {
    canonical: "https://asvabhero.com/afct",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "The AFCT: How Active-Duty Service Members Retake the ASVAB Without Going Back to MEPS",
  description:
    "Learn the AFCT score replacement rule, branch retake policies, BSEP prep programs, and GT-to-MOS thresholds. Free calculator and practice test included.",
  url: "https://asvabhero.com/afct",
  author: {
    "@type": "Organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
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
      name: "What is the difference between the AFCT and the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AFCT is the active-duty in-service version of the ASVAB. Content, subtests, and scoring scales are identical. Differences are administrative: the AFCT is given at your installation Education Center (usually paper-and-pencil), governed by your branch's testing regulation (AR 611-5, MILPERSMAN 1236-010, MCO 1230.5C, or AFI 36-2605), and used to update your existing record rather than qualify you for initial enlistment. Most installations administer it in paper-and-pencil format rather than the CAT-ASVAB you took at MEPS, so pacing strategy is different.",
      },
    },
    {
      "@type": "Question",
      name: "Will my AFCT score replace my original ASVAB score even if it's lower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with no exceptions in any branch. Every branch's regulation states that the new score becomes your official score even if lower than your prior result. There is no superscore or best-of policy. This is why preparation, the GT Predictor exam, and a sober \"should I retake\" decision matter before scheduling.",
      },
    },
    {
      "@type": "Question",
      name: "How long do I have to wait between AFCT attempts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Army, Marines, Air Force, and Space Force apply a 6-month standard wait under AR 611-5, MCO 1230.5C, and AFI 36-2605 respectively. Navy and Coast Guard use an educational-improvement standard under MILPERSMAN 1236-010 rather than a fixed calendar. The wait can be waived for Army soldiers who complete BSEP and Marines who complete FAST, authorizing immediate retesting near graduation day. There is no published lifetime cap on the number of AFCT attempts in the Army.",
      },
    },
    {
      "@type": "Question",
      name: "What GT score do I need for warrant officer or OCS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GT 110. AR 135-100 establishes 110 as the minimum for any Army officer-producing program, including Warrant Officer and OCS. The same threshold applies to 17C Cyber Operations (with ST 112), 18X Special Forces (with ST 100), Drill Sergeant, and Recruiter. The 110 is non-waivable for 180A.",
      },
    },
    {
      "@type": "Question",
      name: "How do I request to take the AFCT in the Army?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Complete DA Form 4187 (Personnel Action), have it signed by your company commander, and submit it to the Test Control Officer at your Education Center at least 2 business days before your desired test date. BSEP graduates can schedule directly upon graduation, bypassing the 6-month wait.",
      },
    },
    {
      "@type": "Question",
      name: "What is BSEP and how does it help with the AFCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BSEP (Basic Skills Education Program) is a free, on-duty Army course targeting the three GT subtests: Word Knowledge, Paragraph Comprehension, and Arithmetic Reasoning. Most installations run a 10-day format with the AFCT on day 11. Average gain is 19 GT points, with the Fort Leonard Wood record at 35. Sailors, Airmen, Marines, and Guardians may attend when space permits. Graduating BSEP also waives the standard 6-month AFCT waiting period, making it the fastest legal path to retest.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my AFQT improves by 20 or more points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Confirmation Test (C-Test) is required when AFQT improves 20 or more points within a 6-month window. You take the C-Test immediately, with no 1-month wait, and the standard 6-month interval resumes after. The C-Test is score verification, not an accusation of cheating. Missing a scheduled C-Test triggers a 6-month wait from the critical-gain retest date.",
      },
    },
  ],
};

export default function AFCTPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        {/* ───────── H1 ───────── */}
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          The AFCT: How Active-Duty Service Members Retake the ASVAB Without
          Going Back to MEPS
        </h1>

        <p className="mt-4 text-text-secondary">
          You have a <Link href="/gt-score">GT score</Link> below 110 and
          a warrant officer packet, OCS application, or 18X reclass you
          can&apos;t submit. Sergeant Major Raymond Chandler put it bluntly: a
          GT under 110 &ldquo;starts to disqualify yourself from other
          MOSs.&rdquo;
        </p>

        <p className="text-text-secondary">
          The <strong>AFCT</strong> (Armed Forces Classification Test) is the
          only legal path to raise that GT after you&apos;ve sworn in. It runs
          through your installation Education Center, not MEPS, and the score it
          produces becomes your new record the moment you walk out.
        </p>

        <p className="text-text-secondary">
          One rule changes the entire risk calculus, covered in Section 3. The
          rest of this article covers retake policy by branch, prep programs
          that waive the 6-month wait, the DA Form 4187 chain, GT thresholds
          that unlock specific MOS, and a framework for deciding whether to sit
          the test. Project a target GT through the{" "}
          <Link href="/calculator">calculator</Link> first.
        </p>

        {/* Warning callout */}
        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>Red flag before you read further.</strong> An unprepared AFCT
            can permanently lower the score you already have. There is no
            superscore, no best-of policy, no take-the-higher option in any
            branch. Section 3 spells out exactly why this matters before you
            book a test date.
          </p>
        </aside>

        {/* ───────── S2: AFCT vs ASVAB ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFCT vs ASVAB: Same Test, Different Rules
        </h2>

        <p className="mt-4 text-text-secondary">
          Most soldiers assume the AFCT is the same computer-adaptive test they
          took at MEPS. It usually isn&apos;t.
        </p>

        <p className="text-text-secondary">
          The content is identical: same 9 to 10 subtests (General Science,
          Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension,
          Mathematics Knowledge, Electronics Information, Auto &amp; Shop
          Information, Mechanical Comprehension, and Assembling Objects), same
          scoring scales, same item difficulty. If you have an old ASVAB study
          guide on your shelf, the material still applies for the AFCT.
        </p>

        <p className="text-text-secondary">
          Administration is the first difference. The AFCT is given at your
          installation Education Center, scheduled through the Test Control
          Officer (TCO), not at MEPS. Most installations deliver it as a
          paper-and-pencil test: 135 items across roughly 3 hours, with separate
          timed blocks per subtest. Some sites use a computer-based delivery
          system coordinated through the Defense Manpower Data Center, but
          P&amp;P is the dominant format.
        </p>

        <p className="text-text-secondary">
          The second difference is which regulation governs your retake. Each
          branch writes its own AFCT testing policy: AR 611-5 for the Army,
          MILPERSMAN 1236-010 for the Navy, MCO 1230.5C for the Marine Corps,
          and AFI 36-2605 for the Air Force and Space Force. Section 4 breaks
          all of them down side by side. For background on how scoring works
          across both versions, see{" "}
          <Link href="/asvab-scores-explained">ASVAB scores explained</Link>.
        </p>

        {/* TABLE: Recruit ASVAB vs AFCT at a Glance */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Feature
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Recruit ASVAB
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  AFCT
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Who takes it
                </td>
                <td className="py-2 pr-4">Civilian applicants at MEPS</td>
                <td className="py-2">
                  Active-duty, Reserve, Guard at installation
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Format
                </td>
                <td className="py-2 pr-4">CAT-ASVAB (adaptive computer)</td>
                <td className="py-2">
                  Paper-and-pencil at most installations
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Question count
                </td>
                <td className="py-2 pr-4 font-mono">~145 (CAT, variable)</td>
                <td className="py-2 font-mono">135 (P&amp;P)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Total time
                </td>
                <td className="py-2 pr-4 font-mono">~154 minutes</td>
                <td className="py-2 font-mono">~3 hours</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Skip / return allowed
                </td>
                <td className="py-2 pr-4">No (CAT)</td>
                <td className="py-2">Yes (P&amp;P within a subtest)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Governing regulation
                </td>
                <td className="py-2 pr-4 font-mono">DoDI 1304.12E</td>
                <td className="py-2 font-mono">
                  AR 611-5, MILPERSMAN 1236-010, MCO 1230.5C, AFI 36-2605
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tip callout: Pacing warning */}
        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>Pacing warning.</strong> CAT-ASVAB strategy front-loads the
            first five questions because the algorithm uses them to calibrate
            difficulty. That advice does not transfer to P&amp;P. On paper you
            can skip and return within the same subtest, so use a two-pass
            approach: answer everything you know first, then circle back to
            flagged items with the remaining time.
          </p>
        </aside>

        {/* ───────── S3: Score Replacement Rule ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Score Replacement Rule: Why an Unprepared AFCT Can End Your Career
        </h2>

        <p className="mt-4 text-text-secondary">
          The single most expensive misconception about the AFCT is that the
          military keeps your highest score. It doesn&apos;t.
        </p>

        <p className="text-text-secondary">
          Every branch&apos;s testing regulation enforces the same one-way rule:
          &ldquo;The new scores obtained upon completion of the AFCT will
          replace your previous ASVAB/AFCT, no exceptions.&rdquo; There is no
          superscore. No best-of. No &ldquo;we&apos;ll only count it if
          it&apos;s higher.&rdquo; If you sit the test, the result that prints
          on your scorecard becomes your record the moment your TCO files it.
        </p>

        <p className="text-text-secondary">
          Replacement applies to your AFQT percentile, every line score (GT, ST,
          CL, MM, EL, CO, FA, GM, OF, SC), and every composite the services
          derive from them. A soldier currently qualified for an MOS at GT 95
          can walk out of the Education Center with an 88 and lose that
          qualification in a single afternoon. The Texas Military Department
          puts it plainly: &ldquo;Once a Service Member takes the AFCT, the
          score is final, even if it is lower than previous scores.&rdquo;
        </p>

        <p className="text-text-secondary">
          The Army requires commanders to counsel soldiers on this risk before
          scheduling an AFCT. The standard counseling form&apos;s warning
          language is direct: &ldquo;if you retake the AFCT, your new scores
          will count even if your new score is lower.&rdquo; The same protocol
          allocates 30 days of structured study, mandates a{" "}
          <Link href="/gt-score">GT Predictor</Link> exam, and only
          clears the soldier to schedule once the predictor result clears 100.
          Score replacement is the reason that prep isn&apos;t optional. For how
          civilian retake rules differ at MEPS, see the{" "}
          <Link href="/asvab-retake-policy">ASVAB retake policy</Link>{" "}
          breakdown.
        </p>

        {/* Warning callout: The rule */}
        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>The rule, in regulation language:</strong>
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            &ldquo;The new scores obtained upon completion of the AFCT will
            replace your previous ASVAB/AFCT, no exceptions.&rdquo;
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            This applies universally. Army, Navy, Marines, Air Force, Space
            Force, Coast Guard. No branch makes an exception, and no commander
            can override it after the fact.
          </p>
        </aside>

        {/* STATS-ROW: Score replacement facts */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              1 test day
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Can permanently lower a score that&apos;s been on your record for
              5+ years
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              0 exceptions
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              In any branch&apos;s published AFCT regulation
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              100% of records
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Replacement applies to AFQT, every line score, and every composite
              simultaneously
            </p>
          </div>
        </div>

        {/* ───────── S4: Retake Waiting Periods ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          AFCT Retake Waiting Periods by Branch (With Regulatory Citations)
        </h2>

        <p className="mt-4 text-text-secondary">
          No competitor article on the public internet presents all six services
          side by side with the actual regulation behind each rule.
        </p>

        <p className="text-text-secondary">
          The Army caps you at 6 months between any AFCT attempts, including the
          gap between your MEPS ASVAB and your first AFCT. The authority is AR
          611-5. There is no published lifetime cap on attempts.
        </p>

        <p className="text-text-secondary">
          The Marine Corps enforces the same 6-month wait under MCO 1230.5C,
          with a 90-day minimum floor for any ETP request. ETPs below 90 days
          route to CMC (MPP-50). Completing the FAST course can authorize
          immediate retest.
        </p>

        <p className="text-text-secondary">
          The Navy runs on a different model. MILPERSMAN 1236-010 requires
          demonstrated educational improvement since the last attempt: documented
          college coursework, NKO or Navy E-Learning modules, or equivalent. The
          command Career Counselor is the gatekeeper.
        </p>

        <p className="text-text-secondary">
          Air Force and Space Force both follow AFI 36-2605 with a 6-month
          standard interval. The Coast Guard aligns with the Navy framework.
        </p>

        <p className="text-text-secondary">
          One more policy every retaker should know: if your AFQT improves 20 or
          more points in a 6-month window, a Confirmation Test (C-Test) is
          required immediately. Standard 6-month intervals resume afterward.
          Missing a scheduled C-Test triggers a 6-month wait from the
          critical-gain retest date. For how this compares to MEPS-side retake
          rules, see the{" "}
          <Link href="/asvab-retake-policy">ASVAB retake policy</Link>.
        </p>

        {/* TABLE: AFCT Retake Policy by Branch */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Standard Wait
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Regulation
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Wait Waiver Path
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">
                  6 months from last ASVAB or AFCT
                </td>
                <td className="py-2 pr-4 font-mono">AR 611-5</td>
                <td className="py-2 pr-4">
                  Complete BSEP, then immediate AFCT
                </td>
                <td className="py-2">
                  No published lifetime cap; ETP via DA 4187
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">
                  6 months (90-day floor for ETP)
                </td>
                <td className="py-2 pr-4 font-mono">MCO 1230.5C</td>
                <td className="py-2 pr-4">
                  Complete FAST, potential immediate retest
                </td>
                <td className="py-2">
                  ETP under 90 days requires CMC (MPP-50)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">No fixed calendar wait</td>
                <td className="py-2 pr-4 font-mono">MILPERSMAN 1236-010</td>
                <td className="py-2 pr-4">
                  Document NKO or college coursework since last test
                </td>
                <td className="py-2">
                  Career Counselor is the gatekeeper
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">6 months</td>
                <td className="py-2 pr-4 font-mono">AFI 36-2605</td>
                <td className="py-2 pr-4">
                  Coordinated through Education Center
                </td>
                <td className="py-2">
                  Scheduled by Education Services Officer
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">6 months</td>
                <td className="py-2 pr-4 font-mono">
                  AFI 36-2605 (inherited)
                </td>
                <td className="py-2 pr-4">Same as Air Force</td>
                <td className="py-2">
                  Aligned with Air Force testing program
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4">
                  Educational-improvement standard
                </td>
                <td className="py-2 pr-4 font-mono">Navy-aligned policy</td>
                <td className="py-2 pr-4">Similar to Navy</td>
                <td className="py-2">
                  Less commonly retested in-service
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key-point callout: BSEP/FAST hack */}
        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>
              The most overlooked retake hack in the active-duty force:
            </strong>{" "}
            BSEP (Army) and FAST (Marines) graduation can waive the 6-month wait
            entirely. If you&apos;re inside the window and your career deadline
            doesn&apos;t give you 6 months to spare, this is the only legal
            shortcut. Section 7 covers exactly how to enroll.
          </p>
        </aside>

        {/* ───────── S5: GT, AFQT, and Line Scores ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT, AFQT, and Line Scores: What the AFCT Actually Moves on Your Record
        </h2>

        <p className="mt-4 text-text-secondary">
          Three subtests decide whether you ever wear a warrant officer&apos;s
          bar. Most soldiers can&apos;t name all three.
        </p>

        <p className="text-text-secondary">
          The GT (General Technical) line score is built from Arithmetic
          Reasoning, Word Knowledge, and Paragraph Comprehension. The formula:
          GT = AR + VE, where VE (Verbal Expression) is the standard-score
          conversion of your WK and PC raw scores added together. Every Army
          prep program (BSEP, OASC, March2Success) and the Marine FAST
          equivalent targets exactly those three subtests because they are the
          only ones that move GT.
        </p>

        <p className="text-text-secondary">
          GT is not AFQT. The two formulas overlap, which causes most of the
          confusion. AFQT uses 2(VE) + AR + MK, so it includes Mathematics
          Knowledge while GT does not. A soldier whose only goal is GT 110
          should not waste study hours on MK, Electronics Information, or any of
          the technical subtests. A Sailor pursuing rating conversion who also
          needs AFQT 50 or higher still needs MK, because MK feeds AFQT
          directly.
        </p>

        <p className="text-text-secondary">
          The AFCT also overwrites every line score on your record, not just GT.
          ST, CL, MM, EL, CO, FA, GM, OF, and SC all get recalculated from your
          new subtest results. Several Army MOS gates use combinations (35F
          Intelligence Analyst requires GT 107 plus ST 101), so you can&apos;t
          tunnel-vision GT and ignore where your other line scores land. Model
          the impact in advance through the{" "}
          <Link href="/gt-score-calculator">GT score calculator</Link>, the{" "}
          <Link href="/asvab-line-score-calculator">
            line score calculator
          </Link>
          , or the{" "}
          <Link href="/asvab-composite-score-calculator">
            composite score calculator
          </Link>
          .
        </p>

        {/* FORMULA */}
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          VE (Verbal Expression) = WK raw + PC raw, converted to VE standard
          score (20 to 62)
          <br />
          GT (General Technical) = AR + VE
          <br />
          AFQT (percentile) = derived from 2(VE) + AR + MK, normed against the
          1997 Profile of American Youth
          <br />
          Key insight: VE doubles inside AFQT, so PC and WK gains compound
          across both GT and AFQT
        </div>

        {/* Tip callout: Leverage point */}
        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>Leverage point.</strong> Every hour spent on Mathematics
            Knowledge is an hour that doesn&apos;t move your GT. If your only
            target is GT 110 for warrant officer, OCS, or 18X, spend that hour
            on AR, WK, or PC instead.
          </p>
        </aside>

        {/* ───────── S6: GT to MOS Reclassification ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          GT to MOS Reclassification: What Each Score Threshold Actually Unlocks
        </h2>

        <p className="mt-4 text-text-secondary">
          GT 110 gets the headlines, but it isn&apos;t the only meaningful
          threshold.
        </p>

        <p className="text-text-secondary">
          GT 85 opens the 91-series of vehicle and equipment mechanics: 91B
          Wheeled Vehicle Mechanic, 91D Power Generation, 91F Small Arms Repair.
          GT 100 unlocks 42A Human Resources Specialist, 92A Automated
          Logistical Specialist, and most standard support MOS. GT 107 is the
          first specialized-tier threshold: 35F Intelligence Analyst (paired
          with ST 101), 37F Psychological Operations, 38B Civil Affairs, and 46S
          Public Affairs Specialist.
        </p>

        <p className="text-text-secondary">
          GT 110 is the magic number established in AR 135-100 as the minimum
          for any Army officer-producing program. The same 110 floor applies to
          17C Cyber Operations (with ST 112), 18X Special Forces (with ST 100),
          every Warrant Officer program, Drill Sergeant duty, and Recruiter
          assignment. For 180A Special Forces Warrant Officer, the 110 is
          non-waivable.
        </p>

        <p className="text-text-secondary">
          The case studies below come from Army Times and army.mil reporting on
          BSEP, FAST, and OASC graduates. They span different starting points,
          different prep paths, and different reasons for retesting. What they
          share is structured prep before sitting the test.
        </p>

        <p className="text-text-secondary">
          Sailors should read these thresholds through the AFQT lens. MILPERSMAN
          1236-010 specifically flags the AFCT for Sailors with AFQT below 50
          facing their FR/PTS window. For rating-by-rating AFQT and composite
          floors, see the{" "}
          <Link href="/navy-ratings-list">Navy ratings list</Link>.
        </p>

        {/* TABLE: Army GT Score Thresholds */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  GT Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Sample MOS / Programs Unlocked
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  85
                </td>
                <td className="py-2">
                  91B Wheeled Vehicle Mechanic, 91D Power Generation, 91F Small
                  Arms Repair
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  100
                </td>
                <td className="py-2">
                  42A HR Specialist, 92A Automated Logistical Specialist, most
                  support MOS
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  107
                </td>
                <td className="py-2">
                  35F Intelligence Analyst (with ST 101), 37F Psyops, 38B Civil
                  Affairs, 46S Public Affairs
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  110
                </td>
                <td className="py-2">
                  17C Cyber Operations (with ST 112), 18X Special Forces (with
                  ST 100), all Warrant Officer programs, OCS, Drill Sergeant,
                  Recruiter
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary font-mono">
                  110+
                </td>
                <td className="py-2">
                  180A SF Warrant Officer (non-waivable), expanded
                  officer-producing program eligibility
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* STATS-ROW: Case studies */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              SSgt Jaleida Cosme
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              89 to 109 (+20) via FAST in Hawaii, then re-enrolled in BSEP at
              Fort Hood to push past 109 for OCS
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              SSgt Rafael Leyva
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              102 to 131 (+29) via BSEP at Joint Base Lewis-McChord, unlocking
              warrant officer and master gunner pathways
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              SSgt Samuel Lovato
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              +35 via BSEP at Fort Leonard Wood (installation record), 10 years
              in service with only a high school diploma when he started
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              SPC Hiep Tran
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              +20 to GT 115 via OASC as an ESL soldier from Vietnam, unlocking
              68W Combat Medic, pharmacy specialist, OR specialist, dental
              specialist, and practical nursing specialist
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          To stress-test your own ladder before scheduling, run projected gains
          through the{" "}
          <Link href="/gt-score-calculator">GT score calculator</Link> and
          benchmark against <Link href="/gt-score">GT score</Link>{" "}
          thresholds.
        </p>

        {/* ───────── S7: Prep Programs ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          BSEP, FAST, OASC, and March2Success: The Prep Programs Civilians
          Don&apos;t Have Access To
        </h2>

        <p className="mt-4 text-text-secondary">
          Four free prep programs your civilian friends literally cannot use.
          Pick the right one and the score replacement risk drops enormously.
        </p>

        <p className="text-text-secondary">
          BSEP (Basic Skills Education Program) is the Army&apos;s resident
          course. Fort Leonard Wood runs 10 consecutive duty days, cohorts of 15
          students, AFCT on day 11. Fort Cavazos offers sessions year-round.
          Average GT gain is 19 points, and historical data shows 83% of 450+
          BSEP graduates scored 100+, with 51% hitting 110+.
        </p>

        <p className="text-text-secondary">
          FAST (Functional Academic Skills Training) is the Marine Corps
          equivalent targeting the same WK, PC, and AR subtests. Both BSEP and
          FAST can waive the 6-month wait.
        </p>

        <p className="text-text-secondary">
          OASC (Online Academic Skills Course) runs through Peterson&apos;s at
          dantes.petersons.com, free for all Active Duty, Reserves, Guard,
          family, and DoD civilians. March2Success is the Army-sponsored adaptive
          platform covering the same core. Neither waives the 6-month wait.
        </p>

        <p className="text-text-secondary">
          Before any program, sit the GT Predictor at your Education Center.
          Above 100 signals readiness; below 100 means more study. Pair
          whichever program you pick with the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link> and free{" "}
          <Link href="/afct-practice-test">AFCT practice test</Link>.
        </p>

        {/* TABLE: AFCT Prep Program Comparison */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Program
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Format
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch Access
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Wait Waiver
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Avg Outcome
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Cost
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  BSEP
                </td>
                <td className="py-2 pr-4">In-person, 10 days to 3 weeks</td>
                <td className="py-2 pr-4">
                  Army (others when space permits)
                </td>
                <td className="py-2 pr-4">Yes, day-11 AFCT</td>
                <td className="py-2 pr-4 font-mono">+19 GT avg, +35 record</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">Inside 6-month window</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  FAST
                </td>
                <td className="py-2 pr-4">In-person resident</td>
                <td className="py-2 pr-4">Marines</td>
                <td className="py-2 pr-4">Yes (CMC authorization)</td>
                <td className="py-2 pr-4">Less published data</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">Marines needing wait waiver</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  OASC
                </td>
                <td className="py-2 pr-4">
                  Online self-paced, 24/7 tutoring
                </td>
                <td className="py-2 pr-4">
                  All services, family, DoD civilians
                </td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">Variable; Tran case +20 ESL</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">Remote or deployed</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  March2Success
                </td>
                <td className="py-2 pr-4">Online adaptive platform</td>
                <td className="py-2 pr-4">All services</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2 pr-4">Variable</td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">Supplement to BSEP or OASC</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GT Predictor
                </td>
                <td className="py-2 pr-4">Diagnostic at Education Center</td>
                <td className="py-2 pr-4">Where offered</td>
                <td className="py-2 pr-4">N/A (pre-step)</td>
                <td className="py-2 pr-4 font-mono">
                  &gt;100 = test ready
                </td>
                <td className="py-2 pr-4">Free</td>
                <td className="py-2">
                  Risk-check before real AFCT
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info cards: Inside 6-month wait / Remote or deployed */}
        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              If you&apos;re inside the 6-month wait
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              BSEP (Army) or FAST (Marines) is the only legal path to retest
              sooner. Enroll through your Education Center, complete the course,
              and sit the AFCT on graduation day. Seats fill first-come at most
              installations, so apply early.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              If you&apos;re remote or deployed
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              OASC via dantes.petersons.com runs entirely online, with 24/7 live
              tutoring and a mobile app. Pair it with March2Success for adaptive
              drilling between live sessions. You&apos;ll still wait the full 6
              months under your branch&apos;s standard, but you&apos;ll arrive
              at test day ready.
            </p>
          </div>
        </div>

        {/* ───────── S8: How to Request the AFCT ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Actually Request the AFCT: DA Form 4187 and the Approval Chain
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army&apos;s process is an 8-step ladder.
        </p>

        <p className="text-text-secondary">
          Confirm the 6-month wait (or BSEP graduation date). Choose your prep
          path and study 4 to 6 weeks on AR, WK, and PC. Sit the GT Predictor
          and score above 100 before proceeding. Complete DA Form 4187 (soldier
          initiates, supervisor reviews, company commander signs). Submit the
          signed 4187 to the TCO at least 2 business days before your desired
          test date. Show up with CAC, secondary photo ID, signed 4187, duty
          uniform, 30 minutes early. No phone, no smart watch, no calculator.
          Your score becomes official immediately; coordinate with HR to trigger
          any pending packets.
        </p>

        <p className="text-text-secondary">
          DA Form 4187 is also the vehicle for an Exception to Policy request to
          bypass the 6-month wait without BSEP. Approval is uncommon without a
          strong case (deployment timing, school start, board cutoff).
        </p>

        {/* STATS-ROW: 8-step process */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 1</p>
            <p className="mt-1 text-sm text-text-secondary">
              Confirm 6-month wait (or BSEP/FAST graduation date)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 2</p>
            <p className="mt-1 text-sm text-text-secondary">
              Choose prep path (BSEP, FAST, OASC, or March2Success)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 3</p>
            <p className="mt-1 text-sm text-text-secondary">
              Study 4&ndash;6 weeks on AR, WK, PC
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 4</p>
            <p className="mt-1 text-sm text-text-secondary">
              Sit GT Predictor (score above 100 to proceed)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 5</p>
            <p className="mt-1 text-sm text-text-secondary">
              DA Form 4187 reviewed by supervisor, signed by company commander
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 6</p>
            <p className="mt-1 text-sm text-text-secondary">
              Submit to TCO at least 2 business days before test date
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 7</p>
            <p className="mt-1 text-sm text-text-secondary">
              Test day with CAC, photo ID, DA 4187, duty uniform, no phone or
              calculator
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Step 8</p>
            <p className="mt-1 text-sm text-text-secondary">
              Score becomes official immediately; update HR records
            </p>
          </div>
        </div>

        {/* Info cards: Army / Navy / Marines */}
        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Army
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Soldier initiates DA Form 4187 (Personnel Action). Supervisor
              reviews, company commander signs. Submit to the Test Control
              Officer at the installation Education Center at least 2 business
              days out. Bring CAC, secondary photo ID, and the signed 4187 on
              test day.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Navy
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Sailor meets with the command Career Counselor to document
              educational improvement (NKO courses, college coursework) since the
              last ASVAB or AFCT. Counselor verifies MILPERSMAN 1236-010
              eligibility and submits for scheduling at the Personnel Support
              Detachment or aboard larger platforms.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Marines
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Marine drafts a retest request. Battalion or squadron Commanding
              Officer provides written authorization under MCO 1230.5C. ETP
              requests below 90 days route to CMC (MPP-50). FAST graduates may
              receive immediate retest authorization. Match prep depth to the{" "}
              <Link href="/asvab-study-guide">ASVAB study guide</Link> framework
              and don&apos;t sit until you&apos;d put money on the result.
            </p>
          </div>
        </div>

        {/* ───────── S9: Decision Framework ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Should You Retake the AFCT? A Decision Framework for Real Risk
        </h2>

        <p className="mt-4 text-text-secondary">
          You have the rules, prep options, and threshold ladder. The remaining
          question is whether your specific situation justifies the score
          replacement risk. Four questions sort that out.
        </p>

        <p className="text-text-secondary">
          Question 1: what&apos;s the gap between your current GT and your
          target program&apos;s minimum? A gap of 10+ points almost always
          justifies BSEP or FAST when available. A gap of 1 to 3 points is a
          focused 4-to-6-week OASC sprint plus a GT Predictor check.
        </p>

        <p className="text-text-secondary">
          Question 2: are you inside the 6-month wait? If yes, BSEP or FAST is
          your only legal path.
        </p>

        <p className="text-text-secondary">
          Question 3: can you commit to 4 to 6 weeks of prep at roughly an hour
          a day? Without that floor, replacement risk outweighs expected gain.
        </p>

        <p className="text-text-secondary">
          Question 4: have you sat the GT Predictor? Above 100 is green. Below
          100 is more study.
        </p>

        <p className="text-text-secondary">
          The downside is permanent and asymmetric. A soldier qualified at GT 95
          who tanks to 88 can lose qualification cascades. The GT Predictor
          exists for exactly this reason. Document everything: BSEP
          certificates, OASC completions, NKO transcripts. They become required
          artifacts for any ETP request.
        </p>

        <p className="text-text-secondary">
          There are clean cases where you should not retest. If you already
          qualify for every program you want, the AFCT only adds risk. If
          you&apos;re within 12 months of ETS without a re-up plan, a new score
          won&apos;t pay off. Benchmark via{" "}
          <Link href="/what-is-a-good-asvab-score">
            what is a good ASVAB score
          </Link>{" "}
          and project gains through the <Link href="/calculator">calculator</Link>.
        </p>

        {/* Info cards: Green / Yellow / Red */}
        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Green light
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT Predictor above 100. Gap to target 15 points or less. Prep
              window of 4+ weeks secured. BSEP slot available, or your 6-month
              wait is already satisfied.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Yellow light
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT Predictor between 90 and 100. Gap above 15 points. Prep window
              under 4 weeks. Delay until a BSEP slot opens or until you can lock
              in a longer prep window.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Red light
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT Predictor below 90. No structured prep planned. Within 12
              months of ETS with no re-up. The score on your record today is
              better than a worse one tomorrow.
            </p>
          </div>
        </div>

        {/* Warning callout: Honest framing */}
        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>
              The honest framing most retake articles dodge.
            </strong>{" "}
            Online content usually pitches the AFCT as pure upside. It
            isn&apos;t. Your command is required to counsel you on the downside
            before scheduling for a reason: &ldquo;if you retake the AFCT, your
            new scores will count even if your new score is lower.&rdquo; Walk
            in ready or don&apos;t walk in.
          </p>
        </aside>

        {/* ───────── S10: Test Day ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Test Day: What to Bring, What to Expect, and How to Pace Yourself
        </h2>

        <p className="mt-4 text-text-secondary">
          Arrive 30 minutes early in duty uniform. Bring CAC, a secondary photo
          ID, and your signed DA Form 4187 (Army). Leave the phone and smart
          watch in the car. The TCO provides scratch paper and pencils.
          Calculators are prohibited.
        </p>

        <p className="text-text-secondary">
          The P&amp;P format runs 135 items across the subtests in roughly 3
          hours. Each subtest has its own timed block, and you cannot return to a
          previous subtest after the proctor closes it. Within a single subtest
          you can skip and return, which is the most underused tactic on test
          day.
        </p>

        <p className="text-text-secondary">
          The Two-Pass Method handles pacing. Pass 1: answer everything you can
          confidently in under your per-question average; flag anything slower
          and move on. Pass 2: return to flagged items. On AR, use scratch paper
          to set up word problems instead of holding variables in your head. On
          WK, eliminate two distractors fast and pick between the remaining two.
          On PC, read the question before the passage so you know what to scan
          for.
        </p>

        {/* Tip callout: CAT instincts */}
        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>CAT instincts don&apos;t apply.</strong> If you remember
            front-loading your first 5 questions at MEPS because the algorithm
            was calibrating, drop that habit for the AFCT. P&amp;P pacing is
            even across the subtest&apos;s clock. Don&apos;t burn 4 minutes on
            item 1.
          </p>
        </aside>

        {/* Info cards: What to bring / How to pace */}
        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              What to bring
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              CAC. Secondary photo ID. Signed DA Form 4187 (Army). Duty uniform.
              Water bottle if your proctor permits. Leave behind: phone, smart
              watch, calculator, study notes.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              How to pace (paper-and-pencil)
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Subtest-by-subtest clocks. Flag and move on rather than getting
              stuck. Read PC questions before the passage. Use scratch paper for
              AR setup. Eliminate two WK distractors before deciding. Two-pass
              through every subtest. For night-before refreshers, hit the{" "}
              <Link href="/afct-practice-test">AFCT practice test</Link> and
              review weak subtests one last time.
            </p>
          </div>
        </div>

        {/* ───────── FAQ Section ───────── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions About the AFCT
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between the AFCT and the ASVAB?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The AFCT is the active-duty in-service version of the ASVAB.
              Content, subtests, and scoring scales are identical. Differences
              are administrative: the AFCT is given at your installation
              Education Center (usually paper-and-pencil), governed by your
              branch&apos;s testing regulation (AR 611-5, MILPERSMAN 1236-010,
              MCO 1230.5C, or AFI 36-2605), and used to update your existing
              record rather than qualify you for initial enlistment. Most
              installations administer it in paper-and-pencil format rather than
              the CAT-ASVAB you took at MEPS, so pacing strategy is different.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Will my AFCT score replace my original ASVAB score even if
              it&apos;s lower?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, with no exceptions in any branch. Every branch&apos;s
              regulation states that the new score becomes your official score
              even if lower than your prior result. There is no superscore or
              best-of policy. This is why preparation, the GT Predictor exam,
              and a sober &ldquo;should I retake&rdquo; decision matter before
              scheduling. For how civilian MEPS retake rules differ, see the{" "}
              <Link href="/asvab-retake-policy">ASVAB retake policy</Link>.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long do I have to wait between AFCT attempts?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Army, Marines, Air Force, and Space Force apply a 6-month standard
              wait under AR 611-5, MCO 1230.5C, and AFI 36-2605 respectively.
              Navy and Coast Guard use an educational-improvement standard under
              MILPERSMAN 1236-010 rather than a fixed calendar. The wait can be
              waived for Army soldiers who complete BSEP and Marines who complete
              FAST, authorizing immediate retesting near graduation day. There is
              no published lifetime cap on the number of AFCT attempts in the
              Army.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do I need for warrant officer or OCS?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT 110. AR 135-100 establishes 110 as the minimum for any Army
              officer-producing program, including Warrant Officer and OCS. The
              same threshold applies to 17C Cyber Operations (with ST 112), 18X
              Special Forces (with ST 100), Drill Sergeant, and Recruiter. The
              110 is non-waivable for 180A. Project potential gains through the{" "}
              <Link href="/gt-score-calculator">GT score calculator</Link> and
              benchmark against{" "}
              <Link href="/gt-score">GT score</Link> thresholds.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do I request to take the AFCT in the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Complete DA Form 4187 (Personnel Action), have it signed by your
              company commander, and submit it to the Test Control Officer at
              your Education Center at least 2 business days before your desired
              test date. BSEP graduates can schedule directly upon graduation,
              bypassing the 6-month wait. Pair enrollment with a plan from the{" "}
              <Link href="/asvab-study-guide">ASVAB study guide</Link>.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is BSEP and how does it help with the AFCT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              BSEP (Basic Skills Education Program) is a free, on-duty Army
              course targeting the three GT subtests: Word Knowledge, Paragraph
              Comprehension, and Arithmetic Reasoning. Most installations run a
              10-day format with the AFCT on day 11. Average gain is 19 GT
              points, with the Fort Leonard Wood record at 35. Sailors, Airmen,
              Marines, and Guardians may attend when space permits. Graduating
              BSEP also waives the standard 6-month AFCT waiting period, making
              it the fastest legal path to retest.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if my AFQT improves by 20 or more points?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              A Confirmation Test (C-Test) is required when AFQT improves 20 or
              more points within a 6-month window. You take the C-Test
              immediately, with no 1-month wait, and the standard 6-month
              interval resumes after. The C-Test is score verification, not an
              accusation of cheating. Missing a scheduled C-Test triggers a
              6-month wait from the critical-gain retest date. When you&apos;re
              ready to project your own gain, plug subtest scores into the{" "}
              <Link href="/calculator">calculator</Link>.
            </p>
          </div>
        </div>

        {/* ───────── CTA Box ───────── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            Check Your Baseline Before You Retest
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Take a free 30-question diagnostic with the same subtests and
            question types as the AFCT. See which areas are holding your GT
            down.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/afct-practice-test"
              className="inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
            >
              Take the Free AFCT Diagnostic
            </Link>
            <Link
              href="/calculator"
              className="inline-block rounded-xl border border-navy-border px-6 py-3 font-display text-base font-bold text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent no-underline"
            >
              Score Calculator
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
