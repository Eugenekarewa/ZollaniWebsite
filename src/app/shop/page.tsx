import { list } from "@vercel/blob";
import ShopCatalog from "@/components/shop/ShopCatalog";

export const metadata = {
  title: "Shop Tested Laptops & Custom PCs | Zollani Tech Nairobi",
  description: "Shop tested refurbished laptops, custom gaming PCs, workstations, and upgrade bundles from Zollani Tech in Nairobi.",
};

export default async function ShopPage() {
  let imageOverrides: Record<string, string> = {};
  try {
    const { blobs } = await list({ prefix: "shop/" });
    imageOverrides = Object.fromEntries(
      blobs.map((blob) => [blob.pathname.replace("shop/", "").replace(/\.[^.]+$/, ""), blob.url]),
    );
  } catch {
    imageOverrides = {};
  }

  return <ShopCatalog imageOverrides={imageOverrides} />;
}
