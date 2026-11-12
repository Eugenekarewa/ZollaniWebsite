import ShopCatalog from "@/components/shop/ShopCatalog";
import { PRODUCTS, type ProductItem } from "@/data/productsData";
import { db, ensureProductDraftColumns } from "@/lib/db";
import { productImages, shopProducts } from "@/lib/db/schema";
import { getLocalDrafts } from "@/lib/whatsapp-parser";
import { and, asc, eq, isNull, or } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tested Refurbished Laptops & Custom Computers for Sale in Nairobi",
  description:
    "Browse bench-tested refurbished laptops, custom gaming PCs, workstations, storage upgrades, and genuine computer accessories from Zollani Tech in Nairobi. Backed by a 6-month warranty.",
  keywords: [
    "refurbished laptops Nairobi",
    "used laptops Kenya",
    "custom PC Nairobi",
    "computer upgrades Kenya",
    "laptop sales Nairobi",
    "thinkpad nairobi",
    "elitebook nairobi",
  ],
};

export default async function ShopPage() {
  let catalogProducts: ProductItem[] = [];

  try {
    await ensureProductDraftColumns();
    // Only published and active items — DRAFTS NEVER APPEAR HERE!
    const products = await db
      .select()
      .from(shopProducts)
      .where(
        and(
          eq(shopProducts.isActive, true),
          or(eq(shopProducts.status, "published"), isNull(shopProducts.status))
        )
      );

    if (products.length > 0) {
      const galleries = await Promise.all(
        products.map(async (product) =>
          db
            .select()
            .from(productImages)
            .where(eq(productImages.productId, product.id))
            .orderBy(asc(productImages.sortOrder))
        )
      );

      catalogProducts = products.map((product, index) => {
        const priceKes = Number(product.price.replace(/[^\d.]/g, ""));
        const normalizeImageUrl = (url?: string) => {
          if (!url) return "/images/pc-repair-workbench.jpg";
          return url.startsWith("https://ibb.co/")
            ? `/api/product-image?url=${encodeURIComponent(url)}`
            : url;
        };
        const galleryImages = galleries[index]
          .map((image) => normalizeImageUrl(image.imageUrl))
          .filter(Boolean);
        const primaryImage = galleryImages[0] || normalizeImageUrl(product.imageUrl);

        let parsedSpecs: string[] = [];
        try {
          parsedSpecs = product.specs ? JSON.parse(product.specs) : [];
        } catch {
          parsedSpecs = product.specs ? [product.specs] : [];
        }

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          priceKes: Number.isFinite(priceKes) ? priceKes : 0,
          category: product.category as ProductItem["category"],
          image: primaryImage,
          images: galleryImages,
          condition: (product.condition as any) || "Certified Refurbished",
          warranty: product.warranty || "6 Months Warranty",
          popular: false,
          specs: parsedSpecs.length > 0 ? parsedSpecs : ["Bench-Tested by Zollani Tech", "Original Charger Included"],
        };
      });
    }
  } catch (err) {
    console.warn("DB query note on ShopPage, trying local fallback:", err);
  }

  // If DB returned nothing, check local published drafts fallback
  if (catalogProducts.length === 0) {
    try {
      const local = await getLocalDrafts();
      const localPublished = local.filter((item) => item.status === "published" && item.isActive);
      if (localPublished.length > 0) {
        catalogProducts = localPublished.map((item) => {
          const priceKes = Number(item.price.replace(/[^\d.]/g, ""));
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            priceKes: Number.isFinite(priceKes) ? priceKes : 0,
            category: item.category,
            image: item.imageUrl || "/images/pc-repair-workbench.jpg",
            images: item.galleryImages || [item.imageUrl],
            condition: (item.condition as any) || "Certified Refurbished",
            warranty: item.warranty || "6 Months Warranty",
            specs: item.specs || [],
            popular: false,
          };
        });
      }
    } catch {}
  }

  // Final fallback to high-quality curated stock so customer always sees available hardware
  if (catalogProducts.length === 0) {
    catalogProducts = PRODUCTS;
  }

  return <ShopCatalog products={catalogProducts} />;
}
