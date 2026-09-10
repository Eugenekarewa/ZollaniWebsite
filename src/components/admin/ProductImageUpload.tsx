"use client";

import { useState } from "react";

export function ProductImageUpload({ initialUrl }: { initialUrl: string }) {
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [status, setStatus] = useState("");

  async function uploadImage(file: File) {
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/product-upload", { method: "POST", body: formData });
    const result = await response.json();
    if (!response.ok) {
      setStatus(result.error || "Upload failed");
      return;
    }
    setImageUrl(result.url);
    setStatus("Image uploaded");
  }

  return (
    <div className="grid gap-2 text-xs font-bold text-brand-dark">
      Image
      <input
        name="imageUrl"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        placeholder="Paste an ImgBB link or direct image URL"
        className="rounded-lg border border-cream-border bg-cream-surface px-3 py-2 text-xs font-normal"
      />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void uploadImage(file);
        }}
        className="rounded-lg border border-cream-border bg-cream-surface px-3 py-2 text-xs font-normal"
      />
      {imageUrl ? <img src={imageUrl} alt="Product preview" className="h-20 w-28 rounded-lg object-cover" /> : null}
      {status ? <span className="font-normal text-brand-muted">{status}</span> : null}
    </div>
  );
}
