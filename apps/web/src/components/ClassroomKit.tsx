"use client";

import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Free "classroom kit" for counselors, teachers, and JROTC instructors. Lets an
 * educator hand an entire class the free practice test with (a) a shareable
 * link, (b) a ready-to-paste website snippet with a branded anchor, and (c) a
 * printable one-page handout. Deliberately backend-free: no accounts, no roster,
 * no student data. It is the free front door that funnels to the paid /programs
 * Program License, and a linkable asset that earns brand-named citations.
 *
 * Clipboard + print copy contains NO em-dash characters (repo build guard).
 */

const STUDENT_URL = "https://asvabhero.com/practice-test";
const LINK_SNIPPET = `<a href="${STUDENT_URL}">ASVAB practice test by ASVAB Hero</a>`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function ClassroomKit() {
  const [className, setClassName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [testDate, setTestDate] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (text: string, key: string) => {
    trackEvent("classroom_copy", { key });
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(key);
    setTimeout(() => setCopied((k) => (k === key ? null : k)), 1800);
  }, []);

  const printHandout = useCallback(() => {
    trackEvent("classroom_print", {});
    const title = className.trim() || "ASVAB Practice";
    const meta = [
      instructor.trim() ? `Instructor: ${escapeHtml(instructor.trim())}` : "",
      testDate.trim() ? `Test date: ${escapeHtml(testDate.trim())}` : "",
    ]
      .filter(Boolean)
      .join(" &nbsp;&middot;&nbsp; ");

    const html =
      `<!doctype html><html><head><meta charset="utf-8">` +
      `<title>${escapeHtml(title)} - ASVAB Practice</title><style>` +
      `body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;margin:0;padding:48px;}` +
      `.wrap{max-width:640px;margin:0 auto;text-align:center;}` +
      `h1{font-size:26px;margin:0 0 4px;}` +
      `.sub{color:#555;font-size:14px;margin:0 0 28px;}` +
      `.card{border:2px solid #111;border-radius:14px;padding:28px;margin:0 0 24px;}` +
      `.label{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#666;margin:0 0 8px;}` +
      `.url{font-size:26px;font-weight:700;word-break:break-all;}` +
      `ol{text-align:left;font-size:16px;line-height:1.7;max-width:460px;margin:0 auto;padding-left:22px;}` +
      `.foot{margin-top:28px;font-size:12px;color:#777;}` +
      `</style></head><body><div class="wrap">` +
      `<h1>${escapeHtml(title)}</h1>` +
      (meta
        ? `<p class="sub">${meta}</p>`
        : `<p class="sub">ASVAB practice, no account needed</p>`) +
      `<div class="card"><p class="label">Go to this practice test</p>` +
      `<p class="url">asvabhero.com/practice-test</p></div>` +
      `<ol>` +
      `<li>Open the link on any phone, tablet, or computer.</li>` +
      `<li>Take the practice test. No account or email needed to start.</li>` +
      `<li>Read every answer explanation to see what to study next.</li>` +
      `</ol>` +
      `<p class="foot">From ASVAB Hero. Not affiliated with the U.S. Department of Defense.</p>` +
      `</div><script>window.onload=function(){window.print();}</script></body></html>`;

    const w = window.open("", "_blank", "width=820,height=900");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
  }, [className, instructor, testDate]);

  const inputClass =
    "mt-1.5 w-full rounded-md border border-navy-border bg-navy px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none";

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Class name
          </span>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="1st Period JROTC"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Instructor (optional)
          </span>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="SFC Rivera"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Test date (optional)
          </span>
          <input
            type="text"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            placeholder="Oct 15"
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-5 rounded-md border border-navy-border bg-navy px-3 py-2">
        <p className="text-xs text-text-tertiary">Student link</p>
        <p className="mt-0.5 break-all font-mono text-sm text-text-primary">
          {STUDENT_URL}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={printHandout}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Print classroom handout
        </button>
        <button
          onClick={() => copy(STUDENT_URL, "link")}
          className="rounded-md border border-navy-border bg-navy px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          {copied === "link" ? "Copied ✓" : "Copy student link"}
        </button>
        <button
          onClick={() => copy(LINK_SNIPPET, "html")}
          className="rounded-md border border-navy-border bg-navy px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter"
        >
          {copied === "html" ? "Copied ✓" : "Copy link for your website"}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-text-tertiary">
        The handout prints your class name and the practice-test link with simple
        steps. The website link is a ready-to-paste HTML snippet. The practice
        test needs no account to start.
      </p>
    </div>
  );
}
