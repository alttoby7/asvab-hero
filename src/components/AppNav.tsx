"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEntitlement } from "@/hooks/useEntitlement";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/app/home", label: "Home", icon: "home" },
  { href: "/app/daily", label: "Daily", icon: "daily" },
  { href: "/practice-test", label: "Practice", icon: "practice" },
  { href: "/asvab-study-guide", label: "Study", icon: "study" },
  { href: "/flashcards", label: "Cards", icon: "cards" },
];

function NavIcon({ icon, className }: { icon: string; className?: string }) {
  const cn = className ?? "h-5 w-5";
  switch (icon) {
    case "home":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      );
    case "daily":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "practice":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      );
    case "study":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
    case "cards":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AppNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { entitlement } = useEntitlement();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname?.startsWith(href + "/");
  }

  return (
    <>
      {/* Desktop top bar */}
      <nav
        className="hidden sm:block"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10, 22, 40, 0.85)",
          backdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/app/home"
              className="font-display text-lg font-bold text-white no-underline"
            >
              <span className="text-accent">ASVAB</span> Hero
            </Link>

            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium no-underline transition ${
                    isActive(link.href)
                      ? "bg-white/10 text-white"
                      : "text-text-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {!entitlement.isPro && (
                <Link
                  href="/upgrade?from=app-nav"
                  className="text-xs font-medium text-accent no-underline hover:text-accent-hover"
                >
                  Upgrade
                </Link>
              )}

              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white hover:bg-white/20"
                >
                  {entitlement.isPro ? "P" : "F"}
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-navy-border bg-navy-light py-1 shadow-xl">
                    <Link
                      href="/app/home"
                      className="block px-4 py-2 text-sm text-text-secondary no-underline hover:bg-white/5 hover:text-white"
                      onClick={() => setAccountOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account/settings"
                      className="block px-4 py-2 text-sm text-text-secondary no-underline hover:bg-white/5 hover:text-white"
                      onClick={() => setAccountOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      href="/account/billing"
                      className="block px-4 py-2 text-sm text-text-secondary no-underline hover:bg-white/5 hover:text-white"
                      onClick={() => setAccountOpen(false)}
                    >
                      Billing
                    </Link>
                    <hr className="my-1 border-navy-border" />
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-text-tertiary hover:bg-white/5 hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-100 border-t border-white/6 sm:hidden"
        style={{
          background: "rgba(10, 22, 40, 0.95)",
          backdropFilter: "blur(20px) saturate(1.4)",
        }}
      >
        <div className="flex h-14 items-center justify-around px-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 no-underline transition ${
                  active ? "text-accent" : "text-text-tertiary"
                }`}
              >
                <NavIcon icon={link.icon} />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
