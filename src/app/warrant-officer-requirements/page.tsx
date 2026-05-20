import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Warrant Officer Requirements by Branch (2026) | ASVAB Hero",
  description:
    "Warrant officer requirements by branch: GT scores, rank, and years of service for the Army, Navy, Marines, Coast Guard, and the new 2024 Air Force program.",
  alternates: {
    canonical: "https://asvabhero.com/warrant-officer-requirements",
  },
};

export default function WarrantOfficerRequirementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Warrant Officer Requirements: GT Scores and Pathways by Branch (2026)",
          description:
            "Warrant officer requirements by branch: GT scores, rank, and years of service for the Army, Navy, Marines, Coast Guard, and the new 2024 Air Force program.",
          url: "https://asvabhero.com/warrant-officer-requirements",
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
              name: "What GT score do you need to be a warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Army requires a GT of 110, and it is non-waivable. The other branches set their thresholds by selection board and specialty rather than publishing a single fixed cutoff, but 110 is the common benchmark across officer-producing programs. Check your line score against that mark with the GT score calculator.",
              },
            },
            {
              "@type": "Question",
              name: "Do you need a college degree to become a warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Most warrant officer paths are built on demonstrated expertise in your military occupational specialty plus a qualifying GT score, not a bachelor's degree. The Navy's chief warrant officer program states a degree is not required. This is one of the biggest differences from commissioning programs like OCS and ROTC.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force have warrant officers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, again as of 2024. The Air Force reintroduced warrant officers that year after decades without them, but only in two information technology and cyber specialties: 17W and 17Y. The ranks remain limited to those IT and cyber fields, so most airmen are not yet eligible.",
              },
            },
            {
              "@type": "Question",
              name: "Can you become a warrant officer with no prior service?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Almost never. The one exception is the Army, which lets aviation and cyber warrant officer candidates enter without prior service. Every other warrant officer path in every branch requires you to first serve and prove yourself in the enlisted ranks.",
              },
            },
            {
              "@type": "Question",
              name: "How long does it take to become a warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on the branch. The Army can move a qualified sergeant relatively quickly, while the Navy and Coast Guard reserve the chief warrant officer track for senior enlisted members with 8 to 20 years of service. Add the packet, the selection board, and Warrant Officer Candidate School on top of your service time.",
              },
            },
            {
              "@type": "Question",
              name: "Is a warrant officer the same as a commissioned officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. A warrant officer is appointed from the enlisted ranks and stays in one technical specialty for their career. A commissioned officer is commissioned through a degree-based program and moves toward broader command and staff roles. Commissioned officers outrank warrant officers.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between GT and AFQT for warrant applicants?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The AFQT is the percentile that decides whether you can enlist at all. The GT is a separate line score, GT = VE + AR, that gates technical jobs and the warrant officer track. You can meet the AFQT minimum and still fall short of a GT 110. Run both through the score calculator to see where you land.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Warrant Officer Requirements: GT Scores and Pathways by Branch (2026)
        </h1>

        <p className="mt-4 text-text-secondary">
          Warrant officers are the military&apos;s deep technical experts, and
          the path to becoming one runs through your enlisted record, not a
          college degree. For most candidates, one number decides whether the
          door is even open: your GT line score. The Army sets that gate at 110,
          and it is non-waivable.
        </p>

        <p className="text-text-secondary">
          The <strong>warrant officer requirements</strong> that trip people up
          are not the push-ups or the paperwork. They are the score thresholds
          and the years of service each branch demands, and they vary a lot from
          the Army to the Navy to the brand-new Air Force program.
        </p>

        <p className="text-text-secondary">
          This guide breaks down the requirements branch by branch, with the
          exact GT and rank gates for each. Before you read further, plug your
          scores into the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>{" "}
          to see where you stand against the 110 mark.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            This is the enlisted-to-warrant path, an appointment you earn from
            inside the ranks. It is not a commissioning program like OCS or ROTC,
            and the requirements are completely different.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What a Warrant Officer Is (and How the Path Differs From Commissioning)
        </h2>

        <p className="mt-4 text-text-secondary">
          Warrant officers make up less than 3% of the Army. That scarcity is the
          point. They are single-specialty technical experts who advise
          commanders and train both enlisted soldiers and commissioned officers
          in one narrow field.
        </p>

        <p className="text-text-secondary">
          A commissioned officer&apos;s career moves toward broader command and
          staff jobs. A warrant officer&apos;s career stays in their specialty.
          You go deeper, not wider, and you stay close to the work you mastered
          as an enlisted member.
        </p>

        <p className="text-text-secondary">
          That is the distinction searchers miss most often. Becoming a warrant
          officer is an appointment earned from the enlisted ranks based on
          demonstrated expertise in your military occupational specialty plus a
          qualifying GT score. It is not the commissioning route.
        </p>

        <p className="text-text-secondary">
          The practical upside: most warrant officer paths do not require a
          bachelor&apos;s degree. The Navy&apos;s chief warrant officer program
          does not require one. The Army and Marine paths center on your MOS
          record and your line score, not your transcript. Compare that to OCS or
          ROTC, where a degree is the entry ticket.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Warrant officer vs commissioned officer comes down to two things. A
            warrant officer is appointed from the enlisted ranks and stays in one
            technical specialty. A commissioned officer is commissioned through a
            degree-based program and moves toward command. Different door,
            different keys.
          </p>
        </aside>

        <p className="text-text-secondary">
          The Army does carve out one narrow exception to the prior-service rule
          for aviation and cyber candidates. More on that below.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Requirement That Matters Most: Your GT Score
        </h2>

        <p className="mt-4 text-text-secondary">
          You can be a stellar NCO with a flawless evaluation history and still
          get stopped cold by one number. For the warrant officer track, that
          number is the GT score.
        </p>

        <p className="text-text-secondary">
          GT stands for General Technical, and it is a composite line score, not
          your enlistment percentile. It combines Verbal Expression and
          Arithmetic Reasoning, where Verbal Expression is built from your Word
          Knowledge and Paragraph Comprehension scores.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          Do not confuse the GT line score with the AFQT. The AFQT is the
          percentile that decides whether you can enlist in the first place. The
          GT is a job-and-program line score that gates technical fields,
          officer-producing programs, and the warrant officer track. You can have
          a solid AFQT and still fall short of a GT 110.
        </p>

        <p className="text-text-secondary">
          Here is how the requirement landscape compares across branches.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Typical rank to apply
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Years of service
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Score gate
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4">Sergeant (E-5) or higher</td>
                <td className="py-2 pr-4">Varies by MOS</td>
                <td className="py-2 font-mono">GT 110, non-waivable</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4">Sergeant (E-5) or higher</td>
                <td className="py-2 pr-4">8 years active</td>
                <td className="py-2">
                  By board and MOS (verify current MARADMIN)
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4">Chief petty officer (E-7) and up</td>
                <td className="py-2 pr-4 font-mono">~14-20 years</td>
                <td className="py-2">
                  Board-selected, no fixed cutoff published
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">E-6 to E-9</td>
                <td className="py-2 pr-4">8 years minimum</td>
                <td className="py-2">
                  Board-selected, no fixed cutoff published
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4">Staff sergeant (E-5) or higher</td>
                <td className="py-2 pr-4">1+ year active</td>
                <td className="py-2">IT/cyber AFSCs only, since 2024</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          These thresholds shift with each fiscal-year selection board. Always
          confirm the current numbers against your branch&apos;s active board
          message (the MARADMIN, NAVADMIN, or ALCG) before you build a packet.
          For the full breakdown of how line scores work, see our{" "}
          <Link
            href="/gt-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            GT score requirements
          </Link>{" "}
          and{" "}
          <Link
            href="/asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score requirements
          </Link>{" "}
          guides.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Warrant Officer Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army is the warrant officer branch. It has the clearest,
          most-traveled path and more than 40 warrant specialties spanning
          aviation, intelligence, cyber, engineering, and logistics.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Rank</p>
            <p className="mt-1 text-sm text-text-secondary">
              Sergeant (E-5) or higher for most technical specialties
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GT score</p>
            <p className="mt-1 text-sm text-text-secondary">
              110 minimum, non-waivable
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Age</p>
            <p className="mt-1 text-sm text-text-secondary">
              18 to 46 for technical warrants; before age 33 for aviation
              (limited waivers to 33-34)
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Education</p>
            <p className="mt-1 text-sm text-text-secondary">
              High school diploma or GED
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Clearance</p>
            <p className="mt-1 text-sm text-text-secondary">
              Eligible for a Secret security clearance
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Citizenship</p>
            <p className="mt-1 text-sm text-text-secondary">U.S. citizen</p>
          </div>
        </div>

        <p className="text-text-secondary">
          For the standard technical track, you build your case on demonstrated
          proficiency in your MOS. You assemble a warrant officer packet, secure
          a chain-of-command endorsement, and go in front of a selection board.
          Selection is competitive, and a borderline GT will sink an otherwise
          strong file.
        </p>

        <p className="text-text-secondary">
          The Army carves out one exception to the prior-service rule. Only
          aviation warrant officer and cyber warrant officer candidates can enter
          the Army as a warrant officer with no prior service. Those candidates
          attend Basic Combat Training first, then Warrant Officer Candidate
          School.
        </p>

        <p className="text-text-secondary">
          WOCS itself is a five-week course at Fort Novosel, Alabama (formerly
          Fort Rucker). Aviation candidates carry extra gates: a 90 or higher on
          the flight aptitude test (SIFT/FAST) and a Class 1A flight physical,
          followed by flight school. After appointment, every warrant officer
          certifies in their specialty through the Warrant Officer Basic Course.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The GT 110 is non-waivable. If your line score is sitting at 105 or
            107, fix the score before you invest months in a packet that the
            board cannot approve.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the complete Army breakdown, including specialty-specific gates and
          the packet timeline, see our{" "}
          <Link
            href="/army-warrant-officer-requirements"
            className="text-accent hover:text-accent-hover"
          >
            Army warrant officer requirements
          </Link>{" "}
          guide. If your GT is short,{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP
          </Link>{" "}
          is the in-service fix.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Navy and Coast Guard Chief Warrant Officer Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          The Navy chief warrant officer averages about 17 years of enlisted
          service before commissioning. The maritime services treat the warrant
          track as a capstone for senior technical experts, not an early-career
          move.
        </p>

        <div className="my-4 space-y-4">
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Navy CWO
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Chief warrant officers are appointed through the LDO/CWO program.
              Selectees are typically chief petty officers (E-7) with 14 to 20
              years of service, plus senior and master chiefs. A bachelor&apos;s
              degree is not required. You apply under the governing NAVADMIN with
              a commanding officer endorsement, and selection rests on technical
              mastery and leadership.
            </p>
          </div>
          <div className="rounded-lg bg-navy p-4">
            <h3 className="font-display text-base font-bold text-text-primary">
              Coast Guard CWO
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Enlisted members in pay grades E-6 through E-9 with at least 8 years
              of service compete for appointment as CWO2 in one of roughly 21
              specialties. An E-6 applicant must have placed in the top 50% on the
              most recent E-7 advancement list. Selected chief warrant officers
              can later compete for the CWO-to-Lieutenant program.
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Neither sea service publishes a single fixed ASVAB cutoff for the
          warrant track the way the Army does. These boards weight demonstrated
          technical mastery and time in service above any one score. A strong
          line score still strengthens your package, and it is often the
          difference in a tight board.
        </p>

        <p className="text-text-secondary">
          If you are pointed toward the Navy, our{" "}
          <Link
            href="/navy-asvab-score-requirements"
            className="text-accent hover:text-accent-hover"
          >
            Navy ASVAB score requirements
          </Link>{" "}
          guide covers the rating composites that build the technical record a
          board wants to see.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Marine Corps Warrant Officer Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Marine warrant officer slots are few, and the board is brutal. The
          Corps appoints warrant officers through an enlisted-to-warrant
          selection board reserved for proven NCOs with deep MOS expertise.
        </p>

        <p className="text-text-secondary">
          The core requirements: U.S. citizenship, current enlisted Marine
          status, a minimum of 8 years of active service, and the rank of
          sergeant (E-5) or higher. Your application package includes the
          required MCO form, a personal statement of 100 to 500 words explaining
          your motivation, and a commanding officer performance endorsement. MOS
          expertise is the spine of the whole file.
        </p>

        <p className="text-text-secondary">
          Selection is highly competitive and governed by the fiscal-year
          enlisted-to-warrant-officer MARADMIN, which sets the exact eligibility
          windows each cycle.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            Verify before you apply
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Some secondary sources cite a GT 100 minimum and an E-4 / 4-to-6-year
            window for Marine warrant applicants. The authoritative source is the
            current fiscal-year enlisted-to-WO board MARADMIN. Pull that message
            and confirm the exact GT and time-in-service numbers before you build
            your packet.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you are building the line scores a Marine board wants, our{" "}
          <Link
            href="/asvab-marines-score"
            className="text-accent hover:text-accent-hover"
          >
            Marines ASVAB score requirements
          </Link>{" "}
          guide maps the composites to the MOS field.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force Warrant Officers: The 2024 Reintroduction
        </h2>

        <p className="mt-4 text-text-secondary">
          For decades, the Air Force had zero warrant officers. The ranks were
          dissolved generations ago in favor of senior NCO grades, and that was
          the state of things until 2024.
        </p>

        <p className="text-text-secondary">
          In 2024 the Air Force brought warrant officers back, and these are the
          first new Air Force warrant officers in a generation. The
          reintroduction is deliberately narrow. It covers two new specialties
          only, both in information technology and cyber.
        </p>

        <div className="my-4 rounded-lg bg-navy p-4">
          <h3 className="font-display text-base font-bold text-text-primary">
            The two AFSCs (2024)
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            17W, Warfighter Communications and IT Systems Operations, and 17Y,
            Cyber Effects and Warfare Operations. Eligibility opened to active
            duty, Air National Guard, and Air Force Reserve members holding at
            least staff sergeant (E-5) with at least one year of active federal
            service. Applications opened in spring 2024, the service drew more
            than 400 applicants in the first window, and the first cohort of 30
            graduated from the new Warrant Officer Training School at Maxwell Air
            Force Base in early December 2024.
          </p>
        </div>

        <p className="text-text-secondary">
          Air Force leadership has said the program will stay limited to IT and
          cyber career fields for the foreseeable future. If you are in an
          aircraft maintenance, security forces, or any non-cyber AFSC, the
          warrant track is not open to you yet.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            This is a brand-new, evolving program. The AFSCs, eligibility, and
            scope could change as the Air Force scales it. Confirm the current
            requirements against the latest official Air Force guidance before you
            plan around it.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Qualify When Your GT Score Is Short
        </h2>

        <p className="mt-4 text-text-secondary">
          A GT below 110 is fixable, not a dead end. Because GT is built from
          Verbal Expression and Arithmetic Reasoning, you can engineer the
          increase if you target the right subtests.
        </p>

        <p className="text-text-secondary">
          Verbal Expression comes from Word Knowledge and Paragraph
          Comprehension, and it carries real weight in the GT formula. That makes
          verbal the most efficient place to find points when you are a few short
          of 110.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Drill verbal first
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Word Knowledge and Paragraph Comprehension feed VE, the
              highest-leverage part of your GT
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Sharpen Arithmetic Reasoning
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              AR is the other half of the GT formula
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Active duty: enroll in BSEP
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The Army&apos;s Basic Skills Education Program targets the exact
              skills that move your line score
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Retest with the AFCT
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Active-duty members raise their GT by retaking the in-service test,
              which replaces the old line score
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          One detail people miss: if you are already serving, you do not retake
          the recruiting ASVAB. You take the AFCT, the in-service version, and
          your new line score replaces the old one.
        </p>

        <p className="text-text-secondary">
          Plug your current line scores into the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>{" "}
          to see exactly how far you are from 110, then take a{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            free practice test
          </Link>{" "}
          to find the weak subtests dragging your GT down. For the full mechanics
          of the line score, see our{" "}
          <Link
            href="/asvab-gt-score"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB GT score guide
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do you need to be a warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Army requires a GT of 110, and it is non-waivable. The other
              branches set their thresholds by selection board and specialty
              rather than publishing a single fixed cutoff, but 110 is the common
              benchmark across officer-producing programs. Check your line score
              against that mark with the{" "}
              <Link
                href="/gt-score-calculator"
                className="text-accent hover:text-accent-hover"
              >
                GT score calculator
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do you need a college degree to become a warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. Most warrant officer paths are built on demonstrated expertise
              in your military occupational specialty plus a qualifying GT score,
              not a bachelor&apos;s degree. The Navy&apos;s chief warrant officer
              program states a degree is not required. This is one of the biggest
              differences from commissioning programs like OCS and ROTC.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Air Force have warrant officers?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, again as of 2024. The Air Force reintroduced warrant officers
              that year after decades without them, but only in two information
              technology and cyber specialties: 17W and 17Y. The ranks remain
              limited to those IT and cyber fields, so most airmen are not yet
              eligible.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you become a warrant officer with no prior service?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Almost never. The one exception is the Army, which lets aviation and
              cyber warrant officer candidates enter without prior service. Every
              other warrant officer path in every branch requires you to first
              serve and prove yourself in the enlisted ranks.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long does it take to become a warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends on the branch. The Army can move a qualified sergeant
              relatively quickly, while the Navy and Coast Guard reserve the chief
              warrant officer track for senior enlisted members with 8 to 20 years
              of service. Add the packet, the selection board, and Warrant Officer
              Candidate School on top of your service time.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is a warrant officer the same as a commissioned officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. A warrant officer is appointed from the enlisted ranks and stays
              in one technical specialty for their career. A commissioned officer
              is commissioned through a degree-based program and moves toward
              broader command and staff roles. Commissioned officers outrank
              warrant officers.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the difference between GT and AFQT for warrant applicants?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The AFQT is the percentile that decides whether you can enlist at
              all. The GT is a separate line score, GT = VE + AR, that gates
              technical jobs and the warrant officer track. You can meet the AFQT
              minimum and still fall short of a GT 110. Run both through the{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                score calculator
              </Link>{" "}
              to see where you land.
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
