import { redirect } from "next/navigation";
import { desc, eq, or, isNull } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db, ensureProductDraftColumns } from "@/lib/db";
import { shopProducts } from "@/lib/db/schema";
import { getAllDrafts, getLocalDrafts } from "@/lib/whatsapp-parser";
import AdminShopClient from "./AdminShopClient";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

export default async function AdminShopPage() {
  const session = await getSession();
  if (process.env.NODE_ENV === "production") {
    if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) {
      redirect("/admin/login");
    }
  }

  // Ensure DB columns exist
  await ensureProductDraftColumns();

  // 1. Fetch pending WhatsApp drafts
  let drafts = [];
  try {
    drafts = await getAllDrafts();
  } catch (err) {
    console.warn("Failed to get drafts from DB, using local:", err);
    drafts = await getLocalDrafts();
    drafts = drafts.filter((d) => d.status === "draft");
  }

  // 2. Fetch published products
  let published: any[] = [];
  try {
    const dbPublished = await db
      .select()
      .from(shopProducts)
      .where(or(eq(shopProducts.status, "published"), isNull(shopProducts.status)))
      .orderBy(desc(shopProducts.updatedAt));
    published = dbPublished;
  } catch (err) {
    console.warn("Failed to get published products from DB:", err);
    const local = await getLocalDrafts();
    published = local.filter((d) => d.status === "published" || d.isActive);
  }

  return <AdminShopClient initialDrafts={drafts} initialPublished={published} />;
}
