#!/usr/bin/env node
/**
 * TikTok Content Posting API — bulk video uploader for ASVAB Daily Shorts.
 *
 * Usage:
 *   node upload-tiktok.js                    # uploads all clips from out/batch/
 *   node upload-tiktok.js --clip clip-01     # uploads a single clip
 *   node upload-tiktok.js --dry-run          # prints what would be uploaded
 *
 * Requires env vars (from root .env):
 *   TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_ACCESS_TOKEN
 *
 * Flow:
 *   1. Read captions.csv for clip metadata
 *   2. For each clip: init upload → PUT file → poll status → publish
 *   3. Rate limit: 6 inits/min, ~25 posts/day
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const BATCH_DIR = path.join(__dirname, "out", "batch");
const CAPTIONS_CSV = path.join(BATCH_DIR, "captions.csv");
const API_BASE = "https://open.tiktokapis.com/v2";

const RATE_LIMIT_MS = 11_000; // ~6 per minute

function loadEnv() {
  const envPath = path.resolve(process.env.HOME, "google-drive/0-AI/.env");
  if (!fs.existsSync(envPath)) {
    console.error("No .env found at", envPath);
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) process.env[m[1]] = process.env[m[1]] || m[2];
  }
}

function parseCaptions() {
  const csv = fs.readFileSync(CAPTIONS_CSV, "utf8");
  const rows = csv.trim().split("\n").slice(1);
  return rows.map((row) => {
    const fields = [];
    let current = "";
    let inQuotes = false;
    for (const ch of row) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { fields.push(current); current = ""; continue; }
      current += ch;
    }
    fields.push(current);
    return {
      index: parseInt(fields[0]),
      external_key: fields[1],
      subtest: fields[2],
      file: fields[3],
      caption: fields[4] || "",
    };
  });
}

async function apiRequest(method, endpoint, body, accessToken) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE);
    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function queryCreatorInfo(accessToken) {
  const res = await apiRequest("POST", "/post/publish/creator_info/query/", {}, accessToken);
  console.log("Creator info:", JSON.stringify(res, null, 2));
  return res;
}

async function initUpload(accessToken, clipPath, caption) {
  const stat = fs.statSync(clipPath);
  const body = {
    post_info: {
      title: caption,
      privacy_level: "PUBLIC_TO_EVERYONE",
      disable_comment: false,
      disable_duet: false,
      disable_stitch: false,
    },
    source_info: {
      source: "FILE_UPLOAD",
      video_size: stat.size,
      chunk_size: stat.size,
      total_chunk_count: 1,
    },
  };
  const res = await apiRequest("POST", "/post/publish/video/init/", body, accessToken);
  return res;
}

async function uploadChunk(uploadUrl, clipPath) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(clipPath);
    const url = new URL(uploadUrl);
    const options = {
      method: "PUT",
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": fileData.length,
        "Content-Range": `bytes 0-${fileData.length - 1}/${fileData.length}`,
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
    req.write(fileData);
    req.end();
  });
}

async function pollStatus(accessToken, publishId, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const res = await apiRequest(
      "POST",
      "/post/publish/status/fetch/",
      { publish_id: publishId },
      accessToken
    );
    const status = res?.data?.status;
    console.log(`  Poll ${i + 1}: ${status}`);
    if (status === "PUBLISH_COMPLETE") return res;
    if (status === "FAILED") throw new Error(`Publish failed: ${JSON.stringify(res)}`);
  }
  throw new Error("Publish timed out");
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const clipFlag = args.indexOf("--clip");
  const singleClip = clipFlag >= 0 ? args[clipFlag + 1] : null;

  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  if (!accessToken && !dryRun) {
    console.error("Missing TIKTOK_ACCESS_TOKEN in .env");
    process.exit(1);
  }

  const clips = parseCaptions();
  const toUpload = singleClip
    ? clips.filter((c) => c.file.startsWith(singleClip))
    : clips;

  console.log(`\n=== ASVAB Daily Shorts — TikTok Uploader ===`);
  console.log(`Clips to upload: ${toUpload.length}`);
  if (dryRun) console.log("(DRY RUN — no API calls)\n");

  for (const clip of toUpload) {
    const clipPath = path.join(BATCH_DIR, clip.file);
    if (!fs.existsSync(clipPath)) {
      console.log(`SKIP ${clip.file} — not found`);
      continue;
    }

    const size = (fs.statSync(clipPath).size / 1024 / 1024).toFixed(1);
    console.log(`\n[${clip.index}/${clips.length}] ${clip.file} (${size} MB)`);
    console.log(`  Caption: ${clip.caption.substring(0, 80)}...`);

    if (dryRun) continue;

    console.log("  Initializing upload...");
    const init = await initUpload(accessToken, clipPath, clip.caption);
    if (init.error?.code) {
      console.error(`  ERROR: ${init.error.code} — ${init.error.message}`);
      continue;
    }

    const uploadUrl = init.data?.upload_url;
    const publishId = init.data?.publish_id;
    console.log(`  Upload URL received, publish_id: ${publishId}`);

    console.log("  Uploading video file...");
    const uploadRes = await uploadChunk(uploadUrl, clipPath);
    console.log(`  Upload response: ${uploadRes.status}`);

    console.log("  Polling publish status...");
    await pollStatus(accessToken, publishId);
    console.log("  ✓ Published!");

    await sleep(RATE_LIMIT_MS);
  }

  console.log("\n=== Done ===\n");
}

main().catch(console.error);
