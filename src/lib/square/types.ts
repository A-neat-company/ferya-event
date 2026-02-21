export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  sku: string | null;
  ordinal: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  catalogType: "design" | "rental";
  images: ProductImage[];
  variations: ProductVariation[];
  priceDisplay: string;
  minPriceCents: number;
  currency: string;
  featured: boolean;
}
