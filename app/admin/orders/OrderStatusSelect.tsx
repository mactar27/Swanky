"use client";

import { useState } from "react";
import { Check, ChevronDown, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

type OrderStatusSelectProps = {
  orderId: number;
  currentStatus: string;
};

const statuses = [
  { id: "EN_ATTENTE", label: "Pending (Payment)", icon: Clock, color: "text-amber-600 bg-amber-50" },
  { id: "EN_PRODUCTION", label: "In Production", icon: Package, color: "text-blue-600 bg-blue-50" },
  { id: "READY_FOR_SHIPPING", label: "Ready for Shipping", icon: CheckCircle2, color: "text-purple-600 bg-purple-50" },
  { id: "SHIPPED", label: "Shipped", icon: Truck, color: "text-emerald-600 bg-emerald-50" },
  { id: "DELIVERED", label: "Delivered", icon: Check, color: "text-neutral-600 bg-neutral-100" },
];

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const activeStatus = statuses.find(s => s.id === status) || statuses[0];
  const ActiveIcon = activeStatus.icon;

  const handleStatusChange = async (newStatusId: string) => {
    setIsOpen(false);
    if (newStatusId === status) return;
    
    setIsUpdating(true);
    setStatus(newStatusId);

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatusId }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      setStatus(currentStatus); // revert on error
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-transparent hover:border-black/10 transition-colors ${activeStatus.color} ${isUpdating ? "opacity-50" : ""}`}
      >
        <ActiveIcon className="h-3.5 w-3.5" />
        {activeStatus.label}
        <ChevronDown className="h-3 w-3 ml-1" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {statuses.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStatusChange(s.id)}
                    className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 ${status === s.id ? "bg-neutral-50 font-medium" : "text-neutral-700"}`}
                  >
                    <Icon className={`h-4 w-4 ${s.color.split(" ")[0]}`} />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
