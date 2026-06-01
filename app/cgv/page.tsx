import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function CGVPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <ScrollReveal delay={0}>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Terms of Sale (B2B)</h1>
          <p className="text-neutral-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </ScrollReveal>

        <div className="space-y-12 text-neutral-800 leading-relaxed">
          <ScrollReveal delay={100}>
            <section>
              <h2 className="text-xl font-bold mb-4">1. Scope</h2>
              <p>These General Terms of Sale (GTS) apply to all sales concluded between Swanky Factory ("the Manufacturer") and professionals ("the Client") wishing to acquire the products offered for sale by the Manufacturer.</p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <section>
              <h2 className="text-xl font-bold mb-4">2. Orders & Tiered Pricing</h2>
              <p>Orders are placed exclusively online via the platform or via WhatsApp. The prices displayed take into account tiered discounts based on volume. Prices are stated exclusive of tax (HT).</p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <section>
              <h2 className="text-xl font-bold mb-4">3. Payment Terms</h2>
              <p>Purchases of blanks and custom orders require payment by bank transfer. A minimum deposit of 50% is required to launch production for custom orders, the balance being due before shipping.</p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <section>
              <h2 className="text-xl font-bold mb-4">4. Files & Customization</h2>
              <p>The Client guarantees they hold the intellectual property rights for the imported logos and designs. Swanky Factory commits to protecting industrial secrets and not disclosing client designs.</p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <section>
              <h2 className="text-xl font-bold mb-4">5. Production Lead Times</h2>
              <p>Lead times are provided as an estimate. Blank orders are generally processed within 48-72h. Custom orders take between 2 to 4 weeks depending on the complexity and volume.</p>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
