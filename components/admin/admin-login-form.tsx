"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const loginSchema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters."),
});

type FormValues = {
  password: string;
};

export function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    const response = await signIn("credentials", {
      email: "admin@sanjosesidingpros.com",
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (response?.ok) {
      router.push("/admin/dashboard");
      return;
    }

    setError("Invalid password. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/30">
      <div className="space-y-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter admin password" {...register("password")} />
          {errors.password ? <p className="mt-2 text-xs text-rose-400">{errors.password.message}</p> : null}
        </div>
      </div>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
