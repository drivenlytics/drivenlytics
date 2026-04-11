import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founder | Drivenlytics",
  alternates: { canonical: "https://drivenlytics.com/founder" },
  robots: { index: false, follow: false },
};

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
