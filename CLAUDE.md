# Drivenlytics — Claude Instructions

## Section 1: Agency Identity & Context

**Drivenlytics** is a performance-driven marketing agency. Solo operator: **Lawrence**. AI-augmented execution model — built for speed, quality, and results.

### Owner Profile
- Deep expertise in sales copy, branding, and conversion-focused marketing
- Experience with 6–9 figure clients across a broad range of industries and niches
- Specializations: high-ticket coaching, SaaS, marketing platforms (YouTube, Facebook/Meta)
- Capable of building and integrating everything from the ground up — strategy through to technical execution

### Services Offered
- **Content creation** — AI-assisted pipeline through to draft stage; human edit loop before publish
- **SEO content** — keyword-driven, performance-informed content strategy and execution
- **Website builds** — Next.js (preferred), WP + Elementor (client-required only)
- **Ecommerce** — Medusa.js
- **Email marketing** — infrastructure setup, cold outreach, drip/nurture sequences, ecommerce flows, SaaS onboarding/lifecycle
- **Funnels & landing pages** — strategy, architecture, build, and copy end-to-end
- **Branding** — identity, story, voice, tone, colors, logo direction (always human-initiated)
- **Brand Foundation Kit** — full strategic positioning package: ICP definition, value proposition, offer construction, competitive market analysis, brand positioning statement, brand voice guidelines, visual identity (logo direction, colors, typography), core messaging pillars. Priced at $3,000–$5,000. This is deep strategic work, not a design package.
- **Ad copy & creative** — Meta ads (copy + creative direction), hooks, headlines, body copy, CTAs
- **Full-stack marketing infrastructure** — domain setup, DNS, SPF/DKIM/DMARC, GTM, server-side tracking, GA4, Meta Pixel, webhooks, APIs, headless WP
- **Social media** — growth hacking and platform-specific strategy
- **AI/automation** — agentic workflows, MCP server integrations (described to clients as "automated workflows" and "AI-powered systems")
- **Dashboard product** — client-facing GA4/Search Console reporting dashboards

### Service Pricing Tiers
- **Tier 1 — "Launch Ready" ($1,000 one-time):** 1 landing page (built on Landingi) + lead capture form connected to email platform + 3–5 email welcome sequence written and loaded. Delivered in 5–7 business days.
- **Tier 1 — Content Retainer ($1,000/month):** AI-assisted, Lawrence-edited. Choose: 4 SEO blog posts, or 1 email sequence, or 8 social posts + strategy.
- **Tier 2 — Brand Foundation Kit ($3,000–$5,000 one-time):** See Brand Foundation Kit above.
- **Tier 3 — Custom / Retainer ($5,000+/month):** Full site builds, funnels, email infrastructure, ads, SEO programs, tracking setup, AI/automation workflows, dashboard product.

---

## Section 2: Workflow Modes

Claude operates in three distinct modes. Switch based on trigger phrases.

### Plan Mode
**Triggers:** "let's plan", "what's the best approach", "help me think through", "what do you think we should do"

- Ask questions before acting
- Propose 2–3 approaches with trade-offs
- Flag gaps, risks, and assumptions
- Do not write code or execute until explicitly switched to Build Mode

### Build Mode
**Triggers:** "build it", "do it", "implement", "let's go"

- Execute directly and efficiently
- No unsolicited redesigns or second-guessing
- No asking for confirmation on decisions already made

### Review Mode
**Triggers:** "review this", "what do you think", "critique this", "give me feedback"

- Honest, critical feedback only — not validation
- Flag what's weak, what's missing, what could be stronger
- Be direct

### Default
If the intent is ambiguous, ask which mode before starting.

---

## Section 3: Content & Branding Rules

### Content Pipeline
- Claude generates drafts as part of the agentic content workflow
- **Lawrence always does the final edit pass** — nothing goes live without human review
- Claude never finalizes, schedules, or publishes content autonomously
- Where performance data is available, content decisions should be informed by it

### Branding & Creative
- Brand identity (name, story, colors, voice, logo direction) is **always human-initiated**
- Claude does not propose brand directions unless explicitly asked
- Once a brand is established, Claude helps maintain voice and tone consistency across all content
- Logo design and creative assets are human-led — Claude supports execution only

### Copy Rules
- Lawrence's copy instincts and judgment override Claude's suggestions — always
- When asked to write copy, propose multiple angles/variants for selection
- For ads: draft hook, body, and CTA variants for Lawrence to select from and direct
- For emails: match the established brand voice; flag if voice guidelines haven't been set

---

## Section 4: Technical Defaults & Stack

### Sites & Frontend
- **Default:** Next.js
- **WP + Elementor:** only when the client has a hard requirement (existing team, plugin dependency, etc.)
- Recommend Next.js in all new client proposals unless there's a clear reason not to

### Ecommerce
- **Default:** Medusa.js

### Landing Pages & Funnels
- **Next.js custom** for full-site projects
- **Landingi** (LTD — free tier, built-in SEO tracking) for standalone landing pages
- Full funnel strategy, architecture, build, and copy handled end-to-end

### Tracking & Analytics
- **Always prefer server-side** over client-side tracking
- Stack: server-side GTM, GA4, Meta Pixel, Search Console
- Document every tracking setup per client for handoff clarity

### Backend Infrastructure
- Domain setup, DNS management, SPF/DKIM/DMARC
- Webhooks, APIs, third-party integrations
- Headless WP as CMS layer when needed

### AI & Automation
- Primary models: **Claude** and **Gemini**
- Tools: MCP servers, agentic workflows
- Client-facing language: "automated workflows", "AI-powered systems" — no technical implementation details in proposals or deliverables

### Deployments
- **Vercel** is the default for Next.js unless stated otherwise

---

## Section 5: Client Project Conventions

- Each client gets a **separate repository**, cloned from Drivenlytics templates
- Never mix client data, assets, configs, or credentials across projects
- When starting a new client project, prompt Lawrence for:
  1. Client name and industry/niche
  2. Services engaged
  3. Primary goals and KPIs
  4. Tech stack selection
  5. Brand guidelines (if established)
- All client-facing deliverables use plain language — no technical jargon unless the client is technical
- All tracking and analytics setups must be documented per client for clean handoffs

---

## Section 6: Dashboard Product

A core Drivenlytics product — a clean, curated reporting dashboard built for non-technical clients.

- **Purpose:** Give clients visibility into their key metrics without ever touching GA4
- **Data sources:** GA4 (primary), Google Search Console; expandable to ad platforms (Meta, Google Ads)
- **Update cadence:** Configurable per client — daily, weekly, or monthly
- **Audience:** Non-technical clients — all metrics in plain business language (traffic, leads, revenue — not sessions, bounce rate, or CTR jargon)
- **Tech stack:** Next.js frontend, GA4 Data API, Search Console API
- **Hosting:** Vercel
- **Claude's role:** Help design, build, maintain, and expand this product as the agency scales
