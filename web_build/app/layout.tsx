import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../src/index.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drivenlytics | Data-Driven CRO & Performance Marketing",
  description:
    "Data-Driven Marketing | CRO | Full-Stack | Brand Building 0-1 | Helping entrepreneurs strengthen their brand, build trust, and increase conversions | START.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://drivenlytics.com" },
  openGraph: {
    title: "CRO | Data-Driven Performance Marketing Solutions",
    description:
      "Data-Driven Marketing | CRO | Full-Stack | Brand Building 0-1 | Helping entrepreneurs strengthen their brand, build trust, and increase conversions | START.",
    url: "https://drivenlytics.com",
    type: "website",
    images: [{ url: "https://drivenlytics.com/og-image.png" }],
    siteName: "Drivenlytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRO | Data-Driven Performance Marketing Solutions",
    description:
      "Data-Driven Marketing | CRO | Full-Stack | Brand Building 0-1 | Helping entrepreneurs strengthen their brand, build trust, and increase conversions | START.",
    images: ["https://drivenlytics.com/og-image.png"],
  },
  icons: { icon: "/logo.svg" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Drivenlytics",
    url: "https://drivenlytics.com",
    logo: "https://drivenlytics.com/logo.svg",
    sameAs: ["https://www.linkedin.com/in/drivenlytics/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lawrence",
    url: "https://drivenlytics.com",
    jobTitle: "Founder & Performance Marketing Strategist",
    worksFor: { "@type": "Organization", name: "Drivenlytics" },
    sameAs: ["https://www.linkedin.com/in/drivenlytics/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Launch Ready",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "Custom landing page, sales copy, lead form, and 5-email drip sequence. Delivered in 7 business days.",
    offers: { "@type": "Offer", price: "1000", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Foundation Kit",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "Full strategic positioning package: ICP, value proposition, competitive analysis, brand voice, visual identity, and core messaging.",
    offers: { "@type": "Offer", price: "3000", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Content Retainer",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "4 SEO blog posts per month with images, on-page SEO, and schema markup. Built for pillar-cluster content systems.",
    offers: { "@type": "Offer", price: "1000", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom / Full-Stack Marketing",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "Full-site builds, funnels, brand design, email infrastructure, ads, SEO programs, and AI/automation workflows.",
    offers: { "@type": "Offer", price: "5000", priceCurrency: "USD" },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P66DTGMW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P66DTGMW');`,
          }}
        />
      </body>
    </html>
  );
}
