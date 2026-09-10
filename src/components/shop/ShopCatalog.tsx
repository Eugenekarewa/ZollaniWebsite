"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/productsData";
import type { ProductItem } from "@/data/productsData";
import { PageHero } from "@/components/ui/PageHero";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Phone,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function ShopPage({ products = PRODUCTS }: { products?: ProductItem[] }) {
  if (products.length === 0) {
    return (
      <div className="surface-grid bg-cream-bg min-h-screen pb-10 sm:pb-16">
        <PageHero
          eyebrow="Shop / Coming soon"
          title="Our shelves are being restocked."
          description="We are preparing a new collection of tested laptops, custom PCs, and upgrade bundles. Check back soon or message us for a machine sourced to your needs."
          image="/images/pc-repair-workbench.jpg"
          imageAlt="Zollani Tech team preparing computers for customers"
          action={{ label: "Ask about available stock", href: "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20ask%20about%20available%20stock." }}
          secondaryAction={{ label: "Explore our services", href: "/services" }}
        />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-cream-border bg-cream-surface p-8 text-center shadow-sm sm:p-12">
            <ShoppingBag className="mx-auto h-10 w-10 text-teal-brand" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-brand-dark">No products listed yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-muted">New items will appear here as soon as they are inspected and ready for sale. For a specific laptop or build, contact our team and we will help you find the right option.</p>
            <a href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20looking%20for%20a%20computer." target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-coral-hover">
              <MessageCircle className="h-4 w-4 fill-white" aria-hidden="true" />
              Tell us what you need
            </a>
          </div>
        </div>
      </div>
    );
  }
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "refurbished-laptop", label: "Refurbished Laptops" },
    { id: "gaming-pc", label: "Gaming Towers" },
    { id: "workstation", label: "Workstation PCs" },
    { id: "upgrade-kit", label: "Upgrade Bundles" },
    { id: "monitor", label: "Monitors" },
    { id: "smart-home-camera", label: "Smart Home Cameras" },
    { id: "mouse", label: "Mice" },
    { id: "desktop-cpu", label: "Desktop CPUs" },
  ];

  const filteredProducts =
    selectedFilter === "all"
      ? products
      : products.filter((p) => p.category === selectedFilter);

  return (
    <div className="surface-grid bg-cream-bg min-h-screen pb-10 sm:pb-16">
      <PageHero
        eyebrow="Shop / Tested hardware"
        title="Good machines. Ready to work."
        description="Bench-tested refurbished laptops, custom towers, and upgrade bundles selected for real work, real budgets, and a longer useful life."
        image="/images/pc-repair-workbench.jpg"
        imageAlt="Refurbished laptop ready for work"
        action={{ label: "Ask about stock", href: "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20interested%20in%20your%20available%20hardware." }}
        secondaryAction={{ label: "Need a repair?", href: "/services" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === cat.id
                  ? "bg-teal-brand text-white shadow-xs"
                  : "bg-white text-brand-slate hover:bg-cream-border/60 border border-cream-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const waText = encodeURIComponent(
              `Hello Zollani Tech, I am interested in buying/ordering the "${prod.name}" listed at KES ${prod.priceKes.toLocaleString()}. Is this currently in stock or available for build?`
            );

            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-cream-border hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-52 w-full bg-cream-surface overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-teal-deep/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {prod.condition}
                    </div>
                    {prod.popular && (
                      <div className="absolute top-3 right-3 bg-coral-brand text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                        Best Value
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <div className="text-2xl font-black text-brand-dark font-mono">
                        KES {prod.priceKes.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-teal-brand">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{prod.warranty}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-brand-dark mb-2 group-hover:text-teal-brand transition-colors">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-brand-muted mb-4 leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>

                    {/* Specs list */}
                    <div className="bg-cream-surface rounded-2xl p-3.5 border border-cream-border space-y-1.5 mb-2">
                      {prod.specs.map((spec, sidx) => (
                        <div
                          key={sidx}
                          className="flex items-center gap-2 text-[11px] text-brand-slate"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-brand shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <a
                    href={`https://wa.me/254768551914?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-all transform active:scale-95 text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Inquire / Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Build Banner */}
        <div className="mt-16 bg-gradient-to-r from-teal-deep to-teal-brand text-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-wider text-coral-brand bg-coral-brand/20 px-3.5 py-1 rounded-full">
              Custom Commissions
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Need a Custom Machine Built for Your Budget?
            </h3>
            <p className="text-xs sm:text-sm text-cream-bg/90 leading-relaxed">
              We build dedicated rigs for ArchiCAD, Blender 3D, Premiere Pro, machine learning,
              and esports. You choose the budget and parts, we assemble, test, and warranty it.
            </p>
          </div>

          <a
            href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20consult%20on%20a%20custom%20PC%20build."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-coral-brand hover:bg-coral-hover text-white px-7 py-4 rounded-2xl font-bold text-sm shadow-md transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consult on Custom PC</span>
          </a>
        </div>
      </div>
    </div>
  );
}
