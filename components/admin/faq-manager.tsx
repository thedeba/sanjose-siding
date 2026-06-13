"use client";

import { useState } from "react";
import { createFAQ, updateFAQ, deleteFAQ } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
};

type FAQManagerProps = {
  initialFAQs: FAQ[];
};

export function FAQManager({ initialFAQs }: FAQManagerProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isEditing, setIsEditing] = useState<string | null>(null); // FAQ ID or 'new'
  
  // Form States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [sortOrder, setSortOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleOpenNew = () => {
    setQuestion("");
    setAnswer("");
    setCategory("General");
    setSortOrder(faqs.length + 1);
    setIsEditing("new");
    setMessage(null);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setSortOrder(faq.sortOrder);
    setIsEditing(faq.id);
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
        const result = await createFAQ({ question, answer, category, sortOrder });
        if (result.success) {
          // Re-fetch or locally append if needed, but since server actions use revalidatePath, 
          // a simple refresh or local state push is good. We append a mock ID first or force reload.
          // For immediate client response:
          window.location.reload();
        }
      } else if (isEditing) {
        const result = await updateFAQ(isEditing, { question, answer, category, sortOrder });
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
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    setLoading(true);
    
    try {
      const result = await deleteFAQ(id);
      if (result.success) {
        setFaqs(faqs.filter(faq => faq.id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete FAQ.");
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
            <Plus className="h-4 w-4" /> Add FAQ
          </Button>
        )}
      </div>

      {/* Editor Panel (inline at top when editing/new) */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            {isEditing === "new" ? "Create New FAQ" : "Edit FAQ"}
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input 
                id="question" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                placeholder="What is your policy on...?" 
                required 
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea 
                id="answer" 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)} 
                placeholder="We offer..." 
                required 
                rows={4}
                className="border-white/10 bg-slate-950/80 text-white min-h-[100px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="e.g. Warranty, Pricing" 
                  required 
                  className="border-white/10 bg-slate-950/80 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input 
                  id="sortOrder" 
                  type="number"
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)} 
                  required 
                  className="border-white/10 bg-slate-950/80 text-white"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className="rounded-xl px-4 py-3 text-sm font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {message.text}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
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
              <Check className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save FAQ"}
            </Button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="relative overflow-hidden border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2 max-w-4xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                    {faq.category}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                    Order: {faq.sortOrder}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-sm leading-6 text-slate-300">{faq.answer}</p>
              </div>

              {/* Actions panel */}
              <div className="flex gap-2 self-end md:self-start">
                <Button 
                  onClick={() => handleOpenEdit(faq)}
                  className="!p-2.5 bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => handleDelete(faq.id)}
                  className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {faqs.length === 0 && (
          <div className="text-center py-10 text-slate-500">No FAQs found. Click Add FAQ to create one.</div>
        )}
      </div>
    </div>
  );
}
