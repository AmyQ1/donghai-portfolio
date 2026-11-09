import { useEffect } from 'react';
// query client disabled
import { BrowserRouter, Route } from 'react-router-dom';
import { initSmoothScroll } from "@/lib/smooth-scroll";
import { Toaster } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { AnimatedRoutes } from "@/components/AnimatedRoutes.tsx";
import { PageTransition } from "@/components/PageTransition.tsx";
import { Navbar } from "@/components/portfolio/Navbar.tsx";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";



function App() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          {/* 固定元素放在路由动画外部，避免参与页面过渡 */}
          <Navbar />
          <ScrollProgress />
          <div className="grain" aria-hidden />
          <AnimatedRoutes>
            <Route path="/" data-genie-title="作品集首页" data-genie-key="Home" element={<PageTransition transition="fade"><Index /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" data-genie-key="NotFound" data-genie-title="Not Found" element={<PageTransition transition="fade"><NotFound /></PageTransition>} />
          </AnimatedRoutes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
}

export default App
