import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading, ServiceCard } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Services");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function ServicesPage() {
  const t = await getTranslations("Services");

  const services = [
    { key: "stationery" },
    { key: "signage" },
  ] as const;

  return (
    <Layout>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <SectionLabel>{t("label")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading as="h1" accent={t("headingAccent")}>
                {t("heading")}
              </SectionHeading>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body text-center">
              {t("description")}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((s) => (
              <ServiceCard
                key={s.key}
                title={t(`${s.key}Title`)}
                description={t(`${s.key}Description`)}
                items={t(`${s.key}Items`).split(",")}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
