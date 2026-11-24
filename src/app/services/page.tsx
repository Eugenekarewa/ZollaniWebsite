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

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Electronics Repair & IT Support Services in Nairobi | Zollani Tech",
    description:
      "Laptop and computer repair, MacBook services, PS5 and Xbox HDMI repair, data recovery, and business IT support in Nairobi. Ask us about phone and tablet repair availability.",
    path: "/services",
    ogImage: "/images/hardware-motherboard.jpg",
    keywords: [
      "electronics repair Nairobi",
      "IT support services Nairobi",
      "computer repair Nairobi",
      "laptop repair Nairobi",
      "MacBook repair Nairobi",
      "phone repair Nairobi",
      "tablet repair Nairobi",
      "gaming console repair Nairobi",
      "PS5 HDMI port repair Nairobi",
      "screen replacement Nairobi",
      "data recovery Nairobi",
      "business IT support Nairobi",
    ],
  }),
  title: {
    absolute: "Electronics Repair & IT Support Services in Nairobi | Zollani Tech",
  },
};

const SERVICES_FAQS: FaqItem[] = [
  {
    question: "How long does laptop screen or battery replacement take in Nairobi?",
    answer:
      "Most laptop battery replacements take 30 to 60 minutes, and standard IPS/FHD screen replacements for HP, Dell, Lenovo, and MacBook models are completed within 2 to 4 hours the same day.",
  },
  {
    question: "What happens if my laptop or motherboard cannot be repaired?",
    answer:
      "For standard diagnostics, our No Fix, No Fee policy means you do not pay a repair fee if we cannot fix the device. Diagnostic eligibility and any applicable charges are confirmed before work begins.",
  },
  {
    question: "Can you recover data from a clicking or unallocated external hard drive?",
    answer:
      "Yes. Our data recovery bench handles dropped or clicking hard drives, RAW/unallocated partitions, accidentally formatted flash disks, and failing SSDs in 3 to 72 hours depending on drive health.",
  },
  {
    question: "Do you repair gaming consoles and charging ports?",
    answer:
      "Yes. We perform micro-soldering for PlayStation 5 and Xbox HDMI ports, typically in 2–4 hours, and repair USB-C/Thunderbolt charging ports. Contact us with your model and symptoms for a quote.",
  },
  {
    question: "Do you repair smartphones and tablets?",
    answer:
      "Dedicated smartphone and tablet repairs are not currently listed in our service catalog. Contact us with your device model and issue to confirm whether we can help.",
  },
  {
    question: "Which repairs include a written warranty?",
    answer:
      "Eligible hardware repairs can include up to a 6-month written warranty. Coverage depends on the repair and is confirmed in your quote and warranty documentation.",
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
        name: "Electronics Repair & IT Support Services in Nairobi",
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
        subtitle="Turnaround times, console HDMI repair, data recovery, phone repair availability, and warranty terms."
        faqs={SERVICES_FAQS}
        surface="white"
      />
    </>
  );
}
