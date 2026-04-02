# Client Onboarding Process

## Overview
Every new Drivenlytics client goes through this process before any design, copy, or build work begins. No exceptions.

---

## Step 1: Discovery
**Trigger:** Client signs or expresses serious intent  
**Tool:** Run the Discovery Northstar questionnaire  
**Output:** Completed discovery doc with client name, industry, services engaged, goals, KPIs, tech stack, brand status

---

## Step 2: Site Architecture
**Trigger:** Discovery complete  
**Tool:** Site Architecture framework  
**Output:** Locked `ARCHITECTURE.md` — sections confirmed, order set, nothing changes after this  
**Deliverable:** Send `templates/site-architecture-template.md` filled out to client for sign-off

---

## Step 3: Brand Foundation
**Trigger:** Architecture locked  
**Process:**
1. Run the 5-step brand meaning discovery process (`knowledge/uncovering-brand-meaning-5-step-process.md`):
   - Step 1: Brand Soul — history, origin, cultural context, customer relationship
   - Step 2: Brand Substance — functional truth, product use, customer attachment
   - Step 3: Competitive Leverage — competitor archetypes, differentiation opportunity
   - Step 4: Know Your Customer — life stage, dormant urges, underserved needs
   - Step 5: Brand Bank — how to protect and nourish the archetype going forward
2. Send client `templates/branding-worksheet-template.md` to fill out
3. Client fills in archetype, motivation, voice, positioning, visual direction, core message, ICP
4. Review completed worksheet against the archetype framework (`knowledge/archetypes-motivation-reference.md`)
5. Ask clarifying questions until archetype is solid enough to inform:
   - Website copy and headlines
   - Sales messaging and positioning
   - Content tone and voice
   - Visual direction for design
6. Lock brand foundation — document decisions in client `BRANDING.md`

**Deliverable:** Completed Brand Foundation doc sent to client for approval

---

## Step 4: Copy
**Trigger:** Brand foundation locked  
**Process:**
- Write copy for each section defined in architecture
- Multiple variants per section for client selection
- All copy written in the locked brand voice and archetype
- Lawrence does final edit pass before anything goes to client

**Deliverable:** Copy deck sent to client for review and selection

---

## Step 5: Design
**Trigger:** Copy approved  
**Process:**
- Build design system (colors, typography, components) aligned to visual direction
- Design follows architecture section order
- No new sections added at this stage

---

## Step 6: Build & Deploy
**Trigger:** Design approved  
**Stack:** Next.js + Vercel (default)  
**Includes:**
- Full site build per locked architecture
- Server-side tracking setup (GTM, GA4, Meta Pixel)
- Domain, DNS, SPF/DKIM/DMARC if needed
- All tracking documented for handoff

---

## Step 7: Handoff
- Tracking documentation delivered
- Client walkthrough of dashboard (if applicable)
- Ongoing retainer scope defined (if applicable)

---

## Notes
- Never mix client data, assets, or credentials across projects
- Each client gets a separate repository cloned from Drivenlytics templates
- Nothing goes live without Lawrence's final review
