"use client";

import React, { useState } from "react";
import {
  Laptop,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv,
  HardDrive,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  Calculator,
} from "lucide-react";

interface IssueOption {
  id: string;
  name: string;
  priceRange: string;
  turnaround: string;
  notes: string;
}

interface DeviceOption {
  id: string;
  name: string;
  icon: any;
  issues: IssueOption[];
}

const DEVICE_OPTIONS: DeviceOption[] = [
  {
    id: "laptop",
    name: "Laptop / MacBook",
    icon: Laptop,
    issues: [
      {
        id: "screen",
        name: "Broken Screen / Display Lines",
        priceRange: "KES 4,500 – 12,000",
        turnaround: "2 – 4 hours",
        notes: "Depends on panel size, resolution (FHD/4K) and touch/non-touch.",
      },
      {
        id: "dead-motherboard",
        name: "Dead / Won't Power On / Water Spill",
        priceRange: "KES 3,500 – 9,500",
        turnaround: "24 – 48 hours",
        notes: "Board-level micro-soldering; we trace shorted capacitors & power ICs.",
      },
      {
        id: "battery",
        name: "Dying or Swollen Battery",
        priceRange: "KES 2,500 – 6,500",
        turnaround: "30 – 60 minutes",
        notes: "Grade-A internal/external replacement with warranty.",
      },
      {
        id: "hinge-casing",
        name: "Broken Hinge or Split Casing",
        priceRange: "KES 2,000 – 4,500",
        turnaround: "4 – 8 hours",
        notes: "Complete structural weld & anchor reconstruction.",
      },
      {
        id: "keyboard",
        name: "Keyboard / Trackpad Replacement",
        priceRange: "KES 2,000 – 5,000",
        turnaround: "1 – 3 hours",
        notes: "Backlit or standard authentic keyboard layouts.",
      },
      {
        id: "ssd-upgrade",
        name: "SSD Upgrade + RAM (Speed Boost)",
        priceRange: "KES 3,500 – 8,000",
        turnaround: "1 – 2 hours",
        notes: "Includes free Windows installation and file transfer.",
      },
      {
        id: "overheating",
        name: "Overheating / Loud Roaring Fan",
        priceRange: "KES 1,500 – 3,000",
        turnaround: "1 – 2 hours",
        notes: "Full ultrasonic dust cleanout & Arctic MX-4 thermal repaste.",
      },
      {
        id: "os-virus",
        name: "Corrupted OS / Virus Removal",
        priceRange: "KES 1,000 – 2,500",
        turnaround: "1 – 3 hours",
        notes: "Clean OS reinstall, driver updates, and data preservation.",
      },
    ],
  },
  {
    id: "phone",
    name: "Smartphone / Tablet",
    icon: Smartphone,
    issues: [
      {
        id: "phone-screen",
        name: "Cracked Screen / AMOLED Replacement",
        priceRange: "KES 2,500 – 16,000",
        turnaround: "1 – 3 hours",
        notes: "Original & high-grade OLED panels for Samsung, iPhone, Xiaomi, etc.",
      },
      {
        id: "phone-battery",
        name: "Battery Replacement",
        priceRange: "KES 1,500 – 4,500",
        turnaround: "30 – 60 minutes",
        notes: "Restores 100% battery health and longevity.",
      },
      {
        id: "phone-charging",
        name: "Charging Port / USB-C Failure",
        priceRange: "KES 1,200 – 3,500",
        turnaround: "1 – 2 hours",
        notes: "Fixes slow charging, moisture detected, or burnt pins.",
      },
      {
        id: "phone-board",
        name: "Water Damage / Motherboard IC",
        priceRange: "KES 2,500 – 7,500",
        turnaround: "24 – 48 hours",
        notes: "Ultrasonic chemical clean and micro-soldering.",
      },
    ],
  },
  {
    id: "desktop",
    name: "Desktop PC / Gaming Rig",
    icon: Monitor,
    issues: [
      {
        id: "dt-power",
        name: "No Power / Faulty Power Supply (PSU)",
        priceRange: "KES 2,500 – 6,500",
        turnaround: "1 – 3 hours",
        notes: "Power rail diagnosis and certified 80+ PSU replacement.",
      },
      {
        id: "dt-gpu",
        name: "GPU Issue / Artifacts / Gaming Crashes",
        priceRange: "KES 2,500 – 8,000",
        turnaround: "2 – 4 hours",
        notes: "Thermal repasting, VRAM inspection, and driver stabilization.",
      },
      {
        id: "dt-build",
        name: "Custom PC Assembly & Cable Management",
        priceRange: "KES 3,000 – 7,000",
        turnaround: "24 hours",
        notes: "Stress testing, BIOS tuning, and optimal airflow setup.",
      },
      {
        id: "dt-tune",
        name: "OS Optimization & Virus Purge",
        priceRange: "KES 1,500 – 3,000",
        turnaround: "2 – 4 hours",
        notes: "Eliminates spyware, bloat, and restores gaming latency.",
      },
    ],
  },
  {
    id: "console",
    name: "PlayStation / Xbox",
    icon: Gamepad2,
    issues: [
      {
        id: "con-hdmi",
        name: "Broken HDMI Port (No Video Signal)",
        priceRange: "KES 3,500 – 6,500",
        turnaround: "2 – 4 hours",
        notes: "Precision board-level micro-soldering for PS4, PS5, Xbox Series.",
      },
      {
        id: "con-heat",
        name: "Loud Fan / Overheating / Shuts Down",
        priceRange: "KES 2,000 – 4,000",
        turnaround: "2 – 3 hours",
        notes: "PS5 Liquid metal reapplication / thermal compound and heatsink scrub.",
      },
      {
        id: "con-power",
        name: "Power Supply / Blue Light of Death (BLOD)",
        priceRange: "KES 3,500 – 8,000",
        turnaround: "24 – 48 hours",
        notes: "Deep circuit diagnosis on Southbridge / APU voltage circuits.",
      },
    ],
  },
  {
    id: "data",
    name: "Data Recovery / Storage",
    icon: HardDrive,
    issues: [
      {
        id: "data-dropped",
        name: "Dropped External Drive / Clicking Sound",
        priceRange: "KES 5,000 – 18,000",
        turnaround: "24 – 72 hours",
        notes: "Head assembly work and sector-by-sector extraction.",
      },
      {
        id: "data-deleted",
        name: "Accidental Format / Deleted Business Files",
        priceRange: "KES 3,000 – 9,000",
        turnaround: "3 – 8 hours",
        notes: "RAW file carvers retrieve documents before overwritten.",
      },
      {
        id: "data-corrupt",
        name: "Unallocated / RAW / Asks to Format",
        priceRange: "KES 2,500 – 6,500",
        turnaround: "4 – 12 hours",
        notes: "Partition table repair and master file table recovery.",
      },
    ],
  },
  {
    id: "appliance",
    name: "Smart TV / Appliance",
    icon: Tv,
    issues: [
      {
        id: "tv-backlight",
        name: "Sound but No Picture (Backlight Failure)",
        priceRange: "KES 3,500 – 9,000",
        turnaround: "4 – 8 hours",
        notes: "Full LED strip replacement with even luminescence.",
      },
      {
        id: "tv-power",
        name: "TV Won't Power On / Standby Blinking",
        priceRange: "KES 2,500 – 6,000",
        turnaround: "4 – 24 hours",
        notes: "Power supply board capacitor and diode repairs.",
      },
      {
        id: "app-board",
        name: "Microwave / Appliance Control Board",
        priceRange: "KES 2,000 – 5,000",
        turnaround: "4 – 24 hours",
        notes: "Diagnostic on relays, fuses, and digital display logic.",
      },
    ],
  },
];

export const QuoteCalculator: React.FC = () => {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0);

  const currentDevice = DEVICE_OPTIONS[selectedDeviceIndex];
  const currentIssue = currentDevice.issues[selectedIssueIndex] || currentDevice.issues[0];

  // Generate WhatsApp text
  const waText = encodeURIComponent(
    `Hello Zollani Tech, I used your online estimator for a ${currentDevice.name} with "${currentIssue.name}". The estimated range is ${currentIssue.priceRange}. When can I bring it in or arrange an on-site visit?`
  );

  return (
    <div className="bg-cream-surface rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-cream-border relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-coral-brand/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-teal-subtle text-teal-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Instant Repair Cost Estimator
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            How much will your repair cost?
          </h3>
          <p className="text-sm text-brand-muted mt-1">
            Transparent pricing, no surprises. Final quote confirmed after free physical diagnostic.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-cream-bg py-2 px-3.5 rounded-2xl border border-cream-border text-xs font-medium text-brand-slate">
          <ShieldCheck className="w-4 h-4 text-teal-brand" />
          <span>Free Diagnosis if Repaired</span>
        </div>
      </div>

      {/* Step 1: Select Device */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-3">
          Step 1: Choose Your Device
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {DEVICE_OPTIONS.map((dev, idx) => {
            const Icon = dev.icon;
            const isSelected = selectedDeviceIndex === idx;
            return (
              <button
                key={dev.id}
                type="button"
                onClick={() => {
                  setSelectedDeviceIndex(idx);
                  setSelectedIssueIndex(0);
                }}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? "bg-teal-brand text-white border-teal-brand shadow-md scale-[1.02]"
                    : "bg-white text-brand-slate border-cream-border hover:border-teal-brand/40 hover:bg-teal-subtle/30"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-white/20 text-white" : "bg-teal-subtle text-teal-brand"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {dev.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Specific Problem */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-3">
          Step 2: Select What Needs Fixing
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentDevice.issues.map((issue, idx) => {
            const isSelected = selectedIssueIndex === idx;
            return (
              <button
                key={issue.id}
                type="button"
                onClick={() => setSelectedIssueIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                  isSelected
                    ? "bg-teal-subtle/80 border-teal-brand text-brand-dark shadow-xs"
                    : "bg-white border-cream-border text-brand-slate hover:border-cream-border/80 hover:bg-cream-surface"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-teal-brand bg-teal-brand text-white"
                        : "border-brand-muted/40"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block leading-snug">
                      {issue.name}
                    </span>
                    <span className="text-[11px] text-brand-muted block mt-0.5">
                      {issue.notes}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-teal-brand shrink-0">
                  {issue.priceRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Display Box */}
      <div className="bg-gradient-to-br from-teal-deep to-teal-brand text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Column 1: Estimated Range */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-coral-brand">
                Indicative Estimate
              </span>
              <span className="text-white/40">·</span>
              <span className="text-xs text-cream-bg/80">
                {currentDevice.name}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {currentIssue.priceRange}
            </div>

            <p className="text-xs text-cream-bg/90">
              <strong className="text-white">Includes:</strong> {currentIssue.notes}
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-xs text-cream-bg/90">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-coral-brand" />
                <span>Turnaround: <strong>{currentIssue.turnaround}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-coral-brand" />
                <span>Warranty: <strong>Up to 6 Months</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-coral-brand" />
                <span>Pay via M-Pesa or Cash</span>
              </div>
            </div>
          </div>

          {/* Column 2: Immediate WhatsApp Action */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`https://wa.me/254768551914?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 bg-coral-brand hover:bg-coral-hover text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Lock In Quote on WhatsApp</span>
            </a>

            <a
              href="tel:+254768551914"
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-cream-bg py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors text-center border border-white/20"
            >
              <span>Call Technician (+254 768 551914)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
