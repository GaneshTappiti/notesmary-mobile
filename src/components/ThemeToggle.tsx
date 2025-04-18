
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ThemeToggle({ 
  variant = "outline", 
  size = "icon",
  className 
}: ThemeToggleProps) {
  // Return null since we don't need the theme toggle anymore
  return null;
}
