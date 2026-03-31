import { site } from '@/lib/site';

export function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
          Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {site.services.map((service) => (
            <div
              key={service.title}
              className="border border-gray-300 rounded-lg p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {service.price}
              </p>
              <p className="text-gray-600 text-sm mb-4">{service.period}</p>
              <p className="text-gray-700 mb-6">{service.description}</p>
              <p className="text-sm text-gray-500 mb-6">
                Timeline: <span className="font-semibold">{service.timeline}</span>
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-gray-700 flex items-start">
                    <span className="mr-3 text-gray-400">▪</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
