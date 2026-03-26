"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function AppCard({ children, className, animate = true }: AppCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--color-neutral-200)] p-6",
        "bg-[var(--surface-card)] shadow-[var(--shadow-sm)]",
        animate && "animate-slide-up",
        className
      )}
    >
      {children}
    </div>
  );
}
