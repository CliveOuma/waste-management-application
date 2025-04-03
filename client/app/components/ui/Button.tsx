import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-md",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 shadow-sm",
        secondary: "bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 shadow-md",
        ghost: "hover:bg-gray-100 text-gray-700 active:bg-gray-200",
        link: "text-blue-600 underline-offset-4 hover:underline",
        success: "bg-green-700 text-white hover:bg-green-700 active:bg-green-800 shadow-md",
      },
      size: {
        default: "h-10 px-5 py-2.5 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
        icon: "h-10 w-10 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
