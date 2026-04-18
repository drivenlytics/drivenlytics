#!/usr/bin/env python3
"""
StoryChief API Client — HangTherapy Social Media Automation
Posts social media drafts to StoryChief via REST API.

SETUP:
  Add your API key to social_automation/.env:
    STORYCHIEF_API_KEY=your_key_here
  Get your key from: StoryChief → Settings → API → + New Token
"""

import os
import json
import mimetypes
import sys
from pathlib import Path


def _load_env_file():
    """Auto-load .env from the social_automation/ folder (one level up from scripts/)."""
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, val = line.partition("=")
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    os.environ.setdefault(key, val)

_load_env_file()

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install requests")
    sys.exit(1)


# ── Config ────────────────────────────────────────────────────────────────────

BASE_URL = "https://api.storychief.io/1.0"

# Destination IDs for HangTherapy StoryChief workspace.
# To find these: GET https://api.storychief.io/1.0/destinations
DESTINATION_IDS = {
    "instagram":   1302908746,   # hangtherapyofficial — ACTIVE
    "facebook":    772901105,    # Hang Therapy — ACTIVE
    # "linkedin":  2129305040,   # Lawrence L — enable when ready
    # "tiktok":    1841510151,   # HangTherapy.com — enable when ready
    # Connect in StoryChief then uncomment:
    # "threads":   None,
    # "x":         None,
    # "bluesky":   None,
    # "pinterest": None,
    # "youtube":   None,
}


def get_api_key() -> str:
    key = os.environ.get("STORYCHIEF_API_KEY", "")
    if not key:
        raise EnvironmentError(
            "STORYCHIEF_API_KEY not set.\n"
            "Add it to social_automation/.env:\n"
            "  STORYCHIEF_API_KEY=your_key\n"
            "Get your key from StoryChief → Settings → API"
        )
    return key

def headers() -> dict:
    return {
        "Authorization": f"Bearer {get_api_key()}",
        "Accept": "application/json",
    }


# ── Core API calls ─────────────────────────────────────────────────────────────

def upload_image(image_path: str) -> str:
    """
    Upload an image to StoryChief and return the media ID.
    Images must be JPG or PNG, max 4MB.
    """
    path = Path(image_path)
    if not path.exists():
        raise FileNotFoundError(f"Image not found: {image_path}")

    file_size = path.stat().st_size
    if file_size > 4 * 1024 * 1024:
        raise ValueError(f"Image too large ({file_size / 1024 / 1024:.1f}MB). Max 4MB.")

    mime_type, _ = mimetypes.guess_type(str(path))
    if mime_type not in ("image/jpeg", "image/png"):
        raise ValueError(f"Unsupported image type: {mime_type}. Use JPG or PNG.")

    with open(path, "rb") as f:
        resp = requests.post(
            f"{BASE_URL}/media",
            headers=headers(),
            files={"file": (path.name, f, mime_type)},
            timeout=60,
        )
    resp.raise_for_status()
    data = resp.json()
    media_id = data.get("data", {}).get("id") or data.get("data", {}).get("url", "")
    print(f"  ✓ Image uploaded: {path.name} → {media_id}")
    return str(media_id)


def create_draft_post(
    scheduled_at: str,
    captions: dict,
    image_path: str | None = None,
    platforms: list[str] | None = None,
) -> list:
    """
    Create social post drafts in StoryChief — one request per platform so each
    gets its own platform-specific caption.

    Args:
        scheduled_at:  ISO 8601 datetime string, e.g. "2025-05-01T09:00:00"
        captions:      Dict keyed by platform name with caption strings
                       e.g. {"instagram": "...", "linkedin": "...", ...}
        image_path:    Local path to the image file (optional)
        platforms:     List of platform keys to post to (defaults to all with captions)

    Returns list of created post objects from StoryChief.
    """
    # Upload image once, reuse across platforms
    media_id = None
    if image_path:
        media_id = upload_image(image_path)

    target_platforms = platforms or list(captions.keys())
    created = []

    for platform in target_platforms:
        dest_id = DESTINATION_IDS.get(platform.lower())
        if not dest_id:
            print(f"  ! Skipping '{platform}' — not in DESTINATION_IDS (check scripts/post_to_storychief.py)")
            continue

        caption = captions.get(platform, captions.get("instagram", ""))

        payload = {
            "message": caption,
            "destinations": [dest_id],
            "status": "draft",
            "scheduled_at": scheduled_at,
        }
        if media_id:
            payload["images"] = [{"id": media_id}]

        resp = requests.post(
            f"{BASE_URL}/posts",
            headers={**headers(), "Content-Type": "application/json"},
            json=payload,
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        posts = data.get("data", [])
        post_id = posts[0].get("id", "?") if posts else "?"
        edit_url = posts[0].get("edit_url", "") if posts else ""
        print(f"  ✓ {platform}: draft {post_id} — {edit_url}")
        created.extend(posts)

    return created


def publish_campaign_from_json(campaign_json_path: str) -> None:
    """
    Main entry point. Reads a campaign_plan.json file and creates
    all posts as drafts in StoryChief.

    Expected JSON structure:
    {
      "campaign_name": "May — Shoulder Pain",
      "posts": [
        {
          "post_number": 1,
          "scheduled_at": "2025-05-01T09:00:00",
          "platforms": ["instagram", "linkedin", "facebook", "tiktok"],
          "captions": {
            "instagram": "...",
            "linkedin": "...",
            "facebook": "...",
            "tiktok": "..."
          },
          "image_path": "social_automation/output/images/campaign_may/post_001.png"
        },
        ...
      ]
    }
    """
    path = Path(campaign_json_path)
    if not path.exists():
        raise FileNotFoundError(f"Campaign file not found: {campaign_json_path}")

    with open(path) as f:
        campaign = json.load(f)

    name = campaign.get("campaign_name", "Untitled Campaign")
    posts = campaign.get("posts", [])

    if not posts:
        print("No posts found in campaign file. Exiting.")
        return

    print(f"\n{'='*60}")
    print(f"Publishing campaign: {name}")
    print(f"Posts to create: {len(posts)}")
    print(f"{'='*60}\n")

    success_count = 0
    error_count = 0

    for i, post in enumerate(posts, 1):
        post_num = post.get("post_number", i)
        scheduled_at = post.get("scheduled_at", "")
        captions = post.get("captions", {})
        image_path = post.get("image_path")
        platforms = post.get("platforms")

        print(f"\nPost {post_num}/{len(posts)} — {scheduled_at}")

        try:
            create_draft_post(
                scheduled_at=scheduled_at,
                captions=captions,
                image_path=image_path,
                platforms=platforms,
            )
            success_count += 1
        except requests.HTTPError as e:
            print(f"  ✗ HTTP error for post {post_num}: {e.response.status_code} — {e.response.text}")
            error_count += 1
        except Exception as e:
            print(f"  ✗ Error for post {post_num}: {e}")
            error_count += 1

    print(f"\n{'='*60}")
    print(f"Done. {success_count} posts pushed, {error_count} errors.")
    print(f"Review your drafts at: https://app.storychief.io/social/calendar")
    print(f"{'='*60}\n")


# ── CLI ────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python post_to_storychief.py <campaign_plan.json>")
        print("Example: python post_to_storychief.py output/campaigns/may_campaign.json")
        sys.exit(1)

    publish_campaign_from_json(sys.argv[1])
