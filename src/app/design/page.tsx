import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading, CTAButton } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Design — Ferya" };
}

export default async function DesignPage() {
  const t = await getTranslations("ComingSoon");

  return (
    <Layout>
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <SectionLabel>{t("label")}</SectionLabel>
          <div className="mt-4">
            <SectionHeading as="h1" accent={t("headingAccent")}>
              {t("heading")}
            </SectionHeading>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-body">
            {t("description")}
          </p>
          <div className="mt-10">
            <CTAButton href="/">{t("cta")}</CTAButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}
