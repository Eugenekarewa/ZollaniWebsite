"use server";

import { and, asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { aboutCompanyContent, aboutProfiles } from "@/lib/db/schema";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  const values = {
    id,
    name: String(formData.get("name") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    bio: String(formData.get("bio") || "").trim(),
    imageUrl: String(formData.get("imageUrl") || "").trim(),
    profileType: formData.get("profileType") === "owner" ? "owner" : "team",
    sortOrder: Number(formData.get("sortOrder") || 0),
    isPublished: formData.get("isPublished") === "on",
    updatedAt: new Date(),
  };
  if (!values.name || !values.role || !values.bio || !values.imageUrl) throw new Error("Name, role, bio, and image URL are required");
  const { id: _id, ...updateValues } = values;
  await db.insert(aboutProfiles).values(values).onConflictDoUpdate({ target: aboutProfiles.id, set: updateValues });
  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function deleteProfile(formData: FormData) {
  await requireAdmin();
  await db.delete(aboutProfiles).where(eq(aboutProfiles.id, String(formData.get("id"))));
  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function getAdminProfiles() {
  await requireAdmin();
  return db.select().from(aboutProfiles).orderBy(asc(aboutProfiles.sortOrder), asc(aboutProfiles.createdAt));
}

export async function getCompanyContent() {
  await requireAdmin();
  const [content] = await db.select().from(aboutCompanyContent).where(eq(aboutCompanyContent.id, "main"));
  return content ?? { id: "main", story: "", history: "", mission: "", vision: "", teamIntro: "" };
}

export async function saveCompanyContent(formData: FormData) {
  await requireAdmin();
  const values = {
    id: "main",
    story: String(formData.get("story") || "").trim(),
    history: String(formData.get("history") || "").trim(),
    mission: String(formData.get("mission") || "").trim(),
    vision: String(formData.get("vision") || "").trim(),
    teamIntro: String(formData.get("teamIntro") || "").trim(),
    updatedAt: new Date(),
  };
  await db.insert(aboutCompanyContent).values(values).onConflictDoUpdate({ target: aboutCompanyContent.id, set: values });
  revalidatePath("/about");
  revalidatePath("/admin/about");
}
