import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-16 max-w-3xl">
        <ScrollReveal delay={0}>
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">FAQ & MOQ</h1>
            <p className="text-neutral-500">Everything you need to know about working with Swanky Factory.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          <ScrollReveal delay={100}>
            <div className="border border-neutral-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">What is your Minimum Order Quantity (MOQ)?</h3>
              <p className="text-neutral-600">For blank items without printing, our MOQ is <strong>20 pieces</strong> per model. For custom orders (screen printing or embroidery), the MOQ is <strong>50 pieces</strong> per design.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="border border-neutral-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Do you provide samples?</h3>
              <p className="text-neutral-600">Yes, you can order a single blank piece as a sample directly via WhatsApp. For custom samples, a prototyping fee applies, which will be deducted from your final bulk order.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="border border-neutral-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Where do you manufacture your blanks?</h3>
              <p className="text-neutral-600">All our blanks are manufactured in our own facilities in Egypt, using premium quality heavy cotton. This allows us to strictly control the GSM and the boxy/oversized cuts.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="border border-neutral-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">What file formats do you need for logos?</h3>
              <p className="text-neutral-600">We require vector files for optimal quality: <strong>.AI, .EPS, or .SVG</strong>. High-resolution PNGs (minimum 300 DPI) on a transparent background are also accepted for DTF printing.</p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
