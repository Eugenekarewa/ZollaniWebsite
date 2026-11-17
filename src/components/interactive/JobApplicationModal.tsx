"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { submitJobApplication } from "@/app/admin/careers/actions";

export function JobApplicationModal({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    formData.set("jobId", jobId);
    try {
      await submitJobApplication(formData);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-coral-brand px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-coral-hover"
      >
        <Send className="h-3.5 w-3.5" />
        Apply Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-cream-border bg-white p-6 shadow-2xl sm:p-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-brand-muted hover:bg-cream-bg hover:text-brand-dark"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {status === "success" ? (
              <div className="space-y-3 py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal-brand" />
                <h3 className="text-xl font-black text-brand-dark">Application received!</h3>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Thank you for applying for <strong>{jobTitle}</strong>. Our team will review your details and reach out if there is a fit.
                </p>
                <button onClick={() => setIsOpen(false)} className="mt-2 rounded-xl bg-teal-deep px-5 py-2.5 text-xs font-bold text-white">
                  Close
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-coral-brand">Apply for</p>
                  <h3 className="mt-1 text-xl font-black text-brand-dark">{jobTitle}</h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="applicantName" required placeholder="Full name" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />
                  <input name="phone" placeholder="Phone / WhatsApp number" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />
                </div>
                <input name="email" type="email" required placeholder="Email address" className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />
                <input name="resumeUrl" placeholder="Link to your CV / portfolio (Google Drive, LinkedIn, etc.)" className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />
                <textarea
                  name="coverMessage"
                  rows={4}
                  placeholder="Tell us briefly why you're a great fit for this role..."
                  className="w-full resize-y rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm"
                />

                {status === "error" && <p className="text-xs font-bold text-coral-brand">Something went wrong. Please try again.</p>}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-xl bg-coral-brand py-3 text-sm font-bold text-white transition-all hover:bg-coral-hover disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting..." : "Submit application"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
