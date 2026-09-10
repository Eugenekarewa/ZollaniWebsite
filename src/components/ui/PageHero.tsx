import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  action?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export function PageHero({ eyebrow, title, description, image, imageAlt, action, secondaryAction }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-teal-deep text-cream-bg">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt={imageAlt} fill priority className="object-cover object-center opacity-35 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/90 to-teal-deep/55" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:px-12 lg:py-24">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-coral-brand">{eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-cream-bg/75 sm:text-base">{description}</p>
          {(action || secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {action && <Link href={action.href} className="inline-flex items-center gap-2 rounded-full bg-coral-brand px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-coral-hover">{action.label}<ArrowUpRight className="h-4 w-4" /></Link>}
              {secondaryAction && <Link href={secondaryAction.href} className="inline-flex items-center gap-2 rounded-full border border-cream-bg/30 px-5 py-3 text-sm font-bold text-cream-bg transition-colors hover:bg-cream-bg hover:text-teal-deep">{secondaryAction.label}<ArrowUpRight className="h-4 w-4" /></Link>}
            </div>
          )}
        </div>
        <div className="border-l border-coral-brand pl-5 text-sm leading-6 text-cream-bg/75">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-coral-brand">Zollani standard</p>
          <p className="mt-4">Diagnose first. Explain clearly. Repair properly. Return it ready.</p>
        </div>
      </div>
    </section>
  );
}
