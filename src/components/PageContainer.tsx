
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  contentClassName?: string;
}

export const PageContainer = ({ 
  children, 
  className, 
  fullWidth = false,
  noPadding = false,
  contentClassName
}: PageContainerProps) => {
  return (
    <div className={cn(
      "w-full",
      !fullWidth && "container",
      !noPadding && "py-6 sm:py-8 md:py-10",
      "mx-auto",
      className
    )}>
      <div className={cn(
        "w-full max-w-full",
        !noPadding && "px-4 sm:px-6 lg:px-8",
        contentClassName
      )}>
        {children}
      </div>
    </div>
  );
};
