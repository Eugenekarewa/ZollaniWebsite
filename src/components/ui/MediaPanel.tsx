import Image from "next/image";

type MediaPanelProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
};

export function MediaPanel({ image, alt, eyebrow, title, body, reverse = false }: MediaPanelProps) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
      <div className="image-frame relative min-h-[320px] sm:min-h-[440px]">
        <Image src={image} alt={alt} fill className="object-cover transition-transform duration-700 hover:scale-105" />
      </div>
      <div className="max-w-xl">
        <p className="section-kicker mb-4">{eyebrow}</p>
        <h2 className="text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">{title}</h2>
        <p className="mt-5 text-sm leading-7 text-brand-muted sm:text-base">{body}</p>
      </div>
    </div>
  );
}
