SEO Automation Process Map: KW to 1st Draft (Final)
Phase 0: System Configuration
STEP 0: Generate Workflow Configuration Form

Goal: Collect all dynamic variables required for the specific run.

Action: The Brain generates a form for the user to input: {{Target_Topic}}, {{Seed_Keyword}}, {{Brand_Name}}, {{Target_Word_Count}}, and {{Competitor_URLs_1-5}}.

Source Folder: References brand_agent folder for static identity files.

Phase 1: Raw Intelligence & Search Demand
STEP 1: Execute Keyword Research

Goal: Establish the "Keyword Source of Truth."

Agent: 1. Keyword Research Agent

Input: {{Seed_Keyword}}, {{Target_Topic}}, {{Target_Word_Count}}

Output: KD: MK KW Report

Phase 2: Competitive & Semantic Intelligence
STEP 2: Extract & Synthesize Competitive Data using SEO Entity Analyzer Agent

Goal: Identify semantic gaps and technical benchmarks (word count/structure).

Workflow:

Extraction: Run Agent 2 (SEO Entity Analyzer) five times—once for each Competitor URL.

Synthesis: Run Agent 3 (SEO Comparative Entity & Gap Analysis) to merge the 5 reports.

Agent: 3. SEO Comparative Entity & Gap Analysis Agent

Output: KD: Entity & Gap Analysis Report

Phase 3: Strategy & Briefing
STEP 3: Generate Master Content Brief

Goal: Synthesize Brand, Keyword, and Entity intelligence into a single strategy.

Agent: 4. SEO Content Brief Agent

Inputs (Knowledge Base Requirements):

Source 1: KD: MK KW Report (From Step 1)

Source 2: KD: Entity & Gap Analysis Report (From Step 2)

Source 3: KD: Avatar/Demographics (From brand_agent folder)

Source 4: KD: Brand Voice Integration Guidelines (From brand_agent folder)

Output: KD: SEO Content Brief

STEP 4: Generate Structured Content Outline using Structured Content Outline Agent

Goal: Convert the brief into a hierarchical, SEO-optimized skeleton.

Agent: 5. Structured Content Outline Agent

Inputs: 1. KD: SEO Content Brief (From Step 3)
2. KD: MK KW Report (From Step 1)

Output: KD: SEO Structured Outline

Phase 4: Content Production
STEP 5: Write First Draft Content

Goal: Produce a high-volume, brand-aligned, semantically complete article.

Agent: 6. Content Writer

Inputs:

KD: SEO Structured Outline (From Step 4)

KD: MK KW Report (From Step 1)

KD: Entity & Gap Analysis Report (From Step 2)

Logic Constraint: Each section must match the word counts defined in the KD: SEO Structured Outline to hit the {{Target_Word_Count}} goal.

Output: Final Article Draft - {{Target_Topic}}

Phase 5: Readability Editing
STEP 6: Run Blog Editor Agent

Goal: Reduce reading level to Grade 8 by eliminating verbose AI writing patterns.

Agent: 7. Blog Editor Agent

Inputs:
KD: Final Article Draft - {{Target_Topic}} (From Step 5)
{{Primary_Keyword}} + {{Tier_1_LSI_Terms}} (DO NOT REMOVE these entities)

Process (5-Pass Hemingway Algorithm):
Pass 1: Split very hard sentences (>25 words) and hard sentences (>18 words).
Pass 2: Purge -ly adverbs; replace weak verb + adverb with strong single verb.
Pass 3: Convert passive voice to active voice.
Pass 4: Delete qualifiers and hedging language.
Pass 5: Swap Latinate vocabulary for common English alternatives.

Output: KD: Edited Article Draft - {{Target_Topic}}