import * as React from "react";
import { Link } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Menu, X } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const headerVariants = cva(
  "w-full bg-background border-b border-border flex items-center transition-all duration-200",
  {
    variants: {
      variant: {
        default: "py-2 px-4 md:px-6",
        compact: "py-1 px-3 md:px-4",
        expanded: "py-4 px-6 md:px-8",
        transparent: "py-2 px-4 md:px-6 bg-transparent border-transparent",
      },
      position: {
        static: "relative",
        sticky: "sticky top-0 z-40",
        fixed: "fixed top-0 left-0 right-0 z-40",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "static",
    },
  },
);

type HeaderContext = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
};

const HeaderContext = React.createContext<HeaderContext | null>(null);

function useHeader() {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider.");
  }
  return context;
}

const HeaderProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    initialMobileMenuOpen?: boolean;
  }
>(({ initialMobileMenuOpen = false, className, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(
    initialMobileMenuOpen,
  );

  const contextValue = React.useMemo<HeaderContext>(
    () => ({
      mobileMenuOpen,
      setMobileMenuOpen,
      isMobile,
    }),
    [mobileMenuOpen, isMobile],
  );

  return (
    <HeaderContext.Provider value={contextValue}>
      <div ref={ref} className={cn("header-wrapper", className)} {...props}>
        {children}
      </div>
    </HeaderContext.Provider>
  );
});
HeaderProvider.displayName = "HeaderProvider";

interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  asChild?: boolean;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, variant, position, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "header";
    return (
      <Comp
        ref={ref}
        className={cn(headerVariants({ variant, position, className }))}
        {...props}
      />
    );
  },
);
Header.displayName = "Header";

const HeaderLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={cn("flex items-center gap-2 font-semibold", className)}
      {...props}
    />
  );
});
HeaderLogo.displayName = "HeaderLogo";

const HeaderNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isMobile, mobileMenuOpen, setMobileMenuOpen } = useHeader();

  if (isMobile) {
    return (
      <div ref={ref} className={cn("ml-auto", className)} {...props}>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[80vw] p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-semibold">Menu</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X />
              </Button>
            </div>
            <div className="flex flex-col p-4">{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-6 mx-6", className)}
      {...props}
    >
      {children}
    </div>
  );
});
HeaderNav.displayName = "HeaderNav";

const HeaderNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    active?: boolean;
  }
>(({ className, asChild = false, active, ...props }, ref) => {
  const Comp = asChild ? Slot : Link;
  const { isMobile } = useHeader();

  return (
    <Comp
      ref={ref}
      className={cn(
        "text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        isMobile && "py-2",
        className,
      )}
      {...props}
    />
  );
});
HeaderNavItem.displayName = "HeaderNavItem";

const HeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isMobile } = useHeader();

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("ml-auto flex items-center gap-2", className)}
      {...props}
    />
  );
});
HeaderActions.displayName = "HeaderActions";

export {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderProvider,
  useHeader,
};
