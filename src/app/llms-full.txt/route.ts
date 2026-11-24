import { PRODUCTS } from "@/data/productsData";
import { SERVICE_CATEGORIES, TRUST_BRANDS } from "@/data/servicesData";
import { TESTIMONIALS } from "@/data/testimonialsData";
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

  const servicesSection = SERVICE_CATEGORIES.map((cat) => {
    const items = cat.items
      .map(
        (item) =>
          `### ${item.name}\n- **Turnaround**: ${item.turnaround}\n- **Summary**: ${item.shortDesc}\n- **Details**: ${item.fullDesc}\n- **Common Symptoms**: ${item.typicalIssues.join(", ")}`
      )
      .join("\n\n");
    return `## ${cat.title}\n_${cat.tagline}_\n\n${cat.description}\n\n${items}`;
  }).join("\n\n---\n\n");

  const productsSection = PRODUCTS.map(
    (p) =>
      `### ${p.name}\n- **Price**: KES ${p.priceKes.toLocaleString()}\n- **Condition**: ${p.condition}\n- **Warranty**: ${p.warranty}\n- **Category**: ${p.category}\n- **Description**: ${p.description}\n- **Specs**: ${p.specs.join(" | ")}`
  ).join("\n\n");

  const reviewsSection = TESTIMONIALS.map(
    (t) => `- **${t.name}** (${t.role}, ${t.companyOrLocation}) [${t.rating}/5]: "${t.quote}"`
  ).join("\n");

  const content = `# ${SITE_NAME} (${LEGAL_NAME}) — Complete Knowledge Base

Website: ${siteUrl}
Phone / WhatsApp: ${BUSINESS_PHONE} (${WHATSAPP_URL})
Corporate Email: ${CORPORATE_EMAIL}
Founder Email: ${FOUNDER_EMAIL}
Service Areas: ${NAIROBI_AREAS.join(", ")}
Hours: Monday–Saturday 8:00 AM – 7:00 PM EAT (Sunday on-call for emergencies)
M-Pesa Paybill: ${PAYBILL_NUMBER} | Account: ${PAYBILL_ACCOUNT}

---

# Complete Repair & IT Services Catalog

${servicesSection}

---

# Certified Hardware & Computers for Sale

${productsSection}

---

# Business IT SLA Retainer Tiers
1. **Starter SME Retainer** (5–15 workstations): 4-hour on-site SLA, unlimited remote helpdesk, weekly cloud backups, quarterly dustout, antivirus/firewall monitoring, router & office WiFi maintenance.
2. **Professional Growth** (15–35 workstations): 2-hour emergency SLA, bi-weekly on-site engineer visit, daily 3-2-1 hybrid backup validation, Cat6 cabling & rack maintenance, dedicated account engineer & direct WhatsApp line, printer fleet maintenance, quarterly IT infrastructure audit.
3. **Enterprise Dedicated** (35+ workstations & servers): 1-hour priority dispatch, resident or scheduled on-site engineer, server virtualization & Active Directory, cybersecurity compliance & phishing audits, loaner hardware during repairs, ISP & software vendor management.

---

# Training & Youth Empowerment Programs
1. **AI Msingi (Ages 9–18)**: 10-week CBC-aligned AI and digital literacy curriculum with Kenyan context (Explorers 9–11, Navigators 12–14, Builders 15–18).
2. **College & TVET Partnership Track**: Zero-cost institutional delivery covering practical electronics repair, software engineering foundations, and financial/digital literacy.
3. **Corporate Cybersecurity Staff Training**: Led by Cisco Certified Ethical Hacker & ISACA CSX certified trainers covering phishing drills, credential security/MFA, and ransomware containment.
4. **Linux & Practical Systems Administration**: Bash CLI, SSH/DNS/systemd, and defensive hardening (IPTables, fail2ban, key-only SSH).

---

# Certifications & Ecosystem
${TRUST_BRANDS.map((b) => `- ${b.name}: ${b.label}`).join("\n")}

---

# Client Reviews
${reviewsSection}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
