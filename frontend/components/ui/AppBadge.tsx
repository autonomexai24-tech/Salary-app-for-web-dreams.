"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AppBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export default function AppBadge({
  children,
  variant = "default",
  className,
}: AppBadgeProps) {
  const variants: Record<string, string> = {
    default:
      "bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] border-[var(--color-neutral-200)]",
    success:
      "bg-[var(--color-accent-50)] text-[var(--color-accent-700)] border-[var(--color-accent-200)]",
    warning:
      "bg-[var(--color-warning-50)] text-[var(--color-warning-600)] border-[var(--color-warning-100)]",
    danger:
      "bg-[var(--color-danger-50)] text-[var(--color-danger-500)] border-[var(--color-danger-100)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
