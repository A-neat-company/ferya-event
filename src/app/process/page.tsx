import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Process");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function ProcessPage() {
  const t = await getTranslations("Process");

  const steps = [
    { key: "step1" },
    { key: "step2" },
    { key: "step3" },
    { key: "step4" },
    { key: "step5" },
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
              {t("description")}
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {steps.map((s) => (
              <div key={s.key} className="flex gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-serif text-xl">
                  {t(`${s.key}Number`)}
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-dark">
                    {t(`${s.key}Title`)}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed text-body">
                    {t(`${s.key}Description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
