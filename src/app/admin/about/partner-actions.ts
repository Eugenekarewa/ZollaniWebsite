"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { partners } from "@/lib/db/schema";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

export async function getAdminPartners() {
  await requireAdmin();
  return db.select().from(partners).orderBy(asc(partners.sortOrder), asc(partners.createdAt));
}

export async function savePartner(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  const values = {
    id,
    name: String(formData.get("name") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    logoUrl: String(formData.get("logoUrl") || "").trim(),
    websiteUrl: String(formData.get("websiteUrl") || "").trim(),
    sortOrder: Number(formData.get("sortOrder") || 0),
    isPublished: formData.get("isPublished") === "on",
    updatedAt: new Date(),
  };
  if (!values.name) throw new Error("Partner name is required");
  const { id: _id, ...updateValues } = values;
  await db.insert(partners).values(values).onConflictDoUpdate({ target: partners.id, set: updateValues });
  revalidatePath("/");
  revalidatePath("/admin/about");
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  await db.delete(partners).where(eq(partners.id, String(formData.get("id"))));
  revalidatePath("/");
  revalidatePath("/admin/about");
}

export async function getPublishedPartners() {
  return db.select().from(partners).where(eq(partners.isPublished, true)).orderBy(asc(partners.sortOrder), asc(partners.createdAt));
}
