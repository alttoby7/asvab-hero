import type { Metadata } from "next";
import PricingPlans from "@/components/PricingPlans";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ASVAB Hero pricing — free calculator for everyone, Pro subscription for unlimited practice tests and study tools.",
  alternates: {
    canonical: "https://asvabhero.com/pricing",
  },
};

const FAQ = [
  {
    q: "Is one free test enough?",
    a: "It's a real 30-question adaptive diagnostic — not a teaser. You'll get full results with per-question explanations and a clear picture of your weak subtests. Pro unlocks the practice volume to actually fix them.",
  },
  {
    q: "Why is this cheaper than other ASVAB prep sites?",
    a: "Solo operator, no overhead. Other sites charge $30-70/mo because they have staff and investors to pay. I want this affordable for recruits and parents who are already stressed about costs.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes -- cancel anytime from your account billing page. You keep Pro access through the end of your paid period, then it lapses to Free. No pressure.",
  },
  {
    q: "Do I need Pro if I already know my weak areas?",
    a: "The free diagnostic shows you the gap. Pro closes it. Knowing you struggle with Arithmetic Reasoning is half the battle -- but you need repetition drilled on those specific topics to move the needle before test day.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-text-secondary">
          Start with one free diagnostic. Upgrade for unlimited practice.
        </p>
      </div>

      <div className="mb-10">
        <EmailCapture
          variant="inline"
          headline="Not ready to upgrade? Get the free 30-day plan first"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="pricing-exit"
        />
      </div>

      <PricingPlans defaultBilling="annual" source="pricing_page" />

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
