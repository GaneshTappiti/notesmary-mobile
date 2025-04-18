
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  );
}
