import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import {
  Building2,
  ShieldCheck,
  Network,
  Clock,
  CheckCircle2,
  HardDrive,
  FileDown,
  ArrowRight,
  Phone,
  MessageCircle,
  Users,
  Server,
  Headphones,
} from "lucide-react";

export default function BusinessITPage() {
  const slaTiers = [
    {
      name: "Starter SME Retainer",
      idealFor: "Offices with 5 – 15 workstations",
      price: "Custom Monthly Quote",
      features: [
        "Guaranteed 4-hour on-site response time",
        "Unlimited remote software & helpdesk tickets",
        "Weekly automated cloud data backups",
        "Quarterly physical preventative hardware dustout",
        "Antivirus & endpoint firewall monitoring",
        "Router & office WiFi maintenance",
      ],
      popular: false,
    },
    {
      name: "Professional Growth",
      idealFor: "Offices with 15 – 35 workstations",
      price: "Most Popular B2B Plan",
      features: [
        "Guaranteed 2-hour emergency response SLA",
        "Bi-weekly on-site engineer visit",
        "Daily 3-2-1 hybrid backup validation",
        "Structured Cat6 cabling & rack maintenance",
        "Dedicated account engineer & direct WhatsApp line",
        "Printer fleet & scanner queue management",
        "Quarterly executive IT infrastructure audit",
      ],
      popular: true,
    },
    {
      name: "Enterprise Dedicated",
      idealFor: "Multi-branch / 35+ workstations & servers",
      price: "Bespoke SLA Agreement",
      features: [
        "Immediate 1-hour priority dispatch",
        "Dedicated resident or scheduled on-site engineer",
        "Server virtualization & Active Directory management",
        "Cybersecurity compliance & employee phishing audits",
        "Hardware loaner units during repair downtime",
        "Vendor management (ISP fiber, software licensing)",
      ],
      popular: false,
    },
  ];

  return (
    <div className="bg-cream-bg min-h-screen">
      <PageHero
        eyebrow="Business IT / Nairobi"
        title="Keep work moving."
        description="Rapid on-site engineering, dependable networks, secure backups, and a direct line to a real technician — without building a full in-house IT department."
        image="/images/corporate-team-server.jpg"
        imageAlt="Business IT server infrastructure"
        action={{ label: "Request a proposal", href: "#quote-form" }}
        secondaryAction={{ label: "Company profile", href: "/Zollani-Tech-Company-Profile.pdf" }}
      />

      {/* 4 Pillars of Business IT */}
      <section className="py-16 sm:py-20 bg-cream-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
              What We Handle
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
              A Complete External IT Department For Your Office
            </h2>
            <p className="text-sm text-brand-muted mt-2">
              Focus on growing your core business while Zollani Tech keeps your systems fast,
              connected, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-brand-dark mb-2">
                Helpdesk &amp; Workstation Support
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Fast resolution of daily staff issues: printer offline errors, Windows crashes,
                slow laptops, email sync, and software licensing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-4">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-brand-dark mb-2">
                Network &amp; Structured Cabling
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Cat6 cable runs, server patch panel termination, UniFi mesh WiFi, and
                MikroTik firewall security setup across floors.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-4">
                <HardDrive className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-brand-dark mb-2">
                Disaster Recovery &amp; Backups
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Automated local NAS and cloud backups ensuring accounting files, legal briefs,
                and CRM databases are impervious to ransomware.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-subtle text-teal-brand flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-brand-dark mb-2">
                Cybersecurity Hardening
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Certified ethical hacker oversight, multi-factor authentication (MFA) rollouts,
                and employee cyber hygiene audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLA Tiers */}
      <section className="py-16 sm:py-20 bg-cream-surface border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
              Predictable Retainers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
              Flexible Monthly SLA Support Tiers
            </h2>
            <p className="text-sm text-brand-muted mt-2">
              Transparent monthly contracts tailored to your exact seat count and infrastructure complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {slaTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 transition-all flex flex-col justify-between ${
                  tier.popular
                    ? "bg-white border-2 border-coral-brand shadow-xl relative"
                    : "bg-white border border-cream-border shadow-sm"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 right-8 bg-coral-brand text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                    Recommended
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-black text-brand-dark">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">{tier.idealFor}</p>
                  <div className="my-6 pb-6 border-b border-cream-border">
                    <span className="text-lg font-bold text-teal-brand font-mono">
                      {tier.price}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-xs text-brand-slate">
                        <CheckCircle2 className="w-4 h-4 text-teal-brand shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                    tier.name
                  )}%20plan%20for%20our%20office.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-all ${
                    tier.popular
                      ? "bg-coral-brand hover:bg-coral-hover text-white"
                      : "bg-teal-subtle hover:bg-teal-brand hover:text-white text-teal-brand"
                  }`}
                >
                  Inquire About This Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="quote-form" className="py-16 sm:py-24 bg-cream-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm
            defaultService="Business IT Support Contract"
            source="business-it-page"
          />
        </div>
      </section>
    </div>
  );
}
