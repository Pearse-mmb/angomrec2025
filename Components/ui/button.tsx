import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // 🌟 Default: warm amber button with black text
        default:
          "bg-amber-400 text-black hover:bg-amber-500 hover:shadow-lg active:scale-95",

        // 🔥 Destructive: for delete/danger actions
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:scale-95",

        // 🧊 Outline: subtle border button with black text
        outline:
          "border border-amber-400 bg-white text-black hover:bg-amber-50 active:scale-95",

        // ✨ Secondary: soft amber background
        secondary:
          "bg-amber-100 text-amber-900 hover:bg-amber-200 active:scale-95",

        // 👻 Ghost: minimalist hover
        ghost:
          "hover:bg-amber-50 text-amber-900 active:scale-95",

        // 🔗 Link style
        link: "text-amber-600 underline-offset-4 hover:underline",
      },

      // Sizing
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-6 text-base",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
