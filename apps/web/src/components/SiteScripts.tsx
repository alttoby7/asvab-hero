"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function SiteScripts() {
  const pathname = usePathname();
  if (pathname.startsWith("/embed")) return null;

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-96BXQ7YRJ8" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-96BXQ7YRJ8');
      `}</Script>
    </>
  );
}
