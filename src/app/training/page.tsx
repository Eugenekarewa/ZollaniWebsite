import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { TrainingGallery } from "@/components/training/TrainingGallery";
import { PageHero } from "@/components/ui/PageHero";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Terminal,
  Cpu,
  BookOpen,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  School,
  Building,
  Laptop,
} from "lucide-react";

export default function TrainingPage() {
  const tracks = [
    {
      title: "AI Msingi (Ages 9 – 18)",
      badge: "CBC-Aligned Digital Curriculum",
      description:
        "A 10-week, three-tier AI and digital literacy program designed specifically for Kenyan learners. Practical, grounded in local examples (M-Pesa, Kiswahili/Sheng), with an unplugged-first pedagogy that works even without reliable internet.",
      levels: [
        "Explorers (Ages 9–11): What is AI, pattern recognition, online safety",
        "Navigators (Ages 12–14): Prompt engineering, machine learning basics, ethics",
        "Builders (Ages 15–18): Hands-on AI tool integration, project building, portfolio",
      ],
      icon: Sparkles,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "College & TVET Partnership Track",
      badge: "Zero-Cost Institutional Model",
      description:
        "Delivered directly to college and technical institute students at no cost to the institution. We bring industry-tested training in practical electronics repair, software development, and Linux systems.",
      levels: [
        "Electronics & Device Repair (Hands-on diagnostics & micro-soldering)",
        "Software Engineering Foundations (Modern full-stack web & Git)",
        "Financial & Digital Literacy (Digital payments & blockchain foundations)",
      ],
      icon: School,
      color: "text-teal-brand bg-teal-subtle",
    },
    {
      title: "Corporate Cybersecurity Staff Training",
      badge: "Workplace Risk Mitigation",
      description:
        "Human error causes 90% of cyber breaches. Led by Cisco Ethical Hacker & ISACA CSX certified trainers, we teach your staff how to identify phishing lures, secure sensitive company records, and safely navigate the web.",
      levels: [
        "Phishing & Social Engineering Simulation (Real-world deception drills)",
        "Password & Credential Security (MFA, password managers, leak auditing)",
        "Incident Reporting Protocol (Quick containment to stop ransomware spread)",
      ],
      icon: ShieldCheck,
      color: "text-coral-brand bg-coral-light",
    },
    {
      title: "Linux & Practical Systems Administration",
      badge: "Technical Deep-Dive",
      description:
        "From basic Bash command-line proficiency to deploying cloud servers, configuring firewalls, and managing server processes. Designed for university graduates and aspiring IT engineers.",
      levels: [
        "Linux CLI Essentials (File structures, permissions, package management)",
        "Networking & Services (SSH, web servers, DNS, systemd services)",
        "Defensive Hardening (IPTables, fail2ban, SSH key-only access)",
      ],
      icon: Terminal,
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <div className="bg-cream-bg min-h-screen">
      <PageHero
        eyebrow="Training / Community"
        title="Build real technical skills."
        description="Hands-on AI, electronics, software, Linux, and cybersecurity learning for young people, institutions, and teams across Kenya."
        image="/images/youth-empowerment-students.jpg"
        imageAlt="Students learning technology together"
        action={{ label: "Partner or enroll", href: "#partner-form" }}
        secondaryAction={{ label: "Chat on WhatsApp", href: "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20am%20interested%20in%20your%20training%20programs." }}
      />

      {/* Proven Track Record Strip */}
      <section className="bg-cream-surface py-8 border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-teal-brand font-mono">
                AI Msingi
              </div>
              <div className="text-xs text-brand-muted mt-0.5">
                10-Week Structured Curriculum
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-coral-brand font-mono">
                MOU Partner
              </div>
              <div className="text-xs text-brand-muted mt-0.5">
                CurioCity Tutoring &amp; Device Loan
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-teal-brand font-mono">
                CBC-Aligned
              </div>
              <div className="text-xs text-brand-muted mt-0.5">
                Kenyan Context &amp; Sheng Examples
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-coral-brand font-mono">
                100% Practical
              </div>
              <div className="text-xs text-brand-muted mt-0.5">
                Hands-On Hardware &amp; Coding
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Tracks Grid */}
      <section className="py-16 sm:py-24 bg-cream-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
              Modular Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-3 tracking-tight">
              Our Active Training Programs
            </h2>
            <p className="text-sm text-brand-muted mt-2">
              Designed for young learners, technical colleges, and corporate organizations looking to
              upskill their workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track, idx) => {
              const Icon = track.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 shadow-md border border-cream-border hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${track.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-slate bg-cream-bg px-3 py-1 rounded-full border border-cream-border">
                        {track.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-brand-dark mb-2">
                      {track.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed mb-6">
                      {track.description}
                    </p>

                    <div className="space-y-2.5 bg-cream-surface p-4 rounded-2xl border border-cream-border mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                        Key Modules / Progression:
                      </div>
                      {track.levels.map((lvl, lidx) => (
                        <div
                          key={lidx}
                          className="flex items-start gap-2 text-xs text-brand-slate"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" />
                          <span>{lvl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cream-border flex items-center justify-between">
                    <a
                      href={`https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%20want%20to%20inquire%20about%20the%20${encodeURIComponent(
                        track.title
                      )}%20program.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-coral-brand hover:underline"
                    >
                      <span>Inquire on WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="#partner-form"
                      className="text-xs font-bold text-teal-brand hover:underline"
                    >
                      Book Cohort
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training in Action Photo Gallery & Uploader */}
      <section className="py-16 sm:py-24 bg-cream-surface border-t border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrainingGallery />
        </div>
      </section>

      {/* College & School Partnership Callout */}
      <section className="bg-teal-deep text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-teal-brand/40 rounded-3xl p-8 sm:p-12 border border-teal-brand/60 text-center space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-coral-brand bg-coral-brand/20 px-4 py-1 rounded-full">
            Institutional Collaboration
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Are You a School, College, or TVET in Kenya?
          </h2>
          <p className="text-sm sm:text-base text-cream-bg/90 leading-relaxed max-w-2xl mx-auto">
            We are not asking for funding. We bring an industry-built, classroom-tested curriculum
            directly to your students at no cost to the institution in exchange for classroom time
            and cohort access.
          </p>
          <div className="pt-2">
            <a
              href="#partner-form"
              className="inline-flex items-center gap-2 bg-coral-brand hover:bg-coral-hover text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all"
            >
              <span>Submit College Partnership Request</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="partner-form" className="py-16 sm:py-24 bg-cream-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm
            defaultService="Youth & School Training Program"
            source="training-page"
          />
        </div>
      </section>
    </div>
  );
}
