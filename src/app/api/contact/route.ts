import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, serviceType, deviceModel, message, serviceLocation, source } = body;

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields (fullName, phone, message)" },
        { status: 400 }
      );
    }

    // In a production setup, this can send an email via Resend / SendGrid or push to a CRM / Telegram / WhatsApp Bot.
    // For now, we log the lead structured data and return a clean success response.
    console.log("=== NEW LEAD RECEIVED ===");
    console.log({
      receivedAt: new Date().toISOString(),
      fullName,
      phone,
      email: email || "N/A",
      serviceType,
      deviceModel: deviceModel || "N/A",
      serviceLocation,
      message,
      source: source || "website",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry successfully recorded. A technician will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API contact error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please message on WhatsApp directly." },
      { status: 500 }
    );
  }
}
