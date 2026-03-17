import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
              Find Every Military Job{" "}
              <span className="text-accent">You Qualify For</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
              Enter your ASVAB scores and instantly see qualifying jobs across
              all 6 branches. Free, fast, and always up to date.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-accent/30 no-underline"
              >
                Try the Calculator
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-xl border border-navy-border px-8 py-3.5 text-base font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary no-underline"
              >
                View Pro Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-navy-border bg-navy-light/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-text-primary sm:text-3xl">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter Your Scores",
                desc: "Input your 9 ASVAB subtest standard scores. Don't have them yet? Use our defaults to explore.",
              },
              {
                step: "2",
                title: "See Your Results",
                desc: "Instantly view your AFQT percentile, branch-specific composite scores, and qualifying jobs.",
              },
              {
                step: "3",
                title: "Plan Your Career",
                desc: "Filter by branch, search by job title, and discover which scores to improve for your dream role.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-dim">
                  <span className="font-mono text-xl font-bold text-accent">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Test CTA */}
      <section className="border-t border-navy-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-navy-border bg-navy-light p-8 text-center sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-dim">
              <svg
                className="h-7 w-7 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Free ASVAB Practice Test
            </h2>
            <p className="max-w-lg text-text-secondary">
              Take our free 30-question practice test covering all 9 subtests.
              Get your estimated AFQT score and see where you need to improve —
              no sign-up required.
            </p>
            <Link
              href="/practice-test"
              className="inline-flex items-center rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-accent/30 no-underline"
            >
              Take Free Practice Test
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-navy-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "6", label: "Military Branches" },
              { value: "500+", label: "Military Jobs" },
              { value: "100%", label: "Free to Use" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-navy-border bg-navy-light p-8 text-center"
              >
                <div className="font-mono text-4xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Teaser */}
      <section className="border-t border-navy-border bg-navy-light/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-8 sm:p-12 text-center">
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Coming Soon: ASVAB Hero Pro
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Unlimited practice tests, score tracking, smart study plans, and a
              &ldquo;what-if&rdquo; calculator to see which jobs unlock when you
              improve your scores.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
