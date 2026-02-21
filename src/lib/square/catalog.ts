import type { Square } from "square";
import { getSquareClient } from "./client";
import { env } from "@/lib/env";
import { slugify } from "@/lib/utils";
import type { Product, ProductImage, ProductVariation } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildImageMap(
  relatedObjects: Square.CatalogObject[] | undefined
): Map<string, ProductImage> {
  const map = new Map<string, ProductImage>();
  for (const obj of relatedObjects ?? []) {
    if (obj.type === "IMAGE" && obj.imageData?.url) {
      map.set(obj.id, {
        id: obj.id,
        url: obj.imageData.url,
        alt: obj.imageData.caption ?? obj.imageData.name ?? "",
      });
    }
  }
  return map;
}

function buildCategoryMap(
  relatedObjects: Square.CatalogObject[] | undefined
): Map<string, string> {
  const map = new Map<string, string>();
  for (const obj of relatedObjects ?? []) {
    if (obj.type === "CATEGORY" && obj.id && obj.categoryData?.name) {
      map.set(obj.id, obj.categoryData.name);
    }
  }
  return map;
}

function resolveCatalogType(categoryId: string): "design" | "rental" {
  if (categoryId === env.server.SQUARE_RENTALS_CATEGORY_ID) return "rental";
  return "design";
}

export function formatPrice(
  amountCents: number,
  currency: string = "USD"
): string {
  const dollars = amountCents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: dollars % 1 === 0 ? 0 : 2,
  }).format(dollars);
}

// ---------------------------------------------------------------------------
// Mapping
// ---------------------------------------------------------------------------

export function mapSquareItemToProduct(
  item: Square.CatalogObject,
  imageMap: Map<string, ProductImage>,
  categoryMap: Map<string, string>
): Product | null {
  if (item.type !== "ITEM" || !item.itemData || !item.id) return null;

  const data = item.itemData;
  const name = data.name ?? "Untitled";

  // Images
  const images: ProductImage[] = [];
  for (const imgId of data.imageIds ?? []) {
    const img = imageMap.get(imgId);
    if (img) images.push(img);
  }

  // Variations — Square SDK uses a discriminated union; narrow to ItemVariation
  const variations: ProductVariation[] = (data.variations ?? [])
    .filter(
      (v): v is Square.CatalogObject.ItemVariation =>
        v.type === "ITEM_VARIATION"
    )
    .map((v, i) => {
      const vData = v.itemVariationData;
      const priceCents = Number(vData?.priceMoney?.amount ?? 0);
      return {
        id: v.id ?? "",
        name: vData?.name ?? "",
        priceCents,
        currency: vData?.priceMoney?.currency ?? "USD",
        sku: vData?.sku ?? null,
        ordinal: vData?.ordinal ?? i,
      };
    })
    .sort((a, b) => a.ordinal - b.ordinal);

  // Price display
  const prices = variations.map((v) => v.priceCents).filter((p) => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const currency = variations[0]?.currency ?? "USD";

  let priceDisplay: string;
  if (prices.length === 0) {
    priceDisplay = "Inquire for pricing";
  } else if (minPrice === maxPrice) {
    priceDisplay = formatPrice(minPrice, currency);
  } else {
    priceDisplay = `From ${formatPrice(minPrice, currency)}`;
  }

  // Category
  const categoryId = data.categoryId ?? data.categories?.[0]?.id ?? "";
  const categoryName = categoryMap.get(categoryId) ?? "";

  // Featured custom attribute (key is auto-generated, so iterate values)
  let featured = false;
  if (item.customAttributeValues) {
    for (const attr of Object.values(item.customAttributeValues)) {
      if (attr.name === "featured" && attr.type === "BOOLEAN") {
        featured = attr.booleanValue ?? false;
        break;
      }
    }
  }

  return {
    id: item.id,
    slug: slugify(name),
    name,
    description: data.descriptionPlaintext ?? data.descriptionHtml ?? "",
    categoryId,
    categoryName,
    catalogType: resolveCatalogType(categoryId),
    images,
    variations,
    priceDisplay,
    minPriceCents: minPrice,
    currency,
    featured,
  };
}

// ---------------------------------------------------------------------------
// Data access
// ---------------------------------------------------------------------------

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const client = getSquareClient();

  const response = await client.catalog.searchItems({
    categoryIds: [categoryId],
    productTypes: ["REGULAR"],
    sortOrder: "ASC",
    limit: 100,
  });

  const items = response.items ?? [];
  if (items.length === 0) return [];

  // Fetch related objects (images, categories) via batchGet
  const allIds = items.map((i) => i.id).filter((id): id is string => !!id);
  const batchResponse = await client.catalog.batchGet({
    objectIds: allIds,
    includeRelatedObjects: true,
  });

  const imageMap = buildImageMap(batchResponse.relatedObjects);
  const categoryMap = buildCategoryMap(batchResponse.relatedObjects);

  return items
    .map((item) => mapSquareItemToProduct(item, imageMap, categoryMap))
    .filter((p): p is Product => p !== null);
}

export async function getAllProducts(): Promise<Product[]> {
  const [design, rental] = await Promise.all([
    getProductsByCategory(env.server.SQUARE_DESIGN_CATEGORY_ID),
    getProductsByCategory(env.server.SQUARE_RENTALS_CATEGORY_ID),
  ]);
  return [...design, ...rental];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.featured);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const client = getSquareClient();

  const response = await client.catalog.searchItems({
    textFilter: query,
    productTypes: ["REGULAR"],
    limit: 20,
  });

  const items = response.items ?? [];
  if (items.length === 0) return [];

  const allIds = items.map((i) => i.id).filter((id): id is string => !!id);
  const batchResponse = await client.catalog.batchGet({
    objectIds: allIds,
    includeRelatedObjects: true,
  });

  const imageMap = buildImageMap(batchResponse.relatedObjects);
  const categoryMap = buildCategoryMap(batchResponse.relatedObjects);

  return items
    .map((item) => mapSquareItemToProduct(item, imageMap, categoryMap))
    .filter((p): p is Product => p !== null);
}

export async function getRelatedProducts(
  product: Product,
  limit: number = 4
): Promise<Product[]> {
  const products = await getProductsByCategory(product.categoryId);
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}
