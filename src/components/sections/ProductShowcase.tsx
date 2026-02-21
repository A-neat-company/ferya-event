import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading } from "@/components/ui";
import { getFeaturedProducts } from "@/lib/square";
import ProductCarousel from "./ProductCarousel";

export default async function ProductShowcase() {
  const t = await getTranslations("Showcase");

  let products;
  try {
    products = await getFeaturedProducts();
  } catch {
    return null;
  }

  if (products.length === 0) return null;

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

        <div className="mt-16">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
