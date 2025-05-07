
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

// Make sure container is found before attempting to render
const container = document.getElementById('root');

if (!container) {
  console.error("Root element not found - Unable to mount the application");
  // Create a fallback display to show the error visibly on the page
  const fallbackDiv = document.createElement('div');
  fallbackDiv.style.padding = '20px';
  fallbackDiv.style.margin = '20px';
  fallbackDiv.style.border = '1px solid red';
  fallbackDiv.innerHTML = '<h2>Application Error</h2><p>Root element not found - Unable to mount the application</p>';
  document.body.appendChild(fallbackDiv);
} else {
  try {
    console.log("Initializing application...");
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
    console.log("Application rendered successfully");
  } catch (error) {
    console.error("Failed to render application:", error);
    // Show error on the page
    container.innerHTML = `
      <div style="padding: 20px; margin: 20px; border: 1px solid red;">
        <h2>Application Error</h2>
        <p>Failed to render application. Check console for details.</p>
        <pre>${String(error)}</pre>
      </div>
    `;
  }
}
