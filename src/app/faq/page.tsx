import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading, AccordionItem } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("FAQ");
  return { title: t("meta"), description: t("metaDescription") };
}

const categories = [
  { key: "custom", questions: ["1", "2", "3"] },
  { key: "materials", questions: ["4", "5"] },
  { key: "timelines", questions: ["6", "7"] },
  { key: "shipping", questions: ["8", "9", "10", "11"] },
  { key: "returns", questions: ["12", "13"] },
  { key: "errors", questions: ["14", "15"] },
  { key: "service", questions: ["16", "17"] },
] as const;

export default async function FAQPage() {
  const t = await getTranslations("FAQ");

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
            {categories.map((cat) => (
              <div key={cat.key}>
                <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                  {t(`cat_${cat.key}`)}
                </h3>
                <div>
                  {cat.questions.map((q) => (
                    <AccordionItem
                      key={q}
                      question={t(`q${q}`)}
                      answer={t(`a${q}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
