"use server";

import { and, asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { productImages } from "@/lib/db/schema";

export async function saveProductImages(productId: string, urls: string[]) {
  const cleanUrls = Array.from(new Set(urls.map((url) => url.trim()).filter((url) => /^https?:\/\//i.test(url))));
  await db.delete(productImages).where(eq(productImages.productId, productId));
  if (cleanUrls.length > 0) {
    await db.insert(productImages).values(cleanUrls.map((imageUrl, sortOrder) => ({ id: crypto.randomUUID(), productId, imageUrl, sortOrder })));
  }
  revalidatePath("/shop");
  revalidatePath("/admin/shop");
}

export async function getProductImages(productId: string) {
  return db.select().from(productImages).where(and(eq(productImages.productId, productId))).orderBy(asc(productImages.sortOrder));
}
