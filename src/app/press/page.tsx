import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Press");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function PressPage() {
  const t = await getTranslations("Press");

  const pressItems = [
    { key: "press1" },
    { key: "press2" },
    { key: "press3" },
    { key: "press4" },
    { key: "press5" },
    { key: "press6" },
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
              {t("description")}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pressItems.map((p) => (
              <div
                key={p.key}
                className="rounded-2xl border border-cream bg-white p-8 transition-shadow hover:shadow-md"
              >
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-primary">
                  {t(`${p.key}Source`)}
                </p>
                <h3 className="mt-3 font-serif text-xl text-dark">
                  {t(`${p.key}Title`)}
                </h3>
                <p className="mt-2 text-base text-body">
                  {t(`${p.key}Date`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
