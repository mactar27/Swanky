"use client";
import { useState } from "react";
import { ShoppingCart, CheckCircle, X, Info } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type TieredPrice = {
  id: number;
  minQty: number;
  price: number;
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  gsm: number | null;
  imageUrl: string | null;
  category: string;
  tieredPrices: TieredPrice[];
};

type OrderConfirmation = {
  orderNumber: string;
  total: number;
  clientName: string;
  productName: string;
  quantity: number;
};

function getUnitPrice(qty: number, tiers: TieredPrice[]): number {
  const sorted = [...tiers].sort((a, b) => b.minQty - a.minQty);
  for (const tier of sorted) {
    if (qty >= tier.minQty) return tier.price;
  }
  return tiers[0]?.price ?? 0;
}

function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(20);
  const [showModal, setShowModal] = useState(false);

  const unitPrice = getUnitPrice(quantity, product.tieredPrices);
  const total = unitPrice * quantity;

  return (
    <>
      <div className="group border border-neutral-200 rounded-xl overflow-hidden hover:border-black/50 hover:scale-[1.02] transition-all duration-300 bg-white flex flex-col shadow-sm hover:shadow-md">
        {/* Image */}
        <div className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden relative">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm">No image</div>
          )}
          {product.gsm && (
            <span className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
              {product.gsm} GSM
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-black mb-1">{product.name}</h3>
          <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{product.description}</p>

          {/* Tiered pricing table */}
          <div className="mb-4 rounded-lg border border-neutral-100 overflow-hidden">
            <div className="bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Tiered Pricing
            </div>
            <div className="divide-y divide-neutral-100">
              {product.tieredPrices.map((tier) => (
                <div
                  key={tier.id}
                  className={`flex justify-between items-center px-3 py-2 text-sm transition-colors ${
                    quantity >= tier.minQty ? "bg-black text-white" : "text-neutral-600"
                  }`}
                >
                  <span>From {tier.minQty} pcs</span>
                  <span className="font-semibold">{tier.price.toFixed(2)} € / u</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              Quantity (MOQ: {product.tieredPrices[0]?.minQty ?? 20})
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(product.tieredPrices[0]?.minQty ?? 20, quantity - 10))}
                className="w-9 h-9 border border-neutral-300 rounded-md text-lg font-bold hover:bg-neutral-50 transition-colors flex items-center justify-center"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                min={product.tieredPrices[0]?.minQty ?? 20}
                onChange={(e) => setQuantity(Math.max(product.tieredPrices[0]?.minQty ?? 20, parseInt(e.target.value) || 0))}
                className="w-20 h-9 border border-neutral-300 rounded-md text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={() => setQuantity(quantity + 10)}
                className="w-9 h-9 border border-neutral-300 rounded-md text-lg font-bold hover:bg-neutral-50 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Live price */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide">Unit price</p>
              <p className="text-2xl font-extrabold text-black">{unitPrice.toFixed(2)} €</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400 uppercase tracking-wide">Total</p>
              <p className="text-xl font-bold text-black">{total.toFixed(2)} €</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-auto w-full h-11 bg-black text-white font-semibold rounded-md hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Generate Purchase Order
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <OrderModal
          product={product}
          quantity={quantity}
          unitPrice={unitPrice}
          total={total}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function OrderModal({
  product,
  quantity,
  unitPrice,
  total,
  onClose,
}: {
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: name,
          clientEmail: email,
          productId: product.id,
          quantity,
          unitPrice,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmation({
          orderNumber: data.orderNumber,
          total: data.total,
          clientName: name,
          productName: product.name,
          quantity,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!confirmation ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-1">Purchase Order</h2>
            <p className="text-neutral-500 text-sm mb-6">
              No payment required now — we will send you our bank details by email.
            </p>

            {/* Order summary */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Product</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Quantity</span>
                <span className="font-medium">{quantity} pcs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Unit price</span>
                <span className="font-medium">{unitPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                <span className="font-bold">Total (excl. tax)</span>
                <span className="font-black text-lg">{total.toFixed(2)} €</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Brand / Company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                required
                type="email"
                placeholder="Professional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div className="flex items-start gap-2 text-xs text-neutral-400 pt-1">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Payment is made by bank transfer (RIB). Our team will confirm your order and send payment details within 24h via WhatsApp (+20 12 28811446).</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-black text-white font-semibold rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Confirm Order →"}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-9 w-9" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-neutral-500 text-sm mb-6">
              Your purchase order has been received by Swanky Factory.
            </p>
            <div className="bg-neutral-50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order number</span>
                <span className="font-black text-black">{confirmation.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Product</span>
                <span className="font-medium">{confirmation.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Quantity</span>
                <span className="font-medium">{confirmation.quantity} pcs</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-bold">Total</span>
                <span className="font-black">{confirmation.total.toFixed(2)} €</span>
              </div>
            </div>
            <p className="text-sm text-neutral-600">
              Our team will contact you within <strong>24h</strong> at{" "}
              <strong>{confirmation.clientName}</strong> to send the bank transfer details (RIB).
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              📱 Or reach us directly on WhatsApp:{" "}
              <a href="https://wa.me/201228811446" className="underline text-black" target="_blank" rel="noreferrer">
                +20 12 28811446
              </a>
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full h-11 border border-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogueClient({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 text-neutral-400">
        <p className="text-lg">No products in the catalog yet.</p>
        <p className="text-sm mt-2">Run <code className="bg-neutral-100 px-2 py-1 rounded">npx ts-node prisma/seed.ts</code> to populate.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <ScrollReveal key={product.id} delay={i * 100}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}
