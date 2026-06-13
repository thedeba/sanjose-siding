import * as React from "react";
import { clsx } from "clsx";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={clsx("mb-2 block text-sm font-medium text-white", className)} {...props} />
  );
}

