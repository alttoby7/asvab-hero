"use client";

import { usePathname } from "next/navigation";
import OutboundTracker from "@/components/OutboundTracker";
import { AnalyticsUserBinder } from "@/components/AnalyticsUserBinder";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/embed")) return null;

  return (
    <>
      <OutboundTracker />
      <AnalyticsUserBinder />
    </>
  );
}
