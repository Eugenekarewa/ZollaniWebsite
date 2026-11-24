"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  X,
  MessageCircle,
  Truck,
  Printer,
  Loader2,
  Phone,
  ArrowRight,
} from "lucide-react";
import type { TimelineStep } from "@/lib/commerce-store";

interface RepairTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalOrder {
  orderNumber: string;
  receiptNumber: string;
  customerName: string;
  orderStatus: string;
  paymentStatus: string;
  total: number;
  timeline: TimelineStep[];
}

interface ModalRepair {
  ticketNumber: string;
  customerName: string;
  deviceModel: string;
  repairStatus: string;
  technicianNotes: string;
  timeline: TimelineStep[];
}

export const RepairTrackerModal: React.FC<RepairTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [ticketQuery, setTicketQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [orders, setOrders] = useState<ModalOrder[]>([]);
  const [repairs, setRepairs] = useState<ModalRepair[]>([]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const runLookup = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const res = await fetch(`/api/track?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to find record.");
        setOrders([]);
        setRepairs([]);
      } else {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setRepairs(Array.isArray(data.repairs) ? data.repairs : []);
      }
    } catch {
      setError("Network error checking status.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await runLookup(ticketQuery);
  };

  const activeRepair = repairs[0];
  const activeOrder = orders[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-cream-border relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-brand-muted hover:text-brand-dark p-1.5 rounded-full hover:bg-cream-bg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 bg-teal-subtle text-teal-brand px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            Live Repair &amp; Order Tracking
          </div>
          <h3 className="text-2xl font-black text-brand-dark tracking-tight">
            Track Repair or Product Order
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            Enter a Repair Ticket (e.g. <strong>ZT-8421</strong>), Order ID (e.g.{" "}
            <strong>ZT-ORD-1042</strong>), or your phone number.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ticketQuery}
              onChange={(e) => {
                setTicketQuery(e.target.value);
                setHasSearched(false);
              }}
              placeholder="e.g. ZT-8421, ZT-ORD-1042, or 0768551914"
              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-cream-border focus:border-teal-brand outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-brand hover:bg-teal-dark text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            <span>Track</span>
          </button>
        </form>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
            {error}
          </p>
        )}

        {hasSearched && !loading ? (
          activeRepair ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-cream-surface rounded-2xl p-4 border border-cream-border flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-brand-muted block">
                    Repair Ticket: {activeRepair.deviceModel}
                  </span>
                  <span className="text-sm font-black text-brand-dark font-mono">
                    {activeRepair.ticketNumber}
                  </span>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase">
                  {activeRepair.repairStatus.replace(/_/g, " ")}
                </span>
              </div>

              <div className="space-y-3.5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-border">
                {activeRepair.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-teal-brand text-white"
                          : step.status === "active"
                          ? "bg-coral-brand text-white animate-pulse"
                          : "bg-cream-border text-brand-muted"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : step.status === "active" ? (
                        <Wrench className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="font-bold text-brand-dark">{step.title}</span>
                      <span className="text-[10px] font-mono text-brand-muted shrink-0">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-0.5">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-cream-border flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/track?code=${encodeURIComponent(activeRepair.ticketNumber)}`}
                  onClick={onClose}
                  className="text-xs font-bold text-teal-brand hover:underline"
                >
                  Open Full Tracking View
                </Link>
                <a
                  href={`https://wa.me/254768551914?text=${encodeURIComponent(
                    `Hello Zollani Tech, I am checking status for repair ticket ${activeRepair.ticketNumber}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-coral-brand hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Escalate on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : activeOrder ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-cream-surface rounded-2xl p-4 border border-cream-border flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-brand-muted block">
                    Product Order · KES {activeOrder.total.toLocaleString()}
                  </span>
                  <span className="text-sm font-black text-brand-dark font-mono">
                    {activeOrder.orderNumber}
                  </span>
                </div>
                <span className="bg-teal-subtle text-teal-brand text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase">
                  {activeOrder.orderStatus}
                </span>
              </div>

              <div className="space-y-3.5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-border">
                {activeOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-teal-brand text-white"
                          : step.status === "active"
                          ? "bg-coral-brand text-white animate-pulse"
                          : "bg-cream-border text-brand-muted"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : step.status === "active" ? (
                        <Truck className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="font-bold text-brand-dark">{step.title}</span>
                      <span className="text-[10px] font-mono text-brand-muted shrink-0">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-0.5">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-cream-border flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/receipt/${encodeURIComponent(activeOrder.orderNumber)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-dark px-3.5 py-2 text-xs font-bold text-white hover:bg-teal-deep"
                >
                  <Printer className="w-3.5 h-3.5 text-coral-brand" />
                  Print Receipt
                </Link>
                <Link
                  href={`/track?code=${encodeURIComponent(activeOrder.orderNumber)}`}
                  onClick={onClose}
                  className="text-xs font-bold text-teal-brand hover:underline"
                >
                  Full Order Details →
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-cream-bg rounded-2xl p-6 text-center border border-cream-border text-xs text-brand-muted space-y-3">
              <p>No record found for &ldquo;{ticketQuery}&rdquo;. Check your ID or call +254 768 551914.</p>
              <Link
                href="/track?tab=pickup"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 font-bold text-coral-dark hover:underline"
              >
                Need to schedule a new device pickup? <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )
        ) : (
          <div className="bg-cream-bg rounded-2xl p-5 text-center border border-cream-border text-xs text-brand-muted space-y-3">
            <p>Find your Ticket ID on your intake slip, or use your Order / Receipt number.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTicketQuery("ZT-8421");
                  void runLookup("ZT-8421");
                }}
                className="rounded-lg bg-white border border-cream-border px-2.5 py-1 text-[11px] font-mono font-bold text-brand-dark hover:border-teal-brand cursor-pointer"
              >
                Demo Repair: ZT-8421
              </button>
              <button
                type="button"
                onClick={() => {
                  setTicketQuery("ZT-ORD-1042");
                  void runLookup("ZT-ORD-1042");
                }}
                className="rounded-lg bg-white border border-cream-border px-2.5 py-1 text-[11px] font-mono font-bold text-brand-dark hover:border-teal-brand cursor-pointer"
              >
                Demo Order: ZT-ORD-1042
              </button>
            </div>
            <div className="pt-2 border-t border-cream-border flex flex-wrap justify-center gap-4 text-[11px]">
              <Link
                href="/track?tab=pickup"
                onClick={onClose}
                className="font-bold text-coral-dark hover:underline"
              >
                Schedule Device Pickup →
              </Link>
              <a
                href="tel:+254768551914"
                className="inline-flex items-center gap-1 font-bold text-teal-brand hover:underline"
              >
                <Phone className="w-3 h-3" /> Call Dispatch
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
