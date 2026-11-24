export type ProductCategory =
  | "refurbished-laptop"
  | "gaming-pc"
  | "workstation"
  | "upgrade-kit"
  | "monitor"
  | "smart-home-camera"
  | "mouse"
  | "keyboard"
  | "cables-hubs"
  | "networking"
  | "power-ups"
  | "audio-webcam"
  | "bags-stands"
  | "desktop-cpu"
  | "mini-pc";

export interface ProductItem {
  id: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  priceKes: number;
  condition: "Ex-UK Grade A" | "Brand New Custom Build" | "Brand New" | "Hardware Bundle";
  warranty: string;
  inStock?: boolean;
  specs: string[];
  popular?: boolean;
  image?: string;
  images?: string[];
  description: string;
}

export const PRODUCT_CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "refurbished-laptop", label: "Laptops" },
  { id: "gaming-pc", label: "Gaming PCs" },
  { id: "workstation", label: "Workstations" },
  { id: "mini-pc", label: "Mini PCs & CPUs" },
  { id: "upgrade-kit", label: "SSD, RAM & Storage" },
  { id: "mouse", label: "Mice" },
  { id: "keyboard", label: "Keyboards & Combos" },
  { id: "cables-hubs", label: "Chargers, Hubs & Cables" },
  { id: "monitor", label: "Monitors & Displays" },
  { id: "networking", label: "Routers & Networking" },
  { id: "power-ups", label: "UPS & Surge Protection" },
  { id: "audio-webcam", label: "Headsets & Webcams" },
  { id: "bags-stands", label: "Bags, Stands & Coolers" },
  { id: "smart-home-camera", label: "Smart Cameras" },
];

export const PRODUCTS: ProductItem[] = [];
