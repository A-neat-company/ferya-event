import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading, ServiceCard } from "@/components/ui";

export default async function ExpertiseSection() {
  const t = await getTranslations("Expertise");

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <SectionLabel>{t("label")}</SectionLabel>
          <div className="mt-4">
            <SectionHeading accent={t("headingAccent")}>
              {t("heading")}
            </SectionHeading>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <ServiceCard
            title={t("stationeryTitle")}
            description={t("stationeryDescription")}
            items={t("stationeryItems").split(",")}
          />
          <ServiceCard
            title={t("signageTitle")}
            description={t("signageDescription")}
            items={t("signageItems").split(",")}
          />
        </div>
      </div>
    </section>
  );
}
