
import { createContext, useContext } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: "light";
}

const ThemeContext = createContext<ThemeContextType>({ theme: "light" });

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
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
