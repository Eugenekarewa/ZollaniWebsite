import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const siteUrl = "https://zollani.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zollani Tech | Computer Repair & IT Services in Kenya",
    template: "%s | Zollani Tech",
  },
  description:
    "Trusted laptop and computer repair, electronics repair, data recovery, networking, cybersecurity, managed IT, and technical training in Nairobi and across Kenya.",
  keywords: [
    "computer repair Kenya",
    "laptop repair Nairobi",
    "electronics repair Kenya",
    "screen replacement Nairobi",
    "data recovery Kenya",
    "IT support Kenya",
    "network installation Nairobi",
    "cybersecurity services Kenya",
    "managed IT services",
    "computer repair near me",
  ],
  authors: [{ name: "Zollani Tech Limited" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Zollani Tech | Computer Repair & IT Services in Kenya",
    description:
      "Reliable computer repairs, electronics services, business IT support, and practical tech training from Nairobi, Kenya.",
    url: siteUrl,
    siteName: "Zollani Tech",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zollani Tech | Computer Repair & IT Services in Kenya",
    description:
      "Reliable computer repairs, electronics services, business IT support, and practical tech training in Kenya.",
  },
  robots: { index: true, follow: true },
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
    image: "https://zollani.co.ke/images/logo-badge.png",
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
    url: "https://zollani.co.ke",
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
