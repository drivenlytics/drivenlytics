# Drivenlytics PM Agent Execution Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a PM agent that tracks execution of the business launch plan via Taskade, schedules work in Google Calendar, and runs scheduled check-ins via Claude Code cron.

**Architecture:** Taskade is the backbone — it handles task management, Google Calendar integration, Gmail notifications, and external channel notifications (Slack/Telegram/Discord) all natively. Claude Code cron jobs provide the PM agent voice inside the IDE.

**Tech Stack:** Taskade MCP, Claude Code CronCreate, Google Calendar (via Taskade integration), Gmail (via Taskade integration).

**Execute this plan before starting the business launch plan (A → B → C → D).**

---

## Task 1 — MCP Setup for Drivenlytics Workspace

**Files to create:**
- `Drivenlytics/mcp_config.json`

- [ ] Create `Drivenlytics/mcp_config.json` — copy the Taskade server entry + API key from `HangTherapy/mcp_config.json`
- [ ] Add any other servers needed (context7, vercel, etc.)
- [ ] Restart Claude Code to load new config
- [ ] Verify: ask Claude to list Taskade workspaces — confirm it responds

---

## Task 2 — Connect Taskade Integrations

Inside Taskade (enterprise account), connect integrations for calendar + notifications.

- [ ] Connect Google Calendar in Taskade integrations settings
- [ ] Connect Gmail in Taskade integrations settings
- [ ] Connect a notification channel: Slack, Telegram, or Discord (whichever Lawrence uses most)
- [ ] Test each connection with a dummy event to confirm they work

---

## Task 3 — Taskade PM Project Setup

- [ ] Create Taskade workspace: "Drivenlytics" (if not already existing)
- [ ] Create project: "Business Launch — Execution"
- [ ] Create task sections: Workstream A, Workstream B, Workstream C, Workstream D
- [ ] Add all tasks from the business launch plan with due dates:

**Suggested timeline (starting 2026-03-29):**

| Workstream | Tasks | Due |
|---|---|---|
| A — Templates | A1 intake form | Day 1 |
| A — Templates | A2 build checklist | Day 1 |
| A — Templates | A3 email sequence template | Day 2 |
| A — Templates | A4 delivery email template | Day 2 |
| B — Website | B1 scaffold Next.js | Day 3 |
| B — Website | B2 content constants | Day 3 |
| B — Website | B3 build components | Day 5 |
| B — Website | B4 deploy to Vercel | Day 6 |
| C — Proposals | C1 Launch Ready proposal | Day 7 |
| C — Proposals | C2 Brand Foundation Kit proposal | Day 7 |
| C — Proposals | C3 Site Upgrade proposal | Day 8 |
| C — Proposals | C4 Custom Retainer proposal | Day 8 |
| C — Proposals | C5 Cold Email Service proposal | Day 8 |
| D — SalesBlink | D1 SalesBlink setup | Day 9 |
| D — SalesBlink | D2 Lead list | Day 10 |
| D — SalesBlink | D3 Cold email sequence | Day 11 |
| D — SalesBlink | D4 Launch campaign | Day 12 |

- [ ] Set up Taskade automation: task overdue → Gmail notification to Lawrence
- [ ] Set up Taskade automation: task due today → morning notification via connected channel

---

## Task 4 — Google Calendar Time Blocks

Using Taskade's Google Calendar integration, create time blocks for every task.

- [ ] Create calendar events for each task (title = task name, description = Taskade task link)

**Estimated durations:**

| Task group | Per task |
|---|---|
| Templates (A1–A4) | 45 min each |
| Website scaffold + content (B1–B2) | 1 hr each |
| Website components + deploy (B3–B4) | 2 hrs / 1 hr |
| Proposals (C1–C5) | 30 min each |
| SalesBlink setup + leads (D1–D2) | 1 hr each |
| Sequence + launch (D3–D4) | 1.5 hrs / 30 min |

- [ ] Add recurring daily "PM check-in" block: 15 min at 9am

---

## Task 5 — Claude Code Cron Check-ins

Set up three recurring cron prompts inside Claude Code.

- [ ] **Daily 9am — Morning briefing**

```
You are the Drivenlytics PM agent. Check the "Business Launch — Execution" project in Taskade. Report: (1) what is due today, (2) what is overdue, (3) what is blocked. Give Lawrence a direct briefing on what to work on first today. Flag anything that needs to be rescheduled in Google Calendar. Be direct — no fluff.
```

- [ ] **Daily 5pm — End of day update**

```
You are the Drivenlytics PM agent. Check what tasks were completed today in the Drivenlytics Business Launch Taskade project. Update any task statuses that Lawrence completed. Identify anything due today that didn't get done — suggest new due dates and update the Google Calendar blocks accordingly.
```

- [ ] **Monday 8am — Weekly review**

```
You are the Drivenlytics PM agent. Review the full Drivenlytics Business Launch Taskade project. Are we on track to complete all workstreams within the planned 12 days? What is the priority for this week? Flag any tasks at risk and suggest adjustments. Be direct.
```
