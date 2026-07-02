import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade to Pro — ASVAB Hero",
  description:
    "Unlock unlimited ASVAB practice, full-length sims, and score tracking. 90-Day Pass $59, one-time. Money-back guarantee.",
};

export default function UpgradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
