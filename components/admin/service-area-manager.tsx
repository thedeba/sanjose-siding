"use client";

import { useState } from "react";
import { createServiceArea, updateServiceArea, deleteServiceArea } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

type ServiceArea = {
  id: string;
  cityName: string;
  slug: string;
  heroTitle: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
};

type ServiceAreaManagerProps = {
  initialAreas: ServiceArea[];
};

export function ServiceAreaManager({ initialAreas }: ServiceAreaManagerProps) {
  const [areas, setAreas] = useState<ServiceArea[]>(initialAreas);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Area ID or 'new'

  // Form States
  const [cityName, setCityName] = useState("");
  const [slug, setSlug] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [published, setPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setCityName("");
    setSlug("");
    setHeroTitle("");
    setContent("");
    setSeoTitle("");
    setSeoDescription("");
    setPublished(true);
    setIsEditing("new");
    setMessage(null);
  };

  const handleOpenEdit = (area: ServiceArea) => {
    setCityName(area.cityName);
    setSlug(area.slug);
    setHeroTitle(area.heroTitle);
    setContent(area.content);
    setSeoTitle(area.seoTitle);
    setSeoDescription(area.seoDescription);
    setPublished(area.published);
    setIsEditing(area.id);
    setMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = {
        cityName,
        slug,
        heroTitle,
        content,
        seoTitle,
        seoDescription,
        published,
      };

      if (isEditing === "new") {
        const result = await createServiceArea(data);
        if (result.success) {
          window.location.reload();
        }
      } else if (isEditing) {
        const result = await updateServiceArea(isEditing, data);
        if (result.success) {
          window.location.reload();
        }
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred while saving.", success: false });
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service area?")) return;
    setLoading(true);

    try {
      const result = await deleteServiceArea(id);
      if (result.success) {
        setAreas(areas.filter((area) => area.id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete service area.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex justify-end">
        {isEditing !== "new" && (
          <Button
            onClick={handleOpenNew}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-2xl transition-all duration-300"
          >
            <Plus className="h-4 w-4" /> Add Service Area
          </Button>
        )}
      </div>

      {/* Editor Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {isEditing === "new" ? "Create New Service Area" : "Edit Service Area"}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cityName">City Name</Label>
              <Input
                id="cityName"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="e.g. San Jose"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL parameter)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. san-jose"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="e.g. San Jose siding solutions with local craftsmanship."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Content Description</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your neighborhood siding experts, offering fast inspections..."
                required
                rows={6}
                className="border-white/10 bg-slate-950/80 text-white min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="e.g. San Jose Siding Contractor"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Input
                id="seoDescription"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Top-rated siding contractor in San Jose offering..."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 md:col-span-2">
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-5 w-5 rounded border-white/10 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
              />
              <Label htmlFor="published" className="cursor-pointer text-sm font-medium text-slate-300 select-none">
                Publish this service area page
              </Label>
            </div>
          </div>

          {message && (
            <div className="rounded-xl px-4 py-3 text-sm font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {message.text}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="border border-white/10 bg-slate-950 hover:bg-slate-900 text-white rounded-xl"
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-xl"
            >
              <Check className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Area"}
            </Button>
          </div>
        </form>
      )}

      {/* Areas List */}
      <div className="grid gap-4">
        {areas.map((area) => (
          <Card key={area.id} className="border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">{area.cityName}</h3>
                  <span className="text-xs text-slate-500">({area.slug})</span>
                </div>
                <p className="text-sm text-slate-400">{area.heroTitle}</p>
                <p className="text-xs text-slate-500 max-w-2xl truncate">{area.content}</p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold tracking-wider uppercase ${
                  area.published ? "bg-cyan-500/10 text-cyan-400" : "bg-white/5 text-slate-500"
                }`}>
                  {area.published ? "Published" : "Draft"}
                </span>
                <Button
                  onClick={() => handleOpenEdit(area)}
                  className="!p-2.5 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white rounded-xl"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(area.id)}
                  className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {areas.length === 0 && (
          <div className="text-center py-10 text-slate-500">No service areas found. Click Add Service Area to define one.</div>
        )}
      </div>
    </div>
  );
}
