import type { ReactNode } from "react";

type VerifiedSource = {
  label: string;
  url: string;
};

type VerifiedBlockProps = {
  title?: string;
  verifiedDate: string;
  sources: VerifiedSource[];
  children: ReactNode;
};

export default function VerifiedBlock({
  title = "The short answer",
  verifiedDate,
  sources,
  children,
}: VerifiedBlockProps) {
  return (
    <aside className="mt-6 rounded-lg border-l-4 border-accent bg-navy-lighter/60 p-5">
      <p className="text-sm font-semibold text-accent">{title}</p>
      <div className="mt-2 text-text-primary">{children}</div>
      <p className="mt-3 text-sm text-text-tertiary">
        {sources.length > 0 && "Source: "}
        {sources.map((source, i) => (
          <span key={source.url}>
            {i > 0 && ", "}
            <a
              href={source.url}
              className="underline hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.label}
            </a>
          </span>
        ))}
        {sources.length > 0 && " · "}
        Last verified: {verifiedDate}
      </p>
    </aside>
  );
}
