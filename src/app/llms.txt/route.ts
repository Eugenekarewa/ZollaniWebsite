import { PRODUCTS } from "@/data/productsData";
import { SERVICE_CATEGORIES } from "@/data/servicesData";
import {
  BUSINESS_PHONE,
  CORPORATE_EMAIL,
  FOUNDER_EMAIL,
  LEGAL_NAME,
  NAIROBI_AREAS,
  PAYBILL_ACCOUNT,
  PAYBILL_NUMBER,
  SITE_NAME,
  WHATSAPP_URL,
  getSiteUrl,
} from "@/lib/seo";

export async function GET() {
  const siteUrl = getSiteUrl();

  const content = `# ${SITE_NAME} (${LEGAL_NAME})

> Nairobi's precision electronics repair lab, board-level micro-soldering workshop, certified Ex-UK Grade A computer store, managed business IT partner, and practical tech training provider in Kenya.

## Key Facts
- **Legal Name**: ${LEGAL_NAME}
- **Location & Coverage**: Nairobi, Kenya (${NAIROBI_AREAS.join(", ")})
- **Business Hours**: Monday–Saturday 8:00 AM – 7:00 PM EAT; Sunday on-call for business server emergencies
- **Phone / WhatsApp**: ${BUSINESS_PHONE} (${WHATSAPP_URL})
- **Corporate Email**: ${CORPORATE_EMAIL}
- **Founder & Direct Email**: Eugene Otieno Karewa (${FOUNDER_EMAIL})
- **Official M-Pesa Paybill**: ${PAYBILL_NUMBER} · Account Number: ${PAYBILL_ACCOUNT} (${LEGAL_NAME})
- **Repair Policies**: Free quick diagnostics, upfront written quote before work begins, No Fix No Fee policy, up to 6-month written warranty on repairs and Grade A laptops, 1-year warranty on new custom PC builds.

## Main Pages
- [Home](${siteUrl}/): Precision computer repairs, instant repair cost estimator, featured Ex-UK laptops & custom PCs, client reviews, and lab capabilities.
- [Repair & Electronics Services](${siteUrl}/services): Searchable directory of ${SERVICE_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)} repair, micro-soldering, data recovery, networking, and on-site IT services grouped into customer-facing device and service categories.
- [Computer & Accessories Shop](${siteUrl}/shop): Full computer store stocking Ex-UK Grade A laptops, custom RTX gaming towers, CAD workstations, NVMe SSDs, RAM, mice, keyboards, USB-C hubs/chargers, monitors, routers, UPS units, webcams, headsets, and laptop stands with direct website payment (M-Pesa, Card, Bank, Cash) and instant printable VAT-inclusive receipts.
- [Track Orders, Repairs & Device Pickup](${siteUrl}/track): Live tracking portal for hardware orders, receipt reprints, repair ticket milestones, online rider pickup scheduling, and call-in pickup dispatch (+254 768 551914).
- [Business IT Support](${siteUrl}/business-it): Managed IT SLA retainers (Starter SME 5–15 seats, Professional Growth 15–35 seats, Enterprise 35+ seats), Cat6 cabling, MikroTik/UniFi networking, 3-2-1 backups, and cybersecurity hardening.
- [Technology & AI Training](${siteUrl}/training): AI Msingi (10-week CBC-aligned youth curriculum for ages 9–18), zero-cost College & TVET partnerships, corporate cybersecurity awareness, and Linux systems administration.
- [About Zollani Tech](${siteUrl}/about): Company story, mission ("Repair, Don't Replace"), leadership credentials (BSc Applied Science in Physics, Cisco Certified Ethical Hacker, ISACA CSX Fundamentals), and official payment channels.
- [Careers](${siteUrl}/careers): Open positions, technician apprenticeships, and IT internships in Nairobi.
- [Contact & Quote Request](${siteUrl}/contact): Drop-off workshop details, on-site dispatch, WhatsApp fast response, 30-minute consultation booking, and bulk corporate supply.

## Indicative Repair Price Brackets (KES)
- Laptop screen replacement: KES 4,500 – 12,000 (2–4 hours)
- Motherboard / liquid spill micro-soldering: KES 3,500 – 9,500 (24–48 hours)
- Laptop battery replacement: KES 2,500 – 6,500 (30–60 minutes)
- Hinge & split casing structural rebuild: KES 2,000 – 4,500 (4–8 hours)
- SSD + RAM speed upgrade bundle: KES 3,500 – 8,000 (1–2 hours)
- Overheating & thermal repaste service: KES 1,500 – 3,000 (1–2 hours)
- PS5 / Xbox HDMI port micro-soldering: KES 3,500 – 6,500 (2–4 hours)
- Hard drive / SSD data recovery: KES 2,500 – 18,000 (3–72 hours)

## Featured Hardware Stock
${PRODUCTS.map(
  (p) =>
    `- **${p.name}** (${p.condition}, ${p.warranty}): KES ${p.priceKes.toLocaleString()} — ${p.description}`
).join("\n")}

## Full Catalog Reference
- [Complete Services & Catalog Markdown](${siteUrl}/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
