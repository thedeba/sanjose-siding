"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { clsx } from "clsx";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <AccordionPrimitive.Header className="border-b border-slate-200/70">
      <AccordionPrimitive.Trigger
        className={clsx(
          "flex w-full items-center justify-between py-5 text-left text-base font-semibold text-slate-950 transition hover:text-slate-900",
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AccordionPrimitive.Content className={clsx("overflow-hidden text-sm leading-7 text-slate-600", className)} {...props}>
      <div className="pb-5 pt-2">{children}</div>
    </AccordionPrimitive.Content>
  );
}
