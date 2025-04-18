
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  className?: string;
  containerClassName?: string;
}

const Loading = ({ className = "", containerClassName = "" }: LoadingProps) => {
  return (
    <div className={`flex flex-col space-y-3 ${containerClassName}`}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

export default Loading;
