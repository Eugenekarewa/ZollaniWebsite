"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
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
} from "lucide-react";

type DeliveryMethod = "pickup" | "delivery";
type PaymentMethod = "mpesa" | "cash" | "bank";

interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  delivery: DeliveryMethod;
  address: string;
  payment: PaymentMethod;
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
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const deliveryFee = form.delivery === "delivery" ? 500 : 0;
  const grandTotal = totalPrice + deliveryFee;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setLoading(true);

    // Build a WhatsApp order summary and open it
    const ref = `ZT-${Date.now().toString(36).toUpperCase()}`;
    setOrderRef(ref);

    const itemLines = items
      .map((i) => `• ${i.name} × ${i.quantity} — KES ${(i.priceKes * i.quantity).toLocaleString()}`)
      .join("\n");

    const waMessage = encodeURIComponent(
      `🛒 *New Order — ${ref}*\n\n` +
      `*Customer:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      (form.email ? `*Email:* ${form.email}\n` : "") +
      `*Delivery:* ${form.delivery === "pickup" ? "Shop Pickup" : `Delivery to: ${form.address}`}\n` +
      `*Payment:* ${form.payment === "mpesa" ? "M-Pesa" : form.payment === "cash" ? "Cash on Delivery" : "Bank Transfer"}\n\n` +
      `*Items:*\n${itemLines}\n\n` +
      `*Subtotal:* KES ${totalPrice.toLocaleString()}\n` +
      (deliveryFee > 0 ? `*Delivery:* KES ${deliveryFee.toLocaleString()}\n` : "") +
      `*TOTAL:* KES ${grandTotal.toLocaleString()}\n` +
      (form.notes ? `\n*Notes:* ${form.notes}` : "")
    );

    // Open WhatsApp with the order
    window.open(`https://wa.me/254768551914?text=${waMessage}`, "_blank");

    // Simulate brief processing then show success
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    setLoading(false);
    setSubmitted(true);
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <ShoppingCart className="h-16 w-16 text-cream-border" />
        <h1 className="text-2xl font-black text-brand-dark">Your cart is empty</h1>
        <p className="text-sm text-brand-muted">Add some products before checking out.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-brand px-6 py-3 text-sm font-bold text-white hover:bg-teal-deep transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <div className="rounded-3xl border border-green-200 bg-green-50 p-10 shadow-sm">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-6 text-2xl font-black text-brand-dark">Order Sent! 🎉</h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            Your order <span className="font-mono font-bold text-teal-brand">{orderRef}</span> has been sent to our WhatsApp. Our team will confirm availability and payment details within <strong>15 minutes</strong>.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl bg-white p-5 text-left border border-green-100">
            <p className="text-xs font-black uppercase tracking-wider text-brand-muted">What happens next</p>
            {[
              "We confirm your item is in stock",
              "We send you M-Pesa payment instructions",
              "Your item is prepared and packaged",
              form.delivery === "delivery" ? "We arrange same-day delivery" : "You collect from our Nairobi shop",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-black text-white">
                  {i + 1}
                </span>
                <p className="text-xs text-brand-slate">{step}</p>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/254768551914"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-black text-white hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            Open WhatsApp Chat
          </a>
          <Link
            href="/shop"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-cream-border py-3.5 text-sm font-bold text-brand-slate hover:bg-cream-surface transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-teal-brand transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
        <h1 className="mt-3 text-3xl font-black text-brand-dark">Checkout</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Complete your order below. Our team will confirm within 15 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left — Form */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs space-y-5">
              <h2 className="text-base font-black text-brand-dark">Contact Details</h2>
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
                    WhatsApp / Phone Number *
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
                    Email Address (optional — for receipt)
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
              <h2 className="text-base font-black text-brand-dark">Delivery Method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { value: "pickup", icon: MapPin, label: "Shop Pickup", sub: "Free — collect in Nairobi" },
                  { value: "delivery", icon: Truck, label: "Home Delivery", sub: "KES 500 — same-day Nairobi" },
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
                    <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${form.delivery === value ? "text-teal-brand" : "text-brand-muted"}`} />
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
                    Delivery Address *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required={form.delivery === "delivery"}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Estate, Road, Nairobi"
                    className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-base font-black text-brand-dark">Payment Method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { value: "mpesa", label: "M-Pesa", sub: "Pay via M-Pesa STK Push" },
                  { value: "cash", label: "Cash", sub: "On delivery or at shop" },
                  { value: "bank", label: "Bank Transfer", sub: "For large orders" },
                ].map(({ value, label, sub }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-all ${
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
                    <span className={`text-sm font-bold ${form.payment === value ? "text-coral-dark" : "text-brand-dark"}`}>
                      {label}
                    </span>
                    <span className="text-xs text-brand-muted">{sub}</span>
                  </label>
                ))}
              </div>

              {form.payment === "mpesa" && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-xs text-green-800">
                  <p className="font-bold">How M-Pesa payment works:</p>
                  <p className="mt-1 leading-relaxed">After placing your order on WhatsApp, we will send you an M-Pesa STK Push request directly to your phone. Simply enter your PIN to confirm payment.</p>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs">
              <h2 className="mb-4 text-base font-black text-brand-dark">Order Notes (optional)</h2>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requests, preferred delivery time, or questions for our team..."
                className="w-full resize-none rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark placeholder-brand-muted focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand"
              />
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="space-y-5">
            <div className="sticky top-6 rounded-3xl border border-cream-border bg-white p-6 shadow-sm space-y-5">
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
                      <p className="text-[11px] text-brand-muted">× {item.quantity}</p>
                    </div>
                    <span className="shrink-0 text-xs font-bold font-mono text-brand-dark">
                      KES {(item.priceKes * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-cream-border pt-4 space-y-2">
                <div className="flex justify-between text-xs text-brand-muted">
                  <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                  <span className="font-mono font-bold text-brand-dark">KES {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-muted">
                  <span>Delivery</span>
                  <span className="font-mono font-bold text-brand-dark">
                    {deliveryFee > 0 ? `KES ${deliveryFee.toLocaleString()}` : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-cream-border pt-3">
                  <span className="text-sm font-black text-brand-dark">Total</span>
                  <span className="text-lg font-black font-mono text-coral-dark">
                    KES {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !form.name || !form.phone}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-coral-brand py-4 text-sm font-black text-white shadow-md transition-all hover:bg-coral-hover disabled:cursor-not-allowed disabled:opacity-60 active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 fill-white" />
                    Place Order via WhatsApp
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="space-y-2 rounded-2xl bg-cream-surface p-4">
                {[
                  { icon: ShieldCheck, text: "6-Month Hardware Warranty on all purchases" },
                  { icon: Phone, text: "15-min response from our team" },
                  { icon: CheckCircle2, text: "Verified, bench-tested products only" },
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
