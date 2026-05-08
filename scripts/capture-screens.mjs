#!/usr/bin/env node
// Drive the dev site to capture product screenshots: calculator, mid-question, results.
// Uses puppeteer-core + the system chrome binary.

import puppeteer from "puppeteer-core";
import fs from "fs/promises";

const BASE = "http://localhost:3000";
const OUT = "/home/trisha/dev/asvab-hero/public/images/screenshots";
const VIEWPORT = { width: 1600, height: 1000, deviceScaleFactor: 1 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const hideDevBadge = async (page) => {
  await page.addStyleTag({
    content: `
      /* Hide Next.js dev indicator + any dev overlays */
      [data-nextjs-toast], nextjs-portal, [data-next-mark],
      #__next-build-watcher, #__next_route_announcer__,
      div[style*="position: fixed"][style*="bottom"][style*="z-index: 99"] { display: none !important; }
    `,
  });
};

const shoot = async (page, file) => {
  await sleep(400);
  await hideDevBadge(page);
  await sleep(200);
  await page.screenshot({ path: `${OUT}/${file}`, fullPage: false });
  console.log(`✓ ${file}`);
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    ],
    defaultViewport: VIEWPORT,
  });

  try {
    const page = await browser.newPage();

    // ── 1. Calculator with sample scores ──────────────────────────
    await page.goto(`${BASE}/calculator`, { waitUntil: "networkidle0", timeout: 30000 });
    await sleep(1000);

    // Try to fill the score inputs. We'll attempt by label or by finding number inputs.
    await page.evaluate(() => {
      const seeds = { GS: 60, AR: 65, WK: 62, PC: 58, MK: 70, EI: 55, AS: 50, MC: 60, AO: 55 };
      const inputs = [...document.querySelectorAll('input[type="number"], input[inputmode="numeric"]')];
      if (inputs.length >= 9) {
        const order = ["GS","AR","WK","PC","MK","EI","AS","MC","AO"];
        inputs.slice(0, 9).forEach((inp, i) => {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          setter.call(inp, String(seeds[order[i]]));
          inp.dispatchEvent(new Event("input", { bubbles: true }));
          inp.dispatchEvent(new Event("change", { bubbles: true }));
        });
      }
    });
    await sleep(2000);
    await shoot(page, "calculator.png");

    // ── 2. Practice test gate (we already have this, but re-grab without dev badge) ─
    await page.goto(`${BASE}/practice-test`, { waitUntil: "networkidle0", timeout: 30000 });
    await sleep(1000);
    await shoot(page, "practice-test-gate.png");

    // ── 3. Mid-question state ──────────────────────────────────────
    // Click the Diagnostic Test card.
    await page.evaluate(() => {
      const links = [...document.querySelectorAll("a, button, [role='button']")];
      const tile = links.find((el) => /diagnostic test/i.test(el.textContent || ""));
      if (tile) tile.click();
    });
    await sleep(2500);
    // Some flows show a confirm/start screen — try to find a "Start" button.
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button, a")];
      const start = btns.find((el) => /^(start|begin|let'?s go)/i.test((el.textContent || "").trim()));
      if (start) start.click();
    });
    await sleep(2500);
    await shoot(page, "practice-test-question.png");

    // Re-take the question screenshot scrolled to bring the question card into view
    await page.evaluate(() => {
      const fieldset = document.querySelector('fieldset[aria-label*="answers"]');
      if (fieldset) fieldset.scrollIntoView({ block: "center" });
    });
    await sleep(500);
    await shoot(page, "practice-test-question.png");

    // ── 4. Results screen — answer all questions, click Next, finish ─
    let answeredCount = 0;
    for (let i = 0; i < 40; i++) {
      const advanced = await page.evaluate(() => {
        // Click the first answer choice (button[role="radio"])
        const choice = document.querySelector('button[role="radio"]');
        if (!choice) return false;
        choice.click();
        return true;
      });
      if (!advanced) break;
      await sleep(200);
      const moved = await page.evaluate(() => {
        // Click the Next/Review-Answers button (it's the orange accent button at the bottom-right of the question card)
        const btns = [...document.querySelectorAll("button")];
        const nx = btns.find((el) => {
          const t = (el.textContent || "").trim();
          return t === "Next" || t === "Review Answers" || t === "Submit" || t === "Finish";
        });
        if (nx && !nx.disabled) { nx.click(); return true; }
        return false;
      });
      if (moved) answeredCount++;
      await sleep(450);
    }
    console.log(`Answered ${answeredCount} questions`);
    await sleep(2500);

    // After answering Q30, "Review Answers" leads to ReviewMode (question list).
    // Click "Submit Test" to advance to the actual results page.
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button")];
      const submit = btns.find((el) => /^submit test$/i.test((el.textContent || "").trim()));
      if (submit) submit.click();
    });
    await sleep(3500);

    // Results page: scroll past the page-header hero image to land on the AFQT score / breakdown card
    await page.evaluate(() => {
      // The hero image lives in the SEO content block. The results card starts after it.
      // Look for the first element with class containing "AFQT" or "estimated" text, or the first H2 after the hero.
      const all = [...document.querySelectorAll("h1, h2, h3, p, div")];
      const target = all.find((el) => {
        const t = (el.textContent || "").trim().toLowerCase();
        return (
          (t.startsWith("your afqt") || t.startsWith("estimated afqt") || t.includes("afqt estimate")) &&
          t.length < 80
        );
      });
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "instant" });
        window.scrollBy(0, -60); // breathing room above
      }
    });
    await sleep(600);
    await shoot(page, "practice-test-results.png");

    // Now scroll further down to capture the per-question Review section
    await page.evaluate(() => {
      const reviewHeadings = [...document.querySelectorAll("h2, h3")].filter((el) =>
        /review your answers|review answers|your answers/i.test((el.textContent || "").trim())
      );
      if (reviewHeadings[0]) {
        reviewHeadings[0].scrollIntoView({ block: "start", behavior: "instant" });
        window.scrollBy(0, -40);
      }
    });
    await sleep(600);
    await shoot(page, "practice-test-review.png");
  } catch (err) {
    console.error("ERR:", err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
