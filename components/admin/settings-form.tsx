"use client";

import { useState } from "react";
import { updateSettings } from "@/app/admin/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type SettingsFormProps = {
  initialData: {
    companyName: string;
    phone: string;
    email: string;
    address: string;
    logo: string;
  } | null;
};

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [address, setAddress] = useState(initialData?.address ?? "");
  const [logo, setLogo] = useState(initialData?.logo ?? "");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await updateSettings({
        companyName,
        phone,
        email,
        address,
        logo,
      });

      if (result.success) {
        setMessage({ text: "Settings saved successfully!", success: true });
      } else {
        setMessage({ text: "Failed to save settings.", success: false });
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An unexpected error occurred.", success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Edit Business Details</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input 
            id="companyName" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)} 
            placeholder="e.g. San Jose Siding Pros" 
            required 
            className="border-white/10 bg-slate-950/80 text-white focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="e.g. (408) 555-0199" 
            required 
            className="border-white/10 bg-slate-950/80 text-white focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Public Email</Label>
          <Input 
            id="email" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="e.g. info@sanjosesidingpros.com" 
            required 
            className="border-white/10 bg-slate-950/80 text-white focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo Path / URL</Label>
          <Input 
            id="logo" 
            value={logo} 
            onChange={(e) => setLogo(e.target.value)} 
            placeholder="e.g. /logo.svg" 
            required 
            className="border-white/10 bg-slate-950/80 text-white focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Business Address</Label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="e.g. 1234 Alum Rock Ave, San Jose, CA 95116" 
            required 
            className="border-white/10 bg-slate-950/80 text-white focus:border-cyan-500"
          />
        </div>
      </div>

      {message && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${
          message.success ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        }`}>
          {message.text}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold transition-all duration-300">
        {loading ? "Saving changes..." : "Save Changes"}
      </Button>
    </form>
  );
}
