
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

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
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleToggle = () => {
    // Just show a toast since we're always in light mode
    toast({
      title: "Light mode active",
      description: "This application uses a light theme for a clean, professional look.",
      duration: 2000,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={className}
      aria-label="Light mode"
    >
      <Sun size={18} />
    </Button>
  );
}
