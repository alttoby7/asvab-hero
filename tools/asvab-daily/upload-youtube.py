#!/usr/bin/env python3
"""
YouTube Shorts bulk uploader for ASVAB Daily.

Usage:
  python upload-youtube.py                # uploads clips 16-30 (remaining)
  python upload-youtube.py --all          # uploads all 30
  python upload-youtube.py --clip 16      # uploads a single clip by index
  python upload-youtube.py --dry-run      # prints what would be uploaded
  python upload-youtube.py --start 20     # uploads clips 20-30

First run opens a browser for Google OAuth consent (youtube.upload scope).
Token is cached at ~/.claude/mcp-google/token-asvabhero-youtube.json.
"""

import csv
import os
import sys
import time
import json
import argparse
from pathlib import Path

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
CLIENT_SECRETS = Path.home() / ".claude/mcp-google/client_secrets.json"
TOKEN_PATH = Path.home() / ".claude/mcp-google/token-asvabhero-youtube.json"
BATCH_DIR = Path(__file__).parent / "out" / "batch"
CAPTIONS_CSV = BATCH_DIR / "captions.csv"
DEFAULT_START = 16


def get_credentials():
    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRETS), SCOPES)
            creds = flow.run_local_server(port=8099, open_browser=True)
        TOKEN_PATH.write_text(creds.to_json())
    return creds


def parse_captions():
    clips = []
    with open(CAPTIONS_CSV, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            clips.append({
                "index": int(row["index"]),
                "external_key": row["external_key"],
                "subtest": row["subtest"],
                "file": row["file"].strip().strip('"'),
                "caption": row["caption"].strip().strip('"'),
            })
    return clips


def yt_title(clip):
    return f"ASVAB {clip['subtest']} Quiz #{clip['index']}"


def yt_description(clip):
    hashtags = "#asvab #asvabprep #asvabtest #military #miltok #futuresoldier #shorts"
    return (
        f"{clip['caption'].split('#')[0].strip()}\n\n"
        f"Free ASVAB score calculator + 4,500 practice questions at https://asvabhero.com\n\n"
        f"{hashtags}"
    )


def upload_clip(youtube, clip, clip_path):
    body = {
        "snippet": {
            "title": yt_title(clip),
            "description": yt_description(clip),
            "tags": ["asvab", "asvab prep", "asvab test", "military", "miltok",
                     "asvab practice", clip["subtest"].lower()],
            "categoryId": "27",  # Education
        },
        "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False,
            "shorts": {"renderingFact": "NOT_SHORTS_RENDERING"},
        },
    }
    media = MediaFileUpload(str(clip_path), mimetype="video/mp4", resumable=True)
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            pct = int(status.progress() * 100)
            print(f"    Uploading... {pct}%", end="\r")
    print(f"    Uploaded: https://youtube.com/shorts/{response['id']}")
    return response


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Upload all 30 clips")
    parser.add_argument("--start", type=int, default=DEFAULT_START, help="Start from clip N (default 16)")
    parser.add_argument("--clip", type=int, help="Upload a single clip by index")
    parser.add_argument("--dry-run", action="store_true", help="Print plan without uploading")
    args = parser.parse_args()

    clips = parse_captions()

    if args.clip:
        to_upload = [c for c in clips if c["index"] == args.clip]
    elif args.all:
        to_upload = clips
    else:
        to_upload = [c for c in clips if c["index"] >= args.start]

    print(f"\n=== ASVAB Daily Shorts — YouTube Uploader ===")
    print(f"Clips to upload: {len(to_upload)}")
    if args.dry_run:
        print("(DRY RUN)\n")

    for clip in to_upload:
        clip_path = BATCH_DIR / clip["file"]
        if not clip_path.exists():
            print(f"  SKIP {clip['file']} — not found")
            continue
        size_mb = clip_path.stat().st_size / 1024 / 1024
        print(f"\n  [{clip['index']}/{len(clips)}] {clip['file']} ({size_mb:.1f} MB)")
        print(f"    Title: {yt_title(clip)}")
        if args.dry_run:
            continue

    if args.dry_run:
        print("\nDry run complete.")
        return

    print("\nAuthenticating...")
    creds = get_credentials()
    youtube = build("youtube", "v3", credentials=creds)

    for i, clip in enumerate(to_upload):
        clip_path = BATCH_DIR / clip["file"]
        if not clip_path.exists():
            continue
        print(f"\n  [{clip['index']}/{len(clips)}] {clip['file']}")
        print(f"    Title: {yt_title(clip)}")
        try:
            upload_clip(youtube, clip, clip_path)
        except Exception as e:
            print(f"    ERROR: {e}")
            if "quotaExceeded" in str(e):
                print("    Daily quota hit — resume tomorrow with --start", clip["index"])
                break
            continue
        if i < len(to_upload) - 1:
            print("    Waiting 5s...")
            time.sleep(5)

    print("\n=== Done ===\n")


if __name__ == "__main__":
    main()
