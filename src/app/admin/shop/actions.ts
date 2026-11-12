"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db, ensureProductDraftColumns } from "@/lib/db";
import { shopProducts, productImages } from "@/lib/db/schema";
import {
  publishDraftProduct,
  deleteDraftProduct,
  getAllDrafts,
  getLocalDrafts,
  saveLocalDrafts,
} from "@/lib/whatsapp-parser";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (process.env.NODE_ENV === "production") {
    if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }
  }
  return session?.user || { email: ADMIN_EMAIL, name: "Admin" };
}

/**
 * Publishes a draft to the public website after review
 */
export async function publishDraftAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id) throw new Error("Draft ID is required");

  const name = String(formData.get("name") || "").trim();
  const price = String(formData.get("price") || "").trim();
  const category = String(formData.get("category") || "refurbished-laptop").trim() as any;
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const condition = String(formData.get("condition") || "Certified Refurbished").trim();
  const warranty = String(formData.get("warranty") || "6 Months Warranty").trim();
  const rawSpecs = String(formData.get("specs") || "").trim();

  let specs: string[] = [];
  if (rawSpecs) {
    try {
      specs = rawSpecs.startsWith("[") ? JSON.parse(rawSpecs) : rawSpecs.split(",").map((s) => s.trim()).filter(Boolean);
    } catch {
      specs = rawSpecs.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  }

  await publishDraftProduct(id, {
    name,
    price,
    category,
    description,
    imageUrl: imageUrl || "/images/pc-repair-workbench.jpg",
    condition,
    warranty,
    specs,
  });

  revalidatePath("/shop");
  revalidatePath("/admin/shop");
  return { success: true };
}

/**
 * Rejects and deletes an unwanted WhatsApp draft
 */
export async function deleteDraftAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id) throw new Error("Draft ID is required");

  await deleteDraftProduct(id);

  revalidatePath("/admin/shop");
  return { success: true };
}

/**
 * Standard Save / Update product
 */
export async function saveProduct(formData: FormData) {
  await requireAdmin();
  await ensureProductDraftColumns();

  const id = String(formData.get("id") || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`);
  const values = {
    id,
    name: String(formData.get("name") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    price: String(formData.get("price") || "").trim(),
    category: String(formData.get("category") || "refurbished-laptop").trim(),
    imageUrl: String(formData.get("imageUrl") || "/images/pc-repair-workbench.jpg").trim(),
    isActive: formData.get("isActive") !== "off" && formData.get("isActive") !== "false",
    status: "published",
    condition: String(formData.get("condition") || "Certified Refurbished").trim(),
    warranty: String(formData.get("warranty") || "6 Months Warranty").trim(),
    updatedAt: new Date(),
  };

  if (!values.name || !values.price) {
    throw new Error("Product name and price are required");
  }

  try {
    const { id: _id, ...updateValues } = values;
    await db.insert(shopProducts).values(values).onConflictDoUpdate({
      target: shopProducts.id,
      set: updateValues,
    });
  } catch (err) {
    console.warn("DB save note:", err);
  }

  // Also maintain local copy
  const local = await getLocalDrafts();
  const existingIdx = local.findIndex((p) => p.id === id);
  const entry = {
    id,
    name: values.name,
    description: values.description,
    price: values.price,
    category: values.category as any,
    imageUrl: values.imageUrl,
    isActive: values.isActive,
    status: "published" as const,
    condition: values.condition,
    warranty: values.warranty,
    specs: [],
    rawMessage: "",
    createdAt: new Date().toISOString(),
  };

  if (existingIdx !== -1) {
    local[existingIdx] = { ...local[existingIdx], ...entry };
  } else {
    local.push(entry);
  }
  await saveLocalDrafts(local);

  revalidatePath("/shop");
  revalidatePath("/admin/shop");
  return { success: true };
}

/**
 * Toggles product visibility (on / off)
 */
export async function toggleProductVisibility(id: string, makeActive: boolean) {
  await requireAdmin();
  try {
    await db.update(shopProducts).set({ isActive: makeActive, updatedAt: new Date() }).where(eq(shopProducts.id, id));
  } catch {}

  const local = await getLocalDrafts();
  const item = local.find((p) => p.id === id);
  if (item) {
    item.isActive = makeActive;
    await saveLocalDrafts(local);
  }

  revalidatePath("/shop");
  revalidatePath("/admin/shop");
}

/**
 * Deletes a product entirely
 */
export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id) throw new Error("Product id is required");

  try {
    await db.delete(shopProducts).where(eq(shopProducts.id, id));
    await db.delete(productImages).where(eq(productImages.productId, id));
  } catch {}

  const local = await getLocalDrafts();
  const filtered = local.filter((p) => p.id !== id);
  await saveLocalDrafts(filtered);

  revalidatePath("/shop");
  revalidatePath("/admin/shop");
  return { success: true };
}
