"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  ExternalLink,
  Phone,
  RefreshCw,
  ShoppingBag,
  SlidersHorizontal,
  Upload,
  ArrowUpRight,
  Shield,
  Copy,
  Check,
  Send,
  AlertTriangle,
  FileText,
  Search,
} from "lucide-react";
import type { ParsedWhatsAppProduct } from "@/lib/whatsapp-parser";
import {
  publishDraftAction,
  deleteDraftAction,
  saveProduct,
  deleteProduct,
  toggleProductVisibility,
} from "./actions";

interface AdminShopClientProps {
  initialDrafts: ParsedWhatsAppProduct[];
  initialPublished: any[];
}

export default function AdminShopClient({
  initialDrafts,
  initialPublished,
}: AdminShopClientProps) {
  const [activeTab, setActiveTab] = useState<"drafts" | "published" | "simulator">("drafts");
  const [drafts, setDrafts] = useState<ParsedWhatsAppProduct[]>(initialDrafts);
  const [published, setPublished] = useState<any[]>(initialPublished);
  const [editingDraft, setEditingDraft] = useState<ParsedWhatsAppProduct | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Simulator State
  const [simMessage, setSimMessage] = useState(
    "HP EliteBook 840 G7\nPrice: KES 48,000\nCategory: Refurbished Laptop\nSpecs: Core i5 10th Gen, 16GB DDR4 RAM, 512GB NVMe SSD, 14.0\" FHD Anti-Glare\nCondition: Certified Refurbished Grade A\nWarranty: 6 Months Warranty\nDescription: Clean business ultrabook with original 65W HP charger and licensed Windows 11 Pro."
  );
  const [simSender, setSimSender] = useState("+254768551914");
  const [simImageFile, setSimImageFile] = useState<File | null>(null);
  const [simImageUrl, setSimImageUrl] = useState("/images/pc-repair-workbench.jpg");
  const [simLoading, setSimLoading] = useState(false);
  const [simAlert, setSimAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Published filter
  const [searchPublished, setSearchPublished] = useState("");

  const handleCopyWebhookUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://zollani.co.ke";
    navigator.clipboard.writeText(`${origin}/api/whatsapp/webhook`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const loadSimSample = (sampleNum: number) => {
    if (sampleNum === 1) {
      setSimMessage(
        "Lenovo ThinkPad T480s Business Ultrabook\nKES 36,500\nCore i7 8th Gen vPro, 16GB RAM, 512GB SSD, Backlit Keyboard, Dual Battery\nCondition: Certified Refurbished Ex-UK\n6 Months Warranty\nSuper fast, durable magnesium casing, includes original charger."
      );
      setSimImageUrl("/images/hardware-motherboard.jpg");
    } else if (sampleNum === 2) {
      setSimMessage(
        "Custom Gaming PC Rig (RTX Edition)\nPrice: KES 88,000\nAMD Ryzen 5 5600X 6-Core, 16GB DDR4 3600MHz, 1TB NVMe PCIe Gen4 SSD, RTX 3060 12GB\nCondition: Brand New Custom Build\n1 Year Warranty\nTested with Cyberpunk 2077 and Apex Legends at high FPS. Liquid cooled."
      );
      setSimImageUrl("/images/gaming-pc-build.jpg");
    } else {
      setSimMessage(
        "Crucial 1TB NVMe M.2 SSD + 16GB DDR4 RAM Upgrade Bundle\nKES 14,000\nUpgrade kit for laptops and desktops. 3500MB/s read speed.\nCondition: Hardware Bundle\n1 Year Warranty\nIncludes free system clone, data migration, and internal thermal dust cleanout."
      );
      setSimImageUrl("/images/pc-repair-workbench.jpg");
    }
  };

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimLoading(true);
    setSimAlert(null);

    try {
      const formData = new FormData();
      formData.append("message", simMessage);
      formData.append("senderPhone", simSender);
      if (simImageFile) {
        formData.append("file", simImageFile);
      } else {
        formData.append("imageUrl", simImageUrl);
      }

      const res = await fetch("/api/whatsapp/simulate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Simulation failed");
      }

      setSimAlert({
        type: "success",
        text: `Success! Draft saved as "${data.draft.name}". It is now in the review queue.`,
      });

      // Add to local state and switch tab
      setDrafts((prev) => [data.draft, ...prev.filter((d) => d.id !== data.draft.id)]);
      setTimeout(() => {
        setActiveTab("drafts");
      }, 1000);
    } catch (err: any) {
      setSimAlert({ type: "error", text: err.message || "Failed to simulate" });
    } finally {
      setSimLoading(false);
    }
  };

  const handleQuickPublish = async (draft: ParsedWhatsAppProduct) => {
    const formData = new FormData();
    formData.append("id", draft.id);
    formData.append("name", draft.name);
    formData.append("price", draft.price);
    formData.append("category", draft.category);
    formData.append("description", draft.description);
    formData.append("imageUrl", draft.imageUrl);
    formData.append("condition", draft.condition);
    formData.append("warranty", draft.warranty);
    formData.append("specs", JSON.stringify(draft.specs));

    await publishDraftAction(formData);

    // Update UI state
    setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
    setPublished((prev) => [
      {
        ...draft,
        status: "published",
        isActive: true,
      },
      ...prev.filter((p) => p.id !== draft.id),
    ]);
  };

  const handleRejectDraft = async (id: string) => {
    if (!confirm("Are you sure you want to discard this draft?")) return;
    const formData = new FormData();
    formData.append("id", id);
    await deleteDraftAction(formData);
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const filteredPublished = published.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchPublished.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchPublished.toLowerCase())
  );

  return (
    <div className="surface-grid min-h-screen bg-cream-bg pb-20 text-brand-dark">
      {/* Top Banner */}
      <header className="border-b border-cream-border bg-white px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-subtle px-3 py-1 font-mono text-xs font-bold text-teal-brand">
                  <Shield className="h-3.5 w-3.5" />
                  Zollani Tech Admin
                </span>
                <span className="flex items-center gap-1 text-xs text-brand-muted">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  WhatsApp Webhook Active
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">
                Product Inventory & WhatsApp Review Desk
              </h1>
              <p className="mt-1 text-sm text-brand-muted">
                Incoming products sent to WhatsApp land here as drafts. Review, refine details, and publish safely to the live site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyWebhookUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-xs font-bold text-brand-slate hover:bg-cream-border/60 transition-colors"
                title="Copy Meta WhatsApp Webhook URL"
              >
                {copySuccess ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-teal-brand" />}
                {copySuccess ? "Copied Webhook URL!" : "Copy Webhook URL"}
              </button>

              <Link
                href="/shop"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-deep px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-dark transition-colors"
              >
                <Eye className="h-4 w-4" />
                View Live Shop
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              onClick={() => setActiveTab("drafts")}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                activeTab === "drafts"
                  ? "border-amber-400 bg-amber-50/70 shadow-sm"
                  : "border-cream-border bg-cream-surface hover:border-amber-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Pending Review Drafts
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                  {drafts.length}
                </span>
              </div>
              <p className="mt-2 text-2xl font-black text-brand-dark">{drafts.length} Drafts</p>
              <p className="text-xs text-brand-muted">WhatsApp messages waiting for publication</p>
            </div>

            <div
              onClick={() => setActiveTab("published")}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                activeTab === "published"
                  ? "border-teal-brand bg-teal-subtle/50 shadow-sm"
                  : "border-cream-border bg-cream-surface hover:border-teal-brand/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-brand">
                  Live on Website
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-brand text-xs font-black text-white">
                  {published.length}
                </span>
              </div>
              <p className="mt-2 text-2xl font-black text-brand-dark">{published.length} Products</p>
              <p className="text-xs text-brand-muted">Active and displayed on /shop</p>
            </div>

            <div
              onClick={() => setActiveTab("simulator")}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                activeTab === "simulator"
                  ? "border-coral-brand bg-coral-light/60 shadow-sm"
                  : "border-cream-border bg-cream-surface hover:border-coral-brand/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-coral-dark">
                  WhatsApp Simulator
                </span>
                <Sparkles className="h-5 w-5 text-coral-brand" />
              </div>
              <p className="mt-2 text-2xl font-black text-brand-dark">Test Inbound</p>
              <p className="text-xs text-brand-muted">Simulate sending products via WhatsApp</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-2 border-b border-cream-border">
            <button
              onClick={() => setActiveTab("drafts")}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "drafts"
                  ? "border-coral-brand text-coral-dark"
                  : "border-transparent text-brand-muted hover:text-brand-dark"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Inbound Drafts Review Queue
              {drafts.length > 0 && (
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
                  {drafts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("published")}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "published"
                  ? "border-coral-brand text-coral-dark"
                  : "border-transparent text-brand-muted hover:text-brand-dark"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Published Catalog ({published.length})
            </button>

            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "simulator"
                  ? "border-coral-brand text-coral-dark"
                  : "border-transparent text-brand-muted hover:text-brand-dark"
              }`}
            >
              <Sparkles className="h-4 w-4 text-coral-brand" />
              Test Inbound Simulator & Setup Guide
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        {/* TAB 1: DRAFTS REVIEW QUEUE */}
        {activeTab === "drafts" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-brand-dark">Awaiting Admin Review</h2>
                <p className="text-xs text-brand-muted">
                  These items were received via WhatsApp. Inspect photo, price, specs, and confirm before they go live.
                </p>
              </div>

              {drafts.length > 0 && (
                <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 border border-amber-300 rounded-lg px-3 py-1.5">
                  🛡️ Review step active: No draft is public until you click &quot;Approve &amp; Publish&quot;
                </span>
              )}
            </div>

            {drafts.length === 0 ? (
              <div className="rounded-3xl border border-cream-border bg-white p-12 text-center shadow-xs">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal-brand" />
                <h3 className="mt-4 text-xl font-bold text-brand-dark">Inbox Zero — All caught up!</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
                  No pending product drafts from WhatsApp. When a technician or staff member sends an image and text to the WhatsApp business line, it will appear here instantly.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveTab("simulator")}
                    className="inline-flex items-center gap-2 rounded-xl bg-coral-brand px-5 py-2.5 text-xs font-bold text-white hover:bg-coral-hover transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Try Simulator Now
                  </button>
                  <button
                    onClick={handleCopyWebhookUrl}
                    className="inline-flex items-center gap-2 rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-xs font-bold text-brand-slate hover:bg-cream-border"
                  >
                    Copy Meta Webhook Endpoint
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="overflow-hidden rounded-3xl border-2 border-amber-200 bg-white p-6 shadow-sm transition-all hover:border-amber-300 sm:p-8"
                  >
                    <div className="grid gap-8 lg:grid-cols-[260px_1fr_auto] lg:items-start">
                      {/* Photo preview */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream-bg border border-cream-border lg:w-[260px]">
                        <img
                          src={draft.imageUrl || "/images/pc-repair-workbench.jpg"}
                          alt={draft.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/pc-repair-workbench.jpg";
                          }}
                        />
                        <div className="absolute top-2 left-2 rounded-lg bg-black/75 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-xs">
                          Pending Review
                        </div>
                      </div>

                      {/* Extracted Details */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-lg bg-teal-subtle px-2.5 py-1 text-xs font-bold text-teal-brand uppercase">
                            {draft.category}
                          </span>
                          <span className="rounded-lg bg-cream-bg px-2.5 py-1 text-xs font-bold text-brand-slate border border-cream-border">
                            {draft.condition}
                          </span>
                          <span className="rounded-lg bg-cream-bg px-2.5 py-1 text-xs font-bold text-teal-brand border border-cream-border">
                            🛡️ {draft.warranty}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-black text-brand-dark">{draft.name}</h3>
                          <p className="mt-1 text-xl font-black text-coral-dark">{draft.price}</p>
                        </div>

                        {/* Specs badges */}
                        {draft.specs && draft.specs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {draft.specs.map((spec, i) => (
                              <span
                                key={i}
                                className="rounded-md bg-cream-surface border border-cream-border px-2.5 py-1 text-xs font-medium text-brand-slate"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-xs leading-relaxed text-brand-muted line-clamp-3">
                          {draft.description}
                        </p>

                        {/* WhatsApp Origin Metadata */}
                        <div className="flex flex-wrap items-center gap-4 rounded-xl bg-cream-surface border border-cream-border p-3 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-brand-slate">
                            <Phone className="h-3.5 w-3.5 text-teal-brand" />
                            From: {draft.senderPhone || "WhatsApp"}
                          </div>
                          <span className="text-brand-muted" suppressHydrationWarning>
                            Received: {new Date(draft.createdAt).toLocaleString()}
                          </span>
                          {draft.senderPhone && draft.senderPhone.startsWith("+") && (
                            <a
                              href={`https://wa.me/${draft.senderPhone.replace(/\+/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-teal-brand hover:underline"
                            >
                              Reply to sender on WhatsApp
                            </a>
                          )}
                        </div>

                        {/* Raw Message preview toggle */}
                        {draft.rawMessage && (
                          <details className="text-xs text-brand-muted">
                            <summary className="cursor-pointer font-bold hover:text-brand-dark">
                              View raw WhatsApp message text
                            </summary>
                            <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-cream-bg p-3 font-mono text-[11px] text-brand-slate border border-cream-border">
                              {draft.rawMessage}
                            </pre>
                          </details>
                        )}
                      </div>

                      {/* Review & Decision Actions */}
                      <div className="flex flex-col gap-3 lg:w-48 lg:border-l lg:border-cream-border lg:pl-6">
                        <button
                          type="button"
                          onClick={() => handleQuickPublish(draft)}
                          className="flex items-center justify-center gap-2 rounded-xl bg-teal-deep px-5 py-3.5 text-xs font-black text-white hover:bg-teal-dark shadow-sm transition-transform hover:-translate-y-0.5"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          Approve &amp; Publish
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingDraft(draft)}
                          className="flex items-center justify-center gap-2 rounded-xl border border-cream-border bg-cream-surface px-4 py-2.5 text-xs font-bold text-brand-slate hover:bg-cream-border/60 transition-colors"
                        >
                          <SlidersHorizontal className="h-3.5 w-3.5" />
                          Edit Before Publishing
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRejectDraft(draft.id)}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Discard / Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PUBLISHED CATALOG */}
        {activeTab === "published" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-brand-dark">Live Shop Inventory</h2>
                <p className="text-xs text-brand-muted">
                  Products currently visible to customers on the public /shop page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search published products..."
                    value={searchPublished}
                    onChange={(e) => setSearchPublished(e.target.value)}
                    className="rounded-xl border border-cream-border bg-white pl-9 pr-4 py-2 text-xs font-medium focus:outline-teal-brand"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredPublished.length === 0 ? (
                <div className="rounded-3xl border border-cream-border bg-white p-12 text-center">
                  <ShoppingBag className="mx-auto h-10 w-10 text-brand-muted" />
                  <p className="mt-3 font-bold text-brand-dark">No published products match your query.</p>
                </div>
              ) : (
                filteredPublished.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-cream-border bg-white p-5 shadow-xs md:flex-row md:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={prod.imageUrl || "/images/pc-repair-workbench.jpg"}
                        alt={prod.name}
                        className="h-16 w-20 rounded-xl object-cover border border-cream-border"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/pc-repair-workbench.jpg";
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-teal-subtle px-2 py-0.5 text-[10px] font-bold text-teal-brand uppercase">
                            {prod.category}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              prod.isActive
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {prod.isActive ? "🟢 Active on Shop" : "⚪ Hidden"}
                          </span>
                        </div>
                        <h4 className="mt-1 font-black text-brand-dark">{prod.name}</h4>
                        <p className="text-xs font-bold text-coral-dark">{prod.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          await toggleProductVisibility(prod.id, !prod.isActive);
                          setPublished((prev) =>
                            prev.map((p) => (p.id === prod.id ? { ...p, isActive: !p.isActive } : p))
                          );
                        }}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                          prod.isActive
                            ? "border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                            : "border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        }`}
                      >
                        {prod.isActive ? "Hide from Shop" : "Make Active"}
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (!confirm(`Delete "${prod.name}" permanently?`)) return;
                          const fd = new FormData();
                          fd.append("id", prod.id);
                          await deleteProduct(fd);
                          setPublished((prev) => prev.filter((p) => p.id !== prod.id));
                        }}
                        className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SIMULATOR & SETUP */}
        {activeTab === "simulator" && (
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Interactive Inbound Simulator */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-coral-brand" />
                <h2 className="text-xl font-black text-brand-dark">Test WhatsApp Inbound Simulator</h2>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                Simulate what happens when you send a product photo and text details to your WhatsApp business number. The message will be parsed and saved to the Review Queue as a Draft.
              </p>

              {/* Sample Quick Load */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[11px] font-bold text-brand-slate self-center">Try Samples:</span>
                <button
                  type="button"
                  onClick={() => loadSimSample(1)}
                  className="rounded-lg border border-cream-border bg-cream-surface px-2.5 py-1 text-xs font-semibold text-brand-slate hover:bg-cream-border"
                >
                  ThinkPad T480s
                </button>
                <button
                  type="button"
                  onClick={() => loadSimSample(2)}
                  className="rounded-lg border border-cream-border bg-cream-surface px-2.5 py-1 text-xs font-semibold text-brand-slate hover:bg-cream-border"
                >
                  Gaming PC Rig
                </button>
                <button
                  type="button"
                  onClick={() => loadSimSample(3)}
                  className="rounded-lg border border-cream-border bg-cream-surface px-2.5 py-1 text-xs font-semibold text-brand-slate hover:bg-cream-border"
                >
                  SSD + RAM Upgrade Kit
                </button>
              </div>

              {simAlert && (
                <div
                  className={`mt-4 rounded-xl p-3 text-xs font-bold flex items-center gap-2 ${
                    simAlert.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {simAlert.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                  )}
                  {simAlert.text}
                </div>
              )}

              <form onSubmit={handleRunSimulation} className="mt-6 space-y-4">
                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  Sender WhatsApp Phone Number
                  <input
                    type="text"
                    value={simSender}
                    onChange={(e) => setSimSender(e.target.value)}
                    required
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  Product Photo
                  <div className="flex gap-3 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSimImageFile(e.target.files?.[0] || null)}
                      className="rounded-xl border border-cream-border bg-cream-surface px-3 py-1.5 text-xs"
                    />
                    <span className="text-[11px] text-brand-muted">or URL below</span>
                  </div>
                  <input
                    type="text"
                    value={simImageUrl}
                    onChange={(e) => setSimImageUrl(e.target.value)}
                    placeholder="Image URL or fallback"
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  WhatsApp Message Text (or Photo Caption)
                  <textarea
                    rows={7}
                    value={simMessage}
                    onChange={(e) => setSimMessage(e.target.value)}
                    required
                    placeholder="Type or paste product name, price, specs, warranty..."
                    className="rounded-xl border border-cream-border bg-cream-surface p-3 font-mono text-xs leading-relaxed"
                  />
                </label>

                <button
                  type="submit"
                  disabled={simLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-coral-brand py-3 text-xs font-black text-white hover:bg-coral-hover transition-colors shadow-sm disabled:opacity-50"
                >
                  {simLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Parsing &amp; Saving Draft...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Simulate Incoming WhatsApp Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Meta Cloud API Setup Instructions */}
            <div className="rounded-3xl border border-cream-border bg-white p-6 shadow-sm sm:p-8 space-y-5">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-brand" />
                <h3 className="text-xl font-black text-brand-dark">Meta WhatsApp Webhook Setup Guide</h3>
              </div>
              <p className="text-xs leading-relaxed text-brand-muted">
                Connect your Meta WhatsApp Business Cloud API in 3 easy steps so whenever someone messages your business number, product drafts arrive automatically.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl bg-cream-surface border border-cream-border p-4">
                  <div className="flex items-center gap-2 font-black text-sm text-brand-dark">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-brand text-[10px] text-white">
                      1
                    </span>
                    Configure Meta Developer App Webhook
                  </div>
                  <p className="mt-2 text-xs text-brand-muted">
                    In your Meta App Dashboard under <strong>WhatsApp &gt; Configuration</strong>, set:
                  </p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                        Callback URL:
                      </span>
                      <div className="mt-1 flex items-center justify-between rounded-lg bg-white border border-cream-border px-3 py-1.5 font-mono text-xs">
                        <span>https://zollani.co.ke/api/whatsapp/webhook</span>
                        <button
                          type="button"
                          onClick={handleCopyWebhookUrl}
                          className="text-teal-brand hover:underline font-bold text-[11px]"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                        Verify Token:
                      </span>
                      <div className="mt-1 rounded-lg bg-white border border-cream-border px-3 py-1.5 font-mono text-xs">
                        zollani_whatsapp_webhook_2026
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-cream-surface border border-cream-border p-4">
                  <div className="flex items-center gap-2 font-black text-sm text-brand-dark">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-brand text-[10px] text-white">
                      2
                    </span>
                    Subscribe to Webhook Fields
                  </div>
                  <p className="mt-2 text-xs text-brand-muted">
                    Click <strong>Manage Webhook fields</strong> and check <code>messages</code>. This notifies the website every time an incoming text or image message is received.
                  </p>
                </div>

                <div className="rounded-2xl bg-cream-surface border border-cream-border p-4">
                  <div className="flex items-center gap-2 font-black text-sm text-brand-dark">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-brand text-[10px] text-white">
                      3
                    </span>
                    Environment Variables (Optional for Media Download)
                  </div>
                  <p className="mt-2 text-xs text-brand-muted">
                    Add these in your production host (e.g. Vercel) if you want automatic high-res media downloads from Meta:
                  </p>
                  <pre className="mt-2 rounded-lg bg-brand-dark p-3 text-[11px] font-mono text-cream-bg overflow-x-auto">
{`WHATSAPP_VERIFY_TOKEN=zollani_whatsapp_webhook_2026
WHATSAPP_ACCESS_TOKEN=EAA...
WHATSAPP_PHONE_NUMBER_ID=109283...
WHATSAPP_APP_SECRET=abc...`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EDIT MODAL BEFORE PUBLISHING */}
      {editingDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-cream-border pb-4">
              <div>
                <h3 className="text-xl font-black text-brand-dark">Edit Product Before Publishing</h3>
                <p className="text-xs text-brand-muted">Adjust any extracted details to make it look great on the site.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingDraft(null)}
                className="rounded-full p-1 text-brand-muted hover:bg-cream-bg hover:text-brand-dark"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                await publishDraftAction(fd);
                setDrafts((prev) => prev.filter((d) => d.id !== editingDraft.id));
                setPublished((prev) => [
                  {
                    ...editingDraft,
                    name: String(fd.get("name")),
                    price: String(fd.get("price")),
                    category: String(fd.get("category")),
                    condition: String(fd.get("condition")),
                    warranty: String(fd.get("warranty")),
                    description: String(fd.get("description")),
                    imageUrl: String(fd.get("imageUrl")),
                    status: "published",
                    isActive: true,
                  },
                  ...prev.filter((p) => p.id !== editingDraft.id),
                ]);
                setEditingDraft(null);
                setActiveTab("published");
              }}
              className="mt-6 space-y-4"
            >
              <input type="hidden" name="id" value={editingDraft.id} />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-bold text-brand-dark sm:col-span-2">
                  Product Name / Title
                  <input
                    name="name"
                    defaultValue={editingDraft.name}
                    required
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs font-bold"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  Price (KES)
                  <input
                    name="price"
                    defaultValue={editingDraft.price}
                    required
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs font-bold text-coral-dark"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  Category
                  <select
                    name="category"
                    defaultValue={editingDraft.category}
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  >
                    <option value="refurbished-laptop">Refurbished Laptops</option>
                    <option value="gaming-pc">Gaming PCs</option>
                    <option value="workstation">Workstations</option>
                    <option value="upgrade-kit">Upgrade Kits</option>
                    <option value="monitor">Monitors</option>
                    <option value="smart-home-camera">Smart Home Cameras</option>
                    <option value="mouse">Mice &amp; Peripherals</option>
                    <option value="desktop-cpu">Desktop CPUs</option>
                    <option value="mini-pc">Mini PCs</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  Condition
                  <select
                    name="condition"
                    defaultValue={editingDraft.condition}
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  >
                    <option value="Certified Refurbished">Certified Refurbished</option>
                    <option value="Brand New Custom Build">Brand New Custom Build</option>
                    <option value="Hardware Bundle">Hardware Bundle</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark">
                  Warranty
                  <input
                    name="warranty"
                    defaultValue={editingDraft.warranty}
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark sm:col-span-2">
                  Image URL
                  <input
                    name="imageUrl"
                    defaultValue={editingDraft.imageUrl}
                    required
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark sm:col-span-2">
                  Specs (comma or line separated)
                  <textarea
                    name="specs"
                    defaultValue={editingDraft.specs?.join(", ")}
                    rows={2}
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-brand-dark sm:col-span-2">
                  Full Description
                  <textarea
                    name="description"
                    defaultValue={editingDraft.description}
                    rows={4}
                    className="rounded-xl border border-cream-border bg-cream-surface px-3 py-2 text-xs"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-cream-border">
                <button
                  type="button"
                  onClick={() => setEditingDraft(null)}
                  className="rounded-xl border border-cream-border px-4 py-2 text-xs font-bold text-brand-slate"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-teal-deep px-5 py-2.5 text-xs font-black text-white hover:bg-teal-dark"
                >
                  Approve &amp; Publish to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
