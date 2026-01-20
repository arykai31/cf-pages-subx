/**
 * @file link.tsx
 * @description 可复用的链接组件，支持多种样式变体
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center gap-2 transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4",
        // 品牌标识
        brand:
          "text-xl font-semibold hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3",
      },
      size: {
        default: "",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface LinkProps
  extends React.ComponentProps<typeof ReactRouterLink>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

function Link({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: LinkProps) {
  const Comp = asChild ? Slot : ReactRouterLink;

  return (
    <Comp
      data-slot="link"
      data-variant={variant}
      data-size={size}
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Link, linkVariants };
