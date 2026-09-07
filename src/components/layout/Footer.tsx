import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  FileDown,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-teal-deep text-cream-bg pt-16 pb-12 border-t-4 border-coral-brand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-teal-brand/30">
          {/* Column 1: Brand & Promise */}
          <div className="space-y-4">
            <Logo variant="white" size="lg" />
            <p className="text-sm text-cream-bg/85 leading-relaxed pt-2">
              Zollani Tech Limited is a Nairobi-based electronics repair and IT company.
              We restore the devices people depend on every day with honest diagnostics,
              quality components, and board-level precision.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 bg-coral-brand/20 text-coral-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Repair, Don’t Replace.
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-coral-brand">
              Services & Solutions
            </h3>
            <ul className="space-y-2 text-sm text-cream-bg/80">
              <li>
                <Link href="/services#hardware" className="hover:text-white transition-colors">
                  Hardware & Screen Replacement
                </Link>
              </li>
              <li>
                <Link href="/services#motherboard" className="hover:text-white transition-colors">
                  Motherboard Micro-Soldering
                </Link>
              </li>
              <li>
                <Link href="/services#data-services" className="hover:text-white transition-colors">
                  Data Recovery Lab
                </Link>
              </li>
              <li>
                <Link href="/services#virus-security" className="hover:text-white transition-colors">
                  Virus Eradication & Hardening
                </Link>
              </li>
              <li>
                <Link href="/business-it" className="hover:text-white transition-colors">
                  Monthly Business IT Contracts
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-white transition-colors">
                  AI Msingi & Youth Programs
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Refurbished Laptops & PC Builds
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: M-Pesa & Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-coral-brand">
              Verified Payment Methods
            </h3>
            <div className="bg-teal-brand/30 p-4 rounded-xl border border-teal-brand/40 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CreditCard className="w-4 h-4 text-coral-brand" />
                <span>M-PESA Lipa Na M-Pesa</span>
              </div>
              <div className="text-xs space-y-1 text-cream-bg/90">
                <div className="flex justify-between border-b border-teal-brand/30 pb-1">
                  <span className="text-cream-bg/70">Paybill No:</span>
                  <span className="font-mono font-bold text-coral-brand">714888</span>
                </div>
                <div className="flex justify-between border-b border-teal-brand/30 pb-1">
                  <span className="text-cream-bg/70">Account No:</span>
                  <span className="font-mono font-bold text-white">480939</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-cream-bg/70">Account Name:</span>
                  <span className="font-semibold text-white">Zollani Tech Ltd</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-cream-bg/70">
              Also accepting Cash, Direct Bank Transfer, and Corporate Invoicing with 30-day terms for contracted businesses.
            </p>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-coral-brand">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-sm text-cream-bg/85">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-coral-brand shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+254768551914"
                    className="font-bold hover:text-coral-brand transition-colors block"
                  >
                    +254 768 551914
                  </a>
                  <span className="text-xs text-cream-bg/70">Calls & SMS</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-coral-brand shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20a%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-coral-brand transition-colors block"
                  >
                    WhatsApp Chat (Instant)
                  </a>
                  <span className="text-xs text-cream-bg/70">Typical reply: &lt; 5 mins</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-coral-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">Nairobi, Kenya</span>
                  <span className="text-xs text-cream-bg/70">On-site pickups & drop-offs available</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-coral-brand shrink-0 mt-0.5" />
                <div className="text-xs text-cream-bg/75">
                  <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
                  <br />
                  <span>Sunday: Emergency On-Call</span>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="/Zollani-Tech-Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-brand hover:bg-teal-light text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors border border-white/20"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Company Profile (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-bg/60 gap-4">
          <p>
            © {new Date().getFullYear()} Zollani Tech Limited. All rights reserved. Nairobi, Kenya.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-coral-brand" />
              Cisco Certified Ethical Hacker Led
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-coral-brand" />
              ISACA CSX Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
