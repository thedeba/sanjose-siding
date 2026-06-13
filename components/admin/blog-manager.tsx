"use client";

import { useState } from "react";
import { createBlog, updateBlog, deleteBlog } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
};

type BlogManagerProps = {
  initialBlogs: Blog[];
};

export function BlogManager({ initialBlogs }: BlogManagerProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Blog ID or 'new'

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("Guides");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setFeaturedImage("https://res.cloudinary.com/demo/image/upload/v1/blog-placeholder.jpg");
    setMetaTitle("");
    setMetaDescription("");
    setCategory("Guides");
    setStatus("DRAFT");
    setIsEditing("new");
    setMessage(null);
  };

  const handleOpenEdit = (post: Blog) => {
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setFeaturedImage(post.featuredImage);
    setMetaTitle(post.metaTitle);
    setMetaDescription(post.metaDescription);
    setCategory(post.category);
    setStatus(post.status);
    setIsEditing(post.id);
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
        slug,
        excerpt,
        content,
        featuredImage,
        metaTitle,
        metaDescription,
        category,
        status,
      };

      if (isEditing === "new") {
        const result = await createBlog(data);
        if (result.success) {
          window.location.reload();
        }
      } else if (isEditing) {
        const result = await updateBlog(isEditing, data);
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
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setLoading(true);

    try {
      const result = await deleteBlog(id);
      if (result.success) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete blog post.");
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
            <Plus className="h-4 w-4" /> Add Blog Post
          </Button>
        )}
      </div>

      {/* Editor Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {isEditing === "new" ? "Create New Blog Post" : "Edit Blog Post"}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to Maintain Vinyl Siding"
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
                placeholder="e.g. maintain-vinyl-siding"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
              <Input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary showing up on the lists page..."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Siding Maintenance..."
                required
                rows={8}
                className="border-white/10 bg-slate-950/80 text-white min-h-[180px]"
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
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Guides, Materials, Maintenance, etc."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Publish Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTitle">SEO Meta Title</Label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO search result title"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">SEO Meta Description</Label>
              <Input
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO search summary snippet"
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
              <Check className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Post"}
            </Button>
          </div>
        </form>
      )}

      {/* Blogs List */}
      <div className="grid gap-4">
        {blogs.map((post) => (
          <Card key={post.id} className="border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                  <span className="text-xs text-slate-500">({post.slug})</span>
                </div>
                <p className="text-sm text-slate-400">{post.category} • {post.status}</p>
                <p className="text-xs text-slate-500 max-w-2xl truncate">{post.excerpt}</p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold tracking-wider uppercase ${
                  post.status === "PUBLISHED" ? "bg-cyan-500/10 text-cyan-400" : "bg-white/5 text-slate-500"
                }`}>
                  {post.status}
                </span>
                <Button
                  onClick={() => handleOpenEdit(post)}
                  className="!p-2.5 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(post.id)}
                  className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {blogs.length === 0 && (
          <div className="text-center py-10 text-slate-500">No blog posts found. Click Add Blog Post to write one.</div>
        )}
      </div>
    </div>
  );
}
