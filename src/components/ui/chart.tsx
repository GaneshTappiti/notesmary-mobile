
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps as RechartsTooltipProps,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

// Common props for all chart types
interface CommonChartProps {
  data: any[];
  index?: string;
  categories: string[];
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  showTooltip?: boolean;
  startEndOnly?: boolean;
}

// Export chart container components for StudyAnalytics
export const ChartContainer: React.FC<{
  config: Record<string, { color: string }>;
  children: React.ReactNode;
}> = ({ config, children }) => {
  return <div className="w-full h-full">{children}</div>;
};

export const ChartTooltip: React.FC<{
  content: React.ReactNode;
}> = ({ content }) => {
  return <Tooltip content={content} />;
};

export const ChartTooltipContent: React.FC<{
  nameKey: string;
  formatter: (value: any, name?: string) => [string, string];
}> = ({ nameKey, formatter }) => {
  const TooltipContent = (props: RechartsTooltipProps<any, any>) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md">
          <p className="text-xs font-medium">{label}</p>
          {payload.map((entry, index) => {
            const [formattedValue, name] = formatter(entry.value, entry.name);
            return (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <p className="text-xs font-semibold">
                  {name}: {formattedValue}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return <TooltipContent />;
};

// Custom tooltip component
const CustomTooltip = ({ 
  active, 
  payload, 
  label,
  valueFormatter = (value: number) => `${value}` 
}: RechartsTooltipProps<any, any> & { valueFormatter?: (value: number) => string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md">
        <p className="text-xs font-medium text-gray-600">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-xs font-semibold text-gray-800">
              {valueFormatter(entry.value as number)}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Line Chart Component
export const LineChart: React.FC<CommonChartProps> = ({
  data,
  index = "name",
  categories,
  colors = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b"],
  className,
  valueFormatter = (value: number) => `${value}`,
  showAnimation = false,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showTooltip = true,
  startEndOnly = false,
}) => {
  return (
    <div className={cn("w-full h-64", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGridLines && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e5e7eb" 
            />
          )}
          {showXAxis && (
            <XAxis 
              dataKey={index}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickMargin={8}
              tickFormatter={(value) => {
                if (startEndOnly) {
                  const idx = data.findIndex(item => item[index] === value);
                  return idx === 0 || idx === data.length - 1 ? value : '';
                }
                return value;
              }}
            />
          )}
          {showYAxis && (
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => valueFormatter(value)}
              tickMargin={8}
            />
          )}
          {showTooltip && (
            <Tooltip 
              content={<CustomTooltip valueFormatter={valueFormatter} />}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
          )}
          {showLegend && (
            <Legend 
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px' }}
            />
          )}
          {categories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={showAnimation}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Bar Chart Component
export const BarChart: React.FC<CommonChartProps> = ({
  data,
  index = "name",
  categories,
  colors = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b"],
  className,
  valueFormatter = (value: number) => `${value}`,
  showAnimation = false,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showTooltip = true,
}) => {
  return (
    <div className={cn("w-full h-64", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGridLines && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e5e7eb" 
            />
          )}
          {showXAxis && (
            <XAxis 
              dataKey={index}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickMargin={8}
            />
          )}
          {showYAxis && (
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => valueFormatter(value)}
              tickMargin={8}
            />
          )}
          {showTooltip && (
            <Tooltip 
              content={<CustomTooltip valueFormatter={valueFormatter} />}
              cursor={{ fill: 'rgba(229, 231, 235, 0.2)' }}
            />
          )}
          {showLegend && (
            <Legend 
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px' }}
            />
          )}
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[index % colors.length]}
              barSize={30}
              radius={[4, 4, 0, 0]}
              isAnimationActive={showAnimation}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
