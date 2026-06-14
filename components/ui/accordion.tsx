"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { clsx } from "clsx";

import { ArrowRight } from "lucide-react";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <AccordionPrimitive.Header className="border-b border-white/10">
      <AccordionPrimitive.Trigger
        className={clsx(
          "flex w-full items-center justify-between py-5 text-left text-base font-semibold text-white transition hover:text-cyan-400 [&[data-state=open]>svg]:opacity-100 [&[data-state=open]>svg]:translate-x-0 [&[data-state=open]>svg]:rotate-90",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ArrowRight className="h-5 w-5 shrink-0 text-cyan-400 opacity-0 -translate-x-4 transition-all duration-300 ease-out" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AccordionPrimitive.Content className={clsx("overflow-hidden text-sm leading-7 text-slate-300", className)} {...props}>
      <div className="pb-5 pt-2">{children}</div>
    </AccordionPrimitive.Content>
  );
}
