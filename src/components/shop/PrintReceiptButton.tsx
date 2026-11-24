"use client";

import React from "react";
import { Printer } from "lucide-react";

export function PrintReceiptButton({ label = "Print / Save PDF Receipt" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-dark px-5 py-3 text-xs font-black text-white shadow-sm hover:bg-teal-deep transition-colors cursor-pointer"
    >
      <Printer className="h-4 w-4 text-coral-brand" />
      <span>{label}</span>
    </button>
  );
}
