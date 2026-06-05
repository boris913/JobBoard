import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 flex items-center text-stone-400 pointer-events-none z-10">
            {icon}
          </span>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none rounded-lg border border-stone-300 bg-white/80 backdrop-blur-sm",
            "px-3 py-2 pr-8 text-sm text-ink",
            "transition-all duration-200 cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-9",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <span className="absolute right-2.5 flex items-center pointer-events-none text-stone-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8L1 3h10L6 8z" />
          </svg>
        </span>
      </div>
    );
  }
);
Select.displayName = "Select";
