
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, BookOpen, Users, Star, Activity } from "lucide-react";

interface AchievementBadgeProps {
  title: string;
  description: string;
  type: "nightOwl" | "consistency" | "noteTaker" | "collaborator" | "topLearner" | "streakMaster";
  unlocked: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  type,
  unlocked,
}) => {
  const getBadgeIcon = () => {
    switch (type) {
      case "nightOwl":
        return <Clock className="h-6 w-6" />;
      case "consistency":
        return <Activity className="h-6 w-6" />;
      case "noteTaker":
        return <BookOpen className="h-6 w-6" />;
      case "collaborator":
        return <Users className="h-6 w-6" />;
      case "topLearner":
        return <Star className="h-6 w-6" />;
      case "streakMaster":
        return <Award className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  const getGradient = () => {
    if (!unlocked) return "from-gray-200 to-gray-300 text-gray-400";
    
    switch (type) {
      case "nightOwl":
        return "from-indigo-400 to-purple-500 text-white";
      case "consistency":
        return "from-green-400 to-emerald-500 text-white";
      case "noteTaker":
        return "from-blue-400 to-sky-500 text-white";
      case "collaborator":
        return "from-purple-400 to-fuchsia-500 text-white";
      case "topLearner":
        return "from-amber-400 to-yellow-500 text-white";
      case "streakMaster":
        return "from-orange-400 to-red-500 text-white";
      default:
        return "from-blue-400 to-indigo-500 text-white";
    }
  };

  return (
    <Card className={`border-none shadow-sm overflow-hidden ${unlocked ? "" : "opacity-70"}`}>
      <CardContent className="p-0">
        <div className="flex flex-col items-center">
          <div className={`w-full bg-gradient-to-r ${getGradient()} p-4 flex justify-center`}>
            {getBadgeIcon()}
          </div>
          <div className="p-3 text-center">
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
            {!unlocked && (
              <span className="text-xs text-gray-400 mt-2 block">Not unlocked</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
