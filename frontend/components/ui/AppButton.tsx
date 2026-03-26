"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants: Record<string, string> = {
      primary:
        "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] hover:shadow-md focus:ring-[var(--color-primary-300)] shadow-[var(--shadow-sm)]",
      secondary:
        "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] border border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-200)] focus:ring-[var(--color-neutral-300)]",
      danger:
        "bg-[var(--color-danger-500)] text-white hover:bg-[var(--color-danger-600)] focus:ring-[var(--color-danger-100)] shadow-[var(--shadow-sm)]",
      ghost:
        "bg-transparent text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] focus:ring-[var(--color-neutral-200)]",
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-8 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";
export default AppButton;
