import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary text-white shadow-soft-md hover:bg-brand-accent hover:shadow-fresh",
        fresh:
          "bg-brand-fresh text-white shadow-soft-sm hover:bg-[#388E3C] hover:shadow-fresh",
        orange:
          "bg-brand-orange text-white shadow-soft-sm hover:bg-[#F57C00] hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-brand-primary/20 bg-transparent text-brand-primary hover:bg-brand-light hover:border-brand-primary",
        secondary:
          "bg-brand-light text-brand-primary hover:bg-[#C8E6C9] font-medium",
        ghost:
          "hover:bg-brand-light hover:text-brand-primary",
        link:
          "text-brand-primary underline-offset-4 hover:underline",
        white:
          "bg-white text-brand-primary shadow-soft-md hover:bg-brand-light",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
        iconSm: "h-8 w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
