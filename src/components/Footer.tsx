import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-navy-border bg-navy-light">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4">
              <span className="font-display text-lg font-bold text-accent">
                ASVAB
              </span>{" "}
              <span className="font-display text-lg font-bold text-text-primary">
                Hero
              </span>
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Free ASVAB score calculator and military job finder. See every job
              you qualify for across all 6 branches of the U.S. military.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Tools
            </h3>
            <ul className="space-y-2 list-none p-0">
              <li>
                <Link
                  href="/calculator"
                  className="text-sm text-text-tertiary hover:text-text-primary no-underline"
                >
                  ASVAB Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-text-tertiary hover:text-text-primary no-underline"
                >
                  Pro Features
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-text-tertiary hover:text-text-primary no-underline"
                >
                  Study Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Company
            </h3>
            <ul className="space-y-2 list-none p-0">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-tertiary hover:text-text-primary no-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-tertiary hover:text-text-primary no-underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-border pt-6">
          <p className="text-center text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} ASVAB Hero. Not affiliated with
            the U.S. Department of Defense.
          </p>
        </div>
      </div>
    </footer>
  );
}
