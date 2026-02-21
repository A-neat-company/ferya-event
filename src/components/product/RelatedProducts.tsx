import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading, ProductCard } from "@/components/ui";
import type { Product } from "@/lib/square";

interface RelatedProductsProps {
  products: Product[];
}

export default async function RelatedProducts({ products }: RelatedProductsProps) {
  const t = await getTranslations("ProductDetail");

  if (products.length === 0) return null;

  return (
    <section className="mt-24 border-t border-cream pt-16">
      <div className="text-center">
        <SectionLabel>{t("relatedLabel")}</SectionLabel>
        <div className="mt-4">
          <SectionHeading accent={t("relatedHeadingAccent")}>
            {t("relatedHeading")}
          </SectionHeading>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            alt={product.name}
            category={product.categoryName}
            name={product.name}
            price={product.priceDisplay}
            href={`/shop/${product.slug}`}
            imageSrc={product.images[0]?.url}
          />
        ))}
      </div>
    </section>
  );
}
