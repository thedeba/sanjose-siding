"use client";

import { useState } from "react";
import { createGallery, updateGallery, deleteGallery } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeAfter: boolean;
};

type GalleryManagerProps = {
  initialPhotos: GalleryItem[];
};

export function GalleryManager({ initialPhotos }: GalleryManagerProps) {
  const [photos, setPhotos] = useState<GalleryItem[]>(initialPhotos);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Gallery ID or 'new'

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [beforeAfter, setBeforeAfter] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setTitle("");
    setCategory("");
    setImage("https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80");
    setBeforeAfter(false);
    setIsEditing("new");
    setMessage(null);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
    setBeforeAfter(item.beforeAfter);
    setIsEditing(item.id);
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
        title,
        category,
        image,
        beforeAfter,
      };

      if (isEditing === "new") {
        const result = await createGallery(data);
        if (result.success) {
          window.location.reload();
        }
      } else if (isEditing) {
        const result = await updateGallery(isEditing, data);
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
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    setLoading(true);

    try {
      const result = await deleteGallery(id);
      if (result.success) {
        setPhotos(photos.filter((photo) => photo.id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete gallery item.");
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
            <Plus className="h-4 w-4" /> Add Gallery Item
          </Button>
        )}
      </div>

      {/* Editor Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {isEditing === "new" ? "Add Gallery Item" : "Edit Gallery Item"}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Siding Project in San Jose"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Vinyl Siding, Before/After, Repairs"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL from Unsplash/Cloudinary..."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 md:col-span-2">
              <input
                id="beforeAfter"
                type="checkbox"
                checked={beforeAfter}
                onChange={(e) => setBeforeAfter(e.target.checked)}
                className="h-5 w-5 rounded border-white/10 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
              />
              <Label htmlFor="beforeAfter" className="cursor-pointer text-sm font-medium text-slate-300 select-none">
                Show as Before/After Comparison
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
              <Check className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Item"}
            </Button>
          </div>
        </form>
      )}

      {/* Gallery List */}
      <div className="grid gap-4 md:grid-cols-2">
        {photos.map((item) => (
          <Card key={item.id} className="border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900/80 transition-all duration-300 flex gap-4">
            {item.image && (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-between flex-grow min-w-0">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.category}</p>
                {item.beforeAfter && (
                  <span className="inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-400 uppercase">
                    Before / After
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button
                  onClick={() => handleOpenEdit(item)}
                  className="!p-2 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white rounded-lg"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className="!p-2 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {photos.length === 0 && (
          <div className="col-span-full text-center py-10 text-slate-500">No gallery items found. Click Add Gallery Item to add one.</div>
        )}
      </div>
    </div>
  );
}
