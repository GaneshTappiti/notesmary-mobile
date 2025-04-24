
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer = ({ 
  children, 
  className, 
  fullWidth = false,
  noPadding = false
}: PageContainerProps) => {
  return (
    <div className={cn(
      "w-full",
      !fullWidth && "container",
      !fullWidth && "max-w-7xl", 
      !noPadding && "px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10",
      "mx-auto",
      className
    )}>
      {children}
    </div>
  );
};
