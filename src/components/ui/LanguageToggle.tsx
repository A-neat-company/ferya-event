"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  function toggle() {
    const next = locale === "en" ? "fr" : "en";
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      className="text-base font-medium tracking-wide text-dark hover:text-primary transition-colors"
      aria-label={locale === "en" ? "Switch to French" : "Switch to English"}
    >
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}
