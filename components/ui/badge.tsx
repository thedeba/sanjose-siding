import * as React from "react";
import { clsx } from "clsx";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={clsx("inline-flex rounded-full bg-slate-950/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-sm", className)}>
      {children}
    </span>
  );
}
