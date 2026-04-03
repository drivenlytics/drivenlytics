---
description: To run a daily 21:00 review, what was completed, strategic guidance, and chat history summarized.
---

# `buddy-review` (The 9 PM Strategic Sync)

Run this at 21:00 (or have it triggered) to perform a combined tactical and strategic audit.

## 1. Audit Phase (Taskade)
- **Review Completions**: Check the `⚡️ DONE` nodes in the Taskade GTD project: `gXTzxLUDtKTE7dH7`.
- **Summarize Progress**: Did the day's execution match the `/morning` priorities?
- **Flag Incomplete**: Identify what needs to be "rolled over" to tomorrow.

## 2. Review Phase (Buddy Inbox)
- Read **[buddy/inbox.md](file:///Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/buddy/inbox.md)**.
- For each new idea:
  1.  Provide the "Positive Devil's Advocate" critique.
  2.  Determine if it’s a "Quick Win," a "Major Pivot," or a "Wait & See."

## 3. Strategic Guidance
- Combine the day's data with Buddy's co-founder persona.
- Output:
  - **The "Pulse"**: A summary of brand momentum.
  - **Tomorrow's Strategy**: High-level guidance for next day's /morning session.
  - **Archive**: Move reviewed items to the "Archive" section of `buddy/inbox.md`.

## 4. Execution Commands
// turbo
1. Run `python3 scripts/buddy_brain.py --review-9pm` to generate the guidance prompt.
2. Store the output in a dated file in **[buddy/chats/](file:///Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/buddy/chats/)**.
