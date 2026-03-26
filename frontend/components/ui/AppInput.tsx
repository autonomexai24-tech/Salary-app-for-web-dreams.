"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, error, required, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide"
          >
            {label}
            {required && <span className="text-[var(--color-danger-500)] ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-11 rounded-lg border px-3 text-sm transition-all duration-200",
            "bg-[var(--color-neutral-50)] text-[var(--color-neutral-800)]",
            "placeholder:text-[var(--color-neutral-400)]",
            "focus:outline-none focus:bg-white focus:ring-2",
            error
              ? "border-[var(--color-danger-500)] bg-[var(--color-danger-50)] focus:border-[var(--color-danger-500)] focus:ring-[var(--color-danger-100)]"
              : "border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-100)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-danger-500)] mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";
export default AppInput;
