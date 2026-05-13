"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import UpgradeBanner from "@/components/UpgradeBanner";
import Footer from "@/components/Footer";

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith("/app");

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <UpgradeBanner />
      <main className="relative z-1">{children}</main>
      <Footer />
    </>
  );
}
