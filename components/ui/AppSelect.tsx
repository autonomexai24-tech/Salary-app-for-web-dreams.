"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  ({ className, label, error, required, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide"
          >
            {label}
            {required && <span className="text-[var(--color-danger-500)] ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full h-11 rounded-lg border px-3 text-sm transition-all duration-200 appearance-none cursor-pointer",
            "bg-[var(--color-neutral-50)] text-[var(--color-neutral-800)]",
            "focus:outline-none focus:bg-white focus:ring-2",
            error
              ? "border-[var(--color-danger-500)] bg-[var(--color-danger-50)] focus:border-[var(--color-danger-500)] focus:ring-[var(--color-danger-100)]"
              : "border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-100)]",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-[var(--color-danger-500)] mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

AppSelect.displayName = "AppSelect";
export default AppSelect;
