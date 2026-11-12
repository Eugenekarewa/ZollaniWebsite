import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { createWhatsAppProductDraft } from "@/lib/whatsapp-parser";

const DEFAULT_VERIFY_TOKEN = "zollani_whatsapp_webhook_2026";

/**
 * Meta WhatsApp Cloud API Verification GET Handler
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || DEFAULT_VERIFY_TOKEN;

  if (mode === "subscribe" && token === expectedToken) {
    console.log("[WhatsApp Webhook] Verification successful");
    return new Response(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.warn("[WhatsApp Webhook] Verification failed. Token mismatch or bad mode.");
  return NextResponse.json({ error: "Verification token mismatch" }, { status: 403 });
}

/**
 * Downloads media from Meta WhatsApp Cloud API
 */
async function downloadWhatsAppMedia(mediaId: string): Promise<string | null> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!accessToken || !mediaId) return null;

  try {
    // 1. Get media URL from Graph API
    const mediaMetaRes = await fetch(`https://graph.facebook.com/v21.0/${mediaId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!mediaMetaRes.ok) {
      console.error("[WhatsApp Webhook] Failed to retrieve media URL:", await mediaMetaRes.text());
      return null;
    }

    const mediaMeta = await mediaMetaRes.json();
    const downloadUrl = mediaMeta.url;

    if (!downloadUrl) return null;

    // 2. Download media bytes
    const fileRes = await fetch(downloadUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!fileRes.ok) return null;

    const arrayBuffer = await fileRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Save locally to public/uploads/whatsapp
    const uploadDir = path.join(process.cwd(), "public", "uploads", "whatsapp");
    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `wa_${Date.now()}_${mediaId.slice(-6)}.jpg`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    return `/uploads/whatsapp/${filename}`;
  } catch (err) {
    console.error("[WhatsApp Webhook] Error downloading media:", err);
    return null;
  }
}

/**
 * Meta WhatsApp Inbound Webhook POST Handler
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const appSecret = process.env.WHATSAPP_APP_SECRET;

    // Optional HMAC validation if app secret is provided
    if (appSecret) {
      const signature = request.headers.get("x-hub-signature-256");
      if (signature) {
        const expectedSig = "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
        if (signature !== expectedSig) {
          console.warn("[WhatsApp Webhook] Invalid HMAC signature.");
          return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }
      }
    }

    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // Support direct testing or simulated payload
    if (payload.simulate || payload.directTest) {
      const draft = await createWhatsAppProductDraft({
        rawMessage: payload.text || payload.rawMessage || "New product received",
        senderPhone: payload.senderPhone || "+254768551914",
        imageUrl: payload.imageUrl || "/images/pc-repair-workbench.jpg",
      });
      return NextResponse.json({
        success: true,
        message: "Simulated WhatsApp product saved as draft for admin review.",
        draft,
      });
    }

    // Standard Meta WhatsApp Cloud API format:
    // entry[0].changes[0].value.messages[0]
    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const messages = value?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      // Could be a status update (sent/delivered/read) which Meta sends to the same webhook
      return NextResponse.json({ status: "acknowledged", detail: "No user message to process" });
    }

    const message = messages[0];
    const senderPhone = message.from || value?.contacts?.[0]?.wa_id || "WhatsApp Client";
    const senderName = value?.contacts?.[0]?.profile?.name || "";

    let textContent = "";
    let imageUrl = "/images/pc-repair-workbench.jpg";

    if (message.type === "image") {
      textContent = message.image?.caption || "";
      const mediaId = message.image?.id;
      if (mediaId) {
        const downloadedUrl = await downloadWhatsAppMedia(mediaId);
        if (downloadedUrl) {
          imageUrl = downloadedUrl;
        }
      }
    } else if (message.type === "text") {
      textContent = message.text?.body || "";
    } else {
      // Document or other type with caption
      textContent = message[message.type]?.caption || "";
    }

    if (!textContent.trim() && message.type !== "image") {
      return NextResponse.json({ status: "ignored", detail: "Message had no text or image content" });
    }

    const fullMessage = senderName ? `${textContent}\n[Sender: ${senderName} (${senderPhone})]` : textContent;

    // Save as DRAFT - NEVER publish directly to the public website!
    const draft = await createWhatsAppProductDraft({
      rawMessage: fullMessage || "WhatsApp Product Inbound",
      senderPhone: String(senderPhone),
      imageUrl,
    });

    console.log(`[WhatsApp Webhook] New product draft created: ID ${draft.id} - "${draft.name}"`);

    return NextResponse.json({
      success: true,
      status: "draft_saved_awaiting_review",
      message: "Product saved as draft. Admin review required before publishing to live website.",
      draftId: draft.id,
      productName: draft.name,
      price: draft.price,
    });
  } catch (error: any) {
    console.error("[WhatsApp Webhook] Unhandled error:", error);
    return NextResponse.json(
      { error: "Webhook processing error", details: error?.message },
      { status: 500 }
    );
  }
}
