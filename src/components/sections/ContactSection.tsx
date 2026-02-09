import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading, IconText, ContactForm } from "@/components/ui";

export default async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
          {/* Dark info panel */}
          <div className="bg-dark p-10 lg:p-16">
            <SectionLabel>{t("label")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading accent={t("headingAccent")} className="text-white">
                {t("heading")}
              </SectionHeading>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {t("description")}
            </p>
            <div className="mt-10 flex flex-col gap-5">
              <IconText icon="email">{t("email")}</IconText>
              <IconText icon="phone">{t("phone")}</IconText>
              <IconText icon="location">{t("location")}</IconText>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-white p-10 lg:p-16 border border-cream lg:border-l-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
