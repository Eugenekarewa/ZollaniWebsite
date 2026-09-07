import React from "react";
import Image from "next/image";
import Link from "next/link";
import { QuoteCalculator } from "@/components/interactive/QuoteCalculator";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SERVICE_CATEGORIES, TRUST_BRANDS } from "@/data/servicesData";
import { TESTIMONIALS } from "@/data/testimonialsData";
import {
  Wrench,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  MessageCircle,
  Phone,
  CheckCircle2,
  Star,
  Cpu,
  HardDrive,
  Network,
  Zap,
  Clock,
  FileDown,
  Award,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const iconMap: Record<string, any> = {
    Wrench,
    Cpu,
    ShieldCheck,
    HardDrive,
    Network,
    Building2,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-teal-deep text-white pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-datacenter.jpg"
            alt="Zollani Tech IT Infrastructure and Repair Operations"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/90 to-teal-dark/80" />
          <div className="absolute inset-0 bg-[radial-gradient(#EE8B6C_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-coral-brand/20 border border-coral-brand/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-coral-brand tracking-wide">
                <Sparkles className="w-4 h-4 text-coral-brand" />
                <span>Nairobi&apos;s Trusted Electronics Repair &amp; IT Partner</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                We Fix. <br />
                <span className="text-coral-brand font-serif italic font-normal">
                  You Smile.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-cream-bg/90 max-w-2xl leading-relaxed font-normal">
                Expert chip-level motherboard diagnostics, laptop screen replacements,
                enterprise data recovery, and managed business IT support in Nairobi.
                We restore what others tell you to replace.
              </p>

              {/* Conversion Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20a%20quote%20for%20a%20repair."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-coral-brand hover:bg-coral-hover text-white px-7 py-4 rounded-2xl font-bold text-base shadow-lg shadow-coral-brand/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Book a Repair on WhatsApp</span>
                </a>

                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-bold text-base border border-white/20 transition-all"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/15 max-w-xl">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    Board-Level
                  </div>
                  <div className="text-xs text-cream-bg/75">
                    Micro-soldering lab
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-coral-brand font-mono">
                    Same-Day
                  </div>
                  <div className="text-xs text-cream-bg/75">
                    Screens &amp; upgrades
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    6 Months
                  </div>
                  <div className="text-xs text-cream-bg/75">
                    Warranty on repairs
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Service Diagnostic Banner */}
            <div className="lg:col-span-5">
              <div className="bg-cream-surface text-brand-dark rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-coral-brand/40 relative">
                <div className="flex items-center justify-between pb-4 border-b border-cream-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-brand text-white flex items-center justify-center font-black">
                      ZT
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-dark">
                        Rapid Repair Dispatch
                      </h4>
                      <p className="text-[11px] text-brand-muted">
                        Nairobi On-Site &amp; Drop-Off
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Technicians Active
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <div className="p-3 rounded-xl bg-cream-bg border border-cream-border flex items-start gap-3">
                    <Wrench className="w-4 h-4 text-coral-brand mt-0.5 shrink-0" />
                    <div className="text-xs">
                      <strong className="text-brand-dark block">Hardware &amp; Screens:</strong>
                      MacBook, HP, Dell, Lenovo, ThinkPad, Asus, and gaming rigs.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cream-bg border border-cream-border flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-teal-brand mt-0.5 shrink-0" />
                    <div className="text-xs">
                      <strong className="text-brand-dark block">Cybersecurity &amp; IT Support:</strong>
                      Certified ethical hacker led protection for home &amp; business.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cream-bg border border-cream-border flex items-start gap-3">
                    <Zap className="w-4 h-4 text-coral-brand mt-0.5 shrink-0" />
                    <div className="text-xs">
                      <strong className="text-brand-dark block">Turbo Speed Upgrades:</strong>
                      SSD + RAM conversions make old PCs boot in 15 seconds.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="tel:+254768551914"
                    className="w-full flex items-center justify-center gap-2 bg-teal-brand hover:bg-teal-dark text-white py-3 rounded-xl font-bold text-sm shadow-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Hotline: +254 768 551914</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE SECTION DIVIDER */}
      <SectionDivider
        variant="curve-down"
        fillColor="#F7F2EC"
        strokeColor="#EE8B6C"
        className="-mt-2 relative z-20"
      />

      {/* TRUSTED ECOSYSTEM STRIP */}
      <section className="bg-cream-bg py-8 border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase font-bold tracking-widest text-brand-muted mb-6">
            Industry Standards &amp; Enterprise Ecosystem Experience
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-80">
            {TRUST_BRANDS.map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 border border-cream-border text-xs font-bold text-brand-slate"
              >
                <div className="w-2 h-2 rounded-full bg-teal-brand" />
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE AUDIENCE PATHWAYS */}
      <section className="py-16 sm:py-24 bg-cream-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
              Tailored Solutions for Every Need
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-2">
              Whether your personal laptop just died, your company needs managed IT, or
              your school wants practical digital training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pathway 1: Walk-ins / Individuals */}
            <div className="bg-white rounded-3xl p-7 shadow-lg border border-cream-border flex flex-col justify-between hover:shadow-xl transition-all group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-coral-light text-coral-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wrench className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-coral-brand mb-1">
                  Individuals &amp; Households
                </div>
                <h3 className="text-xl font-black text-brand-dark mb-3">
                  Walk-In &amp; Express Device Repair
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  Laptop broke? Screen cracked? Liquid spill or phone battery dead?
                  Drop off your device or request a pickup. Honest diagnostics and rapid turnaround.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-brand-slate mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Same-day screen &amp; keyboard replacement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Dead motherboard micro-soldering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Corrupted drive &amp; photo data recovery
                  </li>
                </ul>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center justify-between bg-teal-subtle text-teal-brand hover:bg-teal-brand hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <span>Find Your Repair</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pathway 2: Businesses */}
            <div className="bg-white rounded-3xl p-7 shadow-lg border-2 border-teal-brand flex flex-col justify-between relative hover:shadow-xl transition-all group">
              <div className="absolute -top-3.5 right-6 bg-teal-brand text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                Highest Value
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-brand mb-1">
                  Businesses &amp; Offices
                </div>
                <h3 className="text-xl font-black text-brand-dark mb-3">
                  Managed IT Support &amp; Contracts
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  Predictable monthly IT retainers for Nairobi SMEs, law firms, clinics,
                  and agencies. Never suffer costly office downtime again.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-brand-slate mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Guaranteed rapid response SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Structured Cat6 cabling &amp; firewall setup
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Daily automated cloud &amp; NAS backup
                  </li>
                </ul>
              </div>
              <Link
                href="/business-it"
                className="inline-flex items-center justify-between bg-teal-brand text-white hover:bg-teal-dark px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-colors"
              >
                <span>Explore Business Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pathway 3: Training & Youth */}
            <div className="bg-white rounded-3xl p-7 shadow-lg border border-cream-border flex flex-col justify-between hover:shadow-xl transition-all group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                  Youth &amp; Institutions
                </div>
                <h3 className="text-xl font-black text-brand-dark mb-3">
                  AI Msingi &amp; Tech Training
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  Practical, Kenya-grounded training programs for schools, colleges, and corporate
                  workplaces. Closing the skills gap with real, job-ready technology depth.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-brand-slate mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    AI Msingi (CBC-aligned curriculum for ages 9–18)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Hands-on hardware &amp; Linux bootcamps
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0" />
                    Corporate staff cybersecurity awareness
                  </li>
                </ul>
              </div>
              <Link
                href="/training"
                className="inline-flex items-center justify-between bg-teal-subtle text-teal-brand hover:bg-teal-brand hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <span>Discover Training Tracks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE QUOTE ESTIMATOR */}
      <section className="py-12 sm:py-16 bg-cream-surface border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteCalculator />
        </div>
      </section>

      {/* FEATURED SERVICES PREVIEW */}
      <section className="py-16 sm:py-24 bg-cream-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-coral-brand bg-coral-light px-3.5 py-1 rounded-full">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
                Complete IT &amp; Electronics Solutions
              </h2>
              <p className="text-sm sm:text-base text-brand-muted mt-2 max-w-xl">
                From micro-soldering microscopic capacitors to deploying enterprise networks,
                our engineering depth covers all 9 service verticals.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-brand hover:text-teal-dark transition-colors self-start md:self-end"
            >
              <span>View full directory of 50+ services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.slice(0, 6).map((cat) => {
              const Icon = iconMap[cat.iconName] || Wrench;
              return (
                <div
                  key={cat.key}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-brand-dark mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-coral-brand font-medium mb-3">
                      {cat.tagline}
                    </p>
                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-3 mb-4">
                      {cat.description}
                    </p>
                    <div className="space-y-1.5 border-t border-cream-border pt-3">
                      {cat.items.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs text-brand-slate"
                        >
                          <span className="truncate pr-2">• {item.name}</span>
                          <span className="text-[10px] text-teal-brand font-mono shrink-0">
                            {item.turnaround}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5 mt-4 border-t border-cream-border flex items-center justify-between">
                    <Link
                      href={`/services#${cat.key}`}
                      className="text-xs font-bold text-teal-brand hover:underline flex items-center gap-1"
                    >
                      <span>Explore {cat.items.length} items</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <a
                      href={`https://wa.me/254768551914?text=Hello%2C%20I%20need%20assistance%20with%20${encodeURIComponent(
                        cat.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-coral-brand hover:underline"
                    >
                      Book on WhatsApp →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US & CREDENTIALS STRIP */}
      <section className="bg-teal-deep text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3E7A78_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Real Photos */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-brand/40">
                <Image
                  src="/images/hardware-motherboard.jpg"
                  alt="Board-level micro-soldering diagnostics at Zollani Tech"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                  <div className="flex items-center gap-2 text-coral-brand text-xs font-bold uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4" />
                    <span>Technical Leadership</span>
                  </div>
                  <h4 className="text-white font-bold text-sm">
                    Led by Eugene Otieno Karewa, Founder &amp; CTO
                  </h4>
                  <p className="text-xs text-cream-bg/80 mt-0.5">
                    Cisco Certified Ethical Hacker · ISACA CSX · BSc Applied Physics
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Why choose us */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-wider text-coral-brand bg-coral-brand/20 px-3.5 py-1 rounded-full">
                Why Customers Choose Zollani Tech
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Authentic Component-Level Depth That Generic Repair Shops Cannot Match
              </h2>
              <p className="text-sm sm:text-base text-cream-bg/85 leading-relaxed">
                Most repair shops are simple &quot;part swappers&quot; who quote massive fees to
                replace an entire logic board when a single power regulator burns out.
                At Zollani Tech, we diagnose the schematic, solder the trace, and save you up to 70%
                of replacement costs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-teal-brand/30 p-4 rounded-2xl border border-teal-brand/50">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral-brand" />
                    <span>Free Physical Diagnostics</span>
                  </div>
                  <p className="text-xs text-cream-bg/75 leading-relaxed">
                    We open, inspect, and quote transparently before you commit to any repair fee.
                  </p>
                </div>

                <div className="bg-teal-brand/30 p-4 rounded-2xl border border-teal-brand/50">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral-brand" />
                    <span>Up to 6 Months Warranty</span>
                  </div>
                  <p className="text-xs text-cream-bg/75 leading-relaxed">
                    Every repair and replacement part is guaranteed with a clear warranty receipt.
                  </p>
                </div>

                <div className="bg-teal-brand/30 p-4 rounded-2xl border border-teal-brand/50">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral-brand" />
                    <span>Strict Data Confidentiality</span>
                  </div>
                  <p className="text-xs text-cream-bg/75 leading-relaxed">
                    Certified ethical hacker standards ensure your personal photos, passwords, and records stay secure.
                  </p>
                </div>

                <div className="bg-teal-brand/30 p-4 rounded-2xl border border-teal-brand/50">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral-brand" />
                    <span>M-Pesa Verified Business</span>
                  </div>
                  <p className="text-xs text-cream-bg/75 leading-relaxed">
                    Pay securely via Official M-Pesa Paybill 714888 with automated receipts.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-coral-brand hover:bg-coral-hover text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
                >
                  <span>Learn More About Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="/Zollani-Tech-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-cream-bg/90 hover:text-coral-brand underline font-medium"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Company Profile (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 bg-cream-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
              Real Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
              Trusted Across Nairobi
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-2">
              Read how we have helped professionals, corporate directors, and students get back to work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 shadow-md border border-cream-border flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-slate italic leading-relaxed">
                    &quot;{test.quote}&quot;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-cream-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-subtle text-teal-brand font-bold text-xs flex items-center justify-center">
                    {test.avatarText}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-brand-dark">
                      {test.name}
                    </h4>
                    <p className="text-[11px] text-brand-muted">
                      {test.role} · {test.companyOrLocation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="bg-gradient-to-br from-teal-deep via-teal-brand to-teal-dark text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-coral-brand text-white text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider shadow-sm">
            Ready to Fix Your Device?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Stop Staring at a Broken Screen. <br />
            <span className="text-coral-brand font-serif italic font-normal">
              Let&apos;s Get You Back Online Today.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-cream-bg/90 max-w-xl mx-auto">
            Drop off in Nairobi, request on-site technician dispatch, or chat instantly
            with our certified lead engineer.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20ready%20to%20book%20a%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-coral-brand hover:bg-coral-hover text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>WhatsApp Us: +254 768 551914</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-4 rounded-2xl font-bold text-base border border-white/20 transition-all"
            >
              <span>Submit Detailed Quote Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
