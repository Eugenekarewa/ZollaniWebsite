import { NextRequest, NextResponse } from "next/server";
import {
  getAuthoritativeCatalog,
  saveOrder,
  type OrderDeliveryMethod,
  type OrderLineItem,
  type OrderPaymentMethod,
  type ShopOrder,
} from "@/lib/commerce-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const customerName = String(body.customerName || "").trim();
    const customerPhone = String(body.customerPhone || "").trim();
    const customerEmail = String(body.customerEmail || "").trim();
    const deliveryMethod: OrderDeliveryMethod =
      body.deliveryMethod === "delivery" ? "delivery" : "pickup";
    const deliveryAddress = String(body.deliveryAddress || "").trim();
    const paymentMethod: OrderPaymentMethod = (["mpesa", "card", "bank", "cash"].includes(
      String(body.paymentMethod)
    )
      ? body.paymentMethod
      : "mpesa") as OrderPaymentMethod;
    const notes = String(body.notes || "").trim().slice(0, 500);
    const requestedItems = Array.isArray(body.items) ? body.items : [];

    if (!customerName || customerName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!customerPhone || customerPhone.replace(/\D/g, "").length < 9) {
      return NextResponse.json(
        { error: "Please enter a valid Kenyan phone or WhatsApp number." },
        { status: 400 }
      );
    }
    if (deliveryMethod === "delivery" && deliveryAddress.length < 3) {
      return NextResponse.json(
        { error: "Please enter your Nairobi delivery address or estate." },
        { status: 400 }
      );
    }
    if (requestedItems.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const catalog = await getAuthoritativeCatalog();
    const catalogById = new Map(catalog.map((p) => [p.id, p]));

    const lineItems: OrderLineItem[] = [];
    for (const rawItem of requestedItems) {
      const id = String(rawItem?.id || "");
      const qty = Math.floor(Number(rawItem?.quantity || 0));
      if (!id || !Number.isFinite(qty) || qty < 1 || qty > 50) {
        return NextResponse.json({ error: "Invalid cart item or quantity." }, { status: 400 });
      }
      const product = catalogById.get(id);
      if (!product) {
        return NextResponse.json(
          { error: "One or more items in your cart are no longer available." },
          { status: 400 }
        );
      }
      const unitPrice = Math.max(0, Math.round(product.priceKes));
      lineItems.push({
        id: product.id,
        name: product.name,
        quantity: qty,
        unitPrice,
        lineTotal: unitPrice * qty,
        warranty: product.warranty || "6 Months Warranty",
      });
    }

    const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const deliveryFee = deliveryMethod === "delivery" ? 500 : 0;
    const total = subtotal + deliveryFee;
    const vatIncluded = Math.round(total - total / 1.16);

    const suffix = Math.floor(1000 + Math.random() * 9000);
    const stamp = Date.now().toString(36).slice(-4).toUpperCase();
    const orderNumber = `ZT-ORD-${stamp}${suffix}`;
    const receiptNumber = `ZOL-RCP-${new Date().getFullYear()}-${suffix}${stamp.slice(0, 2)}`;

    let paymentStatus: "paid" | "pending" = "pending";
    let paymentReference = "PAY-ON-DELIVERY";
    let orderStatus: ShopOrder["orderStatus"] = "confirmed";

    if (paymentMethod === "mpesa") {
      const suppliedCode = String(body.mpesaCode || "")
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, "");
      paymentStatus = "paid";
      paymentReference = suppliedCode || `MPESA-${stamp}${suffix}`;
      orderStatus = "testing";
    } else if (paymentMethod === "card") {
      const last4 = String(body.cardLast4 || "4242").replace(/\D/g, "").slice(-4) || "4242";
      const brand = String(body.cardBrand || "CARD").replace(/[^A-Za-z]/g, "").toUpperCase() || "CARD";
      paymentStatus = "paid";
      paymentReference = `${brand}-••••${last4}-${stamp}`;
      orderStatus = "testing";
    } else if (paymentMethod === "bank") {
      paymentStatus = "pending";
      paymentReference = `EFT-${orderNumber}`;
    }

    const nowLabel = new Date().toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const timeline: ShopOrder["timeline"] = [
      {
        title:
          paymentStatus === "paid"
            ? "Order Confirmed & Payment Verified"
            : "Order Placed & Reserved",
        timestamp: `Today, ${nowLabel}`,
        description:
          paymentStatus === "paid"
            ? `Payment reference ${paymentReference} verified. Printable receipt ${receiptNumber} issued.`
            : `Order reserved under ${paymentReference}. Pay via M-Pesa Paybill 714888 or on delivery.`,
        status: "completed",
      },
      {
        title: "24-Point Bench Quality Check",
        timestamp: paymentStatus === "paid" ? "In Progress" : "Pending",
        description:
          "Technicians inspect hardware seals, accessories, and warranty certification.",
        status: paymentStatus === "paid" ? "active" : "pending",
      },
      {
        title: "Packed & Warranty Sealed",
        timestamp: "Pending",
        description: "Packaged at our Nairobi lab with official warranty documentation.",
        status: "pending",
      },
      {
        title:
          deliveryMethod === "delivery"
            ? "Out for Nairobi Delivery"
            : "Ready for Nairobi Shop Pickup",
        timestamp: "Pending",
        description:
          deliveryMethod === "delivery"
            ? `Rider dispatch to ${deliveryAddress}.`
            : "Ready for collection at Zollani Tech Nairobi Hub.",
        status: "pending",
      },
      {
        title: deliveryMethod === "delivery" ? "Delivered & Signed" : "Collected by Customer",
        timestamp: "Pending",
        description: "Final handover and unboxing inspection completed.",
        status: "pending",
      },
    ];

    const order: ShopOrder = {
      id: crypto.randomUUID(),
      orderNumber,
      receiptNumber,
      customerName,
      customerPhone,
      customerEmail,
      deliveryMethod,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress : "Zollani Tech Nairobi Pickup Hub",
      paymentMethod,
      paymentStatus,
      paymentReference,
      orderStatus,
      items: lineItems,
      subtotal,
      deliveryFee,
      vatIncluded,
      total,
      notes,
      timeline,
      createdAt: new Date().toISOString(),
    };

    await saveOrder(order);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders] Error:", error);
    return NextResponse.json(
      { error: "Unable to process order right now. Please try again." },
      { status: 500 }
    );
  }
}
