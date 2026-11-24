import { NextRequest, NextResponse } from "next/server";
import { getOrderByCode } from "@/lib/commerce-store";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const order = await getOrderByCode(code);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order });
}
