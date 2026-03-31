# Design Doc: Drivenlytics CLAUDE.md

**Date:** 2026-03-28
**Status:** Approved
**Author:** Lawrence (via Claude brainstorming session)

---

## Problem

Starting a new agency project with no persistent Claude context means re-briefing Claude every session. Without a CLAUDE.md, Claude lacks knowledge of the business, services, workflow preferences, technical defaults, and content/branding rules — leading to generic responses and wasted time.

## Goal

Create a comprehensive `CLAUDE.md` that gives Claude full agency context from the first message of every session. Claude should be able to operate as an informed AI partner without any re-briefing.

## Design Decisions

### Approach: Comprehensive Single File (Option B)
Chose a single well-structured CLAUDE.md over a minimal file or modular docs approach. Rationale: solo operator running a complex multi-service agency needs maximum leverage from Claude. A single file is easier to maintain at this stage and can be graduated to modular docs as the agency scales.

### Workflow Modes
Introduced three explicit modes (Plan / Build / Review) with trigger phrases. This solves the core tension between wanting strategic input and pure execution — Claude switches gears based on context rather than defaulting to one behavior.

### Content & Branding Rules
Explicit rules were necessary because copy and branding are Lawrence's core expertise. Claude must support, not lead, in these areas. The agentic content pipeline (AI draft → human edit) is codified so Claude understands its role in the workflow.

### Client Project Conventions
Separate repos per client (not a monorepo) was chosen for clean context isolation, easier handoffs, and preventing cross-client data mixing. Drivenlytics repo serves as the agency hub and template source.

### Dashboard Product
Included as a Section 6 because it's a core product being built, not just a service. Gives Claude persistent context on the product spec so it can contribute to it across sessions.

---

## Sections Summary

| Section | Purpose |
|---------|---------|
| 1. Agency Identity | Who Drivenlytics is, owner profile, full service list |
| 2. Workflow Modes | Plan / Build / Review modes with trigger phrases |
| 3. Content & Branding Rules | Human-in-the-loop rules for copy, content pipeline, branding |
| 4. Technical Defaults | Stack decisions, tool preferences, deployment defaults |
| 5. Client Conventions | Per-client repo structure, onboarding checklist, delivery standards |
| 6. Dashboard Product | Client GA4/Search Console dashboard product spec |

---

## File Location

`/CLAUDE.md` — project root of the Drivenlytics repo

---

## Future Iterations

- Add a `Section 7: Offer & Positioning` once the core service offer is defined
- Graduate to modular docs (`docs/content-workflow.md`, `docs/tech-stack.md`) when the agency scales and CLAUDE.md grows unwieldy
- Add per-client CLAUDE.md conventions doc as template library develops
