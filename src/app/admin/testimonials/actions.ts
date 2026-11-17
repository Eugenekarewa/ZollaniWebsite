"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db, ensureTestimonialsTable } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

/**
 * Public submission — any visitor can submit a real testimony. It always
 * lands as "pending" so nothing reaches the live site without your review.
 * This gives you full damage-control: approve the credible ones, quietly
 * reject anything questionable before it ever becomes public.
 */
export async function submitTestimonial(formData: FormData) {
  await ensureTestimonialsTable();
  const name = String(formData.get("name") || "").trim();
  const quote = String(formData.get("quote") || "").trim();
  if (!name || !quote) throw new Error("Name and testimonial text are required");

  const values = {
    id: crypto.randomUUID(),
    name,
    role: String(formData.get("role") || "").trim(),
    companyOrLocation: String(formData.get("companyOrLocation") || "").trim(),
    rating: Math.min(5, Math.max(1, Number(formData.get("rating") || 5))),
    quote,
    category: String(formData.get("category") || "repair").trim(),
    status: "pending",
  };

  await db.insert(testimonials).values(values);
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function getAdminTestimonials() {
  await requireAdmin();
  await ensureTestimonialsTable();
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getPublishedTestimonials() {
  await ensureTestimonialsTable();
  try {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.status, "approved"))
      .orderBy(desc(testimonials.updatedAt));
  } catch {
    return [];
  }
}

export async function approveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.update(testimonials).set({ status: "approved", updatedAt: new Date() }).where(eq(testimonials.id, id));
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function rejectTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.update(testimonials).set({ status: "rejected", updatedAt: new Date() }).where(eq(testimonials.id, id));
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
