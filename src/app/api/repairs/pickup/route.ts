import { NextRequest, NextResponse } from "next/server";
import {
  saveRepairTicket,
  type RepairServiceMode,
  type RepairTicket,
} from "@/lib/commerce-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const customerName = String(body.customerName || "").trim();
    const customerPhone = String(body.customerPhone || "").trim();
    const customerEmail = String(body.customerEmail || "").trim();
    const serviceMode: RepairServiceMode = (["pickup", "dropoff", "onsite"].includes(
      String(body.serviceMode)
    )
      ? body.serviceMode
      : "pickup") as RepairServiceMode;
    const pickupLocation = String(body.pickupLocation || "").trim();
    const pickupWindow = String(body.pickupWindow || "Today (Next Available Rider)").trim();
    const deviceType = String(body.deviceType || "Laptop / MacBook").trim();
    const deviceModel = String(body.deviceModel || "").trim();
    const issueDescription = String(body.issueDescription || "").trim();

    if (!customerName || customerName.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!customerPhone || customerPhone.replace(/\D/g, "").length < 9) {
      return NextResponse.json(
        { error: "Please enter a valid phone or WhatsApp number." },
        { status: 400 }
      );
    }
    if ((serviceMode === "pickup" || serviceMode === "onsite") && pickupLocation.length < 3) {
      return NextResponse.json(
        { error: "Please enter your Nairobi pickup address or estate." },
        { status: 400 }
      );
    }
    if (!issueDescription || issueDescription.length < 4) {
      return NextResponse.json(
        { error: "Please describe the device issue." },
        { status: 400 }
      );
    }

    const suffix = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `ZT-${suffix}`;
    const nowLabel = new Date().toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const firstStepTitle =
      serviceMode === "pickup"
        ? "Rider Pickup Scheduled"
        : serviceMode === "onsite"
        ? "On-Site Technician Dispatched"
        : "Workshop Drop-Off Logged";

    const firstStepDesc =
      serviceMode === "pickup"
        ? `Pickup scheduled at ${pickupLocation} (${pickupWindow}). Rider will call ${customerPhone} on dispatch.`
        : serviceMode === "onsite"
        ? `On-site visit requested for ${pickupLocation} (${pickupWindow}).`
        : `Ready for drop-off at our Nairobi lab (${pickupWindow}).`;

    const ticket: RepairTicket = {
      id: crypto.randomUUID(),
      ticketNumber,
      customerName,
      customerPhone,
      customerEmail,
      serviceMode,
      pickupLocation:
        serviceMode === "dropoff" ? "Zollani Tech Nairobi Workshop" : pickupLocation,
      pickupWindow,
      deviceType,
      deviceModel: deviceModel || deviceType,
      issueDescription,
      estimatedCost: "Confirmed after free bench diagnostics",
      repairStatus: "pickup_scheduled",
      technicianNotes:
        "Request received. Our dispatch coordinator will call you within 15 minutes to confirm pickup.",
      timeline: [
        {
          title: firstStepTitle,
          timestamp: `Today, ${nowLabel}`,
          description: firstStepDesc,
          status: "completed",
        },
        {
          title: "Free Physical & Board Diagnostics",
          timestamp: "In Progress",
          description: "Upfront fixed repair quote shared via WhatsApp/Call before any work starts.",
          status: "active",
        },
        {
          title: "Repair & Micro-Soldering Execution",
          timestamp: "Pending",
          description: "Precision repair using genuine OEM parts or board-level component replacement.",
          status: "pending",
        },
        {
          title: "Bench Stress-Testing & QA",
          timestamp: "Pending",
          description: "Full thermal, battery, and port verification.",
          status: "pending",
        },
        {
          title: "Return Delivery or Collection",
          timestamp: "Pending",
          description: "Returned with up to 6-month written warranty.",
          status: "pending",
        },
      ],
      createdAt: new Date().toISOString(),
    };

    await saveRepairTicket(ticket);

    return NextResponse.json({ success: true, ticket }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/repairs/pickup] Error:", error);
    return NextResponse.json(
      { error: "Could not schedule pickup right now. Call +254 768 551914." },
      { status: 500 }
    );
  }
}
