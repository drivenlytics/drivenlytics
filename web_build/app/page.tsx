import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Process } from '@/components/process';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
