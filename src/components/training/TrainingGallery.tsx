"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  INITIAL_TRAINING_PHOTOS,
  TrainingPhoto,
} from "@/data/trainingGalleryData";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Calendar,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertCircle,
  Plus,
  ZoomIn,
} from "lucide-react";

export const TrainingGallery: React.FC = () => {
  const [photos, setPhotos] = useState<TrainingPhoto[]>(INITIAL_TRAINING_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [cohort, setCohort] = useState("");
  const [category, setCategory] = useState<TrainingPhoto["category"]>("ai-msingi");
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load any previously uploaded photos from API on mount
  useEffect(() => {
    async function loadUploadedPhotos() {
      try {
        const res = await fetch("/api/upload/training");
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          // Merge uploaded items with initial photos (avoiding duplicates)
          const uploadedIds = new Set(data.items.map((i: any) => i.id));
          const remainingInitial = INITIAL_TRAINING_PHOTOS.filter((p) => !uploadedIds.has(p.id));
          setPhotos([...data.items, ...remainingInitial]);
        }
      } catch (e) {
        console.error("Could not fetch remote gallery:", e);
      }
    }
    loadUploadedPhotos();
  }, []);

  // Filter photos
  const filteredPhotos = photos.filter((p) =>
    activeCategory === "all" ? true : p.category === activeCategory
  );

  // Handle file selection
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }
    setUploadError("");
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please choose an image to upload.");
      return;
    }

    setIsSubmitting(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title || "Training Moment");
      formData.append("cohort", cohort || "Youth & Skills Cohort");
      formData.append("category", category);
      formData.append("location", location);
      formData.append("description", description);

      const res = await fetch("/api/upload/training", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to upload photo.");
      }

      // Prepend newly uploaded photo
      setPhotos([json.item, ...photos]);
      setUploadSuccess(true);

      // Reset form after short delay
      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadSuccess(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        setTitle("");
        setCohort("");
        setDescription("");
      }, 1200);
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredPhotos.length]);

  return (
    <div className="space-y-8">
      {/* Top Gallery Header & Upload Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cream-border">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-teal-brand bg-teal-subtle px-3.5 py-1 rounded-full">
            Field Documentation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark mt-2 tracking-tight">
            Training &amp; Workshops in Action
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Real snapshots from our AI Msingi cohorts, TVET partnerships, and corporate cyber labs.
          </p>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-coral-brand hover:bg-coral-hover text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 self-start md:self-auto cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Training Photo</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", label: "All Activities" },
          { id: "ai-msingi", label: "AI Msingi Youth" },
          { id: "hardware-lab", label: "Electronics & Repair Lab" },
          { id: "corporate", label: "Corporate Cybersecurity" },
          { id: "college-tvet", label: "College & TVET Partnerships" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === tab.id
                ? "bg-teal-brand text-white shadow-xs"
                : "bg-white text-brand-slate border border-cream-border hover:bg-cream-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Modern Responsive Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(idx)}
            className="group relative bg-white rounded-3xl overflow-hidden border border-cream-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative h-60 w-full overflow-hidden bg-cream-surface">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="bg-teal-deep/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {item.cohort}
                </span>
                {item.isUserUploaded && (
                  <span className="bg-coral-brand text-white text-[10px] font-black px-2 py-1 rounded-lg">
                    New
                  </span>
                )}
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Content Bottom Card */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-black text-brand-dark group-hover:text-teal-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-cream-border flex items-center justify-between text-[11px] text-brand-slate">
                <span className="flex items-center gap-1 text-teal-brand font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[140px]">{item.location}</span>
                </span>
                <span className="flex items-center gap-1 text-brand-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL DIALOG */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-cream-border relative my-8 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-5 right-5 text-brand-muted hover:text-brand-dark p-1.5 rounded-full hover:bg-cream-bg"
              aria-label="Close upload modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-coral-brand bg-coral-light px-3 py-1 rounded-full">
                Contribute to Gallery
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-2">
                Upload Training Activity Photo
              </h3>
              <p className="text-xs text-brand-muted mt-1">
                Add photos from active workshops, student sessions, or corporate cybersecurity bootcamps.
              </p>
            </div>

            {uploadSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-brand-dark">Photo Added!</h4>
                <p className="text-xs text-brand-muted">
                  Your photo is now live in the training documentation gallery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {uploadError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Drag and drop upload zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    previewUrl
                      ? "border-teal-brand bg-teal-subtle/20"
                      : "border-cream-border hover:border-teal-brand hover:bg-cream-surface"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />

                  {previewUrl ? (
                    <div className="space-y-2">
                      <div className="relative h-40 w-full rounded-xl overflow-hidden shadow-inner mx-auto">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs text-teal-brand font-bold">
                        Click or drag to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-subtle text-teal-brand flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-dark block">
                          Click to browse or drag photo here
                        </span>
                        <span className="text-[11px] text-brand-muted">
                          Supports PNG, JPG, or WebP (max 10MB)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Metadata Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-slate mb-1">
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Micro-soldering Workshop"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-border focus:border-teal-brand outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-slate mb-1">
                      Cohort / Program *
                    </label>
                    <input
                      type="text"
                      required
                      value={cohort}
                      onChange={(e) => setCohort(e.target.value)}
                      placeholder="e.g. AI Msingi Cohort 4"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-border focus:border-teal-brand outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-slate mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-border focus:border-teal-brand outline-none bg-white"
                    >
                      <option value="ai-msingi">AI Msingi Youth</option>
                      <option value="hardware-lab">Electronics &amp; Repair Lab</option>
                      <option value="college-tvet">College &amp; TVET Partnership</option>
                      <option value="corporate">Corporate Cybersecurity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-slate mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Nairobi, Kenya"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-border focus:border-teal-brand outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-slate mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide context about what students or trainees achieved..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-border focus:border-teal-brand outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedFile}
                  className="w-full flex items-center justify-center gap-2 bg-coral-brand hover:bg-coral-hover disabled:opacity-50 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isSubmitting ? "Uploading Photo..." : "Publish to Gallery"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && filteredPhotos[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={() =>
              setActiveLightboxIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={() =>
              setActiveLightboxIndex((prev) =>
                prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div className="max-w-4xl w-full flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={filteredPhotos[activeLightboxIndex].imageUrl}
                alt={filteredPhotos[activeLightboxIndex].title}
                fill
                className="object-contain"
              />
            </div>

            {/* Description overlay */}
            <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-white border border-white/20 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-coral-brand text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {filteredPhotos[activeLightboxIndex].cohort}
                  </span>
                  <span className="text-xs text-white/70">
                    {filteredPhotos[activeLightboxIndex].location} · {filteredPhotos[activeLightboxIndex].date}
                  </span>
                </div>
                <span className="text-xs text-white/60 font-mono">
                  {activeLightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              <h4 className="text-lg font-bold">
                {filteredPhotos[activeLightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {filteredPhotos[activeLightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
