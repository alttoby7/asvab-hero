import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ASVAB Hero team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 text-text-secondary">
        Have a question, found a bug, or want to suggest a feature? We&apos;d
        love to hear from you.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-lg border border-navy-border bg-navy-light px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border border-navy-border bg-navy-light px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full rounded-lg border border-navy-border bg-navy-light px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent resize-y"
            placeholder="What's on your mind?"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
