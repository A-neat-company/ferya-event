import { ProductCard } from "@/components/ui";
import type { Product } from "@/lib/square";

interface CatalogGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function CatalogGrid({ products, emptyMessage }: CatalogGridProps) {
  if (products.length === 0 && emptyMessage) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-body">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
