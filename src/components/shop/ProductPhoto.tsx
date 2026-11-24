"use client";

import { useEffect, useState } from "react";
import { PackageSearch } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { getProductImageUrl } from "@/lib/product-images";

interface ProductPhotoProps {
  src?: string | null;
  alt: string;
  sizes?: string;
  compact?: boolean;
}

export function ProductPhoto({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  compact = false,
}: ProductPhotoProps) {
  const imageUrl = getProductImageUrl(src);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [imageUrl]);

  return (
    <div className="relative h-full w-full">
      {imageUrl && !loadFailed ? (
        <OptimizedImage
          src={imageUrl}
          alt={alt}
          sizes={sizes}
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt}: product photo coming soon`}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cream-surface text-brand-muted"
        >
          <PackageSearch
            aria-hidden="true"
            className={compact ? "h-5 w-5" : "h-10 w-10"}
          />
          {compact ? (
            <span className="sr-only">Product photo coming soon</span>
          ) : (
            <span className="text-xs font-semibold">Product photo coming soon</span>
          )}
        </div>
      )}
    </div>
  );
}
