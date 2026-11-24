import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection, type FaqItem } from "@/components/seo/FaqSection";
import { SERVICE_CATEGORIES } from "@/data/servicesData";
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFaqSchema,
  getOrganizationRef,
  getSiteUrl,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Laptop Repair & Electronics Diagnostics Nairobi",
  description:
    "Same-day screen replacement, motherboard micro-soldering, PS5 HDMI repairs, data recovery, and IT support in Nairobi with a 6-month warranty.",
  path: "/services",
  ogImage: "/images/hardware-motherboard.jpg",
  keywords: [
    "computer repair Nairobi",
    "laptop repair Nairobi",
    "screen replacement Nairobi",
    "motherboard micro-soldering Kenya",
    "data recovery Nairobi",
    "electronics repair Nairobi",
    "PS5 HDMI repair Nairobi",
    "MacBook repair Kenya",
  ],
});

const SERVICES_FAQS: FaqItem[] = [
  {
    question: "How long does laptop screen or battery replacement take in Nairobi?",
    answer:
      "Most laptop battery replacements take 30 to 60 minutes, and standard IPS/FHD screen replacements for HP, Dell, Lenovo, and MacBook models are completed within 2 to 4 hours the same day.",
  },
  {
    question: "What happens if my laptop or motherboard cannot be repaired?",
    answer:
      "We follow a strict No Fix, No Fee policy for standard diagnostics. We evaluate the board first and give you a firm quote before any repair begins—if we cannot restore it, you do not pay the repair fee.",
  },
  {
    question: "Can you recover data from a clicking or unallocated external hard drive?",
    answer:
      "Yes. Our data recovery bench handles dropped or clicking hard drives, RAW/unallocated partitions, accidentally formatted flash disks, and failing SSDs in 3 to 72 hours depending on drive health.",
  },
  {
    question: "Do you repair gaming consoles, Smart TVs, and charging ports?",
    answer:
      "Yes. Beyond laptops and desktops, we perform micro-soldering for PlayStation 5 and Xbox HDMI ports (2–4 hours), USB-C/Thunderbolt charging ports, and Smart TV backlight or power board repairs.",
  },
];

export default function ServicesPage() {
  const siteUrl = getSiteUrl();

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      {
        "@type": "Service",
        name: "Computer Repair, Motherboard Micro-Soldering & Electronics Lab",
        provider: getOrganizationRef(),
        areaServed: { "@type": "City", name: "Nairobi" },
        url: `${siteUrl}/services`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Zollani Tech Repair & IT Services Catalog",
          itemListElement: SERVICE_CATEGORIES.map((category) => ({
            "@type": "OfferCatalog",
            name: category.title,
            description: category.description,
            itemListElement: category.items.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item.name,
                description: item.fullDesc,
              },
            })),
          })),
        },
      },
      getFaqSchema(SERVICES_FAQS),
    ],
  };

  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <ServicesPageClient />
      <FaqSection
        kicker="Repair & Lab FAQs"
        title="Questions About Our Repair Lab"
        subtitle="Turnaround times, component-level motherboard repairs, data recovery, and warranty terms."
        faqs={SERVICES_FAQS}
        surface="white"
      />
    </>
  );
}
