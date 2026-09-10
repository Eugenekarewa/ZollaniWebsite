"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { shopProducts } from "@/lib/db/schema";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) throw new Error("Unauthorized");
  return session.user;
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  const values = { id, name: String(formData.get("name") || "").trim(), description: String(formData.get("description") || "").trim(), price: String(formData.get("price") || "").trim(), category: String(formData.get("category") || "").trim(), imageUrl: String(formData.get("imageUrl") || "").trim(), isActive: formData.get("isActive") === "on", updatedAt: new Date() };
  if (!values.name || !values.description || !values.price || !values.category || !values.imageUrl) throw new Error("All product fields are required");
  const { id: _id, ...updateValues } = values;
  await db.insert(shopProducts).values(values).onConflictDoUpdate({ target: shopProducts.id, set: updateValues });
  revalidatePath("/shop");
  revalidatePath("/admin/shop");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.delete(shopProducts).where(and(eq(shopProducts.id, id)));
  revalidatePath("/shop");
  revalidatePath("/admin/shop");
}
