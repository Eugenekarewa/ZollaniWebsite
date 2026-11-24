import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

const NEXT_STEP_LINKS = [
  { label: "Repair Cost Estimator", href: "/services#estimator" },
  { label: "Shop Laptops & Parts", href: "/shop" },
  { label: "Track Order / Book Pickup", href: "/track" },
  { label: "Contact Nairobi Lab", href: "/contact" },
];

export function FaqSection({
  kicker = "Common Questions",
  title = "Frequently Asked Questions",
  subtitle,
  faqs,
  surface = "cream",
}: {
  kicker?: string;
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
  surface?: "cream" | "white";
}) {
  return (
    <section
      aria-labelledby="faq-heading"
      className={`border-t border-cream-border py-14 sm:py-16 ${
        surface === "white" ? "bg-cream-surface" : "bg-cream-bg"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <p className="section-kicker">{kicker}</p>
          <h2
            id="faq-heading"
            className="mt-3 text-2xl font-black tracking-[-0.04em] text-brand-dark sm:text-4xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-xs leading-relaxed text-brand-muted sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx < 2}
              className="group rounded-3xl border border-cream-border bg-white p-5 sm:p-6 shadow-xs transition-colors open:border-teal-brand/40"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-black text-brand-dark sm:text-base">
                <span className="flex items-start gap-2.5">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-brand" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-brand-muted transition-transform duration-200 group-open:rotate-180 group-open:text-teal-brand" />
              </summary>
              <p className="mt-3 pl-6 text-xs leading-relaxed text-brand-slate sm:text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cream-border bg-white px-5 py-4">
          <span className="text-xs font-bold text-brand-dark">
            Ready to take the next step?
          </span>
          <div className="flex flex-wrap gap-2">
            {NEXT_STEP_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1 rounded-xl border border-cream-border bg-cream-surface px-3.5 py-2 text-xs font-bold text-brand-dark transition-colors hover:border-teal-brand hover:text-teal-brand"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
