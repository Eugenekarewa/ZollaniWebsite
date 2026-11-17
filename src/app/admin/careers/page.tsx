import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  deleteJobApplication,
  deleteJobPosting,
  getAdminJobPostings,
  getJobApplications,
  saveJobPosting,
} from "./actions";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

export default async function AdminCareersPage() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) redirect("/admin/login");

  const [postings, applications] = await Promise.all([getAdminJobPostings(), getJobApplications()]);

  return (
    <main className="surface-grid min-h-screen bg-cream-bg px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-brand">Zollani / Admin</p>
            <h1 className="mt-2 text-4xl font-black text-brand-dark">Careers &amp; internships</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">
              Post open positions and internships. Only &ldquo;Published&rdquo; postings appear on the public Careers page.
            </p>
          </div>
          <a href="/careers" className="rounded-xl border border-cream-border bg-white px-4 py-3 text-sm font-bold text-brand-dark">View Careers page</a>
        </div>

        <form action={saveJobPosting} className="mt-8 grid gap-4 rounded-3xl border border-teal-brand/20 bg-white p-6 shadow-sm md:grid-cols-2">
          <h2 className="md:col-span-2 text-xl font-black text-brand-dark">Post a position or internship</h2>
          <input name="title" required placeholder="Job title (e.g. Field Service Technician)" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
          <input name="department" placeholder="Department (e.g. Repairs, IT, Internship)" defaultValue="General" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <input name="location" placeholder="Location" defaultValue="Nairobi, Kenya" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <select name="employmentType" defaultValue="Full-Time" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3">
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Apprenticeship">Apprenticeship</option>
          </select>
          <input name="applyEmail" placeholder="Apply email" defaultValue="eugene.karewa@zollani.co.ke" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <textarea name="summary" placeholder="One-line summary shown on the careers listing" className="min-h-16 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
          <textarea name="description" required placeholder="Full role description" className="min-h-28 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
          <textarea name="requirements" placeholder="Requirements, one per line" className="min-h-28 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
          <input name="sortOrder" type="number" defaultValue={0} placeholder="Sort order" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <select name="status" defaultValue="draft" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3">
            <option value="draft">Draft (hidden)</option>
            <option value="published">Published (live)</option>
          </select>
          <button className="rounded-xl bg-coral-brand px-5 py-3 font-bold text-white md:col-span-2">Save posting</button>
        </form>

        <section className="mt-10">
          <h2 className="text-lg font-black text-brand-dark">All postings ({postings.length})</h2>
          <div className="mt-4 grid gap-5">
            {postings.map((job) => (
              <form key={job.id} action={saveJobPosting} className="grid gap-4 rounded-3xl border border-cream-border bg-white p-6 shadow-sm md:grid-cols-2">
                <input type="hidden" name="id" value={job.id} />
                <div className="flex items-center gap-2 md:col-span-2">
                  <h3 className="text-lg font-black text-brand-dark">{job.title}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${job.status === "published" ? "bg-teal-subtle text-teal-brand" : "bg-amber-100 text-amber-700"}`}>
                    {job.status}
                  </span>
                </div>
                <input name="title" defaultValue={job.title} required className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
                <input name="department" defaultValue={job.department} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
                <input name="location" defaultValue={job.location} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
                <select name="employmentType" defaultValue={job.employmentType} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                </select>
                <input name="applyEmail" defaultValue={job.applyEmail} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
                <textarea name="summary" defaultValue={job.summary} className="min-h-16 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
                <textarea name="description" defaultValue={job.description} required className="min-h-28 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
                <textarea name="requirements" defaultValue={job.requirements} className="min-h-28 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
                <input name="sortOrder" type="number" defaultValue={job.sortOrder} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
                <select name="status" defaultValue={job.status} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3">
                  <option value="draft">Draft (hidden)</option>
                  <option value="published">Published (live)</option>
                </select>
                <div className="flex gap-3 md:col-span-2">
                  <button className="rounded-xl bg-teal-brand px-5 py-3 font-bold text-white">Save changes</button>
                  <button formAction={deleteJobPosting} className="rounded-xl border border-red-200 px-5 py-3 font-bold text-red-700">Delete</button>
                </div>
              </form>
            ))}
            {postings.length === 0 && <div className="rounded-3xl border border-dashed border-cream-border bg-white p-10 text-center text-sm text-brand-muted">No postings yet. Add one above.</div>}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-black text-brand-dark">
            Applicant inbox
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral-brand text-xs font-black text-white">{applications.length}</span>
          </h2>
          <div className="mt-4 grid gap-4">
            {applications.length === 0 && (
              <div className="rounded-3xl border border-dashed border-cream-border bg-white p-8 text-center text-sm text-brand-muted">No applications yet.</div>
            )}
            {applications.map((app) => {
              const job = postings.find((p) => p.id === app.jobId);
              return (
                <div key={app.id} className="rounded-3xl border border-cream-border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-brand-dark">{app.applicantName}</p>
                      <p className="text-xs text-brand-muted">{app.email} {app.phone && `· ${app.phone}`}</p>
                      <p className="mt-1 text-xs font-mono uppercase tracking-wider text-teal-brand">Applied for: {job?.title || "Deleted posting"}</p>
                    </div>
                    <p className="text-xs text-brand-muted">{new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  {app.coverMessage && <p className="mt-3 text-sm leading-relaxed text-brand-slate">{app.coverMessage}</p>}
                  {app.resumeUrl && <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-bold text-teal-brand underline">View resume / portfolio link</a>}
                  <div className="mt-4">
                    <form action={deleteJobApplication}><input type="hidden" name="id" value={app.id} /><button className="rounded-xl border border-red-200 px-4 py-2 text-xs font-bold text-red-700">Delete</button></form>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
