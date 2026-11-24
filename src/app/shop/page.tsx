import ShopCatalog from "@/components/shop/ShopCatalog";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection, type FaqItem } from "@/components/seo/FaqSection";
import { getAuthoritativeCatalog } from "@/lib/commerce-store";
import { getProductImageUrl } from "@/lib/product-images";
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFaqSchema,
  getOrganizationRef,
  getSiteUrl,
} from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Computer Accessories, Laptops & Custom PCs Shop Nairobi",
  description:
    "Shop Ex-UK Grade A laptops, custom RTX gaming PCs, NVMe SSDs, RAM, mice, keyboards, USB-C hubs, monitors, routers, UPS backups, and webcams in Nairobi with instant website checkout and printable receipts.",
  path: "/shop",
  ogImage: "/images/hero-datacenter.jpg",
  keywords: [
    "computer accessories Nairobi",
    "laptop shop Kenya",
    "ex-uk grade a laptops Nairobi",
    "custom PC Nairobi",
    "NVMe SSD RAM Nairobi",
    "wireless mouse keyboard Kenya",
    "UPS surge protector Nairobi",
    "monitors Nairobi",
  ],
});

const SHOP_FAQS: FaqItem[] = [
  {
    question: "Can I pay directly on the Zollani Tech website and print my receipt?",
    answer:
      "Yes. Add any laptops or computer accessories to your cart and complete payment online at checkout via M-Pesa Express/Paybill, Visa/Mastercard, Bank Transfer, or Cash on Delivery. An official printable receipt with your Order ID and VAT breakdown is generated immediately.",
  },
  {
    question: "What does Ex-UK Grade A mean at Zollani Tech?",
    answer:
      "Ex-UK Grade A units are clean corporate laptops that pass our 24-point hardware, battery, display, and thermal bench check, receive licensed Windows 11 Pro, and include an original charger and a 6-month written warranty.",
  },
  {
    question: "Do you sell genuine computer accessories and same-day Nairobi delivery?",
    answer:
      "Yes. We stock keyboards, ergonomic mice, USB-C GaN chargers, NVMe SSDs, DDR4/DDR5 RAM, IPS monitors, Wi-Fi 6 routers, UPS units, headsets, webcams, laptop stands, and cooling pads with same-day Nairobi dispatch (KES 500) or free shop pickup.",
  },
];

export default async function ShopPage() {
  const catalogProducts = await getAuthoritativeCatalog();

  const siteUrl = getSiteUrl();
  const shopJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
      ]),
      {
        "@type": "CollectionPage",
        name: "Zollani Tech Computers & Accessories Superstore",
        url: `${siteUrl}/shop`,
        description:
          "Bench-tested Ex-UK Grade A laptops, custom gaming PCs, monitors, networking, UPS units, storage upgrades, and all computer accessories in Nairobi.",
      },
      {
        "@type": "ItemList",
        name: "Available Computers and Accessories in Nairobi",
        itemListElement: catalogProducts.map((product, index) => {
          const image = getProductImageUrl(product.image);
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.name,
              description: product.description,
              category: product.category,
              ...(image
                ? {
                    image: image.startsWith("http")
                      ? image
                      : `${siteUrl}${image}`,
                  }
                : {}),
              itemCondition:
                product.condition === "Brand New Custom Build" || product.condition === "Brand New"
                  ? "https://schema.org/NewCondition"
                  : "https://schema.org/RefurbishedCondition",
              offers: {
                "@type": "Offer",
                priceCurrency: "KES",
                price: product.priceKes,
                availability: "https://schema.org/InStock",
                seller: getOrganizationRef(),
              },
            },
          };
        }),
      },
      getFaqSchema(SHOP_FAQS),
    ],
  };

  return (
    <>
      <JsonLd data={shopJsonLd} />
      <ShopCatalog products={catalogProducts} />
      <FaqSection
        kicker="Buying Guide"
        title="Computer Accessories, Online Payments & Warranty FAQs"
        subtitle="Everything you need to know about ordering hardware online, printable receipts, warranties, and Nairobi delivery."
        faqs={SHOP_FAQS}
        surface="white"
      />
    </>
  );
}
