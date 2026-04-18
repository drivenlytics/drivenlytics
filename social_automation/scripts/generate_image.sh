#!/usr/bin/env bash
# generate_image.sh — Nano Banana Pro wrapper for HangTherapy campaigns
#
# USAGE:
#   ./generate_image.sh --prompt "..." --output "/path/to/image.png" [--model flash|pro] [--aspect square|landscape|portrait] [--size 1K|2K|4K] [--reference "/path/to/ref.png"]
#
# REQUIRES:
#   GEMINI_API_KEY environment variable set
#   uv installed (https://github.com/astral-sh/uv)
#
# EXAMPLES:
#   # Bulk post image (fast, cheap):
#   ./generate_image.sh \
#     --prompt "Minimalist graphic showing a person hanging from a bar, natural light, text: 'Your spine is being compressed right now'" \
#     --output "../output/images/post_001.png" \
#     --model flash \
#     --aspect portrait
#
#   # Hero/feature image (high quality):
#   ./generate_image.sh \
#     --prompt "Professional lifestyle photo of a health-conscious person in their 40s using a hang bar in a modern home, navy and teal brand colours, natural light" \
#     --output "../output/images/hero_001.png" \
#     --model pro \
#     --size 2K \
#     --aspect portrait

set -euo pipefail

# ── Nano Banana Pro script path ───────────────────────────────────────────────
SKILL_DIR="${HOME}/.claude/plugins/cache/buildatscale-claude-code/nano-banana-pro/c77988d91ba6/skills/generate"
IMAGE_SCRIPT="${SKILL_DIR}/scripts/image.py"

# ── Validate environment ──────────────────────────────────────────────────────
if [[ -z "${GEMINI_API_KEY:-}" ]]; then
  echo "ERROR: GEMINI_API_KEY is not set."
  echo "Run: export GEMINI_API_KEY='your_gemini_api_key'"
  echo "Get your key from: https://aistudio.google.com/app/apikey"
  exit 1
fi

if [[ ! -f "${IMAGE_SCRIPT}" ]]; then
  echo "ERROR: Nano Banana Pro script not found at:"
  echo "  ${IMAGE_SCRIPT}"
  echo "Ensure the nano-banana-pro plugin is installed."
  exit 1
fi

if ! command -v uv &>/dev/null; then
  echo "ERROR: uv is not installed."
  echo "Install it with: curl -LsSf https://astral.sh/uv/install.sh | sh"
  exit 1
fi

# ── Parse arguments ───────────────────────────────────────────────────────────
PROMPT=""
OUTPUT=""
MODEL="flash"
ASPECT="portrait"
SIZE="1K"
REFERENCE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --prompt)    PROMPT="$2";    shift 2 ;;
    --output)    OUTPUT="$2";    shift 2 ;;
    --model)     MODEL="$2";     shift 2 ;;
    --aspect)    ASPECT="$2";    shift 2 ;;
    --size)      SIZE="$2";      shift 2 ;;
    --reference) REFERENCE="$2"; shift 2 ;;
    *)
      echo "Unknown argument: $1"
      echo "Usage: $0 --prompt '...' --output '/path/to/image.png' [--model flash|pro] [--aspect square|landscape|portrait] [--size 1K|2K|4K] [--reference '/path/to/ref.png']"
      exit 1
      ;;
  esac
done

# ── Validate required args ────────────────────────────────────────────────────
if [[ -z "${PROMPT}" ]]; then
  echo "ERROR: --prompt is required."
  exit 1
fi

if [[ -z "${OUTPUT}" ]]; then
  echo "ERROR: --output is required."
  exit 1
fi

# ── Ensure output directory exists ───────────────────────────────────────────
OUTPUT_DIR="$(dirname "${OUTPUT}")"
mkdir -p "${OUTPUT_DIR}"

# ── Build uv command ──────────────────────────────────────────────────────────
CMD=(
  uv run "${IMAGE_SCRIPT}"
  --prompt "${PROMPT}"
  --output "${OUTPUT}"
  --model "${MODEL}"
  --aspect "${ASPECT}"
)

# Pro model supports size flag
if [[ "${MODEL}" == "pro" ]]; then
  CMD+=(--size "${SIZE}")
fi

# Optional reference image
if [[ -n "${REFERENCE}" ]]; then
  if [[ ! -f "${REFERENCE}" ]]; then
    echo "WARNING: Reference image not found: ${REFERENCE}. Skipping reference."
  else
    CMD+=(--reference "${REFERENCE}")
  fi
fi

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Generating image..."
echo "  Model:  ${MODEL}$([ "${MODEL}" == "pro" ] && echo " (${SIZE})" || echo " (1024px)")"
echo "  Aspect: ${ASPECT}"
echo "  Output: ${OUTPUT}"
echo "  Prompt: ${PROMPT:0:80}..."
echo ""

"${CMD[@]}"

# ── Verify output ─────────────────────────────────────────────────────────────
if [[ -f "${OUTPUT}" ]]; then
  SIZE_BYTES=$(stat -f%z "${OUTPUT}" 2>/dev/null || stat -c%s "${OUTPUT}" 2>/dev/null || echo "?")
  echo ""
  echo "✓ Image saved: ${OUTPUT} (${SIZE_BYTES} bytes)"
else
  echo ""
  echo "✗ Image generation failed — output file not found: ${OUTPUT}"
  exit 1
fi
