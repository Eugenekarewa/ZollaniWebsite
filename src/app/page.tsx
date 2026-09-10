import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MessageCircle,
  MoveRight,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/servicesData";

const whatsappHref =
  "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20help%20with%20a%20repair.";

export default function HomePage() {
  const featured = SERVICE_CATEGORIES.slice(0, 3);

  return (
    <div className="bg-cream-bg text-brand-dark">
      <section className="relative overflow-hidden bg-teal-deep text-cream-bg">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-datacenter.jpg"
            alt="Zollani Tech repair workspace"
            fill
            priority
            className="animate-gentle-drift object-cover object-center opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-teal-deep/80" />
        </div>
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-between gap-16 px-5 py-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-cream-bg/70">
            <span>Zollani Tech / Nairobi</span>
            <span className="hidden sm:inline">Repair · Support · Training</span>
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="animate-rise-in">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-coral-brand/50 bg-coral-brand/10 px-3 py-1.5 text-xs font-bold text-coral-brand">
                <Wrench className="h-3.5 w-3.5" />
                The repair lab that goes deeper
              </div>
              <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[7.25rem]">
                Don&apos;t replace it.
                <span className="block font-serif font-normal italic text-coral-brand">Revive it.</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-cream-bg/75 sm:text-lg">
                Board-level repairs, honest diagnostics, and IT support for the devices and businesses that keep Nairobi moving.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-brand px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-coral-hover">
                  <MessageCircle className="h-4 w-4 fill-current" />
                  Start a repair
                </a>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-bg/30 px-6 py-3.5 text-sm font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep">
                  See what we fix <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="animate-rise-in animate-rise-in-delay-2 lg:justify-self-end">
              <div className="max-w-sm border-l border-coral-brand pl-5 text-sm leading-6 text-cream-bg/80">
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">Today at the lab</p>
                <div className="space-y-4">
                  <div className="flex gap-3"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-coral-brand" /><span>Same-day screens, batteries &amp; speed upgrades.</span></div>
                  <div className="flex gap-3"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-coral-brand" /><span>Transparent quotes before any work begins.</span></div>
                  <div className="flex gap-3"><Wrench className="mt-1 h-4 w-4 shrink-0 text-coral-brand" /><span>Micro-soldering for the devices others write off.</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream-bg/15 pt-5 text-xs font-semibold text-cream-bg/60">
            <span>Mon–Sat · 8:00–19:00</span><span>Westlands + on-site</span><span>6-month repair warranty</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-coral-dark">Choose your lane</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">One lab. Three ways to move forward.</h2></div>
          <p className="max-w-xs text-sm leading-6 text-brand-muted">Practical help for personal devices, busy teams, and curious future builders.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-cream-border bg-cream-border md:grid-cols-3">
          {[
            { kicker: "01 / Devices", title: "Get your tech back.", body: "Screens, charging ports, dead boards, data and speed.", href: "/services", label: "Find a repair" },
            { kicker: "02 / Business", title: "Keep work moving.", body: "Reliable IT support, networks and security for growing teams.", href: "/business-it", label: "Explore business IT" },
            { kicker: "03 / Training", title: "Build what's next.", body: "Hands-on AI, hardware and digital skills for a changing world.", href: "/training", label: "View training" },
          ].map((item) => (
            <Link key={item.kicker} href={item.href} className="group bg-cream-surface p-7 transition-colors hover:bg-teal-brand hover:text-white sm:p-9">
              <div className="mb-16 flex items-start justify-between"><span className="font-mono text-xs uppercase tracking-[0.16em] text-coral-dark group-hover:text-coral-brand">{item.kicker}</span><ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
              <h3 className="text-2xl font-black tracking-[-0.03em]">{item.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-brand-muted group-hover:text-white/75">{item.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">{item.label}<MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-teal-subtle py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-teal-brand">Inside the lab</p><h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Small fixes.<br /><span className="font-serif font-normal italic text-coral-dark">Big relief.</span></h2><p className="mt-5 max-w-sm text-sm leading-6 text-brand-muted">We diagnose before we quote, explain before we repair, and test before we return your device.</p></div><div className="grid gap-5 sm:grid-cols-3">{featured.map((service, index) => <Link key={service.key} href="/services" className="group border-t-2 border-teal-brand pt-5"><span className="font-mono text-xs text-coral-dark">0{index + 1}</span><h3 className="mt-10 text-xl font-black tracking-[-0.03em] group-hover:text-teal-brand">{service.title}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{service.tagline}</p><span className="mt-6 inline-flex text-teal-brand"><MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="grid items-center gap-8 rounded-2xl bg-coral-brand p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto]"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Ready when you are</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Tell us what&apos;s wrong. We&apos;ll tell you what&apos;s possible.</h2></div><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1">Chat on WhatsApp <ArrowUpRight className="h-4 w-4" /></a></div></section>
    </div>
  );
}

