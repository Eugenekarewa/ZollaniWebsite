"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { invoices, invoiceItems } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) redirect("/admin/login");
}

function money(value: string | number) {
  return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
}

export async function createInvoice(formData: FormData) {
  await requireAdmin();
  const invoiceId = crypto.randomUUID();
  const invoiceNumber = `ZOL-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
  const description = String(formData.get("description") || "Service or product").trim();
  const quantity = Math.max(0.01, money(String(formData.get("quantity") || "1")));
  const unitPrice = Math.max(0, money(String(formData.get("unitPrice") || "0")));
  const vatRate = Math.max(0, money(String(formData.get("vatRate") || "16")));
  const subtotal = quantity * unitPrice;
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;

  await db.insert(invoices).values({ id: invoiceId, invoiceNumber, documentType: String(formData.get("documentType") || "invoice"), customerName: String(formData.get("customerName") || "Customer").trim(), customerEmail: String(formData.get("customerEmail") || "").trim() || null, customerPhone: String(formData.get("customerPhone") || "").trim() || null, customerPin: String(formData.get("customerPin") || "").trim() || null, sellerPin: process.env.ZOLLANI_KRA_PIN || null, subtotal: subtotal.toFixed(2), vatRate: vatRate.toFixed(2), vatAmount: vatAmount.toFixed(2), total: total.toFixed(2), etimsStatus: process.env.KRA_ETIMS_API_URL ? "pending_submission" : "not_configured" });
  await db.insert(invoiceItems).values({ id: crypto.randomUUID(), invoiceId, description, quantity: quantity.toFixed(2), unitPrice: unitPrice.toFixed(2), vatRate: vatRate.toFixed(2), lineSubtotal: subtotal.toFixed(2), lineVat: vatAmount.toFixed(2), lineTotal: total.toFixed(2) });
  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoiceId}`);
}
