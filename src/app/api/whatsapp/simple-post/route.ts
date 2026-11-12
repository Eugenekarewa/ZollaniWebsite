import { NextRequest, NextResponse } from "next/server";
import { createWhatsAppProductDraft } from "@/lib/whatsapp-parser";

/**
 * Simple WhatsApp Product Posting Endpoint
 * Allows posting products via WhatsApp messages
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const message = formData.get("message") as string;
    const senderPhone = formData.get("senderPhone") as string;
    const imageUrl = (formData.get("imageUrl") as string) || "/images/pc-repair-workbench.jpg";

    if (!message) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    // Create product draft from WhatsApp message
    const draft = await createWhatsAppProductDraft({
      rawMessage: message,
      senderPhone: senderPhone || "Unknown",
      imageUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Product saved as draft. Awaiting admin review.",
      draftId: draft.id,
    });
  } catch (error: any) {
    console.error("[Simple WhatsApp Post] Error:", error);
    return NextResponse.json(
      { error: "Failed to process product", details: error?.message },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: "Simple WhatsApp Product Posting API",
    usage: "POST /api/whatsapp/simple-post with form data: message, senderPhone, imageUrl"
  });
}