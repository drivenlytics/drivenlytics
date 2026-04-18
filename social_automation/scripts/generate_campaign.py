#!/usr/bin/env python3
"""
generate_campaign.py — HangTherapy Social Media Campaign Orchestrator

Reads a completed campaign_plan.json (with captions and image_prompt fields)
and runs the full pipeline:
  1. Generates all images via Nano Banana Pro
  2. Stamps watermark on every image
  3. Pushes all posts to StoryChief as drafts

USAGE:
  python generate_campaign.py <campaign_plan.json>

EXAMPLE:
  python generate_campaign.py output/campaigns/may_campaign/campaign_plan.json

REQUIRES:
  export STORYCHIEF_API_KEY="your_key"
  export GEMINI_API_KEY="your_key"
  pip install requests pillow

SETUP:
  StoryChief API key: StoryChief → Settings → API
  Gemini API key:     https://aistudio.google.com/app/apikey
"""

import json
import os
import subprocess
import sys
from pathlib import Path
from datetime import datetime


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
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install pillow")
    sys.exit(1)

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install requests")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
GENERATE_IMAGE_SH = SCRIPT_DIR / "generate_image.sh"
POST_TO_STORYCHIEF_PY = SCRIPT_DIR / "post_to_storychief.py"

# Watermark config
WATERMARK_TEXT = "HangTherapy.com"
WATERMARK_COLOR = (125, 211, 252)   # #7DD3FC teal/sky — matches brand accent
WATERMARK_OPACITY = 192             # 75% of 255
WATERMARK_FONT_SIZE = 18            # Small, unobtrusive
WATERMARK_MARGIN = 16               # Pixels from edge


# ── Watermark ─────────────────────────────────────────────────────────────────

def stamp_watermark(image_path: str) -> None:
    """
    Stamps 'HangTherapy.com' in the bottom-right corner of an image.
    Teal (#7DD3FC) at 75% opacity. Small and unobtrusive.
    """
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size

    # Create transparent overlay for watermark
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Try to load a clean font; fall back to default if unavailable
    font = None
    font_paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for fp in font_paths:
        if Path(fp).exists():
            try:
                font = ImageFont.truetype(fp, WATERMARK_FONT_SIZE)
                break
            except Exception:
                continue

    if font is None:
        font = ImageFont.load_default()

    # Measure text size
    bbox = draw.textbbox((0, 0), WATERMARK_TEXT, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Position: bottom-right corner
    x = width - text_width - WATERMARK_MARGIN
    y = height - text_height - WATERMARK_MARGIN

    # Draw text with opacity
    r, g, b = WATERMARK_COLOR
    draw.text((x, y), WATERMARK_TEXT, font=font, fill=(r, g, b, WATERMARK_OPACITY))

    # Composite overlay onto image
    watermarked = Image.alpha_composite(img, overlay)

    # Save as PNG (preserves transparency) or convert back to JPEG
    if image_path.lower().endswith(".jpg") or image_path.lower().endswith(".jpeg"):
        watermarked = watermarked.convert("RGB")

    watermarked.save(image_path)
    print(f"  ✓ Watermark applied: {Path(image_path).name}")


# ── Image generation ──────────────────────────────────────────────────────────

def generate_image_for_post(post: dict, campaign_slug: str) -> str | None:
    """
    Calls generate_image.sh for a single post.
    Returns the image path on success, None on failure.
    """
    image_prompt = post.get("image_prompt", "")
    image_path = post.get("image_path", "")
    image_model = post.get("image_model", "flash")
    post_num = post.get("post_number", "?")
    platforms = post.get("platforms", ["instagram"])

    if not image_prompt:
        print(f"  ! Post {post_num}: no image_prompt — skipping image generation")
        return None

    if not image_path:
        # Auto-generate path if missing
        image_path = f"social_automation/output/images/{campaign_slug}/post_{str(post_num).zfill(3)}.png"
        post["image_path"] = image_path

    # Determine aspect ratio from primary platform
    primary_platform = platforms[0].lower() if platforms else "instagram"
    aspect_map = {
        "instagram": "portrait",
        "tiktok": "portrait",
        "facebook": "landscape",
        "linkedin": "landscape",
        "threads": "square",
        "bluesky": "landscape",
        "twitter": "landscape",
        "x": "landscape",
        "pinterest": "portrait",
        "youtube_shorts": "portrait",
        "youtube": "portrait",
    }
    aspect = aspect_map.get(primary_platform, "portrait")

    # Build command
    cmd = [
        "bash", str(GENERATE_IMAGE_SH),
        "--prompt", image_prompt,
        "--output", str(PROJECT_ROOT / image_path),
        "--model", image_model,
        "--aspect", aspect,
    ]
    if image_model == "pro":
        cmd += ["--size", "2K"]

    print(f"\n  Generating image for post {post_num} ({image_model}, {aspect})...")

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  ✗ Image generation failed for post {post_num}:")
        print(f"    {result.stderr.strip()}")
        return None

    full_path = str(PROJECT_ROOT / image_path)
    if Path(full_path).exists():
        stamp_watermark(full_path)
        return full_path
    else:
        print(f"  ✗ Image file not found after generation: {full_path}")
        return None


# ── Main pipeline ─────────────────────────────────────────────────────────────

def run_pipeline(campaign_json_path: str, skip_images: bool = False, skip_publish: bool = False) -> None:
    """
    Full pipeline:
    1. Load campaign plan
    2. Generate all images + apply watermarks
    3. Save updated campaign plan
    4. Push all posts to StoryChief as drafts
    """
    path = Path(campaign_json_path)
    if not path.exists():
        print(f"ERROR: Campaign file not found: {campaign_json_path}")
        sys.exit(1)

    with open(path) as f:
        campaign = json.load(f)

    name = campaign.get("campaign_name", "Untitled Campaign")
    posts = campaign.get("posts", [])

    # Create a URL-safe slug for folder naming
    campaign_slug = name.lower().replace(" ", "_").replace("—", "").replace("-", "_")
    campaign_slug = "".join(c for c in campaign_slug if c.isalnum() or c == "_")

    print(f"\n{'='*60}")
    print(f"HangTherapy Campaign Pipeline")
    print(f"Campaign: {name}")
    print(f"Posts: {len(posts)}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"{'='*60}")

    # ── Phase 1: Generate images ──────────────────────────────────────────────
    if not skip_images:
        print(f"\n[Phase 1] Generating {len(posts)} images...\n")
        image_success = 0
        image_fail = 0

        for post in posts:
            result = generate_image_for_post(post, campaign_slug)
            if result:
                image_success += 1
            else:
                image_fail += 1

        print(f"\n  Images: {image_success} generated, {image_fail} failed")

        # Save updated campaign plan with image paths
        with open(path, "w") as f:
            json.dump(campaign, f, indent=2)
        print(f"  ✓ Campaign plan updated with image paths: {path}")

    else:
        print("\n[Phase 1] Skipping image generation (--skip-images flag)")

    # ── Phase 2: Push to StoryChief ───────────────────────────────────────────
    if not skip_publish:
        print(f"\n[Phase 2] Publishing {len(posts)} drafts to StoryChief...\n")

        result = subprocess.run(
            [sys.executable, str(POST_TO_STORYCHIEF_PY), campaign_json_path],
            capture_output=False,
            text=True,
        )

        if result.returncode != 0:
            print(f"\n✗ StoryChief publishing failed. Check your STORYCHIEF_API_KEY.")
            sys.exit(1)
    else:
        print("\n[Phase 2] Skipping StoryChief publishing (--skip-publish flag)")

    print(f"\n{'='*60}")
    print(f"Pipeline complete.")
    print(f"Review drafts at: https://app.storychief.io/social/calendar")
    print(f"{'='*60}\n")


# ── CLI ────────────────────────────────────────────────────────────────────────

def print_usage():
    print("""
Usage:
  python generate_campaign.py <campaign_plan.json> [options]

Options:
  --skip-images     Skip image generation (use if images already exist)
  --skip-publish    Skip StoryChief publishing (generate images only)

Examples:
  # Full pipeline (images + publish):
  python generate_campaign.py output/campaigns/may_campaign/campaign_plan.json

  # Generate images only (no StoryChief):
  python generate_campaign.py output/campaigns/may_campaign/campaign_plan.json --skip-publish

  # Publish only (images already generated):
  python generate_campaign.py output/campaigns/may_campaign/campaign_plan.json --skip-images
""")


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print_usage()
        sys.exit(0)

    campaign_file = sys.argv[1]
    skip_images = "--skip-images" in sys.argv
    skip_publish = "--skip-publish" in sys.argv

    # Check required env vars
    missing = []
    if not skip_images and not os.environ.get("GEMINI_API_KEY"):
        missing.append("GEMINI_API_KEY")
    if not skip_publish and not os.environ.get("STORYCHIEF_API_KEY"):
        missing.append("STORYCHIEF_API_KEY")

    if missing:
        print(f"ERROR: Missing environment variables: {', '.join(missing)}")
        print("Set them with: export VAR_NAME='your_value'")
        sys.exit(1)

    run_pipeline(campaign_file, skip_images=skip_images, skip_publish=skip_publish)
