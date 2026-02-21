import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";
import CatalogGrid from "@/components/sections/CatalogGrid";
import { getProductsByCategory } from "@/lib/square";
import { env } from "@/lib/env";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Design");
  return {
    title: t("meta"),
    description: t("metaDescription"),
  };
}

export default async function DesignPage() {
  const t = await getTranslations("Design");

  let products: Awaited<ReturnType<typeof getProductsByCategory>> = [];
  let error = false;

  try {
    products = await getProductsByCategory(env.server.SQUARE_DESIGN_CATEGORY_ID);
  } catch {
    error = true;
  }

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

          <div className="mt-16">
            {error ? (
              <div className="py-16 text-center">
                <p className="text-lg text-body">{t("errorLoading")}</p>
              </div>
            ) : (
              <CatalogGrid products={products} emptyMessage={t("empty")} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
