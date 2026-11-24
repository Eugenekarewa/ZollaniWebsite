import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getOrderByCode } from "@/lib/commerce-store";
import { createPageMetadata } from "@/lib/seo";
import { PrintReceiptButton } from "@/components/shop/PrintReceiptButton";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  PackageSearch,
  ShieldCheck,
  FileWarning,
  Phone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Official Customer Receipt",
  description: "Printable official payment receipt from Zollani Tech Limited Nairobi.",
  path: "/receipt",
  noIndex: true,
});

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "");
  const order = await getOrderByCode(decodedId);

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <div className="rounded-3xl border border-cream-border bg-white p-10 shadow-sm">
          <FileWarning className="mx-auto h-14 w-14 text-coral-brand" />
          <h1 className="mt-4 text-2xl font-black text-brand-dark">Receipt Not Found</h1>
          <p className="mt-2 text-sm text-brand-muted">
            We couldn&apos;t locate an order or receipt matching{" "}
            <span className="font-mono font-bold text-brand-dark">{decodedId}</span>. Check your
            Order ID or look it up by phone number.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/track"
              className="rounded-2xl bg-teal-brand px-5 py-3 text-xs font-bold text-white hover:bg-teal-deep"
            >
              Track by Phone or Order ID
            </Link>
            <Link
              href="/shop"
              className="rounded-2xl border border-cream-border px-5 py-3 text-xs font-bold text-brand-dark hover:bg-cream-surface"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const paymentLabel =
    order.paymentMethod === "mpesa"
      ? "Lipa Na M-Pesa (Paybill 714888)"
      : order.paymentMethod === "card"
      ? "Debit / Credit Card"
      : order.paymentMethod === "bank"
      ? "Bank Transfer / PesaLink"
      : "Cash on Delivery / Pickup";

  return (
    <div className="min-h-screen bg-cream-bg py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      {/* Top Action Bar (hidden when printing) */}
      <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-slate hover:text-teal-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href={`/track?code=${encodeURIComponent(order.orderNumber)}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-cream-border bg-white px-4 py-3 text-xs font-bold text-brand-dark hover:border-teal-brand transition-colors"
          >
            <PackageSearch className="h-4 w-4 text-teal-brand" />
            Track Order
          </Link>
          <PrintReceiptButton />
        </div>
      </div>

      {/* Printable Receipt Document */}
      <article className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-cream-border bg-white shadow-lg print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        {/* Header Band */}
        <div className="border-b-2 border-coral-brand bg-brand-dark px-8 py-7 text-white print:bg-white print:text-brand-dark">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-coral-brand">
                Official Sales Receipt
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-tight">
                Zollani Tech Limited
              </h1>
              <p className="mt-1 text-xs text-cream-bg/80 print:text-brand-muted">
                Precision Electronics Repair &amp; Certified Computer Hardware Store · Nairobi, Kenya
              </p>
              <p className="mt-1 text-xs text-cream-bg/80 print:text-brand-muted">
                Tel: +254 768 551914 · Email: info@zollanitech.co.ke · Paybill: 714888 (Acc: 480939)
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-4 py-3 text-left sm:text-right print:border print:border-cream-border print:bg-cream-surface">
              <p className="text-[10px] font-bold uppercase tracking-wider text-cream-bg/75 print:text-brand-muted">
                Receipt Number
              </p>
              <p className="font-mono text-base font-black text-white print:text-brand-dark">
                {order.receiptNumber}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[10px] font-black uppercase">
                {order.paymentStatus === "paid" ? (
                  <span className="flex items-center gap-1 text-green-700">
                    <CheckCircle2 className="h-3 w-3" /> PAID
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-700">
                    <Clock className="h-3 w-3" /> PAYMENT PENDING
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Customer & Order Info Grid */}
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-cream-border bg-cream-surface p-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-brand-muted">
                Billed To
              </p>
              <p className="text-sm font-black text-brand-dark">{order.customerName}</p>
              <p className="text-xs text-brand-slate">Phone: {order.customerPhone}</p>
              {order.customerEmail && (
                <p className="text-xs text-brand-slate">Email: {order.customerEmail}</p>
              )}
              <p className="text-xs text-brand-slate">
                Fulfillment:{" "}
                <span className="font-semibold">
                  {order.deliveryMethod === "delivery" ? "Nairobi Delivery" : "Shop Pickup"}
                </span>{" "}
                — {order.deliveryAddress}
              </p>
            </div>

            <div className="space-y-1.5 sm:text-right">
              <p className="text-[10px] font-black uppercase tracking-wider text-brand-muted">
                Transaction Details
              </p>
              <p className="text-xs text-brand-slate">
                Order ID:{" "}
                <span className="font-mono font-bold text-brand-dark">{order.orderNumber}</span>
              </p>
              <p className="text-xs text-brand-slate">Date Issued: {formattedDate}</p>
              <p className="text-xs text-brand-slate">Method: {paymentLabel}</p>
              <p className="text-xs text-brand-slate">
                Reference:{" "}
                <span className="font-mono font-bold text-teal-brand">
                  {order.paymentReference}
                </span>
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b-2 border-brand-dark text-[11px] uppercase tracking-wider text-brand-muted">
                  <th className="py-3 pr-3 font-black">Item Description</th>
                  <th className="py-3 px-2 font-black text-center">Qty</th>
                  <th className="py-3 px-2 font-black text-right">Unit (KES)</th>
                  <th className="py-3 pl-3 font-black text-right">Total (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3.5 pr-3">
                      <p className="font-bold text-brand-dark">{item.name}</p>
                      <p className="text-[11px] text-teal-brand font-medium">{item.warranty}</p>
                    </td>
                    <td className="py-3.5 px-2 text-center font-mono font-bold text-brand-dark">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono text-brand-slate">
                      {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 pl-3 text-right font-mono font-bold text-brand-dark">
                      {item.lineTotal.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Box */}
          <div className="flex flex-col justify-between gap-6 border-t border-cream-border pt-6 sm:flex-row sm:items-end">
            <div className="max-w-sm space-y-2 text-[11px] text-brand-muted">
              <div className="flex items-center gap-1.5 font-bold text-brand-dark">
                <ShieldCheck className="h-4 w-4 text-teal-brand" />
                <span>Zollani Tech Warranty &amp; Authenticity Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Keep this receipt for warranty service. All Ex-UK Grade A laptops carry a 6-month written hardware warranty; accessories and new builds carry stated OEM/workshop coverage.
              </p>
              {order.notes && (
                <p className="rounded-xl bg-cream-surface p-2.5 text-brand-slate border border-cream-border">
                  <strong>Order Notes:</strong> {order.notes}
                </p>
              )}
            </div>

            <div className="w-full sm:w-72 space-y-2 rounded-2xl border border-cream-border bg-cream-surface p-4">
              <div className="flex justify-between text-xs text-brand-slate">
                <span>Subtotal</span>
                <span className="font-mono font-bold">
                  KES {order.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-brand-slate">
                <span>Delivery</span>
                <span className="font-mono font-bold">
                  {order.deliveryFee > 0 ? `KES ${order.deliveryFee.toLocaleString()}` : "FREE"}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-brand-muted">
                <span>16% VAT (Included)</span>
                <span className="font-mono">KES {order.vatIncluded.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-cream-border pt-2.5 text-sm font-black text-brand-dark">
                <span>TOTAL PAID / DUE</span>
                <span className="font-mono text-base text-coral-dark">
                  KES {order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Verification Strip */}
          <div className="border-t border-dashed border-cream-border pt-5 flex flex-col gap-2 text-[11px] text-brand-muted sm:flex-row sm:items-center sm:justify-between">
            <span>
              Track live order status online: <strong>/track?code={order.orderNumber}</strong>
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-brand-dark">
              <Phone className="h-3 w-3 text-teal-brand" />
              Dispatch Desk: +254 768 551914
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
