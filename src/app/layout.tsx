import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://asvabhero.com"),
  title: {
    default: "ASVAB Hero — Free ASVAB Score Calculator & Military Job Finder",
    template: "%s | ASVAB Hero",
  },
  description:
    "Enter your ASVAB scores and instantly see every military job you qualify for across all 6 branches. Free calculator with 500+ jobs.",
  openGraph: {
    siteName: "ASVAB Hero",
    type: "website",
    locale: "en_US",
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
        <Nav />
        <main className="relative z-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
