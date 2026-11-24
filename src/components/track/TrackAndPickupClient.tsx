"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { TimelineStep } from "@/lib/commerce-store";
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Truck,
  PackageCheck,
  Phone,
  MessageCircle,
  Printer,
  MapPin,
  Loader2,
  AlertCircle,
  Bike,
  Building2,
  UserCheck,
  ArrowRight,
  Laptop,
} from "lucide-react";

interface TrackedOrder {
  orderNumber: string;
  receiptNumber: string;
  customerName: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: "paid" | "pending";
  orderStatus: string;
  items: { id: string; name: string; quantity: number; lineTotal: number; warranty: string }[];
  total: number;
  timeline: TimelineStep[];
  createdAt: string;
}

interface TrackedRepair {
  ticketNumber: string;
  customerName: string;
  serviceMode: "pickup" | "dropoff" | "onsite";
  pickupLocation: string;
  pickupWindow: string;
  deviceType: string;
  deviceModel: string;
  issueDescription: string;
  estimatedCost: string;
  repairStatus: string;
  technicianNotes: string;
  timeline: TimelineStep[];
  createdAt: string;
}

export function TrackAndPickupClient() {
  const [activeTab, setActiveTab] = useState<"track" | "pickup">("track");

  // Tracking state
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [repairs, setRepairs] = useState<TrackedRepair[]>([]);

  // Pickup booking state
  const [pickupForm, setPickupForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    serviceMode: "pickup" as "pickup" | "dropoff" | "onsite",
    pickupLocation: "",
    pickupWindow: "Today (Next Available Rider)",
    deviceType: "Laptop / MacBook",
    deviceModel: "",
    issueDescription: "",
  });
  const [submittingPickup, setSubmittingPickup] = useState(false);
  const [pickupError, setPickupError] = useState("");
  const [createdTicket, setCreatedTicket] = useState<TrackedRepair | null>(null);

  const runSearch = useCallback(async (searchText: string) => {
    const trimmed = searchText.trim();
    if (!trimmed) return;
    setSearching(true);
    setSearchError("");
    setHasSearched(true);

    try {
      const res = await fetch(`/api/track?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) {
        setSearchError(data.error || "Unable to look up tracking records.");
        setOrders([]);
        setRepairs([]);
      } else {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setRepairs(Array.isArray(data.repairs) ? data.repairs : []);
      }
    } catch {
      setSearchError("Network error while looking up status. Please try again.");
      setOrders([]);
      setRepairs([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code") || params.get("q");
    const tab = params.get("tab");
    if (tab === "pickup") {
      setActiveTab("pickup");
    }
    if (code) {
      setQuery(code);
      setActiveTab("track");
      void runSearch(code);
    }
  }, [runSearch]);

  async function handleTrackSubmit(e: React.FormEvent) {
    e.preventDefault();
    await runSearch(query);
  }

  async function handlePickupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPickupError("");
    setSubmittingPickup(true);

    try {
      const res = await fetch("/api/repairs/pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pickupForm),
      });
      const data = await res.json();
      if (!res.ok || !data.ticket) {
        setPickupError(data.error || "Could not create pickup request.");
      } else {
        setCreatedTicket(data.ticket as TrackedRepair);
      }
    } catch {
      setPickupError("Network error. You can also call +254 768 551914 directly for pickup.");
    } finally {
      setSubmittingPickup(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Call-In Fast Dispatch Card */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-brand-dark via-teal-deep to-brand-dark p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-coral-brand/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-coral-brand">
              <Bike className="h-3.5 w-3.5" />
              Nairobi Call-In Pickup &amp; Live Tracking Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Need Urgent Device Pickup or Want to Check a Delivery?
            </h2>
            <p className="text-xs sm:text-sm text-cream-bg/85 leading-relaxed">
              Call our dispatch desk directly for same-day Nairobi rider collection (CBD, Westlands, Kilimani, Upper Hill, Karen, Lavington, Thika Rd &amp; Mombasa Rd) or book your pickup ticket below.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+254768551914"
              className="inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-5 py-3.5 text-xs font-black text-white shadow-md hover:bg-coral-hover transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call +254 768 551914
            </a>
            <a
              href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20request%20a%20device%20pickup%20for%20repair%20in%20Nairobi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-xs font-black text-white shadow-md hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              WhatsApp Pickup Pin
            </a>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("track")}
          className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === "track"
              ? "bg-teal-deep text-white shadow-md"
              : "border border-cream-border bg-white text-brand-dark hover:border-teal-brand"
          }`}
        >
          <Search className="h-4 w-4" />
          <span>Track Product Order or Repair</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pickup")}
          className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === "pickup"
              ? "bg-coral-brand text-white shadow-md"
              : "border border-cream-border bg-white text-brand-dark hover:border-coral-brand"
          }`}
        >
          <Truck className="h-4 w-4" />
          <span>Schedule Device Pickup &amp; Repair</span>
        </button>
      </div>

      {/* TAB 1: UNIFIED TRACKING */}
      {activeTab === "track" && (
        <div className="space-y-8">
          <div className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-brand-dark">
              Live Order, Receipt &amp; Repair Status Lookup
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-brand-muted">
              Enter your Order ID (e.g. <strong>ZT-ORD-1042</strong>), Receipt ID, Repair Ticket ID (e.g. <strong>ZT-8421</strong>), or phone number.
            </p>

            <form onSubmit={handleTrackSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Order ID, Repair Ticket, Receipt #, or Phone (e.g. 0712345678)"
                  className="w-full rounded-2xl border border-cream-border bg-cream-surface py-3.5 pl-11 pr-4 text-sm font-medium text-brand-dark focus:border-teal-brand focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={searching || !query.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-brand px-7 py-3.5 text-sm font-black text-white shadow-sm hover:bg-teal-deep disabled:opacity-60 cursor-pointer"
              >
                {searching ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>Track Status</>
                )}
              </button>
            </form>

            {/* Quick Sample Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-brand-muted">Try live sample:</span>
              <button
                type="button"
                onClick={() => {
                  setQuery("ZT-ORD-1042");
                  void runSearch("ZT-ORD-1042");
                }}
                className="rounded-lg border border-cream-border bg-cream-surface px-3 py-1 font-mono font-bold text-teal-brand hover:border-teal-brand cursor-pointer"
              >
                Product Order: ZT-ORD-1042
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery("ZT-8421");
                  void runSearch("ZT-8421");
                }}
                className="rounded-lg border border-cream-border bg-cream-surface px-3 py-1 font-mono font-bold text-coral-dark hover:border-coral-brand cursor-pointer"
              >
                Repair Ticket: ZT-8421
              </button>
            </div>
          </div>

          {searchError && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {hasSearched && !searching && !searchError && orders.length === 0 && repairs.length === 0 && (
            <div className="rounded-3xl border border-cream-border bg-white p-10 text-center shadow-xs">
              <PackageCheck className="mx-auto h-12 w-12 text-brand-muted" />
              <h4 className="mt-3 text-lg font-black text-brand-dark">No matching records found</h4>
              <p className="mx-auto mt-1 max-w-md text-xs text-brand-muted">
                Double-check your Order ID, Repair Ticket ID, or phone number, or call our dispatch desk on{" "}
                <strong>+254 768 551914</strong> for immediate assistance.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("pickup")}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-5 py-3 text-xs font-black text-white hover:bg-coral-hover cursor-pointer"
              >
                Book a New Device Pickup
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Matched Product Orders */}
          {orders.map((ord) => (
            <div
              key={ord.orderNumber}
              className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cream-border pb-5">
                <div>
                  <span className="inline-block rounded-lg bg-teal-subtle px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-teal-brand">
                    Hardware Order · {ord.deliveryMethod === "delivery" ? "Nairobi Delivery" : "Shop Pickup"}
                  </span>
                  <h4 className="mt-2 font-mono text-xl font-black text-brand-dark">
                    {ord.orderNumber}
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Customer: <strong className="text-brand-dark">{ord.customerName}</strong> · Receipt:{" "}
                    <span className="font-mono font-bold">{ord.receiptNumber}</span>
                  </p>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Destination: {ord.deliveryAddress}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-black uppercase ${
                      ord.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {ord.paymentStatus === "paid" ? "PAID" : "PENDING PAYMENT"} · {ord.orderStatus}
                  </span>
                  <Link
                    href={`/receipt/${encodeURIComponent(ord.orderNumber)}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-dark px-4 py-2 text-xs font-black text-white hover:bg-teal-deep"
                  >
                    <Printer className="h-3.5 w-3.5 text-coral-brand" />
                    Print Receipt
                  </Link>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-2xl border border-cream-border bg-cream-surface p-4 space-y-2">
                <p className="text-[11px] font-black uppercase tracking-wider text-brand-muted">
                  Order Items (Total: KES {ord.total.toLocaleString()})
                </p>
                {ord.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs text-brand-dark"
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

              {/* Timeline */}
              <div className="space-y-4 relative pl-7 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-border">
                {ord.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                        step.status === "completed"
                          ? "bg-teal-brand text-white"
                          : step.status === "active"
                          ? "bg-coral-brand text-white animate-pulse"
                          : "bg-cream-border text-brand-muted"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : step.status === "active" ? (
                        <Truck className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-brand-dark">{step.title}</span>
                      <span className="font-mono text-[11px] text-brand-muted">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-brand-muted">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Matched Repair Tickets */}
          {repairs.map((rep) => (
            <div
              key={rep.ticketNumber}
              className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cream-border pb-5">
                <div>
                  <span className="inline-block rounded-lg bg-coral-brand/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-coral-dark">
                    Repair Service ·{" "}
                    {rep.serviceMode === "pickup"
                      ? "Rider Pickup"
                      : rep.serviceMode === "onsite"
                      ? "On-Site Technician"
                      : "Workshop Drop-Off"}
                  </span>
                  <h4 className="mt-2 font-mono text-xl font-black text-brand-dark">
                    {rep.ticketNumber} — {rep.deviceModel || rep.deviceType}
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Customer: <strong className="text-brand-dark">{rep.customerName}</strong> · Location:{" "}
                    {rep.pickupLocation} ({rep.pickupWindow})
                  </p>
                  <p className="text-xs text-brand-slate mt-1">
                    <strong>Reported Issue:</strong> {rep.issueDescription}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-black uppercase text-amber-800">
                    {rep.repairStatus.replace(/_/g, " ")}
                  </span>
                  <span className="text-[11px] font-bold text-teal-brand">
                    Est. {rep.estimatedCost}
                  </span>
                </div>
              </div>

              {rep.technicianNotes && (
                <div className="rounded-2xl border border-teal-brand/20 bg-teal-subtle/50 p-4 text-xs text-brand-dark">
                  <strong className="font-black text-teal-brand">Technician Note: </strong>
                  {rep.technicianNotes}
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-4 relative pl-7 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-border">
                {rep.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                        step.status === "completed"
                          ? "bg-teal-brand text-white"
                          : step.status === "active"
                          ? "bg-coral-brand text-white animate-pulse"
                          : "bg-cream-border text-brand-muted"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : step.status === "active" ? (
                        <Wrench className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-brand-dark">{step.title}</span>
                      <span className="font-mono text-[11px] text-brand-muted">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-brand-muted">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream-border pt-4">
                <span className="text-xs text-brand-muted">
                  Want to speak directly with your assigned technician?
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:+254768551914"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-cream-border px-4 py-2 text-xs font-bold text-brand-dark hover:border-teal-brand"
                  >
                    <Phone className="h-3.5 w-3.5 text-teal-brand" />
                    Call Lab
                  </a>
                  <a
                    href={`https://wa.me/254768551914?text=${encodeURIComponent(
                      `Hello Zollani Tech, I am checking progress for repair ticket ${rep.ticketNumber} (${rep.deviceModel}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-white" />
                    WhatsApp Lab
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SCHEDULE DEVICE PICKUP & REPAIR */}
      {activeTab === "pickup" && (
        <div>
          {createdTicket ? (
            <div className="rounded-3xl border border-green-200 bg-white p-8 sm:p-10 shadow-md max-w-2xl mx-auto text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="mt-4 inline-block rounded-lg bg-teal-subtle px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal-brand">
                Pickup &amp; Repair Ticket Confirmed
              </span>
              <h3 className="mt-3 text-2xl font-black text-brand-dark">
                Ticket Issued: <span className="font-mono text-coral-dark">{createdTicket.ticketNumber}</span>
              </h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                Our dispatch team has logged your <strong>{createdTicket.deviceModel}</strong> ({createdTicket.pickupWindow}). Save your Ticket ID to track live repair progress.
              </p>

              <div className="mt-6 rounded-2xl border border-cream-border bg-cream-surface p-5 text-left text-xs space-y-2">
                <p>
                  <strong>Customer:</strong> {createdTicket.customerName} ({pickupForm.customerPhone})
                </p>
                <p>
                  <strong>Service Mode:</strong> {createdTicket.serviceMode.toUpperCase()} — {createdTicket.pickupLocation}
                </p>
                <p>
                  <strong>Issue:</strong> {createdTicket.issueDescription}
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuery(createdTicket.ticketNumber);
                    setActiveTab("track");
                    void runSearch(createdTicket.ticketNumber);
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-teal-brand py-3.5 px-5 text-xs font-black text-white hover:bg-teal-deep cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  Track {createdTicket.ticketNumber} Live
                </button>
                <a
                  href={`https://wa.me/254768551914?text=${encodeURIComponent(
                    `Hello Zollani Tech, here is my repair pickup ticket ${createdTicket.ticketNumber} for ${createdTicket.deviceModel} at ${createdTicket.pickupLocation}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 px-5 text-xs font-black text-white hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  Send Pickup Location Pin
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCreatedTicket(null);
                  setPickupForm((prev) => ({
                    ...prev,
                    deviceModel: "",
                    issueDescription: "",
                  }));
                }}
                className="mt-4 text-xs font-bold text-brand-muted hover:text-brand-dark underline cursor-pointer"
              >
                Book another device pickup
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
              <form
                onSubmit={handlePickupSubmit}
                className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 shadow-sm space-y-6"
              >
                <div>
                  <h3 className="text-xl font-black text-brand-dark">
                    Book Device Pickup or On-Site Repair
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-brand-muted">
                    Schedule a vetted Zollani rider to pick up your laptop, desktop, or console anywhere in Nairobi—free quick diagnostics &amp; No Fix, No Fee.
                  </p>
                </div>

                {pickupError && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-700"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{pickupError}</span>
                  </div>
                )}

                {/* Service Mode */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-muted">
                    Choose How We Collect or Service Your Device
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      {
                        value: "pickup",
                        label: "Rider Pickup",
                        sub: "We collect & return in Nairobi",
                        icon: Bike,
                      },
                      {
                        value: "onsite",
                        label: "On-Site Visit",
                        sub: "Technician comes to office/home",
                        icon: UserCheck,
                      },
                      {
                        value: "dropoff",
                        label: "Workshop Drop-Off",
                        sub: "Bring to Nairobi Lab",
                        icon: Building2,
                      },
                    ].map(({ value, label, sub, icon: Icon }) => (
                      <label
                        key={value}
                        className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-all ${
                          pickupForm.serviceMode === value
                            ? "border-coral-brand bg-coral-brand/5 ring-1 ring-coral-brand"
                            : "border-cream-border hover:border-coral-brand/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceMode"
                          value={value}
                          checked={pickupForm.serviceMode === value}
                          onChange={(e) =>
                            setPickupForm((p) => ({
                              ...p,
                              serviceMode: e.target.value as "pickup" | "dropoff" | "onsite",
                            }))
                          }
                          className="sr-only"
                        />
                        <Icon
                          className={`h-4 w-4 ${
                            pickupForm.serviceMode === value
                              ? "text-coral-dark"
                              : "text-brand-muted"
                          }`}
                        />
                        <span className="text-xs font-black text-brand-dark">{label}</span>
                        <span className="text-[11px] text-brand-muted">{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={pickupForm.customerName}
                      onChange={(e) =>
                        setPickupForm((p) => ({ ...p, customerName: e.target.value }))
                      }
                      placeholder="e.g. Grace Muthoni"
                      className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark focus:border-teal-brand focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={pickupForm.customerPhone}
                      onChange={(e) =>
                        setPickupForm((p) => ({ ...p, customerPhone: e.target.value }))
                      }
                      placeholder="+254 7XX XXX XXX"
                      className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark focus:border-teal-brand focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pickup Location & Time */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {pickupForm.serviceMode !== "dropoff" && (
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                        Nairobi Pickup Address / Estate *
                      </label>
                      <input
                        type="text"
                        required
                        value={pickupForm.pickupLocation}
                        onChange={(e) =>
                          setPickupForm((p) => ({ ...p, pickupLocation: e.target.value }))
                        }
                        placeholder="e.g. Westlands, Mpaka Rd, Office 3A"
                        className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark focus:border-teal-brand focus:outline-none"
                      />
                    </div>
                  )}

                  <div className={pickupForm.serviceMode === "dropoff" ? "sm:col-span-2" : ""}>
                    <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                      Preferred Time Window
                    </label>
                    <select
                      value={pickupForm.pickupWindow}
                      onChange={(e) =>
                        setPickupForm((p) => ({ ...p, pickupWindow: e.target.value }))
                      }
                      className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm font-medium text-brand-dark focus:border-teal-brand focus:outline-none"
                    >
                      <option value="Today (Next Available Rider)">Today (Next Available Rider)</option>
                      <option value="Today Morning (8AM - 12PM)">Today Morning (8AM - 12PM)</option>
                      <option value="Today Afternoon (12PM - 5PM)">Today Afternoon (12PM - 5PM)</option>
                      <option value="Tomorrow Morning (9AM - 12PM)">Tomorrow Morning (9AM - 12PM)</option>
                      <option value="Emergency On-Call Dispatch">Emergency On-Call Dispatch</option>
                    </select>
                  </div>
                </div>

                {/* Device & Fault */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                      Device Type *
                    </label>
                    <select
                      value={pickupForm.deviceType}
                      onChange={(e) =>
                        setPickupForm((p) => ({ ...p, deviceType: e.target.value }))
                      }
                      className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm font-medium text-brand-dark focus:border-teal-brand focus:outline-none"
                    >
                      <option value="Laptop / MacBook">Laptop / MacBook</option>
                      <option value="Desktop PC / Workstation">Desktop PC / Workstation</option>
                      <option value="PS5 / Xbox Console">PS5 / Xbox Console</option>
                      <option value="Monitor / All-in-One">Monitor / All-in-One</option>
                      <option value="Hard Drive / SSD Data Recovery">Hard Drive / SSD Data Recovery</option>
                      <option value="Office Network / Printer">Office Network / Printer</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                      Brand &amp; Model (if known)
                    </label>
                    <input
                      type="text"
                      value={pickupForm.deviceModel}
                      onChange={(e) =>
                        setPickupForm((p) => ({ ...p, deviceModel: e.target.value }))
                      }
                      placeholder="e.g. HP EliteBook 840 G6 / MacBook Air M1"
                      className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark focus:border-teal-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-brand-dark">
                    Describe the Fault or Service Needed *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={pickupForm.issueDescription}
                    onChange={(e) =>
                      setPickupForm((p) => ({ ...p, issueDescription: e.target.value }))
                    }
                    placeholder="e.g. Cracked screen, won't power on after spill, overheating, needs SSD/RAM upgrade..."
                    className="w-full resize-none rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm text-brand-dark focus:border-teal-brand focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingPickup}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-coral-brand py-4 text-sm font-black text-white shadow-md hover:bg-coral-hover disabled:opacity-60 cursor-pointer"
                >
                  {submittingPickup ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating Pickup Ticket...
                    </>
                  ) : (
                    <>
                      <Laptop className="h-4 w-4" />
                      Confirm Pickup &amp; Generate Repair Ticket
                    </>
                  )}
                </button>
              </form>

              {/* Right Sidebar */}
              <div className="space-y-5">
                <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs space-y-4">
                  <h4 className="text-base font-black text-brand-dark">
                    Prefer to Call In Directly?
                  </h4>
                  <p className="text-xs leading-relaxed text-brand-muted">
                    Speak directly with a technician or dispatch coordinator. We log your pickup ticket by phone and send your tracking code immediately via SMS/WhatsApp.
                  </p>
                  <a
                    href="tel:+254768551914"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-deep py-3.5 text-xs font-black text-white hover:bg-teal-brand transition-colors"
                  >
                    <Phone className="h-4 w-4 text-coral-brand" />
                    Call +254 768 551914
                  </a>
                  <div className="space-y-2 border-t border-cream-border pt-4 text-xs text-brand-slate">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-teal-brand mt-0.5" />
                      <span>Pickup Coverage: CBD, Westlands, Kilimani, Kileleshwa, Lavington, Upper Hill, Karen, South B/C, Thika Rd.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-teal-brand mt-0.5" />
                      <span>Mon – Sat: 8:00 AM – 7:00 PM · Sunday: Emergency On-Call</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
