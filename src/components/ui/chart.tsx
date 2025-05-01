
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
  TooltipProps,
} from "recharts";

// Add the needed interfaces for the ChartContainer, ChartTooltip and ChartTooltipContent
interface ChartConfig {
  [key: string]: {
    color: string;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
}

// Fix the TooltipProps generic type parameters
interface ChartTooltipProps {
  content?: React.ReactElement | React.FC<any> | null;
  separator?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  formatter?: (value: any, name?: string) => [string, string];
  labelFormatter?: (label: any) => React.ReactNode;
  itemSorter?: (item: any) => number;
  isAnimationActive?: boolean;
  animationDuration?: number;
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

interface ChartTooltipContentProps {
  nameKey?: string;
  formatter?: (value: any, name?: string) => [string, string];
  active?: boolean;
  payload?: any[];
  label?: string;
}

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

// Add ChartContainer component
export const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  children,
}) => {
  return <>{children}</>;
};

// Add ChartTooltip component - fixed to handle the proper type
export const ChartTooltip: React.FC<ChartTooltipProps> = (props) => {
  // Using type assertion to handle the conversion properly
  return <RechartsTooltip {...props as any} />;
};

// Add ChartTooltipContent component
export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  nameKey = "name",
  formatter = (value) => [`${value}`, "Value"],
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md">
        {label && <p className="text-xs font-medium text-gray-600">{label}</p>}
        {payload.map((entry, index) => {
          const [formattedValue, formattedName] = formatter(
            entry.value,
            entry.name
          );
          return (
            <div key={index} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-xs font-semibold text-gray-800">
                {formattedName}: {formattedValue}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

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
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</p>
        <div className="mt-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                <span className="capitalize">{entry.name}: </span>
                {valueFormatter(entry.value as number)}
              </p>
            </div>
          ))}
        </div>
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
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis dataKey={index} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
        {showYAxis && <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />}
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
            dot={{ stroke: colors[idx % colors.length], strokeWidth: 2, fill: '#fff', r: 4 }}
            activeDot={{ stroke: colors[idx % colors.length], strokeWidth: 2, fill: '#fff', r: 6 }}
          />
        ))}
        {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
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
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />}
        <XAxis dataKey={index} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
        {showYAxis && <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />}
        {showTooltip && (
          <RechartsTooltip content={<CustomTooltip />} />
        )}
        {categories.map((cat, idx) => (
          <Bar
            key={cat}
            dataKey={cat}
            fill={colors[idx % colors.length]}
            animationDuration={showAnimation ? 300 : 0}
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        ))}
        {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
      </RechartsBarChart>
    </ResponsiveContainer>
  </div>
);
