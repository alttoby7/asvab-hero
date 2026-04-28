"use client";

import Link from "next/link";
import type { NextStepRecommendation } from "@/types";

interface NextStepCardProps {
  recommendation: NextStepRecommendation;
}

export default function NextStepCard({ recommendation }: NextStepCardProps) {
  const { headline, body, ctaLabel, ctaHref } = recommendation;

  return (
    <section
      className="rounded-2xl border border-accent/30 bg-gradient-to-br from-[#0a1628] to-[#101e36] p-6 sm:p-7"
      style={{ boxShadow: "0 0 0 1px rgba(249, 115, 22, 0.15) inset" }}
    >
      <div className="flex items-start gap-4">
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f97316]/15 sm:flex">
          <svg
            className="h-5 w-5 text-[#f97316]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
            Recommended next step
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-text-primary sm:text-xl">
            {headline}
          </h3>
          <p className="mt-2 text-sm text-text-secondary">{body}</p>
          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#f97316] px-5 py-2.5 font-display text-sm font-bold text-white no-underline transition-all duration-200 hover:bg-[#fb923c] hover:shadow-[0_0_24px_rgba(249,115,22,0.4)]"
          >
            {ctaLabel}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
