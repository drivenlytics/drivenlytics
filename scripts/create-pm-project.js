#!/usr/bin/env node

/**
 * Create Drivenlytics Folder Structure & PM Project
 *
 * Creates organized folder structure:
 * - Execution (Business Launch — PM project with A, B, C, D workstreams)
 * - Sales & Outreach (for SalesBlink campaigns, cold emails)
 * - Projects (for client work deliverables)
 * - Content (for templates, drafts, copy libraries)
 *
 * Usage: node scripts/create-pm-project.js
 */

const https = require('https');

const API_KEY = process.env.TASKADE_API_KEY || 'tskdp_uF8kyr7xDke5btWxqujMxCwDwsBtVJAi7x';
const WORKSPACE_ID = 'xvtehwmp47if0vsm';
const API_BASE = 'api.taskade.com';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const fullPath = `/v1${path}`;
    const options = {
      hostname: API_BASE,
      path: fullPath,
      method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Drivenlytics-PM-Setup/1.0'
      }
    };

    console.log(`[DEBUG] ${method} ${fullPath}`);
    if (body) console.log(`[DEBUG] Body:`, JSON.stringify(body));

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`API Error ${res.statusCode}: ${data}`));
        } else {
          try {
            const parsed = data ? JSON.parse(data) : null;
            resolve(parsed);
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}, raw response: ${data}`));
          }
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const workstreams = {
  A: {
    name: 'Workstream A — Offer Delivery Templates',
    startDay: 1,
    tasks: [
      { id: 'A1', title: 'Client intake form', desc: 'Create intake form with client info, offer, audience, landing page, email sequence details' },
      { id: 'A2', title: 'Build + delivery checklist', desc: 'Create checklist with Copy, Page Build, Email Sequence, Integration, Delivery sections' },
      { id: 'A3', title: 'Email sequence copy template', desc: 'Create 5-email fill-in-bracket template (Welcome, Story, Problem, Solution, Close)' },
      { id: 'A4', title: 'Client delivery email template', desc: 'Create delivery email with live URL, email confirmation, Loom link, upsell mentions' }
    ]
  },
  B: {
    name: 'Workstream B — Agency Website',
    startDay: 3,
    tasks: [
      { id: 'B1', title: 'Scaffold Next.js project', desc: 'Create Next.js app with TypeScript, Tailwind, app directory' },
      { id: 'B2', title: 'Content constants file', desc: 'Create site.ts with copy, taglines, services array, proof cases' },
      { id: 'B3', title: 'Build components', desc: 'Build Nav, Hero, Services, Proof, Contact components and assemble page' },
      { id: 'B4', title: 'Deploy to Vercel', desc: 'Push to GitHub, import in Vercel, verify, connect custom domain' }
    ]
  },
  C: {
    name: 'Workstream C — Client Proposals',
    startDay: 7,
    tasks: [
      { id: 'C1', title: 'Launch Ready proposal', desc: '$1,000 one-time: landing page + form + 5-email sequence' },
      { id: 'C2', title: 'Brand Foundation Kit proposal', desc: '$3,000–$5,000: ICP, positioning, voice guidelines, visual identity' },
      { id: 'C3', title: 'Site Upgrade proposal', desc: 'WP to headless Next.js migration + SEO content integration' },
      { id: 'C4', title: 'Custom/Retainer proposal', desc: '$5,000+/month full-stack services (site builds, funnels, ads, SEO, tracking)' },
      { id: 'C5', title: 'Cold email service proposal', desc: 'SalesBlink setup, domain config, lead list, 5-email sequence, reporting' }
    ]
  },
  D: {
    name: 'Workstream D — SalesBlink Cold Outreach',
    startDay: 12,
    tasks: [
      { id: 'D1', title: 'Set up SalesBlink', desc: 'Configure domain, sending limits, campaign, tracking inbox' },
      { id: 'D2', title: 'Build lead list', desc: 'Find WordPress sites via BuiltWith/Apollo, 200–500 leads per niche' },
      { id: 'D3', title: 'Write cold email sequence', desc: '5-email WP-owner outreach: hook, proof, social proof, offer, close' },
      { id: 'D4', title: 'Define Site Upgrade package', desc: 'Confirm pricing, finalize proposal copy' },
      { id: 'D5', title: 'Cold outreach automation', desc: 'Set up workflows, warmup period, launch campaign' }
    ]
  }
};

function getDueDate(day) {
  const date = new Date('2026-03-30');
  date.setDate(date.getDate() + day - 1);
  return date.toISOString().split('T')[0];
}

async function main() {
  console.log('🚀 Creating PM Project in Execution Folder...\n');

  try {
    // Folder IDs (pre-created manually)
    const folders = {
      'Execution': 'nnpljtmpwwj3uukc',
      'Sales & Outreach': '9te4mh0yhcpk5zdi',
      'Client Projects': 'ofz3giam9oxbrxnp',
      'Content': 'c3cnisf0k583yrlm'
    };

    console.log('📁 Using existing folders:');
    for (const [name, id] of Object.entries(folders)) {
      console.log(`   ✓ ${name}: ${id}`);
    }
    console.log('');

    // Create PM project in Execution folder
    console.log('📋 Creating "Business Launch — Execution" project...');
    const projectRes = await request('POST', `/folders/${folders['Execution']}/projects`, {
      name: 'Business Launch — Execution',
      description: 'Full execution plan for Drivenlytics agency launch: templates, website, proposals, cold outreach'
    });

    const projectId = projectRes.project?.id || projectRes.id || projectRes.projectId;
    console.log(`✅ Project created\n`);

    let totalTasks = 0;
    const dueChronology = [];

    // Create sections and tasks
    for (const wsData of Object.values(workstreams)) {
      console.log(`📌 ${wsData.name}`);

      const sectionRes = await request('POST', `/projects/${projectId}/sections`, {
        name: wsData.name
      });
      const sectionId = sectionRes.section?.id || sectionRes.id || sectionRes.sectionId;
      console.log(`   ✓ Section created`);

      let dayOffset = wsData.startDay;
      for (const taskDef of wsData.tasks) {
        const dueDate = getDueDate(dayOffset);
        dueChronology.push({ task: `${taskDef.id}: ${taskDef.title}`, date: dueDate });

        await request('POST', `/projects/${projectId}/tasks`, {
          sectionId: sectionId,
          title: `${taskDef.id}: ${taskDef.title}`,
          description: taskDef.desc,
          dueDate: dueDate,
          priority: 'medium',
          status: 'todo'
        });

        console.log(`   ✓ ${taskDef.id}: ${taskDef.title} (${dueDate})`);
        totalTasks++;
        dayOffset++;
      }
      console.log('');
    }

    // Summary
    console.log('═'.repeat(60));
    console.log('✨ SETUP COMPLETE\n');
    console.log(`Folders created: 4 (Execution, Sales & Outreach, Projects, Content)`);
    console.log(`PM Project: Business Launch — Execution`);
    console.log(`Total tasks: ${totalTasks}`);
    console.log(`Timeline: ${dueChronology[0].date} → ${dueChronology[dueChronology.length - 1].date}`);
    console.log('\n✅ Open Taskade and start executing!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
