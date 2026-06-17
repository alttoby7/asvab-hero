import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AMAZON_TAG as TAG } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Best ASVAB Study Books 2026 (Tested + Ranked)",
  description:
    "The 8 best ASVAB study books for 2026, ranked by score-improvement potential. Honest reviews covering Kaplan, Dummies, Mometrix, Peterson's, Barron's, and more, with Amazon links and a side-by-side comparison table.",
  alternates: {
    canonical: "https://asvabhero.com/best-asvab-study-book",
  },
};

const books = [
  {
    id: "total-prep",
    label: "Best Overall",
    title: "ASVAB Total Prep 2025-2026",
    publisher: "Kaplan Test Prep",
    edition: "2025",
    asin: "150629720X",
    pages: "~1,000",
    practiceTests: "7 full-length",
    bestFor: "All-rounder, high scorer",
    pros: [
      "Seven full-length practice tests, more than any other book in this list",
      "Covers all 9 subtests in depth, not just the AFQT four",
      "Kaplan's content is tightly aligned to what actually appears on the CAT-ASVAB",
      "Includes online access to additional practice via Kaplan's platform (the BOOK version, not their paid subscription)",
    ],
    cons: [
      "Heavy, not the book you carry to lunch. Plan a dedicated study space.",
      "More material than some recruits need; the sheer size can be paralyzing if you don't know where to start",
    ],
    whoFor:
      "Any recruit who wants one book to own the full exam. Strong pick if you want to qualify for technical MOS or ratings that require composite scores well above branch minimums.",
  },
  {
    id: "for-dummies",
    label: "Best for Beginners",
    title: "ASVAB For Dummies 2025/2026",
    publisher: "Angie Papple Johnston (Wiley)",
    edition: "14th ed.",
    asin: "1394323468",
    pages: "~600",
    practiceTests: "6 full-length",
    bestFor: "Beginner, nervous test-taker",
    pros: [
      "Plain-language explanations, doesn't assume any background knowledge",
      "Six full practice tests, solid volume for the price",
      "Johnston is a retired Army NCO; the military context in explanations is accurate and not generic",
      "Good chapter-by-chapter organization for recruits who need to build from scratch",
    ],
    cons: [
      "Explanation depth is thinner than Kaplan Total Prep on technical subtests",
      "Some recruits find the 'For Dummies' style a little breezy if they need dense content",
    ],
    whoFor:
      "Recruits who haven't cracked a textbook in a while, or who are nervous about test-taking in general. The friendly tone lowers the activation energy to actually sit down and study.",
  },
  {
    id: "test-prep-books",
    label: "Best Budget",
    title: "ASVAB Study Guide 2025-2026",
    publisher: "Test Prep Books (Lydia Morrison)",
    edition: "15th ed.",
    asin: "1637750358",
    pages: "~350",
    practiceTests: "3 full-length",
    bestFor: "Budget buyer, retake candidate",
    pros: [
      "Significantly cheaper than Kaplan or Dummies, good value for what you get",
      "Concise, covers what matters without filler chapters",
      "Three practice tests is enough to measure progress across a 4–6 week plan",
      "Updated for 2025-2026 test content",
    ],
    cons: [
      "Thinner explanations on technical subtests (EI, MC, GS) compared to Kaplan",
      "Three tests is light if you're a heavy-volume practicer",
      "Some reviewers note minor formatting inconsistencies in math sections",
    ],
    whoFor:
      "Recruits who are on a tight budget, retake candidates who just need focused reinforcement, or anyone using a second book to supplement free online resources.",
  },
  {
    id: "mometrix-book",
    label: "Best for Visual/Video Learners",
    title: "Mometrix ASVAB Study Guide (8th ed.), THE BOOK",
    publisher: "Matthew Bowling / Mometrix",
    edition: "8th",
    asin: "1516725069",
    pages: "~500",
    practiceTests: "3 full-length",
    bestFor: "Visual learner, video supplement seeker",
    pros: [
      "Comes with access to free companion video explanations for key concepts, genuinely useful for visual learners",
      "Solid content on all four AFQT subtests",
      "Clear chapter organization, not overwhelming",
      "One of the better Mechanical Comprehension explanations in the print-book category",
    ],
    cons: [
      "Three practice tests is the minimum for serious prep, supplement with our free diagnostic",
      "Mometrix's online course is a direct competitor to ASVAB Hero Pro, we're recommending the BOOK ONLY. Do not confuse the two products.",
    ],
    whoFor:
      "Recruits who learn better with video explanations alongside text. The companion videos are a genuine differentiator for this book. Pair it with our free practice test at asvabhero.com/practice-test to add more test volume.",
    note: "Important: This is a link to the physical book. Mometrix also sells an online prep course subscription, that is a separate product we are not recommending here.",
  },
  {
    id: "premium-prep",
    label: "Best for Practice Volume",
    title: "ASVAB Premium Prep 2025-2026",
    publisher: "Kaplan Test Prep",
    edition: "2025",
    asin: "1506297188",
    pages: "~700",
    practiceTests: "6 full-length",
    bestFor: "Serious self-studier, practice-volume maximizer",
    pros: [
      "Six full-length tests, plus additional online practice questions via Kaplan access",
      "Focused and slightly leaner than Total Prep, easier to pace if you're time-constrained",
      "Kaplan's diagnostic approach helps you prioritize subtests efficiently",
      "Strong AR and MK explanations, two of the highest-leverage AFQT subtests",
    ],
    cons: [
      "Slightly less content breadth than Total Prep on technical subtests",
      "If you want all 9 subtests covered deeply, Total Prep is the better pick",
    ],
    whoFor:
      "The recruit who knows they need maximum practice test volume and wants a less overwhelming page count than Total Prep. Also solid for retake candidates who already know the content but need test conditioning.",
  },
  {
    id: "petersons",
    label: "Best Branch-Specific",
    title: "Peterson's Master the ASVAB",
    publisher: "Eve P. Steinberg / Peterson's",
    edition: "Current",
    asin: "0136907105",
    pages: "~600",
    practiceTests: "5 full-length",
    bestFor: "Branch-specific prepper, composite score focus",
    pros: [
      "More attention to branch-specific composite scores than most competitor books",
      "Five practice tests with solid diagnostic breakdowns",
      "Covers the AFQT and all 9 subtests without skimping on the technical sections",
      "Peterson's military publishing history is deep, content is credible",
    ],
    cons: [
      "Layout and design are more utilitarian than Kaplan, works fine, just not pretty",
      "Peterson's also sells online prep courses; we're recommending the book, not the course",
    ],
    whoFor:
      "Recruits who have a specific MOS or rating in mind and want to understand exactly which subtests drive their target composite scores. If you're aiming for Army 35F Intelligence Analyst, Navy Nuclear rates, or Air Force PAFSC 2E, this book's composite coverage is useful.",
  },
  {
    id: "barrons",
    label: "Best Quick Reference",
    title: "Barron's ASVAB Study Guide Premium",
    publisher: "Terry L. Duran / Barron's",
    edition: "Premium",
    asin: "1506283640",
    pages: "~500",
    practiceTests: "6 full-length",
    bestFor: "Mid-range buyer, clean reference format",
    pros: [
      "Six full-length tests for the price, competitive value",
      "Barron's formatting is clean and scannable, works well as a quick reference",
      "Good index and chapter headers for recruits who want to jump straight to their weak areas",
      "Barron's test prep reputation is solid and longstanding",
    ],
    cons: [
      "Not the deepest on mechanical and technical subtests",
      "Some recruits find it less motivating than Kaplan or Dummies in terms of explanatory style",
    ],
    whoFor:
      "Recruits who like a clean, organized reference format and want six practice tests at a mid-range price. Also works well as a second book alongside a thinner budget option.",
  },
  {
    id: "mometrix-cards",
    label: "Best Flashcard Companion",
    title: "Mometrix ASVAB Study Cards 2026-2027",
    publisher: "Mometrix",
    edition: "2026",
    asin: "1516715152",
    pages: "N/A (flashcard deck)",
    practiceTests: "N/A",
    bestFor: "Visual learner, Word Knowledge builder, on-the-go review",
    pros: [
      "Physical flashcards beat app-based cards for many people, no screen, no distractions",
      "Covers vocabulary (WK), math formulas (AR + MK), and key facts across all 9 subtests",
      "Compact enough to carry, use during lunch, commute, or any short break",
      "Pairs well with any study guide book as a spaced-repetition supplement",
    ],
    cons: [
      "Not a standalone prep resource, you need a full study guide alongside this",
      "Vocabulary coverage is broad, not infinite; supplement with your own flashcards for Word Knowledge",
    ],
    whoFor:
      "Any recruit, as a supplement to a full study guide. Particularly strong for Word Knowledge vocabulary drilling and math formula memorization. Best used with spaced repetition, review a batch daily, not all at once.",
    note: "This is a physical flashcard product from Mometrix. Not affiliated with their online subscription course.",
  },
];

export default function BestASVABStudyBookPage() {
  const topThree = books.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Best ASVAB Study Books 2026 (Tested + Ranked by Score-Improvement Potential)",
          description:
            "The 8 best ASVAB study books for 2026, ranked by score-improvement potential. Honest reviews covering Kaplan, Dummies, Mometrix, Peterson's, Barron's, and more.",
          url: "https://asvabhero.com/best-asvab-study-book",
          author: {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
          },
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-04-27",
          dateModified: "2026-04-27",
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much should I budget for an ASVAB study book?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most quality ASVAB study guides run $20-35 on Amazon. The budget end (Test Prep Books, Trivium) is $20-25 and gets you 3 practice tests and solid AFQT coverage. The premium end (Kaplan Total Prep) is $30-35 and gets you 6-7 tests plus deeper content on all 9 subtests. Buy one good book and use it, buying three mediocre ones is a waste of money and time.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need both a study guide AND a practice test book?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not necessarily. Most of the books on this list include both content chapters and full practice tests. Kaplan Total Prep's 7 tests is enough volume for most recruits. The exception: if you've already studied the content but just need more test reps, adding a second book focused on tests (or using ASVAB Hero Pro for unlimited online practice) makes sense.",
              },
            },
            {
              "@type": "Question",
              name: "When does the edition of an ASVAB book matter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Don't buy an edition older than 2 years. The AFQT scoring scale hasn't changed fundamentally since the PAY97 norms (1997), but the question banks, subtest question counts, and format details get updated regularly. A 2020 edition won't reflect 2024-2025 CAT-ASVAB changes. Stick to 2024-2026 editions.",
              },
            },
            {
              "@type": "Question",
              name: "What's the best ASVAB book for retake candidates?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For retakes, you usually know your weak subtests from your MEPS score report. Use that as your baseline, you don't need a full content review. A targeted pick: Test Prep Books for budget or Kaplan Premium Prep if you want practice volume. Pair either with our free 30-question diagnostic at asvabhero.com/practice-test to measure where you stand before you burn a retake attempt.",
              },
            },
            {
              "@type": "Question",
              name: "Are free PDF guides good enough to pass the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Free PDFs can supplement but rarely replace a structured study guide. The issue isn't the price, it's the quality. Most free PDFs have outdated question banks, no full practice tests, and weak explanations. If budget is genuinely tight, use free resources (Khan Academy for math, officialasvab.com for practice questions) plus our free diagnostic at asvabhero.com/practice-test. That combination beats a bad paid book.",
              },
            },
          ],
        }}
      />

      {/* Page header */}
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
          Buyer&apos;s Guide · Updated April 2026
        </p>
        <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-text-primary sm:text-4xl">
          Best ASVAB Study Books 2026 (Tested + Ranked by Score-Improvement
          Potential)
        </h1>
        <p className="text-lg leading-relaxed text-text-secondary">
          Eight books. Ranked by how much they can actually move your score, 
          not by who paid for placement. Each review covers what the book does
          well, where it falls short, and who it&apos;s really for.
        </p>
      </div>

      {/* FTC Disclosure */}
      <div className="mb-8 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
        <p className="text-sm italic text-text-secondary">
          <strong className="not-italic text-text-primary">
            Affiliate disclosure:
          </strong>{" "}
          This page contains affiliate links. As an Amazon Associate, ASVAB
          Hero earns from qualifying purchases, at no extra cost to you. We
          only recommend books we&apos;d give a recruit to study with. Prices
          vary; check Amazon for current pricing before buying.
        </p>
      </div>

      {/* TL;DR Top 3 */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          TL;DR, Top 3 Picks
        </h2>
        <div className="space-y-3">
          {topThree.map((book, i) => (
            <div
              key={book.id}
              className="flex items-start gap-4 rounded-xl border border-navy-border bg-navy-light p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-text-primary">{book.title}</p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {book.label}, {" "}
                  {i === 0
                    ? "One book to cover everything; 7 practice tests."
                    : i === 1
                      ? "Best for beginners; plain language, military context."
                      : "Cheapest solid option; works for first-timers and retakers."}
                </p>
              </div>
              <a
                href={`https://www.amazon.com/dp/${book.asin}?tag=${TAG}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                data-affiliate="amazon"
                data-asin={book.asin}
                data-book-id={book.id}
                data-source="study_book_page_top3"
                className="shrink-0 rounded-lg bg-accent px-4 py-2 font-display text-sm font-bold text-white transition-colors hover:bg-accent-hover no-underline"
              >
                Buy on Amazon
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How we picked */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          How We Picked These Books
        </h2>
        <p className="mb-3 text-text-secondary leading-relaxed">
          Not all ASVAB books are created equal. We evaluated every book on
          five criteria:
        </p>
        <div className="space-y-2">
          {[
            {
              label: "Edition recency",
              desc: "2024 or newer. The AFQT format and CAT-ASVAB question bank get updated, older editions have stale practice questions.",
            },
            {
              label: "Review count threshold",
              desc: "At least 500 verified Amazon reviews. Small review counts mean unreliable signals.",
            },
            {
              label: "AFQT subtest breadth",
              desc: "All four AFQT subtests (AR, WK, PC, MK) must be covered in full, not skimmed.",
            },
            {
              label: "Explanation quality",
              desc: "Does the book explain WHY an answer is correct, or just list the answer key? We prioritized books that teach reasoning, not just memorization.",
            },
            {
              label: "Practice test volume",
              desc: "More full-length practice tests correlate directly with score improvement. We noted the count for each book.",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-navy-border bg-navy-light px-4 py-3"
            >
              <span className="font-semibold text-text-primary">{c.label}:</span>{" "}
              <span className="text-sm text-text-secondary">{c.desc}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-text-secondary">
          One trap recruits make constantly: buying an edition more than 2 years
          old because it&apos;s cheap used. The AFQT scoring scale hasn&apos;t
          fundamentally changed since the PAY97 norm tables, but the practice
          question banks do get updated. A 2021 edition won&apos;t reflect
          current CAT-ASVAB format details. Stick to 2024-2026 editions.
        </p>
      </section>

      {/* Individual book reviews */}
      {books.map((book) => (
        <section key={book.id} className="mb-14" id={book.id}>
          <div className="mb-4">
            <span className="inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-bold text-accent">
              {book.label}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
              {book.title}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {book.publisher} · {book.edition}
            </p>
          </div>

          <div className="mb-4 rounded-xl border border-navy-border bg-navy-light p-5">
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Pages
                </p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">
                  {book.pages}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Practice Tests
                </p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">
                  {book.practiceTests}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Best For
                </p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">
                  {book.bestFor}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Price
                </p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">
                  Check Amazon
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 text-xs font-bold text-emerald-400">
                  Pros
                </p>
                <ul className="space-y-1.5">
                  {book.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-0.5 shrink-0 text-emerald-400">
                        ✓
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-bold text-amber-400">Cons</p>
                <ul className="space-y-1.5">
                  {book.cons.map((con) => (
                    <li
                      key={con}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-0.5 shrink-0 text-amber-400">–</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {book.note && (
              <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
                <strong>Note:</strong> {book.note}
              </div>
            )}
          </div>

          <p className="mb-4 text-sm text-text-secondary leading-relaxed">
            <strong className="text-text-primary">Who it&apos;s for:</strong>{" "}
            {book.whoFor}
          </p>

          <a
            href={`https://www.amazon.com/dp/${book.asin}?tag=${TAG}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-affiliate="amazon"
            data-asin={book.asin}
            data-book-id={book.id}
            data-source="study_book_page_full"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-accent-hover no-underline"
          >
            Check current price on Amazon →
          </a>
        </section>
      ))}

      {/* Honorable mentions */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          Honorable Mentions
        </h2>
        <p className="mb-4 text-text-secondary leading-relaxed">
          These didn&apos;t make the main list but are worth knowing about:
        </p>
        <div className="space-y-3">
          {[
            {
              title: "Trivium ASVAB Study Guide (6th ed.)",
              asin: "1637986793",
              note: "Strong budget option. Covers the AFQT subtests well. Lighter on technical content. Good if Test Prep Books is out of stock.",
            },
            {
              title: "Accepted Inc. ASVAB Study Guide",
              asin: null,
              note: "Decent entry-level book. Less name recognition but solid reviews. Worth a look if you see it on sale.",
            },
            {
              title: "StudyHelm ASVAB Prep",
              asin: null,
              note: "Newer publisher with growing reviews. Not enough track record yet to rank in the main list. Monitor for future editions.",
            },
          ].map((m) => (
            <div
              key={m.title}
              className="rounded-xl border border-navy-border bg-navy-light px-4 py-3"
            >
              <p className="font-semibold text-text-primary">{m.title}</p>
              <p className="mt-1 text-sm text-text-secondary">{m.note}</p>
              {m.asin && (
                <a
                  href={`https://www.amazon.com/dp/${m.asin}?tag=${TAG}`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  data-affiliate="amazon"
                  data-asin={m.asin}
                  data-book-id={m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}
                  data-source="study_book_page_honorable"
                  className="mt-2 inline-block text-xs font-semibold text-accent hover:text-accent-hover no-underline"
                >
                  View on Amazon →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* What you don't need to buy */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          What You Don&apos;t Need to Buy
        </h2>
        <p className="mb-3 text-text-secondary leading-relaxed">
          Before you spend $30 on a book, take our{" "}
          <Link
            href="/practice-test"
            className="text-accent hover:text-accent-hover no-underline"
          >
            free 30-question diagnostic
          </Link>
          . If you score 70%+ on your target subtests, you may not need a full
          prep book at all, or you can get away with a budget option rather
          than Kaplan Total Prep.
        </p>
        <p className="mb-3 text-text-secondary leading-relaxed">
          The second trap: buying a book AND an online prep subscription. Most
          recruits don&apos;t need both. If you want unlimited digital practice
          questions beyond what a book provides, our{" "}
          <Link
            href="/upgrade"
            className="text-accent hover:text-accent-hover no-underline"
          >
            ASVAB Hero Pro
          </Link>{" "}
          is a one-time $59 90-Day Pass (or $14.99/month) and covers all nine subtests with unlimited practice,
          a different use case from a physical book, but worth knowing before
          you pay $40/month for a competitor course.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Also skip: anything published before 2023. Used copies of 2019-2022
          editions are cheap for a reason. The question banks drift from the
          current test format, and the savings aren&apos;t worth the stale prep.
        </p>
      </section>

      {/* Buyer FAQ */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
          Buyer&apos;s FAQ
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How much should I budget for an ASVAB study book?",
              a: "Most quality ASVAB study guides run $20–35 on Amazon. The budget end (Test Prep Books, Trivium) is $20–25 and gets you 3 practice tests and solid AFQT coverage. The premium end (Kaplan Total Prep) is $30–35 and gets you 6–7 tests plus deeper content on all 9 subtests. Buy one good book and use it, buying three mediocre ones is a waste of money and time.",
            },
            {
              q: "Do I need both a study guide AND a practice test book?",
              a: "Not necessarily. Most books on this list include both content chapters and full practice tests. Kaplan Total Prep's 7 tests is enough volume for most recruits. The exception: if you've already studied the content but need more test reps, adding a second book or using ASVAB Hero Pro for unlimited online practice makes sense.",
            },
            {
              q: "When does the edition of an ASVAB book matter?",
              a: "Don't buy an edition older than 2 years. The AFQT scoring scale hasn't changed fundamentally since the PAY97 norms, but question banks, subtest question counts, and format details get updated regularly. A 2020 edition won't reflect current CAT-ASVAB changes. Stick to 2024-2026 editions.",
            },
            {
              q: "What's the best ASVAB book for retake candidates?",
              a: "For retakes, use your MEPS score report as your baseline, you know your weak subtests. You don't need a full content review. A targeted pick: Test Prep Books for budget or Kaplan Premium Prep for practice volume. Pair either with the free 30-question diagnostic at asvabhero.com/practice-test to measure where you stand before burning a retake attempt.",
            },
            {
              q: "Are free PDF guides good enough to pass the ASVAB?",
              a: "Free PDFs can supplement but rarely replace a structured study guide. Most have outdated question banks, no full practice tests, and weak explanations. If budget is genuinely tight, combine free resources (Khan Academy for math, officialasvab.com for practice questions) with our free diagnostic. That beats a bad paid book.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-navy-border bg-navy-light p-5"
            >
              <h3 className="mb-2 text-sm font-bold text-text-primary">
                {item.q}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
          Side-by-Side Comparison
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          Current prices vary, check Amazon links for up-to-date pricing.
        </p>
        <div className="overflow-x-auto rounded-xl border border-navy-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border bg-navy-lighter">
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Book
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Best For
                </th>
                <th className="px-4 py-3 text-right font-semibold text-text-secondary">
                  Pages
                </th>
                <th className="px-4 py-3 text-right font-semibold text-text-secondary">
                  Tests
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Edition
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Buyer
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ...books,
                {
                  id: "trivium",
                  label: "Honorable mention",
                  title: "Trivium ASVAB Study Guide",
                  publisher: "",
                  edition: "6th",
                  asin: "1637986793",
                  pages: "~350",
                  practiceTests: "3",
                  bestFor: "Budget backup",
                  pros: [],
                  cons: [],
                  whoFor: "",
                },
              ].map((book, i) => (
                <tr
                  key={book.id}
                  className="border-b border-navy-border last:border-0"
                >
                  <td className="px-4 py-2.5">
                    <a
                      href={`#${book.id}`}
                      className="text-accent hover:text-accent-hover no-underline"
                    >
                      {book.label}
                    </a>
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">
                    {book.bestFor}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-text-secondary">
                    {book.pages}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-text-secondary">
                    {book.practiceTests}
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">
                    {book.edition}
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">
                    {i === 0
                      ? "All levels"
                      : i === 1
                        ? "Beginner"
                        : i === 2
                          ? "Budget / retake"
                          : i === 3
                            ? "Visual learner"
                            : i === 4
                              ? "High volume"
                              : i === 5
                                ? "Branch-specific"
                                : i === 6
                                  ? "Mid-range"
                                  : i === 7
                                    ? "Flashcard supplement"
                                    : "Budget backup"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-accent/30 bg-accent-dim p-6 text-center sm:p-8">
        <h2 className="mb-3 font-display text-2xl font-bold text-text-primary">
          Not sure which book you need?
        </h2>
        <p className="mb-6 text-text-secondary">
          Take the free 30-question diagnostic first. Your subtest scores will
          tell you whether you need full content review (buy Kaplan Total Prep)
          or just practice volume (Kaplan Premium or our Pro plan).
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/practice-test"
            className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-accent-hover no-underline"
          >
            Take the Free Diagnostic
          </Link>
          <Link
            href="/asvab-study-guide"
            className="rounded-xl border border-navy-border bg-navy-light px-6 py-3 font-display text-sm font-bold text-text-primary transition-colors hover:bg-navy-lighter no-underline"
          >
            Browse the Study Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
