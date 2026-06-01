import { cache } from "react";
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

// ---------------------------------------------------------------------------
// Category hierarchy
// ---------------------------------------------------------------------------

interface CategoryHierarchy {
  /** Display name for a category id. */
  nameOf(id: string): string;
  /** True if `targetId` is the category itself or any of its ancestors. */
  isUnder(categoryId: string, targetId: string): boolean;
  /** Every category id whose ancestor chain (incl. itself) contains `targetId`. */
  descendantsOf(targetId: string): string[];
}

/**
 * Lists every catalog category once and builds the parent→child tree so we can
 * fetch and classify items that live in nested sub-categories of Design/Rental.
 * Wrapped in React `cache()` so multiple calls within one request share a fetch.
 */
const getCategoryHierarchy = cache(async (): Promise<CategoryHierarchy> => {
  const client = getSquareClient();
  const parent = new Map<string, string | undefined>();
  const name = new Map<string, string>();

  // `list` returns an async-iterable Page that auto-paginates.
  const page = await client.catalog.list({ types: "CATEGORY" });
  for await (const obj of page) {
    if (obj.type !== "CATEGORY" || !obj.id) continue;
    name.set(obj.id, obj.categoryData?.name ?? "");
    parent.set(obj.id, obj.categoryData?.parentCategory?.id ?? undefined);
  }

  // Walk up the parent chain (cycle-guarded), collecting ancestors incl. self.
  const ancestorsOf = (id: string): Set<string> => {
    const out = new Set<string>();
    let cur: string | undefined = id;
    while (cur && !out.has(cur)) {
      out.add(cur);
      cur = parent.get(cur);
    }
    return out;
  };

  // Precompute the descendant set of every category in one pass: each category
  // is registered against itself and all of its ancestors.
  const descendants = new Map<string, Set<string>>();
  for (const id of parent.keys()) {
    for (const ancestor of ancestorsOf(id)) {
      let set = descendants.get(ancestor);
      if (!set) descendants.set(ancestor, (set = new Set()));
      set.add(id);
    }
  }

  return {
    nameOf: (id) => name.get(id) ?? "",
    isUnder: (categoryId, targetId) =>
      categoryId === targetId ||
      (descendants.get(targetId)?.has(categoryId) ?? false),
    // Always include the target itself, even if it isn't a listed category.
    descendantsOf: (targetId) => [...(descendants.get(targetId) ?? [targetId])],
  };
});

function resolveCatalogType(
  categoryId: string,
  hierarchy: CategoryHierarchy
): "design" | "rental" {
  if (hierarchy.isUnder(categoryId, env.server.SQUARE_RENTALS_CATEGORY_ID)) {
    return "rental";
  }
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
  hierarchy: CategoryHierarchy
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

  // Category — prefer Square's canonical "reporting" category, then the first
  // assigned category, then the legacy single category id.
  const categoryId =
    data.reportingCategory?.id ??
    data.categories?.[0]?.id ??
    data.categoryId ??
    "";
  const categoryName = hierarchy.nameOf(categoryId);

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
    catalogType: resolveCatalogType(categoryId, hierarchy),
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

/**
 * Resolves a set of catalog items into `Product`s: fetches their related image
 * objects in one `batchGet` and maps each item through `mapSquareItemToProduct`.
 */
async function resolveProducts(
  items: Square.CatalogObject[],
  hierarchy: CategoryHierarchy
): Promise<Product[]> {
  if (items.length === 0) return [];

  // Fetch related objects (images) via batchGet
  const allIds = items.map((i) => i.id).filter((id): id is string => !!id);
  const batchResponse = await getSquareClient().catalog.batchGet({
    objectIds: allIds,
    includeRelatedObjects: true,
  });

  const imageMap = buildImageMap(batchResponse.relatedObjects);

  return items
    .map((item) => mapSquareItemToProduct(item, imageMap, hierarchy))
    .filter((p): p is Product => p !== null);
}

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const client = getSquareClient();
  const hierarchy = await getCategoryHierarchy();

  // Expand the target category to itself plus every nested sub-category, since
  // Square's `categoryIds` filter only matches items directly assigned.
  const categoryIds = hierarchy.descendantsOf(categoryId);

  const response = await client.catalog.searchItems({
    categoryIds,
    productTypes: ["REGULAR"],
    sortOrder: "ASC",
    limit: 100,
  });

  return resolveProducts(response.items ?? [], hierarchy);
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
  const hierarchy = await getCategoryHierarchy();

  const response = await client.catalog.searchItems({
    textFilter: query,
    productTypes: ["REGULAR"],
    limit: 20,
  });

  return resolveProducts(response.items ?? [], hierarchy);
}

export async function getRelatedProducts(
  product: Product,
  limit: number = 4
): Promise<Product[]> {
  const products = await getProductsByCategory(product.categoryId);
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}
