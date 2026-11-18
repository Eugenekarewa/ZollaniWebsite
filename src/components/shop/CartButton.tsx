"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
      className="relative flex items-center gap-1.5 rounded-xl border border-cream-border bg-white px-3 py-2 text-xs font-bold text-brand-dark shadow-xs hover:border-teal-brand hover:text-teal-brand transition-all"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline">Cart</span>
      {totalItems > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral-brand text-[10px] font-black text-white shadow">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
