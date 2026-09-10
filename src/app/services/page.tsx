"use client";

import React, { useState, useMemo } from "react";
import { PageHero } from "@/components/ui/PageHero";
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
    <div className="surface-grid bg-cream-bg min-h-screen py-10 sm:py-16">
      <PageHero
        eyebrow="The lab / What we fix"
        title="Find the right fix. Fast."
        description="Search our repair, recovery, security, networking, and business IT services — then talk directly to the team that will handle it."
        image="/images/hardware-motherboard.jpg"
        imageAlt="Technician repairing a motherboard"
        action={{ label: "Book a repair", href: "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20help%20with%20a%20repair." }}
        secondaryAction={{ label: "Contact us", href: "/contact" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-cream-border mb-10 space-y-4">
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
                className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-all flex flex-col justify-between group"
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
