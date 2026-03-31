import { site } from '@/lib/site';

export function Process() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {site.process.map((step, index) => (
            <div key={step.phase} className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">
                  {step.phase}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">{step.description}</p>
              <ul className="space-y-2">
                {step.items.map((item) => (
                  <li key={item} className="text-gray-700 flex items-start">
                    <span className="mr-3 text-gray-400">✓</span>
                    {item}
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
