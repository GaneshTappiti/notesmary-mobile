
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
}: ThemeProviderProps) {
  // We're always using light theme regardless of what's stored
  const [theme] = useState<Theme>("light");

  useEffect(() => {
    // Apply light theme to document element
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    
    // Save theme to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Toggle function is a no-op since we always want light mode
  const toggleTheme = () => {
    // No-op - we always stay in light mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
