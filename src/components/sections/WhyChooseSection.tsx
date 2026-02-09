import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading, ValueCard } from "@/components/ui";

export default async function WhyChooseSection() {
  const t = await getTranslations("WhyChoose");

  const values = [
    { key: "value1" },
    { key: "value2" },
    { key: "value3" },
  ] as const;

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

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {values.map((v) => (
            <ValueCard
              key={v.key}
              title={t(`${v.key}Title`)}
              description={t(`${v.key}Description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
