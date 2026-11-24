import React from "react";
import { HelpCircle } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

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
      className={`border-t border-cream-border py-16 sm:py-20 ${
        surface === "white" ? "bg-cream-surface" : "bg-cream-bg"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-2xl">
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

        <div className="grid gap-5 md:grid-cols-2">
          {faqs.map((faq, idx) => (
            <article
              key={idx}
              className="rounded-3xl border border-cream-border bg-white p-6 shadow-xs"
            >
              <h3 className="flex items-start gap-2.5 text-sm font-black text-brand-dark sm:text-base">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-brand" />
                <span>{faq.question}</span>
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-brand-slate sm:text-sm">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
