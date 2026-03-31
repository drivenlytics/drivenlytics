import Link from 'next/link';
import { site } from '@/lib/site';

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          {site.name}
        </Link>
        <div className="flex gap-6">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
