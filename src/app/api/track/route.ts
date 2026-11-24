import { NextRequest, NextResponse } from "next/server";
import { searchTrackingRecords } from "@/lib/commerce-store";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  if (!query.trim()) {
    return NextResponse.json(
      { error: "Enter an Order ID, Repair Ticket ID, or phone number." },
      { status: 400 }
    );
  }

  const results = await searchTrackingRecords(query);
  return NextResponse.json({
    query: query.trim(),
    orders: results.orders.map((ord) => ({
      orderNumber: ord.orderNumber,
      receiptNumber: ord.receiptNumber,
      customerName: ord.customerName,
      deliveryMethod: ord.deliveryMethod,
      deliveryAddress: ord.deliveryAddress,
      paymentMethod: ord.paymentMethod,
      paymentStatus: ord.paymentStatus,
      orderStatus: ord.orderStatus,
      items: ord.items,
      total: ord.total,
      timeline: ord.timeline,
      createdAt: ord.createdAt,
    })),
    repairs: results.repairs.map((rep) => ({
      ticketNumber: rep.ticketNumber,
      customerName: rep.customerName,
      serviceMode: rep.serviceMode,
      pickupLocation: rep.pickupLocation,
      pickupWindow: rep.pickupWindow,
      deviceType: rep.deviceType,
      deviceModel: rep.deviceModel,
      issueDescription: rep.issueDescription,
      estimatedCost: rep.estimatedCost,
      repairStatus: rep.repairStatus,
      technicianNotes: rep.technicianNotes,
      timeline: rep.timeline,
      createdAt: rep.createdAt,
    })),
  });
}
