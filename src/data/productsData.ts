export interface ProductItem {
  id: string;
  name: string;
  category: "refurbished-laptop" | "gaming-pc" | "workstation" | "upgrade-kit" | "monitor" | "smart-home-camera" | "mouse" | "desktop-cpu" | "mini-pc";
  priceKes: number;
  condition: "Certified Refurbished" | "Brand New Custom Build" | "Hardware Bundle";
  warranty: string;
  specs: string[];
  popular?: boolean;
  image: string;
  images?: string[];
  description: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "prod-thinkpad-t480",
    name: "Lenovo ThinkPad T480 (Tough Business Ultrabook)",
    category: "refurbished-laptop",
    priceKes: 32000,
    condition: "Certified Refurbished",
    warranty: "6 Months Warranty",
    specs: [
      "Intel Core i5 8th Gen (Quad-Core 3.4GHz)",
      "16GB DDR4 RAM",
      "512GB NVMe High-Speed SSD",
      "14.0\" FHD IPS Anti-Glare Display",
      "Dual Hot-Swap Battery System (Up to 7 hrs)",
      "Backlit Keyboard + Thunderbolt 3 / USB-C",
    ],
    popular: true,
    image: "/images/products/thinkpad-t480.jpg",
    description: "Legendary ThinkPad reliability. Thoroughly inspected, thermal repasted, and running licensed Windows 11 Pro with genuine charger.",
  },
  {
    id: "prod-dell-latitude-7490",
    name: "Dell Latitude 7490 Ultrabook (Core i7 Edition)",
    category: "refurbished-laptop",
    priceKes: 34500,
    condition: "Certified Refurbished",
    warranty: "6 Months Warranty",
    specs: [
      "Intel Core i7 8th Gen vPro",
      "16GB DDR4 High-Speed RAM",
      "512GB M.2 PCIe NVMe SSD",
      "14.0\" FHD Slim-Bezel Display",
      "Magnesium Alloy Body & Spill-Resistant Keyboard",
      "Windows 11 Pro Licensed",
    ],
    popular: true,
    image: "/images/products/dell-latitude.jpg",
    description: "Premium executive ultrabook built for heavy productivity, spreadsheets, and seamless video conferencing. Pristine Grade A condition.",
  },
  {
    id: "prod-hp-elitebook-840-g6",
    name: "HP EliteBook 840 G6 Aluminum Ultrabook",
    category: "refurbished-laptop",
    priceKes: 39000,
    condition: "Certified Refurbished",
    warranty: "6 Months Warranty",
    specs: [
      "Intel Core i5 8th Gen",
      "16GB DDR4 RAM",
      "512GB NVMe SSD",
      "14.0\" Full HD IPS Display",
      "Bang & Olufsen Premium Audio",
      "Full Aluminum Silver Chassis",
    ],
    popular: true,
    image: "/images/products/hp-elitebook.jpg",
    description: "Sleek all-aluminum business ultrabook with stellar battery health, crystal-clear audio, and ultra-fast boot time.",
  },
  {
    id: "prod-custom-rig-rtx",
    name: "Zollani Creator & Gaming Tower (Apex Spec)",
    category: "gaming-pc",
    priceKes: 115000,
    condition: "Brand New Custom Build",
    warranty: "1 Year Full Hardware Warranty",
    specs: [
      "AMD Ryzen 5 5600X (6 Cores / 12 Threads)",
      "NVIDIA GeForce RTX 4060 8GB GDDR6",
      "32GB DDR4 3600MHz RGB RAM",
      "1TB Gen4 NVMe SSD (5000MB/s)",
      "650W 80+ Bronze Certified PSU",
      "Tempered Glass Case + 4x ARGB PWM Fans",
    ],
    popular: true,
    image: "/images/products/gaming-pc-tower.jpg",
    description: "Built and bench-tested in our Nairobi workshop for 1440p gaming, Premiere Pro video editing, and Blender 3D rendering.",
  },
  {
    id: "prod-workstation-architect",
    name: "CAD & Architecture Workstation Tower",
    category: "workstation",
    priceKes: 92000,
    condition: "Brand New Custom Build",
    warranty: "1 Year Full Hardware Warranty",
    specs: [
      "Intel Core i7 12th Gen (12 Cores)",
      "32GB DDR4 3200MHz RAM (Upgradable to 128GB)",
      "NVIDIA RTX 3050 8GB Dedicated GPU",
      "1TB NVMe M.2 SSD + 2TB Secondary HDD",
      "Gold Rated High-Efficiency Power Supply",
      "Quiet Noise-Dampened Chassis",
    ],
    image: "/images/products/laptop-desk.jpg",
    description: "Optimized for ArchiCAD, AutoCAD, Revit, and structural analysis without thermal throttling.",
  },
  {
    id: "prod-laptop-turbo-kit",
    name: "Laptop Turbo Revive Upgrade Bundle",
    category: "upgrade-kit",
    priceKes: 8500,
    condition: "Hardware Bundle",
    warranty: "1 Year Warranty",
    specs: [
      "512GB High-Speed NVMe / SATA SSD",
      "8GB DDR4 RAM Module",
      "Free Precision Installation Included",
      "Free Operating System & Data Migration",
      "Free Internal Deep Dust Cleaning & Thermal Repaste",
    ],
    popular: true,
    image: "/images/products/ssd-nvme.jpg",
    description: "Transform your slow, 5-minute boot laptop into a 15-second lightning machine without replacing your computer.",
  },
];
