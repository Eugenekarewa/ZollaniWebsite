import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { approveTestimonial, deleteTestimonial, getAdminTestimonials, rejectTestimonial } from "./actions";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

export default async function AdminTestimonialsPage() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) redirect("/admin/login");

  const all = await getAdminTestimonials();
  const pending = all.filter((t) => t.status === "pending");
  const approved = all.filter((t) => t.status === "approved");
  const rejected = all.filter((t) => t.status === "rejected");

  return (
    <main className="surface-grid min-h-screen bg-cream-bg px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-brand">Zollani / Admin</p>
            <h1 className="mt-2 text-4xl font-black text-brand-dark">Testimonial moderation</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">
              Customer-submitted reviews land here as pending. Nothing appears on the homepage until you approve it.
            </p>
          </div>
          <a href="/" className="rounded-xl border border-cream-border bg-white px-4 py-3 text-sm font-bold text-brand-dark">View homepage</a>
        </div>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-black text-brand-dark">
            Pending review
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">{pending.length}</span>
          </h2>
          <div className="mt-4 grid gap-4">
            {pending.length === 0 && (
              <div className="rounded-3xl border border-dashed border-cream-border bg-white p-8 text-center text-sm text-brand-muted">No pending testimonials right now.</div>
            )}
            {pending.map((t) => (
              <div key={t.id} className="rounded-3xl border border-amber-300 bg-amber-50/60 p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-brand-dark">{t.name} <span className="font-normal text-brand-muted">· {t.role || "Customer"} · {t.companyOrLocation || "Kenya"}</span></p>
                    <p className="mt-1 text-xs font-mono uppercase tracking-wider text-amber-700">{t.category} · {t.rating}/5 stars</p>
                  </div>
                  <p className="text-xs text-brand-muted">Submitted {new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-slate">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex gap-3">
                  <form action={approveTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl bg-teal-deep px-4 py-2 text-xs font-bold text-white">Approve &amp; publish</button></form>
                  <form action={rejectTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl border border-cream-border bg-white px-4 py-2 text-xs font-bold text-brand-dark">Reject</button></form>
                  <form action={deleteTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl border border-red-200 px-4 py-2 text-xs font-bold text-red-700">Delete</button></form>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-black text-brand-dark">
            Live on homepage
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-brand text-xs font-black text-white">{approved.length}</span>
          </h2>
          <div className="mt-4 grid gap-4">
            {approved.length === 0 && (
              <div className="rounded-3xl border border-dashed border-cream-border bg-white p-8 text-center text-sm text-brand-muted">No approved testimonials yet.</div>
            )}
            {approved.map((t) => (
              <div key={t.id} className="rounded-3xl border border-teal-brand/25 bg-white p-6 shadow-sm">
                <p className="font-black text-brand-dark">{t.name} <span className="font-normal text-brand-muted">· {t.role || "Customer"} · {t.companyOrLocation || "Kenya"}</span></p>
                <p className="mt-3 text-sm leading-relaxed text-brand-slate">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex gap-3">
                  <form action={rejectTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl border border-cream-border bg-white px-4 py-2 text-xs font-bold text-brand-dark">Unpublish</button></form>
                  <form action={deleteTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl border border-red-200 px-4 py-2 text-xs font-bold text-red-700">Delete</button></form>
                </div>
              </div>
            ))}
          </div>
        </section>

        {rejected.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-black text-brand-dark">Rejected</h2>
            <div className="mt-4 grid gap-4">
              {rejected.map((t) => (
                <div key={t.id} className="rounded-3xl border border-cream-border bg-cream-surface p-6 opacity-70">
                  <p className="font-black text-brand-dark">{t.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex gap-3">
                    <form action={approveTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl bg-teal-deep px-4 py-2 text-xs font-bold text-white">Approve instead</button></form>
                    <form action={deleteTestimonial}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl border border-red-200 px-4 py-2 text-xs font-bold text-red-700">Delete</button></form>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
