import { Navbar, Hero, Services, Process, Niches, Testimonials, Contact, Footer } from "./components/Sections";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-purple selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Niches />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
