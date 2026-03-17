"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10, 22, 40, 0.85)",
        backdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="font-display text-xl font-bold text-accent">
              ASVAB
            </span>
            <span className="font-display text-xl font-bold text-text-primary">
              Hero
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/calculator"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline"
            >
              Calculator
            </Link>
            <Link
              href="/practice-test"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline"
            >
              Practice Test
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline"
            >
              About
            </Link>
            <Link
              href="/calculator"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
            >
              Try Calculator
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-text-secondary transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-secondary transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-secondary transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-navy-border pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-3">
              <Link
                href="/calculator"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline"
              >
                Calculator
              </Link>
              <Link
                href="/practice-test"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline"
              >
                Practice Test
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline"
              >
                About
              </Link>
              <Link
                href="/calculator"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-white no-underline"
              >
                Try Calculator
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
