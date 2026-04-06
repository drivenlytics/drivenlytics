import { motion } from "motion/react";
import { ArrowRight, Zap, Target, Layers, BarChart3, MessageSquare, Quote, ChevronRight, Sparkles } from "lucide-react";


const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <img src="/logo.svg" alt="Drivenlytics" className="h-10 w-auto" />
    <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white italic">
      DRIVENLYTICS
    </span>
  </div>
);

export const Navbar = () => (
  <nav className="sticky top-0 z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto">
      <div className="brand-bar-border w-full p-6 md:p-8 flex items-center justify-between bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-12">
          <Logo />
          <div className="hidden lg:flex items-center gap-12">
            <a href="#services" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors">Services</a>
            <a href="#process" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors">Process</a>
            <a href="#testimonials" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors">Results</a>
          </div>
        </div>
        <a href="mailto:hello@drivenlytics.com" className="px-8 py-3.5 bg-white text-black text-[20px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 shadow-[0_0_40px_rgba(139,92,246,0.6),_40px_0_36px_rgba(139,92,246,0.18),_-40px_0_36px_rgba(139,92,246,0.18)] ring-2 ring-brand-purple/60 hover:shadow-[0_0_64px_rgba(139,92,246,0.9),_60px_0_48px_rgba(139,92,246,0.3),_-60px_0_48px_rgba(139,92,246,0.3)] hover:ring-brand-purple">
          Start
        </a>
      </div>
    </div>
  </nav>
);

export const Hero = () => (
  <section className="relative pt-12 pb-0 px-6 flex flex-col items-center overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 blur-[180px] rounded-full -z-10 animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 blur-[180px] rounded-full -z-10" />

    <div className="max-w-7xl w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hero-gradient-border w-full p-12 md:p-24 relative overflow-hidden mb-0"
      >
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-brand-purple text-[20px] font-black uppercase tracking-[0.4em] mb-12"
          >
            <Sparkles className="w-4 h-4" />
            The Analytical Alchemist
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-12 leading-[0.85] uppercase italic text-white flex items-center justify-center gap-6">
            <img src="/logo.svg" alt="" className="h-[1.4em] w-auto" />
            DRIVENLYTICS
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 max-w-3xl ml-[255px] leading-tight font-medium text-center">
            Data-Driven Performance Marketing Solutions
          </p>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 blur-[100px] -z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-10"
      >
        <button className="group relative px-14 py-6 bg-white text-black font-black text-[24px] uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(139,92,246,0.6),_40px_0_36px_rgba(139,92,246,0.18),_-40px_0_36px_rgba(139,92,246,0.18)] ring-2 ring-brand-purple/60 hover:shadow-[0_0_64px_rgba(139,92,246,0.9),_60px_0_48px_rgba(139,92,246,0.3),_-60px_0_48px_rgba(139,92,246,0.3)] hover:ring-brand-purple">
          <span className="relative z-10 flex items-center gap-5">
            Start <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-gray-900 overflow-hidden ring-1 ring-white/10">
                <img src={`https://picsum.photos/seed/agency${i}/100/100`} alt="Client" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <span className="text-gray-500 text-[30px] font-black uppercase tracking-[0.3em]">Trusted by 7–9 figure market leaders</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Services = () => {
  const services = [
    {
      title: "Launch Ready",
      price: "$1,000",
      type: "one-time",
      desc: "Landing page + lead form + 5-email welcome sequence",
      delivery: "5–7 business days",
      icon: <Zap className="w-10 h-10" />
    },
    {
      title: "Brand Foundation Kit",
      price: "$3,000–$5,000",
      type: "one-time",
      desc: "ICP, value proposition, brand positioning, voice guidelines, visual identity, core messaging",
      delivery: "Custom timeline",
      icon: <Target className="w-10 h-10" />
    },
    {
      title: "Content Retainer",
      price: "$1,000/mo.",
      type: " ",
      desc: "4 SEO blog posts OR 1 email sequence OR 8 social posts + strategy",
      delivery: "Ongoing",
      icon: <Layers className="w-10 h-10" />
    },
    {
      title: "Custom / Full-Stack",
      price: "$5,000+/mo.",
      type: "",
      desc: "Site builds, funnels, email infrastructure, ads, tracking, AI automation",
      delivery: "Strategic partnership",
      icon: <BarChart3 className="w-10 h-10" />
    }
  ];

  return (
    <section id="services" className="py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center md:text-left">
          <span className="text-brand-purple font-black uppercase tracking-[0.4em] text-[30px] mb-6 block">The Arsenal</span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Creative Strategic <br />Breakthroughs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient-border p-12 flex flex-col h-full group hover:-translate-y-4 transition-all duration-700"
            >
              <div className="text-brand-purple mb-12 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight">{s.title}</h3>
              <div className="mb-8 flex flex-col gap-1">
                <span className="text-4xl font-black text-white">{s.price}</span>
                <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">{s.type}</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-12 flex-grow font-medium">{s.desc}</p>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-purple uppercase tracking-[0.3em]">{s.delivery}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-purple transition-colors duration-500">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Process = () => {
  const phases = [
    {
      step: "PHASE 01",
      title: "Research & Strategy",
      desc: "Deep intelligence gathering to find the hidden leverage points in your market.",
      items: ["Unique market research", "Competitor analysis", "Proprietary avatar creation", "Market awareness assessment", "Psychological pattern analysis"],
      color: "from-brand-pink to-brand-purple"
    },
    {
      step: "PHASE 02",
      title: "Creative & Persuasion",
      desc: "Transmuting data into a compelling narrative that bypasses skepticism.",
      items: ["Big idea generation", "Branding and storytelling", "USP development", "NLP strategies", "Psychological persuasion"],
      color: "from-brand-purple to-brand-blue"
    },
    {
      step: "PHASE 03",
      title: "Execution",
      desc: "Precision deployment of assets designed for maximum conversion velocity.",
      items: ["Design with pattern interrupts", "Lead creation systems", "CTA optimisation", "Offer development", "Visual design"],
      color: "from-brand-blue to-brand-pink"
    }
  ];

  return (
    <section id="process" className="py-40 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32 text-center">
          <span className="text-brand-purple font-black uppercase tracking-[0.4em] text-[30px] mb-6 block">The Methodology</span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none [word-spacing:1rem]">Analytical Alchemy</h2>
        </div>
        <div className="space-y-12">
          {phases.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${p.color} opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity duration-1000`} />
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row gap-16 items-start shadow-2xl shadow-black">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="lg:w-1/2 relative z-10">
                  <div className="text-brand-purple font-black text-sm uppercase tracking-[0.5em] mb-8">{p.step}</div>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">{p.title}</h3>
                  <p className="text-xl md:text-2xl text-gray-400 font-medium leading-tight mb-12">{p.desc}</p>
                </div>
                <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {p.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 group/item">
                      <div className="w-3 h-3 bg-brand-purple rounded-full shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                      <span className="text-xs font-black uppercase tracking-widest text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const testimonials = [
    { name: "Benson Chidester", title: "COO, Marketer, Coach — 8-figure Earner & 4X Two Comma Club Member (Tanner Chidester)", quote: "If there's one word to describe Lawrence — he over delivers. He's thorough, dedicated, makes sure he has all the correct information to make the copy as beneficial as possible. If you're looking for a copywriter who's detailed, gets the job done on time, and is willing to do whatever it takes — Lawrence is definitely your guy." },
    { name: "Yasir M.", title: "Founder, Lovoir — 7-figure Makeup Brand & #1 Amazon Best-Seller", quote: "I've been working with Lawrence over the last 6 months on Facebook ads, video scripts, and USPs for our 7-figure brand. Based on his work, I also asked him to help with our SaaS. He's very professional, of great help, and a great guy to work with. I would highly recommend Lawrence as a copywriter." },
    { name: "David N.", title: "Founder, Marketer, Wellness Coach & Optometrist", quote: "Reliable, honest, and a great listener. His gift with words effortlessly establishes immediate trust with readers. I can't thank him enough for creating amazing copy for my digital marketing agency's website. Look no further for a great content producer — and just as importantly, a 'top bloke' to work with." },
    { name: "Thore Hauthal", title: "Mentor & Co-Owner — 8-figure & 4X Two Comma Club Member (Justin Woll & Thore Hauthal)", quote: "Lawrence helped in multiple areas of copy. Through his deep understanding of market psychology, he improved our long-established sales copy and delivered emails focused on both conversion and brand awareness. He's a gifted writer, always brings his best effort, and goes beyond what's asked. I can only recommend Lawrence to anyone looking for an experienced writer." },
    { name: "Isak M.", title: "Founder & Email Marketer, ISAMO Consulting", quote: "Lawrence is the only one I hired early and decided to keep — because of his dedication and ability to work with a team. His email copywriting engages leads on a whole new level, and the subject lines are really killing it. If you're thinking about hiring Lawrence, stop thinking and just do it. You will not regret it." },
    { name: "\"Iggy\" O.", title: "Founder, Marketer & Fit Pro, Tri-Fit Training", quote: "Lawrence bangs out some pretty sweet copy I use for paid traffic and campaigns. I fill out the avatar, give him the angle, and he delivers fast. If you don't like writing and you value your time — he's the man to do it. He does a fantastic job. Check him out, he's definitely worth it." },
    { name: "Matt L.", title: "Serial Entrepreneur & Marketer — 9-figure/yr Earner (Matt Lloyd)", quote: "His approach from the start was unlike any other copywriter I've worked with over 15 years. He asked deep questions about the audience and what drove them. When I got the first draft back, I could see the difference it made. Lawrence wrote copy matched to what prospects wanted at a deep emotional level. With most copywriters you get cookie-cutter copy. With Lawrence, you get highly effective, on-target copy that actually works." },
    { name: "Chris C.", title: "Operations Manager & Co-founder, Seed Omega (SaaS Crowdfunding)", quote: "I appreciate the copies you've provided for my company write-up. Truly remarkable work and very professional content editing. Will definitely come back if I need any more editing or writing!" },
  ];

  return (
    <section id="testimonials" className="py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center">
          <span className="text-brand-purple font-black uppercase tracking-[0.4em] text-[30px] mb-6 block">The Proof</span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Market Validation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] p-16 rounded-[3rem] border border-white/5 flex flex-col hover:bg-white/[0.06] transition-all duration-700 group"
            >
              <Quote className="w-12 h-12 text-brand-purple mb-10 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-2xl text-gray-200 font-bold mb-16 flex-grow leading-tight italic">"{t.quote}"</p>
              <div>
                <div className="text-xl font-black uppercase tracking-tight text-white">{t.name}</div>
                <div className="text-[10px] text-brand-purple font-black uppercase tracking-[0.3em] mt-3">{t.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = () => (
  <section className="py-48 px-6 relative overflow-hidden">
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="hero-gradient-border p-20 md:p-32"
      >
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-16 uppercase italic text-white leading-[0.8]">
          Ready to<br />Dominate?
        </h2>
        <p className="text-2xl md:text-4xl text-gray-400 mb-20 font-bold uppercase tracking-tight max-w-2xl mx-auto">
          Ready to conquer your market?<br />Let's build your breakthrough.
        </p>
        <a
          href="mailto:hello@drivenlytics.com"
          className="inline-flex items-center gap-6 px-16 py-8 bg-white text-black font-black text-2xl uppercase tracking-widest rounded-full hover:bg-brand-purple hover:text-white transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]"
        >
          Schedule a call <MessageSquare className="w-10 h-10" />
        </a>
      </motion.div>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/10 blur-[200px] rounded-full -z-20" />
  </section>
);

export const Footer = () => (
  <footer className="py-32 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-24 mb-32">
        <div className="max-w-md">
          <Logo />
          <p className="text-gray-500 mt-10 text-xl font-medium leading-tight">
            Transmuting raw data and market intelligence into high-converting reality.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10">Navigation</h4>
            <ul className="space-y-6">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Home</a></li>
              <li><a href="#services" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Services</a></li>
              <li><a href="#process" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Process</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10">Legal</h4>
            <ul className="space-y-6">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Privacy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10">Connect</h4>
            <ul className="space-y-6">
              <li><a href="mailto:hello@drivenlytics.com" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Email</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-gray-700 text-[10px] font-black uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} Drivenlytics. All rights reserved.
        </div>
        <div className="text-gray-700 text-[10px] font-black uppercase tracking-[0.4em]">
          Built for breakthroughs
        </div>
      </div>
    </div>
  </footer>
);
