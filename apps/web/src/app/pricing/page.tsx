import type { Metadata } from "next";
import PricingPlans from "@/components/PricingPlans";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ASVAB Hero pricing: a free score-moving core for everyone, plus Pro for unlimited practice tests and study tools — best value at $49.99/year, or a one-time 90-Day Pass or month-to-month.",
  alternates: {
    canonical: "https://asvabhero.com/pricing",
  },
};

const FAQ = [
  {
    q: "What's actually free?",
    a: "The whole score-moving core: a daily adaptive AFQT block, unlimited Mistake-Bank review, your weekly study plan, the full diagnostic with per-question explanations, and the calculators. No card required. Pro adds unlimited practice, full-length timed sims, and deeper analytics.",
  },
  {
    q: "Why is this cheaper than other ASVAB prep sites?",
    a: "Solo operator, no overhead. Other sites charge $30-70/mo because they have staff and investors to pay. I want this affordable for recruits and parents who are already stressed about costs.",
  },
  {
    q: "Do I have to deal with a subscription?",
    a: "Only if you want to. The 90-Day Pass is a one-time payment -- it just expires after 90 days, nothing to cancel and no auto-renew. If you pick the $14.99/month option instead, you can cancel anytime from your billing page and keep access through the end of the paid period.",
  },
  {
    q: "Do I need Pro if I already know my weak areas?",
    a: "Not to start. The free plan already drills your weak areas with one adaptive AFQT block a day plus unlimited Mistake-Bank review. Pro removes the daily limit and adds full-length timed sims for the final stretch before test day.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ASVAB Hero Pro",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          description:
            "ASVAB Hero Pro unlocks unlimited adaptive practice, full-length timed ASVAB simulations, targeted subtest drills, and deeper analytics on top of the free score-moving core (diagnostic, daily adaptive practice, Mistake-Bank, calculators).",
          url: "https://asvabhero.com/pricing",
          publisher: { "@id": "https://asvabhero.com/#organization" },
          offers: [
            {
              "@type": "Offer",
              name: "Pro Annual",
              price: "49.99",
              priceCurrency: "USD",
              url: "https://asvabhero.com/pricing",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "90-Day Test Pass",
              price: "59.00",
              priceCurrency: "USD",
              url: "https://asvabhero.com/pricing",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "Pro Monthly",
              price: "14.99",
              priceCurrency: "USD",
              url: "https://asvabhero.com/pricing",
              availability: "https://schema.org/InStock",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-text-secondary">
          ASVAB Hero Pro costs $49.99 per year (best value), $14.99 per month, or $59 for a one-time 90-Day Pass. The score-moving core -- daily adaptive practice, Mistake Bank, and calculators -- is always free with no card required.
        </p>
      </div>

      <PricingPlans defaultTier="annual" source="pricing_page" />

      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-text-primary text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {FAQ.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-2xl border border-navy-border bg-navy-light p-6"
            >
              <h3 className="font-semibold text-text-primary mb-2">{q}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
