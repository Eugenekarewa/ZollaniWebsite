import type { Metadata } from "next";

export const SITE_NAME = "Zollani Tech";
export const LEGAL_NAME = "Zollani Tech Limited";
export const DEFAULT_SITE_URL = "https://zollani.co.ke";
export const BUSINESS_PHONE = "+254768551914";
export const CORPORATE_EMAIL = "info@zollanitech.co.ke";
export const FOUNDER_EMAIL = "eugene.karewa@zollani.co.ke";
export const WHATSAPP_URL = "https://wa.me/254768551914";
export const PAYBILL_NUMBER = "714888";
export const PAYBILL_ACCOUNT = "480939";

export const NAIROBI_AREAS = [
  "Nairobi",
  "Westlands",
  "Kilimani",
  "Kileleshwa",
  "Nairobi CBD",
  "Upper Hill",
  "Karen",
  "Parklands",
  "Thika Road",
  "Kenya",
];

export function getSiteUrl(): string {
  const envUrl = process.env.APP_URL?.trim();
  if (envUrl && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/+$/, "");
  }
  return DEFAULT_SITE_URL;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = "/images/hero-datacenter.jpg",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${normalizedPath || "/"}`;
  const absoluteImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_KE",
      type: "website",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
}

export function getOrganizationRef() {
  const siteUrl = getSiteUrl();
  return {
    "@id": `${siteUrl}/#organization`,
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
