# SM Posting Guidelines — HangTherapy Instagram (US Audience)

*This document governs how the AI campaign planner allocates posts across the content calendar. Read this before building any campaign plan. These rules override default campaign logic where they conflict.*

---

## The Rule: 80/20 Human Signal Protocol

Not all posts are created equal. Instagram's algorithm rewards accounts that show signs of real human activity. Fully automated accounts get suppressed. To maintain US organic reach while operating from Vietnam, the calendar must reflect a deliberate split between what StoryChief schedules and what gets posted manually through AdsPower.

**The AI's job is to plan both types and mark them clearly on the calendar.**

---

## Content Type Distribution

| Content Type | Platform | Frequency | Purpose | Method |
|---|---|---|---|---|
| **Maintenance** | StoryChief (all 9 platforms) | 80% of Posts | Daily tips, carousels, educational content — keeps the algorithm active and the account consistent | **Automated — StoryChief schedules and publishes** |
| **Virality/Growth** | Instagram (via AdsPower Manual) | 20% of Posts | High-impact Reels posted manually — sends mobile metadata (touch, motion, battery) that tells the algorithm a real US human is active | **Manual — flag on calendar for Lawrence to post via AdsPower** |
| **Training** | Instagram (via AdsPower Manual) | 10 min/day | Search for and like content from US Wellness leaders (Huberman, Starrett, etc.) — teaches the algorithm who the target audience is | **Manual — daily task for Lawrence, not a post** |

---

## How to Mark the Calendar

When Agent 2 (Campaign Planner) builds `campaign_plan.json`, it MUST apply the following rules:

### Automated Posts (80%)
- Assign these to StoryChief as normal.
- Set `"method": "storychief"` in the post object.
- These can go to all 9 platforms per existing platform assignment rules.

### Manual Posts (20%)
- One in every five posts must be flagged as manual.
- These are exclusively **Instagram Reels** — high-hook, high-production video content.
- Set `"method": "manual_adspower"` in the post object.
- Set `"platforms": ["instagram"]` only — do not route manual posts to StoryChief.
- Add `"manual_note": "Post this Reel manually via AdsPower (Mobile Simulation + US Proxy). Do not schedule through StoryChief."` to the post object.
- Prefer scheduling manual posts on **Tuesday, Wednesday, or Thursday** — highest US engagement window.

### Daily Training Task (not a post)
- Add one recurring entry per active posting week in the plan:
- Set `"method": "manual_training"` with `"duration_mins": 10`.
- Add `"manual_note": "Open AdsPower (US Proxy). Search Instagram for @hubermanlab, @thereadystate, @drpeterattia. Like 5–10 posts from each. Do not follow from this account unless strategic."` 
- This is a task reminder, not a scheduled post. It does not count toward the 30-post limit.

---

## Updated Post Object Schema

Add these fields to every post object in `campaign_plan.json`:

```json
{
  "post_number": 5,
  "method": "manual_adspower",
  "platforms": ["instagram"],
  "content_type": "virality_reel",
  "manual_note": "Post this Reel manually via AdsPower (Mobile Simulation + US Proxy). Do not schedule through StoryChief.",
  "scheduled_at": "2025-05-07T09:00:00"
}
```

For automated posts:

```json
{
  "post_number": 4,
  "method": "storychief",
  "platforms": ["instagram", "facebook", "linkedin", "pinterest", "threads"],
  "content_type": "educational_tip"
}
```

For training tasks:

```json
{
  "post_number": null,
  "method": "manual_training",
  "duration_mins": 10,
  "platforms": ["instagram"],
  "manual_note": "Open AdsPower (US Proxy). Like 5–10 posts from Huberman, Starrett, Attia, or similar US Wellness leaders. Teach the algorithm your audience.",
  "scheduled_at": "2025-05-01T08:00:00"
}
```

---

## Distribution Rule for a 30-Post Campaign

| Post # | Method |
|---|---|
| 1, 2, 3, 4 | StoryChief (automated) |
| 5 | AdsPower Manual (Reel) |
| 6, 7, 8, 9 | StoryChief (automated) |
| 10 | AdsPower Manual (Reel) |
| ... | Repeat pattern |

Every 5th post in the sequence = manual Reel. Adjust if needed to land manual posts on Tue/Wed/Thu.

---

## Why This Matters (Context for the AI)

The `HangTherapyOfficial` Instagram account is managed from Vietnam but targets a US audience. To prevent the Instagram algorithm from geofencing content to Southeast Asia, the account must show periodic "human" signals — metadata that only comes from a real person physically interacting with the app on a mobile device.

StoryChief is efficient but leaves a "bot" fingerprint on its posts (no touch input, no accelerometer data, no battery state). The manual AdsPower posts counteract this. Think of the automated posts as keeping the lights on, and the manual Reels as what convinces Instagram the lights are on because a real US human is home.

The daily training task compounds this by teaching Instagram's recommendation engine who the target audience is — US professionals interested in longevity, decompression, and shoulder/spine health.

**Without the manual 20%, the automated 80% underperforms. The calendar must reflect both.**

---

## Reference

- Full infrastructure SOP: `SM Technical/SOP_instagram_us_reach.md`
- Platform specs and caption rules: `social_automation/templates/platform_specs.md`
- Campaign planner agent: `social_automation/agents/2_campaign_planner.md`
