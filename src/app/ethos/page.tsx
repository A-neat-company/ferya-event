import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading, ValueCard, CTAButton } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Ethos");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function EthosPage() {
  const t = await getTranslations("Ethos");

  return (
    <Layout>
      {/* Hero — Maison de création */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionLabel>{t("label")}</SectionLabel>
          <div className="mt-4">
            <SectionHeading as="h1" accent={t("headingAccent")}>
              {t("heading")}
            </SectionHeading>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          <p className="text-lg leading-relaxed text-body">{t("p1")}</p>
          <p className="text-lg leading-relaxed text-body">{t("p2")}</p>
          <p className="text-lg leading-relaxed text-body">{t("p3")}</p>
          <p className="text-lg leading-relaxed text-body">{t("p4")}</p>
          <p className="text-lg leading-relaxed text-body">{t("p5")}</p>
          <p className="text-lg leading-relaxed text-body">{t("p6")}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <SectionLabel>{t("philoLabel")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading accent={t("philoHeadingAccent")}>
                {t("philoHeading")}
              </SectionHeading>
            </div>
          </div>
          <p className="mt-8 text-lg leading-relaxed text-body text-center">
            {t("philoText")}
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <SectionLabel>{t("visionLabel")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading accent={t("visionHeadingAccent")}>
                {t("visionHeading")}
              </SectionHeading>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <p className="text-lg leading-relaxed text-body text-center">{t("visionText1")}</p>
            <p className="text-lg leading-relaxed text-body text-center">{t("visionText2")}</p>
            <p className="text-lg leading-relaxed text-body text-center">{t("visionText3")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <SectionLabel>{t("valuesLabel")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading accent={t("valuesHeadingAccent")}>
                {t("valuesHeading")}
              </SectionHeading>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <ValueCard title={t("value1Title")} description={t("value1Description")} />
            <ValueCard title={t("value2Title")} description={t("value2Description")} />
            <ValueCard title={t("value3Title")} description={t("value3Description")} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="text-center">
          <CTAButton href="/services">{t("cta")}</CTAButton>
        </div>
      </section>
    </Layout>
  );
}
