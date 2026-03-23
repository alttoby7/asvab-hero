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
  { path: "/asvab-scoring-and-results", priority: "0.8", changefreq: "monthly" },
  { path: "/highest-asvab-score", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-score-average", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-electronics-information-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-mechanical-comprehension-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/usmc-mos-list", priority: "0.8", changefreq: "monthly" },
  { path: "/army-mos-list", priority: "0.8", changefreq: "monthly" },
  { path: "/air-force-afsc-list", priority: "0.8", changefreq: "monthly" },
  { path: "/how-to-retake-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/asvab-arithmetic-reasoning-tips", priority: "0.8", changefreq: "monthly" },
  { path: "/how-many-questions-on-the-asvab", priority: "0.8", changefreq: "monthly" },
  { path: "/marine-corps-ranks", priority: "0.9", changefreq: "monthly" },
  { path: "/pricing", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/contact", priority: "0.4", changefreq: "monthly" },
  { path: "/blog", priority: "0.6", changefreq: "weekly" },
];

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
