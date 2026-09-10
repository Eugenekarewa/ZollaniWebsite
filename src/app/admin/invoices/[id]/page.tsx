import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { invoices, invoiceItems } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { PrintDocumentButton } from "@/components/admin/PrintDocumentButton";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

export default async function InvoiceDocument({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) redirect("/admin/login");
  const { id } = await params;
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
  if (!invoice) notFound();
  const items = await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, id));
  return <main className="min-h-screen bg-white px-5 py-10 text-brand-dark print:p-0"><div className="mx-auto max-w-3xl"><div className="flex items-start justify-between gap-6 border-b-2 border-teal-deep pb-8"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-brand">Zollani Tech Limited</p><h1 className="mt-3 text-4xl font-black">{invoice.documentType === "receipt" ? "Receipt" : "Tax Invoice"}</h1><p className="mt-2 text-sm text-brand-muted">{invoice.invoiceNumber}</p></div><PrintDocumentButton /></div><div className="grid gap-6 py-8 sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-wide text-brand-muted">Seller</p><p className="mt-2 font-bold">{invoice.sellerName}</p><p className="text-sm">{invoice.sellerAddress}</p>{invoice.sellerPin ? <p className="text-sm">KRA PIN: {invoice.sellerPin}</p> : null}</div><div><p className="text-xs font-bold uppercase tracking-wide text-brand-muted">Bill to</p><p className="mt-2 font-bold">{invoice.customerName}</p>{invoice.customerEmail ? <p className="text-sm">{invoice.customerEmail}</p> : null}{invoice.customerPhone ? <p className="text-sm">{invoice.customerPhone}</p> : null}{invoice.customerPin ? <p className="text-sm">KRA PIN: {invoice.customerPin}</p> : null}</div></div><table className="w-full border-collapse text-left text-sm"><thead><tr className="border-b-2 border-brand-dark"><th className="py-3">Description</th><th className="py-3 text-right">Qty</th><th className="py-3 text-right">Unit price</th><th className="py-3 text-right">Total</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-b border-cream-border"><td className="py-4">{item.description}</td><td className="py-4 text-right">{item.quantity}</td><td className="py-4 text-right">KES {Number(item.unitPrice).toLocaleString()}</td><td className="py-4 text-right font-bold">KES {Number(item.lineTotal).toLocaleString()}</td></tr>)}</tbody></table><div className="ml-auto mt-8 max-w-xs space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>KES {Number(invoice.subtotal).toLocaleString()}</span></div><div className="flex justify-between"><span>VAT ({invoice.vatRate}%)</span><span>KES {Number(invoice.vatAmount).toLocaleString()}</span></div><div className="flex justify-between border-t-2 border-brand-dark pt-3 text-lg font-black"><span>Total</span><span>KES {Number(invoice.total).toLocaleString()}</span></div></div><div className="mt-10 border-t border-cream-border pt-5 text-xs text-brand-muted"><p>eTIMS status: {invoice.etimsStatus}</p><p className="mt-2">This document is not an official KRA eTIMS fiscal invoice until it has been successfully submitted to eTIMS and receives a valid control number and verification code.</p></div></div></main>;
}
