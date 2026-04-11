"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import { InlineWidget } from "react-calendly";
import { X, CheckCircle } from "lucide-react";

const SERVICE_ID = "service_0ydicdv";
const TEMPLATE_ID = "template_xcscf06";
const PUBLIC_KEY = "qx6-LgyMhM4sExSbS";
const CALENDLY_URL = "https://calendly.com/lawrence-drivenlytics/30min";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState<"form" | "calendly">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    website: "",
    industry: "",
    message: "",
    budget: "",
  });

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep("form");
      setError("");
      setForm({ from_name: "", from_email: "", phone: "", website: "", industry: "", message: "", budget: "" });
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...form, email: form.from_email }, PUBLIC_KEY);
      setStep("calendly");
    } catch {
      setError("Something went wrong. Please try again or email hello@drivenlytics.com");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-4 font-medium text-base focus:outline-none focus:border-brand-purple transition-colors duration-200";
  const labelClass = "block text-[12px] font-black uppercase tracking-[0.3em] text-white mb-3";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black border border-white/10"
            style={{ boxShadow: "0 0 80px rgba(139,92,246,0.2)" }}
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(to right, #8b5cf6, #d946ef, #8b5cf6)" }} />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 md:p-12"
                >
                  {/* Header */}
                  <div className="mb-12">
                    <span className="text-white font-black uppercase tracking-[0.4em] text-[13px] block mb-4">Looking Forward To A Chat With You. :)</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">Tell Me About<br />Your Business</h2>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Name *</label>
                        <input
                          type="text"
                          name="from_name"
                          value={form.from_name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          name="from_email"
                          value={form.from_email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 000 000 0000"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Website</label>
                        <input
                          type="text"
                          name="website"
                          value={form.website}
                          onChange={handleChange}
                          placeholder="yoursite.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Industry / Niche</label>
                      <input
                        type="text"
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        placeholder="e.g. SaaS, eCommerce, Coaching..."
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>What do you need help with? *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your goals, challenges, and what you're looking to achieve..."
                        required
                        rows={4}
                        className={inputClass + " resize-none"}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Service Tier</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={inputClass + " cursor-pointer"}
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="Launch Ready — $1,000">Launch Ready — $1,000</option>
                        <option value="Brand Foundation Kit — $3,000–$5,000">Brand Foundation Kit — $3,000–$5,000</option>
                        <option value="Content Retainer — $1,000/mo.">Content Retainer — $1,000/mo.</option>
                        <option value="Custom / Full-Stack — $5,000+/mo.">Custom / Full-Stack — $5,000+/mo.</option>
                      </select>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm font-medium">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-white text-black font-black text-base uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Submit"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="calendly"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 md:p-12"
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-brand-purple" />
                      <span className="text-brand-purple font-black uppercase tracking-[0.4em] text-[11px]">Details Received</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none mb-3">Now Book<br />Your Call</h2>
                    <p className="text-gray-400 font-medium text-sm">Pick a time that works for you. 30 minutes — no fluff, just strategy.</p>
                  </div>

                  <div className="border border-white/10 overflow-hidden" style={{ minHeight: "600px" }}>
                    <InlineWidget
                      url={CALENDLY_URL}
                      styles={{ height: "650px", width: "100%" }}
                      pageSettings={{
                        backgroundColor: "000000",
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: false,
                        primaryColor: "8b5cf6",
                        textColor: "ffffff",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
