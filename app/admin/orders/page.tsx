import { prisma } from "@/lib/prisma";
import { PackageSearch } from "lucide-react";

import OrderStatusSelect from "./OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <PackageSearch className="h-6 w-6" /> All Orders
        </h2>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-neutral-600">Order #</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-600">Client Info</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-600">Products</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-600">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-600">Status & Tracking</th>
                <th className="px-6 py-4 text-right font-semibold text-neutral-600">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-5 font-mono font-bold text-black">{order.orderNumber}</td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-black">{order.clientName}</div>
                    <div className="text-xs text-neutral-500">{order.clientEmail}</div>
                  </td>
                  <td className="px-6 py-5 text-neutral-600">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex gap-2">
                          <span className="font-medium">{item.quantity}×</span>
                          <span>{item.product.name}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-5 text-neutral-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-5">
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-black">
                    {order.total.toFixed(2)} €
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
