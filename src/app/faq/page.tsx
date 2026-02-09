import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading, AccordionItem } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("FAQ");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function FAQPage() {
  const t = await getTranslations("FAQ");

  const questions = [
    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "4" },
    { key: "5" },
    { key: "6" },
    { key: "7" },
    { key: "8" },
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

          <div className="mt-16">
            {questions.map((q) => (
              <AccordionItem
                key={q.key}
                question={t(`q${q.key}`)}
                answer={t(`a${q.key}`)}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
