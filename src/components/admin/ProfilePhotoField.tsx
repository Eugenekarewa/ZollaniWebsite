"use client";

import { useState } from "react";

export function ProfilePhotoField({ defaultValue = "" }: { defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [status, setStatus] = useState("");
  async function upload(file: File) {
    setStatus("Uploading…");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/about-upload", { method: "POST", body: formData });
    const result = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    if (!response.ok || !result.url) return setStatus(result.error ?? "Upload failed");
    setUrl(result.url);
    setStatus("Photo uploaded");
  }
  return <div className="grid gap-2 md:col-span-2"><label className="text-xs font-bold text-brand-dark">Profile photo</label><input type="hidden" name="imageUrl" value={url} /><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3 text-sm" /><input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Or paste a public image URL" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />{status && <span className="text-xs text-brand-muted">{status}</span>}</div>;
}
