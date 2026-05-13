import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "Coast Guard ASVAB Score: Requirements by Rating (2026) | ASVAB Hero",
  description:
    "Learn the Coast Guard ASVAB score minimums, every rating's subtest formula, and which scores you need to qualify. Complete 2026 requirements guide.",
  alternates: {
    canonical: "https://asvabhero.com/coast-guard-asvab-score",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Coast Guard ASVAB Score: What You Need to Qualify in 2026",
  description:
    "Learn the Coast Guard ASVAB score minimums, every rating's subtest formula, and which scores you need to qualify. Complete 2026 requirements guide.",
  url: "https://asvabhero.com/coast-guard-asvab-score",
  author: {
    "@type": "Organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-05-13",
  dateModified: "2026-05-13",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum ASVAB score for the Coast Guard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The official AFQT minimum is 36 for high school diploma holders. It was 40 until November 2023, when the Coast Guard lowered it to address recruiting challenges. GED holders need an AFQT of 50 or higher. The Reserve minimum is 40. In practice, scoring well above the minimum gives you significantly better chances since the Coast Guard is the most selective branch.",
      },
    },
    {
      "@type": "Question",
      name: "What ASVAB score do you need for Coast Guard Rescue Swimmer (AST)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aviation Survival Technician (AST) requires a combined VE+AR+MK+MC score of 162 or higher, plus an AFQT of at least 65. AST also has demanding physical fitness requirements beyond the ASVAB. It's one of the most competitive ratings in any branch.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Coast Guard accept a GED?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but with restrictions. You need an AFQT of 50 or higher (vs. 36 for diploma holders), and fewer than 5% of accepted Coast Guard recruits lack a diploma. Completing 15 college credit hours upgrades your status to Tier 1, giving you the same scoring threshold as diploma holders.",
      },
    },
    {
      "@type": "Question",
      name: "Can you retake the ASVAB for the Coast Guard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The standard retake schedule is 1 month after your first test, 1 month after your second, then 6 months between each attempt after that. Active-duty members retake through the AFCT rather than the standard ASVAB. Your newest score replaces all previous scores. See our ASVAB retake guide for the full rules.",
      },
    },
    {
      "@type": "Question",
      name: "What's a good ASVAB score for the Coast Guard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AFQT of 50+ makes you competitive for enlistment. Scoring 65+ opens specialized ratings like AST (Rescue Swimmer) and ET (Electronics Technician). For officer programs, you need a GT score of 109 or higher. Use our score calculator to see which ratings your current scores unlock.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Coast Guard different from other branches for ASVAB scoring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Coast Guard uses sums of individual subtest standard scores instead of named composite scores like the Army's GT, CL, or ST. Each rating has its own subtest formula. The CG also has the fewest ratings (~24 vs. 150+ Army MOSs), so qualification thresholds tend to be well-documented. See our ASVAB scores explained guide for a full comparison of how each branch handles scoring.",
      },
    },
  ],
};

export default function CoastGuardASVABScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Coast Guard ASVAB Score: What You Need to Qualify in 2026
        </h1>

        <p className="mt-4 text-text-secondary">
          The Coast Guard enlisted 5,204 members in FY2025, the highest number
          since 1991. That sounds like growth, but it still means roughly 5,000
          slots for the entire branch. Your{" "}
          <strong>coast guard asvab score</strong> determines whether you get one
          of those slots and which of the ~24 ratings (jobs) you can compete for.
        </p>
        <p className="text-text-secondary">
          Two gates stand between you and a Coast Guard career. Gate one: your
          AFQT score must meet the enlistment minimum. Gate two: your individual
          subtest scores must add up to the threshold for your target rating.
          This guide covers both gates, every rating&apos;s exact score
          requirement, and how to study if you&apos;re not there yet. If you
          already have your scores,{" "}
          <Link href="/calculator">plug them into our calculator</Link> to see
          what you qualify for.
        </p>

        {/* Section: Coast Guard AFQT Minimum */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Coast Guard AFQT Minimum: The First Gate
        </h2>

        <p className="mt-4 text-text-secondary">
          Every site you check quotes a different number. Some say 36. Others say
          40. A few say 32. Here&apos;s why.
        </p>
        <p className="text-text-secondary">
          The Coast Guard historically required an AFQT of 40 for high school
          diploma holders, the highest minimum of any branch. That threshold
          dropped to 36, then further to 32 in November 2023 when the CG updated
          its recruiting instruction (COMDTINST 1100.2) to address recruiting
          shortfalls.
        </p>
        <p className="text-text-secondary">
          But the official floor and the practical floor are different things.
          With only ~42,000 active-duty personnel and ~5,200 annual enlistment
          slots, the Coast Guard can afford to be selective. Scoring a 32
          technically qualifies you, but most accepted recruits score well above
          that. Your coast guard asvab score needs to stand out in a pool where
          recruiters have the luxury of choosing.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Branch
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Diploma Minimum
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  GED Minimum
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Army
                </td>
                <td className="py-2 pr-4 font-mono">31</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Marines
                </td>
                <td className="py-2 pr-4 font-mono">32</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Navy
                </td>
                <td className="py-2 pr-4 font-mono">35</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Air Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Coast Guard
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">50</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Space Force
                </td>
                <td className="py-2 pr-4 font-mono">36</td>
                <td className="py-2 font-mono">65</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          GED holders face a steeper climb. The Coast Guard requires an AFQT of
          at least 50 with a GED, and fewer than 5% of accepted recruits lack a
          high school diploma. If you have a GED, completing 15 college credit
          hours at a community college upgrades you to Tier 1 status, putting you
          on equal footing with diploma holders.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            Aim for an AFQT of 50+ to be competitive for enlistment. Scoring 65+
            opens specialized ratings like AST (Rescue Swimmer). The 36 minimum
            is a floor, not a target.
          </p>
        </aside>

        <p className="text-text-secondary">
          For a deep dive on how the AFQT is calculated and why it matters, see
          our <Link href="/afqt-score">AFQT score guide</Link>.
        </p>

        {/* Section: How Coast Guard Scoring Works */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Coast Guard Scoring Works (It&apos;s Different from Army and
          Marines)
        </h2>

        <p className="mt-4 text-text-secondary">
          If you&apos;ve researched Army or Marines ASVAB requirements,
          you&apos;ve seen named composite scores like GT, CL, and ST. The Coast
          Guard doesn&apos;t use those.
        </p>
        <p className="text-text-secondary">
          The Coast Guard (like the Navy) uses a simpler system: it adds up your
          standard scores from specific ASVAB subtests and compares the total
          against a threshold. No composite name, no formula conversion. Just a
          straight sum.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          IT (Information Systems Technician) = AR + MK + EI + GS &gt;= 171
        </div>

        <p className="text-text-secondary">
          Each ASVAB subtest produces a standard score with a mean around 50 and
          a standard deviation around 10. Scores typically range from 20 to 62.
          When a Coast Guard rating requires &ldquo;171,&rdquo; it means your
          scores on those specific subtests must add up to at least 171.
        </p>
        <p className="text-text-secondary">
          The one exception: when the Coast Guard references a GT score
          (primarily for officer programs), it uses the same formula as the Army.
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          VE (Verbal Expression) combines your Word Knowledge and Paragraph
          Comprehension scores. So GT is really WK + PC + AR, just like the Army
          calculates it.
        </p>
        <p className="text-text-secondary">
          This matters because you need to know which specific subtests feed each
          rating requirement, not just a composite name. Our{" "}
          <Link href="/asvab-line-score-calculator">line score calculator</Link>{" "}
          and <Link href="/gt-score-calculator">GT score calculator</Link> can
          help you map your scores to CG requirements.
        </p>

        {/* Section: Every Coast Guard Rating */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Every Coast Guard Rating and Its ASVAB Score Requirement
        </h2>

        <p className="mt-4 text-text-secondary">
          The Coast Guard has roughly 24 enlisted ratings, fewer than any other
          branch. That makes this list manageable, and it means we can show you
          every single one.
        </p>
        <p className="text-text-secondary">
          The &ldquo;Minimum Score&rdquo; column is the sum of the subtests
          listed in the formula column. Some ratings also require a minimum score
          on a specific subtest, listed under &ldquo;Extra Requirements.&rdquo;
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Rating
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Job Title
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Subtest Formula
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Min Score
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Extra Requirements
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AET
                </td>
                <td className="py-2 pr-4">Avionics Electrical Technician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">171</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AMT
                </td>
                <td className="py-2 pr-4">Aviation Maintenance Technician</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS</td>
                <td className="py-2 pr-4 font-mono">213</td>
                <td className="py-2">AR &gt;= 52</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  AST
                </td>
                <td className="py-2 pr-4">Aviation Survival Technician</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">162</td>
                <td className="py-2">AFQT &gt;= 65</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  BM
                </td>
                <td className="py-2 pr-4">Boatswain&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">101</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  CS
                </td>
                <td className="py-2 pr-4">Culinary Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">106</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  DC
                </td>
                <td className="py-2 pr-4">Damage Controlman</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">152</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  DV
                </td>
                <td className="py-2 pr-4">Diver</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">104</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  EM
                </td>
                <td className="py-2 pr-4">Electrician&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+EI</td>
                <td className="py-2 pr-4 font-mono">152</td>
                <td className="py-2">AR &gt;= 52</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ET
                </td>
                <td className="py-2 pr-4">Electronics Technician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">171</td>
                <td className="py-2">AR &gt;= 52 or AFQT &gt;= 66</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  GM
                </td>
                <td className="py-2 pr-4">Gunner&apos;s Mate</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+MC</td>
                <td className="py-2 pr-4 font-mono">208</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  HS
                </td>
                <td className="py-2 pr-4">Health Services Technician</td>
                <td className="py-2 pr-4 font-mono">VE+MK</td>
                <td className="py-2 pr-4 font-mono">154</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  IS
                </td>
                <td className="py-2 pr-4">Intelligence Specialist</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2">No established minimum</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  IT
                </td>
                <td className="py-2 pr-4">Information Systems Technician</td>
                <td className="py-2 pr-4 font-mono">AR+MK+EI+GS</td>
                <td className="py-2 pr-4 font-mono">171</td>
                <td className="py-2">AR &gt;= 52</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  IV
                </td>
                <td className="py-2 pr-4">Investigator</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2">No established minimum</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  ME
                </td>
                <td className="py-2 pr-4">
                  Maritime Law Enforcement Specialist
                </td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">100</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MK
                </td>
                <td className="py-2 pr-4">Machinery Technician</td>
                <td className="py-2 pr-4 font-mono">VE+AR+MK+AS</td>
                <td className="py-2 pr-4 font-mono">150</td>
                <td className="py-2">Or VE+AR &gt;= 106</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MST
                </td>
                <td className="py-2 pr-4">Marine Science Technician</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">115</td>
                <td className="py-2">MK &gt;= 58</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  MU
                </td>
                <td className="py-2 pr-4">Musician</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2 pr-4 font-mono">N/A</td>
                <td className="py-2">Competitive audition</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  OS
                </td>
                <td className="py-2 pr-4">Operations Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">106</td>
                <td className="py-2">None</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  PA
                </td>
                <td className="py-2 pr-4">Public Affairs Specialist</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">110</td>
                <td className="py-2">VE &gt;= 60</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  SK
                </td>
                <td className="py-2 pr-4">Storekeeper</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">106</td>
                <td className="py-2">VE &gt;= 52</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  YN
                </td>
                <td className="py-2 pr-4">Yeoman</td>
                <td className="py-2 pr-4 font-mono">VE+AR</td>
                <td className="py-2 pr-4 font-mono">106</td>
                <td className="py-2">NO+CS &gt;= 101</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            AR (Arithmetic Reasoning) and VE (Verbal Expression) appear in nearly
            every rating formula. These two subtests should be your top study
            priorities if you&apos;re targeting the Coast Guard.
          </p>
        </aside>

        <p className="text-text-secondary">
          Note: the Coast Guard lowered A-school score requirements by
          approximately 10 points across many ratings in October 2021 to expand
          access. These are the current thresholds, but always confirm with your
          recruiter since requirements can shift based on service needs.
        </p>
        <p className="text-text-secondary">
          Use our{" "}
          <Link href="/calculator">ASVAB score calculator</Link> to check which
          ratings your scores qualify you for.
        </p>

        {/* Section: Worked Example */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Worked Example: Checking Your Scores Against CG Ratings
        </h2>

        <p className="mt-4 text-text-secondary">
          Understanding your coast guard asvab score requirements is easier with
          a real example. Say Jordan&apos;s ASVAB subtest standard scores look
          like this: AR 55, MK 48, EI 42, GS 45, VE 52, MC 47, AS 50.
        </p>
        <p className="text-text-secondary">
          <strong>IT (Information Systems Technician):</strong> Needs
          AR+MK+EI+GS &gt;= 171. Jordan: 55 + 48 + 42 + 45 = 190. AR minimum
          of 52? Jordan has 55. Qualifies.
        </p>
        <p className="text-text-secondary">
          <strong>BM (Boatswain&apos;s Mate):</strong> Needs VE+AR &gt;= 101.
          Jordan: 52 + 55 = 107. Qualifies.
        </p>
        <p className="text-text-secondary">
          <strong>AMT (Aviation Maintenance Technician):</strong> Needs
          VE+AR+MK+AS &gt;= 213 with AR &gt;= 52. Jordan: 52 + 55 + 48 + 50 =
          205. Falls short by 8 points. Does not qualify.
        </p>
        <p className="text-text-secondary">
          <strong>HS (Health Services Technician):</strong> Needs VE+MK &gt;=
          154. Jordan: 52 + 48 = 100. Needs 154. Does not qualify. HS has one of
          the highest two-subtest thresholds in the Coast Guard, which means both
          your verbal and math scores need to be strong.
        </p>
        <p className="text-text-secondary">
          Jordan qualifies for 15 of the 24 ratings based on these scores. The
          three misses above show the range: AMT is close (8 points short), while
          HS requires a fundamentally different score profile.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Don&apos;t just check the total. Some ratings have subtest minimums.
            Jordan qualifies for IT on the total (190 &gt;= 171) but would fail
            if AR were 50 instead of 55 because the IT rating requires AR &gt;=
            52.
          </p>
        </aside>

        <p className="text-text-secondary">
          Skip the manual math.{" "}
          <Link href="/calculator">
            Plug your scores into our calculator
          </Link>{" "}
          and see every qualifying Coast Guard rating instantly.
        </p>

        {/* Section: Officer Programs */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Coast Guard Officer Programs: The GT 109 Threshold
        </h2>

        <p className="mt-4 text-text-secondary">
          Every Coast Guard officer commissioning path runs through the same
          gate: a GT score of 109 or higher.
        </p>
        <p className="text-text-secondary">
          This applies to all four programs: Officer Candidate School (OCS),
          Selected Reserve Direct Commission (SRDC), Pre-Commissioning Program
          for Enlisted Personnel (PPEP), and the College Student
          Pre-Commissioning Initiative (CSPI).
        </p>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          GT = VE + AR
        </div>

        <p className="text-text-secondary">
          If your VE is 55 and your AR is 54, your GT is 109. That barely clears
          the bar. A GT of 109 is higher than many Army and Marines officer
          thresholds, reflecting the Coast Guard&apos;s selectivity even at the
          officer level.
        </p>
        <p className="text-text-secondary">
          Don&apos;t have your ASVAB scores handy? You can also qualify with an
          SAT score of 1100 (combined verbal and math) or an ACT score of 23.
          These alternative paths exist because officer candidates often come
          from college backgrounds where a recent ASVAB may not be available.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Calculate your GT score instantly with our{" "}
            <Link href="/gt-score-calculator">GT score calculator</Link>. For a
            complete breakdown of what GT means and how to raise it, see the{" "}
            <Link href="/asvab-gt-score">GT score guide</Link>.
          </p>
        </aside>

        {/* Section: Non-Rate Path */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          What Happens If You Enlist Without a Rating (The Non-Rate Path)
        </h2>

        <p className="mt-4 text-text-secondary">
          Not everyone enters the Coast Guard with a guaranteed rating. If your
          ASVAB scores don&apos;t qualify you for a specific A-school, or if your
          preferred rating has no open slots, you&apos;ll enlist as an
          undesignated non-rate.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Boot Camp
            </span>
            <span className="text-sm text-text-secondary">
              8 weeks at Cape May, NJ
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Non-Rate
            </span>
            <span className="text-sm text-text-secondary">
              Posted to a unit as SN (Seaman), FN (Fireman), or AN (Airman)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Strike
            </span>
            <span className="text-sm text-text-secondary">
              After time in service, apply for a rating through on-the-job
              training or formal A-school
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Rated E-4
            </span>
            <span className="text-sm text-text-secondary">
              Typical timeline is 2&ndash;3 years from non-rate to Petty Officer
              Third Class
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          The three communities determine your work environment: Seaman covers
          deck and admin, Fireman covers engineering and hull maintenance, Airman
          covers aviation. Your community assignment happens during boot camp.
        </p>
        <p className="text-text-secondary">
          The non-rate path isn&apos;t a dead end. You can study for the AFCT
          (covered below) to improve your scores and qualify for the rating you
          actually want.
        </p>

        {/* Section: AFCT */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Already in the Coast Guard? How to Improve Your Score with the AFCT
        </h2>

        <p className="mt-4 text-text-secondary">
          Your initial ASVAB scores aren&apos;t permanent. Active-duty and
          Reserve Coast Guard members can retake the test through the AFCT (Armed
          Forces Classification Test). It covers the same content as the ASVAB
          under a different name.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 1
            </span>
            <span className="text-sm text-text-secondary">
              Request AFCT through your Educational Services Officer (ESO)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 2
            </span>
            <span className="text-sm text-text-secondary">
              Schedule appointment at a DLPT/AFCT testing site
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 3
            </span>
            <span className="text-sm text-text-secondary">
              Bring valid military ID and test (electronic format only)
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Step 4
            </span>
            <span className="text-sm text-text-secondary">
              New scores replace ALL previous ASVAB scores
            </span>
          </div>
        </div>

        <p className="text-text-secondary">
          Common reasons to take the AFCT: qualifying for a new rating, meeting
          the GT 109 threshold for officer programs, or improving your coast
          guard asvab score after entering as a non-rate. ASVAB scores are valid
          for two years from the test date, but AFCT scores follow the same
          validity window, so plan accordingly if you&apos;re targeting a
          specific rating change timeline.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Your AFCT scores completely replace your previous ASVAB scores. If
            your new scores are lower on any subtest, you lose the old numbers.
            Don&apos;t retake until practice tests show consistent improvement.
          </p>
        </aside>

        <p className="text-text-secondary">
          For the complete AFCT process, eligibility details, and
          branch-specific policies, see our{" "}
          <Link href="/afct">AFCT guide</Link>. Ready to practice? Try our{" "}
          <Link href="/afct-practice-test">free AFCT practice test</Link>.
        </p>

        {/* Section: Which Subtests to Study First */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Which Subtests to Study First for Coast Guard Ratings
        </h2>

        <p className="mt-4 text-text-secondary">
          Not every subtest carries equal weight for your coast guard asvab
          score. Here&apos;s the priority order based on how frequently each
          subtest appears across all 24 rating formulas.
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Priority 1
            </span>
            <span className="text-sm text-text-secondary">
              <strong>AR (Arithmetic Reasoning):</strong> Appears in 18+ rating
              formulas AND feeds the AFQT. Highest-leverage subtest for CG
              applicants.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Priority 2
            </span>
            <span className="text-sm text-text-secondary">
              <strong>VE (Word Knowledge + Paragraph Comprehension):</strong>{" "}
              Appears in 15+ formulas plus carries 2x weight in the AFQT
              formula.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Priority 3
            </span>
            <span className="text-sm text-text-secondary">
              <strong>MK (Mathematics Knowledge):</strong> Appears in 12+
              formulas, especially technical and aviation ratings. Also feeds the
              AFQT.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Priority 4
            </span>
            <span className="text-sm text-text-secondary">
              <strong>EI (Electronics Information):</strong> Critical for AET,
              ET, IT, and EM. Skip if you&apos;re targeting deck or admin
              ratings.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy px-4 py-3">
            <span className="font-mono text-sm font-bold text-accent">
              Priority 5
            </span>
            <span className="text-sm text-text-secondary">
              <strong>GS (General Science):</strong> Needed for AET, ET, IT, and
              MST. Lower priority unless you&apos;re targeting those specific
              ratings.
            </span>
          </div>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            VE is doubled in the AFQT formula (AFQT = 2VE + AR + MK). Improving
            your Word Knowledge and Paragraph Comprehension scores by 5 points
            adds 10 points to your AFQT. No other subtest gives you that kind of
            leverage.
          </p>
        </aside>

        <p className="text-text-secondary">
          A focused 4&ndash;6 week study period targeting your weak subtests
          typically yields a 5 to 15 percentile point improvement. Start with a{" "}
          <Link href="/practice-test">free practice test</Link> to find your
          baseline, then build a plan around your weakest AFQT subtests first.
        </p>
        <p className="text-text-secondary">
          For subtest-specific strategies, see our guides on{" "}
          <Link href="/asvab-arithmetic-reasoning-tips">
            Arithmetic Reasoning tips
          </Link>{" "}
          and{" "}
          <Link href="/asvab-word-knowledge-tips">Word Knowledge tips</Link>.
          For the full study framework, check out the{" "}
          <Link href="/asvab-study-guide">ASVAB study guide</Link>.
        </p>

        {/* FAQ Section */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Coast Guard ASVAB Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score for the Coast Guard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The official AFQT minimum is 36 for high school diploma holders. It
              was 40 until November 2023, when the Coast Guard lowered it to
              address recruiting challenges. GED holders need an AFQT of 50 or
              higher. The Reserve minimum is 40. In practice, scoring well above
              the minimum gives you significantly better chances since the Coast
              Guard is the most selective branch.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What ASVAB score do you need for Coast Guard Rescue Swimmer (AST)?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Aviation Survival Technician (AST) requires a combined VE+AR+MK+MC
              score of 162 or higher, plus an AFQT of at least 65. AST also has
              demanding physical fitness requirements beyond the ASVAB.
              It&apos;s one of the most competitive ratings in any branch.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Coast Guard accept a GED?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes, but with restrictions. You need an AFQT of 50 or higher (vs.
              36 for diploma holders), and fewer than 5% of accepted Coast Guard
              recruits lack a diploma. Completing 15 college credit hours
              upgrades your status to Tier 1, giving you the same scoring
              threshold as diploma holders.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can you retake the ASVAB for the Coast Guard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The standard retake schedule is 1 month after your first test,
              1 month after your second, then 6 months between each attempt after
              that. Active-duty members retake through the AFCT rather than the
              standard ASVAB. Your newest score replaces all previous scores. See
              our{" "}
              <Link href="/asvab-retake-policy">ASVAB retake guide</Link> for
              the full rules.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What&apos;s a good ASVAB score for the Coast Guard?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              An AFQT of 50+ makes you competitive for enlistment. Scoring 65+
              opens specialized ratings like AST (Rescue Swimmer) and ET
              (Electronics Technician). For officer programs, you need a GT score
              of 109 or higher. Use our{" "}
              <Link href="/calculator">score calculator</Link> to see which
              ratings your current scores unlock.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              How is the Coast Guard different from other branches for ASVAB
              scoring?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Coast Guard uses sums of individual subtest standard scores
              instead of named composite scores like the Army&apos;s GT, CL, or
              ST. Each rating has its own subtest formula. The CG also has the
              fewest ratings (~24 vs. 150+ Army MOSs), so qualification
              thresholds tend to be well-documented. See our{" "}
              <Link href="/asvab-scores-explained">
                ASVAB scores explained guide
              </Link>{" "}
              for a full comparison of how each branch handles scoring.
            </p>
          </div>
        </div>

        {/* CTA Box */}
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
