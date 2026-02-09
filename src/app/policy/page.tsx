import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Policy");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function PolicyPage() {
  const t = await getTranslations("Policy");

  const sections = [
    { key: "ordering" },
    { key: "payments" },
    { key: "cancellations" },
    { key: "returns" },
    { key: "shipping" },
  ] as const;

  return (
    <Layout>
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <SectionLabel>{t("label")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading as="h1" accent={t("headingAccent")}>
                {t("heading")}
              </SectionHeading>
            </div>
          </div>

          <div className="mt-16 space-y-12">
            {sections.map((s) => (
              <div key={s.key}>
                <h3 className="font-serif text-2xl text-dark">
                  {t(s.key)}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-body">
                  {t(`${s.key}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
