import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Handshake, HeartHandshake, MessageCircle, MoveRight, Phone, Star, Zap } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/servicesData";
import { TESTIMONIALS } from "@/data/testimonialsData";
import { getPublishedPartners } from "@/app/admin/about/partner-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Laptop Repair & IT Support in Nairobi, Kenya | Zollani Tech",
  description:
    "Same-day laptop repair, data recovery, business IT support and practical tech training in Nairobi. Clear quotes before work, 6-month warranty.",
};

const whatsappHref = "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20help%20with%20a%20repair.";

const lanes = [
  { kicker: "Devices", title: "Laptop repair Nairobi", proof: "Screens in 2–4 hrs · 6-month warranty", image: "/images/hardware-motherboard.jpg", href: "/services", label: "Find a repair" },
  { kicker: "Business", title: "IT support that stays close", proof: "4-hr on-site response · Monthly plans", image: "/images/corporate-team-server.jpg", href: "/business-it", label: "Explore business IT" },
  { kicker: "Training", title: "Practical skills for what is next", proof: "AI to cyber · Learners, TVETs & teams", image: "/images/youth-empowerment-students.jpg", href: "/training", label: "View training" },
];

export default async function HomePage() {
  const featured = SERVICE_CATEGORIES.slice(0, 6);
  const testimonials = [TESTIMONIALS[0], TESTIMONIALS[1], TESTIMONIALS[2]];
  let partners: Awaited<ReturnType<typeof getPublishedPartners>> = [];
  try {
    partners = await getPublishedPartners();
  } catch {
    partners = [];
  }

  return (
    <div className="bg-cream-bg text-brand-dark">
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="absolute inset-0">
          <Image src="/images/hero-datacenter.jpg" alt="Zollani Tech electronics repair lab in Nairobi" fill priority className="animate-gentle-drift object-cover object-center opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/75 via-teal-deep/55 to-teal-deep/85" />
        </div>
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between gap-16 px-5 py-6 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-3xl pt-14 text-center">
            <div className="animate-rise-in">
                  <h1 className="mx-auto max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Laptop repair & IT support <span className="font-serif font-normal italic text-coral-brand">done right.</span></h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-cream-bg/75 sm:text-lg">Same-day screens, batteries & upgrades. Clear quotes before work, board-level repairs, and business IT that stays close.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-brand px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-coral-hover"><MessageCircle className="h-4 w-4 fill-current" />Talk to our team</a><Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-bg/30 px-6 py-3.5 text-sm font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep">See what we fix <ArrowUpRight className="h-4 w-4" /></Link></div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-cream-bg/15 pt-5 text-center text-xs font-semibold text-cream-bg/60"><span>Mon–Sat · 8:00–19:00</span><span>Westlands + on-site pickup</span><span>6-month warranty · Quotes before work</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="section-kicker mb-3">Choose your lane</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Less talking. More useful work.</h2></div><p className="max-w-xs text-sm leading-6 text-brand-muted">Pick the team you need.</p></div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">{lanes.map((item) => <Link key={item.kicker} href={item.href} className="group overflow-hidden rounded-2xl bg-cream-surface shadow-sm transition-transform duration-300 hover:-translate-y-2"><div className="image-frame aspect-[4/3] rounded-none"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-6 sm:p-7"><div className="mb-10 flex items-start justify-between"><span className="font-mono text-xs uppercase tracking-[0.16em] text-coral-dark">{item.kicker}</span><ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h3 className="text-2xl font-black tracking-[-0.03em]">{item.title}</h3><p className="mt-2 text-xs font-semibold text-teal-brand">{item.proof}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">{item.label}<MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-6 overflow-hidden rounded-3xl bg-brand-dark text-cream-bg lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-12 lg:p-16"><p className="section-kicker mb-4 text-coral-brand">Coming soon</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">A simpler way to run the day-to-day.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-cream-bg/70 sm:text-base">We are building Zollani POS and business tools for the shops we already serve: take sales, track stock, and see your day&apos;s numbers — with support that stays close.</p><a href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20please%20notify%20me%20when%20your%20POS%20launches." target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream-bg/20 px-5 py-3 text-sm font-bold transition-colors hover:border-coral-brand hover:text-coral-brand"><span className="h-2 w-2 rounded-full bg-coral-brand" />Notify me when it launches</a></div>
          <div className="flex min-h-[280px] flex-col justify-end bg-teal-brand/40 p-8 sm:min-h-[340px] sm:p-12"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">Built for Kenyan businesses</p><div className="mt-6 space-y-5"><div className="flex gap-3"><Zap className="mt-0.5 h-5 w-5 shrink-0 text-coral-brand" /><div><p className="font-bold">Sell fast</p><p className="mt-1 text-sm leading-6 text-cream-bg/70">Quick checkout for busy counters.</p></div></div><div className="flex gap-3"><BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-coral-brand" /><div><p className="font-bold">Know your numbers</p><p className="mt-1 text-sm leading-6 text-cream-bg/70">Sales and stock at a glance.</p></div></div><div className="flex gap-3"><HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-coral-brand" /><div><p className="font-bold">Support that stays close</p><p className="mt-1 text-sm leading-6 text-cream-bg/70">From the team that already fixes your devices.</p></div></div></div></div></div>
        </div>
      </section>

      {partners.length > 0 && <section className="bg-cream-surface py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="section-kicker mb-3">Our ecosystem</p><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Better work is collaborative.</h2></div><Handshake className="hidden h-10 w-10 text-coral-brand sm:block" /></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{partners.map((partner) => <a key={partner.id} href={partner.websiteUrl || undefined} target={partner.websiteUrl ? "_blank" : undefined} rel={partner.websiteUrl ? "noopener noreferrer" : undefined} className="rounded-2xl border border-cream-border bg-cream-bg p-5 transition-transform hover:-translate-y-1"><p className="text-lg font-black tracking-[-0.03em]">{partner.name}</p><p className="mt-2 text-xs leading-5 text-brand-muted">{partner.description}</p></a>)}</div></div></section>}

      <section className="bg-teal-subtle py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><p className="section-kicker mb-3">Inside the lab</p><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Small fixes.<br /><span className="font-serif font-normal italic text-coral-dark">Big relief.</span></h2><p className="mt-5 max-w-sm text-sm leading-6 text-brand-muted">We diagnose, explain, repair, and test.</p></div><div className="grid gap-5 sm:grid-cols-3">{featured.map((service, index) => <Link key={service.key} href="/services#service-finder" className="group border-t-2 border-teal-brand pt-5"><span className="font-mono text-xs text-coral-dark">0{index + 1}</span><h3 className="mt-10 text-xl font-black tracking-[-0.03em] group-hover:text-teal-brand">{service.title}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{service.tagline}</p><span className="mt-6 inline-flex text-teal-brand"><MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="grid gap-4 sm:grid-cols-[1.35fr_0.65fr]"><div className="image-frame min-h-[280px] sm:min-h-[380px]"><Image src="/images/pc-repair-workbench.jpg" alt="Technician diagnosing a device at the Zollani Tech workshop" fill className="object-cover" sizes="(max-width: 640px) 100vw, 65vw" /><span className="absolute bottom-4 left-4 z-10 rounded-full bg-teal-deep/70 px-3.5 py-1.5 text-xs font-semibold text-cream-bg backdrop-blur-sm">Diagnostics bench</span></div><div className="image-frame min-h-[240px] sm:min-h-[380px]"><Image src="/images/data-recovery-hdd.jpg" alt="Data recovery equipment in the Zollani Tech lab" fill className="object-cover" sizes="(max-width: 640px) 100vw, 35vw" /><span className="absolute bottom-4 left-4 z-10 rounded-full bg-teal-deep/70 px-3.5 py-1.5 text-xs font-semibold text-cream-bg backdrop-blur-sm">Data recovery lab</span></div></div></section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mb-10"><p className="section-kicker mb-3">Word on the street</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Fixed once. Trusted since.</h2></div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">{testimonials.map((t) => <figure key={t.id} className="flex flex-col rounded-2xl border border-cream-border bg-cream-surface p-6 sm:p-7"><div className="flex gap-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-coral-brand text-coral-brand" />)}</div><blockquote className="mt-4 flex-1 text-sm leading-6 text-brand-slate">“{t.quote}”</blockquote><figcaption className="mt-6 flex items-center gap-3 border-t border-cream-border pt-5"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-brand/10 text-xs font-black text-teal-brand">{t.avatarText}</span><span><span className="block text-sm font-bold">{t.name}</span><span className="block text-xs text-brand-muted">{t.role} · {t.companyOrLocation}</span></span></figcaption></figure>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"><div className="grid items-center gap-8 rounded-3xl bg-coral-brand p-8 text-white shadow-[0_20px_50px_rgba(201,91,62,0.18)] sm:p-12 lg:grid-cols-[1fr_auto]"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Ready when you are</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Tell us what&apos;s broken — we&apos;ll take it from there.</h2></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1">Chat on WhatsApp <ArrowUpRight className="h-4 w-4" /></a><a href="tel:+254768551914" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-coral-hover"><Phone className="h-4 w-4" />Call +254 768 551914</a></div></div></section>
    </div>
  );
}
