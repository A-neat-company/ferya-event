import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout";
import { ImageGallery, ProductInfo, RelatedProducts } from "@/components/product";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/square";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found — Ferya" };
  }

  return {
    title: `${product.name} — Ferya`,
    description: product.description || `${product.name} by Ferya — bespoke event design.`,
    openGraph: product.images[0]
      ? { images: [{ url: product.images[0].url }] }
      : undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product, 4);

  return (
    <Layout>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {/* Left — Image Gallery (~55%) */}
            <div className="md:col-span-1">
              <ImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Right — Product Info (~45%) */}
            <div className="md:col-span-1">
              <ProductInfo product={product} />
            </div>
          </div>

          <RelatedProducts products={related} />
        </div>
      </section>
    </Layout>
  );
}
