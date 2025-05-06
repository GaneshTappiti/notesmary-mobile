
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

// Make sure container is found before attempting to render
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  
  // Wrap the app in React.StrictMode for better error detection
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="notex-ui-theme">
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found - Unable to mount the application");
}
