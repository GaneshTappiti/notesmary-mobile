
import { useState, useEffect } from 'react';

type Theme = 'light';

export function useThemePreference() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme);
    
    // Update document classes
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
  }, [theme]);

  // Toggle function is a no-op since we always want light mode
  const toggleTheme = () => {
    // No-op - we always stay in light mode
  };

  return { theme, setTheme, toggleTheme };
}
