export interface TrainingPhoto {
  id: string;
  title: string;
  cohort: string;
  category: "ai-msingi" | "college-tvet" | "corporate" | "hardware-lab";
  imageUrl: string;
  date: string;
  location: string;
  description: string;
  isUserUploaded?: boolean;
}

export const INITIAL_TRAINING_PHOTOS: TrainingPhoto[] = [
  {
    id: "tp-1",
    title: "AI Msingi Youth Cohort in Session",
    cohort: "AI Msingi — Junior Navigators",
    category: "ai-msingi",
    imageUrl: "/images/youth-empowerment-students.jpg",
    date: "August 2026",
    location: "Nairobi Innovation Hub",
    description: "Young learners exploring computer vision models and prompt engineering during our 10-week CBC-aligned AI literacy program.",
  },
  {
    id: "tp-2",
    title: "Hands-On Circuit & Motherboard Workshop",
    cohort: "TVET Skills Partnership",
    category: "hardware-lab",
    imageUrl: "/images/hardware-motherboard.jpg",
    date: "July 2026",
    location: "Zollani Tech Electronics Lab, Nairobi",
    description: "Students learning microscopic soldering, tracing power rails with digital multimeters, and replacing shorted SMD capacitors.",
  },
  {
    id: "tp-3",
    title: "Corporate Staff Cyber Threat Simulation",
    cohort: "Corporate Security Bootcamp",
    category: "corporate",
    imageUrl: "/images/cybersecurity-training-room.jpg",
    date: "August 2026",
    location: "Westlands Office Park, Nairobi",
    description: "Training corporate employees on real-world phishing deception, password managers, and rapid incident containment protocols.",
  },
  {
    id: "tp-4",
    title: "College Practical Systems & Linux Lab",
    cohort: "Campus Tech Cohort 3",
    category: "college-tvet",
    imageUrl: "/images/classroom-workshop.jpg",
    date: "June 2026",
    location: "Pwani & Nairobi Partner Campuses",
    description: "Intensive hands-on systems administration session configuring Linux kernels, SSH keys, and local development environments.",
  },
  {
    id: "tp-5",
    title: "Enterprise Server Infrastructure Walkthrough",
    cohort: "Advanced Networking Trainees",
    category: "hardware-lab",
    imageUrl: "/images/corporate-team-server.jpg",
    date: "May 2026",
    location: "Data Centre Lab, Nairobi",
    description: "Teaching rack cabling standards, patch panel wiring, and redundant UPS backup configurations.",
  },
];
