import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Flame,
  Gamepad2,
  HardDrive,
  Laptop,
  Layers,
  MapPin,
  MessageCircle,
  MoveRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { QuoteCalculator } from "@/components/interactive/QuoteCalculator";
import { TESTIMONIALS } from "@/data/testimonialsData";
import { PRODUCTS } from "@/data/productsData";
import { getPublishedPartners } from "@/app/admin/about/partner-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Computer Repairs, Electronics Diagnostics & Certified Computer Sales in Nairobi | Zollani Tech",
  description:
    "Nairobi's trusted electronics lab for same-day laptop repair, motherboard micro-soldering, gaming console fixes, and bench-tested refurbished computers with a 6-month warranty.",
  keywords: [
    "computer repair Nairobi",
    "laptop repair Nairobi",
    "electronics repair Kenya",
    "motherboard repair Nairobi",
    "refurbished laptops Nairobi",
    "custom gaming PC Kenya",
    "screen replacement Nairobi",
    "data recovery Nairobi",
    "PS5 HDMI repair Nairobi",
  ],
};

const whatsappHref =
  "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20assistance%20with%20a%20computer%20repair%20or%20buying%20a%20laptop.";

const trustBadges = [
  { icon: Clock, label: "2–4 Hr Express Turnaround", sub: "Same-day screens & batteries" },
  { icon: ShieldCheck, label: "6-Month Written Warranty", sub: "Genuine parts & labor covered" },
  { icon: Cpu, label: "Board-Level Micro-Soldering", sub: "We repair chips others write off" },
  { icon: Truck, label: "Pickup & Return Nairobi", sub: "Westlands, CBD, Kilimani & beyond" },
];

const pillars = [
  {
    title: "Computer & Laptop Repairs",
    tagline: "Same-day fixes that save you from buying a new machine",
    desc: "From cracked screens, dead batteries, and liquid spills to broken hinge rebuilds and RAM/SSD speed boosts. We fix HP, Dell, Lenovo, Apple MacBook, Asus, and Acer.",
    highlights: ["Screens replaced in 2–4 hours", "Ultrasound liquid damage restoration", "Structural hinge & casing rebuild", "Thermal repasting & fan servicing"],
    icon: Laptop,
    href: "/services#hardware",
    cta: "Find your repair",
    image: "/images/pc-repair-workbench.jpg",
  },
  {
    title: "Advanced Electronic Repairs",
    tagline: "Component-level micro-soldering & logic board revival",
    desc: "Don't discard expensive electronics due to a blown 50-cent capacitor or damaged HDMI port. Our lab handles PlayStation 5, Xbox, TV boards, audio electronics, and industrial PCBs.",
    highlights: ["PS5 & Xbox HDMI socket replacement", "Southbridge & power IC diagnostics", "TV & monitor power supply repair", "Short circuit schematic tracing"],
    icon: Wrench,
    href: "/services#electronics",
    cta: "Explore electronics lab",
    image: "/images/hardware-motherboard.jpg",
  },
  {
    title: "Certified Computer Sales",
    tagline: "Bench-tested business laptops & custom PC builds",
    desc: "Quality hardware selected for real productivity, creators, and gaming. Every unit passes a 24-point diagnostic bench check and includes a genuine charger and 6-month warranty.",
    highlights: ["Grade A Ex-UK ThinkPads & EliteBooks", "Custom high-FPS gaming towers", "CAD & 3D architecture workstations", "Licensed Windows 11 & clean thermals"],
    icon: Sparkles,
    href: "/shop",
    cta: "Browse available stock",
    image: "/images/gaming-pc-build.jpg",
  },
];

export default async function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const testimonials = TESTIMONIALS.slice(0, 3);

  let partners: Awaited<ReturnType<typeof getPublishedPartners>> = [];
  try {
    partners = await getPublishedPartners();
  } catch {
    partners = [];
  }

  return (
    <div className="bg-cream-bg text-brand-dark">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-datacenter.jpg"
            alt="Zollani Tech precision computer repair workbench in Nairobi"
            fill
            priority
            className="animate-gentle-drift object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/90 via-teal-deep/75 to-teal-deep/95" />
        </div>

        <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-between px-5 pt-16 pb-10 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-4xl text-center">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-coral-brand/40 bg-teal-dark/60 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cream-bg">
                Nairobi Repair Lab Open · Same-Day Service
              </span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Precision Computer Repairs. <br />
              <span className="font-serif font-normal italic text-coral-brand">
                Guaranteed Hardware Sales.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-cream-bg/85 sm:text-lg">
              We diagnose, micro-solder, and revive laptops, MacBooks, gaming consoles, and complex electronics that other shops write off — and supply bench-tested computers backed by a real 6-month warranty.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-brand px-7 py-4 text-sm font-black text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-coral-hover active:translate-y-0"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                Book a Fast Repair via WhatsApp
              </a>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-bg/30 bg-white/10 px-7 py-4 text-sm font-bold text-cream-bg backdrop-blur-sm transition-all hover:bg-cream-bg hover:text-teal-deep"
              >
                Browse Tested Computers for Sale
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Micro Guarantees */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-cream-bg/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-coral-brand" />
                No Fix, No Fee Policy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-coral-brand" />
                Free Quick Diagnostics
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-coral-brand" />
                6-Month Written Warranty
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-cream-bg/15 pt-6 text-center sm:grid-cols-4">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <Icon className="h-5 w-5 text-coral-brand mb-1" />
                  <p className="text-xs font-black text-cream-bg">{badge.label}</p>
                  <p className="text-[11px] text-cream-bg/65">{badge.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE 3 PILLARS OF GROWTH */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-kicker mb-3">Our Core Expertise</p>
            <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Engineered to Keep You Working.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-brand-muted">
            Whether your daily work laptop died with an urgent deadline, your gaming console has no display signal, or you need a reliable computer ready for work.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group flex flex-col justify-between rounded-3xl border border-cream-border bg-white shadow-xs transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-surface">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 rounded-xl bg-teal-deep/85 p-2 text-white backdrop-blur-xs">
                      <Icon className="h-5 w-5 text-coral-brand" />
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-2xl font-black tracking-tight text-brand-dark group-hover:text-teal-brand transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-coral-dark">{pillar.tagline}</p>
                    <p className="mt-3 text-xs leading-relaxed text-brand-muted">{pillar.desc}</p>

                    <div className="mt-6 space-y-2 border-t border-cream-border/70 pt-5">
                      {pillar.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-brand-slate font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-brand shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href={pillar.href}
                    className="inline-flex w-full items-center justify-between rounded-xl bg-cream-surface border border-cream-border px-5 py-3 text-xs font-bold text-brand-dark group-hover:bg-teal-deep group-hover:text-white transition-all"
                  >
                    <span>{pillar.cta}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE INSTANT REPAIR ESTIMATOR WIDGET */}
      <section id="estimator" className="border-y border-cream-border bg-cream-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="section-kicker mb-3">Instant Pricing Transparency</span>
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl text-brand-dark">
              What Needs Repair Today?
            </h2>
            <p className="mt-4 text-sm text-brand-muted leading-relaxed">
              Select your device and symptom below to get an estimated cost and turnaround time immediately. No guesswork before you hand over your machine.
            </p>
          </div>

          <QuoteCalculator />
        </div>
      </section>

      {/* FEATURED HARDWARE SALES SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">Tested Computer Sales</span>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                In Stock &amp; Ready
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl text-brand-dark">
              Reliable Machines. Bench-Tested Before Sale.
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-cream-border bg-white px-6 py-3 text-xs font-bold text-brand-dark shadow-xs hover:border-teal-brand hover:text-teal-brand transition-colors"
          >
            <span>View All Stock on Shop</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-cream-border bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-surface border-b border-cream-border">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-teal-deep/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                    {prod.condition}
                  </span>
                  <span className="absolute top-3 right-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-teal-brand shadow-xs backdrop-blur-xs">
                    🛡️ {prod.warranty}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-teal-brand">
                    {prod.category.replace("-", " ")}
                  </span>
                  <h3 className="mt-1 text-lg font-black text-brand-dark group-hover:text-teal-brand transition-colors">
                    {prod.name}
                  </h3>

                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black font-mono text-coral-dark">
                      KES {prod.priceKes.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-brand-muted line-clamp-2 mb-4">
                    {prod.description}
                  </p>

                  <div className="space-y-1.5 rounded-2xl border border-cream-border bg-cream-surface p-3">
                    {prod.specs.slice(0, 3).map((spec, sidx) => (
                      <div key={sidx} className="flex items-center gap-2 text-[11px] text-brand-slate font-medium">
                        <CheckCircle2 className="h-3 w-3 text-teal-brand shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20interested%20in%20purchasing%20the%20"${encodeURIComponent(
                    prod.name
                  )}"%20priced%20at%20KES%20${prod.priceKes.toLocaleString()}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-xs hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSIDE THE ZOLLANI LAB: WHY WE FIX WHAT OTHERS CANNOT */}
      <section className="bg-brand-dark text-cream-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="section-kicker text-coral-brand">Board-Level Precision</span>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl text-cream-bg">
                Why Replace a Motherboard for KES 35,000 When We Can Fix the Damaged IC Chip?
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-cream-bg/75 sm:text-base">
                Most repair shops are merely parts-swappers. If a computer won&apos;t boot, they tell you to buy an entire new motherboard. In our lab, our electronic engineers use thermal imaging, micro-soldering, and board schematics to locate shorted capacitors, blown MOSFETs, and fried power management circuits.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-cream-bg/15 bg-white/5 p-4 backdrop-blur-xs">
                  <p className="font-mono text-xs uppercase font-bold text-coral-brand">Component-Level Saving</p>
                  <p className="mt-2 text-xs leading-relaxed text-cream-bg/70">
                    Save up to 70% compared to official brand service centers by repairing individual circuit elements.
                  </p>
                </div>

                <div className="rounded-2xl border border-cream-bg/15 bg-white/5 p-4 backdrop-blur-xs">
                  <p className="font-mono text-xs uppercase font-bold text-coral-brand">Data Stays Intact</p>
                  <p className="mt-2 text-xs leading-relaxed text-cream-bg/70">
                    Fixing your existing logic board keeps your encrypted drives, licenses, and personal documents right where they belong.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20have%20a%20dead%20laptop%20or%20logic%20board%20that%20needs%20diagnostics."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-coral-brand px-6 py-3.5 text-xs font-bold text-white hover:bg-coral-hover transition-colors"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  Bring Your Device for Board Diagnostics
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-cream-bg/20">
                <Image
                  src="/images/hardware-motherboard.jpg"
                  alt="Micro-soldering inspection under digital microscope"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/75 px-3 py-1 text-[11px] font-bold text-white">
                  Micro-soldering Bench
                </span>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-cream-bg/20">
                <Image
                  src="/images/data-recovery-hdd.jpg"
                  alt="Data recovery hardware lab"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/75 px-3 py-1 text-[11px] font-bold text-white">
                  Storage &amp; Data Recovery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORD ON THE STREET / TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-12">
          <p className="section-kicker mb-3">Client Trust &amp; Reviews</p>
          <h2 className="max-w-xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Fixed Right Once. Trusted Since.
          </h2>
          <p className="mt-2 text-xs text-brand-muted">
            Over 5,000 successful repairs and verified hardware sales across Kenya.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col justify-between rounded-3xl border border-cream-border bg-white p-7 shadow-xs"
            >
              <div>
                <div className="flex gap-1 text-coral-brand">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-xs leading-relaxed text-brand-slate font-medium">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-cream-border pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-subtle text-xs font-black text-teal-brand">
                  {t.avatarText}
                </span>
                <div>
                  <span className="block text-xs font-bold text-brand-dark">{t.name}</span>
                  <span className="block text-[11px] text-brand-muted">
                    {t.role} · {t.companyOrLocation}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PARTNERS ECOSYSTEM */}
      {partners.length > 0 && (
        <section className="bg-cream-surface py-16 border-t border-cream-border">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-8">
              <span className="section-kicker">Collaborations &amp; Sourcing</span>
              <h3 className="mt-2 text-2xl font-black text-brand-dark">Our Tech Ecosystem</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((p) => (
                <div key={p.id} className="rounded-2xl border border-cream-border bg-white p-5">
                  <p className="font-bold text-sm text-brand-dark">{p.name}</p>
                  <p className="mt-1 text-xs text-brand-muted">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CLOSING HIGH-CONVERSION CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-8 rounded-3xl bg-coral-brand p-8 text-white shadow-xl sm:p-12 lg:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/80">
              Ready When You Are
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.04em]">
              Tell Us What&apos;s Broken — We&apos;ll Take It From There.
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-white/90 leading-relaxed">
              Drop off your computer at our workshop, request an on-site technician, or message us with your hardware questions. Diagnostic quotes given before any work starts.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-7 py-4 text-xs font-black text-white shadow-md transition-transform hover:-translate-y-1 hover:bg-teal-dark active:translate-y-0 text-center"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="tel:+254768551914"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-7 py-4 text-xs font-black text-white transition-colors hover:bg-white hover:text-coral-dark text-center"
            >
              <Phone className="h-4 w-4" />
              <span>Call +254 768 551914</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
