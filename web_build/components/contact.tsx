import { site } from '@/lib/site';

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          {site.cta.headline}
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          {site.cta.subheading}
        </p>
        <a
          href={`mailto:${site.contact.email}`}
          className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition text-lg"
        >
          {site.contact.cta}
        </a>
        <p className="text-gray-600 mt-6">
          Or email:{' '}
          <a
            href={`mailto:${site.contact.email}`}
            className="font-semibold text-gray-900 hover:underline"
          >
            {site.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
