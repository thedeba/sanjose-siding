"use client";

import { useState } from "react";
import { createService, updateService, deleteService } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullContent: string;
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  order: number;
  published: boolean;
};

type ServiceManagerProps = {
  initialServices: Service[];
};

export function ServiceManager({ initialServices }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setEditingId("new");
    setTitle("");
    setSlug("");
    setIcon("Layers");
    setShortDescription("");
    setFullContent("");
    setFeaturedImage("");
    setSeoTitle("");
    setSeoDescription("");
    setOrder(services.length + 1);
    setPublished(true);
    setMessage(null);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setSlug(service.slug);
    setIcon(service.icon);
    setShortDescription(service.shortDescription);
    setFullContent(service.fullContent);
    setFeaturedImage(service.featuredImage);
    setSeoTitle(service.seoTitle);
    setSeoDescription(service.seoDescription);
    setOrder(service.order);
    setPublished(service.published);
    setMessage(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setMessage(null);

    try {
      const data = {
        title,
        slug,
        icon,
        shortDescription,
        fullContent,
        featuredImage,
        seoTitle,
        seoDescription,
        published,
        order,
      };

      if (editingId === "new") {
        const result = await createService(data);
        if (result.success) {
          window.location.reload();
        }
      } else {
        const result = await updateService(editingId, data);
        if (result.success) {
          window.location.reload();
        }
      }
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : "An error occurred while saving.", success: false });
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service? All detailed pages under this slug will no longer be active.")) return;
    setLoading(true);
    
    try {
      const result = await deleteService(id);
      if (result.success) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex justify-end">
        {editingId !== "new" && (
          <Button 
            onClick={handleOpenNew} 
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-2xl transition-all duration-300"
          >
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        )}
      </div>

      {/* Editor Panel */}
      {editingId && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {editingId === "new" ? "Create New Service" : "Edit Service"}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (editingId === "new") {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                  }
                }} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL identifier)</Label>
              <Input 
                id="slug" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Lucide Icon Name</Label>
              <Input 
                id="icon" 
                value={icon} 
                onChange={(e) => setIcon(e.target.value)} 
                placeholder="e.g. Layers, Tool, Sparkles, AlertCircle"
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Sort Order</Label>
              <Input 
                id="order" 
                type="number"
                value={order} 
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="shortDescription">Short Description (for preview cards)</Label>
              <Input 
                id="shortDescription" 
                value={shortDescription} 
                onChange={(e) => setShortDescription(e.target.value)} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullContent">Full Page Content</Label>
              <Textarea 
                id="fullContent" 
                value={fullContent} 
                onChange={(e) => setFullContent(e.target.value)} 
                required 
                rows={5}
                className="border-white/10 bg-slate-950/80 text-white min-h-[120px]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input 
                id="featuredImage" 
                value={featuredImage} 
                onChange={(e) => setFeaturedImage(e.target.value)} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input 
                id="seoTitle" 
                value={seoTitle} 
                onChange={(e) => setSeoTitle(e.target.value)} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Meta Description</Label>
              <Input 
                id="seoDescription" 
                value={seoDescription} 
                onChange={(e) => setSeoDescription(e.target.value)} 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-8 md:col-span-2">
              <input 
                id="published" 
                type="checkbox"
                checked={published} 
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-slate-950 text-cyan-500 focus:ring-0 focus:ring-offset-0"
              />
              <Label htmlFor="published" className="cursor-pointer">Publish on website</Label>
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
              <Check className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Service"}
            </Button>
          </div>
        </form>
      )}

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">{service.title}</h2>
                  <span className="text-xs text-slate-400">({service.slug})</span>
                </div>
                <p className="text-sm text-slate-400">{service.shortDescription}</p>
                <div className="flex gap-4 pt-1 text-xs text-slate-500">
                  <span>Order: {service.order}</span>
                  <span>•</span>
                  <span>Icon: {service.icon}</span>
                  <span>•</span>
                  <span>SEO Title: {service.seoTitle}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold tracking-wider uppercase ${
                  service.published ? "bg-cyan-500/10 text-cyan-400" : "bg-white/5 text-slate-500"
                }`}>
                  {service.published ? "Published" : "Draft"}
                </span>
                <Button 
                  onClick={() => handleOpenEdit(service)}
                  className="!p-2.5 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => handleDelete(service.id)}
                  className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
