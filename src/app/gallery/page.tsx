import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Gallery");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function GalleryPage() {
  const t = await getTranslations("Gallery");

  const items = [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
    { key: "item5" },
    { key: "item6" },
    { key: "item7" },
    { key: "item8" },
    { key: "item9" },
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
            {items.map((item) => (
              <div key={item.key} className="group">
                <div className="aspect-[4/5] w-full rounded-lg bg-cream flex items-center justify-center overflow-hidden">
                  <span className="text-sm text-body/50 uppercase tracking-widest">
                    {t(`${item.key}Title`)}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold tracking-[0.15em] uppercase text-primary">
                    {t(`${item.key}Category`)}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-dark">
                    {t(`${item.key}Title`)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
