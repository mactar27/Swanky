export const dynamic = "force-dynamic";
import { Package, Truck, Clock, CheckCircle, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import QuoteActions from "./QuoteActions";

export default async function AdminDashboardPage() {
  const [orders, quoteRequests, products] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
      take: 10,
    }),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      include: { tieredPrices: { orderBy: { minQty: "asc" } } },
    }),
  ]);

  const pendingOrdersCount = await prisma.order.count({ where: { status: "EN_ATTENTE" } });
  const productionOrdersCount = await prisma.order.count({ where: { status: "EN_PRODUCTION" } });
  const newQuotesCount = await prisma.quoteRequest.count({ where: { status: "NOUVEAU" } });

  const statusColor: Record<string, string> = {
    EN_ATTENTE: "bg-amber-100 text-amber-700",
    EN_PRODUCTION: "bg-blue-100 text-blue-700",
    IMPRIME: "bg-purple-100 text-purple-700",
    EXPEDIE: "bg-green-100 text-green-700",
  };

  const statusLabel: Record<string, string> = {
    EN_ATTENTE: "Pending",
    EN_PRODUCTION: "In Production",
    IMPRIME: "Printed",
    EXPEDIE: "Shipped",
  };

  return (
    <div className="space-y-8">
      {/* Export Pricing Alert */}
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl flex items-start gap-4">
        <FileText className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-bold">International Export Pricing</h4>
          <p className="text-sm mt-1">
            Prices are displayed in <strong>Euros (€)</strong> for international B2B clients (Europe, US, etc.). You can adjust these prices to Dollars ($) or other currencies in the <strong>Settings</strong> tab depending on your current export strategy. Egyptian Pounds (EGP) are generally not used for international B2B quotes.
          </p>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <Clock className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-sm text-neutral-500">Pending Orders</p>
              <h2 className="text-2xl font-bold">{pendingOrdersCount}</h2>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <Package className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-neutral-500">In Production</p>
              <h2 className="text-2xl font-bold">{productionOrdersCount}</h2>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-neutral-500">New Quotes</p>
              <h2 className="text-2xl font-bold">{newQuotesCount}</h2>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <Truck className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-neutral-500">Active Catalog</p>
              <h2 className="text-2xl font-bold">{products.length} ref.</h2>
            </div>
          </div>
        </div>
      </div>

        {/* Recent Orders Table */}
        <div className="rounded-xl border border-neutral-200 bg-white">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg">Orders (from /catalogue)</h3>
              {/* 4. Blinking live dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
            <span className="text-xs text-neutral-400">Real-time from MySQL</span>
          </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-neutral-600">Order #</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-600">Client</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-600">Items</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-600">Status</th>
                <th className="px-6 py-3 text-right font-semibold text-neutral-600">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-black">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-black">{order.clientName}</div>
                    <div className="text-xs text-neutral-400">{order.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {order.items.map((item) => `${item.quantity}× ${item.product.name}`).join(", ")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[order.status] ?? "bg-neutral-100 text-neutral-600"}`}>
                      {statusLabel[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-black">
                    {order.total.toFixed(2)} €
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                    No orders yet. They appear here when clients use /catalogue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Requests */}
      <div className="rounded-xl border border-neutral-200 bg-white">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="font-bold text-lg">Quote Requests (from /devis)</h3>
          <span className="text-xs text-neutral-400">Click "Accept & Invoice" to process</span>
        </div>
        <div className="divide-y divide-neutral-100">
          {quoteRequests.map((quote) => (
            <div key={quote.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-bold text-black">{quote.clientName}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${quote.status === "NOUVEAU" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                    {quote.status === "NOUVEAU" ? "New" : "Processed"}
                  </span>
                </div>
                <p className="text-sm text-neutral-500">{quote.clientEmail}</p>
                <p className="text-sm text-neutral-600 mt-1">
                  <span className="font-medium">{quote.productType}</span> — {quote.technique}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {new Date(quote.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
              <QuoteActions quoteId={quote.id} currentStatus={quote.status} clientEmail={quote.clientEmail} />
            </div>
          ))}
          {quoteRequests.length === 0 && (
            <div className="px-6 py-12 text-center text-neutral-400">
              No quote requests yet. They appear here when clients use /devis.
            </div>
          )}
        </div>
      </div>

      {/* Tiered Pricing Preview */}
      <div className="rounded-xl border border-neutral-200 bg-white">
        <div className="p-6 border-b border-neutral-100">
          <h3 className="font-bold text-lg">Active Tiered Pricing</h3>
        </div>
        <div className="p-6 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="border border-neutral-100 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center bg-neutral-50 px-4 py-3">
                <span className="font-semibold text-sm">{product.name}</span>
                <span className="text-xs bg-black text-white px-2 py-0.5 rounded">{product.gsm} GSM</span>
              </div>
              <div className="divide-y divide-neutral-100">
                {product.tieredPrices.map((tier) => (
                  <div key={tier.id} className="flex justify-between text-sm px-4 py-2">
                    <span className="text-neutral-500">From {tier.minQty} pcs</span>
                    <span className="font-bold">{tier.price.toFixed(2)} € / u</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
