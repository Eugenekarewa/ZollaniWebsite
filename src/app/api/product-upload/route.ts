import { put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

const ADMIN_EMAIL = "eugenekarewa223@gmail.com";
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== ADMIN_EMAIL) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !ALLOWED_TYPES.has(file.type) || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Use a JPG, PNG, or WebP image up to 5MB" }, { status: 400 });
  try {
    const blob = await put(`products/${crypto.randomUUID()}-${file.name}`, file, { access: "public", contentType: file.type });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("[v0] Product image upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
