# Drivenlytics Website — Task Plan

## Project Overview
Public marketing website for Drivenlytics agency. Showcases services, social proof, and conversion funnel.

**Primary Goals:**
- Communicate value proposition clearly
- Drive qualified leads to application/demo booking
- Establish authority in performance marketing

**Delivery Phases:**
1. ✅ **Level 1: Setup & Project Organization** — folder structure, components, copy, framework
2. ⏳ **Level 2: Performance** — context management, token optimization, MCP setup
3. ⏳ **Level 3: Speed** — build efficiency, parallel workflows
4. ⏳ **Level 4: Better Design** — AI Studio design pass, visual refinement
5. ⏳ **Level 5: Integrations & Deployment** — GTM data layer, GA4, Vercel deploy
6. ⏳ **Level 6: Cost Savings** — optimization, monitoring

---

## Level 1 Checklist
- ✅ Create folder structure (app/, components/, lib/)
- ✅ Create all 7 page components
- ✅ Write copy (site.ts with services, testimonials, pricing)
- ✅ GTM setup (useGTM hooks, layout.tsx)
- ✅ Test local build (npm run dev)
- ✅ Protocol Zero files (task_plan.md, findings.md, progress.md)
- ⏳ Version control first commit
- ⏳ GitHub repository

---

## Level 4 (Design) Scope
**Primary Tasks:**
1. Open web_build/ in AI Studio
2. Build design to 80% visual satisfaction
3. Export and port back to code
4. Apply Tailwind refinements
5. Test responsive design

**Deferred to After Design:**
- GTM data layer attributes
- Custom event tracking
- Section visibility tracking
- Analytics implementation

---

## Level 5 (Deployment) Scope
**Primary Tasks:**
1. Vercel integration (link GitHub)
2. Custom domain setup (drivenlytics.com)
3. Environment variables (GTM_ID, API keys)
4. GTM data layer activation
5. GA4 configuration
6. Meta Pixel integration (if running ads)

---

## Key Decisions Made
- Tech stack: Next.js 16 + React 19 + Tailwind CSS 4
- Hosting: Vercel (auto-deploy on GitHub push)
- Tracking: GTM data layer + GA4 (server-side preferred)
- Design approach: AI Studio first → port to code
- Content: No blog MVP (can add post-launch)
- Forms: Contact form (booking integration TBD)

---

## Dependencies & Blockers
- **None blocking Level 1**
- Level 4 requires AI Studio access
- Level 5 requires Vercel token + GitHub connection
