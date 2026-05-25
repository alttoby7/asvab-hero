/**
 * Authenticated practice surface. The app layout (src/app/app/layout.tsx) guards
 * auth + renders AppNav, so this is a thin SERVER wrapper around the shared
 * client engine. Hosts the in-app diagnostic / adaptive AFQT / subtest-drill /
 * full-sim flows, the route the home prescription, Your Plan, recommender, and
 * VariantPicker link to (/app/practice?variant=…). PracticeTestClient reads
 * ?variant and ?subtest.
 *
 * Kept a server component (no "use client") so it can declare `noindex`, this
 * is the member-shell duplicate of the public, canonical /practice-test.
 */

import type { Metadata } from "next";
import PracticeTestClient from "@/components/practice-test/PracticeTestClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppPracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PracticeTestClient />
    </div>
  );
}
