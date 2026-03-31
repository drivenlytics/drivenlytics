import { site } from '@/lib/site';

export function Hero() {
  return (
    <section id="hero" data-section="hero" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {site.hero.headline}
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {site.hero.subheading}
        </p>
        <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition text-lg">
          {site.hero.cta}
        </button>
      </div>
    </section>
  );
}
