import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, clientPhone, productType, technique, notes, shippingAddress } = body;

    if (!clientName || !clientEmail || !productType || !technique) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        clientName,
        clientEmail,
        clientPhone: clientPhone || null,
        productType,
        technique,
        shippingAddress: shippingAddress || null,
        status: "NOUVEAU",
      },
    });

    return NextResponse.json({ success: true, quoteId: quote.id }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/quotes]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
