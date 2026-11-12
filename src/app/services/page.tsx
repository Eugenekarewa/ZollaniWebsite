import ServicesPageClient from "./ServicesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precision Computer Repairs & Electronics Diagnostics in Nairobi | Zollani Tech",
  description:
    "Same-day laptop repair, cracked screen replacement in 2–4 hours, motherboard micro-soldering, gaming console HDMI repairs, and hard drive data recovery in Nairobi with a 6-month warranty.",
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
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
