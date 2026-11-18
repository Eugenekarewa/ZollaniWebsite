"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, removeItem, updateQty, closeCart } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-border px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-teal-brand" />
            <h2 className="text-base font-black text-brand-dark">
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-coral-brand px-2 py-0.5 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="rounded-xl p-2 hover:bg-cream-surface transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-brand-slate" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <ShoppingCart className="h-16 w-16 text-cream-border" />
              <p className="font-bold text-brand-dark">Your cart is empty</p>
              <p className="text-xs text-brand-muted">Add some products from the shop to get started.</p>
              <button
                onClick={closeCart}
                className="mt-2 rounded-2xl bg-teal-brand px-6 py-3 text-xs font-bold text-white hover:bg-teal-deep transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 rounded-2xl border border-cream-border bg-cream-surface p-4">
                  {/* Thumbnail */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-cream-border bg-white">
                    <img
                      src={item.image || "/images/pc-repair-workbench.jpg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-black text-brand-dark line-clamp-2 leading-tight">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-brand-muted">{item.warranty || "6-Month Warranty"}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-1 rounded-xl border border-cream-border bg-white">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-l-xl text-brand-slate hover:bg-cream-border transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-brand-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-r-xl text-brand-slate hover:bg-cream-border transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      {/* Price + remove */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black font-mono text-coral-dark">
                          KES {(item.priceKes * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-cream-border bg-white px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted font-medium">Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span className="text-lg font-black font-mono text-brand-dark">
                KES {totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Payment confirmed via M-Pesa or cash on delivery. Our team will contact you within 15 minutes to confirm availability and arrange delivery.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-coral-brand py-4 text-sm font-black text-white shadow-md transition-all hover:bg-coral-hover active:scale-98"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full rounded-2xl border border-cream-border py-3 text-xs font-bold text-brand-slate hover:bg-cream-surface transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
