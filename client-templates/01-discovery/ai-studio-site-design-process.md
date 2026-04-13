# AI Studio Site Design Process Template

---

## What This Is

A repeatable process for designing a website homepage (or any page) using Google AI Studio before touching code. AI Studio is used for the visual design pass only — code lives in the editor.

---

## Step 1: Gather Reference Sites

Find 3 sites whose design direction you want to pull from. These are not competitors — they're visual references for feel, layout, and style.

Sources to find them:
- `godly.website`
- `land-book.com`
- `awwwards.com`
- `21st.dev` (component-level sniping)

**References for this build:**

| # | URL | What you like about it |
|---|-----|------------------------|
| 1 | | |
| 2 | | |
| 3 | | |

---

## Step 2: Define What You're Building

Fill this in before going to AI Studio.

**Page:** (e.g. homepage, landing page, services page)

**Brand name:**

**One-line description of the business:**

**Target audience:**

**Sections needed:** (e.g. Hero, Services, Proof, Process, Contact)

**Tone/feel:** (e.g. clean + minimal, bold + direct, premium + dark)

**Things to avoid:**

---

## Step 3: The AI Studio Prompt (Make it 80% there — refine from here.)

**How to use this prompt:** Copy everything inside the code block below and paste it directly into the AI Studio chat. Hit send. That's it — the prompt IS the instruction. No extra setup needed.

Paste this prompt into AI Studio with the 3 reference URLs included.

```
I'm building a [PAGE TYPE] for [BRAND NAME].

[ONE-LINE BUSINESS DESCRIPTION]

Target audience: [AUDIENCE]

I want you to design this page inspired by the visual style and layout approach of these 3 sites:
1. [URL 1]
2. [URL 2]
3. [URL 3]

Sections to include:
[LIST SECTIONS]

Tone and feel: [TONE]

Constraints:
- [ANY CONSTRAINTS — fonts, colors, things to avoid]

Build me a complete, beautiful design. 
```

---

## Step 4: Iterate in AI Studio

- Get to ~80% before downloading
- Use screenshots/videos to give specific feedback: Cmd+Shift+5 (Mac) → paste into chat
- Iterate on one section at a time if needed

---

## Step 5: Bring Into the Editor + Paste into Claude

1. Click **Download** in AI Studio
2. Open folder in your editor (File → Open Folder)
3. Run locally: ask the editor to open it on localhost
4. Apply the Vyux Promax / design audit skill if available
5. Refine — one change per message
6. Deploy & Refine with Step 6 if necessary 

---

## Step 6: UI Sniping (Optional)

For specific components you want to add:
- `21st.dev` → find component → Share Component → paste link into editor
- `codepen.io` → copy HTML/CSS → paste into editor
- One component at a time

---

## Step 7: Deploy

## Notes

- AI Studio is for design. The editor is for scaling.
- One task per message once you're in the editor.
- If you're stuck in a loop: "Explain exactly how you're going to solve this and what will be different this time."
- Screenshot feedback is faster than describing in words.
