import * as React from "react";
import { Menu } from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const headerVariants = cva(
  "flex w-full items-center border-b border-border bg-background backdrop-blur-sm transition-all z-30",
  {
    variants: {
      size: {
        sm: "h-12",
        default: "h-14",
        lg: "h-16",
      },
      variant: {
        default: "sticky top-0",
        static: "relative",
        fixed: "fixed top-0",
      },
      border: {
        default: "border-b",
        none: "border-none",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      border: "default",
    },
  },
);

interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  showSidebarTrigger?: boolean;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      size,
      variant,
      border,
      logo,
      actions,
      showSidebarTrigger = true,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();

    return (
      <header
        ref={ref}
        className={cn(headerVariants({ size, variant, border, className }))}
        {...props}
      >
        <div className="container flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            {showSidebarTrigger && (
              <div className="flex md:hidden">
                <SidebarTrigger />
              </div>
            )}
            {logo ? (
              <div className="flex items-center">{logo}</div>
            ) : (
              <div className="font-semibold text-lg">App Logo</div>
            )}
          </div>

          {children && (
            <div className="hidden md:flex items-center mx-4 flex-1">
              {children}
            </div>
          )}

          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </header>
    );
  },
);
Header.displayName = "Header";

const HeaderNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-4", className)}
    {...props}
  />
));
HeaderNav.displayName = "HeaderNav";

const HeaderNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
  }
>(({ className, active, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      active ? "text-foreground" : "text-muted-foreground",
      className,
    )}
    {...props}
  />
));
HeaderNavItem.displayName = "HeaderNavItem";

const HeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
HeaderActions.displayName = "HeaderActions";

const HeaderMobileNav = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    size="icon"
    variant="ghost"
    className={cn("md:hidden", className)}
    {...props}
  >
    <Menu className="h-5 w-5" />
    <span className="sr-only">Toggle menu</span>
  </Button>
));
HeaderMobileNav.displayName = "HeaderMobileNav";

export {
  Header,
  HeaderNav,
  HeaderNavItem,
  HeaderActions,
  HeaderMobileNav,
  headerVariants,
};
