import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseUrl = "https://asvabhero.com";
const today = new Date().toISOString().split("T")[0];

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/calculator", priority: "0.9", changefreq: "weekly" },
  { path: "/practice-test", priority: "0.9", changefreq: "weekly" },
  { path: "/counselor-resources", priority: "0.9", changefreq: "monthly" },
  { path: "/embed", priority: "0.6", changefreq: "monthly" },
  { path: "/how-it-works", priority: "0.9", changefreq: "monthly" },
  { path: "/the-science", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-scores-explained", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-study-guide", priority: "0.8", changefreq: "monthly" },
  { path: "/air-force-ranks", priority: "0.9", changefreq: "monthly" },
  { path: "/army-ranks", priority: "0.9", changefreq: "monthly" },
  { path: "/navy-ranks", priority: "0.9", changefreq: "monthly" },
  { path: "/asvab-score-chart", priority: "0.9", changefreq: "monthly" },
  { path: "/what-is-a-good-asvab-score", priority: "0.9", changefreq: "monthly" },
  { path: "/how-to-study-for-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-paragraph-comprehension-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-math-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-word-knowledge-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/what-is-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/is-the-asvab-hard", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-scoring-and-results", priority: "0.8", changefreq: "monthly" },
  { path: "/highest-asvab-score", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-score-average", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-electronics-information-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-mechanical-comprehension-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/usmc-mos-list", priority: "0.8", changefreq: "monthly" },
  { path: "/army-mos-list", priority: "0.8", changefreq: "monthly" },
  { path: "/air-force-afsc-list", priority: "0.8", changefreq: "monthly" },
  { path: "/navy-ratings-list", priority: "0.85", changefreq: "monthly" },
  { path: "/how-to-retake-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-arithmetic-reasoning-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/how-many-questions-on-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/can-you-use-a-calculator-on-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/marine-corps-ranks", priority: "0.9", changefreq: "monthly" },
  { path: "/asvab-score-ranges", priority: "0.8", changefreq: "monthly" },
  { path: "/afqt-score", priority: "0.8", changefreq: "monthly" },
  { path: "/what-does-asvab-stand-for", priority: "0.8", changefreq: "monthly" },
  { path: "/navy-asvab-score", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-general-science-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-retake-policy", priority: "0.8", changefreq: "monthly" },
  { path: "/gt-score-calculator", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-line-score-calculator", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-composite-score-calculator", priority: "0.8", changefreq: "monthly" },
  { path: "/mos-asvab-score-requirements", priority: "0.8", changefreq: "monthly" },
  { path: "/warrant-officer-requirements", priority: "0.8", changefreq: "monthly" },
  { path: "/mos-reclassification", priority: "0.8", changefreq: "monthly" },
  { path: "/what-jobs-qualify-asvab-score", priority: "0.8", changefreq: "monthly" },
  { path: "/gt-score", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-prep-course", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-vocabulary", priority: "0.8", changefreq: "monthly" },
  { path: "/flashcards", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-tutor", priority: "0.8", changefreq: "monthly" },
  { path: "/pricing", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/contact", priority: "0.4", changefreq: "monthly" },
  { path: "/blog", priority: "0.6", changefreq: "weekly" },
  { path: "/army-asvab-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/navy-asvab-score-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/air-force-asvab-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/marines-asvab-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/coast-guard-asvab-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/space-force-asvab-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/asvab-retake-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/afqt-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/army-afqt-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/navy-afqt-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/air-force-afqt-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/marines-afqt-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/asvab-score-converter", priority: "0.9", changefreq: "monthly" },
  { path: "/can-i-check-my-asvab-score-online", priority: "0.8", changefreq: "monthly" },
  { path: "/best-asvab-study-book", priority: "0.8", changefreq: "monthly" },
  { path: "/best-asvab-practice-test-book", priority: "0.8", changefreq: "monthly" },
  { path: "/best-asvab-online-prep", priority: "0.85", changefreq: "monthly" },
  { path: "/free-asvab-practice-tests", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test", priority: "0.9", changefreq: "monthly" },
  // Per-subtest free practice pages (crawlable questions + explanations)
  { path: "/free-asvab-practice-test/arithmetic-reasoning", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/word-knowledge", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/paragraph-comprehension", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/mathematics-knowledge", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/general-science", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/electronics-information", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/auto-and-shop-information", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/mechanical-comprehension", priority: "0.9", changefreq: "monthly" },
  { path: "/free-asvab-practice-test/assembling-objects", priority: "0.9", changefreq: "monthly" },
  { path: "/full-length-asvab-practice-test", priority: "0.9", changefreq: "monthly" },
  { path: "/afct", priority: "0.8", changefreq: "monthly" },
  { path: "/afct-practice-test", priority: "0.9", changefreq: "monthly" },
  { path: "/bsep", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-score-requirements", priority: "0.9", changefreq: "monthly" },
  { path: "/army-asvab-score", priority: "0.85", changefreq: "monthly" },
  { path: "/air-force-asvab-score", priority: "0.85", changefreq: "monthly" },
  { path: "/marines-asvab-score", priority: "0.85", changefreq: "monthly" },
  { path: "/coast-guard-asvab-score", priority: "0.85", changefreq: "monthly" },
  { path: "/march2success-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/programs", priority: "0.7", changefreq: "monthly" },
  { path: "/air-force-jobs", priority: "0.85", changefreq: "monthly" },
  { path: "/air-force-mage-score", priority: "0.8", changefreq: "monthly" },
  { path: "/air-force-security-forces-asvab-score", priority: "0.7", changefreq: "monthly" },
  { path: "/air-force-loadmaster-asvab-score", priority: "0.7", changefreq: "monthly" },
  { path: "/air-force-pararescue-asvab-score", priority: "0.7", changefreq: "monthly" },
  { path: "/air-force-pilot-asvab-requirements", priority: "0.7", changefreq: "monthly" },
];

// This is an intentional allowlist, not auto-discovery — it gives us explicit
// control over what Google indexes. Deliberately EXCLUDED (do not "fix"):
//   - /app/*, auth, dashboard, checkout, billing — private/app-shell routes
//   - /embed/* widget subpages — marked robots:{index:false} (sitemapping a
//     noindex page sends conflicting signals)
//   - /upgrade — client-only conversion funnel, not an organic-search target
//   - dynamic routes ([param]) and route groups ((group))
// When you add a new *public, indexable content* page, add it here.

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(out, xml);
console.log("Generated sitemap.xml");
