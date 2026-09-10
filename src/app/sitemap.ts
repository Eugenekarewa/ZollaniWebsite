import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zollani.co.ke";
  const lastModified = new Date();

  const routes = [
    "",
    "/services",
    "/business-it",
    "/training",
    "/about",
    "/shop",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
