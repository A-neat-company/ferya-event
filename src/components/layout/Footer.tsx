import Link from "next/link";
import { getTranslations } from "next-intl/server";

const studioLinks = [
  { key: "ethos", href: "/ethos" },
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "press", href: "/press" },
] as const;

const conciergeLinks = [
  { key: "faq", href: "/faq" },
  { key: "policy", href: "/policy" },
  { key: "privacy", href: "/privacy" },
  { key: "imprint", href: "/imprint" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-logo text-2xl tracking-[0.25em] uppercase text-white">
                Ferya
              </span>
              <span className="font-accent text-[9px] tracking-[0.3em] uppercase text-white/70 mt-0.5">
                Event &amp; Decor
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* The Studio */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
              {t("theStudio")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
              {t("concierge")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {conciergeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
              {t("followUs")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
