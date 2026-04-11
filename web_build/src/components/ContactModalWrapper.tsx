"use client";

import { useState } from "react";
import {
  Navbar,
  Hero,
  Services,
  Process,
  Testimonials,
  Contact,
  Footer,
} from "./Sections";
import { ContactModal } from "./ContactModal";

export function ContactModalWrapper() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-purple selection:text-white">
      <Navbar onStart={() => setModalOpen(true)} />
      <main>
        <Hero onStart={() => setModalOpen(true)} />
        <Process />
        <Services />
        <Testimonials />
        <Contact onStart={() => setModalOpen(true)} />
      </main>
      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
