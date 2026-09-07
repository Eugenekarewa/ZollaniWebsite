"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Clock, ShieldCheck } from "lucide-react";

interface ContactFormProps {
  defaultService?: string;
  className?: string;
  source?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultService = "Individual Repair",
  className = "",
  source = "general",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: defaultService,
    deviceModel: "",
    message: "",
    serviceLocation: "dropoff", // dropoff | onsite | remote
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again or reach out on WhatsApp.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An error occurred.");
    }
  };

  const waPreFill = encodeURIComponent(
    `Hello Zollani Tech, I submitted an inquiry for ${formData.serviceType} (Device: ${
      formData.deviceModel || "Not specified"
    }). My Name: ${formData.fullName}, Phone: ${formData.phone}. Note: ${formData.message}`
  );

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-cream-border ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-black text-brand-dark tracking-tight">
          Request a Quote or Book a Service
        </h3>
        <p className="text-sm text-brand-muted mt-1">
          Fill out this form and our Nairobi engineering team will review and respond promptly.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-teal-subtle/70 border border-teal-brand/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-teal-brand text-white flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-black text-brand-dark">
              Inquiry Received!
            </h4>
            <p className="text-sm text-brand-slate mt-1 max-w-md mx-auto">
              Thank you, <strong>{formData.fullName}</strong>. Our team has received your details and will call or message you back on <strong>{formData.phone}</strong> shortly.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/254768551914?text=${waPreFill}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Speed up on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setStatus("idle");
                setFormData({
                  fullName: "",
                  phone: "",
                  email: "",
                  serviceType: defaultService,
                  deviceModel: "",
                  message: "",
                  serviceLocation: "dropoff",
                });
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-semibold text-brand-slate hover:bg-cream-border/50 transition-colors"
            >
              Submit another request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
              >
                Full Name <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Kamau"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark placeholder:text-brand-muted/60 outline-none transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
              >
                Phone / WhatsApp Number <span className="text-coral-brand">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254 7XX XXX XXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark placeholder:text-brand-muted/60 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
              >
                Email Address (Optional for Repairs)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark placeholder:text-brand-muted/60 outline-none transition-all"
              />
            </div>

            {/* Service Type */}
            <div>
              <label
                htmlFor="serviceType"
                className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
              >
                Service Category <span className="text-coral-brand">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark outline-none bg-white transition-all"
              >
                <option value="Laptop / MacBook Repair">Laptop / MacBook Repair</option>
                <option value="Smartphone / Tablet Repair">Smartphone / Tablet Repair</option>
                <option value="Motherboard Micro-Soldering">Motherboard Micro-Soldering</option>
                <option value="Data Recovery & Storage">Data Recovery & Storage</option>
                <option value="Business IT Support Contract">Business IT Support Contract (SLA)</option>
                <option value="Youth & School Training Program">Youth / School Training Program</option>
                <option value="Refurbished PC / Custom Rig">Refurbished PC / Custom Rig</option>
                <option value="On-Site Emergency Visit">On-Site Emergency Visit</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Device Model */}
            <div>
              <label
                htmlFor="deviceModel"
                className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
              >
                Device Model & Brand
              </label>
              <input
                type="text"
                id="deviceModel"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                placeholder="e.g. HP Pavilion 15 / MacBook Air M1"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark placeholder:text-brand-muted/60 outline-none transition-all"
              />
            </div>

            {/* Service Preference */}
            <div>
              <label
                htmlFor="serviceLocation"
                className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
              >
                Service Delivery Preference
              </label>
              <select
                id="serviceLocation"
                name="serviceLocation"
                value={formData.serviceLocation}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark outline-none bg-white transition-all"
              >
                <option value="dropoff">Nairobi Drop-off (Faster & Free Diagnostics)</option>
                <option value="onsite">On-Site Technician Visit (Office / Residence)</option>
                <option value="remote">Remote Support (Software / Diagnostics)</option>
              </select>
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5"
            >
              Describe the Issue / Requirements <span className="text-coral-brand">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Provide symptoms, e.g.: Laptop screen stays black after power LED turns on, or we need an IT support retainer for 15 workstations..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border focus:border-teal-brand focus:ring-2 focus:ring-teal-subtle text-sm text-brand-dark placeholder:text-brand-muted/60 outline-none transition-all resize-y"
            ></textarea>
          </div>

          {/* Privacy and Turnaround Note */}
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <Clock className="w-3.5 h-3.5 text-teal-brand shrink-0" />
            <span>Average callback turnaround: <strong>Under 15 minutes</strong> during business hours.</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-coral-brand hover:bg-coral-hover disabled:opacity-60 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{status === "submitting" ? "Sending Request..." : "Submit Quote Request"}</span>
            </button>

            <a
              href={`https://wa.me/254768551914?text=${encodeURIComponent(
                "Hello Zollani Tech, I would like to book a service directly on WhatsApp."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Or WhatsApp Us Directly</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
};
