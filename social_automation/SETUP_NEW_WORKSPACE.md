# Setting Up Social Automation for a New Workspace

Follow these steps exactly when setting up social media automation for a new client
workspace (e.g. Drivenlytics). Written for an AI assistant to follow.

---

## Step 1 — Copy the social_automation folder into the new project

Copy the entire `social_automation/` folder from HangTherapy into the new project.
It contains everything needed:

```
social_automation/
  SETUP_NEW_WORKSPACE.md       ← this guide
  scripts/
    post_to_storychief.py      ← StoryChief API client
    generate_campaign.py       ← full pipeline orchestrator
    generate_image.sh          ← image generation wrapper
  agents/
    1_content_ingestion.md
    2_campaign_planner.md
    3_caption_writer.md
    4_image_prompter.md
  templates/
    platform_specs.md
    campaign_template.md
```

Do NOT copy the `.env` file — it contains HangTherapy's private API keys.
Create a fresh one in Step 4.

---

## Step 2 — Install dependencies

Run these two commands in the terminal:

```bash
pip install requests --break-system-packages
pip install pillow --break-system-packages
```

Note: `--break-system-packages` is required on macOS with Homebrew Python. Without
it, pip refuses to install and shows a PEP 668 warning. This is normal — the flag
is safe to use here.

---

## Step 3 — Create the StoryChief API token

1. Log in to storychief.io and switch to the correct workspace (e.g. Drivenlytics)
2. Go to **Settings → API**
3. Under "Your API keys", click **+ New Token** — NOT "+ New MCP Token"

   The difference:
   - **Regular Token** = for scripts and code pushing content to StoryChief (what we need)
   - **MCP Token** = for AI assistants connecting directly as a live tool (not for scripts)

4. Name it something like `Drivenlytics Scripts`
5. Copy the token value immediately — StoryChief only shows it once

---

## Step 4 — Create the .env file

Create a new file at `social_automation/.env` in the new project:

```
STORYCHIEF_API_KEY=paste_token_here
GEMINI_API_KEY=paste_gemini_key_here
```

The scripts auto-load this file. No global terminal exports needed.
Each workspace has its own `.env` — they never interfere with each other.

---

## Step 5 — Get the workspace destination IDs

Each StoryChief workspace has different destination IDs for its connected social
accounts. This step gets the real IDs for this workspace.

Run this command from the `social_automation/` folder:

```bash
python3 -c "
import os, requests, json
key = open('.env').read().strip().split('=',1)[1].strip()
r = requests.get('https://api.storychief.io/1.0/destinations',
    headers={'Authorization': f'Bearer {key}', 'Accept': 'application/json'}, timeout=10)
print(json.dumps(r.json(), indent=2))
"
```

This returns all connected social accounts, like:

```json
{
  "data": [
    { "id": 123456789, "type": "instagram",       "name": "yourhandle", "status": "configured" },
    { "id": 987654321, "type": "facebook",         "name": "Your Page",  "status": "configured" },
    { "id": 111222333, "type": "linkedin-profile", "name": "Your Name",  "status": "configured" },
    { "id": 444555666, "type": "tiktok",           "name": "yourhandle", "status": "configured" }
  ]
}
```

Use only destinations with `"status": "configured"`. Ignore wordpress and any
unknown types for social campaigns.

---

## Step 6 — Update DESTINATION_IDS in the script

Open `scripts/post_to_storychief.py` and update the `DESTINATION_IDS` dict with
the real IDs from Step 5:

```python
DESTINATION_IDS = {
    "instagram":  123456789,   # replace with real ID from Step 5
    "facebook":   987654321,   # replace with real ID from Step 5
    "linkedin":   111222333,   # replace with real ID from Step 5
    "tiktok":     444555666,   # replace with real ID from Step 5
}
```

Only include platforms that are connected in this workspace. Remove any that are not.

---

## Step 7 — Verify with a test post

Run this from the `social_automation/` folder to confirm the connection works.
Replace `PUT_INSTAGRAM_ID_HERE` with the Instagram destination ID from Step 5:

```bash
python3 -c "
import os, requests, json
key = open('.env').read().strip().split('=',1)[1].strip()
h = {'Authorization': f'Bearer {key}', 'Accept': 'application/json', 'Content-Type': 'application/json'}
payload = {'message': 'Test draft — delete me', 'destinations': [PUT_INSTAGRAM_ID_HERE], 'status': 'draft'}
r = requests.post('https://api.storychief.io/1.0/posts', headers=h, json=payload, timeout=10)
print('Status:', r.status_code)
print(json.dumps(r.json(), indent=2)[:400])
"
```

A `200` response with a post ID means the connection is working.

**After the test:** Go to StoryChief and manually delete the test draft from the
calendar. The API does not support deleting posts — it must be done in the UI.

---

## StoryChief API facts (verified April 2026)

Discovered by live testing — do not assume the docs are accurate without verifying.

| Fact | Value |
|------|-------|
| Base URL | `https://api.storychief.io/1.0` |
| Auth header | `Authorization: Bearer YOUR_TOKEN` |
| Create social post | `POST /posts` |
| List destinations | `GET /destinations` |
| List existing posts | `GET /posts` |
| Payload format | No wrapper — fields at top level (NOT inside a `"data": {}` block) |
| Text field name | `message` (NOT `content`) |
| Destinations format | Array of integers: `[123456789]` (NOT objects like `[{"id": 123}]`) |
| Campaign grouping | No API endpoint exists — posts are individual |
| Delete posts | Not supported via API — must delete manually in StoryChief UI |
| Endpoints that do NOT exist | `/social-posts`, `/social-campaigns`, `/campaigns`, `/channels` |

---

## Common errors and fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `404 The route could not be found` | Wrong endpoint path | Use `/posts`, not `/social-posts` |
| `422 message is required` | Using `data` wrapper or wrong field name | Remove `data` wrapper; use `message` not `content` |
| `422 destinations must be integer` | Passing `[{"id": 123}]` instead of `[123]` | Use plain integers in the array |
| `ModuleNotFoundError: requests` | Library not installed | `pip install requests --break-system-packages` |
| `STORYCHIEF_API_KEY not set` | `.env` missing or in wrong location | Place `.env` in `social_automation/` (not inside `scripts/`) |
