"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
} from "lucide-react";

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
    <div className="surface-grid bg-cream-bg min-h-screen py-12 sm:py-20">
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-28">
          <div>
            <p className="section-kicker text-coral-brand">Zollani service desk</p>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-7xl">Find the fix before you find the bill.</h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-cream-bg/75 sm:text-lg">From a cracked laptop screen to a business network that keeps dropping, start with the problem. We will help you identify the right service, the right next step, and the right technician.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#service-finder" className="rounded-full bg-coral-brand px-5 py-3 text-sm font-bold text-white hover:bg-coral-hover">Browse services</a><a href="/contact" className="rounded-full border border-cream-bg/30 px-5 py-3 text-sm font-bold text-cream-bg hover:border-coral-brand hover:text-coral-brand">Talk to a technician</a></div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-cream-bg/15 pt-5 text-sm"><div><p className="font-black text-coral-brand">01</p><p className="mt-1 text-cream-bg/65">Describe the issue</p></div><div><p className="font-black text-coral-brand">02</p><p className="mt-1 text-cream-bg/65">Choose a service</p></div><div><p className="font-black text-coral-brand">03</p><p className="mt-1 text-cream-bg/65">Book a technician</p></div></div>
          </div>
          <div className="image-frame relative min-h-[360px] overflow-hidden sm:min-h-[500px]"><Image src="/images/hardware-motherboard.jpg" alt="Technician repairing a motherboard" fill className="object-cover" priority /><div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-teal-deep/85 p-5 backdrop-blur"><p className="font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">Diagnostic first</p><p className="mt-2 text-lg font-black text-cream-bg">Clear answers before costly parts.</p></div></div>
        </div>
      </section>

      <section id="service-finder" className="surface-grid bg-cream-bg py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="max-w-2xl"><p className="section-kicker">Service finder</p><h2 className="mt-4 text-3xl font-black tracking-tight text-brand-dark sm:text-5xl">What needs attention?</h2><p className="mt-4 text-base leading-7 text-brand-muted">Choose the area closest to your issue. You can narrow the list further or open any service for the details.</p></div></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search & Filter Bar */}
        <div className="relative z-10 -mt-6 bg-cream-surface rounded-3xl p-4 sm:p-6 shadow-[0_18px_45px_rgba(16,47,48,0.12)] border border-cream-border mb-10 space-y-4">
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any service or symptom (e.g., 'screen replacement', 'liquid damage', 'cat6 cabling', 'SSD')..."
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
                  ? "bg-teal-brand text-white shadow-xs"
                  : "bg-cream-surface text-brand-slate hover:bg-cream-border/60"
              }`}
            >
              All Services ({SERVICE_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)})
            </button>

            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.iconName] || Wrench;
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-teal-brand text-white shadow-xs"
                      : "bg-cream-surface text-brand-slate hover:bg-cream-border/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title.replace(" Services", "")}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isSelected ? "bg-white/20 text-white" : "bg-black/5 text-brand-muted"
                  }`}>
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-brand-muted"><span className="h-2 w-2 rounded-full bg-coral-brand" /> Every service starts with a clear diagnosis and an honest recommendation.</div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-brand-muted mb-6 px-1">
          <span>
            Showing <strong>{filteredServices.length}</strong> available services
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-teal-brand hover:underline font-bold"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-cream-border max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-coral-light text-coral-brand flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark">No specific match found</h3>
            <p className="text-xs text-brand-muted">
              We fix almost any electronic issue. Message our technician directly with your device model.
            </p>
            <a
              href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20looking%20for%20a%20repair%20for%3A%20${encodeURIComponent(
                searchQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-coral-brand text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(({ categoryInfo, item }) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-3xl border border-cream-border bg-cream-surface p-6 shadow-[0_8px_25px_rgba(16,47,48,0.05)] transition-all hover:-translate-y-1 hover:border-teal-brand/40 hover:shadow-[0_18px_35px_rgba(16,47,48,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-brand bg-teal-subtle px-2.5 py-1 rounded-lg">
                      {categoryInfo.title.replace(" Services", "")}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-bold uppercase bg-coral-light text-coral-brand px-2 py-0.5 rounded-md">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-brand-dark mb-2 group-hover:text-teal-brand transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed mb-4 line-clamp-3">
                    {item.shortDesc}
                  </p>

                  {/* Typical Symptoms Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.typicalIssues.slice(0, 3).map((sym, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-cream-bg text-brand-slate px-2 py-0.5 rounded-md border border-cream-border/80"
                      >
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-cream-border flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-brand-muted">
                    <Clock className="w-3.5 h-3.5 text-teal-brand" />
                    <span>{item.turnaround}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="text-xs font-bold text-teal-brand hover:underline p-1"
                    >
                      Details
                    </button>

                    <a
                      href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(
                        item.name
                      )}%20service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Book</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="mt-16 overflow-hidden rounded-3xl bg-brand-dark p-8 text-cream-bg sm:p-12"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="section-kicker text-coral-brand">Still not sure?</p><h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Send us the symptoms. We will help you find the right service.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-cream-bg/70">You do not need to know the technical name of the fault. Tell us what the device is doing, and our team will guide you from there.</p></div><a href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20help%20identifying%20a%20device%20problem." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-brand px-6 py-3 text-sm font-bold text-white hover:bg-coral-hover"><MessageCircle className="h-4 w-4" />Ask a technician</a></div></section>

        {/* Modal / Detail Drawer for Service Item */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-cream-border relative space-y-5 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 text-brand-muted hover:text-brand-dark p-1.5 rounded-full hover:bg-cream-bg"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-brand bg-teal-subtle px-2.5 py-1 rounded-lg">
                  {activeModalItem.category.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-2">
                  {activeModalItem.name}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-brand-slate leading-relaxed">
                <p>{activeModalItem.fullDesc}</p>

                <div className="bg-cream-bg p-4 rounded-2xl border border-cream-border space-y-2">
                  <div className="font-bold text-xs uppercase text-brand-dark">
                    Typical Symptoms Addressed:
                  </div>
                  <ul className="space-y-1">
                    {activeModalItem.typicalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-brand-slate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-brand shrink-0" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-brand-muted pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-brand" />
                    Turnaround: <strong>{activeModalItem.turnaround}</strong>
                  </span>
                  <span>Free Diagnostic Evaluation</span>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-border flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20assistance%20with%20${encodeURIComponent(
                    activeModalItem.name
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Book on WhatsApp</span>
                </a>

                <a
                  href="tel:+254768551914"
                  className="flex items-center justify-center gap-2 bg-teal-brand hover:bg-teal-dark text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
