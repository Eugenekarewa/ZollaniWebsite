import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { db } from "@/lib/db";
import { aboutProfiles } from "@/lib/db/schema";
import { and, asc, eq } from "drizzle-orm";

import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileDown,
  ArrowRight,
  HeartHandshake,
  Recycle,
  Lightbulb,
  CreditCard,
  Phone,
  MessageCircle,
  GraduationCap,
} from "lucide-react";

export default async function AboutPage() {
  let profiles: typeof aboutProfiles.$inferSelect[] = [];
  try {
    profiles = await db.select().from(aboutProfiles).where(eq(aboutProfiles.isPublished, true)).orderBy(asc(aboutProfiles.sortOrder), asc(aboutProfiles.createdAt));
  } catch {
    profiles = [];
  }
  const owner = profiles.find((profile) => profile.profileType === "owner");
  const team = profiles.filter((profile) => profile.profileType !== "owner");
  const values = [
    {
      title: "Repair, Don’t Replace",
      description:
        "We restore devices at a fraction of replacement costs, saving our clients hundreds of thousands of shillings while actively keeping e-waste out of Kenyan landfills.",
      icon: Recycle,
    },
    {
      title: "Honest Diagnostics & Pricing",
      description:
        "No hidden fees or invented problems. We diagnose physical components in front of you and obtain your explicit confirmation before beginning any work.",
      icon: ShieldCheck,
    },
    {
      title: "Genuine Board-Level Depth",
      description:
        "Where generic shops replace whole motherboards, we trace schematics with multimeters, solder microscopic IC chips, and solve root causes.",
      icon: Lightbulb,
    },
    {
      title: "Empowering the Next Generation",
      description:
        "Through AI Msingi and our Community Youth Empowerment Program, every repair you book helps fund practical technology education for young Kenyan learners.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="bg-cream-bg min-h-screen">
      <PageHero
        eyebrow="Our story / Nairobi"
        title="Honest engineering. Lasting solutions."
        description="Zollani Tech is a Nairobi technology company built around professional repair, data recovery, business IT, and practical learning. We Fix. You Smile."
        image="/images/classroom-workshop.jpg"
        imageAlt="Zollani Tech workshop and training space"
        action={{ label: "Get in touch", href: "/contact" }}
        secondaryAction={{ label: "Company profile", href: "/Zollani-Tech-Company-Profile.pdf" }}
      />

      {/* Mission & Vision */}
      <section className="py-20 sm:py-24 bg-cream-bg border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-cream-border">
              <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3 py-1 rounded-full">
                Our Vision
              </span>
              <h3 className="text-2xl font-black text-brand-dark mt-4 mb-3">
                To Be East Africa&apos;s Most Trusted Electronics Partner
              </h3>
              <p className="text-sm text-brand-slate leading-relaxed">
                The place people, businesses, and institutions turn to before they ever think
                of discarding or replacing a device. We aim to set the gold standard in honest
                diagnostics, technical transparency, and environmental responsibility.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-cream-border">
              <span className="text-xs uppercase font-extrabold tracking-wider text-coral-brand bg-coral-light px-3 py-1 rounded-full">
                Our Mission
              </span>
              <h3 className="text-2xl font-black text-brand-dark mt-4 mb-3">
                Extending Device Lifespans &amp; Empowering Community
              </h3>
              <p className="text-sm text-brand-slate leading-relaxed">
                To extend the life of every device we touch through expert, affordable, and honest
                repair — saving our customers money, reducing toxic electronic waste, and building
                high-value technical skills within our Kenyan youth community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile */}
      <section className="py-20 sm:py-28 bg-cream-surface border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/software-engineer.jpg"
                  alt="Eugene Otieno Karewa, Founder and CTO"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-teal-deep via-teal-deep/80 to-transparent p-6 text-white">
                  <div className="text-lg font-black">Eugene Otieno Karewa</div>
                  <div className="text-xs text-coral-brand font-bold">
                    Founder &amp; Chief Technology Officer
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Bio & Certifications */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
                Founder &amp; Engineering Leadership
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                Engineering Depth Grounded in Physics &amp; Cybersecurity
              </h2>

              <p className="text-sm sm:text-base text-brand-slate leading-relaxed">
                The company is led by <strong>Eugene Otieno Karewa</strong>, a full-stack engineer
                and certified cybersecurity practitioner with a Bachelor of Applied Science in
                Physics from Pwani University.
              </p>

              <p className="text-sm text-brand-muted leading-relaxed">
                Eugene combines hands-on technical depth with a track record of community technology
                leadership across Kenya&apos;s developer ecosystem. His physics foundation shapes a
                diagnostic style focused on how electrical circuits actually behave at the silicon level,
                rather than superficial software guessing.
              </p>

              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-cream-border flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-subtle text-teal-brand flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">
                      Cisco Certified Ethical Hacker
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      Offensive security &amp; endpoint penetration testing
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-cream-border flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral-light text-coral-brand flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">
                      ISACA CSX Fundamentals
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      Enterprise security architecture &amp; compliance
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-cream-border flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">
                      BSc Applied Science (Physics)
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      Pwani University · Electronics &amp; electromagnetism
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-cream-border flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">
                      Author of AI Msingi
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      CBC-aligned AI curriculum for Kenyan youth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(owner || team.length > 0) && (
        <section className="border-b border-cream-border bg-cream-surface py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl"><span className="rounded-full bg-teal-subtle px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-teal-brand">The people behind the work</span><h2 className="mt-4 text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">A team you can trust with your technology.</h2><p className="mt-3 text-sm leading-relaxed text-brand-muted">Meet the people who make Zollani Tech practical, responsive, and deeply human.</p></div>
            {owner && <div className="mb-10 grid gap-8 rounded-3xl border border-cream-border bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[280px_1fr] lg:items-center"><img src={owner.imageUrl} alt={owner.name} className="aspect-square w-full rounded-2xl object-cover" /><div><p className="text-xs font-extrabold uppercase tracking-wider text-coral-brand">Founder / owner</p><h3 className="mt-2 text-3xl font-black text-brand-dark">{owner.name}</h3><p className="mt-1 font-mono text-xs uppercase tracking-wider text-teal-brand">{owner.role}</p><p className="mt-5 text-sm leading-relaxed text-brand-slate">{owner.bio}</p></div></div>}
            {team.length > 0 && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{team.map((member) => <article key={member.id} className="overflow-hidden rounded-3xl border border-cream-border bg-white shadow-sm"><img src={member.imageUrl} alt={member.name} className="aspect-[4/3] w-full object-cover" /><div className="p-6"><p className="font-mono text-[11px] uppercase tracking-wider text-teal-brand">{member.role}</p><h3 className="mt-2 text-xl font-black text-brand-dark">{member.name}</h3><p className="mt-3 text-sm leading-relaxed text-brand-muted">{member.bio}</p></div></article>)}</div>}
          </div>
        </section>
      )}

      {/* Core Company Values */}
      <section className="py-20 sm:py-28 bg-cream-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-kicker">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
              Why We Do What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-brand-dark mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Payment Guide */}
      <section className="py-12 sm:py-16 bg-white border-t border-cream-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-surface rounded-3xl p-8 sm:p-10 border-2 border-teal-brand/30 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-dark">
                    Official Payment Channels
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Pay safely with verified business receipts
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Lipa Na M-Pesa
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-cream-border text-center">
                <div className="text-xs uppercase font-bold text-brand-muted">Paybill Number</div>
                <div className="text-2xl font-black text-coral-brand font-mono mt-1">714888</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-cream-border text-center">
                <div className="text-xs uppercase font-bold text-brand-muted">Account Number</div>
                <div className="text-2xl font-black text-teal-brand font-mono mt-1">480939</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-cream-border text-center">
                <div className="text-xs uppercase font-bold text-brand-muted">Registered Name</div>
                <div className="text-base font-bold text-brand-dark mt-2 truncate">
                  Zollani Tech Limited
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
