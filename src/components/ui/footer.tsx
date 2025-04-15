import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const footerVariants = cva("w-full bg-background border-t border-border", {
  variants: {
    variant: {
      default: "py-6 px-4 md:px-6",
      compact: "py-3 px-3 md:px-4",
      expanded: "py-8 px-6 md:px-8",
      transparent: "py-6 px-4 md:px-6 bg-transparent border-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  asChild?: boolean;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "footer";
    return (
      <Comp
        ref={ref}
        className={cn(footerVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
Footer.displayName = "Footer";

const FooterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "container mx-auto flex flex-col md:flex-row gap-4 md:items-center md:justify-between",
        className,
      )}
      {...props}
    />
  );
});
FooterContent.displayName = "FooterContent";

const FooterSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row gap-4 md:items-center",
        className,
      )}
      {...props}
    />
  );
});
FooterSection.displayName = "FooterSection";

const FooterSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("border-t border-border w-full my-4 md:hidden", className)}
      {...props}
    />
  );
});
FooterSeparator.displayName = "FooterSeparator";

const FooterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
      {...props}
    />
  );
});
FooterLink.displayName = "FooterLink";

const FooterCopyright = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FooterCopyright.displayName = "FooterCopyright";

export {
  Footer,
  FooterContent,
  FooterCopyright,
  FooterLink,
  FooterSection,
  FooterSeparator,
};
