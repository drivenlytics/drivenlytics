# Drivenlytics Business Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Go from approved spec to client-ready — delivery system built, website live, proposals ready to send, outreach pipeline running.

**Architecture:** Four sequential workstreams (A → B → C → D). A builds the fulfillment system. B builds the website so there's something to point prospects to. C creates proposals to send to prospects. D builds the SalesBlink cold outreach pipeline to drive leads.

**Tech Stack:** Landingi (landing pages), Next.js + Tailwind + Vercel (agency website), Markdown templates (proposals + delivery docs), SalesBlink (cold outreach).

---

## Workstream A — Offer Delivery Templates

*Build the repeatable system for fulfilling the $1,000 Launch Ready package.*

**Files to create:**
- `clients/templates/launch-ready-intake.md`
- `clients/templates/launch-ready-build-checklist.md`
- `clients/templates/launch-ready-email-sequence.md`
- `clients/templates/launch-ready-delivery-email.md`

---

### Task A1: Client intake form

- [ ] Create `clients/templates/launch-ready-intake.md`

Fields to include:
- Client name, business name, industry/niche, website, email platform
- Offer + audience: what they sell, ICP, #1 problem solved, differentiator
- Landing page: goal (collect emails / book a call / sell), one action, lead magnet Y/N, tone preference, copy they love/hate
- Email sequence: goal, number of emails (default 5), send cadence (default Day 0/1/3/5/7)
- Assets: logo, brand colors, existing copy/social to reference
- Deadline: preferred delivery date, hard deadline

- [ ] Commit: `feat: add Launch Ready client intake template`

---

### Task A2: Build + delivery checklist

- [ ] Create `clients/templates/launch-ready-build-checklist.md`

Sections:
- **Copy (Day 1–2):** intake reviewed, headline variants (3 min), subheadline, hero copy, body copy, CTA variants, form labels, privacy microcopy, Lawrence edit pass
- **Page Build (Day 2–3):** Landingi page created, copy in, logo + colors applied, mobile reviewed, CTA linked, thank-you page set, page published
- **Email Sequence (Day 3–4):** all 5 emails drafted, Lawrence edit pass, loaded into platform, automation trigger confirmed, test opt-in completed
- **Integration (Day 4–5):** form connected to email platform, test submission sent, welcome email fires within 5 min, sequence cadence confirmed
- **Delivery (Day 5–7):** live URL confirmed desktop + mobile, Loom walkthrough recorded (2–3 min), delivery email sent, invoice sent, upsell noted

- [ ] Commit: `feat: add Launch Ready build and delivery checklist`

---

### Task A3: Email sequence copy template

- [ ] Create `clients/templates/launch-ready-email-sequence.md`

5-email fill-in-bracket template:

| Email | Subject angle | Send timing | Goal |
|---|---|---|---|
| 1 | Welcome + deliver lead magnet | Immediately on opt-in | Deliver, set expectations |
| 2 | Story / credibility | Day 1 | Build trust |
| 3 | Problem agitation | Day 3 | Deepen pain awareness |
| 4 | Solution / offer intro | Day 5 | Present the offer |
| 5 | CTA / close | Day 7 | Drive action |

Each email: subject line, body with [BRACKETS] for personalisation, tone note.
Include footer note: *adjust tone to match client brand voice from intake form.*

- [ ] Commit: `feat: add Launch Ready email sequence copy template`

---

### Task A4: Client delivery email template

- [ ] Create `clients/templates/launch-ready-delivery-email.md`

Contents:
- Subject: "Your Launch Ready package is live ✓"
- Live URL confirmation
- Email platform + sequence confirmation
- Loom walkthrough link
- Instructions: test opt-in yourself, then share the link
- 24-hour tweak offer
- Upsell mention: additional sequences / full site build / Brand Foundation Kit (personalise based on what client actually needs next)

- [ ] Commit: `feat: add Launch Ready client delivery email template`

---

## Workstream B — Agency Website

*Build and deploy the Drivenlytics website.*

**Files to create:**
- `website/` — Next.js project root
- `website/content/site.ts` — all copy as constants (single source of truth)
- `website/components/Nav.tsx`
- `website/components/Hero.tsx`
- `website/components/Services.tsx`
- `website/components/Proof.tsx`
- `website/components/Contact.tsx`
- `website/app/page.tsx`

---

### Task B1: Scaffold Next.js project

- [ ] Run: `npx create-next-app@latest website --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
- [ ] Remove boilerplate from `app/page.tsx` and `app/globals.css` (keep Tailwind directives)
- [ ] Commit: `feat: scaffold Drivenlytics website project`

---

### Task B2: Content constants file

- [ ] Create `website/content/site.ts` with:
  - `site.name`, `site.tagline`, `site.description`
  - `site.nav` array
  - `site.hero` — headline, subheadline, CTA text + link
  - `site.services` array — name, price, type (one-time/retainer), description, CTA label for each tier
  - `site.proof.cases` — Hang Therapy: URL, description, tags (Brand, Website, SEO, Email)
  - `site.contact` — headline, subheadline, email, CTA label

- [ ] Commit: `feat: add site content and copy constants`

---

### Task B3: Build components

- [ ] **Nav** — logo/name left, nav links right, border-bottom
- [ ] **Hero** — large bold headline, subheadline, single black CTA button
- [ ] **Services** — 3-column grid; each card: name, type badge, price (large), description, CTA link to #contact
- [ ] **Proof** — Hang Therapy case: client name as external link, description, tag chips
- [ ] **Contact** — headline, subheadline, mailto CTA button
- [ ] **page.tsx** — assemble all components inside `max-w-6xl mx-auto`
- [ ] Run `npm run dev`, verify all sections on desktop + mobile
- [ ] Commit: `feat: build Drivenlytics homepage`

---

### Task B4: Deploy to Vercel

- [ ] Push to GitHub
- [ ] Vercel → New Project → import repo → set root directory to `website/` → Deploy
- [ ] Verify live URL on desktop + mobile
- [ ] Connect custom domain when ready (Vercel dashboard → Domains → update DNS at registrar)
- [ ] Commit note: `chore: deploy Drivenlytics website to Vercel`

---

## Workstream C — Client Proposal Templates

*One-pager per tier, ready to send to prospects.*

**Files to create:**
- `clients/proposals/launch-ready-proposal.md`
- `clients/proposals/brand-foundation-kit-proposal.md`
- `clients/proposals/site-upgrade-proposal.md`
- `clients/proposals/custom-retainer-proposal.md`
- `clients/proposals/cold-email-service-proposal.md`

---

### Task C1: Launch Ready proposal ($1,000)

- [ ] Create `clients/proposals/launch-ready-proposal.md`

Sections:
1. **What you get** — landing page + form + 5-email sequence, built and live in 5–7 business days
2. **Who this is for** — coach/consultant/founder with an offer that needs a home; no time to figure out copywriting + page builders + email platforms
3. **What makes it different** — direct-response copy built for your offer and audience; the psychology layer you can't get from a page builder
4. **Investment** — $1,000 one-time, delivery 5–7 business days from intake completion
5. **To get started** — reply or book a call, intake form follows

- [ ] Lawrence review pass before first send
- [ ] Commit: `feat: add Launch Ready client proposal template`

---

### Task C2: Brand Foundation Kit proposal ($3,000–$5,000)

- [ ] Create `clients/proposals/brand-foundation-kit-proposal.md`

Sections:
1. **What you get** — ICP definition, value proposition, offer construction/refinement, competitive analysis, brand positioning statement, brand voice guidelines, visual identity (logo direction, colors, typography), core messaging pillars (taglines, headline angles, key copy)
2. **Deliverable format** — Brand Foundation Document + visual direction assets
3. **Who this is for** — building something real and done winging it; or operating without a clear brand and losing deals to competitors who look/sound more credible
4. **What makes it different** — same strategic work done for 7–9 figure clients; copy skills separate this from a design agency (positioning is words first)
5. **Investment** — $3,000–$5,000, scoped after 30-min discovery call, fixed quote before work begins
6. **To get started** — reply, book 30 minutes

- [ ] Lawrence review pass before first send
- [ ] Commit: `feat: add Brand Foundation Kit proposal template`

---

### Task C3: Site Upgrade proposal (WP → headless Next.js + SEO)

- [ ] Confirm pricing with Lawrence before writing (suggested $3,000–$5,000 based on site complexity)
- [ ] Create `clients/proposals/site-upgrade-proposal.md`

Sections:
1. **What you get** — WP site audit, headless WP + Next.js migration, on-page SEO setup, SEO content machine integration, email integration, live on Vercel
2. **Who this is for** — established businesses on WordPress whose site is slow, losing rankings, or needs a modern rebuild
3. **What makes it different** — full end-to-end execution: migration + copy + SEO content + email, not just a rebuild
4. **Investment** — price confirmed after site audit
5. **To get started** — reply, I'll audit your site and give you a fixed quote

- [ ] Lawrence review pass before first send
- [ ] Commit: `feat: add Site Upgrade proposal template`

---

### Task C4: Custom / Retainer proposal (from $5,000/month)

- [ ] Create `clients/proposals/custom-retainer-proposal.md`

Sections:
1. **What this covers** — full services list: site builds (Next.js, headless WP), funnels, email infrastructure, Meta ads, SEO + content, server-side tracking, GTM strategy, AI/automation workflows, client reporting dashboard
2. **Who this is for** — past the starter stage; needs a marketing partner who thinks strategically and executes technically without managing 5 specialists
3. **How it works** — scoping call → defined deliverables per month → no vague retainers; every month has defined outputs
4. **Investment** — from $5,000/month, scoped to goals
5. **To get started** — reply with what you're trying to accomplish

- [ ] Lawrence review pass before first send
- [ ] Commit: `feat: add Custom Retainer proposal template`

---

### Task C5: Cold email service proposal

- [ ] Create `clients/proposals/cold-email-service-proposal.md`

Includes: sending domain setup (SPF/DKIM/DMARC), SalesBlink campaign setup, lead list built to ICP, 5-email sequence written, reporting. One-time setup fee (TBD) + optional monthly management retainer. Natural upsell alongside Launch Ready: "we build the landing page AND drive traffic to it via cold outreach."

- [ ] Lawrence review pass before first send
- [ ] Commit: `feat: add Cold Email Service proposal template`

---

## Workstream D — SalesBlink Cold Outreach

*Build a reliable client acquisition pipeline for Drivenlytics.*

**Primary target:** WordPress site owners — easy to identify (BuiltWith, Apollo), concrete pain (slow site, Core Web Vitals, dropping rankings), Lawrence has the full end-to-end solution.

**Files to create:**
- `clients/templates/salesblink-outreach-sequence.md`

---

### Task D1: Set up SalesBlink

- [ ] Confirm sending domain warmed up + SPF/DKIM/DMARC configured in SalesBlink
- [ ] Set daily sending limits (start 20–30/day, scale after 2 weeks)
- [ ] Create campaign for WP site owner outreach
- [ ] Connect tracking inbox for reply monitoring

---

### Task D2: Build lead list

Tool: BuiltWith or Apollo. Filter: WordPress sites, established business, no recent migration evidence.

Start with 1–2 niches to test:
- Coaches / consultants with WP sites
- Health / wellness businesses
- Local service businesses (lawyers, dentists, trades)

Goal: 200–500 qualified leads per niche.

---

### Task D3: Write the cold email sequence

- [ ] Create `clients/templates/salesblink-outreach-sequence.md`

5-email sequence. Angle: their WP site is costing them rankings and leads.

| Email | Angle | Timing |
|---|---|---|
| 1 | Hook — WP site is losing them Google traffic | Day 0 |
| 2 | Proof — what headless WP + Next.js does for rankings | Day 2 |
| 3 | Social proof — Hang Therapy result | Day 4 |
| 4 | The offer — Site Upgrade package, what's included, price | Day 6 |
| 5 | Soft close — last follow-up, open door | Day 9 |

Format: fill-in-bracket, subject line A/B variants, personalisation hooks (site name, niche, specific pain observed).

- [ ] Commit: `feat: add SalesBlink outreach sequence template`

---

## Post-Launch Checklist

- [ ] Update email address in `website/content/site.ts` before going live
- [ ] Add GA4 tag to website
- [ ] Lawrence final review pass on all proposal templates before first send
- [ ] Add proof cases to `site.ts` as client work completes
- [ ] Run competitor research — update hero + services copy with sharper messaging once done
