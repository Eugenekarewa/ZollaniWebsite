"use client";

import { useState } from "react";
import type { ProductItem } from "@/data/productsData";

export function ShopImageManager({ products }: { products: ProductItem[] }) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);

  async function upload(productId: string, file: File) {
    setUploading(productId);
    setStatus("");
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("file", file);
    const response = await fetch("/api/shop-images", {
      method: "POST",
      headers: { "x-shop-admin-key": key },
      body: formData,
    });
    const result = await response.json();
    setUploading(null);
    setStatus(response.ok ? "Image updated. Refresh the shop to see it." : result.error ?? "Upload failed");
  }

  return (
    <details className="mb-8 rounded-2xl border border-cream-border bg-white p-5 shadow-sm">
      <summary className="cursor-pointer text-sm font-black text-brand-dark">Shop image manager</summary>
      <p className="mt-2 text-xs leading-5 text-brand-muted">Private admin tool. Upload a new product photo without editing the site code.</p>
      <input value={key} onChange={(event) => setKey(event.target.value)} type="password" placeholder="Admin key" className="mt-4 w-full rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-sm outline-none focus:border-teal-brand sm:max-w-xs" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <label key={product.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-cream-border bg-cream-surface px-3 py-3 text-xs font-bold text-brand-slate hover:border-teal-brand">
            <span className="truncate">{product.name}</span>
            <span className="shrink-0 text-teal-brand">{uploading === product.id ? "Uploading…" : "Choose"}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={!key || uploading !== null} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(product.id, file); }} />
          </label>
        ))}
      </div>
      {status ? <p className="mt-3 text-xs font-bold text-teal-brand" role="status">{status}</p> : null}
    </details>
  );
}
