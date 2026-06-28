import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ASVAB Hero.",
  alternates: { canonical: "https://asvabhero.com/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-100">
        Privacy Policy
      </h1>
      <p className="mb-4 text-sm text-slate-400">
        Effective date: June 21, 2026
      </p>

      <div className="space-y-6 text-slate-300 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-100">
        <h2>1. Information We Collect</h2>
        <p>
          <strong>Account data:</strong> email address, display name, and
          authentication provider (Google, Apple, or email).
        </p>
        <p>
          <strong>Usage data:</strong> practice questions answered, scores,
          study session activity, and device/browser information via Google
          Analytics 4.
        </p>
        <p>
          <strong>Payment data:</strong> processed by Stripe. We do not store
          credit card numbers.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your data to provide personalized practice, track your
          progress, process payments, and improve the Service. We do not sell
          your personal information.
        </p>

        <h2>3. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="ml-6 list-disc space-y-1">
          <li>Supabase (database and authentication)</li>
          <li>Stripe (payment processing)</li>
          <li>Google Analytics 4 (usage analytics)</li>
          <li>Cloudflare (hosting and CDN)</li>
          <li>TikTok Content Posting API (social media publishing)</li>
        </ul>

        <h2>4. TikTok Integration</h2>
        <p>
          We use the TikTok Content Posting API to publish educational quiz
          videos to our official TikTok account (@asvabhero). This integration
          accesses only our own account and does not collect, access, or store
          any TikTok user data.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use essential cookies for authentication and analytics cookies via
          Google Analytics 4. You can disable cookies in your browser settings.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          Account and progress data is retained while your account is active.
          You may request deletion by emailing us.
        </p>

        <h2>7. Children&rsquo;s Privacy</h2>
        <p>
          The Service is intended for users aged 13 and older. We do not
          knowingly collect data from children under 13.
        </p>

        <h2>8. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your
          personal data at any time by contacting us.
        </p>

        <h2>9. Changes</h2>
        <p>
          We may update this policy. Changes will be posted on this page with a
          revised effective date.
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
