import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram-only" | "white";
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "full",
  size = "md",
}) => {
  const sizeMap = {
    sm: { badge: 32, textTitle: "text-lg", textSub: "text-[9px]" },
    md: { badge: 42, textTitle: "text-xl", textSub: "text-[10px]" },
    lg: { badge: 56, textTitle: "text-2xl", textSub: "text-xs" },
  };

  const { badge, textTitle, textSub } = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="Zollani Tech Home"
    >
      {/* Monogram Badge */}
      <div
        className="relative overflow-hidden rounded-xl bg-teal-brand shadow-sm flex items-center justify-center transition-all group-hover:shadow-md"
        style={{ width: badge, height: badge }}
      >
        <Image
          src="/images/logo-badge.png"
          alt="Zollani Tech Badge"
          width={badge}
          height={badge}
          className="object-contain p-1"
          priority
        />
      </div>

      {variant !== "monogram-only" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-black tracking-wider uppercase font-sans ${textTitle} ${
                variant === "white" ? "text-coral-brand" : "text-coral-brand"
              }`}
            >
              ZOLLANI
            </span>
            <span
              className={`font-extrabold tracking-wider uppercase font-sans ${textTitle} ${
                variant === "white" ? "text-white" : "text-teal-brand"
              }`}
            >
              TECH
            </span>
          </div>
          <span
            className={`font-serif italic font-medium tracking-wide ${textSub} ${
              variant === "white" ? "text-cream-bg/80" : "text-brand-slate/80"
            }`}
          >
            We Fix. You Smile.
          </span>
        </div>
      )}
    </Link>
  );
};
