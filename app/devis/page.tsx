"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UploadCloud, Check, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type FormState = "idle" | "loading" | "success" | "error";

export default function DevisPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [productType, setProductType] = useState("Heavyweight Boxy Hoodie 500 GSM");
  const [technique, setTechnique] = useState("Screen Printing");
  const [quantity, setQuantity] = useState("50");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, clientEmail, clientPhone, productType, technique, notes, shippingAddress }),
      });
      const data = await res.json();
      if (data.success) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-11 w-11" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black mb-3">Quote Request Sent!</h1>
            <p className="text-neutral-500 mb-6">
              Your request has been received by Swanky Factory. Our team will review your files and get back to you within <strong>24 hours</strong>.
            </p>
            <a
              href="https://wa.me/201228811446"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors"
            >
              Follow up on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-3xl">
        <ScrollReveal delay={0}>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-black mb-2">Custom Quote Configurator</h1>
            <p className="text-neutral-500">
              Configure your order and upload your logo. Your request appears instantly in our admin dashboard — we reply within 24h.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="bg-white border border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg border-b border-neutral-100 pb-3 mb-5">1. Your Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Brand / Company name *</label>
                  <input
                    required
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Aesthetix Paris"
                    className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Professional email *</label>
                  <input
                    required
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="contact@yourband.com"
                    className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    WhatsApp Number *
                    <span className="ml-1 text-xs text-neutral-400 font-normal">(with country code)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-medium">+</span>
                    <input
                      required
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="33 6 12 34 56 78"
                      className="w-full h-11 pl-7 pr-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">We will contact you directly on WhatsApp to confirm your quote.</p>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-lg border-b border-neutral-100 pb-3 mb-5">2. Choose your blank</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Boxy Hoodie", sub: "500 GSM" },
                  { label: "Oversized T-Shirt", sub: "250 GSM" },
                  { label: "Fleece Sweatpants", sub: "400 GSM" },
                ].map((item) => (
                  <label
                    key={item.label}
                    className={`border rounded-lg p-4 cursor-pointer transition-all flex justify-between items-start ${
                      productType === `${item.label} ${item.sub}`
                        ? "border-black bg-neutral-50"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div>
                      <span className="block font-medium text-sm">{item.label}</span>
                      <span className="text-xs text-neutral-500">{item.sub}</span>
                    </div>
                    <input
                      type="radio"
                      name="product"
                      checked={productType === `${item.label} ${item.sub}`}
                      onChange={() => setProductType(`${item.label} ${item.sub}`)}
                      className="mt-0.5"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Technique */}
            <div>
              <h3 className="font-semibold text-lg border-b border-neutral-100 pb-3 mb-5">3. Customization Technique</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Screen Printing", "Embroidery", "Heat Transfer", "DTF Printing"].map((t) => (
                  <label
                    key={t}
                    className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center gap-3 ${
                      technique === t ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="technique"
                      checked={technique === t}
                      onChange={() => setTechnique(t)}
                    />
                    <span className="font-medium text-sm">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-lg border-b border-neutral-100 pb-3 mb-5">4. Estimated Quantity</h3>
              <div className="grid grid-cols-4 gap-3">
                {["20", "50", "100", "200+"].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`py-3 rounded-lg border text-sm font-semibold transition-all ${
                      quantity === q ? "border-black bg-black text-white" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {q} pcs
                  </button>
                ))}
              </div>
            </div>

            {/* Logo upload (visual only — real upload needs a cloud service) */}
            <div>
              <h3 className="font-semibold text-lg border-b border-neutral-100 pb-3 mb-5">5. Upload your Logo (Optional)</h3>
              <label className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:bg-neutral-50 transition-colors cursor-pointer flex flex-col items-center justify-center relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  accept=".svg,.ai,.png,.jpg,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                <UploadCloud className={`h-10 w-10 mx-auto mb-3 ${fileName ? "text-green-500" : "text-neutral-400"}`} />
                {fileName ? (
                  <>
                    <p className="font-medium text-sm text-green-600">File selected:</p>
                    <p className="text-sm font-bold mt-1 break-all">{fileName}</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-sm">Click to upload or drag and drop</p>
                    <p className="text-xs text-neutral-500 mt-1">SVG, AI, PNG (Max. 20MB). You can also send it via WhatsApp.</p>
                  </>
                )}
              </label>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold text-lg border-b border-neutral-100 pb-3 mb-5">6. Shipping Address</h3>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows={3}
                placeholder={`15 Rue de la Mode\n75001 Paris, France`}
                className="w-full px-4 py-3 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
              <p className="text-xs text-neutral-400 mt-1">Full delivery address for your order (street, city, country, zip code).</p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Additional notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Colors, placement of print, special finishes..."
                className="w-full px-4 py-3 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            {formState === "error" && (
              <p className="text-red-500 text-sm">An error occurred. Please try again or contact us directly on WhatsApp.</p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full h-12 bg-black text-white font-semibold rounded-md hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Check className="h-5 w-5" />
                {formState === "loading" ? "Sending..." : "Submit Quote Request"}
              </button>
              <p className="text-center text-xs text-neutral-400 mt-3">
                No payment at this stage. Our team reviews every request individually.
              </p>
            </div>
          </form>
        </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
