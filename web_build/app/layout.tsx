import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,
  description: site.description,
  metadataBase: new URL('https://drivenlytics.com'),
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'; // Replace with your GTM container ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {GTM_ID !== 'GTM-XXXXXXX' && <GoogleTagManager gtmId={GTM_ID} />}
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
