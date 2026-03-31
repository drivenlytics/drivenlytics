import { useState } from 'react';

export default function DiscoveryForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    northStar: '',
    integrations: '',
    sourceOfTruth: '',
    deliveryPayload: '',
    behavioralRules: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          clientName: '',
          clientEmail: '',
          northStar: '',
          integrations: '',
          sourceOfTruth: '',
          deliveryPayload: '',
          behavioralRules: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting discovery form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2">Project Discovery</h2>
      <p className="text-gray-600 mb-8">Answer these 5 questions so we build exactly what you need.</p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          ✓ Discovery responses saved. We'll review and follow up within 24 hours.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Question 1: North Star */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            1. North Star — What is the single most important outcome for this site?
          </label>
          <p className="text-xs text-gray-500 mb-2">The ONE thing that matters most. Everything else is secondary.</p>
          <textarea
            name="northStar"
            value={formData.northStar}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Generate qualified leads for sales calls"
          />
        </div>

        {/* Question 2: Integrations */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            2. Integrations — Which external services are needed? Are credentials ready?
          </label>
          <p className="text-xs text-gray-500 mb-2">e.g., Vercel, GitHub, CMS, email, payment processors, Zapier</p>
          <textarea
            name="integrations"
            value={formData.integrations}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="List integrations and credential status"
          />
        </div>

        {/* Question 3: Source of Truth */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            3. Source of Truth — Where does the site's content live?
          </label>
          <p className="text-xs text-gray-500 mb-2">e.g., WordPress, markdown files, hardcoded, Airtable, API</p>
          <textarea
            name="sourceOfTruth"
            value={formData.sourceOfTruth}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Where does content live and who updates it?"
          />
        </div>

        {/* Question 4: Delivery Payload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            4. Delivery Payload — What does 'done' look like? Where does it live?
          </label>
          <p className="text-xs text-gray-500 mb-2">e.g., Custom domain, Vercel, WordPress. When should it launch?</p>
          <textarea
            name="deliveryPayload"
            value={formData.deliveryPayload}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Hosting, domain, timeline, success criteria"
          />
        </div>

        {/* Question 5: Behavioral Rules */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            5. Behavioral Rules — How should the site behave?
          </label>
          <p className="text-xs text-gray-500 mb-2">Tone, animation style, performance targets, things to avoid</p>
          <textarea
            name="behavioralRules"
            value={formData.behavioralRules}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brand voice, design preferences, accessibility needs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? 'Saving...' : 'Submit Discovery Responses'}
        </button>
      </form>
    </div>
  );
}
