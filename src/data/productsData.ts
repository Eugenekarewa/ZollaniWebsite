export interface ProductItem {
  id: string;
  name: string;
  category: "refurbished-laptop" | "gaming-pc" | "workstation" | "upgrade-kit";
  priceKes: number;
  condition: "Certified Refurbished" | "Brand New Custom Build" | "Hardware Bundle";
  warranty: string;
  specs: string[];
  popular?: boolean;
  image: string;
  description: string;
}

export const PRODUCTS: ProductItem[] = []; /* Products are managed through the admin shop dashboard. */

/*
  {
    id: "prod-thinkpad-t480",
    name: "Lenovo ThinkPad T480 (Business Tough)",
    category: "refurbished-laptop",
    priceKes: 32000,
    condition: "Certified Refurbished",
    warranty: "6 Months Warranty",
    specs: [
      "Intel Core i5 8th Gen (Quad-Core)",
      "16GB DDR4 RAM",
      "512GB NVMe High-Speed SSD",
      "14.0\" FHD IPS Anti-Glare Display",
      "Dual Battery System (Up to 7 hrs)",
      "Backlit Keyboard + USB-C / Thunderbolt",
    ],
    popular: true,
    image: "/images/hardware-motherboard.jpg",
    description: "Legendary ThinkPad reliability. Thoroughly inspected, thermal repasted, and running genuine Windows 11 Pro.",
  },
  {
    id: "prod-dell-latitude-7490",
    name: "Dell Latitude 7490 Ultrabook",
    category: "refurbished-laptop",
    priceKes: 34500,
    condition: "Certified Refurbished",
    warranty: "6 Months Warranty",
    specs: [
      "Intel Core i7 8th Gen vPro",
      "16GB DDR4 RAM",
      "512GB M.2 PCIe SSD",
      "14.0\" FHD Slim Bezel Display",
      "Magnesium Alloy Body",
      "Windows 11 Pro Licensed",
    ],
    popular: true,
    image: "/images/pc-repair-workbench.jpg",
    description: "Premium executive ultrabook built for productivity, spreadsheets, and seamless video conferencing.",
  },
  {
    id: "prod-hp-elitebook-840-g6",
    name: "HP EliteBook 840 G6",
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
    image: "/images/software-engineer.jpg",
    description: "Sleek all-aluminum business ultrabook with stellar battery health and crystal-clear audio.",
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
    image: "/images/gaming-pc-build.jpg",
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
    image: "/images/corporate-team-server.jpg",
    description: "Optimized for ArchiCAD, AutoCAD, Revit, and structural analysis without throttling.",
  },
  {
    id: "prod-laptop-turbo-kit",
    name: "Laptop Turbo Revive Upgrade Bundle",
    category: "upgrade-kit",
    priceKes: 8500,
    condition: "Hardware Bundle",
    warranty: "3 Years Manufacturer Warranty",
    specs: [
      "512GB High-Speed SATA/NVMe SSD",
      "8GB DDR4 RAM Module",
      "Free Precision Installation Included",
      "Free Operating System & Data Migration",
      "Free Internal Deep Dust Cleaning & Thermal Repaste",
    ],
    popular: true,
    image: "/images/data-recovery-hdd.jpg",
    description: "Transform your slow, 5-minute boot laptop into a 15-second lightning machine without replacing the laptop.",
  },
];
*/
