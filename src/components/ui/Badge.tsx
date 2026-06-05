import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "colored";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border",
        variant === "default" && "bg-stone-100 text-stone-700 border-stone-200",
        variant === "outline" && "bg-transparent text-stone-600 border-stone-300",
        variant === "colored" && "bg-accent/10 text-accent border-accent/20",
        className
      )}
    >
      {children}
    </span>
  );
}
