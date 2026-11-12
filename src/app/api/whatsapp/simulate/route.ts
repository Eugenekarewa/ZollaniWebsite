import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createWhatsAppProductDraft } from "@/lib/whatsapp-parser";
import { getSession } from "@/lib/auth";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    // Allow authenticated admin, or local dev mode simulation
    if (process.env.NODE_ENV === "production" && (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";
    let rawMessage = "";
    let senderPhone = "+254768551914";
    let imageUrl = "/images/pc-repair-workbench.jpg";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      rawMessage = (formData.get("message") as string) || "";
      senderPhone = (formData.get("senderPhone") as string) || "+254768551914";
      const file = formData.get("file") as File | null;

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public", "uploads", "whatsapp");
        await fs.mkdir(uploadDir, { recursive: true });

        const ext = path.extname(file.name) || ".jpg";
        const filename = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 6)}${ext}`;
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);
        imageUrl = `/uploads/whatsapp/${filename}`;
      } else if (formData.get("imageUrl")) {
        imageUrl = String(formData.get("imageUrl"));
      }
    } else {
      const json = await request.json();
      rawMessage = json.message || json.text || "";
      senderPhone = json.senderPhone || "+254768551914";
      imageUrl = json.imageUrl || "/images/pc-repair-workbench.jpg";
    }

    if (!rawMessage.trim()) {
      return NextResponse.json({ error: "Message text cannot be empty" }, { status: 400 });
    }

    const draft = await createWhatsAppProductDraft({
      rawMessage,
      senderPhone,
      imageUrl,
    });

    return NextResponse.json({
      success: true,
      message: "WhatsApp inbound simulated successfully! Saved as draft awaiting your review.",
      draft,
    });
  } catch (error: any) {
    console.error("[WhatsApp Simulator] Error:", error);
    return NextResponse.json({ error: "Simulation failed", detail: error?.message }, { status: 500 });
  }
}
