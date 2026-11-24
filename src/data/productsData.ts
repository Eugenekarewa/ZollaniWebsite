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

export const PRODUCTS: ProductItem[] = [
  // LAPTOPS
  {
    id: "prod-thinkpad-t480",
    name: "Lenovo ThinkPad T480 (Tough Business Ultrabook)",
    brand: "Lenovo",
    category: "refurbished-laptop",
    priceKes: 32000,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Intel Core i5 8th Gen (Quad-Core 3.4GHz)",
      "16GB DDR4 RAM",
      "512GB NVMe High-Speed SSD",
      "14.0\" FHD IPS Anti-Glare Display",
      "Dual Hot-Swap Battery System (Up to 7 hrs)",
      "Backlit Keyboard + Thunderbolt 3 / USB-C",
    ],
    popular: true,
    description:
      "Legendary ThinkPad reliability. Thoroughly inspected, thermal repasted, and running licensed Windows 11 Pro with genuine charger.",
  },
  {
    id: "prod-dell-latitude-7490",
    name: "Dell Latitude 7490 Ultrabook (Core i7 Edition)",
    brand: "Dell",
    category: "refurbished-laptop",
    priceKes: 34500,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Intel Core i7 8th Gen vPro",
      "16GB DDR4 High-Speed RAM",
      "512GB M.2 PCIe NVMe SSD",
      "14.0\" FHD Slim-Bezel Display",
      "Magnesium Alloy Body & Spill-Resistant Keyboard",
      "Windows 11 Pro Licensed",
    ],
    popular: true,
    description:
      "Premium executive ultrabook built for heavy productivity, spreadsheets, and seamless video conferencing. Pristine Grade A condition.",
  },
  {
    id: "prod-hp-elitebook-840-g6",
    name: "HP EliteBook 840 G6 Aluminum Ultrabook",
    brand: "HP",
    category: "refurbished-laptop",
    priceKes: 39000,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Intel Core i5 8th Gen",
      "16GB DDR4 RAM",
      "512GB NVMe SSD",
      "14.0\" Full HD IPS Display",
      "Bang & Olufsen Premium Audio",
      "Full Aluminum Silver Chassis",
    ],
    popular: true,
    description:
      "Sleek all-aluminum business ultrabook with stellar battery health, crystal-clear audio, and ultra-fast boot time.",
  },
  {
    id: "prod-hp-envy-x360",
    name: "HP Envy x360 Convertible Touchscreen Laptop",
    brand: "HP",
    category: "refurbished-laptop",
    priceKes: 54000,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "AMD Ryzen 7 / Core i7 Performance",
      "16GB RAM + 512GB NVMe SSD",
      "13.3\" FHD IPS 360° Touch Display",
      "Backlit Keyboard + Fingerprint Reader",
      "360° Hinge Tablet Mode",
    ],
    description:
      "Versatile 2-in-1 touchscreen convertible laptop ideal for creatives, executives, and university presentations.",
  },
  {
    id: "prod-macbook-pro-13",
    name: "Apple MacBook Pro 13\" Retina (Touch Bar)",
    brand: "Apple",
    category: "refurbished-laptop",
    priceKes: 68000,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Intel Core i5 Quad-Core / Iris Plus Graphics",
      "16GB Unified Memory",
      "512GB Apple NVMe SSD",
      "13.3\" True Tone Retina Display",
      "Thunderbolt 3 USB-C Ports + Original MagSafe/USB-C Charger",
    ],
    description:
      "Clean Ex-UK MacBook Pro checked in our Apple logic-board lab with healthy battery cycle count and fresh macOS installation.",
  },

  // GAMING PCs, WORKSTATIONS & MINI PCs
  {
    id: "prod-custom-rig-rtx",
    name: "Zollani Creator & Gaming Tower (Apex Spec)",
    brand: "Zollani Custom",
    category: "gaming-pc",
    priceKes: 115000,
    condition: "Brand New Custom Build",
    warranty: "1 Year Full Hardware Warranty",
    inStock: true,
    specs: [
      "AMD Ryzen 5 5600X (6 Cores / 12 Threads)",
      "NVIDIA GeForce RTX 4060 8GB GDDR6",
      "32GB DDR4 3600MHz RGB RAM",
      "1TB Gen4 NVMe SSD (5000MB/s)",
      "650W 80+ Bronze Certified PSU",
      "Tempered Glass Case + 4x ARGB PWM Fans",
    ],
    popular: true,
    description:
      "Built and bench-tested in our Nairobi workshop for 1440p gaming, Premiere Pro video editing, and Blender 3D rendering.",
  },
  {
    id: "prod-workstation-architect",
    name: "CAD & Architecture Workstation Tower",
    brand: "Zollani Custom",
    category: "workstation",
    priceKes: 92000,
    condition: "Brand New Custom Build",
    warranty: "1 Year Full Hardware Warranty",
    inStock: true,
    specs: [
      "Intel Core i7 12th Gen (12 Cores)",
      "32GB DDR4 3200MHz RAM (Upgradable to 128GB)",
      "NVIDIA RTX 3050 8GB Dedicated GPU",
      "1TB NVMe M.2 SSD + 2TB Secondary HDD",
      "Gold Rated High-Efficiency Power Supply",
      "Quiet Noise-Dampened Chassis",
    ],
    description:
      "Optimized for ArchiCAD, AutoCAD, Revit, and structural analysis without thermal throttling.",
  },
  {
    id: "prod-thinkcentre-tiny",
    name: "Lenovo ThinkCentre M720q Tiny Mini PC",
    brand: "Lenovo",
    category: "mini-pc",
    priceKes: 24500,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Intel Core i5 8th Gen (6 Cores)",
      "16GB DDR4 RAM",
      "512GB NVMe SSD",
      "Dual DisplayPort + HDMI + USB-C",
      "Ultra-Compact Desk Footprint + VESA Mount Ready",
    ],
    description:
      "Space-saving desktop powerhouse ideal for POS counters, office workstations, home media centers, and reception desks.",
  },

  // SSD, RAM & STORAGE
  {
    id: "prod-laptop-turbo-kit",
    name: "Laptop Turbo Revive Upgrade Bundle (512GB SSD + 8GB RAM)",
    brand: "Kingston / Crucial",
    category: "upgrade-kit",
    priceKes: 8500,
    condition: "Hardware Bundle",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "512GB High-Speed NVMe / SATA SSD",
      "8GB DDR4 RAM Module",
      "Free Precision Installation Included",
      "Free Operating System & Data Migration",
      "Free Internal Deep Dust Cleaning & Thermal Repaste",
    ],
    popular: true,
    description:
      "Transform your slow, 5-minute boot laptop into a 15-second lightning machine without replacing your computer.",
  },
  {
    id: "prod-samsung-nvme-1tb",
    name: "1TB NVMe PCIe Gen4 M.2 Internal SSD",
    brand: "Samsung / WD Black",
    category: "upgrade-kit",
    priceKes: 9800,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "1TB Capacity (M.2 2280 Form Factor)",
      "Read Speeds up to 5,000 MB/s",
      "Compatible with Laptops, Desktops & PS5",
      "5-Year Endurance Rating",
    ],
    description:
      "High-speed NVMe solid-state drive for ultra-fast OS booting, 4K video scrubbing, and PlayStation 5 storage expansion.",
  },
  {
    id: "prod-external-hdd-2tb",
    name: "2TB Portable External Hard Drive (USB 3.2)",
    brand: "Seagate / WD",
    category: "upgrade-kit",
    priceKes: 8900,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "2TB Backup Storage Capacity",
      "USB 3.2 Gen 1 SuperSpeed (Up to 5Gbps)",
      "Plug-and-Play for Windows, macOS & Linux",
      "Shock-Resistant Slim Aluminum Enclosure",
    ],
    description:
      "Reliable portable drive for automated Time Machine / Windows backups, photo archives, and office file transport.",
  },
  {
    id: "prod-ram-16gb-ddr4",
    name: "16GB DDR4 3200MHz Laptop / Desktop RAM Stick",
    brand: "Crucial",
    category: "upgrade-kit",
    priceKes: 4800,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "16GB Single Module (DDR4-3200 / PC4-25600)",
      "Low-Voltage 1.2V Efficiency",
      "Available in SO-DIMM (Laptop) & UDIMM (Desktop)",
      "Free Compatibility Check at Zollani Lab",
    ],
    description:
      "Eliminate browser tab lag, Docker slowdowns, and video rendering stutters with genuine Micron/Crucial memory.",
  },

  // MICE
  {
    id: "acc-mx-ergo-mouse",
    name: "Pro Wireless Silent Rechargeable Mouse (USB-C + Bluetooth)",
    brand: "Logitech / Ugreen",
    category: "mouse",
    priceKes: 2800,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Dual-Mode: Bluetooth 5.0 + 2.4GHz USB Dongle",
      "4000 DPI Adjustable Precision Sensor",
      "Whisper-Quiet Left/Right Click Switches",
      "USB-C Rechargeable (Up to 60 Days Battery)",
    ],
    popular: true,
    description:
      "Ergonomic dual-mode wireless mouse that switches seamlessly between your laptop, tablet, and office desktop.",
  },
  {
    id: "acc-gaming-mouse-rgb",
    name: "Lightweight Honeycomb RGB Gaming Mouse (12,000 DPI)",
    brand: "Redragon / Razer",
    category: "mouse",
    priceKes: 3500,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "12,000 DPI Optical Esports Sensor",
      "7 Programmable Macro Buttons",
      "Braided Drag-Free Paracord Cable",
      "Customizable RGB Lighting Zones",
    ],
    description:
      "Precision gaming mouse engineered for fast FPS tracking, low click latency, and marathon comfort.",
  },
  {
    id: "acc-vertical-mouse",
    name: "Ergonomic Vertical Anti-Strain Wireless Mouse",
    brand: "Ugreen / Anker",
    category: "mouse",
    priceKes: 3200,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "57° Natural Handshake Wrist Angle",
      "Reduces Carpal Tunnel & Forearm Fatigue",
      "Thumb Forward/Back Navigation Buttons",
      "2400 DPI Optical Tracking",
    ],
    description:
      "Designed for developers, accountants, and designers working 8+ hours a day to keep wrist posture natural.",
  },

  // KEYBOARDS & COMBOS
  {
    id: "acc-mech-keyboard",
    name: "Compact 75% Hot-Swappable Mechanical Keyboard (Wireless)",
    brand: "Keychron / Redragon",
    category: "keyboard",
    priceKes: 6500,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Tactile Brown Switches (Quiet & Crisp)",
      "Tri-Mode: Wired USB-C, 2.4GHz & Bluetooth 5.1",
      "Windows & macOS Dual Keycaps Included",
      "White / RGB Backlit Legends",
    ],
    popular: true,
    description:
      "Built for coders, writers, and gamers who want satisfying mechanical feedback and multi-device wireless pairing.",
  },
  {
    id: "acc-wireless-combo",
    name: "Slim Full-Size Wireless Keyboard & Mouse Combo",
    brand: "Logitech MK270 / Dell",
    category: "keyboard",
    priceKes: 3400,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Full Numpad + Media Shortcut Keys",
      "Spill-Resistant Scissor-Switch Layout",
      "Single Nano USB Receiver for Both Devices",
      "Up to 18-Month Battery Endurance",
    ],
    description:
      "Clutter-free desk bundle ideal for office workstations, accountants, and home study setups.",
  },

  // CHARGERS, USB-C HUBS & CABLES
  {
    id: "acc-gan-charger-65w",
    name: "65W USB-C GaN Fast Laptop & Phone Charger (UK 3-Pin)",
    brand: "Ugreen / Anker",
    category: "cables-hubs",
    priceKes: 3800,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "65W Power Delivery 3.0 (Charges MacBook, ThinkPad, Dell, HP)",
      "2x USB-C + 1x USB-A Ports",
      "Surge & Over-Temperature Protection",
      "Includes 1.5m 100W Braided USB-C Cable",
    ],
    popular: true,
    description:
      "Compact Gallium Nitride fast charger replacing bulky laptop bricks—powers your laptop and smartphone simultaneously.",
  },
  {
    id: "acc-original-oem-charger",
    name: "Original OEM Laptop Power Adapter (HP / Dell / Lenovo 65W)",
    brand: "HP / Dell / Lenovo",
    category: "cables-hubs",
    priceKes: 2900,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Genuine Voltage-Regulated 19.5V / 20V Output",
      "Available in Blue-Tip, Barrel Pin & USB-C",
      "UK 3-Pin Fused Power Cord Included",
      "Bench-Tested for Zero Ripple & Safe Charging",
    ],
    description:
      "Protect your motherboard charging IC from cheap counterfeit adapters with a genuine voltage-stable laptop charger.",
  },
  {
    id: "acc-usbc-hub-11in1",
    name: "11-in-1 USB-C Multiport Docking Station (4K HDMI + Ethernet)",
    brand: "Ugreen / Baseus",
    category: "cables-hubs",
    priceKes: 4500,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "4K@60Hz HDMI + 1080p VGA Dual Display Output",
      "Gigabit RJ45 Ethernet Port + 100W PD Pass-Through",
      "3x USB 3.0 Ports + SD / MicroSD Card Readers",
      "3.5mm Audio Jack in Brushed Aluminum Shell",
    ],
    popular: true,
    description:
      "Turn one USB-C port on your MacBook or ultrabook into a complete multi-monitor office workstation.",
  },
  {
    id: "acc-hdmi-21-cable",
    name: "2M Braided 4K/8K Ultra-High-Speed HDMI 2.1 Cable",
    brand: "Ugreen",
    category: "cables-hubs",
    priceKes: 1200,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "48Gbps Bandwidth — Supports 4K@120Hz & 8K@60Hz",
      "Gold-Plated Connectors + Nylon Braided Jacket",
      "Ideal for PS5, Xbox Series X, Gaming Monitors & Projectors",
    ],
    description:
      "Zero-flicker display cable engineered for 120Hz console gaming, boardroom projectors, and external monitors.",
  },

  // MONITORS & DISPLAYS
  {
    id: "acc-monitor-24-ips",
    name: "24\" Full HD IPS Frameless Business & Study Monitor",
    brand: "Dell / HP",
    category: "monitor",
    priceKes: 14500,
    condition: "Ex-UK Grade A",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "24\" 1920x1080 IPS Anti-Glare Panel",
      "75Hz Refresh Rate + Low Blue Light Filter",
      "HDMI, DisplayPort & Height-Adjustable Ergonomic Stand",
      "Zero Dead Pixels Bench-Verified",
    ],
    description:
      "Crisp color-accurate IPS monitor with height/tilt/pivot adjustment for comfortable dual-screen office productivity.",
  },
  {
    id: "acc-monitor-27-144hz",
    name: "27\" QHD 165Hz Gaming & Creator IPS Monitor",
    brand: "LG / AOC",
    category: "monitor",
    priceKes: 34000,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "27\" 2560x1440 QHD IPS Display",
      "165Hz Refresh Rate + 1ms Response Time",
      "99% sRGB Color Coverage + FreeSync / G-Sync",
      "Dual HDMI 2.0 + DisplayPort 1.4",
    ],
    description:
      "Ultra-smooth high-refresh display built for competitive gaming, color grading, and razor-sharp multi-window coding.",
  },

  // NETWORKING & WIFI
  {
    id: "acc-wifi6-router",
    name: "AX1800 Dual-Band WiFi 6 Gigabit Router",
    brand: "TP-Link / MikroTik",
    category: "networking",
    priceKes: 6800,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "WiFi 6 (802.11ax) up to 1.8 Gbps Combined Speed",
      "4x Gigabit LAN Ports + 1x Gigabit WAN",
      "4x High-Gain Beamforming Antennas",
      "Compatible with Safaricom, Zuku & Jamii Fiber",
    ],
    description:
      "Eliminate Zoom call drops and dead zones across apartments and small offices with next-gen WiFi 6 coverage.",
  },
  {
    id: "acc-cat6-patch-10m",
    name: "10M Shielded Cat6 Gigabit Ethernet Patch Cable",
    brand: "Siemon / D-Link",
    category: "networking",
    priceKes: 950,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Pure Copper 24AWG Conductors (1000Mbps / 10Gbps Short Run)",
      "Factory-Crimped Snagless RJ45 Boots",
      "Fluke-Tested Signal Integrity",
    ],
    description:
      "Rock-solid wired connection for gaming consoles, Smart TVs, POS terminals, and office desks.",
  },

  // UPS & SURGE PROTECTION
  {
    id: "acc-ups-650va",
    name: "APC Back-UPS 650VA Power Backup & Surge Protector",
    brand: "APC Schneider Electric",
    category: "power-ups",
    priceKes: 7900,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "650VA / 390W Battery Backup Capacity",
      "Automatic Voltage Regulation (AVR)",
      "Protects Desktops, WiFi Routers & POS from KPLC Surges",
      "3x UK 3-Pin Output Sockets",
    ],
    popular: true,
    description:
      "Prevent motherboard fryouts and unsaved work loss during sudden power blackouts and brownouts.",
  },
  {
    id: "acc-surge-strip-6way",
    name: "6-Way Heavy-Duty Surge Protector Power Strip + USB-C",
    brand: "APC / Belkin",
    category: "power-ups",
    priceKes: 2400,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "6x UK 3-Pin Individually Switched Sockets",
      "900-Joule Surge & Spike Suppression",
      "2x USB-A + 1x USB-C Charging Ports",
      "2-Meter Heavy-Gauge Copper Cable",
    ],
    description:
      "Essential desk surge protection for laptops, monitors, printers, and home entertainment electronics.",
  },

  // AUDIO & WEBCAMS
  {
    id: "acc-webcam-1080p",
    name: "1080p Full HD Autofocus Webcam with Privacy Shutter",
    brand: "Logitech / Anker",
    category: "audio-webcam",
    priceKes: 3900,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "1080p @ 30fps Sharp Glass Lens",
      "Dual Noise-Reducing Stereo Microphones",
      "Built-In Physical Privacy Cover + Tripod Thread",
      "Plug-and-Play USB for Zoom, Teams & Meet",
    ],
    description:
      "Look sharp on client calls, remote interviews, and online classes with automatic low-light correction.",
  },
  {
    id: "acc-headset-anc",
    name: "Wireless Bluetooth & USB Office Headset with Boom Mic",
    brand: "Jabra / Logitech",
    category: "audio-webcam",
    priceKes: 4900,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Environmental Noise-Cancelling Flip-to-Mute Mic",
      "Bluetooth 5.2 + USB Dongle Included",
      "Up to 30 Hours Talk Time",
      "Memory Foam All-Day Ear Cushions",
    ],
    description:
      "Crystal-clear voice pickup for call centers, remote engineers, and busy open-plan Nairobi offices.",
  },

  // BAGS, STANDS & COOLING
  {
    id: "acc-laptop-stand",
    name: "Foldable CNC Aluminum Ergonomic Laptop Stand",
    brand: "Ugreen / Nulaxy",
    category: "bags-stands",
    priceKes: 2200,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "6-Level Height & Angle Adjustment",
      "Fits All 11\" – 17\" Laptops & MacBooks",
      "Open-Back Airflow Improves Cooling by up to 8°C",
      "Anti-Slip Silicone Pads + Travel Pouch",
    ],
    description:
      "Raise your laptop screen to eye level to eliminate neck strain while improving bottom intake airflow.",
  },
  {
    id: "acc-cooling-pad",
    name: "5-Fan Quiet Laptop Cooling Pad with Dual USB Hub",
    brand: "Havit / Cooler Master",
    category: "bags-stands",
    priceKes: 2600,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "1x Large 140mm + 4x 70mm High-Airflow Quiet Fans",
      "Metal Mesh Heat-Dissipating Surface",
      "Adjustable Height Stands + Fan Speed Dial",
      "Fits up to 17.3\" Gaming & Workstation Laptops",
    ],
    description:
      "Keep CPU and GPU temperatures low during long gaming sessions, rendering, and hot afternoons.",
  },
  {
    id: "acc-backpack-15",
    name: "Waterproof 15.6\" Anti-Theft Laptop Backpack with USB Port",
    brand: "Tigernu / Mark Ryden",
    category: "bags-stands",
    priceKes: 3800,
    condition: "Brand New",
    warranty: "6 Months Warranty",
    inStock: true,
    specs: [
      "Shockproof Padded 15.6\" Laptop + Tablet Sleeve",
      "Water-Repellent Oxford Fabric + Hidden Rear Pocket",
      "External USB Charging Pass-Through Port",
      "Luggage Strap & Breathable Mesh Back",
    ],
    description:
      "Commuter-ready laptop backpack protecting your machine from Nairobi rain, bumps, and crowded transit.",
  },

  // SMART SECURITY CAMERA
  {
    id: "acc-smart-camera",
    name: "2K Indoor/Outdoor Smart WiFi Pan-Tilt Security Camera",
    brand: "TP-Link Tapo / Ezviz",
    category: "smart-home-camera",
    priceKes: 4200,
    condition: "Brand New",
    warranty: "1 Year Warranty",
    inStock: true,
    specs: [
      "2K QHD Resolution + Color Night Vision",
      "360° Horizontal Pan & Motion Tracking Alerts",
      "Two-Way Audio + MicroSD / Cloud Recording",
      "Instant Smartphone App View Anywhere",
    ],
    description:
      "Monitor your shop, reception, server room, or home remotely from your phone with instant motion notifications.",
  },
];
