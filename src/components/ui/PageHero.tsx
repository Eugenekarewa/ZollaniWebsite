import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type HeroAction = { label: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  action?: HeroAction;
  secondaryAction?: HeroAction;
};

function HeroActionLink({
  item,
  variant,
}: {
  item: HeroAction;
  variant: "primary" | "secondary";
}) {
  const isExternal = /^(https?:|tel:|mailto:)/.test(item.href) || item.href.endsWith(".pdf");
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full bg-coral-brand px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-coral-hover"
      : "inline-flex items-center gap-2 rounded-full border border-cream-bg/30 px-5 py-3 text-sm font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep";

  if (isExternal) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
        rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {item.label}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

export function PageHero({ eyebrow, title, description, image, imageAlt, action, secondaryAction }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-teal-deep text-cream-bg">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover object-center opacity-35 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/95 to-teal-deep/60" />
        <div className="absolute bottom-0 left-0 h-1.5 w-40 bg-coral-brand" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:px-12 lg:py-20">
        <div>
          <p className="animate-rise-in mb-4 inline-flex w-fit border-l-2 border-coral-brand pl-3 font-mono text-xs uppercase tracking-[0.2em] text-coral-brand">{eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="animate-rise-in animate-rise-in-delay-2 mt-4 max-w-2xl text-sm leading-7 text-cream-bg/80 sm:text-base">{description}</p>
          {(action || secondaryAction) && (
            <div className="animate-rise-in animate-rise-in-delay-3 mt-6 flex flex-wrap gap-3">
              {action && <HeroActionLink item={action} variant="primary" />}
              {secondaryAction && <HeroActionLink item={secondaryAction} variant="secondary" />}
            </div>
          )}
        </div>
        <div className="border-l border-coral-brand pl-5 text-sm leading-6 text-cream-bg/75">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">Zollani standard</p>
          <p className="mt-3">Diagnose first. Explain clearly. Repair properly. Return it ready.</p>
        </div>
      </div>
    </section>
  );
}
