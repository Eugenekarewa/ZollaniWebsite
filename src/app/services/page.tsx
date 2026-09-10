import ServicesPageClient from "./ServicesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computer & Electronics Repair Services in Nairobi",
  description:
    "Find laptop repair, screen replacement, motherboard repair, data recovery, phone repair, networking, cybersecurity, and IT support services in Nairobi.",
  keywords: [
    "computer repair Nairobi",
    "laptop repair",
    "screen replacement",
    "motherboard repair",
    "data recovery Nairobi",
    "electronics repair Kenya",
  ],
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
