import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Scissors, Palette, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function FactoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 lg:py-32 bg-black text-white text-center px-4">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal delay={0}>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
                Inside The Factory
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="text-lg md:text-xl text-neutral-400">
                Discover how your ideas become reality. We control the entire production chain to guarantee the premium quality your streetwear brand deserves.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <ScrollReveal delay={0} className="space-y-6">
              <div className="flex items-center gap-4 text-black">
                <Scissors className="h-10 w-10 p-2 bg-neutral-100 rounded-lg" />
                <h3 className="text-2xl font-bold">1. Pattern Making & Cutting</h3>
              </div>
              <p className="text-neutral-600 text-lg">
                Everything starts with the cut. We use high-precision molds to ensure your boxy or oversized cuts are strictly identical on every piece, whether you order 20 or 2000 hoodies.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className="h-64 md:h-96 bg-neutral-100 rounded-xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1605001002360-179ee66a505e?q=80&w=800&auto=format&fit=crop"
                alt="Cutting fabric"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <ScrollReveal delay={200} className="order-2 md:order-1 h-64 md:h-96 bg-neutral-100 rounded-xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
                alt="Screen printing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </ScrollReveal>
            <ScrollReveal delay={0} className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-4 text-black">
                <Palette className="h-10 w-10 p-2 bg-neutral-100 rounded-lg" />
                <h3 className="text-2xl font-bold">2. Customization (Print & Embroidery)</h3>
              </div>
              <p className="text-neutral-600 text-lg">
                Screen printing with eco-friendly inks or high-density embroidery. We apply your logos with millimeter precision. Our equipment handles up to 8 colors for complex designs.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={0} className="space-y-6">
              <div className="flex items-center gap-4 text-black">
                <ShieldCheck className="h-10 w-10 p-2 bg-neutral-100 rounded-lg" />
                <h3 className="text-2xl font-bold">3. Quality Control (QC)</h3>
              </div>
              <p className="text-neutral-600 text-lg">
                Every garment is individually inspected. We check seams, weight (GSM), and print alignment before sealing in polybags ready for shipping.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className="h-64 md:h-96 bg-neutral-100 rounded-xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
                alt="Quality control"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
