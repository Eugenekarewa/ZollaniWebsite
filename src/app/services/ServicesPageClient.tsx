"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SERVICE_CATEGORIES,
  type ServiceCategoryKey,
  type ServiceItem,
} from "@/data/servicesData";
import {
  Building2,
  Gamepad2,
  HardDrive,
  Laptop,
  MessageCircle,
  MapPin,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  Clock,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { QuoteCalculator } from "@/components/interactive/QuoteCalculator";

type DirectoryCategoryKey =
  | "laptop-computer"
  | "macbook"
  | "smartphone-tablet"
  | "gaming-console"
  | "data-software"
  | "networking"
  | "business-it";

const DIRECTORY_CATEGORIES = [
  {
    key: "laptop-computer",
    title: "Laptop & Computer Repair Services",
    description:
      "Screen, keyboard, charging, board, performance, and setup repairs for laptops and desktops.",
    icon: Laptop,
  },
  {
    key: "macbook",
    title: "MacBook Repair Services",
    description:
      "MacBook screen replacement, supported macOS upgrades, and storage migrations. Contact us to confirm model compatibility.",
    icon: Laptop,
  },
  {
    key: "smartphone-tablet",
    title: "Phone & Tablet Repair Services",
    description:
      "Dedicated phone and tablet repair services are not listed yet. Contact us with your model and issue to check support.",
    icon: Smartphone,
  },
  {
    key: "gaming-console",
    title: "Gaming Console Repair Services",
    description:
      "PS5 and Xbox HDMI port diagnostics and micro-soldering for no-signal or loose-port problems.",
    icon: Gamepad2,
  },
  {
    key: "data-software",
    title: "Data Recovery & Software Services",
    description:
      "Recover lost files, restore operating systems, remove malware, and install or configure software.",
    icon: HardDrive,
  },
  {
    key: "networking",
    title: "Networking & Infrastructure Services",
    description:
      "Fix WiFi and internet issues, deploy routers and cabling, and set up connected office equipment.",
    icon: Network,
  },
  {
    key: "business-it",
    title: "Business IT Support & Networking",
    description:
      "Managed support, office rollouts, printer fleets, backup planning, and on-site IT response.",
    icon: Building2,
  },
] satisfies Array<{
  key: DirectoryCategoryKey;
  title: string;
  description: string;
  icon: typeof Laptop;
}>;

const SOURCE_CATEGORY_ASSIGNMENTS: Record<
  ServiceCategoryKey,
  DirectoryCategoryKey
> = {
  hardware: "laptop-computer",
  software: "data-software",
  "virus-security": "data-software",
  "data-services": "data-software",
  networking: "networking",
  "business-it": "business-it",
  "setup-installation": "business-it",
  upgrades: "laptop-computer",
  onsite: "business-it",
};

const SERVICE_CATEGORY_OVERRIDES: Partial<
  Record<ServiceItem["id"], DirectoryCategoryKey>
> = {
  "console-hdmi": "gaming-console",
  "setup-new-pc": "laptop-computer",
  "setup-packages": "data-software",
  "setup-printers": "networking",
  "setup-smart": "networking",
  "site-home": "laptop-computer",
};

const MACBOOK_SERVICE_IDS = new Set([
  "hw-screen",
  "sw-os-upgrade",
  "data-migration",
]);
const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((category) => category.items);
const DIRECTORY_GROUPS = DIRECTORY_CATEGORIES.map((category) => ({
  ...category,
  services: ALL_SERVICES.filter((service) =>
    category.key === "macbook"
      ? MACBOOK_SERVICE_IDS.has(service.id)
      : (SERVICE_CATEGORY_OVERRIDES[service.id] ??
          SOURCE_CATEGORY_ASSIGNMENTS[service.category]) === category.key
  ),
}));

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    DirectoryCategoryKey | "all"
  >("all");
  const [activeModalItem, setActiveModalItem] = useState<{
    item: ServiceItem;
    categoryTitle: string;
  } | null>(null);

  const filteredServicesByCategory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryTerms = query.split(/\s+/).filter(Boolean);
    const matchesQuery = (text: string) =>
      queryTerms.every((term) => text.toLowerCase().includes(term));

    return DIRECTORY_GROUPS.flatMap((group) => {
      if (selectedCategory !== "all" && selectedCategory !== group.key) {
        return [];
      }

      const categoryMatches = matchesQuery(`${group.title} ${group.description}`);

      if (!group.services.length) {
        return !query || categoryMatches
          ? [{ category: group, items: [] }]
          : [];
      }

      const items = group.services.filter((item) => {
        if (!query || categoryMatches) return true;

        return matchesQuery(
          [item.name, item.shortDesc, item.fullDesc, ...item.typicalIssues].join(" ")
        );
      });

      return items.length > 0 ? [{ category: group, items }] : [];
    });
  }, [searchQuery, selectedCategory]);
  const filteredServiceCount = new Set(
    filteredServicesByCategory.flatMap((group) => group.items.map((item) => item.id))
  ).size;

  return (
    <div className="surface-grid bg-cream-bg min-h-screen pb-12 sm:pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-20">
          <div>
            <p className="section-kicker text-coral-brand">Zollani Repair &amp; Electronics Lab</p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Electronics Repair &amp; IT Support Services in Nairobi
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-cream-bg/80 sm:text-lg">
              Professional laptop and computer repair, MacBook services, gaming console HDMI repair, and business IT support in Nairobi. Ask us to confirm phone and tablet repair availability.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/254768551914?text=${encodeURIComponent(
                  "Hello Zollani Tech, I would like to chat with a technician about a repair or IT service."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral-brand px-6 py-3.5 text-xs font-black text-white transition-colors hover:bg-coral-hover"
              >
                <MessageCircle className="h-4 w-4" />
                Chat with a Technician
              </a>
              <a
                href="#estimator"
                className="rounded-full border border-cream-bg/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep"
              >
                Instant Repair Estimator
              </a>
              <a
                href="#service-finder"
                className="rounded-full border border-cream-bg/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep"
              >
                Browse All Services
              </a>
              <Link
                href="/track?tab=pickup"
                className="rounded-full border border-cream-bg/30 bg-white/10 px-5 py-3.5 text-xs font-bold text-cream-bg hover:bg-cream-bg hover:text-teal-deep transition-colors"
              >
                Book Rider Pickup
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 border-t border-cream-bg/15 pt-5 text-xs sm:grid-cols-2">
              {[
                {
                  title: "No Fix, No Fee",
                  detail: "For standard diagnostics when repair is not possible.",
                },
                {
                  title: "Free Quick Diagnostics",
                  detail: "When you proceed with the quoted repair.",
                },
                {
                  title: "Written Quote First",
                  detail: "Repair starts only after you approve.",
                },
                {
                  title: "Up to 6-Month Written Warranty",
                  detail: "Eligible hardware repairs; written terms apply.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-coral-brand" />
                  <div>
                    <p className="font-bold text-cream-bg">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-cream-bg/70">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 max-w-2xl text-[10px] leading-relaxed text-cream-bg/60">
              Diagnostic eligibility and warranty coverage vary by repair. We confirm
              the applicable terms in writing before work begins.
            </p>
          </div>
          <div className="image-frame relative min-h-[360px] overflow-hidden rounded-3xl sm:min-h-[480px]">
            <Image
              src="/images/hardware-motherboard.jpg"
              alt="Technician working at a computer workstation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
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

      <section
        aria-labelledby="repair-process-heading"
        className="bg-white py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-kicker">A Clear Repair Process</p>
            <h2
              id="repair-process-heading"
              className="mt-3 text-2xl font-black text-brand-dark sm:text-3xl"
            >
              From Diagnosis to Collection
            </h2>
          </div>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Diagnosis", "We inspect the device and identify the fault."],
              ["Quote", "We share the repair scope and written price."],
              ["Approval", "You approve the quote before work begins."],
              ["Repair", "Our technician completes the approved work."],
              ["Testing", "We check the repair before handover."],
              [
                "Collection or delivery",
                "Collect from the workshop or confirm a delivery option.",
              ],
            ].map(([title, description], index) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-cream-border bg-cream-surface p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-deep text-xs font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INSTANT ESTIMATOR */}
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

      <section
        aria-labelledby="service-area-heading"
        className="border-y border-cream-border bg-cream-surface py-12 sm:py-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="max-w-3xl">
            <p className="section-kicker">Nairobi Service Coverage</p>
            <h2
              id="service-area-heading"
              className="mt-3 text-2xl font-black text-brand-dark sm:text-3xl"
            >
              On-Site Computer Repair &amp; IT Support in Nairobi
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              Our listed drop-off and on-site service areas include Westlands,
              Kilimani, Kileleshwa, Nairobi CBD, Upper Hill, Karen, Parklands, and
              the Thika Road corridor. Confirm pickup or delivery availability for
              your address before booking.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Westlands",
                "Kilimani",
                "Kileleshwa",
                "Nairobi CBD",
                "Upper Hill",
                "Karen",
                "Parklands",
                "Thika Road",
              ].map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream-border bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-slate"
                >
                  <MapPin className="h-3 w-3 text-teal-brand" />
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-teal-deep px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-teal-brand"
            >
              Check Service Availability
            </Link>
            <Link
              href="/track?tab=pickup"
              className="rounded-full border border-cream-border bg-white px-5 py-3 text-xs font-bold text-brand-dark transition-colors hover:border-teal-brand hover:text-teal-brand"
            >
              Arrange Device Pickup
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE DIRECTORY */}
      <section id="service-finder" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-kicker">Service Directory</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">
              Electronics Repair &amp; IT Support Services in Nairobi
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-brand-muted">
              Search by symptom, part, or brand to find specific technical services delivered in our Nairobi workshop.
            </p>
          </div>
          {!searchQuery.trim() && selectedCategory === "all" && (
            <nav aria-label="Browse services by category" className="mt-8">
              <h3 className="mb-4 text-sm font-black text-brand-dark">
                Browse by device or need
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {DIRECTORY_GROUPS.map((category) => {
                  const CategoryIcon = category.icon;
                  const hasServices = category.services.length > 0;

                  return (
                    <Link
                      key={category.key}
                      href={
                        hasServices
                          ? `#services-${category.key}`
                          : "/contact"
                      }
                      className="group flex h-full flex-col rounded-2xl border border-cream-border bg-white p-4 transition-colors hover:border-teal-brand hover:shadow-sm"
                    >
                      <span className="mb-3 inline-flex w-fit rounded-xl bg-teal-subtle p-2 text-teal-brand">
                        <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-bold text-brand-dark group-hover:text-teal-brand">
                        {category.title}
                      </span>
                      <span className="mt-1 flex-1 text-xs leading-relaxed text-brand-muted">
                        {category.description}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal-brand">
                        {hasServices
                          ? `View ${category.services.length} related services`
                          : "Chat with a Technician"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="relative z-10 -mt-6 bg-cream-surface rounded-3xl p-4 sm:p-6 shadow-[0_18px_45px_rgba(16,47,48,0.12)] border border-cream-border mb-10 space-y-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="relative">
              <Search className="w-5 h-5 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search services by device, repair, symptom, or brand"
                placeholder="Search by device, symptom, repair or brand (e.g. 'cracked screen', 'PS5 HDMI', 'motherboard', 'SSD upgrade')..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-cream-bg/60 border border-cream-border text-sm text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold text-brand-muted">
              Filter by category
              <select
                value={selectedCategory}
                onChange={(event) => {
                  const category = DIRECTORY_CATEGORIES.find(
                    (item) => item.key === event.target.value
                  );
                  setSelectedCategory(category?.key ?? "all");
                }}
                className="w-full rounded-2xl border border-cream-border bg-white px-3 py-3 text-xs font-semibold text-brand-dark focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-subtle"
              >
                <option value="all">All devices and services</option>
                {DIRECTORY_CATEGORIES.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-cream-border/70">
            <span className="text-[11px] font-bold text-brand-muted">Common fixes:</span>
            {["Cracked Screen", "Motherboard", "Data Recovery", "Blue Screen", "SSD", "Liquid"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery(tag);
                }}
                className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-slate border border-cream-border hover:border-teal-brand hover:text-teal-brand transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-5 text-xs text-brand-muted" aria-live="polite">
          Showing{" "}
          <span className="font-bold text-brand-dark">
            {filteredServiceCount} unique{" "}
            {filteredServiceCount === 1 ? "service" : "services"}
          </span>{" "}
          across {filteredServicesByCategory.length}{" "}
          {filteredServicesByCategory.length === 1 ? "category" : "categories"}.
        </p>

        {/* Services grouped by category */}
        {filteredServicesByCategory.length > 0 ? (
          <div className="space-y-12">
            {filteredServicesByCategory.map(({ category, items }) => {
              const CategoryIcon = category.icon;

              return (
                <section
                  key={category.key}
                  id={`services-${category.key}`}
                  className="scroll-mt-24"
                >
                  <div className="mb-5 flex flex-col gap-3 border-b border-cream-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 rounded-xl bg-teal-subtle p-2.5 text-teal-brand">
                        <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="mt-1 text-xl font-black text-brand-dark sm:text-2xl">
                          {category.title}
                        </h2>
                        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-brand-muted sm:text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 self-start rounded-full border border-cream-border bg-white px-3 py-1.5 text-[11px] font-bold text-brand-slate sm:mt-1">
                      {items.length > 0
                        ? `${items.length} related ${
                            items.length === 1 ? "service" : "services"
                          }`
                        : "Contact for support"}
                    </span>
                  </div>

                  {items.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {items.map((item) => (
                        <article
                          key={item.id}
                          className="group flex flex-col justify-between rounded-3xl border border-cream-border bg-white p-6 shadow-xs transition-all duration-300 hover:border-teal-brand hover:shadow-lg"
                        >
                          <div>
                            <div className="mb-3 flex items-center justify-between gap-2">
                              <span className="rounded-lg bg-teal-subtle px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-teal-brand">
                                {category.title}
                              </span>
                              {item.popular && (
                                <span className="rounded-full bg-coral-light px-2 py-0.5 text-[10px] font-black uppercase text-coral-dark">
                                  Popular
                                </span>
                              )}
                            </div>

                            <h4 className="text-lg font-black text-brand-dark">
                              {item.name}
                            </h4>
                            <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                              {item.shortDesc}
                            </p>

                            <div className="mt-4 space-y-1.5 border-t border-cream-border/70 pt-3">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                                Common problems
                              </p>
                              {item.typicalIssues.slice(0, 3).map((issue) => (
                                <div
                                  key={issue}
                                  className="flex items-center gap-1.5 text-[11px] text-brand-slate"
                                >
                                  <CheckCircle2 className="h-3 w-3 shrink-0 text-teal-brand" />
                                  <span>{issue}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5 border-t border-cream-border pt-3">
                            <span className="flex items-center gap-1 text-xs text-brand-muted">
                              <Clock className="h-3.5 w-3.5 text-teal-brand" />
                              {item.turnaround}
                            </span>
                            <a
                              href={`https://wa.me/254768551914?text=${encodeURIComponent(
                                `Hello Zollani Tech, please share a quote for ${item.name}. My device/model is [model] and the issue is [describe issue].`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-deep px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-teal-brand"
                            >
                              <MessageCircle className="h-4 w-4" />
                              Get a Quote on WhatsApp
                            </a>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveModalItem({
                                  item,
                                  categoryTitle: category.title,
                                })
                              }
                              className="mt-2 flex w-full items-center justify-center gap-1 py-2 text-xs font-bold text-teal-brand hover:text-teal-deep"
                            >
                              View service details
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-cream-border bg-white/70 p-6">
                      <p className="text-sm font-bold text-brand-dark">
                        No dedicated services are listed here yet.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                        Send us your device model and the problem you are seeing, and
                        we will confirm whether we can help.
                      </p>
                      <a
                        href={`https://wa.me/254768551914?text=${encodeURIComponent(
                          `Hello Zollani Tech, can you help with ${category.title}? My device/model is [model] and the issue is [describe issue].`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-teal-brand hover:text-teal-deep"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chat with a Technician
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-cream-border bg-white px-6 py-12 text-center">
            <p className="font-bold text-brand-dark">No services match "{searchQuery}".</p>
            <p className="mt-2 text-sm text-brand-muted">
              Try another search term or clear your filters to browse all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-5 rounded-xl bg-teal-deep px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-teal-brand"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {activeModalItem && (
          <div
            onClick={() => setActiveModalItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 space-y-5"
            >
              <div className="flex items-start justify-between border-b border-cream-border pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-brand bg-teal-subtle px-2.5 py-1 rounded-lg">
                    {activeModalItem.categoryTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-2">
                    {activeModalItem.item.name}
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
                <p>{activeModalItem.item.fullDesc}</p>

                <div className="rounded-2xl border border-cream-border bg-cream-surface p-4 space-y-2">
                  <p className="font-bold text-xs uppercase tracking-wider text-brand-dark">
                    Typical Symptoms Addressed:
                  </p>
                  <ul className="space-y-1.5">
                    {activeModalItem.item.typicalIssues.map((issue, idx) => (
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
                    Turnaround: {activeModalItem.item.turnaround}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    ✓ 6-Month Written Warranty Included
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-border flex flex-col sm:flex-row gap-2.5">
                <Link
                  href="/track?tab=pickup"
                  onClick={() => setActiveModalItem(null)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-coral-brand hover:bg-coral-hover text-white py-3.5 text-xs font-black shadow-sm transition-colors"
                >
                  <span>Book Rider Pickup Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20assistance%20with%20${encodeURIComponent(
                    activeModalItem.item.name
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3.5 text-xs font-black shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:+254768551914"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-cream-border bg-cream-surface hover:bg-cream-border px-4 py-3.5 text-xs font-bold text-brand-dark"
                >
                  <Phone className="w-4 h-4 text-teal-brand" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
