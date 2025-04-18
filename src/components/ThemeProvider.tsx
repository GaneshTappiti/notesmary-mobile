
import { createContext, useContext } from "react";

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
  // Always use light theme
  const theme: Theme = "light";
  
  // Empty toggle function since we'll always stay in light mode
  const toggleTheme = () => {
    // Do nothing, we stay in light mode
    console.log("Theme toggle requested, but staying in light mode as configured");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="light">
        {children}
      </div>
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
