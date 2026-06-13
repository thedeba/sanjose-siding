"use client";

import { useState } from "react";
import { updateHomepageSection } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Plus, Trash2, Check, HelpCircle } from "lucide-react";

type HomepageSection = {
  id: string;
  key: string;
  value: any;
};

type HomepageManagerProps = {
  initialSections: HomepageSection[];
};

export function HomepageManager({ initialSections }: HomepageManagerProps) {
  // Find sections
  const heroSection = initialSections.find((s) => s.key === "hero");
  const whyChooseSection = initialSections.find((s) => s.key === "whyChoose");

  // Hero form states
  const [heroHeadline, setHeroHeadline] = useState(heroSection?.value?.headline || "");
  const [heroSubheadline, setHeroSubheadline] = useState(heroSection?.value?.subheadline || "");

  // Why Choose form states
  const [bullets, setBullets] = useState<string[]>(whyChooseSection?.value?.bullets || []);

  const [loadingHero, setLoadingHero] = useState(false);
  const [loadingWhy, setLoadingWhy] = useState(false);
  const [messageHero, setMessageHero] = useState<{ text: string; success: boolean } | null>(null);
  const [messageWhy, setMessageWhy] = useState<{ text: string; success: boolean } | null>(null);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSection) return;
    setLoadingHero(true);
    setMessageHero(null);

    try {
      const result = await updateHomepageSection(heroSection.id, {
        headline: heroHeadline,
        subheadline: heroSubheadline,
      });

      if (result.success) {
        setMessageHero({ text: "Hero section updated successfully!", success: true });
      }
    } catch (err: any) {
      setMessageHero({ text: err.message || "Failed to update hero section.", success: false });
    } finally {
      setLoadingHero(false);
    }
  };

  const handleSaveWhy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whyChooseSection) return;
    setLoadingWhy(true);
    setMessageWhy(null);

    try {
      const result = await updateHomepageSection(whyChooseSection.id, {
        bullets: bullets.filter((b) => b.trim() !== ""),
      });

      if (result.success) {
        setMessageWhy({ text: "Why Choose section updated successfully!", success: true });
      }
    } catch (err: any) {
      setMessageWhy({ text: err.message || "Failed to update Why Choose section.", success: false });
    } finally {
      setLoadingWhy(false);
    }
  };

  const handleAddBullet = () => {
    setBullets([...bullets, ""]);
  };

  const handleRemoveBullet = (index: number) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  const handleBulletChange = (index: number, val: string) => {
    const updated = [...bullets];
    updated[index] = val;
    setBullets(updated);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section Edit Form */}
      {heroSection && (
        <form onSubmit={handleSaveHero} className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-semibold text-white">Hero Section</h2>
            <p className="text-sm text-slate-400">Manage the main copy that appears at the top of the homepage.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroHeadline">Headline</Label>
              <Input
                id="heroHeadline"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="e.g. Protect your home with premium siding"
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroSubheadline">Subheadline</Label>
              <Input
                id="heroSubheadline"
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                placeholder="e.g. Local San Jose siding specialists for repair..."
                required
                className="border-white/10 bg-slate-950/80 text-white"
              />
            </div>
          </div>

          {messageHero && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
              messageHero.success 
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}>
              {messageHero.text}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={loadingHero}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-xl"
            >
              <Check className="h-4 w-4 mr-2" /> {loadingHero ? "Saving..." : "Save Hero Section"}
            </Button>
          </div>
        </form>
      )}

      {/* Why Choose Section Edit Form */}
      {whyChooseSection && (
        <form onSubmit={handleSaveWhy} className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-semibold text-white">Why Choose Us Section</h2>
            <p className="text-sm text-slate-400">Manage key bullet points that build credibility on the landing page.</p>
          </div>

          <div className="space-y-4">
            <Label>Bullet Points</Label>
            
            <div className="space-y-3">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    placeholder={`Bullet #${index + 1}`}
                    required
                    className="border-white/10 bg-slate-950/80 text-white flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveBullet(index)}
                    className="!p-2.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 rounded-xl flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {bullets.length === 0 && (
                <p className="text-sm text-slate-500">No bullets added yet. Click Add Bullet to start.</p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleAddBullet}
              className="flex items-center gap-2 border border-white/10 bg-slate-950 hover:bg-slate-900 text-white rounded-xl"
            >
              <Plus className="h-4 w-4" /> Add Bullet Point
            </Button>
          </div>

          {messageWhy && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
              messageWhy.success 
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}>
              {messageWhy.text}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={loadingWhy}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-xl"
            >
              <Check className="h-4 w-4 mr-2" /> {loadingWhy ? "Saving..." : "Save Bullet Points"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
