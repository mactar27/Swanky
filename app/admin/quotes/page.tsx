export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { PenTool, Mail, Calendar, Package, Wand2, Hash, MapPin, Phone } from "lucide-react";
import QuoteActions from "../QuoteActions";

export default async function AdminQuotesPage() {
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const newCount = quotes.filter((q) => q.status === "NOUVEAU").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PenTool className="h-6 w-6" /> Quote Requests
          </h2>
          {newCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
              {newCount} new
            </span>
          )}
        </div>
        <span className="text-sm text-neutral-500">{quotes.length} total request{quotes.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="grid gap-4">
        {quotes.map((quote) => {
          const isNew = quote.status === "NOUVEAU";
          return (
            <div
              key={quote.id}
              className={`bg-white rounded-xl border ${isNew ? "border-orange-200 shadow-sm shadow-orange-100" : "border-neutral-200"} overflow-hidden`}
            >
              {/* Card Header */}
              <div className={`px-6 py-4 flex items-center justify-between ${isNew ? "bg-orange-50 border-b border-orange-100" : "bg-neutral-50 border-b border-neutral-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${isNew ? "bg-orange-200 text-orange-700" : "bg-neutral-200 text-neutral-600"}`}>
                    {quote.clientName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-black">{quote.clientName}</p>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <span className="font-mono">#{quote.id}</span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(quote.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${isNew ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                  {isNew ? "New Request" : "Processed & Invoiced"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Left: Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-0.5">Client Email</p>
                      <a href={`mailto:${quote.clientEmail}`} className="text-sm font-medium text-black hover:underline">
                        {quote.clientEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-0.5">WhatsApp Number</p>
                      {quote.clientPhone ? (
                        <a
                          href={`https://wa.me/${quote.clientPhone.replace(/\s+/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-semibold text-green-600 hover:underline"
                        >
                          +{quote.clientPhone}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-400 italic">Not provided</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-0.5">Product / Blank</p>
                      <p className="text-sm font-semibold text-black">{quote.productType}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wand2 className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-0.5">Customization Technique</p>
                      <p className="text-sm font-semibold text-black">{quote.technique}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-0.5">Shipping Address</p>
                      {quote.shippingAddress ? (
                        <p className="text-sm font-semibold text-black whitespace-pre-line">{quote.shippingAddress}</p>
                      ) : (
                        <p className="text-sm text-neutral-400 italic">Not provided — confirm via WhatsApp</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col items-start md:items-end justify-between gap-4">
                  <div className="w-full md:text-right">
                    <p className="text-xs text-neutral-500 uppercase font-semibold mb-2">Actions</p>
                    <QuoteActions quoteId={quote.id} currentStatus={quote.status} clientEmail={quote.clientEmail} clientPhone={quote.clientPhone} />
                  </div>

                  {quote.logoUrl && (
                    <div className="flex items-start gap-3 w-full">
                      <Hash className="h-4 w-4 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-neutral-500 uppercase font-semibold mb-0.5">Logo / File</p>
                        <p className="text-sm font-medium text-blue-600 break-all">{quote.logoUrl}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {quotes.length === 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 px-6 py-16 text-center">
            <PenTool className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-400 font-medium">No quote requests yet.</p>
            <p className="text-neutral-400 text-sm mt-1">They will appear here as clients fill the /devis form.</p>
          </div>
        )}
      </div>
    </div>
  );
}
