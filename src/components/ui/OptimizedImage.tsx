import Image from "next/image";

const OPTIMIZED_HOSTS = ["public.blob.vercel-storage.com", "ibb.co", "i.ibb.co"];

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    const hostname = new URL(src).hostname;
    return OPTIMIZED_HOSTS.some(
      (host) => hostname === host || hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

type OptimizedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
};

export function OptimizedImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  onError,
}: OptimizedImageProps) {
  if (!canOptimize(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={onError}
        className={`h-full w-full object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={onError}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
