const GENERIC_PRODUCT_IMAGE_PATHS = new Set([
  "/images/products/thinkpad-t480.jpg",
  "/images/products/dell-latitude.jpg",
  "/images/products/hp-elitebook.jpg",
  "/images/products/hp-envy-x360.jpg",
  "/images/products/hp-envy-x360-keyboard.jpg",
  "/images/products/macbook-pro.jpg",
  "/images/products/gaming-pc-tower.jpg",
  "/images/products/laptop-desk.jpg",
  "/images/products/lenovo-thinkpad.jpg",
  "/images/products/ssd-nvme.jpg",
  "/images/products/ssd-upgrade-kit.jpg",
  "/images/products/whatsapp-sample-1.jpg",
  "/images/products/whatsapp-sample-2.jpg",
  "/images/data-recovery-hdd.jpg",
  "/images/hardware-motherboard.jpg",
  "/images/gaming-pc-build.jpg",
  "/images/business-support-desk.jpg",
  "/images/pc-repair-workbench.jpg",
  "/images/network-rack-wiring.jpg",
  "/images/hero-datacenter.jpg",
  "/images/classroom-workshop.jpg",
  "/images/cybersecurity-training-room.jpg",
]);

export function getProductImageUrl(image?: string | null): string | undefined {
  const trimmedImage = image?.trim();
  if (!trimmedImage) return undefined;

  const imagePath = trimmedImage
    .replace(/^https?:\/\/[^/]+/i, "")
    .split(/[?#]/, 1)[0];

  return GENERIC_PRODUCT_IMAGE_PATHS.has(imagePath) ? undefined : trimmedImage;
}
