import * as React from "react";
import { cn } from "@/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-2 text-sm text-brand-dark ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-fresh focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
