import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    console.log("[PATCH /api/quotes/[id]] received body:", body);

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const { status } = body;
    console.log("[PATCH /api/quotes/[id]] id:", id, "status:", status);

    // ✅ Validation correcte
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const updated = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (error) {
    console.error("[PATCH /api/quotes/[id]]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
