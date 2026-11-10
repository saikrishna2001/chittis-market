import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-primary text-white shadow-soft-sm",
        fresh:
          "border-transparent bg-emerald-100 text-brand-primary font-bold",
        organic:
          "border-emerald-200 bg-emerald-50 text-emerald-800 font-bold",
        seasonal:
          "border-orange-200 bg-orange-50 text-orange-800 font-bold",
        discount:
          "border-transparent bg-red-500 text-white font-bold",
        outline:
          "border-border text-brand-dark",
        secondary:
          "border-transparent bg-brand-light text-brand-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
