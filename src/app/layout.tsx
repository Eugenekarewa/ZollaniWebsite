import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Zollani Tech | IT Repair, Business Support & Training — Nairobi, Kenya",
  description:
    "Professional electronics repair, motherboard micro-soldering, data recovery, business IT support contracts, and youth tech training in Nairobi. We Fix. You Smile.",
  keywords: [
    "laptop repair Nairobi",
    "MacBook repair Nairobi",
    "motherboard repair Kenya",
    "data recovery Nairobi",
    "IT support for small business Kenya",
    "computer repair Westlands Kilimani",
    "Zollani Tech Limited",
    "screen replacement Nairobi",
    "refurbished laptops Nairobi",
    "AI Msingi training Kenya",
  ],
  authors: [{ name: "Zollani Tech Limited" }],
  openGraph: {
    title: "Zollani Tech | Professional IT Repair & Business Support Nairobi",
    description:
      "Expert chip-level electronics repair, managed business IT support, and youth empowerment training in Nairobi. Fast turnaround, quality parts.",
    url: "https://zollanitech.co.ke",
    siteName: "Zollani Tech",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Zollani Tech Limited",
    image: "https://zollanitech.co.ke/images/logo-badge.png",
    telephone: "+254768551914",
    email: "info@zollanitech.co.ke",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2921,
      longitude: 36.8219,
    },
    url: "https://zollanitech.co.ke",
    priceRange: "KES 500 - 50,000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    description:
      "Professional electronics repair, motherboard diagnostics, data recovery, enterprise IT support, and youth empowerment training in Nairobi, Kenya.",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo-badge.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-cream-bg text-brand-dark antialiased">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
