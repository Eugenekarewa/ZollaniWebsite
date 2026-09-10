export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrLocation: string;
  avatarText: string;
  rating: number;
  quote: string;
  category: "repair" | "business" | "training";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Brian Mwangi",
    role: "Senior Consultant",
    companyOrLocation: "Kilimani, Nairobi",
    avatarText: "BM",
    rating: 5,
    quote:
      "My MacBook Pro had severe liquid damage and two other repair shops in town declared the motherboard dead. Eugene at Zollani Tech diagnosed the shorted power rail and revived it within 48 hours without losing a single medical document. Genuine board-level mastery.",
    category: "repair",
  },
  {
    id: "test-2",
    name: "Sarah Kimani",
    role: "Managing Director",
    companyOrLocation: "Apex Logistics Ltd, Westlands",
    avatarText: "SK",
    rating: 5,
    quote:
      "We brought in Zollani Tech for a monthly IT support contract covering our 24 workstations, network firewall, and cloud backup. Downtime is now practically zero. Whenever someone has an issue, their response is fast, professional, and courteous.",
    category: "business",
  },
  {
    id: "test-3",
    name: "David Ochieng",
    role: "Head of ICT & Computer Studies",
    companyOrLocation: "Nairobi Academy Partner Program",
    avatarText: "DO",
    rating: 5,
    quote:
      "Zollani Tech's AI Msingi and cybersecurity workshops completely transformed our students' enthusiasm for technology. The curriculum was practical, CBC-aligned, and focused on real problem-solving.",
    category: "training",
  },
  {
    id: "test-4",
    name: "Mercy Wanjiku",
    role: "Architecture Student",
    companyOrLocation: "University of Nairobi",
    avatarText: "MW",
    rating: 5,
    quote:
      "My laptop hinge cracked and split the display bezel right before my final year thesis presentation. Zollani Tech rebuilt the hinge chassis and replaced the broken screen on the very same day. Affordable and lifesaver service!",
    category: "repair",
  },
  {
    id: "test-5",
    name: "Kennedy Mutua",
    role: "Founder & Creative Director",
    companyOrLocation: "Vivid Motion Studios, Karen",
    avatarText: "KM",
    rating: 5,
    quote:
      "Commissioned a custom 4K video editing and 3D rendering PC build from Zollani Tech. From component selection to cable routing and stress-testing, the execution was flawless. It runs cool, silent, and renders in record time.",
    category: "business",
  },
];
