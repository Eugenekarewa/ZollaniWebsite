import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const Analytics = () => null;
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";

import { getSiteUrl, LEGAL_NAME, SITE_NAME, BUSINESS_PHONE, CORPORATE_EMAIL, NAIROBI_AREAS } from "@/lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  other: {
    "facebook-domain-verification": "04qwy5cbcpjvbb5202zxxwoh8w9q1o",
  },
  title: {
    default: "Zollani Tech | Computer Repair & IT Services in Nairobi, Kenya",
    template: "%s | Zollani Tech",
  },
  description:
    "Nairobi's trusted lab for same-day laptop repair, board-level micro-soldering, data recovery, Ex-UK Grade A laptops, business IT support, and tech training.",
  keywords: [
    "computer repair Kenya",
    "laptop repair Nairobi",
    "electronics repair Kenya",
    "screen replacement Nairobi",
    "motherboard micro-soldering Nairobi",
    "data recovery Kenya",
    "IT support Kenya",
    "network installation Nairobi",
    "cybersecurity services Kenya",
    "managed IT services Nairobi",
    "ex-uk laptops Nairobi",
  ],
  authors: [{ name: LEGAL_NAME }],
  creator: LEGAL_NAME,
  publisher: LEGAL_NAME,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Zollani Tech | Computer Repair & IT Services in Nairobi, Kenya",
    description:
      "Same-day laptop repairs, motherboard micro-soldering, bench-tested Ex-UK computers, managed business IT, and technical training in Nairobi.",
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/hero-datacenter.jpg`,
        width: 1200,
        height: 630,
        alt: "Zollani Tech computer repair lab and IT engineering in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zollani Tech | Computer Repair & IT Services in Nairobi, Kenya",
    description:
      "Same-day laptop repairs, motherboard micro-soldering, tested Ex-UK computers, managed business IT, and tech training in Nairobi.",
    images: [`${siteUrl}/images/hero-datacenter.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ComputerStore"],
        "@id": `${siteUrl}/#organization`,
        name: LEGAL_NAME,
        alternateName: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/images/logo-badge.png`,
        image: [
          `${siteUrl}/images/hero-datacenter.jpg`,
          `${siteUrl}/images/hardware-motherboard.jpg`,
          `${siteUrl}/images/pc-repair-workbench.jpg`,
        ],
        telephone: BUSINESS_PHONE,
        email: CORPORATE_EMAIL,
        priceRange: "KES 500 - KES 150,000",
        currenciesAccepted: "KES",
        paymentAccepted: "Cash, M-Pesa (Paybill 714888, Account 480939), Bank Transfer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressRegion: "Nairobi County",
          addressCountry: "KE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -1.2921,
          longitude: 36.8219,
        },
        areaServed: NAIROBI_AREAS.map((area) => ({
          "@type": area === "Kenya" ? "Country" : "Place",
          name: area,
        })),
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
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: BUSINESS_PHONE,
            contactType: "customer service",
            areaServed: "KE",
            availableLanguage: ["English", "Swahili"],
          },
          {
            "@type": "ContactPoint",
            email: CORPORATE_EMAIL,
            contactType: "sales",
            areaServed: "KE",
          },
        ],
        knowsAbout: [
          "Laptop and Computer Repair",
          "Motherboard Micro-Soldering",
          "MacBook Logic Board Repair",
          "PS5 and Xbox HDMI Port Repair",
          "Hard Drive and SSD Data Recovery",
          "Ex-UK Grade A Laptop Sales",
          "Custom Gaming and Workstation PC Builds",
          "Managed Business IT Support (SLA)",
          "Structured Cat6 Networking and UniFi WiFi",
          "Cybersecurity Hardening and Staff Training",
          "AI Msingi Youth Technology Education",
        ],
        description:
          "Professional computer and electronics repair, motherboard micro-soldering diagnostics, data recovery, Ex-UK Grade A laptop sales, managed business IT support, and technical training in Nairobi, Kenya.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-KE",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-badge.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="linkedin-insight-tag" strategy="lazyOnload">
          {`_linkedin_partner_id = "11091649";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
  if (!l) {
    window.lintrk = function(a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = [];
  }
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);
})(window.lintrk);`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=11091649&fmt=gif"
          />
        </noscript>
      </head>
      <body
        className="flex flex-col min-h-screen bg-cream-bg text-brand-dark antialiased"
        suppressHydrationWarning
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
