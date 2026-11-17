"use client";

import React, { useState } from "react";
import { X, Star, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import { submitTestimonial } from "@/app/admin/testimonials/actions";

export function TestimonialSubmitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    formData.set("rating", String(rating));
    try {
      await submitTestimonial(formData);
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
        className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-teal-brand/30 bg-teal-subtle px-5 py-2.5 text-xs font-bold text-teal-brand transition-colors hover:bg-teal-brand hover:text-white"
      >
        <MessageSquarePlus className="h-4 w-4" />
        Share your own experience
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
                <h3 className="text-xl font-black text-brand-dark">Thank you!</h3>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Your testimony has been submitted for review. Our team checks every submission before it goes live on the website.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 rounded-xl bg-teal-deep px-5 py-2.5 text-xs font-bold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-brand-dark">Share your real experience</h3>
                  <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                    Submissions are reviewed by our team before appearing publicly — this keeps every review on our site genuine.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Your full name" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />
                  <input name="role" placeholder="Role (e.g. Director, Student)" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />
                </div>
                <input name="companyOrLocation" placeholder="Company or location (e.g. Westlands, Nairobi)" className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm" />

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-slate">Your rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star`}>
                        <Star className={`h-6 w-6 ${n <= rating ? "fill-coral-brand text-coral-brand" : "text-cream-border"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <select name="category" defaultValue="repair" className="w-full rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm">
                  <option value="repair">Repair service</option>
                  <option value="business">Business IT / bulk supply</option>
                  <option value="training">Training program</option>
                </select>

                <textarea
                  name="quote"
                  required
                  rows={4}
                  placeholder="Tell us what you experienced working with Zollani Tech..."
                  className="w-full resize-y rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-sm"
                />

                {status === "error" && (
                  <p className="text-xs font-bold text-coral-brand">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-xl bg-coral-brand py-3 text-sm font-bold text-white transition-all hover:bg-coral-hover disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting..." : "Submit for review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
