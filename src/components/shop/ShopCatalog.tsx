"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PRODUCT_CATEGORIES,
  type ProductItem,
} from "@/data/productsData";
import { PageHero } from "@/components/ui/PageHero";
import { ProductInquiryForm } from "@/components/shop/ProductInquiryForm";
import { ProductPhoto } from "@/components/shop/ProductPhoto";
import { useCart } from "@/context/CartContext";
import { getProductImageUrl } from "@/lib/product-images";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Search,
  Truck,
  RotateCcw,
  BadgeCheck,
  ShoppingCart,
  Check,
  X,
  ArrowUpDown,
  Eye,
  Printer,
  PackageSearch,
  Phone,
} from "lucide-react";

function AddToCartButton({
  product,
  size = "default",
}: {
  product: ProductItem;
  size?: "default" | "large";
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl font-black shadow-sm transition-all active:scale-98 cursor-pointer ${
        size === "large" ? "py-4 text-sm" : "py-3.5 text-xs"
      } ${
        added
          ? "bg-teal-brand text-white"
          : "bg-brand-dark text-white hover:bg-teal-deep"
      }`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          <span>Added to Cart</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}

function ProductCardImage({
  src,
  images = [],
  alt,
}: {
  src?: string;
  images?: string[];
  alt: string;
}) {
  const gallery = Array.from(
    new Set(
      [src, ...images]
        .map(getProductImageUrl)
        .filter((image): image is string => Boolean(image))
    )
  );
  const [selected, setSelected] = useState(gallery[0] ?? "");

  return (
    <div className="relative h-full w-full">
      <ProductPhoto
        src={selected}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {gallery.length > 1 ? (
        <div className="absolute inset-x-3 bottom-3 flex gap-2 overflow-x-auto rounded-xl bg-black/40 p-1.5 backdrop-blur-xs">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelected(image)}
              className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selected === image ? "border-coral-brand scale-105" : "border-white/60 opacity-80"
              }`}
              aria-label={`View photo ${index + 1}`}
            >
              <ProductPhoto src={image} alt="" sizes="36px" compact />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ShopCatalog({ products = [] }: { products?: ProductItem[] }) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const q = params.get("q");
    if (cat && PRODUCT_CATEGORIES.some((c) => c.id === cat)) {
      setSelectedFilter(cat);
    }
    if (q) {
      setSearchQuery(q);
    }
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set("all", products.length);
    for (const p of products) {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCategory =
        selectedFilter === "all" ||
        p.category === selectedFilter ||
        (selectedFilter === "mini-pc" && p.category === "desktop-cpu");

      const matchesCondition =
        conditionFilter === "all" ||
        (conditionFilter === "new" &&
          (p.condition === "Brand New" || p.condition === "Brand New Custom Build")) ||
        (conditionFilter === "exuk" && p.condition === "Ex-UK Grade A") ||
        (conditionFilter === "bundle" && p.condition === "Hardware Bundle");

      const categoryLabel =
        PRODUCT_CATEGORIES.find((c) => c.id === p.category)?.label.toLowerCase() || "";

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        categoryLabel.includes(q) ||
        p.specs.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesCondition && matchesSearch;
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.priceKes - b.priceKes);
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.priceKes - a.priceKes);
    }
    return [...list].sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));
  }, [products, selectedFilter, conditionFilter, sortBy, searchQuery]);

  const quickTags = ["SSD", "Mouse", "Keyboard", "Charger", "UPS", "Router", "Monitor", "ThinkPad", "Gaming"];

  return (
    <div className="surface-grid bg-cream-bg min-h-screen pb-12 sm:pb-20">
      <PageHero
        eyebrow="Hardware & Computer Accessories Store"
        title="Computers & All Accessories. Guaranteed to Perform."
        description="Shop bench-tested Ex-UK laptops, custom PCs, NVMe SSDs, RAM, mice, keyboards, USB-C chargers, monitors, routers, UPS backups, and webcams. Pay securely online with an instant printable receipt and live Nairobi delivery tracking."
        image="/images/pc-repair-workbench.jpg"
        imageAlt="Zollani Tech computer hardware and accessories shop in Nairobi"
        action={{
          label: "Track Order or Book Pickup",
          href: "/track",
        }}
        secondaryAction={{
          label: "Need a repair instead?",
          href: "/services",
        }}
      />

      {/* Trust Bar */}
      <section className="border-y border-cream-border bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1.5 p-2">
              <BadgeCheck className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">Online Checkout &amp; M-Pesa</span>
              <span className="text-[11px] text-brand-muted">Pay via M-Pesa, Card, Bank or Cash</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Printer className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">Instant Printable Receipts</span>
              <span className="text-[11px] text-brand-muted">Official VAT-inclusive PDF / print slip</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Truck className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">Same-Day Nairobi Delivery</span>
              <span className="text-[11px] text-brand-muted">Live order &amp; rider tracking included</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <ShieldCheck className="h-6 w-6 text-teal-brand" />
              <span className="font-bold text-xs text-brand-dark">Verified Hardware Warranty</span>
              <span className="text-[11px] text-brand-muted">3 to 12 months written coverage</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Quick Order Tracking & Pickup Callout */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-teal-brand/20 bg-teal-subtle/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <PackageSearch className="h-5 w-5 shrink-0 text-teal-brand" />
            <p className="text-xs font-semibold text-brand-dark">
              Already ordered hardware or booked a repair? Track live status or request rider pickup for a faulty device.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/track"
              className="rounded-xl bg-teal-deep px-4 py-2 text-xs font-bold text-white hover:bg-teal-brand transition-colors"
            >
              Track Product / Repair
            </Link>
            <a
              href="tel:+254768551914"
              className="inline-flex items-center gap-1.5 rounded-xl border border-cream-border bg-white px-3.5 py-2 text-xs font-bold text-brand-dark hover:border-coral-brand transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-coral-brand" />
              Call +254 768 551914
            </a>
          </div>
        </div>

        {/* Search, Condition & Sort Bar */}
        <div className="mb-5 rounded-3xl border border-cream-border bg-white p-4 shadow-sm sm:p-5 space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search laptops, SSD, RAM, mouse, keyboard, USB-C hub, monitor, UPS, router..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-cream-border bg-cream-surface py-3 pl-11 pr-10 text-xs sm:text-sm font-medium text-brand-dark focus:border-teal-brand focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-brand-muted hover:bg-cream-border/60 hover:text-brand-dark"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                aria-label="Filter by condition"
                className="rounded-xl border border-cream-border bg-cream-surface px-3.5 py-2.5 text-xs font-bold text-brand-dark focus:border-teal-brand focus:outline-none"
              >
                <option value="all">All Conditions</option>
                <option value="new">Brand New</option>
                <option value="exuk">Ex-UK Grade A</option>
                <option value="bundle">Hardware Bundles</option>
              </select>

              <div className="relative flex items-center">
                <ArrowUpDown className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-brand-muted" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")
                  }
                  aria-label="Sort products"
                  className="rounded-xl border border-cream-border bg-cream-surface pl-8 pr-4 py-2.5 text-xs font-bold text-brand-dark focus:border-teal-brand focus:outline-none"
                >
                  <option value="featured">Sort: Popular &amp; Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <span className="px-2 text-xs font-bold text-brand-muted whitespace-nowrap">
                {filteredProducts.length} items
              </span>
            </div>
          </div>

          {/* Quick Search Keywords */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-cream-border/70">
            <span className="text-[11px] font-bold text-brand-muted">Quick search:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="rounded-lg bg-cream-surface px-2.5 py-1 text-[11px] font-semibold text-brand-slate border border-cream-border hover:border-teal-brand hover:text-teal-brand transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
            {(selectedFilter !== "all" || conditionFilter !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter("all");
                  setConditionFilter("all");
                  setSearchQuery("");
                }}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-coral-dark hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PRODUCT_CATEGORIES.map((cat) => {
            const count =
              cat.id === "mini-pc"
                ? (categoryCounts.get("mini-pc") || 0) + (categoryCounts.get("desktop-cpu") || 0)
                : categoryCounts.get(cat.id) || 0;
            if (cat.id !== "all" && count === 0) return null;

            const active = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? "bg-teal-deep text-white shadow-xs"
                    : "border border-cream-border bg-white text-brand-slate hover:bg-cream-border/50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono ${
                    active ? "bg-white/20 text-white" : "bg-cream-bg text-brand-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-cream-border bg-white p-12 text-center shadow-xs">
            <ShoppingBag className="mx-auto h-12 w-12 text-teal-brand" />
            <h3 className="mt-4 text-xl font-black text-brand-dark">No matching products found</h3>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-brand-muted">
              Try clearing your filters or message our sourcing desk — we stock and source thousands of laptop parts, chargers, and accessories daily in Nairobi.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter("all");
                  setConditionFilter("all");
                  setSearchQuery("");
                }}
                className="rounded-2xl border border-cream-border bg-cream-surface px-6 py-3 text-xs font-bold text-brand-dark hover:border-teal-brand"
              >
                Show All {products.length} Products
              </button>
              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20looking%20for%20a%20specific%20computer%20or%20accessory."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-6 py-3 text-xs font-bold text-white hover:bg-coral-hover transition-colors"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                Ask Technicians to Source It
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod) => {
              const waText = encodeURIComponent(
                `Hello Zollani Tech, I am interested in buying "${prod.name}" priced at KES ${prod.priceKes.toLocaleString()}. Is it ready for pickup/delivery?`
              );
              const categoryLabel =
                PRODUCT_CATEGORIES.find((c) => c.id === prod.category)?.label ||
                prod.category.replace(/-/g, " ");

              return (
                <div
                  key={prod.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-cream-border bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-cream-surface border-b border-cream-border">
                      <ProductCardImage src={prod.image} images={prod.images} alt={prod.name} />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="rounded-lg bg-teal-deep/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-xs">
                          {prod.condition || "Ex-UK Grade A"}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-bold text-teal-brand shadow-xs backdrop-blur-xs">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {prod.warranty || "6 Months Warranty"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-teal-brand">
                          {categoryLabel}
                        </span>
                        {prod.brand && (
                          <span className="text-[10px] font-bold text-brand-muted uppercase">
                            {prod.brand}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-brand-dark group-hover:text-teal-brand transition-colors leading-snug">
                        {prod.name}
                      </h3>

                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-2xl font-black font-mono text-coral-dark">
                          {prod.priceKes > 0
                            ? `KES ${prod.priceKes.toLocaleString()}`
                            : "Contact for Price"}
                        </span>
                        <span className="text-[11px] font-medium text-brand-muted">
                          VAT Inclusive
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-brand-muted line-clamp-2 mb-4">
                        {prod.description}
                      </p>

                      {prod.specs && prod.specs.length > 0 && (
                        <div className="space-y-1.5 rounded-2xl border border-cream-border bg-cream-surface p-3.5">
                          {prod.specs.slice(0, 3).map((spec, sidx) => (
                            <div
                              key={sidx}
                              className="flex items-center gap-2 text-[11px] text-brand-slate font-medium"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-teal-brand shrink-0" />
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                          {prod.specs.length > 3 && (
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(prod)}
                              className="pt-1 text-[11px] font-bold text-teal-brand hover:underline cursor-pointer"
                            >
                              + View all {prod.specs.length} specs
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <AddToCartButton product={prod} />
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(prod)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-cream-border bg-cream-surface py-2.5 text-[11px] font-bold text-brand-dark hover:border-teal-brand transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 text-teal-brand" />
                        <span>Full Specs</span>
                      </button>
                      <a
                        href={`https://wa.me/254768551914?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-[#25D366] py-2.5 text-[11px] font-bold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-center"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
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
              <span className="inline-block rounded-lg bg-coral-brand/20 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-coral-brand uppercase">
                Custom Builds &amp; Office Fleets
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Need Bulk Office Accessories or Custom Workstations?
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-cream-bg/80">
                We configure tailored workstations for AutoCAD, Blender 3D, Premiere Pro, software engineering, and gaming—plus bulk keyboards, monitors, UPS backups, and laptops with official company invoices &amp; receipts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20a%20quote%20for%20a%20custom%20PC%20or%20bulk%20office%20hardware."
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

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cream-border bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close quick view"
              className="absolute right-5 top-5 rounded-full p-2 text-brand-muted hover:bg-cream-bg hover:text-brand-dark"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 sm:grid-cols-[240px_1fr]">
              <div className="overflow-hidden rounded-2xl border border-cream-border bg-cream-surface h-56 sm:h-full">
                <ProductPhoto
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-teal-deep px-2.5 py-1 text-[10px] font-black uppercase text-white">
                    {quickViewProduct.condition}
                  </span>
                  <span className="rounded-lg bg-teal-subtle px-2.5 py-1 text-[10px] font-bold text-teal-brand">
                    {quickViewProduct.warranty}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-black text-brand-dark">
                  {quickViewProduct.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono text-coral-dark">
                    KES {quickViewProduct.priceKes.toLocaleString()}
                  </span>
                  <span className="text-xs text-brand-muted">VAT Inclusive</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-brand-slate">
                  {quickViewProduct.description}
                </p>

                <div className="mt-4 space-y-1.5 rounded-2xl border border-cream-border bg-cream-surface p-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-brand-muted mb-2">
                    Included Specifications
                  </p>
                  {quickViewProduct.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-brand-dark">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-brand" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <AddToCartButton product={quickViewProduct} size="large" />
                  <Link
                    href="/checkout"
                    onClick={() => setQuickViewProduct(null)}
                    className="flex items-center justify-center rounded-2xl border border-cream-border bg-cream-surface py-4 text-xs font-bold text-brand-dark hover:border-teal-brand"
                  >
                    Go to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
