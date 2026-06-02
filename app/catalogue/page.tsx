import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";
import CatalogueClient from "./CatalogueClient";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";
export default async function CataloguePage() {
  const products = await prisma.product.findMany({
    include: { tieredPrices: { orderBy: { minQty: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <ScrollReveal delay={0}>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-black mb-2">Blank Catalog</h1>
            <p className="text-neutral-500">Select a product, set your quantity — the price adjusts automatically.</p>
          </div>
        </ScrollReveal>
        <CatalogueClient products={products} />
      </main>
      <Footer />
    </div>
  );
}
