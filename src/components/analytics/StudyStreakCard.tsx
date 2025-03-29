
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { Heatmap } from "@/components/ui/heatmap";

interface StudyStreakCardProps {
  streakDays: number;
  currentStreak: number;
  heatmapData: {
    date: string;
    value: number;
  }[];
}

export const StudyStreakCard: React.FC<StudyStreakCardProps> = ({
  streakDays,
  currentStreak,
  heatmapData,
}) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-orange-100">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <CardTitle className="text-sm font-medium">Study Consistency</CardTitle>
          </div>
          <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
            <Flame className="h-3 w-3 text-orange-500" />
            <span className="text-xs font-medium text-orange-700">
              {currentStreak} day streak
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Activity Calendar</span>
              <span className="text-xs text-gray-500">(Last 3 months)</span>
            </div>
            <Heatmap 
              data={heatmapData} 
              colorScale={["#f3f4f6", "#fed7aa", "#fdba74", "#fb923c", "#f97316"]}
              className="mb-2"
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">{streakDays} days</p>
              <p className="text-xs text-gray-500">Total active days</p>
            </div>
            <div>
              <p className="font-medium">{currentStreak} days</p>
              <p className="text-xs text-gray-500">Current streak</p>
            </div>
            <div>
              <p className="font-medium">23 days</p>
              <p className="text-xs text-gray-500">Longest streak</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
