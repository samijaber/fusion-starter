import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderProvider,
} from "@/components/ui/header";
import {
  Footer,
  FooterContent,
  FooterCopyright,
  FooterLink,
  FooterSection,
} from "@/components/ui/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HeaderProvider>
          <Header position="sticky" className="mb-2">
            <HeaderLogo>
              <span className="text-xl">My App</span>
            </HeaderLogo>
            <HeaderNav>
              <HeaderNavItem to="/" active>
                Home
              </HeaderNavItem>
              <HeaderNavItem to="/about">About</HeaderNavItem>
              <HeaderNavItem to="/contact">Contact</HeaderNavItem>
            </HeaderNav>
            <HeaderActions>
              <HeaderNavItem to="/login">Login</HeaderNavItem>
            </HeaderActions>
          </Header>
          <main className="min-h-[calc(100vh-12rem)]">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer>
            <FooterContent>
              <FooterSection>
                <FooterCopyright>
                  © {new Date().getFullYear()} My App. All rights reserved.
                </FooterCopyright>
              </FooterSection>
              <FooterSection>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms" className="ml-4">
                  Terms of Service
                </FooterLink>
              </FooterSection>
            </FooterContent>
          </Footer>
        </HeaderProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
