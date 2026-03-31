import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <p className="text-gray-400">{site.footer.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {site.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
