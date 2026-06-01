import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, productId, quantity, unitPrice } = body;

    if (!clientName || !clientEmail || !productId || !quantity || !unitPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const total = unitPrice * quantity;

    // Generate a unique order number like #SF-1042
    const count = await prisma.order.count();
    const orderNumber = `#SF-${1000 + count + 1}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        clientName,
        clientEmail,
        status: "EN_ATTENTE",
        total,
        items: {
          create: [
            {
              productId: parseInt(productId),
              quantity: parseInt(quantity),
              price: parseFloat(unitPrice),
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber, total }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
