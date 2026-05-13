import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import MarketingShell from "@/components/MarketingShell";
import JsonLd from "@/components/JsonLd";
import OutboundTracker from "@/components/OutboundTracker";
import { AnalyticsUserBinder } from "@/components/AnalyticsUserBinder";

const siteTitle =
  "ASVAB Hero — Free ASVAB Score Calculator & Military Job Finder";
const siteDescription =
  "Enter your ASVAB scores and instantly see every military job you qualify for across all 6 branches. Free calculator with 500+ jobs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://asvabhero.com"),
  title: {
    default: siteTitle,
    template: "%s | ASVAB Hero",
  },
  description: siteDescription,
  keywords: [
    "ASVAB calculator",
    "ASVAB score calculator",
    "AFQT score",
    "military job finder",
    "ASVAB practice test",
    "ASVAB line scores",
    "ASVAB composite scores",
    "military entrance exam",
    "ASVAB study guide",
    "armed forces qualification test",
  ],
  alternates: {
    canonical: "https://asvabhero.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://asvabhero.com",
    siteName: "ASVAB Hero",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ASVAB Hero — Free practice tests + score calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
            description:
              "Free ASVAB score calculator and military job finder",
          }}
        />
        <MarketingShell>{children}</MarketingShell>
        <OutboundTracker />
        <AnalyticsUserBinder />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-96BXQ7YRJ8" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-96BXQ7YRJ8');
        `}</Script>
      </body>
    </html>
  );
}
