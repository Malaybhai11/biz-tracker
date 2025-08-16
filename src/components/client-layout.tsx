"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/theme-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openMobile, state, isMobile, setOpenMobile } = useSidebar();

  // Check if sidebar should show overlay
  const showOverlay = isMobile ? openMobile : state === "expanded";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen relative">
        {/* Main content - forced center with inline styles */}
        <main 
          className="flex-1 relative flex items-center justify-center min-h-screen px-4"
        >   
          {/* Blur overlay when sidebar is open - clickable to close */}
          {showOverlay && (
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-30 cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false);
                }
              }}
            />
          )}
          
          {/* Content wrapper - forced center */}
          <div 
            className={`w-full max-w-6xl mx-auto px-4 transition-all duration-300 ${showOverlay ? 'blur-[2px]' : ''}`}
          >
            {/* Sidebar trigger - left aligned in centered container */}
            <div 
              className="w-full py-4"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              <SidebarTrigger />
            </div>
            
            {/* Main content - centered */}
            <div 
              className="w-full"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%'
              }}
            >
              {children}
            </div>
          </div>
        </main>

        {/* Sidebar - always fixed positioned, overlays content */}
        <div className="fixed top-0 left-0 h-full z-40">
          <AppSidebar />
        </div>
      </div>
      <ModeToggle />
    </ThemeProvider>
  );
}
