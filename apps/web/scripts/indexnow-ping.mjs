/**
 * IndexNow ping — submits the site's URLs to Bing/IndexNow so new and updated
 * pages get discovered fast (low-authority sites are hurt most by slow crawl
 * discovery, and Microsoft's AI grounding is Bing-based).
 *
 * Run after a deploy:  node scripts/indexnow-ping.mjs
 * Or a subset:         node scripts/indexnow-ping.mjs /afqt-calculator /programs
 *
 * Setup (one-time, operator):
 *   1. Generate a key (any 8–128 hex chars), e.g. `openssl rand -hex 16`.
 *   2. Add it to the central .env as ASVAB_INDEXNOW_KEY=<key>.
 *   3. Create public/<key>.txt containing exactly that key (so the file at
 *      https://asvabhero.com/<key>.txt verifies ownership), and commit it.
 *   4. (Recommended) Add the site in Bing Webmaster Tools.
 *
 * Without ASVAB_INDEXNOW_KEY set, this script no-ops with a hint — safe to run
 * in any environment.
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOST = "asvabhero.com";
const BASE = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const key = process.env.ASVAB_INDEXNOW_KEY || process.env.INDEXNOW_KEY;
if (!key) {
  console.log(
    "[indexnow] ASVAB_INDEXNOW_KEY not set — skipping ping. See setup notes in scripts/indexnow-ping.mjs."
  );
  process.exit(0);
}

// URLs: explicit args (paths or full URLs), else every <loc> in the sitemap.
function fromArgs() {
  return process.argv.slice(2).map((a) => (a.startsWith("http") ? a : `${BASE}${a}`));
}
function fromSitemap() {
  const xml = readFileSync(resolve(__dirname, "../public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = (process.argv.length > 2 ? fromArgs() : fromSitemap()).filter(Boolean);
if (urlList.length === 0) {
  console.log("[indexnow] no URLs to submit.");
  process.exit(0);
}

const body = {
  host: HOST,
  key,
  keyLocation: `${BASE}/${key}.txt`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

// IndexNow returns 200/202 on success; 422 = invalid URLs; 403 = key mismatch.
console.log(`[indexnow] submitted ${urlList.length} URLs → HTTP ${res.status}`);
if (!res.ok) {
  console.error("[indexnow] non-OK response:", await res.text().catch(() => ""));
  process.exit(1);
}
