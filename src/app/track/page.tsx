import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TrackAndPickupClient } from "@/components/track/TrackAndPickupClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection, type FaqItem } from "@/components/seo/FaqSection";
import { createPageMetadata, getBreadcrumbSchema, getFaqSchema, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Track Order, Track Repair & Book Device Pickup Nairobi",
  description:
    "Track your Zollani Tech computer order, print your receipt, check live laptop repair progress, or call +254 768 551914 to schedule Nairobi rider pickup.",
  path: "/track",
  ogImage: "/images/pc-repair-workbench.jpg",
  keywords: [
    "track laptop repair Nairobi",
    "Zollani Tech order tracking",
    "computer repair pickup Nairobi",
    "laptop pickup service Kenya",
    "print computer receipt Nairobi",
  ],
});

const TRACK_FAQS: FaqItem[] = [
  {
    question: "How do I track my hardware order or reprint my receipt?",
    answer:
      "Enter your Order ID (such as ZT-ORD-1042), Receipt Number, or the phone number used at checkout on this page. You can view live delivery progress and click Print Receipt at any time.",
  },
  {
    question: "How does Nairobi device pickup for repairs work?",
    answer:
      "Submit the Schedule Device Pickup form on this page or call +254 768 551914. Our coordinator assigns a vetted rider to collect your device, issues your live Repair Ticket ID (ZT-XXXX), and shares a written quote after free bench diagnostics before repairs begin.",
  },
  {
    question: "What areas in Nairobi qualify for rider pickup and hardware delivery?",
    answer:
      "We cover Nairobi CBD, Westlands, Kilimani, Kileleshwa, Lavington, Upper Hill, Karen, South B, South C, Langata, Industrial Area, Mombasa Road, and Thika Road.",
  },
];

export default function TrackPage() {
  const siteUrl = getSiteUrl();
  const trackJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Track & Pickup", path: "/track" },
      ]),
      {
        "@type": "WebPage",
        name: "Track Product Order, Track Repair & Book Device Pickup",
        url: `${siteUrl}/track`,
        description:
          "Unified tracking portal for Zollani Tech computer accessory orders, printable receipts, repair bench status, and Nairobi rider pickups.",
      },
      getFaqSchema(TRACK_FAQS),
    ],
  };

  return (
    <div className="bg-cream-bg min-h-screen">
      <JsonLd data={trackJsonLd} />
      <PageHero
        eyebrow="Live Order & Repair Portal"
        title="Track Orders, Repairs & Book Nairobi Device Pickup."
        description="Check real-time dispatch status for hardware purchases, reprint official receipts, follow bench repair milestones, or call in a rider to collect your faulty computer anywhere in Nairobi."
        image="/images/pc-repair-workbench.jpg"
        imageAlt="Zollani Tech repair tracking and Nairobi device pickup"
        action={{ label: "Call Dispatch: +254 768 551914", href: "tel:+254768551914" }}
        secondaryAction={{ label: "Browse Shop", href: "/shop" }}
      />
      <TrackAndPickupClient />
      <FaqSection
        kicker="Tracking & Logistics"
        title="Order Tracking, Receipts & Pickup FAQs"
        subtitle="Quick answers on how order tracking, rider collection, and repair updates work."
        faqs={TRACK_FAQS}
        surface="white"
      />
    </div>
  );
}
