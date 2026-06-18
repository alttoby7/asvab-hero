"use client";

import { usePathname } from "next/navigation";
import JsonLd from "@/components/JsonLd";

export default function SiteJsonLd() {
  const pathname = usePathname();
  if (pathname.startsWith("/embed")) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://asvabhero.com/#organization",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
            logo: {
              "@type": "ImageObject",
              url: "https://asvabhero.com/og-image.png",
            },
            description:
              "ASVAB Hero builds free ASVAB score calculators, a military job finder covering all 6 branches, and practice tests and study guides for the ASVAB and AFCT.",
            sameAs: [
              "https://www.youtube.com/@asvabhero",
              "https://www.tiktok.com/@asvabhero",
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://asvabhero.com/#website",
            name: "ASVAB Hero",
            url: "https://asvabhero.com",
            description:
              "Free ASVAB score calculator and military job finder",
            publisher: { "@id": "https://asvabhero.com/#organization" },
          },
        ],
      }}
    />
  );
}
