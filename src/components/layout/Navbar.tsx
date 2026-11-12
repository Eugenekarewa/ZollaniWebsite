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
  Calculator,
  ShieldCheck,
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
    { name: "Shop Computers", href: "/shop", icon: ShoppingBag, badge: "In Stock" },
    { name: "Business IT", href: "/business-it", icon: Building2 },
    { name: "About & Lab", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Send },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification Bar */}
      <div className="bg-brand-dark text-cream-bg text-xs py-2 px-4 hidden md:block border-b border-coral-brand/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cream-bg/90 font-medium">
              <MapPin className="w-3.5 h-3.5 text-coral-brand" />
              Nairobi, Kenya · Computer Repairs · Electronic Repairs · Computer Sales
            </span>
            <span className="flex items-center gap-1.5 text-cream-bg/90 font-medium">
              <Clock className="w-3.5 h-3.5 text-coral-brand" />
              Mon – Sat: 8:00 AM – 7:00 PM (Emergency 24/7)
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
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
              Company Profile (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-cream-surface/95 backdrop-blur-md shadow-[0_10px_30px_rgba(16,47,48,0.08)] py-3 border-b border-cream-border"
            : "bg-cream-bg/95 backdrop-blur-sm py-4 border-b border-cream-border/70"
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
                  className={`px-3 py-2 text-xs xl:text-sm font-bold transition-all duration-200 rounded-lg flex items-center gap-1.5 ${
                    isActive
                      ? "text-teal-brand bg-teal-subtle/80"
                      : "text-brand-slate hover:text-teal-brand hover:bg-cream-border/40"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="rounded-full bg-coral-brand px-1.5 py-0.2 text-[9px] font-black text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/services#estimator"
              className="inline-flex items-center gap-1.5 rounded-xl border border-cream-border bg-white px-3.5 py-2.5 text-xs font-bold text-brand-dark hover:border-teal-brand transition-colors"
            >
              <Calculator className="h-3.5 w-3.5 text-teal-brand" />
              <span>Get Estimate</span>
            </Link>

            <a
              href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20book%20a%20repair%20or%20inquire%20about%20a%20laptop."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-coral-brand hover:bg-coral-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold ${
                      isActive
                        ? "text-teal-brand bg-teal-subtle"
                        : "text-brand-slate hover:bg-cream-border/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="w-4 h-4 text-teal-brand" />}
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="rounded-full bg-coral-brand px-2 py-0.5 text-[10px] font-black text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-cream-border space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-cream-border bg-white py-2.5 text-xs font-bold text-brand-dark"
              >
                <Search className="w-3.5 h-3.5 text-coral-brand" />
                <span>Track Repair Status</span>
              </button>

              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20would%20like%20to%20book%20a%20repair."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-coral-brand py-3 text-xs font-bold text-white shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Book a Repair on WhatsApp</span>
              </a>

              <a
                href="tel:+254768551914"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-cream-border bg-cream-surface py-2.5 text-xs font-bold text-brand-dark"
              >
                <Phone className="w-3.5 h-3.5 text-teal-brand" />
                <span>Call +254 768 551914</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Repair Tracker Modal */}
      <RepairTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
    </header>
  );
};
