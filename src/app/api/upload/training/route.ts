import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "training");
const JSON_PATH = path.join(UPLOAD_DIR, "gallery.json");

async function ensureDirAndJson() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  try {
    await fs.access(JSON_PATH);
  } catch {
    await fs.writeFile(JSON_PATH, "[]", "utf-8");
  }
}

export async function GET() {
  try {
    await ensureDirAndJson();
    const data = await fs.readFile(JSON_PATH, "utf-8");
    const items = JSON.parse(data || "[]");
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("GET /api/upload/training error:", error);
    return NextResponse.json({ success: false, items: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDirAndJson();
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Training Activity";
    const cohort = (formData.get("cohort") as string) || "Community Cohort";
    const category = (formData.get("category") as string) || "ai-msingi";
    const location = (formData.get("location") as string) || "Nairobi, Kenya";
    const description = (formData.get("description") as string) || "";
    const date = (formData.get("date") as string) || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files (JPEG, PNG, WebP) are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create safe filename
    const ext = path.extname(file.name) || ".jpg";
    const safeName = `train_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, safeName);

    await fs.writeFile(filePath, buffer);

    const newPhoto = {
      id: `up-${Date.now()}`,
      title,
      cohort,
      category,
      imageUrl: `/uploads/training/${safeName}`,
      date,
      location,
      description,
      isUserUploaded: true,
    };

    // Update gallery.json
    const currentData = await fs.readFile(JSON_PATH, "utf-8");
    const list = JSON.parse(currentData || "[]");
    list.unshift(newPhoto);
    await fs.writeFile(JSON_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Training photo uploaded successfully!",
      item: newPhoto,
    });
  } catch (error: any) {
    console.error("POST /api/upload/training error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process photo upload" },
      { status: 500 }
    );
  }
}
