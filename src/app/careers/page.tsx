import type { Metadata } from "next";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  HeartHandshake,
  GraduationCap,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { JobApplicationModal } from "@/components/interactive/JobApplicationModal";
import { getPublishedJobPostings } from "@/app/admin/careers/actions";

export const metadata: Metadata = {
  title: "Careers at Zollani Tech | Jobs & Internships in Nairobi",
  description:
    "Become a part of Zollani Tech. Explore open positions and internships in electronics repair, IT support, and technical training in Nairobi, Kenya.",
  keywords: ["Zollani Tech careers", "jobs Nairobi", "electronics repair jobs Kenya", "IT internship Nairobi", "become part of Zollani Tech"],
};

const perks = [
  {
    title: "Hands-On Technical Craft",
    description: "Work on real board-level repairs, enterprise IT rollouts, and hardware most shops write off.",
    icon: Briefcase,
  },
  {
    title: "Mentorship That Sticks",
    description: "Learn directly from certified technicians and our founder's hands-on diagnostic approach.",
    icon: GraduationCap,
  },
  {
    title: "Room to Grow",
    description: "We promote from within as the company and our training programs scale across Kenya.",
    icon: TrendingUp,
  },
  {
    title: "A Mission-Led Team",
    description: "Every role supports our youth empowerment and e-waste reduction mission in Nairobi.",
    icon: HeartHandshake,
  },
];

export default async function CareersPage() {
  let jobs: Awaited<ReturnType<typeof getPublishedJobPostings>> = [];
  try {
    jobs = await getPublishedJobPostings();
  } catch {
    jobs = [];
  }

  return (
    <div className="bg-cream-bg min-h-screen">
      <PageHero
        eyebrow="Careers / Become Part of Us"
        title="Build your career fixing what others give up on."
        description="Zollani Tech is growing — join a hands-on team of technicians, engineers, and educators in Nairobi who repair, support, and teach technology with honesty and precision."
        image="/images/pc-repair-workbench.jpg"
        imageAlt="Zollani Tech technicians working together in the Nairobi workshop"
        action={{ label: "Chat with HR on WhatsApp", href: "https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%27m%20interested%20in%20joining%20your%20team." }}
        secondaryAction={{ label: "See open roles below", href: "#openings" }}
      />

      {/* WHY WORK WITH US */}
      <section className="border-b border-cream-border bg-cream-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-kicker">Why Zollani Tech</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">A team that fixes real problems, every single day.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="rounded-3xl border border-cream-border bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-subtle text-teal-brand">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-brand-dark">{perk.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">{perk.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="openings" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="section-kicker">Open Positions &amp; Internships</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">Current openings</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted">
              Don&apos;t see a role that fits? We review open applications and internship requests year-round.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-cream-border bg-white p-10 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-teal-brand" />
              <h3 className="mt-4 text-lg font-black text-brand-dark">No open positions right now</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-brand-muted">
                We&apos;re not actively hiring at this moment, but we&apos;re always happy to hear from skilled technicians, IT support staff, and students seeking internships.
              </p>
              <a
                href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%27d%20like%20to%20send%20an%20open%20application%20or%20internship%20request."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-coral-brand px-6 py-3 text-xs font-bold text-white hover:bg-coral-hover transition-colors"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                Send an Open Application
              </a>
            </div>
          ) : (
            <div className="grid gap-5">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-3xl border border-cream-border bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-subtle px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal-brand">
                        <Building2 className="h-3 w-3" />
                        {job.department}
                      </span>
                      <h3 className="mt-3 text-2xl font-black text-brand-dark">{job.title}</h3>
                      {job.summary && <p className="mt-2 text-sm leading-relaxed text-brand-muted">{job.summary}</p>}
                      <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold text-brand-slate">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-coral-brand" />{job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-coral-brand" />{job.employmentType}</span>
                      </div>
                    </div>
                    <JobApplicationModal jobId={job.id} jobTitle={job.title} />
                  </div>

                  <div className="mt-6 grid gap-6 border-t border-cream-border pt-6 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark">Role Description</h4>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-brand-slate">{job.description}</p>
                    </div>
                    {job.requirements && (
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark">Requirements</h4>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-brand-slate">{job.requirements}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-8 rounded-3xl bg-teal-deep p-8 text-white shadow-xl sm:p-12 lg:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-cream-bg/80">Become Part of Us</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.04em]">Think You&apos;d Be a Great Fit?</h2>
            <p className="max-w-xl text-xs sm:text-sm text-cream-bg/90 leading-relaxed">
              Send us your details even if nothing is currently listed. We keep every application on file for future openings.
            </p>
          </div>
          <a
            href="https://wa.me/254768551914?text=Hello%20Zollani%20Tech%2C%20I%27m%20interested%20in%20joining%20your%20team."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-brand px-7 py-4 text-xs font-black text-white shadow-md transition-transform hover:-translate-y-1 hover:bg-coral-hover active:translate-y-0 text-center"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Message Us on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
