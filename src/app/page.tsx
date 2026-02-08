import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      {/* Placeholder — homepage sections will be built in Phase 2 */}
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Bespoke Event Design
          </p>
          <h1 className="mt-3 font-serif text-5xl text-dark">
            Ethereal Atmospheres
          </h1>
          <p className="mt-4 text-body">
            Luxury stationery, signage, decor &amp; keepsakes.
          </p>
        </div>
      </section>
    </Layout>
  );
}
