import { promises as fs } from "fs";
import path from "path";
import { PRODUCTS, type ProductItem } from "@/data/productsData";
import { getLocalDrafts } from "@/lib/whatsapp-parser";
import { db, pool } from "@/lib/db";
import { shopProducts } from "@/lib/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";

export type OrderDeliveryMethod = "pickup" | "delivery";
export type OrderPaymentMethod = "mpesa" | "card" | "bank" | "cash";
export type OrderPaymentStatus = "paid" | "pending";
export type OrderStatus = "confirmed" | "testing" | "packed" | "dispatched" | "delivered";

export type RepairServiceMode = "pickup" | "dropoff" | "onsite";
export type RepairStatus =
  | "pickup_scheduled"
  | "intake"
  | "diagnosing"
  | "repairing"
  | "testing"
  | "ready";

export interface TimelineStep {
  title: string;
  timestamp: string;
  description: string;
  status: "completed" | "active" | "pending";
}

export interface OrderLineItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  warranty: string;
}

export interface ShopOrder {
  id: string;
  orderNumber: string;
  receiptNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: OrderDeliveryMethod;
  deliveryAddress: string;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: OrderPaymentStatus;
  paymentReference: string;
  orderStatus: OrderStatus;
  items: OrderLineItem[];
  subtotal: number;
  deliveryFee: number;
  vatIncluded: number;
  total: number;
  notes: string;
  timeline: TimelineStep[];
  createdAt: string;
}

export interface RepairTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceMode: RepairServiceMode;
  pickupLocation: string;
  pickupWindow: string;
  deviceType: string;
  deviceModel: string;
  issueDescription: string;
  estimatedCost: string;
  repairStatus: RepairStatus;
  technicianNotes: string;
  timeline: TimelineStep[];
  createdAt: string;
}

interface CommerceStoreData {
  orders: ShopOrder[];
  repairs: RepairTicket[];
}

const STORE_FILE = path.join("/tmp", "zollani-commerce-store.json");

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length >= 12) return digits.slice(-9);
  if (digits.startsWith("0") && digits.length >= 10) return digits.slice(-9);
  return digits.slice(-9);
}

const SEED_DATA: CommerceStoreData = {
  orders: [
    {
      id: "seed-ord-1042",
      orderNumber: "ZT-ORD-1042",
      receiptNumber: "ZOL-RCP-2026-1042",
      customerName: "Brian Kamau",
      customerPhone: "+254712345678",
      customerEmail: "brian.kamau@example.com",
      deliveryMethod: "delivery",
      deliveryAddress: "Kilimani, Argwings Kodhek Rd, Nairobi",
      paymentMethod: "mpesa",
      paymentStatus: "paid",
      paymentReference: "MPESA-SK8492K1",
      orderStatus: "dispatched",
      items: [
        {
          id: "prod-thinkpad-t480",
          name: "Lenovo ThinkPad T480 (Tough Business Ultrabook)",
          quantity: 1,
          unitPrice: 32000,
          lineTotal: 32000,
          warranty: "6 Months Warranty",
        },
        {
          id: "acc-mx-ergo-mouse",
          name: "Pro Wireless Silent Rechargeable Mouse (USB-C + Bluetooth)",
          quantity: 1,
          unitPrice: 2800,
          lineTotal: 2800,
          warranty: "6 Months Warranty",
        },
      ],
      subtotal: 34800,
      deliveryFee: 500,
      vatIncluded: 4869,
      total: 35300,
      notes: "Call upon arrival at gate.",
      timeline: [
        {
          title: "Order Confirmed & Payment Verified",
          timestamp: "Today, 09:15 AM",
          description: "M-Pesa payment MPESA-SK8492K1 confirmed and receipt ZOL-RCP-2026-1042 issued.",
          status: "completed",
        },
        {
          title: "24-Point Bench Quality Check",
          timestamp: "Today, 10:10 AM",
          description: "Battery health, display, keyboard, and thermal stress-test verified.",
          status: "completed",
        },
        {
          title: "Packed & Warranty Sealed",
          timestamp: "Today, 11:05 AM",
          description: "Original charger, mouse, and 6-month warranty slip packed at Nairobi Lab.",
          status: "completed",
        },
        {
          title: "Out for Nairobi Delivery",
          timestamp: "In Progress",
          description: "Dispatched via Zollani rider to Kilimani, Argwings Kodhek Rd.",
          status: "active",
        },
        {
          title: "Delivered & Signed",
          timestamp: "Pending",
          description: "Final handover and unboxing check with customer.",
          status: "pending",
        },
      ],
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ],
  repairs: [
    {
      id: "seed-rep-8421",
      ticketNumber: "ZT-8421",
      customerName: "Mercy Wanjiku",
      customerPhone: "+254768551914",
      customerEmail: "",
      serviceMode: "pickup",
      pickupLocation: "Westlands, Woodvale Grove, Nairobi",
      pickupWindow: "Same-Day Pickup",
      deviceType: "Laptop / MacBook",
      deviceModel: "Apple MacBook Pro 13\" A2251",
      issueDescription: "No power after liquid spill near USB-C charging circuit.",
      estimatedCost: "KES 5,500 – 8,500",
      repairStatus: "repairing",
      technicianNotes: "Faulty 19V MOSFET regulator isolated; micro-soldering & ultrasonic board clean in progress.",
      timeline: [
        {
          title: "Rider Pickup & Intake Logged",
          timestamp: "Day 1 - 09:30 AM",
          description: "Device picked up in Westlands, serial logged, and intake slip issued.",
          status: "completed",
        },
        {
          title: "Component & Schematic Tracing",
          timestamp: "Day 1 - 02:15 PM",
          description: "Power rails inspected with multimeter. Isolated faulty 19V MOSFET regulator.",
          status: "completed",
        },
        {
          title: "Micro-Soldering & Part Installation",
          timestamp: "In Progress",
          description: "Precision micro-soldering replacement of shorted regulator and thermal paste repaste.",
          status: "active",
        },
        {
          title: "Bench Stress-Testing & QA",
          timestamp: "Pending",
          description: "6-hour thermal benchmark run to verify system stability under load.",
          status: "pending",
        },
        {
          title: "Ready for Return Delivery / Collection",
          timestamp: "Pending",
          description: "Customer notification dispatched with 6-month warranty certificate.",
          status: "pending",
        },
      ],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

let memoryCache: CommerceStoreData | null = null;
let tablesInitialized = false;

async function ensurePostgresTables() {
  if (tablesInitialized || !process.env.DATABASE_URL) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS zollani_shop_orders (
        id text PRIMARY KEY,
        order_number text NOT NULL UNIQUE,
        receipt_number text NOT NULL,
        customer_phone_norm text NOT NULL,
        payload jsonb NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS zollani_repair_tickets (
        id text PRIMARY KEY,
        ticket_number text NOT NULL UNIQUE,
        customer_phone_norm text NOT NULL,
        payload jsonb NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);
    tablesInitialized = true;
  } catch (err) {
    console.warn("[CommerceStore] Postgres table init note:", err instanceof Error ? err.message : err);
  }
}

async function readStore(): Promise<CommerceStoreData> {
  if (memoryCache) return memoryCache;

  try {
    const raw = await fs.readFile(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as CommerceStoreData;
    if (Array.isArray(parsed.orders) && Array.isArray(parsed.repairs)) {
      memoryCache = parsed;
      return memoryCache;
    }
  } catch {
    // Initialize with seed data
  }

  memoryCache = structuredClone(SEED_DATA);
  try {
    await fs.writeFile(STORE_FILE, JSON.stringify(memoryCache, null, 2), "utf-8");
  } catch {
    // Ignore read-only fs errors
  }
  return memoryCache;
}

async function writeStore(data: CommerceStoreData): Promise<void> {
  memoryCache = data;
  try {
    await fs.writeFile(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[CommerceStore] File write note:", err instanceof Error ? err.message : err);
  }
}

export async function getAuthoritativeCatalog(): Promise<ProductItem[]> {
  const byId = new Map<string, ProductItem>();

  for (const prod of PRODUCTS) {
    byId.set(prod.id, prod);
  }

  try {
    const local = await getLocalDrafts();
    for (const item of local) {
      if (item.status === "published" && item.isActive) {
        const priceKes = Number(String(item.price).replace(/[^\d.]/g, "")) || 0;
        byId.set(item.id, {
          id: item.id,
          name: item.name,
          category: item.category as ProductItem["category"],
          priceKes,
          condition: (item.condition as ProductItem["condition"]) || "Ex-UK Grade A",
          warranty: item.warranty || "6 Months Warranty",
          specs: item.specs || [],
          image: item.imageUrl || "",
          images: item.galleryImages,
          description: item.description,
          inStock: true,
        });
      }
    }
  } catch {}

  if (process.env.DATABASE_URL) {
    try {
      const dbRows = await db
        .select()
        .from(shopProducts)
        .where(
          and(
            eq(shopProducts.isActive, true),
            or(eq(shopProducts.status, "published"), isNull(shopProducts.status))
          )
        );
      for (const row of dbRows) {
        const priceKes = Number(String(row.price).replace(/[^\d.]/g, "")) || 0;
        byId.set(row.id, {
          id: row.id,
          name: row.name,
          category: row.category as ProductItem["category"],
          priceKes,
          condition: (row.condition as ProductItem["condition"]) || "Ex-UK Grade A",
          warranty: row.warranty || "6 Months Warranty",
          specs: [],
          image: row.imageUrl || "",
          description: row.description,
          inStock: true,
        });
      }
    } catch {}
  }

  return Array.from(byId.values());
}

export async function saveOrder(order: ShopOrder): Promise<ShopOrder> {
  const store = await readStore();
  store.orders.unshift(order);
  await writeStore(store);

  if (process.env.DATABASE_URL) {
    try {
      await ensurePostgresTables();
      await pool.query(
        `INSERT INTO zollani_shop_orders (id, order_number, receipt_number, customer_phone_norm, payload)
         VALUES ($1, $2, $3, $4, $5::jsonb)
         ON CONFLICT (order_number) DO UPDATE SET payload = EXCLUDED.payload`,
        [
          order.id,
          order.orderNumber,
          order.receiptNumber,
          normalizePhone(order.customerPhone),
          JSON.stringify(order),
        ]
      );
    } catch (err) {
      console.warn("[CommerceStore] Postgres saveOrder note:", err instanceof Error ? err.message : err);
    }
  }

  return order;
}

export async function getOrderByCode(code: string): Promise<ShopOrder | null> {
  const clean = code.trim().toUpperCase();
  if (!clean) return null;

  if (process.env.DATABASE_URL) {
    try {
      await ensurePostgresTables();
      const res = await pool.query(
        `SELECT payload FROM zollani_shop_orders WHERE UPPER(order_number) = $1 OR UPPER(receipt_number) = $1 LIMIT 1`,
        [clean]
      );
      if (res.rows[0]?.payload) {
        return res.rows[0].payload as ShopOrder;
      }
    } catch {}
  }

  const store = await readStore();
  return (
    store.orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.receiptNumber.toUpperCase() === clean ||
        o.id.toUpperCase() === clean
    ) ?? null
  );
}

export async function saveRepairTicket(ticket: RepairTicket): Promise<RepairTicket> {
  const store = await readStore();
  store.repairs.unshift(ticket);
  await writeStore(store);

  if (process.env.DATABASE_URL) {
    try {
      await ensurePostgresTables();
      await pool.query(
        `INSERT INTO zollani_repair_tickets (id, ticket_number, customer_phone_norm, payload)
         VALUES ($1, $2, $3, $4::jsonb)
         ON CONFLICT (ticket_number) DO UPDATE SET payload = EXCLUDED.payload`,
        [
          ticket.id,
          ticket.ticketNumber,
          normalizePhone(ticket.customerPhone),
          JSON.stringify(ticket),
        ]
      );
    } catch (err) {
      console.warn("[CommerceStore] Postgres saveRepairTicket note:", err instanceof Error ? err.message : err);
    }
  }

  return ticket;
}

export async function searchTrackingRecords(query: string): Promise<{
  orders: ShopOrder[];
  repairs: RepairTicket[];
}> {
  const clean = query.trim();
  if (!clean) return { orders: [], repairs: [] };

  const upper = clean.toUpperCase();
  const phoneNorm = normalizePhone(clean);
  const isPhoneSearch = phoneNorm.length >= 9 && /^\+?[\d\s()-]+$/.test(clean);

  const ordersMap = new Map<string, ShopOrder>();
  const repairsMap = new Map<string, RepairTicket>();

  if (process.env.DATABASE_URL) {
    try {
      await ensurePostgresTables();
      if (isPhoneSearch) {
        const [ordRes, repRes] = await Promise.all([
          pool.query(`SELECT payload FROM zollani_shop_orders WHERE customer_phone_norm = $1 ORDER BY created_at DESC LIMIT 10`, [phoneNorm]),
          pool.query(`SELECT payload FROM zollani_repair_tickets WHERE customer_phone_norm = $1 ORDER BY created_at DESC LIMIT 10`, [phoneNorm]),
        ]);
        for (const r of ordRes.rows) ordersMap.set(r.payload.orderNumber, r.payload);
        for (const r of repRes.rows) repairsMap.set(r.payload.ticketNumber, r.payload);
      } else {
        const [ordRes, repRes] = await Promise.all([
          pool.query(`SELECT payload FROM zollani_shop_orders WHERE UPPER(order_number) = $1 OR UPPER(receipt_number) = $1 LIMIT 5`, [upper]),
          pool.query(`SELECT payload FROM zollani_repair_tickets WHERE UPPER(ticket_number) = $1 LIMIT 5`, [upper]),
        ]);
        for (const r of ordRes.rows) ordersMap.set(r.payload.orderNumber, r.payload);
        for (const r of repRes.rows) repairsMap.set(r.payload.ticketNumber, r.payload);
      }
    } catch {}
  }

  const store = await readStore();
  for (const ord of store.orders) {
    const matchesCode =
      ord.orderNumber.toUpperCase() === upper || ord.receiptNumber.toUpperCase() === upper;
    const matchesPhone = isPhoneSearch && normalizePhone(ord.customerPhone) === phoneNorm;
    if (matchesCode || matchesPhone) {
      ordersMap.set(ord.orderNumber, ord);
    }
  }

  for (const rep of store.repairs) {
    const matchesCode = rep.ticketNumber.toUpperCase() === upper;
    const matchesPhone = isPhoneSearch && normalizePhone(rep.customerPhone) === phoneNorm;
    if (matchesCode || matchesPhone) {
      repairsMap.set(rep.ticketNumber, rep);
    }
  }

  return {
    orders: Array.from(ordersMap.values()),
    repairs: Array.from(repairsMap.values()),
  };
}
