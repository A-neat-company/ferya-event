"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import CTAButton from "./CTAButton";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          eventType: data.get("eventType"),
          eventDate: data.get("eventDate"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        required
        aria-label={t("formName")}
        placeholder={t("formName")}
        className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none"
      />
      <input
        type="email"
        name="email"
        required
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
        required
        aria-label={t("formMessage")}
        placeholder={t("formMessage")}
        className="rounded-lg border border-cream bg-white px-4 py-3 text-base text-dark placeholder:text-body/50 focus:border-primary focus:outline-none resize-none"
      />

      {status === "success" && (
        <p className="text-sm text-green-700">{t("formSuccess")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{t("formError")}</p>
      )}

      <CTAButton variant="primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("formSending") : t("formSubmit")}
      </CTAButton>
    </form>
  );
}
