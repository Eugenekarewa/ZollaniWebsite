import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function isAuthorized(request: NextRequest) {
  const expected = process.env.SHOP_IMAGE_ADMIN_KEY;
  return Boolean(expected && request.headers.get("x-shop-admin-key") === expected);
}

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "shop/" });
    return NextResponse.json(
      Object.fromEntries(blobs.map((blob) => [blob.pathname.replace("shop/", "").replace(/\.[^.]+$/, ""), blob.url])),
    );
  } catch {
    return NextResponse.json({ error: "Unable to load shop images" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const productId = formData.get("productId");
  const file = formData.get("file");

  if (typeof productId !== "string" || !/^prod-[a-z0-9-]+$/.test(productId) || !(file instanceof File)) {
    return NextResponse.json({ error: "Product and image are required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image up to 5MB" }, { status: 400 });
  }

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const blob = await put(`shop/${productId}.${extension}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
