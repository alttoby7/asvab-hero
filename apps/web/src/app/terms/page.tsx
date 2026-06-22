import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for ASVAB Hero.",
  alternates: { canonical: "https://asvabhero.com/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-100">
        Terms of Service
      </h1>
      <p className="mb-4 text-sm text-slate-400">
        Effective date: June 21, 2026
      </p>

      <div className="space-y-6 text-slate-300 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-100">
        <h2>1. Acceptance</h2>
        <p>
          By accessing or using asvabhero.com and the ASVAB Hero mobile
          application (the &ldquo;Service&rdquo;), you agree to these Terms of
          Service. If you do not agree, do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          ASVAB Hero provides ASVAB practice questions, score calculators, study
          guides, and related educational content. Some features require a paid
          subscription (&ldquo;Pro&rdquo;).
        </p>

        <h2>3. Accounts</h2>
        <p>
          You may create an account using email or social login. You are
          responsible for maintaining the security of your account credentials.
          You must be at least 13 years old to use the Service.
        </p>

        <h2>4. Payments and Subscriptions</h2>
        <p>
          Pro subscriptions are billed through Stripe. You may cancel at any
          time; access continues until the end of the billing period. Refunds
          are handled on a case-by-case basis.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, questions, explanations, and code are owned by ASVAB Hero
          or its licensors. You may not copy, redistribute, or sell any content
          from the Service.
        </p>

        <h2>6. User Conduct</h2>
        <p>
          You agree not to misuse the Service, attempt to access it through
          automated means (other than authorized APIs), or use it for any
          unlawful purpose.
        </p>

        <h2>7. Disclaimer</h2>
        <p>
          ASVAB Hero is an independent study tool and is not affiliated with the
          U.S. Department of Defense or any military branch. Practice scores are
          estimates and do not guarantee actual ASVAB results.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          The Service is provided &ldquo;as is.&rdquo; ASVAB Hero is not liable
          for any indirect, incidental, or consequential damages arising from
          your use of the Service.
        </p>

        <h2>9. Changes</h2>
        <p>
          We may update these Terms at any time. Continued use after changes
          constitutes acceptance.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions? Email{" "}
          <a
            href="mailto:support@asvabhero.com"
            className="text-orange-400 hover:underline"
          >
            support@asvabhero.com
          </a>
          .
        </p>
      </div>

      <div className="mt-10 border-t border-slate-700 pt-6">
        <Link href="/" className="text-orange-400 hover:underline">
          &larr; Back to ASVAB Hero
        </Link>
      </div>
    </div>
  );
}
