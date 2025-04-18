
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

// Ensure we have a proper container to render into
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <ThemeProvider>
    <SidebarProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </SidebarProvider>
  </ThemeProvider>
);
