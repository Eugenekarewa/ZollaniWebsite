"use server";

import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db, ensureCareersTables } from "@/lib/db";
import { jobApplications, jobPostings } from "@/lib/db/schema";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

export async function getAdminJobPostings() {
  await requireAdmin();
  await ensureCareersTables();
  return db.select().from(jobPostings).orderBy(asc(jobPostings.sortOrder), desc(jobPostings.createdAt));
}

export async function getPublishedJobPostings() {
  await ensureCareersTables();
  try {
    return await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.status, "published"))
      .orderBy(asc(jobPostings.sortOrder), desc(jobPostings.createdAt));
  } catch {
    return [];
  }
}

export async function saveJobPosting(formData: FormData) {
  await requireAdmin();
  await ensureCareersTables();
  const id = String(formData.get("id") || crypto.randomUUID());
  const values = {
    id,
    title: String(formData.get("title") || "").trim(),
    department: String(formData.get("department") || "General").trim(),
    location: String(formData.get("location") || "Nairobi, Kenya").trim(),
    employmentType: String(formData.get("employmentType") || "Full-Time").trim(),
    summary: String(formData.get("summary") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    requirements: String(formData.get("requirements") || "").trim(),
    applyEmail: String(formData.get("applyEmail") || "eugene.karewa@zollani.co.ke").trim(),
    status: formData.get("status") === "published" ? "published" : "draft",
    sortOrder: Number(formData.get("sortOrder") || 0),
    updatedAt: new Date(),
  };
  if (!values.title || !values.description) throw new Error("Title and description are required");
  const { id: _id, ...updateValues } = values;
  await db.insert(jobPostings).values(values).onConflictDoUpdate({ target: jobPostings.id, set: updateValues });
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
}

export async function deleteJobPosting(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.delete(jobPostings).where(eq(jobPostings.id, id));
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
}

export async function getJobApplications() {
  await requireAdmin();
  await ensureCareersTables();
  return db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
}

export async function deleteJobApplication(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.delete(jobApplications).where(eq(jobApplications.id, id));
  revalidatePath("/admin/careers");
}

/**
 * Public submission — candidates apply directly from the careers page.
 * Applications land in the admin inbox for review; nothing is auto-processed.
 */
export async function submitJobApplication(formData: FormData) {
  await ensureCareersTables();
  const jobId = String(formData.get("jobId") || "").trim();
  const applicantName = String(formData.get("applicantName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  if (!jobId || !applicantName || !email) throw new Error("Name, email, and position are required");

  await db.insert(jobApplications).values({
    id: crypto.randomUUID(),
    jobId,
    applicantName,
    email,
    phone: String(formData.get("phone") || "").trim(),
    coverMessage: String(formData.get("coverMessage") || "").trim(),
    resumeUrl: String(formData.get("resumeUrl") || "").trim(),
    status: "new",
  });
  revalidatePath("/admin/careers");
  return { success: true };
}
