"use client";

import { useState } from "react";
import { createNavigationItem, updateNavigationItem, deleteNavigationItem } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

type NavigationItem = {
  id: string;
  title: string;
  url: string;
  position: number;
};

type NavigationManagerProps = {
  initialItems: NavigationItem[];
};

export function NavigationManager({ initialItems }: NavigationManagerProps) {
  const [items, setItems] = useState<NavigationItem[]>(initialItems);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Item ID or 'new'

  // Form States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setTitle("");
    setUrl("");
    // Default position to next incremental integer
    const maxPos = items.reduce((max, item) => (item.position > max ? item.position : max), 0);
    setPosition(maxPos + 1);
    setIsEditing("new");
    setMessage(null);
  };

  const handleOpenEdit = (item: NavigationItem) => {
    setTitle(item.title);
    setUrl(item.url);
    setPosition(item.position);
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
        url,
        position: Number(position),
      };

      if (isEditing === "new") {
        const result = await createNavigationItem(data);
        if (result.success) {
          window.location.reload();
        }
      } else if (isEditing) {
        const result = await updateNavigationItem(isEditing, data);
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
    if (!confirm("Are you sure you want to delete this navigation item?")) return;
    setLoading(true);

    try {
      const result = await deleteNavigationItem(id);
      if (result.success) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete navigation item.");
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
            <Plus className="h-4 w-4" /> Add Navigation Item
          </Button>
        )}
      </div>

      {/* Editor Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {isEditing === "new" ? "Add Navigation Item" : "Edit Navigation Item"}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="title">Link Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Services"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="url">URL Path</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. /services or https://..."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Display Position (Order)</Label>
              <Input
                id="position"
                type="number"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                placeholder="e.g. 1"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
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

      {/* Navigation List */}
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.url}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-wider text-cyan-400">
                  Position {item.position}
                </span>
                <Button
                  onClick={() => handleOpenEdit(item)}
                  className="!p-2.5 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white rounded-xl"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="text-center py-10 text-slate-500">No navigation items found. Click Add Navigation Item to create one.</div>
        )}
      </div>
    </div>
  );
}
