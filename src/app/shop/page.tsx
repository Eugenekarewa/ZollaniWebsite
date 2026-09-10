import ShopCatalog from "@/components/shop/ShopCatalog";
import type { ProductItem } from "@/data/productsData";
import { db } from "@/lib/db";
import { shopProducts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tested Refurbished Laptops & Custom PCs in Nairobi",
  description: "Browse tested refurbished laptops, custom PCs, workstations, storage upgrades, and computer accessories from Zollani Tech in Nairobi.",
  keywords: ["refurbished laptops Nairobi", "used laptops Kenya", "custom PC Nairobi", "computer upgrades Kenya", "laptop accessories Nairobi"],
};

export default async function ShopPage() {
  try {
    const products = await db.select().from(shopProducts).where(eq(shopProducts.isActive, true));
    if (products.length > 0) {
      const catalogProducts: ProductItem[] = products.map((product) => {
        const priceKes = Number(product.price.replace(/[^\d.]/g, ""));
        return { id: product.id, name: product.name, description: product.description, priceKes: Number.isFinite(priceKes) ? priceKes : 0, category: product.category as ProductItem["category"], image: product.imageUrl?.startsWith("https://ibb.co/") ? `/api/product-image?url=${encodeURIComponent(product.imageUrl)}` : product.imageUrl, condition: "Certified Refurbished", warranty: "Shop warranty", popular: false, specs: [] };
      });
      return <ShopCatalog products={catalogProducts} />;
    }
  } catch {
    // Keep the public catalog available if the database is temporarily unavailable.
  }
  return <ShopCatalog products={[]} />;
}
