"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SERVICE_CATEGORIES,
  ServiceCategoryKey,
  ServiceItem,
} from "@/data/servicesData";
import {
  Search,
  Wrench,
  Cpu,
  ShieldCheck,
  HardDrive,
  Network,
  Building2,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  MessageCircle,
  X,
  ArrowRight,
  Phone,
  Calculator,
  Laptop,
} from "lucide-react";
import { QuoteCalculator } from "@/components/interactive/QuoteCalculator";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryKey | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalItem, setActiveModalItem] = useState<ServiceItem | null>(null);

  const iconMap: Record<string, any> = {
    Wrench,
    Cpu,
    ShieldCheck,
    HardDrive,
    Network,
    Building2,
    Layers,
    Sparkles,
    MapPin,
  };

  // Filter items based on category and search query
  const filteredServices = useMemo(() => {
    let list: { categoryInfo: any; item: ServiceItem }[] = [];

    SERVICE_CATEGORIES.forEach((cat) => {
      if (selectedCategory === "all" || selectedCategory === cat.key) {
        cat.items.forEach((item) => {
          if (!searchQuery.trim()) {
            list.push({ categoryInfo: cat, item });
          } else {
            const q = searchQuery.toLowerCase();
            const matchesName = item.name.toLowerCase().includes(q);
            const matchesDesc = item.shortDesc.toLowerCase().includes(q) || item.fullDesc.toLowerCase().includes(q);
            const matchesIssues = item.typicalIssues.some((issue) => issue.toLowerCase().includes(q));
            if (matchesName || matchesDesc || matchesIssues) {
              list.push({ categoryInfo: cat, item });
            }
          }
        });
      }
    });

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="surface-grid bg-cream-bg min-h-screen pb-12 sm:pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-28">
          <div>
            <p className="section-kicker text-coral-brand">Zollani Repair &amp; Electronics Lab</p>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Precision Repairs for Computers &amp; Electronics.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream-bg/80 sm:text-lg">
              From cracked laptop screens and swollen batteries to component-level micro-soldering, gaming console HDMI repairs, and hard drive data recovery. Honest diagnostics with quotes given before any work begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#estimator"
                className="rounded-full bg-coral-brand px-6 py-3.5 text-xs font-black text-white hover:bg-coral-hover transition-transform hover:-translate-y-0.5"
              >
                Instant Repair Estimator
              </a>
              <a
                href="#service-finder"
                className="rounded-full border border-cream-bg/30 px-6 py-3.5 text-xs font-bold text-cream-bg hover:border-coral-brand hover:text-coral-brand transition-colors"
              >
                Browse All Services
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-cream-bg/15 pt-5 text-xs sm:text-sm">
              <div>
                <p className="font-black text-coral-brand">01</p>
                <p className="mt-1 text-cream-bg/70">Free Diagnostics</p>
              </div>
              <div>
                <p className="font-black text-coral-brand">02</p>
                <p className="mt-1 text-cream-bg/70">Upfront Fixed Quote</p>
              </div>
              <div>
                <p className="font-black text-coral-brand">03</p>
                <p className="mt-1 text-cream-bg/70">6-Month Warranty</p>
              </div>
            </div>
          </div>
          <div className="image-frame relative min-h-[360px] overflow-hidden rounded-3xl sm:min-h-[480px]">
            <Image
              src="/images/hardware-motherboard.jpg"
              alt="Technician repairing a motherboard under a microscope"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-teal-deep/85 p-5 backdrop-blur-md">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">
                Board-Level Soldering
              </p>
              <p className="mt-1 text-lg font-black text-cream-bg">
                Repairing the microchip instead of buying a whole new board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INSTANT ESTIMATOR */}
      <section id="estimator" className="border-b border-cream-border bg-cream-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <span className="section-kicker mb-2">Cost &amp; Turnaround Calculator</span>
            <h2 className="text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">
              Get an Immediate Estimate for Your Device
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-brand-muted">
              Choose your device type and issue to view standard turnaround times and price brackets.
            </p>
          </div>
          <QuoteCalculator />
        </div>
      </section>

      {/* SECTION 3: FULL SERVICE DIRECTORY */}
      <section id="service-finder" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-kicker">Service Directory</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">
              Explore Our Comprehensive Repair Capabilities
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-brand-muted">
              Search by symptom, part, or brand to find specific technical services delivered in our Nairobi workshop.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="relative z-10 -mt-6 bg-cream-surface rounded-3xl p-4 sm:p-6 shadow-[0_18px_45px_rgba(16,47,48,0.12)] border border-cream-border mb-10 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any service or symptom (e.g. 'cracked screen', 'PS5 HDMI', 'liquid damage', 'motherboard', 'SSD upgrade')..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-cream-bg/60 border border-cream-border text-sm text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-teal-deep text-white shadow-xs"
                  : "bg-cream-surface text-brand-slate hover:bg-cream-border/60 border border-cream-border"
              }`}
            >
              All Services ({SERVICE_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)})
            </button>

            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-teal-deep text-white shadow-xs"
                      : "bg-cream-surface text-brand-slate hover:bg-cream-border/60 border border-cream-border"
                  }`}
                >
                  {cat.title} ({cat.items.length})
                </button>
              );
            })}
          </div>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(({ categoryInfo, item }) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-3xl border border-cream-border bg-white p-6 shadow-xs hover:border-teal-brand hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-brand bg-teal-subtle px-2.5 py-1 rounded-lg">
                    {categoryInfo.title}
                  </span>
                  {item.popular && (
                    <span className="text-[10px] font-black uppercase text-coral-dark bg-coral-light px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-brand-dark group-hover:text-teal-brand transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-muted line-clamp-2">
                  {item.shortDesc}
                </p>

                <div className="mt-4 space-y-1.5 border-t border-cream-border/70 pt-3">
                  {item.typicalIssues.slice(0, 3).map((issue, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-brand-slate">
                      <CheckCircle2 className="w-3 h-3 text-teal-brand shrink-0" />
                      <span className="truncate">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-cream-border flex items-center justify-between text-xs">
                <span className="text-brand-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-brand" />
                  {item.turnaround}
                </span>
                <span className="font-bold text-teal-brand flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View fix details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 space-y-5">
              <div className="flex items-start justify-between border-b border-cream-border pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-brand bg-teal-subtle px-2.5 py-1 rounded-lg">
                    {activeModalItem.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-2">
                    {activeModalItem.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="rounded-full p-1 text-brand-muted hover:bg-cream-bg hover:text-brand-dark"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-brand-slate leading-relaxed">
                <p>{activeModalItem.fullDesc}</p>

                <div className="rounded-2xl border border-cream-border bg-cream-surface p-4 space-y-2">
                  <p className="font-bold text-xs uppercase tracking-wider text-brand-dark">
                    Typical Symptoms Addressed:
                  </p>
                  <ul className="space-y-1.5">
                    {activeModalItem.typicalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-brand-slate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-brand shrink-0" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-brand-muted border-t border-cream-border pt-3">
                  <span className="flex items-center gap-1.5 font-bold text-brand-dark">
                    <Clock className="w-4 h-4 text-teal-brand" />
                    Turnaround: {activeModalItem.turnaround}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    ✓ 6-Month Written Warranty Included
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-border flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20assistance%20with%20${encodeURIComponent(
                    activeModalItem.name
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 text-xs font-black shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Book This Repair on WhatsApp</span>
                </a>

                <a
                  href="tel:+254768551914"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-cream-border bg-cream-surface hover:bg-cream-border px-5 py-3.5 text-xs font-bold text-brand-dark"
                >
                  <Phone className="w-4 h-4 text-teal-brand" />
                  <span>Call Us Directly</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
