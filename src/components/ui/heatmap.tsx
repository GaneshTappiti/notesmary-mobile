
import React from "react";
import { cn } from "@/lib/utils";

interface HeatmapProps {
  data: {
    date: string;
    value: number;
  }[];
  colorScale?: string[];
  className?: string;
}

export function Heatmap({
  data,
  colorScale = ["#f3f4f6", "#dbeafe", "#93c5fd", "#60a5fa", "#3b82f6"],
  className,
}: HeatmapProps) {
  // Group data by day of week and week number
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 91); // 3 months of data
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeks: Record<string, Record<string, { value: number; date: string }>> = {};
  
  // Initialize empty weeks
  for (let i = 0; i < 14; i++) {
    const weekKey = `week-${i}`;
    weeks[weekKey] = {};
    
    for (let j = 0; j < 7; j++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (i * 7) + j);
      const dateString = currentDate.toISOString().split('T')[0];
      
      weeks[weekKey][j] = {
        value: 0,
        date: dateString,
      };
    }
  }
  
  // Fill with actual data
  data.forEach((item) => {
    const date = new Date(item.date);
    const dayDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff >= 0 && dayDiff < 98) { // 14 weeks = 98 days
      const weekIndex = Math.floor(dayDiff / 7);
      const dayOfWeek = date.getDay();
      
      const weekKey = `week-${weekIndex}`;
      if (weeks[weekKey] && weeks[weekKey][dayOfWeek]) {
        weeks[weekKey][dayOfWeek].value = item.value;
      }
    }
  });
  
  const getColorForValue = (value: number) => {
    if (value === 0) return colorScale[0];
    if (value <= 1) return colorScale[1];
    if (value <= 3) return colorScale[2];
    if (value <= 5) return colorScale[3];
    return colorScale[4];
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex justify-end mb-1">
        {days.map((day) => (
          <div key={day} className="w-6 h-6 flex items-center justify-center text-xs text-gray-500">
            {day.charAt(0)}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {Object.keys(weeks).map((weekKey) => (
          <div key={weekKey} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const cell = weeks[weekKey][dayIndex];
              return (
                <div
                  key={`${weekKey}-${dayIndex}`}
                  className="w-6 h-6 rounded-sm tooltip-trigger"
                  style={{ backgroundColor: getColorForValue(cell.value) }}
                  title={`${cell.date}: ${cell.value} hours studied`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>Less</span>
          {colorScale.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
