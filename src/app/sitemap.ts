import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const entries: { route: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { route: "", priority: 1.0, changeFrequency: "weekly" },
    { route: "/services", priority: 0.95, changeFrequency: "weekly" },
    { route: "/shop", priority: 0.95, changeFrequency: "daily" },
    { route: "/track", priority: 0.9, changeFrequency: "weekly" },
    { route: "/business-it", priority: 0.9, changeFrequency: "weekly" },
    { route: "/training", priority: 0.85, changeFrequency: "weekly" },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" },
    { route: "/careers", priority: 0.75, changeFrequency: "weekly" },
    { route: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { route: "/llms.txt", priority: 0.7, changeFrequency: "weekly" },
    { route: "/llms-full.txt", priority: 0.6, changeFrequency: "weekly" },
  ];

  return entries.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
