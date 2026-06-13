import * as React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
}

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400",
        variant === "default" && "bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-900",
        variant === "secondary" && "border border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-50",
        variant === "ghost" && "text-slate-950 hover:text-slate-700",
        className
      )}
      {...props}
    />
  );
}
