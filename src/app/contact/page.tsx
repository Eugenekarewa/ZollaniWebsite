import React from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Navigation,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-cream-bg min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-4 py-1.5 rounded-full">
            We Are Ready to Help
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark mt-3 tracking-tight">
            Contact Zollani Tech Nairobi
          </h1>
          <p className="text-sm sm:text-base text-brand-muted mt-3">
            Drop off your machine, request an on-site office visit, or get an instant quote on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm source="contact-page" />
          </div>

          {/* Right Column: Contact Channels & Location Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Channels */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-cream-border space-y-5">
              <h3 className="text-lg font-black text-brand-dark pb-2 border-b border-cream-border">
                Direct Communication
              </h3>

              {/* WhatsApp (Fastest) */}
              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20have%20an%20urgent%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#1e9e4d]">
                    Fastest Response
                  </div>
                  <div className="text-base font-black text-brand-dark">
                    WhatsApp Chat
                  </div>
                  <div className="text-xs text-brand-muted">
                    +254 768 551914 (Typically replies in &lt; 5 min)
                  </div>
                </div>
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+254768551914"
                className="flex items-center gap-4 p-4 rounded-2xl bg-teal-subtle/70 border border-teal-brand/30 hover:bg-teal-subtle transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-brand text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-teal-brand">
                    Direct Voice &amp; SMS
                  </div>
                  <div className="text-base font-black text-brand-dark">
                    +254 768 551914
                  </div>
                  <div className="text-xs text-brand-muted">
                    Speak directly with a repair technician
                  </div>
                </div>
              </a>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream-bg border border-cream-border">
                <div className="w-12 h-12 rounded-xl bg-brand-slate text-white flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                    Corporate Email
                  </div>
                  <div className="text-sm font-black text-brand-dark">
                    info@zollanitech.co.ke
                  </div>
                  <div className="text-xs text-brand-muted">
                    For corporate proposals &amp; tenders
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours & Location Map Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-cream-border space-y-4">
              <h3 className="text-lg font-black text-brand-dark pb-2 border-b border-cream-border flex items-center justify-between">
                <span>Location &amp; Hours</span>
                <span className="text-xs font-bold text-teal-brand flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Nairobi Coverage
                </span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-brand-slate">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-coral-brand shrink-0 mt-0.5" />
                  <div>
                    <strong>Drop-Off &amp; On-Site Service Area:</strong>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Westlands, Kilimani, Kileleshwa, CBD, Upper Hill, Karen, Parklands,
                      Thika Road corridor, and surrounding Nairobi counties.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-brand shrink-0 mt-0.5" />
                  <div>
                    <strong>Business Hours:</strong>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Monday – Saturday: 8:00 AM – 7:00 PM <br />
                      Sunday: On-Call for Server &amp; Business Emergencies
                    </p>
                  </div>
                </div>
              </div>

              {/* Nairobi Interactive Map Placeholder with Coordinates */}
              <div className="rounded-2xl overflow-hidden border border-cream-border bg-teal-deep/5 relative h-48 flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-teal-brand text-white flex items-center justify-center mx-auto shadow-sm">
                    <Navigation className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-xs font-bold text-brand-dark">
                    Nairobi Central Service Hub
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    Free courier pickup arrangements available for corporate clients and motherboard repairs.
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Payment Reminder */}
            <div className="bg-cream-surface rounded-3xl p-6 border border-cream-border text-xs text-brand-slate space-y-2">
              <div className="font-bold flex items-center gap-2 text-brand-dark">
                <CreditCard className="w-4 h-4 text-teal-brand" />
                <span>Lipa Na M-Pesa Official Business Account</span>
              </div>
              <p className="text-brand-muted">
                Paybill: <strong>714888</strong> · Account No: <strong>480939</strong> (Zollani Tech Limited)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
