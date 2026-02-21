export { getSquareClient } from "./client";
export {
  getProductsByCategory,
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
  searchProducts,
  getRelatedProducts,
  formatPrice,
  mapSquareItemToProduct,
} from "./catalog";
export type {
  Product,
  ProductImage,
  ProductVariation,
  SearchResult,
} from "./types";
