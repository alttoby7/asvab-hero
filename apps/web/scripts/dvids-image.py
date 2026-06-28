#!/usr/bin/env python3
"""Download a DVIDS image by URL and save it with attribution metadata.

Usage:
    python3 scripts/dvids-image.py https://www.dvidshub.net/image/8989921/... --slug what-is-the-asvab
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path


def _load_env():
    # Central .env lives in Google Drive workspace, not in the asvab-hero repo
    env_path = Path.home() / "google-drive" / "0-AI" / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                os.environ.setdefault(key.strip(), value.strip())


_load_env()

DVIDS_API_BASE = "https://api.dvidshub.net/search"
API_KEY = os.environ.get("DVIDS_API_KEY", "")
SITE_ROOT = Path(__file__).resolve().parents[1]


def extract_image_id(url: str) -> str:
    """Extract numeric image ID from a DVIDS URL."""
    match = re.search(r"/image/(\d+)/", url)
    if not match:
        print(f"Error: Could not extract image ID from URL: {url}", file=sys.stderr)
        sys.exit(1)
    return match.group(1)


def fetch_metadata(image_id: str) -> dict:
    """Fetch image metadata from DVIDS search API by image ID."""
    if not API_KEY:
        print("Error: DVIDS_API_KEY not found in .env", file=sys.stderr)
        sys.exit(1)

    params = {
        "type": "image",
        "id": f"image:{image_id}",
        "api_key": API_KEY,
    }
    url = f"{DVIDS_API_BASE}?{urllib.parse.urlencode(params)}"

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ASVAB-Hero/1.0"})
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"DVIDS API error: {e.code} {e.reason}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Network error: {e.reason}", file=sys.stderr)
        sys.exit(1)

    results = data.get("results", [])
    if not results:
        print(f"Error: No results found for image ID {image_id}", file=sys.stderr)
        sys.exit(1)

    return results[0]


def build_download_url(meta: dict, target_width: int) -> tuple[str, int, int]:
    """Build CDN URL at target width. Returns (url, actual_width, actual_height)."""
    thumbnail = meta.get("thumbnail", "")
    # Extract YYMM from thumbnail URL: /thumbs/photos/2504/8989921/122x92_q95.jpg
    yymm_match = re.search(r"/thumbs/photos/(\d{4})/", thumbnail)
    if not yymm_match:
        print("Error: Could not parse thumbnail URL to extract YYMM", file=sys.stderr)
        sys.exit(1)

    yymm = yymm_match.group(1)
    image_id = meta["id"].replace("image:", "")

    orig_w = meta.get("width", target_width)
    orig_h = meta.get("height", target_width)

    # Don't upscale beyond original dimensions
    actual_w = min(target_width, orig_w)
    actual_h = round(actual_w * orig_h / orig_w)

    cdn_url = f"https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/{yymm}/{image_id}/{actual_w}x{actual_h}_q95.jpg"
    return cdn_url, actual_w, actual_h


def download_image(cdn_url: str, output_path: Path) -> bool:
    """Download image from DVIDS CDN to local path."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(cdn_url, headers={"User-Agent": "ASVAB-Hero/1.0"})
        with urllib.request.urlopen(req, timeout=30) as response:
            output_path.write_bytes(response.read())
        return True
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        print(f"Download failed: {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(description="Download a DVIDS image with attribution metadata")
    parser.add_argument("url", help="DVIDS image URL (e.g. https://www.dvidshub.net/image/8989921/...)")
    parser.add_argument("--slug", required=True, help="Article slug for output path (e.g. what-is-the-asvab)")
    parser.add_argument("--width", type=int, default=1200, help="Target download width in px (default: 1200)")
    args = parser.parse_args()

    image_id = extract_image_id(args.url)
    print(f"Fetching metadata for image ID: {image_id}...")

    meta = fetch_metadata(image_id)

    # Build attribution fields
    credit = meta.get("credit") or meta.get("unit_name") or "U.S. Department of Defense"
    branch = meta.get("branch") or "DoD"
    dvids_url = meta.get("url", args.url)
    title = meta.get("title", "")
    short_desc = meta.get("short_description", "")

    # Build download URL and output path
    cdn_url, actual_w, actual_h = build_download_url(meta, args.width)
    output_path = SITE_ROOT / "public" / "images" / args.slug / "hero.jpg"

    print(f"Downloading {actual_w}x{actual_h} image...")
    success = download_image(cdn_url, output_path)
    if not success:
        sys.exit(1)

    rel_path = f"/images/{args.slug}/hero.jpg"

    print(f"\n✓ Saved: {output_path}")
    print(f"\n--- Attribution ---")
    print(f"Credit: Photo: U.S. {branch} / {credit} via DVIDS")
    print(f"DVIDS URL: {dvids_url}")
    print(f"Title: {title}")
    print(f"Description: {short_desc[:120]}")
    print(f"\n--- Add to page.tsx after <h1> ---")
    print(f"""
import DvidsHeroImage from "@/components/DvidsHeroImage";

<DvidsHeroImage
  src="{rel_path}"
  alt="{short_desc[:100] or title}"
  credit="{credit}"
  branch="{branch}"
  dvidsUrl="{dvids_url}"
  width={{{actual_w}}}
  height={{{actual_h}}}
/>""")

    print(f"\n--- Add before CTA box ---")
    print("""
<p className="mt-8 text-xs italic text-text-tertiary">
  The appearance of U.S. Department of Defense (DoD) visual information does
  not imply or constitute DoD endorsement.
</p>""")


if __name__ == "__main__":
    main()
