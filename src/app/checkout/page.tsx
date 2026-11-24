"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { ShopOrder } from "@/lib/commerce-store";
import {
  ShoppingCart,
  ArrowLeft,
  CheckCircle2,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Loader2,
  CreditCard,
  Smartphone,
  Building,
  Banknote,
  Printer,
  PackageSearch,
  Lock,
  AlertCircle,
} from "lucide-react";

type DeliveryMethod = "pickup" | "delivery";
type PaymentMethod = "mpesa" | "card" | "bank" | "cash";

interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  delivery: DeliveryMethod;
  address: string;
  payment: PaymentMethod;
  mpesaNumber: string;
  mpesaCode: string;
  cardBrand: "VISA" | "MASTERCARD";
  cardHolder: string;
  cardLast4: string;
  notes: string;
}

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    delivery: "pickup",
    address: "",
    payment: "mpesa",
    mpesaNumber: "",
    mpesaCode: "",
    cardBrand: "VISA",
    cardHolder: "",
    cardLast4: "",
    notes: "",
  });

  const [createdOrder, setCreatedOrder] = useState<ShopOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const deliveryFee = form.delivery === "delivery" ? 500 : 0;
  const grandTotal = totalPrice + deliveryFee;
  const estimatedVat = Math.round(grandTotal - grandTotal / 1.16);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "phone" && !prev.mpesaNumber ? { mpesaNumber: value } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg("Please enter your full name and phone number.");
      return;
    }

    if (form.delivery === "delivery" && form.address.trim().length < 3) {
      setErrorMsg("Please enter your Nairobi delivery address or estate.");
      return;
    }

    if (form.payment === "card") {
      if (!form.cardHolder.trim() || form.cardLast4.replace(/\D/g, "").length !== 4) {
        setErrorMsg("Please enter the cardholder name and last 4 card digits to authorize payment.");
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name.trim(),
          customerPhone: form.phone.trim(),
          customerEmail: form.email.trim(),
          deliveryMethod: form.delivery,
          deliveryAddress: form.address.trim(),
          paymentMethod: form.payment,
          mpesaCode: form.payment === "mpesa" ? form.mpesaCode.trim() : undefined,
          cardBrand: form.payment === "card" ? form.cardBrand : undefined,
          cardLast4:
            form.payment === "card"
              ? form.cardLast4.replace(/\D/g, "").slice(-4)
              : undefined,
          notes: form.notes.trim(),
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.order) {
        setErrorMsg(data.error || "Unable to complete payment. Please check your details.");
        setLoading(false);
        return;
      }

      setCreatedOrder(data.order as ShopOrder);
      clearCart();
    } catch {
      setErrorMsg("Network error while confirming order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && !createdOrder) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <ShoppingCart className="h-16 w-16 text-cream-border" />
        <h1 className="text-2xl font-black text-brand-dark">Your cart is empty</h1>
        <p className="text-sm text-brand-muted">
          Add laptops or computer accessories before checking out.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-2xl bg-teal-brand px-6 py-3 text-sm font-bold text-white hover:bg-teal-deep transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Browse Shop
          </Link>
          <Link
            href="/track"
            className="inline-flex items-center gap-2 rounded-2xl border border-cream-border bg-white px-6 py-3 text-sm font-bold text-brand-dark hover:border-teal-brand transition-colors"
          >
            <PackageSearch className="h-4 w-4 text-teal-brand" /> Track Existing Order
          </Link>
        </div>
      </div>
    );
  }

  if (createdOrder) {
    const waSummary = encodeURIComponent(
      `Hello Zollani Tech, I have placed order ${createdOrder.orderNumber} (Receipt ${createdOrder.receiptNumber}) totaling KES ${createdOrder.total.toLocaleString()} via ${createdOrder.paymentMethod.toUpperCase()}.`
    );

    return (
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="rounded-3xl border border-green-200 bg-white p-8 sm:p-10 shadow-lg">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <span className="mt-4 inline-block rounded-lg bg-teal-subtle px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal-brand">
              {createdOrder.paymentStatus === "paid"
                ? "Payment Verified & Confirmed"
                : "Order Confirmed & Reserved"}
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-brand-dark">
              Thank You, {createdOrder.customerName}!
            </h1>
            <p className="mt-2 text-sm text-brand-muted">
              Your order and official receipt are ready. Use your Order ID anytime to track live delivery status.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-cream-border bg-cream-surface p-5 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                Order Number
              </p>
              <p className="mt-1 font-mono text-sm font-black text-brand-dark">
                {createdOrder.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                Receipt Number
              </p>
              <p className="mt-1 font-mono text-sm font-black text-teal-brand">
                {createdOrder.receiptNumber}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                Total ({createdOrder.paymentMethod.toUpperCase()})
              </p>
              <p className="mt-1 font-mono text-sm font-black text-coral-dark">
                KES {createdOrder.total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-cream-border p-4">
            <p className="text-xs font-black uppercase tracking-wider text-brand-muted">
              Items Purchased
            </p>
            {createdOrder.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs text-brand-dark py-1 border-b border-cream-border/60 last:border-0"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-mono font-bold">
                  KES {item.lineTotal.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href={`/receipt/${encodeURIComponent(createdOrder.orderNumber)}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-dark py-4 px-5 text-sm font-black text-white shadow-md hover:bg-teal-deep transition-colors"
            >
              <Printer className="h-4 w-4 text-coral-brand" />
              <span>View &amp; Print Official Receipt</span>
            </Link>

            <Link
              href={`/track?code=${encodeURIComponent(createdOrder.orderNumber)}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-teal-brand py-4 px-5 text-sm font-black text-white shadow-md hover:bg-teal-deep transition-colors"
            >
              <PackageSearch className="h-4 w-4" />
              <span>Track Order Live</span>
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/254768551914?text=${waSummary}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#25D366] py-3 text-xs font-bold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Share Order Copy on WhatsApp</span>
            </a>
            <Link
              href="/shop"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cream-border py-3 text-xs font-bold text-brand-slate hover:bg-cream-surface transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-teal-brand transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Link>
          <h1 className="mt-3 text-3xl font-black text-brand-dark">
            Website Checkout &amp; Instant Receipt
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Complete your order securely online and print your official VAT-inclusive receipt immediately.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-cream-border bg-white px-3.5 py-2 text-xs font-bold text-brand-dark">
          <Lock className="h-3.5 w-3.5 text-teal-brand" />
          <span>Server-Verified KES Pricing</span>
        </div>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left — Customer, Delivery, Payment */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs space-y-5">
              <h2 className="text-base font-black text-brand-dark">1. Customer Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-brand-dark" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. John Kamau"
                    className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-brand-dark" htmlFor="phone">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-brand-dark" htmlFor="email">
                    Email Address (optional — printed on receipt)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-base font-black text-brand-dark">2. Delivery Method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    value: "pickup",
                    icon: MapPin,
                    label: "Nairobi Workshop Pickup",
                    sub: "Free — Ready within 1 hour",
                  },
                  {
                    value: "delivery",
                    icon: Truck,
                    label: "Same-Day Rider Delivery",
                    sub: "KES 500 — Nairobi & Environs",
                  },
                ].map(({ value, icon: Icon, label, sub }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                      form.delivery === value
                        ? "border-teal-brand bg-teal-brand/5 ring-1 ring-teal-brand"
                        : "border-cream-border hover:border-teal-brand/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={value}
                      checked={form.delivery === value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        form.delivery === value ? "text-teal-brand" : "text-brand-muted"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-bold text-brand-dark">{label}</p>
                      <p className="text-xs text-brand-muted">{sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {form.delivery === "delivery" && (
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-brand-dark" htmlFor="address">
                    Delivery Estate, Building &amp; Road *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required={form.delivery === "delivery"}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="e.g. Kilimani, Wood Avenue, Suite 4B"
                    className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
                  />
                </div>
              )}
            </div>

            {/* Online Payment Method */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-base font-black text-brand-dark">3. Website Payment</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    value: "mpesa",
                    label: "M-Pesa",
                    sub: "Express / Paybill",
                    icon: Smartphone,
                  },
                  {
                    value: "card",
                    label: "Visa / Card",
                    sub: "Instant Payment",
                    icon: CreditCard,
                  },
                  {
                    value: "bank",
                    label: "Bank EFT",
                    sub: "PesaLink / RTGS",
                    icon: Building,
                  },
                  {
                    value: "cash",
                    label: "Cash",
                    sub: "On Pickup / Rider",
                    icon: Banknote,
                  },
                ].map(({ value, label, sub, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer flex-col gap-1.5 rounded-2xl border p-3.5 transition-all ${
                      form.payment === value
                        ? "border-coral-brand bg-coral-brand/5 ring-1 ring-coral-brand"
                        : "border-cream-border hover:border-coral-brand/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={form.payment === value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon
                      className={`h-4 w-4 ${
                        form.payment === value ? "text-coral-dark" : "text-brand-muted"
                      }`}
                    />
                    <span
                      className={`text-sm font-bold ${
                        form.payment === value ? "text-coral-dark" : "text-brand-dark"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-[11px] text-brand-muted">{sub}</span>
                  </label>
                ))}
              </div>

              {form.payment === "mpesa" && (
                <div className="rounded-2xl border border-green-200 bg-green-50/70 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-green-900">
                    <span className="font-black">Lipa Na M-Pesa Paybill: 714888</span>
                    <span className="font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-green-200">
                      Account: 480939
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[11px] font-bold text-green-950">
                        M-Pesa Phone Number *
                      </label>
                      <input
                        name="mpesaNumber"
                        type="tel"
                        value={form.mpesaNumber || form.phone}
                        onChange={handleChange}
                        placeholder="07XX XXX XXX"
                        className="w-full rounded-xl border border-green-200 bg-white px-3.5 py-2.5 text-xs font-medium text-brand-dark focus:border-teal-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-bold text-green-950">
                        M-Pesa Code (optional if using Paybill)
                      </label>
                      <input
                        name="mpesaCode"
                        type="text"
                        value={form.mpesaCode}
                        onChange={handleChange}
                        placeholder="e.g. SK92H7B12Q (or leave blank for STK)"
                        className="w-full rounded-xl border border-green-200 bg-white px-3.5 py-2.5 text-xs font-mono uppercase text-brand-dark focus:border-teal-brand focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {form.payment === "card" && (
                <div className="rounded-2xl border border-teal-brand/25 bg-teal-subtle/40 p-4 space-y-3">
                  <p className="text-xs font-bold text-brand-dark">
                    Instant Card Authorization (masked token reference only — full card numbers are never stored)
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-[11px] font-bold text-brand-dark">
                        Card Network
                      </label>
                      <select
                        name="cardBrand"
                        value={form.cardBrand}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-cream-border bg-white px-3 py-2.5 text-xs font-bold text-brand-dark focus:border-teal-brand focus:outline-none"
                      >
                        <option value="VISA">Visa</option>
                        <option value="MASTERCARD">Mastercard</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-bold text-brand-dark">
                        Cardholder Name *
                      </label>
                      <input
                        name="cardHolder"
                        type="text"
                        required={form.payment === "card"}
                        value={form.cardHolder}
                        onChange={handleChange}
                        placeholder="Name on card"
                        className="w-full rounded-xl border border-cream-border bg-white px-3 py-2.5 text-xs text-brand-dark focus:border-teal-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-bold text-brand-dark">
                        Last 4 Digits *
                      </label>
                      <input
                        name="cardLast4"
                        type="text"
                        maxLength={4}
                        inputMode="numeric"
                        required={form.payment === "card"}
                        value={form.cardLast4}
                        onChange={handleChange}
                        placeholder="e.g. 4242"
                        className="w-full rounded-xl border border-cream-border bg-white px-3 py-2.5 text-xs font-mono text-brand-dark focus:border-teal-brand focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {form.payment === "bank" && (
                <div className="rounded-2xl border border-cream-border bg-cream-surface p-4 text-xs text-brand-slate">
                  <p className="font-bold text-brand-dark">Bank / PesaLink Settlement:</p>
                  <p className="mt-1">
                    An official Proforma &amp; Receipt reference is generated immediately upon submission so your finance team can settle via PesaLink or EFT.
                  </p>
                </div>
              )}

              {form.payment === "cash" && (
                <div className="rounded-2xl border border-cream-border bg-cream-surface p-4 text-xs text-brand-slate">
                  <p className="font-bold text-brand-dark">Pay Cash on Pickup or Delivery:</p>
                  <p className="mt-1">
                    Inspect and test your hardware in person before paying our technician or rider. Your order slip and printable receipt are issued immediately.
                  </p>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs">
              <h2 className="mb-3 text-base font-black text-brand-dark">
                4. Delivery / Setup Notes (optional)
              </h2>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special software requests, RAM installation request, or gate instructions..."
                className="w-full resize-none rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
              />
            </div>
          </div>

          {/* Right — Summary */}
          <div className="space-y-5">
            <div className="sticky top-24 rounded-3xl border border-cream-border bg-white p-6 shadow-sm space-y-5">
              <h2 className="text-base font-black text-brand-dark">Order Summary</h2>

              <ul className="space-y-3 max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-cream-border bg-cream-surface">
                      <img
                        src={item.image || "/images/pc-repair-workbench.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-bold text-brand-dark">{item.name}</p>
                      <p className="text-[11px] text-brand-muted">
                        KES {item.priceKes.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-bold font-mono text-brand-dark">
                      KES {(item.priceKes * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-cream-border pt-4 space-y-2">
                <div className="flex justify-between text-xs text-brand-muted">
                  <span>
                    Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                  </span>
                  <span className="font-mono font-bold text-brand-dark">
                    KES {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-brand-muted">
                  <span>Delivery Fee</span>
                  <span className="font-mono font-bold text-brand-dark">
                    {deliveryFee > 0 ? `KES ${deliveryFee.toLocaleString()}` : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-brand-muted">
                  <span>16% VAT (Included)</span>
                  <span className="font-mono">KES {estimatedVat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-cream-border pt-3">
                  <span className="text-sm font-black text-brand-dark">Total Payable</span>
                  <span className="text-xl font-black font-mono text-coral-dark">
                    KES {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !form.name || !form.phone}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-coral-brand py-4 text-sm font-black text-white shadow-md transition-all hover:bg-coral-hover disabled:cursor-not-allowed disabled:opacity-60 active:scale-98 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Confirming Payment &amp; Issuing Receipt...</span>
                  </>
                ) : (
                  <>
                    <Printer className="h-4 w-4" />
                    <span>
                      {form.payment === "mpesa" || form.payment === "card"
                        ? `Pay KES ${grandTotal.toLocaleString()} & Get Receipt`
                        : "Confirm Order & Get Receipt"}
                    </span>
                  </>
                )}
              </button>

              <div className="space-y-2 rounded-2xl bg-cream-surface p-4">
                {[
                  { icon: Printer, text: "Official printable receipt issued immediately" },
                  { icon: PackageSearch, text: "Live Order Tracking ID generated automatically" },
                  { icon: ShieldCheck, text: "Backed by Zollani Tech written hardware warranty" },
                  { icon: Phone, text: "Support desk: +254 768 551914" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[11px] text-brand-muted">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-teal-brand" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
