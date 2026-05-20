import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Army Warrant Officer Requirements (2026) | ASVAB Hero",
  description:
    "Army warrant officer requirements explained: the non-waiverable GT 110 score, rank and experience, age limits, MOS tracks, WOCS, and the application packet.",
  alternates: {
    canonical: "https://asvabhero.com/army-warrant-officer-requirements",
  },
};

export default function ArmyWarrantOfficerRequirementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Army Warrant Officer Requirements: The GT 110 Gate and Everything After It",
          description:
            "Army warrant officer requirements explained: the non-waiverable GT 110 score, rank and experience, age limits, MOS tracks, WOCS, and the application packet.",
          url: "https://asvabhero.com/army-warrant-officer-requirements",
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
              name: "What GT score do you need for Army warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You need a GT (General Technical) score of 110 or higher, and it is non-waiverable. GT is the sum of your Verbal Expression and Arithmetic Reasoning scores (GT = VE + AR). Run your subtest numbers through the GT score calculator to see where you stand against the 110 line.",
              },
            },
            {
              "@type": "Question",
              name: "Can a civilian become an Army warrant officer with no prior service?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Only two specialties allow it: 153A Rotary Wing Aviator through Warrant Officer Flight Training (Street to Seat) and 170A Cyber Warfare Technician through direct accession. Every other warrant track requires you to already be an enlisted soldier with experience in a related field.",
              },
            },
            {
              "@type": "Question",
              name: "Do you need a college degree to be a warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. A high school diploma or GED is the education floor, and no warrant officer MOS requires a bachelor's degree. That is a key difference from the OCS and ROTC commissioning paths, which both require a four-year degree.",
              },
            },
            {
              "@type": "Question",
              name: "What is the age limit for Army warrant officer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For most technical specialties, you must be 46 or younger before your packet is boarded, with case-by-case waivers possible. For 153A aviation, the limit is 32 for enlisted applicants (33 for civilian WOFT), plus an 8-year Active Federal Service cap for enlisted soldiers.",
              },
            },
            {
              "@type": "Question",
              name: "How long is Warrant Officer Candidate School?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The active-component WOCS course runs about five weeks at Fort Novosel, Alabama (formerly Fort Rucker). Reserve and National Guard candidates complete a two-phase version split between drill-period training and a resident phase. Graduates are appointed Warrant Officer 1.",
              },
            },
            {
              "@type": "Question",
              name: "Is warrant officer the same as OCS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. OCS and ROTC commission you as a lieutenant and require a bachelor's degree. The warrant officer path is an appointment from the enlisted ranks, decided by an application packet and a selection board, with no degree required. You meet the Army's ASVAB requirements and apply by MOS.",
              },
            },
            {
              "@type": "Question",
              name: "What if my GT score is below 110?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Retake the ASVAB. Active-duty soldiers test through the AFCT, and the Army's free BSEP program helps raise weak verbal and math scores, the exact areas that feed your GT. Drill the right subtests with a practice test before you retest so the higher score sticks.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army Warrant Officer Requirements: The GT 110 Gate and Everything
          After It
        </h1>

        <p className="mt-4 text-text-secondary">
          There is exactly one requirement you cannot waive, talk around, or buy
          with a college degree: a GT score of 110. Miss it and the rest of the
          list does not matter yet.
        </p>

        <p className="text-text-secondary">
          The <strong>army warrant officer requirements</strong> start with that
          number because warrant officers are the Army&apos;s technical experts,
          less than 3% of the force, and the Army wants proof you can absorb the
          technical training. You become one by appointment from the enlisted
          ranks, or for two specialties straight off the street, not through OCS
          or ROTC.
        </p>

        <p className="text-text-secondary">
          This is the enlisted-to-warrant path. If you want to check where your
          GT sits before reading further, run your subtest scores through the{" "}
          <Link
            href="/calculator"
            className="text-accent hover:text-accent-hover"
          >
            ASVAB score calculator
          </Link>
          .
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            A GT of 110 is the only hard, non-waiverable warrant officer
            requirement, set by AR 135-100. Every other requirement has a
            waiver, an exception, or a workaround. The GT does not.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The GT 110 Score Requirement (And Why It Cannot Be Waived)
        </h2>

        <p className="mt-4 text-text-secondary">
          You can be the best mechanic, analyst, or signal soldier in your unit
          and still get blocked by one number on a score sheet.
        </p>

        <p className="text-text-secondary">
          GT stands for General Technical, one of the Army&apos;s composite line
          scores. It is built from two subtest areas:
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE is your Verbal Expression score (from Word Knowledge and Paragraph
          Comprehension) and AR is Arithmetic Reasoning. Every army warrant
          officer requirement list anchors to GT 110 or higher, and that minimum
          is non-waiverable. The rule traces to AR 135-100, the regulation that
          governs appointment of commissioned and warrant officers in the Army.
        </p>

        <p className="text-text-secondary">
          Put that in context. The Army&apos;s enlistment AFQT minimum is 31 for
          a high school diploma holder. Warrant officer is a much higher bar. A
          110 GT roughly tracks to performing well above the average enlistee,
          which is the point: the Army is screening for people who can carry
          advanced technical schooling.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            If your GT is below 110, fix it before you build anything else in
            your packet. There is no waiver to apply around it.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you are below the line, you have a clear move. Active-duty soldiers
          retake the ASVAB through the{" "}
          <Link href="/afct" className="text-accent hover:text-accent-hover">
            AFCT
          </Link>{" "}
          at their installation&apos;s testing center, and many close the gap
          with the Army&apos;s free{" "}
          <Link href="/bsep" className="text-accent hover:text-accent-hover">
            BSEP
          </Link>{" "}
          prep program. Want to see exactly how your VE and AR translate to a GT
          number first? Use the{" "}
          <Link
            href="/gt-score-calculator"
            className="text-accent hover:text-accent-hover"
          >
            GT score calculator
          </Link>
          , and read the full{" "}
          <Link
            href="/asvab-gt-score"
            className="text-accent hover:text-accent-hover"
          >
            GT score guide
          </Link>{" "}
          for which subtests move it fastest.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Rank, Experience, and the Enlisted-to-Warrant Path
        </h2>

        <p className="mt-4 text-text-secondary">
          Most warrant officers were sergeants first. That is the standard
          route, and it is worth understanding before you look at the
          exceptions.
        </p>

        <p className="text-text-secondary">
          The army warrant officer requirements for experience are real, not a
          formality. For technical warrant tracks, you generally must be serving
          on active duty, in the Army Reserve, or in the Army National Guard at
          the rank of sergeant (E-5) or above, with roughly 3 to 7 years of
          hands-on experience in a related field. The exact floor varies by
          specialty, and your experience is verified through your NCOERs, so the
          paper trail matters as much as the time.
        </p>

        <p className="text-text-secondary">
          You do not need a college degree. A high school diploma or GED is the
          education floor, and no warrant officer MOS requires a bachelor&apos;s.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Warrant officer is not the same as OCS or ROTC. Those paths
            commission you as a lieutenant and require a bachelor&apos;s degree.
            The warrant path is an appointment from the enlisted ranks, decided
            by a packet and a board. Different door, different rules.
          </p>
        </aside>

        <p className="text-text-secondary">
          That distinction is the one most people get wrong. Commissioned
          officers are generalists who rotate through command. Warrant officers
          stay in one technical lane for a career and advise those officers on
          it.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Age Limits: 46 for Technical, 32 to 33 for Aviation
        </h2>

        <p className="mt-4 text-text-secondary">
          The aviation age door closes about 14 years earlier than every other
          track, which surprises most applicants.
        </p>

        <p className="text-text-secondary">
          Two clocks run, depending on the specialty you want.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Track
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Age limit
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Second clock
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Technical MOS (most)
                </td>
                <td className="py-2 pr-4 font-mono">
                  46 or younger before the packet is boarded
                </td>
                <td className="py-2">None; age waivers possible case by case</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  153A Aviation (enlisted)
                </td>
                <td className="py-2 pr-4 font-mono">
                  32 or younger before boarding
                </td>
                <td className="py-2">
                  Cannot exceed 8 years Active Federal Service at DA Form 61
                  signing
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  153A Aviation (civilian WOFT)
                </td>
                <td className="py-2 pr-4 font-mono">Hard limit of 33</td>
                <td className="py-2">
                  None, but the age cutoff is effectively firm
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The technical limit of 46 has room for case-by-case waivers. The
          aviation limits do not behave the same way. For the enlisted aviation
          track, the 8-year service cap is a separate gate from age, so a soldier
          can age out on time-in-service even while still under 32. Plan the
          aviation packet early if it is your goal.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Technical Warrant Officer MOS Tracks (153A, 170A, 255A and More)
        </h2>

        <p className="mt-4 text-text-secondary">
          The Army runs more than 40 warrant officer specialties. Here is the
          shortlist of high-demand tracks and what feeds each one.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Field
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Who applies
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  153A
                </td>
                <td className="py-2 pr-4">Aviation (rotary wing pilot)</td>
                <td className="py-2">
                  Civilians via WOFT or enlisted soldiers under the age and
                  service caps
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  170A
                </td>
                <td className="py-2 pr-4">Cyber Warfare Technician</td>
                <td className="py-2">
                  Civilians via direct accession or 17/25/35-series soldiers with
                  cyber experience
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  255A
                </td>
                <td className="py-2 pr-4">Information Services Technician</td>
                <td className="py-2">
                  Signal soldiers managing networks, servers, and IP systems
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  350F
                </td>
                <td className="py-2 pr-4">All-Source Intelligence Technician</td>
                <td className="py-2">
                  Intelligence-MOS soldiers analyzing and advising on intel
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold text-text-primary">
                  915A
                </td>
                <td className="py-2 pr-4">Automotive Maintenance</td>
                <td className="py-2">
                  Maintenance soldiers from the 91-series (91A, 91B, 91M and
                  others)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Beyond these, the lineup spans logistics (the 920-series), property and
          supply, engineering, field artillery targeting, Criminal Investigation
          Division special agents (311A), and more. Almost every technical lane
          in the Army has a warrant officer who owns the expertise.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Clearance scales with the field. Most specialties require a final
            Secret clearance at minimum, while intelligence, cyber, and CID
            tracks require Top Secret with SCI access. Interim clearances do not
            satisfy the requirement.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Two No-Prior-Service Tracks: Aviation (WOFT) and Cyber
        </h2>

        <p className="mt-4 text-text-secondary">
          Two specialties let a civilian become an Army warrant officer without
          spending a single day as an enlisted soldier.
        </p>

        <p className="text-text-secondary">
          The headline path is 153A through Warrant Officer Flight Training,
          known as Street to Seat. A civilian applies directly, passes the SIFT
          (Selection Instrument for Flight Training) with a 40 or higher on top
          of the GT 110, sits for a formal interview with a senior commander
          (O-5 or above), and goes before a board. Competitive SIFT scores run
          in the 50s and up.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">SIFT 40+</p>
            <p className="mt-1 text-sm text-text-secondary">
              Aviation aptitude test, required in addition to GT 110
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Board and interview
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Packet review plus a sit-down with an O-5 or higher
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">WOCS</p>
            <p className="mt-1 text-sm text-text-secondary">
              About five weeks at Fort Novosel before flight school
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Flight school
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The full pipeline runs roughly 12 to 18 months by platform
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">10-year ADSO</p>
            <p className="mt-1 text-sm text-text-secondary">
              Active duty service obligation that starts after flight school
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          The second no-prior-service door is 170A Cyber Warfare Technician, a
          direct accession track for people with strong technical cyber
          backgrounds. Junior 170A warrants must attain and hold a senior-level
          certification in at least one cyber work role, and the field requires
          Top Secret with SCI.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            The aviation commitment is long. A 153A incurs a 10-year service
            obligation that does not start counting until you finish flight
            school. Go in knowing the math.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Warrant Officer Candidate School (WOCS) at Fort Novosel
        </h2>

        <p className="mt-4 text-text-secondary">
          Getting selected is not the finish line. WOCS still has to pass you.
        </p>

        <p className="text-text-secondary">
          The active-component course runs about five weeks at Fort Novosel,
          Alabama. If you have seen older guides calling it Fort Rucker, that is
          the same place: the post was renamed Fort Novosel in 2023. Reserve and
          National Guard candidates run a two-phase version, with drill-period
          training at a Regional Training Institute followed by a resident phase.
        </p>

        <p className="text-text-secondary">
          WOCS is built to stress leadership, judgment, and physical standards
          under pressure. You will have to meet Army Combat Fitness Test
          standards and the height and weight rules in AR 600-9.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Graduates are appointed Warrant Officer 1 (WO1) on completion. For
            153A candidates, flight school begins right after WOCS.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Application Packet and Board Process
        </h2>

        <p className="mt-4 text-text-secondary">
          The packet is a checklist. Here is exactly what goes in it.
        </p>

        <ul className="my-4 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>DA Form 61:</strong> Application for Appointment. Block 1
            sets your component, Block 3 reads WO1, and Blocks 5a and 5b list
            your target MOS code and title.
          </li>
          <li>
            <strong>Resume and forms:</strong> USAREC Form 3.2 resume, plus
            USAREC Forms 3.1 and 3.3.
          </li>
          <li>
            <strong>Records:</strong> Your ERB or equivalent, plus NCOERs and
            AERs.
          </li>
          <li>
            <strong>Letters of recommendation:</strong> From your Company
            Commander, your Battalion Commander, and a Senior Warrant Officer
            (CW3 to CW5 for most specialties).
          </li>
          <li>
            <strong>Supporting documents:</strong> Certificates, clearance
            documentation, and a SIFT score for aviation applicants.
          </li>
        </ul>

        <p className="text-text-secondary">
          Once the packet is in, a selection board reviews it. Most MOS are
          boarded twice a year. A non-select on a first look comes back as FQ-NS,
          fully qualified but not selected, which means try again rather than
          start over. If you are selected, your WOCS class date typically arrives
          by email about 90 days later.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Boards read letters of recommendation closely and want concrete
            evidence of leadership, judgment, and reliability under pressure. Ask
            your recommenders for specific examples of your decisions, not
            generic praise.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Service Obligation and What the Job Actually Is
        </h2>

        <p className="mt-4 text-text-secondary">
          The aviation commitment is nearly double the technical one, so the MOS
          you choose sets the length of your bet.
        </p>

        <p className="text-text-secondary">
          Technical warrant officers generally incur about 6 years of active
          duty. A 153A aviator incurs 10 years after flight school, the longest
          service obligation in the warrant system, because flight training is
          the Army&apos;s most expensive investment per officer.
        </p>

        <p className="text-text-secondary">
          What you sign up for is a career as a single-track technical expert.
          Warrant officers advise commanders, train soldiers and lieutenants in
          their specialty, and progress through five grade levels from WO1 to
          CW5. They are less than 3% of the Army by design, the deep experts the
          rest of the force leans on.
        </p>

        <p className="text-text-secondary">
          Every other line on the army warrant officer requirements checklist is
          workable around your situation, but the GT is the one you control with
          study. If you are still enlisted and sitting below GT 110, that is the
          first thing to build. Read how the{" "}
          <Link
            href="/army-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Army ASVAB score
          </Link>{" "}
          system works and where the warrant track fits in the broader{" "}
          <Link
            href="/army-mos-list"
            className="text-accent hover:text-accent-hover"
          >
            Army MOS list
          </Link>
          , then put your study time where it moves the GT.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Technical track equals about 6 years. Aviation track equals 10 years
            after flight school. Same warrant rank, very different commitment.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army Warrant Officer FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What GT score do you need for Army warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              You need a GT (General Technical) score of 110 or higher, and it is
              non-waiverable. GT is the sum of your Verbal Expression and
              Arithmetic Reasoning scores (GT = VE + AR). Run your subtest numbers
              through the{" "}
              <Link
                href="/gt-score-calculator"
                className="text-accent hover:text-accent-hover"
              >
                GT score calculator
              </Link>{" "}
              to see where you stand against the 110 line.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can a civilian become an Army warrant officer with no prior
              service?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Only two specialties allow it: 153A Rotary Wing Aviator through
              Warrant Officer Flight Training (Street to Seat) and 170A Cyber
              Warfare Technician through direct accession. Every other warrant
              track requires you to already be an enlisted soldier with
              experience in a related field.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Do you need a college degree to be a warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. A high school diploma or GED is the education floor, and no
              warrant officer MOS requires a bachelor&apos;s degree. That is a
              key difference from the OCS and ROTC commissioning paths, which both
              require a four-year degree.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the age limit for Army warrant officer?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              For most technical specialties, you must be 46 or younger before
              your packet is boarded, with case-by-case waivers possible. For
              153A aviation, the limit is 32 for enlisted applicants (33 for
              civilian WOFT), plus an 8-year Active Federal Service cap for
              enlisted soldiers.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How long is Warrant Officer Candidate School?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The active-component WOCS course runs about five weeks at Fort
              Novosel, Alabama (formerly Fort Rucker). Reserve and National Guard
              candidates complete a two-phase version split between drill-period
              training and a resident phase. Graduates are appointed Warrant
              Officer 1.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is warrant officer the same as OCS?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. OCS and ROTC commission you as a lieutenant and require a
              bachelor&apos;s degree. The warrant officer path is an appointment
              from the enlisted ranks, decided by an application packet and a
              selection board, with no degree required. You meet the Army&apos;s{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                ASVAB requirements
              </Link>{" "}
              and apply by MOS.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What if my GT score is below 110?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Retake the ASVAB. Active-duty soldiers test through the{" "}
              <Link href="/afct" className="text-accent hover:text-accent-hover">
                AFCT
              </Link>
              , and the Army&apos;s free BSEP program helps raise weak verbal and
              math scores, the exact areas that feed your GT. Drill the right
              subtests with a{" "}
              <Link
                href="/practice-test"
                className="text-accent hover:text-accent-hover"
              >
                practice test
              </Link>{" "}
              before you retest so the higher score sticks.
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
