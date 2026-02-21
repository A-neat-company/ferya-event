import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/ui";

export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      {/* Background image */}
      <Image
        src="/images/hero-wedding-reception.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-dark/65" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/80">
          {t("label")}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-white sm:text-6xl md:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/70">
          {t("subtitle")}
        </p>
        <div className="mt-10">
          <CTAButton href="/design" variant="primary">
            {t("cta")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
