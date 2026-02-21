import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Policy");
  return { title: t("meta"), description: t("metaDescription") };
}

const sections = [
  { key: "s1", hasItems: true, hasNote: true },
  { key: "s2", hasItems: true, hasNote: true },
  { key: "s3", hasItems: true, hasNote: true },
  { key: "s4", hasItems: true, hasNote: true },
  { key: "s5a", hasItems: true, hasNote: true },
  { key: "s5b", hasItems: true, hasNote: true },
  { key: "s6", hasItems: true, hasNote: true },
  { key: "s7", hasItems: true, hasNote: true },
  { key: "s8", hasItems: true, hasNote: true },
  { key: "s9", hasItems: true },
  { key: "s10" },
] as const;

export default async function PolicyPage() {
  const t = await getTranslations("Policy");

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
            <p className="mt-6 text-lg leading-relaxed text-body text-center">
              {t("intro")}
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {sections.map((s) => (
              <div key={s.key}>
                <h3 className="font-serif text-2xl text-dark">
                  {t(`${s.key}Title`)}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-body">
                  {t(`${s.key}Text`)}
                </p>
                {"hasItems" in s && s.hasItems && (
                  <ul className="mt-3 space-y-2 text-lg text-body">
                    {t(`${s.key}Items`)
                      .split("|")
                      .map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary mt-0.5">—</span>
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                  </ul>
                )}
                {"hasNote" in s && s.hasNote && (
                  <p className="mt-3 text-lg leading-relaxed text-body">
                    {t(`${s.key}Note`)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
