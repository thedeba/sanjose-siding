"use client";

import { useState } from "react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2, Edit2, X, Check, Star } from "lucide-react";

type Testimonial = {
  id: string;
  customerName: string;
  city: string;
  review: string;
  rating: number;
  image: string;
};

type TestimonialManagerProps = {
  initialTestimonials: Testimonial[];
};

export function TestimonialManager({ initialTestimonials }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Testimonial ID or 'new'

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setCustomerName("");
    setCity("");
    setReview("");
    setRating(5);
    setImage("https://res.cloudinary.com/demo/image/upload/v1/testimonial-placeholder.jpg");
    setIsEditing("new");
    setMessage(null);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setCustomerName(t.customerName);
    setCity(t.city);
    setReview(t.review);
    setRating(t.rating);
    setImage(t.image);
    setIsEditing(t.id);
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
      if (isEditing === "new") {
        const result = await createTestimonial({ customerName, city, review, rating, image });
        if (result.success) {
          window.location.reload();
        }
      } else if (isEditing) {
        const result = await updateTestimonial(isEditing, { customerName, city, review, rating, image });
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
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setLoading(true);

    try {
      const result = await deleteTestimonial(id);
      if (result.success) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete testimonial.");
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
            <Plus className="h-4 w-4" /> Add Testimonial
          </Button>
        )}
      </div>

      {/* Editor Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {isEditing === "new" ? "Add New Testimonial" : "Edit Testimonial"}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Maria R."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. San Jose"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="review">Review Text</Label>
              <Textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="The team was prompt and professional..."
                required
                rows={4}
                className="border-white/10 bg-slate-950/80 text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (Stars)</Label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value) || 5)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
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
              <Check className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Testimonial"}
            </Button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className="grid gap-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-3 max-w-4xl">
                <div className="flex items-center gap-3">
                  {t.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={t.image} 
                      alt={t.customerName} 
                      className="h-10 w-10 rounded-full object-cover border border-white/10" 
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-white">{t.customerName}</h2>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-600"}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-300">{t.review}</p>
              </div>

              {/* Actions panel */}
              <div className="flex gap-2 self-end md:self-start">
                <Button
                  onClick={() => handleOpenEdit(t)}
                  className="!p-2.5 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(t.id)}
                  className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <div className="text-center py-10 text-slate-500">No testimonials found. Click Add Testimonial to create one.</div>
        )}
      </div>
    </div>
  );
}
