"use client";

import { useState } from "react";
import { CheckCircle, Clock, MessageCircle } from "lucide-react";

import { useRouter } from "next/navigation";

type Props = {
  quoteId: number;
  currentStatus: string;
  clientEmail: string;
  clientPhone?: string | null;
};

export default function QuoteActions({ quoteId, currentStatus, clientEmail, clientPhone }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setLoading(true);
    try {
      console.log('Validate click for quoteId', quoteId);
        const res = await fetch(`/api/quotes/${quoteId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "TRAITE" }),
        });

      const data = await res.json();
      console.log("[QuoteActions] PATCH response:", res.status, data);

      if (res.ok) {
        setStatus("TRAITE");
        router.refresh();
      } else {
        alert(`Error: ${data.error || "Unknown error"} (status ${res.status})`);
      }
    } catch (err) {
      console.error("[QuoteActions] fetch failed:", err);
      alert("Network error — check the console.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "TRAITE") {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
        <CheckCircle className="h-4 w-4" />
        Invoice Sent
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 md:items-end">
      <a
        href={
          clientPhone
            ? `https://wa.me/${clientPhone.replace(/\s+/g, "")}?text=Hello ${encodeURIComponent(clientEmail)}, we received your quote request from Swanky Factory!`
            : `https://wa.me/201228811446?text=Quote from ${encodeURIComponent(clientEmail)}`
        }
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-md text-xs font-medium hover:bg-neutral-50 transition-colors w-max"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {clientPhone ? "Message Client" : "WhatsApp"}
      </a>
      <button
        onClick={handleAccept}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-md text-xs font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50 w-max"
      >
        <CheckCircle className="h-3.5 w-3.5" />
        {loading ? "Validating..." : "Validate & Send Invoice"}
      </button>
    </div>
  );
}
