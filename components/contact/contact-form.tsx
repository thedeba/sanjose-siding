"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "@/lib/validators";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
};

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: LeadFormValues) => {
    setError(null);
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccess(true);
      reset();
      return;
    }

    const payload = await response.json();
    setError(payload?.error?.message || "Submission failed. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
          {errors.name ? <p className="mt-2 text-xs text-rose-400">{errors.name.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" {...register("email")} />
          {errors.email ? <p className="mt-2 text-xs text-rose-400">{errors.email.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="(408) 555-0123" {...register("phone")} />
          {errors.phone ? <p className="mt-2 text-xs text-rose-400">{errors.phone.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="San Jose, CA" {...register("address")} />
          {errors.address ? <p className="mt-2 text-xs text-rose-400">{errors.address.message}</p> : null}
        </div>
      </div>
      <div>
        <Label htmlFor="service">Service</Label>
        <Input id="service" placeholder="Vinyl siding replacement" {...register("service")} />
        {errors.service ? <p className="mt-2 text-xs text-rose-400">{errors.service.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="message">Project details</Label>
        <Textarea id="message" placeholder="Tell us about your siding needs." {...register("message")} />
        {errors.message ? <p className="mt-2 text-xs text-rose-400">{errors.message.message}</p> : null}
      </div>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-400">Thanks! Your request was submitted successfully.</p> : null}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Submit Request"}</Button>
    </form>
  );
}
