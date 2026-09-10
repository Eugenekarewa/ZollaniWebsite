import ShopCatalog from "@/components/shop/ShopCatalog";
import { db } from "@/lib/db";
import { shopProducts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const metadata = {
  title: "Shop Tested Laptops & Custom PCs | Zollani Tech Nairobi",
  description: "Shop tested refurbished laptops, custom gaming PCs, workstations, and upgrade bundles from Zollani Tech in Nairobi.",
};

export default async function ShopPage() {
  try {
    const products = await db.select().from(shopProducts).where(eq(shopProducts.isActive, true));
    if (products.length > 0) {
      return <ShopCatalog products={products.map((product) => ({ id: product.id, name: product.name, description: product.description, priceKes: Number(product.price), category: product.category, image: product.imageUrl, condition: "Available", warranty: "Shop warranty", popular: false, specs: [] }))} />;
    }
  } catch {
    // Keep the public catalog available if the database is temporarily unavailable.
  }
  return <ShopCatalog />;
}
