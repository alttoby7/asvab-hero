"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const RANKS_LINKS = [
  { href: "/air-force-ranks", label: "Air Force Ranks" },
  { href: "/army-ranks", label: "Army Ranks" },
  { href: "/navy-ranks", label: "Navy Ranks" },
];

export default function Nav() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [open, setOpen] = useState(false);
  const [ranksOpen, setRanksOpen] = useState(false);
  const ranksRef = useRef<HTMLDivElement>(null);

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ranksRef.current && !ranksRef.current.contains(e.target as Node)) {
        setRanksOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showUpgradeLink =
    !sessionLoading && !entitlementLoading && !!session && !entitlement.isPro;

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
            <span className="font-display text-xl font-bold text-accent">ASVAB</span>
            <span className="font-display text-xl font-bold text-text-primary">Hero</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/calculator" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
              Calculator
            </Link>
            <Link href="/practice-test" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
              Practice Test
            </Link>
            <Link href="/asvab-scores-explained" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
              Scores Guide
            </Link>
            <Link href="/asvab-study-guide" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
              Study Guide
            </Link>

            <div className="relative" ref={ranksRef}>
              <button
                onClick={() => setRanksOpen((v) => !v)}
                aria-expanded={ranksOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Ranks
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${ranksOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 4l4 4 4-4" />
                </svg>
              </button>
              {ranksOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-44 rounded-xl border border-navy-border bg-navy-light py-1 shadow-lg"
                  style={{ animation: "fadeDown 0.1s ease-out" }}
                >
                  {RANKS_LINKS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setRanksOpen(false)}
                      className="block px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary no-underline"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
              Pricing
            </Link>

            {!sessionLoading && !session && (
              <Link href="/login" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
                Log in
              </Link>
            )}
            {!sessionLoading && session && (
              <div className="flex items-center gap-3">
                <Link href="/account" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">
                  Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}

            {showUpgradeLink && (
              <Link
                href="/upgrade?from=nav"
                className="rounded-lg border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white no-underline"
              >
                Upgrade
              </Link>
            )}
            {!showUpgradeLink && (
              <Link
                href="/calculator"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
              >
                Try Calculator
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-text-secondary transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-text-secondary transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-text-secondary transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {open && (
          <div className="border-t border-navy-border pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-3">
              <Link href="/calculator" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                Calculator
              </Link>
              <Link href="/practice-test" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                Practice Test
              </Link>
              <Link href="/asvab-scores-explained" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                Scores Guide
              </Link>
              <Link href="/asvab-study-guide" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                Study Guide
              </Link>
              <div className="px-3">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-text-tertiary">Ranks</p>
                <div className="flex flex-col gap-1 pl-2 border-l border-navy-border">
                  {RANKS_LINKS.map(({ href, label }) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)} className="py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary no-underline">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/pricing" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                Pricing
              </Link>
              <Link href="/about" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                About
              </Link>
              {!sessionLoading && !session && (
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                  Log in
                </Link>
              )}
              {!sessionLoading && session && (
                <>
                  <Link href="/account" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary no-underline">
                    Account
                  </Link>
                  {showUpgradeLink && (
                    <Link href="/upgrade?from=nav" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-accent hover:bg-navy-light no-underline">
                      Upgrade to Pro
                    </Link>
                  )}
                  <button
                    onClick={() => { setOpen(false); handleSignOut(); }}
                    className="rounded-md px-3 py-2 text-left text-sm font-medium text-text-secondary hover:bg-navy-light hover:text-text-primary"
                  >
                    Sign out
                  </button>
                </>
              )}
              <Link href="/calculator" onClick={() => setOpen(false)} className="mt-1 rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-white no-underline">
                Try Calculator
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
