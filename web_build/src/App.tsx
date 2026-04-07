import { useState } from "react";
import { Navbar, Hero, Services, Process, Niches, Testimonials, Contact, Footer } from "./components/Sections";
import { ContactModal } from "./components/ContactModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-purple selection:text-white">
      <Navbar onStart={() => setModalOpen(true)} />
      <main>
        <Hero onStart={() => setModalOpen(true)} />
        <Process />
        {/* <Niches /> */}
        <Services />
        <Testimonials />
        <Contact onStart={() => setModalOpen(true)} />
      </main>
      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
