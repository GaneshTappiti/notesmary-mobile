
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/loading.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </ThemeProvider>
);
