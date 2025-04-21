
import * as React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

interface ChartProps {
  data: any[];
  categories: string[];
  colors: string[];
  showLegend?: boolean;
  showAnimation?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  index: string;
  className?: string;
  [key: string]: any;
  // You may add more as needed
}
function CustomTooltip({ 
  active,
  payload,
  label,
  valueFormatter = (value: number) => `${value}`
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (value: number) => string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md">
        <p className="text-xs font-medium text-gray-600">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-xs font-semibold text-gray-800">
              {valueFormatter(entry.value as number)}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  categories,
  colors,
  className,
  showLegend = true,
  showAnimation = true,
  showYAxis = true,
  showTooltip = true,
  showGridLines = true,
  index,
  ...props
}) => (
  <div className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={index} />
        {showYAxis && <YAxis />}
        {showTooltip && (
          <RechartsTooltip content={<CustomTooltip />} />
        )}
        {categories.map((cat, idx) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={colors[idx % colors.length]}
            animationDuration={showAnimation ? 300 : 0}
            strokeWidth={2}
            dot={false}
          />
        ))}
        {showLegend && <Legend />}
      </RechartsLineChart>
    </ResponsiveContainer>
  </div>
);

export const BarChart: React.FC<ChartProps> = ({
  data,
  categories,
  colors,
  className,
  showLegend = true,
  showAnimation = true,
  showYAxis = true,
  showTooltip = true,
  showGridLines = true,
  index,
  ...props
}) => (
  <div className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={index} />
        {showYAxis && <YAxis />}
        {showTooltip && (
          <RechartsTooltip content={<CustomTooltip />} />
        )}
        {categories.map((cat, idx) => (
          <Bar
            key={cat}
            dataKey={cat}
            fill={colors[idx % colors.length]}
            animationDuration={showAnimation ? 300 : 0}
          />
        ))}
        {showLegend && <Legend />}
      </RechartsBarChart>
    </ResponsiveContainer>
  </div>
);

// ChartContainer, ChartTooltip, ChartTooltipContent are not used or exported anymore, as per the error in original file.
