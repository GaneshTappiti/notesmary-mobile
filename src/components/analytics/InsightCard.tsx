
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, ArrowRight } from "lucide-react";

interface InsightCardProps {
  title: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
  type?: "tip" | "achievement" | "warning";
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  actionText,
  actionUrl = "#",
  type = "tip",
}) => {
  const getBgColor = () => {
    switch (type) {
      case "tip":
        return "bg-blue-50 border-l-blue-500";
      case "achievement":
        return "bg-green-50 border-l-green-500";
      case "warning":
        return "bg-amber-50 border-l-amber-500";
      default:
        return "bg-blue-50 border-l-blue-500";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "tip":
        return "text-blue-500";
      case "achievement":
        return "text-green-500";
      case "warning":
        return "text-amber-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <Card className={`border-l-4 ${getBgColor()} shadow-sm`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <LightbulbIcon className={`h-5 w-5 ${getIconColor()}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            {actionText && (
              <Button 
                variant="link" 
                className={`p-0 h-auto ${getIconColor()}`} 
                asChild
              >
                <a href={actionUrl} className="flex items-center gap-1">
                  {actionText}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
