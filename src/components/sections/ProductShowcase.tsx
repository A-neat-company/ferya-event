import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading, ProductCard } from "@/components/ui";
import { slugify } from "@/lib/utils";

export default async function ProductShowcase() {
  const t = await getTranslations("Showcase");

  const products = [
    { key: "product1" },
    { key: "product2" },
    { key: "product3" },
    { key: "product4" },
    { key: "product5" },
  ] as const;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <SectionLabel>{t("label")}</SectionLabel>
          <div className="mt-4">
            <SectionHeading accent={t("headingAccent")}>
              {t("heading")}
            </SectionHeading>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <ProductCard
              key={p.key}
              alt={t(`${p.key}Name`)}
              category={t(`${p.key}Category`)}
              name={t(`${p.key}Name`)}
              price={t(`${p.key}Price`)}
              href={`/shop/${slugify(t(`${p.key}Name`))}`}
            />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto">
          {products.slice(3).map((p) => (
            <ProductCard
              key={p.key}
              alt={t(`${p.key}Name`)}
              category={t(`${p.key}Category`)}
              name={t(`${p.key}Name`)}
              price={t(`${p.key}Price`)}
              href={`/shop/${slugify(t(`${p.key}Name`))}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
