"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  AlertCircle,
  X,
  MessageCircle,
  ShieldCheck,
  Cpu,
  PackageCheck,
} from "lucide-react";

interface RepairTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RepairTrackerModal: React.FC<RepairTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [ticketQuery, setTicketQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    setHasSearched(true);
  };

  const steps = [
    {
      title: "Intake & Physical Inspection",
      date: "Day 1 - 09:30 AM",
      desc: "Device serial logged, surface inspection, and diagnostic intake completed.",
      status: "completed",
      icon: CheckCircle2,
    },
    {
      title: "Component & Schematic Tracing",
      date: "Day 1 - 02:15 PM",
      desc: "Power rails inspected with multimeter. Isolated faulty 19V MOSFET regulator.",
      status: "completed",
      icon: CheckCircle2,
    },
    {
      title: "Micro-Soldering & Part Installation",
      date: "In Progress",
      desc: "Precision micro-soldering replacement of shorted regulator and thermal paste repaste.",
      status: "active",
      icon: Wrench,
    },
    {
      title: "Bench Stress-Testing & QA",
      date: "Pending",
      desc: "6-hour thermal benchmark run to verify system stability under load.",
      status: "pending",
      icon: Cpu,
    },
    {
      title: "Ready for Pickup or Delivery",
      date: "Pending",
      desc: "Customer notification SMS dispatched and warranty certificate printed.",
      status: "pending",
      icon: PackageCheck,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-cream-border relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-brand-muted hover:text-brand-dark p-1.5 rounded-full hover:bg-cream-bg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-teal-subtle text-teal-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            Live Repair Tracking
          </div>
          <h3 className="text-2xl font-black text-brand-dark tracking-tight">
            Track Device Repair Status
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            Enter your 6-digit Ticket ID (e.g., ZT-8421) or the phone number used during intake.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ticketQuery}
              onChange={(e) => {
                setTicketQuery(e.target.value);
                setHasSearched(false);
              }}
              placeholder="e.g. ZT-8421 or 0768551914"
              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-cream-border focus:border-teal-brand outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-brand hover:bg-teal-dark text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
          >
            Track
          </button>
        </form>

        {/* Results Timeline */}
        {hasSearched ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-cream-surface rounded-2xl p-4 border border-cream-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-muted block">
                  Active Ticket:
                </span>
                <span className="text-sm font-black text-brand-dark font-mono">
                  {ticketQuery.toUpperCase()}
                </span>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                In Progress
              </span>
            </div>

            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-border">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isComplete = step.status === "completed";
                const isActive = step.status === "active";

                return (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isComplete
                          ? "bg-teal-brand text-white"
                          : isActive
                          ? "bg-coral-brand text-white animate-pulse"
                          : "bg-cream-border text-brand-muted"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-dark">
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-brand-muted">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-muted mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-cream-border flex items-center justify-between">
              <span className="text-[11px] text-brand-muted">
                Need urgent update?
              </span>
              <a
                href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20checking%20status%20for%20repair%20ticket%20${encodeURIComponent(
                  ticketQuery
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-coral-brand hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Escalate on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-cream-bg rounded-2xl p-6 text-center border border-cream-border text-xs text-brand-muted space-y-1">
            <p>You can find your Ticket ID on your intake receipt or SMS notification.</p>
            <p className="text-[11px]">Demo search: type <strong>ZT-8421</strong> to test live tracking.</p>
          </div>
        )}
      </div>
    </div>
  );
};
