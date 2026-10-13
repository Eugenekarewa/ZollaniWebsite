import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Handshake, MessageCircle, MoveRight, ShieldCheck, Wrench } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/servicesData";
import { getPublishedPartners } from "@/app/admin/about/partner-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Technology & Business Operations Partner in Kenya | Zollani Tech",
  description:
    "Zollani Tech helps Kenyan businesses operate better through technology, managed IT, technical support, training, and upcoming business software products.",
};

const whatsappHref = "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20help%20with%20a%20repair.";

const lanes = [
  { kicker: "Devices", title: "Laptop repair Nairobi", image: "/images/hardware-motherboard.jpg", href: "/services", label: "Find a repair" },
  { kicker: "Business", title: "IT support that stays close", image: "/images/corporate-team-server.jpg", href: "/business-it", label: "Explore business IT" },
  { kicker: "Training", title: "Practical skills for what is next", image: "/images/youth-empowerment-students.jpg", href: "/training", label: "View training" },
];

export default async function HomePage() {
  const [featured, partners] = await Promise.all([Promise.resolve(SERVICE_CATEGORIES.slice(0, 3)), getPublishedPartners()]);

  return (
    <div className="bg-cream-bg text-brand-dark">
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="absolute inset-0">
          <Image src="/images/hero-datacenter.jpg" alt="Zollani Tech electronics repair lab in Nairobi" fill priority className="animate-gentle-drift object-cover object-center opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-teal-deep/80" />
        </div>
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl flex-col justify-between gap-16 px-5 py-6 sm:px-8 lg:px-12">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-rise-in">
                  <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[7.25rem]">Make work <span className="font-serif font-normal italic text-coral-brand">work better.</span></h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-cream-bg/75 sm:text-lg">Technology, business operations, and practical support for organizations that need less friction and more momentum.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-brand px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-coral-hover"><MessageCircle className="h-4 w-4 fill-current" />Talk to our team</a><Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-bg/30 px-6 py-3.5 text-sm font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep">See what we fix <ArrowUpRight className="h-4 w-4" /></Link></div>
            </div>
            <div className="animate-rise-in animate-rise-in-delay-2 lg:justify-self-end"><div className="max-w-sm border-l border-coral-brand pl-5 text-sm leading-6 text-cream-bg/80"><p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">The Zollani standard</p><div className="space-y-4"><div className="flex gap-3"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-coral-brand" /><span>Same-day screens, batteries, and upgrades.</span></div><div className="flex gap-3"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-coral-brand" /><span>Clear quotes before work begins.</span></div><div className="flex gap-3"><Wrench className="mt-1 h-4 w-4 shrink-0 text-coral-brand" /><span>Micro-soldering for written-off devices.</span></div></div></div></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream-bg/15 pt-5 text-xs font-semibold text-cream-bg/60"><span>Mon–Sat · 8:00–19:00</span><span>Westlands + on-site</span><span>6-month repair warranty</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-6 overflow-hidden rounded-3xl bg-brand-dark text-cream-bg lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-12 lg:p-16"><p className="section-kicker mb-4 text-coral-brand">Coming soon</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">A simpler way to run the day-to-day.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-cream-bg/70 sm:text-base">We are building our own POS and business operations products for the clients we already understand: local businesses that need dependable tools, clear information, and support that stays close.</p><div className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream-bg/20 px-5 py-3 text-sm font-bold"><span className="h-2 w-2 rounded-full bg-coral-brand" />Zollani products are on the way</div></div>
          <div className="flex min-h-[280px] items-end bg-teal-brand/40 p-8 sm:min-h-[340px] sm:p-12"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">Built for Kenyan businesses</p><p className="mt-4 max-w-xs text-2xl font-black tracking-[-0.03em]">Operations, sales, and customer service in one connected workflow.</p></div></div>
        </div>
      </section>

      {partners.length > 0 && <section className="bg-cream-surface py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="section-kicker mb-3">Our ecosystem</p><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Better work is collaborative.</h2></div><Handshake className="hidden h-10 w-10 text-coral-brand sm:block" /></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{partners.map((partner) => <a key={partner.id} href={partner.websiteUrl || undefined} target={partner.websiteUrl ? "_blank" : undefined} rel={partner.websiteUrl ? "noopener noreferrer" : undefined} className="rounded-2xl border border-cream-border bg-cream-bg p-5 transition-transform hover:-translate-y-1"><p className="text-lg font-black tracking-[-0.03em]">{partner.name}</p><p className="mt-2 text-xs leading-5 text-brand-muted">{partner.description}</p></a>)}</div></div></section>}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="section-kicker mb-3">Choose your lane</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Less talking. More useful work.</h2></div><p className="max-w-xs text-sm leading-6 text-brand-muted">Pick the team you need.</p></div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">{lanes.map((item) => <Link key={item.kicker} href={item.href} className="group overflow-hidden rounded-2xl bg-cream-surface shadow-sm transition-transform duration-300 hover:-translate-y-2"><div className="image-frame aspect-[4/3] rounded-none"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-6 sm:p-7"><div className="mb-10 flex items-start justify-between"><span className="font-mono text-xs uppercase tracking-[0.16em] text-coral-dark">{item.kicker}</span><ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h3 className="text-2xl font-black tracking-[-0.03em]">{item.title}</h3><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">{item.label}<MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div>
      </section>

      <section className="bg-teal-subtle py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><p className="section-kicker mb-3">Inside the lab</p><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Small fixes.<br /><span className="font-serif font-normal italic text-coral-dark">Big relief.</span></h2><p className="mt-5 max-w-sm text-sm leading-6 text-brand-muted">We diagnose, explain, repair, and test.</p></div><div className="grid gap-5 sm:grid-cols-3">{featured.map((service, index) => <Link key={service.key} href="/services" className="group border-t-2 border-teal-brand pt-5"><span className="font-mono text-xs text-coral-dark">0{index + 1}</span><h3 className="mt-10 text-xl font-black tracking-[-0.03em] group-hover:text-teal-brand">{service.title}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{service.tagline}</p><span className="mt-6 inline-flex text-teal-brand"><MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="grid gap-4 sm:grid-cols-[1.35fr_0.65fr]"><div className="image-frame min-h-[280px] sm:min-h-[380px]"><Image src="/images/pc-repair-workbench.jpg" alt="Technician diagnosing a device at the Zollani Tech workshop" fill className="object-cover" sizes="(max-width: 640px) 100vw, 65vw" /></div><div className="image-frame min-h-[240px] sm:min-h-[380px]"><Image src="/images/data-recovery-hdd.jpg" alt="Data recovery equipment in the Zollani Tech lab" fill className="object-cover" sizes="(max-width: 640px) 100vw, 35vw" /></div></div></section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"><div className="grid items-center gap-8 rounded-3xl bg-coral-brand p-8 text-white shadow-[0_20px_50px_rgba(201,91,62,0.18)] sm:p-12 lg:grid-cols-[1fr_auto]"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Ready when you are</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Tell us what your business needs.</h2></div><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1">Chat on WhatsApp <ArrowUpRight className="h-4 w-4" /></a></div></section>
    </div>
  );
}
