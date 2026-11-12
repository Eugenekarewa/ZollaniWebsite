"use client";

import React, { useState } from "react";
import type { ProductItem } from "@/data/productsData";
import { PageHero } from "@/components/ui/PageHero";
import { ProductInquiryForm } from "@/components/shop/ProductInquiryForm";
import { WhatsAppProductBadge } from "@/components/shop/WhatsAppProductBadge";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Search,
  Truck,
  RotateCcw,
  Cpu,
  BadgeCheck,
} from "lucide-react";

const FALLBACK_PRODUCT_IMAGE = "/images/pc-repair-workbench.jpg";

function ProductCardImage({ src, images = [], alt }: { src?: string; images?: string[]; alt: string }) {
  const gallery = Array.from(new Set([src, ...images].filter(Boolean))) as string[];
  const [selected, setSelected] = useState(gallery[0] || FALLBACK_PRODUCT_IMAGE);
  const [imageSrc, setImageSrc] = useState(selected);

  return (
    <div className="relative h-full w-full">
      <img
        src={imageSrc}
        alt={alt}
        onError={() => setImageSrc(FALLBACK_PRODUCT_IMAGE)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {gallery.length > 1 ? (
        <div className="absolute inset-x-3 bottom-3 flex gap-2 overflow-x-auto rounded-xl bg-black/40 p-1.5 backdrop-blur-xs">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => {
                setSelected(image);
                setImageSrc(image);
              }}
              className={`h-9 w-9 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selected === image ? "border-coral-brand scale-105" : "border-white/60 opacity-80"
              }`}
              aria-label={`View photo ${index + 1}`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ShopCatalog({ products = [] }: { products?: ProductItem[] }) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Hardware" },
    { id: "refurbished-laptop", label: "Refurbished Laptops" },
    { id: "gaming-pc", label: "Custom Gaming PCs" },
    { id: "workstation", label: "CAD & Workstations" },
    { id: "upgrade-kit", label: "SSD & RAM Upgrades" },
    { id: "monitor", label: "Monitors" },
    { id: "desktop-cpu", label: "CPUs & Processors" },
    { id: "mini-pc", label: "Mini PCs" },
    { id: "mouse", label: "Accessories" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedFilter === "all" || p.category === selectedFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="surface-grid bg-cream-bg min-h-screen pb-12 sm:pb-20">
      <PageHero
        eyebrow="Hardware Sales & Certified Systems"
        title="Bench-Tested Computers. Guaranteed to Perform."
        description="Every laptop and custom rig is thoroughly inspected, stress-tested, and repasted in our Nairobi repair lab. Certified Grade A condition, genuine chargers, licensed OS, and a solid 6-month warranty."
        image="/images/pc-repair-workbench.jpg"
        imageAlt="Refurbished laptops and tested computers at Zollani Tech"
        action={{
          label: "Inquire via WhatsApp",
          href: "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20looking%20to%20buy%20a%20laptop%20or%20computer.",
        }}
        secondaryAction={{ label: "Need a repair instead?", href: "/services" }}
      />

      {/* Trust Bar for Sales Growth */}
      <section className="border-y border-cream-border bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1.5 p-2">
              <BadgeCheck className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">24-Point Diagnostic Bench Test</span>
              <span className="text-[11px] text-brand-muted">Battery, thermals, display & ports certified</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <ShieldCheck className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">6-Month Hardware Warranty</span>
              <span className="text-[11px] text-brand-muted">Full repair or replacement guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Truck className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">Same-Day Delivery in Nairobi</span>
              <span className="text-[11px] text-brand-muted">On-site setup and door-to-door delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <RotateCcw className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">Trade-In & Upgrade Options</span>
              <span className="text-[11px] text-brand-muted">Bring your old computer for credit</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-cream-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search by brand, specs (Core i7, 16GB RAM, RTX)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-cream-border bg-cream-surface py-2.5 pl-10 pr-4 text-xs font-medium text-brand-dark focus:border-teal-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-brand-muted">
            <span>Showing {filteredProducts.length} items</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === cat.id
                  ? "bg-teal-deep text-white shadow-xs"
                  : "border border-cream-border bg-white text-brand-slate hover:bg-cream-border/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-cream-border bg-white p-12 text-center shadow-xs">
            <ShoppingBag className="mx-auto h-12 w-12 text-teal-brand" />
            <h3 className="mt-4 text-xl font-black text-brand-dark">No products found</h3>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-brand-muted">
              We couldn&apos;t find any computers matching your search. We frequently source specific models directly for clients.
            </p>
            <a
              href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20looking%20for%20a%20specific%20laptop%20or%20computer%20model."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-6 py-3 text-xs font-bold text-white hover:bg-coral-hover transition-colors"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              Ask Technicians to Source It for You
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod) => {
              const waText = encodeURIComponent(
                `Hello Zollani Tech, I am interested in buying the "${prod.name}" priced at KES ${prod.priceKes.toLocaleString()}. Is this unit currently available?`
              );

              return (
                <div
                  key={prod.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-cream-border bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    {/* Image container */}
                    <div className="relative h-60 w-full overflow-hidden bg-cream-surface border-b border-cream-border">
                      <ProductCardImage src={prod.image} images={prod.images} alt={prod.name} />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="rounded-lg bg-teal-deep/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-xs">
                          {prod.condition || "Certified Refurbished"}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold text-teal-brand shadow-xs backdrop-blur-xs">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {prod.warranty || "6-Mo Warranty"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-teal-brand">
                          {prod.category.replace("-", " ")}
                        </span>
                        <h3 className="mt-1 text-lg font-black text-brand-dark group-hover:text-teal-brand transition-colors">
                          {prod.name}
                        </h3>
                      </div>

                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-2xl font-black font-mono text-coral-dark">
                          {prod.priceKes > 0 ? `KES ${prod.priceKes.toLocaleString()}` : "Contact for Price"}
                        </span>
                        <span className="text-[11px] font-medium text-brand-muted">VAT Inclusive</span>
                      </div>

                      <p className="text-xs leading-relaxed text-brand-muted line-clamp-2 mb-4">
                        {prod.description}
                      </p>

                      {/* Specs pills */}
                      {prod.specs && prod.specs.length > 0 && (
                        <div className="space-y-1.5 rounded-2xl border border-cream-border bg-cream-surface p-3.5">
                          {prod.specs.slice(0, 4).map((spec, sidx) => (
                            <div key={sidx} className="flex items-center gap-2 text-[11px] text-brand-slate font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5 text-teal-brand shrink-0" />
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                          {prod.specs.length > 4 && (
                            <p className="pt-1 text-[10px] font-bold text-teal-brand">
                              + {prod.specs.length - 4} more specs included
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>


                    {/* Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <a
                      href={`https://wa.me/254768551914?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-xs font-black text-white shadow-sm transition-all hover:bg-[#20bd5a] transform active:scale-98 text-center"
                    >
                      <MessageCircle className="h-4 w-4 fill-white" />
                      <span>Order / Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ProductInquiryForm />

        {/* Custom PC & Bulk Fleet Quote Section */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-teal-deep via-brand-dark to-teal-dark p-8 text-white shadow-xl sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block rounded-full bg-coral-brand/20 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-coral-brand uppercase">
                Custom Builds &amp; Office Fleets
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Need a Custom Computer Built or Bulk Laptops for Your Office?
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-cream-bg/80">
                We configure tailored workstations for AutoCAD, Blender 3D, Premiere Pro, software engineering, and gaming. We also supply vetted laptop batches for corporate teams and remote staff across Kenya.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20a%20quote%20for%20a%20custom%20PC%20or%20bulk%20office%20laptops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-6 py-3.5 text-xs font-black text-white shadow-md transition-all hover:bg-coral-hover hover:scale-105"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                Get Custom Commission Quote
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
