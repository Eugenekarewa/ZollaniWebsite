"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Wrench,
  Building2,
  GraduationCap,
  Info,
  Send,
  ShoppingBag,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import { RepairTrackerModal } from "@/components/interactive/RepairTrackerModal";

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "Services", href: "/services", icon: Wrench },
    { name: "Business IT", href: "/business-it", icon: Building2 },
    { name: "Training", href: "/training", icon: GraduationCap },
    { name: "About", href: "/about", icon: Info },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Contact", href: "/contact", icon: Send },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Emergency Bar */}
      <div className="bg-brand-dark text-cream-bg text-xs py-2 px-4 hidden md:block border-b border-coral-brand/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cream-bg/90">
              <MapPin className="w-3.5 h-3.5 text-coral-brand" />
              Nairobi, Kenya · On-Site & Drop-Off Service
            </span>
            <span className="flex items-center gap-1.5 text-cream-bg/90">
              <Clock className="w-3.5 h-3.5 text-coral-brand" />
              Mon – Sat: 8:00 AM – 7:00 PM (Emergency 24/7)
            </span>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <span className="text-cream-bg/80">Need urgent help?</span>
            <a
              href="tel:+254768551914"
              className="flex items-center gap-1 text-coral-brand hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              +254 768 551914
            </a>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setIsTrackerOpen(true)}
              className="flex items-center gap-1.5 text-cream-bg hover:text-coral-brand transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer"
            >
              <Search className="w-3 h-3 text-coral-brand" />
              <span>Track Repair Status</span>
            </button>
            <span className="text-white/20">|</span>
            <a
              href="/Zollani-Tech-Company-Profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-bg/90 hover:text-coral-brand underline transition-colors"
            >
              Download Company Profile (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
            scrolled
            ? "bg-cream-surface/95 backdrop-blur-md shadow-[0_10px_30px_rgba(16,47,48,0.08)] py-3 border-b border-cream-border"
            : "bg-cream-bg/95 backdrop-blur-sm py-5 border-b border-cream-border/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-teal-brand border-b-2 border-coral-brand"
                      : "text-brand-slate hover:text-teal-brand"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+254768551914"
              className="p-2.5 rounded-xl text-teal-brand hover:bg-teal-subtle transition-colors border border-teal-brand/20 flex items-center gap-2 text-sm font-semibold"
              title="Call Us Directly"
            >
              <Phone className="w-4 h-4 text-teal-brand" />
              <span className="hidden xl:inline text-xs text-brand-slate">Call</span>
            </a>

            <a
              href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20a%20repair%20or%20IT%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-coral-brand hover:bg-coral-hover text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book a Repair</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20quick%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-coral-brand text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-slate hover:bg-cream-border transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream-surface border-b border-cream-border px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
                      isActive
                        ? "text-teal-brand bg-teal-subtle font-bold"
                        : "text-brand-slate hover:bg-cream-border/60"
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5 text-teal-brand" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-cream-border space-y-2.5">
              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20need%20assistance%20with%20a%20repair."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-coral-brand hover:bg-coral-hover text-white py-3 rounded-xl font-bold text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+254 768 551914)</span>
              </a>

              <a
                href="tel:+254768551914"
                className="w-full flex items-center justify-center gap-2 bg-teal-brand hover:bg-teal-dark text-white py-2.5 rounded-xl font-semibold text-sm shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>

              <button
                onClick={() => {
                  setIsTrackerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-teal-subtle text-teal-brand hover:bg-teal-brand hover:text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Repair Status</span>
              </button>

              <a
                href="/Zollani-Tech-Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs text-brand-muted hover:text-teal-brand py-1 font-medium"
              >
                Download Company Profile PDF
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Modern Live Repair Tracker Modal */}
      <RepairTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
    </header>
  );
};
