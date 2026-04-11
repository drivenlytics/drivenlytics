/**
 * LEGACY — DO NOT MOVE BACK TO src/pages/ OR src/components/
 *
 * This file is in src/legacy/ because Next.js treats src/pages/ as the Pages Router,
 * which causes a build failure on the Vite-specific `?raw` import below.
 * It is excluded from TypeScript compilation via tsconfig.json.
 *
 * When FounderStory is ready for Next.js, the markdown should be loaded via:
 *   import fs from "fs";
 *   const storyMd = fs.readFileSync(path.join(process.cwd(), "content/founder-story.md"), "utf-8");
 * in a Server Component, replacing the `?raw` import entirely.
 */
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { marked } from "marked";
import { Navbar, Footer } from "../components/Sections";
import { ContactModal } from "../components/ContactModal";
import storyMd from "../content/founder-story.md?raw";

// Parse markdown into sections split by ---
function parseSections(md: string) {
  const raw = marked.parse(md) as string;
  // Split rendered HTML on <hr> tags
  return raw.split(/<hr\s*\/?>/).map((s) => s.trim()).filter(Boolean);
}

export const FounderStory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const sections = parseSections(storyMd);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-purple selection:text-white">
      <Navbar onStart={() => setModalOpen(true)} />

      <main className="px-6 pb-32">
        <div className="max-w-3xl mx-auto pt-16 md:pt-24">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-brand-purple text-[11px] md:text-sm font-black uppercase tracking-[0.4em] mb-10"
          >
            Founder
          </motion.div>

          {/* Story sections */}
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="founder-prose mb-12"
              dangerouslySetInnerHTML={{ __html: section }}
            />
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hero-gradient-border p-10 md:p-20 text-center mt-24"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic text-white leading-[0.85]">
              Let's Talk
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 mb-10 font-medium max-w-xl mx-auto">
              No pitch. Just a straight conversation about where you're at and where you want to go.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-black text-base md:text-xl uppercase tracking-widest rounded-full hover:bg-[#7c3aed] hover:text-white transition-[background-color,box-shadow] shadow-[0_0_40px_rgba(139,92,246,0.6)] ring-2 ring-brand-purple/60 hover:shadow-[0_0_64px_rgba(139,92,246,0.9)] hover:ring-brand-purple"
            >
              Start the Conversation
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
