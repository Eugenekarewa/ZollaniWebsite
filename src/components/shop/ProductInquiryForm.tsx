"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "254768551914";

export function ProductInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, subject: "Shop product inquiry" }) });
      if (!response.ok) throw new Error("Unable to send inquiry");
      setSubmitted(true);
      event.currentTarget.reset();
    } catch {
      setError("We could not send your inquiry. Please use WhatsApp instead.");
    } finally {
      setSending(false);
    }
  }

  return <section id="product-inquiry" className="mt-16 rounded-3xl border border-cream-border bg-cream-surface p-6 shadow-sm sm:p-10"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-coral-brand">Need something else?</p><h2 className="mt-3 text-3xl font-black tracking-tight text-brand-dark">Tell us what you need and we&apos;ll source it.</h2><p className="mt-4 text-sm leading-6 text-brand-muted">Can&apos;t find the exact laptop, monitor, camera, accessory, or PC part? Send the specifications and our team will check availability and pricing.</p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Zollani Tech, I would like help sourcing a product.")}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white">Ask on WhatsApp</a></div><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><input required name="name" placeholder="Your name" className="rounded-xl border border-cream-border bg-background px-4 py-3 text-sm" /><input required type="email" name="email" placeholder="Email address" className="rounded-xl border border-cream-border bg-background px-4 py-3 text-sm" /><input name="phone" placeholder="Phone / WhatsApp number" className="rounded-xl border border-cream-border bg-background px-4 py-3 text-sm" /><input name="budget" placeholder="Budget in KES (optional)" className="rounded-xl border border-cream-border bg-background px-4 py-3 text-sm" /><textarea required name="message" placeholder="What product or specifications do you need?" className="min-h-32 rounded-xl border border-cream-border bg-background px-4 py-3 text-sm sm:col-span-2" /><button disabled={sending} type="submit" className="rounded-xl bg-teal-deep px-5 py-3 text-sm font-bold text-white disabled:opacity-60 sm:col-span-2">{sending ? "Sending..." : "Send product inquiry"}</button>{submitted ? <p role="status" className="text-sm font-bold text-teal-deep sm:col-span-2">Thanks. We&apos;ll review your request and get back to you.</p> : null}{error ? <p role="alert" className="text-sm font-bold text-coral-brand sm:col-span-2">{error}</p> : null}</form></div></section>;
}
