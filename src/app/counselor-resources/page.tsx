import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ASVAB Counselor Quick-Start: Official Facts, Sources, and Links",
  description:
    "A plain, source-cited ASVAB reference for school counselors, librarians, and JROTC instructors: what the test is, how scores work, official prep resources, and where to send students. No signup.",
  alternates: {
    canonical: "https://asvabhero.com/counselor-resources",
  },
};

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
      {/* 1. Cover / intro */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        ASVAB Quick-Start for Educators
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        An ASVAB reference for counselors, librarians, and JROTC instructors
      </h1>
      <p className="mt-4 text-text-secondary leading-relaxed">
        A plain, source-cited overview of the ASVAB for the adults who advise
        students about it. Everything below links to an official source. No
        signup, no email required, and nothing here is a sales page. Last
        verified {LAST_VERIFIED}.
      </p>
      <p className="mt-3 text-sm text-text-tertiary leading-relaxed">
        ASVAB Hero is an independent test-prep site and is not affiliated with
        the U.S. Department of Defense or any branch of the armed services. The
        official sources are linked throughout so you can verify any detail and
        share the primary source directly.
      </p>

      <div className="mt-12 space-y-12">
        {/* 2. What the ASVAB is */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary">
            What the ASVAB is
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            The Armed Services Vocational Aptitude Battery (ASVAB) is a
            multiple-aptitude test used for two distinct purposes: to determine
            enlistment eligibility and job qualification for people joining the
            military, and, separately, as a career-exploration tool offered in
            many high schools. The two uses share a test name but serve different
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
            These are easy to confuse and worth separating for students:
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
              Forces Qualification Test) is built from four subtests (Arithmetic
              Reasoning, Math Knowledge, Word Knowledge, Paragraph Comprehension)
              and reported as a percentile from 1 to 99. The AFQT determines
              whether a student can enlist.
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
              As an additional, optional tool, ASVAB Hero offers a free{" "}
              <Link
                href="/calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                ASVAB score calculator
              </Link>{" "}
              for students who already have subtest scores and want to see their
              AFQT percentile and qualifying jobs. It is an estimate, not an
              official score.
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
              walk through the{" "}
              <Source url="https://www.officialasvab.com/applicants/scores/">
                scores guide
              </Source>
              , then optionally use the free{" "}
              <Link
                href="/calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                calculator
              </Link>{" "}
              to translate subtest scores into AFQT and qualifying jobs.
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
    </div>
  );
}
