"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X, ShieldAlert, Wrench, Sparkles } from "lucide-react";

export const FloatingWhatsApp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello Zollani Tech, I have a device issue and need a quick quote."
  );

  const quickOptions = [
    {
      title: "Broken Screen / Liquid Spill",
      text: "Hello, my laptop screen broke or had a liquid spill. What is the repair cost?",
      icon: Wrench,
    },
    {
      title: "Dead Laptop / Won't Turn On",
      text: "Hello, my laptop is completely dead and won't turn on. Can you inspect it?",
      icon: ShieldAlert,
    },
    {
      title: "Business IT Support Contract",
      text: "Hello, I am inquiring about a monthly IT support contract for our office in Nairobi.",
      icon: Sparkles,
    },
  ];

  return (
    <>
      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream-surface/95 backdrop-blur-md border-t border-cream-border p-2.5 flex items-center justify-between gap-2 md:hidden shadow-lg">
        <a
          href="tel:+254768551914"
          className="flex-1 flex items-center justify-center gap-2 bg-teal-brand text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </a>

        <a
          href={`https://wa.me/254768551914?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-2 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp Quote</span>
        </a>
      </div>

      {/* Desktop Floating WhatsApp Widget */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        {/* Expandable Quick Actions Bubble */}
        {showPopup && (
          <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-cream-border overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="bg-teal-brand text-white p-4 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm">Chat with Zollani Tech</h4>
                <p className="text-xs text-cream-bg/90 mt-0.5">
                  Typically replies in under 5 minutes on WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 space-y-2">
              <p className="text-xs font-semibold text-brand-slate px-1">
                Select your inquiry:
              </p>
              {quickOptions.map((opt, i) => {
                const Icon = opt.icon;
                const encoded = encodeURIComponent(opt.text);
                return (
                  <a
                    key={i}
                    href={`https://wa.me/254768551914?text=${encoded}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-brand-slate hover:bg-teal-subtle hover:text-teal-brand transition-colors border border-transparent hover:border-teal-brand/20"
                  >
                    <div className="p-1.5 rounded-lg bg-teal-brand/10 text-teal-brand">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{opt.title}</span>
                  </a>
                );
              })}
              <div className="pt-2 border-t border-cream-border">
                <a
                  href={`https://wa.me/254768551914?text=${defaultMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2 rounded-xl text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Open Custom WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Floating Trigger Button */}
        <div className="flex items-center gap-2">
          {!showPopup && !dismissed && (
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-cream-border text-xs font-semibold text-brand-slate flex items-center gap-2 animate-bounce">
              <span>Have a question? Chat with us!</span>
              <button
                onClick={() => setDismissed(true)}
                className="text-brand-muted hover:text-brand-slate"
                aria-label="Dismiss message"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            onClick={() => setShowPopup(!showPopup)}
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 relative"
            aria-label="Contact Zollani Tech on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 fill-white" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-coral-brand border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
    </>
  );
};
