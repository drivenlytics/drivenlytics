import Link from "next/link";

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-gray-500 text-lg font-medium mb-6">Coming soon.</p>
        <Link
          href="/"
          className="text-brand-purple font-black uppercase tracking-widest text-sm hover:text-white transition-colors"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
