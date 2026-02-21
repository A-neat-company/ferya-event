import { getTranslations } from "next-intl/server";
import { SectionLabel, CTAButton } from "@/components/ui";
import type { Product } from "@/lib/square";

interface ProductInfoProps {
  product: Product;
}

export default async function ProductInfo({ product }: ProductInfoProps) {
  const t = await getTranslations("ProductDetail");

  return (
    <div>
      <SectionLabel>{product.categoryName}</SectionLabel>

      <h1 className="mt-3 font-serif text-4xl text-dark md:text-5xl">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl text-dark">{product.priceDisplay}</p>

      {product.description && (
        <p className="mt-6 text-base leading-relaxed text-body">
          {product.description}
        </p>
      )}

      {product.variations.length > 1 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-dark">
            {t("variants")}
          </h2>
          <ul className="mt-3 space-y-2">
            {product.variations.map((v) => (
              <li
                key={v.id}
                className="flex items-center justify-between rounded-md border border-cream px-4 py-3"
              >
                <span className="text-base text-dark">{v.name}</span>
                {v.priceCents > 0 && (
                  <span className="text-base text-body">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: v.currency,
                      minimumFractionDigits: v.priceCents % 100 === 0 ? 0 : 2,
                    }).format(v.priceCents / 100)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <CTAButton href="/#contact">{t("inquire")}</CTAButton>
      </div>
    </div>
  );
}
