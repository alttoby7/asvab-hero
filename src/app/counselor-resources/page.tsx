import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import { TOPIC_COUNT } from "@/lib/bank-stats";

export const metadata: Metadata = {
  title: "ASVAB Counselor Quick-Start: Free Tools, Official Facts, and Sources",
  description:
    "A source-cited ASVAB reference for school counselors, librarians, and JROTC instructors, plus free tools you can link or embed for students: AFQT calculator, practice test, and study guides. No signup.",
  alternates: {
    canonical: "https://asvabhero.com/counselor-resources",
  },
};

// Free interactive tools ASVAB Hero offers that the official site does not.
// These are the genuinely linkable/embeddable assets for resource pages.
const FREE_TOOLS: { href: string; label: string; blurb: string }[] = [
  {
    href: "/calculator",
    label: "Free ASVAB score calculator",
    blurb:
      "Students enter subtest scores and see their AFQT percentile plus every job they qualify for across all 6 branches.",
  },
  {
    href: "/afqt-calculator",
    label: "AFQT calculator",
    blurb:
      "The 4-subtest enlistment-eligibility percentile, with 2026 branch minimums. Embeddable on your page.",
  },
  {
    href: "/practice-test",
    label: "Free ASVAB practice test",
    blurb: "A free diagnostic and per-subtest drills. No account required.",
  },
  {
    href: "/asvab-score-requirements",
    label: "Score requirements by branch",
    blurb: "Current AFQT minimums and how diploma vs GED changes the bar.",
  },
  {
    href: "/asvab-study-guide",
    label: "Study guides",
    blurb: `Free study guides covering all ${TOPIC_COUNT} ASVAB topics across the 9 subtests.`,
  },
];

const LAST_VERIFIED = "May 2026";

// Official sources only. Mirrored into the appendix at the bottom of the page.
const SOURCES: { label: string; url: string }[] = [
  { label: "Official ASVAB fact sheet", url: "https://www.officialasvab.com/applicants/fact-sheet/" },
  { label: "Official ASVAB scores guide", url: "https://www.officialasvab.com/applicants/scores/" },
  { label: "CAT-ASVAB overview", url: "https://www.officialasvab.com/applicants/cat-asvab/" },
  { label: "Subtests (counselors & educators)", url: "https://www.officialasvab.com/counselors-educators/subtests/" },
  { label: "ASVAB Career Exploration Program (CEP)", url: "https://www.officialasvab.com/counselors-educators/asvab-career-exploration-program/" },
  { label: "Testing locations (MEPS/MET)", url: "https://www.officialasvab.com/applicants/locations/" },
  { label: "PiCAT", url: "https://www.officialasvab.com/recruiters/picat/" },
  { label: "Sample questions", url: "https://www.officialasvab.com/applicants/sample-questions/" },
  { label: "Test-preparation disclaimer", url: "https://www.officialasvab.com/applicants/asvab-test-preparation-disclaimer/" },
  { label: "Preparing for the ASVAB (counselors)", url: "https://www.officialasvab.com/counselors-educators/preparing-for-the-asvab/" },
  { label: "March2Success (free)", url: "https://www.march2success.com" },
];

const BRANCH_LINKS: { branch: string; url: string }[] = [
  { branch: "Army", url: "https://www.goarmy.com/how-to-join/steps/asvab" },
  { branch: "Navy", url: "https://www.navy.com/joining/requirements" },
  { branch: "Air Force", url: "https://www.airforce.com/how-to-join/process/asvab" },
  { branch: "Marine Corps", url: "https://www.marines.com/become-a-marine/requirements/general.html" },
  { branch: "Coast Guard", url: "https://www.gocoastguard.com/get-started" },
  { branch: "Space Force", url: "https://www.spaceforce.com/how-to-join/enlisted-guardians" },
];

function Source({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline hover:text-accent-hover"
    >
      {children}
    </a>
  );
}

export default function CounselorResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Free ASVAB tools for counselors and educators",
          description:
            "Free, no-account ASVAB tools counselors, librarians, and JROTC instructors can link or embed for students.",
          itemListElement: FREE_TOOLS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.label,
            url: `https://asvabhero.com${t.href}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can I link or embed your ASVAB calculator on our school page?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Every tool is free with no account required, so you are welcome to link any of them. You can also embed the AFQT calculator directly on your page with one line of HTML from asvabhero.com/embed.",
              },
            },
            {
              "@type": "Question",
              name: "Is ASVAB Hero affiliated with the Department of Defense?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. ASVAB Hero is an independent test-prep site and is not affiliated with the U.S. Department of Defense or any branch of the armed services. The official sources are linked throughout this page so you can verify any detail.",
              },
            },
            {
              "@type": "Question",
              name: "Do students need to create an account to use the tools?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The calculators, practice test, and study guides are free to use with no signup wall. An optional free account saves progress, but it is never required to use the core tools.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between the ASVAB CEP and the enlistment ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The ASVAB Career Exploration Program (CEP) is the school-based version that pairs results with an interest inventory and carries no service obligation. The enlistment ASVAB is taken at a MEPS or MET site through a recruiter, and those scores count toward joining.",
              },
            },
          ],
        }}
      />

      {/* 1. Cover / intro */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        ASVAB Quick-Start for Educators
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        An ASVAB reference for counselors, librarians, and JROTC instructors
      </h1>
      <p className="mt-4 text-text-secondary leading-relaxed">
        A plain, source-cited overview of the ASVAB for the adults who advise
        students about it. Below are free, interactive tools you can link or
        embed for your students, plus the official sources to verify every
        detail. No signup, no email, no sales pitch. Last verified{" "}
        {LAST_VERIFIED}.
      </p>
      <p className="mt-3 text-sm text-text-tertiary leading-relaxed">
        ASVAB Hero is an independent test-prep site and is not affiliated with
        the U.S. Department of Defense or any branch of the armed services. The
        official sources are linked throughout so you can verify any detail and
        share the primary source directly.
      </p>

      <div className="mt-12 space-y-12">
        {/* Free tools (the linkable assets) */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Free tools to link or embed for students
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            These are free, interactive, and have no signup wall, so counselors
            and librarians are welcome to link any of them. Unlike the official
            materials, they let a student translate a practice score into the
            AFQT percentile and the actual jobs each branch opens.
          </p>
          <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {FREE_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block no-underline"
              >
                <span className="text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                  {tool.label} &rarr;
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-text-secondary">
                  {tool.blurb}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Embed callout */}
        <section className="rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-text-primary">
            Embed a free calculator on your site
          </h2>
          <p className="mt-2 text-text-secondary leading-relaxed">
            Drop our AFQT calculator straight into your counseling page or
            LibGuide with one line of HTML. Students use it without leaving your
            site and without an account.{" "}
            <Link
              href="/embed"
              className="font-semibold text-accent underline hover:text-accent-hover"
            >
              Get the embed code
            </Link>
            .
          </p>
        </section>

        {/* 2. What the ASVAB is */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            What the ASVAB is
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            The Armed Services Vocational Aptitude Battery (ASVAB) is a
            multiple-aptitude test that serves two distinct purposes. It decides
            enlistment eligibility and job qualification for people joining the
            military, and, separately, it is a career-exploration tool used in
            many high schools. The two uses share a name but reach different
            students. See the{" "}
            <Source url="https://www.officialasvab.com/applicants/fact-sheet/">
              official fact sheet
            </Source>
            .
          </p>
        </section>

        {/* 3. Enlistment testing vs school testing */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Enlistment testing vs. school testing
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            Two things students often confuse, worth keeping separate:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary leading-relaxed">
            <li>
              <strong className="text-text-primary">Enlistment testing</strong>{" "}
              happens at a Military Entrance Processing Station (MEPS) or a
              satellite Military Entrance Test (MET) site, arranged through a
              recruiter. These scores count toward joining. See{" "}
              <Source url="https://www.officialasvab.com/applicants/locations/">
                testing locations
              </Source>
              .
            </li>
            <li>
              <strong className="text-text-primary">
                The ASVAB Career Exploration Program (CEP)
              </strong>{" "}
              is the school-based version. It pairs ASVAB results with an
              interest inventory to help students explore careers and carries no
              service obligation. See the{" "}
              <Source url="https://www.officialasvab.com/counselors-educators/asvab-career-exploration-program/">
                CEP overview
              </Source>
              .
            </li>
          </ul>
        </section>

        {/* 4. Test formats */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Test formats at a glance
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            The ASVAB is delivered in more than one format, and the timing rules
            differ:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary leading-relaxed">
            <li>
              <strong className="text-text-primary">CAT-ASVAB</strong> is the
              computer-adaptive version given at MEPS. It adjusts question
              difficulty to the test taker and is timed per section. See{" "}
              <Source url="https://www.officialasvab.com/applicants/cat-asvab/">
                CAT-ASVAB
              </Source>
              .
            </li>
            <li>
              <strong className="text-text-primary">Paper-and-pencil</strong>{" "}
              ASVAB is used at some MET sites and in the school CEP program.
            </li>
            <li>
              <strong className="text-text-primary">PiCAT</strong> is an
              unproctored, at-home version a recruiter may authorize, with a
              short verification test afterward. See{" "}
              <Source url="https://www.officialasvab.com/recruiters/picat/">
                PiCAT
              </Source>
              .
            </li>
          </ul>
        </section>

        {/* 5. Subtests */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            The subtests and what each measures
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            The ASVAB has nine subtests. Four of them combine into the AFQT (see
            below); all nine feed the job-qualification composites. The official{" "}
            <Source url="https://www.officialasvab.com/counselors-educators/subtests/">
              subtests page
            </Source>{" "}
            has the counselor-friendly descriptions.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-text-secondary">
                <tr className="border-b border-navy-border">
                  <th className="py-2 pr-4 text-left">Subtest</th>
                  <th className="py-2 text-left">Measures</th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                {[
                  ["General Science (GS)", "Physical and biological science"],
                  ["Arithmetic Reasoning (AR)", "Word problems / applied math"],
                  ["Word Knowledge (WK)", "Vocabulary"],
                  ["Paragraph Comprehension (PC)", "Reading comprehension"],
                  ["Mathematics Knowledge (MK)", "High-school math concepts"],
                  ["Electronics Information (EI)", "Electrical / electronics"],
                  ["Auto & Shop Information (AS)", "Automotive and shop practices"],
                  ["Mechanical Comprehension (MC)", "Mechanical principles"],
                  ["Assembling Objects (AO)", "Spatial reasoning"],
                ].map(([sub, measures]) => (
                  <tr key={sub} className="border-b border-navy-border/50">
                    <td className="py-2 pr-4 font-semibold">{sub}</td>
                    <td className="py-2 text-text-secondary">{measures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. How scores work */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            How the scores work
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary leading-relaxed">
            <li>
              <strong className="text-text-primary">Standard scores</strong> are
              reported per subtest on a scale with a mean of 50 and a standard
              deviation of 10. They are not percent-correct.
            </li>
            <li>
              <strong className="text-text-primary">The AFQT</strong> (Armed
              Forces Qualification Test) is built from four subtests (Word
              Knowledge, Paragraph Comprehension, Arithmetic Reasoning, and
              Mathematics Knowledge) and reported as a percentile from 1 to 99.
              The AFQT decides
              whether a student can enlist at all.
            </li>
            <li>
              <strong className="text-text-primary">Line / composite scores</strong>{" "}
              combine subtests in branch-specific ways to determine which jobs a
              student qualifies for. Each branch uses its own composites.
            </li>
          </ul>
          <p className="mt-3 text-text-secondary leading-relaxed">
            The official{" "}
            <Source url="https://www.officialasvab.com/applicants/scores/">
              scores guide
            </Source>{" "}
            explains standard scores, the AFQT, and the AFQT category bands.
          </p>
        </section>

        {/* 7. Branch entry notes */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Current branch entry notes
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            Minimum AFQT scores and education-tier rules change, and each branch
            sets its own. Rather than publish numbers that may go stale, here are
            the official branch pages. Always confirm current minimums with a
            recruiter.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary leading-relaxed">
            {BRANCH_LINKS.map(({ branch, url }) => (
              <li key={branch}>
                <strong className="text-text-primary">{branch}:</strong>{" "}
                <Source url={url}>{url.replace(/^https?:\/\//, "")}</Source>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Official prep resources */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Official and free prep resources
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            Lead students to the official materials first. The DoD does not
            endorse any commercial prep product; see the official{" "}
            <Source url="https://www.officialasvab.com/applicants/asvab-test-preparation-disclaimer/">
              test-preparation disclaimer
            </Source>
            .
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary leading-relaxed">
            <li>
              <Source url="https://www.officialasvab.com/applicants/sample-questions/">
                Official ASVAB sample questions
              </Source>
            </li>
            <li>
              <Source url="https://www.officialasvab.com/counselors-educators/preparing-for-the-asvab/">
                Preparing for the ASVAB (counselor guidance)
              </Source>
            </li>
            <li>
              <Source url="https://www.march2success.com">
                March2Success
              </Source>{" "}
              (free, U.S. Army sponsored study site)
            </li>
            <li>
              Free interactive prep from ASVAB Hero: the{" "}
              <Link
                href="/calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                score calculator
              </Link>
              , a{" "}
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                free practice test
              </Link>
              , and{" "}
              <Link
                href="/asvab-study-guide"
                className="text-accent underline hover:text-accent-hover"
              >
                study guides
              </Link>{" "}
              (all linked at the top of this page). The calculators give
              estimates, not official scores.
            </li>
          </ul>
        </section>

        {/* 9. Suggested counselor workflow */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            A simple workflow by student situation
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary leading-relaxed">
            <li>
              <strong className="text-text-primary">
                Hasn&apos;t tested yet:
              </strong>{" "}
              start with the official{" "}
              <Source url="https://www.officialasvab.com/applicants/fact-sheet/">
                fact sheet
              </Source>{" "}
              and{" "}
              <Source url="https://www.officialasvab.com/applicants/sample-questions/">
                sample questions
              </Source>
              , and point them to a recruiter for official testing.
            </li>
            <li>
              <strong className="text-text-primary">
                Has scores already:
              </strong>{" "}
              use the free{" "}
              <Link
                href="/calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                calculator
              </Link>{" "}
              to translate subtest scores into an AFQT percentile and qualifying
              jobs, and walk through the official{" "}
              <Source url="https://www.officialasvab.com/applicants/scores/">
                scores guide
              </Source>{" "}
              alongside it.
            </li>
            <li>
              <strong className="text-text-primary">Wants to practice:</strong>{" "}
              point them to the free{" "}
              <Link
                href="/practice-test"
                className="text-accent underline hover:text-accent-hover"
              >
                practice test
              </Link>{" "}
              and per-subtest drills, plus the official{" "}
              <Source url="https://www.officialasvab.com/applicants/sample-questions/">
                sample questions
              </Source>
              .
            </li>
            <li>
              <strong className="text-text-primary">
                Wants career exploration:
              </strong>{" "}
              the school{" "}
              <Source url="https://www.officialasvab.com/counselors-educators/asvab-career-exploration-program/">
                CEP program
              </Source>{" "}
              is built for this and carries no service obligation.
            </li>
          </ul>
        </section>

        {/* 10. Source appendix */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Sources
          </h2>
          <p className="mt-2 text-sm text-text-tertiary">
            All links verified {LAST_VERIFIED}.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <Source url={s.url}>{s.label}</Source>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <RelatedLinks
        title="Free tools for your students"
        links={[
          { href: "/calculator", label: "ASVAB score calculator", blurb: "Every job you qualify for, all 6 branches." },
          { href: "/afqt-calculator", label: "AFQT calculator", blurb: "Enlistment-eligibility percentile from 4 subtests." },
          { href: "/practice-test", label: "Free practice test", blurb: "Diagnostic plus per-subtest drills, no account." },
          { href: "/asvab-score-requirements", label: "Score requirements by branch", blurb: "Current AFQT minimums, diploma vs GED." },
          { href: "/asvab-study-guide", label: "Study guides", blurb: "Free guides for every ASVAB subtest." },
          { href: "/embed", label: "Embed a calculator", blurb: "Put the AFQT calculator on your own page." },
        ]}
      />
    </div>
  );
}
