import { promises as fs } from "fs";
import path from "path";
import { db, ensureProductDraftColumns } from "@/lib/db";
import { shopProducts, productImages } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface ParsedWhatsAppProduct {
  id: string;
  name: string;
  price: string;
  category: "refurbished-laptop" | "gaming-pc" | "workstation" | "upgrade-kit" | "monitor" | "smart-home-camera" | "mouse" | "desktop-cpu" | "mini-pc";
  description: string;
  specs: string[];
  condition: string;
  warranty: string;
  imageUrl: string;
  galleryImages?: string[];
  senderPhone?: string;
  rawMessage: string;
  status: "draft" | "published" | "archived";
  isActive: boolean;
  createdAt: string;
}

const LOCAL_DRAFTS_DIR = path.join(process.cwd(), "public", "uploads", "whatsapp");
const LOCAL_DRAFTS_FILE = path.join(LOCAL_DRAFTS_DIR, "drafts.json");

async function ensureLocalDraftsFile() {
  try {
    await fs.mkdir(LOCAL_DRAFTS_DIR, { recursive: true });
    try {
      await fs.access(LOCAL_DRAFTS_FILE);
    } catch {
      await fs.writeFile(LOCAL_DRAFTS_FILE, "[]", "utf-8");
    }
  } catch (e) {
    console.error("Error creating drafts directory/file:", e);
  }
}

/**
 * Intelligent natural language parser for WhatsApp product messages
 */
export function parseWhatsAppProductMessage(rawText: string): Omit<ParsedWhatsAppProduct, "id" | "imageUrl" | "createdAt" | "status" | "isActive"> {
  const clean = (rawText || "").trim();
  const lines = clean
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let detectedName = "";
  let detectedPrice = "KES 0";
  let detectedCategory: ParsedWhatsAppProduct["category"] = "refurbished-laptop";
  let detectedCondition = "Certified Refurbished";
  let detectedWarranty = "6 Months Warranty";
  const detectedSpecs: string[] = [];
  const descriptionLines: string[] = [];

  // 1. Price Detection
  const priceRegexes = [
    /(?:kes|ksh|kshs|\$)\s*[:=]?\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+)/i,
    /price\s*[:=]?\s*(?:kes|ksh|kshs|\$)?\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+)/i,
    /([0-9]{1,3}(?:,[0-9]{3})+)\s*(?:kes|ksh|\/=|\/-)/i,
    /([0-9]{4,6})\s*(?:kes|ksh|\/=|\/-)/i,
  ];

  let rawPriceNum = 0;
  for (const regex of priceRegexes) {
    const match = clean.match(regex);
    if (match && match[1]) {
      const numStr = match[1].replace(/,/g, "");
      const parsed = parseInt(numStr, 10);
      if (!isNaN(parsed) && parsed > 500) {
        rawPriceNum = parsed;
        detectedPrice = `KES ${parsed.toLocaleString()}`;
        break;
      }
    }
  }

  // Fallback price scan if not yet found
  if (rawPriceNum === 0) {
    const standaloneNum = clean.match(/\b([2-9][0-9]{3,5})\b/);
    if (standaloneNum) {
      const p = parseInt(standaloneNum[1], 10);
      detectedPrice = `KES ${p.toLocaleString()}`;
    }
  }

  // 2. Category Detection
  const lower = clean.toLowerCase();
  if (lower.includes("gaming") || lower.includes("rtx") || lower.includes("gtx") || lower.includes("radeon") || lower.includes("gaming rig") || lower.includes("gaming pc")) {
    detectedCategory = "gaming-pc";
    detectedCondition = "Brand New Custom Build";
  } else if (lower.includes("workstation") || lower.includes("xeon") || lower.includes("quadro") || lower.includes("precision")) {
    detectedCategory = "workstation";
  } else if (lower.includes("monitor") || lower.includes("display") || lower.includes("144hz") || lower.includes("ultrasharp") || lower.includes("curved screen")) {
    detectedCategory = "monitor";
  } else if (lower.includes("camera") || lower.includes("cctv") || lower.includes("security camera") || lower.includes("smart home")) {
    detectedCategory = "smart-home-camera";
  } else if (lower.includes("mouse") || lower.includes("keyboard") || lower.includes("peripheral") || lower.includes("headset")) {
    detectedCategory = "mouse";
  } else if (lower.includes("desktop cpu") || lower.includes("processor") || lower.includes("ryzen 7") || lower.includes("core i9") || lower.includes("core i7-")) {
    detectedCategory = "desktop-cpu";
  } else if (lower.includes("mini pc") || lower.includes("tiny") || lower.includes("nuc") || lower.includes("micro pc")) {
    detectedCategory = "mini-pc";
  } else if (lower.includes("ram") && (lower.includes("ssd") || lower.includes("nvme") || lower.includes("upgrade"))) {
    detectedCategory = "upgrade-kit";
    detectedCondition = "Hardware Bundle";
  } else {
    detectedCategory = "refurbished-laptop";
  }

  // 3. Warranty Detection
  if (lower.includes("1 year warranty") || lower.includes("12 months warranty") || lower.includes("1 yr warranty")) {
    detectedWarranty = "1 Year Warranty";
  } else if (lower.includes("6 months") || lower.includes("6 month") || lower.includes("6m warranty")) {
    detectedWarranty = "6 Months Warranty";
  } else if (lower.includes("3 months") || lower.includes("3 month")) {
    detectedWarranty = "3 Months Warranty";
  } else if (lower.includes("1 month") || lower.includes("30 days")) {
    detectedWarranty = "30 Days Warranty";
  }

  // 4. Condition Detection
  if (lower.includes("brand new") || lower.includes("sealed box")) {
    detectedCondition = "Brand New Custom Build";
  } else if (lower.includes("ex-uk") || lower.includes("ex uk") || lower.includes("grade a")) {
    detectedCondition = "Certified Refurbished";
  }

  // 5. Specs & Name Line Extraction
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const l = line.toLowerCase();

    // Skip price lines
    if (/^(kes|ksh|price)\b/i.test(l) || /^[0-9,]+\s*(kes|ksh|\/=)/i.test(l)) {
      continue;
    }

    // Explicit name tag
    if (/^(title|name|model|item)\s*[:=-]\s*(.+)/i.test(line)) {
      const match = line.match(/^(title|name|model|item)\s*[:=-]\s*(.+)/i);
      if (match && match[2]) {
        detectedName = match[2].trim();
        continue;
      }
    }

    // First line usually has brand/model (HP, Dell, Lenovo, ThinkPad, MacBook, Asus, Acer, etc.)
    if (!detectedName && i === 0 && line.length < 80) {
      detectedName = line.replace(/^(product|item|for sale|stock)\s*[:=-]?\s*/i, "").trim();
      continue;
    }

    // Specs detection: RAM, Storage, CPU, Display, Battery
    const isSpec =
      /\b(ram|ddr[345]|gb\s*ram|rom)\b/i.test(line) ||
      /\b(ssd|nvme|hdd|512gb|256gb|1tb|2tb|128gb)\b/i.test(line) ||
      /\b(core\s*i[3579]|ryzen\s*[3579]|intel|amd|m1|m2|m3|ghz|quad[\s-]core)\b/i.test(line) ||
      /\b(fhd|ips|oled|resolution|14\.0"|15\.6"|13\.3"|touchscreen|anti-glare)\b/i.test(line) ||
      /\b(backlit|keyboard|fingerprint|usb-c|thunderbolt|type-c|hdmi)\b/i.test(line) ||
      /\b(battery|hrs|backup|whr|mah)\b/i.test(line) ||
      /\b(nvidia|rtx|gtx|geforce|graphics)\b/i.test(line);

    if (isSpec) {
      // Clean up bullet points or commas
      const specClean = line.replace(/^[-*•]\s*/, "").trim();
      if (specClean) detectedSpecs.push(specClean);
    } else {
      descriptionLines.push(line);
    }
  }

  // Fallback name if none found
  if (!detectedName) {
    if (detectedCategory === "refurbished-laptop") detectedName = "HP / Dell Refurbished Laptop";
    else if (detectedCategory === "gaming-pc") detectedName = "Custom High-Performance PC Rig";
    else detectedName = "Zollani Tech Certified Hardware";
  }

  // Construct readable description
  const description =
    descriptionLines.length > 0
      ? descriptionLines.join("\n")
      : `${detectedName} in clean, bench-tested condition. Fully inspected by Zollani Tech technicians with genuine OS, clean thermals, and authentic charger. Backed by ${detectedWarranty}.`;

  return {
    name: detectedName,
    price: detectedPrice,
    category: detectedCategory,
    specs: detectedSpecs.length > 0 ? detectedSpecs : ["Bench-Tested Hardware", "Original Charger Included", "Licensed OS Clean Install"],
    condition: detectedCondition,
    warranty: detectedWarranty,
    description,
    senderPhone: "",
    rawMessage: clean,
  };
}

/**
 * Reads local drafts from JSON file
 */
export async function getLocalDrafts(): Promise<ParsedWhatsAppProduct[]> {
  try {
    await ensureLocalDraftsFile();
    const data = await fs.readFile(LOCAL_DRAFTS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

/**
 * Saves or updates drafts in local JSON file
 */
export async function saveLocalDrafts(drafts: ParsedWhatsAppProduct[]): Promise<void> {
  try {
    await ensureLocalDraftsFile();
    await fs.writeFile(LOCAL_DRAFTS_FILE, JSON.stringify(drafts, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save local drafts:", e);
  }
}

/**
 * Creates a new draft from WhatsApp inbound message
 */
export async function createWhatsAppProductDraft(params: {
  rawMessage: string;
  senderPhone?: string;
  imageUrl?: string;
  galleryImages?: string[];
}): Promise<ParsedWhatsAppProduct> {
  const parsed = parseWhatsAppProductMessage(params.rawMessage);
  const id = `draft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const finalImage = params.imageUrl || "/images/pc-repair-workbench.jpg";

  const newDraft: ParsedWhatsAppProduct = {
    ...parsed,
    id,
    imageUrl: finalImage,
    galleryImages: params.galleryImages || [finalImage],
    senderPhone: params.senderPhone || "WhatsApp Business Number",
    status: "draft",
    isActive: false, // Hidden until admin explicitly reviews and publishes!
    createdAt: new Date().toISOString(),
  };

  // 1. Save to local fallback store
  const localDrafts = await getLocalDrafts();
  localDrafts.unshift(newDraft);
  await saveLocalDrafts(localDrafts);

  // 2. Save to database if available
  try {
    await ensureProductDraftColumns();
    await db.insert(shopProducts).values({
      id: newDraft.id,
      name: newDraft.name,
      description: newDraft.description,
      price: newDraft.price,
      category: newDraft.category,
      imageUrl: newDraft.imageUrl,
      isActive: false, // Never show draft publicly
      status: "draft",
      senderPhone: newDraft.senderPhone,
      rawMessage: newDraft.rawMessage,
      specs: JSON.stringify(newDraft.specs),
      condition: newDraft.condition,
      warranty: newDraft.warranty,
      updatedAt: new Date(),
    });

    if (params.galleryImages && params.galleryImages.length > 0) {
      await db.insert(productImages).values(
        params.galleryImages.map((img, i) => ({
          id: `${newDraft.id}_img_${i}`,
          productId: newDraft.id,
          imageUrl: img,
          sortOrder: i,
        }))
      );
    }
  } catch (err) {
    console.warn("[WhatsApp Draft] Note on DB draft save, local draft persisted:", err instanceof Error ? err.message : err);
  }

  try {
    revalidatePath("/admin/shop");
  } catch {}

  return newDraft;
}

/**
 * Fetches all draft products awaiting admin review
 */
export async function getAllDrafts(): Promise<ParsedWhatsAppProduct[]> {
  const localDrafts = await getLocalDrafts();

  try {
    await ensureProductDraftColumns();
    const dbDrafts = await db
      .select()
      .from(shopProducts)
      .where(eq(shopProducts.status, "draft"))
      .orderBy(desc(shopProducts.createdAt));

    if (dbDrafts.length > 0) {
      const mergedMap = new Map<string, ParsedWhatsAppProduct>();
      for (const d of localDrafts) {
        mergedMap.set(d.id, d);
      }
      for (const row of dbDrafts) {
        let parsedSpecs: string[] = [];
        try {
          parsedSpecs = row.specs ? JSON.parse(row.specs) : [];
        } catch {
          parsedSpecs = [];
        }
        mergedMap.set(row.id, {
          id: row.id,
          name: row.name,
          price: row.price,
          category: row.category as ParsedWhatsAppProduct["category"],
          description: row.description,
          specs: parsedSpecs,
          condition: row.condition || "Certified Refurbished",
          warranty: row.warranty || "6 Months Warranty",
          imageUrl: row.imageUrl,
          senderPhone: row.senderPhone || undefined,
          rawMessage: row.rawMessage || "",
          status: "draft",
          isActive: false,
          createdAt: row.createdAt ? row.createdAt.toISOString() : new Date().toISOString(),
        });
      }
      return Array.from(mergedMap.values()).filter((item) => item.status === "draft");
    }
  } catch (err) {
    console.warn("[Drafts] DB query fallback to local drafts:", err instanceof Error ? err.message : err);
  }

  return localDrafts.filter((item) => item.status === "draft");
}

/**
 * Publishes a draft product to make it live on the website
 */
export async function publishDraftProduct(id: string, updatedData?: Partial<ParsedWhatsAppProduct>): Promise<boolean> {
  // Update local file
  const localDrafts = await getLocalDrafts();
  const index = localDrafts.findIndex((d) => d.id === id);
  if (index !== -1) {
    localDrafts[index] = {
      ...localDrafts[index],
      ...updatedData,
      status: "published",
      isActive: true,
    };
    await saveLocalDrafts(localDrafts);
  }

  // Update DB
  try {
    await ensureProductDraftColumns();
    const existing = await db.select().from(shopProducts).where(eq(shopProducts.id, id));
    if (existing.length > 0) {
      await db
        .update(shopProducts)
        .set({
          name: updatedData?.name || existing[0].name,
          price: updatedData?.price || existing[0].price,
          category: updatedData?.category || existing[0].category,
          description: updatedData?.description || existing[0].description,
          imageUrl: updatedData?.imageUrl || existing[0].imageUrl,
          condition: updatedData?.condition || existing[0].condition,
          warranty: updatedData?.warranty || existing[0].warranty,
          specs: updatedData?.specs ? JSON.stringify(updatedData.specs) : existing[0].specs,
          status: "published",
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(shopProducts.id, id));
    } else {
      // Draft existed only in local store, insert into DB as published
      const draft = localDrafts[index];
      if (draft) {
        await db.insert(shopProducts).values({
          id: draft.id,
          name: draft.name,
          description: draft.description,
          price: draft.price,
          category: draft.category,
          imageUrl: draft.imageUrl,
          isActive: true,
          status: "published",
          senderPhone: draft.senderPhone,
          rawMessage: draft.rawMessage,
          specs: JSON.stringify(draft.specs),
          condition: draft.condition,
          warranty: draft.warranty,
          updatedAt: new Date(),
        });
      }
    }
  } catch (err) {
    console.warn("[Publish Draft] Note on DB update:", err instanceof Error ? err.message : err);
  }

  try {
    revalidatePath("/shop");
    revalidatePath("/admin/shop");
  } catch {}

  return true;
}

/**
 * Deletes or rejects an unwanted draft
 */
export async function deleteDraftProduct(id: string): Promise<boolean> {
  const localDrafts = await getLocalDrafts();
  const filtered = localDrafts.filter((d) => d.id !== id);
  await saveLocalDrafts(filtered);

  try {
    await db.delete(shopProducts).where(eq(shopProducts.id, id));
    await db.delete(productImages).where(eq(productImages.productId, id));
  } catch (err) {
    console.warn("[Delete Draft] Note on DB delete:", err instanceof Error ? err.message : err);
  }

  try {
    revalidatePath("/admin/shop");
  } catch {}

  return true;
}
