import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const disallowed = ["/api/", "/admin/", "/checkout"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowed,
      },
      {
        userAgent: [
          "Googlebot",
          "bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: disallowed,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
