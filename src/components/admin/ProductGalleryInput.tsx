"use client";

import { useState } from "react";
import { saveProductImages } from "@/app/admin/shop/gallery-actions";

export function ProductGalleryInput({ productId, initialImages }: { productId: string; initialImages: string[] }) {
  const [images, setImages] = useState(initialImages);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  async function addImage() {
    const url = draft.trim();
    if (!/^https?:\/\//i.test(url)) return;
    setImages((current) => [...current, url]);
    setDraft("");
  }

  async function save() {
    setSaving(true);
    await saveProductImages(productId, images);
    setSaving(false);
  }

  return <div className="grid gap-3 rounded-2xl border border-cream-border bg-cream-surface p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Product images</p><div className="flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Paste an image URL" className="min-w-0 flex-1 rounded-lg border border-cream-border bg-white px-3 py-2 text-sm" /><button type="button" onClick={addImage} className="rounded-lg bg-teal-deep px-3 py-2 text-sm font-bold text-white">Add</button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{images.map((url, index) => <div key={`${url}-${index}`} className="relative overflow-hidden rounded-xl border border-cream-border"><img src={url} alt={`Product view ${index + 1}`} className="aspect-square w-full object-cover" onError={(event) => { event.currentTarget.style.opacity = "0.35"; }} /><button type="button" onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 rounded-full bg-brand-dark px-2 py-1 text-xs font-bold text-white">Remove</button></div>)}</div><button type="button" onClick={save} disabled={saving} className="rounded-lg bg-coral-brand px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save images"}</button></div>;
}
