import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Army MOS List 2026: Every Enlisted Job with ASVAB Scores | ASVAB Hero",
  description:
    "Complete Army MOS list with ASVAB line score requirements, all 10 composite formulas, FY26 bonuses up to $50K, and the warrant officer track by Career Management Field.",
  alternates: {
    canonical: "https://asvabhero.com/army-mos-list",
  },
};

export default function ArmyMOSListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Army MOS List 2026: Every Enlisted Job with ASVAB Score Requirements",
          description:
            "Complete Army MOS list with ASVAB line score requirements, all 10 composite formulas, FY26 bonuses up to $50K, and the warrant officer track by Career Management Field.",
          url: "https://asvabhero.com/army-mos-list",
          author: {
            "@type": "Organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-03-21",
          dateModified: "2026-03-21",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What Army MOS requires the highest ASVAB score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "25S Satellite Communication Systems Operator-Maintainer requires EL:117, the highest single line score for any enlisted Army MOS. 17C Cyber Operations Specialist is the hardest overall: GT:110, ST:112, a passing ICTL score, plus TS/SCI clearance eligibility.",
              },
            },
            {
              "@type": "Question",
              name: "What is a GT score and why does it matter most in the Army?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT (General Technical) equals VE + AR, derived from Word Knowledge, Paragraph Comprehension, and Arithmetic Reasoning. It gates more Army MOSs than any other line score. A GT of 110 or higher opens the majority of high-value career paths.",
              },
            },
            {
              "@type": "Question",
              name: "Can I change my MOS after enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, through reclassification at the reenlistment window. You must meet the line score requirements for the new MOS and it must have open slots. Some MOSs like 31D CID are reclassification-only and cannot be selected at initial enlistment.",
              },
            },
            {
              "@type": "Question",
              name: "What happens if I sign an open contract?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Army assigns you whatever MOS it needs filled based on your line scores and available training seats. You have no control. Open contracts disproportionately fill hard-to-recruit MOSs. Retake the ASVAB before accepting an open contract.",
              },
            },
            {
              "@type": "Question",
              name: "What are legacy subtests and why do they affect CO, FA, MM, and OF?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "NO (Numerical Operations) and CS (Coding Speed) were removed from the CAT-ASVAB but still appear in CO, FA, MM, and OF formulas. The Army substitutes population-average dummy scores. You cannot raise these four composites independently. Focus on AR, MK, GS, AS, MC, and EI.",
              },
            },
            {
              "@type": "Question",
              name: "How do I qualify for Army Special Forces (Green Berets)?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Enlist under the 18X contract (GT:110 plus CO:100). The pipeline includes Infantry OSUT, Airborne School, SFAS selection, and the Q Course across six phases including language training. Total timeline is 2.5 to 3 years. If you do not complete the pipeline, the Army reclassifies you.",
              },
            },
            {
              "@type": "Question",
              name: "Which Army MOSs have the best enlistment bonuses in 2026?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The highest bonuses (up to $50K for 6-year contracts) go to hard-to-fill MOSs: 12D Diver, 25S Satellite Comm, 18X SF, 35M/35P linguists, 94S/94Y electronic maintenance. All require line scores above 100 or a separate qualifying test. Quick-ship bonuses add $1K-$10K.",
              },
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army MOS List 2026: Every Enlisted Job with ASVAB Score Requirements
        </h1>

        <p className="mt-4 text-text-secondary">
          The Army has over 140 enlisted Military Occupational Specialties, but
          most guides only list the &ldquo;top 15 coolest jobs.&rdquo; Your
          ASVAB score narrows the full <strong>Army MOS list</strong> to 40-60
          jobs you actually qualify for. The difference between a guaranteed MOS
          contract and an open contract comes down to knowing which line scores
          matter.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              140+ Enlisted MOSs
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Spanning combat, tech, medical, intel, and support fields
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              10 Line Scores
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Composites calculated from your ASVAB subtests that gate every MOS
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              28 Career Management Fields
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              How the Army organizes MOSs into career tracks
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Your AFQT score is just the entry ticket: 31 minimum to enlist (50
          for GED holders). Line scores determine which MOS doors open once you
          are inside.
        </p>
        <p className="text-text-secondary">
          GT (General Technical) is the most important Army line score. It gates
          more MOSs than any other composite, including every technical,
          intelligence, Special Forces, and medical role.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Enter your ASVAB subtest scores at{" "}
            <Link href="/calculator" className="text-accent hover:text-accent-hover">
              /calculator
            </Link>{" "}
            to see your Army line scores and which MOSs you qualify for right
            now.
          </p>
        </aside>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. Army Line Score Formulas: All 10 Composites Explained
        </h2>

        <p className="mt-4 text-text-secondary">
          Bookmark this section. You will reference it constantly when comparing
          MOS requirements throughout this page.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR<br />
          CL = VE + AR + MK<br />
          CO = AR + CS + AS + MC<br />
          EL = GS + AR + MK + EI<br />
          FA = AR + CS + MK + MC<br />
          GM = GS + AS + MK + EI<br />
          MM = NO + AS + MC + EI<br />
          OF = VE + NO + AS + MC<br />
          SC = VE + AR + AS + MC<br />
          ST = GS + VE + MK + MC
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) is a combined standard score derived from Word
          Knowledge and Paragraph Comprehension. It is not a subtest you take
          separately.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            CO, FA, MM, and OF use NO (Numerical Operations) or CS (Coding
            Speed), subtests no longer on the CAT-ASVAB. The Army substitutes
            population-average dummy scores. You cannot independently maximize
            these four composites. Focus on AR, MK, GS, WK, PC, EI, AS, and MC.
          </p>
        </aside>

        <p className="text-text-secondary">
          GT equals VE + AR. Every Cyber, Intel, Special Forces, and advanced
          medical MOS requires GT above 100. If you only have time to study two
          areas, study verbal reasoning and arithmetic.
        </p>
        <p className="text-text-secondary">
          Line scores typically range from 85 to 145. The most competitive MOSs
          require GT:110 or higher. The single highest requirement is 25S
          Satellite Communications at EL:117.
        </p>
        <p className="text-text-secondary">
          For a breakdown of how subtests convert to composites, see{" "}
          <Link
            href="/asvab-scores-explained"
            className="text-accent hover:text-accent-hover"
          >
            /asvab-scores-explained
          </Link>
          . To calculate your own scores, use the{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            /calculator
          </Link>
          .
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. How the Army Assigns Your MOS: Guaranteed Contract vs. Open
          Enrollment
        </h2>

        <p className="mt-4 text-text-secondary">
          Three distinct paths determine whether you control your career or the
          Army controls it for you.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Guaranteed MOS
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You choose a specific MOS before enlistment, locked into your
              contract by name
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Enlistment Option
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              You choose a CMF category, and the Army assigns a specific MOS
              within it
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Open Contract
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              The Army assigns your MOS based on its needs, your scores, and
              available slots
            </p>
          </div>
        </div>

        <p className="text-text-secondary">
          Guaranteed MOS contracts are negotiated at MEPS. Your line scores must
          meet the minimum, and higher scores give you priority when class seats
          are limited.
        </p>
        <p className="text-text-secondary">
          TAPAS (Tailored Adaptive Personality Assessment System) is a
          120-question personality test taken at MEPS. It measures personality
          traits, not knowledge. You cannot study for it. TAPAS affects
          eligibility for certain fields including Special Forces and
          intelligence.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Never sign an open contract unless you genuinely do not care which
            MOS you get. Open contracts fill high-need MOSs the Army cannot fill
            otherwise. If your scores fall short, retake the ASVAB (30-day wait
            for first retest). Get a guaranteed contract. Use{" "}
            <Link
              href="/practice-test"
              className="text-accent hover:text-accent-hover"
            >
              /practice-test
            </Link>{" "}
            to prepare.
          </p>
        </aside>

        <p className="text-text-secondary">
          A recruit with GT:120 targeting 35F Intelligence Analyst (ST:101) has
          a stronger position than someone at exactly 101. Score higher than you
          need to.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. CMF 11 Infantry and CMF 19 Armor: Combat Arms
        </h2>

        <p className="mt-4 text-text-secondary">
          Infantry and Armor share the exact same line score requirement: CO:87.
          CO uses the legacy CS (Coding Speed) subtest, so the Army substitutes
          a dummy score. The inputs you actually control are AR, AS, and MC.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">11B</td>
                <td className="py-2 pr-4">Infantryman</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Most available slots in the Army</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">11C</td>
                <td className="py-2 pr-4">Indirect Fire Infantryman</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Mortars specialty</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">11X</td>
                <td className="py-2 pr-4">Infantry Enlistment Option</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Assigned 11B or 11C after OSUT</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">19D</td>
                <td className="py-2 pr-4">Cavalry Scout</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Reconnaissance focus</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">19K</td>
                <td className="py-2 pr-4">M1 Armor Crewmember</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Abrams tank crew</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            ATI 2025 is converting 14 Infantry Brigade Combat Teams to Mobile
            BCTs. Infantry is not shrinking. It is modernizing. A new robotics
            and autonomous systems skill identifier is being created, and
            infantry soldiers will be among the first to integrate these
            capabilities.
          </p>
        </aside>

        <p className="text-text-secondary">
          CO:87 is attainable for most recruits who pass the AFQT minimum. These
          MOSs have the most open slots, making guaranteed contracts easy to
          secure. Recruits aiming for Special Forces (18X) start with infantry
          training (see Section 8).
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. CMF 12/13/14: Engineers, Field Artillery, and Air Defense
        </h2>

        <p className="mt-4 text-text-secondary">
          12D Army Diver requires three simultaneous line scores: GM:98, GT:107,
          and ST:106. 12P Prime Power is even harder at GT:110, EL:107, and
          ST:107.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12B</td>
                <td className="py-2 pr-4">Combat Engineer</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Breaching, demolitions</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12C</td>
                <td className="py-2 pr-4">Bridge Crewmember</td>
                <td className="py-2 pr-4 font-mono">CO:87</td>
                <td className="py-2">Gap crossing operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12D</td>
                <td className="py-2 pr-4">Diver</td>
                <td className="py-2 pr-4 font-mono">GM:98 + GT:107 + ST:106</td>
                <td className="py-2">Triple requirement</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12K</td>
                <td className="py-2 pr-4">Plumber</td>
                <td className="py-2 pr-4 font-mono">GM:88</td>
                <td className="py-2">Utilities</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12M</td>
                <td className="py-2 pr-4">Firefighter</td>
                <td className="py-2 pr-4 font-mono">GM:88</td>
                <td className="py-2">Installation fire departments</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12N</td>
                <td className="py-2 pr-4">Horizontal Construction Engineer</td>
                <td className="py-2 pr-4 font-mono">GM:88</td>
                <td className="py-2">Heavy equipment</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12P</td>
                <td className="py-2 pr-4">Prime Power Production Specialist</td>
                <td className="py-2 pr-4 font-mono">GT:110 + EL:107 + ST:107</td>
                <td className="py-2">Hardest engineer MOS</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12R</td>
                <td className="py-2 pr-4">Interior Electrician</td>
                <td className="py-2 pr-4 font-mono">EL:93</td>
                <td className="py-2">Electrical systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12T</td>
                <td className="py-2 pr-4">Technical Engineer</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2">Survey and design</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12W</td>
                <td className="py-2 pr-4">Carpentry and Masonry Specialist</td>
                <td className="py-2 pr-4 font-mono">GM:88</td>
                <td className="py-2">Construction</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12Y</td>
                <td className="py-2 pr-4">Geospatial Engineer</td>
                <td className="py-2 pr-4 font-mono">GT:100 + ST:100</td>
                <td className="py-2">Mapping and terrain analysis</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13B</td>
                <td className="py-2 pr-4">Cannon Crewmember</td>
                <td className="py-2 pr-4 font-mono">FA:93</td>
                <td className="py-2">Howitzer operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13F</td>
                <td className="py-2 pr-4">Joint Fire Support Specialist</td>
                <td className="py-2 pr-4 font-mono">FA:96</td>
                <td className="py-2">Calls for fire</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13J</td>
                <td className="py-2 pr-4">Fire Control Specialist</td>
                <td className="py-2 pr-4 font-mono">FA:93</td>
                <td className="py-2">Fire direction center</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13M</td>
                <td className="py-2 pr-4">MLRS/HIMARS Crewmember</td>
                <td className="py-2 pr-4 font-mono">OF:95</td>
                <td className="py-2">Long-range precision fires</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13R</td>
                <td className="py-2 pr-4">Firefinder Radar Operator</td>
                <td className="py-2 pr-4 font-mono">SC:98</td>
                <td className="py-2">Counter-battery radar</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13S</td>
                <td className="py-2 pr-4">Field Artillery Surveyor</td>
                <td className="py-2 pr-4 font-mono">ST:95</td>
                <td className="py-2">Survey and met</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">13T</td>
                <td className="py-2 pr-4">FA Surveyor/Met Crewmember</td>
                <td className="py-2 pr-4 font-mono">EL:93</td>
                <td className="py-2">Meteorological data</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">14E</td>
                <td className="py-2 pr-4">Patriot Fire Control Operator</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2">Air defense</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">14G</td>
                <td className="py-2 pr-4">Air Defense BMS Operator</td>
                <td className="py-2 pr-4 font-mono">MM:99 + GT:98</td>
                <td className="py-2">Battle management</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">14H</td>
                <td className="py-2 pr-4">Enhanced Early Warning Operator</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2">Sensor operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">14P</td>
                <td className="py-2 pr-4">Air and Missile Defense Crewmember</td>
                <td className="py-2 pr-4 font-mono">MM:99</td>
                <td className="py-2">Short-range air defense</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">14T</td>
                <td className="py-2 pr-4">Patriot Launching Station Operator</td>
                <td className="py-2 pr-4 font-mono">OF:95</td>
                <td className="py-2">Launcher operations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            HIMARS is one of the most high-profile weapons systems in the Army
            right now. 13M (MLRS/HIMARS Crewmember, OF:95) is expanding as the
            Army invests in long-range precision fires. If you score OF:95 or
            higher, this career path has growing slots and frequent bonus
            eligibility.
          </p>
        </aside>

        <p className="text-text-secondary">
          FA = AR + CS + MK + MC. CS (Coding Speed) is a legacy dummy score,
          carrying the same limitation as CO.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. CMF 15 Aviation and CMF 17 Cyber: High-Tech Paths
        </h2>

        <p className="mt-4 text-text-secondary">
          17C Cyber Operations Specialist requires GT:110 AND ST:112 AND a
          passing ICTL score AND TS/SCI clearance, making it the most demanding
          enlisted MOS in the Army.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clearance
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15B</td>
                <td className="py-2 pr-4">Aircraft Powerplant Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Engine systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15D</td>
                <td className="py-2 pr-4">Aircraft Powertrain Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Drive train systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15E</td>
                <td className="py-2 pr-4">UAS Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:93 + MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Drone maintenance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15F</td>
                <td className="py-2 pr-4">Aircraft Electrician</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Electrical systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15G</td>
                <td className="py-2 pr-4">Aircraft Structural Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Airframe repair</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15H</td>
                <td className="py-2 pr-4">Aircraft Pneudraulics Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Hydraulic systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15N</td>
                <td className="py-2 pr-4">Avionic Mechanic</td>
                <td className="py-2 pr-4 font-mono">EL:93</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Avionics</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15P</td>
                <td className="py-2 pr-4">Aviation Operations Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Flight ops</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15Q</td>
                <td className="py-2 pr-4">Air Traffic Control Operator</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">ATC</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15R</td>
                <td className="py-2 pr-4">AH-64 Attack Helicopter Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Apache specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15T</td>
                <td className="py-2 pr-4">UH-60 Black Hawk Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Black Hawk specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15U</td>
                <td className="py-2 pr-4">CH-47 Chinook Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:104</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Chinook specific</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15W</td>
                <td className="py-2 pr-4">Unmanned Aircraft Systems Operator</td>
                <td className="py-2 pr-4 font-mono">SC:102</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Fastest-growing MOS</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">15Y</td>
                <td className="py-2 pr-4">AH-64D Armament/Electrical/Avionics Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:105 + EL:100</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2">Highest aviation req</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">17C</td>
                <td className="py-2 pr-4">Cyber Operations Specialist</td>
                <td className="py-2 pr-4 font-mono">GT:110 + ST:112 + ICTL:60</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">Most demanding MOS</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">17E</td>
                <td className="py-2 pr-4">Electronic Warfare Specialist</td>
                <td className="py-2 pr-4 font-mono">SC:105 + EL:105 + ST:105</td>
                <td className="py-2 pr-4">Top Secret</td>
                <td className="py-2">Triple composite</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            17C requires the ICTL (Information and Communications Technology
            Literacy) test at MEPS. This is a separate computer-based assessment
            measuring basic IT concepts, completely independent from the ASVAB.
            You cannot improve your ICTL score by studying ASVAB subtests.
            Request it specifically when scheduling your MEPS visit.
          </p>
        </aside>

        <p className="text-text-secondary">
          15W Unmanned Aircraft Systems Operator (SC:102) is one of the
          fastest-growing MOSs. Strong civilian crossover to commercial UAV
          operations ($65K-$95K for 15-series FAA certifications, $90K-$140K for
          17C cybersecurity roles).
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. CMF 25 Signal Corps: The Army&apos;s Largest Tech Field
        </h2>

        <p className="mt-4 text-text-secondary">
          25S Satellite Communications requires EL:117, the single highest line
          score requirement on the <strong>Army MOS list</strong>. EL equals GS
          + AR + MK + EI, meaning four subtests must all perform at a high level
          simultaneously.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25B</td>
                <td className="py-2 pr-4">IT Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:95</td>
                <td className="py-2">Entry-level IT</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25C</td>
                <td className="py-2 pr-4">Radio Operator-Maintainer</td>
                <td className="py-2 pr-4 font-mono">EL:93</td>
                <td className="py-2">Tactical comms</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25D</td>
                <td className="py-2 pr-4">Cyber Network Defender</td>
                <td className="py-2 pr-4 font-mono">GT:105 + ST:105</td>
                <td className="py-2">Defensive cyber</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25E</td>
                <td className="py-2 pr-4">Electromagnetic Spectrum Manager</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Spectrum ops</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25H</td>
                <td className="py-2 pr-4">Network Comm Systems Specialist</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Network infrastructure</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25L</td>
                <td className="py-2 pr-4">Cable Systems Installer-Maintainer</td>
                <td className="py-2 pr-4 font-mono">EL:89</td>
                <td className="py-2">Lowest Signal req</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25M</td>
                <td className="py-2 pr-4">Multimedia Illustrator</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Visual information</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25N</td>
                <td className="py-2 pr-4">Nodal Network Systems Operator</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Network nodes</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25P</td>
                <td className="py-2 pr-4">Microwave Systems Operator</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Microwave links</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25Q</td>
                <td className="py-2 pr-4">Multichannel Transmission Operator</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Transmission systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25R</td>
                <td className="py-2 pr-4">Visual Info Equipment Operator</td>
                <td className="py-2 pr-4 font-mono">EL:93</td>
                <td className="py-2">AV equipment</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25S</td>
                <td className="py-2 pr-4">Satellite Comm Systems Operator</td>
                <td className="py-2 pr-4 font-mono">EL:117</td>
                <td className="py-2">Highest score in Army</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25U</td>
                <td className="py-2 pr-4">Signal Support Systems Specialist</td>
                <td className="py-2 pr-4 font-mono">EL:93</td>
                <td className="py-2">Unit-level signal</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">25V</td>
                <td className="py-2 pr-4">Combat Documentation Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91 + EL:93</td>
                <td className="py-2">Documentation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            25S is a high-demand quick-ship MOS with frequent bonus eligibility.
            EL:117 is a genuine filter the Army struggles to fill. If you hit it,
            expect strong bonus potential and a career translating to satellite
            and telecom engineering ($75K-$110K civilian).
          </p>
        </aside>

        <p className="text-text-secondary">
          25B IT Specialist (ST:95) is the entry-level tech path. If your scores
          land in the ST:95-105 range, start with 25B and work toward
          reclassification to 25D Cyber Network Defender (GT:105 + ST:105) or
          lateral move to 17C.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. CMF 35 Military Intelligence: ST and GT Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Every 35-series MOS requires Secret or TS/SCI clearance. 35M HUMINT
          Collector and 35P Cryptologic Linguist skip ASVAB line scores entirely
          and require DLAB:107, a separate language aptitude test.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Clearance
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35F</td>
                <td className="py-2 pr-4">Intelligence Analyst</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Entry-level intel</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35G</td>
                <td className="py-2 pr-4">Geospatial Intel Imagery Analyst</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">GEOINT</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35L</td>
                <td className="py-2 pr-4">Counterintelligence Agent</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">CI operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35M</td>
                <td className="py-2 pr-4">Human Intelligence Collector</td>
                <td className="py-2 pr-4 font-mono">DLAB:107</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">No ASVAB line score</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35N</td>
                <td className="py-2 pr-4">Signals Intelligence Analyst</td>
                <td className="py-2 pr-4 font-mono">ST:112</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">SIGINT analysis</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35P</td>
                <td className="py-2 pr-4">Cryptologic Linguist</td>
                <td className="py-2 pr-4 font-mono">DLAB:107</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">Language specialist</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35Q</td>
                <td className="py-2 pr-4">Cryptologic Network Warfare Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:112</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">Network exploitation</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35S</td>
                <td className="py-2 pr-4">Signals Collector/Analyst</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2 pr-4">TS/SCI</td>
                <td className="py-2">Collection ops</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">35T</td>
                <td className="py-2 pr-4">MI Systems Maintainer</td>
                <td className="py-2 pr-4 font-mono">ST:112</td>
                <td className="py-2 pr-4">Secret</td>
                <td className="py-2">Systems maintenance</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The DLAB (Defense Language Aptitude Battery) is NOT part of the
            ASVAB. It tests your ability to learn a new language using an
            invented grammatical system. You cannot study vocabulary for it.
            Score 107+ to qualify for 35M and 35P. Request DLAB testing
            separately at MEPS.
          </p>
        </aside>

        <p className="text-text-secondary">
          35N Signals Intelligence Analyst (ST:112) ties 17C Cyber for the
          highest ST requirement and feeds directly into NSA and DIA careers.
        </p>
        <p className="text-text-secondary">
          TS/SCI investigations take 6 to 18 months. Foreign contacts, drug
          history, and financial problems are disqualifiers. Know your clearance
          eligibility before targeting any intel MOS.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          8. CMF 68 Army Medical and CMF 18 Special Forces
        </h2>

        <p className="mt-4 text-text-secondary">
          68W Combat Medic requires ST:101 AND GT:107, a harder dual-score
          requirement than Infantry&apos;s single CO:87. Meanwhile 18X Special
          Forces Candidate needs GT:110 plus CO:100, with bonuses up to
          $40K-$42K.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68A</td>
                <td className="py-2 pr-4">Biomedical Equipment Specialist</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">Medical device repair</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68C</td>
                <td className="py-2 pr-4">Practical Nursing Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:101</td>
                <td className="py-2">LPN equivalent</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68D</td>
                <td className="py-2 pr-4">Operating Room Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Surgical support</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68E</td>
                <td className="py-2 pr-4">Dental Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Dental care</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68G</td>
                <td className="py-2 pr-4">Patient Administration Specialist</td>
                <td className="py-2 pr-4 font-mono">CL:90</td>
                <td className="py-2">Medical records</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68K</td>
                <td className="py-2 pr-4">Medical Laboratory Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:106</td>
                <td className="py-2">Lab analysis</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68P</td>
                <td className="py-2 pr-4">Radiology Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:106</td>
                <td className="py-2">Imaging</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68T</td>
                <td className="py-2 pr-4">Animal Care Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Veterinary support</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68W</td>
                <td className="py-2 pr-4">Combat Medic Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:101 + GT:107</td>
                <td className="py-2">EMT certification included</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">68X</td>
                <td className="py-2 pr-4">Behavioral Health Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:101 + GT:107</td>
                <td className="py-2">Mental health support</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">18X</td>
                <td className="py-2 pr-4">Special Forces Candidate</td>
                <td className="py-2 pr-4 font-mono">GT:110 + CO:100</td>
                <td className="py-2">Enlistment option only</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            18X is not a guaranteed MOS. It is a guaranteed shot at trying out.
            If you wash out of SFAS or the Q Course, the Army reclassifies you.
            You could end up as 11B Infantryman or whatever the Army needs. Go in
            with eyes open.
          </p>
        </aside>

        <p className="text-text-secondary">
          68W training includes EMT certification ($45K-$75K civilian starting
          salary). CMF 68 has over 20 MOSs spanning nursing, radiology, dental,
          behavioral health, veterinary, and lab work. Score requirements range
          from ST:91 to EL:107.
        </p>
        <p className="text-text-secondary">
          The 18X pipeline runs 2.5 to 3 years: Infantry OSUT, Airborne School,
          SFAS selection, then the Q Course across six phases including language
          training.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          9. CMF 89/91/94: EOD, Mechanical, and Electronic Maintenance
        </h2>

        <p className="mt-4 text-text-secondary">
          The 91-series has the lowest dual-requirement bar in the Army at MM:87
          plus GT:85, making it one of the most accessible paths for recruits
          who scored well on mechanical subtests. The 94-series jumps to
          EL:102-107, placing those MOSs in Signal Corps difficulty territory.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">89A</td>
                <td className="py-2 pr-4">Ammunition Stock Control</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Ammo management</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">89B</td>
                <td className="py-2 pr-4">Ammunition Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Ammo handling</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">89D</td>
                <td className="py-2 pr-4">EOD Specialist</td>
                <td className="py-2 pr-4 font-mono">GM:105</td>
                <td className="py-2">One of most selective combat MOSs</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91A</td>
                <td className="py-2 pr-4">M1 Abrams Maintainer</td>
                <td className="py-2 pr-4 font-mono">MM:88 + GT:85</td>
                <td className="py-2">Tank systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91B</td>
                <td className="py-2 pr-4">Wheeled Vehicle Mechanic</td>
                <td className="py-2 pr-4 font-mono">MM:87 + GT:85</td>
                <td className="py-2">Most common mechanic MOS</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91C</td>
                <td className="py-2 pr-4">Utilities Equipment Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:87 + GT:85</td>
                <td className="py-2">HVAC and utilities</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91D</td>
                <td className="py-2 pr-4">Power-Gen Equipment Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:93 + GT:85</td>
                <td className="py-2">Generators</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91F</td>
                <td className="py-2 pr-4">Small Arms/Artillery Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:87 + GT:85</td>
                <td className="py-2">Weapons repair</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91H</td>
                <td className="py-2 pr-4">Track Vehicle Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:87 + GT:85</td>
                <td className="py-2">Tracked vehicles</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91J</td>
                <td className="py-2 pr-4">QM and Chemical Equipment Repairer</td>
                <td className="py-2 pr-4 font-mono">GM:88</td>
                <td className="py-2">Specialized repair</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91L</td>
                <td className="py-2 pr-4">Construction Equipment Repairer</td>
                <td className="py-2 pr-4 font-mono">MM:87 + GT:85</td>
                <td className="py-2">Heavy equipment</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91M</td>
                <td className="py-2 pr-4">Bradley Maintainer</td>
                <td className="py-2 pr-4 font-mono">MM:88 + GT:85</td>
                <td className="py-2">IFV systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91P</td>
                <td className="py-2 pr-4">Artillery Mechanic</td>
                <td className="py-2 pr-4 font-mono">MM:88 + GT:85</td>
                <td className="py-2">Artillery systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">91S</td>
                <td className="py-2 pr-4">Stryker Systems Maintainer</td>
                <td className="py-2 pr-4 font-mono">MM:87 + GT:85</td>
                <td className="py-2">Stryker platform</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94A</td>
                <td className="py-2 pr-4">Land Combat Missile System Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Missile electronics</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94D</td>
                <td className="py-2 pr-4">ATC Equipment Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Air traffic systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94E</td>
                <td className="py-2 pr-4">Radio/COMSEC Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Communications security</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94F</td>
                <td className="py-2 pr-4">Computer/Detection Systems Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Computer systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94H</td>
                <td className="py-2 pr-4">TMDE Support Specialist</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">Test equipment</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94M</td>
                <td className="py-2 pr-4">Radar Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">Radar systems</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94P</td>
                <td className="py-2 pr-4">MLRS Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Rocket system repair</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94R</td>
                <td className="py-2 pr-4">Avionic/Survivability Equipment Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:102</td>
                <td className="py-2">Aviation electronics</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94S</td>
                <td className="py-2 pr-4">Patriot System Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">High-demand quick-ship</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">94Y</td>
                <td className="py-2 pr-4">IFTE Operator and Maintainer</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">High-demand quick-ship</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            94S Patriot System Repairer and 94Y IFTE Operator are high-demand
            quick-ship MOSs. EL:107 is the gate. If you hit it, bonuses are
            frequent and ship dates are fast.
          </p>
        </aside>

        <p className="text-text-secondary">
          Civilian translations: 91B leads to ASE-certified auto tech
          ($40K-$65K), 94-series to electronics technician ($55K-$85K), 89D EOD
          to federal bomb tech ($80K-$120K).
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          10. CMF 31/36/37/38/42/46/56/88/92: Military Police, Finance, and
          Support
        </h2>

        <p className="mt-4 text-text-secondary">
          If your GT score falls short of 110, do not default to open contract.
          These support CMFs have the most guaranteed-contract slots and
          translate directly to civilian careers in law enforcement, HR,
          logistics, and finance.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS Code
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Line Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">31B</td>
                <td className="py-2 pr-4">Military Police</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Entry-level law enforcement</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">31D</td>
                <td className="py-2 pr-4">CID Special Agent</td>
                <td className="py-2 pr-4 font-mono">ST:107 + GT:110</td>
                <td className="py-2">Federal investigator equivalent</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">31E</td>
                <td className="py-2 pr-4">Internment/Resettlement Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:95</td>
                <td className="py-2">Detention operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">31K</td>
                <td className="py-2 pr-4">Military Working Dog Handler</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">K-9 operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">36B</td>
                <td className="py-2 pr-4">Financial Management Technician</td>
                <td className="py-2 pr-4 font-mono">CL:101</td>
                <td className="py-2">Army finance</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">37F</td>
                <td className="py-2 pr-4">PSYOP Specialist</td>
                <td className="py-2 pr-4 font-mono">GT:107</td>
                <td className="py-2">Airborne required</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">38B</td>
                <td className="py-2 pr-4">Civil Affairs Specialist</td>
                <td className="py-2 pr-4 font-mono">GT:107</td>
                <td className="py-2">Airborne required</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">42A</td>
                <td className="py-2 pr-4">Human Resources Specialist</td>
                <td className="py-2 pr-4 font-mono">GT:100 + CL:90</td>
                <td className="py-2">Army HR</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">46Q</td>
                <td className="py-2 pr-4">Public Affairs Specialist</td>
                <td className="py-2 pr-4 font-mono">GT:107</td>
                <td className="py-2">Media and comms</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">56M</td>
                <td className="py-2 pr-4">Religious Affairs Specialist</td>
                <td className="py-2 pr-4 font-mono">CL:90</td>
                <td className="py-2">Chapel operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">88K</td>
                <td className="py-2 pr-4">Watercraft Operator</td>
                <td className="py-2 pr-4 font-mono">MM:99</td>
                <td className="py-2">Army boats</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">88M</td>
                <td className="py-2 pr-4">Motor Transport Operator</td>
                <td className="py-2 pr-4 font-mono">OF:85</td>
                <td className="py-2">Truck driver</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">88N</td>
                <td className="py-2 pr-4">Transportation Management Coordinator</td>
                <td className="py-2 pr-4 font-mono">CL:95</td>
                <td className="py-2">Logistics planning</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">92A</td>
                <td className="py-2 pr-4">Automated Logistical Specialist</td>
                <td className="py-2 pr-4 font-mono">CL:90</td>
                <td className="py-2">Supply chain</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">92F</td>
                <td className="py-2 pr-4">Petroleum Supply Specialist</td>
                <td className="py-2 pr-4 font-mono">OF:85</td>
                <td className="py-2">Fuel operations</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">92G</td>
                <td className="py-2 pr-4">Culinary Specialist</td>
                <td className="py-2 pr-4 font-mono">OF:85</td>
                <td className="py-2">Food service</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">92L</td>
                <td className="py-2 pr-4">Petroleum Laboratory Specialist</td>
                <td className="py-2 pr-4 font-mono">ST:91</td>
                <td className="py-2">Fuel testing</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">92R</td>
                <td className="py-2 pr-4">Parachute Rigger</td>
                <td className="py-2 pr-4 font-mono">GM:90 + CO:90</td>
                <td className="py-2">Airborne support</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">92W</td>
                <td className="py-2 pr-4">Water Treatment Specialist</td>
                <td className="py-2 pr-4 font-mono">GM:88</td>
                <td className="py-2">Water purification</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">92Y</td>
                <td className="py-2 pr-4">Unit Supply Specialist</td>
                <td className="py-2 pr-4 font-mono">CL:90</td>
                <td className="py-2">Unit-level supply</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Score requirements here range from OF:85 (88M Motor Transport, 92G
          Culinary) to GT:110 (31D CID), the widest score spread on this Army
          MOS list.
        </p>
        <p className="text-text-secondary">
          37F PSYOP and 38B Civil Affairs both require Airborne qualification and
          GT:107. Higher scores improve your chances.
        </p>
        <p className="text-text-secondary">
          31B Military Police (ST:91) is entry-level law enforcement. 31D CID
          Special Agent (ST:107 + GT:110) is a federal criminal investigator role
          and one of the most competitive reclassification MOSs. Check your
          scores at{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">
            /calculator
          </Link>{" "}
          to see where you land.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          11. FY26 Enlistment Bonuses, Warrant Officer Track, and the 18X
          Pipeline
        </h2>

        <p className="mt-4 text-text-secondary">
          Higher ASVAB scores translate directly to larger signing bonuses. Every
          high-bonus MOS on this <strong>Army MOS list</strong> requires line
          scores above 100 or a separate qualifying test like the DLAB or ICTL.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Contract Length
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Max Bonus
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3 years</td>
                <td className="py-2">$25,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">4 years</td>
                <td className="py-2">$40,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">5 years</td>
                <td className="py-2">$45,000</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">6 years</td>
                <td className="py-2">$50,000</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Quick Ship (within 30 days)</td>
                <td className="py-2">Adds $1K-$10K</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Score Req
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Typical Bonus Range
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">12D</td>
                <td className="py-2 pr-4">Diver</td>
                <td className="py-2 pr-4 font-mono">GM:98 + GT:107 + ST:106</td>
                <td className="py-2">Up to $50K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">18X</td>
                <td className="py-2 pr-4">SF Candidate</td>
                <td className="py-2 pr-4 font-mono">GT:110 + CO:100</td>
                <td className="py-2">$40K-$42K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">25S</td>
                <td className="py-2 pr-4">Satellite Comm</td>
                <td className="py-2 pr-4 font-mono">EL:117</td>
                <td className="py-2">Up to $50K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35M</td>
                <td className="py-2 pr-4">HUMINT Collector</td>
                <td className="py-2 pr-4 font-mono">DLAB:107</td>
                <td className="py-2">Up to $40K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">35P</td>
                <td className="py-2 pr-4">Cryptologic Linguist</td>
                <td className="py-2 pr-4 font-mono">DLAB:107</td>
                <td className="py-2">Up to $40K</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">94S</td>
                <td className="py-2 pr-4">Patriot Repairer</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">Up to $40K</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">94Y</td>
                <td className="py-2 pr-4">IFTE Operator</td>
                <td className="py-2 pr-4 font-mono">EL:107</td>
                <td className="py-2">Up to $40K</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The Army pays the most for roles it cannot fill. Every MOS on the
            high-bonus list requires line scores above 100 or a separate
            qualifying test. Higher ASVAB scores do not just open more career
            options. They open bigger paychecks on day one.
          </p>
        </aside>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  WO MOS
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Title
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Requirements
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">153A</td>
                <td className="py-2 pr-4">Rotary Wing Aviator</td>
                <td className="py-2">GT:110 + SIFT:40+ (Street to Seat program)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">170A</td>
                <td className="py-2 pr-4">Cyber Warfare Technician</td>
                <td className="py-2">GT:110 + TS/SCI + typically 17C experience</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">255A</td>
                <td className="py-2 pr-4">Information Services Technician</td>
                <td className="py-2">GT:110 + 4 years IT experience</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          Most Warrant Officer MOSs require 4 to 6 years of enlisted experience
          in a related CMF. The exception is 153A Rotary Wing Aviator: the
          Street to Seat program allows civilians to apply directly with GT:110
          and SIFT:40+.
        </p>
        <p className="text-text-secondary">
          ATI 2025 is reshaping force structure. Fourteen IBCTs are converting to
          Mobile BCTs, Air Cavalry Brigades are deactivating, and the 4th and
          54th SFABs are shutting down. 15W (UAV), 17C (Cyber), and 25-series
          (Signal) are best positioned for emerging robotics and autonomous
          systems capabilities.
        </p>
        <p className="text-text-secondary">
          For practice materials to push your line scores higher, visit{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover"
          >
            /practice-test
          </Link>
          . For{" "}
          <Link
            href="/army-ranks"
            className="text-accent hover:text-accent-hover"
          >
            Army ranks
          </Link>{" "}
          and how MOS connects to promotion timelines, see our ranks guide.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Army MOS List FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Army MOS requires the highest ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              25S Satellite Communication Systems Operator-Maintainer requires
              EL:117, the highest single line score for any enlisted Army MOS.
              17C Cyber Operations Specialist is the hardest overall: GT:110,
              ST:112, a passing ICTL score, plus TS/SCI clearance eligibility.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is a GT score and why does it matter most in the Army?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              GT (General Technical) equals VE + AR, derived from Word Knowledge,
              Paragraph Comprehension, and Arithmetic Reasoning. It gates more
              Army MOSs than any other line score. A GT of 110 or higher opens
              the majority of high-value career paths.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I change my MOS after enlisting?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, through reclassification at the reenlistment window. You must
              meet the line score requirements for the new MOS and it must have
              open slots. Some MOSs (like 31D CID) are reclassification-only and
              cannot be selected at initial enlistment.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What happens if I sign an open contract?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Army assigns you whatever MOS it needs filled based on your
              line scores and available training seats. You have no control. Open
              contracts disproportionately fill hard-to-recruit MOSs. Retake the
              ASVAB before accepting an open contract.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What are legacy subtests and why do they affect CO, FA, MM, and OF?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              NO (Numerical Operations) and CS (Coding Speed) were removed from
              the CAT-ASVAB but still appear in CO, FA, MM, and OF formulas. The
              Army substitutes population-average dummy scores. You cannot raise
              these four composites independently. Focus on AR, MK, GS, AS, MC,
              and EI.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How do I qualify for Army Special Forces (Green Berets)?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Enlist under the 18X contract (GT:110 + CO:100). The pipeline
              includes Infantry OSUT, Airborne School, SFAS selection, and the Q
              Course (six phases including language training). Total timeline: 2.5
              to 3 years. If you do not complete the pipeline, the Army
              reclassifies you. Use{" "}
              <Link
                href="/calculator"
                className="text-accent hover:text-accent-hover"
              >
                /calculator
              </Link>{" "}
              to verify your GT and CO scores.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Which Army MOSs have the best enlistment bonuses in 2026?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The highest bonuses (up to $50K for 6-year contracts) go to
              hard-to-fill MOSs: 12D Diver, 25S Satellite Comm, 18X SF, 35M/35P
              linguists, 94S/94Y electronic maintenance. All require line scores
              above 100 or a separate qualifying test. Quick-ship bonuses add
              $1K-$10K.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See Which Army MOSs You Qualify For
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your Army line scores
            and every MOS you qualify for across all 28 Career Management Fields.
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
