"use client";

import { useTranslations } from "next-intl";
import CTAButton from "./CTAButton";

// TODO: Connect to API endpoint (Phase 5)
export default function ContactForm() {
  const t = useTranslations("Contact");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        name="name"
        aria-label={t("formName")}
        placeholder={t("formName")}
        className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none"
      />
      <input
        type="email"
        name="email"
        aria-label={t("formEmail")}
        placeholder={t("formEmail")}
        className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="eventType"
          aria-label={t("formEvent")}
          placeholder={t("formEvent")}
          className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none"
        />
        <input
          type="date"
          name="eventDate"
          aria-label={t("formDate")}
          placeholder={t("formDate")}
          className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        rows={4}
        aria-label={t("formMessage")}
        placeholder={t("formMessage")}
        className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none resize-none"
      />
      <CTAButton variant="primary" type="submit">
        {t("formSubmit")}
      </CTAButton>
    </form>
  );
}
